import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { segmentEndpoints } from '../../lib/flipt/endpoints/segment';
import { MatchTypesEnum } from '../../lib/flipt/types/enums';

export interface State {
  flag?: string;
  namespace?: string;
  segment?: {
    name: string;
    description: string;
    key: string;
    matchType: MatchTypesEnum;
  };
}

export interface Actions {
  storeFlag(namespace?: string, flag?: string): void;
  storeSegment(
    name: string,
    description: string,
    matchtype: MatchTypesEnum
  ): Promise<void>;
  clearForm(): void;
}

export const useFormValues = create(
  persist<State & Actions>(
    (set, get) => ({
      // states
      flag: undefined,
      namespace: undefined,

      // action reducers
      storeFlag(namespace, flag) {
        if (!namespace) {
          toast.error('Namespace cannot be empty');
          return;
        }
        if (!flag) {
          toast.error('Flag cannot be empty');
          return;
        }

        set({ namespace, flag });
      },

      async storeSegment(name, description, matchType) {
        if (!name) {
          toast.error('Segment name cannot be empty');
          return;
        }

        const { namespace } = get();
        if (!namespace) {
          toast.error('Namespace cannot be empty');
          return;
        }

        const key = name.split(' ').join('-');

        set({
          segment: {
            name,
            description,
            key,
            matchType: matchType,
          },
        });

        await segmentEndpoints.create(namespace, {
          key,
          name,
          description,
          matchType,
        });
      },

      clearForm() {
        set({
          flag: undefined,
          namespace: undefined,
          segment: undefined,
        });
      },
    }),
    {
      name: 'flipt-toolkit-form',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
