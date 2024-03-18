import { api } from '../api';
import { Roolout } from '../types/entities';
import { SegmentOperatorEnum } from '../types/enums';
import { RolloutListResponse } from '../types/responses';

export const rolloutEndpoints = {
  list: (namespace: string, flag: string) =>
    api()
      .get(`api/v1/namespaces/${namespace}/flags/${flag}/rollouts`)
      .json<RolloutListResponse>(),
  create: (
    // path
    namespace: string,
    flag: string,
    // body
    segmentKey: string,
    segmentOperator: SegmentOperatorEnum = SegmentOperatorEnum.OR,
    rank: number = 1,
    enabled: boolean = true,
    segmentDescription?: string
  ) =>
    api()
      .post(`api/v1/namespaces/${namespace}/flags/${flag}/rollouts`, {
        json: {
          description: segmentDescription,
          rank,
          segment: {
            segmentKeys: [segmentKey],
            segmentOperator,
            value: enabled,
          },
        },
      })
      .json<Roolout>(),
};
