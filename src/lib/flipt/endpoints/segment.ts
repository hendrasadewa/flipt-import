import { api } from '../api';
import { SegmentForm } from '../types/forms';

export const segmentEndpoints = {
  list: (namespace: string) =>
    api().get(`api/v1/namespaces/${namespace}/segments`).json(),
  create: (namespace: string, body: SegmentForm) =>
    api()
      .post(`api/v1/namespaces/${namespace}/segments`, {
        json: body,
      })
      .json(),
  get: (namespace: string, segment: string) =>
    api().get(`api/v1/namespaces/${namespace}/segments/${segment}`).json(),
  delete: (namespace: string, segment: string) =>
    api().delete(`api/v1/namespaces/${namespace}/segments/${segment}`).json(),
  update: (
    namespace: string,
    segment: string,
    body: Pick<SegmentForm, 'name' | 'description'>
  ) =>
    api()
      .put(`api/v1/namespaces/${namespace}/segments/${segment}`, {
        json: body,
      })
      .json(),
};
