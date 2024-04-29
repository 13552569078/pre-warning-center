<template>
    <div class="multiple-charts">
      <hl-group class="echart-container" :style="chartsHeight">
        <div ref="chartContainer" id="alarm-detail" :style="chartsHeight" class="full-y"></div>
      </hl-group>
    </div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts';
import { computed, watch, nextTick, onBeforeUnmount } from 'vue';

let chartDom: echarts.ECharts | null | undefined = null;

const props = defineProps({
  chartsData: {
    type: Object,
    default: () => {
      return {
        xAxisData: [],
        yAxisData: [] // {name: '', unitName: '', values: []}
      };
    }
  },
});
watch(() => props.chartsData, newValue => {
  nextTick(() => {
    if (newValue.yAxisData.length) {
      renderChart();
    } else {
      if (chartDom)chartDom.dispose();
    }
  });
}, {
  immediate: true, // 这个属性是重点啦
  deep: true // 深度监听的参数
});

onBeforeUnmount(() => {
  if (chartDom)chartDom.dispose();
});
const chartsHeight = computed(() => {
  return { height: props.chartsData.yAxisData.length * 420 + 'px', width: '100%' };
});

const renderChart = () => {
  chartDom = echarts.getInstanceByDom(
    document.getElementById('alarm-detail')
  );
  if (chartDom == null) {
    chartDom = echarts.init(document.getElementById('alarm-detail'));
  }
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false
      }
    },
    legend: {
      data: props.chartsData.yAxisData.map((item: { name: string; }) => item.name),
      left: 10
    },
    axisPointer: {
      link: [
        {
          xAxisIndex: 'all'
        }
      ]
    },
    grid: props.chartsData.yAxisData.map((item: any, index: number) => {
      return {
        left: 100,
        right: 60,
        top: index === 0 ? 80 : (index * 400) + 80,
        height: 220,
        // bottom: 10
      };
    }),
    dataZoom: [
      {
        show: true,
        'height': 20,
        bottom: 10,
        realtime: true,
        showDetail: false,
        start: 0,
        end: 50,
        xAxisIndex: props.chartsData.yAxisData.map((item: any, index: number) => { return index; })
      },
      {
        type: 'inside',
        realtime: true,
        start: 0,
        end: 50,
        xAxisIndex: props.chartsData.yAxisData.map((item: any, index: number) => { return index; })
      }
    ],
    xAxis: props.chartsData.yAxisData.map((item: any, index: any) => {
      return {
        type: 'category',
        boundaryGap: false,
        axisLine: { onZero: true },
        data: props.chartsData.xAxisData,
        axisLabel: {
          rotate: 40
        },
        gridIndex: index
      };
    }),
    yAxis: props.chartsData.yAxisData.map((item: { name: string; unitName: string; }, index: any) => {
      return {
        gridIndex: index,
        name: item.name + (item.unitName ? '(' + item.unitName + ')' : ''),
        type: 'value',
      };
    }),
    series: props.chartsData.yAxisData.map((item: { name: string; values: any[]; }, index: any) => {
      return {
        name: item.name,
        type: 'line',
        xAxisIndex: index,
        yAxisIndex: index,
        symbolSize: 8,
        data: item.values
      };
    })
  };

  option && chartDom.setOption(option);
};
</script>

<style scoped lang="scss">
    .multiple-charts {
        width: 100%;
    }
</style>
