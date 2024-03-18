import { api } from '../api';
import { FlagListResponse } from '../types/responses';

export const flagsEndpoints = {
  list: (namespace: string) =>
    api().get(`api/v1/namespaces/${namespace}/flags`).json<FlagListResponse>(),
};
