<template>
  <fx-page-table-v2
    ref="tableRef"
    :cols="cols"
    :table-data="tableData"
    :table-props="{ rowKey: 'monitorStrategyId' }"
    :data-fetcher="getData"
    :search-items="searchItems"
    selector-col-count="count-3"
    class="h-full"
    :searcher="{ show: false }"
    @sort-change="sortChange"
  >
    <template #risk="{ searchForm }">
      <search-risk-type @risk-changed="riskChanged" v-model="searchForm['risk']"/>
    </template>
    <template #strategyName="{ row }">
      <span class="text-primary cursor-pointer" @click="openDetail(row)">{{
        row.strategyName
      }}</span>
    </template>
    <template #actions="{ row }">
      <hl-button type="link" @click="cancelTel(row)">取消设为模板</hl-button>
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
import { HlMessageSuccess } from '@/common';
import { useSort } from '@/hooks';
import { apiYgfWarningConfigObj } from '@/apis/modules/alarm-config';
import { IpostFindStrategyPageSpace } from '@/apis/modules/alarm-config/model';
import { SearchRiskType } from '@/views/alarm-config/components/index';

const router = useRouter();
const { t } = useI18n();

const tableData = ref<IpostFindStrategyPageSpace.List[]>([]);
const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex',
  },
  {
    title: '策略名称',
    prop: 'strategyName',
    slotName: 'strategyName',
  },
  { title: `${t('warningType')}`, prop: 'eventTypeCodeName' },
  { title: '指标', prop: 'targetName' },
  { title: '更新时间', prop: 'updatedAt', sortable: true, minWidth: '200px' },
  { title: '操作', slotName: 'actions', align: 'left', fixed: 'right', width: '8em' },
]);

const searchItems = reactive([
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '模板名称',
    placeholder: '模板名称',
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
    display: (item:any) => {
      return item.value;
    },
  },
]);
const eventTypeCodes = ref<string[]>([]);

const tableRef = ref<InstanceType<typeof FxPageTable>>();
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
    isTemplate: 1
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
  const result =
    await apiYgfWarningConfigObj.postFindStrategyPage(
      searchParams
    );
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};

const openDetail = (row: IpostFindStrategyPageSpace.List) => {
  router.push({
    name: 'ygfWarningConfigDetails',
    query: {
      action: 'detail',
      title: '报警策略配置',
      id: row.strategyId
    },
  });
};
const cancelTel = async(row: IpostFindStrategyPageSpace.List) => {
  await HlMessageBox.confirm(`您确认取消[${row.strategyName}]模板吗?`, '取消模板提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
  });
  await apiYgfWarningConfigObj.postModifyTemplate(row.strategyId, 0);
  HlMessageSuccess('取消模板成功');
  tableRef.value?.refresh();
};
const riskChanged = (data: string[]) => {
  eventTypeCodes.value = data;
};

</script>
