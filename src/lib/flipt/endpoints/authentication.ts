import { api } from '../api';
import { Authentication } from '../types/entities';
import { CreateTokenForm } from '../types/forms';

export const authenticationEndpoints = {
  get: (id: string) => api().get(`auth/v1/tokens/${id}`).json(),
  create: (body: CreateTokenForm) =>
    api().post('auth/v1/method/token', { json: body }).json(),
  delete: (id: string) => api().delete(`auth/v1/tokens/${id}`).json(),
  expire: () => api().put('auth/v1/self/expire').json(),
  self: () => api().get('auth/v1/self').json<Authentication>(),
};
