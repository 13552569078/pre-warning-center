<template>
  <div class="data-source">
    <hl-dialog
      show-close
      append-to-body
      v-model="dialogVisible"
      title="数据溯源"
      width="calc(var(--xs) * 140)"
      header-class="border-transparent"
      body-class="display-flex items-left items-top flex-col gap-lg bg-light"
    >
      <hl-row gap="calc(var(--md) + var(--xxs))" style="width: 100%">
        <hl-col span="col-11">
          <hl-group align="items-top" class="static" dir="vertical" gap="var(--lg)" full>
            <hl-panel class="w-full border solid border-transparent box-shadow-md cursor-pointer"
                      padding="var(--xl)"
                      header-class="border-transparent"
                      body-class="display-flex items-left items-middle flex-row gap-md p-b-xl p-x-xl"
                      body-style="padding-top: 0px;"
                      v-if="!isMultiple">
              <template #header>
                <div class="panel-header-left">
                  <hl-icon size="lg" class="static" type="primary">
                    <FillBox></FillBox>
                  </hl-icon>
                </div>
                <div class="panel-title">
                  <h5 class="text-title w-full">{{simpleAccessItemDetail.accessSourceObjectName}}-{{simpleAccessItemDetail.accessItemName}}</h5>
                </div>
              </template>
              <template #default>
                <hl-row layout="grid" class="h-full w-full" count="count-2" gap="var(--md)">
                  <hl-col span="col">
                    <hl-group align="items-left items-top" class="w-full" dir="vertical"
                              gap="var(--xxs)">
                      <div class="text-secondary">数据周期类型</div>
                      <div class="text-regular font-bold">{{simpleAccessItemDetail.accessFrequency===0?'实时':'周期计算'}}</div>
                    </hl-group>
                  </hl-col>
                  <hl-col span="col">
                    <hl-group align="items-left items-top" class="w-full" dir="vertical"
                              gap="var(--xxs)">
                      <div class="text-secondary">数据频率</div>
                      <div class="text-regular font-bold">{{ getSimpleFrequency(simpleAccessItemDetail) }}</div>
                    </hl-group>
                  </hl-col>
                  <hl-col span="col">
                    <hl-group align="items-left items-top" class="w-full" dir="vertical"
                              gap="var(--xxs)">
                      <div class="text-secondary">数据标识</div>
                      <div class="text-regular font-bold">{{ simpleAccessItemDetail.accessItemCode }}</div>
                    </hl-group>
                  </hl-col>
                  <hl-col span="col">
                    <hl-group align="items-left items-top" class="w-full" dir="vertical"
                              gap="var(--xxs)">
                      <div class="text-secondary">监测设备</div>
                      <div class="text-regular font-bold">{{ simpleAccessItemDetail.equipName }}</div>
                    </hl-group>
                  </hl-col>
                  <hl-col span="col col-span-2">
                    <hl-group align="items-left items-top" class="w-full" dir="vertical"
                              gap="var(--xxs)">
                      <div class="text-secondary">数据时间区间</div>
                        <template v-if="simpleAccessItemDetail.timeScopes && simpleAccessItemDetail.timeScopes.length">
                          <div class="text-regular font-bold" v-for="scope in simpleAccessItemDetail.timeScopes" :key="scope.accessItemId">{{
                            `${scope.dateStart} 至 ${scope.dateEnd } ${scope.timeStart} 至 ${scope.timeEnd}`
                            }}</div>
                        </template>
                        <template v-else>--</template>
                    </hl-group>
                  </hl-col>
                </hl-row>
              </template>
            </hl-panel>
            <template v-else>
              <hl-panel v-for="(target, index) in multipleAccessItemDetailList" :key="target.targetDataId" class="w-full cursor-pointer" :class="target.active?'border solid border-primary box-shadow-md':''" padding="var(--xl)"
                        header-class="border-transparent"
                        body-class="display-flex items-left items-middle flex-row gap-md p-b-xl p-x-xl"
                        body-style="padding-top: 0px;" @click="selectTarget(target)">
                <template #header>
                  <div class="panel-header-left">
                    <hl-badge class="static" type="primary" :value="index+1"></hl-badge>
                  </div>
                  <div class="panel-title">
                    <h5 class="text-title w-full">{{target.accessSourceObjectName}}-{{target.targetDataName}}</h5>
                  </div>
                </template>
                <template #default>
                  <hl-row layout="grid" class="w-full" count="count-2" gap="var(--md)">
                    <hl-col span="col">
                      <hl-group align="items-left items-top" class="w-full" dir="vertical"
                                gap="var(--xxs)">
                        <div class="text-secondary">数据类型</div>
                        <div class="text-regular font-bold">{{target.dataTypeName||'--'}}</div>
                      </hl-group>
                    </hl-col>
                    <hl-col span="col">
                      <hl-group align="items-left items-top" class="w-full" dir="vertical"
                                gap="var(--xxs)">
                        <div class="text-secondary">监测指标</div>
                        <div class="text-regular font-bold">{{target.targetName||'--'}}</div>
                      </hl-group>
                    </hl-col>
                    <hl-col span="col">
                      <hl-group align="items-left items-top" class="w-full" dir="vertical"
                                gap="var(--xxs)">
                        <div class="text-secondary">计算周期类型</div>
                        <div class="text-regular font-bold">{{target.targetFrequency===0?'实时接入':'周期计算'}}</div>
                      </hl-group>
                    </hl-col>
                    <hl-col span="col">
                      <hl-group align="items-left items-top" class="w-full" dir="vertical"
                                gap="var(--xxs)">
                        <div class="text-secondary">数据频率</div>
                        <div class="text-regular font-bold">{{ getFrequency(target) }}</div>
                      </hl-group>
                    </hl-col>
                    <hl-col span="col">
                      <hl-group align="items-left items-top" class="w-full" dir="vertical"
                                gap="var(--xxs)">
                        <div class="text-secondary">指标分类</div>
                        <div class="text-regular font-bold">{{target.isMultiple===0?'基础指标':'复合指标'}}</div>
                      </hl-group>
                    </hl-col>
                    <hl-col span="col">
                      <hl-group align="items-left items-top" class="w-full" dir="vertical"
                                gap="var(--xxs)">
                        <div class="text-secondary">计量单位</div>
                        <div class="text-regular font-bold">{{target.measureUnitName||'--'}}</div>
                      </hl-group>
                    </hl-col>
                    <hl-col span="col">
                      <hl-group align="items-left items-top" class="w-full" dir="vertical"
                                gap="var(--xxs)">
                        <div class="text-secondary">计算公式</div>
                        <div class="text-regular font-bold">{{target.formulaName||'--'}}</div>
                      </hl-group>
                    </hl-col>
                    <hl-col span="col col-span-2">
                      <hl-group align="items-left items-top" class="w-full" dir="vertical"
                                gap="var(--xxs)">
                        <div class="text-secondary">数据时间区间</div>
                        <hl-group align="items-left items-top" gap="var(--lg)">
                          <template v-if="target.timeScopes && target.timeScopes.length">
                            <div class="text-regular font-bold" v-for="scope in target.timeScopes" :key="scope.accessItemId">{{
                              `${scope.dateStart} 至 ${scope.dateEnd } ${scope.timeStart} 至 ${scope.timeEnd}`
                              }}</div>
                          </template>
                          <template v-else>--</template>
                        </hl-group>
                      </hl-group>
                    </hl-col>
                  </hl-row>
                </template>
              </hl-panel>
            </template>
          </hl-group>
        </hl-col>
        <hl-col span="col-13">
          <hl-group align class="w-full" dir="vertical" full>
            <hl-panel class="w-full content" borderless style="--panel-header-height: 74px;"
                      padding="var(--lg)" header-class="bg-content" body-class="p-x-lg"
                      body-style="padding-top: 0px; padding-bottom: 0px;" footer-class="gap-md">
              <template #header>
                <div class="panel-header-left">
                  <hl-icon class="static" type="primary" size="md">
                    <FillOrnamentTitle4></FillOrnamentTitle4>
                  </hl-icon>
                </div>
                <div class="panel-title">
                  <h4 class="text-title w-full">指标历史数据</h4>
                </div>
              </template>
              <hl-simple-table
                :cols="cols"
                :data="tableData"
                :border="'bordered'"
                fixed-header
                class="m-b-lg"
                size="sm"
              >
                <template #tableIndex="{ rowIndex }">
                  <span>{{ rowIndex + 1 }}</span>
                </template>
              </hl-simple-table>
              <template #footer>
                <hl-pagination :total="pagination.total" block align="items-left items-middle"
                               layout="prev,pager,next"></hl-pagination>
              </template>
            </hl-panel>
          </hl-group>
        </hl-col>
      </hl-row>
    </hl-dialog>
  </div>
</template>
<script lang="ts" setup name="historyDataDialog">
import { reactive, ref, computed } from 'vue';
import { apiRealTimeMonitorObj as api } from '@/apis/modules/realtime-monitor';
import { IpostGetTraceSimpleTargetDataSpace, IgetGetHistoryTargetDataDetailsSpace, IpostGetTraceMultipleTargetDataSpace } from '@/apis/modules/realtime-monitor/model';
import { getSecondsToUnitTime } from '@/common/time';

const getSimpleFrequency = (target: { accessFrequency: number; accessFrequencyUnitName: any; }) => {
  if (target.accessFrequency === 0) {
    return '--';
  } else {
    return getSecondsToUnitTime(target, 'accessFrequencyUnit', 'accessFrequency') + target.accessFrequencyUnitName;
  }
};
const getFrequency = (target: { targetFrequency: number; targetFrequencyUnitName: any; }) => {
  if (target.targetFrequency === 0) {
    return '--';
  } else {
    return getSecondsToUnitTime(target, 'targetFrequencyUnit', 'targetFrequency') + target.targetFrequencyUnitName;
  }
};
const props = defineProps({
  isMultiple: {
    type: Number,
    default: 0
  }
});
const dataObject = ref();
const tableData = ref<IpostGetTraceSimpleTargetDataSpace.List[]| IpostGetTraceMultipleTargetDataSpace.List[]>([]);
const cols = computed(() => {
  if (props.isMultiple === 0) {
    return [
      { title: '', slotName: 'tableIndex', width: 'fit-content', },
      { title: '接入数据项', prop: 'accessItemName' },
      { title: '监测时间', prop: 'collectTime' },
      { title: '监测值', prop: 'dataValue' }
    ];
  } else {
    return [
      { title: '', slotName: 'tableIndex', width: 'fit-content', },
      { title: '指标数据项', prop: 'accessItemName' },
      { title: '数据时间', prop: 'collectTime' },
      { title: '指标值', prop: 'dataValue' }
    ];
  }
});

const dialogVisible = ref(false);
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
});
const resetPagination = () => {
  pagination.pageSize = 10;
  pagination.currentPage = 1;
  pagination.total = 0;
};

const simpleAccessItemDetail = ref<IpostGetTraceSimpleTargetDataSpace.AccessItemDetail>({
  'accessItemId': 0,
  'accessSourceId': 0,
  'accessSourceObjectId': 0,
  'accessItemName': '',
  'accessItemCode': '',
  'accessFrequency': 0,
  'accessFrequencyUnit': '',
  'accessFrequencyUnitName': '',
  'accessSourceName': '',
  'accessSourceObjectName': '',
  'accessItemDesc': '',
  'updatedAt': '',
  'timeScopes': []
});
const multipleAccessItemDetailList = ref<IgetGetHistoryTargetDataDetailsSpace.Data[]>([]);
const selectTarget = async(target: { targetDataId: string; }) => {
  multipleAccessItemDetailList.value.forEach(item => {
    if (item.targetDataId === target.targetDataId) {
      item.active = true;
    } else {
      item.active = false;
    }
  });
  // 查询右边表格数据
  resetPagination();
  await getMultipleTable(target);
};
const getMultipleTable = async(target: { targetDataId: string; }) => {
  const { data } = await api.postGetTraceMultipleTargetData({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
    dataResultId: dataObject.value.dataResultId,
    targetDataId: target.targetDataId
  });
  tableData.value = data.tracePage.list;
  pagination.total = data.tracePage.totalRow;
};
const openDialog = async(row: { dataResultId: any; accessItemId: any; }) => {
  dialogVisible.value = true;
  dataObject.value = row;
  resetPagination();
  tableData.value = [];
  if (props.isMultiple) {
    // 复杂
    // 先调详情
    const { data } = await api.getGetHistoryTargetDataDetails(row.dataResultId);
    if (data.length) {
      data[0].active = true;
      await getMultipleTable(data[0]);
    }
    multipleAccessItemDetailList.value = data;
  } else {
    // 简单
    const { data } = await api.postGetTraceSimpleTargetData({
      currentPage: pagination.currentPage,
      pageSize: pagination.pageSize,
      dataResultId: row.dataResultId,
      accessItemId: row.accessItemId
    });
    console.log(data);
    simpleAccessItemDetail.value = data.accessItemDetail;
    tableData.value = data.tracePage.list;
    pagination.total = data.tracePage.totalRow;
  }
};

defineExpose({ openDialog });
</script>

<style scoped lang="scss">
  .data-source {
    width: 100%;
  }
</style>
