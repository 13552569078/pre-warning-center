<template>
  <div v-show="showType === 'echarts'" class="echart-container w-full"
    style="height: calc(var(--xxl) * 10.45)">
    <scrolling-bar-chart
      :chart-data="tableData"
      height="100%"
      :bar-style="{
        color: '#36A4FF',
        width: '8px',
        background: 'rgba(47,71,110,0.05)'
      }"
    />
  </div>
  <hl-scrollbar class="w-full" style="height: calc(var(--xxl) * 10)" v-show="showType === 'table'">
    <hl-simple-table :cols="cols" :data="tableData" fixed-header border="bordered">
      <template #tableIndex="{ rowIndex }">
      <span>{{ rowIndex + 1 }}</span>
    </template>
    </hl-simple-table>
  </hl-scrollbar>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { RecordAny } from '@/types';
import { apiComprehensiveAnalysisObj as API } from '@/apis/modules/whole-analysis/high-incidence/index';
import { IgetFindUnitAlarmHighIncidenceAnalysisSpace } from '@/apis/modules/whole-analysis/high-incidence/model';
import ScrollingBarChart from './scrolling-bar-chart.vue';

const props = defineProps({
  cardType: {
    type: String,
    default: 'echarts',
  },
});

const cols = ref([
  { title: '', slotName: 'tableIndex', width: 'fit-content', },
  { title: '监测主体', prop: 'label', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '总数', prop: 'value', minWidth: '4em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '高发监测点1', prop: 'highOneName', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '数目', prop: 'highOneNum', minWidth: '4em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '高发监测点2', prop: 'highTwoName', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '数目', prop: 'highTwoNum', minWidth: '4em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '高发监测点3', prop: 'highThrName', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '数目', prop: 'highThrNum', minWidth: '4em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
]);
const tableData = ref<RecordAny[]>([]);
const showType = computed(() => props.cardType);

const init = async(params:Record<string, string>) => {
  const { data } = await API.getFindUnitAlarmHighIncidenceAnalysis(params);
  tableData.value = data.map((item:IgetFindUnitAlarmHighIncidenceAnalysisSpace.Data) => {
    return {
      label: item.monitorRegionName,
      value: item.alarmNumber,
      alarmNumber: item.alarmNumber,
      unitAlarmHighIncidenceAnalysisItemVOList: item.unitAlarmHighIncidenceAnalysisItemVOList,
      highOneName: item.unitAlarmHighIncidenceAnalysisItemVOList[0] ? item.unitAlarmHighIncidenceAnalysisItemVOList[0].monitorUnitName : '--',
      highOneNum: item.unitAlarmHighIncidenceAnalysisItemVOList[0] ? item.unitAlarmHighIncidenceAnalysisItemVOList[0].alarmNumber : '--',
      highTwoName: item.unitAlarmHighIncidenceAnalysisItemVOList[1] ? item.unitAlarmHighIncidenceAnalysisItemVOList[1].monitorUnitName : '--',
      highTwoNum: item.unitAlarmHighIncidenceAnalysisItemVOList[1] ? item.unitAlarmHighIncidenceAnalysisItemVOList[1].alarmNumber : '--',
      highThrName: item.unitAlarmHighIncidenceAnalysisItemVOList[2] ? item.unitAlarmHighIncidenceAnalysisItemVOList[2].monitorUnitName : '--',
      highThrNum: item.unitAlarmHighIncidenceAnalysisItemVOList[2] ? item.unitAlarmHighIncidenceAnalysisItemVOList[2].alarmNumber : '--'
    };
  });
};

defineExpose({
  init
});
</script>
