import { isValidName, ruleRequiredMsg, validateTime } from '@/common';

// const isValidNameChars = async(rule: any, value: string, callback: (error?: Error) => void) => {
//     const res = await apiEquipmentObj.getEnable(value, props?.editForm.id || '');
//     if (!res.data) {
//       callback(new Error('设备名称已存在，请更换名称'));
//     }
//     callback();
//   };
// 名称重复
const isValidNameChars = async (rule: any, value: string, callback: (error?: Error) => void) => {
  callback();
};

export const formData = {
  alarmId: '',
  alarmTitle: '',
  eventTypeCode: '',
  alarmLevel: '',
  alarmAddress: '',
  latitude: '',
  longitude: '',
  areaCode: '',
  startTime: '',
  alarmState: 1,
  handleOption: 2,
  alarmOrigin: 'OUT_ALARM',
  judgeOption: 1,
  monitorUnitId: '',
  monitorRegionId: '',
  regionName: '',
  alarmDesc: '',
  attachments: [],
  needTransfer: '0',
  transferType: [],
  disseminationOptions: []
};

export const formRules = {
  alarmTitle: [
    ruleRequiredMsg('预警标题'),
    {
      max: 50,
      message: '长度不超过50个字符',
      trigger: ['change', 'blur']
    },
    { validator: isValidNameChars, trigger: 'blur' },
    { validator: isValidName, trigger: 'blur' },
  ],
  eventTypeCode: [ruleRequiredMsg('风险分类')],
  alarmLevel: [ruleRequiredMsg('预警等级')],
  alarmAddress: [ruleRequiredMsg('预警地点')],
  areaCode: [ruleRequiredMsg('所在区域')],
  startTime: [
    ruleRequiredMsg('发生时间'),
    { validator: validateTime, trigger: ['change', 'blur'] },
  ],
  alarmState: [ruleRequiredMsg('预警状态')],
  handleOption: [ruleRequiredMsg('处置方式')],
  alarmOrigin: [ruleRequiredMsg('预警来源')],
  judgeOption: [ruleRequiredMsg('研判方式')],
  alarmDesc: [{
    max: 150,
    message: '长度不超过150个字符',
    trigger: ['change', 'blur']
  }]
};

export const alarmStateList = [{
  value: 0,
  label: '预警中'
}, {
  value: 1,
  label: '已消警'
}];

export const handleOptionList = [{
  value: 1,
  label: '无需处置'
}, {
  value: 2,
  label: '事件中心处置'
}];

export const judgeOptionList = [{
  value: 1,
  label: '无需研判'
}, {
  value: 3,
  label: '人工研判'
}];
