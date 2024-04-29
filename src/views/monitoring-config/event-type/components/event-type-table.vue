<template show-source>
  <fx-page-table-v2 ref="pageTableRef" :cols="cols" :table-data="tableData" :table-props="{ rowKey: 'systemCode' }" :data-fetcher="getData" :show-search-bar="false" :search-items="searchItems" @sort-change="sortChange">
    <template #parentLabel="{ row }">
      <hb-text-overflow method="length" :length="12" effect="light" class="tree-start">
        <!-- {{ formatLabel(row.parentFullSystemCode, row.parentEventTypeName) }} -->
        {{ row.parentEventTypeName }}
      </hb-text-overflow>
    </template>
    <template #alarmLevelTypeList="{ row }">
      <hb-text-overflow method="length" :length="20" effect="light" class="tree-start">
        {{ row.alarmLevelTypeList !== '--' ? row.alarmLevelTypeList.join(', ') : '--' }}
      </hb-text-overflow>
    </template>
    <template #action="{ row }">
      <hl-button type="link" @click="edit(row)">编辑</hl-button>
      <hl-button type="link" @click="doDel(row)" :disabled="!!row.isRefer" no-fill>删除</hl-button>
      <hl-button :disabled="!row.isNeedStrategy || !row.alarmLevelTypeList.length" type="link" @click="$emit('config', row)" effect="light" no-fill>警后策略配置</hl-button>
    </template>
  </fx-page-table-v2>
</template>

<script lang="ts" setup>
import { PropType, ref, reactive } from 'vue';
import { DataFetcherParams, FxPageTable } from 'fx-front-framework';
import { CommonUtils } from 'fx-front-utils';
import { useI18n } from 'vue-i18n';
import { useSort } from '@/hooks';
import { apiEventTypeObj } from '@/apis/modules/event-type';
import type { IgetListEventTypeVOPageEventTypeSpace } from '@/apis/modules/event-type/model';
import type { IgetListEventTreeVOsEventTypeSpace } from '@/apis/modules/event-type/model';
import { formatLabel } from '../utils';

const { t } = useI18n();

const props = defineProps({
  tableType: {
    type: String as PropType<'system' | 'strategy'>,
    default: 'system'
  }
});

const emit = defineEmits(['config', 'edit', 'del']);

const BASE_COLUMNS = [
  { title: '', align: 'left', minWidth: '46px', slotName: 'tableIndex' },
  { title: '系统编号', prop: 'systemCode', minWidth: '8em', tooltipProps: { maxWidth: '340px' }, showTooltip: true, fixed: 'left' }, //, sortable: true
  { title: `${t('warningType')}名称`, prop: 'eventTypeName', minWidth: '160px', showTooltip: true, tooltipProps: { maxWidth: '340px' }, fixed: 'left' },
  {
    title: '上级类型名称',
    slotName: 'parentLabel',
    minWidth: '3em',

    showTooltip: true,
    tooltipProps: { maxWidth: '340px' }
  },
  { title: '标准编号', prop: 'eventTypeCode', minWidth: '120px', showTooltip: true, tooltipProps: { maxWidth: '340px' } },
  {
    title: '预警等级',
    slotName: 'alarmLevelTypeList',
    minWidth: '150px'
    // formatter: (_: any, __: any, cellValue: string[]) => cellValue.join(' ') || '--'
  }
];
const searchItems = reactive([
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: `${t('warningType')}名称`,
    placeholder: `${t('warningType')}名称`,
    value: '',
    name: 'eventTypeName'
  }
  // {
  //   type: 'input',
  //   maxlength: '20',
  //   showWordLimit: false,
  //   label: '类型编号',
  //   placeholder: '类型编号',
  //   value: '',
  //   name: 'eventTypeCode',
  // }
]);
const SYSTEM_CONFIG_COLUMNS = [
  ...BASE_COLUMNS,
  {
    title: '警后策略',
    prop: 'handleConfig',
    formatter: (row: IgetListEventTypeVOPageEventTypeSpace.List, __: any, cellValue: number) => (row.isNeedStrategy ? (cellValue ? '已配置' : '未配置') : '--'),
    minWidth: '100px'
  },
  { title: '更新时间', prop: 'updatedAt', sortable: true, minWidth: '200px' },
  { title: '描述', prop: 'eventTypeDesc', showTooltip: true, minWidth: '150px' },
  { title: '操作', prop: 'action', slotName: 'action', fixed: 'right' }
];
const STRATEGY_CONFIG_COLUMNS = [
  ...BASE_COLUMNS,
  {
    title: '警后策略',
    prop: 'handleConfig',
    formatter: (row: IgetListEventTypeVOPageEventTypeSpace.List, __: any, cellValue: number) => (row.isNeedStrategy ? (cellValue ? '已配置' : '未配置') : '--'),
    minWidth: '100px'
  },
  { title: '更新时间', prop: 'configUpdatedAt', sortable: true, minWidth: '200px' },
  { title: '操作', prop: 'action', slotName: 'action', fixed: 'right' }
];

const cols = ref(props.tableType === 'system' ? SYSTEM_CONFIG_COLUMNS : STRATEGY_CONFIG_COLUMNS);
// if (localStorage.getItem('sceneCode') && localStorage.getItem('sceneCode') !== 'ALL') cols.value.splice(cols.value.length - 1, 1);

const tableData = ref<IgetListEventTypeVOPageEventTypeSpace.List[]>([]);
const pageTableRef = ref<InstanceType<typeof FxPageTable>>();
const systemCode = ref('');

const { sortQuery, sortChange } = useSort(pageTableRef, cols);

const getData = async ({ pageSize, currentPage, setTotal, params }: DataFetcherParams) => {
  const searchParams = {
    pageSize,
    currentPage,
    ...params
  };
  if (sortQuery.value) {
    searchParams.orderColumnStr = sortQuery.value.prop;
    searchParams.orderStr = sortQuery.value.sort;
  }
  const result = await apiEventTypeObj.getListEventTypeVOPageEventType(CommonUtils.toQuery({ ...searchParams, parentSystemCode: systemCode.value === '-1' ? '' : systemCode.value }));
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};

// 操作列
const doDel = (data: IgetListEventTreeVOsEventTypeSpace.Data) => {
  emit('del', {
    data,
    treeOperCallback: () => {
      queryBySystemCode(data.parentFullSystemCode);
    }
  });
};
const edit = (data: IgetListEventTreeVOsEventTypeSpace.Data) => {
  emit('edit', {
    data,
    treeOperCallback: () => {
      queryBySystemCode(data.parentFullSystemCode);
    }
  });
};

const queryBySystemCode = (sc: string = '', isReset = true) => {
  systemCode.value = sc;
  if (isReset) {
    pageTableRef.value?.reset();
  } else {
    pageTableRef.value?.refresh();
  }
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
