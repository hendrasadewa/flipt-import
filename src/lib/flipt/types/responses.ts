import { Flag, FliptNamespace, Roolout } from './entities';

export interface BaseListResponse {
  nextPageToken: string;
  totalCount: number;
}

export interface NamespaceListResponse extends BaseListResponse {
  namespaces: FliptNamespace[];
}

export interface FlagListResponse extends BaseListResponse {
  flags: Flag[];
}

export interface RolloutListResponse extends BaseListResponse {
  rollouts: Roolout[];
}
