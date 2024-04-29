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
    <template #actions="{ row }">
      <hl-button type="link" @click="editUnit(row)">编辑</hl-button>
    </template>
  </fx-page-table-v2>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { FxPageTable, DataFetcherParams } from 'fx-front-framework';
import { HlMessageBox } from 'hongluan-ui';
import { omit } from 'lodash-es';
import { useI18n } from 'vue-i18n';
import { systemShow, SYSTEM_YGF } from '@/common';
import { SearchRiskType } from '@/views/monitoring-config/components/index';
import { useSort } from '@/hooks';
import { apiMonitorStrategyObj } from '@/apis/modules/monitor-strategy/fixed-cycle';
import { IpostFindMonitorUnitStrategyPageSpace } from '@/apis/modules/monitor-strategy/fixed-cycle/model';

const router = useRouter();
const { t } = useI18n();

const tableData = ref<(IpostFindMonitorUnitStrategyPageSpace.List)[]>([]);
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
  { title: '更新时间', prop: 'updatedAt', sortable: true, width: '200px' },
  { title: '操作', slotName: 'actions', align: 'center', fixed: 'right' },
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
    display: (item: any) => {
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
  const result = await apiMonitorStrategyObj.postFindMonitorUnitStrategyPage(
    searchParams
  );
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};

const riskChanged = (data: string[]) => {
  eventTypeCodes.value = data;
};
const openDetail = (row: IpostFindMonitorUnitStrategyPageSpace.List) => {
  router.push({
    name: 'monitoringConfigDetails',
    query: {
      title: '监测点预警策略',
      id: row.monitorStrategyId,
      source: 'unit-alarm-strategy-list',
    },
  });
};
const editUnit = async(row: IpostFindMonitorUnitStrategyPageSpace.List) => {
  await HlMessageBox.confirm(`【${row.strategyName}】策略关联的所有监测点执行策略同步更新!`, '编辑提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'warning',
    cancelButtonText: '取消',
  });
  router.push({
    name: 'unitAlarmStrategy',
    query: {
      action: 'edit',
      id: row.monitorStrategyId,
      unitName: row.unitName,
    },
  });
};
</script>
