import React from 'react';
import {
  ChoiceLab,
  type ChoiceDimension,
  type ChoiceScenario,
  type PhilosopherProfile,
} from '../../components/ChoiceLab';

const dimensions: ChoiceDimension[] = [
  {
    key: 'classical',
    label: '经典直觉倾向',
    description: '偏好确定状态、单一事实与观测无关的实在。',
    colorClass: 'from-sky-500 to-blue-500',
  },
  {
    key: 'quantum',
    label: '量子解释开放性',
    description: '更接受叠加、概率本体和非直觉解释框架。',
    colorClass: 'from-fuchsia-500 to-violet-500',
  },
  {
    key: 'epistemic',
    label: '认识论谨慎度',
    description: '把不确定性视为知识边界，而非世界本体矛盾。',
    colorClass: 'from-amber-500 to-orange-500',
  },
];

const scenarios: ChoiceScenario[] = [
  {
    id: 'pre-observe',
    title: '盒子未开前',
    prompt: '你更愿意如何描述猫的状态？',
    context: '这是叠加态争议的起点：状态是“真的双重”还是“我们不知道”。',
    aiPrediction: {
      preferredOptionId: 'epistemic-unknown',
      confidence: 55,
      explanation: '在非专业群体中，模型预测“未知论”更符合直觉。',
    },
    options: [
      {
        id: 'superposition-real',
        label: '猫处于真实叠加态',
        shortLabel: '本体叠加',
        detail: '观测前不存在单一经典事实。',
        weights: { classical: -1, quantum: 2, epistemic: 0 },
      },
      {
        id: 'epistemic-unknown',
        label: '只是我们不知道，猫早已确定',
        shortLabel: '知识未知',
        detail: '不确定来自信息缺失，不来自现实本身。',
        weights: { classical: 1, quantum: -1, epistemic: 2 },
      },
    ],
  },
  {
    id: 'measurement-role',
    title: '观测的地位',
    prompt: '你认为“观测导致坍缩”最合理的含义是？',
    context: '这决定你是把观测当物理过程还是认知更新。',
    aiPrediction: {
      preferredOptionId: 'physical-collapse',
      confidence: 52,
      explanation: '多数模型判断人们会把“测量”理解为真实物理干预。',
    },
    options: [
      {
        id: 'physical-collapse',
        label: '测量装置与系统相互作用，触发物理坍缩',
        shortLabel: '物理坍缩',
        detail: '观测不是看一眼，而是耦合系统动力学。',
        weights: { classical: 0, quantum: 2, epistemic: 0 },
      },
      {
        id: 'belief-update',
        label: '只是观察者更新信念，并无额外物理事件',
        shortLabel: '信念更新',
        detail: '波函数更像信息账本而非实体。',
        weights: { classical: 1, quantum: 0, epistemic: 2 },
      },
    ],
  },
  {
    id: 'many-worlds',
    title: '多世界解释',
    prompt: '若每次测量都在分支世界中实现，你能接受吗？',
    context: '多世界避免坍缩，但代价是引入巨量不可见分支。',
    aiPrediction: {
      preferredOptionId: 'prefer-single-world',
      confidence: 61,
      explanation: '模型预测多数人会因“本体成本”过高而拒绝多世界。',
    },
    options: [
      {
        id: 'accept-many-worlds',
        label: '接受：代价虽大，但形式统一',
        shortLabel: '接受多世界',
        detail: '你更看重方程连续性与解释闭合。',
        weights: { classical: -1, quantum: 2, epistemic: 0 },
      },
      {
        id: 'prefer-single-world',
        label: '不接受：应坚持单一世界图景',
        shortLabel: '单世界优先',
        detail: '你倾向最小本体承诺，拒绝过度扩展现实。',
        weights: { classical: 2, quantum: -1, epistemic: 1 },
      },
    ],
  },
  {
    id: 'macro-limit',
    title: '宏观极限',
    prompt: '为什么我们日常看不到“人和猫的叠加态”？',
    context: '量子到经典的过渡是核心难题之一。',
    aiPrediction: {
      preferredOptionId: 'decoherence',
      confidence: 73,
      explanation: '退相干是目前最常见、最工程化的解释框架。',
    },
    options: [
      {
        id: 'decoherence',
        label: '环境退相干迅速抹平量子干涉',
        shortLabel: '退相干机制',
        detail: '宏观系统与环境耦合太强，叠加相位难维持。',
        weights: { classical: 0, quantum: 2, epistemic: 1 },
      },
      {
        id: 'hidden-variables',
        label: '可能存在更深层隐藏变量',
        shortLabel: '隐藏变量',
        detail: '量子概率只是更底层决定论的表象。',
        weights: { classical: 2, quantum: -1, epistemic: 1 },
      },
    ],
  },
  {
    id: 'philosophical-end',
    title: '最后判断',
    prompt: '你更认同哪种科学哲学态度？',
    context: '解释并非只靠计算正确率，还涉及“你愿意把世界理解成什么样”。',
    aiPrediction: {
      preferredOptionId: 'pragmatic-pluralism',
      confidence: 59,
      explanation: '模型倾向折中立场：多解释共存，以可预测性为首要。',
    },
    options: [
      {
        id: 'pragmatic-pluralism',
        label: '实用多元：谁更好用就先采用谁',
        shortLabel: '实用多元',
        detail: '你接受解释并存，强调任务和尺度依赖。',
        weights: { classical: 0, quantum: 1, epistemic: 2 },
      },
      {
        id: 'single-ultimate',
        label: '应追求唯一终极解释',
        shortLabel: '唯一真解',
        detail: '你认为科学最终应收敛到单一世界图景。',
        weights: { classical: 1, quantum: 1, epistemic: -1 },
      },
    ],
  },
];

const philosopherProfiles: PhilosopherProfile[] = [
  {
    dimensionKey: 'classical',
    philosophers: '爱因斯坦、玻姆（实在论传统）',
    stance: '偏好可确定、单世界、观测独立的现实图景。',
  },
  {
    dimensionKey: 'quantum',
    philosophers: '玻尔、海森堡、埃弗雷特',
    stance: '愿意接受非经典解释成本，优先维护量子形式的一致性。',
  },
  {
    dimensionKey: 'epistemic',
    philosophers: 'QBism 与认识论工具主义传统',
    stance: '把波函数更多视为知识状态，不急于做强本体承诺。',
  },
];

const SchrodingersCat: React.FC = () => {
  return (
    <ChoiceLab
      title="薛定谔的猫"
      subtitle="用 5 次选择定位你的量子直觉"
      icon="🐱"
      intro="你将面对 5 个量子解释变体。系统会分析你在经典直觉、量子开放性与认识论谨慎之间的平衡。"
      scenarios={scenarios}
      dimensions={dimensions}
      philosopherProfiles={philosopherProfiles}
      reflectionQuestion="当两个解释预测完全相同，你究竟在“相信数学”，还是在“选择世界观”？"
    />
  );
};

export default SchrodingersCat;
