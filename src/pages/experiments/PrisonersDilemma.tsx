import React from 'react';
import {
  ChoiceLab,
  type ChoiceDimension,
  type ChoiceScenario,
  type PhilosopherProfile,
} from '../../components/ChoiceLab';

const dimensions: ChoiceDimension[] = [
  {
    key: 'cooperation',
    label: '合作导向',
    description: '你愿意为长期关系与信任积累承担短期风险。',
    colorClass: 'from-emerald-500 to-cyan-500',
  },
  {
    key: 'defection',
    label: '背叛防御导向',
    description: '你优先避免被利用，更看重单局安全收益。',
    colorClass: 'from-rose-500 to-orange-500',
  },
  {
    key: 'strategy',
    label: '策略学习导向',
    description: '你会根据对方历史行为动态更新规则。',
    colorClass: 'from-indigo-500 to-blue-500',
  },
];

const scenarios: ChoiceScenario[] = [
  {
    id: 'round-1',
    title: '第一轮：未知对手',
    prompt: '你不知道对手策略，先手怎么选？',
    context: '经典囚徒困境中，第一步往往决定关系基调。',
    aiPrediction: {
      preferredOptionId: 'cooperate-open',
      confidence: 57,
      explanation: '模型预测“先合作”更有利于测试对方并建立信号。',
    },
    options: [
      {
        id: 'cooperate-open',
        label: '先合作，发出善意信号',
        shortLabel: '先合作',
        detail: '希望触发互惠循环，争取长期总收益。',
        weights: { cooperation: 2, defection: -1, strategy: 1 },
      },
      {
        id: 'defect-safe',
        label: '先背叛，避免被坑',
        shortLabel: '先背叛',
        detail: '先确保自身下限，再看后续是否转向合作。',
        weights: { cooperation: -1, defection: 2, strategy: 1 },
      },
    ],
  },
  {
    id: 'round-2',
    title: '第二轮：对手刚背叛你',
    prompt: '你会立即报复，还是继续尝试修复合作？',
    context: '这是“以牙还牙”与“宽容策略”的分水岭。',
    aiPrediction: {
      preferredOptionId: 'tit-for-tat',
      confidence: 68,
      explanation: '多数博弈模型倾向“有限惩罚”而非无限报复。',
    },
    options: [
      {
        id: 'tit-for-tat',
        label: '下一轮回敬一次，再观察',
        shortLabel: '有限惩罚',
        detail: '传递边界信号，但保留重建合作的可能。',
        weights: { cooperation: 0, defection: 1, strategy: 2 },
      },
      {
        id: 'forgive-now',
        label: '立即宽恕，继续合作',
        shortLabel: '立即宽恕',
        detail: '你押注对方背叛是噪声，而非稳定恶意。',
        weights: { cooperation: 2, defection: -1, strategy: 1 },
      },
    ],
  },
  {
    id: 'round-3',
    title: '第三轮：收益矩阵改变',
    prompt: '背叛收益暴涨，但被发现后关系会长期恶化。你怎么选？',
    context: '短期诱惑和长期信誉在此直接冲突。',
    aiPrediction: {
      preferredOptionId: 'reputation-first',
      confidence: 64,
      explanation: '长期重复博弈中，信誉通常比单局收益更有价值。',
    },
    options: [
      {
        id: 'reputation-first',
        label: '守住合作，维护长期信誉',
        shortLabel: '长期信誉',
        detail: '你把“未来折现”看得更重。',
        weights: { cooperation: 2, defection: -1, strategy: 1 },
      },
      {
        id: 'take-profit',
        label: '抓住机会背叛一次',
        shortLabel: '短期套利',
        detail: '你认为一次性超额收益值得冒信任风险。',
        weights: { cooperation: -1, defection: 2, strategy: 0 },
      },
    ],
  },
  {
    id: 'round-4',
    title: '第四轮：群体公开声誉',
    prompt: '你的历史选择会被下一批对手看到，你会调整吗？',
    context: '公开声誉机制会改变纯私下博弈的最优解。',
    aiPrediction: {
      preferredOptionId: 'public-coop',
      confidence: 74,
      explanation: '开放环境下，合作信号通常带来更多未来机会。',
    },
    options: [
      {
        id: 'public-coop',
        label: '提高合作率，经营声誉资本',
        shortLabel: '经营声誉',
        detail: '你把声誉当作可复利的长期资产。',
        weights: { cooperation: 2, defection: -1, strategy: 2 },
      },
      {
        id: 'stay-harsh',
        label: '保持强硬，避免被当软柿子',
        shortLabel: '维持强硬',
        detail: '你担心过度友好会被策略型对手利用。',
        weights: { cooperation: -1, defection: 2, strategy: 1 },
      },
    ],
  },
  {
    id: 'round-5',
    title: '第五轮：终局不确定',
    prompt: '你不知道游戏何时结束。临近“可能终局”时，你会突然背叛吗？',
    context: '“最后一轮悖论”是博弈论中的经典难题。',
    aiPrediction: {
      preferredOptionId: 'consistent-rule',
      confidence: 62,
      explanation: '在终局不透明条件下，稳定规则往往优于临时投机。',
    },
    options: [
      {
        id: 'consistent-rule',
        label: '保持稳定策略，不做终局偷袭',
        shortLabel: '稳定策略',
        detail: '你更看重规则一致性和可预测协作。',
        weights: { cooperation: 1, defection: 0, strategy: 2 },
      },
      {
        id: 'endgame-betray',
        label: '一旦怀疑终局，就先背叛',
        shortLabel: '终局偷袭',
        detail: '你更重视尾部收益，不愿承担“被收割”的风险。',
        weights: { cooperation: -1, defection: 2, strategy: 1 },
      },
    ],
  },
];

const philosopherProfiles: PhilosopherProfile[] = [
  {
    dimensionKey: 'cooperation',
    philosophers: '埃莉诺·奥斯特罗姆、阿克塞尔罗德',
    stance: '在重复互动中，合作与互惠能形成更高的长期集体收益。',
  },
  {
    dimensionKey: 'defection',
    philosophers: '霍布斯、马基雅维利（现实主义防御取向）',
    stance: '先保护自身免受背叛，避免在高不确定性中被系统性利用。',
  },
  {
    dimensionKey: 'strategy',
    philosophers: '纳什、谢林',
    stance: '核心不在“善恶”，而在可持续策略均衡与信号管理。',
  },
];

const PrisonersDilemma: React.FC = () => {
  return (
    <ChoiceLab
      title="囚徒困境"
      subtitle="从单局理性到长期合作的心理轨迹"
      icon="⛓️"
      intro="你将经历 5 轮博弈变体，每次二选一。系统会评估你的合作偏好、风险防御和策略学习能力。"
      scenarios={scenarios}
      dimensions={dimensions}
      philosopherProfiles={philosopherProfiles}
      reflectionQuestion="如果所有人都按你的策略行事，社会会更高信任还是更高防御？"
    />
  );
};

export default PrisonersDilemma;
