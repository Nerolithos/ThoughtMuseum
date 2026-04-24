// Experiment types
export interface Experiment {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  description: string;
  category: 'ethics' | 'metaphysics' | 'epistemology' | 'mind' | 'physics' | 'game-theory';
  icon: string;
  color: string;
  order: number;
}

export interface ExperimentState {
  completed: boolean;
  userChoices: Record<string, any>;
  result?: any;
}

// Common UI types
export interface StoreState {
  currentExperiment: string | null;
  experimentStates: Record<string, ExperimentState>;
  theme: 'dark' | 'light';
  
  // Actions
  setCurrentExperiment: (id: string | null) => void;
  updateExperimentState: (id: string, state: Partial<ExperimentState>) => void;
  toggleTheme: () => void;
}
