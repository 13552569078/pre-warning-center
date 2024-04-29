<template>
  <fx-page-table-v2
    ref="tableRef"
    :cols="cols"
    :table-data="tableData"
    :data-fetcher="getData"
    selector-col-count="count-2"
    search-placement="top"
    :search-items="searchItems"
    @sort-change="sortChange"
    @selected-row-keys="selectedRowKeys">
    <template #toolbar-extra-after>
      <hl-group gap="var(--md)" class="m-l-md" v-city-life-line>
        <dropdown-button :options="selectionActions" />
        <fx-action-button type="main" label="新增监测点" @click="goBaseInfo('add')" :disabled="!regionId" />
      </hl-group>
    </template>
    <template #unitName="{ row }">
      <hl-popover placement="top" trigger="hover" effect="light" :content="row.unitName">
        <template #reference>
          <a href="javascript:;" @click.stop="goSecondPages('pointDetail', '', row)">{{ row.unitName }}</a>
        </template>
      </hl-popover>
    </template>
    <template #eventTypeNames="{ row }">
      <span v-if="row.eventTypeNames.length">
        {{ row.eventTypeNames.length > 2 ? row.eventTypeNames.slice(0, 2).join(',') + '...' : row.eventTypeNames.join(',') }}
      </span>
      <span v-else>--</span>
    </template>
    <template #isInvented="{ row }">
      <span>{{ row.isInvented === 1 ? '是' : '否' }}</span>
    </template>
    <template #equipList="{ row }">
      <span v-if="row.equipList.length">{{ row.equipList.join(',') }}</span>
      <span v-else>--</span>
    </template>
    <template #actions="{ row }">
      <hb-overflow-list :show-count="3">
        <hl-button type="link" @click="switchPoint(row.id, 1)" v-if="row.useState === 0">启用</hl-button>
        <hl-button type="link" @click="switchPoint(row.id, 0)" v-if="row.useState === 1">停用</hl-button>
        <hl-button type="link" @click="goBaseInfo('detail', row)" :disabled="row.isInvented" no-fill>编辑</hl-button>
        <hl-button type="link" @click="goSecondPages('pointSetting', 'access', row)" :disabled="row.isInvented" no-fill>接入指标数据</hl-button>
        <hl-button type="link" @click="goSecondPages('pointSetting', 'strategy', row)" :disabled="row.isInvented" no-fill>配置策略</hl-button>
        <hl-button type="link" @click="deleteFunc(row)" :disabled="row.isRefer || row.isInvented" no-fill >删除</hl-button>
        <template #more>
          <hl-icon>
            <TwoChevronBottom />
          </hl-icon>
        </template>
      </hb-overflow-list>
    </template>
  </fx-page-table-v2>
  <!-- 导入 -->
  <import-dlg-xls v-if="isShowImportDialog" title="监测点" action="/monitorUnit/importMonitorUnitList" :error-cols="errorCols" errorKey="monitorUnitExcelVO" @downLoad="handleDownloadTemplate" @close="closeImportDialog" @success="handleResetTable" />
  <!-- 导入接入数据弹窗 -->
  <import-dlg-xls-slot
    v-if="isShowImportDataDialog"
    title="接入数据"
    firstStepText="选择导入的接入数据项对应的数据源和数据频率"
    :action="importAction"
    :error-cols="errorCols2"
    :isFirstStepFinished="isFirstStepFinished"
    error-key="accessDataExcelVO"
    @downLoad="handleDownloadTemplate2"
    @close="closeImportDialog2"
    @success="handleResetTable">
    <import-form
      ref="importFormRef"
      v-model="importFormData"
      :disabled="false"
    />
  </import-dlg-xls-slot>
  <!-- 监测点弹窗 -->
  <edit-point-dlg ref="editPointDlgRef" :pointData="pointData" @close="closeEditPointDlg" v-if="showEditPointDlg"/>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { EmptyUtils } from 'fx-front-utils';
import { HlMessageBox, HlMessage } from 'hongluan-ui';
import { DataFetcherParams } from 'fx-front-framework';
import { apiDictObj as dictApi } from '@/apis/modules/dict-api';
import { useSort } from '@/hooks';
import { isMuiltipleOprationDisabled } from '@/common';
import { ImportDlgXls } from '@/components';
import { apiMonitorPointObj as api } from '@/apis/modules/monitor-unit';
import { IpostPageSpace } from '@/apis/modules/control-point/model';
import { useI18n } from 'vue-i18n';
import { GlobalAPI } from '@/common';
import ImportForm from '@/views/access-management/access-item/components/factor-list/import-form.vue';
import { apiAccessItemObj } from '@/apis/modules/target-access-item';
import editPointDlg from '../basic-info/editPointDlg.vue';

const props = defineProps({
  regionId: {
    type: String
  },
  regionTypeName: {
    type: String
  },
  address: {
    type: String
  },
  longitude: {
    type: String
  },
  latitude: {
    type: String
  },
  regionTypeCode: {
    type: String
  }
});

// 导入窗口
const isShowImportDataDialog = ref(false);
const importFormData = ref({});
const importFormRef = ref();
const importAction = computed(() => {
  return `/accessItem/importAccessItemDataList?subjectId=${importFormData.value.accessSourceObjectId}&sourceId=${importFormData.value.accessDataSourceId}&accessFrequency=${importFormData.value.accessFrequency}&accessFrequencyUnit=${importFormData.value.accessFrequencyUnit}&targetInfoId=${importFormData.value.targetId}`;
});

const isFirstStepFinished = ref(false);

const errorCols2 = [
  { title: '', slotName: 'tableIndex', headerSlotName: 'firstCol', width: 'fit-content', fixed: 'left' },
  { title: '错误信息', prop: 'msg', slotName: 'errorMessage', minWidth: '15em', fixed: { position: 'left', distance: '2em' } },
  { title: '数据标识', prop: 'accessItemCode', minWidth: '15em' },
  { title: '接入数据项名称', prop: 'accessItemName', minWidth: '15em' },
  { title: '监测点名称', prop: 'unitName', minWidth: '8em' },
  { title: '开始时间', prop: 'startTime', minWidth: '10em' },
  { title: '结束时间', prop: 'endTime', minWidth: '10em' },
  { title: '设备名称', prop: 'equipName', minWidth: '15em' },
  { title: '描述', prop: 'accessItemDesc', minWidth: '15em' },
  { title: '启用时间', prop: 'useTime', minWidth: '10em' },
  { title: '阈值等级', prop: 'thresholdLevelName', minWidth: '10em' },
  { title: '阈值', prop: 'thresholdValue', minWidth: '5em' }
];

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

const handleDownloadTemplate2 = async () => {
  console.log('Downloading');
  try {
    await importFormRef.value.validate();
    console.log(importFormData.value);
    await apiAccessItemObj.getDownload(importFormData.value.targetId);
  } catch (e) {
    HlMessage.error('请完成「第一步」后再下载模板');
  }
};

const closeImportDialog2 = () => {
  isShowImportDataDialog.value = false;
};

const showImportDataDialog = () => {
  isShowImportDataDialog.value = true;
};

const route = useRoute();
const queryUseState = route.query.useState;

watch(
  () => props.regionId,
  newId => {
    tableRef.value?.reset();
  }
);
watch(
  () => props.regionTypeCode,
  newId => {
    tableRef.value?.reset();
  }
);

const router = useRouter();
const { t } = useI18n();

const tableData = ref<IpostPageSpace.List[]>([]);
const tableRef = ref();

const rowKeys = ref<string[]>([]);

const selectedRowKeys = (keys: string[]) => {
  rowKeys.value = keys;
};

const productCols = [
  { title: '', slotName: 'tableSelection', headerSlotName: 'selectionCol', minWidth: '4em', align: 'left', fixed: 'left' },
  { title: '监测点名称', slotName: 'unitName', minWidth: '200px', fixed: { position: 'left', }, showTooltip: true, tooltipProps: { maxWidth: '250px' } },
  { title: `${t('region')}`, prop: 'regionName', minWidth: '200px', showTooltip: true, tooltipProps: { maxWidth: '250px' } },
  { title: '位置', prop: 'address', minWidth: '400px', showTooltip: true, tooltipProps: { maxWidth: '440px' } },
  { title: '是否虚拟', slotName: 'isInvented', minWidth: '2em' },
  { title: '业务标识', prop: 'functionIdentifier', minWidth: '6em', showTooltip: true, tooltipProps: { maxWidth: '250px' } },
  { title: '启用状态', prop: 'useStateName', minWidth: '120px' },
  { title: '更新时间', prop: 'updatedAt', sortable: true, minWidth: '170px' },
  {
    title: '操作',
    slotName: 'actions',
    align: 'left',
    fixed: 'right',
    minWidth: '240px'
  }
];

const projectCols = [
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex',
    fixed: 'left'
  },
  { title: '监测点名称', slotName: 'unitName', minWidth: '200px', fixed: { position: 'left', }, showTooltip: true, tooltipProps: { maxWidth: '250px' } },
  { title: `${t('region')}`, prop: 'regionName', minWidth: '200px' },
  { title: '位置', prop: 'address', minWidth: '400px', showTooltip: true, tooltipProps: { maxWidth: '440px' } },
  { title: '设施名称', prop: 'facilityName', minWidth: '200px', showTooltip: true, tooltipProps: { maxWidth: '260px' } },
  { title: '设施类型', prop: 'facilityTypeName', minWidth: '120px' },
  { title: '是否虚拟', slotName: 'isInvented', minWidth: '2em' },
  { title: '业务标识', prop: 'functionIdentifier', minWidth: '2em' },
  { title: '启用状态', prop: 'useStateName', minWidth: '120px' },
  { title: '点位类型', prop: 'unitTypeName', minWidth: '120px' },
  { title: '更新时间', prop: 'updatedAt', sortable: true, minWidth: '170px' },
  {
    title: '操作',
    slotName: 'actions',
    align: 'center',
    fixed: 'right',
    minWidth: '12em'
  }
];
if (localStorage.getItem('sceneCode') && localStorage.getItem('sceneCode') !== 'ALL') {
  productCols.splice(productCols.length - 1, 1);
  projectCols.splice(projectCols.length - 1, 1);
}

const cols = computed(() => {
  return GlobalAPI.config.DEPLOY_TYPE_CENTRE_CONFIG === 'product' ? productCols : projectCols;
});

const { sortQuery, sortChange } = useSort(tableRef, cols);

const unitType = ref([]);
const productSearchItems = [
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '监测点名称',
    placeholder: '监测点名称',
    value: '',
    name: 'unitName'
  },
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '监测点编码',
    placeholder: '监测点编码',
    value: '',
    name: 'unitCode'
  },
  {
    type: 'select',
    label: '启用状态',
    placeholder: '请选择启用状态',
    value: queryUseState || '',
    name: 'useState',
    options: [
      {
        label: '启用',
        value: '1'
      },
      {
        label: '停用',
        value: '0'
      }
    ]
  }
];
const projectSearchItems = reactive([
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '监测点名称',
    placeholder: '监测点名称',
    value: '',
    name: 'unitName'
  },
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '监测点编码',
    placeholder: '监测点编码',
    value: '',
    name: 'unitCode'
  },
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '设施名称',
    placeholder: '设施名称',
    value: '',
    name: 'facilityName'
  },
  {
    type: 'select',
    label: '启用状态',
    placeholder: '请选择启用状态',
    value: '',
    name: 'useState',
    options: [
      {
        label: '启用',
        value: '1'
      },
      {
        label: '停用',
        value: '0'
      }
    ]
  },
  {
    type: 'select',
    label: '点位类型',
    placeholder: '请选择点位类型',
    value: '',
    name: 'unitType',
    prop: {
      label: 'dictName',
      value: 'dictCode'
    },
    options: unitType
  }
]);

const getUnitType = async() => {
  const res = await dictApi.list('UNIT_TYPE_CODE');
  unitType.value = res.data;
};

getUnitType();

const searchItems = computed(() => {
  console.log(projectSearchItems);
  return GlobalAPI.config.DEPLOY_TYPE_CENTRE_CONFIG === 'product' ? productSearchItems : projectSearchItems;
});

const getData = async({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
  const totalRow = await fetchData({ pageSize, currentPage, params, setTotal });
  setTotal(totalRow);
};
const fetchData = async({ pageSize, currentPage, params }: DataFetcherParams) => {
  const searchParams = {
    pageSize,
    currentPage,
    ...params,
    regionId: props.regionId,
    regionTypeCode: props.regionTypeCode
  };
  if (sortQuery.value) {
    searchParams.orderColumnStr = sortQuery.value.prop;
    searchParams.orderStr = sortQuery.value.sort;
  }
  const { data } = await api.postPage(searchParams);
  tableData.value = EmptyUtils.formatArray(data.list) as IpostPageSpace.List[];
  return data.totalRow;
};
const deleteFunc = async(row: IpostPageSpace.List) => {
  await HlMessageBox.confirm(`您确认删除[${row.unitName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
    type: 'success'
  });
  await api.deleteM(row.id);
  HlMessage.success('删除成功');
  tableRef.value?.refresh();
};

const enableMessage = (useState: number, isMulti?: boolean) => {
  if (isMulti) {
    return `批量${useState ? '启用' : '停用'}成功`;
  }
  return `${useState ? '启用' : '停用'}成功`;
};

const switchPoint = async(id: number, useState: number) => {
  await api.getEnable(id, useState);
  tableRef.value?.refresh();
  HlMessage.success(enableMessage(useState));
};

const pointData = ref({
  pointId: undefined,
  regionTypeName: '',
  regionId: '',
  regionTypeCode: '',
  address: '',
  longitude: '',
  latitude: ''
});
const editPointDlgRef = ref();
const showEditPointDlg = ref(false);
const goBaseInfo = (type: string, data?: IpostPageSpace.List) => {
  /* router.push({
    name: 'pointBasicInfo',
    query: {
      pointId: data?.id,
      regionTypeName: props.regionTypeName || '',
      regionId: props.regionId || '',
      regionTypeCode: props.regionTypeCode || '',
      address: props.address || '',
      longitude: props.longitude || '',
      latitude: props.latitude || ''
    }
  }); */
  pointData.value = {
    pointId: data?.id,
    regionTypeName: props.regionTypeName || '',
    regionId: props.regionId || '',
    regionTypeCode: props.regionTypeCode || '',
    address: props.address || '',
    longitude: props.longitude || '',
    latitude: props.latitude || ''
  };
  nextTick(() => {
    showEditPointDlg.value = true;
  });
};
const closeEditPointDlg = () => {
  showEditPointDlg.value = false;
  pointData.value = {
    pointId: undefined,
    regionTypeName: '',
    regionId: '',
    regionTypeCode: '',
    address: '',
    longitude: '',
    latitude: ''
  };
  tableRef.value?.refresh();
};
const goSecondPages = (name: string, type: string, data: IpostPageSpace.List) => {
  const pushData = {
    name,
    query: {
      pointId: data.id,
      regionId: props.regionId || '',
      regionTypeCode: props.regionTypeCode || '',
      anchor: ''
    }
  };
  if (type) {
    pushData.query.anchor = type;
  }
  router.push(pushData);
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
  await api.getGetImportTemplate();
};
const handleStartOrStopEntity = async(type: number) => {
  await api.getEnableBatch(rowKeys.value, type);
  rowKeys.value = [];
  tableRef.value?.refresh();
  HlMessage.success(enableMessage(type, true));
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
    label: '监测点导入',
    icon: 'TwoDel',
    noFill: false,
    show: true,
    onClick: () => {
      showImportDialog();
    }
  },
  {
    label: '导入物联网接入数据',
    icon: 'TwoDel',
    noFill: false,
    show: true,
    onClick: () => {
      showImportDataDialog();
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
  { title: '错误信息', prop: 'msg', slotName: 'errorMessage', minWidth: '5em' },
  { title: '主体名称', prop: 'regionName' },
  { title: '监测点', prop: 'unitName' },
  { title: '地址', prop: 'address', minWidth: '8em' },
  { title: '经度', prop: 'longitude' },
  { title: '纬度', prop: 'latitude' }
];
</script>
