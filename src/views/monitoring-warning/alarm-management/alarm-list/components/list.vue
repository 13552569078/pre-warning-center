<template>
  <div class="h-full">
    <fx-page-table-v2 ref="tableRef" :cols="cols" :table-data="tableData" :data-fetcher="getData" :search-items="searchItems" selector-col-count="count-2" search-placement="top" :searcher="{ show: false }">
      <template #toolbar-extra-after>
        <!-- <hl-button type="primary" icon-position="left" @click="exportEventList" class="m-r-lg">
          导出
          <template #icon>
            <hl-icon>
              <FillExport />
            </hl-icon>
          </template>
        </hl-button>
        <hl-button type="primary" icon-position="left" @click="showCharts">
          图表
          <template #icon>
            <hl-icon>
              <FillChartDoughnut />
            </hl-icon>
          </template>
        </hl-button> -->
        <fx-action-button label="导出" @click="exportEventList" type="secondary">
          <template #icon>
            <FillExport />
          </template>
        </fx-action-button>
        <fx-action-button label="图表" @click="showCharts">
          <template #icon>
            <FillChartDoughnut />
          </template>
        </fx-action-button>
      </template>
      <template #monitorEntity="{ searchForm }">
        <monitor-entity-selector v-model="searchForm['monitorEntity']" />
      </template>
      <template #eventType="{ searchForm }">
        <event-type-selector v-model="searchForm['eventTypeCodes']" ref="searchEventTypeRef" :use-for="1" />
      </template>
      <template #alarmLevels="{ searchForm }">
        <uni-selector ref="searchAlarmLevelRef" v-model="searchForm['alarmLevels']" dictType="ALARM_LEVEL_CODE" />
      </template>

      <template #eventTitle="{ row }">
        <hb-text-overflow style="display: inline-block; width: 16em" effect="light">
          <span type="link" class="text-link" @click="showDetail(row)">{{ row.eventTitle }}</span>
        </hb-text-overflow>
      </template>
    </fx-page-table-v2>
    <alarm-detail-dialog ref="alarmDetailDialogRef" :showJudgeInfo="true" />
    <historical-charts-dlg ref="historicalChartsDlgRef" :exportParams="exportParams" v-if="showHistoricalChartsDlg" @cancel="showHistoricalChartsDlg = false" />
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import { DataFetcherParams } from 'fx-front-framework';
// import { apiAlarmManageObj as api } from '@/apis/modules/alarm-manage';
// import { IgetFindAlarmLogPageSpace } from '@/apis/modules/alarm-manage/model';
import { getMonitorControlParams } from '@/views/monitoring-warning/utils';
import MonitorEntitySelector from '@/views/monitoring-warning/warning-management/realtime-warning/components/monitorEntity.vue';
import UniSelector from '@/views/monitoring-config/components/universal-dict-selector.vue';
import EventTypeSelector from '@/views/monitoring-config/components/risk-type.vue';
import historicalChartsDlg from '@/views/monitoring-warning/alarm-management/alarm-list/components/historical-charts-dlg.vue';
import { apiWarningTotalObj } from '@/apis/modules/warning-total';

import alarmDetailDialog from './alarmDetailDialog.vue';

import { apiYgfAlarmInfoObj } from '@/apis/modules/ygf-alarm-info/index';
import { IpostFindEventInfoPageSpace } from '@/apis/modules/ygf-alarm-info/model';

const props = defineProps({
  currentNode: {
    type: Object
  }
});

watch(
  () => props.currentNode,
  newId => {
    tableRef.value?.reset();
    tableRef.value?.refresh();
  }
);

const tableData = ref<IpostFindEventInfoPageSpace.List[]>([]);
const tableRef = ref();

const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex',
    fixed: 'left'
  },
  { title: '报警标题', slotName: 'eventTitle', minWidth: '16em', showTooltip: true, tooltipProps: { minWidth: '240px' }, fixed: { position: 'left', } },
  { title: '报警等级', prop: 'alarmLevelName', minWidth: '8em' },
  { title: '风险分类', prop: 'eventTypeName', minWidth: '12em', showTooltip: true, tooltipProps: { minWidth: '240px' } },
  { title: '报警开始时间', prop: 'startTime', minWidth: '14em' },
  // { title: '报警状态', prop: 'alarmState', slotName: 'alarmState', minWidth: '8em' },
  // { title: '研判方式', prop: 'judgeTypeName', minWidth: '8em' },
  { title: '处置状态', prop: 'handleStatusName', minWidth: '6em' },
  { title: '研判状态', prop: 'judgeStatusName', minWidth: '6em' },
  // { title: '报警来源', prop: 'alarmOriginName' },
  { title: '监测主体', prop: 'regionName', minWidth: '16em', showTooltip: true, tooltipProps: { minWidth: '240px' } },
  { title: '监测点', prop: 'monitorUnitName', minWidth: '16em', showTooltip: true, tooltipProps: { minWidth: '240px' } }
  // { title: '消警时间', prop: 'endTime', minWidth: '12em' },
]);

const searchEventTypeRef = ref();
const searchAlarmLevelRef = ref();
const searchAlarmStateRef = ref();
const searchJudgeTypeRef = ref();
const searchAlarmOriginRef = ref();
const searchHandleOptionRef = ref();

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const alarmStateOptions = [
  {
    label: '报警中',
    value: 0
  },
  {
    label: '已消警',
    value: 1
  }
];

const judgeTypeOpitons = [
  { label: '人工研判', value: 3 },
  { label: '无需研判', value: 1 }
];
const handleOptions = [
  { label: '无需处置', value: 1 },
  { label: '事件中心处置', value: 2 }
];

const searchItems = reactive([
  {
    span: 'col-span-2',
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    name: 'eventTitle',
    label: '报警标题',
    placeholder: '请输入报警标题',
    value: '',
    clearable: true
  },
  {
    type: 'slot',
    slotName: 'alarmLevels',
    label: '报警等级',
    value: [],
    name: 'alarmLevels',
    display: (item: any) => {
      return searchAlarmLevelRef.value.getOptionName(item.value);
    }
  },
  /* {
    type: 'slot',
    label: '报警状态',
    placeholder: '请选择报警状态',
    value: [],
    name: 'alarmState',
    slotName: 'alarmStateSearch',
    display: (item: any) => {
      return searchAlarmStateRef.value.getOptionName(item.value);
    },
  }, */
  {
    type: 'slot',
    slotName: 'eventType',
    label: '风险分类',
    value: '',
    name: 'eventTypeCodes',
    display: (item: any) => {
      return searchEventTypeRef.value.getOptionName(item.value);
    }
  },
  /* {
    type: 'slot',
    slotName: 'judgeTypeSearch',
    label: '研判方式',
    value: [],
    name: 'judgeType',
    display: (item: any) => {
      return searchJudgeTypeRef.value.getOptionName(item.value);
    },
  }, */
  {
    type: 'slot',
    slotName: 'monitorEntity',
    label: '监测布控',
    value: '',
    name: 'monitorEntity',
    display: (item: any) => {
      console.log(item);
      return item.value.label;
    }
  },
  {
    span: 'col-span-2',
    type: 'datetimerange',
    name: 'timeRange',
    label: '起始时间',
    value: '',
    'is-range': true,
    'range-separator': '至',
    'start-placeholder': '开始时间',
    'end-placeholder': '结束时间',
    placeholder: '选择时间范围',
    format: dateFormat,
    'value-format': dateFormat,
    clearable: true,
    editable: false
  }
  /* {
    type: 'slot',
    slotName: 'alarmOrigin',
    label: '报警来源',
    value: '',
    name: 'alarmOrigin',
    display: (item: any) => {
      return searchAlarmOriginRef.value.getOptionName(item.value);
    },
  }, */
]);

const alarmDetailDialogRef = ref();
const showDetail = (row: any) => {
  alarmDetailDialogRef.value.openDialog(row);
};
const getData = async ({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
  const total = await fetchData({ pageSize, currentPage, params, setTotal });
  setTotal(total);
};
const exportParams = ref({});
const fetchData = async ({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
  let searchParams = {
    pageSize,
    currentPage,
    ...params,
    startTime: params.timeRangeStart ? params.timeRangeStart : undefined,
    endTime: params.timeRangeEnd ? params.timeRangeEnd : undefined
  };
  // 处理报警状态
  /* if (params.alarmState) {
    if (params.alarmState.length > 1) {
      searchParams.alarmState = '';
    } else {
      searchParams.alarmState = params.alarmState[0];
    }
  } */
  // 处理报警等级
  if (params.alarmLevels) {
    searchParams.alarmLevels = [params.alarmLevels];
  }
  // 处理风险分类
  if (params.eventTypeCodes) {
    searchParams.eventTypeCodes = [params.eventTypeCodes];
  }
  // 处理处置方式
  // if (params.handleOption) {
  //   if (params.handleOption.length > 1) {
  //     searchParams.handleOption = '';
  //   } else {
  //     searchParams.handleOption = params.handleOption[0];
  //   }
  // }
  // 处理研判方式
  // if (params.judgeType) {
  //   if (params.judgeType.length > 1) {
  //     searchParams.judgeType = '';
  //   } else {
  //     searchParams.judgeType = params.judgeType[0];
  //   }
  // }
  if (params.monitorEntity && Object.keys(params.monitorEntity).length) {
    searchParams = Object.assign(searchParams, getMonitorControlParams(params.monitorEntity));
    if (searchParams.unitId) {
      searchParams.monitorUnitId = searchParams.unitId;
    }
  }
  exportParams.value = searchParams;
  const { data } = await apiYgfAlarmInfoObj.postFindEventInfoPage(searchParams);
  tableData.value = data.list;
  return data.totalRow;
};

const exportEventList = () => {
  console.log(288, exportParams);
  apiYgfAlarmInfoObj.postExportList(exportParams.value);
};

const historicalChartsDlgRef = ref();
const showHistoricalChartsDlg = ref(false);
const showCharts = () => {
  showHistoricalChartsDlg.value = true;
};
</script>
