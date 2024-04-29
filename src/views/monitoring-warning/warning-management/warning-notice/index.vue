<template>
  <div class="w-full h-full">
    <fx-page-table-v2 ref="tableRef" :cols="cols" :table-data="tableData" :data-fetcher="getData" selector-col-count="count-2" search-placement="top" :search-items="searchItems">
      <template #toolbar-extra-after>
        <!-- <hl-button type="primary" icon-position="left" class="m-r-lg" @click="exportExcel">
          导出
          <template #icon>
            <hl-icon>
              <FillExport />
            </hl-icon>
          </template>
        </hl-button>
        <hl-button type="primary" icon-position="left" @click="openDlg">
          图表
          <template #icon>
            <hl-icon>
              <FillChartDoughnut />
            </hl-icon>
          </template>
        </hl-button> -->
        <fx-action-button label="导出" @click="exportExcel" type="secondary">
          <template #icon>
            <FillExport />
          </template>
        </fx-action-button>
        <fx-action-button label="图表" @click="openDlg">
          <template #icon>
            <FillChartDoughnut />
          </template>
        </fx-action-button>
      </template>
      <template #alarmState="{ row }">
        <tag-warning v-if="row.alarmState == 0" />
        <tag-unwarned v-else />
      </template>
      <!-- 搜索-->
      <!-- 预警等级 -->
      <template #alarmLevel="{ searchForm }">
        <uni-selector ref="searchAlarmLevelRef" v-model="searchForm['alarmLevels']" dictType="ALARM_LEVEL_CODE" :multiple="true" />
      </template>
      <!-- 风险分类 -->
      <template #eventType="{ searchForm }">
        <search-risk-type-check v-model="searchForm['eventTypeCodes']" @risk-changed="riskChanged" :placeholder="`请选择${$t('warningType')}`" ref="searchRiskRef" />
      </template>
      <!-- 预警状态 -->
      <template #alarmStateSearch="{ searchForm }">
        <check-box-search ref="searchAlarmStateRef" v-model="searchForm['alarmState']" :options="alarmStateList" />
      </template>
      <!-- 预警来源 -->
      <template #alarmSourseSearch="{ searchForm }">
        <check-box-search ref="alarmSourseSearchRef" v-model="searchForm['alarmOrigin']" :options="alarmSourseOptions" />
      </template>
      <template #monitorEntity="{ searchForm }">
        <monitor-entity-selector v-model="searchForm['monitorEntity']"/>
      </template>
    </fx-page-table-v2>
    <total-charts-dlg ref="totalChartsDlgRef" v-if="showTotalChartsDlg" :exportParams="exportParams" @cancel="cancel"/>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { HlMessageBox } from 'hongluan-ui';
import { DataFetcherParams } from 'fx-front-framework';
import { omit } from 'lodash-es';
import { HlMessageSuccess } from '@/common';
import { apiThridAlarmObj } from '@/apis/modules/third-alarm';
import { IgetFindAlarmLogPageSpace } from '@/apis/modules/third-alarm/model';
import { alarmStateList } from './utils';
import { UniSelector } from '@/components';
import SearchRiskTypeCheck from '@/views/whole-analysis/high-incidence/components/search-risk-type-check.vue';
import MonitorEntitySelector from '@/views/monitoring-warning/warning-management/realtime-warning/components/monitorEntity.vue';
import { getMonitorControlParams } from '@/views/monitoring-warning/utils';

import { apiYgfAlarmInfoObj } from '@/apis/modules/ygf-alarm-info/index';
import { IpostFindEventNotifyPageSpace } from '@/apis/modules/ygf-alarm-info/model';
import totalChartsDlg from './total-charts-dlg.vue';

interface SearchItemNode {
  value: string;
  name: string;
}
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

let moduleName = '预警';
moduleName = route.meta.title === '报警通知' ? '报警' : '预警';
// table list
const tableData = ref<IgetFindAlarmLogPageSpace.List[]|IpostFindEventNotifyPageSpace.List[]>([]);
const tableRef = ref();
const addRef = ref();
const isShowImportDialog = ref(false);

// search
const searchAlarmLevelRef = ref();
const alarmSourseSearchRef = ref();
const searchAlarmStateRef = ref();
const alarmDetailDialogRef = ref();
const eventTypeCodes = ref<string[]>([]);

const alarmOriginInit:string[] = [];
const searchItems = reactive([
  {
    type: 'slot',
    slotName: 'eventType',
    label: `${t('warningType')}`,
    value: '',
    name: 'eventTypeCodes',
    display: (item: SearchItemNode) => {
      return item.value;
    }
  },
  {
    type: 'slot',
    slotName: 'monitorEntity',
    label: '监测主体',
    value: '',
    name: 'monitorEntity',
    display: (item: any) => {
      console.log(item);
      return item.value.label;
    },
  },
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: `${moduleName}内容`,
    placeholder: `请输入${moduleName}内容`,
    value: '',
    name: 'sendContent'
  },
  {
    type: 'datetimerange',
    label: '起始时间',
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
  },
  {
    type: 'slot',
    slotName: 'alarmLevel',
    label: `${moduleName}等级`,
    value: [],
    name: 'alarmLevels',
    display: (item: SearchItemNode) => {
      return searchAlarmLevelRef.value.getOptionName(item.value);
    }
  },
]);
const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex',
    fixed: { position: 'left' }
  },
  { title: '通知内容', prop: 'sendContent', showTooltip: true, tooltipProps: { width: '240px' }, minWidth: '12em', fixed: { position: 'left', } },
  { title: '风险分类', prop: 'eventTypeName', showTooltip: true, tooltipProps: { width: '240px' }, minWidth: '8em' },
  { title: '监测主体', prop: 'regionName', showTooltip: true, tooltipProps: { width: '240px' }, minWidth: '10em' },
  { title: '发送时间', prop: 'sendTime', minWidth: '12em' },
  { title: `${moduleName}等级`, prop: 'alarmLevelName', showTooltip: true, tooltipProps: { width: '240px' }, minWidth: '4em' },
  { title: '发送对象', prop: 'sendForName', minWidth: '8em' },
]);

const exportParams = ref({});
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
  if (params.eventTypeCodes) {
    searchParams.eventTypeCodes = eventTypeCodes.value;
  }
  if (eventTypeCodes.value.length === 0) {
    searchParams = omit(searchParams, 'eventTypeCodes');
  }

  if (params.monitorEntity && Object.keys(params.monitorEntity).length) {
    searchParams = Object.assign(searchParams, getMonitorControlParams(params.monitorEntity));
    if (searchParams.unitId) {
      searchParams.monitorUnitId = searchParams.unitId;
    }
  }

  exportParams.value = searchParams;

  const { data } = moduleName === '报警' ? await apiYgfAlarmInfoObj.postFindEventNotifyPage(searchParams) : await apiYgfAlarmInfoObj.postFindAlarmNotifyPage(searchParams);
  tableData.value = data.list;
  setTotal(data.totalRow);
};
const riskChanged = (data: string[]) => {
  eventTypeCodes.value = data;
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

const exportExcel = () => {
  moduleName === '报警' ? apiYgfAlarmInfoObj.postEventNotifyExportList(exportParams.value) : apiYgfAlarmInfoObj.postAlarmNotifyExportList(exportParams.value);
};
const showTotalChartsDlg = ref(false);
const cancel = () => {
  showTotalChartsDlg.value = false;
};
const openDlg = () => {
  showTotalChartsDlg.value = true;
};
</script>
