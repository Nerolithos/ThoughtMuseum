import React from 'react';
import { motion } from 'framer-motion';
import {
  ChoiceLab,
  type ChoiceDimension,
  type ChoiceScenario,
  type PhilosopherProfile,
} from '../../components/ChoiceLab';

const dimensions: ChoiceDimension[] = [
  {
    key: 'mechanistic',
    label: '机械论倾向',
    description: '优先按部件、因果链和可分解结构判断同一性。',
    colorClass: 'from-cyan-500 to-blue-500',
  },
  {
    key: 'systemic',
    label: '系统论倾向',
    description: '优先看整体关系、功能连续与组织动态。',
    colorClass: 'from-violet-500 to-indigo-500',
  },
  {
    key: 'historical',
    label: '历史连续性倾向',
    description: '更看重叙事、记忆与时间脉络中的身份延续。',
    colorClass: 'from-amber-500 to-orange-500',
  },
];

const scenarios: ChoiceScenario[] = [
  {
    id: 'replace-one',
    title: '替换第一块木板',
    prompt: '仅替换 1/8 部件时，这艘船还是原船吗？',
    context: '问题在于：同一性是离散阈值，还是连续过程。',
    aiPrediction: {
      preferredOptionId: 'still-original',
      confidence: 83,
      explanation: '模型预测大多数人会认为小规模替换不破坏身份。',
    },
    options: [
      {
        id: 'still-original',
        label: '是，连续航行保证同一性',
        shortLabel: '连续即同一',
        detail: '你把“运行连续”置于材料变化之上。',
        weights: { mechanistic: 0, systemic: 2, historical: 1 },
      },
      {
        id: 'part-break',
        label: '否，部件变化已造成中断',
        shortLabel: '部件决定身份',
        detail: '你倾向以材料构成定义对象身份。',
        weights: { mechanistic: 2, systemic: -1, historical: 0 },
      },
    ],
  },
  {
    id: 'all-replaced',
    title: '全部替换完成',
    prompt: '当 8/8 部件都被替换后，持续航行的船还是原船吗？',
    context: '这一步让“渐变过程”与“结果状态”正面冲突。',
    aiPrediction: {
      preferredOptionId: 'system-yes',
      confidence: 57,
      explanation: '在系统论语境中，模型更倾向承认连续组织保持身份。',
    },
    options: [
      {
        id: 'system-yes',
        label: '是，系统连续优先于材料连续',
        shortLabel: '系统连续',
        detail: '你认为“船”是组织结构，而非木板集合。',
        weights: { mechanistic: -1, systemic: 2, historical: 1 },
      },
      {
        id: 'material-no',
        label: '否，原始物质已归零',
        shortLabel: '物质归零',
        detail: '你认为身份锚点仍应是原材料。',
        weights: { mechanistic: 2, systemic: -1, historical: 0 },
      },
    ],
  },
  {
    id: 'rebuild-old',
    title: '旧件重组第二艘船',
    prompt: '如果用拆下旧件拼回一艘船，哪艘更像“原船”？',
    context: '经典双船对决：连续航行船 vs 原件重组船。',
    aiPrediction: {
      preferredOptionId: 'narrative-ship',
      confidence: 60,
      explanation: '模型预测在日常语境中，人们更认同“历史叙事连续体”。',
    },
    options: [
      {
        id: 'narrative-ship',
        label: '持续航行的那艘',
        shortLabel: '叙事连续船',
        detail: '你把航程、组织、社会认同视为身份核心。',
        weights: { mechanistic: -1, systemic: 2, historical: 2 },
      },
      {
        id: 'material-ship',
        label: '旧件重组出来的那艘',
        shortLabel: '原件重组船',
        detail: '你把“原始组成”视为身份主锚点。',
        weights: { mechanistic: 2, systemic: -1, historical: 1 },
      },
    ],
  },
  {
    id: 'east-west',
    title: '东西方框架冲突',
    prompt: '你更认同哪种判断策略？',
    context: '机械论更偏分析拆解，系统论更偏关系整体。',
    aiPrediction: {
      preferredOptionId: 'systemic-lens',
      confidence: 54,
      explanation: '跨文化数据中，整体关系视角在此题上略占优势。',
    },
    options: [
      {
        id: 'systemic-lens',
        label: '系统论：整体运行与关系网络更重要',
        shortLabel: '整体关系优先',
        detail: '对象身份由系统功能与关系位置共同维持。',
        weights: { mechanistic: -1, systemic: 2, historical: 1 },
      },
      {
        id: 'mechanistic-lens',
        label: '机械论：拆分因果与部件更可靠',
        shortLabel: '部件因果优先',
        detail: '先把对象拆开，身份判断才可验证。',
        weights: { mechanistic: 2, systemic: -1, historical: 0 },
      },
    ],
  },
  {
    id: 'self-identity',
    title: '映射到“你自己”',
    prompt: '你的身体不断更新，但你仍是“同一个你”。你凭什么这样认为？',
    context: '忒修斯之船最终会回到人格、记忆与身份政治。',
    aiPrediction: {
      preferredOptionId: 'memory-history',
      confidence: 69,
      explanation: '模型预测多数人会以记忆与叙事连续性作为“自我”主依据。',
    },
    options: [
      {
        id: 'memory-history',
        label: '记忆与人生叙事连续性',
        shortLabel: '叙事自我',
        detail: '你认为自我是时间中的故事，不是静态材料。',
        weights: { mechanistic: -1, systemic: 1, historical: 2 },
      },
      {
        id: 'biological-const',
        label: '生物结构与神经机制连续性',
        shortLabel: '结构自我',
        detail: '你把“可追踪机制”视为身份的基础。',
        weights: { mechanistic: 2, systemic: 0, historical: 1 },
      },
    ],
  },
];

const philosopherProfiles: PhilosopherProfile[] = [
  {
    dimensionKey: 'mechanistic',
    philosophers: '霍布斯、笛卡尔、分析形而上学传统',
    stance: '将对象视为可拆分机制，身份判断应由构成部件与因果结构给出。',
  },
  {
    dimensionKey: 'systemic',
    philosophers: '怀特海、老子、当代系统哲学',
    stance: '把对象理解为动态整体，身份来自关系网络与功能延续。',
  },
  {
    dimensionKey: 'historical',
    philosophers: '洛克、利科、叙事身份理论',
    stance: '同一性存在于时间脉络中，由记忆、故事与社会承认共同维持。',
  },
];

const partFill = (count: number, idx: number) => (idx < count ? '#38bdf8' : '#7c8aa3');

const shipParts = [
  { id: 'hull-l', kind: 'poly', points: '56,138 84,104 146,104 146,138' },
  { id: 'hull-r', kind: 'poly', points: '146,138 146,104 236,104 258,138' },
  { id: 'deck', kind: 'rect', x: 84, y: 92, w: 152, h: 12 },
  { id: 'mast', kind: 'rect', x: 159, y: 30, w: 5, h: 62 },
  { id: 'sail-a', kind: 'poly', points: '164,36 204,56 164,76' },
  { id: 'sail-b', kind: 'poly', points: '158,44 126,62 158,80' },
  { id: 'cabin', kind: 'rect', x: 114, y: 74, w: 32, h: 18 },
  { id: 'keel', kind: 'rect', x: 78, y: 138, w: 170, h: 5 },
];

const renderShip = (replacedCount: number, tint = '#38bdf8') => (
  <svg viewBox="0 0 320 180" className="w-full h-44">
    <rect y="142" width="320" height="38" fill="#1e3a8a" opacity="0.22" />
    <motion.path
      d="M 0 142 Q 80 136 160 142 T 320 142"
      stroke="#3b82f6"
      strokeWidth="1.8"
      fill="none"
      animate={{ d: ['M 0 142 Q 80 136 160 142 T 320 142', 'M 0 142 Q 80 148 160 142 T 320 142'] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    {shipParts.map((part, idx) => {
      const fill = idx < replacedCount ? tint : '#7c8aa3';
      if (part.kind === 'poly') {
        return <polygon key={part.id} points={part.points} fill={fill} opacity="0.9" />;
      }
      return <rect key={part.id} x={part.x} y={part.y} width={part.w} height={part.h} fill={fill} rx="2" />;
    })}
  </svg>
);

const renderScenarioVisual = (scenario: ChoiceScenario) => {
  switch (scenario.id) {
    case 'replace-one':
      return (
        <div>
          <p className="body-small text-museum-muted mb-2">替换 1/8：第一块木板变新，但船体结构几乎不变。</p>
          {renderShip(1)}
        </div>
      );
    case 'all-replaced':
      return (
        <div>
          <p className="body-small text-museum-muted mb-2">替换 8/8：所有构件更新完成，连续航行未中断。</p>
          {renderShip(8)}
        </div>
      );
    case 'rebuild-old':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <p className="body-small text-museum-muted mb-1">连续航行船（新件）</p>
            {renderShip(8, '#38bdf8')}
          </div>
          <div>
            <p className="body-small text-museum-muted mb-1">旧件重组船（旧件）</p>
            {renderShip(8, '#f59e0b')}
          </div>
        </div>
      );
    case 'east-west':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-lg border border-museum-border p-3">
            <p className="body-small mb-2">机械论：拆分-因果</p>
            <div className="grid grid-cols-4 gap-1">
              {Array.from({ length: 8 }).map((_, idx) => (
                <motion.div
                  key={`m-${idx}`}
                  className="h-5 rounded"
                  style={{ background: partFill(4, idx) }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ delay: idx * 0.05, duration: 0.8, repeat: Infinity }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-museum-border p-3">
            <p className="body-small mb-2">系统论：关系-整体</p>
            <svg viewBox="0 0 220 80" className="w-full h-14">
              {[20, 70, 120, 170].map((x, idx) => (
                <g key={x}>
                  <circle cx={x} cy="40" r="8" fill="#a78bfa" />
                  {idx > 0 && <line x1={x - 50} y1="40" x2={x} y2="40" stroke="#c4b5fd" strokeWidth="2" />}
                </g>
              ))}
            </svg>
          </div>
        </div>
      );
    default:
      return (
        <div>
          <p className="body-small text-museum-muted mb-2">自我映射：身份更像“可持续叙事”还是“可追踪机制”？</p>
          <div className="rounded-lg border border-museum-border p-3">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-amber-500"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          </div>
        </div>
      );
  }
};

const ShipOfTheseus: React.FC = () => {
  return (
    <ChoiceLab
      title="忒修斯之船"
      subtitle="用 5 轮选择测出你的同一性哲学"
      icon="⚓"
      intro="每一题都在推动一艘船，也在推动你对“同一性”的定义。最终画像会展示你在机械论、系统论与历史连续性之间的重心。"
      scenarios={scenarios}
      dimensions={dimensions}
      philosopherProfiles={philosopherProfiles}
      renderScenarioVisual={renderScenarioVisual}
      reflectionQuestion="如果身份是系统关系而非固定材料，那么“原作”“真我”“正版”这些概念要如何重写？"
    />
  );
};

export default ShipOfTheseus;
