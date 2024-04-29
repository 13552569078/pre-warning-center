export const TRIGGER_CYCLE = 'TRIGGER_CYCLE';
export const TRIGGER_DATA = 'TRIGGER_DATA';
export const TRIGGER_SECOND = 'TRIGGER_SECOND';
export const TRIGGER_SENIOR = 'TRIGGER_SENIOR';

export const alarmStateOptions = [
  {
    label: '周期策略',
    value: TRIGGER_CYCLE
  },
  {
    label: '数据触发',
    value: TRIGGER_DATA
  },
  {
    label: '二次预警',
    value: TRIGGER_SECOND
  },
  {
    label: '高级预警',
    value: TRIGGER_SENIOR
  }
];

export const STRATEGY_TYPE: Record<string, string> = {
  [TRIGGER_CYCLE]: '周期策略',
  [TRIGGER_DATA]: '数据触发',
  [TRIGGER_SECOND]: '二次预警',
  [TRIGGER_SENIOR]: '高级预警'
};

export const STRATEGY_TYPE_ROUTERNAME_EDIT: Record<string, string> = {
  [TRIGGER_CYCLE]: 'alarmStrategy',
  [TRIGGER_DATA]: 'alarmStrategy',
  [TRIGGER_SECOND]: 'secondTriggerConfig',
  [TRIGGER_SENIOR]: 'advancedStrategy'
};

export const STRATEGY_TYPE_ROUTERNAME_DETAIL: Record<string, string> = {
  [TRIGGER_CYCLE]: 'monitoringConfigDetails',
  [TRIGGER_DATA]: 'monitoringConfigDetails',
  [TRIGGER_SECOND]: 'secondTriggerDetail',
  [TRIGGER_SENIOR]: 'advancedTriggerDetail'
};
