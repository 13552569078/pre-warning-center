<template>
  <hl-panel radius="0px" borderless body-padding="var(--xxl)" body-class="display-flex items-left items-top flex-row content p-l-lg p-r-lg p-b-lg" footer-style>
    <template #header>
      <panel-header title="策略设置"></panel-header>
    </template>
    <template #default>
      <hl-form ref="formRef" :model="formData" :rules="rules" :label-position="['items-left', 'items-middle']" gap="var(--lg)" item-gap="var(--lg2)" style="width: 1092px">
        <hl-form-item label="预警间隔" prop="intervalTime" class="top-center">
          <hl-group align="items-middle">
            <hl-input placeholder="时长" v-model="formData.intervalTime" class="static w-sm" clearable></hl-input>
            <hl-select v-model="formData.intervalTimeUnit" placeholder="单位" class="static w-sm" filterable clearable>
              <hl-option v-for="item in TRIGGER_UNIT" :key="item.value" :label="item.label" :value="item.value"> </hl-option>
            </hl-select>
            <span class="text-secondary m-l-lg" style="font-weight: normal">(说明：控制两个预警信息产生时间的间隔。)</span>
          </hl-group>
        </hl-form-item>
        <hl-form-item label="指标数据重复引用" prop="intervalTime" class="top-center">
          <hl-group align="items-middle">
            <hl-switch v-model="formData.isReuseData" :active-value="1" :inactive-value="0" />
            <span class="m-l-md">{{ formData?.isReuseData ? '启用' : '关闭' }}</span>
            <span class="text-secondary m-l-lg" style="font-weight: normal">(说明：当关闭开关时，每条指标数据在触发预警策略后，后续进行策略计算时不再使用该指标数据。)</span>
          </hl-group>
        </hl-form-item>
      </hl-form>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import { apiDictObj as dictApi } from '@/apis/modules/dict-api';
import { FormInstance } from 'hongluan-ui';
import { cloneDeep } from 'lodash-es';
import { getUnitTimeToSeconds } from '@/common';
import { TRIGGER_UNIT } from '@/views/monitoring-config/data-trigger-config/utils';
import { isPositiveIntAndZero } from '@/common';

const props = defineProps({
  detail: Object as Record<string, any>,
  triggerType: {
    type: String,
    default: 'TRIGGER_CYCLE'
  }
});

const formRef = ref<FormInstance>();
const formData = reactive({
  intervalTime: '', // 预警间隔时长
  intervalTimeUnit: '', // 预警间隔单位
  isReuseData: 1 // 默认开启
});

const getResult = () => {
  const result = cloneDeep(formData);
  const data = {
    intervalTime: getUnitTimeToSeconds(result, 'intervalTimeUnit', 'intervalTime'), // 如有单位 则取值间隔数据  无单位取原值
    intervalTimeUnit: result.intervalTimeUnit,
    isReuseData: formData.isReuseData
  };
  return data;
};
const validate = async () => {
  await formRef.value?.validate();
};

watch(
  () => props.detail,
  (n: any) => {
    if (n) {
      // 编辑回显 未设置则未1 默认开启
      if (n?.isReuseData !== 0) {
        n.isReuseData = 1;
      }
      Object.assign(formData, n);
    }
  },
  {
    immediate: true,
    deep: true
  }
);

const rules = {
  // 预警间隔校验
  intervalTime: [
    {
      validator: (_: any, __: any, callback: any) => {
        if (!isPositiveIntAndZero(+formData.intervalTime)) callback(new Error('请填写时长，格式为正整数'));
        if ((formData.intervalTime && formData.intervalTimeUnit) || (!formData.intervalTime && !formData.intervalTimeUnit)) {
          callback();
        }
        if (!formData.intervalTime) callback(new Error('时长不能为空'));
        if (!formData.intervalTimeUnit) callback(new Error('时长单位不能为空'));
        callback();
      }
    }
  ]
};

defineExpose({
  validate,
  getResult
});
</script>
