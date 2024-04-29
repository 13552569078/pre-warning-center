import { AnyFunction } from 'fx-front-utils';

function isValidFunc({ value, callback, reg, msg }: { value: string; callback: (errorMsg?: any) => void; reg: RegExp; msg: string | undefined }) {
  if (!reg.test(value)) {
    callback(new Error(msg));
  } else {
    callback();
  }
}

const isValidNumber = (rule: any, value: string, callback: AnyFunction<any>) => {
  const regExp = /^[-]{0,1}[0-9]+[.]{0,1}[0-9]*$/;
  if (value && !regExp.test(value)) {
    callback(new Error('请输入数字值'));
  }
  callback();
};

const isValidVideoEquipData = (rule: any, value: string, callback: AnyFunction<any>) => {
  const regExp = /^[\u4e00-\u9fa5a-zA-Z0-9()（）[\]\-【】#_.——-]+$/g;
  if (value && !regExp.test(value)) {
    callback(new Error('仅可输入中文、字母、数字、#号、小括号、中括号、下划线、小数点、连接符'));
  }
  callback();
};

// 必填传参
const ruleRequiredMsg = (msg?: string) => {
  return { required: true, message: `${msg}不允许为空`, trigger: ['change', 'blur'] };
};

const isValidName = (rule: any, value: string, callback: any) => {
  // const reg = /^[\u4e00-\u9fa5a-zA-Z0-9()（）[\]-【】_.——/-]+$/g;
  const reg = /^[\u4e00-\u9fa5a-zA-Z0-9()（）[\]\-【】_.——-]+$/g;
  if (!reg.test(value) && value) {
    callback(new Error('仅可输入中文、字母、数字、小括号、中括号、下划线、小数点、连接符'));
  } else {
    callback();
  }
};

const validateTime = (rule: any, value: any, callback: any) => {
  if (new Date(value).getTime() > Date.now()) {
    callback(new Error('不能超过当前时间'));
  } else {
    callback();
  }
};

const isValidDateTime = (rule: any, value: any, callback: any) => {
  if (isNaN(value)) {
    callback(new Error('日期格式错误'));
  }
};

function isValidKafkaTopic(rule: any, value: string, callback: (errorMsg?: any) => void) {
  const reg = /^[A-Za-z0-9-_.]+$/;
  const msg = '仅可输入字母、数字、下划线、中划线、英文句号';
  isValidFunc({ value, callback, reg, msg });
}

function isValidfunctionIdentifier(rule: any, value: string, callback: (errorMsg?: any) => void) {
  const reg = /^[A-Za-z0-9-_]*$/;
  const msg = '仅可输入字母、数字、下划线、中划线';
  isValidFunc({ value, callback, reg, msg });
}

const ALARM_TITLE_LIST = ['监测主体名称', '监测点名称', '预警开始时间', '风险分类', '预警等级', '规则名称', '附加标识'];
const isValidAlarmTitle = (rule: any, value: any, callback: any) => {
  const regG = /\$\{(.*?)\}/g;
  let result = null;
  const list = [];
  do {
    result = regG.exec(value);
    result && list.push(result[1]);
  } while (result);
  if (list.length) {
    const isTrue = list.every((item: string) => {
      return ALARM_TITLE_LIST.includes(item);
    });
    isTrue ? callback() : callback(new Error('预警标题生成规则格式错误'));
  } else {
    callback(new Error('至少输入一个参数'));
  }
};

const ALARM_DESC_LIST = ['监测主体名称', '监测点名称', '预警开始时间', '风险分类', '预警等级', '规则名称', '附加标识'];
const isValidAlarmDesc = (rule: any, value: any, callback: any) => {
  const regG = /\$\{(.*?)\}/g;
  let result = null;
  const list = [];
  do {
    result = regG.exec(value);
    result && list.push(result[1]);
  } while (result);
  if (list.length) {
    const isTrue = list.every((item: string) => {
      return ALARM_DESC_LIST.includes(item);
    });
    isTrue ? callback() : callback(new Error('预警标题生成规则格式错误'));
  } else {
    callback(new Error('至少输入一个参数'));
  }
};

const ruleRequired = { required: true, message: '不允许为空', trigger: ['change', 'blur'] };
const ruleNumber = { validator: isValidNumber, trigger: ['change', 'blur'] };
const ruleDatetime = { validator: isValidNumber, trigger: ['change', 'blur'] };
const ruleVideoEquipData = { validator: isValidVideoEquipData, trigger: ['change', 'blur'] };
const rulePastTime = { validator: validateTime, trigger: ['change', 'blur'] };
const rulesKafka = { validator: isValidKafkaTopic, trigger: ['change', 'blur'] };
const rulesFunctionIdentifier = { validator: isValidfunctionIdentifier, trigger: ['change', 'blur'] };

export { isValidName, validateTime, isValidDateTime, ruleRequiredMsg, ruleRequired, ruleNumber, ruleDatetime, ruleVideoEquipData, rulePastTime, rulesKafka, rulesFunctionIdentifier, isValidAlarmTitle, isValidAlarmDesc };
