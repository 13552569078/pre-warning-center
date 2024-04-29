<template>
  <fx-page-table-v2
    ref="tableRef"
    :cols="cols"
    :table-data="tableData"
    :data-fetcher="getData"
    selector-col-count="count-3"
    search-placement="top"
    :search-items="searchItems"
    :searcher="{ show: false }"
    @sort-change="handleSortChange"
    @selected-row-keys="selectedRowKeys">
    <template #toolbar-extra-after>
      <hl-group gap="var(--md)" class="m-l-md" v-city-life-line>
        <dropdown-button :options="selectionActions" />
        <fx-action-button type="main" :disabled="!regionTypeCode" @click="openDialogs('新增', 'add')" :label="`新增${$t('region')}`" />
      </hl-group>
    </template>
    <template #regionName="{ row }">
      <a href="javascript:;" @click.stop="detailFunc(row)">{{ row.regionName }}</a>
    </template>
    <template #area="{ searchForm }">
      <search-area @area-changed="areaChanged" v-model="searchForm['streetAreaCode']" @clear-area="clearArea" />
    </template>
    <template #actions="{ row }">
      <hb-overflow-list :show-count="3" v-city-life-line>
        <hl-button type="link" @click="openDrawDialog(row)">GIS轮廓</hl-button>
        <hl-button type="link" @click="enableFunc(row)">{{ row.useState ? '停用' : '启用' }}</hl-button>
        <hl-button type="link" @click="editFunc(row)">编辑</hl-button>
        <hl-button type="link" @click="deleteFunc(row)" :disabled="row.isRefer" no-fill>删除</hl-button>
        <template #more>
          <hl-icon>
            <TwoChevronBottom />
          </hl-icon>
        </template>
      </hb-overflow-list>
    </template>
  </fx-page-table-v2>

  <!-- 新增监测主体 -->
  <hl-dialog v-model="dialogVisible" width="700px" :close-on-click-modal="false" :title="`${$t('region')}${dialogTitle}`" borderless>
    <add v-if="dialogVisible" ref="addDialogsRef" @saveForm="saveForm" :edit-form="detailFormData" :dialogs-type="dialogsType"></add>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="formCancel">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="formOk">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>

  <!-- 监测主体详情 -->
  <detail-dlg v-if="detailDlgVisible" :detail="detailFormData" @close="detailDlgVisible = false" />
  <!-- gis轮廓 -->
  <draw-map :visiable="drawDialogVisiable" :longitude="currentRegion.longitude" :latitude="currentRegion.latitude" @drawClose="drawClose" @drawSubmit="drawSubmit" :mark-data="markData"> </draw-map>

  <!-- 导入 -->
  <import-dlg-xls v-if="isShowImportDialog" title="监测主体" action="/monitorRegion/importMonitorRegionList" :error-cols="errorCols" errorKey="regionExcelVO" @downLoad="handleDownloadTemplate" @close="closeImportDialog" @success="handleResetTable" />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { HlMessageBox, HlMessage } from 'hongluan-ui';
import { DataFetcherParams } from 'fx-front-framework';
import { Indexable } from 'fx-front-utils';
import { useI18n } from 'vue-i18n';
import { isMuiltipleOprationDisabled } from '@/common';
import { useSort } from '@/hooks';
import { DrawMap, ImportDlgXls } from '@/components';
import { apiSubjectObj } from '@/apis/modules/element-subject';
import { IpostPageSpace, IgetOutlineSpace } from '@/apis/modules/element-subject/model';
import Add from './add.vue';
import DetailDlg from './detail-dlg.vue';

const { t } = useI18n();
const route = useRoute();
const queryUseState = route.query.useState;

const props = defineProps<{
  regionTypeCode: string | number;
}>();

const emit = defineEmits(['updated']);

watch(
  () => props.regionTypeCode,
  newId => {
    tableRef.value?.reset();
  }
);

const tableData = ref<IpostPageSpace.List[]>([]);
const tableRef = ref();
const markData = ref('');
const areaCode = ref();
const activeRegionId = ref();
const currentRegion = ref({});
const rowKeys = ref<string[]>([]);

const selectedRowKeys = (keys: string[]) => {
  rowKeys.value = keys;
};

const cols = ref([
  { title: '', slotName: 'tableSelection', headerSlotName: 'selectionCol', minWidth: '4em', align: 'left', fixed: 'left' },
  { title: `${t('region')}名称`, slotName: 'regionName', fixed: { position: 'left', }, minWidth: '200px', showTooltip: true, tooltipProps: { maxWidth: '340px' } },
  { title: `${t('region')}类型`, prop: 'regionTypeName', minWidth: '200px', showTooltip: true, tooltipProps: { maxWidth: '340px' } },
  { title: '地址', prop: 'address', minWidth: '400px', showTooltip: true, tooltipProps: { maxWidth: '440px' } },
  { title: '行政区划', prop: 'streetAreaName', minWidth: '110px', showTooltip: true, tooltipProps: { maxWidth: '440px' } },
  { title: '主管部门', prop: 'chargeOrgName', minWidth: '110px', showTooltip: true, tooltipProps: { maxWidth: '440px' } },
  { title: '所属单位', prop: 'belongOrgName', minWidth: '110px' },
  { title: '启用状态', prop: 'useStateName', minWidth: '110px' },
  { title: '更新时间', prop: 'updatedAt', sortable: true, minWidth: '180px' },
  { title: '操作', slotName: 'actions', align: 'left', fixed: 'right', minWidth: '210px' }
]);
if (localStorage.getItem('sceneCode') && localStorage.getItem('sceneCode') !== 'ALL') cols.value.splice(cols.value.length - 1, 1);

const searchItems = reactive([
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '主体名称',
    placeholder: '请输入主体名称',
    value: '',
    name: 'regionName'
  },
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '地址',
    placeholder: '请输入地址',
    value: '',
    name: 'address'
  },
  {
    type: 'select',
    label: '启用状态',
    placeholder: '请选择启用状态',
    value: queryUseState || '',
    name: 'useState',
    prop: {
      label: 'name',
      value: 'code'
    },
    options: [
      { name: '启用中', code: '1' },
      { name: '未启用', code: '0' }
    ]
  },
  {
    label: '所属区域',
    span: 'grid-col-span-xl-2',
    type: 'slot',
    name: 'streetAreaCode',
    slotName: 'area',
    value: '',
  }
] as Indexable<any>[]);

const { sortQuery, sortChange } = useSort(tableRef, cols);

const getData = async({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
  const searchParams = {
    pageSize,
    currentPage,
    ...params,
    regionTypeCode: props.regionTypeCode
  };
  if (areaCode.value) {
    searchParams.streetAreaCode = areaCode.value;
  }
  if (sortQuery.value) {
    searchParams.orderColumnStr = sortQuery.value.prop;
    searchParams.orderStr = sortQuery.value.sort;
  }
  const { data } = await apiSubjectObj.postPage(searchParams);
  tableData.value = data.list;
  setTotal(data.totalRow);
};
const editFunc = async(row: IpostPageSpace.List) => {
  const { data } = await apiSubjectObj.getMonitorRegion(row.id);
  detailFormData.value = { ...data };
  openDialogs('编辑', 'edit');
};
const detailFunc = async(row: IpostPageSpace.List) => {
  const { data } = await apiSubjectObj.getMonitorRegion(row.id);
  detailFormData.value = { ...data };
  detailDlgVisible.value = true;
};

const deleteFunc = async(row: IpostPageSpace.List) => {
  await HlMessageBox.confirm(`您确认删除[${row.regionName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
    type: 'success'
  });
  await apiSubjectObj.deleteM(row.id);
  HlMessage.success('删除成功');
  tableRef.value?.refresh();
  emit('updated');
};

const enableMessage = (useState: number, isMulti?: boolean) => {
  if (isMulti) {
    return `批量${useState ? '停用' : '启用'}成功`;
  }
  return `${useState ? '停用' : '启用'}成功`;
};

const enableFunc = async(row: IpostPageSpace.List) => {
  await apiSubjectObj.getEnableOrDisable(row.id, row.useState ? 0 : 1);
  tableRef.value?.refresh();
  HlMessage.success(enableMessage(row.useState));
};

// 新增dialogs
const dialogsType = ref('add');
const addDialogsRef = ref();
const dialogVisible = ref(false);
const dialogTitle = ref('新增');
const detailFormData = ref({});
const detailDlgVisible = ref(false);

const openDialogs = (title: string, type: string) => {
  if (type === 'add') {
    detailFormData.value = {};
  }
  dialogVisible.value = true;
  dialogsType.value = type;
  dialogTitle.value = title;
};
const formOk = () => {
  addDialogsRef.value.formSubmit();
  detailFormData.value = {};
};
const formCancel = () => {
  addDialogsRef.value.resetForm();
  detailFormData.value = {};
  dialogVisible.value = false;
};
const saveForm = async(data: IpostPageSpace.List) => {
  const searchParams = { ...data, regionTypeCode: data.regionTypeCode || props.regionTypeCode };
  dialogsType.value === 'add' ? await apiSubjectObj.add(searchParams) : await apiSubjectObj.postUpdate(searchParams);
  tableRef.value?.refresh();
  formCancel();
  emit('updated');
};
// gis 轮廓
const drawDialogVisiable = ref(false);
const openDrawDialog = async(row: IpostPageSpace.List) => {
  activeRegionId.value = row.id;
  currentRegion.value = row;
  const { data } = await apiSubjectObj.getOutline(row.id);
  markData.value = data.gisOutline;
  drawDialogVisiable.value = true;
  console.log(data, markData.value);
};
const drawClose = () => {
  drawDialogVisiable.value = false;
};
const drawSubmit = async(e: IgetOutlineSpace.Data) => {
  await apiSubjectObj.postUpdateGisOutline(activeRegionId.value, e.gisOutline, e.gisPoint);
  drawDialogVisiable.value = false;
};

const handleSortChange = (prop: string, sort: string) => {
  sortChange(prop, sort);
  console.log(cols.value);
};

const areaChanged = (data: any) => {
  areaCode.value = data;
  // tableRef.value?.refresh();
};
const clearArea = () => {
  areaCode.value = null;
};

// 导入
const isShowImportDialog = ref(false);
const showImportDialog = () => {
  isShowImportDialog.value = true;
};
const closeImportDialog = () => {
  isShowImportDialog.value = false;
};
const handleResetTable = () => {
  tableRef.value?.reset();
};
const handleDownloadTemplate = async() => {
  await apiSubjectObj.getGetImportTemplate();
};
const handleStartOrStopEntity = async(type: number) => {
  await apiSubjectObj.getEnableOrDisableBatch(rowKeys.value, type);
  rowKeys.value = [];
  tableRef.value?.refresh();
  HlMessage.success(enableMessage(type ? 0 : 1, true));
};

const isMuiltipleStartDisabled = computed(() => {
  return isMuiltipleOprationDisabled('start', rowKeys, tableData);
});

const isMuiltipleStopDisabled = computed(() => {
  return isMuiltipleOprationDisabled('stop', rowKeys, tableData);
});

const selectionActions = reactive([
  {
    label: '下载模板',
    icon: 'TwoDel',
    noFill: false,
    show: true,
    onClick: () => {
      handleDownloadTemplate();
    }
  },
  {
    label: '监测主体导入',
    icon: 'TwoDel',
    noFill: false,
    show: true,
    onClick: () => {
      showImportDialog();
    }
  },
  {
    label: '批量启用',
    noFill: false,
    show: true,
    disabled: isMuiltipleStartDisabled,
    onClick: () => (handleStartOrStopEntity(1))
  },
  {
    label: '批量停用',
    noFill: false,
    show: true,
    disabled: isMuiltipleStopDisabled,
    onClick: () => (handleStartOrStopEntity(0))
  }
]);

const errorCols = [
  { title: '', slotName: 'tableIndex', headerSlotName: 'firstCol', width: 'fit-content', },
  { title: '错误信息', prop: 'msg', slotName: 'errorMessage', minWidth: '8em' },
  { title: '主体类型', prop: 'regionTypeName' },
  { title: '主体名称', prop: 'regionName' },
  { title: '联系人', prop: 'responsibleName' },
  { title: '行政区划', prop: 'streetAreaCode' },
  { title: '地址', prop: 'address' }
];

</script>
