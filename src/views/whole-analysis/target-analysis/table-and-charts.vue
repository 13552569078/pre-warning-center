<template>
  <hl-panel class="w-full m-t-xxl" style="--panel-header-height: 80px;" header-class="gap-lg" borderless
    padding="var(--lg)" body-class="p-x-lg" body-style="padding-top: 0px; padding-bottom: 0px;"
    footer-class="gap-md p-xl">
    <template #header>
      <div class="panel-title">
        <hl-icon size="xs" class="static">
          <SystemSearch></SystemSearch>
        </hl-icon>
        <hl-group align="items-left items-top" gap="var(--xxs)"><span class="title font-lg">查询结果</span><span
            class="link font-lg">{{ total }}</span>
          <div class="title font-lg">条数据</div>
        </hl-group>
      </div>
      <div class="panel-header-right">
        <hl-group align="items-right items-middle" gap="var(--lg)">
          <hl-button icon-position="left" effect="light" type="primary" rational v-if="dataType === 'table'"
            @click.stop="downLoad"><template #icon>
              <hl-icon>
                <TwoUpload></TwoUpload>
              </hl-icon>
            </template>导出</hl-button>
          <hl-group align="items-left items-top" gap="var(--xs)">
            <hl-button equal class="static" @click="changeDataType('table')"
              :type="dataType === 'table' ? 'primary' : null"><template #icon>
                <hl-icon>
                  <FillTable></FillTable>
                </hl-icon>
              </template></hl-button>
            <hl-button equal class="static" @click="changeDataType('echarts')"
              :type="dataType === 'echarts' ? 'primary' : null"><template #icon>
                <hl-icon>
                  <FillChartBar></FillChartBar>
                </hl-icon>
              </template></hl-button>
          </hl-group>
        </hl-group>
      </div>
    </template>
    <template #default>
      <div v-show="dataType === 'echarts'">
        <div v-if="showCharts" ref="chartContainer" id="barLineChart" class="echart-container w-full"
          style="height: calc(var(--lg) * 25)">
        </div>
        <hb-empty style="height: calc(var(--lg) * 25)" v-else description="暂无数据" />
      </div>
      <hl-scrollbar class="w-full" style="height: calc(var(--lg) * 25)" v-show="dataType === 'table'">
        <hl-simple-table ref="tableRef" :cols="cols" :data="tableData" fixed-header>

          <template #tableIndex="{ rowIndex }">
            {{ rowIndex + 1 }}
          </template>
          <template #targetDataName="{ row }">
            <hb-text-overflow style="display: inline-block; width: 12em;" effect="light">
              <span class="text-primary cursor-pointer" @click="openDetail(row)">{{
                row.targetDataName
              }}</span>
            </hb-text-overflow>
          </template>
          <template #thresholdValue="{ row }">
            <template v-if="row.thresholdValue&&row.thresholdValue!=='--'">
              <hb-text-overflow style="display: inline-block; width: 12em;" effect="light">
                {{ row.thresholdValue || '--' }}
              </hb-text-overflow>
            </template>

            <div v-else-if="row.thresholdLevelVOList &&
              row.thresholdLevelVOList !== '--' &&
              row.thresholdLevelVOList.length
              ">
              <template v-if="row.thresholdLevelVOList.length <= 3">
                <div v-for="(item, index) in row.thresholdLevelVOList.slice(0, 3)" :key="index"
                  class="display-flex items-middle">
                  <hb-text-overflow method="length" :length="8" effect="light">
                    {{ item.thresholdLevelName }}
                  </hb-text-overflow>
                  &emsp;
                  {{ item.thresholdLevelValue }}
                </div>
              </template>
              <template v-else>
                <div v-for="(item, index) in row.thresholdLevelVOList.slice(0, 3)" :key="index"
                  class="display-flex items-middle">
                  <hb-text-overflow method="length" :length="8" effect="light">
                    {{ item.thresholdLevelName }}
                  </hb-text-overflow>
                  &emsp;
                  {{ item.thresholdLevelValue }}
                </div>
                <hl-popover placement="right" trigger="click" class="m-r-lg">
                  <template #reference>
                    <hl-icon type="primary" size="xxs" class="cursor-pointer">
                      <two-more />
                    </hl-icon>
                  </template>
                  <div v-for="(item, index) in row.thresholdLevelVOList" :key="index" class="display-flex items-middle">
                    <hb-text-overflow method="length" :length="8" effect="light">
                      {{ item.thresholdLevelName }}
                    </hb-text-overflow>
                    &emsp;
                    {{ item.thresholdLevelValue }}
                  </div>
                </hl-popover>
              </template>
            </div>
            <div v-else>--</div>
          </template>
        </hl-simple-table>
      </hl-scrollbar>

    </template>
  </hl-panel>
  <ModelChartDialog ref="chartDialogRef" />
</template>
<script lang="ts" setup>
import { onMounted, ref, watch, nextTick } from 'vue';
import { HlMessage } from 'hongluan-ui';
import { ModelChartDialog } from './components';
import { apiTargetAnalysisObj } from '@/apis/modules/target-analysis';
import { TableParam, EchartsItem } from './types';
import type { IlistSpace, IpostChartDataSpace } from '@/apis/modules/target-analysis/model';
import * as echarts from 'echarts';

const props = defineProps({
  modelData: {
    type: Object,
  },
});

// watch(
//   () => props.modelData,
//   async() => {
//     getListData();
//   },
//   {
//     deep: true,
//   }
// );

const chartDialogRef = ref();
const tableData = ref<IlistSpace.Data[]>([]);
const dataType = ref('table');
const total = ref(0);
const showCharts = ref(true);
let chartDom: echarts.ECharts | null | undefined = null;

const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex',
  },
  {
    title: '指标数据项名称',
    prop: 'targetDataName',
    slotName: 'targetDataName',
  },
  {
    title: '指标数据项阈值',
    prop: 'thresholdValue',
    slotName: 'thresholdValue',
  },
  { title: '指标数据数量', prop: 'dataNum' },
  { title: '异常值数量', prop: 'exceptionNum' },
  { title: '异常值占比', prop: 'exceptionPercentage' },
  { title: '最大值', prop: 'maxValue' },
  { title: '最小值', prop: 'minValue' },
]);
// const { chartContainer, resizeChart, setChartOption } = useEChart();

const echartsData = ref<EchartsItem>({
  xAxis: [],
  total: [],
  highOneNum: [],
  highTwoNum: [],
  highThrNum: [],
});
const changeDataType = (type: string) => {
  dataType.value = type;
  if (props.modelData?.targetDataIds?.length) {
    if (type === 'table') {
      getListData();
    } else {
      getChartData();
    }
  } else {
    showCharts.value = false;
  }
};
const renderChart = () => {
  chartDom = echarts.getInstanceByDom(
    document.getElementById('barLineChart')
  );
  if (!chartDom) {
    chartDom = echarts.init(document.getElementById('barLineChart'));
  }
  const option = {
    grid: {
      top: '32',
      left: '0%',
      right: '0%',
      bottom: '20%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none',
      },
      extraCssText: 'border-radius: 0;',
      formatter: (params: any) => {
        let result = `${params[0].axisValue}`;
        params.forEach(e => {
          result += `<div style="backgroundColor:#fff;borderRaduis:0">
            ${e.marker}
            <span>${e.componentSubType === 'line' ? '总数' : e.data.targetDataName} <span style="font-weight: bold; margin-left: 30px">${e.componentSubType === 'line' ? e.value : e.data.value}</span></span>
          </div> `;
        });
        return result;
      }
    },
    legend: {
      selectedMode: false,
      data: ['高发指标数据项一', '高发指标数据项二', '高发指标数据项三'],
      bottom: 10,
      left: 'center',
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 16,
      textStyle: {
        fontSize: 12,
        color: 'rgba(128, 128, 160, 0.65)',
      },
    },
    xAxis: {
      axisLabel: {
        fontSize: 12,
        color: 'rgba(128, 128, 160, 0.65)',
        lineHeight: 20,
        margin: 5,
      },
      axisTick: {
        alignWithLabel: true,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(128, 128, 160, 0.15)',
        },
      },
      type: 'category',
      data: echartsData.value.xAxis,
    },
    yAxis: {
      splitNumber: 3,
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: 'rgba(128, 128, 160, 0.15)',
        },
      },
      axisLabel: {
        fontSize: 12,
        color: 'rgba(128, 128, 160, 0.65)',
        lineHeight: 20,
      },
      type: 'value',
    },
    series: [
      {
        itemStyle: {
          color: '#a3deff',
        },
        symbolSize: 6,
        // 让曲线更加圆滑
        smooth: true,
        lineStyle: {
          width: 3,
        },
        data: echartsData.value.total,
        type: 'line',
        name: '总数',
      },
      {
        itemStyle: {
          color: '#A3DEFF',
          borderWidth: 0,
          borderColor: '#36A4FF',
        },
        barWidth: 12,
        name: '高发指标数据项一',
        data: echartsData.value.highOneNum,
        type: 'bar',
      },
      {
        itemStyle: {
          color: '#A8E6DA',
          borderWidth: 0,
          borderColor: '#4CC09E',
        },
        barWidth: 12,
        name: '高发指标数据项二',
        data: echartsData.value.highTwoNum,
        type: 'bar',
      },
      {
        itemStyle: {
          color: '#FFB4AD',
          borderWidth: 0,
          borderColor: '#FF4D4F',
        },
        barWidth: 12,
        name: '高发指标数据项三',
        data: echartsData.value.highThrNum,
        type: 'bar',
      },
    ],
  };
  // setChartOption(option);
  // resizeChart();
  option && chartDom.setOption(option);
  chartDom.resize();
};

const getListData = async () => {
  const query = props.modelData;
  const result = await apiTargetAnalysisObj.list(
    query?.startTime,
    query?.endTime,
    query?.targetDataIds
  );
  tableData.value = result.data;
  total.value = result.data.length || 0;
};
// getListData();

const getChartData = async () => {
  echartsData.value = {
    xAxis: [],
    total: [],
    highOneNum: [],
    highTwoNum: [],
    highThrNum: [],
  };
  const query = props.modelData;
  const result = await apiTargetAnalysisObj.postChartData(
    query?.startTime,
    query?.endTime,
    query?.targetDataIds
  );
  showCharts.value = true;
  if (result.data.dataList?.length) {
    result.data.dataList.forEach(e => {
      echartsData.value.total.push(e.exceptionNum);
      if (e.targetDataList.length) {
        echartsData.value.highOneNum.push({
          value: e.targetDataList[0]?.exceptionNum || 0,
          targetDataName: e.targetDataList[0]?.targetDataName || '--'
        });
        echartsData.value.highTwoNum.push({
          value: e.targetDataList[1]?.exceptionNum || 0,
          targetDataName: e.targetDataList[1]?.targetDataName || '--'
        });
        echartsData.value.highThrNum.push({
          value: e.targetDataList[2]?.exceptionNum || 0,
          targetDataName: e.targetDataList[2]?.targetDataName || '--'
        });
      } else {
        echartsData.value.highOneNum.push({
          value: 0,
          targetDataName: '--'
        });
        echartsData.value.highTwoNum.push({
          value: 0,
          targetDataName: '--'
        });
        echartsData.value.highThrNum.push({
          value: 0,
          targetDataName: '--'
        });
        // echartsData.value.highOneNum.push({
        //   value: '',
        //   targetDataName: ''
        // });
        // echartsData.value.highTwoNum.push({
        //   value: '',
        //   targetDataName: ''
        // });
        // echartsData.value.highThrNum.push({
        //   value: '',
        //   targetDataName: ''
        // });
      }
    });
    echartsData.value.xAxis = result.data.timeList;
    nextTick(() => {
      renderChart();
    });
  } else {
    showCharts.value = false;
  }
};
const downLoad = async () => {
  if (tableData.value.length) {
    const query = props.modelData;
    await apiTargetAnalysisObj.postExportList(
      query?.startTime,
      query?.endTime,
      query?.targetDataIds);
  } else {
    HlMessage.warning('暂无数据，请先查询分析出数据再进行导出');
  }
};

const openDetail = (row: IlistSpace.Data) => {
  chartDialogRef.value.setChartData({
    startTime: props.modelData?.startTime,
    endTime: props.modelData?.endTime,
    row
  });
};
defineExpose({
  changeDataType,
});

</script>
