import { AnyFunction } from 'fx-front-utils';

const isValidNumber = (rule: any, value: string, callback: AnyFunction<any>) => {
  const regExp = /^[0-9]+[.]{0,1}[0-9]*$/;
  if (value && !regExp.test(value)) {
    callback(new Error('请输入数字值'));
  }
  callback();
};

const ruleRequired = { required: true, message: '不允许为空', trigger: ['change', 'blur'] };
const ruleNumber = { validator: isValidNumber, trigger: ['change', 'blur'] };

export {
  ruleRequired,
  ruleNumber
};
