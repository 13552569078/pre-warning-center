<template>
  <hl-panel class="w-full m-t-xxl" style="--panel-header-height: 80px" header-class="gap-lg" borderless padding="var(--lg)" body-class="p-x-lg" body-style="padding-top: 0px; padding-bottom: 0px;" footer-class="gap-md p-xl">
    <template #header>
      <div class="panel-title">
        <hl-icon size="xs" class="static">
          <SystemSearch></SystemSearch>
        </hl-icon>
        <hl-group align="items-left items-top" gap="var(--xxs)"
          ><span class="title font-lg">查询结果</span><span class="link font-lg">{{ total }}</span>
          <div class="title font-lg">条数据</div>
        </hl-group>
      </div>
      <div class="panel-header-right">
        <hl-group align="items-right items-middle" gap="var(--lg)">
          <hl-button icon-position="left" effect="light" type="primary" rational v-if="dataType === 'table'" @click.stop="openCols"
            ><template #icon>
              <hl-icon>
                <TwoCircleCheck></TwoCircleCheck>
              </hl-icon> </template
            >选择列</hl-button
          >
          <hl-button icon-position="left" effect="light" type="primary" rational v-if="dataType === 'table'" @click.stop="downLoad"
            ><template #icon>
              <hl-icon>
                <TwoUpload></TwoUpload>
              </hl-icon> </template
            >导出</hl-button
          >
          <hl-group align="items-left items-top" gap="var(--xs)">
            <hl-button equal class="static" @click="changeDataType('table')" :type="dataType === 'table' ? 'primary' : null"
              ><template #icon>
                <hl-icon>
                  <FillTable></FillTable>
                </hl-icon> </template
            ></hl-button>
            <hl-button equal class="static" @click="changeDataType('echarts')" :type="dataType === 'echarts' ? 'primary' : null"
              ><template #icon>
                <hl-icon>
                  <FillChartBar></FillChartBar>
                </hl-icon> </template
            ></hl-button>
          </hl-group>
        </hl-group>
      </div>
    </template>
    <template #default>
      <div v-show="dataType === 'echarts'">
        <hl-group class="p-b-md solid border-regular w-full" align gap="var(--lg)" full v-show="tableData.length">
          <EventTypeCharts ref="EventTypeRef" :list="eventChartsList"></EventTypeCharts>
          <AreaCharts ref="areaRef" :list="areaChartsList"></AreaCharts>
        </hl-group>
        <hl-group class="p-b-md solid border-regular w-full" align gap="var(--lg)" full v-show="!tableData.length">
          <hb-empty style="height: calc(var(--lg) * 18)" description="暂无数据"></hb-empty>
          <hb-empty style="height: calc(var(--lg) * 18)" description="暂无数据"></hb-empty>
        </hl-group>
      </div>
      <hl-scrollbar class="w-full" style="height: calc(var(--lg) * 26)" v-show="dataType === 'table'">
        <hl-simple-table ref="tableRef" :cols="cols" :data="tableData" fixed-header>
          <template #tableIndex="{ rowIndex }">
            {{ rowIndex + 1 }}
          </template>
          <template #alarmTitle="{ row }">
            <hb-text-overflow style="display: inline-block; width: 12em" effect="light">
              <span class="text-primary cursor-pointer" @click="handleShowDetail(row)">{{ row.alarmTitle }}</span>
            </hb-text-overflow>
          </template>
          <template #alarmLevelName="{ row }">
            <hb-text-overflow style="display: inline-block; width: 12em" effect="light">
              {{ row.alarmLevelName || '--' }}
            </hb-text-overflow>
          </template>
          <template #alarmState="{ row }">
            <tag-warning v-if="row.alarmState == 0" />
            <tag-unwarned v-else />
          </template>
        </hl-simple-table>
      </hl-scrollbar>
      <!-- 分页 -->
      <hl-group full align="items-between" v-show="dataType === 'table'">
        <hl-pagination :total="total" class="m-t-lg m-b-lg" align="items-between" layout="sizes,total,slot,prev,pager,next,jumper" :current-page="pagination.currentPage" :page-size="pagination.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
          <div class="w-full"></div>
        </hl-pagination>
      </hl-group>
    </template>
  </hl-panel>
  <!-- 选择列 -->
  <ColsTransfer ref="transferRef" @handleUpdateCols="getSpecialCols" @close="colsVisible = false" v-if="colsVisible" />
  <!-- 预警详情 -->
  <alarm-detail-dialog ref="alarmDetailDialogRef" />
</template>
<script lang="ts" setup>
import { ref, nextTick, reactive } from 'vue';
import { ColsTransfer, EventTypeCharts, AreaCharts } from './components';
import { apiWarningWholeAnalysisObj } from '@/apis/modules/whole-analysis/warning-whole-analysis';
import { IgetFindAlarmLogPageSpace } from '@/apis/modules/whole-analysis/warning-whole-analysis/model';
import alarmDetailDialog from '@/views/monitoring-warning/warning-management/historical-warning/components/alarmDetailDialog.vue';
import { getColsList, getColsKeys, TABLE_COLS } from './components/utils';
import { pick } from 'lodash';

const props = defineProps({
  modelData: {
    type: Object
  }
});

const tableData = ref<IgetFindAlarmLogPageSpace.List[]>([]);
const total = ref(0);
const cols = ref(TABLE_COLS);
const pagination = reactive({
  pageSize: 10,
  currentPage: 1
});

const dataType = ref('table');
const transferRef = ref();
const colsVisible = ref(false);

const EventTypeRef = ref();
const areaRef = ref();
const eventChartsList = ref();
const areaChartsList = ref();

const alarmDetailDialogRef = ref();

const reolveParams = () => {
  return {
    ...pagination,
    ...pick(props.modelData, 'endTime', 'startTime'),
    areaCodeList: props.modelData!.areaCodeList.join(','),
    eventTypeCode: props.modelData!.eventTypeCode.join(',')
  };
};
const changeDataType = (type: string) => {
  dataType.value = type;
  type === 'echarts' && renderEcharts();
};
const getListData = async() => {
  // 查询
  const query = {
    ...props.modelData,
    ...pagination
  };
  const { data } = await apiWarningWholeAnalysisObj.getFindAlarmLogPage(query as Record<string, any>);
  tableData.value = data.list;
  total.value = data.totalRow || 0;
};
// 分页
const handleSizeChange = (val: number) => {
  pagination.pageSize = val;
  getListData();
};
const handleCurrentChange = (val: number) => {
  pagination.currentPage = val;
  getListData();
};
const downLoad = async() => {
  const params = reolveParams();
  await apiWarningWholeAnalysisObj.postExportList(params);
};
const handleShowDetail = (row: any) => {
  alarmDetailDialogRef.value.openDialog(row);
};
const openCols = async() => {
  colsVisible.value = true;
};
// 获取列表项
const getSpecialCols = async() => {
  const data = await getColsList();
  const keys = getColsKeys(data);
  cols.value = TABLE_COLS;
  cols.value = cols.value.filter(item => {
    return keys.includes(item.prop) || item.prop === 'tableIndex';
  });
};
const init = async() => {
  getListData();
  const {
    data: { eventTypeCodeVOs, areaCodeVOs }
  } = await apiWarningWholeAnalysisObj.getFindAlarmLogPageStatistic({
    ...props.modelData,
    ...pagination
  });
  eventChartsList.value = eventTypeCodeVOs;
  areaChartsList.value = areaCodeVOs;
  renderEcharts();
};
const renderEcharts = () => {
  nextTick(() => {
    EventTypeRef.value.renderChart(eventChartsList.value);
    areaRef.value.renderChart(areaChartsList.value);
  });
};

getSpecialCols();

defineExpose({
  init
});
</script>
