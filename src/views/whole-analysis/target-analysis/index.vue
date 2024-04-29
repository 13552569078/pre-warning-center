<template>
<TopModel @queryModel="queryModel"></TopModel>
<TableAndCharts ref="tableChartRef" :modelData="modelData"></TableAndCharts>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, nextTick } from 'vue';
import TopModel from './top-model.vue';
import TableAndCharts from './table-and-charts.vue';

const topData = ref();
const tableChartRef = ref();
const modelData = computed(() => topData.value);

const queryModel = (data: any) => {
  topData.value = data;
  nextTick(() => {
    tableChartRef.value.changeDataType('table');
  });
};
</script>
