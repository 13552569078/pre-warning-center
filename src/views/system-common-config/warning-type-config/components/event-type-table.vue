<template show-source>
  <fx-page-table-v2
    ref="pageTableRef"
    :cols="cols"
    :table-data="tableData"
    :table-props="{rowKey: 'systemCode'}"
    :data-fetcher="getData"
    :show-search-bar="false"
    :search-items="searchItems"
    @sort-change="sortChange"
  >
    <template #parentLabel="{ row }">

       <hb-text-overflow method="length" :length="12" effect="light" class="tree-start">
           {{ formatLabel(row.parentFullSystemCode, row.parentEventTypeName) }}
        </hb-text-overflow>
    </template>
    <template #alarmLevelTypeList="{ row }">
       <hb-text-overflow method="length" :length="14" effect="light" class="tree-start">
          {{ row.alarmLevelTypeList!=='--'?row.alarmLevelTypeList.join(", "):'--' }}
        </hb-text-overflow>
    </template>
    <template #action="{ row }">
      <hl-button v-if="row.isNeedStrategy" type="link" @click="$emit('config', row)">配置</hl-button>
    </template>
  </fx-page-table-v2>
</template>

<script lang="ts" setup>
import { PropType, ref, reactive } from 'vue';
import { DataFetcherParams, FxPageTable } from 'fx-front-framework';
import { CommonUtils } from 'fx-front-utils';
import { useSort } from '@/hooks';
import { apiEventTypeObj } from '@/apis/modules/event-type';
import { formatLabel } from '../utils';

import type { IgetListEventTypeVOPageEventTypeSpace } from '@/apis/modules/event-type/model';

const props = defineProps({
  tableType: {
    type: String as PropType<'system' | 'strategy'>,
    default: 'system'
  }
});
defineEmits(['config']);

const BASE_COLUMNS = [
  { title: '', align: 'center', width: 'fit-content', slotName: 'tableIndex' },
  { title: '系统编号', prop: 'systemCode', sortable: true },
  { title: '预警类型名称',
    prop: 'eventTypeName',
    minWidth: '160px',
    showTooltip: true,
    tooltipProps: { maxWidth: '340px' } },
  { title: '上级类型编号|名称', slotName: 'parentLabel', minWidth: '3em' },
  { title: '标准编号', prop: 'eventTypeCode' },
];
const searchItems = reactive([{
  type: 'input',
  maxlength: '20',
  showWordLimit: false,
  label: '预警类型名称',
  placeholder: '预警类型名称',
  value: '',
  name: 'eventTypeName',
}, {
  type: 'input',
  maxlength: '20',
  showWordLimit: false,
  label: '类型编号',
  placeholder: '类型编号',
  value: '',
  name: 'eventTypeCode',
}]);
const SYSTEM_CONFIG_COLUMNS = [
  ...BASE_COLUMNS,
  {
    title: '预警等级',
    slotName: 'warningLevelTypeList',
    // formatter: (_: any, __: any, cellValue: string[]) => cellValue.join(' ') || '--'
  },
  { title: '更新时间', prop: 'updatedAt', sortable: true, minWidth: '200px' },
  { title: '描述', prop: 'eventTypeDesc', showTooltip: true, minWidth: '150px', tooltipProps: { width: '200px' } },
];
const STRATEGY_CONFIG_COLUMNS = [
  ...BASE_COLUMNS,
  {
    title: '配置状态',
    prop: 'handleConfig',
    formatter: (row: IgetListEventTypeVOPageEventTypeSpace.List, __: any, cellValue: number) => row.isNeedStrategy ? (cellValue ? '已配置' : '未配置') : '--'
  },
  { title: '更新时间', prop: 'updatedAt', sortable: true, minWidth: '200px' },
  { title: '操作', slotName: 'action' },
];

const cols = ref(props.tableType === 'system' ? SYSTEM_CONFIG_COLUMNS : STRATEGY_CONFIG_COLUMNS);

const tableData = ref<IgetListEventTypeVOPageEventTypeSpace.List[]>([]);
const pageTableRef = ref<InstanceType<typeof FxPageTable>>();
const systemCode = ref('');

const { sortQuery, sortChange } = useSort(pageTableRef, cols);

const getData = async({ pageSize, currentPage, setTotal, params }: DataFetcherParams) => {
  const searchParams = {
    pageSize,
    currentPage,
    ...params,
  };
  if (sortQuery.value) {
    searchParams.orderColumnStr = sortQuery.value.prop;
    searchParams.orderStr = sortQuery.value.sort;
  }
  const result = await apiEventTypeObj.getListEventTypeVOPageEventType(
    CommonUtils.toQuery({ ...searchParams, parentSystemCode: systemCode.value === '-1' ? '' : systemCode.value })
  );
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};

const queryBySystemCode = (sc: string = '', isReset = true) => {
  systemCode.value = sc;
  if (isReset) {
    pageTableRef.value?.reset();
  } else {
    pageTableRef.value?.refresh();
  }
};

const handleSortChange = (prop: string, sort: boolean | string) => {
  console.log(prop, sort);
};

defineExpose({
  queryBySystemCode
});
</script>
<style lang="scss" scoped>
.table-panel {
  width: calc(100vw - var(--layout-aside-width) - 2 * var(--xl) - var(--lg) - 10 * var(--xl));
}
</style>
