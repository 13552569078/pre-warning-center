<template>
  <hl-group align="items-middle" class="p-l-md h-full">
    <hl-checkbox-group v-model="localValue" @change="handleChange" gap="var(--xl)">
      <hl-checkbox v-for="item in options" :label="item.value" :key="item.label">{{ item.label }}</hl-checkbox>
    </hl-checkbox-group>
  </hl-group>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

interface Option {
  label: string,
  value: string | number
}

const props = defineProps<{
  modelValue: any, // string[] | number[]
  options: Option[]
}>();
const localValue = ref();

const emit = defineEmits(['update:modelValue']);

const handleChange = (val: number | string) => {
  emit('update:modelValue', val);
};

watch(() => props.modelValue, (val: string[] | number[]) => {
  // 兼容传入 空string
  localValue.value = val || [];
});

const getOptionName = (val: [string | number]) => {
  const checkedOptions = props.options.filter(item => val.includes(item.value));
  return checkedOptions.map(item => item.label).join(', ');
};

defineExpose({ getOptionName });
</script>
