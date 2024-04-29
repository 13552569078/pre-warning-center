<template>
  <hl-panel radius="0px" borderless padding="var(--lg)" body-class="display-flex items-left items-top flex-row content p-l-lg p-r-lg p-b-lg" footer-style>
    <template #header>
      <panel-header title="统计项筛选条件"></panel-header>
    </template>
    <template #default>
      <hl-form ref="formRef" :model="formData" :rules="rules" :label-position="['items-left', 'items-middle']" gap="var(--lg)" item-gap="var(--lg2)" class="form-size">
          <hl-form-item label="统计项" class="is-required" prop="statisticalItemsType">
          <hl-checkbox-group v-model="formData.statisticalItemsType" dir="vertical" gap="var(--xl)" class="form-item-size">
            <hl-group align="item-middle">
              <hl-checkbox :label="WARNING_NUMBER">预警数</hl-checkbox>
              <span class="text-secondary m-l-lg">符合条件的预警数</span>
            </hl-group>
            <hl-form-item label="重复计数" class="is-required form-item-size" prop="warningNumberType" v-if="formData.statisticalItemsType.includes(WARNING_NUMBER)">
              <hl-radio-group v-model="formData.warningNumberType" gap="var(--xl)">
                <hl-radio :label="COUNT_MULTIPLE_TIMES"> 同一个点位多次预警统计为多次 </hl-radio>
                <hl-radio :label="COUNT_ONCE"> 同一个点位多次预警只统计一次 </hl-radio>
              </hl-radio-group>
            </hl-form-item>
            <hl-group align="item-middle">
              <hl-checkbox :label="RATIO">占比</hl-checkbox>
              <span class="text-secondary m-l-lg">符合条件的预警点位数/监测主体的监测点位数</span>
            </hl-group>
          </hl-checkbox-group>
        </hl-form-item>
        <hl-group gap="var(--lg2)">
          <hl-form-item label="统计时长" class="is-required" prop="statisticalDuration">
          <hl-input v-model="formData.statisticalDuration" placeholder="时长" style="width: 450px" class="m-r-sm"></hl-input>
          <hl-select v-model="formData.statisticalDurationUnit" placeholder="单位" class="static w-sm" filterable clearable>
            <hl-option v-for="item in STATISTICAL_DURATION_LIST" :key="item.value" :label="item.label" :value="item.value"> </hl-option>
          </hl-select>
        </hl-form-item>
        <hl-form-item label="统计周期类型" class="is-required" prop="statisticalCycleType">
          <hl-radio-group v-model="formData.statisticalCycleType" gap="var(--xl)" :disabled="action === 'edit'">
            <hl-radio :label="FIXED_CYCLE"> 固定周期 </hl-radio>
            <hl-radio :label="ROLLING_CYCLE"> 滚动周期 </hl-radio>
          </hl-radio-group>
        </hl-form-item>
        </hl-group>
        <hl-form-item label="附加标识" class="is-required" prop="accessoryId">
          <hl-radio-group v-model="formData.accessoryId" gap="var(--xl)">
            <hl-radio :label="UNLIMITED"> 不限 </hl-radio>
            <hl-radio :label="ALL_EQUAL"> 附加标识相等 </hl-radio>
          </hl-radio-group>
        </hl-form-item>
      </hl-form>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref, watch, reactive, computed } from 'vue';
import { isEmpty, cloneDeep } from 'lodash';
import { useRoute } from 'vue-router';
import { PanelHeader } from '@/components';
import { isPositiveInt } from '@/common';
import { STATISTICAL_DURATION_LIST, WARNING_NUMBER, RATIO, COUNT_MULTIPLE_TIMES, COUNT_ONCE, FIXED_CYCLE, ROLLING_CYCLE, ALL_EQUAL, UNLIMITED } from '@/views/monitoring-config/second-trigger-config/utils';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  detail: {
    type: Object,
    default: () => ({})
  }
});

const route = useRoute();

const action = computed(() => route.query.action);

const formRef = ref();
const formData = reactive({
  statisticalItemsType: [RATIO, WARNING_NUMBER] as string[],
  warningNumberType: COUNT_MULTIPLE_TIMES,
  statisticalDuration: '',
  statisticalDurationUnit: '',
  statisticalCycleType: FIXED_CYCLE,
  accessoryId: UNLIMITED
});

watch(
  () => props.detail,
  (n, o) => {
    if (!isEmpty(n)) {
      Object.assign(formData, cloneDeep(props.detail));
    }
  },
  {
    deep: true
  }
);
watch(
  () => formData.statisticalItemsType,
  (n, o) => {
    emit('update:modelValue', formData.statisticalItemsType);
  },
  {
    deep: true,
    immediate: true
  }
);

const validate = async () => {
  await formRef.value?.validate();
};
const getResult = () => {
  return {
    ...formData
  };
};

const rules = {
  statisticalItemsType: [{ required: true, message: '统计项不能为空' }],
  warningNumberType: [{ required: true, message: '重复计数不能为空' }],
  statisticalDuration: [
    {
      validator: (_: any, __: any, callback: any) => {
        if (!formData.statisticalDuration) {
          callback(new Error('统计时长不能为空'));
        } else if (!formData.statisticalDurationUnit) {
          callback(new Error('统计时长单位不能为空'));
        } else if (!isPositiveInt(+formData.statisticalDuration)) {
          callback(new Error('统计时长格式错误，格式为正整数'));
        } else {
          callback();
        }
      }
    }
  ],
  statisticalCycleType: [{ required: true, message: '统计周期类型不能为空' }],
  accessoryId: [{ required: true, message: '附加标识不能为空' }]
};

defineExpose({
  validate,
  getResult
});
</script>
