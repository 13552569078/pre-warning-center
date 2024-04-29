<template>
  <hl-panel class style="height: 385px;" header-style="gap: 0px;" borderless padding="var(--xl)"
    header-class="p-y-lg p-x-xl bg-content"
    body-class="display-flex items-left items-top flex-row gap-sm p-t-sm p-x-xl bg-content"
    body-style="padding-bottom: 32px;">
    <template #header>
      <div class="panel-header-left">
        <hl-icon class="static" type="primary" size="md">
          <FillOrnamentTitle4></FillOrnamentTitle4>
        </hl-icon>
      </div>
      <div class="panel-title">
        <h6 class="text-title">近15日预警信息统计（条）</h6>
      </div>
      <div class="panel-header-right"></div>
    </template>
    <template #default>
      <div ref="chartContainer" style="height:260px;width:100%;"></div>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { useEChart } from 'hongluan-hooks';
import { apiHomePageObj } from '@/apis/modules/home-page';

const { chartContainer, setChartOption } = useEChart();

const renderChart = async() => {
  const { data } = await apiHomePageObj.getFindRecentAlarmNumberStatistics();
  const xData = data.alarmDateList.map((item:any) => { return item.substr(-5).replace('-', '.'); });
  const yData = data.recentAlarmNumberItemVOList.map((item:any) => { return item.alarmNumber; });
  const option = {
    grid: {
      top: '3%',
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none',
      },
      extraCssText: 'border-radius: 0;',
      formatter: (params: any) => `
          <div style="backgroundColor:#fff;borderRaduis:0">
            ${params[0].marker}
            <span>${params[0].axisValue} <span style="font-weight: bold; margin-left: 30px">${params[0].value}</span>条</span>
          </div>
          `,
    },
    xAxis: {
      axisLabel: {
        fontSize: 12,
        color: 'rgba(128, 128, 160, 0.65)',
        lineHeight: 20,
        margin: 5,
      },
      axisTick: {
        alignWithLabel: true,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(128, 128, 160, 0.15)',
        },
      },
      type: 'category',
      data: xData,
    },
    yAxis: {
      splitNumber: 3,
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: 'rgba(128, 128, 160, 0.15)',
        },
      },
      axisLabel: {
        fontSize: 12,
        color: 'rgba(128, 128, 160, 0.65)',
        lineHeight: 20,
      },
      type: 'value',
    },
    series: [
      {
        itemStyle: {
          color: '#FA8B16',
        },
        symbolSize: 0,
        lineStyle: {
          width: 3,
        },
        data: yData,
        type: 'line',
      },
    ],
  };
  setChartOption(option);
};

renderChart();
</script>
