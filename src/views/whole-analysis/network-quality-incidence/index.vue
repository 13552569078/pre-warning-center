<template>
  <hl-group align="items-between" gap="var(--lg)" class="w-full">
    <hl-panel class="w-full solid border-regular" header-style="gap: 0px;" borderless style="--panel-header-height: 64px" padding="var(--lg)" header-class="bg-content" body-class="display-flex items-center items-middle flex-col gap-lg p-t-sm p-b-lg p-x-xl bg-content">
      <template #header>
        <div class="panel-header-left">
          <hl-icon class="static" type="primary" size="md">
            <FillOrnamentTitle4></FillOrnamentTitle4>
          </hl-icon>
        </div>
        <div class="panel-title">
          <h6 class="text-title">设备在线/离线</h6>
        </div>
      </template>
      <template #default>
        <hl-row gap="var(--xxl)" class="w-full result-total-body m-t-xxl">
          <hl-col span="col-12" style="height: calc(var(--lg) * 10)" class="display-flex items-middle items-center">
            <hl-progress show-as="circle" :percentage="Number(equipAnalysis.onLineRate * 100).toFixed(2)" color="#4CC09E" stroke-width="10px">
              <template #default="{ percentage }">
                <hl-group dir="vertical" align="items-middle items-center">
                  <h4>在线率</h4>
                  <h1>{{ percentage }}%</h1>
                </hl-group>
              </template>
            </hl-progress>
          </hl-col>
          <hl-col span="col-12" style="height: calc(var(--lg) * 10)">
            <hl-group align="items-center items-top items-middle" class="static" dir="vertical" gap="var(--md)" style="width: 100%" full="full-x">
              <hl-group class="p-y-sm p-x-lg w-full cursor-pointer" :class="[cardType === 'ONLINE' ? 'bg-success-light-5' : 'bg-light']" align="items-between items-middle" @click="changeType('ONLINE')"
                ><span class="font-bold static">在线</span>
                <hl-group align="items-left items-middle" gap="var(--xxs)">
                  <h3 class="text-primary static">{{ equipAnalysis.onLineNumber }}</h3>
                  <span class="text-secondary static">条</span>
                </hl-group>
              </hl-group>
              <hl-group class="p-y-sm p-x-lg w-full cursor-pointer" :class="[cardType === 'OUTLINE' ? 'bg-success-light-5' : 'bg-light']" align="items-between items-middle" @click="changeType('OUTLINE')"
                ><span class="font-bold static">离线</span>
                <hl-group align="items-left items-middle" gap="var(--xxs)">
                  <h3 class="text-primary static">{{ equipAnalysis.offLineNumber }}</h3>
                  <span class="text-secondary static">条</span>
                </hl-group>
              </hl-group>
              <hl-group class="p-y-sm p-x-lg bg-light w-full" align="items-between items-middle"
                ><span class="font-bold static">在线率</span>
                <hl-group align="items-left items-middle" gap="var(--xxs)">
                  <h3 class="text-success static">{{ Number(equipAnalysis.onLineRate * 100).toFixed(2) }}</h3>
                  <span class="text-secondary static">%</span>
                </hl-group>
              </hl-group>
            </hl-group>
          </hl-col>
        </hl-row>
      </template>
    </hl-panel>
    <hl-panel class="w-full solid border-regular" header-style="gap: 0px;" borderless style="--panel-header-height: 64px" padding="var(--lg)" header-class="bg-content" body-class="display-flex items-center items-middle flex-col gap-lg p-t-sm p-b-lg p-x-xl bg-content">
      <template #header>
        <div class="panel-header-left">
          <hl-icon class="static" type="primary" size="md">
            <FillOrnamentTitle4></FillOrnamentTitle4>
          </hl-icon>
        </div>
        <div class="panel-title">
          <h6 class="text-title">设备状态分布</h6>
        </div>
      </template>
      <template #default>
        <div ref="chartContainer" class="echart-container w-full" style="height: calc(var(--lg) * 14)"></div>
      </template>
    </hl-panel>
  </hl-group>
  <fx-page-table-v2 ref="tableRef" :cols="cols" :table-data="tableData" class="m-t-xl" :data-fetcher="getData" style="height: calc(var(--lg) * 38)"> </fx-page-table-v2>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import { DataFetcherParams } from 'fx-front-framework';
import { useEChart } from 'hongluan-hooks';
import { RecordAny } from '@/types';
import { apiNetworkQualityIncidenceObj } from '@/apis/modules/whole-analysis/network-quality-incidence';

// ONLINE  OUTLINE
const { chartContainer, setChartOption } = useEChart();

const cardType = ref('ONLINE');
const equipAnalysis = reactive({
  onLineNumber: 0, // 在线
  offLineNumber: 0, // 离线
  onLineRate: 0 // 在线率
});

const tableRef = ref();
const tableData = ref<any[]>([]);
const cols = ref([
  {
    title: '序号',
    align: 'center',
    slotName: 'tableIndex',
    prop: 'tableIndex',
    width: 'fit-content',
  },
  { title: '设备名称', prop: 'equipName', minWidth: '8em', showTooltip: true, tooltipProps: { minWidth: '340px' } },
  { title: '设备状态', prop: 'equipStatusName', minWidth: '8em' },
  { title: '设备类型', prop: 'equipTypeName', minWidth: '8em' },
  { title: '设备编号', prop: 'equipCode', minWidth: '12em', showTooltip: true, tooltipProps: { minWidth: '340px' } },
  { title: '安装位置', prop: 'address', minWidth: '18em', showTooltip: true, tooltipProps: { minWidth: '340px' } },
  { title: '所在区域', prop: 'streetAreaCodeName', minWidth: '8em' },
  { title: '安装时间', prop: 'installTime', minWidth: '12em' },
  { title: '更新时间', prop: 'updatedAt', minWidth: '12em' }
]);

const changeType = (type: string) => {
  cardType.value = type;
  tableRef.value?.refresh();
};
const getData = async({ params, pageSize, currentPage, setTotal }: DataFetcherParams) => {
  const { data } = await apiNetworkQualityIncidenceObj.getFindEquipListPage(currentPage, pageSize, cardType.value === 'ONLINE' ? 1 : 0);
  tableData.value = data.list;
  setTotal(+data.totalRow);
};
const getStatus = async() => {
  const { data } = await apiNetworkQualityIncidenceObj.getFindEquipDataAnalysis();
  Object.assign(equipAnalysis, data);
};
const renderChart = async() => {
  const { data } = await apiNetworkQualityIncidenceObj.getFindEquipStateList();
  const option = {
    // 正常 故障 试运行 维修
    color: ['#4CC09E', '#EE7C62', ' #72BFFF', ' #F9CF51'],
    legend: {
      data: data.map(item => {
        return item.name;
      }),
      orient: 'vertical',
      itemWidth: 16,
      itemHeight: 16,
      itemGap: 16,
      right: 10,
      top: 10
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'none'
      },
      extraCssText: 'border-radius: 0;',
      formatter: (params: RecordAny) => {
        let result = '';
        result += `<div style="backgroundColor:#fff;borderRaduis:0">
          ${params.marker}
          <span>${params.data.name}:${params.data.value}</span>
          </div>`;
        return result;
      }
    },
    series: [
      {
        name: '设备状态分布',
        type: 'pie',
        radius: ['50%', '80%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          formatter: '{b}: {@2012} ({d}%)'
        },
        data: data
      }
    ]
  };
  setChartOption(option);
};

onMounted(() => {
  getStatus();
  renderChart();
});
</script>
<style lang="scss">
.result-total-body {
  .hl-progress.circle {
    width: calc(var(--lg) * 10);
    height: calc(var(--lg) * 10);
  }
}
</style>
