export enum ComparisonTypesEnum {
  UNKNOWN = 'UNKNOWN_COMPARISON_TYPE',
  STRING = 'STRING_COMPARISON_TYPE',
  NUMBER = 'NUMBER_COMPARISON_TYPE',
  BOOLEAN = 'BOOLEAN_COMPARISON_TYPE',
  DATETIME = 'DATETIME_COMPARISON_TYPE',
}

export enum MatchTypesEnum {
  ALL = 'ALL_MATCH_TYPE',
  ANY = 'ANY_MATCH_TYPE',
}

export enum AuthMethodEnum {
  NONE = 'METHOD_NONE',
  TOKEN = 'METHOD_TOKEN',
  OIDC = 'METHOD_OIDC',
  KUBERNETES = 'METHOD_KUBERNETES',
  JW = 'METHOD_JWT',
}

export enum ConstrainOperatorEnum {
  EQUAL = 'eq', // ==
  NOT_EQUAL = 'neq', // !=
  IS_EMPTY = 'empty',
  IS_NOT_EMPTY = 'notempty',
  HAS_PREFIX = 'prefix',
  HAS_SUFFIX = 'suffix',
  IS_ONE_OF = 'isoneof',
  IS_NOT_ONE_OF = 'isnotoneof',
}

export enum FlagTypeEnum {
  VARIANT = 'VARIANT_FLAG_TYPE',
  BOOLEAN = 'BOOLEAN_FLAG_TYPE',
}

export enum SegmentOperatorEnum {
  OR = 'OR_SEGMENT_OPERATOR',
  AND = 'AND_SEGMENT_OPERATOR',
}

export enum RolloutTypeEnum {
  UNKNOWN = 'UNKNOWN_ROLLOUT_TYPE',
  SEGMENT = 'SEGMENT_ROLLOUT_TYPE',
  THRESHOLD = 'THRESHOLD_ROLLOUT_TYPE',
}
