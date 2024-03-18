import type {
  ComparisonTypesEnum,
  ConstrainOperatorEnum,
  MatchTypesEnum,
} from './enums';

export interface ConstraintsForm {
  description?: string;
  operator: ConstrainOperatorEnum;
  property: string;
  type: ComparisonTypesEnum;
  value: string; // JSON string
}

export interface SegmentForm {
  description?: string;
  key: string;
  matchType: MatchTypesEnum;
  name: string;
}

export interface CreateTokenForm {
  description: string;
  name: string;
}
