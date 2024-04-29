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
        body-style="padding-top: 0px; padding-bottom: 0px; overflow: auto;"
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
          <!-- <div class="panel-title">
            <h4 class="text-title w-full">接入数据列表</h4>
          </div> -->
          <panel-header title="接入数据列表"/>
          <div class="panel-header-right">
            <hl-group
              align="items-left items-middle"
              gap="var(--sm)"
            >
              <div class="text-regular">业务时间</div>
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
          class="m-b-lg"
          size="md"
          border="bordered"
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
        <div style="color:rgba(128, 128, 160, 0.65);">( 注：系统仅提供查询近7天接入数据的功能 )</div>
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
    <hl-group dir="vertical" class="w-full" style="max-height: calc(100vh - 229px); overflow: auto;">
      <hl-panel
        class="w-full content static"
        borderless
        style="--panel-header-height: 64px;"
        padding="var(--lg)"
        header-class="bg-content"
        body-style="padding: 0px 20px 0px; overflow: auto;"
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
          <h4 class="text-title w-full">接入数据项概览</h4>
        </div> -->
        <panel-header title="接入数据项概览"/>
      </template>
      <template #default>
        <common-detail
          :detail-opt='survey'
          :count="'xl:count-1 md:count-1'"
          only-info
        >
          <template #accessItemName>
            {{detailOpt.data.accessItemName}}
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
      body-style="padding: 0px 20px 0px; background: white;"
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
          <h4 class="text-title w-full">接入数据项详情</h4>
        </div> -->
        <panel-header title="接入数据项详情"/>
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
  IpostGetAccessItemDataHistorySpace,
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
const tableData = ref<IpostGetAccessItemDataHistorySpace.List[]>([]);
const cols = ref([
  { title: '', slotName: 'tableIndex', width: 'fit-content', },
  { title: '数据业务时间', prop: 'collectTime' },
  { title: '监测值', prop: 'dataValue' },
  { title: '数据入库时间', prop: 'createdAt' },
  // { title: '操作', slotName: 'handle', align: 'center', minWidth: '80px' },
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
  targetDataName: '',
  isMultiple: 0,
  dataType: '',
  dataTypeName: '',
  targetTypeId: 0,
  targetTypeName: '',
  dataValue: '',
  accessFrequency: 0,
  accessFrequencyUnit: '',
  accessFrequencyUnitName: '',
  collectTime: '',
});
const survey = reactive({
  cols: [
    {
      label: '数据项名称',
      key: 'accessItemName',
      slot: 'accessItemName',
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
      label: '数据周期类型',
      key: 'dataTypeName',
    },
    {
      label: '数据频率',
      key: 'accessFrequency',
    },
    {
      label: '数据标识',
      key: 'accessItemCode',
    },
    {
      label: '监测设备',
      key: 'equipName',
    },
    {
      label: '接入源名称',
      key: 'accessSourceName',
    },
    {
      label: '接入对象',
      key: 'accessSourceObjectName',
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
      label: '描述',
      key: 'accessItemDesc',
      span: 'col-span-3',
    },
    {
      label: '数据时间区间',
      key: 'timeScopes',
      span: 'col-span-2',
      slot: 'timeScopes',
    },
  ],
  data: {} as Indexable<any>,
});
const getData = async() => {
  const { data } = await api.postGetAccessItemDataHistory({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
    accessItemId: telId.value as string,
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
    ...data.accessItemDetail,
    dataTypeName: data.accessItemDetail.accessFrequency > 0 ? '周期计算' : '实时计算',
    accessFrequency:
      data.accessItemDetail.accessFrequency === 0
        ? '实时接入'
        : getSecondsToUnitTime(
          data.accessItemDetail,
          'accessFrequencyUnit',
          'accessFrequency'
        ) + data.accessItemDetail.accessFrequencyUnitName,
    // timeScopes: data.accessItemDetail.timeScopes && data.accessItemDetail.timeScopes.length ? data.accessItemDetail.timeScopes.map(item => { return (item.dateStart + ' ' + item.timeStart) + '~' + (item.dateEnd + ' ' + item.timeEnd); }).join('；') : ''
  };
  survey.data = data.stats;
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
