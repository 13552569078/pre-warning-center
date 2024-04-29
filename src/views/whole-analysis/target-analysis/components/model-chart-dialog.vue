<template>
  <hl-dialog v-model="dialogVisible" width="900px" :placement="'center'" :show-close="true" @close="cancel"
    class="md-dialog" :title="targetTitle" :close-on-click-modal="false">
    <hl-group align="items-left" class="w-full" dir="vertical" gap="var(--xs)" full><span class="text-secondary">阈值</span>
      <hl-group v-if="curNode && curNode.thresholdValue && curNode.thresholdValue.length" dir="vertical">
        <hl-group v-for="(item, index) in curNode.thresholdValue" :key="index"
          class="m-t-xs p-y-sm p-x-lg bg-content border solid border-regular w-full box-shadow-sm"
          align="items-center items-middle" gap="var(--lg)" full>
          <hl-group align="items-left items-middle" class="w-full"><span class="text-secondary">下区间：</span>
            <hl-group align="items-left items-top" gap="var(--xxs)"><span class="text-regular font-bold">
                {{ EXPRESSIONS_NAMES[item.lowExpression] }}</span><span class="text-primary font-bold">
                {{ item.lowValue }}</span></hl-group>
          </hl-group>
          <hl-group align="items-left items-middle" class="w-full"><span class="text-secondary">上区间：</span>
            <hl-group align="items-left items-top" gap="var(--xxs)"><span class="text-regular font-bold">
                {{ EXPRESSIONS_NAMES[item.upExpression] }}</span><span class="text-primary font-bold">{{ item.upValue
                }}</span></hl-group>
          </hl-group>
        </hl-group>
      </hl-group>
      <hl-group v-else-if="curNode && curNode.thresholdLevelVOList && curNode.thresholdLevelVOList.length" dir="vertical">
        <hl-group v-for="(item, index) in curNode.thresholdLevelVOList" :key="index"
          class="m-t-xs p-y-sm p-x-lg bg-content border solid border-regular w-full box-shadow-sm"
          align="items-center items-middle" gap="var(--lg)" full>
          <hl-group align="items-left items-middle" class="w-full"><span class="text-secondary">{{ item.thresholdLevelName
          }}：</span>
            <hl-group align="items-left items-top" gap="var(--xxs)"><span class="text-primary font-bold">
                {{ item.thresholdLevelValue }}</span></hl-group>
          </hl-group>
        </hl-group>
      </hl-group>
      <hl-group v-else>--</hl-group>
      <hl-group align class="w-full" gap="var(--sm)" full>
        <hl-group class="p-y-xs p-x-lg bg-warning w-full" align="items-between items-middle"><span
            class="text-inverse font-bold">最大值</span>
          <h3 class="text-inverse">{{ curNode.maxValue }}</h3>
        </hl-group>
        <hl-group class="p-y-xs p-x-lg bg-primary w-full" align="items-between items-middle"><span
            class="text-inverse font-bold">最小值</span>
          <h3 class="text-inverse">{{ curNode.minValue }}</h3>
        </hl-group>
      </hl-group>
    </hl-group>
    <hl-group align="items-left items-bottom" class="w-full" dir="vertical" gap="var(--lg)" full>
      <div style="padding: 10px;" align="items-left items-top" class="w-full" gap="10px">
        <hl-group align="items-middle" gap="var(--md)" full>
          <div ref="chartContainer" v-if="showCharts" id="modelChartExp" class="echart-container w-full"
            style="height: 450px">
          </div>
          <hb-empty v-else description="暂无数据" />
        </hl-group>
      </div>
    </hl-group>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, watch, nextTick, reactive, onBeforeUnmount } from 'vue';
import { HlMessageBox } from 'hongluan-ui';
import { cloneDeep, max, min, floor } from 'lodash-es';
import { IpostDetailSpace } from '@/apis/modules/target-analysis/model';
import { apiTargetAnalysisObj } from '@/apis/modules/target-analysis';
import { EXPRESSIONS_NAMES, CHART_EXPRESSIONS_NAMES } from '@/common';
import * as echarts from 'echarts';

const emit = defineEmits(['saveName']);

const dialogVisible = ref(false);
let chartDom: echarts.ECharts | null | undefined = null;

const curNode = ref<IpostDetailSpace.Data>({
  targetDataId: 0,
  targetDataName: '',
  thresholdValue: '',
  maxValue: '',
  minValue: '',
  measureUnitName: '',
  timeList: [],
  dataList: [],
});
const targetTitle = ref('');
const echartsData = ref({
  xAxis: [],
  zoneList: [],
  timeList: [],
  dataList: [],
  markZoneData: [],
  piecesData: [],
});
const showCharts = ref(true);
const setChartData = async (data: any) => {
  dialogVisible.value = true;
  targetTitle.value = data.row.targetDataName;
  const result = await apiTargetAnalysisObj.postDetail(
    data.startTime,
    data.endTime,
    data.row.targetDataId
  );
  // const result = { 'code': '0', 'desc': '操作成功', 'tips': '操作成功', 'data': { 'targetDataId': '1578930362970525698', 'targetDataName': 'gzw测试数据项13', 'thresholdValue': '', 'maxValue': '30', 'minValue': '4', 'measureUnitName': 'm', 'timeList': ['2022-11-04 14:30:00', '2022-11-04 14:40:00', '2022-11-04 15:20:00', '2022-11-04 15:40:00'], 'dataList': [{ 'collectTime': '2022-11-04 14:30:00', 'dataValue': '30', 'isException': false }, { 'collectTime': '2022-11-04 14:40:00', 'dataValue': '4', 'isException': false }, { 'collectTime': '2022-11-04 15:20:00', 'dataValue': '30', 'isException': false }, { 'collectTime': '2022-11-04 15:40:00', 'dataValue': '4', 'isException': false }] } };
  curNode.value = result.data;
  if (curNode.value.thresholdValue && curNode.value.thresholdValue.length) {
    curNode.value.thresholdValue = Array.isArray(
      JSON.parse(curNode.value.thresholdValue)
    )
      ? JSON.parse(curNode.value.thresholdValue)
      : curNode.value.thresholdValue;
  } else {
    curNode.value.thresholdValue = '';
  }

  if (curNode.value.dataList?.length) {
    const arr = [];
    showCharts.value = true;
    echartsData.value.timeList = curNode.value.timeList;
    echartsData.value.xAxis = echartsData.value.timeList.map(e => {
      const xAisValue = e.split('-').splice(1, 2).join('-');
      return xAisValue;
    });
    echartsData.value.timeList.forEach(e => {
      const excData = curNode.value.dataList.find(k => k.collectTime === e);
      arr.push({
        value: excData?.dataValue,
        wholeTime: excData?.collectTime,
        isException: excData?.isException,
      });
    });
    echartsData.value.dataList = arr;
    nextTick(() => {
      renderChart();
    });
  } else {
    showCharts.value = false;
  }
};

const renderChart = () => {
  resetChart();
  chartDom = echarts.getInstanceByDom(document.getElementById('modelChartExp'));
  if (!chartDom) {
    chartDom = echarts.init(document.getElementById('modelChartExp'));
  }
  const option = {
    grid: {
      top: '32',
      left: '24',
      right: '10',
      bottom: '10%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      formatter: (params: any) => `
          <div style="backgroundColor:#fff;borderRaduis:0">
            <p>${params[0].data.wholeTime}</p>
            <p>${params[0].marker}
              <span>${params[0].seriesName
        } <span style="font-weight: bold; margin-left: 30px">
              ${params[0].data.value}&nbsp;&nbsp;${params[0].data.isException
          ? '<span style="color: red">(异常)</span>'
          : '(正常)'
        }</span>
              </span>
            </p>
          </div>
          `,
    },
    dataZoom: [
      {
        type: 'inside',
        start: 20,
        end: 60,
      },
      {
        start: 20,
        end: 60,
      },
    ],
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        rotate: 60,
      },
      data: echartsData.value.xAxis,
    },
    yAxis: {
      type: 'value',
      axisPointer: {
        snap: true,
      },
    },
    series: [
      {
        name: targetTitle.value,
        type: 'line',
        symbolSize: 6,
        lineStyle: {
          width: 2,
        },
        itemStyle: {
          color: 'rgb(45, 144, 255)',
        },
        data: echartsData.value.dataList,
        markLine: {
          label: {
            show: true,
            position: 'insideEnd',
            fontSize: 14,
            fontWeight: 'bold',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          },
          data: [],
        },
        // markArea: {
        //   itemStyle: {
        //     color: 'rgb(230, 247, 255)' // 蓝色背景
        //   },
        //   data: echartsData.value.markZoneData
        // },
      },
    ],
  };

  // color: 'rgb(45, 144, 255)', // 蓝线(正常)
  // color: 'rgb(237, 68, 84)', // 红线（异常）
  // color: 'rgb(230, 247, 255)' // 蓝色背景(正常)
  // color: 'rgb(255,236, 232)' // 红色背景(异常)

  if (curNode.value.thresholdValue.length || curNode.value.thresholdLevelVOList.length) {
    const piecesData = [];
    const markAreaData = [];
    const markLineData = [];
    markAreaData.push([
      {
        name: '',
        yAxis: Infinity,
        itemStyle: {
          color: 'rgba(255,236, 232, 0.5)',
        },
      },
      {
        yAxis: -Infinity,
      },
    ]);
    // 只考虑完整区间
    if (curNode.value.thresholdValue && curNode.value.thresholdValue.length) {
      const useForLine = curNode.value.thresholdValue.filter(
        e => e.lowExpression !== 'none' && e.upExpression !== 'none'
      );
      useForLine.forEach(e => {
        let bgItem = [];
        const item = {
          color: 'rgb(45, 144, 255)',
        };
        item[`${CHART_EXPRESSIONS_NAMES[e.lowExpression]}`] = +e.lowValue;
        item[`${CHART_EXPRESSIONS_NAMES[e.upExpression]}`] = +e.upValue;
        piecesData.push(item);
        markLineData.push({
          yAxis: e.upValue + '',
        });
        markLineData.push({
          yAxis: e.lowValue + '',
        });
        bgItem = [
          {
            name: '',
            yAxis: e.upValue,
            itemStyle: {
              color: 'rgb(230, 247, 255)',
            },
          },
          {
            yAxis: e.lowValue,
          },
        ];
        markAreaData.push(bgItem);
      });
    } else if (curNode.value.thresholdLevelVOList && curNode.value.thresholdLevelVOList.length) {
      const useForLine = curNode.value.thresholdLevelVOList;
      useForLine.forEach(e => {
        let bgItem = [];
        // const item = {
        //   color: 'rgb(45, 144, 255)',
        // };
        // item[`${CHART_EXPRESSIONS_NAMES[e.lowExpression]}`] = +e.lowValue;
        // item[`${CHART_EXPRESSIONS_NAMES[e.upExpression]}`] = +e.upValue;
        // piecesData.push(item);
        markLineData.push({
          yAxis: e.thresholdLevelValue + '',
        });
        markLineData.push({
          yAxis: e.thresholdLevelValue + '',
        });
        bgItem = [
          {
            name: '',
            yAxis: e.thresholdLevelValue,
            itemStyle: {
              color: 'rgba(230, 247, 255, 0.5)',
            },
          },
          {
            yAxis: e.thresholdLevelValue,
          },
        ];
        markAreaData.push(bgItem);
      });
    }
    console.log(317, markAreaData);

    // option.visualMap = {
    //   show: false,
    //   dimension: 1,
    //   pieces: piecesData
    // };
    option.series[0].markArea = {
      silent: true,
      data: markAreaData,
    };
    option.series[0].markLine.data = markLineData;
    // console.log(max([curNode.value.maxValue, ...markLineData.map(m => +m.yAxis)]), 35444);
    // console.log(min([curNode.value.minValue, ...markLineData.map(m => +m.yAxis)]), 35444);
    option.yAxis.max = floor(
      +max([curNode.value.maxValue, ...markLineData.map(m => +m.yAxis)]) + 5,
      2
    );
    option.yAxis.min = floor(
      +min([curNode.value.minValue, ...markLineData.map(m => +m.yAxis)]) - 5,
      2
    );
  } else {
    echartsData.value.markZoneData = [];
  }
  option && chartDom.setOption(option);
  chartDom.resize();
};

const resetChart = () => {
  if (chartDom) {
    chartDom.clear();
    chartDom.dispose();
  }
};

const cancel = () => {
  resetChart();
  dialogVisible.value = false;
};
onBeforeUnmount(() => {
  resetChart();
});
defineExpose({
  setChartData,
  cancel,
});
</script>
<style lang="scss"></style>
