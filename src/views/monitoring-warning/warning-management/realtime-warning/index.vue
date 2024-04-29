<template>
  <div class="realtime-alarm custom-table">
    <tab v-model="dataType" :alarm-num="(alarmNum as number)" :today-num="(todayNum as number)" />
    <fx-page-table-v2 ref="tableRef" v-if="!switching" :cols="cols" :table-data="tableData" :data-fetcher="getData" selector-col-count="count-2" search-placement="top" :search-items="searchItems" class="table-v2">
      <template #toolbar-extra-after v-if="dataType === WARNING_DATA">
        <hl-button type="primary" :disabled="!rowKeys.length" @click="removeWaringOpen('multiple')">批量消警</hl-button>
      </template>
      <!-- <template #selectionColCol></template> -->
      <template #tableSelectionCol="{ row }">
        <hl-checkbox :disabled="!!row.alarmState" v-model="row.selection"></hl-checkbox>
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
        <hl-button type="link" @click="removeWaringOpen('single', row)" no-fill :disabled="!!row.alarmState">消警</hl-button>
      </template>
      <!-- 搜索-->
      <!-- <template #monitorEntity="{ searchForm }">
        <monitor-entity-selector v-model="searchForm['monitorEntity']" />
      </template> -->
      <template #alarmLevel="{ searchForm }">
        <uni-selector ref="searchAlarmLevelRef" v-model="searchForm['alarmLevel']" dictType="ALARM_LEVEL_CODE" />
      </template>
      <template #alarmOrigin="{ searchForm }">
        <uni-selector ref="searchAlarmOriginRef" v-model="searchForm['alarmOrigin']" dictType="ALARM_ORIGIN" />
      </template>
      <template #eventType="{ searchForm }">
        <event-type-selector v-model="searchForm['eventTypeCode']" ref="searchEventTypeRef" :use-for="1" bodyClass="custom"/>
      </template>
      <template #alarmStateSearch="{ searchForm }">
        <check-box-search ref="searchAlarmStateRef" v-model="searchForm['alarmState']" :options="alarmStateOptions" />
      </template>
    </fx-page-table-v2>
    <alarm-detail-dialog ref="alarmDetailDialogRef" />

    <!-- 消警 -->
    <hl-dialog v-model="dialogVisible" width="calc(var(--xxs) * 100)" borderless title="手动消警">
      <hl-form ref="formRef" :model="formData" :rules="rules" gap="var(--lg)" item-gap="var(--lg2)">
        <hl-form-item label="消警时间" prop="cancelTime">
          <hl-date-picker class="w-full" value-format="YYYY-MM-DD HH:mm:ss" v-model="formData.cancelTime" type="datetime" placeholder="消警时间" style="width: 400px" />
        </hl-form-item>
        <hl-form-item label="消警原因" prop="cancelDes">
          <hl-input v-model="formData.cancelDes" native-type="textarea" style="width: 400px" maxlength="200" show-word-limit />
        </hl-form-item>
      </hl-form>
      <template #footer>
        <span class="dialog-footer">
          <hl-button @click="dialogVisible = false">取 消</hl-button>
          <hl-button type="primary" class="m-l-md" @click="removeWaringOk">确 定</hl-button>
        </span>
      </template>
    </hl-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onBeforeMount, watch, nextTick, computed } from 'vue';
import { dayjs } from 'hongluan-ui';
import { useI18n } from 'vue-i18n';
import { HlMessageBox, HlMessage } from 'hongluan-ui';
import { DataFetcherParams } from 'fx-front-framework';
import { apiAlarmManageObj as api } from '@/apis/modules/alarm-manage';
import { IgetFindAlarmLogPageSpace } from '@/apis/modules/alarm-manage/model';
import { getMonitorControlParams } from '@/views/monitoring-warning/utils';
import { validateTime } from '@/common';
import Tab from './tabs.vue';
import UniSelector from '@/views/monitoring-config/components/universal-dict-selector.vue';
import EventTypeSelector from '@/views/monitoring-config/components/risk-type.vue';
import alarmDetailDialog from '@/views/monitoring-warning/warning-management/historical-warning/components/alarmDetailDialog.vue';

const WARNING_DATA = 0;
const TODAY_DATA = 1;

const { t } = useI18n();
const tableData = ref<IgetFindAlarmLogPageSpace.List[]>([]);
const tableRef = ref();
const searchAlarmLevelRef = ref();
const searchEventTypeRef = ref();
const searchAlarmOriginRef = ref();
const searchAlarmStateRef = ref();
const switching = ref(false);

const dataType = ref(0);
const todayNum = ref<string | number>('--');
const alarmNum = ref<string | number>('--');
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const TodayDateRangeValue = [dayjs().startOf('day').format(dateFormat), dayjs().endOf('day').format(dateFormat)];

const singleWarningId = ref('');
const cancelType = ref('single');
const dialogVisible = ref(false);
const calcelAlarmIds = ref<number[]>([]);
const formData = reactive({
  cancelTime: '',
  cancelDes: ''
});
const rules = {
  cancelTime: [
    { required: true, message: '消警时间不能为空' },
    { validator: validateTime, trigger: ['change', 'blur'] }
  ],
  cancelDes: [{ required: true, message: '消警原因不能为空' }]
};
const formRef = ref();

const rowKeys = computed(() => {
  return tableData.value
    .filter((item: IgetFindAlarmLogPageSpace.List) => {
      return item.selection;
    })
    .map((item: IgetFindAlarmLogPageSpace.List) => {
      return item.id;
    });
});

const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'left',
    slotName: 'tableIndex',
    fixed: 'left'
  },
  { title: '', slotName: 'tableSelectionCol', width: '10px' },
  { title: '预警标题', slotName: 'alarmTitle', showTooltip: true, tooltipProps: { width: '240px' }, minWidth: '16em' },
  { title: '预警等级', prop: 'alarmLevelName', showTooltip: true, tooltipProps: { width: '240px' }, minWidth: '4em' },
  { title: '风险分类', prop: 'eventTypeName', showTooltip: true, tooltipProps: { width: '240px' }, minWidth: '8em' },
  { title: '预警开始时间', prop: 'startTime', minWidth: '12em' },
  { title: '预警状态', slotName: 'alarmState', minWidth: '8em' },
  // { title: '预警来源', prop: 'alarmOriginName', minWidth: '6em' },
  /* { title: `${t('region')}`, prop: 'regionName', showTooltip: true, tooltipProps: { width: '240px' }, minWidth: '10em' },
  { title: '监测点', prop: 'monitorUnitName', showTooltip: true, tooltipProps: { width: '240px' }, minWidth: '8em' }, */
  { title: '消警时间', prop: 'endTime', minWidth: '12em' },
  { title: '操作', slotName: 'action', width: '4em', align: 'left', fixed: 'right' }
]);

const alarmStateOptions = [
  {
    label: '预警中',
    value: 0
  },
  {
    label: '已消警',
    value: 1
  }
];

const searchItems = reactive([
  /* {
    type: 'slot',
    slotName: 'monitorEntity',
    label: '监测布控',
    value: '',
    name: 'monitorEntity',
    display: (item: any) => {
      console.log(item);
      return item.value.label;
    }
  }, */
  {
    type: 'slot',
    slotName: 'alarmStateSearch',
    label: '预警状态',
    placeholder: '请选择预警状态',
    value: [0],
    name: 'alarmState',
    display: (item: any) => {
      return searchAlarmStateRef.value?.getOptionName(item.value);
    }
  },
  {
    span: 'xl:col-span-2',
    type: 'daterange',
    label: '预警时间',
    value: [],
    name: 'timeRange',
    'is-range': true,
    'range-separator': '至',
    'start-placeholder': '开始时间',
    'end-placeholder': '结束时间',
    placeholder: '选择时间范围',
    format: dateFormat,
    'value-format': dateFormat,
    clearable: false,
    editable: false
  },
  {
    type: 'slot',
    slotName: 'alarmLevel',
    label: '预警等级',
    value: '',
    name: 'alarmLevel',
    display: (item: any) => {
      return searchAlarmLevelRef.value.getOptionName(item.value);
    }
  },
  {
    type: 'slot',
    slotName: 'eventType',
    label: '风险分类',
    value: '',
    name: 'eventTypeCode',
    display: (item: any) => {
      return searchEventTypeRef.value.getOptionName(item.value);
    }
  },
  {
    type: 'slot',
    slotName: 'alarmOrigin',
    label: '预警来源',
    value: '',
    name: 'alarmOrigin',
    display: (item: any) => {
      return searchAlarmOriginRef.value.getOptionName(item.value);
    }
  }
]);

const currentPageNum = ref(1);

const pageParams = ref<any>({});

// watch(
//   () => pageParams.value,
//   value => {
//     // alert(value.alarmState);
//     dataType.value = value.alarmState === undefined ? '' : value.alarmState;
//   },
//   { deep: true }
// );

const getData = async ({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
  pageParams.value = params;
  currentPageNum.value = currentPage;
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
  if (params.monitorEntity && Object.keys(params.monitorEntity).length) {
    searchParams = Object.assign(searchParams, getMonitorControlParams(params.monitorEntity));
    if (searchParams.unitId) {
      searchParams.monitorUnitId = searchParams.unitId;
    }
  }
  tableData.value = [];
  const { data } = await api.getFindAlarmLogPage(searchParams);
  tableData.value = data.list.map((item: IgetFindAlarmLogPageSpace.List) => {
    return { ...item, selection: false };
  });
  setTotal(data.totalRow);
};

watch(
  () => dataType.value,
  (value: number) => {
    switching.value = true;
    rowKeys.value = [];
    if (value === WARNING_DATA) {
      console.log('预警中');
      searchItems[0].value = [0];
      searchItems[1].value = '';
    } else if (value === TODAY_DATA) {
      console.log('当日预警');
      searchItems[1].value = TodayDateRangeValue;
      searchItems[0].value = [];
    } else {
      searchItems[0].value = [];
      searchItems[1].value = [];
    }

    nextTick(() => {
      switching.value = false;
    });
  }
);

const getTodayNum = async () => {
  const res = await api.getFindTodayAlarmNumber();
  todayNum.value = res.data;
};

const getAlarmNum = async () => {
  const res = await api.getAlarmingNumber();
  alarmNum.value = res.data;
};

const alarmDetailDialogRef = ref();
const handleShowDetail = (row: any) => {
  alarmDetailDialogRef.value.openDialog(row);
};
const removeWaringOpen = (type = 'single', row?: any) => {
  if (type === 'single') {
    calcelAlarmIds.value = [row.id];
  } else {
    calcelAlarmIds.value = rowKeys.value;
  }
  cancelType.value = type;
  singleWarningId.value = row?.id;
  formData.cancelTime = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
  formData.cancelDes = '';
  dialogVisible.value = true;
};
const removeWaringOk = async () => {
  await formRef.value?.validate();
  dialogVisible.value = false;
  await api.getArtificialEndAlarm(calcelAlarmIds.value, 2, formData.cancelDes);
  HlMessage.success('消警成功');
  tableRef.value?.refresh();
};

onBeforeMount(() => {
  getTodayNum();
  getAlarmNum();
});
</script>

<style scoped lang="scss">
.realtime-alarm {
  width: 100%;
  height: 100%;
  .table-v2{
    height: calc(100% - 74px);
  }
}
</style>
