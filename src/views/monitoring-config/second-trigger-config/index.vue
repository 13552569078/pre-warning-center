<template>
  <basic-info ref="basicInfoRef" @eventTypeCodeChange="getEventDetail" :detail="basicInfoData"></basic-info>
  <warning-object ref="WarningObjectRef" :detail="warningObjectData"></warning-object>
  <filter-factor ref="FilterFactorRef" class="m-t-lg" v-model="filterType" :detail="filterFactortData"></filter-factor>
  <warning-rule ref="WarningRuleRef" class="m-t-lg" :filter-type="filterType" :event-typeCode="eventTypeCode" :alarm-levels="alarmLevels" :detail="warningRulesData"></warning-rule>
  <warning-cancel ref="WarningCancelRef" class="m-t-lg" :detail="warningCancelData"></warning-cancel>
  <hl-affix position="bottom" :offset="0">
    <hl-group align="items-middle" class="affix-bottom w-full box-shadow-lg p-lg">
      <hl-button class="m-r-sm" type="primary" @click="saveStrategy">
        {{ $route.query.action === 'add' ? '确定' : '保存' }}
      </hl-button>
      <hl-button @click="$router.go(-1)">取消</hl-button>
    </hl-group>
  </hl-affix>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { apiDictObj as dictApi } from '@/apis/modules/dict-api';
import { eventTypeApiObj as eventTypeApi } from '@/apis/modules/event-type-api';
import { pick } from 'lodash-es';
import { Indexable } from 'hongluan-ui/es/utils';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { apiSecondTriggerObj } from '@/apis/modules/monitor-strategy/second-trigger';
import { IgetFindMonitorStrategyVersionDetailSpace } from '@/apis/modules/monitor-strategy/second-trigger/model';
import { HlMessage } from 'hongluan-ui';

import { BasicInfo, WarningObject, WarningRule, WarningCancel, FilterFactor } from '@/views/monitoring-config/second-trigger-config/components/index';

const router = useRouter();
const route = useRoute();

const action = computed(() => route.query.action);
const strategyId = computed(() => route.query.id);
const versionId = computed(() => route.query.versionId); // 版本

const basicInfoRef = ref(); // 基础信息
const WarningObjectRef = ref(); // 预警对象
const FilterFactorRef = ref(); // 筛选条件
const WarningRuleRef = ref(); // 预警规则
const WarningCancelRef = ref(); // 消警规则

const eventTypeCode = ref(''); // 风险分类
const allAlarmLevels = ref<IgetListDictCustomVOsDictSpace.Data[]>([]); // 预警字典
const alarmLevels = ref<IgetListDictCustomVOsDictSpace.Data[]>([]); // 预警等级

const basicInfoData = ref<Indexable<any>>({});
const warningObjectData = ref<Indexable<any>>({});
const filterFactortData = ref<Indexable<any>>({});
const warningRulesData = ref<Indexable<any>>({});
const warningCancelData = ref<Indexable<any>>({});

const filterType = ref<number[]>([]); // 筛选

// 风险分类 预警等级
const getEventDetail = async (id: string) => {
  eventTypeCode.value = id;
  // 模板清空 重置
  if (!id) {
    alarmLevels.value = [];
    return;
  }
  const result = await eventTypeApi.detail(id);
  alarmLevels.value = allAlarmLevels.value.filter(a => result.data.alarmLevelTypeList.includes(a.dictCode));
};
const loadAlarmLevels = async () => {
  // 风险等级idct
  const result = await dictApi.list('ALARM_LEVEL_CODE');
  allAlarmLevels.value = result.data;
};
const saveStrategy = async () => {
  // 统一校验
  await Promise.all([basicInfoRef.value.validate(), WarningObjectRef.value.validate(), FilterFactorRef.value.validate(), WarningRuleRef.value.validate(), WarningCancelRef.value.validate()]);
  if (WarningRuleRef.value.isEmtyRuleList()) {
    HlMessage.warning('请配置预警规则');
    return;
  }
  const params = {
    ...basicInfoRef.value.getResult(), // 基本信息数据获取
    warningObject: WarningObjectRef.value.getResult(), // 预警对象
    strategyFilterCriteriaParam: FilterFactorRef.value.getResult(), // 筛选条件,
    strategyRuleParams: WarningRuleRef.value.getResult(), // 规则
    ...WarningCancelRef.value.getResult() // 消警
  };
  action.value === 'edit' ? await apiSecondTriggerObj.postModifyMonitorStrategy(params) : await apiSecondTriggerObj.postAddMonitorStrategy(params);
  router.push({
    name: 'alarmStrategyConfig'
  });
};
const getDetails = async (id: string) => {
  const { data } = await apiSecondTriggerObj.getFindMonitorStrategyVersionDetail(versionId.value as string, id);
  eventTypeCode.value = data.eventTypeCode;
  // 预警规则 预警等级选择
  getEventDetail(data.eventTypeCode);
  // 基础信息
  getBasicInfoData(data);
  // 预警对象
  getWarningObjectData(data);
  // 筛选项
  getFilterFactortData(data);
  // 预警规则
  getWarningRulesData(data);
  // 消警规则
  getWarningCancelData(data);
};
const getBasicInfoData = (data: IgetFindMonitorStrategyVersionDetailSpace.Data) => {
  basicInfoData.value = {
    strategyType: 1,
    ...pick(data, 'monitorStrategyId', 'facilityType', 'strategyName', 'eventTypeCode', 'strategyDesc')
  };
};
const getWarningObjectData = (data: IgetFindMonitorStrategyVersionDetailSpace.Data) => {
  warningObjectData.value = {
    regionList: data.warningObject.monitorRegions,
    eventTypeList: data.warningObject.eventTypeList.map(item => {
      return {
        ...item,
        systemCode: item.eventTypeCode
      };
    }),
  };
};
const getWarningRulesData = (data: IgetFindMonitorStrategyVersionDetailSpace.Data) => {
  const ruleData = data.strategyRuleVOS;
  warningRulesData.value = ruleData.map(item => {
    return {
      ...item,
      rateThresholdValue: JSON.parse(item.rateThresholdValue),
      warningNumberThresholdValue: JSON.parse(item.warningNumberThresholdValue)
    };
  });
};
const getWarningCancelData = (data: IgetFindMonitorStrategyVersionDetailSpace.Data) => {
  warningCancelData.value = {
    ...pick(data, 'clearType', 'clearTypeInterval', 'clearTypeValue')
  };
};
const getFilterFactortData = (data: IgetFindMonitorStrategyVersionDetailSpace.Data) => {
  filterFactortData.value = {
    ...data.secondaryWarningStrategyFilterCriteriaVO,
    statisticalItemsType: data.secondaryWarningStrategyFilterCriteriaVO.statisticalItemsTypeList
  };
};

// 获取策略详情
strategyId.value && getDetails(strategyId.value as string);
// 风险分类等级 dict
loadAlarmLevels();
</script>
