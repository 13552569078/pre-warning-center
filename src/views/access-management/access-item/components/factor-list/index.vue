<template>
  <hl-group full class="h-full" gap="var(--lg)">
    <fx-page-table-v2 ref="tableRef" :cols="cols" :table-data="tableData" :data-fetcher="getData"
      :table-props="{ rowKey: 'factorId' }" selector-col-count="count-xl-2 count-lg-1 count-md-1" :show-search-bar="false"
      :searchItems="searchItems" @sort-change="sortChange" v-if="isShowTable">
      <template #toolbar-extra-after>
        <hl-group gap="var(--md)" class="m-l-md">
          <!-- <dropdown-button :options="selectionActions" /> -->
          <fx-action-button type="main" @click="addFactor" label="新增接入数据项" />
        </hl-group>
      </template>
      <template #accessItemName="{ row }">
        <hb-text-overflow style="display: inline-block; width: 12em;" effect="light">
          <span class="text-primary cursor-pointer" @click="openDetail(row)">{{
            row.accessItemName
          }}</span>
        </hb-text-overflow>
      </template>
      <template #accessFrequencyType="{ row }">
        <span>{{
          row.accessFrequency > 0 ? '周期型' : '实时型'
        }}</span>
      </template>
      <template #timeScopes="{ row }">
        <div v-if="row.timeScopes === '--'">{{ row.timeScopes }}</div>
        <div v-else>
          <p v-for="item in row.timeScopes" :key="item.accessItemId">{{
            `${item.dateStart} 至 ${item.dateEnd} ${item.timeStart} 至 ${item.timeEnd}`
          }}</p>
        </div>
      </template>
      <template #action="{ row }">
        <hl-button type="link" @click="editFactor(row)" :disabled="row.isRefer" no-fill>编辑</hl-button>
        <hl-button type="link" @click="delFactor(row)" :disabled="row.isRefer" no-fill>删除</hl-button>
        <hl-button type="link" @click="showFakeDataSender(row)">模拟数据</hl-button>
      </template>
    </fx-page-table-v2>
  </hl-group>

  <monitoring-factor-dlg v-if="dlgVisible" :action="action" :id="editintId" :treeNode="treeNode"
    @cancel="dlgVisible = false" @ok="ok" />

  <!-- 模拟数据弹窗 -->
  <fake-data-dlg v-if="fakeDataDlgVisible" :current-row="currentRow" @cancel="hideFakeDataSender" />

  <!-- 详情弹窗 -->
  <detail-dlg v-if="detailDlgVisible" :id="editintId" @close="detailDlgVisible = false" />

  <!-- 导入弹窗 -->
  <!-- <import-dlg-xls-slot
    v-if="isShowImportDialog"
    title="接入数据"
    firstStepText="选择导入的接入数据项对应的数据源和数据频率"
    :action="importAction"
    :error-cols="errorCols"
    :isFirstStepFinished="isFirstStepFinished"
    error-key="accessDataExcelVO"
    @downLoad="handleDownloadTemplate"
    @close="closeImportDialog"
    @success="handleResetTable">
    <import-form
      ref="importFormRef"
      v-model="importFormData"
      :accessSourceId="$props.treeNode?.accessSourceId"
    />
  </import-dlg-xls-slot> -->
</template>

<script lang="ts" setup>
import { ref, reactive, watch, nextTick, onMounted, computed } from 'vue';
import { DataFetcherParams, FxPageTable } from 'fx-front-framework';
import { HlMessageBox, HlMessage } from 'hongluan-ui';
import { useRouter, useRoute } from 'vue-router';
import { useSort } from '@/hooks';
import { getSecondsToUnitTime, getListDict } from '@/common';
import { apiAccessItemObj } from '@/apis/modules/target-access-item';
import { IpostPageSpace } from '@/apis/modules/target-access-item/model';
import MonitoringFactorDlg from './monitoring-factor-dlg.vue';
import FakeDataDlg from './fake-data-dlg.vue';
import DetailDlg from './detail-dlg.vue';
// import ImportForm from './import-form.vue';

const isShowTable = ref(false);
const props = defineProps({
  treeNode: {
    type: Object
  },
  eventNode: {
    type: Object
  },
});

const isAccessDataObject = computed(() => {
  return !props.treeNode?.accessSourceObjectId;
});

const selectionActions = reactive([
  {
    label: '接入数据导入',
    icon: 'TwoDel',
    noFill: false,
    show: true,
    disabled: isAccessDataObject,
    onClick: () => {
      showImportDialog();
    }
  },
]);

const router = useRouter();
const tableRef = ref<InstanceType<typeof FxPageTable>>();
watch(
  () => props.treeNode,
  newId => {
    tableRef.value?.reset();
  }
);

// 导入窗口
const isShowImportDialog = ref(false);
const importFormData = ref({});
const importFormRef = ref();
const importAction = computed(() => {
  return `/accessItem/importAccessItemDataList?subjectId=${props.treeNode?.accessSourceObjectId}&sourceId=${importFormData.value.accessDataSourceId}&accessFrequency=${importFormData.value.accessFrequency}&accessFrequencyUnit=${importFormData.value.accessFrequencyUnit}&targetInfoId=${importFormData.value.targetId}`;
});

const isFirstStepFinished = ref(false);

watch(() => importFormData.value, () => {
  let result = true;
  if (!importFormData.value.accessDataSourceId || !importFormData.value.targetId) {
    result = false;
  }
  if (importFormData.value.accessFrequencyOrigin === 1 && !importFormData.value.accessFrequency === '') {
    result = false;
  }
  isFirstStepFinished.value = result;
}, {
  deep: true
});

const tableData = ref<IpostPageSpace.List[]>([]);
const action = ref('add');

const cols = ref([
  {
    title: '',
    width: 'auto',
    align: 'left',
    slotName: 'tableIndex',
    fixed: 'left'
  },
  { title: '数据项名称', prop: 'accessItemName', slotName: 'accessItemName', minWidth: '170px', fixed: { position: 'left' }, showTooltip: true, tooltipProps: { maxWidth: '340px' } },
  { title: '接入周期类型', prop: 'accessFrequencyType', slotName: 'accessFrequencyType', minWidth: '8em' },
  { title: '数据频率', prop: 'accessFrequencyName', minWidth: '8em' },
  { title: '数据时间区间', prop: 'timeScopes', slotName: 'timeScopes', minWidth: '360px' },
  { title: '来源类型', prop: 'sourceName', minWidth: '180px', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '数据源类型', prop: 'dataSourceName', minWidth: '180px', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '数据标识', prop: 'accessItemCode', minWidth: '180px', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '接入源名称', prop: 'accessSourceName', minWidth: '170px', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '接入对象', prop: 'accessSourceObjectName', minWidth: '170px', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '更新时间', prop: 'updatedAt', sortable: true, minWidth: '250px' },
  { title: '操作', slotName: 'action', align: 'left', fixed: 'right' }
]);
const searchItems = reactive([{
  type: 'input',
  maxlength: '20',
  showWordLimit: false,
  label: '数据项名称',
  placeholder: '数据项名称',
  value: '',
  name: 'accessItemName',
},
//  {
//   type: 'select',
//   label: '数据频率',
//   placeholder: '请选择数据频率',
//   value: '',
//   name: 'dataType',
//   clearable: true,
//   prop: {
//     label: 'dictName',
//     value: 'dictCode',
//   },
//   options: [{ dictName: '实时计算', dictCode: 0 }, { dictName: '周期计算', dictCode: 1 }],
// },
{
  type: 'select',
  label: '接入周期类型',
  placeholder: '请选择接入周期类型',
  value: '',
  filterable: true,
  name: 'accessFrequency',
  prop: {
    label: 'dictName',
    value: 'dictCode',
  },
  options: [{ dictName: '周期型', dictCode: 1 }, { dictName: '实时型', dictCode: 0 }],
},
{
  type: 'select',
  label: '来源类型',
  placeholder: '请选择来源类型',
  value: '',
  filterable: true,
  name: 'source',
  prop: {
    label: 'dictName',
    value: 'dictCode',
  },
  options: [],
}
]);
const getSearchItem = async () => {
  const dict = await getListDict('ACCESS_ITEM_DATA_SOURCE');
  searchItems[2].options = dict;
  isShowTable.value = true;
};

onMounted(() => {
  getSearchItem();
});

const optionComputePeriod = ref([{ dictName: '周期计算', dictCode: 1 }, { dictName: '实时计算', dictCode: 0 }]);

const editintId = ref<string | number>('');
const dlgVisible = ref(false);
const fakeDataDlgVisible = ref(false);
const detailDlgVisible = ref(false);
const currentRow = ref<IpostPageSpace.List | null>();

const { sortQuery, sortChange } = useSort(tableRef, cols);

const showImportDialog = () => {
  isShowImportDialog.value = true;
};
const closeImportDialog = () => {
  isShowImportDialog.value = false;
};

const getData = async ({ params, pageSize, currentPage, setTotal }: DataFetcherParams) => {
  const searchParams = {
    pageSize,
    currentPage,
    ...props.treeNode,
    ...params
  };
  if (sortQuery.value) {
    searchParams.orderColumnStr = sortQuery.value.prop;
    searchParams.orderStr = sortQuery.value.sort;
  }
  const result = await apiAccessItemObj.postPage(searchParams);
  tableData.value = result.data.list;
  tableData.value.forEach(e => {
    e.accessFrequencyName = e.accessFrequency > 0 ? getSecondsToUnitTime(e, 'accessFrequencyUnit', 'accessFrequency') + e.accessFrequencyUnitName : '--';
  });
  setTotal(+result.data.totalRow);
};

const addFactor = () => {
  editintId.value = '';
  action.value = 'add';
  router.push({
    name: 'accessItemAdd',
    query: {
      title: '新增接入数据项',
      accessSourceId: props.treeNode?.accessSourceId,
      accessSourceObjectId: props.treeNode?.accessSourceObjectId,
      action: action.value,
      id: editintId.value
    },
  });
};
const editFactor = (row: IpostPageSpace.List) => {
  editintId.value = row.accessItemId;
  action.value = 'edit';
  router.push({
    name: 'accessItemAdd',
    query: {
      title: '编辑接入数据项',
      action: action.value,
      id: editintId.value
    },
  });
};
const openDetail = (row: IpostPageSpace.List) => {
  editintId.value = row.accessItemId;
  detailDlgVisible.value = true;
};
const delFactor = async (row: IpostPageSpace.List) => {
  await HlMessageBox.confirm(`您确认删除[${row.accessItemName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消'
  });
  await apiAccessItemObj.delete(row.accessItemId);
  HlMessage.success('删除成功');
  tableRef.value?.refresh();
};
const ok = () => {
  dlgVisible.value = false;
  tableRef.value?.refresh();
};
const showFakeDataSender = (row: IpostPageSpace.List) => {
  currentRow.value = row;
  nextTick(() => {
    fakeDataDlgVisible.value = true;
  });
};
const hideFakeDataSender = (row: IpostPageSpace.List) => {
  currentRow.value = null;
  fakeDataDlgVisible.value = false;
};

const handleDownloadTemplate = async () => {
  console.log('Downloading');
  try {
    await importFormRef.value.validate();
    console.log(importFormData.value);
    await apiAccessItemObj.getDownload(importFormData.value.targetId);
  } catch (e) {
    HlMessage.error('请完成「第一步」后再下载模板');
  }
};

const handleResetTable = () => {
  tableRef.value?.refresh();
};

const errorCols = [
  { title: '', slotName: 'tableIndex', headerSlotName: 'firstCol', fixed: 'left', width: 'fit-content' },
  { title: '错误信息', prop: 'msg', slotName: 'errorMessage', minWidth: '15em', fixed: { position: 'left', distance: '2em' } },
  { title: '数据标识', prop: 'accessItemCode', minWidth: '15em' },
  { title: '接入数据项名称', prop: 'accessItemName', minWidth: '15em' },
  { title: '开始时间', prop: 'startTime', minWidth: '10em' },
  { title: '结束时间', prop: 'endTime', minWidth: '10em' },
  { title: '设备名称', prop: 'equipName', minWidth: '15em' },
  { title: '描述', prop: 'accessItemDesc', minWidth: '15em' },
  { title: '启用时间', prop: 'useTime', minWidth: '10em' },
  { title: '阈值等级', prop: 'thresholdLevelName', minWidth: '10em' },
  { title: '阈值', prop: 'thresholdValue', minWidth: '5em' }
];
</script>
