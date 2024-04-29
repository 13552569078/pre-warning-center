<template>
  <collapse-panel title="基本信息" class="m-b-md">
    <basic-info ref="basicInfoRef" class="p-400" :basic-info-data="basicInfoData" @eventTypeCodeChange="eventTypeCodeChange" @getDetail="getDetails"/>
  </collapse-panel>
  <collapse-panel title="预警规则" class="m-b-md">
    <alarm-rules ref="alarmRulesRef" class="p-300" :alarm-rules-data="alarmRulesData" :event-type-code="eventTypeCode" />
  </collapse-panel>
  <collapse-panel title="预警方式" class="m-b-md">
    <alarm-mode ref="alarmModeRef" class="p-400" :rule-value="alarmRuleValue" />
  </collapse-panel>
  <hl-affix position="bottom" :offset="0">
    <hl-group align="items-middle" class="affix-bottom w-full box-shadow-lg p-lg">
      <hl-button class="m-r-sm" type="primary" @click="saveStrategy">
        {{$route.query.action==='add'?"确定":'保存'}}
      </hl-button>
      <hl-button @click="$router.go(-1)">取消</hl-button>
    </hl-group>
  </hl-affix>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { CollapsePanel } from '@/components';
import {
  AlarmRules,
  AlarmMode,
} from '@/views/monitoring-config/alarm-strategy-tpl/components';
import BasicInfo from './components/basic-info.vue';
import { IgetFindMonitorStrategySpace } from '@/apis/modules/monitor-strategy/fixed-cycle/model';
import { apiMonitorStrategyObj } from '@/apis/modules/monitor-strategy/fixed-cycle';
import { omit, pick } from 'lodash-es';
import { Indexable } from 'fx-front-utils';

const props = defineProps({
  id: {
    type: String,
  },
});

const router = useRouter();
const route = useRoute();

const eventTypeCode = ref();

const basicInfoRef = ref();
const alarmRulesRef = ref();
const alarmModeRef = ref();
const basicInfoData = ref<Record<string, any>>({});
const alarmRulesData = ref<any[]>([]);
const alarmRuleValue = ref<Record<string, any>>({});

const action = computed(() => route.query.action);
const strategyId = computed(() => route.query.id);

const saveStrategy = async() => {
  await Promise.all([
    basicInfoRef.value.validate(),
    alarmRulesRef.value.validate(),
    alarmModeRef.value.validate(),
  ]);
  const result = {
    ...basicInfoRef.value.getResult(),
    strategyRuleParams: alarmRulesRef.value.getResult(),
    ...alarmModeRef.value.getResult(),
  };
  if (!strategyId.value) {
    await apiMonitorStrategyObj.postAddMonitorStrategy(result);
  } else {
    await apiMonitorStrategyObj.postModifyMonitorStrategy(result);
  }
  router.go(-1);
};
const eventTypeCodeChange = (id: string) => {
  eventTypeCode.value = id;
};
const getDetails = async(id:string) => {
  const { data } = await apiMonitorStrategyObj.getFindMonitorStrategy(
    id
  );
  eventTypeCode.value = data.eventTypeCode;
  alarmRuleValue.value = {
    alarmInterval: !data.intervalTimeUnit ? 1 : 2, // 没有间隔单位 则无间隔1 否则2间隔一定时间预警
    intervalTime: getIntervalTime(data), // 预警间隔value
    ...pick(data, 'clearType', 'intervalTimeUnit'),
  };
  basicInfoData.value = {
    monitorStrategyId: strategyId.value as string,
    strategyType: 1,
    ...pick(
      data,
      'strategyName',
      'eventTypeCode',
      'facilityType',
      'strategyDesc'
    ),
    silentConfigParams: data.silentConfigVOS,
  };
  // 预警规则 指标
  data.strategyRuleVOS.forEach((item: any) => {
    alarmRulesData.value.push({
      ...pick(
        item,
        'ruleId',
        'ruleLevel',
        'ruleName',
        'ruleDesc',
        'ruleLogicRelationship'
      ),
      strategyRuleFactorParams: item.strategyRuleFactorVOS,
      alarmCondition: {
        conditionType: item.conditionType,
        lastTimes: item.lastTimes,
        totalTimes: item.totalTimes,
        totalDuration: getDotalDuration(item),
        totalDurationUnit: item.totalDurationUnit,
      },
    });
  });
  // basicInfoData.value = omit(result.data, 'strategyRuleVOS');
  // alarmRulesData.value = result.data?.strategyRuleVOS ?? [];
  // alarmRuleValue.value = result.data.ruleValue;
};
const getIntervalTime = (data: IgetFindMonitorStrategySpace.Data) => {
  if (data.intervalTimeUnit === 'MINUTE') return +data.intervalTime / 60;
  if (data.intervalTimeUnit === 'HOUR') return +data.intervalTime / 60 / 60;
  if (data.intervalTimeUnit === 'DAY') return +data.intervalTime / 60 / 60 / 24;
  return 0;
};
const getDotalDuration = (data: any) => {
  if (data.totalDurationUnit === 'MINUTE') return +data.totalDuration / 60;
  if (data.totalDurationUnit === 'HOUR') return +data.totalDuration / 60 / 60;
  if (data.totalDurationUnit === 'DAY') { return +data.totalDuration / 60 / 60 / 24; }
  return 0;
};

onMounted(async() => {
  // 策略详情
  strategyId.value && getDetails(strategyId.value as string);
});
</script>
<style lang="scss" scoped>
.p-400 {
  margin-left: 20%;
}
.p-300 {
  margin-left: 10%;
}
</style>
