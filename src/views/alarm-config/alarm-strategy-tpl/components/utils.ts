import { CommonUtils } from 'fx-front-utils';
const { random } = CommonUtils;

// 区间型数据新增
export const createInterzoneItem = () => {
  return JSON.parse(JSON.stringify({
    isNew: true,
    id: random(),
    upKey: '上区间',
    upExpression: '',
    upValue: '',
    lowKey: '下区间',
    lowExpression: '',
    lowValue: '',
  }));
};

// 新增规则
export const createNewRule = () => {
  const item = JSON.parse(JSON.stringify({
    isNew: true,
    id: random(),
    ruleName: '',
    ruleLevel: '',
    ruleDesc: '',
    strategyRuleFactorParams: [createInterzoneItem()], // 区间型阈值
  }));
  item.id = random();
  item.isNew = true;
  return item;
};
