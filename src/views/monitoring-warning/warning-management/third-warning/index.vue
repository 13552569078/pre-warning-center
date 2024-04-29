<template>
  <div class="w-full h-full">
    <fx-page-table-v2 ref="tableRef" :cols="cols" :table-data="tableData" :data-fetcher="getData" selector-col-count="count-2" search-placement="top" :search-items="searchItems">
      <template #toolbar-extra-after>
        <hl-group gap="var(--md)" class="m-l-md" v-city-life-line>
          <dropdown-button :options="selectionActions" />
          <fx-action-button type="main" label="新增第三方预警" @click="add" />
        </hl-group>
      </template>
      <template #alarmState="{ row }">
        <tag-warning v-if="row.alarmState == 0" />
        <tag-unwarned v-else />
      </template>
      <template #alarmTitle="{ row }">
        <hb-text-overflow style="display: inline-block; width: 16em" effect="light">
          <span type="link" class="text-link" @click="handleShowDetail(row)">{{ row.alarmTitle }}</span>
        </hb-text-overflow>
      </template>
      <template #action="{ row }">
        <!-- <div style="padding-right: 10px;"> -->
          <hl-button type="link" @click="edit(row)">编辑</hl-button>
          <hl-button type="link" @click="del(row)">删除</hl-button>
        <!-- </div> -->
      </template>
      <!-- 搜索-->
      <!-- 预警等级 -->
      <template #alarmLevel="{ searchForm }">
        <uni-selector ref="searchAlarmLevelRef" v-model="searchForm['alarmLevels']" dictType="ALARM_LEVEL_CODE" :multiple="true" />
      </template>
      <!-- 风险分类 -->
      <template #eventType="{ searchForm }">
        <search-risk-type-check v-model="searchForm['eventTypeCode']" @risk-changed="riskChanged" :placeholder="`请选择${$t('warningType')}`" ref="searchRiskRef" />
      </template>
      <!-- 预警状态 -->
      <template #alarmStateSearch="{ searchForm }">
        <check-box-search ref="searchAlarmStateRef" v-model="searchForm['alarmState']" :options="alarmStateList" />
      </template>
      <!-- 预警来源 -->
      <template #alarmSourseSearch="{ searchForm }">
        <check-box-search ref="alarmSourseSearchRef" v-model="searchForm['alarmOrigin']" :options="alarmSourseOptions" />
      </template>
    </fx-page-table-v2>
    <!-- 详情 -->
    <alarm-detail-dialog ref="alarmDetailDialogRef" />
    <!-- 导入 -->
    <import-dlg-xls v-if="isShowImportDialog" title="三方预警" action="/thirdAlarm/importAlarmList" :error-cols="errorCols" errorKey="alarmInfo" @downLoad="handleDownloadTemplate" @close="closeImportDialog" @success="handleResetTable" />
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { HlMessageBox } from 'hongluan-ui';
import { DataFetcherParams } from 'fx-front-framework';
import { omit } from 'lodash-es';
import { HlMessageSuccess } from '@/common';
import { apiThridAlarmObj } from '@/apis/modules/third-alarm';
import { IgetFindAlarmLogPageSpace } from '@/apis/modules/third-alarm/model';
import alarmDetailDialog from '@/views/monitoring-warning/warning-management/historical-warning/components/alarmDetailDialog.vue';
import { UniSelector, ImportDlgXls } from '@/components';
import SearchRiskTypeCheck from '@/views/whole-analysis/high-incidence/components/search-risk-type-check.vue';
import { alarmStateList } from './utils';

interface SearchItemNode {
  value: string;
  name: string;
}
const router = useRouter();
const { t } = useI18n();

// table list
const tableData = ref<IgetFindAlarmLogPageSpace.List[]>([]);
const tableRef = ref();
const isShowImportDialog = ref(false);

// search
const searchAlarmLevelRef = ref();
const alarmSourseSearchRef = ref();
const searchAlarmStateRef = ref();
const alarmDetailDialogRef = ref();
const eventTypeCode = ref<string[]>([]);

const alarmOriginInit = ['OUT_ALARM', 'MODEL_GENERATOR'];
const searchItems = reactive([
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '预警标题',
    placeholder: '请输入预警标题',
    value: '',
    name: 'alarmTitle'
  },
  {
    type: 'slot',
    slotName: 'alarmLevel',
    label: '预警等级',
    value: [],
    name: 'alarmLevels',
    display: (item: SearchItemNode) => {
      return searchAlarmLevelRef.value.getOptionName(item.value);
    }
  },
  {
    type: 'slot',
    slotName: 'eventType',
    label: `${t('warningType')}`,
    value: '',
    name: 'eventTypeCode',
    display: (item: SearchItemNode) => {
      return item.value;
    }
  },
  {
    type: 'slot',
    slotName: 'alarmStateSearch',
    label: '预警状态',
    placeholder: '请选择预警状态',
    value: [],
    name: 'alarmState',
    display: (item: SearchItemNode) => {
      return searchAlarmStateRef.value?.getOptionName(item.value);
    }
  },
  {
    type: 'slot',
    slotName: 'alarmSourseSearch',
    label: '预警来源',
    placeholder: '请选择预警来源',
    value: alarmOriginInit,
    name: 'alarmOrigin',
    display: (item: SearchItemNode) => {
      return alarmSourseSearchRef.value?.getOptionName(item.value);
    }
  },
  {
    type: 'daterange',
    label: '预警时间',
    value: [],
    name: 'timeRange',
    'is-range': true,
    'range-separator': '至',
    'start-placeholder': '开始时间',
    'end-placeholder': '结束时间',
    placeholder: '选择时间范围',
    format: 'YYYY-MM-DD HH:mm:ss',
    'value-format': 'YYYY-MM-DD HH:mm:ss',
    clearable: false,
    editable: false
  }
]);
const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex',
    fixed: { position: 'left' }
  },
  { title: '预警标题', slotName: 'alarmTitle', showTooltip: true, tooltipProps: { width: '240px' }, minWidth: '12em', fixed: { position: 'left', } },
  { title: '预警等级', prop: 'alarmLevelName', showTooltip: true, tooltipProps: { width: '240px' }, minWidth: '4em' },
  { title: '风险分类', prop: 'eventTypeName', showTooltip: true, tooltipProps: { width: '240px' }, minWidth: '8em' },
  { title: '预警开始时间', prop: 'startTime', minWidth: '12em' },
  { title: '预警状态', slotName: 'alarmState', minWidth: '8em', align: 'left' },
  { title: '预警来源', prop: 'alarmOriginName', minWidth: '6em' },
  { title: '预警地点', prop: 'alarmAddress', showTooltip: true, tooltipProps: { width: '240px' }, minWidth: '10em' },
  // { title: '监测主体', prop: 'regionName', showTooltip: true, tooltipProps: { width: '240px' }, minWidth: '10em' },
  // { title: '监测点', prop: 'monitorUnitName', showTooltip: true, tooltipProps: { width: '240px' }, minWidth: '8em' },
  { title: '操作', prop: 'action', slotName: 'action', minWidth: '4em', align: 'left', fixed: true }
]);
if (localStorage.getItem('sceneCode') && localStorage.getItem('sceneCode') !== 'ALL') cols.value.splice(cols.value.length - 1, 1);

const getData = async({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
  let searchParams = {
    pageSize,
    currentPage,
    ...params
  };
  if (params.alarmState) {
    if (params.alarmState.length > 1) {
      searchParams.alarmState = '';
    } else {
      searchParams.alarmState = params.alarmState[0];
    }
  }
  if (params.timeRangeStart) {
    searchParams.startTime = params.timeRangeStart;
    searchParams.endTime = params.timeRangeEnd;
  }
  if (params.eventTypeCode) {
    searchParams.eventTypeCodes = eventTypeCode.value;
  }
  if (eventTypeCode.value.length === 0) {
    searchParams = omit(searchParams, 'eventTypeCode');
  }
  // 来源不选  默认选择全部
  if (!searchParams.alarmOrigin) searchParams.alarmOrigin = alarmOriginInit;
  const { data } = await apiThridAlarmObj.getFindAlarmLogPage(searchParams);
  tableData.value = data.list;
  setTotal(data.totalRow);
};
const riskChanged = (data: string[]) => {
  eventTypeCode.value = data;
};
const add = () => {
  router.push({
    name: 'ThirdAlarmConfig',
    query: {
      action: 'add'
    }
  });
};
const edit = async(row: IgetFindAlarmLogPageSpace.List) => {
  router.push({
    name: 'ThirdAlarmConfig',
    query: {
      action: 'edit',
      id: row.id
    }
  });
};
const del = async(row: IgetFindAlarmLogPageSpace.List) => {
  await HlMessageBox.confirm(`您确认删除[${row.alarmTitle}]预警信息吗?`, '确认删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消'
  });
  await apiThridAlarmObj.deleteT(row.id);
  HlMessageSuccess('删除成功');
  tableRef.value?.refresh();
};
const handleDownloadTemplate = async() => {
  await apiThridAlarmObj.getGetImportTemplate();
};
const showImportDialog = () => {
  isShowImportDialog.value = true;
};
const closeImportDialog = () => {
  isShowImportDialog.value = false;
};
const handleResetTable = () => {
  tableRef.value?.reset();
};

const handleShowDetail = (row: any) => {
  console.log(row);
  alarmDetailDialogRef.value.openDialog(row, 'third');
};

const alarmSourseOptions = [
  {
    label: '模型生成',
    value: 'MODEL_GENERATOR'
  },
  {
    label: '外部预警',
    value: 'OUT_ALARM'
  }
];
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
    label: '预警导入',
    icon: 'TwoDel',
    noFill: false,
    show: true,
    onClick: () => {
      showImportDialog();
    }
  }
]);

const errorCols = [
  { title: '', slotName: 'tableIndex', headerSlotName: 'firstCol', width: 'fit-content', },
  { title: '错误信息', prop: 'msg', slotName: 'errorMessage', minWidth: '20em' },
  { title: '预警名称', prop: 'alarmTitle' },
  { title: '风险分类', prop: 'eventTypeName' },
  { title: '地址', prop: 'alarmAddress', minWidth: '8em' }
];
</script>
