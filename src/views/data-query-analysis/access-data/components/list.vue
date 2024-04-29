<template>
  <fx-page-table-v2
    v-if="tableShow"
    ref="tableRef"
    :cols="cols"
    :table-data="tableData"
    :data-fetcher="getData"
    :search-items="searchItems"
    selector-col-count="count-2"
    search-placement="top"
    :searcher="{ show: false }">
  </fx-page-table-v2>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, nextTick } from 'vue';
import { HlMessage } from 'hongluan-ui';
import { DataFetcherParams } from 'fx-front-framework';
import { dayjs } from 'hongluan-ui';
import duration from 'dayjs/plugin/duration';
import { Indexable } from 'fx-front-utils';
import { apiSourceDataObj as api } from '@/apis/modules/access-data';
import { IgetFindAccessDatePageSpace } from '@/apis/modules/access-data/model';
import { useAccessData } from '@/hooks';

dayjs.extend(duration);

const props = defineProps({
  monitorPointId: {
    type: String
  },
  eventNode: {
    type: Object
  },
  uniqueId: {
    type: String
  }
});

const { dataAvailableTime, getDataAvailableTime } = useAccessData();

watch(
  () => props.uniqueId,
  newId => {
    tableRef.value?.reset();
    getDataAvailableTime('1', props.monitorPointId as string);
    tableRef.value?.refresh();
  }
);

const once = watch(
  () => props.monitorPointId, val => {
    if (val) {
      tableShow.value = true;
      once();
    }
  }
);

const tableData = ref<IgetFindAccessDatePageSpace.List[]>([]);
const tableRef = ref();
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const sh = null;

const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex'
  },
  { title: '数据ID', prop: 'dataId', minWidth: '25em' },
  { title: '标识码', prop: 'accessDataCode' },
  { title: '数据值', prop: 'dataValue' },
  { title: '采集时间', prop: 'collectTime', minWidth: '14em' },
  { title: '接入时间', prop: 'accessTime', minWidth: '14em' },
]);

const tableShow = ref(false);
const defualtDateRangeValue = [dayjs().startOf('day'), dayjs().endOf('day')];
const defaultTime = defualtDateRangeValue;

const searchItems = reactive([
  {
    span: 'col-span-2',
    type: 'datetimerange',
    name: 'dateRange',
    label: '接入时间',
    value: '',
    'is-range': true,
    'range-separator': '至',
    'start-placeholder': '开始时间',
    'end-placeholder': '结束时间',
    'placeholder': '选择时间范围',
    format: dateFormat,
    'value-format': dateFormat,
    'default-time': defaultTime,
    clearable: false,
    editable: false
  },
]);

const tableReload = () => {
  console.log('reload');
  tableShow.value = false;
  nextTick(() => {
    tableShow.value = true;
  });
};

const isRangeIn7Days = (dateRangeStart: string, dateRangeEnd: string) => {
  const rangeLimit = 7;
  const x = dayjs(dateRangeStart);
  const y = dayjs(dateRangeEnd);
  const diffDays = dayjs.duration(y.diff(x)).as('days');
  return diffDays < rangeLimit;
};

const isRangeAvailable = (dateRangeStart: string) => {
  if (!dataAvailableTime.value) return true;
  return new Date(dataAvailableTime.value).getTime() <= new Date(dateRangeStart).getTime();
};

const getData = async({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
  if (params.dateRangeStart) {
    const isRangeOk = isRangeIn7Days(params.dateRangeStart, params.dateRangeEnd);
    if (!isRangeOk) {
      HlMessage.error({
        message: '仅支持查询7天内的数据',
      });
      return;
    }
    if (!isRangeAvailable(params.dateRangeStart)) {
      HlMessage.error({
        message: `请选择 ${dataAvailableTime.value} 以后的日期查询`,
      });
      return;
    }
  }
  const total = await fetchData({ pageSize, currentPage, params, setTotal });
  setTotal(total);
};
const fetchData = async({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
  const searchParams = {
    pageSize,
    currentPage,
    startTime: params.dateRangeStart,
    endTime: params.dateRangeEnd,
    monitorPointId: props.monitorPointId,
    eventTypeCode: props.eventNode!.code
  };
  const { data } = await api.getFindAccessDatePage(searchParams);
  tableData.value = data.list;
  return data.totalRow;
};

</script>
