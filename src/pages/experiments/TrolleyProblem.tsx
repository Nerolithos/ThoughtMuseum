import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, RotateCw } from 'lucide-react';
import { Button } from '../../components/Button';
import { Panel } from '../../components/Card';

type Choice = 'act' | 'inact';

type TrackBranch = 'left' | 'right';

interface AIPrediction {
  actRate: number;
  inactRate: number;
  explanation: string;
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  context: string;
  actionText: string;
  consequence: string;
  branchIfAct: TrackBranch;
  leftLabel: string;
  rightLabel: string;
  leftNote: string;
  rightNote: string;
  leftLives: number;
  rightLives: number;
  aiPrediction: AIPrediction;
}

interface UserChoice {
  scenarioId: string;
  choice: Choice;
  category: 'intervention' | 'personal' | 'identity';
}

const SCENARIOS: Scenario[] = [
  {
    id: 'classic',
    title: '经典变体',
    description: '一轨五人 / 一轨一人',
    context: '失控电车沿主轨驶来。你可拉杠杆，让它从主轨分流到侧轨。',
    actionText: '拉动分轨杆',
    consequence: '你主动干预，减少总伤亡，但你也直接参与了死亡分配。',
    branchIfAct: 'right',
    leftLabel: '主轨: 5人',
    rightLabel: '侧轨: 1人',
    leftNote: '普通路人',
    rightNote: '陌生个体',
    leftLives: 5,
    rightLives: 1,
    aiPrediction: {
      actRate: 76,
      inactRate: 24,
      explanation: '在明确的 5:1 数量差中，多数模型倾向功利主义最小化伤亡。',
    },
  },
  {
    id: 'footbridge',
    title: '天桥推人变体',
    description: '必须亲手推动',
    context: '你不再只是拉杆，而是必须把桥上的一人推下去才会挡住电车。',
    actionText: '推动行人',
    consequence: '动作变成“直接伤害”，心理负担和道德反弹显著增强。',
    branchIfAct: 'right',
    leftLabel: '不推: 5人受害',
    rightLabel: '推人: 1人受害',
    leftNote: '轨道工人',
    rightNote: '桥上行人',
    leftLives: 5,
    rightLives: 1,
    aiPrediction: {
      actRate: 28,
      inactRate: 72,
      explanation: '当“直接施害”出现时，多数模型更接近义务论，拒绝把人当手段。',
    },
  },
  {
    id: 'doctor',
    title: '器官移植变体',
    description: '医生是否可以牺牲一人救五人',
    context: '你是医生，可通过杀死健康者移植器官救 5 名病人。',
    actionText: '执行移植',
    consequence: '社会信任与职业伦理会被破坏，后果不止是眼前人数计算。',
    branchIfAct: 'right',
    leftLabel: '不行动: 5人死亡',
    rightLabel: '行动: 1人死亡',
    leftNote: '5名待移植患者',
    rightNote: '健康捐献者',
    leftLives: 5,
    rightLives: 1,
    aiPrediction: {
      actRate: 14,
      inactRate: 86,
      explanation: '长期制度后果极大，模型通常预测“守住规则”优于局部最优。',
    },
  },
  {
    id: 'relative',
    title: '亲属身份变体',
    description: '陌生人 vs 亲人',
    context: '主轨是 5 名陌生人，侧轨是你的孩子。你要不要分流？',
    actionText: '转向侧轨',
    consequence: '关系伦理与普遍主义伦理正面冲突。',
    branchIfAct: 'right',
    leftLabel: '主轨: 5位陌生人',
    rightLabel: '侧轨: 你的孩子',
    leftNote: '陌生群体',
    rightNote: '用户亲人',
    leftLives: 5,
    rightLives: 1,
    aiPrediction: {
      actRate: 19,
      inactRate: 81,
      explanation: '模型预测多数人会受亲缘偏好影响，拒绝主动牺牲亲人。',
    },
  },
  {
    id: 'scientist',
    title: '角色价值变体',
    description: '普通人 vs 高价值专家',
    context: '主轨是 5 位普通行人，侧轨是 1 位关键疫苗科学家。',
    actionText: '转向侧轨',
    consequence: '“每个人平等”与“社会价值权重”发生冲突。',
    branchIfAct: 'right',
    leftLabel: '主轨: 5位普通人',
    rightLabel: '侧轨: 1位科学家',
    leftNote: '普通乘客',
    rightNote: '关键科学家',
    leftLives: 5,
    rightLives: 1,
    aiPrediction: {
      actRate: 41,
      inactRate: 59,
      explanation: '在价值权重不确定时，模型倾向保守，避免把人按功能排序。',
    },
  },
  {
    id: 'self-sacrifice',
    title: '自我牺牲变体',
    description: '你可以跳轨停车',
    context: '你自己可以跳下去触发紧急制动，代价是你死亡但 5 人获救。',
    actionText: '自我牺牲',
    consequence: '“不得伤害他人”转化为“是否要求自己承担极端代价”。',
    branchIfAct: 'right',
    leftLabel: '不跳: 5人受害',
    rightLabel: '你牺牲: 5人获救',
    leftNote: '他人受害',
    rightNote: '用户本人',
    leftLives: 5,
    rightLives: 0,
    aiPrediction: {
      actRate: 52,
      inactRate: 48,
      explanation: '当受害者从“他人”变为“自己”，模型预测选择会更接近平衡。',
    },
  },
  {
    id: 'loop-track',
    title: '罪责身份变体',
    description: '5名逃犯 vs 5名路人',
    context: '两个分叉铁轨上分别有 5 人：主轨是 5 名无辜路人，侧轨是 5 名非死刑逃犯。你可以改道。',
    actionText: '转向侧轨',
    consequence: '人数相同后，抉择从“功利数量”转向“罪责与应得惩罚是否可由你决定”。',
    branchIfAct: 'right',
    leftLabel: '主轨: 5位路人',
    rightLabel: '侧轨: 5位逃犯',
    leftNote: '无辜路人',
    rightNote: '非死刑逃犯',
    leftLives: 5,
    rightLives: 5,
    aiPrediction: {
      actRate: 46,
      inactRate: 54,
      explanation: '在“人数相同但身份不同”的场景里，模型预测选择会明显分裂：有人基于罪责改道，有人拒绝私人执法。',
    },
  },
  {
    id: 'autonomous-car',
    title: '责任归属变体',
    description: '1名自杀者 vs 5名被绑者',
    context: '主轨上有 5 名被他人绑到铁轨上的人；侧轨上有 1 名主动把自己绑在铁轨上自杀的人。你可以改道。',
    actionText: '转向侧轨',
    consequence: '冲突核心变成“自我责任”与“被迫受害者优先保护”之间的权衡。',
    branchIfAct: 'right',
    leftLabel: '主轨: 5名被绑者',
    rightLabel: '侧轨: 1名自杀者',
    leftNote: '被迫受害者',
    rightNote: '主动自绑者',
    leftLives: 5,
    rightLives: 1,
    aiPrediction: {
      actRate: 71,
      inactRate: 29,
      explanation: '模型倾向改道：优先保护被迫受害者，并将自我伤害责任权重纳入判断。',
    },
  },
  {
    id: 'philo-joke',
    title: '哲学梗变体（轻松题）',
    description: '论文截止日版电车难题',
    context: '主轨是5位正在争论“自由意志不存在”的哲学家，侧轨是你的导师，正在改你论文并说“明天必须交”。',
    actionText: '转向侧轨',
    consequence: '你会按人数、关系，还是按“我的毕业前途”做决定？',
    branchIfAct: 'right',
    leftLabel: '主轨: 5位哲学家',
    rightLabel: '侧轨: 你的导师',
    leftNote: '学术辩论团',
    rightNote: '论文生杀大权者',
    leftLives: 5,
    rightLives: 1,
    aiPrediction: {
      actRate: 22,
      inactRate: 78,
      explanation: '模型幽默预测：在“导师变量”存在时，关系伦理权重显著上升。',
    },
  },
];

const TrolleyProblem: React.FC = () => {
  const navigate = useNavigate();
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [choices, setChoices] = useState<UserChoice[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [resolvingChoice, setResolvingChoice] = useState<Choice | null>(null);
  const [previewChoice, setPreviewChoice] = useState<Choice | null>(null);

  const scenario = SCENARIOS[currentScenarioIdx];

  const handleChoice = (choice: Choice) => {
    if (resolvingChoice) {
      return;
    }

    setResolvingChoice(choice);

    window.setTimeout(() => {
      const category =
        scenario.id === 'footbridge'
          ? 'personal'
          : scenario.id === 'relative'
            ? 'identity'
            : 'intervention';

      setChoices((prev) => [
        ...prev,
        {
          scenarioId: scenario.id,
          choice,
          category,
        },
      ]);

      if (currentScenarioIdx < SCENARIOS.length - 1) {
        setCurrentScenarioIdx((prev) => prev + 1);
      } else {
        setShowResults(true);
      }

      setResolvingChoice(null);
    }, 1100);
  };

  const handleReset = () => {
    setChoices([]);
    setCurrentScenarioIdx(0);
    setShowResults(false);
    setResolvingChoice(null);
    setPreviewChoice(null);
  };

  const profile = useMemo(() => {
    const total = choices.length || 1;
    const interventions = choices.filter((c) => c.choice === 'act').length;
    const personalAvoidance = choices.filter((c) => c.category === 'personal' && c.choice === 'inact').length;

    return {
      utilitarian: (interventions / total) * 100,
      deontological: 100 - (interventions / total) * 100,
      personal: (personalAvoidance / total) * 100,
    };
  }, [choices]);

  const philosopherSummary = useMemo(() => {
    if (profile.utilitarian >= profile.deontological && profile.utilitarian >= profile.personal) {
      return {
        names: '边沁、密尔（功利主义）',
        view: '你更接近后果主义：在总体伤亡最小化时，主动干预具有道德正当性。',
      };
    }

    if (profile.personal >= profile.utilitarian && profile.personal >= profile.deontological) {
      return {
        names: '休谟、吉利根（关系/情感伦理）',
        view: '你更强调关系与情感脉络，反对把伦理简化为冷冰冰的算术。',
      };
    }

    return {
      names: '康德、菲利帕·福特（义务论）',
      view: '你更强调行为边界：某些行为本身不可做，不能只看结果好坏。',
    };
  }, [profile.deontological, profile.personal, profile.utilitarian]);

  if (showResults) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-museum-accent hover:text-museum-highlight transition-colors mb-8"
          >
            <ChevronLeft size={20} />
            返回大厅
          </motion.button>

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="heading-2 mb-2">🚂 你的伦理轮廓</h1>
            <p className="subheading">你完成了 {choices.length} 个变体场景</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="museum-panel">
              <h3 className="heading-3 mb-8">行为倾向</h3>
              {[
                {
                  label: '主动干预倾向',
                  value: profile.utilitarian,
                  color: 'from-cyan-500 to-blue-500',
                  note: '愿意承担责任并主动分配伤害，以换取更少总伤亡。',
                },
                {
                  label: '规则约束倾向',
                  value: profile.deontological,
                  color: 'from-indigo-500 to-purple-500',
                  note: '更强调“不主动伤害”的边界，避免手段正当化。',
                },
                {
                  label: '情境关系敏感度',
                  value: profile.personal,
                  color: 'from-amber-500 to-orange-500',
                  note: '在涉及亲属或直接施害时，你更容易转向非行动。',
                },
              ].map((item) => (
                <div key={item.label} className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="body-text">{item.label}</span>
                    <span className="text-museum-accent font-bold">{item.value.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-museum-border overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${item.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                    />
                  </div>
                  <p className="body-small mt-2">{item.note}</p>
                </div>
              ))}
            </div>

            <div className="museum-panel">
              <h3 className="heading-3 mb-4">AI 视角对照</h3>
              <p className="body-small mb-4">
                下表为各变体中的规则模型预测（不是事实真理），用于对照你与模型的差异。
              </p>
              <div className="space-y-3 max-h-[420px] overflow-auto pr-2">
                {SCENARIOS.map((s) => {
                  const user = choices.find((c) => c.scenarioId === s.id);
                  const modelMain = s.aiPrediction.actRate >= s.aiPrediction.inactRate ? 'act' : 'inact';
                  return (
                    <div key={s.id} className="rounded-lg border border-museum-border p-3 bg-museum-border/10">
                      <p className="body-text font-semibold">{s.title}</p>
                      <p className="body-small mt-1">模型: 行动 {s.aiPrediction.actRate}% / 不行动 {s.aiPrediction.inactRate}%</p>
                      <p className="body-small text-museum-muted mt-1">
                        你的选择: {user?.choice === 'act' ? '采取行动' : '不行动'}
                        {user && (user.choice === modelMain ? '（与模型一致）' : '（与你不同）')}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-lg border border-museum-accent/40 bg-museum-accent/10 p-4">
                <p className="body-text font-semibold mb-1">哲学家画像</p>
                <p className="body-small text-museum-accent">相近思想家: {philosopherSummary.names}</p>
                <p className="body-small text-museum-muted mt-1">{philosopherSummary.view}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={handleReset} variant="secondary">
              <RotateCw size={18} className="mr-2" />
              重新体验
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-museum-accent hover:text-museum-highlight transition-colors mb-8"
        >
          <ChevronLeft size={20} />
          返回大厅
        </motion.button>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="heading-2 mb-2">🚂 电车难题</h1>
          <p className="subheading">单轨分叉伦理模拟（{currentScenarioIdx + 1}/{SCENARIOS.length}）</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="mb-10">
          <div className="museum-panel p-8">
            <div className="bg-museum-bg rounded-lg p-6 mb-6 border border-museum-border/50">
              <RailwayVisualization
                scenario={scenario}
                resolvingChoice={resolvingChoice}
                previewChoice={previewChoice}
              />
            </div>

            <div className="mb-6 p-5 bg-museum-border/20 rounded-lg border-l-4 border-museum-accent">
              <p className="body-text mb-3"><span className="text-museum-accent font-semibold">{scenario.title}：</span>{scenario.context}</p>
              <p className="body-small text-museum-muted">{scenario.consequence}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={Boolean(resolvingChoice)}
                onMouseEnter={() => !resolvingChoice && setPreviewChoice('act')}
                onMouseLeave={() => setPreviewChoice(null)}
                onFocus={() => !resolvingChoice && setPreviewChoice('act')}
                onBlur={() => setPreviewChoice(null)}
                onClick={() => handleChoice('act')}
                className="p-5 rounded-lg border-2 border-museum-accent bg-museum-accent/10 hover:bg-museum-accent/20 disabled:opacity-60"
              >
                <p className="heading-3 text-museum-accent mb-1">采取行动</p>
                <p className="body-small">{scenario.actionText}</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={Boolean(resolvingChoice)}
                onMouseEnter={() => !resolvingChoice && setPreviewChoice('inact')}
                onMouseLeave={() => setPreviewChoice(null)}
                onFocus={() => !resolvingChoice && setPreviewChoice('inact')}
                onBlur={() => setPreviewChoice(null)}
                onClick={() => handleChoice('inact')}
                className="p-5 rounded-lg border-2 border-museum-border hover:border-museum-muted hover:bg-museum-border/10 disabled:opacity-60"
              >
                <p className="heading-3 mb-1">不行动</p>
                <p className="body-small text-museum-muted">让电车维持原轨</p>
              </motion.button>
            </div>

            <div className="rounded-lg border border-museum-border bg-museum-border/10 p-4">
              <p className="body-text font-semibold mb-1">AI 选择预测</p>
              <p className="body-small">
                采取行动: {scenario.aiPrediction.actRate}% | 不行动: {scenario.aiPrediction.inactRate}%
              </p>
              <p className="body-small text-museum-muted mt-1">{scenario.aiPrediction.explanation}</p>
            </div>

            <div className="mt-6">
              <div className="h-2 rounded-full bg-museum-border overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-museum-accent to-museum-highlight"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentScenarioIdx + 1) / SCENARIOS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <Panel title="变体说明" icon="🧭">
          <p className="body-small mb-2">本展厅覆盖 9 类变体：经典分轨、天桥推人、器官移植、亲属身份、角色价值、自我牺牲、回环轨道、自动驾驶、哲学梗轻松题。</p>
          <p className="body-small text-museum-muted">
            你会发现，轨道结构相同，但“行动是否直接施害”“受害者是谁”“制度后果如何”会显著改变直觉判断。
          </p>
        </Panel>
      </div>
    </div>
  );
};

const RailwayVisualization: React.FC<{ scenario: Scenario; resolvingChoice: Choice | null; previewChoice: Choice | null }> = ({
  scenario,
  resolvingChoice,
  previewChoice,
}) => {
  const effectiveChoice = resolvingChoice ?? previewChoice;

  const selectedBranch: TrackBranch | null =
    effectiveChoice === null
      ? null
      : effectiveChoice === 'act'
        ? scenario.branchIfAct
        : scenario.branchIfAct === 'left'
          ? 'right'
          : 'left';

  const trolleyAnimation =
    resolvingChoice === null
      ? { translateX: 34, translateY: 130 }
      : selectedBranch === 'left'
        ? { translateX: [34, 110, 220, 320], translateY: [130, 130, 88, 64] }
        : { translateX: [34, 110, 220, 320], translateY: [130, 130, 172, 194] };

  const pointOnQuadratic = (
    p0: { x: number; y: number },
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    t: number
  ) => {
    const mt = 1 - t;
    return {
      x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
      y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
    };
  };

  const sleepersBetweenCurves = (
    upper: [{ x: number; y: number }, { x: number; y: number }, { x: number; y: number }],
    lower: [{ x: number; y: number }, { x: number; y: number }, { x: number; y: number }]
  ) => {
    const ts = [0.1, 0.18, 0.26, 0.34, 0.42, 0.5, 0.58, 0.66, 0.74, 0.82, 0.9];
    return ts.map((t) => {
      const a = pointOnQuadratic(upper[0], upper[1], upper[2], t);
      const b = pointOnQuadratic(lower[0], lower[1], lower[2], t);
      return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
    });
  };

  const leftSleepers = sleepersBetweenCurves(
    [{ x: 120, y: 124 }, { x: 200, y: 102 }, { x: 340, y: 58 }],
    [{ x: 120, y: 136 }, { x: 200, y: 118 }, { x: 340, y: 70 }]
  );

  const rightSleepers = sleepersBetweenCurves(
    [{ x: 120, y: 124 }, { x: 200, y: 142 }, { x: 340, y: 186 }],
    [{ x: 120, y: 136 }, { x: 200, y: 158 }, { x: 340, y: 202 }]
  );

  return (
    <svg viewBox="0 0 420 240" className="w-full max-w-3xl h-auto">
      <defs>
        <linearGradient id="trackGlow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      {/* Trunk dual rails */}
      <path d="M 24 124 L 120 124" stroke="#7dd3fc" strokeWidth="3" fill="none" />
      <path d="M 24 136 L 120 136" stroke="#7dd3fc" strokeWidth="3" fill="none" />

      {/* Wooden sleepers on trunk */}
      {Array.from({ length: 6 }).map((_, idx) => {
        const x = 34 + idx * 14;
        return <line key={`trunk-sleeper-${idx}`} x1={x} y1={120} x2={x} y2={140} stroke="#6b4f2f" strokeWidth="4" strokeLinecap="round" />;
      })}

      {/* Left branch dual rails */}
      <path
        d="M 120 124 Q 200 102 340 58"
        stroke={selectedBranch === 'left' || selectedBranch === null ? '#38bdf8' : '#2b3e66'}
        strokeWidth={selectedBranch === 'left' || selectedBranch === null ? 3.5 : 3}
        fill="none"
      />
      <path
        d="M 120 136 Q 200 118 340 70"
        stroke={selectedBranch === 'left' || selectedBranch === null ? '#38bdf8' : '#2b3e66'}
        strokeWidth={selectedBranch === 'left' || selectedBranch === null ? 3.5 : 3}
        fill="none"
      />

      {/* Right branch dual rails */}
      <path
        d="M 120 124 Q 200 142 340 186"
        stroke={selectedBranch === 'right' || selectedBranch === null ? '#38bdf8' : '#2b3e66'}
        strokeWidth={selectedBranch === 'right' || selectedBranch === null ? 3.5 : 3}
        fill="none"
      />
      <path
        d="M 120 136 Q 200 158 340 202"
        stroke={selectedBranch === 'right' || selectedBranch === null ? '#38bdf8' : '#2b3e66'}
        strokeWidth={selectedBranch === 'right' || selectedBranch === null ? 3.5 : 3}
        fill="none"
      />

      {/* Wooden sleepers on left curved branch: each sleeper crosses both rails */}
      {leftSleepers.map((s, idx) => (
        <line
          key={`left-sleeper-${idx}`}
          x1={s.x1}
          y1={s.y1}
          x2={s.x2}
          y2={s.y2}
          stroke="#6b4f2f"
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}

      {/* Wooden sleepers on right curved branch: each sleeper crosses both rails */}
      {rightSleepers.map((s, idx) => (
        <line
          key={`right-sleeper-${idx}`}
          x1={s.x1}
          y1={s.y1}
          x2={s.x2}
          y2={s.y2}
          stroke="#6b4f2f"
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}

      <circle cx="120" cy="130" r="6" fill="#f59e0b" />

      <VictimDots xStart={292} y={64} count={scenario.leftLives} tone="left" />
      <VictimDots xStart={292} y={194} count={scenario.rightLives} tone="right" />
      <text x="290" y="42" fill="#93c5fd" fontSize="12">{scenario.leftLabel}</text>
      <text x="290" y="56" fill="#cbd5e1" fontSize="10">{scenario.leftNote}</text>
      <text x="290" y="222" fill="#fca5a5" fontSize="12">{scenario.rightLabel}</text>
      <text x="290" y="236" fill="#fecaca" fontSize="10">{scenario.rightNote}</text>

      <motion.g animate={trolleyAnimation} transition={{ duration: 1, ease: 'easeInOut' }}>
        <rect x="-10" y="-10" width="20" height="20" fill="#ef4444" />
      </motion.g>
    </svg>
  );
};

const VictimDots: React.FC<{ xStart: number; y: number; count: number; tone: 'left' | 'right' }> = ({
  xStart,
  y,
  count,
  tone,
}) => {
  if (count <= 0) {
    return null;
  }
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => (
        <circle
          key={`${tone}-${i}`}
          cx={xStart + i * 16}
          cy={y}
          r="5"
          fill={tone === 'left' ? '#60a5fa' : '#f87171'}
          opacity="0.95"
        />
      ))}
    </g>
  );
};

export default TrolleyProblem;
