<template>

    <fx-page-table-v2
      ref="tableRef"
      :cols="cols"
      :table-data="tableData"
      :data-fetcher="getData"
      :search-items="searchItems"
      selector-col-count="count-2"
      search-placement="top"
      :searcher="{ show: false }">
      <template #toolbar-extra-after>
        <!-- <hl-button type="primary" icon-position="left" @click="showResultTotal">
          研判结果
          <template #icon>
            <hl-icon>
              <FillChartDoughnut />
            </hl-icon>
          </template>
        </hl-button> -->
        <fx-action-button label="研判结果" @click="showResultTotal">
          <template #icon>
            <FillChartDoughnut />
          </template>
        </fx-action-button>
      </template>
      <!--  搜索  -->
      <template #eventType="{ searchForm }">
        <event-type-selector v-model="searchForm['eventTypeCodes']" ref="searchEventTypeRef" :use-for="1" />
      </template>
      <template #alarmLevels="{ searchForm }">
        <uni-selector ref="searchAlarmLevelRef" v-model="searchForm['alarmLevels']" dictType="ALARM_LEVEL_CODE" />
      </template>

      <template #alarmState="{ row }">
        <tag-warning v-if="row.alarmState == 0" />
        <tag-unwarned v-else />
      </template>
      <template #eventTitle="{ row }">
        <hl-group full gap="var(--xs)" align="items-between">
          <hb-text-overflow style="display: inline-block; width: 12em;" effect="light">
            <span class="text-primary cursor-pointer" @click="handleShowDetail(row)">{{ row.eventTitle }}</span>
          </hb-text-overflow>
        </hl-group>
      </template>
      <template #judgeStatusSearch="{ searchForm }">
        <check-box-search
          ref="searchJudgeStatusRef"
          v-model="searchForm['judgeStatusList']"
          :options="judgeStatusOptions"
        />
      </template>
      <!--<template #alarmStateSearch="{ searchForm }">
        <check-box-search
          ref="searchAlarmStateRef"
          v-model="searchForm['alarmState']"
          :options="alarmStateOptions"
        />
      </template>-->
      <template #tagName="{ row }">
        <div v-if="row.tagName==='--'">{{row.tagName}}</div>
        <div v-else>
          <div
            v-for="item in row.tagName.split(',')"
            :key="item"
          >{{ item }}</div>
        </div>
      </template>
      <!--<template #judgeTypeSearch="{ searchForm }">
        <check-box-search
          ref="searchJudgeTypeRef"
          v-model="searchForm['judgeType']"
          :options="judgeTypeOpitons"
        />
      </template>-->
      <template #action="{ row }">
        <hl-button type="link" @click="judgeAlarm(row)" :disabled="row.judgeStatus!==0" no-fill>研判</hl-button>
<!--        <hl-button type="link" @click="tagMaintain(row)" no-fill>标签维护</hl-button>-->
      </template>
    </fx-page-table-v2>

    <alarm-judge-dialog ref="alarmJudgeDialogRef" @refreshList="refreshList" v-if="showJudgeDialog"/>
    <alarm-detail-dialog ref="alarmDetailDialogRef"/>
<!--    <tag-dlg ref="tagRef" v-if="showTagDlg" :alarmId="alarmId" @cancel="cancelTag" @ok="cancelTag();refreshList();"/>-->
    <result-total-dlg ref="resultTotalDlgRef" v-if="showResultTotalDlg" @cancel="cancelResult"/>

</template>
<script lang="ts" setup>
import { ref, reactive, watch, nextTick, onMounted } from 'vue';
import { DataFetcherParams } from 'fx-front-framework';
import { apiAlarmManageObj as api } from '@/apis/modules/alarm-manage';
import { IgetFindAlarmLogPageSpace } from '@/apis/modules/alarm-manage/model';
import { getMonitorControlParams } from '@/views/monitoring-warning/utils';
import alarmJudgeDialog from './alarmJudgeDialog.vue';
import UniSelector from '@/views/monitoring-config/components/universal-dict-selector.vue';
import EventTypeSelector from '@/views/monitoring-config/components/risk-type.vue';
import alarmDetailDialog from '@/views/monitoring-warning/alarm-management/alarm-list/components/alarmDetailDialog.vue';
// import TagDlg from '@/views/monitoring-warning/alarm-management/alarm-judgment/components/tag-dlg.vue';
import ResultTotalDlg from '@/views/monitoring-warning/alarm-management/alarm-judgment/components/result-total-dlg.vue';

import { apiYgfAlarmInfoObj } from '@/apis/modules/ygf-alarm-info/index';
import { IpostFindEventInfoPageSpace } from '@/apis/modules/ygf-alarm-info/model';

import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps({
  currentNode: {
    type: Object
  },
});

// 标签维护
/* const tagRef = ref();
const showTagDlg = ref(false);
const alarmId = ref('');
const tagMaintain = (row: IgetFindAlarmLogPageSpace.List) => {
  alarmId.value = String(row.id);
  showTagDlg.value = true;
};
const cancelTag = () => {
  showTagDlg.value = false;
}; */

// 结果统计
const resultTotalDlgRef = ref();
const showResultTotalDlg = ref(false);
const showResultTotal = () => {
  showResultTotalDlg.value = true;
};
const cancelResult = () => {
  showResultTotalDlg.value = false;
};

const NO_NEED_TO_JUDGE = 1;
const HAS_BEEN_JUDGED = '已研判';

const judgeStatusOptions = [{ label: '待研判', value: 0 }, { label: '已研判', value: 1 }];
const alarmStateOptions = [
  {
    label: '报警中',
    value: 0,
  },
  {
    label: '已消警',
    value: 1,
  },
];
const judgeTypeOpitons = [{ label: '人工研判', value: 3 }, { label: '无需研判', value: 1 }];

watch(
  () => props.currentNode,
  newId => {
    tableRef.value?.reset();
    tableRef.value?.refresh();
  }
);

const alarmDetailDialogRef = ref();
const searchAlarmStateRef = ref();
const showJudgeDialog = ref(false);

const handleShowDetail = (row: any) => {
  alarmDetailDialogRef.value.openDialog(row);
};

const tableData = ref<IpostFindEventInfoPageSpace.List[]>([]);
const tableRef = ref();
const refreshList = () => {
  showJudgeDialog.value = false;
  tableRef.value?.refresh();
};
const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex',
    fixed: 'left'
  },
  { title: '监测主体', prop: 'regionName', minWidth: '16em', showTooltip: true, tooltipProps: { maxWidth: '340px' }, fixed: { position: 'left', } },
  { title: '监测点', prop: 'monitorUnitName', minWidth: '16em', showTooltip: true, tooltipProps: { maxWidth: '340px' } },
  { title: '报警标题', prop: 'eventTitle', slotName: 'eventTitle', minWidth: '16em' },
  { title: '报警等级', prop: 'alarmLevelName', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '340px' } },
  { title: '风险分类', prop: 'eventTypeName', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '340px' } },
  { title: '报警开始时间', prop: 'startTime', minWidth: '12em' },
  // { title: '报警状态', prop: 'alarmState', slotName: 'alarmState', minWidth: '10em' },
  { title: '研判状态', prop: 'judgeStatusName', minWidth: '8em' },
  // { title: '研判方式', prop: 'judgeTypeName', minWidth: '8em' },
  // { title: '标签', prop: 'tagName', slotName: 'tagName', minWidth: '20em' },
  // { title: '研判结果', prop: 'judgeResultName', minWidth: '8em' },
  { title: '研判时间', prop: 'judgeTime', minWidth: '12em' },
  // { title: '消警时间', prop: 'endTime', minWidth: '12em' },
  { title: '操作', slotName: 'action', align: 'left', fixed: 'right' }
]);

const searchEventTypeRef = ref();
const searchAlarmLevelRef = ref();
const searchJudgeStatusRef = ref();
const searchJudgeTypeRef = ref();

const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const searchItems = reactive([
  {
    type: 'slot',
    slotName: 'judgeStatusSearch',
    label: '研判状态',
    value: [],
    name: 'judgeStatusList',
    display: (item: any) => {
      return searchJudgeStatusRef.value.getOptionName(item.value);
    },
  },
  {
    span: 'col-span-2',
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    name: 'eventTitle',
    label: '报警标题',
    placeholder: '请输入报警标题',
    value: '',
    clearable: true,
  },
  {
    type: 'slot',
    slotName: 'eventType',
    label: '风险分类',
    value: '',
    name: 'eventTypeCodes',
    display: (item: any) => {
      return searchEventTypeRef.value.getOptionName(item.value);
    },
  },
  {
    type: 'slot',
    slotName: 'alarmLevels',
    label: '报警等级',
    value: '',
    name: 'alarmLevels',
    display: (item: any) => {
      return searchAlarmLevelRef.value.getOptionName(item.value);
    },
  },
  // {
  //   type: 'slot',
  //   label: '报警状态',
  //   placeholder: '请选择报警状态',
  //   value: [],
  //   name: 'alarmState',
  //   slotName: 'alarmStateSearch',
  //   display: (item: any) => {
  //     return searchAlarmStateRef.value.getOptionName(item.value);
  //   },
  // },
  // {
  //   type: 'slot',
  //   slotName: 'judgeTypeSearch',
  //   label: '研判方式',
  //   value: [],
  //   name: 'judgeType',
  //   display: (item: any) => {
  //     return searchJudgeTypeRef.value.getOptionName(item.value);
  //   },
  // },
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
    'placeholder': '选择时间范围',
    format: dateFormat,
    'value-format': dateFormat,
    clearable: true,
    editable: false
  },
  /* {
    span: 'col-span-2',
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    name: 'selfTagNames',
    label: '标签名称',
    placeholder: '如多个名称输入“标签1|标签2”格式',
    value: '',
    clearable: true,
  }, */
]);
searchItems[0].value = '0';
if (route.query.judgeStatusList) searchItems[0].value = route.query.judgeStatusList as string;

const alarmJudgeDialogRef = ref();
const judgeAlarm = (row: any) => {
  console.log(row);
  showJudgeDialog.value = true;
  nextTick(() => {
    alarmJudgeDialogRef.value?.openDialog(row);
  });
};
const getData = async({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
  const total = await fetchData({ pageSize, currentPage, params, setTotal });
  setTotal(total);
};
const fetchData = async({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
  const searchParams = {
    pageSize,
    currentPage,
    ...params,
    startTime: params.timeRangeStart ? params.timeRangeStart : undefined,
    endTime: params.timeRangeEnd ? params.timeRangeEnd : undefined,
    ...getMonitorControlParams(props.currentNode),
    monitorUnitId: getMonitorControlParams(props.currentNode)?.unitId
  };
  // 处理风险分类
  if (params.eventTypeCodes) {
    searchParams.eventTypeCodes = [params.eventTypeCodes];
  }
  // 处理报警等级
  if (params.alarmLevels) {
    searchParams.alarmLevels = [params.alarmLevels];
  }
  // 处理研判状态
  console.log(params.judgeStatusList);
  if (params.judgeStatusList !== '' && params.judgeStatusList !== undefined) {
    if (Number(params.judgeStatusList) === 0) {
      searchParams.judgeStatusList = [0];
    } else {
      if (params.judgeStatusList.length > 1) {
        searchParams.judgeStatusList = [0, 1, 2];
      } else if (Number(params.judgeStatusList) === 1) {
        searchParams.judgeStatusList = [1, 2];
      } else {
        searchParams.judgeStatusList = [params.judgeStatusList[0]];
      }
    }
  }
  // 处理报警状态
  /* if (params.alarmState) {
    if (params.alarmState.length > 1) {
      searchParams.alarmState = '';
    } else {
      searchParams.alarmState = params.alarmState[0];
    }
  } */
  // 处理研判方式
  // searchParams.judgeType = 3;

  // 处理标签
  // if (searchParams.selfTagNames) {
  //   searchParams.selfTagNames = searchParams.selfTagNames.replaceAll('|', ',');
  // }

  const { data } = await apiYgfAlarmInfoObj.postFindEventInfoPage(searchParams);
  tableData.value = data.list;
  return data.totalRow;
};

</script>
<style lang="scss">
  #warning-list {
    .full.full-page.fx-page-table-v2 {
      height: calc(100vh - 136px - (var(--layout-header-height) + var(--layout-sub-header-height) + var(--layout-footer-height)) - var(--layout-out-padding) * 2) !important;
    }
  }
</style>
