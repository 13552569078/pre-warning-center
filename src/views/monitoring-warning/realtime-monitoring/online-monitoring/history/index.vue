<template>
  <hl-group class="w-full h-full"  align gap="var(--lg)" style="--panel-header-height: 64px;max-height: calc(100vh - 208px);">
    <hl-group
      align="items-top"
      class="w-full"
      dir="vertical"
      full
      style="--panel-header-height: 64px;max-height: calc(100vh - 229px);"
    >
      <hl-panel
        class="w-full h-full border-top solid border-regular content"
        borderless
        style="--panel-header-height: 64px;"
        padding="var(--lg)"
        header-class="bg-content"
        body-class="p-x-lg h-full"
        body-style="padding-top: 0px; padding-bottom: 0px;  overflow: auto;"
        footer-class="gap-md"
      >
        <template #header>
          <div class="panel-header-left">
            <!-- <hl-icon
              class="static"
              type="primary"
              size="md"
            >
              <FillOrnamentTitle4></FillOrnamentTitle4>
            </hl-icon> -->
          </div>
          <panel-header title="指标历史数据"/>
          <!-- <div class="panel-title">
            <h4 class="text-title w-full">指标历史数据</h4>
          </div> -->
          <div class="panel-header-right">
            <hl-group
              align="items-left items-middle"
              gap="var(--sm)"
            >
              <div class="text-regular">监测时间</div>
              <hl-date-picker
                v-model="monitorTime"
                type="datetimerange"
                class="static"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择时间"
                start-placeholder="开始时间"
                range-separator="至"
                end-placeholder="结束时间"
                @change="getData"
              ></hl-date-picker>
            </hl-group>
          </div>
        </template>
        <hl-simple-table
          :cols="cols"
          :data="tableData"
          border="bordered"
          class="m-b-lg"
          size="md"
        >
          <template #tableIndex="{ rowIndex }">
            <span>{{ rowIndex + 1 }}</span>
          </template>
          <template #handle="{ row }">
            <hl-button
              type="link"
              @click="source(row)"
            >数据溯源</hl-button>
          </template>
        </hl-simple-table>
        <div style="color:rgba(128, 128, 160, 0.65);">( 注：系统仅提供查询近30天指标数据的功能 )</div>
        <template #footer>
          <hl-pagination
            :total="pagination.total"
            block
            align="items-left items-middle"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="sizes,total,slot,prev,pager,next,jumper"
          >
          </hl-pagination>
        </template>
      </hl-panel>
    </hl-group>
    <hl-group  dir="vertical" class="w-full h-full" style="max-height: calc(100vh - 229px); overflow: auto; background: white;">
      <hl-panel
        class="w-full content"
        borderless
        style="--panel-header-height: 64px;"
        padding="var(--lg)"
        header-class="bg-content"
        body-style="padding-top: 0px; padding-bottom: 0px; padding-right: 20px; padding-left: 20px; overflow: auto;"
        body-class="content"
      >
      <template #header>
        <div class="panel-header-left">
          <!-- <hl-icon
            class="static"
            type="primary"
            size="md"
          >
            <FillOrnamentTitle4></FillOrnamentTitle4>
          </hl-icon> -->
        </div>
        <!-- <div class="panel-title">
          <h4 class="text-title w-full">指标数据概览</h4>
        </div> -->
        <panel-header title="指标数据概览"/>
      </template>
      <template #default>
        <common-detail
          :detail-opt='survey'
          :count="'xl:count-1 md:count-1'"
          only-info
        >
          <template #targetDataName>
             {{detailOpt.data.targetDataName}}
          </template>
          <template #countData={detail}>
            <div v-if="detail.dataNum && detail.dataNum>0">
              共接入{{detail.dataNum}}条 从{{detail.dateTimeStart}}开始，截止到{{detail.dateTimeEnd}}
            </div>
            <div v-else>0条</div>
          </template>
        </common-detail>
      </template>
    </hl-panel>
      <hl-panel
        class="w-full h-full content"
        borderless
        style="--panel-header-height: 64px;"
        padding="var(--lg)"
        header-class="bg-content"
        body-style="padding-top: 0px; padding-bottom: 0px; padding-right: 20px; padding-left: 20px;"
        body-class="content"
      >
      <template #header>
        <div class="panel-header-left">
          <!-- <hl-icon
            class="static"
            type="primary"
            size="md"
          >
            <FillOrnamentTitle4></FillOrnamentTitle4>
          </hl-icon> -->
        </div>
        <!-- <div class="panel-title">
          <h4 class="text-title w-full">指标数据项详情</h4>
        </div> -->
        <panel-header title="指标数据项详情"/>
        <div class="panel-header-right"></div>
      </template>
      <template #default>
        <common-detail
          :detail-opt='detailOpt'
          :count="'xl:count-2 md:count-1'"
          only-info
        >
          <template #timeScopes>
            <template v-if="detailOpt.data.timeScopes && detailOpt.data.timeScopes.length">
              <div
                v-for="scope in detailOpt.data.timeScopes"
                :key="scope.accessItemId"
              >{{
                  `${scope.dateStart} 至 ${scope.dateEnd } ${scope.timeStart} 至 ${scope.timeEnd}`
                  }}</div>
            </template>
            <template v-else>--</template>
          </template>
          <template #isMultiple>
             {{detailOpt.data.isMultiple === 0 ? '基础指标': '复合指标'}}
          </template>
          <template #accData>
            <p v-if="detailOpt.data.isMultiple === 0">
              {{detailOpt.data.referAccessItem.accessItemName}}
            </p>
            <div v-else>
              <p v-for="item in detailOpt.data.referTargetData" :key="item.targetDataId">
                {{item.targetDataName}}
              </p>
            </div>
          </template>
        </common-detail>
      </template>
    </hl-panel>

    </hl-group>

  </hl-group>
    <data-source-dialog
      ref="dataSourceDialogRef"
      :is-multiple="detailOpt.data.isMultiple"
    />

  <hl-affix position="bottom" :offset="0">
    <hl-group align="items-middle" class="affix-bottom w-full box-shadow-lg p-lg">
      <hl-button @click="$router.go(-1)">返回</hl-button>
    </hl-group>
  </hl-affix>
</template>
<script lang="ts" setup name="historyDataDialog">
import { ref, reactive, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import dataSourceDialog from '../components/dataSourceDialog.vue';
import { apiRealTimeMonitorObj as api } from '@/apis/modules/realtime-monitor';
import {
  IpostGetTargetDataRealTimePageSpace,
  IpostHistorySpace,
} from '@/apis/modules/realtime-monitor/model';
import { Indexable } from 'fx-front-utils';

import { getSecondsToUnitTime } from '@/common/time';

const route = useRoute();

const telId = computed(() => route.query.id);

const dataSourceDialogRef = ref();

const source = (row: any) => {
  console.log(row);
  dataSourceDialogRef.value.openDialog(row);
};
const tableData = ref<IpostHistorySpace.List[]>([]);
const cols = ref([
  { title: '', slotName: 'tableIndex', width: 'fit-content', },
  { title: '数据业务时间', prop: 'collectTime' },
  { title: '监测值', prop: 'dataValue' },
  { title: '数据入库时间', prop: 'createdAt' },
  { title: '操作', slotName: 'handle', align: 'center', minWidth: '80px' },
]);
const dialogVisible = ref(false);

const monitorTime = ref([]);
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});
const handleCurrentChange = (val: number) => {
  console.log(`当前页: ${val}`);
  pagination.currentPage = val;
  getData();
};
const handleSizeChange = (val:number) => {
  pagination.pageSize = val;
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
  collectTime: '',
});
const survey = reactive({
  cols: [
    {
      label: '数据项名称',
      key: 'targetDataName',
      slot: 'targetDataName',
    },
    {
      label: '接入统计',
      key: 'countData',
      slot: 'countData',
    }
  ],
  data: {} as Indexable<any>,
});
const detailOpt = reactive({
  cols: [
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
      label: '指标分类',
      key: 'isMultiple',
      slot: 'isMultiple',
    },
    {
      label: '数据频率',
      key: 'targetFrequency',
    },
    {
      label: '计量单位',
      key: 'measureUnitName',
    },
    {
      label: '启用时间',
      key: 'initCollectTime',
    },
    {
      label: '启用状态',
      key: 'useStateName',
    },
    {
      label: '创建时间',
      key: 'createdAt',
    },
    {
      label: '更新时间',
      key: 'updatedAt',
    },
    {
      label: '数据时间区间',
      key: 'timeScopes',
      span: 'col-span-2',
      slot: 'timeScopes',
    },
    {
      label: '描述',
      key: 'alarmDesc',
      span: 'col-span-3',
    }
  ],
  data: {} as Indexable<any>,
});
const getData = async() => {
  const { data } = await api.postHistory({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
    targetDataId: telId.value as string,
    timeTo:
      monitorTime.value && monitorTime.value.length
        ? monitorTime.value[1]
        : undefined,
    timeFrom:
      monitorTime.value && monitorTime.value.length
        ? monitorTime.value[0]
        : undefined,
  });
  detailOpt.data = {
    ...data.targetDataDetail,
    targetFrequency:
      data.targetDataDetail.targetFrequency === 0
        ? '实时接入'
        : getSecondsToUnitTime(
          data.targetDataDetail,
          'targetFrequencyUnit',
          'targetFrequency'
        ) + data.targetDataDetail.targetFrequencyUnitName,
    // timeScopes: data.targetDataDetail.timeScopes && data.targetDataDetail.timeScopes.length ? data.targetDataDetail.timeScopes.map(item => { return (item.dateStart + ' ' + item.timeStart) + '~' + (item.dateEnd + ' ' + item.timeEnd); }).join('；') : ''
  };
  survey.data = data.stats;
  if (detailOpt.data?.isMultiple === 0) {
    detailOpt.cols.push(
      {
        label: '关联接入数据项',
        key: 'accData',
        span: 'col-span-3',
        slot: 'accData',
      }
    );
  } else {
    detailOpt.cols.push(
      {
        label: '引用指标数据项',
        key: 'accData',
        span: 'col-span-3',
        slot: 'accData',
      }
    );
  }

  tableData.value = data.historyPage.list;
  pagination.total = data.historyPage.totalRow;
};
const openDialog = async(row: IpostGetTargetDataRealTimePageSpace.List) => {
  targetData.value = row;
  await getData();
  dialogVisible.value = true;
};

defineExpose({ openDialog });

onMounted(async() => {
  await getData();
});
</script>

<style scoped lang="scss">
</style>
