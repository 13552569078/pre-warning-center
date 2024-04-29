<template>
  <fx-page-table-v2
    ref="tableRef"
    v-if="isShowTable"
    :cols="cols"
    :table-data="tableData"
    :data-fetcher="getData"
    :search-items="searchItems"
    selector-col-count="count-3"
    :searcher="{ show: false }"
    search-placement="top"
  >
    <template #point="{ searchForm }">
      <search-monitor-event
        @point-changed="pointChanged"
        v-model="searchForm['monitorUnitId']"
        @clear-point="clearPoint"
      />
    </template>
    <template #status="{ row }">
      {{row.monitorEquipName}}&nbsp;&nbsp;
      <hl-badge
        value="在线"
        v-if="row.online===1"
        type="success"
        class="m-r-md"
      />
      <hl-badge
        v-else-if="row.online===0"
        value="离线"
        type="danger"
        class="m-r-md"
      />
    </template>
    <template #actions="{ row }">
      <hl-button
        type="link"
        @click="showDetail(row, 'realData')"
      >实时数据</hl-button>
      <hl-button
        type="link"
        @click="showDetail(row, 'historyData')"
      >历史数据</hl-button>
    </template>
  </fx-page-table-v2>
  <modalEvent
    v-if="eventInfoVisibel"
    v-model="eventInfoVisibel"
    :monitorUnitId="activeMonitorUnitId"
    :activeName="activeName"
  />
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, provide, nextTick } from 'vue';
import { FxPageTable, DataFetcherParams } from 'fx-front-framework';
import { getEventTypeSearchItem } from '@/views/monitoring-config/event-type/utils';
import { SearchMonitorEvent } from '@/views/monitoring-elements/components/index';
// new api
import { IgetDataPageSpace } from '@/apis/modules/monitor-data-query/model';
import { apiMonitorDataQueryObj } from '@/apis/modules/monitor-data-query';

import modalEvent from './components/modalEvent.vue';
const eventInfoVisibel = ref(false);
const activeMonitorUnitId = ref();
const activeName = ref('realData');
const showDetail = (row: IgetDataPageSpace.List, value: string) => {
  activeMonitorUnitId.value = row.monitorUnitId;
  eventInfoVisibel.value = true;
  activeName.value = value;
};

const tableData = ref<IgetDataPageSpace.List[]>([]);
const tableRef = ref<InstanceType<typeof FxPageTable>>();
const isShowTable = ref(false);
const pointData = ref();

const cols = ref([
  {
    title: '序号',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex',
  },
  { title: '监测对象', prop: 'monitorRegionName' },
  { title: '监测点', prop: 'monitorUnitName' },
  { title: '设施名称', prop: 'facilityName', minWidth: '200px', showTooltip: true, tooltipProps: { maxWidth: '260px' } },
  { title: '监测设备及联网状态', slotName: 'status', align: 'left' },
  { title: '操作', slotName: 'actions', align: 'center', fixed: 'right' },
]);
const searchItems = reactive([
  {
    label: '监测点',
    span: 'grid-col-span-xl-2',
    type: 'slot',
    slotName: 'point',
    name: 'monitorUnitId',
    value: '',
    display: (item: any) => {
      return item.value;
    },
  },
]);

const getData = async({
  pageSize,
  currentPage,
  params,
  setTotal,
}: DataFetcherParams) => {
  const searchParams = {
    pageSize,
    currentPage,
    ...params,
  };
  if (pointData.value?.treeType) {
    searchParams.monitorUnitName = pointData.value.treeName;
  }
  const result = await apiMonitorDataQueryObj.getDataPage(searchParams);
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};

const pointChanged = (data: any) => {
  pointData.value = {
    ...data,
  };
};

// 查询事件；查询等级；
const getSearchItems = async() => {
  searchItems.push({
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '监测设备',
    placeholder: '监测设备',
    value: '',
    name: 'monitorEquipName',
  });
  searchItems.push({
    type: 'select',
    label: '设备联网状态',
    placeholder: '设备联网状态',
    value: '',
    name: 'online',
    prop: {
      label: 'label',
      value: 'value',
    },
    options: [
      {
        label: '在线',
        value: '1',
      },
      {
        label: '离线',
        value: '0',
      },
    ],
  });
  isShowTable.value = true;
};
const clearPoint = () => {
  pointData.value = null;
};

onMounted(() => {
  getSearchItems();
});
</script>
