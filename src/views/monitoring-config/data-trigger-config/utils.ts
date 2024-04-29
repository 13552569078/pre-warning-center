import { isEmpty } from 'lodash-es';
// 规则消警
export const TRIGGER_UNIT = [
  {
    label: '分',
    value: 'MINUTE'
  },
  {
    label: '时',
    value: 'HOUR'
  },
  {
    label: '日',
    value: 'DAY'
  }
];
// 固定时长消警
export const TRIGGER_TIME = [
  {
    label: '1分钟',
    value: 60
  },
  {
    label: '5分钟',
    value: 300
  },
  {
    label: '10分钟',
    value: 600
  },
  {
    label: '15分钟',
    value: 900
  },
  {
    label: '30分钟',
    value: 1800
  },
  {
    label: '1小时',
    value: 3600
  },
  {
    label: '2小时',
    value: 7200
  },
  {
    label: '6小时',
    value: 21600
  },
  {
    label: '12小时',
    value: 43200
  },
  {
    label: '1日',
    value: 86400
  }
];
// 到期自动消警
export const TRIGGER_NEXT_TIME = [
  {
    label: '下一小时',
    value: 'NEXT_HOUR'
  },
  {
    label: '下一日',
    value: 'NEXT_DAY'
  },
  {
    label: '下一周',
    value: 'NEXT_WEEK'
  },
  {
    label: '下一月',
    value: 'NEXT_MONTH'
  }
];

export const getUnitTimes = (type: string) => {
  if (type === 'MINUTE') return 60;
  if (type === 'HOUR') return 3600;
  if (type === 'DAY') return 86400;
  return 0;
};
export const getUnitName = (type: string) => {
  if (type === 'MINUTE') return '分';
  if (type === 'HOUR') return '小时';
  if (type === 'DAY') return '天';
  return '';
};

export const getTriggerTimeName = (key: string) => {
  console.log('key', key);
  const obj = TRIGGER_TIME.filter(item => {
    return +item.value === +key;
  });
  console.log('obj', obj);
  return isEmpty(obj) ? '--' : obj[0].label;
};

export const getTriggerNextName = (key: string) => {
  const obj = TRIGGER_NEXT_TIME.filter(item => {
    return item.value === key;
  });
  return isEmpty(obj) ? '--' : obj[0].label;
};

// 开关型指标
export const SWITCH_SELECT_LIST = [
  {
    label: '连续相等',
    value: 'ALL_EQUAL'
  },
  {
    label: '无限制',
    value: 'UNLIMITED'
  }
];

export const getSwitchListName = (key: string) => {
  const target = SWITCH_SELECT_LIST.filter(item => {
    return item.value === key;
  });
  return isEmpty(target) ? '--' : target[0].label;
};
