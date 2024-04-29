<template>
  <hl-panel class="w-full" header-style="gap: 0px;" borderless padding="var(--xxs)" header-class="bg-content" body-class="display-flex items-left items-middle flex-row bg-content" style="--panel-header-height: 20px">
    <template #header>
      <div class="panel-header-left m-l-md">
        <hl-icon class="static" type="primary" size="md">
          <FillOrnamentTitle4></FillOrnamentTitle4>
        </hl-icon>
      </div>
      <div class="panel-title">
        <h6 class="text-title">按风险分类分析</h6>
        <hl-icon style="position: absolute;right:50px;top:10px;font-size:20px;" class="cursor-pointer" size="md" @click="load">
          <FillDownload class="cursor-pointer"></FillDownload>
        </hl-icon>
      </div>
    </template>
    <template #default>
      <div ref="chartContainer" id="event-type" class="echart-container w-full" style="height: calc(var(--lg) * 18)"></div>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { useEChart } from 'hongluan-hooks';
import { saveAsImgLoad } from '@/common';

const richColor = ['#899DF0', '#88DBC8', '#7ECDFF', '#FCBF6A', '#FF938D', '#CACFD6', '#899DF0', '#88DBC8', '#7ECDFF', '#FCBF6A', '#FF938D', '#CACFD6'];

const { chartContainer, setChartOption, resizeChart } = useEChart();

const renderChart = (chartsData: { code: string; value: number; name: string; rate: number; itemStyle: any }[]) => {
  const option = {
    // toolbox: {
    //   right: '10%',
    //   feature: {
    //     saveAsImage: {}
    //   }
    // },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      top: 80,
      right: '16%',
      itemGap: 20,
      icon: 'circle',
      formatter: (name: string) => {
        let rate = 0;
        let target;
        for (let i = 0; i < chartsData.length; i++) {
          if (chartsData[i].name === name) {
            target = chartsData[i].value;
            rate = chartsData[i].rate;
          }
        }
        const arr = ['{a|' + name.substr(0, 6) + '}', '{b|' + (rate * 100).toFixed(2) + '%}', '{c|' + target + '}'];
        return arr.join('  ');
      },
      textStyle: {
        padding: [0, 0, 0, 0],
        verticalAlign: 'middle',
        rich: {
          a: {
            fontSize: 14,
            width: 110
          },
          b: {
            fontSize: 14,
            width: 70,
            color: '#4B4B4B'
          },
          c: {
            fontSize: 14
          }
        }
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '80%'],
        center: ['20%', '50%'],
        avoidLabelOverlap: false,
        z: 1,
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        data: chartsData.map((item, index) => {
          item.itemStyle = { color: richColor[index] };
          return item;
        }),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.1)'
          }
        }
      },
      {
        tooltip: {
          show: false
        },
        type: 'pie',
        radius: ['50%', '60%'],
        center: ['20%', '50%'],
        avoidLabelOverlap: false,
        z: 2,
        label: {
          show: false
        },
        data: [{ value: 1, name: '', itemStyle: { color: 'rgba(255, 255, 255, 0.36)' } }]
      }
    ]
  };
  setChartOption(option);
  resizeChart();
};

const load = async() => {
  await saveAsImgLoad('#event-type', '风险分类统计');
};

defineExpose({
  renderChart
});
</script>
