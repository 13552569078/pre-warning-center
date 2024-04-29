<template>
  <hl-dialog :model-value="true" class="md-dialog online-charts-dlg" body-class="result-total-body-out" width="1100px"
             title="指标数据项统计"
             @close="$emit('cancel')">
    <hl-panel class="w-full m-b-lg" style="width: 100%;"
              body-class="result-total-body display-flex items-left items-middle flex-row gap-md"
              body-style="padding: 0px;">
      <template #default>
        <hl-group class="p-sm bg-content w-full" align="items-middle" gap="var(--sm)" full="full-x">
          <hl-icon size="xxl" class="static" type="primary">
            <FillChartBar></FillChartBar>
          </hl-icon>
          <hl-group align="items-between items-middle" class="w-full" gap="var(--xs)"><span
            class="font-lg font-bold static">共有指标数据项</span>
            <hl-group align="items-left items-top" gap="var(--xxs)">
              <hl-group align="items-left items-middle" gap="var(--xxs)">
                <h3 class="text-primary static">{{statisticResult.targetDataNumber}}</h3><span class="text-secondary static">条</span>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-group>
        <hl-group class="p-sm bg-content w-full" align="items-middle" gap="var(--sm)" full="full-x">
          <hl-icon size="xxl" class="static" type="primary">
            <FillChartBar></FillChartBar>
          </hl-icon>
          <hl-group align="items-between items-middle" class="w-full" gap="var(--xs)"><span
            class="font-lg font-bold static">计算产生指标数据</span>
            <hl-group align="items-left items-top" gap="var(--xxs)">
              <hl-group align="items-left items-middle" gap="var(--xxs)">
                <h3 class="text-primary static">{{statisticResult.dataNumber}}</h3><span class="text-secondary static">条</span>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-group>
      </template>
    </hl-panel>

    <hl-panel class="w-full dialog-inner-panel" style="width: 100%;" header-style="gap: 0px;" borderless padding="0px"
              body-style="padding: 0px;">
      <template #header>
        <hl-group class="w-full" align="items-left items-middle">
          <div class="panel-header-left">
           <!--  <hl-icon class="static" type="primary" size="md">
              <FillOrnamentTitle4></FillOrnamentTitle4>
            </hl-icon> -->
          </div>
          <!-- <div class="panel-title">
            <h5 class="text-title">按是否公用分</h5>
          </div> -->
          <panel-header title="按是否公用分"/>
        </hl-group>
        <hl-group class="w-full" align="items-left items-middle">
          <div class="panel-header-left">
            <!-- <hl-icon class="static" type="primary" size="md">
              <FillOrnamentTitle4></FillOrnamentTitle4>
            </hl-icon> -->
          </div>
          <!-- <div class="panel-title">
            <h5 class="text-title">按计算周期分类型</h5>
          </div> -->
          <panel-header title="按计算周期分类型"/>
        </hl-group>
      </template>
      <template #default>
        <hl-row>
          <hl-col span="col-12" style="height: calc(var(--lg) * 14); padding: calc(var(--lg) * 2);position: relative;">
            <div class="w-full" style="width: 100%; height: 100%;">
              <div ref="chartContainer" class="echart-container" id="onlineChart1"></div>
            </div>
            <div class="online-chart-legend" v-if="showLegend">
              <hl-group align="items-left items-top m-b-lg" dir="vertical" full="full-x">
                <div class="point" :style="`background: ${color1[1]}; outline: calc(var(--xxs) * 0.75) solid ${color11[1]};`">
                </div>
                <hl-group align="items-left items-middle" gap="20px">
                  <hl-group align="items-left items-middle" class="static total-size" gap="var(--xxs)"><span class="text-title font-lg font-bold static">{{statisticResult.isPublicTargetVOs[1].value}}</span><span class="text-secondary static">项</span></hl-group>
                  <hl-group align="items-left items-middle" class="static" gap="var(--xxs)"><span class="text-title font-lg font-bold static">{{statisticResult.isPublicDataVOs[1].value}}</span><span class="text-secondary static">条</span></hl-group>
                </hl-group>
                <hl-group align="items-left items-middle" gap="20px">
                  <hl-group align="items-left items-middle" class="static total-size" gap="var(--xxs)"><span class="static">非公用</span></hl-group>
                  <hl-group align="items-left items-middle" class="static" gap="var(--xxs)"><span class="text-title font-lg font-bold static">{{(statisticResult.isPublicDataVOs[1].rate * 100).toFixed(2)}}</span><span class="text-secondary static">%</span></hl-group>
                </hl-group>
              </hl-group>
              <hl-group align="items-left items-top" dir="vertical" full="full-x">
                <div class="point" :style="`background: ${color1[0]}; outline: calc(var(--xxs) * 0.75) solid ${color11[0]};`">
                </div>
                <hl-group align="items-left items-middle" gap="20px">
                  <hl-group align="items-left items-middle" class="static total-size" gap="var(--xxs)"><span class="text-title font-lg font-bold static">{{statisticResult.isPublicTargetVOs[0].value}}</span><span class="text-secondary static">项</span></hl-group>
                  <hl-group align="items-left items-middle" class="static" gap="var(--xxs)"><span class="text-title font-lg font-bold static">{{statisticResult.isPublicDataVOs[0].value}}</span><span class="text-secondary static">条</span></hl-group>
                </hl-group>
                <hl-group align="items-left items-middle" gap="20px">
                  <hl-group align="items-left items-middle" class="static total-size" gap="var(--xxs)"><span class="static">公用</span></hl-group>
                  <hl-group align="items-left items-middle" class="static" gap="var(--xxs)"><span class="text-title font-lg font-bold static">{{(statisticResult.isPublicDataVOs[0].rate * 100).toFixed(2)}}</span><span class="text-secondary static">%</span></hl-group>
                </hl-group>
              </hl-group>
            </div>
          </hl-col>
          <hl-col span="col-12" style="height: calc(var(--lg) * 14); padding: calc(var(--lg) * 2; position: relative;">
            <div class="w-full" style="width: 100%; height: 100%;">
              <div ref="chartContainer" class="echart-container" id="onlineChart2"></div>
            </div>
            <div class="online-chart-legend" v-if="showLegend">
              <hl-group align="items-left items-top m-b-lg" dir="vertical" full="full-x">
                <div class="point" :style="`background: ${color2[1]}; outline: calc(var(--xxs) * 0.75) solid ${color22[1]};`">
                </div>
                <hl-group align="items-left items-middle" gap="20px">
                  <hl-group align="items-left items-middle" class="static total-size" gap="var(--xxs)"><span class="text-title font-lg font-bold static">{{statisticResult.targetFrequencyTargetVOs[1].value}}</span><span class="text-secondary static">项</span></hl-group>
                  <hl-group align="items-left items-middle" class="static" gap="var(--xxs)"><span class="text-title font-lg font-bold static">{{statisticResult.targetFrequencyDataVOs[1].value}}</span><span class="text-secondary static">条</span></hl-group>
                </hl-group>
                <!-- <div><hl-group align="items-left items-middle" class="static" gap="var(--xxs)">实时计算&emsp;<span class="text-title font-lg font-bold static">{{(statisticResult.targetFrequencyDataVOs[1].rate * 100).toFixed(2)}}</span><span class="text-secondary static">%</span></hl-group>
                </div> -->
                <hl-group align="items-left items-middle" gap="20px">
                  <hl-group align="items-left items-middle" class="static total-size" gap="var(--xxs)"><span class="static">实时计算</span></hl-group>
                  <hl-group align="items-left items-middle" class="static" gap="var(--xxs)"><span class="text-title font-lg font-bold static">{{(statisticResult.targetFrequencyDataVOs[1].rate * 100).toFixed(2)}}</span><span class="text-secondary static">%</span></hl-group>
                </hl-group>
              </hl-group>
              <hl-group align="items-left items-top" dir="vertical" full="full-x">
                <div class="point" :style="`background: ${color2[0]}; outline: calc(var(--xxs) * 0.75) solid ${color22[0]};`">
                </div>
                <hl-group align="items-left items-middle" gap="20px">
                  <hl-group align="items-left items-middle" class="static total-size" gap="var(--xxs)"><span class="text-title font-lg font-bold static">{{statisticResult.targetFrequencyTargetVOs[0].value}}</span><span class="text-secondary static">项</span></hl-group>
                  <hl-group align="items-left items-middle" class="static" gap="var(--xxs)"><span class="text-title font-lg font-bold static">{{statisticResult.targetFrequencyDataVOs[0].value}}</span><span class="text-secondary static">条</span></hl-group>
                </hl-group>
                <!-- <div><hl-group align="items-left items-middle" class="static" gap="var(--xxs)">周期计算&emsp;<span class="text-title font-lg font-bold static">{{(statisticResult.targetFrequencyDataVOs[0].rate * 100).toFixed(2)}}</span><span class="text-secondary static">%</span></hl-group>
                </div> -->
                <hl-group align="items-left items-middle" gap="20px">
                  <hl-group align="items-left items-middle" class="static total-size" gap="var(--xxs)"><span class="static">周期计算</span></hl-group>
                  <hl-group align="items-left items-middle" class="static" gap="var(--xxs)"><span class="text-title font-lg font-bold static">{{(statisticResult.targetFrequencyDataVOs[0].rate * 100).toFixed(2)}}</span><span class="text-secondary static">%</span></hl-group>
                </hl-group>
              </hl-group>
            </div>
          </hl-col>
        </hl-row>
      </template>
    </hl-panel>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import * as echarts from 'echarts';
import { apiWarningTotalObj } from '@/apis/modules/warning-total';

const props = defineProps({
  exportParams: {
    type: Object
  },
});

const emit = defineEmits(['cancel', 'ok']);

const myChart1 = ref();
const myChart2 = ref();

const color1 = ['rgba(1, 205, 162, 1)', 'rgba(56, 131, 248, 1)'];
const color11 = ['rgba(1, 205, 162, 0.45)', 'rgba(56, 131, 248, 0.45)'];
const color2 = ['rgba(180, 130, 255, 1)', 'rgba(250, 166, 22, 1)'];
const color22 = ['rgba(180, 130, 255, 0.45)', 'rgba(250, 166, 22, 0.45)'];
const statisticResult = ref({
  'targetDataNumber': 0,
  'dataNumber': 0,
  'isPublicTargetVOs': [
  ],
  'isPublicDataVOs': [
  ],
  'targetFrequencyTargetVOs': [
  ],
  'targetFrequencyDataVOs': [
  ]
});
const showLegend = ref(false);
const renderChart1 = () => {
  myChart1.value = echarts.init(document.getElementById('onlineChart1')!);
  const option = {
    tooltip: {
      trigger: 'item'
    },
    series: [{
      name: '预警统计',
      type: 'pie',
      radius: ['52%', '80%'],
      center: ['30%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
      },
      data: statisticResult.value.isPublicDataVOs.map(item => {
        return {
          name: item.name,
          value: item.value
        };
      }),
      itemStyle: {
        normal: {
          color: function(colors) {
            return color1[colors.dataIndex];
          }
        }
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    {
      name: '预警统计',
      type: 'pie',
      radius: ['88%', '95%'],
      center: ['30%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
      },
      data: statisticResult.value.isPublicDataVOs.map(item => {
        return {
          name: item.name,
          value: item.value
        };
      }),
      itemStyle: {
        normal: {
          color: function(colors) {
            return color11[colors.dataIndex];
          }
        }
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.1)',
        },
      },
    }],
  };
  myChart1.value.setOption(option);
  // 让图表跟随屏幕自动的去适应
  window.addEventListener('resize', function() {
    myChart1.value.resize();
  });
};
const renderChart2 = () => {
  myChart2.value = echarts.init(document.getElementById('onlineChart2')!);
  const option = {
    tooltip: {
      trigger: 'item'
    },
    series: [{
      name: '预警统计',
      type: 'pie',
      radius: ['52%', '80%'],
      center: ['30%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
      },
      data: statisticResult.value.targetFrequencyDataVOs.map(item => {
        return {
          name: item.name,
          value: item.value
        };
      }),
      itemStyle: {
        normal: {
          color: function(colors) {
            return color2[colors.dataIndex];
          }
        }
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    {
      name: '预警统计',
      type: 'pie',
      radius: ['88%', '95%'],
      center: ['30%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
      },
      data: statisticResult.value.targetFrequencyDataVOs.map(item => {
        return {
          name: item.name,
          value: item.value
        };
      }),
      itemStyle: {
        normal: {
          color: function(colors) {
            return color22[colors.dataIndex];
          }
        }
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.1)',
        },
      },
    }],
  };
  myChart2.value.setOption(option);
  // 让图表跟随屏幕自动的去适应
  window.addEventListener('resize', function() {
    myChart2.value.resize();
  });
};

const getData = () => {
  apiWarningTotalObj.postFindAlarmLogPageStatistic(props.exportParams!).then(res => {
    statisticResult.value = res.data;
    showLegend.value = true;
    renderChart1();
    renderChart2();
  });
};
onMounted(() => {
  nextTick(() => {
    getData();
  });
});

onUnmounted(() => {
  if (myChart1.value) myChart1.value.dispose();
  if (myChart2.value) myChart2.value.dispose();
});

</script>
<style lang="scss">
  .online-charts-dlg {
    .result-total-body-out {
      padding: var(--panel-body-padding) !important;
      background: #F6F9FB;
    }
    .result-total-body {
      background: #F6F9FB;
    }

    .echart-container {
      width: 100%;
      height: 100%
    }

    .online-chart-legend {
      position: absolute;
      right: calc(var(--lg) * 2.5);
      top: calc(var(--lg) * 3);
      width: calc(var(--lg) * 8);
    }

    .point {
      width: calc(var(--lg) * 0.3);
      height: calc(var(--lg) * 0.3);
      border-radius: calc(var(--lg) * 0.3);
      position: absolute;
      top: calc(var(--xxs) * 2.8);
      left: calc(var(--xxs) * 2 * -2);
    }
    .total-size {
      width: 60px;
      display: inline-block;
    }
  }
</style>
