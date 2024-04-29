import { CommonUtils } from 'fx-front-utils';
import { RULE_TYPE_INTERZONE, RULE_TYPE_SWITCH, RULE_TYPE_CONTAIN, RULE_TYPE_IN } from '@/common';
import { STATERAGY_TITLE_DEFAULT, STATERAGY_RULE_DEFAULT } from '@/views/monitoring-config/second-trigger-config/utils';

const { random } = CommonUtils;

// 预警规则
// 区间型
export const createInterzoneItem = () => ({
  isNew: true,
  id: random(),
  upKey: '上区间',
  upExpression: '',
  upValue: '',
  lowKey: '下区间',
  lowExpression: '',
  lowValue: '',
});
// 包含 被包含
export const createContainInItem = () => ({ value: '', id: random(), isNew: true, });

// 新增指标
export const createIndicators = (list: any[]) => {
  const resultlist: any[] = [];
  list.forEach(item => {
    // 需增加单位字段
    const factor = {
      isNew: true,
      targetId: item.id,
      targetName: item.targetTypeName,
      factorDataTypeCode: item.factorDataTypeCode,
      factorValue: '' as any,
      targetFrequency: item.targetFrequency, // 周期 最小公倍数处理
      targetFrequencyUnit: item.targetFrequencyUnit,
      leastCommonMultiple: '' as any,
    };
    if (item.factorDataTypeCode === RULE_TYPE_INTERZONE) {
      factor.factorValue = [createInterzoneItem()];
    } else if (item.factorDataTypeCode === RULE_TYPE_SWITCH) {
      // 开关
      factor.factorValue = 0;
    } else if (item.factorDataTypeCode === RULE_TYPE_IN || factor.factorDataTypeCode === RULE_TYPE_CONTAIN) {
      factor.factorValue = [createContainInItem()];
    }
    resultlist.push(factor);
  });
  return resultlist;
};

// 新增规则
// alarmTitle: '$监测点名称+\'发生\'+$风险分类名称+$规则名称',
// alarmDesc: '$监测主体名称+\'于\'+$预警开始时间+\'，在\'+监测点名称+\'发生\'+$风险分类名称+$规则名称+\'，\'+$附加标识+\'。\'',
export const createNewRule = () => {
  const item = JSON.parse(JSON.stringify({
    ruleName: '',
    ruleLevel: '',
    ruleDesc: '',
    alarmTitle: STATERAGY_TITLE_DEFAULT,
    alarmDesc: STATERAGY_RULE_DEFAULT,
    strategyCalculateFrequencyCorn: '',
    warningRuleModel: ''
  }));
  item.id = random();
  item.isNew = true;
  return item;
};

// 预警方式utils
export const modeFormData = {
  clearType: 1, // 消警方式
  alarmInterval: 1, // 预警间隔
  intervalTime: '', // 预警间隔value
  intervalTimeUnit: '', // 预警间隔 单位
};
