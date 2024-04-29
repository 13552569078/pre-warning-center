<template>
  <hl-panel radius="0px" borderless body-padding="var(--xxl)" body-class="display-flex items-left items-top flex-row content p-l-lg p-r-lg p-b-lg" footer-style>
    <template #header>
      <panel-header title="消警方式"></panel-header>
    </template>
    <template #default>
      <hl-form ref="formRef" :model="formData" :rules="rules" :label-position="['items-left', 'items-middle']" gap="var(--lg)" item-gap="var(--lg2)" style="width: 1092px">
        <hl-form-item label="消警方式" prop="clearType" class="top-top is-required">
          <hl-group dir="vertical" gap="var(--md)" class="m-t-xs">
            <hl-radio-group v-model="formData.clearType" gap="var(--xl)" @change="restForm">
              <hl-radio :label="item.value" v-for="item in CANCEL_TYPE" :key="item.value"> {{ item.name }} </hl-radio>
            </hl-radio-group>
            <hl-group merge indent block class="bg-light p-md items-middle" style="width: 600px" v-if="[2, 3, 4].includes(formData.clearType)">
              <template v-if="formData.clearType === 2">
                <span class="m-r-md"> 连续一段时间未接收到监测数据即自动消警，时长</span>
                <hl-input placeholder="时长" v-model="formData.clearTypeInterval" class="static w-sm"></hl-input>
                <hl-select v-model="formData.clearTypeUnit" placeholder="单位" class="static w-sm" filterable clearable>
                  <hl-option v-for="item in TRIGGER_UNIT" :key="item.value" :label="item.label" :value="item.value"> </hl-option>
                </hl-select>
              </template>
              <template v-if="formData.clearType === 3">
                <span class="m-r-md"> 预警后，间隔一定时间再消警</span>
                <hl-select v-model="formData.clearTypeInterval" placeholder="单位" class="static w-lg" filterable clearable>
                  <hl-option v-for="item in TRIGGER_TIME" :key="item.value" :label="item.label" :value="item.value"> </hl-option>
                </hl-select>
              </template>
              <template v-if="formData.clearType === 4">
                <span class="m-r-md">预警后，某时间点立即消警</span>
                <hl-select v-model="formData.clearTypeValue" placeholder="单位" class="static w-lg" filterable clearable>
                  <hl-option v-for="item in TRIGGER_NEXT_TIME" :key="item.value" :label="item.label" :value="item.value"> </hl-option>
                </hl-select>
              </template>
            </hl-group>
          </hl-group>
        </hl-form-item>
      </hl-form>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref, watch, reactive } from 'vue';
import { PanelHeader } from '@/components';
import { isEmpty, cloneDeep } from 'lodash';
import { TRIGGER_UNIT, TRIGGER_TIME, TRIGGER_NEXT_TIME, getUnitTimes } from '@/views/monitoring-config/data-trigger-config/utils';
import { CANCEL_TYPE } from '@/views/monitoring-config/second-trigger-config/utils';
import { isPositiveInt } from '@/common';

const props = defineProps({
  detail: {
    type: Object,
    default: () => ({})
  }
});

const formRef = ref();
const formData = reactive({
  clearType: 1, // 消警方式
  clearTypeInterval: '', // 2,3类型：间隔，单位：秒
  clearTypeUnit: '', // 2单位
  clearTypeValue: '' //  4 到期自动消警(NEXT_DAY,NEXT_HOUR,NEXT_WEEK,NEXT_MONTH)
});
const rules = {
  clearType: [
    {
      validator: (_: any, __: any, callback: any) => {
        if (formData.clearType === 2) {
          if (!formData.clearTypeInterval) callback(new Error('时长不能为空'));
          if (!formData.clearTypeUnit) callback(new Error('时长单位不能为空'));
          if (!isPositiveInt(+formData.clearTypeInterval)) callback(new Error('请填写时长，格式为正整数'));
          callback();
        } else if (formData.clearType === 3) {
          if (!formData.clearTypeInterval) callback(new Error('间隔时间不能为空'));
          callback();
        } else if (formData.clearType === 4) {
          if (!formData.clearTypeValue) callback(new Error('消警时间不能为空'));
          callback();
        } else {
          callback();
        }
      }
    },
    { required: true, message: '消警方式不能为空' }
  ]
};

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

const restForm = () => {
  formData.clearTypeInterval = '';
  formData.clearTypeUnit = '';
  formData.clearTypeValue = '';
};
const validate = async () => {
  await formRef.value?.validate();
};
const getResult = () => {
  return {
    clearType: formData.clearType,
    clearTypeInterval:
      (() => {
        if (formData.clearType === 3) {
          return formData.clearTypeInterval;
        }
        if (formData.clearType === 2) {
          return Number(formData.clearTypeInterval) * getUnitTimes(formData.clearTypeUnit);
        }
      })() || '',
    clearTypeUnit: formData.clearType === 2 ? formData.clearTypeUnit : '',
    clearTypeValue: formData.clearType === 4 ? formData.clearTypeValue : ''
  };
};

defineExpose({
  validate,
  getResult
});
</script>
