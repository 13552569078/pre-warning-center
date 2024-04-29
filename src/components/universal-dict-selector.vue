<template>
  <hl-select
    :model-value="props.modelValue"
    clearable
    :placeholder="props.placeholder"
    filterable
    :block="props.block"
    :multiple="multiple"
    :disabled="disabled"
    @change="(val: string) => { emit('update:modelValue', val)}"
    @clear="() => { emit('update:modelValue', '')}">
    <hl-option
      v-for="item in options"
      :key="item.dictCode"
      :label="item.dictName"
      :value="item.dictCode"
    />
  </hl-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { getListDict } from '@/common';

const emit = defineEmits(['update:modelValue']);
const options = ref();
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  multiple: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  dictType: {
    type: String,
    default: ''
  },
  block: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
});

const fetchData = async() => {
  options.value = await getListDict(props.dictType);
};

const getOptionName = (value: string | string[]) => {
  const isArray = Array.isArray(value);
  if (isArray) {
    const found = options.value.filter((item: any) => value.includes(item.dictCode));
    return found.map((item: any) => item.dictName).join(', ');
  } else {
    const found = options.value.find((item: any) => item.dictCode === value);
    return found ? found.dictName : '';
  }
};

defineExpose({ getOptionName });

if (props.dictType) {
  fetchData();
}

</script>
