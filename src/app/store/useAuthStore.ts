import { create } from 'zustand';
import { toast } from 'sonner';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Authentication } from '../../lib/flipt/types/entities';
import { authenticationEndpoints } from '../../lib/flipt/endpoints/authentication';

interface State {
  token?: string;
  host?: string;
  authentication?: Authentication;
}

interface Actions {
  login(host: string, token: string): Promise<void>;
  logout(): void;
}

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      async login(token, host) {
        try {
          set({ token, host });
          const response = await authenticationEndpoints.self();
          set({
            authentication: response,
          });
        } catch (error) {
          console.error(error);
          if (error instanceof Error) {
            toast.error(error.message);
          }
          set({ token: undefined, host: undefined });
        }
      },

      logout() {
        set({ host: undefined, token: undefined, authentication: undefined });
      },
    }),
    {
      name: 'flipt-toolkit-session',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
