<template>
  <hl-panel radius="0px" borderless padding="var(--xl)" body-padding="var(--xxl)"
    body-class="display-flex items-left items-top flex-row content" footer-style>
    <template #header>
      <panel-header title="预警方式"></panel-header>
    </template>
    <template #default>
      <hl-form ref="formRef" :model="formData" :rules="rules" :width="['w-xs', 'col-15']"
        :label-position="['items-right', 'items-top']" item-gap="var(--md)" class="m-l-xxl m-t-lg m-b-xl"
        style="width: 1092px;">
        <hl-form-item label="消警方式" prop="clearType" class="top-center is-required">
          <hl-radio-group v-model="formData.clearType" gap="var(--xl)">
            <hl-radio :label="1"> 立即消警 </hl-radio>
            <hl-radio :label="2"> 规则（数据）消警 </hl-radio>
          </hl-radio-group>
        </hl-form-item>
      </hl-form>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { apiDictObj as dictApi } from '@/apis/modules/dict-api';
import { FormInstance } from 'hongluan-ui';
import { cloneDeep } from 'lodash-es';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { UNIT_TIME_LIST, getUnitTimeToSeconds } from '@/common';
import { modeFormData } from './utils';

const props = defineProps({
  ruleValue: Object as Record<string, any>,
});

const frequencyUnits = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const formRef = ref<FormInstance>();
const formData = reactive(cloneDeep(modeFormData));

const getResult = () => {
  const result = cloneDeep(formData);
  const data = {
    clearType: result.clearType,
    intervalTime: getUnitTimeToSeconds(result, 'intervalTimeUnit', 'intervalTime'), // 如有单位 则取值间隔数据  无单位取原值
    intervalTimeUnit: result.intervalTimeUnit,
  };
  return data;
};
const validate = async() => {
  await formRef.value?.validate();
};

watch(
  () => props.ruleValue,
  n => {
    if (n) {
      // 编辑回显
      Object.assign(formData, n);
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

onMounted(async() => {
  const units = await dictApi.list('MONITOR_FREQUENCY_UNIT');
  frequencyUnits.value = units.data.filter(item => {
    return UNIT_TIME_LIST.includes(item.dictCode);
  });
});

const rules = {
  // 消警方式
  clearType: [
    { required: true, message: '消警方式不能为空' },
  ]
};

defineExpose({
  validate,
  getResult,
});
</script>
