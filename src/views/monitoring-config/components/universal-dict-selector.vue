<template>
  <hl-select
    style="width: 100%"
    :model-value="props.modelValue"
    :class="`${bodyClass}`"
    :placeholder="props.placeholder"
    :block="props.block"
    clearable
    filterable
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
  bodyClass: {
    type: String,
    default: ''
  }
});

const fetchData = async() => {
  options.value = await getListDict(props.dictType);
};

const getOptionName = (value: string) => {
  const found = options.value.find((item: any) => item.dictCode === value);
  return found ? found.dictName : '';
};

defineExpose({ getOptionName });

if (props.dictType) {
  fetchData();
}

</script>
