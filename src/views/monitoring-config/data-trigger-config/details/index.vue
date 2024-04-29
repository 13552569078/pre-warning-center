<template>
  <BaseInfo :detail="modeDetails" :version-list="versionList" :latest-version="latestVersion" @change-version="getDeatils" :source="source"></BaseInfo>
  <!-- 预警规则 -->
  <detail-rule :detail="ruleDetails" class="m-t-lg" :source="source" />
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
import { IgetListMonitorStrategyVersionSpace, IgetFindMonitorStrategyVersionDetailSpace } from '@/apis/modules/monitor-strategy/fixed-cycle/model';
import { BaseInfo, warningCancel, DetailPoint, DetailRule } from './components';

const props = defineProps({
  id: String,
  latestVersion: {
    type: String,
    default: '' // latestVersion 历史预警版本回显
  },
  source: {
    type: String,
    default: 'strategy' // 策略新窗口 详情
  }
});

const route = useRoute();

const ruleDetails = ref<IgetFindMonitorStrategyVersionDetailSpace.StrategyRuleVO[]>([]);
const modeDetails = ref<IgetFindMonitorStrategyVersionDetailSpace.Data>();

const monitorStrategyId = computed(() => route.query.id || props.id);

// 版本list 最新版本
const versionList = ref<IgetListMonitorStrategyVersionSpace.Data[]>([]);
const latestVersion = ref(props.latestVersion);

const getDeatils = async (version: string = '') => {
  // 版本list
  const { data: list } = await apiMonitorStrategyObj.getListMonitorStrategyVersion(monitorStrategyId.value as string);
  versionList.value = list;
  if (!props.latestVersion) {
    latestVersion.value = version || (list[0].versionId as unknown as string);
  }
  // 获取  版本 详情
  const { data } = await apiMonitorStrategyObj.getFindMonitorStrategyVersionDetail(latestVersion.value as string, monitorStrategyId.value as string);
  // 预警规则
  ruleDetails.value = data.strategyRuleVOS;
  // 策略模板信息
  modeDetails.value = data;
};

getDeatils();
</script>
