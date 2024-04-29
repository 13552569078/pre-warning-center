<template>
  <fx-page-table-v2
    ref="tableRef"
    v-if="showTable"
    :cols="cols"
    :table-data="tableData"
    :data-fetcher="getData"
    selector-col-count="count-2"
    search-placement="top"
    :search-items="searchItems"
    @sort-change="sortChange">
    <template #toolbar-extra-after>
      <hl-group gap="var(--md)" class="m-l-md" v-city-life-line>
        <dropdown-button :options="selectionActions" />
        <fx-action-button type="main" @click="openDialogs('新增', 'add')" label="新增监测设备" />
      </hl-group>
    </template>
    <template #point="{ searchForm }">
      <search-monitor-event
        ref="searchEventRef"
        @point-changed="pointChanged"
        v-model="searchForm['monitorUnitId']"
        @clear-point="clearPoint"
      />
    </template>
    <template #equipType="{ searchForm }">
      <search-equip-tree
        v-model="searchForm.equipTypeCode"
        :isEmitCode="false"
      />
    </template>
    <template #area="{ searchForm }">
      <search-area ref="areaRef" @area-changed="areaChanged" v-model="searchForm['streetAreaCode']" @clear-area="clearArea" />
    </template>
    <template #equipName="{ row }">
              <hb-text-overflow method="length" :length="12" effect="light" class="tree-start">
                <a href="javascript:;" @click.stop="detailFunc(row)">{{ row.equipName }}</a>
              </hb-text-overflow>

    </template>
    <template #actions="{ row }">
      <hl-button type="link" @click="editFunc(row)">编辑</hl-button>
      <hl-button type="link" @click="deleteFunc(row)" :disabled="row.isRefer" no-fill>删除</hl-button>
    </template>
  </fx-page-table-v2>

  <!-- 新增监测设备 -->
  <hl-dialog v-if="dialogVisible" v-model="dialogVisible" title="监测设备" width="700px" :close-on-click-modal="false" borderless>
    <add ref="addDialogsRef" @saveForm="saveForm" :edit-form="detailFormData" :dialogs-type="dialogsType"></add>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="formCancel">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="formOk">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>
  <!-- 设备类型管理 -->
  <equip-type-dialog
    ref="equipTypeRef"
    @updated="handleEquipTypeUpdated"
  />

  <!-- 导入设备 -->
  <!-- <equipment-importer
    v-if="isShowImportDialog"
    @close="closeImportDialog"
    @success="handleResetTable"/> -->

    <!-- 导入设备 -->
    <import-dlg-xls
      v-if="isShowImportDialog"
      title="设备"
      action="/monitorEquip/importEquipList"
      :error-cols="errorCols"
      errorKey="equipInfo"
      @downLoad="handleDownloadTemplate"
      @close="closeImportDialog"
      @success="handleResetTable"
    />

    <!-- 导入监控视频设备 -->
    <import-dlg-xls-video
      v-if="isShowVideoImportDialog"
      title="监控设备"
      action="/monitorEquip/importVideoEquipList"
      :error-cols="errorCols"
      errorKey="videoEquipExcelVO"
      @downLoad="handleDownloadVideoTemplate"
      @close="closeImportVideoDialog"
      @success="handleResetTable"
    />

    <detail-dlg v-if="detailDlgVisible" :id="detailFormData.id" @close="(detailDlgVisible = false)"/>

</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { HlMessageBox, HlMessage } from 'hongluan-ui';
import { useRouter, useRoute } from 'vue-router';
import { DataFetcherParams } from 'fx-front-framework';
import { useSort } from '@/hooks';
import { SearchMonitorEvent } from '@/views/monitoring-elements/components/index';
import { apiEquipmentObj } from '@/apis/modules/equipment';
import { apiEquipmentTypeObj } from '@/apis/modules/equipment-type-new/index';
import { apiVideoEquipmentObj } from '@/apis/modules/video-equip-import/index';
import { IgetTreeSpace } from '@/apis/modules/equipment-type-new/model';
import { IpostPageSpace } from '@/apis/modules/equipment/model';
import { SearchEquipTree } from '@/components';
// import DropdownButton from './dropdown-button.vue';
import DetailDlg from './detail-dlg.vue';

import Add from './add.vue';
import EquipTypeDialog from './equip-type-dialog.vue';

const router = useRouter();
const route = useRoute();

const tableData = ref<IpostPageSpace.List[]>([]);
const tableRef = ref();
const equipTypeRef = ref();
const showTable = ref(false);
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const areaCode = ref();
const pointData = ref();
const localSearchParams = ref();
const equipTypeTreeData = ref();
const isShowImportDialog = ref(false);
const isShowVideoImportDialog = ref(false);
const detailDlgVisible = ref(false);

const areaRef = ref();
const searchEventRef = ref();

const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex',
    fixed: 'left'
  },
  { title: '设备名称', slotName: 'equipName', minWidth: '200px', maxWidth: '340px', fixed: 'left' },
  { title: '设备类型', prop: 'equipTypeName', minWidth: '120px', showTooltip: true, tooltipProps: { maxWidth: '340px' } },
  { title: '编号', prop: 'equipCode', minWidth: '120px', showTooltip: true, tooltipProps: { maxWidth: '160px' } },
  { title: '所属监测点', prop: 'monitorUnitName', minWidth: '160px', width: '160px', showTooltip: true, tooltipProps: { maxWidth: '160px' } },
  { title: '安装位置', prop: 'address', minWidth: '200px', width: '200px', showTooltip: true, tooltipProps: { maxWidth: '340px' } },
  { title: '所在区域', prop: 'areaCodeName', minWidth: '100px', },
  { title: '设备状态', prop: 'equipStatusName', sortable: true },
  { title: '安装时间', prop: 'installTime', sortable: true, minWidth: '200px' },
  { title: '最新更新时间', prop: 'updatedAt', sortable: true, minWidth: '200px' },
  {
    title: '操作',
    slotName: 'actions',
    align: 'left',
    fixed: 'right',
    minWidth: '8em',
  },
]);
if (localStorage.getItem('sceneCode') && localStorage.getItem('sceneCode') !== 'ALL') cols.value.splice(cols.value.length - 1, 1);

const selectionActions = reactive(
  [
    { label: '设备类型管理', icon: 'TwoDel', noFill: false, show: true, onClick: () => { openType('新增', 'add'); } },
    { label: '批量导出', icon: 'TwoDel', noFill: false, show: true, onClick: () => { handleExport(); } },
    { label: '设备导入', icon: 'TwoDel', noFill: false, show: true, onClick: () => { showImportDialog(); } },
    { label: '监控设备信息导入', icon: 'TwoDel', noFill: false, show: true, onClick: () => { showImportVideoDialog(); } },
  ],
);

const searchItems = reactive([
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '设备名称',
    placeholder: '设备名称',
    value: '',
    name: 'equipName',
  },
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '设备编号',
    placeholder: '设备编号',
    value: '',
    name: 'equipCode',
  },
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '安装位置',
    placeholder: '安装位置',
    value: '',
    name: 'address',
  },
  {
    label: '监测点',
    span: 'grid-col-span-xl-2',
    type: 'slot',
    slotName: 'point',
    name: 'monitorUnitId',
    value: '',
    display: (item: any) => {
      return item.value;
    },
  },
  {
    label: '设备类型',
    span: 'grid-col-span-xl-2',
    type: 'slot',
    slotName: 'equipType',
    name: 'equipTypeCode',
    value: '',
    display: (item: any) => {
      return findNode(item.value, equipTypeTreeData.value)?.typeName;
    },
  },
  {
    label: '所属区域',
    span: 'grid-col-span-xl-2',
    type: 'slot',
    name: 'streetAreaCode',
    slotName: 'area',
    value: '',
  },
]);
const getSearchItems = async() => {
  // 设备类型
  const result1 = await apiEquipmentTypeObj.getTree();
  equipTypeTreeData.value = result1.data;
  if (!showTable.value) {
    // 下拉 - 设备状态;
    const result2 = await apiEquipmentObj.selectEquipStatus();
    const item2 = {
      type: 'select',
      label: '监测设备状态',
      placeholder: '监测设备状态',
      value: '',
      filterable: true,
      name: 'equipStatus',
      prop: {
        label: 'value',
        value: 'name',
      },
      options: [...result2.data],
    };
    searchItems.push(item2);
  }
  // 改变值让筛选条件强制刷新
  searchItems[4].value = ' ';
  searchItems[4].value = '';
  showTable.value = true;
};
searchItems.push({
  type: 'datetimerange',
  label: '安装时间',
  value: [],
  format: dateFormat,
  'value-format': dateFormat,
  name: 'installTimeRange',
  'is-range': true,
  'range-separator': '至',
  'start-placeholder': '开始时间',
  'end-placeholder': '结束时间',
});
const { sortQuery, sortChange } = useSort(tableRef, cols);

const updateSearchParams = (val: any) => {
  localSearchParams.value = val;
};

const handleEquipTypeUpdated = () => {
  getSearchItems();
};

const findNode = (
  code: string,
  tree: IgetTreeSpace.Data[]
): IgetTreeSpace.Data | undefined => {
  if (tree.length) {
    let node = tree.find(item => item.typeCode === code);
    if (node) {
      return node;
    } else {
      if (tree.length) {
        for (let i = 0; i < tree.length; i++) {
          node = findNode(code, tree[i].children);
          if (node) break;
        }
      }
    }
    return node;
  }
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
    installBeginTime: params.installTimeRangeStart,
    installEndTime: params.installTimeRangeEnd,
    ...params,
  };
  console.log(params, areaCode.value, pointData.value, 889);
  if (sortQuery.value) {
    searchParams.orderColumnStr = sortQuery.value.prop;
    searchParams.orderStr = sortQuery.value.sort;
  }
  if (areaCode.value) {
    searchParams.streetAreaCode = areaCode.value;
  } else if (params.streetAreaCode) {
    searchParams.streetAreaCode = areaRef.value.getAreaCodeByAreaName(params.streetAreaCode);
  }
  if (pointData.value?.treeType) {
    searchParams.treeType = pointData.value.treeType;
    searchParams.treeValue = pointData.value.treeValue;
  } else if (params.monitorUnitId) {
    const point = searchEventRef.value.getPointDataByPointName(params.monitorUnitId);
    searchParams.treeType = point.treeType;
    searchParams.treeValue = point.treeValue;
  }
  updateSearchParams(searchParams);
  const { data } = await apiEquipmentObj.postPage(searchParams);
  tableData.value = data.list;
  setTotal(data.totalRow);
};
const editFunc = async(row: IpostPageSpace.List) => {
  const { data } = await apiEquipmentObj.getMonitorEquip(row.id);
  detailFormData.value = { ...data };
  openDialogs('编辑', 'edit');
};
const detailFunc = async(row: IpostPageSpace.List) => {
  // const { data } = await apiEquipmentObj.getMonitorEquip(row.id);
  // detailFormData.value = { ...data };
  // openDialogs('详情', 'detail');
  // router.push({
  //   name: 'equipmentDetail',
  //   query: {
  //     id: row.id,
  //   },
  // });
  detailDlgVisible.value = true;
  detailFormData.value = {
    id: row.id
  };
};

const deleteFunc = async(row: IpostPageSpace.List) => {
  await HlMessageBox.confirm(`您确认删除[${row.equipName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
    type: 'success',
  });
  await apiEquipmentObj.deleteM(row.id);
  HlMessage.success('删除成功！');
  tableRef.value?.refresh();
};

const handleResetTable = () => {
  tableRef.value?.reset();
};

// 新增dialogs
const dialogsType = ref('add');
const addDialogsRef = ref();
const dialogVisible = ref(false);
const dialogTitle = ref('新增');
const detailFormData = ref({});

const openType = (title: string, type: string) => {
  equipTypeRef.value.openDialog();
};
const openDialogs = (title: string, type: string) => {
  dialogVisible.value = true;
  dialogsType.value = type;
  dialogTitle.value = title;
};

const formOk = () => {
  addDialogsRef.value.formSubmit();
};
const formCancel = () => {
  addDialogsRef.value.resetForm();
  detailFormData.value = {};
  dialogVisible.value = false;
};
const saveForm = async(data: IpostPageSpace.List) => {
  dialogsType.value === 'add'
    ? await apiEquipmentObj.add(data)
    : await apiEquipmentObj.postUpdate(data);
  tableRef.value?.refresh();
  detailFormData.value = {};
  formCancel();
};

const pointChanged = (data: any) => {
  pointData.value = {
    ...data,
  };
  // tableRef.value?.refresh();
};
const areaChanged = (data: any) => {
  areaCode.value = data;
};
const clearPoint = () => {
  pointData.value = null;
};
const clearArea = () => {
  areaCode.value = null;
};

const handleDownloadTemplate = () => {
  apiEquipmentObj.getGetImportTemplate();
};

const handleDownloadVideoTemplate = () => {
  apiVideoEquipmentObj.getGetVideoEquipImportTemplate();
};

const handleExport = () => {
  apiEquipmentObj.postExportEquipList(localSearchParams.value);
};

const showImportDialog = () => {
  isShowImportDialog.value = true;
};

const closeImportDialog = () => {
  isShowImportDialog.value = false;
};

const showImportVideoDialog = () => {
  isShowVideoImportDialog.value = true;
};

const closeImportVideoDialog = () => {
  isShowVideoImportDialog.value = false;
};

onMounted(() => {
  getSearchItems();
});

const errorCols = [
  { title: '', slotName: 'tableIndex', headerSlotName: 'firstCol', width: 'fit-content', },
  { title: '错误信息', prop: 'msg', slotName: 'errorMessage', minWidth: '20em' },
  { title: '设备名称', prop: 'equipName' },
  { title: '设备类型', prop: 'equipTypeName' },
  { title: '地址', prop: 'address', minWidth: '8em' },
];
</script>
