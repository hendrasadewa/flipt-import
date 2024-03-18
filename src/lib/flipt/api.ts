import ky from 'ky';
import { useAuthStore } from '../../app/store/useAuthStore';

export const apiInstance = ky.create({
  prefixUrl: '',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export function api() {
  const { host, token } = useAuthStore.getState();

  return apiInstance.extend({
    prefixUrl: host || '',
    hooks: {
      beforeRequest: [
        (opts) => {
          if (token) {
            opts.headers.append('Authorization', `Bearer ${token}`);
          }
        },
      ],
    },
  });
}
