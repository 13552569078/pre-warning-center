<template>
  <div class="h-full">
    <basic-info ref="basicInfoRef" @eventTypeCodeChange="getEventDetail" :detail="basicInfoData" strategyType="TRIGGER_SENIOR"
    class="m-b-lg"></basic-info>
    <warning-rule ref="WarningRuleRef" :alarm-levels="alarmLevels" :event-type-code="eventTypeCode" :detail="warningRulesData" class="m-b-lg" />
    <warning-cancel ref="WarningCancelRef" class="m-t-lg"></warning-cancel>
    <hl-affix position="bottom" :offset="0">
      <hl-group align="items-middle" class="affix-bottom w-full box-shadow-lg p-lg">
        <hl-button class="m-r-sm" type="primary" @click="saveStrategy">
          {{ $route.query.action === 'add' ? '确定' : '保存' }}
        </hl-button>
        <hl-button @click="$router.go(-1)">取消</hl-button>
      </hl-group>
    </hl-affix>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { apiDictObj as dictApi } from '@/apis/modules/dict-api';
import { eventTypeApiObj as eventTypeApi } from '@/apis/modules/event-type-api';
import { pick } from 'lodash-es';
import { Indexable } from 'hongluan-ui/es/utils';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { IgetFindMonitorStrategyVersionDetailSpace } from '@/apis/modules/advanced-strategy/model';
// 新的基本信息
import BasicInfo from '@/views/monitoring-config/second-trigger-config/components/basic-info.vue';
// 预警规则
import { WarningRule, WarningCancel } from '@/views/monitoring-config/advanced-strategy-config/components/index';
import { HlMessage } from 'hongluan-ui';
import { apiAdvancedStrategyObj } from '@/apis/modules/advanced-strategy';

/*
周期策略 数据触发策略 使用同一套后端接口 新增 编辑 删除 修改name 校验重复 详情
*/

const reload: any = inject('reload');

const router = useRouter();
const route = useRoute();

const action = computed(() => route.query.action);
const strategyId = computed(() => route.query.id);
const versionId = computed(() => route.query.versionId); // 版本

// 基本信息
const basicInfoRef = ref();
const basicInfoData = ref<Indexable<any>>({});
// 新的规则
const WarningRuleRef = ref();

const eventTypeCode = ref(''); // 风险分类
const allAlarmLevels = ref<IgetListDictCustomVOsDictSpace.Data[]>([]); // 预警字典
const alarmLevels = ref<any[]>([]);

const warningRulesData = ref<Indexable<any>>({});

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
  const result = await dictApi.list('ALARM_LEVEL_CODE');
  allAlarmLevels.value = result.data;
};
const saveStrategy = async () => {
  // 统一校验表单
  await Promise.all([basicInfoRef.value.validate(), WarningRuleRef.value.validate()]);
  if (WarningRuleRef.value.isEmtyRuleList()) {
    HlMessage.warning('请配置预警规则');
    return;
  }
  const params = {
    ...basicInfoRef.value.getResult(), // 基本信息数据获取
    strategyRuleParams: WarningRuleRef.value.getResult() // 规则
  };
  action.value === 'edit' ? await apiAdvancedStrategyObj.postModifyMonitorStrategy(params) : await apiAdvancedStrategyObj.postAddMonitorStrategy(params);
  router.push({
    name: 'alarmStrategyConfig'
  });
};
const getDetails = async (id: string) => {
  const { data } = await apiAdvancedStrategyObj.getFindMonitorStrategyVersionDetail(versionId.value as string, id);
  // 预警规则 预警等级选择
  getEventDetail(data.eventTypeCode);
  // 基础信息
  getBasicInfoData(data);
  // 预警规则
  getWarningRulesData(data);
};
const getBasicInfoData = (data: IgetFindMonitorStrategyVersionDetailSpace.Data) => {
  basicInfoData.value = {
    ...pick(data, 'monitorStrategyId', 'facilityType', 'strategyName', 'eventTypeCode', 'strategyDesc')
  };
};
const getWarningRulesData = (data: IgetFindMonitorStrategyVersionDetailSpace.Data) => {
  warningRulesData.value = data.strategyRuleVOS;
};

onMounted(async () => {
  // 获取策略详情
  strategyId.value && getDetails(strategyId.value as string);
});

// 风险分类等级 dict
loadAlarmLevels();
</script>
