<template>
  <check-box-search
    ref="searchRef"
    :options="options"
  />
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue';

const searchRef = ref();
const options = [
  {
    label: '周期策略',
    value: 'TRIGGER_CYCLE',
  },
  {
    label: '数据触发',
    value: 'TRIGGER_DATA',
  },
  {
    label: '二次预警',
    value: 'TRIGGER_SECOND',
  },
];
const getOptionName = ref();

onMounted(() => {
  getOptionName.value = searchRef.value.getOptionName;
});

defineExpose({
  getOptionName
});
</script>
