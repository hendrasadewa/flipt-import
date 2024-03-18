import type {
  AuthMethodEnum,
  ComparisonTypesEnum,
  FlagTypeEnum,
  MatchTypesEnum,
  RolloutTypeEnum,
} from './enums';

export interface FliptEntity {
  description: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  key: string;
}
export interface Authentication
  extends Omit<FliptEntity, 'name' | 'description' | 'key'> {
  expiresAt: Date;
  id: string;
  metadata: {
    'io.flipt.auth.token.description': string;
    'io.flipt.auth.token.name': string;
  };
  method: AuthMethodEnum;
}

export interface Constraints extends Omit<FliptEntity, 'name' | 'key'> {
  id: string;
  namespaceKey: string;
  operator: string;
  property: string;
  segmentKey: string;
  type: ComparisonTypesEnum;
  value: string;
}

export interface Segment extends FliptEntity {
  constraints: Array<Constraints>;
  matchType: MatchTypesEnum;
  namespaceKey: string;
}

export interface FliptNamespace extends FliptEntity {
  protected: boolean;
  updatedAt: Date;
}

export interface FlagVariant extends FliptEntity {
  attachment: string;
  flagKey: string;
  id: string;
  namespaceKey: string;
}

export interface Flag extends FliptEntity {
  enabled: boolean;
  namespaceKey: string;
  type: FlagTypeEnum;
  variants?: FlagVariant[];
}

export interface User {
  username: string;
  id: string;
}

export interface RolloutSegment {
  segmentKey: string;
  value: boolean;
  segmentKeys: string[];
  segmentOperator: string;
}

export interface RolloutThreshold {
  percentage: number;
  value: boolean;
}

export interface Roolout extends FliptEntity {
  namespaceKey: string;
  flagKey: string;
  type: RolloutTypeEnum;
  rank: number;
  description: string;
  segment: RolloutSegment;
  threshold: RolloutThreshold;
}
