<template>
  <div class="echart-container w-full"
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
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { RecordAny } from '@/types';
import { apiAlarmHighIncidenceObj as API } from '@/apis/modules/whole-analysis/alarm-high-incidence/index';
import { IgetFindUnitAlarmHighIncidenceAnalysisSpace } from '@/apis/modules/whole-analysis/alarm-high-incidence/model';
import ScrollingBarChart from '@/views/whole-analysis/high-incidence/components/scrolling-bar-chart.vue';

const tableData = ref<RecordAny[]>([]);

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
