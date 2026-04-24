import React from 'react';
import {
  ChoiceLab,
  type ChoiceDimension,
  type ChoiceScenario,
  type PhilosopherProfile,
} from '../../components/ChoiceLab';

const dimensions: ChoiceDimension[] = [
  {
    key: 'truth-seeking',
    label: '求真驱动',
    description: '愿意为接近真实付出舒适与关系成本。',
    colorClass: 'from-cyan-500 to-sky-500',
  },
  {
    key: 'stability',
    label: '秩序稳定驱动',
    description: '优先维护已有秩序，避免系统震荡。',
    colorClass: 'from-amber-500 to-orange-500',
  },
  {
    key: 'pedagogy',
    label: '启蒙责任驱动',
    description: '重视把所见真相转化为可被他人理解的路径。',
    colorClass: 'from-indigo-500 to-violet-500',
  },
];

const scenarios: ChoiceScenario[] = [
  {
    id: 'turn-around',
    title: '第一次转身',
    prompt: '你发现影子并非真实，火光会刺痛眼睛。你会继续看吗？',
    context: '洞穴寓言第一关是“是否承受认知痛感”。',
    aiPrediction: {
      preferredOptionId: 'keep-looking',
      confidence: 62,
      explanation: '模型预测对探索型人格而言，短期不适通常可被长期意义抵消。',
    },
    options: [
      {
        id: 'keep-looking',
        label: '继续看，忍受不适',
        shortLabel: '面对光源',
        detail: '你愿意承担心理成本换取更高认知分辨率。',
        weights: { 'truth-seeking': 2, stability: -1, pedagogy: 1 },
      },
      {
        id: 'stay-safe',
        label: '回到影子，保持舒适',
        shortLabel: '保留旧视角',
        detail: '你更在意稳定生活与低认知负担。',
        weights: { 'truth-seeking': -1, stability: 2, pedagogy: 0 },
      },
    ],
  },
  {
    id: 'outside-shock',
    title: '走出洞穴后',
    prompt: '外部世界复杂且刺眼，你会立刻下结论还是继续校准认知？',
    context: '离开旧框架后，最危险的是“过早自信”。',
    aiPrediction: {
      preferredOptionId: 'slow-calibration',
      confidence: 69,
      explanation: '多数模型认为认知升级需要时间窗口和反复验证。',
    },
    options: [
      {
        id: 'slow-calibration',
        label: '慢慢适应，逐步校准',
        shortLabel: '渐进校准',
        detail: '你承认新知识也可能有偏差，需要迭代检验。',
        weights: { 'truth-seeking': 1, stability: 1, pedagogy: 2 },
      },
      {
        id: 'instant-conviction',
        label: '立即相信“我终于看到了真相”',
        shortLabel: '快速定论',
        detail: '你倾向把突破体验等同于最终真理。',
        weights: { 'truth-seeking': 1, stability: -1, pedagogy: -1 },
      },
    ],
  },
  {
    id: 'return-cave',
    title: '是否返回洞穴',
    prompt: '如果你知道会被嘲笑和误解，还要回去告诉其他囚徒吗？',
    context: '这里测试的是“真理责任”而非“真理拥有”。',
    aiPrediction: {
      preferredOptionId: 'go-back',
      confidence: 58,
      explanation: '模型预测在高道德驱动人群中，启蒙责任会压过个人安全。',
    },
    options: [
      {
        id: 'go-back',
        label: '回去，尝试解释',
        shortLabel: '承担启蒙责任',
        detail: '你认可知识带来的公共义务。',
        weights: { 'truth-seeking': 1, stability: -1, pedagogy: 2 },
      },
      {
        id: 'stay-outside',
        label: '不回去，先保护自己',
        shortLabel: '优先自保',
        detail: '你认为先稳住自己比说服他人更现实。',
        weights: { 'truth-seeking': 0, stability: 2, pedagogy: -1 },
      },
    ],
  },
  {
    id: 'teaching-method',
    title: '教学策略',
    prompt: '面对坚信影子即真实的人，你会强行揭示还是分层引导？',
    context: '启蒙失败常来自方法不匹配，而非内容本身。',
    aiPrediction: {
      preferredOptionId: 'guided',
      confidence: 77,
      explanation: '渐进式引导在高抵抗人群中更有效。',
    },
    options: [
      {
        id: 'guided',
        label: '分层引导，先建立可接受的小证据',
        shortLabel: '渐进引导',
        detail: '你把认知转变看作过程工程。',
        weights: { 'truth-seeking': 1, stability: 1, pedagogy: 2 },
      },
      {
        id: 'force-break',
        label: '直接打破旧信念',
        shortLabel: '强制破壁',
        detail: '你强调“迅速醒来”高于关系维系。',
        weights: { 'truth-seeking': 2, stability: -1, pedagogy: 0 },
      },
    ],
  },
  {
    id: 'meta-question',
    title: '终极问题',
    prompt: '你更认同哪句判断？',
    context: '洞穴寓言最终讨论的不仅是真假，还有“社会是否承受得起真相”。',
    aiPrediction: {
      preferredOptionId: 'truth-with-design',
      confidence: 64,
      explanation: '模型预测最稳健路径是“求真 + 社会设计”并行。',
    },
    options: [
      {
        id: 'truth-with-design',
        label: '真理重要，但要配套传播与制度设计',
        shortLabel: '真理与设计并行',
        detail: '你强调知识升级和社会承载能力必须耦合。',
        weights: { 'truth-seeking': 1, stability: 1, pedagogy: 2 },
      },
      {
        id: 'truth-over-all',
        label: '真理压倒一切，代价由社会自行承担',
        shortLabel: '真理优先',
        detail: '你认为任何妥协都会污染真理。',
        weights: { 'truth-seeking': 2, stability: -1, pedagogy: 0 },
      },
    ],
  },
];

const philosopherProfiles: PhilosopherProfile[] = [
  {
    dimensionKey: 'truth-seeking',
    philosophers: '柏拉图、苏格拉底、笛卡尔',
    stance: '愿意为了真理承受不适，把认识提升放在首位。',
  },
  {
    dimensionKey: 'stability',
    philosophers: '霍布斯、伯克（秩序保守取向）',
    stance: '优先社会稳定和可承受秩序，警惕激进认知冲击。',
  },
  {
    dimensionKey: 'pedagogy',
    philosophers: '孔子、杜威、阿伦特（公共教育取向）',
    stance: '强调把真理转译为可共享的公共理解路径。',
  },
];

const CaveAllegory: React.FC = () => {
  return (
    <ChoiceLab
      title="洞穴寓言"
      subtitle="从影子走向真实的决策心理"
      icon="🕳️"
      intro="你将经历 5 次关键抉择，系统会分析你在求真、稳定与启蒙责任之间的权重。"
      scenarios={scenarios}
      dimensions={dimensions}
      philosopherProfiles={philosopherProfiles}
      reflectionQuestion="如果真相会破坏秩序，你认为“知道”仍然比“安稳”更重要吗？"
    />
  );
};

export default CaveAllegory;
