<template>
  <fx-page-table-v2 ref="tableRef" :cols="cols" :table-data="tableData" :table-props="{ rowKey: 'monitorStrategyId' }" :data-fetcher="getData" :search-items="searchItems" selector-col-count="count-3" :searcher="{ show: false }" @sort-change="sortChange">
    <template #risk="{ searchForm }">
      <search-risk-type @risk-changed="riskChanged" v-model="searchForm['risk']" />
    </template>
    <!-- 策略类型 -->
    <template #triggerTypeSearch="{ searchForm }">
      <check-box-search ref="triggerTypeRef" v-model="searchForm['triggerTypes']" :options="alarmStateOptions" />
    </template>
    <template #strategyName="{ row }">
      <span class="text-primary cursor-pointer" @click="openDetail(row)">{{ row.strategyName }}</span>
    </template>
    <!-- 策略 类型 -->
    <template #triggerType="{ row }">
      {{ row.triggerType === 'TRIGGER_CYCLE' ? '周期策略' : row.triggerType === 'TRIGGER_DATA' ? '数据触发' : row.triggerType === 'TRIGGER_SECOND' ? '二次预警' : '--' }}
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
import { IpostFindMonitorStrategyPageSpace } from '@/apis/modules/monitor-strategy/fixed-cycle/model';
import { alarmStateOptions, STRATEGY_TYPE_ROUTERNAME_DETAIL } from '@/views/monitoring-config/alarm-strategy-config/utils';
import { apiMonitorStrategyObj } from '@/apis/modules/monitor-strategy/fixed-cycle';
import { SearchRiskType } from '@/views/monitoring-config/components/index';

const router = useRouter();
const { t } = useI18n();

const tableData = ref<IpostFindMonitorStrategyPageSpace.List[]>([]);
const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex'
  },
  {
    title: '模板名称',
    prop: 'strategyName',
    slotName: 'strategyName'
  },
  { title: `${t('warningType')}`, prop: 'eventTypeCodeName' },
  { title: '策略类型', slotName: 'triggerType' },
  { title: '更新时间', prop: 'updatedAt', sortable: true, minWidth: '200px' },
  { title: '操作', slotName: 'actions', align: 'left', fixed: 'right', width: '8em' }
]);

const searchItems = reactive([
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '模板名称',
    placeholder: '模板名称',
    value: '',
    name: 'strategyName'
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
    }
  },
  {
    type: 'slot',
    slotName: 'triggerTypeSearch',
    label: '策略类型',
    placeholder: '请选择策略类型',
    value: [],
    name: 'triggerTypes',
    display: (item: any) => {
      return triggerTypeRef.value?.getOptionName(item.value);
    }
  }
]);

const eventTypeCodes = ref<string[]>([]);
const triggerTypeRef = ref();

const tableRef = ref<InstanceType<typeof FxPageTable>>();
const { sortQuery, sortChange } = useSort(tableRef, cols);

const getData = async ({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
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
  const result = await apiMonitorStrategyObj.postFindMonitorStrategyPage(searchParams);
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};

const openDetail = (row: IpostFindMonitorStrategyPageSpace.List) => {
  const routerName = STRATEGY_TYPE_ROUTERNAME_DETAIL[row.triggerType];
  router.push({
    name: routerName,
    query: {
      title: '预警策略配置',
      id: row.monitorStrategyId,
      source: 'alarm-strategy-config',
      action: row.triggerType === 'TRIGGER_CYCLE' ? 'cycle' : 'trigger'
    }
  });
};
const cancelTel = async (row: IpostFindMonitorStrategyPageSpace.List) => {
  await HlMessageBox.confirm(`您确认取消[${row.strategyName}]模板吗?`, '取消模板提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消'
  });
  await apiMonitorStrategyObj.postModifyTemplate(row.monitorStrategyId, 0);
  HlMessageSuccess('取消模板成功');
  tableRef.value?.refresh();
};
const riskChanged = (data: string[]) => {
  eventTypeCodes.value = data;
};
</script>
