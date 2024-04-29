<template>
  <hl-dialog :model-value="true" class="md-dialog" body-class="result-total-body not-footer-dialog" width="720px" title="历史报警统计" @close="$emit('cancel')">
    <div class="w-full m-b-lg" style="height: calc(var(--lg) * 6)">
      <hl-row gap="var(--lg)">
        <hl-col span="col-9" style="height: calc(var(--lg) * 6)" class="display-flex items-middle items-center">
          <hl-group :style="`padding: 28px; background: url(${cardRed}) no-repeat; background-size: cover;`" align="items-left items-middle" class="w-full" gap="var(--xl)">
            <hl-icon size="xxl" fill class="radius-lg text-inverse" effect="light" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%)">
              <FillWarning></FillWarning>
            </hl-icon>
            <hl-group align="items-left items-top" dir="vertical" gap="var(--xs)"
              ><span class="text-inverse font-lg font-bold text-inverse">报警信息</span>
              <hl-group align="items-left items-top" gap="var(--lg)">
                <hl-group align="items-left items-middle" gap="10px">
                  <hl-group align="items-left items-middle" gap="10px">
                    <h3 class="text-inverse">{{ statisticResult.alarmNumber }}</h3>
                    <span class="text-inverse">条</span>
                  </hl-group>
                </hl-group>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-col>
        <hl-col span="col-15" style="height: calc(var(--lg) * 6)">
          <hl-group align="items-left" dir="vertical" gap="var(--sm)" style="height: 120px; width: 100%" full="full-y">
            <hl-group align="items-left items-middle" gap="var(--sm)" full="full-y" style="width: 100%">
              <hl-group class="p-x-md bg-content static" style="padding-top: 9px; padding-bottom: 9px; width: 48.5%" align="items-middle" gap="var(--md)" full="full-x">
                <hl-group align="items-left items-middle" gap="var(--sm)">
                  <hl-icon size="lg" class="static" type="danger">
                    <FillWarning></FillWarning>
                  </hl-icon>
                  <span class="text-title text-center static">一级报警</span>
                </hl-group>
                <span style="color: #4b4b4b" class="font-xxxl font-bold text-center static">{{ statisticResult.alarmLevelVOs[0].value }}</span>
              </hl-group>
              <hl-group class="p-x-md bg-content static" style="padding-top: 9px; padding-bottom: 9px; width: 48.5%" align="items-middle" gap="var(--md)" full="full-x">
                <hl-group align="items-left items-middle" gap="var(--sm)">
                  <hl-icon size="lg" class="static" type="warning">
                    <FillWarning></FillWarning>
                  </hl-icon>
                  <span class="text-title text-center static">二级报警</span>
                </hl-group>
                <span style="color: #4b4b4b" class="font-xxxl font-bold text-center static">{{ statisticResult.alarmLevelVOs[1].value }}</span>
              </hl-group>
            </hl-group>
            <hl-group align="items-left items-middle" gap="var(--sm)" full="full-y" style="width: 100%">
              <hl-group class="p-x-md bg-content static" style="padding-top: 9px; padding-bottom: 9px; width: 48.5%" align="items-middle" gap="var(--md)" full="full-x">
                <hl-group align="items-left items-middle" class="w-full" gap="var(--sm)">
                  <hl-icon size="lg" class="static" style color="#FFE500">
                    <FillWarning></FillWarning>
                  </hl-icon>
                  <span class="text-title text-center static">三级报警</span>
                </hl-group>
                <span style="color: #4b4b4b" class="font-xxxl font-bold text-center static">{{ statisticResult.alarmLevelVOs[2].value }}</span>
              </hl-group>
              <hl-group class="p-x-md bg-content static" style="padding-top: 9px; padding-bottom: 9px; width: 48.5%" align="items-middle" gap="var(--md)" full="full-x">
                <hl-group align="items-left items-middle" class="w-full" gap="var(--sm)">
                  <hl-icon size="lg" class="static" type="primary">
                    <FillWarning></FillWarning>
                  </hl-icon>
                  <span class="text-title text-center static">四级报警</span>
                </hl-group>
                <span style="color: #4b4b4b" class="font-xxxl font-bold text-center static">{{ statisticResult.alarmLevelVOs[3].value }}</span>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-col>
      </hl-row>
    </div>
    <hl-panel class="w-full" header-style="gap: 0px;" borderless padding="var(--lg)" body-class="display-flex items-left items-middle flex-row gap-xl" body-style="padding: 40px;position: relative;">
      <div class="w-full" style="height: calc(var(--lg) * 12)">
        <div ref="chartContainer" class="echart-container" id="historicalChart"></div>
      </div>
      <div style="width: calc(var(--lg) * 15); height: calc(var(--lg) * 8.5)" class="chart-legend">
        <hl-row gap-x="calc(var(--lg) * 3)" gap-y="var(--lg)">
          <hl-col span="col-12" v-for="(item, index) in statisticResult.eventTypeVOs" :key="index" style="position: relative">
            <div class="point" :style="`background: ${color1[index]}; outline: calc(var(--xxs) * 0.75) solid ${color2[index]};`"></div>
            <hl-group align="items-top" dir="vertical" full="full-x">
              <hl-group align="items-left items-middle" class="w-full" gap="10px" full="full-x">
                <div class="text-title font-lg font-bold">{{ (item.rate * 100).toFixed(2) }}%</div>
                <span class="text-title font-lg font-bold static">{{ item.alarmNumber }}</span>
              </hl-group>
              <div style="color: #808694;--line: 2" class="ellipsis">{{ item.eventTypeName }}</div>
            </hl-group>
          </hl-col>
        </hl-row>
      </div>
    </hl-panel>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import cardRed from '@/assets/images/homepage/card-red.png';
import * as echarts from 'echarts';
// import { apiWarningTotalObj } from '@/apis/modules/warning-total';
import { apiYgfAlarmInfoObj } from '@/apis/modules/ygf-alarm-info/index';

const props = defineProps({
  exportParams: {
    type: Object
  }
});

const emit = defineEmits(['cancel', 'ok']);

const myChart = ref();

const color1 = ['rgba(1, 205, 162, 1)', 'rgba(135, 180, 255, 1)', 'rgba(123, 124, 255, 1)', 'rgba(56, 131, 248, 1)', 'rgba(153, 236, 218, 1)', 'rgba(214, 220, 235, 1)'];
const color2 = ['rgba(1, 205, 162, 0.45)', 'rgba(135, 180, 255, 0.45)', 'rgba(123, 124, 255, 0.45)', 'rgba(56, 131, 248, 0.45)', 'rgba(153, 236, 218, 0.45)', 'rgba(214, 220, 235, 0.45)'];
const statisticResult = ref({
  alarmNumber: 0,
  alarmLevelVOs: [
    {
      code: 'ALARM_LEVEL_CODE_1',
      name: 'I级',
      value: 0
    },
    { code: 'ALARM_LEVEL_CODE_2', name: 'II级', value: 0 },
    {
      code: 'ALARM_LEVEL_CODE_3',
      name: 'III级',
      value: 0
    },
    { code: 'ALARM_LEVEL_CODE_4', name: 'IV级', value: 0 }
  ],
  eventTypeVOs: [
    /* {
      'eventTypeCode': '121105',
      'eventTypeName': '设施疲劳运行',
      'alarmNumber': 26368,
      'rate': 0.8539
    },
    {
      'eventTypeCode': '120101',
      'eventTypeName': '消防通道占用',
      'alarmNumber': 1676,
      'rate': 0.0543
    },
    {
      'eventTypeCode': '0112',
      'eventTypeName': '刘媛敏复合指标风险分类',
      'alarmNumber': 1196,
      'rate': 0.0387
    },
    {
      'eventTypeCode': '0102',
      'eventTypeName': '刘媛敏风险分类2级名称',
      'alarmNumber': 798,
      'rate': 0.0258
    },
    {
      'eventTypeCode': '120201',
      'eventTypeName': '超速行驶',
      'alarmNumber': 292,
      'rate': 0.0095
    },
    { 'eventTypeCode': '', 'eventTypeName': '其他', 'alarmNumber': 548, 'rate': 0.0178 } */
  ]
});
const renderChart = () => {
  myChart.value = echarts.init(document.getElementById('historicalChart')!);
  const option = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '报警统计',
        type: 'pie',
        radius: ['52%', '80%'],
        center: ['20%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false
        },
        data: statisticResult.value.eventTypeVOs.map(item => {
          return {
            name: item.eventTypeName,
            value: item.alarmNumber
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
            shadowColor: 'rgba(0, 0, 0, 0.1)'
          }
        }
      },
      {
        name: '报警统计',
        type: 'pie',
        radius: ['88%', '95%'],
        center: ['20%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false
        },
        data: statisticResult.value.eventTypeVOs.map(item => {
          return {
            name: item.eventTypeName,
            value: item.alarmNumber
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
            shadowColor: 'rgba(0, 0, 0, 0.1)'
          }
        }
      }
    ]
  };
  myChart.value.setOption(option);
  // 让图表跟随屏幕自动的去适应
  window.addEventListener('resize', function() {
    myChart.value.resize();
  });
};

const getData = () => {
  apiYgfAlarmInfoObj.postFindEventInfoPageStatistic(props.exportParams!).then(res => {
    statisticResult.value = res.data;
    renderChart();
  });
};
onMounted(() => {
  nextTick(() => {
    getData();
  });
});

onUnmounted(() => {
  if (myChart.value) myChart.value.dispose();
});
</script>
<style lang="scss">
.result-total-body {
  background: #f6f9fb;
}

.echart-container {
  width: 100%;
  height: 100%;
}
.chart-legend {
  position: absolute;
  right: calc(var(--lg) * 2);
  top: calc(var(--lg) * 2);
  .hl-row > * {
    padding-right: calc(var(--row-gap-x) * 0.8);
  }
}
.point {
  width: calc(var(--lg) * 0.3);
  height: calc(var(--lg) * 0.3);
  border-radius: calc(var(--lg) * 0.3);
  position: absolute;
  top: calc(var(--xxs) * 2.8);
  left: calc(var(--xxs) * 3);
}
</style>
