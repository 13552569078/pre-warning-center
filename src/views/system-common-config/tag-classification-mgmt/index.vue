<template>
  <fx-page-table-v2 ref="tableRef" :cols="cols" :table-data="tableData" :table-props="{ rowKey: 'tagInfoId' }" :data-fetcher="getData" selector-col-count="count-3" :searcher="{ show: false }" class="h-full">
    <template #toolbar-extra-after>
      <fx-action-button type="main" @click="addTag" label="新增标签" />
    </template>
    <template #action="{ row }">
      <hl-button type="link" @click="editTag(row)">编辑</hl-button>
      <hl-button type="link" @click="delTag(row)" no-fill :disabled="row.hasUsed">删除</hl-button>
    </template>
  </fx-page-table-v2>
  <tag-classification-dlg v-if="dlgVisible" :id="editintId" @cancel="dlgVisible = false" @ok="submitOk" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { FxPageTable, DataFetcherParams } from 'fx-front-framework';
import { HlMessageBox } from 'hongluan-ui';
import { HlMessageSuccess } from '@/common';
import { PlusButton } from '@/components';
import { apiTagClassificationObj } from '@/apis/modules/tag';
import { IpostPageSpace } from '@/apis/modules/tag/model';
import TagClassificationDlg from './tag-classification-dlg.vue';

const tableData = ref<IpostPageSpace.List[]>([]);
const tableRef = ref<InstanceType<typeof FxPageTable>>();
const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex'
  },
  { title: '标签分类标识', prop: 'tagCode', minWidth: '200px', showTooltip: true, tooltipProps: { maxWidth: '440px' } },
  { title: '标签分类名称', prop: 'tagName', minWidth: '200px', showTooltip: true, tooltipProps: { maxWidth: '440px' } },
  { title: '描述', prop: 'tagDesc', showTooltip: true, tooltipProps: { maxWidth: '640px' } },
  { title: '操作', slotName: 'action', align: 'left', minWidth: '8em' }
]);

const editintId = ref<string>('');
const dlgVisible = ref(false);

const getData = async({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
  const searchParams = {
    pageSize,
    currentPage,
    ...params
  };
  const result = await apiTagClassificationObj.postPage(searchParams);
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};
const delTag = async(row: IpostPageSpace.List) => {
  await HlMessageBox.confirm(`您确认删除[${row.tagName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消'
  });
  await apiTagClassificationObj.deleteT(row.tagInfoId);
  HlMessageSuccess('删除成功');
  tableRef.value?.refresh();
};
const addTag = () => {
  editintId.value = '';
  dlgVisible.value = true;
};
const editTag = (row: IpostPageSpace.List) => {
  editintId.value = row.tagInfoId;
  dlgVisible.value = true;
};
const submitOk = () => {
  dlgVisible.value = false;
  tableRef.value?.refresh();
};
</script>
