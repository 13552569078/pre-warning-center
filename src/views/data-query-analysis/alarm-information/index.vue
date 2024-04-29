<template>
  <fx-page-table-v2
    ref="tableRef"
    :cols="cols"
    :table-data="tableData"
    :data-fetcher="getData"
    :search-items="searchItems"
    selector-col-count="count-3"
    :searcher="{ show: false }"
    search-placement="top">
    <template #monitorRegionName>
      <hl-autocomplete
        v-model="monitorRegionName"
        class="inline-input"
        :fetch-suggestions="remoteMethod"
        :placeholder="`请输入${$t('region')}`"
        :trigger-on-focus="false"
        block
        clearable
        @change="getList"
        @select="getList"
      ></hl-autocomplete>
    </template>
    <template #monitorPointName>
      <hl-autocomplete
        v-model="monitorPointName"
        class="inline-input"
        :fetch-suggestions="remoteMethod2"
        placeholder="请输入监测点"
        :trigger-on-focus="false"
        block
        clearable
        @change="getList"
        @select="getList"
      ></hl-autocomplete>
    </template>
    <template #alarmState="{ row }">
      {{row.alarmState===0?'未结束':'已结束'}}
    </template>
    <template #actions="{ row }">
      <hl-button type="link" @click="showDetail(row)">详情</hl-button>
    </template>
  </fx-page-table-v2>
  <modalEvent
    v-if="eventInfoVisibel"
    v-model="eventInfoVisibel"
    :alarmDataId="alarmDataId"
    :startTime="startTime"
    :endTime="endTime"
    :activeName="activeName" />
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, provide, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { FxPageTable, DataFetcherParams } from 'fx-front-framework';
import { getEventTypeSearchItem } from '@/views/monitoring-config/event-type/utils';
import { HlMessage } from 'hongluan-ui';
import { useI18n } from 'vue-i18n';

// new api
import { apiSubjectObj } from '@/apis/modules/element-subject';
import { IgetRegionSimpleListSpace } from '@/apis/modules/element-subject/model';
import { apiSourceDataObj } from '@/apis/modules/access-data';
import {
  IgetFindAlarmDataPageSpace,
  IgetListMonitorPointsSpace,
} from '@/apis/modules/access-data/model';

import { apiDictObj as dictApi } from '@/apis/modules/dict-api';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import modalEvent from './components/modalEvent.vue';
dayjs.extend(duration);
// const defaultTime = defualtDateRangeValue;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const defualtDateRangeValue = [dayjs(dayjs().startOf('day')).format(dateFormat), dayjs(dayjs().endOf('day')).format(dateFormat)];

const { t } = useI18n();
const today = dayjs(new Date()).format('YYYY-MM-DD');

const eventInfoVisibel = ref(false);
// 1542042297040728065
const alarmDataId = ref('');
const startTime = ref('');
const endTime = ref('');
const activeName = ref('detail');
const showDetail = (row: any) => {
  console.log(row);
  // TODO 暂时写死联调接口
  alarmDataId.value = row.alarmDataId;
  startTime.value = row.alarmTime;
  endTime.value = row.alarmEndTime;
  eventInfoVisibel.value = true;
};

const props = defineProps({
  systemName: {
    type: String,
    default: '报警'
  }
});
provide('systemName', props.systemName);

const router = useRouter();
const systemName = ref(props.systemName);

const tableData = ref<IgetFindAlarmDataPageSpace.List[]>([]);
const tableRef = ref<InstanceType<typeof FxPageTable>>();
const cols = ref([
  {
    title: '序号',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex'
  },
  { title: `${t('region')}`, prop: 'monitorRegionName' },
  { title: '监测点', prop: 'monitorPointName' },
  { title: `${systemName.value === '报警' ? `${t('warningType')}` : '预警类型'}`, prop: 'eventTypeName' },
  { title: `${systemName.value}等级`, prop: 'alarmLevelName' },
  { title: `${systemName.value}标题`, prop: 'alarmTitle' },
  { title: `${systemName.value}开始时间`, prop: 'alarmTime' },
  { title: `${systemName.value}状态`, prop: 'alarmState', slotName: 'alarmState' },
  { title: '消警时间', prop: 'alarmEndTime' },
  { title: '操作', slotName: 'actions', align: 'center', fixed: 'right' }
]);

// 监测主体
const monitorRegionName = ref('');
// 监测点
const monitorPointName = ref('');
const searchItems = reactive([
  {
    span: 'grid-col-span-xl-1',
    type: 'slot',
    label: `${t('region')}`,
    value: '',
    name: 'monitorRegionName',
    slotName: 'monitorRegionName',
    fill: true
  },
  {
    span: 'grid-col-span-xl-1',
    type: 'slot',
    label: '监测点名称',
    value: '',
    name: 'monitorPointName',
    slotName: 'monitorPointName',
    fill: true
  }
]);

// 监测主体远程模糊
const remoteMethod = async(queryString: string, cb: (arg0: IgetRegionSimpleListSpace.Data[]) => void) => {
  const results = await apiSubjectObj.getRegionSimpleList(queryString);
  // 调用 callback 返回建议列表的数据
  cb(results.data.map(item => { item.value = item.regionName; return item; }));
};
// 触发搜索
const getList = () => {
  // tableRef.value?.searchSlotChanged({});
  nextTick(() => {
    tableRef.value?.refresh();
  });
};

// 监测点远程模糊
const remoteMethod2 = async(queryString: string, cb: (arg0: IgetListMonitorPointsSpace.Data[]) => void) => {
  const results = await apiSourceDataObj.getListMonitorUnitList(queryString);
  // 调用 callback 返回建议列表的数据
  cb(results.data.map(item => { item.value = item.name; return item; }));
};
const isRangeIn7Days = (dateRangeStart: string, dateRangeEnd: string) => {
  if (!dateRangeStart) return true;
  const rangeLimit = 7;
  const x = dayjs(dateRangeStart);
  const y = dayjs(dateRangeEnd);
  const diffDays = dayjs.duration(y.diff(x)).as('days');
  return diffDays < rangeLimit;
};
const getData = async({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
  // TODO 后端现在造的假数据
  //  http://10.32.73.45:18103/accessData/findAlarmDataPage?useFor=1&monitorRegionName=1&monitorPointName=2&eventTypeCode=AABBXQ&alarmLevelCode=ALARM_LEVEL_CODE_1
  // console.log(176, JSON.stringify(params));
  // 处理首次请求日期参数

  if (params.timeStart) {
    const isRangeOk = isRangeIn7Days(params.timeStart, params.timeEnd);
    if (!isRangeOk) {
      HlMessage.error({
        message: '仅支持查询7天内的数据',
      });
      return;
    }
  }
  const query = {
    'currentPage': currentPage,
    'pageSize': pageSize,
    'useFor': systemName.value === '报警' ? 1 : 2,
    'monitorRegionName': monitorRegionName.value,
    'monitorPointName': monitorPointName.value,
    'eventTypeCodeList': params.eventTypeCodeList,
    'alarmLevelCodeList': params.alarmLevelCodeList,
    'startTime': params.timeStart,
    'endTime': params.timeEnd
  };
  const result = await apiSourceDataObj.getFindAlarmDataPage(query);
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};

// 查询事件；查询等级；
const getSearchItems = async() => {
  // 两个下拉框字典值
  const item = await getEventTypeSearchItem('eventTypeCodeList', true);
  searchItems.push(item);
  const result = await dictApi.list(systemName.value === '报警' ? 'ALARM_LEVEL_CODE' : 'WARNING_LEVEL_CODE');
  const item2 = {
    type: 'select',
    label: `${systemName.value}等级`,
    placeholder: `请选择${systemName.value}等级`,
    value: '',
    filterable: true,
    name: 'alarmLevelCodeList',
    prop: {
      label: 'dictName',
      value: 'dictCode',
    },
    options: [
      ...result.data,
    ],
    multiple: true,
    'collapse-tags': true,
    'collapse-tags-tooltip': true
  };
  searchItems.push(item2);
  // 查找开始时间
  const { data } = await apiSourceDataObj.getFindStartTime(props.systemName === '报警' ? 3 : 4, '');
  const items = {
    span: 'col-span-2',
    type: 'datetimerange',
    name: 'time',
    value: '',
    'is-range': true,
    'range-separator': '至',
    'start-placeholder': '开始时间',
    'end-placeholder': '结束时间',
    'placeholder': '选择时间范围',
    format: 'YYYY-MM-DD HH:mm:ss',
    'value-format': 'YYYY-MM-DD HH:mm:ss',
    'disabled-date': (time: { getTime: () => number; }) => {
      if (data && data.startTime) {
        return (time.getTime() < new Date(data.startTime.substring(0, 10) + ' 00:00:00').getTime()) || (time.getTime() > Date.now());
      } else {
        return time.getTime() > Date.now();
      }
    }
  };
  searchItems.push(items);
  setTimeout(() => {
    getList();
  }, 0);
};

onMounted(() => {
  getSearchItems();
});
</script>
