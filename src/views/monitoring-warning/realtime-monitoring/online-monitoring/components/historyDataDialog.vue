<template>
  <div class="history-data">
    <hl-dialog
      show-close
      v-model="dialogVisible"
      title="指标历史数据"
      width="calc(var(--md) * 52)"
      header-class="border-transparent"
      body-class="display-flex items-left items-top flex-col gap-lg bg-light"
    >
      <hl-panel class="w-full content" borderless style="--panel-header-height: 64px;"
                padding="var(--lg)" header-class="bg-content"
                body-style="padding-top: 0px; padding-bottom: 40px; padding-right: 40px; padding-left: 40px;"
                body-class="content">
        <template #header>
          <div class="panel-header-left">
            <hl-icon class="static" type="primary" size="md">
              <FillOrnamentTitle4></FillOrnamentTitle4>
            </hl-icon>
          </div>
          <div class="panel-title">
            <h4 class="text-title w-full">指标数据项详情</h4>
          </div>
          <div class="panel-header-right"></div>
        </template>
        <template #default>
          <common-detail :detail-opt='detailOpt' count="count-3" only-info>
            <template #timeScopes>
              <template v-if="detailOpt.data.timeScopes && detailOpt.data.timeScopes.length">
                <div v-for="scope in detailOpt.data.timeScopes" :key="scope.accessItemId">{{
                  `${scope.dateStart} 至 ${scope.dateEnd } ${scope.timeStart} 至 ${scope.timeEnd}`
                  }}</div>
              </template>
              <template v-else>--</template>
            </template>
          </common-detail>
        </template>
      </hl-panel>
      <hl-group align="items-top" class="w-full" dir="vertical" full>
        <hl-panel class="w-full border-top solid border-regular content" borderless
                  style="--panel-header-height: 64px;" padding="var(--lg)" header-class="bg-content"
                  body-class="p-x-lg" body-style="padding-top: 0px; padding-bottom: 0px;"
                  footer-class="gap-md">
          <template #header>
            <div class="panel-header-left">
              <hl-icon class="static" type="primary" size="md">
                <FillOrnamentTitle4></FillOrnamentTitle4>
              </hl-icon>
            </div>
            <div class="panel-title">
              <h4 class="text-title w-full">指标历史数据</h4>
            </div>
            <div class="panel-header-right">
              <hl-group align="items-left items-middle" gap="var(--sm)">
                <div class="text-regular">监测时间</div>
                <hl-date-picker v-model="monitorTime" type="datetimerange" class="static" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                                placeholder="选择时间"
                                start-placeholder="开始时间" range-separator="至"
                                end-placeholder="结束时间" @change="getData"></hl-date-picker>
              </hl-group>
            </div>
          </template>
          <hl-simple-table
            :cols="cols"
            :data="tableData"
            :border="'bordered'"
            fixed-header
            class="m-b-lg"
            size="md"
          >
            <template #tableIndex="{ rowIndex }">
              <span>{{ rowIndex + 1 }}</span>
            </template>
            <template #handle="{ row }">
              <hl-button type="link" @click="source(row)">数据溯源</hl-button>
            </template>
          </hl-simple-table>
          <template #footer>
            <hl-pagination :total="pagination.total" block align="items-left items-middle" @current-change="handleCurrentChange"
                           layout="sizes,total,slot,prev,pager,next,jumper">
            </hl-pagination>
          </template>
        </hl-panel>
      </hl-group>
      <data-source-dialog ref="dataSourceDialogRef" :is-multiple="targetData.isMultiple"/>
    </hl-dialog>
  </div>
</template>
<script lang="ts" setup name="historyDataDialog">
import { ref, reactive } from 'vue';
import dataSourceDialog from './dataSourceDialog.vue';
import { apiRealTimeMonitorObj as api } from '@/apis/modules/realtime-monitor';
import { IpostGetTargetDataRealTimePageSpace, IpostHistorySpace } from '@/apis/modules/realtime-monitor/model';
import { Indexable } from 'fx-front-utils';

import { getSecondsToUnitTime } from '@/common/time';

const dataSourceDialogRef = ref();

const source = (row: any) => {
  console.log(row);
  dataSourceDialogRef.value.openDialog(row);
};
const tableData = ref<IpostHistorySpace.List[]>([]);
const cols = ref([
  { title: '', slotName: 'tableIndex', width: 'fit-content', },
  { title: '指标值', prop: 'dataValue' },
  { title: '指标时间', prop: 'collectTime' },
  { title: '操作', slotName: 'handle', align: 'center', minWidth: '80px' },
]);
const dialogVisible = ref(false);

const monitorTime = ref([]);
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
});
const handleCurrentChange = (val: number) => {
  console.log(`当前页: ${val}`);
  pagination.currentPage = val;
  getData();
};

const targetData = ref<IpostGetTargetDataRealTimePageSpace.List>({
  dataResultId: 0,
  accessItemId: 0,
  targetDataId: '',
  targetDataName: '',
  isMultiple: 0,
  dataType: '',
  dataTypeName: '',
  targetTypeId: 0,
  targetTypeName: '',
  dataValue: '',
  targetFrequency: 0,
  targetFrequencyUnit: '',
  targetFrequencyUnitName: '',
  collectTime: ''
});
const detailOpt = reactive(
  {
    cols: [
      {
        label: '数据项名称',
        key: 'targetDataName',
      },
      {
        label: '指标',
        key: 'targetName',
      },
      {
        label: '数据类型',
        key: 'dataTypeName',
      },
      {
        label: '计算周期类型',
        key: 'computePeriodTypeName',
      },
      {
        label: '计算公式',
        key: 'formulaName',
      },
      {
        label: '数据频率',
        key: 'targetFrequency',
      },
      {
        label: '更新时间',
        key: 'updatedAt',
      },
      {
        label: '数据时间区间',
        key: 'timeScopes',
        span: 'col-span-2',
        slot: 'timeScopes'
      },
      {
        label: '描述',
        key: 'alarmDesc',
        span: 'col-span-3'
      }
    ],
    data: {} as Indexable<any>,
  }
);
const getData = async() => {
  const { data } = await api.postHistory({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
    targetDataId: targetData.value.targetDataId,
    timeTo: monitorTime.value && monitorTime.value.length ? monitorTime.value[1] : undefined,
    timeFrom: monitorTime.value && monitorTime.value.length ? monitorTime.value[0] : undefined,

  });
  detailOpt.data = {
    ...data.targetDataDetail,
    targetFrequency: data.targetDataDetail.targetFrequency === 0 ? '实时接入' : getSecondsToUnitTime(data.targetDataDetail, 'targetFrequencyUnit', 'targetFrequency') + data.targetDataDetail.targetFrequencyUnitName,
    // timeScopes: data.targetDataDetail.timeScopes && data.targetDataDetail.timeScopes.length ? data.targetDataDetail.timeScopes.map(item => { return (item.dateStart + ' ' + item.timeStart) + '~' + (item.dateEnd + ' ' + item.timeEnd); }).join('；') : ''
  };
  tableData.value = data.historyPage.list;
  pagination.total = data.historyPage.totalRow;
};
const openDialog = async(row: IpostGetTargetDataRealTimePageSpace.List) => {
  targetData.value = row;
  await getData();
  dialogVisible.value = true;
};

defineExpose({ openDialog });
</script>

<style scoped lang="scss">
  .history-data {
    width: 100%;
  }
</style>
