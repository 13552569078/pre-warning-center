<template>
  <div v-show="showType === 'echarts'" ref="chartContainer" class="echart-container w-full"
    style="height: calc(var(--xxl) * 10.5)">
  </div>
  <hl-scrollbar class="w-full" style="height: calc(var(--xxl) * 10)" v-show="showType === 'table'">
    <hl-simple-table :cols="cols" :data="tableDta" fixed-header border="bordered">
      <template #tableIndex="{ rowIndex }">
        <span>{{ rowIndex + 1 }}</span>
      </template>
      <template #rate="{ row }">
        <span>{{ (row.rate * 100).toFixed(2) }}%</span>
      </template>
    </hl-simple-table>
  </hl-scrollbar>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useEChart } from 'hongluan-hooks';
import { RecordAny } from '@/types';
import { apiComprehensiveAnalysisObj } from '@/apis/modules/whole-analysis/high-incidence/index';
import { IgetFindAlarmTypeHighIncidenceAnalysisSpace } from '@/apis/modules/whole-analysis/high-incidence/model';

const { chartContainer, setChartOption } = useEChart();

const props = defineProps({
  cardType: {
    type: String,
    default: 'echarts',
  }
});

let chartsData = [] as RecordAny[];
const tableDta = ref<IgetFindAlarmTypeHighIncidenceAnalysisSpace.Data[]>([]);
const cols = ref([
  { title: '', slotName: 'tableIndex', width: 'fit-content', },
  { title: '类型', prop: 'eventTypeName', minWidth: '100px' },
  { title: '占比', slotName: 'rate', minWidth: '100px' },
  { title: '数目', prop: 'alarmNumber', minWidth: '100px' }
]);

const showType = computed(() => props.cardType);

const renderChart = () => {
  const option = {
    legend: {
      orient: 'vertical',
      top: 50,
      right: '8%',
      itemGap: 20,
      icon: 'circle',
      formatter: (name: string) => {
        let rate = 0;
        let target;
        for (let i = 0; i < chartsData.length; i++) {
          if (chartsData[i].name === name) {
            target = chartsData[i].value;
            rate = chartsData[i].rate;
          }
        }
        const arr = [
          '{a|' + name.substring(0, 6) + '}',
          '{b|' + (rate * 100).toFixed(2) + '%}',
          '{c|' + target + '}'
        ];
        return arr.join('');
      },
      textStyle: {
        padding: [0, 0, 0, 0],
        verticalAlign: 'middle',
        rich: {
          a: {
            fontSize: 14,
            width: 110
          },
          b: {
            fontSize: 14,
            width: 70,
            color: '#4B4B4B'
          },
          c: {
            fontSize: 14
          }
        }
      }
    },
    tooltip: {
      trigger: 'item'
    },
    series: [{
      type: 'pie',
      radius: ['50%', '80%'],
      center: ['30%', '50%'],
      avoidLabelOverlap: false,
      z: 1,
      // label: {
      //   // formatter: '{b}: \n {@2012} ({d}%)'
      //   formatter: (node:any) => {
      //     return `${node.name.substr(0, 6)}: ${node.value}`;
      //   }
      // },
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      data: chartsData.map((item, index) => {
        item.value = item.alarmNumber;
        item.name = item.eventTypeName;
        item.itemStyle = { color: richColor[index] };
        return item;
      }),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    {
      tooltip: {
        show: false,
      },
      type: 'pie',
      radius: ['50%', '60%'],
      center: ['30%', '50%'],
      avoidLabelOverlap: false,
      z: 2,
      label: {
        show: false,
      },
      data: [
        { value: 1, name: '', itemStyle: { color: 'rgba(255, 255, 255, 0.36)' } },
      ],
    },
    ],
  };
  setChartOption(option);
};

const init = async(params: Record<string, string>) => {
  const { data } = await apiComprehensiveAnalysisObj.getFindAlarmTypeHighIncidenceAnalysis(params);
  chartsData = data;
  tableDta.value = data;
  renderChart();
};

defineExpose({
  init
});

const richColor = ['#899DF0', '#88DBC8', '#7ECDFF', '#FCBF6A', '#FF938D', '#CACFD6'];
</script>

<style scoped lang="scss">
.echart-container {
  width: 100%;
  height: 100%
}
</style>
