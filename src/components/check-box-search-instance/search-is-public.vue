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
    label: '是',
    value: '1',
  },
  {
    label: '否',
    value: '0',
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
