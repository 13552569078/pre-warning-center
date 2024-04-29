<template>
  <!-- 基础信息 -->
  <base-info :detail="modeDetails" :version-list="versionList" :latest-version="latestVersion" @change-version="getDeatils" :source="source"></base-info>
  <!-- 预警对象 -->
  <warning-object :detail="modeDetails?.warningObject" class="m-t-lg" :source="source"></warning-object>
  <!--  统计项筛选条件-->
  <filter-factor :detail="modeDetails?.secondaryWarningStrategyFilterCriteriaVO" class="m-t-lg" :source="source"></filter-factor>
  <!-- 预警规则 -->
  <detail-rule :detail="ruleDetails" :filter-type="modeDetails?.secondaryWarningStrategyFilterCriteriaVO.statisticalItemsTypeList" class="m-t-lg" :source="source" />
  <!-- 消警规则 -->
  <warning-cancel :detail="modeDetails" class="m-t-lg"></warning-cancel>
  <!--  预警对象 -->
  <detail-point class="m-t-lg" v-if="source === 'strategy'"></detail-point>
  <hl-affix position="bottom" :offset="0" v-if="source === 'strategy'">
    <hl-group align="items-middle" class="affix-bottom w-full box-shadow-lg p-lg">
      <hl-button @click="$router.go(-1)">返回</hl-button>
    </hl-group>
  </hl-affix>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { apiMonitorStrategyObj } from '@/apis/modules/monitor-strategy/fixed-cycle';
import { apiSecondTriggerObj } from '@/apis/modules/monitor-strategy/second-trigger';
import { IgetListMonitorStrategyVersionSpace } from '@/apis/modules/monitor-strategy/fixed-cycle/model';
import { IgetFindMonitorStrategyVersionDetailSpace } from '@/apis/modules/monitor-strategy/second-trigger/model';
import { BaseInfo, WarningObject, FilterFactor, warningCancel, DetailPoint, DetailRule } from './components/index';

const props = defineProps({
  id: String,
  latestVersion: {
    type: String,
    default: '' // latestVersion 特定版本详情
  },
  source: {
    type: String,
    default: 'strategy' // 策略新窗口 详情 区分历史语境
  },
  strategyRuleCode: {
    type: String,
    default: '' // 命中规则 历史预警
  }
});

const route = useRoute();

const ruleDetails = ref<any[]>([]);
const modeDetails = ref<IgetFindMonitorStrategyVersionDetailSpace.Data>();
const versionList = ref<IgetListMonitorStrategyVersionSpace.Data[]>([]);
const latestVersion = ref(props.latestVersion);

const monitorStrategyId = computed(() => route.query.id || props.id);

const getDeatils = async (version: string = '') => {
  // 版本list
  const { data: list } = await apiMonitorStrategyObj.getListMonitorStrategyVersion(monitorStrategyId.value as string);
  versionList.value = list;
  if (!props.latestVersion) {
    latestVersion.value = version || (list[0].versionId as unknown as string);
  }
  // 版本详情
  const { data } = await apiSecondTriggerObj.getFindMonitorStrategyVersionDetail(latestVersion.value as string, monitorStrategyId.value as string);
  modeDetails.value = data;
  // 预警规则 ruleCode命中  历史预警模块兼容
  if (props.strategyRuleCode) {
    ruleDetails.value = data.strategyRuleVOS.filter(item => {
      return item.ruleCode === props.strategyRuleCode;
    });
  } else {
    ruleDetails.value = data.strategyRuleVOS;
  }
};

getDeatils();
</script>
