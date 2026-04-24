import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, RotateCw } from 'lucide-react';
import { Button } from './Button';
import { Panel } from './Card';

export interface ChoiceDimension {
  key: string;
  label: string;
  description: string;
  colorClass: string;
}

export interface ChoiceOption {
  id: string;
  label: string;
  shortLabel: string;
  detail: string;
  weights: Record<string, number>;
}

export interface ChoiceScenario {
  id: string;
  title: string;
  prompt: string;
  context: string;
  aiPrediction: {
    preferredOptionId: string;
    confidence: number;
    explanation: string;
  };
  options: [ChoiceOption, ChoiceOption];
}

export interface PhilosopherProfile {
  dimensionKey: string;
  philosophers: string;
  stance: string;
}

interface Selection {
  scenarioId: string;
  optionId: string;
}

interface ChoiceLabProps {
  title: string;
  subtitle: string;
  icon: string;
  intro: string;
  scenarios: ChoiceScenario[];
  dimensions: ChoiceDimension[];
  reflectionQuestion: string;
  philosopherProfiles?: PhilosopherProfile[];
  renderScenarioVisual?: (scenario: ChoiceScenario, index: number) => React.ReactNode;
}

const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

export const ChoiceLab: React.FC<ChoiceLabProps> = ({
  title,
  subtitle,
  icon,
  intro,
  scenarios,
  dimensions,
  reflectionQuestion,
  philosopherProfiles = [],
  renderScenarioVisual,
}) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [resolving, setResolving] = useState(false);
  const [selections, setSelections] = useState<Selection[]>([]);

  const current = scenarios[index];
  const completed = index >= scenarios.length;

  const scores = useMemo(() => {
    const base: Record<string, number> = Object.fromEntries(dimensions.map((d) => [d.key, 0]));

    selections.forEach((s) => {
      const scenario = scenarios.find((item) => item.id === s.scenarioId);
      const option = scenario?.options.find((opt) => opt.id === s.optionId);
      if (!option) {
        return;
      }
      dimensions.forEach((d) => {
        base[d.key] += option.weights[d.key] || 0;
      });
    });

    const maxAbs = Math.max(
      1,
      ...Object.values(base).map((v) => Math.abs(v))
    );

    return Object.fromEntries(
      Object.entries(base).map(([k, v]) => [k, clampPercent(((v / maxAbs + 1) / 2) * 100)])
    ) as Record<string, number>;
  }, [dimensions, scenarios, selections]);

  const dominant = useMemo(() => {
    return dimensions
      .map((d) => ({ key: d.key, label: d.label, value: scores[d.key] || 0 }))
      .sort((a, b) => b.value - a.value)[0];
  }, [dimensions, scores]);

  const dominantProfiles = useMemo(() => {
    const sorted = dimensions
      .map((d) => ({ ...d, value: scores[d.key] || 0 }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 2);

    return sorted
      .map((d) => {
        const profile = philosopherProfiles.find((p) => p.dimensionKey === d.key);
        if (!profile) {
          return null;
        }
        return {
          ...profile,
          value: d.value,
          label: d.label,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [dimensions, philosopherProfiles, scores]);

  const handleChoose = (optionId: string) => {
    if (resolving || completed) {
      return;
    }

    setResolving(true);

    window.setTimeout(() => {
      setSelections((prev) => [...prev, { scenarioId: current.id, optionId }]);
      setIndex((prev) => prev + 1);
      setResolving(false);
    }, 500);
  };

  const handleReset = () => {
    setSelections([]);
    setIndex(0);
    setResolving(false);
  };

  if (completed) {
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

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="heading-2 mb-2">{icon} {title}·分析结果</h1>
            <p className="subheading">你完成了 {selections.length} 轮选择。以下是你的心理与哲学倾向画像。</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <div className="museum-panel">
              <h3 className="heading-3 mb-6">倾向雷达（条形版）</h3>
              <div className="space-y-5">
                {dimensions.map((d) => (
                  <div key={d.key}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="body-text">{d.label}</span>
                      <span className="text-museum-accent font-semibold">{(scores[d.key] || 0).toFixed(0)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-museum-border overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${d.colorClass}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${scores[d.key] || 0}%` }}
                      />
                    </div>
                    <p className="body-small mt-1">{d.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="museum-panel">
              <h3 className="heading-3 mb-4">综合解读</h3>
              <div className="rounded-lg border border-museum-border bg-museum-border/10 p-4 mb-4">
                <p className="body-text font-semibold mb-1">你的主导风格</p>
                <p className="body-small">
                  当前最高维度是“{dominant?.label || '未定义'}”。这说明你在冲突情境中，会优先调用这套判断框架。
                </p>
              </div>

              <div className="rounded-lg border border-museum-border bg-museum-border/10 p-4 mb-4">
                <p className="body-text font-semibold mb-1">心理机制提示</p>
                <p className="body-small">
                  当“直接施害”“身份关系”“长期制度后果”出现时，你的判断会明显偏离纯人数计算。
                  这通常反映了道德直觉和理性推演之间的拉扯，而非简单的对错。
                </p>
              </div>

              {dominantProfiles.length > 0 && (
                <div className="rounded-lg border border-museum-border bg-museum-border/10 p-4 mb-4">
                  <p className="body-text font-semibold mb-2">哲学家画像</p>
                  <div className="space-y-3">
                    {dominantProfiles.map((profile) => (
                      <div key={profile.dimensionKey} className="rounded-md border border-museum-border/60 p-3">
                        <p className="body-small font-semibold">
                          {profile.label} ({profile.value.toFixed(0)}%)
                        </p>
                        <p className="body-small text-museum-accent">相近思想家: {profile.philosophers}</p>
                        <p className="body-small text-museum-muted mt-1">{profile.stance}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-lg border border-museum-accent/40 bg-museum-accent/10 p-4">
                <p className="body-text font-semibold mb-1">继续思考</p>
                <p className="body-small">{reflectionQuestion}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={handleReset} variant="secondary">
              <RotateCw size={18} className="mr-2" />
              重新测验
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const selectedCount = selections.length;
  const aiMain = current.aiPrediction.preferredOptionId;
  const left = current.options[0];
  const right = current.options[1];

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

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="heading-2 mb-2">{icon} {title}</h1>
          <p className="subheading mb-2">{subtitle}</p>
          <p className="body-small">{intro}</p>
        </motion.div>

        <div className="museum-panel p-8 mb-8">
          <h2 className="heading-3 mb-2 text-museum-accent">{current.title}</h2>
          {renderScenarioVisual && (
            <div className="mb-4 rounded-lg border border-museum-border/60 bg-museum-bg p-4">
              {renderScenarioVisual(current, index)}
            </div>
          )}
          <p className="body-text mb-3">{current.prompt}</p>
          <p className="body-small text-museum-muted mb-6">{current.context}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[left, right].map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={resolving}
                onClick={() => handleChoose(option.id)}
                className="rounded-lg border border-museum-border p-5 text-left hover:border-museum-accent hover:bg-museum-border/10 disabled:opacity-60 transition-all"
              >
                <p className="body-text font-semibold mb-1">{option.label}</p>
                <p className="body-small text-museum-muted">{option.detail}</p>
              </motion.button>
            ))}
          </div>

          <div className="rounded-lg border border-museum-border bg-museum-border/10 p-4 mb-6">
            <p className="body-text font-semibold mb-1">AI 预测</p>
            <p className="body-small">
              倾向: {aiMain === left.id ? left.shortLabel : right.shortLabel}（置信度 {current.aiPrediction.confidence}%）
            </p>
            <p className="body-small text-museum-muted mt-1">{current.aiPrediction.explanation}</p>
          </div>

          <div className="h-2 rounded-full bg-museum-border overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-museum-accent to-museum-highlight"
              initial={{ width: 0 }}
              animate={{ width: `${((selectedCount + 1) / scenarios.length) * 100}%` }}
            />
          </div>
          <p className="body-small text-museum-muted mt-2">题目进度: {selectedCount + 1} / {scenarios.length}</p>
        </div>

        <Panel title="你的即时风格" icon="🧠">
          <p className="body-small">
            你当前最强的判断维度是“{dominant?.label || '未定义'}”。继续作答后，画像会更稳定。
          </p>
        </Panel>
      </div>
    </div>
  );
};
