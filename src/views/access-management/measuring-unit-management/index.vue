<template>
  <fx-page-table-v2 ref="tableRef" :cols="cols" :table-data="tableData" :table-props="{ rowKey: 'measureUnitId' }" :data-fetcher="getData" selector-col-count="count-xl-2 count-lg-1 count-md-1" :show-search-bar="false" :search-items="searchItems" @sort-change="sortChange">
    <template #toolbar-extra-after>
      <fx-action-button type="main" @click="addTag" label="新增计量单位" />
    </template>
    <template #action="{ row }">
      <hl-button type="link" @click="editUnit(row)">编辑</hl-button>
      <hl-button type="link" @click="delUnit(row)" :disabled="row.isRefer" no-fill>删除</hl-button>
    </template>
  </fx-page-table-v2>
  <MeasuringUnitDlg v-if="dlgVisible" :id="editintId" @cancel="dlgVisible=false" @ok="ok" />
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { FxPageTable, DataFetcherParams } from 'fx-front-framework';
import { CommonUtils } from 'fx-front-utils';
import { HlMessage, HlMessageBox } from 'hongluan-ui';
import { PlusButton } from '@/components';
import { useSort } from '@/hooks';
import { apiMeasureUnitObj } from '@/apis/modules/measure-unit';
import MeasuringUnitDlg from './measuring-unit-dlg.vue';

import type { IgetFindMeasureUnitPageSpace } from '@/apis/modules/measure-unit/model';

const tableData = ref<IgetFindMeasureUnitPageSpace.List[]>([]);
const cols = ref([
  {
    title: '',
    width: 'auto',
    align: 'left',
    slotName: 'tableIndex',
  },
  { title: '计量单位名称',
    prop: 'measureUnitCode',
    minWidth: '160px',
    showTooltip: true,
    tooltipProps: { maxWidth: '340px' } },
  { title: '显示名称',
    prop: 'measureUnitName',
    minWidth: '160px',
    showTooltip: true,
    tooltipProps: { maxWidth: '340px' } },
  { title: '描述',
    prop: 'desc',
    minWidth: '300px',
    showTooltip: true,
    tooltipProps: { maxWidth: '340px' } },
  { title: '更新时间', prop: 'updatedAt', sortable: true, minWidth: '200px' },
  {
    title: '操作',
    slotName: 'action',
    align: 'left',
    fixed: 'right',
    minWidth: '8em',
  },
]);

const searchItems = reactive([
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '计量单位名称',
    placeholder: '计量单位名称',
    value: '',
    name: 'measureUnitCode',
  },
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '显示名称',
    placeholder: '显示名称',
    value: '',
    name: 'measureUnitName',
  },
]);

const tableRef = ref<InstanceType<typeof FxPageTable>>();
const editintId = ref<string | number>('');
const dlgVisible = ref(false);

const { sortQuery, sortChange } = useSort(tableRef, cols);

const getData = async({
  pageSize,
  currentPage,
  params,
  setTotal,
}: DataFetcherParams) => {
  const searchParams = {
    currentPage,
    pageSize,
    ...params,
  };
  if (sortQuery.value) {
    searchParams.orderColumnStr = sortQuery.value.prop;
    searchParams.orderStr = sortQuery.value.sort;
  }
  const result = await apiMeasureUnitObj.getFindMeasureUnitPage(searchParams);
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};

const addTag = () => {
  editintId.value = '';
  dlgVisible.value = true;
};
const editUnit = (row: IgetFindMeasureUnitPageSpace.List) => {
  editintId.value = row.measureUnitId;
  dlgVisible.value = true;
};
const delUnit = async(row: IgetFindMeasureUnitPageSpace.List) => {
  await HlMessageBox.confirm('您确认删除此计量单位吗?', '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
  });
  await apiMeasureUnitObj.getRemoveMeasureUnit(row.measureUnitId);
  HlMessage.success('删除成功');
  tableRef.value?.refresh();
};

const ok = () => {
  dlgVisible.value = false;
  tableRef.value?.refresh();
};
</script>
