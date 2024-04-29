<template>
  <hl-group
    gap="var(--lg)"
    full
    class="h-full p-lg"
    dir="vertical"
  >
    <hl-group
      full
      dir="vertical"
      class="monitor-history-data"
    >
        <fx-page-table-v2
        ref="tableRef"
        v-if="isShowTable"
        :cols="cols"
        :table-data="tableData"
        :data-fetcher="getListMonitorDataList"
        :search-items="searchItems"
        selector-col-count="count-3"
        :searcher="{ show: false }"
        search-placement="top">
      </fx-page-table-v2>
    </hl-group>
  </hl-group>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { FxPageTable, DataFetcherParams } from 'fx-front-framework';
import { useMonitorCenter } from '@/hooks';
import { Indexable } from 'fx-front-utils';
import { apiMonitorDataQueryObj } from '@/apis/modules/monitor-data-query';
import { IgetHistoryDataSpace } from '@/apis/modules/monitor-data-query/model';

interface COLS {
  title: string;
  prop?: string;
  width?: string | number;
  slotName?: string;
  fixed?: string;
}

const props = defineProps({
  monitorUnitId: {
    type: String,
    default: '',
  },
  startTime: {
    type: String,
    default: '',
  },
  endTime: {
    type: String,
    default: '',
  },
  pointIdData: {
    type: String,
    default: '',
  },
});

const tableData = ref<any[]>([]);
const tableRef = ref<InstanceType<typeof FxPageTable>>();
const isShowTable = ref(false);
const cols = ref<COLS[]>([
  { title: '', slotName: 'tableIndex', width: 'fit-content', },
  { title: '监测项值', prop: 'factorValue', minWidth: '120' },
  { title: '监测上报时间', prop: 'collectTime' },
]);
const searchItems = reactive([]);
const getListMonitorDataList = async({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
  const searchParams = {
    pageSize,
    currentPage,
    collectionStartTime: params.collectionStart,
    collectionEndTime: params.collectionEnd,
    monitorUnitId: props.monitorUnitId,
    ...params,
  };
  const result = await apiMonitorDataQueryObj.getHistoryData(searchParams);
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};
const getSearchItems = async() => {
  const result1 = await apiMonitorDataQueryObj.getFactorList(
    props.monitorUnitId
  );
  const item1 = {
    span: 'xl:col-span-1',
    type: 'select',
    label: '监测项',
    placeholder: '监测项',
    value: '',
    filterable: true,
    name: 'factorCode',
    prop: {
      label: 'factorName',
      value: 'factorCode',
    },
    options: [...result1.data],
  };
  searchItems.push(item1);
  searchItems.push(
    {
      type: 'datetimerange',
      label: '监测上报时间',
      name: 'collection',
      value: [],
      'is-range': true,
      'range-separator': '至',
      'start-placeholder': '开始时间',
      'end-placeholder': '结束时间',
      placeholder: '选择时间范围',
      format: 'YYYY-MM-DD HH:mm:ss',
      'value-format': 'YYYY-MM-DD HH:mm:ss',
    }
  );
  isShowTable.value = true;
};
const init = () => {
  getSearchItems();
};

init();

const selector = reactive({
  colCount: 'md:count-3 sm:count-2',
  items: searchItems,
});
</script>
<style lang="scss">
.rule-tag {
  background: rgba(113, 248, 252, 0.24) !important;
  color: rgba(113, 248, 252, 1) !important;
}

</style>
