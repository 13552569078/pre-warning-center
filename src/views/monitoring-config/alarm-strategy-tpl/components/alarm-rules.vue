<template>
  <hl-panel radius="0px" borderless padding="var(--lg)" body-padding="var(--xxl)" body-class="display-flex items-left items-top flex-row content p-l-lg p-r-lg p-b-lg" footer-style>
    <template #header>
      <panel-header title="预警规则"></panel-header>
    </template>
    <template #default>
      <div class="rule-list">
        <collapse-section v-for="(ruleData, idx) in rulesData" :key="ruleData.id" :title="ruleData.ruleName || `规则${idx + 1}`" @del="delRule(ruleData.id)" :show-delete="(rulesData.length && (ruleData.isNew || action === 'add')) || associated === 'un_relation'" style="background: var(--bg-content)" :border-title="false" class="form-size">
          <template #default="{ isOpen }">
            <div v-show="isOpen" class="m-t-xs">
              <hl-form :ref="addFormRef" :model="ruleData" :rules="rules" gap="var(--lg)" item-gap="var(--lg2)" class="form-size">
                <hl-group gap="var(--lg2)">
                  <hl-form-item label="规则名称" prop="ruleName" class="col-span-2">
                  <hl-input style="min-width: 600px" v-model="ruleData.ruleName" placeholder="请输入" maxlength="20" show-word-limit />
                </hl-form-item>
                <hl-form-item label="预警等级" prop="ruleLevel" class="col-span-2">
                  <hl-select style="min-width: 600px" v-model="ruleData.ruleLevel" placeholder="请选择预警等级" filterable clearable>
                    <hl-option v-for="item in alarmLevelsComp" :key="item.dictCode" :label="item.dictName" :value="item.dictCode" :disabled="item.disabled" />
                  </hl-select>
                </hl-form-item>
                </hl-group>
                <hl-form-item label="描述" prop="ruleDesc" class="col-span-2">
                  <hl-input style="min-width: 600px" v-model="ruleData.ruleDesc" native-type="textarea" placeholder="请输入" maxlength="500" show-word-limit />
                </hl-form-item>
                <hl-form-item label="预警标题生成规则" prop="alarmTitle" class="col-span-2 is-required">
                  <hl-group dir="vertical" gap="var(--sm)">
                    <hl-input style="max-width: 600px" v-model="ruleData.alarmTitle" placeholder="请输入" maxlength="100" native-type="textarea" show-word-limit />
                    <div class="text-secondary" style="min-width: 600px">
                      {{ STATERAGY_TITLE_DES }}
                    </div>
                  </hl-group>
                </hl-form-item>
                <hl-form-item label="预警描述生成规则" prop="alarmDesc" class="col-span-2 is-required">
                  <hl-group dir="vertical" gap="var(--sm)">
                    <hl-input style="max-width: 600px" v-model="ruleData.alarmDesc" placeholder="请输入" maxlength="200" native-type="textarea" show-word-limit />
                    <div class="text-secondary" style="min-width: 600px">
                      {{ STATERAGY_RULE_DES }}
                    </div>
                  </hl-group>
                </hl-form-item>
                <hl-form-item label="监测指标" prop="strategyRuleFactorParams" class="col-span-2">
                  <collapse-section v-for="(factor, factorInx) in ruleData.strategyRuleFactorParams" :key="factor.targetId + factor.factorDataTypeCode" :show-delete="factor.isNew || action === 'add' || associated === 'un_relation'" class="rule-factor w-full m-b-xm m-l-lg" style="width: calc(100% - 20px) !important;" :title="factor.targetName" @del="delIndicators(ruleData.strategyRuleFactorParams, factorInx, idx)" :border-title="true">
                    <template #title>
                      <span class="m-r-xxl">{{ factor.targetName }}</span>
                      <hl-tag type="primary">
                        {{ RULE_TYPE_NAMES[factor.factorDataTypeCode] }}
                      </hl-tag>
                      <!-- 回显指标周期 -->
                      <span class="m-l-xxl">
                        {{ factor.targetFrequency > 0 ? `周期计算: ${getIntervalTime(factor)}${getUnit(factor.targetFrequencyUnit)}` : '实时计算' }}
                      </span>
                      <!-- 回显单位 -->
                      <span class="m-l-xxl"> 单位：{{ factor?.measureUnitName }} </span>
                    </template>
                    <template #default="{ isOpen: isRuleOpen }">
                      <div v-show="isRuleOpen" class="p-lg rule-item">
                        <!-- 区间型 -->
                        <template v-if="factor.factorDataTypeCode === RULE_TYPE_INTERZONE">
                          <hl-group v-for="(item, itemIdx) in factor.factorValue" :key="item.id" align="w-full items-between m-b-lg items-middle">
                            <hl-group align="items-middle">
                              <hl-group align="items-middle">
                                <span class="m-r-sm">{{ item.lowKey }}</span>
                                <hl-select v-model="item.lowExpression" placeholder="请选择" class="w-sm m-r-sm" filterable clearable>
                                  <hl-option v-for="ep in EXPRESSIONS" :key="ep.key" :value="ep.key" :label="ep.label" />
                                </hl-select>
                                <hl-select v-if="item.lowExpression!== 'none'" v-model="item.lowValue" placeholder="请选择" class="w-md m-r-xxs" filterable clearable>
                                  <hl-option v-for="dict in factor.thresholdLevelVOList" :key="dict.thresholdLevelId" :value="dict.thresholdLevelId" :label="`${dict.thresholdLevelName}(${dict.thresholdLevelValue})`" />
                                </hl-select>
                              </hl-group>
                              <hl-group align="items-middle" class="m-l-xxl">
                                <span class="m-r-sm">{{ item.upKey }}</span>
                                <hl-select v-model="item.upExpression" placeholder="请选择" class="w-sm m-r-sm" filterable clearable>
                                  <hl-option v-for="ep in EXPRESSIONS" :key="ep.key" :value="ep.key" :label="ep.label" />
                                </hl-select>
                                <hl-select v-if="item.upExpression!== 'none'" v-model="item.upValue" placeholder="请选择" class="w-md m-r-xxs" filterable clearable>
                                  <hl-option v-for="dict in factor.thresholdLevelVOList" :key="dict.thresholdLevelId" :value="dict.thresholdLevelId" :label="`${dict.thresholdLevelName}(${dict.thresholdLevelValue})`" />
                                </hl-select>
                              </hl-group>
                            </hl-group>
                            <hl-group align="items-middle">
                              <hl-icon type="danger" class="cursor-pointer m-l-md" @click="delRuleFactor(factor.factorValue, itemIdx)" v-if="factor.factorValue.length > 1">
                                <FillCircleMinus></FillCircleMinus>
                              </hl-icon>
                            </hl-group>
                          </hl-group>
                        </template>
                        <!-- 开关型 -->
                        <template v-else-if="factor.factorDataTypeCode === RULE_TYPE_SWITCH">
                          <hl-group dir="vertical" gap="var(--md)" class="p-lg" style="background: var(--factor-bg-color)">
                            <hl-group align="items-middle items-left">
                              <span style="width: 80px">指标值：</span>
                              <span class="m-l-md">等于</span>
                              <hl-switch v-model="factor.factorValue" class="m-l-md" :active-value="1" :inactive-value="0" />
                            </hl-group>
                          </hl-group>
                        </template>
                        <hl-group class="radius-lg w-full cursor-pointer m-t-md block" style="padding-top: 6px; padding-bottom: 6px" align="items-center items-middle" gap="var(--xxs)" v-if="![RULE_TYPE_SWITCH].includes(factor.factorDataTypeCode) && factor.factorValue.length < 10">
                          <hl-icon size="xs" class="static" type="primary"> <TwoPlus></TwoPlus> </hl-icon><span class="text-primary" @click="addRuleFactor(factor.factorDataTypeCode, factor.factorValue)">添加阈值范围</span>
                        </hl-group>
                      </div>
                    </template>
                  </collapse-section>
                  <add-new-item title="添加监测指标" style="width: calc(100% - 20px); margin-left: 20px;" @click="addIndicators(idx)"/>
                </hl-form-item>
                <hl-form-item label="所选指标计算周期" prop="condition" class="col-span-2" v-if="triggerType === 'TRIGGER_CYCLE'">
                  <template #label>
                    <hl-group style="width: 100%" align="items-middle">
                      <span>所选指标计算周期</span>
                    </hl-group>
                  </template>
                  <hl-group dir="vertical">
                    <span class="font-bold">{{ getTimtUnit(ruleData.leastCommonMultiple) }}</span>
                    <span class="text-secondary m-t-sm" style="font-weight: normal">注：“所选指标计算周期”为所有已选择指标计算周期的最小公倍数，如果所选全部为实时指标，则显示 2 分钟。</span>
                  </hl-group>
                </hl-form-item>
                <hl-form-item v-if="ruleData.strategyRuleFactorParams.length > 1" label="指标逻辑关系" prop="condition" class="col-span-2">
                  <hl-radio-group v-model="ruleData.ruleLogicRelationship" gap-x="var(--xl)" gap="var(--md)" custom>
                    <hl-radio :label="1">
                      <div class="p-xs p-l-lg p-r-lg border radius-lg checked:bg-primary-light-5 checked:border-primary checked:text-primary">与</div>
                    </hl-radio>
                    <hl-radio :label="2">
                      <div class="p-xs p-l-lg p-r-lg border radius-lg checked:bg-primary-light-5 checked:border-primary checked:text-primary">或</div>
                    </hl-radio>
                  </hl-radio-group>
                </hl-form-item>
                <hl-form-item label="预警条件" prop="alarmCondition" class="top-center is-required col-span-2 m-b-md">
                  <hl-radio-group v-model="ruleData.alarmCondition.conditionType" gap="var(--xl)" dir="vertical" class="m-t-sm" @change="conditionTypeChange(ruleData.alarmCondition)">
                    <hl-radio :label="1"> 无附加条件 </hl-radio>
                    <hl-radio :label="2">
                      连续次数
                      <hl-group merge indent>
                        <hl-input v-model="ruleData.alarmCondition.lastTimes" :disabled="ruleData.alarmCondition.conditionType !== 2" class="m-l-md w-xs" />
                        <hl-group class="border border-dark radius-md bg-light p-x-xs static" align="items-middle">次 </hl-group>
                      </hl-group>
                    </hl-radio>
                    <hl-radio :label="3" v-if="triggerType === 'TRIGGER_CYCLE'">
                      累计次数
                      <hl-group :disabled="ruleData.alarmCondition.conditionType !== 3" merge indent>
                        <hl-group class="static m-r-md m-l-md" align="items-middle">计算周期:</hl-group>
                        <hl-input v-model="ruleData.alarmCondition.cycle" class="w-xs" />
                        <hl-group class="border border-dark radius-md bg-light p-x-xs static" align="items-middle">个 </hl-group>
                        <hl-input v-model="ruleData.alarmCondition.totalTimes" class="m-l-md w-xs" />
                        <hl-group class="border border-dark radius-md bg-light p-x-xs static" align="items-middle">次 </hl-group>
                      </hl-group>
                    </hl-radio>
                  </hl-radio-group>
                </hl-form-item>
              </hl-form>
            </div>
          </template>
        </collapse-section>
        <add-new-item title="新增规则" @click="addRule" style="width: 1220px;" v-if="$props.eventTypeCode" />
        <div v-else style="text-align: center">请先选择基本信息中的风险分类</div>
        <add-dialog v-if="indicatorsVisiable" @cancel="cancel" @indicatorsOk="indicatorsOk" :checked-ids="checkedIds" :triggerType="triggerType"> </add-dialog>
      </div>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref, PropType, watch, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { cloneDeep, omit } from 'lodash-es';
import { CommonUtils } from 'fx-front-utils';
import { FormInstance } from 'hongluan-ui';
import { apiDictObj as dictApi } from '@/apis/modules/dict-api';
import { eventTypeApiObj as eventTypeApi } from '@/apis/modules/event-type-api';
import { AddNewItem, CollapseSection } from '@/components';
import { RULE_TYPE_NAMES, EXPRESSIONS, RULE_TYPE_INTERZONE, RULE_TYPE_SWITCH, RULE_TYPE_CONTAIN, RULE_TYPE_IN, isPositiveInt, UNIT_TIME_LIST, isValidAlarmTitle, isValidAlarmDesc } from '@/common';
import { apiMonitorStrategyObj } from '@/apis/modules/monitor-strategy/fixed-cycle';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { STATERAGY_TITLE_DES, STATERAGY_RULE_DES } from '@/views/monitoring-config/second-trigger-config/utils';
import { createNewRule, createIndicators, createContainInItem, createInterzoneItem } from './utils';
import addDialog from './add-indicators.vue';

type StrategyRuleVOS = Pick<any, 'strategyRuleVOS'>['strategyRuleVOS'];

const props = defineProps({
  eventTypeCode: String,
  alarmRulesData: {
    type: Array as PropType<StrategyRuleVOS>,
    default: () => []
  },
  triggerType: {
    type: String,
    default: 'TRIGGER_CYCLE'
  }
});
const route = useRoute();

const action = computed(() => route.query.action);
const associated = computed(() => route.query.associated);

const alarmLevelsComp = computed(() => {
  const ids = rulesData.value.map((item: any) => {
    return item.ruleLevel;
  });
  return alarmLevels.value.map((item: IgetListDictCustomVOsDictSpace.Data) => {
    // 已选择不可选
    return {
      ...item,
      disabled: ids.includes(item.dictCode)
    };
  });
});

const ruleFormRefs: FormInstance[] = [];
const indicatorsVisiable = ref(false);
const rulesData = ref<any[]>([]);
const rulesIndex = ref();
const checkedIds = ref<string[]>([]);
const allAlarmLevels = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const alarmLevels = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const frequencyUnits = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);

const addFormRef = (el: any) => {
  el && !ruleFormRefs.includes(el) && ruleFormRefs.push(el);
};

// 新增规则
const addRule = () => {
  rulesData.value.push(createNewRule());
};
const delRule = (id: string) => {
  rulesData.value.splice(
    rulesData.value.findIndex(d => (d as any).id === id),
    1
  );
};
// 新增指标
const addIndicators = (index: number) => {
  rulesIndex.value = index;
  indicatorsVisiable.value = true;
  // 选择指标回显 及 展开
  checkedIds.value = rulesData.value[rulesIndex.value].strategyRuleFactorParams.map((item: any) => {
    return item.targetId;
  });
};
const delIndicators = async (data: StrategyRuleVOS, index: number, idx: number) => {
  rulesIndex.value = idx;
  data.splice(index, 1);
  const targetIdS = rulesData.value[rulesIndex.value].strategyRuleFactorParams.map((item: Record<string, string>) => {
    return item.targetId;
  });
  const leastCommonMultiple = await getLeastCommonMultiple(targetIdS);
  rulesData.value[rulesIndex.value].leastCommonMultiple = leastCommonMultiple;
};
const cancel = () => {
  indicatorsVisiable.value = false;
};
const indicatorsOk = async (list: any[]) => {
  rulesData.value[rulesIndex.value].strategyRuleFactorParams = [...rulesData.value[rulesIndex.value].strategyRuleFactorParams, ...createIndicators(list)];
  const targetIdS = rulesData.value[rulesIndex.value].strategyRuleFactorParams.map((item: Record<string, string>) => {
    return item.targetId;
  });
  const leastCommonMultiple = await getLeastCommonMultiple(targetIdS);
  rulesData.value[rulesIndex.value].leastCommonMultiple = leastCommonMultiple;
  cancel();
};
// 新增指标 小项
const addRuleFactor = (type: string, factors: unknown[]) => {
  switch (type) {
    case RULE_TYPE_CONTAIN:
    case RULE_TYPE_IN:
      factors.push(createContainInItem());
      break;
    case RULE_TYPE_INTERZONE:
      factors.push(createInterzoneItem());
      break;
  }
  validate();
};
const delRuleFactor = (factors: unknown[], idx: number) => {
  factors.splice(idx, 1);
  validate();
};

const conditionTypeChange = (data: any) => {
  // 清空其他预警条件数据
  data.lastTimes = '';
  data.totalTimes = '';
  data.cycle = '';
};
const validate = async () => {
  for (let i = 0; i < ruleFormRefs.length; i++) {
    // 需要catch错误信息
    // await ruleFormRefs[i].validate()
    await ruleFormRefs[i].validate();
  }
};
const getResult = () => {
  if (!rulesData.value.length) {
    // 验证报警规则不为空
    return false;
  }
  const result = cloneDeep(rulesData.value);
  return result.map((r: any) => ({
    ...omit(r, 'strategyRuleFactorParams', 'id', 'isNew', 'alarmCondition'),
    ...r.alarmCondition,
    totalDurationUnit: r.alarmCondition.conditionType === 3 ? 'SECOND' : '',
    totalDuration: r.alarmCondition.conditionType === 3 ? r.alarmCondition.cycle * r.leastCommonMultiple : '',
    alarmTitle: r.alarmTitle,
    alarmDesc: r.alarmDesc,
    strategyRuleFactorParams: r.strategyRuleFactorParams.map(s => ({
      targetId: s.targetId,
      factorId: s.factorId,
      factorValue: JSON.stringify(Array.isArray(s.factorValue) ? s.factorValue.map(fv => omit(fv, 'id')) : s.factorValue)
    }))
  }));
};

watch(
  () => props.alarmRulesData,
  () => {
    if (props.alarmRulesData.length) {
      rulesData.value = cloneDeep(props.alarmRulesData);
      rulesData.value.forEach(async (rd, idx) => {
        const leastCommonMultiple = rd.targetFrequencyCycle;
        rd.leastCommonMultiple = leastCommonMultiple;
        // 计算周期回显
        rd.alarmCondition.cycle = rd.alarmCondition.conditionType === 3 ? rd.alarmCondition.totalDuration / leastCommonMultiple : '';
        rd.strategyRuleFactorParams.forEach(sr => {
          sr.isNew = false;
          sr.factorValue = JSON.parse(sr.factorValue);
          if (Array.isArray(sr.factorValue)) {
            sr.factorValue.forEach(fv => {
              fv.id = CommonUtils.random();
            });
          }
        });
        Object.assign(rd, { id: CommonUtils.random(), isNew: false });
      });
    }
  },
  {
    immediate: true,
    deep: true
  }
);
// 风险分类 用于获取风险等级
watch(
  () => props.eventTypeCode,
  async (n, o) => {
    if (n) {
      if (!allAlarmLevels.value.length) {
        const result = await dictApi.list('ALARM_LEVEL_CODE');
        allAlarmLevels.value = result.data;
      }
      // 获取风险等级
      await loadAlarmLevels(n);
      const inLevels = alarmLevels.value.map((item: any) => {
        return item.dictCode;
      });
      // 编辑 风险类型不可编辑
      if (action.value !== 'edit') {
        // 每次eventcode 变更风险等级 置空  解决填写预警规则后 再次变更风险分类/  inLevels解决 模板选择
        rulesData.value.forEach(rd => {
          if (!inLevels.includes(rd.ruleLevel)) {
            rd.ruleLevel = '';
          }
        });
      }
    }
  },
  {
    immediate: true,
    deep: true
  }
);
// 周期触发 切换预警规则 需要重置  编辑则不会更改类型
watch(
  () => props.triggerType,
  async (n, o) => {
    if (action.value !== 'edit') {
      rulesData.value = [];
    }
  }
);

// 获取预警等级 根据风险分类
const loadAlarmLevels = async (eventTypeCode: string) => {
  const result = await eventTypeApi.detail(eventTypeCode);
  alarmLevels.value = allAlarmLevels.value.filter(a => result.data.alarmLevelTypeList.includes(a.dictCode));
  return result.data; // 解决模板选择 风险等级清空问题
};

const initData = async () => {
  const units = await dictApi.list('MONITOR_FREQUENCY_UNIT');
  frequencyUnits.value = units.data;
  frequencyUnits.value = units.data.filter(item => {
    return UNIT_TIME_LIST.includes(item.dictCode);
  });
};
initData();

const rules = {
  ruleName: [{ required: true, message: '规则名称不能为空' }],
  ruleLevel: [{ required: true, message: '请选择预警等级' }],
  ruleLogicRelationship: [{ required: true, message: '请选择预警指标逻辑关系' }],
  alarmTitle: [
    { required: true, message: '预警标题生成规则不能为空' },
    { validator: isValidAlarmTitle, trigger: ['change', 'blur'] }
  ],
  alarmDesc: [
    { required: true, message: '预警描述生成规则不能为空' },
    { validator: isValidAlarmDesc, trigger: ['change', 'blur'] }
  ],
  strategyRuleFactorParams: [
    {
      required: true,
      validator: (_: any, value: any[], callback: (err?: Error) => void) => {
        if (!value.length) callback(new Error('指标不允许为空'));
        if (value.length > 10) {
          callback(new Error('阈值最多为10条'));
        }
        let isValid = true;
        value.forEach(v => {
          switch (v.factorDataTypeCode) {
            case RULE_TYPE_INTERZONE:
              (v.factorValue as any).forEach((fv: any) => {
                if (fv.lowExpression === 'none' || fv.upExpression === 'none') {
                  if (fv.lowExpression === 'none' && fv.upExpression === 'none') {
                    isValid = true;
                  }
                  if (fv.lowExpression === 'none' && fv.upExpression !== 'none' && !fv.upValue) {
                    callback(new Error(`请填写${v.targetName}信息`));
                    isValid = false;
                  }
                  if (fv.upExpression === 'none' && fv.lowExpression !== 'none' && !fv.lowValue) {
                    callback(new Error(`请填写${v.targetName}信息`));
                    isValid = false;
                  }
                } else {
                  if (!fv.lowExpression || !fv.lowValue || !fv.upExpression || !fv.upValue) {
                    callback(new Error(`请填写${v.targetName}信息`));
                    isValid = false;
                  }
                }
              });
              break;
            case RULE_TYPE_IN:
            case RULE_TYPE_CONTAIN:
              (v.factorValue as any).forEach((fv: any) => {
                if (!fv.value) {
                  callback(new Error(`请填写${v.targetName}信息`));
                  isValid = false;
                }
              });
              break;
            // case RULE_TYPE_SWITCH:
            //   if (!v.factorValue.accessoryId) {
            //     callback(new Error(`请填写${v.targetName}信息`));
            //     isValid = false;
            //   }
            //   break;
          }
        });
        if (isValid) callback();
      }
    }
  ],
  alarmCondition: [
    {
      validator: (_: any, value: any, callback: any) => {
        if (value.conditionType === 1) {
          callback();
        } else if (value.conditionType === 2) {
          if (!isPositiveInt(+value.lastTimes)) {
            callback(new Error('请填写连续次数，格式为正整数'));
          } else {
            callback();
          }
        } else if (value.conditionType === 3) {
          // if (!value.totalDurationUnit) {
          //   callback(new Error('请选择单位'));
          // } else if (
          //   !isPositiveInt(+value.totalDuration)
          // ) {
          //   callback(new Error('请填写时间，格式为正整数'));
          // }
          if (!isPositiveInt(+value.cycle)) {
            callback(new Error('请填写计算周期，格式为正整数'));
          } else if (!isPositiveInt(+value.totalTimes)) {
            callback(new Error('请填写次数，格式为正整数'));
          } else if (+value.cycle < +value.totalTimes) {
            callback(new Error('计算周期不能小于累计次数'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      }
    }
  ]
};
//  周期计算
const getUnit = (type: string) => {
  const list = frequencyUnits.value.filter((item: IgetListDictCustomVOsDictSpace.Data) => {
    return item.dictCode === type;
  });
  if (list && list.length) {
    return list[0].dictName;
  } else {
    return '';
  }
};

// 公倍数 转换单位 后台默认全部为秒
const getTimtUnit = (second: number) => {
  if (!second) {
    return '暂无配置指标';
  }
  if (second % (60 * 60 * 24) === 0) {
    return second / (60 * 60 * 24) + '天';
  } else if (second % (60 * 60) === 0) {
    return second / (60 * 60) + '小时';
  } else if (second % 60 === 0) {
    return second / 60 + '分钟';
  } else {
    return second + '秒';
  }
};
const getIntervalTime = (data: any) => {
  if (data.targetFrequencyUnit === 'MINUTE') return +data.targetFrequency / 60;
  if (data.targetFrequencyUnit === 'HOUR') return +data.targetFrequency / 60 / 60;
  if (data.targetFrequencyUnit === 'DAY') return +data.targetFrequency / 60 / 60 / 24;
  return 0;
};
// 获取公倍数
const getLeastCommonMultiple = async (ids: string[]) => {
  if (!ids.length) {
    return 0;
  }
  const result = await apiMonitorStrategyObj.getFindTargetFrequencyCommonMultiple(ids);
  return result.data;
};

defineExpose({
  validate,
  getResult
});
</script>
<style lang="scss" scoped>
.rule-list {
  // --collapse-bg-color: var(--bg-content);
  --collapse-border-color: var(--factor-bg-color);
  // width: calc(var(--xxl) * 29 + var(--xl) + 2 * var(--lg));
  margin-bottom: var(--xl);
  width: 100%;

  .rule-item {
    background: var(--factor-bg-color);
  }

  .hl-form-item {
    :deep(.form-label) {
      display: inline-block;
    }
  }
}
</style>
