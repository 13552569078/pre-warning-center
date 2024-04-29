<template>
  <!-- 基础信息 -->
  <base-info :detail="modeDetails" :version-list="versionList" :latest-version="latestVersion"
    @change-version="getDeatils" :source="source"></base-info>
  <!-- 预警规则 -->
  <detail-rule :detail="modeDetails?.strategyRuleVOS" class="m-t-lg" :source="source" />
  <!-- 消警规则 -->
  <warning-cancel ref="WarningCancelRef" class="m-t-lg"></warning-cancel>
  <hl-affix position="bottom" :offset="0" v-if="source === 'strategy'">
    <hl-group align="items-middle" class="affix-bottom w-full box-shadow-lg p-lg">
      <hl-button @click="$router.go(-1)">返回</hl-button>
    </hl-group>
  </hl-affix>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { apiMonitorStrategyObj } from '@/apis/modules/monitor-strategy/fixed-cycle';
import { IgetListMonitorStrategyVersionSpace } from '@/apis/modules/monitor-strategy/fixed-cycle/model';
import { IgetFindMonitorStrategyVersionDetailSpace } from '@/apis/modules/advanced-strategy/model';
import { DetailRule } from './components/index';
import { BaseInfo } from '@/views/monitoring-config/second-trigger-config/details/components/index';
import { WarningCancel } from '@/views/monitoring-config/advanced-strategy-config/components/index';
import { apiAdvancedStrategyObj } from '@/apis/modules/advanced-strategy';

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
  const { data } = await apiAdvancedStrategyObj.getFindMonitorStrategyVersionDetail(latestVersion.value as string, monitorStrategyId.value as string);
  // 策略信息
  modeDetails.value = data;

  // 预警规则 ruleCode命中  预测直接取值回显
  if (props.strategyRuleCode) {
    modeDetails.value.strategyRuleVOS = data.strategyRuleVOS.filter(item => {
      return item.ruleCode === props.strategyRuleCode;
    });
  }
};

onMounted(async () => {
  getDeatils();
});
</script>
