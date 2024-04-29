<template>
  <fx-page-table-v2 ref="tableRef" :cols="cols" :table-data="tableData" :data-fetcher="getData" :search-items="searchItems" selector-col-count="count-3" :searcher="{ show: false }" @sort-change="sortChange">
    <!-- 风险分类搜索 -->
    <template #risk="{ searchForm }">
      <search-risk-type @risk-changed="riskChanged" v-model="searchForm['risk']" />
    </template>
    <template #strategyName="{ row }">
      <span class="text-primary cursor-pointer" @click="openDetail(row)">{{
        row.strategyName
      }}</span>
    </template>
  </fx-page-table-v2>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { FxPageTable, DataFetcherParams } from 'fx-front-framework';
import { omit } from 'lodash-es';
import { useI18n } from 'vue-i18n';
import { Indexable } from 'fx-front-utils';
import { SearchRiskType } from '@/views/alarm-config/components/index';
import { useSort } from '@/hooks';
import { apiYgfWarningConfigObj } from '@/apis/modules/alarm-config';
import { IpostFindUnitStrategyPageSpace } from '@/apis/modules/alarm-config/model';

const router = useRouter();
const { t } = useI18n();

const tableData = ref<(IpostFindUnitStrategyPageSpace.List)[]>([]);
const eventTypeCodes = ref<string[]>([]);
const tableRef = ref<InstanceType<typeof FxPageTable>>();
const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex',
  },
  { title: '监测主体', prop: 'regionName' },
  { title: '监测点', prop: 'unitName' },
  { title: `${t('warningType')}`, prop: 'eventTypeCodeName' },
  { title: '策略名称', prop: 'strategyName', minWidth: '16em', slotName: 'strategyName' },
  { title: '监测指标', prop: 'targetName', minWidth: '200px' },
  { title: '指标数据项', prop: 'targetDataName', minWidth: '200px' },
  { title: '更新时间', prop: 'updatedAt', sortable: true, minWidth: '200px' },
]);

const searchItems = reactive([
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '监测主体名称',
    placeholder: '监测主体名称',
    value: '',
    name: 'regionName',
  },
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '监测点名称',
    placeholder: '监测点名称',
    value: '',
    name: 'unitName',
  },
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '策略名称',
    placeholder: '策略名称',
    value: '',
    name: 'strategyName',
  },
  {
    label: `${t('warningType')}`,
    span: 'grid-col-span-xl-2',
    type: 'slot',
    slotName: 'risk',
    name: 'risk',
    value: '',
    display: (item: Indexable<string>) => {
      return item.value;
    },
  },
]);

const { sortQuery, sortChange } = useSort(tableRef, cols);

const getData = async({
  pageSize,
  currentPage,
  params,
  setTotal,
}: DataFetcherParams) => {
  let searchParams = {
    pageSize,
    currentPage,
    ...params,
  };
  if (sortQuery.value) {
    searchParams.orderColumnStr = sortQuery.value.prop;
    searchParams.orderStr = sortQuery.value.sort;
  }
  if (params.risk) {
    searchParams.eventTypeCodes = eventTypeCodes.value;
  }
  if (eventTypeCodes.value.length === 0) {
    searchParams = omit(searchParams, 'eventTypeCodes');
  }
  searchParams = omit(searchParams, 'risk');
  const result = await apiYgfWarningConfigObj.postFindUnitStrategyPage(
    searchParams
  );
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};

const riskChanged = (data: string[]) => {
  eventTypeCodes.value = data;
};
const openDetail = (row: IpostFindUnitStrategyPageSpace.List) => {
  router.push({
    name: 'ygfWarningConfigDetails',
    query: {
      action: 'detail',
      title: '报警策略配置',
      id: row.strategyId
    },
  });
};
</script>
