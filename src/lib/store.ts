import { create } from 'zustand';
import type { StoreState, ExperimentState } from '../types';

export const useStore = create<StoreState>((set) => ({
  currentExperiment: null,
  experimentStates: {},
  theme: 'dark',

  setCurrentExperiment: (id: string | null) =>
    set({ currentExperiment: id }),

  updateExperimentState: (id: string, state: Partial<ExperimentState>) =>
    set((prev) => ({
      experimentStates: {
        ...prev.experimentStates,
        [id]: {
          ...(prev.experimentStates[id] || { completed: false, userChoices: {} }),
          ...state,
        },
      },
    })),

  toggleTheme: () =>
    set((prev) => ({
      theme: prev.theme === 'dark' ? 'light' : 'dark',
    })),
}));
