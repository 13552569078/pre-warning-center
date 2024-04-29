<template>
  <fx-page-table
    ref="tableRef"
    :cols="cols"
    :table-data="tableData"
    :data-fetcher="getData"
    :table-props="{ border: 'bordered', rowKey: 'monitorUnitId' }"
    :scrollbar-props="{ style: 'height:300px' }"
    selector-col-count="count-3"
    :show-col-config="false"
    :searcher="searcher"
    class="unit-detail-table w-full"
  >
  </fx-page-table>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { DataFetcherParams, FxPageTable } from 'fx-front-framework';
import { apiMonitorStrategyObj } from '@/apis/modules/monitor-strategy/fixed-cycle';
import { IpostFindMonitorStrategyUnitVOPageSpace } from '@/apis/modules/monitor-strategy/fixed-cycle/model';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  id: String,
});

const searcher = {
  show: true,
  name: 'unitName',
  placeholder: '请输入监测点名称',
};

const { t } = useI18n();

const tableData = ref<IpostFindMonitorStrategyUnitVOPageSpace.List[]>([]);
const cols = ref([
  { title: `${t('region')}`, prop: 'regionName', minWidth: '300px' },
  { title: '监测点名称', prop: 'unitName' },
]);
const tableRef = ref<InstanceType<typeof FxPageTable>>();

const getData = async({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
  if (!props.id) return;
  const result = await apiMonitorStrategyObj.postFindMonitorStrategyUnitVOPage(
    { pageSize, currentPage, ...params, monitorStrategyId: props.id }
  );
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};

watch(() => props.id, newId => {
  newId && tableRef.value?.reset();
});

</script>
<style lang="scss">
.unit-detail-table {
  .hb-table-toolbar {
    display: none;
  }
  .hb-table-searchbar {
    border-bottom: none;
  }
  .hl-pagination {
    .pagination-control {
      display: none;
    }
  }
}
</style>
