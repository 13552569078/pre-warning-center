<template>
  <div v-show="showType === 'echarts'" ref="chartContainer" class="echart-container w-full"
    style="height: calc(var(--lg) * 14)">
  </div>
  <hl-scrollbar class="w-full" v-show="showType === 'table'">
    <hl-simple-table :cols="cols" :data="tableData" fixed-header border="bordered" stripe="even">
      <template #col0="{ row }">
        <span style="font-weight: bold;">{{ row.col0 }}</span>
      </template>
    </hl-simple-table>
  </hl-scrollbar>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useEChart } from 'hongluan-hooks';
import { RecordAny } from '@/types';
import { apiComprehensiveAnalysisObj as API } from '@/apis/modules/whole-analysis/high-incidence/index';

const props = defineProps({
  cardType: {
    default: 'echarts',
  },
});

const cols = ref([
  { title: '', slotName: 'col0', minWidth: '120px', fixed: 'left' },
  { title: '0-2时', prop: '0', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '2-4时', prop: '1', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '4-6时', prop: '2', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '6-8时', prop: '3', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '8-10时', prop: '4', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '10-12时', prop: '5', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '12-14时', prop: '6', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '14-16时', prop: '7', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '16-18时', prop: '8', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '18-20时', prop: '9', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '20-22时', prop: '10', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '22-24时', prop: '11', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
]);
const tableData = ref<RecordAny[]>([]);

const showType = computed(() => props.cardType);
const echartsData = ref<RecordAny>({});

const { chartContainer, setChartOption } = useEChart();

const renderChart = () => {
  const option = {
    grid: {
      top: '32',
      left: '0%',
      right: '0%',
      bottom: '20%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none',
      },
      extraCssText: 'border-radius: 0;',
      formatter: (params: RecordAny[]) => {
        let result = '';
        const name = params[0].name;
        params.forEach(e => {
          result += `<div style="backgroundColor:#fff;borderRaduis:0">
            ${e.marker}
            <span style='display: inline-block; min-width: 180px;'>${e.componentSubType === 'line' ? '总数' : e.data.label} <span style="font-weight: bold; float: right;">${e.componentSubType === 'line' ? e.value : e.data.value}</span></span>
          </div> `;
        });
        return `<span style="font-weight: bold;">${name}</span><br/></span>` + result;
      }
    },
    legend: {
      data: ['高发风险一', '高发风险二', '高发风险三'],
      bottom: 10,
      left: 'center',
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 16,
      textStyle: {
        fontSize: 12,
        color: 'rgba(128, 128, 160, 0.65)',
      },
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
      data: ['0-2时', '2-4时', '4-6时', '6-8时', '8-10时', '10-12时', '12-14时', '14-16时', '16-18时', '18-20时', '20-22时', '22-24时'],
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
          color: '#a3deff',
        },
        symbolSize: 6,
        // 让曲线更加圆滑
        smooth: true,
        lineStyle: {
          width: 3,
        },
        data: echartsData.value.total,
        type: 'line',
        name: '总数'
      }, {
        itemStyle: {
          color: '#A3DEFF',
          borderWidth: 0,
          borderColor: '#36A4FF'
        },
        barWidth: 12,
        name: '高发风险一',
        data: echartsData.value.highOneNum,
        type: 'bar',
      }, {
        itemStyle: {
          color: '#A8E6DA',
          borderWidth: 0,
          borderColor: '#4CC09E'
        },
        barWidth: 12,
        name: '高发风险二',
        data: echartsData.value.highTwoNum,
        type: 'bar',
      }, {
        itemStyle: {
          color: '#FFB4AD',
          borderWidth: 0,
          borderColor: '#FF4D4F'
        },
        barWidth: 12,
        name: '高发风险三',
        data: echartsData.value.highThrNum,
        type: 'bar',
      }],
  };
  setChartOption(option);
};

const COL_MAP = {
  'total': '总数',
  'highOneName': '高发风险1',
  'highOneNum': '数目',
  'highTwoName': '高发风险2',
  'highTwoNum': '数目',
  'highThrName': '高发风险3',
  'highThrNum': '数目',
};

const init = async(params: Record<string, string>) => {
  const { data } = await API.getFindTimeHighIncidenceAnalysis(params);
  const tableList = data.timeHighIncidenceAnalysisItemVOList.map((item: RecordAny) => {
    return {
      time: item.time,
      alarmNumber: item.alarmNumber,
      highOneName: item.alarmInfoList[0] ? item.alarmInfoList[0].eventTypeName : '--',
      highOneNum: item.alarmInfoList[0] ? item.alarmInfoList[0].alarmNumber : 0,
      highTwoName: item.alarmInfoList[1] ? item.alarmInfoList[1].eventTypeName : '--',
      highTwoNum: item.alarmInfoList[1] ? item.alarmInfoList[1].alarmNumber : 0,
      highThrName: item.alarmInfoList[2] ? item.alarmInfoList[2].eventTypeName : '--',
      highThrNum: item.alarmInfoList[2] ? item.alarmInfoList[2].alarmNumber : 0
    };
  });
  echartsData.value = {
    total: tableList.map((item2: RecordAny) => { return item2.alarmNumber; }),
    highOneName: tableList.map((item2: RecordAny) => { return item2.highOneName; }),
    highOneNum: tableList.map((item2: RecordAny) => {
      return {
        value: item2.highOneNum,
        label: item2.highOneName
      };
    }),
    highTwoName: tableList.map((item2: RecordAny) => { return item2.highTwoName; }),
    highTwoNum: tableList.map((item2: RecordAny) => {
      return {
        value: item2.highTwoNum,
        label: item2.highTwoName
      };
    }),
    highThrName: tableList.map((item2: RecordAny) => { return item2.highThrName; }),
    highThrNum: tableList.map((item2: RecordAny) => {
      return {
        value: item2.highThrNum,
        label: item2.highThrName
      };
    }),
  };
  const table2 = {
    total: tableList.map((item2: RecordAny) => { return item2.alarmNumber; }),
    highOneName: tableList.map((item2: RecordAny) => { return item2.highOneName; }),
    highOneNum: tableList.map((item2: RecordAny) => { return item2.highOneNum; }),
    highTwoName: tableList.map((item2: RecordAny) => { return item2.highTwoName; }),
    highTwoNum: tableList.map((item2: RecordAny) => {
      return item2.highTwoNum;
    }),
    highThrName: tableList.map((item2: RecordAny) => { return item2.highThrName; }),
    highThrNum: tableList.map((item2: RecordAny) => {
      return item2.highThrNum;
    }),
  };
  const keys = Object.keys(COL_MAP);
  tableData.value = keys.map((key: string) => {
    return {
      col0: (COL_MAP as RecordAny)[key],
      ...(table2 as RecordAny)[key]
    };
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
  height: 100%
}
</style>
