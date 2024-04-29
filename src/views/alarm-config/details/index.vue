<template>
  <detail-head :detail='headDetails' />
  <hl-row class="show-col m-t-md" gap="var(--md)">
    <hl-col span="col-12">
      <detail-rule :detail='ruleDetails' />
    </hl-col>
    <hl-col span="col-12">
      <detail-mode :detail='modeDetails' />
      <detail-point class="m-t-md"/>
    </hl-col>
  </hl-row>
  <hl-affix position="bottom" :offset="0">
    <hl-group align="items-middle" class="affix-bottom w-full box-shadow-lg p-lg">
      <hl-button @click="$router.go(-1)">返回</hl-button>
    </hl-group>
  </hl-affix>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { pick } from 'lodash-es';
import { apiYgfWarningConfigObj } from '@/apis/modules/alarm-config';
import { DetailHead, DetailRule, DetailMode, DetailPoint } from './components';
import type { IdetailsHead } from './types';

const route = useRoute();

const headDetails = ref<IdetailsHead>();
const ruleDetails = ref<Record<string, any>[]>([]);
const modeDetails = ref<Record<string, any>>({});

const strategyId = computed(() => route.query.id || '');

const getDeatils = async() => {
  const { data } = await apiYgfWarningConfigObj.getFindStrategy(
    strategyId.value as string
  );
  // 策略基础信息
  headDetails.value = {
    ...pick(
      data,
      'eventTypeCodeName',
      'strategyName',
      'updatedAt',
      'createdAt'
    ),
  };
  // 策略信息
  modeDetails.value = data;
  // 报警规则 指标
  data.strategyRuleVOS.forEach((item: Record<string, any>) => {
    ruleDetails.value.push({
      ...pick(
        item,
        'ruleId',
        'ruleLevel',
        'ruleName',
        'ruleLevelName',
        'ruleDesc',
      ),
      strategyRuleFactorParams: JSON.parse(item.factorValue)
    });
  });
};

onMounted(async() => {
  getDeatils();
});
</script>
