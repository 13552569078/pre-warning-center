<template>
  <hl-panel class="table-panel w-full">
    <template #header>
      <div class="panel-title"><h4>监测数据</h4></div>
      <div class="panel-header-right">
      </div>
    </template>

    <fx-page-table-v2
      v-if="tableShow"
      ref="tableRef"
      :cols="cols"
      :search-items="searchItems"
      :table-data="tableData"
      :data-fetcher="getData"
      selector-col-count="count-2"
      search-placement="top"
      :searcher="{ show: false }">
        <template v-for="item in cols[4].children||[cols[4]]" #[item.slotName]="{ row }" :key="item.slotName">
          <span v-if="row[item.slotName]==='--'">--</span>
          <span v-else class="text-primary cursor-pointer" @click="openDetail(row, item.slotName)">{{row[item.slotName]}}</span>
        </template>
    </fx-page-table-v2>
  </hl-panel>
  <hl-dialog
    v-model="dialogVisible"
    width="calc(var(--xxs) * 200)"
    top="30%"
    :close-on-click-modal="false"
  >
    <template #header>
      <h4>因子数据详情</h4>
    </template>
    <span >
      <div class="m-b-md">计算公式：
        <hl-tag v-if="formulaCodeName" type="primary">{{ formulaCodeName }}</hl-tag>
        <span v-else>无</span>
      </div>
      <hl-simple-table
        :cols="cols2"
        :data="tableData2"

      >
      </hl-simple-table>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="dialogVisible = false">关 闭</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, watch, nextTick } from 'vue';
import { DataFetcherParams } from 'fx-front-framework';
import { apiSourceDataObj } from '@/apis/modules/access-data';
import { useAccessData } from '@/hooks';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { HlMessage } from 'hongluan-ui';

dayjs.extend(duration);

const today = dayjs(new Date()).format('YYYY-MM-DD');

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

const { getDataAvailableTime } = useAccessData();
let dataAvailableTime = '';
watch(
  () => props.uniqueId,
  async() => {
    // console.log(newId, oldId);
    dataAvailableTime = await getDataAvailableTime('2', props.monitorPointId as string);
    // 再处理一下 时间条件
    searchItems.value = [];
    searchItems.value.push({ ...timeItems });
    setTimeout(() => { tableRef.value?.reset(); }, 200);
    tableReload();
  }
);

const tableData = ref([]);
const tableRef = ref();

const cols = ref([
  {
    title: '序号',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex',
  },
  { title: '监测点名称', prop: 'monitorPointName' },
  { title: '监测时间', prop: 'monitorTime' },
  { title: '处理时间', prop: 'handleTime' },

  // TODO 动态多级表头
  {
    title: '监测因子值',
    prop: 'factor',
    align: 'center',
    children: [],
  },
]);

const getData = ({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
  if (params.dateRangeStart) {
    const isRangeOk = isRangeIn7Days(params.dateRangeStart, params.dateRangeEnd);
    if (!isRangeOk) {
      HlMessage.error({
        message: '仅支持查询7天内的数据',
      });
      return;
    }
    // console.log(125, dataAvailableTime, params.dateRangeStart);
    if (!isRangeAvailable(params.dateRangeStart)) {
      HlMessage.error({
        message: `请选择 ${dataAvailableTime.substring(0, 10) + ' 00:00:00'} 以后的日期查询`,
      });
      return;
    }
  }
  fetchData({ pageSize, currentPage, params, setTotal });
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
  const { data } = await apiSourceDataObj.getFindMonitorDataPage(searchParams);

  // 处理表头和数据
  if (data.list.length > 0) {
    data.list.forEach(item => {
      item.monitorDataList.forEach(item2 => {
        item[item2.code] = item2.value === '' ? '--' : item2.value;
      });
    });
    tableData.value = data.list;
    await nextTick();
    cols.value[4].children = [];
    data.list[0].columnHeaderList.forEach(item2 => {
      cols.value[4].children?.push({
        title: item2.codeName, prop: item2.code, align: 'center', slotName: item2.code
      });
    });

    // 判断是否就一个子节点
    if (cols.value[4].children.length === 1) {
      cols.value[4] = cols.value[4].children[0];
    } else {
      cols.value[4].title = '监测因子值';
    }
    setTotal(data.totalRow);
  } else {
    cols.value[4].children = [];
    tableData.value = [];
    setTotal(0);
  }
};

const dialogVisible = ref(false);
const cols2 = ref([
  { title: '监测时间', prop: 'monitorTime' },
  { title: '监测点', prop: 'monitorPointName' },
  { title: '监测点编码', prop: 'monitorPointCode' },
  { title: '数值', prop: 'dataValue' }
]);
const tableData2 = ref([]);
const formulaCodeName = ref('');
const currentMonitorRow = ref();
const getMonitorDataDetail = async() => {
  const result = await apiSourceDataObj.getFindMonitorDataDetail(
    props.monitorPointId, currentMonitorRow.value.dataId, currentMonitorRow.value.code
  );
  tableData2.value = result.data;
};
const openDetail = (row: any, code: string) => {
  console.log(178, row, code);
  row.monitorDataList.forEach((item: { code: string; formulaCodeName: string; }) => {
    if (item.code === code) {
      formulaCodeName.value = item.formulaCodeName;
      currentMonitorRow.value = item;
    }
  });
  getMonitorDataDetail();
  dialogVisible.value = true;
};

const tableShow = ref(true);
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const defualtDateRangeValue = [dayjs(dayjs().startOf('day')).format(dateFormat), dayjs(dayjs().endOf('day')).format(dateFormat)];
const defaultTime = defualtDateRangeValue;
const timeItems =
  {
    span: 'col-span-2',
    type: 'datetimerange',
    name: 'dateRange',
    label: '监测时间',
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
    editable: false,
    'disabled-date': (time: { getTime: () => number; }) => {
      if (dataAvailableTime) {
        return (time.getTime() < new Date(dataAvailableTime.substring(0, 10) + ' 00:00:00').getTime()) || (time.getTime() > Date.now());
      } else {
        return time.getTime() > Date.now();
      }
    }
  };
const searchItems = ref([]);
const tableReload = () => {
  tableShow.value = false;
  nextTick(() => {
    tableShow.value = true;
  });
};
const isRangeIn7Days = (dateRangeStart: string, dateRangeEnd: string) => {
  if (!dateRangeStart) return true;
  const rangeLimit = 7;
  const x = dayjs(dateRangeStart);
  const y = dayjs(dateRangeEnd);
  const diffDays = dayjs.duration(y.diff(x)).as('days');
  return diffDays < rangeLimit;
};

const isRangeAvailable = (dateRangeStart: string) => {
  if (!dataAvailableTime || !dateRangeStart) return true;
  return new Date(dataAvailableTime.substring(0, 10) + ' 00:00:00').getTime() <= new Date(dateRangeStart).getTime();
};
</script>
