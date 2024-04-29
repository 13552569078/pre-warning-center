<template>
  <hl-panel radius="0px" borderless padding="var(--xl)" body-padding="var(--xxl)" body-class="display-flex items-left items-top flex-row content" footer-style>
    <template #header>
      <panel-header title="预警规则"></panel-header>
    </template>
    <template #default>
      <hl-form ref="formRef" :model="formData" :rules="rules" :width="['150px', 'col']" item-gap="var(--md)" style="width: 1092px" class="m-l-xxl">
        <hl-form-item label="预警等级:" prop="ruleLevel">
          <hl-select style="width: 400px" v-model="formData.ruleLevel" placeholder="请选择预警等级" filterable clearable>
            <hl-option v-for="item in alarmLevels" :key="item.dictCode" :label="item.dictName" :value="item.dictCode" />
          </hl-select>
        </hl-form-item>
        <hl-form-item label="规则名称" prop="ruleName" class="col-span-2">
          <hl-input style="width: 400px" v-model="formData.ruleName" placeholder="请输入规则名称" maxlength="20" show-word-limit />
        </hl-form-item>
        <hl-form-item label="描述" prop="ruleDesc" class="col-span-2">
          <hl-input style="width: 400px" v-model="formData.ruleDesc" native-type="textarea" placeholder="请输入描述信息" maxlength="500" show-word-limit />
        </hl-form-item>
        <hl-form-item label="预警标题生成规则" prop="alarmTitle" class="col-span-2 is-required">
          <hl-group class="w-full" dir="vertical">
            <hl-input style="width: 400px" v-model="formData.alarmTitle" placeholder="请输入" maxlength="100" native-type="textarea" show-word-limit />
            <div class="text-secondary" style="width: 400px">
              {{ STATERAGY_TITLE_DES }}
            </div>
          </hl-group>
        </hl-form-item>
        <hl-form-item label="预警描述生成规则" prop="alarmDesc" class="col-span-2 is-required">
          <hl-group class="w-full" dir="vertical">
            <hl-input style="width: 400px" v-model="formData.alarmDesc" placeholder="请输入" maxlength="200" native-type="textarea" show-word-limit />
            <div class="text-secondary" style="width: 400px">
              {{ STATERAGY_RULE_DES }}
            </div>
          </hl-group>
        </hl-form-item>
        <hl-form-item label="监测指标:" prop="target" class="is-required">
          <hl-group class="collapse-section m-b-md" style="width: 650px" dir="vertical" v-if="target?.id">
            <hl-group class="w-full p-sm p-l-lg p-r-lg border" align="items-middle items-between">
              <span class="font-bold"> {{ target?.targetTypeName }} </span>
              <span> 实时计算 </span>
              <span> </span>
            </hl-group>
            <hl-group dir="vertical" gap="var(--md)" class="p-lg border" style="background: var(--factor-bg-color)">
              <hl-group align="items-middle items-left">
                <span style="width: 80px">指标值：</span>
                <span class="m-l-md">等于</span>
                <hl-switch v-model="formData.value" class="m-l-md" :active-value="1" :inactive-value="0" />
              </hl-group>
              <hl-group align="items-middle items-left">
                <span style="width: 80px">附加标识：</span>
                <hl-select style="width: 220px" v-model="formData.accessoryId" placeholder="请选择指标值" filterable clearable class="m-l-md">
                  <hl-option :key="item.value" :label="item.label" :value="item.value" v-for="item in SWITCH_SELECT_LIST" />
                </hl-select>
                <span class="m-l-md">(连续相等次数由下面的预警条件中确定)</span>
              </hl-group>
            </hl-group>
          </hl-group>
          <span v-else>请先选择预警对象中的监测指标</span>
        </hl-form-item>
        <hl-form-item label="预警条件:" prop="conditionType" class="is-required">
          <hl-radio-group v-model="formData.conditionType" gap="var(--xl)" dir="vertical" class="m-t-sm">
            <hl-radio :label="3">
              累计次数
              <hl-group :disabled="formData.conditionType !== 3" merge indent>
                <hl-group class="static m-r-md m-l-xxl" align="items-middle">时长:</hl-group>
                <hl-input v-model="formData.totalDuration" class="w-xs" placeholder="时长" />
                <hl-select style="width: 150px" v-model="formData.totalDurationUnit" placeholder="请选择单位" filterable clearable class="m-l-xxs">
                  <hl-option v-for="item in TRIGGER_UNIT" :key="item.value" :label="item.label" :value="item.value"> </hl-option>
                </hl-select>

                <hl-group class="static m-r-md m-l-xxl" align="items-middle">累计:</hl-group>
                <hl-input v-model="formData.totalTimes" class="w-xs" placeholder="累计" />
                <hl-group class="border border-dark radius-md bg-light p-x-xs static" align="items-middle">次 </hl-group>
              </hl-group>
            </hl-radio>
            <hl-radio :label="1"> 无附加条件 </hl-radio>
          </hl-radio-group>
        </hl-form-item>
      </hl-form>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref, reactive, PropType, watch } from 'vue';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { PanelHeader } from '@/components';
import { omit, pick, cloneDeep, isEmpty } from 'lodash-es';
import { getUnitTimes, TRIGGER_UNIT, SWITCH_SELECT_LIST } from '@/views/monitoring-config/data-trigger-config/utils';
import { STATERAGY_TITLE_DES, STATERAGY_RULE_DES, STATERAGY_TITLE_DEFAULT, STATERAGY_RULE_DEFAULT } from '@/views/monitoring-config/second-trigger-config/utils';
import { isPositiveInt, isValidAlarmTitle, isValidAlarmDesc } from '@/common';

const props = defineProps({
  eventTypeCode: String,
  alarmLevels: {
    type: Array as PropType<IgetListDictCustomVOsDictSpace.Data[]>,
    default: () => []
  },
  target: {
    type: Object
  },
  detail: {
    type: Object,
    default: () => ({})
  }
});

const formRef = ref();
const formData = reactive({
  ruleId: '',
  ruleCode: '',
  ruleLevel: '',
  ruleName: '',
  ruleDesc: '',
  alarmTitle: STATERAGY_TITLE_DEFAULT,
  alarmDesc: STATERAGY_RULE_DEFAULT,
  conditionType: 3, // 1-无条件 3-累计次数
  totalDuration: '', // 3累计期间（单位：秒)
  totalDurationUnit: '', // 3 累计单位
  totalTimes: '', // 3 累计次数
  value: 1, // 开关
  accessoryId: '' // 附加标识,
});
const rules = {
  ruleLevel: [{ required: true, message: '请选择预警等级' }],
  ruleName: [{ required: true, message: '规则名称不能为空' }],
  alarmTitle: [
    { required: true, message: '预警标题生成规则不能为空' },
    { validator: isValidAlarmTitle, trigger: ['change', 'blur'] }
  ],
  alarmDesc: [
    { required: true, message: '预警描述生成规则不能为空' },
    { validator: isValidAlarmDesc, trigger: ['change', 'blur'] }
  ],
  target: [
    {
      validator: (_: any, __: any, callback: any) => {
        if (!props.target?.id) callback(new Error('监测指标不能为空'));
        if (!formData.accessoryId) callback(new Error('附加标识不能为空'));
        callback();
      }
    }
  ],
  conditionType: [
    {
      validator: (_: any, __: any, callback: any) => {
        if (formData.conditionType === 3) {
          if (!formData.totalDuration) callback(new Error('时长不能为空'));
          if (!formData.totalDurationUnit) callback(new Error('时长单位不能为空'));
          if (!formData.totalTimes) callback(new Error('累计次数不能为空'));
          if (!isPositiveInt(+formData.totalTimes)) callback(new Error('请填写累计次数，格式为正整数'));
          if (!isPositiveInt(+formData.totalDuration)) callback(new Error('请填写时长，格式为正整数'));
          callback();
        } else {
          callback();
        }
      }
    }
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

const validate = async () => {
  await formRef.value?.validate();
};
const getResult = () => {
  return {
    ...omit(formData, 'value', 'accessoryId'),
    totalDuration: (() => {
      if (formData.conditionType === 3) {
        return Number(formData.totalDuration) * getUnitTimes(formData.totalDurationUnit);
      }
      return '';
    })(),
    totalDurationUnit: formData.conditionType === 3 ? formData.totalDurationUnit : '',
    totalTimes: formData.conditionType === 3 ? formData.totalTimes : '',
    strategyRuleFactorParams: [
      {
        targetId: props.target?.id,
        factorValue: JSON.stringify(pick(formData, 'value', 'accessoryId'))
      }
    ]
  };
};

defineExpose({
  formData,
  validate,
  getResult
});
</script>
