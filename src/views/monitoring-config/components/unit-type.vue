<template>
  <hl-select
    :model-value="props.modelValue"
    clearable
    placeholder="请选择点位类型"
    @change="(val: string) => { emit('update:modelValue', val)}">
    <hl-option
      v-for="item in options"
      :key="item.dictCode"
      :label="item.dictName"
      :value="item.dictCode"
    />
  </hl-select>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { apiDictObj as dictApi } from '@/apis/modules/dict-api';

const emit = defineEmits(['update:modelValue']);
const options = ref();
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const getUnitType = async() => {
  const res = await dictApi.list('UNIT_TYPE_CODE');
  options.value = res.data;
};

getUnitType();

</script>
