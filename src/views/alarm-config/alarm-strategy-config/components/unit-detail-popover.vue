<template>
  <fx-page-table
    ref="tableRef"
    :cols="cols"
    :table-data="tableData"
    :data-fetcher="getData"
    :table-props="{ border: 'bordered', rowKey: 'monitorUnitId' }"
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
import { useI18n } from 'vue-i18n';
import { apiYgfWarningConfigObj } from '@/apis/modules/alarm-config';
import { IpostFindUnitStrategyPageSpace } from '@/apis/modules/alarm-config/model';

const props = defineProps({
  id: String,
});

const searcher = {
  show: true,
  name: 'unitName',
  placeholder: '请输入监测点名称',
};

const { t } = useI18n();

const tableData = ref<IpostFindUnitStrategyPageSpace.List[]>([]);
const cols = ref([
  { title: `${t('region')}`, prop: 'regionName' },
  { title: '监测点名称', prop: 'unitName' },
  { title: '指标数据项', prop: 'targetDataName', minWidth: '200px' },
]);
const tableRef = ref<InstanceType<typeof FxPageTable>>();

watch(() => props.id, newId => {
  newId && tableRef.value?.reset();
});

const getData = async({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
  if (!props.id) return;
  // strategyId: props.id 筛选策略关联监测点
  const result = await apiYgfWarningConfigObj.postFindUnitStrategyPage(
    { pageSize, currentPage, ...params, strategyId: props.id }
  );
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};

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
