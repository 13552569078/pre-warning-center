import { CommonUtils } from 'fx-front-utils';
import { cloneDeep } from 'lodash-es';
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
  lowValue: ''
});
// 包含 被包含
export const createContainInItem = () => ({ value: '', id: random(), isNew: true });

// 新增指标
export const createIndicators = (list: any[]) => {
  const resultlist: any[] = [];
  list.forEach(item => {
    // 需增加单位字段
    const factor = {
      isNew: true,
      targetId: item.id,
      measureUnitName: item.measureUnitName,
      targetName: item.targetTypeName,
      factorDataTypeCode: item.factorDataTypeCode,
      factorValue: '' as any,
      targetFrequency: item.targetFrequency, // 周期 最小公倍数处理
      targetFrequencyUnit: item.targetFrequencyUnit,
      leastCommonMultiple: '' as any,
      thresholdLevelVOList: item.thresholdLevelVOList // 阈值
    };
    if (item.factorDataTypeCode === RULE_TYPE_INTERZONE) {
      // 默认N+1
      factor.factorValue = (() => {
        // const thresholdLength = item.thresholdLevelVOList.length;
        // 隐藏最大为10 根据阈值范围逻辑 仅仅展示一个 阈值
        // const fillLength = thresholdLength >= 10 ? 10 : thresholdLength + 1;
        const fillLength = 1;
        return JSON.parse(JSON.stringify(new Array(fillLength).fill({ isNew: true, id: random(), upKey: '上区间', upExpression: '', upValue: '', lowKey: '下区间', lowExpression: '', lowValue: '' })));
      })();
    } else if (item.factorDataTypeCode === RULE_TYPE_SWITCH) {
      // 开关
      factor.factorValue = Number(item.thresholdValue);
    } else if (item.factorDataTypeCode === RULE_TYPE_IN || factor.factorDataTypeCode === RULE_TYPE_CONTAIN) {
      factor.factorValue = [createContainInItem()];
    }
    resultlist.push(factor);
  });
  return resultlist;
};

// 新增规则
export const createNewRule = () => {
  const item = JSON.parse(
    JSON.stringify({
      ruleName: '',
      ruleLevel: '',
      ruleDesc: '',
      alarmTitle: STATERAGY_TITLE_DEFAULT,
      alarmDesc: STATERAGY_RULE_DEFAULT,
      strategyRuleFactorParams: [],
      ruleLogicRelationship: 1,
      // 预警条件
      alarmCondition: {
        conditionType: 1,
        totalDuration: '',
        lastTimes: '',
        totalTimes: '',
        totalDurationUnit: '',
        leastCommonMultiple: '' as any
      }
    })
  );
  item.id = random();
  item.isNew = true;
  return item;
};

// 预警方式utils
export const modeFormData = {
  clearType: 1, // 消警方式
  alarmInterval: 1, // 预警间隔
  intervalTime: '', // 预警间隔value
  intervalTimeUnit: '' // 预警间隔 单位
};
