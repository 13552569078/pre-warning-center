<template>
  <basic-info ref="basicInfoRef" @eventTypeCodeChange="getEventDetail" :detail="basicInfoData" @getDetail="getDetails"></basic-info>
  <warning-object ref="WarningObjectRef" @targetChanged="targetChanged" :detail="warningObjectData"></warning-object>
  <warning-rule ref="WarningRuleRef" class="m-t-lg" :event-typeCode="eventTypeCode" :alarm-levels="alarmLevels" :target="target" :detail="warningRulesData"></warning-rule>
  <warning-cancel ref="WarningCancelRef" class="m-t-lg" :detail="warningCancelData"></warning-cancel>
  <hl-affix position="bottom" :offset="0">
    <hl-group align="items-middle" class="affix-bottom w-full box-shadow-lg p-lg m-t-lg">
      <hl-button class="m-r-sm" type="primary" @click="saveStrategy">
        {{ $route.query.action === 'add' ? '确定' : '保存' }}
      </hl-button>
      <hl-button @click="$router.go(-1)">取消</hl-button>
    </hl-group>
  </hl-affix>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { apiDictObj as dictApi } from '@/apis/modules/dict-api';
import { eventTypeApiObj as eventTypeApi } from '@/apis/modules/event-type-api';
import { pick } from 'lodash-es';
import { Indexable } from 'hongluan-ui/es/utils';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { apiMonitorStrategyObj } from '@/apis/modules/monitor-strategy/fixed-cycle';
import { IgetFindMonitorStrategyVersionDetailSpace } from '@/apis/modules/monitor-strategy/fixed-cycle/model';
import { BasicInfo, WarningObject, WarningRule, WarningCancel } from '@/views/monitoring-config/data-trigger-config/components/index';
import { getUnitTimes } from '@/views/monitoring-config/data-trigger-config/utils';

/*
周期策略 数据触发策略 使用同一套后端接口 新增 编辑 删除 修改name 校验重复 详情
*/

const reload: any = inject('reload');

const router = useRouter();
const route = useRoute();

const action = computed(() => route.query.action);
const strategyId = computed(() => route.query.id);
const versionId = computed(() => route.query.versionId); // 版本

const basicInfoRef = ref();
const WarningObjectRef = ref();
const WarningRuleRef = ref();
const WarningCancelRef = ref();
const target = ref();

const eventTypeCode = ref(''); // 风险分类
const allAlarmLevels = ref<IgetListDictCustomVOsDictSpace.Data[]>([]); // 预警字典
const alarmLevels = ref<IgetListDictCustomVOsDictSpace.Data[]>([]); // 预警等级

const basicInfoData = ref<Indexable<any>>({});
const warningObjectData = ref<Indexable<any>>({});
const warningRulesData = ref<Indexable<any>>({});
const warningCancelData = ref<Indexable<any>>({});

const targetChanged = (data: Indexable<any>) => {
  target.value = data;
};
// 风险分类 预警等级
const getEventDetail = async (id: string) => {
  eventTypeCode.value = id;
  WarningRuleRef.value.formData.ruleLevel = '';
  // 模板清空 重置
  if (!id) {
    alarmLevels.value = [];
    return;
  }
  const result = await eventTypeApi.detail(id);
  alarmLevels.value = allAlarmLevels.value.filter(a => result.data.alarmLevelTypeList.includes(a.dictCode));
};
const loadAlarmLevels = async () => {
  const result = await dictApi.list('ALARM_LEVEL_CODE');
  allAlarmLevels.value = result.data;
};
const saveStrategy = async () => {
  // 统一校验表单
  await Promise.all([basicInfoRef.value.validate(), WarningObjectRef.value.validate(), WarningRuleRef.value.validate(), WarningCancelRef.value.validate()]);
  // 新增选择模板 ruleid 因为空，解决后端以新增模板编辑回填，造成的规则更新问题
  const strategyRuleParams = basicInfoRef.value.templateFlag
    ? [WarningRuleRef.value.getResult()].map((item: any) => {
        return {
          ...item,
          ruleId: ''
        };
      })
    : [WarningRuleRef.value.getResult()];
  const params = {
    ...basicInfoRef.value.getResult(), // 基本信息数据获取
    warningObject: WarningObjectRef.value.getResult(), // 预警对象
    ...WarningCancelRef.value.getResult(), // 消警
    strategyRuleParams: strategyRuleParams // 规则
  };
  action.value === 'edit' ? await apiMonitorStrategyObj.postModifyMonitorStrategy(params) : await apiMonitorStrategyObj.postAddMonitorStrategy(params);
  router.push({
    name: 'alarmStrategyConfig'
  });
};
const getDetails = async (id: string) => {
  // !id 解决模板 清空选择 重新赋值，刷新本页面恢复初始值
  if (!id) {
    reload();
    return;
  }
  const { data } = await apiMonitorStrategyObj.getFindMonitorStrategyVersionDetail(versionId.value as string, id);
  eventTypeCode.value = data.eventTypeCode;
  // 预警规则 预警等级选择
  getEventDetail(data.eventTypeCode);
  // 基础信息
  getBasicInfoData(data);
  // 预警对象
  getWarningObjectData(data);
  // 预警规则
  getWarningRulesData(data);
  // 消警规则
  getWarningCancelData(data);
};
const getBasicInfoData = (data: IgetFindMonitorStrategyVersionDetailSpace.Data) => {
  basicInfoData.value = {
    strategyType: 1,
    ...pick(data, 'monitorStrategyId', 'facilityType', 'strategyName', 'eventTypeCode', 'strategyDesc'),
    silentConfigParams: data.silentConfigVOS
  };
};
const getWarningObjectData = (data: IgetFindMonitorStrategyVersionDetailSpace.Data) => {
  warningObjectData.value = {
    regionList: data.warningObject.monitorRegions,
    targetId: data.warningObject.targetId,
    unitIds: data.warningObject.unitIds
  };
};
const getWarningRulesData = (data: IgetFindMonitorStrategyVersionDetailSpace.Data) => {
  const ruleData = data.strategyRuleVOS[0];
  const strategyRuleFactor = {
    ...ruleData.strategyRuleFactorVOS[0],
    factorValue: JSON.parse(ruleData.strategyRuleFactorVOS[0].factorValue)
  };
  // 监测指标 规则指标回显
  target.value = {
    targetTypeName: strategyRuleFactor.targetName,
    id: data.warningObject.targetId
  };
  warningRulesData.value = {
    ...pick(ruleData, 'ruleId', 'ruleCode', 'ruleLevel', 'ruleName', 'ruleDesc', 'totalDurationUnit', 'totalTimes', 'conditionType', 'alarmTitle', 'alarmDesc'),
    totalDuration: ruleData.conditionType === 1 ? '' : ruleData.totalDuration / getUnitTimes(ruleData.totalDurationUnit),
    ...pick(strategyRuleFactor.factorValue, 'value', 'accessoryId')
  };
};
const getWarningCancelData = (data: IgetFindMonitorStrategyVersionDetailSpace.Data) => {
  warningCancelData.value = {
    ...pick(data, 'clearType', 'clearTypeUnit', 'clearTypeValue'),
    clearTypeInterval: data.clearType === 3 ? data.clearTypeInterval : data.clearTypeInterval / getUnitTimes(data.clearTypeUnit)
  };
};

onMounted(async () => {
  // 获取策略详情
  strategyId.value && getDetails(strategyId.value as string);
});

// 风险分类等级 dict
loadAlarmLevels();
</script>
