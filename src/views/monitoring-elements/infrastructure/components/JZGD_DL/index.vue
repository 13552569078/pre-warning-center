<template>
  <fx-page-table-v2
    ref="tableRef"
    v-if="shwoTable"
    :cols="cols"
    :table-data="tableData"
    :data-fetcher="getData"
    selector-col-count="count-3"
    search-placement="top"
    :search-items="searchItems"
    :searcher="{ show: false }"
    :selection-actions="selectionActions"
    @selected-row-keys="selectedRowKeys"
    @sort-change="sortChange"
  >
      <template #area="{ searchForm }">
        <search-area @area-changed="areaChanged" v-model="searchForm['areaCode']" @clear-area="clearArea" />
      </template>
    <template #actions="{ row }">
      <hl-button
        type="link"
        @click="detailFunc(row)"
      >查看</hl-button>
      <hl-button
        type="link"
        @click="editFunc(row)"
      >编辑</hl-button>
      <hl-button
        type="link"
        @click="deleteFunc(row)"
      >删除</hl-button>
    </template>
    <template #toolbar-extra-after>
      <!-- <new-button
        :title="'新增建筑工地'"
        @click-add="addFunc()"
      /> -->
      <fx-action-button label="新增建筑工地" type="main" @click-add="addFunc()"/>
    </template>
  </fx-page-table-v2>

  <detail-dlg v-if="detailDlgVisible" :id="currentId" @close="detailDlgVisible = false"/>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { HlMessageBox, HlMessage } from 'hongluan-ui';
import { DataFetcherParams } from 'fx-front-framework';
import { Indexable } from 'fx-front-utils';
import { useSort } from '@/hooks';
// import { getAreaListItem } from '@/views/monitoring-elements/utils';
import { apiFacilitySiteObj } from '@/apis/modules/special-facility/facility-site';
import { IpostPageListSpace } from '@/apis/modules/special-facility/facility-site/model';
import { useDelCheck } from '../../use-delete-check';

import Add from './add.vue';
import NewButton from '../new-button.vue';
import DetailDlg from './detail-dlg.vue';

const props = defineProps({
  regionTypeCode: {
    type: String,
  },
});

const router = useRouter();
const { checkDel } = useDelCheck();

const tableData = ref<IpostPageListSpace.List[]>([]);
const tableRef = ref();
const activeRegionId = ref();
const selectRows = ref();
const shwoTable = ref(false);
const areaCode = ref();
const detailDlgVisible = ref();
const currentId = ref();

const cols = ref([
  { title: '', slotName: 'tableSelection', headerSlotName: 'selectionCol' },
  { title: '建筑工地名称', prop: 'facilityName', minWidth: '200px', showTooltip: true, tooltipProps: { maxWidth: '260px' } },
  { title: '建筑工地类型', prop: 'siteTypeName', minWidth: '200px', showTooltip: true, tooltipProps: { maxWidth: '260px' } },
  { title: '行政区划', prop: 'areaName' },
  { title: '施工单位', prop: 'constructionUnit' },
  { title: '施工单位责任人', prop: 'constructionPerson' },
  { title: '更新时间', prop: 'updatedAt', minWidth: '200px', sortable: true },
  {
    title: '操作',
    slotName: 'actions',
    align: 'left',
    fixed: 'right',
    minWidth: '180px',
  },
]);
const searchItems = reactive([
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '建筑工地名称',
    placeholder: '请输入建筑工地名称',
    value: '',
    name: 'facilityName',
  },
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '施工单位',
    placeholder: '请输入施工单位',
    value: '',
    name: 'constructionUnit',
  },
] as Indexable<any>[]);

const { sortQuery, sortChange } = useSort(tableRef, cols);
const selectedRowKeys = (keys: string[]) => {
  console.log('keys', keys);
  selectRows.value = keys;
};
const getSearchItems = async() => {
  // 下拉-工地类型
  const result1 = await apiFacilitySiteObj.getTypeList();
  const item1 = {
    type: 'select',
    label: '工地类型',
    placeholder: '请选择工地类型',
    value: '',
    name: 'siteTypeCode',
    prop: {
      label: 'value',
      value: 'name',
    },
    options: [...result1.data],
  };
  searchItems.push(item1);
  // 下拉 - 行政区划;
  searchItems.push({
    label: '行政区划',
    span: 'grid-col-span-xl-2',
    type: 'slot',
    slotName: 'area',
    name: 'areaCode',
    value: '',
    display: (item: any) => {
      return item.value;
    },
  });
  shwoTable.value = true;
};

const getData = async({
  pageSize,
  currentPage,
  params,
  setTotal,
}: DataFetcherParams) => {
  const searchParams = {
    pageSize,
    currentPage,
    ...params,
  };
  if (areaCode.value) {
    searchParams.areaCode = areaCode.value;
  }
  if (sortQuery.value) {
    searchParams.orderColumnStr = sortQuery.value.prop;
    searchParams.orderStr = sortQuery.value.sort;
  }
  const { data } = await apiFacilitySiteObj.postPageList(searchParams);
  tableData.value = data.list;
  setTotal(data.totalRow);
};
const addFunc = () => {
  router.push({
    name: 'infrastructureForm',
    query: {
      action: 'add',
      typeCode: props.regionTypeCode
    },
  });
};
const deleteFunc = async(row: IpostPageListSpace.List) => {
  await HlMessageBox.confirm(`您确认删除[${row.facilityName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
    type: 'success',
  });
  // 检验删除
  await checkDel([row.id]);
  await apiFacilitySiteObj.deleteF(row.id);
  HlMessage.success('删除成功');
  tableRef.value?.refresh();
};
const editFunc = async(row: IpostPageListSpace.List) => {
  router.push({
    name: 'infrastructureForm',
    query: {
      action: 'edit',
      facilityId: row.id,
      typeCode: props.regionTypeCode
    },
  });
};
const detailFunc = async(row: IpostPageListSpace.List) => {
  currentId.value = row.id;
  detailDlgVisible.value = true;
  // router.push({
  //   name: 'infrastructureDetail',
  //   query: {
  //     title: '建筑工地',
  //     facilityId: row.id,
  //     typeCode: props.regionTypeCode
  //   },
  // });
};
const selectionActions = reactive([
  {
    label: '批量删除',
    icon: 'TwoDel',
    noFill: false,
    show: true,
    onClick: async() => {
      const ids = Object.values(selectRows.value);
      await HlMessageBox.confirm('您确认删除所选设施吗?', '删除提示', {
        confirmButtonText: '确定',
        confirmButtonType: 'danger',
        cancelButtonText: '取消',
        type: 'success',
      });
      // 检验删除
      await checkDel(ids);
      await apiFacilitySiteObj.delete(ids);
      HlMessage.success('删除成功');
      tableRef.value?.refresh();
    },
  },
]);
const areaChanged = (data: any) => {
  areaCode.value = data;
};
const clearArea = () => {
  areaCode.value = null;
};
onMounted(async() => {
  getSearchItems();
});
</script>
