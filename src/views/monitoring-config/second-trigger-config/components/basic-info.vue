<template>
  <hl-panel radius="0px" class="data-bg" borderless padding="var(--lg)" body-class="display-flex items-left items-top flex-row content p-l-lg p-r-lg p-b-lg" footer-style>
    <template #header>
      <panel-header title="基本信息"></panel-header>
    </template>
    <template #default>
      <hl-form ref="formRef" :model="formData" :rules="rules"
      :label-position="['items-left', 'items-middle']" gap="var(--lg)" item-gap="var(--lg2)" class="form-size">
        <hl-form-item label="策略类型">
          <span class="font-bold">{{ strategyType === 'TRIGGER_SECOND' ? '二次预警' : '高级预警' }}</span>
          <span class="m-l-md">(按照策略配置中确定的条件，统计预警信息数量进行计算。)</span>
        </hl-form-item>
        <hl-form-item label="版本号" v-if="action === 'edit'">
          <span class="font-bold" style="width: 600px">{{ versionName }}</span>
        </hl-form-item>
        <hl-group gap="var(--lg2)">
          <hl-form-item label="策略名称" prop="strategyName">
          <hl-input v-model="formData.strategyName" :disabled="action === 'edit'" placeholder="请输入策略名称"
            style="width: 600px" maxlength="20" show-word-limit />
        </hl-form-item>
        <hl-form-item :label="`${$t('warningType')}:`" prop="eventTypeCode">
          <risk-type style="width: 600px !important" v-model="formData.eventTypeCode" :disabled="action === 'edit'"
            @riskChanged="riskChanged" :isConfigEventType="true" :isFullWidth="false" />
        </hl-form-item>
        </hl-group>
        <hl-form-item label="策略描述">
          <hl-input placeholder="请输入策略描述" v-model="formData.strategyDesc" :disabled="action === 'edit'"
            native-type="textarea" style="width: 600px" maxlength="500" show-word-limit />
        </hl-form-item>
      </hl-form>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { cloneDeep, isEmpty } from 'lodash-es';
import { PanelHeader } from '@/components';
import { useBasicInfo } from './use-basic-form';
import { TRIGGER_SECOND } from '@/views/monitoring-config/alarm-strategy-config/utils';

const emit = defineEmits(['eventTypeCodeChange']);

const props = defineProps({
  detail: {
    type: Object,
    default: () => ({})
  },
  strategyType: {
    type: String,
    default: TRIGGER_SECOND
  }
});

const route = useRoute();
const { formRef, formData, rules } = useBasicInfo(props.strategyType);

const action = computed(() => route.query.action);
const versionName = computed(() => route.query.versionName);

watch(
  () => props.detail,
  n => {
    if (!isEmpty(n)) {
      Object.assign(formData, cloneDeep(props.detail));
    }
  },
  {
    deep: true
  }
);

const validate = async () => {
  await formRef.value?.validate();
};
const riskChanged = (eventTypeCode: number) => {
  formRef.value?.validateField('eventTypeCode');
  emit('eventTypeCodeChange', eventTypeCode);
};
// 传值数据组装 模板id不传
const getResult = () => {
  return {
    ...formData,
    monitorStrategyId: action.value === 'add' ? '' : formData.monitorStrategyId
  };
};

defineExpose({
  validate,
  getResult
});
</script>
<style lang="scss" scoped>
.data-bg {
  background: url('~@/assets/images/wholeAnalysis/top-bg.svg') no-repeat;
  background-color: var(--bg-content);
  background-position: right -10% bottom 10%;
  background-size: 36% 166%;
}
</style>
