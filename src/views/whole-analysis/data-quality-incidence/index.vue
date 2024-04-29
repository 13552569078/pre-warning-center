<template>
  <!-- card -->
  <hl-group align gap="var(--lg)" full class="m-b-lg">
    <hl-group style="padding: 28px; background: #ffffff" align="items-left items-middle" class="w-full" gap="var(--xl)">
      <hl-icon size="xxl" fill class="radius-lg bg-success-light-5" effect="light" style="background: #fff0ed" color="#4ebd4e">
        <FillAlert></FillAlert>
      </hl-icon>
      <hl-group align="items-left items-top" dir="vertical" gap="var(--xs)"
        ><span class="text-regular font-bold" style="font-size: 16px; line-height: 24px">数据准确率</span>
        <hl-group align="items-left items-top" gap="var(--lg)">
          <hl-group align="items-left items-middle" gap="10px">
            <h3 class="text-regular">{{ (Number(cardTotalData.alarmAccuracyRate) * 100).toFixed(2) }}</h3>
            <h3 class="text-regular">%</h3>
          </hl-group>
        </hl-group>
      </hl-group>
    </hl-group>
    <hl-group style="padding: 28px; background: #ffffff" align="items-left items-middle" class="w-full" gap="var(--xl)">
      <hl-icon size="xxl" fill class="radius-lg bg-danger-light-5" effect="light" style="background: #fff0ed" color="#FF4D4F">
        <FillAlert></FillAlert>
      </hl-icon>
      <hl-group align="items-left items-top" dir="vertical" gap="var(--xs)"
        ><span class="text-regular font-bold" style="font-size: 16px; line-height: 24px">报警总数</span>
        <hl-group align="items-left items-top" gap="var(--lg)">
          <hl-group align="items-left items-middle" gap="10px">
            <h3 class="text-regular">{{ cardTotalData.alarmNumber }}</h3>
            <span class="text-regular">条</span>
          </hl-group>
        </hl-group>
      </hl-group>
    </hl-group>
    <hl-group style="padding: 28px; background: #ffffff" align="items-left items-middle" class="w-full cursor-pointer" gap="var(--xl)" @click="changeType('WRONG')" :class="[cardType === 'WRONG' ? 'border border-primary-light-1 box-shadow-md ' : null]">
      <hl-icon size="xxl" fill class="radius-lg bg-warning-light-5" effect="light" style="background: #fff7e8" color="#FA8B16">
        <FillAlert></FillAlert>
      </hl-icon>
      <hl-group align="items-left items-top" dir="vertical" gap="var(--xs)"
        ><span class="text-regular font-bold" style="font-size: 16px; line-height: 24px">误报</span>
        <hl-group align="items-left items-top" gap="var(--lg)">
          <hl-group align="items-left items-middle" gap="10px">
            <hl-group align="items-left items-middle" gap="10px">
              <h3 class="text-regular">{{ cardTotalData.notPassAlarmNumber }}</h3>
              <span class="text-regular">条</span>
            </hl-group>
          </hl-group>
        </hl-group>
      </hl-group>
    </hl-group>
    <hl-group style="padding: 28px; background: #ffffff" align="items-left items-middle" class="w-full cursor-pointer" gap="var(--xl)" @click="changeType('TODAY_ALARM')" :class="[cardType === 'TODAY_ALARM' ? 'border border-primary-light-1 box-shadow-md ' : null]">
      <hl-icon size="xxl" fill class="radius-lg" effect="light" style="background: #faf9e0" color="#FFDD00">
        <FillAlert></FillAlert>
      </hl-icon>
      <hl-group align="items-left items-top" dir="vertical" gap="var(--xs)"
        ><span class="text-regular font-lg font-bold">今日报警</span>
        <hl-group align="items-left items-top" gap="var(--lg)">
          <hl-group align="items-left items-middle" gap="10px">
            <h3 class="text-regular">{{ cardTodayData.alarmNumber }}</h3>
            <span class="text-regular">条</span>
          </hl-group>
        </hl-group>
      </hl-group>
    </hl-group>
    <hl-group style="padding: 28px; background: #ffffff" align="items-left items-middle" class="w-full cursor-pointer" gap="var(--xl)" @click="changeType('TODAY_WRONG')" :class="[cardType === 'TODAY_WRONG' ? 'border border-primary-light-1 box-shadow-md ' : null]">
      <hl-icon size="xxl" fill class="radius-lg" effect="light" style="background: #ebf9ff" color="#36A4FF">
        <FillAlert></FillAlert>
      </hl-icon>
      <hl-group align="items-left items-top" dir="vertical" gap="var(--xs)"
        ><span class="text-regular font-lg font-bold">今日误报</span>
        <hl-group align="items-left items-top" gap="var(--lg)">
          <hl-group align="items-left items-middle" gap="10px">
            <h3 class="text-regular">{{ cardTodayData.notPassAlarmNumber }}</h3>
            <span class="text-regular">条</span>
          </hl-group>
        </hl-group>
      </hl-group>
    </hl-group>
  </hl-group>
  <!-- charts -->
  <hl-panel class="w-full solid border-regular m-t-lg" header-style="gap: 0px;" borderless style="--panel-header-height: 64px" padding="var(--lg)" header-class="bg-content" body-class="display-flex items-center items-middle flex-col gap-lg p-t-sm p-b-lg p-x-xl bg-content">
    <template #header>
      <div class="panel-header-left">
        <hl-icon class="static" type="primary" size="md">
          <FillOrnamentTitle4></FillOrnamentTitle4>
        </hl-icon>
      </div>
      <div class="panel-title">
        <h6 class="text-title">近30日报警统计</h6>
      </div>
    </template>
    <template #default>
      <div ref="chartContainer" class="echart-container w-full" style="height: calc(var(--lg) * 14)"></div>
    </template>
  </hl-panel>
  <fx-page-table-v2 ref="tableRef" :cols="cols" :table-data="tableData" class="m-t-xl" :data-fetcher="getData" style="height: calc(var(--lg) * 38)">
    <template #eventTitle="{ row }">
      <hl-group full gap="var(--xs)" align="items-between">
        <hb-text-overflow style="display: inline-block; width: 12em" effect="light">
          <span class="text-primary cursor-pointer" @click="handleShowDetail(row)">{{ row.eventTitle }}</span>
        </hb-text-overflow>
      </hl-group>
    </template>
  </fx-page-table-v2>
  <alarm-detail-dialog ref="alarmDetailDialogRef" />
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import { useEChart } from 'hongluan-hooks';
import { DataFetcherParams } from 'fx-front-framework';
import { dayjs } from 'hongluan-ui';
import { RecordAny } from '@/types';
import alarmDetailDialog from '@/views/monitoring-warning/alarm-management/alarm-list/components/alarmDetailDialog.vue';
import { apiDataQualityIncidenceObj } from '@/apis/modules/whole-analysis/data-quality-incidence';
import { IpostFindEventNotifyPageSpace } from '@/apis/modules/whole-analysis/data-quality-incidence/model';

// WRONG  TODAY_ALARM TODAY_WRONG  查询分类

const { chartContainer, setChartOption } = useEChart();

const tableRef = ref();
const alarmDetailDialogRef = ref();
const cardTotalData = reactive({
  alarmNumber: 0, // 报警总数
  notPassAlarmNumber: 0, // 误报数
  alarmAccuracyRate: 0 // 报警准确率
});
const cardTodayData = reactive({
  alarmNumber: 0, // 今日报警总数
  notPassAlarmNumber: 0 // 今日误报数
});

const cardType = ref('WRONG');
const tableData = ref<IpostFindEventNotifyPageSpace.List[]>([]);
const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex',
    fixed: 'left'
  },
  { title: '报警标题', prop: 'eventTitle', slotName: 'eventTitle', minWidth: '18em', showTooltip: true, tooltipProps: { maxWidth: '340px' }, fixed: { position: 'left', } },
  { title: '监测主体', prop: 'regionName', minWidth: '16em' },
  { title: '报警等级', prop: 'alarmLevelName', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '340px' } },
  { title: '风险分类', prop: 'eventTypeName', minWidth: '8em', showTooltip: true, tooltipProps: { maxWidth: '340px' } },
  { title: '报警时间', prop: 'startTime', minWidth: '12em' },
  { title: '研判状态', prop: 'judgeStatusName', minWidth: '8em' },
  { title: '研判结果', prop: 'judgeResultName', minWidth: '8em' }
]);

const changeType = (type: string) => {
  cardType.value = type;
  tableRef.value?.refresh();
};
const renderChart = async() => {
  const { data } = await apiDataQualityIncidenceObj.getFindAlarmTrend();
  const rateDate = data.alarmTrendItemVOList.map(item => {
    return {
      ...item,
      accuracyRate: item.alarmNumber ? item.accuracyRate : '--' // 准确率 当报警数为0 特殊处理
    };
  });
  const xData = rateDate.map(item => {
    return item.alarmDate.substring(5).replace('-', '.');
  });
  const barData = rateDate.map(item => {
    return item.alarmNumber;
  });
  const max = Math.max(...barData);
  const barMax = max % 5 === 0 ? max : max + (5 - (max % 5));
  const lineData = rateDate.map(item => {
    return (Number(item.accuracyRate) * 100).toFixed(2);
  });
  const option = {
    grid: {
      top: '32',
      left: '0%',
      right: '0%',
      bottom: '20%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },
      extraCssText: 'border-radius: 0;',
      formatter: (params: RecordAny[]) => {
        let result = '';
        const name = params[0].name;
        params.forEach(e => {
          console.log(e);
          result += `<div style="backgroundColor:#fff;borderRaduis:0">
            ${e.marker}
            <span>${e.componentSubType === 'line' ? '报警准确率' : e.seriesName} <span style="font-weight: bold; margin-left: 30px">${e.componentSubType === 'line' ? (isNaN(e.value) ? '--' : e.value + '%') : e.data}</span></span>
          </div> `;
        });
        return `<span style="font-weight: bold;">${name}</span><br/></span>` + result;
      }
    },
    legend: {
      data: ['报警信息', '报警准确率'],
      bottom: 10,
      left: 'center',
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 16,
      textStyle: {
        fontSize: 12,
        color: 'rgba(128, 128, 160, 0.65)'
      }
    },
    xAxis: {
      axisLabel: {
        fontSize: 12,
        color: 'rgba(128, 128, 160, 0.65)',
        lineHeight: 20,
        margin: 5
      },
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(128, 128, 160, 0.15)'
        }
      },
      type: 'category',
      data: xData
    },
    yAxis: [
      {
        name: '报警信息(条)',
        nameTextStyle: {
          padding: [0, 0, 3, 60]
        },
        // splitNumber: ,
        max: barMax,
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: 'rgba(128, 128, 160, 0.15)'
          }
        },
        axisLabel: {
          fontSize: 12,
          color: 'rgba(128, 128, 160, 0.65)',
          lineHeight: 20
        },
        type: 'value'
      },
      {
        name: '报警准确率(%)',
        nameTextStyle: {
          padding: [0, 0, 3, -40]
        },
        max: 100,
        min: 0,
        splitNumber: 5,
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: 'rgba(128, 128, 160, 0.15)'
          }
        },
        axisLabel: {
          fontSize: 12,
          color: 'rgba(128, 128, 160, 0.65)',
          lineHeight: 20
        },
        type: 'value'
      }
    ],
    series: [
      {
        itemStyle: {
          color: '#a5daca'
        },
        symbolSize: 6,
        yAxisIndex: 1,
        // 让曲线更加圆滑
        smooth: true,
        lineStyle: {
          width: 3
        },
        data: lineData,
        type: 'line',
        name: '报警准确率'
      },
      {
        itemStyle: {
          color: '#A3DEFF',
          borderWidth: 0,
          borderColor: '#36A4FF'
        },
        barWidth: 12,
        name: '报警信息',
        data: barData,
        type: 'bar'
      }
    ]
  };
  setChartOption(option);
};
const getData = async({ params, pageSize, currentPage, setTotal }: DataFetcherParams) => {
  const searchParmas = {
    startTime: '',
    endTime: '',
    judgeStatusList: [] as number[]
  };
  if (cardType.value === 'WRONG') {
    searchParmas.startTime = '';
    searchParmas.endTime = '';
    searchParmas.judgeStatusList = [2];
  }
  if (cardType.value === 'TODAY_ALARM') {
    searchParmas.startTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss');
    searchParmas.endTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    searchParmas.judgeStatusList = [1, 2];
  }
  if (cardType.value === 'TODAY_WRONG') {
    searchParmas.startTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss');
    searchParmas.endTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    searchParmas.judgeStatusList = [2];
  }
  const searchParams = {
    pageSize,
    currentPage,
    ...params,
    ...searchParmas
  };
  const { data } = await apiDataQualityIncidenceObj.postFindEventNotifyPage(searchParams);
  tableData.value = data.list;
  setTotal(+data.totalRow);
};
const getCardData = async() => {
  const { data: totalData } = await apiDataQualityIncidenceObj.getFindAlarmQuality();
  const { data: todayData } = await apiDataQualityIncidenceObj.getFindTodayAlarmQuality();
  Object.assign(cardTotalData, totalData);
  Object.assign(cardTodayData, todayData);
};
const handleShowDetail = (row: any) => {
  alarmDetailDialogRef.value.openDialog(row);
};

onMounted(() => {
  getCardData();
  renderChart();
});
</script>
