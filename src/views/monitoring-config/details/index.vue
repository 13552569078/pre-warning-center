<template>
  <BaseInfo :detail="modeDetails" :version-list="versionList" :latest-version="latestVersion" @change-version="getDeatils" :source="source"></BaseInfo>
  <detail-rule :detail="ruleDetails" class="m-t-lg" :source="source" />
  <alarm-config :detail="alarmConfiglDetails" class="m-t-lg"></alarm-config>
  <!-- <warningType :detail="modeDetails" class="m-t-lg"></warningType> -->
  <!-- 消警规则 -->
  <warning-cancel :detail="modeDetails" class="m-t-lg"></warning-cancel>
  <DetailPoint v-if="source === 'strategy'" class="m-t-lg"></DetailPoint>
  <hl-affix position="bottom" :offset="0" v-if="source === 'strategy'">
    <hl-group align="items-middle" class="affix-bottom w-full box-shadow-lg p-lg">
      <hl-button @click="$router.go(-1)">返回</hl-button>
    </hl-group>
  </hl-affix>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { pick } from 'lodash-es';
import { apiMonitorStrategyObj } from '@/apis/modules/monitor-strategy/fixed-cycle';
import { IgetListMonitorStrategyVersionSpace } from '@/apis/modules/monitor-strategy/fixed-cycle/model';
import warningCancel from '@/views/monitoring-config/data-trigger-config/details/components/warning-cancel.vue';
import type { IdetailsHead, IdetailsMode } from './types';
import { BaseInfo, warningType, DetailPoint, DetailRule, AlarmConfig } from './components';

const props = defineProps({
  id: String,
  latestVersion: {
    type: String,
    default: '' // latestVersion 历史预警版本回显
  },
  source: {
    type: String,
    default: 'strategy' // 策略新窗口 详情
  },
  strategyRuleCode: {
    type: String,
    default: '' // 命中规则 历史预警
  }
});

const route = useRoute();

const headDetails = ref<IdetailsHead>();
const ruleDetails = ref<any[]>([]);
const modeDetails = ref<IdetailsMode>();
const alarmConfiglDetails = ref<IdetailsMode>();

const monitorStrategyId = computed(() => route.query.id || props.id);
const sourceFrom = computed(() => route.query.source);

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
  // 获取详情
  const { data } = await apiMonitorStrategyObj.getFindMonitorStrategyVersionDetail(latestVersion.value as string, monitorStrategyId.value as string);
  // 头部信息
  headDetails.value = {
    ...pick(data, 'eventTypeCodeName', 'strategyName', 'updatedAt', 'createdAt')
  };
  // 预警规则 ruleCode命中  预测直接取值回显
  if (props.strategyRuleCode) {
    ruleDetails.value = data.strategyRuleVOS.filter(item => {
      return item.ruleCode === props.strategyRuleCode;
    });
  } else {
    ruleDetails.value = data.strategyRuleVOS;
  }
  // 策略设置
  alarmConfiglDetails.value = {
    isReuseData: data?.isReuseData,
    ...pick(data, 'intervalTimeUnit', 'intervalTime')
  };

  // 策略模板信息
  modeDetails.value = {
    ...pick(data, 'strategyName', 'eventTypeCodeName', 'facilityTypeName', 'clearType', 'silentConfigVOS', 'updatedAt', 'createdAt', 'strategyDesc', 'intervalTimeUnit', 'intervalTime', 'clearTypeInterval', 'clearTypeValue', 'clearTypeUnit')
  };
};
onMounted(async () => {
  getDeatils();
});
</script>
