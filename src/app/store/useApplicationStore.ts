import { create } from 'zustand';

import { ApplicationSteps } from '../constants/enums';

export interface State {
  step: ApplicationSteps;
}

export interface Actions {
  setStep(namespace: ApplicationSteps): void;
  back(): void;
  forward(): void;
}

export const useApplicationStore = create<State & Actions>((set, get) => ({
  // states
  step: ApplicationSteps.LOGIN,

  // action reducers
  setStep(step) {
    set({ step });
  },

  back() {
    const { step } = get();
    if (step === ApplicationSteps.LOGIN) {
      return;
    }
    set({ step: step - 1 });
  },

  forward() {
    const { step } = get();
    if (step === ApplicationSteps.SUCCESS) {
      return;
    }
    set({ step: step + 1 });
  },
}));
