<template>
  <hl-panel class style="height: 385px;" full header-style="gap: 0px;" borderless padding="var(--xl)"
    header-class="p-y-lg p-x-xl bg-content"
    body-class="display-flex items-left items-top flex-row gap-lg p-t-sm p-b-lg p-x-xl bg-content">
    <template #header>
      <div class="panel-header-left">
        <hl-icon class="static" type="primary" size="md">
          <FillOrnamentTitle4></FillOrnamentTitle4>
        </hl-icon>
      </div>
      <div class="panel-title">
        <h6 class="text-title">最新预警 （5条）</h6>
      </div>
      <div class="panel-header-right"></div>
    </template>
    <template #default>
      <hl-simple-table table-fixed :cols="cols" :data="tableData" border="bordered" size="small">
        <template #tableIndex="{ rowIndex }">
          <span>{{ rowIndex + 1 }}</span>
        </template>
      </hl-simple-table>
    </template>
  </hl-panel>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { apiHomePageObj } from '@/apis/modules/home-page';
import { IgetFindRecentAlarmListSpace } from '@/apis/modules/home-page/model';

const cols = ref([
  { title: '', slotName: 'tableIndex', width: '4em', align: 'center' },
  { title: '预警时间', prop: 'alarmTime', minWidth: '190px' },
  { title: '预警标题', prop: 'alarmTitle', showTooltip: true, tooltipProps: { width: '240px' } },
  { title: '预警等级', prop: 'alarmLevelName', width: '8em' },
]);
const tableData = ref<IgetFindRecentAlarmListSpace.Data[]>([]);

const getData = async() => {
  const { data } = await apiHomePageObj.getFindRecentAlarmList();
  tableData.value = data;
};

getData();
</script>
