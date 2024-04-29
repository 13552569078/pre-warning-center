<template>
  <hl-panel class style="height: 384px; position: relative" header-style="gap: 0px;" borderless padding="var(--xl)" header-class="p-y-lg p-x-xl bg-content" body-class="display-flex items-left items-top flex-row gap-sm p-t-sm p-x-xl bg-content" body-style="padding-bottom: 32px;">
    <template #header>
      <div class="panel-header-left">
        <hl-icon class="static" type="primary" size="md">
          <FillOrnamentTitle4></FillOrnamentTitle4>
        </hl-icon>
      </div>
      <div class="panel-title">
        <h6 class="text-title">近15日指标数据统计</h6>
      </div>
      <div class="panel-header-right"></div>
    </template>
    <template #default>
      <div ref="chartContainer" style="height: 277px; width: 100%"></div>
      <!-- <p style="position: absolute; right: var(--xs); bottom: var(--xs); color: rgba(128, 128, 160, 0.65)">注：统计时间截止{{ dataAccessTime }}</p> -->
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useEChart } from 'hongluan-hooks';
import { useLatestTime } from '@/hooks';
import { apiHomePageObj } from '@/apis/modules/home-page';

const { dataAccessTime } = useLatestTime();
const { chartContainer, setChartOption } = useEChart();

const renderChart = async () => {
  const { data } = await apiHomePageObj.getFindRecentDataTargetResultNumberStatistics();
  const xData = data.dateList.map((item: any) => {
    return item.substr(-5).replace('-', '.');
  });
  const yData = data.numberItemVOList.map((item: any) => {
    return item.dateTargetNumber;
  });

  const option = {
    grid: {
      top: '10',
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },
      extraCssText: 'border-radius: 0;',
      formatter: (params: any) => `
          <div style="backgroundColor:#fff;borderRaduis:0">
            ${params[0].marker}
            <span>${params[0].axisValue} <span style="font-weight: bold; margin-left: 30px">${params[0].value}</span>条</span>
          </div>
          `
    },
    xAxis: {
      axisLabel: {
        fontSize: 12,
        color: 'rgba(128, 128, 160, 0.65)',
        lineHeight: 20,
        margin: 15,
        rotate: 40
      },
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(128, 128, 160, 0.1)'
        }
      },
      type: 'category',
      data: xData
    },
    yAxis: {
      splitNumber: 3,
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: 'rgba(128, 128, 160, 0.15)'
        }
      },
      axisLabel: {
        fontSize: 12,
        color: 'rgba(128, 128, 160, 0.65)',
        lineHeight: 20
      },
      type: 'value'
    },
    series: [
      {
        itemStyle: {
          color: '#A3DEFF',
          borderRadius: [2, 2, 0, 0],
          boederWidth: 1,
          borderColor: '#36A4FF'
        },
        barWidth: 12,
        data: yData,
        type: 'bar'
      }
    ]
  };
  setChartOption(option);
};

renderChart();
</script>
