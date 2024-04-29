import { cloneDeep } from 'lodash-es';
import { CommonUtils } from 'fx-front-utils';
import { isEmpty } from 'lodash-es';

const { random } = CommonUtils;

/*

筛选项

*/
export const STATISTICAL_DURATION_LIST = [
  {
    label: '时',
    value: 'HOUR'
  },
  {
    label: '日',
    value: 'DAY'
  }
];
// 统计时长label获取
export const getDurationName = (key: string) => {
  const obj = STATISTICAL_DURATION_LIST.filter(item => {
    return item.value === key;
  });
  return isEmpty(obj) ? '--' : obj[0].label;
};

// 策略文案
export const STATERAGY_TITLE_DEFAULT = '${监测点名称}发生${风险分类}${规则名称}';
export const STATERAGY_TITLE_DES = '（可输入文字，${}中是参数；当前支持的参数有：监测主体名称、监测点名称、预警开始时间、风险分类、预警等级、规则名称、附加标识，100字以内）';

export const STATERAGY_RULE_DEFAULT = '${监测主体名称}于${预警开始时间}在${监测点名称}发生${风险分类}${规则名称}';
export const STATERAGY_RULE_DES = '（可输入文字，${}中是参数；当前支持的参数有：监测主体名称、监测点名称、预警开始时间、风险分类、预警等级、规则名称、附加标识，200字以内）';

// 新增规则
export const createNewRule = () => {
  return cloneDeep(RULE_ITEM);
};

// 阈值
const FATORE_ITEM = {
  id: random(),
  isNew: true,
  upKey: '上区间',
  upExpression: '',
  upValue: '',
  lowKey: '下区间',
  lowExpression: '',
  lowValue: ''
};

// 新增阈值
export const addFactorItem = () => {
  return cloneDeep(FATORE_ITEM);
};

// 新增规则
const RULE_ITEM = {
  ruleId: '',
  ruleCode: '',
  isNew: true,
  ruleName: '',
  ruleLevel: '',
  ruleDesc: '',
  alarmTitle: STATERAGY_TITLE_DEFAULT,
  alarmDesc: STATERAGY_RULE_DEFAULT,
  warningNumberThresholdValue: [addFactorItem()],
  rateThresholdValue: [addFactorItem()],
  ruleLogicRelationship: 1
};

/*
筛选项模块 CONST
*/
export const WARNING_NUMBER = 'WARNING_NUMBER';
export const WARNING_NUMBER_NAME = '预警数';
export const RATIO = 'RATIO';
export const RATIO_NAME = '占比';
export const STATISTICA_LIST = {
  [WARNING_NUMBER]: WARNING_NUMBER_NAME,
  [RATIO]: RATIO_NAME
};

export const COUNT_MULTIPLE_TIMES = 'COUNT_MULTIPLE_TIMES';
export const COUNT_ONCE = 'COUNT_ONCE';
export const COUNT_MULTIPLE_TIMES_NAME = '同一个点位多次预警统计为多次';
export const COUNT_ONCE_NAME = '同一个点位多次预警只统计一次';
export const COUNT_LIST:Record<string, string> = {
  [COUNT_MULTIPLE_TIMES]: COUNT_MULTIPLE_TIMES_NAME,
  [COUNT_ONCE]: COUNT_ONCE_NAME
};

export const FIXED_CYCLE = 'FIXED_CYCLE';
export const ROLLING_CYCLE = 'ROLLING_CYCLE';
export const FIXED_CYCLE_NAME = '固定周期';
export const ROLLING_CYCLE_NAME = '滚动周期';
export const CYCLE_LIST:Record<string, string> = {
  [FIXED_CYCLE]: FIXED_CYCLE_NAME,
  [ROLLING_CYCLE]: ROLLING_CYCLE_NAME
};

export const ALL_EQUAL = 'ALL_EQUAL';
export const UNLIMITED = 'UNLIMITED';
export const ALL_EQUAL_NAME = '附加标识相等';
export const UNLIMITED_NAME = '不限';
export const EQUAL_LIST:Record<string, string> = {
  [ALL_EQUAL]: ALL_EQUAL_NAME,
  [UNLIMITED]: UNLIMITED_NAME
};

export const MAX_THRESHOLD = 3;

/*
消警模块 CONST
*/
export const IMMEDIATE_FIRE = 1;
export const RULE_FIRE = 2;
export const FIXED_FIRE = 3;
export const DEADLINE_FIRE = 4;
export const NORMAL_FIRE = 5;

export const CANCEL_TYPE = [
  {
    name: '立即消警',
    value: IMMEDIATE_FIRE
  },
  {
    name: '规则消警',
    value: RULE_FIRE
  },
  {
    name: '固定时长消警',
    value: FIXED_FIRE
  },
  {
    name: '到期自动消警',
    value: DEADLINE_FIRE
  },
  {
    name: '正常数据消警',
    value: NORMAL_FIRE
  },
];
export const getClearTypeName = (key: number) => {
  const obj = CANCEL_TYPE.filter(item => {
    return item.value === key;
  });
  return isEmpty(obj) ? '--' : obj[0].name;
};

export const ALL_CLEAR = 'ALL_CLEAR';
export const ONE_CLEAR = 'ONE_CLEAR';
export const ALL_CLEAR_NAME = '关联预警全部消警';
export const ONE_CLEAR_NAME = '关联预警有一个消警';

export const CANCEL_TYPE2_LIST = [
  {
    name: ALL_CLEAR_NAME,
    value: ALL_CLEAR
  },
  {
    name: ONE_CLEAR_NAME,
    value: ONE_CLEAR
  }
];
// 规则消警name
export const getCancenType2Name = (key: string) => {
  const obj = CANCEL_TYPE2_LIST.filter(item => {
    return item.value === key;
  });
  return isEmpty(obj) ? '--' : obj[0].name;
};
