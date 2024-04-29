<template>
  <basic-info ref="basicInfoRef" :basic-info-data="basicInfoData" @strategyTypeChange="strategyTypeChange" @eventTypeCodeChange="eventTypeCodeChange" @getDetail="getDetails" class="m-b-lg" />
  <alarm-rules ref="alarmRulesRef" :alarm-rules-data="alarmRulesData" :event-type-code="eventTypeCode" class="m-b-lg" :trigger-type="triggerType" />
  <alarm-config class="m-t-lg" ref="AlarmConfigRef" :detail="AlarmConfigData"></alarm-config>
  <warning-cancel ref="WarningCancelRef" class="m-t-lg m-b-lg" :detail="warningCancelData"></warning-cancel>
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
import { computed, onMounted, ref, inject, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { pick } from 'lodash-es';
import { Indexable } from 'hongluan-ui/es/utils';
import { HlMessage } from 'hongluan-ui';
import { AlarmRules, AlarmConfig } from '@/views/monitoring-config/alarm-strategy-tpl/components';
import { apiMonitorStrategyObj } from '@/apis/modules/monitor-strategy/fixed-cycle';
import { getSecondsToUnitTime } from '@/common';
import { IgetFindMonitorStrategyVersionDetailSpace } from '@/apis/modules/monitor-strategy/fixed-cycle/model';
import { getUnitTimes } from '@/views/monitoring-config/data-trigger-config/utils';
import { WarningCancel } from '@/views/monitoring-config/data-trigger-config/components/index';
import BasicInfo from './components/basic-info.vue';

defineProps({
  id: {
    type: String
  }
});

const reload: any = inject('reload');
const router = useRouter();
const route = useRoute();

const eventTypeCode = ref();

const basicInfoRef = ref();
const alarmRulesRef = ref();
const AlarmConfigRef = ref();
const WarningCancelRef = ref();

const basicInfoData = ref<Record<string, any>>({});
const alarmRulesData = ref<any[]>([]);
const alarmRuleValue = ref<Record<string, any>>({});
const warningCancelData = ref<Indexable<any>>({});
const AlarmConfigData = ref<Indexable<any>>({});

const action = computed(() => route.query.action);
const strategyId = computed(() => route.query.id);
const versionId = computed(() => route.query.versionId); // 版本
const associated = computed(() => route.query.associated); // 关联与否

const saveStrategy = async () => {
  await Promise.all([basicInfoRef.value.validate(), alarmRulesRef.value.validate(), AlarmConfigRef.value.validate(), WarningCancelRef.value.validate()]);
  // 验证报警规则不为空
  if (!alarmRulesRef.value.getResult()) {
    HlMessage({
      message: '请填写预警规则!'
    });
    return false;
  }
  // 处理新增选择模板 ruleId不为空得情况
  const strategyRuleParams = basicInfoRef.value.templateFlag
    ? alarmRulesRef.value.getResult().map((item: any) => {
      return {
        ...item,
        ruleId: ''
      };
    })
    : alarmRulesRef.value.getResult();
  // 组装传值数据
  const result = {
    ...basicInfoRef.value.getResult(),
    strategyRuleParams: strategyRuleParams,
    ...AlarmConfigRef.value.getResult(), // 策略设置
    ...WarningCancelRef.value.getResult() // 消警
  };
  if (!strategyId.value) {
    // 新增策略
    await apiMonitorStrategyObj.postAddMonitorStrategy(result);
  } else {
    // 修改策略
    await apiMonitorStrategyObj.postModifyMonitorStrategy(result);
  }
  router.go(-1);
};

const triggerType = ref('TRIGGER_CYCLE');
const strategyTypeChange = (val: string) => {
  triggerType.value = val;
};
const eventTypeCodeChange = (id: string) => {
  eventTypeCode.value = id;
};
const getDetails = async (id: string) => {
  // !id 解决模板 清空选择 重新赋值，刷新本页面恢复初始值
  if (!id) {
    reload();
    return;
  }
  const { data } = await apiMonitorStrategyObj.getFindMonitorStrategyVersionDetail(versionId.value as string, id);
  eventTypeCode.value = data.eventTypeCode;
  alarmRuleValue.value = {
    alarmInterval: !data.intervalTimeUnit ? 1 : 2, // 没有间隔单位 则无间隔1 否则2间隔一定时间预警
    intervalTime: getSecondsToUnitTime(data, 'intervalTimeUnit', 'intervalTime'), // 预警间隔value
    ...pick(data, 'clearType', 'intervalTimeUnit')
  };
  triggerType.value = data.triggerType;
  basicInfoData.value = {
    monitorStrategyId: strategyId.value as string,
    ...pick(data, 'strategyName', 'eventTypeCode', 'facilityType', 'strategyDesc', 'triggerType'),
    silentConfigParams: data.silentConfigVOS
  };
  // 预警规则 指标
  data.strategyRuleVOS.forEach((item: any) => {
    alarmRulesData.value.push({
      ...pick(item, 'ruleId', 'ruleLevel', 'ruleName', 'ruleDesc', 'ruleLogicRelationship', 'targetFrequencyCycle', 'ruleCode', 'alarmDesc', 'alarmTitle'),
      strategyRuleFactorParams: item.strategyRuleFactorVOS,
      alarmCondition: {
        conditionType: item.conditionType,
        lastTimes: item.lastTimes,
        totalTimes: item.totalTimes,
        totalDuration: getSecondsToUnitTime(item, 'totalDurationUnit', 'totalDuration'),
        totalDurationUnit: item.totalDurationUnit
      }
    });
  });
  // 策略设置
  getAlarmConfigData(data);
  // 消警方式
  getWarningCancelData(data);
};

const getWarningCancelData = (data: IgetFindMonitorStrategyVersionDetailSpace.Data) => {
  warningCancelData.value = {
    ...pick(data, 'clearType', 'clearTypeUnit', 'clearTypeValue'),
    clearTypeInterval: data.clearType === 3 ? data.clearTypeInterval : data.clearTypeInterval / getUnitTimes(data.clearTypeUnit)
  };
};
const getAlarmConfigData = (data: IgetFindMonitorStrategyVersionDetailSpace.Data) => {
  if (!data.intervalTime) {
    AlarmConfigData.value = {
      isReuseData: data?.isReuseData,
      intervalTime: '',
      intervalTimeUnit: ''
    };
  } else {
    AlarmConfigData.value = {
      ...pick(data, 'intervalTime', 'intervalTimeUnit'),
      isReuseData: data?.isReuseData,
      intervalTime: data.intervalTime / getUnitTimes(data.intervalTimeUnit)
    };
  }
};

onMounted(async () => {
  // strategyId获取策略详情
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
