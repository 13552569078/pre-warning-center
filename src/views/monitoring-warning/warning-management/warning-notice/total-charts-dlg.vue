<template>
  <hl-dialog :model-value="true" class="md-dialog total-charts-dlg" body-class="total-charts-dlg-body not-footer-dialog"
             width="720px"
             title="通知统计"
             @close="$emit('cancel')">
    <hl-panel class="w-full m-b-lg" style="width: 100%;"
              body-class="total-charts-dlg-body display-flex items-left items-middle flex-row gap-md"
              body-style="padding: 0px;">
      <template #default>
        <hl-group class="p-sm bg-content w-full" align="items-middle" gap="var(--sm)" full="full-x">
          <hl-icon size="xxl" class="static" type="primary">
            <FillChartBar></FillChartBar>
          </hl-icon>
          <hl-group align="items-between items-middle" class="w-full" gap="var(--xs)"><span
            class="font-lg font-bold static">通知</span>
            <hl-group align="items-left items-top" gap="var(--xxs)">
              <hl-group align="items-left items-middle" gap="var(--xxs)">
                <h3 class="text-primary static">{{statisticResult.number}}</h3><span class="text-secondary static">条</span>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-group>
      </template>
    </hl-panel>

    <hl-panel class="w-full" header-style="gap: 0px;" borderless padding="var(--lg)"
              body-class="display-flex items-left items-middle flex-row gap-xl"
              body-style="padding: 40px;position: relative;">
      <div class="w-full" style="height: calc(var(--lg) * 12)">
        <div ref="chartContainer" class="echart-container" id="historicalChart"></div>
      </div>
      <div style="width: calc(var(--lg) * 15); height: calc(var(--lg) * 8.5);" class="chart-legend">
        <hl-row gap-x="calc(var(--lg) * 3)" gap-y="var(--lg)">
          <hl-col span="col-12" v-for="(item, index) in statisticResult.eventTypeVOs" :key="index" style="position: relative;">
            <div class="point" :style="`background: ${color1[index]}; outline: calc(var(--xxs) * 0.75) solid ${color2[index]};`">
            </div>
            <hl-group align="items-top" dir="vertical" full="full-x">
              <hl-group align="items-left items-middle" class="w-full" gap="10px" full="full-x">
                <div class="text-title font-lg font-bold">{{(item.rate * 100).toFixed(2)}}%</div><span class="text-title font-lg font-bold static">{{item.alarmNumber}}</span>
              </hl-group>
              <div style="color: #808694;--line: 2;" class="ellipsis">{{item.eventTypeName}}</div>
            </hl-group>
          </hl-col>
        </hl-row>
      </div>
    </hl-panel>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import * as echarts from 'echarts';
import { apiWarningTotalObj } from '@/apis/modules/warning-total';
import { apiYgfAlarmInfoObj } from '@/apis/modules/ygf-alarm-info/index';

import { useRoute } from 'vue-router';
const route = useRoute();
let moduleName = '预警';
moduleName = route.meta.title === '报警通知' ? '报警' : '预警';

const props = defineProps({
  exportParams: {
    type: Object
  },
});

const emit = defineEmits(['cancel', 'ok']);

const myChart = ref();

const color1 = ['rgba(1, 205, 162, 1)', 'rgba(135, 180, 255, 1)', 'rgba(123, 124, 255, 1)', 'rgba(56, 131, 248, 1)', 'rgba(153, 236, 218, 1)', 'rgba(214, 220, 235, 1)'];
const color2 = ['rgba(1, 205, 162, 0.45)', 'rgba(135, 180, 255, 0.45)', 'rgba(123, 124, 255, 0.45)', 'rgba(56, 131, 248, 0.45)', 'rgba(153, 236, 218, 0.45)', 'rgba(214, 220, 235, 0.45)'];
const statisticResult = ref({
  'number': 0,
  'eventTypeVOs': [
    // {
    //   'eventTypeCode': '',
    //   'eventTypeName': '',
    //   'alarmNumber': 0,
    //   'rate': 0
    // }
  ]
});
const renderChart = () => {
  myChart.value = echarts.init(document.getElementById('historicalChart')!);
  const option = {
    tooltip: {
      trigger: 'item'
    },
    series: [{
      name: '预警统计',
      type: 'pie',
      radius: ['52%', '80%'],
      center: ['20%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
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
          shadowColor: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    {
      name: '预警统计',
      type: 'pie',
      radius: ['88%', '95%'],
      center: ['20%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
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
          shadowColor: 'rgba(0, 0, 0, 0.1)',
        },
      },
    }],
  };
  myChart.value.setOption(option);
  // 让图表跟随屏幕自动的去适应
  window.addEventListener('resize', function() {
    myChart.value.resize();
  });
};

const getData = () => {
  moduleName === '报警' ? apiYgfAlarmInfoObj.postFindEventNotifyPageStatistic(props.exportParams!).then(res => { statisticResult.value = res.data; renderChart(); }) : apiYgfAlarmInfoObj.postFindAlarmNotifyPageStatistic(props.exportParams!).then(res => { statisticResult.value = res.data; renderChart(); });
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
  .total-charts-dlg-body {
    background: #F6F9FB !important;
  }
</style>
<style lang="scss" scoped>

  .total-charts-dlg {
    .echart-container {
      width: 100%;
      height: 100%
    }
    .chart-legend {
      position: absolute;
      right: calc(var(--lg) * 2);
      top: calc(var(--lg) * 2.5);
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
  }
</style>
