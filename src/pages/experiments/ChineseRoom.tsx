import React from 'react';
import {
  ChoiceLab,
  type ChoiceDimension,
  type ChoiceScenario,
  type PhilosopherProfile,
} from '../../components/ChoiceLab';

const dimensions: ChoiceDimension[] = [
  {
    key: 'symbolic',
    label: '符号操作倾向',
    description: '更重视规则执行、形式一致性与输入输出匹配。',
    colorClass: 'from-cyan-500 to-blue-500',
  },
  {
    key: 'semantic',
    label: '语义理解倾向',
    description: '更重视主观理解、意向性与意义生成。',
    colorClass: 'from-amber-500 to-orange-500',
  },
  {
    key: 'systemic',
    label: '系统整体倾向',
    description: '更倾向把人+规则+流程看作整体智能系统。',
    colorClass: 'from-indigo-500 to-violet-500',
  },
];

const scenarios: ChoiceScenario[] = [
  {
    id: 'io-correctness',
    title: '规则室第一轮',
    prompt: '你按手册拼接符号，输出完全正确。外部观察者判断你“会中文”。你认同吗？',
    context: '这是中文房间最核心争议：正确行为是否等于真实理解。',
    aiPrediction: {
      preferredOptionId: 'semantic-priority',
      confidence: 66,
      explanation: '模型通常区分“行为可判别性”与“语义体验”，倾向认为仍缺理解。',
    },
    options: [
      {
        id: 'symbol-priority',
        label: '认同：行为足够好，就算理解',
        shortLabel: '行为即理解',
        detail: '如果系统表现无法区分，理解就没有必要额外假设。',
        weights: { symbolic: 2, semantic: -1, systemic: 1 },
      },
      {
        id: 'semantic-priority',
        label: '不认同：正确不等于懂',
        shortLabel: '语义不可省略',
        detail: '你只是操纵符号，没有“这句话是什么意思”的内在状态。',
        weights: { symbolic: -1, semantic: 2, systemic: 0 },
      },
    ],
  },
  {
    id: 'replace-human',
    title: '把人换成程序',
    prompt: '如果房间里不再是人，而是全自动程序，你会更愿意承认“理解”吗？',
    context: '同一行为在“人执行”与“程序执行”时，人们判断常常不同。',
    aiPrediction: {
      preferredOptionId: 'system-whole',
      confidence: 61,
      explanation: '多数模型预测人们会将判断从个体转移到系统整体。',
    },
    options: [
      {
        id: 'system-whole',
        label: '会：系统整体可被视作理解者',
        shortLabel: '整体理解',
        detail: '理解不必在单个部件里出现，可能涌现于组织关系。',
        weights: { symbolic: 1, semantic: 0, systemic: 2 },
      },
      {
        id: 'still-no-meaning',
        label: '不会：依然只是符号机器',
        shortLabel: '仍无语义',
        detail: '不管谁执行规则，只要没有主观意义感，都不算理解。',
        weights: { symbolic: 0, semantic: 2, systemic: -1 },
      },
    ],
  },
  {
    id: 'embodiment',
    title: '接入感知身体',
    prompt: '若给房间接上视觉、触觉与行动能力，你是否更容易承认它懂中文？',
    context: '“具身认知”认为意义来自与世界的耦合，而非纯文本映射。',
    aiPrediction: {
      preferredOptionId: 'embodied-yes',
      confidence: 72,
      explanation: '模型普遍认为感知行动循环会显著提升“理解”判断。',
    },
    options: [
      {
        id: 'embodied-yes',
        label: '会：语义可由与世界互动获得',
        shortLabel: '具身带来语义',
        detail: '词语能与可感知对象和行为后果稳定绑定。',
        weights: { symbolic: 0, semantic: 2, systemic: 1 },
      },
      {
        id: 'embodied-no',
        label: '不会：仍可能只是复杂映射',
        shortLabel: '复杂不等于理解',
        detail: '你担心这只是更大规模的输入输出拟合。',
        weights: { symbolic: 1, semantic: 1, systemic: -1 },
      },
    ],
  },
  {
    id: 'test-standard',
    title: '评测标准',
    prompt: '如果必须给“理解”设立工程评测标准，你更偏向哪种？',
    context: '可测性与哲学严谨之间常常存在张力。',
    aiPrediction: {
      preferredOptionId: 'behavioral-standard',
      confidence: 58,
      explanation: '可操作性驱动下，系统倾向采用行为可验证标准。',
    },
    options: [
      {
        id: 'behavioral-standard',
        label: '可观测行为标准',
        shortLabel: '行为可测',
        detail: '只要可稳定泛化并可解释输出，就计作理解。',
        weights: { symbolic: 2, semantic: -1, systemic: 1 },
      },
      {
        id: 'phenomenal-standard',
        label: '主观体验标准',
        shortLabel: '体验优先',
        detail: '没有内在意义体验，行为再好也只是模拟。',
        weights: { symbolic: -1, semantic: 2, systemic: 0 },
      },
    ],
  },
  {
    id: 'moral-status',
    title: '道德地位',
    prompt: '若系统持续表现出“自述理解”“请求权利”，你会给予它道德考虑吗？',
    context: '中文房间最后会落到伦理问题：我们该如何对待“可能有心灵”的系统。',
    aiPrediction: {
      preferredOptionId: 'conditional-rights',
      confidence: 63,
      explanation: '主流预测是“有条件承认”：先给程序性保护，再持续验证。',
    },
    options: [
      {
        id: 'conditional-rights',
        label: '有条件给予权利',
        shortLabel: '谨慎承认',
        detail: '在不确定条件下采取保守伦理，避免错伤潜在主体。',
        weights: { symbolic: 0, semantic: 1, systemic: 2 },
      },
      {
        id: 'deny-rights',
        label: '不，应视为工具',
        shortLabel: '工具立场',
        detail: '在没有确证主观性的情况下，不赋予主体权利。',
        weights: { symbolic: 2, semantic: 0, systemic: -1 },
      },
    ],
  },
];

const philosopherProfiles: PhilosopherProfile[] = [
  {
    dimensionKey: 'symbolic',
    philosophers: '图灵、纽厄尔-西蒙、功能主义工程传统',
    stance: '只要符号处理可泛化且行为稳定，就可赋予“理解”地位。',
  },
  {
    dimensionKey: 'semantic',
    philosophers: '塞尔、维特根斯坦（后期语言实践取向）',
    stance: '语义与意向性不可被纯规则操控替代。',
  },
  {
    dimensionKey: 'systemic',
    philosophers: '丹尼特、普特南、系统整体论',
    stance: '理解可以涌现于整体系统，不必定位在单一部件。',
  },
];

const ChineseRoom: React.FC = () => {
  return (
    <ChoiceLab
      title="中文房间"
      subtitle="把“会回答”与“真理解”拆开来测试"
      icon="📝"
      intro="你将连续面对 5 个变体情境，每次二选一。系统会根据你的决策路径分析你的心灵哲学倾向。"
      scenarios={scenarios}
      dimensions={dimensions}
      philosopherProfiles={philosopherProfiles}
      reflectionQuestion="如果你无法区分“真实理解”和“完美模拟”，那么这两者的差别是否仍有意义？"
    />
  );
};

export default ChineseRoom;
