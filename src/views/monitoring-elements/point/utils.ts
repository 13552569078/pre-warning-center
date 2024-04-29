import { get18nName } from '@/common';
import { GlobalAPI } from '@/common';
import { isValidName } from '@/common';
import { apiMonitorPointObj as api } from '@/apis/modules/monitor-unit';
// 基础信息
const checkLongLat = (formData: { longitude: string; latitude: string }) => (_: any, __: any, callback: (err?: Error) => void) => {
  if (!formData.longitude) {
    callback(new Error(`请输入${get18nName('longitude')}`));
  } else if (!formData.latitude) {
    callback(new Error(`请输入${get18nName('latitude')}`));
  } else {
    callback();
  }
};

const isValidNameUnique = (formData: { unitName: string; id?: string }) => async(_: any, __: any, callback: (err?: Error) => void) => {
  const res = await api.postCheckIfNameExist(formData.unitName, formData.id);
  if (res.data) {
    callback(new Error('监测点名称已存在，请更换名称'));
  } else {
    callback();
  }
};

export const getBasicFormRules = (formData: any) => {
  let rules = {
    unitName: [
      { required: true, message: '监测点名称不能为空', trigger: ['change', 'blur'] },
      {
        max: 50,
        message: '长度不超过50个字符',
        trigger: ['change', 'blur']
      },
      { validator: isValidNameUnique(formData), trigger: ['change', 'blur'] },
      { validator: isValidName, trigger: 'blur' },
    ],
    unitCode: [
      { required: true, message: '编码名称不能为空', trigger: ['change', 'blur'] },
      {
        max: 12,
        message: '长度不超过12个字符',
        trigger: ['change', 'blur']
      }
    ],
    regionName: [
      { required: true, message: `${get18nName('region')}名称不能为空`, trigger: ['change', 'blur'] },
    ],
    address: [{ required: true, message: '不允许为空', trigger: ['change', 'blur'] }],
    longLat: [{ required: true, validator: checkLongLat(formData) }],
    description: [
      {
        max: 500,
        message: '长度不超过500个字符',
        trigger: ['change', 'blur']
      }
    ]
  };

  const projectRules = {
    unitType: [{ required: true, message: '点位类型不能为空', trigger: ['change', 'blur'] }],
    facilityType: [{ required: true, message: '设施类型不能为空', trigger: ['change', 'blur'] }],
    facilityId: [{ required: true, message: '设施名称不能为空', trigger: ['change', 'blur'] }],
    altitude: [{ required: true, message: '高程不能为空', trigger: ['change', 'blur'] }],
    altitudeDatum: [{ required: true, message: '高程基准不能为空', trigger: ['change', 'blur'] }],
    streetAreaCode: [{ required: true, message: '所在区域不能为空', trigger: ['change', 'blur'] }],
  };

  if (GlobalAPI.config.DEPLOY_TYPE_CENTRE_CONFIG !== 'product') {
    rules = Object.assign({}, rules, projectRules);
  }

  return rules;
};

export type AccessDataCode = { dataCode: string; dataCodeDesc: string; }

export const checkExpression = (formData: any) => (_: any, value: string, callback: (err?: Error) => void) => {
  if (formData.formula === 'self_identity' && !value) {
    callback(new Error('请输入自定义公式'));
  } else {
    callback();
  }
};
export const checkThirdUrl = (formData: any) => (_: any, value: string, callback: (err?: Error) => void) => {
  if (formData.formula === 'third_part' && !value) {
    callback(new Error('请输入第三方公式'));
  } else {
    callback();
  }
};
export const checkAccessDataCode = (_: any, value: Array<AccessDataCode>, callback: (err?: Error) => void) => {
  if (!value || value.length < 1 || value.filter(v => v.dataCode).length < 1) {
    callback(new Error('请填写至少一个监测数据'));
  } else if (new Set(value.map(v => v.dataCode)).size !== value.length) {
    callback(new Error('数据标识码不能重复'));
  } else {
    callback();
  }
};
