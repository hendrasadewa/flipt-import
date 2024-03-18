import { api } from '../api';
import { ConstraintsForm } from '../types/forms';

export const constraintsAPI = {
  create: (namespace: string, segment: string, body: ConstraintsForm) =>
    api()
      .post(`api/v1/namespaces/${namespace}/segments/${segment}/constraints`, {
        json: body,
      })
      .json(),
  delete: (namespace: string, segment: string, id: string) =>
    api()
      .delete(
        `api/v1/namespaces/${namespace}/segments/${segment}/constraints/${id}`
      )
      .json(),
  update: (
    namespace: string,
    segment: string,
    id: string,
    body: ConstraintsForm
  ) =>
    api()
      .put(
        `api/v1/namespaces/${namespace}/segments/${segment}/constraints/${id}`,
        { json: body }
      )
      .json(),
};
