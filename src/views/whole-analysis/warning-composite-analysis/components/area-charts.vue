<template>
  <hl-panel class="w-full" header-style="gap: 0px;" borderless header-class="bg-content" body-class="display-flex items-left items-middle flex-row bg-content" style="--panel-header-height: 20px">
    <template #header>
      <div class="panel-header-left">
        <hl-icon class="static" type="primary" size="md">
          <FillOrnamentTitle4></FillOrnamentTitle4>
        </hl-icon>
      </div>
      <div class="panel-title">
        <h6 class="text-title">按行政区划分析</h6>
        <hl-icon style="position: absolute;right:50px;top:10px;font-size:20px;" class="cursor-pointer" size="md" @click="load">
          <FillDownload class="cursor-pointer"></FillDownload>
        </hl-icon>
      </div>
    </template>
    <template #default>
      <hl-scrollbar max-height="320px" class="w-full p-t-lg">
        <scrolling-bar-chart
          :chart-data="tableData"
          height="100%"
          class="w-full"
          :bar-style="{
            color: '#36A4FF',
            width: '8px',
            background: 'rgba(47,71,110,0.1)'
          }"
        />
      </hl-scrollbar>
      <scrolling-bar-chart
        style="position: fixed; z-index: -100; right: -1000px"
        id="chart"
        :chart-data="tableData"
        height="auto"
        class="w-full"
        :bar-style="{
          color: '#36A4FF',
          width: '8px',
          background: 'rgba(47,71,110,0.1)'
        }"
      />
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { saveAsImgLoad } from '@/common';
import ScrollingBarChart from './scrolling-bar-chart.vue';

const tableData = ref<any[]>([]);

const renderChart = (chartsData: { code: string; value: number; name: string }[]) => {
  tableData.value = chartsData.map(item => {
    return {
      label: item.name || '--',
      value: item.value || '--'
    };
  });
};
const load = async() => {
  await saveAsImgLoad('#chart', '按行政区划分析统计');
};

defineExpose({
  renderChart
});
</script>
