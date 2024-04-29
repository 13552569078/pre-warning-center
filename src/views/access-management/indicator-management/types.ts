export interface ThresholdValue {
  lowExpression: string,
  lowValue: string,
  upExpression: string,
  upValue: string,
}

export interface FormData {
  targetId?: string;
  targetTypeCode: string,
  targetName: string,
  measureUnitId: string,
  dataType: string,
  targetFrequency: string,
  targetFrequencyOrigin: string,
  targetDesc: string,
  thresholdValue: ThresholdValue[] | number | string,
  targetFrequencyUnitCode: string,
  thresholdLevelList?: any[],
  thresholdLevelValue?: thresholdLevel[] | number | string,
  thresholdLevelParamList?: thresholdLevel[] | number | string,
}

export interface thresholdLevel {
  thresholdLevelId: string;
  thresholdLevelName: string,
  thresholdLevelValue: string
}
