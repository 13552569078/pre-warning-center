<template>
  <hl-panel radius="0px" borderless padding="var(--lg)" body-class="display-flex items-left items-top flex-row content p-l-lg p-r-lg p-b-lg m-b-lg" footer-style>
    <template #header>
      <panel-header title="消警规则"></panel-header>
    </template>
    <template #default>
      <hl-form ref="formRef" :model="formData" :rules="rules" :label-position="['items-left', 'items-middle']" gap="var(--lg)" item-gap="var(--lg2)" style="width: 1092px">
        <hl-form-item label="消警方式" prop="clearType" class="top-top is-required">
          <hl-group dir="vertical" gap="var(--md)" class="m-t-xs">
            <hl-radio-group v-model="formData.clearType" gap="var(--xl)" @change="restForm">
              <hl-radio :label="item.value" v-for="item in CANCEL_TYPE" :key="item.value"> {{ item.name }} </hl-radio>
            </hl-radio-group>
            <hl-group merge indent block class="bg-light p-md items-middle" style="width: 600px" v-if="[RULE_FIRE, FIXED_FIRE, DEADLINE_FIRE].includes(formData.clearType)">
              <template v-if="formData.clearType === RULE_FIRE">
                <hl-radio-group v-model="formData.clearTypeValue" gap="var(--md)">
                  <hl-radio :label="item.value" v-for="item in CANCEL_TYPE2_LIST" :key="item.value"> {{ item.name }} </hl-radio>
                </hl-radio-group>
              </template>
              <template v-if="formData.clearType === FIXED_FIRE">
                <span class="m-r-md"> 预警后，间隔一定时间再消警</span>
                <hl-select v-model="formData.clearTypeInterval" placeholder="单位" class="static w-lg" filterable clearable>
                  <hl-option v-for="item in TRIGGER_TIME" :key="item.value" :label="item.label" :value="item.value"> </hl-option>
                </hl-select>
              </template>
              <template v-if="formData.clearType === DEADLINE_FIRE">
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
import { TRIGGER_TIME, TRIGGER_NEXT_TIME } from '@/views/monitoring-config/data-trigger-config/utils';
import { CANCEL_TYPE, IMMEDIATE_FIRE, RULE_FIRE, FIXED_FIRE, DEADLINE_FIRE, ALL_CLEAR, CANCEL_TYPE2_LIST } from '@/views/monitoring-config/second-trigger-config/utils';

const props = defineProps({
  detail: {
    type: Object,
    default: () => ({})
  }
});

const formRef = ref();
const formData = reactive({
  clearType: IMMEDIATE_FIRE, // 消警方式
  clearTypeValue: ALL_CLEAR, //  2,4类型传值为同一个  后端定义如此！！！
  clearTypeInterval: '' // 3类型：间隔，单位：秒
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

const restForm = () => {
  formData.clearTypeInterval = '';
  formData.clearTypeValue = '';
};
const validate = async () => {
  await formRef.value?.validate();
};
const getResult = () => {
  return {
    clearType: formData.clearType,
    clearTypeInterval: formData.clearType === FIXED_FIRE ? formData.clearTypeInterval : '',
    clearTypeValue: [RULE_FIRE, DEADLINE_FIRE].includes(formData.clearType) ? formData.clearTypeValue : ''
  };
};

const rules = {
  clearType: [
    {
      validator: (_: any, __: any, callback: any) => {
        if (formData.clearType === FIXED_FIRE) {
          if (!formData.clearTypeInterval) callback(new Error('固定时长消警不能为空'));
          callback();
        } else if (formData.clearType === RULE_FIRE || formData.clearType === DEADLINE_FIRE) {
          if (!formData.clearTypeValue) callback(new Error('到期自动消警不能为空'));
          callback();
        } else {
          callback();
        }
      }
    },
    { required: true, message: '消警方式不能为空' }
  ]
};

defineExpose({
  validate,
  getResult
});
</script>
