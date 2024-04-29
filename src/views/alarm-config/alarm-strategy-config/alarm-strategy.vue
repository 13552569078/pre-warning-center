<template>
  <collapse-panel title="基本信息" class="m-b-md">
    <basic-info ref="basicInfoRef" class="p-400" :basic-info-data="basicInfoData" @eventTypeCodeChange="eventTypeCodeChange" @getDetail="getDetails" @targetChanged="targetChanged"/>
  </collapse-panel>
  <collapse-panel title="报警规则" class="m-b-md">
    <alarm-rules ref="alarmRulesRef" class="p-300" :alarm-rules-data="alarmRulesData" :event-type-code="eventTypeCode" />
  </collapse-panel>
  <collapse-panel title="监测点及指标数据项" class="m-b-md">
    <alarm-mode ref="alarmModeRef" class="p-400" :rule-value="alarmRuleValue" />
  </collapse-panel>
  <hl-affix position="bottom" :offset="0">
    <hl-group align="items-middle" class="affix-bottom w-full box-shadow-lg p-lg">
      <hl-button class="m-r-md" type="primary" @click="saveStrategy">
        {{ action==='add'? "确定": '保存'}}
      </hl-button>
      <hl-button @click="$router.go(-1)">取消</hl-button>
    </hl-group>
  </hl-affix>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { pick } from 'lodash-es';
import { HlMessage } from 'hongluan-ui';
import { CollapsePanel } from '@/components';
import { AlarmRules, AlarmMode, } from '@/views/alarm-config/alarm-strategy-tpl/components';
import BasicInfo from './components/basic-info.vue';
import { apiYgfWarningConfigObj } from '@/apis/modules/alarm-config';

defineProps({
  id: {
    type: String,
  },
});

const reload: any = inject('reload');
const router = useRouter();
const route = useRoute();

const eventTypeCode = ref();

const basicInfoRef = ref();
const alarmRulesRef = ref();
const alarmModeRef = ref();
const basicInfoData = ref<Record<string, any>>({});
const alarmRulesData = ref<Record<string, any>[]>([]);
const alarmRuleValue = ref<Record<string, any>[]>([]);

const action = computed(() => route.query.action);
const strategyId = computed(() => route.query.id || '');

const saveStrategy = async() => {
  await Promise.all([
    basicInfoRef.value.validate(),
    alarmRulesRef.value.validate(),
    alarmModeRef.value.validate(),
  ]);
  // 验证报警规则不为空
  if (!alarmRulesRef.value.getResult()) {
    HlMessage({
      message: '请填写报警规则!',
    });
    return false;
  }
  // 组装传值数据
  const result = {
    ...basicInfoRef.value.getResult(),
    strategyRuleParam: alarmRulesRef.value.getResult(),
    unitParam: alarmModeRef.value.getResult(),
  };
  if (!strategyId.value) {
    // 新增策略
    await apiYgfWarningConfigObj.postAddStrategy(result);
  } else {
    // 修改策略
    await apiYgfWarningConfigObj.postModifyStrategy(result);
  }
  router.go(-1);
};
const eventTypeCodeChange = (id: string) => {
  eventTypeCode.value = id;
};
const getDetails = async(id:string, telplete:boolean = false) => {
  // !id 解决模板 清空选择 重新赋值，刷新本页面恢复初始值
  if (!id) {
    reload();
    return;
  }
  const { data } = await apiYgfWarningConfigObj.getFindStrategy(
    id
  );
  // 风险分类 事件等级获取
  eventTypeCode.value = data.eventTypeCode;
  // 获取指标
  targetChanged(data.targetId + '');
  // 基础信息
  basicInfoData.value = {
    ...pick(
      data,
      'strategyName',
      'eventTypeCode',
      'targetId',
      'strategyDesc'
    ),
    strategyId: strategyId.value
  };
  // 报警规则 指标
  data.strategyRuleVOS.forEach((item: Record<string, any>) => {
    alarmRulesData.value.push({
      ...pick(
        item,
        'ruleId',
        'ruleLevel',
        'ruleName',
        'ruleDesc',
      ),
      strategyRuleFactorParams: JSON.parse(item.factorValue)
    });
  });
  // 监测点及数据项 不是模板回显监测数据 模板不回显
  if (!telplete) {
    data.unitVOS.forEach((item: Record<string, any>) => {
      alarmRuleValue.value.push({
        regionName: item.regionName,
        label: item.unitName,
        value: item.unitId,
        targetIdList: item.targetDataList[0].targetDataId
      });
    });
  } else {
    alarmRuleValue.value = [];
  }
};
const targetChanged = (id:string) => {
  alarmModeRef.value.getAccessData(id, strategyId.value);
};

onMounted(async() => {
  // 获取策略详情
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
