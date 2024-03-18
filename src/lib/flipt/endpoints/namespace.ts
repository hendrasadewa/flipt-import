import { api } from '../api';
import { NamespaceListResponse } from '../types/responses';

export const namespaceEndpoints = {
  list: () => api().get('api/v1/namespaces').json<NamespaceListResponse>(),
};
