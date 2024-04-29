<template>
  <div ref="chartContainer" class="echart-container w-full" style="height: calc(var(--lg) * 14)"></div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useEChart } from 'hongluan-hooks';
import { apiAlarmHighIncidenceObj as API } from '@/apis/modules/whole-analysis/alarm-high-incidence/index';

const xData = ref<string[]>([]);
const barData = ref<number[]>([]);

const { chartContainer, setChartOption } = useEChart();

const renderChart = () => {
  const option = {
    grid: {
      top: '32',
      left: '0%',
      right: '0%',
      bottom: '20%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },
      extraCssText: 'border-radius: 0;',
    },
    legend: {
      data: ['报警数折线图'],
      bottom: 10,
      left: 'center',
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 16,
      textStyle: {
        fontSize: 12,
        color: 'rgba(128, 128, 160, 0.65)'
      }
    },
    xAxis: {
      axisLabel: {
        fontSize: 12,
        color: 'rgba(128, 128, 160, 0.65)',
        lineHeight: 20,
        margin: 5
      },
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(128, 128, 160, 0.15)'
        }
      },
      type: 'category',
      data: xData.value
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
          color: '#a3deff'
        },
        symbolSize: 6,
        smooth: true,
        lineStyle: {
          width: 3
        },
        data: barData.value,
        type: 'line',
        name: '报警数'
      }
    ]
  };
  setChartOption(option);
};

const init = async(params: Record<string, string>) => {
  const { data } = await API.getFindTimeHighIncidenceAnalysis(params);
  xData.value = data.timeList;
  barData.value = data.timeHighIncidenceAnalysisItemVOList.map(item => {
    return item.alarmNumber;
  });
  renderChart();
};

defineExpose({
  init
});
</script>

<style scoped lang="scss">
.echart-container {
  width: 100%;
  height: 100%;
}
</style>
