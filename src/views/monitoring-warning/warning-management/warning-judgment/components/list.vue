<template>

    <fx-page-table-v2
      ref="tableRef"
      class="table-v2"
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
        <event-type-selector v-model="searchForm['eventTypeCode']" ref="searchEventTypeRef" :use-for="1" bodyClass="custom"/>
      </template>
      <template #alarmLevel="{ searchForm }">
        <uni-selector ref="searchAlarmLevelRef" v-model="searchForm['alarmLevel']" dictType="ALARM_LEVEL_CODE" />
      </template>

      <template #alarmState="{ row }">
        <tag-warning v-if="row.alarmState == 0" />
        <tag-unwarned v-else />
      </template>
      <template #alarmTitle="{ row }">
        <hl-group full gap="var(--xs)" align="items-between">
          <hb-text-overflow style="display: inline-block; width: 12em;" effect="light">
            <span class="text-primary cursor-pointer" @click="handleShowDetail(row)">{{ row.alarmTitle }}</span>
          </hb-text-overflow>
        </hl-group>
      </template>
      <template #judgeStatusSearch="{ searchForm }">
        <check-box-search
          ref="searchJudgeStatusRef"
          v-model="searchForm['judgeStatus']"
          :options="judgeStatusOptions"
        />
      </template>
      <template #alarmStateSearch="{ searchForm }">
        <check-box-search
          ref="searchAlarmStateRef"
          v-model="searchForm['alarmState']"
          :options="alarmStateOptions"
        />
      </template>
      <!-- <template #tagName="{ row }">
        <div v-if="row.tagName==='--'">{{row.tagName}}</div>
        <div v-else>
          <div
            v-for="item in row.tagName.split(',')"
            :key="item"
          >{{ item }}</div>
        </div>
      </template> -->
      <!--<template #judgeTypeSearch="{ searchForm }">
        <check-box-search
          ref="searchJudgeTypeRef"
          v-model="searchForm['judgeType']"
          :options="judgeTypeOpitons"
        />
      </template>-->
      <template #action="{ row }">
        <hl-button type="link" @click="judgeAlarm(row)" :disabled="row.judgeType === NO_NEED_TO_JUDGE || row.judgeStatusName === HAS_BEEN_JUDGED" no-fill>研判</hl-button>
        <!-- <hl-button type="link" @click="tagMaintain(row)" no-fill>标签维护</hl-button> -->
      </template>
    </fx-page-table-v2>

    <alarm-judge-dialog ref="alarmJudgeDialogRef" @refreshList="refreshList" v-if="showJudgeDialog"/>
    <alarm-detail-dialog ref="alarmDetailDialogRef"/>
    <!-- <tag-dlg ref="tagRef" v-if="showTagDlg" :alarmId="alarmId" @cancel="cancelTag" @ok="cancelTag();refreshList();"/> -->
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
import alarmDetailDialog from '@/views/monitoring-warning/warning-management/historical-warning/components/alarmDetailDialog.vue';
// import TagDlg from '@/views/monitoring-warning/warning-management/warning-judgment/components/tag-dlg.vue';
import ResultTotalDlg from '@/views/monitoring-warning/warning-management/warning-judgment/components/result-total-dlg.vue';

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
    label: '预警中',
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

const tableData = ref<IgetFindAlarmLogPageSpace.List[]>([]);
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
  { title: '预警标题', prop: 'alarmTitle', slotName: 'alarmTitle', minWidth: '16em', fixed: { position: 'left', } },
  { title: '预警等级', prop: 'alarmLevelName', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '340px' } },
  { title: '风险分类', prop: 'eventTypeName', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '340px' } },
  { title: '预警开始时间', prop: 'startTime', minWidth: '12em' },
  { title: '预警状态', prop: 'alarmState', slotName: 'alarmState', minWidth: '10em' },
  { title: '研判状态', prop: 'judgeStatusName', minWidth: '8em' },
  // { title: '研判方式', prop: 'judgeTypeName', minWidth: '8em' },
  // { title: '标签', prop: 'tagName', slotName: 'tagName', minWidth: '20em' },
  { title: '研判结果', prop: 'judgeResultName', minWidth: '8em' },
  { title: '研判时间', prop: 'judgeTime', minWidth: '12em' },
  /* { title: '监测主体', prop: 'regionName', minWidth: '16em', showTooltip: true, tooltipProps: { maxWidth: '340px' } },
  { title: '监测点', prop: 'monitorUnitName', minWidth: '16em', showTooltip: true, tooltipProps: { maxWidth: '340px' } }, */
  { title: '消警时间', prop: 'endTime', minWidth: '12em' },
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
    name: 'judgeStatus',
    display: (item: any) => {
      return searchJudgeStatusRef.value.getOptionName(item.value);
    },
  },
  {
    span: 'col-span-2',
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    name: 'alarmTitle',
    label: '预警标题',
    placeholder: '请输入预警标题',
    value: '',
    clearable: true,
  },
  {
    type: 'slot',
    slotName: 'eventType',
    label: '风险分类',
    value: '',
    name: 'eventTypeCode',
    display: (item: any) => {
      return searchEventTypeRef.value.getOptionName(item.value);
    },
  },
  {
    type: 'slot',
    slotName: 'alarmLevel',
    label: '预警等级',
    value: '',
    name: 'alarmLevel',
    display: (item: any) => {
      return searchAlarmLevelRef.value.getOptionName(item.value);
    },
  },
  {
    type: 'slot',
    label: '预警状态',
    placeholder: '请选择预警状态',
    value: [],
    name: 'alarmState',
    slotName: 'alarmStateSearch',
    display: (item: any) => {
      return searchAlarmStateRef.value.getOptionName(item.value);
    },
  },
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
if (route.query.judgeStatus) searchItems[0].value = route.query.judgeStatus as string;

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
  // 处理研判状态
  if (params.judgeStatus) {
    if (params.judgeStatus.length > 1) {
      searchParams.judgeStatus = '';
    } else {
      searchParams.judgeStatus = params.judgeStatus[0];
    }
  }
  // 处理预警状态
  if (params.alarmState) {
    if (params.alarmState.length > 1) {
      searchParams.alarmState = '';
    } else {
      searchParams.alarmState = params.alarmState[0];
    }
  }
  // 处理研判方式
  searchParams.judgeType = 3;

  // 处理标签
  if (searchParams.selfTagNames) {
    searchParams.selfTagNames = searchParams.selfTagNames.replaceAll('|', ',');
  }

  const { data } = await api.getFindAlarmLogPage(searchParams);
  tableData.value = data.list;
  return data.totalRow;
};

</script>
<style lang="scss">
  .table-v2 {
    height: calc(100% - 140px);
  }
</style>
