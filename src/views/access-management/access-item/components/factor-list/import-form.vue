<template>
  <hl-form class="w-full" :model="formData" ref="formRef" :rules="rules" gap="var(--lg)" item-gap="var(--lg2)"
    :label-position="['right', 'middle']">
    <hl-form-item label="选择数据源" prop="accessDataSourceId">
      <search-access-data-source-tree
        v-model:accessSourceId="formData.accessDataSourceId"
        v-model:accessSourceObjectId="formData.accessSourceObjectId"
        @changed="formRef.validateField('accessDataSourceId')"
        :isDatasource="true"
        :disabled="disabled" />
    </hl-form-item>
    <hl-form-item label="接入周期类型" prop="accessFrequencyOrigin">
      <hl-group dir="vertical" gap="var(--md)">
        <hl-group align="items-top" class="w-full" dir="vertical" gap="var(--xxs)" full="full-x" @change="handleFrequencyChange">
          <hl-radio-group v-model="formData.accessFrequencyOrigin" gap="var(--xl)">
            <hl-radio :label="0">
              实时计算
            </hl-radio>
            <hl-radio :label="1">
              周期计算
            </hl-radio>
          </hl-radio-group>
        </hl-group>
        <hl-group v-if="formData.accessFrequencyOrigin !== 0" class="p-lg bg-light radius-md static"
          align="items-left items-top" dir="vertical" gap="var(--sm)" style="width: 280px;">
          <hl-form-item label="" prop="accessFrequency">
            <hl-group merge indent>
              <hl-input v-model="formData.accessFrequency" class="w-xs" />
              <hl-select v-model="formData.accessFrequencyUnit" placeholder="单位" class="static w-xs" filterable>
                <hl-option v-for="item in frequencyUnits" :key="item.dictCode" :label="item.dictName"
                  :value="item.dictCode"> </hl-option>
              </hl-select>
            </hl-group>
          </hl-form-item>
        </hl-group>
      </hl-group>
    </hl-form-item>
    <hl-form-item label="选择监测指标" prop="targetId">
      <search-target-tree ref="targetTreeRef" v-model="formData.targetId" :targetFrequency="formData.accessFrequencyOrigin" @changed="formRef.validateField('targetId')"/>
    </hl-form-item>
  </hl-form>
</template>
<script lang='ts' setup>
import { ref, onMounted, computed, watch } from 'vue';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import {
  UNIT_FREQUENCY_LIST,
  getListDict,
} from '@/common';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  accessSourceId: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: true
  }
});

const formData = ref({
  accessDataSourceId: '',
  accessFrequencyOrigin: 0,
  accessFrequency: 0,
  accessFrequencyUnit: 'MINUTE',
  targetId: '',
  accessSourceObjectId: ''
});
const formRef = ref();
const targetTreeRef = ref();
const frequencyUnits = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);

const rules = computed(() => {
  const r = {
    accessDataSourceId: [{ required: true, message: '请选择接入数据源', }],
    accessFrequencyOrigin: [{ required: true, message: '请选择周期类型', }],
    targetId: [{ required: true, message: '请选择监测指标', }]
  };
  if (formData.value.accessFrequencyOrigin === 1) {
    r.accessFrequency = [{ required: true, message: '请填写周期频率', trigger: ['blur', 'change'] }];
    r.accessFrequencyUnit = [{ required: true, message: '请选择单位', trigger: ['blur', 'change'] }];
  }
  return r;
});

watch(() => formData.value, val => {
  emit('update:modelValue', val);
}, {
  deep: true
});

const validate = () => {
  return formRef.value.validate();
};

const handleFrequencyChange = () => {
  formData.value.targetId = '';
  targetTreeRef.value.reset();
};

onMounted(async () => {
  const res = await getListDict('MONITOR_FREQUENCY_UNIT');
  frequencyUnits.value = res.filter(item => {
    return UNIT_FREQUENCY_LIST.includes(item.dictCode);
  });
  formData.value.accessDataSourceId = props.accessSourceId;
});

defineExpose({
  validate
});

</script>
