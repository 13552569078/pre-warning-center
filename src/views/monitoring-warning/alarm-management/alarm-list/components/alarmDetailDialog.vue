<template>
  <div class="alarm-detail">
    <hl-dialog show-close append-to-body v-model="dialogVisible" v-if="dialogVisible" width="820px"
      header-class="border-transparent" padding="var(--xxl)"
      :body-class="['display-flex', 'items-left', 'items-top', 'flex-col', 'gap-lg', 'p-t-none', 'my-content', 'bg-light', 'not-footer-dialog']"
      body-style="padding-top: 0px;">
      <template #title>
        <div class="panel-title">
          <hl-group align="items-left items-middle" class="static" gap="var(--lg)" full-x>
            <hl-group v-for="item in tabList" :key="item.id" style="padding-top: 7px; padding-bottom: 7px"
              :style="{ '--border-bottom-width': item.activate ? '2px' : 'none' }"
              :class="[item.activate ? 'border-bottom' : '', 'solid', 'border-primary', 'static', 'cursor-pointer']"
              align="items-left items-middle" gap="var(--xs)" @click="changeTab(item)">
              <span class="font-md"
                :class="[item.activate ? 'text-primary' : 'text-regular', item.activate ? 'font-bold' : '', 'text-center']"
                v-if="item.show">
                {{ item.name }}
              </span>
            </hl-group>
          </hl-group>
        </div>
      </template>
      <div v-if="tabName === '报警信息'" class="m-t-md w-full bg-content p-lg">
        <common-detail :detail-opt="detailOpt" count="count-3" only-info>
          <template #disseminationOptions>
            <span class="font-bold"
              v-if="detailOpt.data.disseminationOptions && detailOpt.data.disseminationOptions.length === 1 && detailOpt.data.disseminationOptions[0] === '0'">无需转发</span>
            <template v-else>
              <span class="font-bold" v-for="(item, index) in detailOpt.data.disseminationOptions" :key="index">{{ index >
                0 ? ', ' : '' }}{{ item === '1' ? '事件中心' : '第三方系统' }}</span>
            </template>
          </template>
        </common-detail>
      </div>
    </hl-dialog>
  </div>
</template>
<script lang="ts" setup name="historyDataDialog">
import { ref, reactive, watch } from 'vue';
import * as echarts from 'echarts';
import { apiDictObj as dictApi } from '@/apis/modules/dict-api';
import { apiAlarmManageObj as api } from '@/apis/modules/alarm-manage';
import { IgetFindAlarmTargetDataListSpace } from '@/apis/modules/alarm-manage/model';
import { apiMonitorStrategyObj } from '@/apis/modules/monitor-strategy/fixed-cycle'; // 策略
import { IgetFindMonitorStrategyVersionDetailSpace } from '@/apis/modules/monitor-strategy/fixed-cycle/model'; // 策略
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { Indexable } from 'fx-front-utils';

import { apiYgfAlarmInfoObj } from '@/apis/modules/ygf-alarm-info/index';

const props = defineProps({
  showJudgeInfo: {
    type: Boolean,
    default: false
  }
});

const alarmId = ref();
let unitId = '';
const chartDom: echarts.ECharts | null | undefined = null;
const tabList = ref([
  {
    id: 1,
    name: '报警信息',
    show: true,
    activate: true
  }
  /* {
    id: 2,
    show: true,
    name: '指标数据',
    activate: false
  } */
]);
const tabName = ref('报警信息');
const dialogContent = ref();

const frequencyUnits = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const strategyRuleList = ref<any[]>([]);
const strategyDetail = ref<IgetFindMonitorStrategyVersionDetailSpace.Data>();
const versionName = ref();

const changeTab = (item: { id: number; name: string }) => {
  tabName.value = item.name;
  tabList.value.forEach(tab => {
    if (tab.id === item.id) {
      tab.activate = true;
    } else {
      tab.activate = false;
    }
  });
};
const chartsData = ref<{ xAxisData: string[]; yAxisData: { name: string; unitName: string; values: number[] }[] }>({
  xAxisData: [],
  yAxisData: [] // {name: '', unitName: '', values: []}
});
const tableData = ref<IgetFindAlarmTargetDataListSpace.Data[]>([]);
const targetTime = ref([]);
const getTableDataList = async () => {
  const { data } = await api.getFindAlarmTargetDataList(alarmId.value, targetTime.value && targetTime.value.length ? targetTime.value[0] : '', targetTime.value && targetTime.value.length ? targetTime.value[1] : '');
  tableData.value = data;
};
watch(tabName, val => {
  if (val === '指标数据') {
    getTableDataList();
  }
});
const dialogVisible = ref(false);

const detailOpt = reactive({
  cols: [
    {
      label: '报警标题',
      key: 'eventTitle'
    },
    {
      label: '报警等级',
      key: 'alarmLevelName'
    },
    {
      label: '风险分类',
      key: 'eventTypeName'
    },
    // {
    //   label: '报警状态',
    //   key: 'alarmStateName'
    // },
    {
      label: '报警时间',
      key: 'startTime'
    },
    {
      label: '研判方式',
      key: 'judgeOptionName'
    },
    {
      label: '报警地点',
      key: 'eventAddress',
      span: 'col-span-3'
    },
    {
      label: '行政区划',
      key: 'areaCodeName'
    },
    {
      label: '经度',
      key: 'longitude'
    },
    {
      label: '纬度',
      key: 'latitude'
    },
    // {
    //   label: '消警时间',
    //   key: 'endTime'
    // },
    // {
    //   label: '报警转发',
    //   key: 'disseminationOptions',
    //   slot: 'disseminationOptions'
    // },
    {
      label: '处置方式',
      key: 'handleOptionName'
    },
    {
      label: '处置状态',
      key: 'handleStatusName'
    },
    {
      label: '监测主体',
      key: 'regionName'
    },
    {
      label: '监测点',
      key: 'monitorUnitName'
    },
    {
      label: '报警描述',
      key: 'eventDesc',
      span: 'col-span-2'
    },
    {
      label: '监测指标（单位）',
      key: 'targetDataName'
    },
    {
      label: '指标时间',
      key: 'collectTime'
    },
    {
      label: '指标值',
      key: 'dataValue'
    }
  ],
  judgeCols: [
    {
      label: '研判状态',
      key: 'judgeStatusName'
    },
    {
      label: '研判时间',
      key: 'judgeTime'
    },
    {
      label: '研判人',
      key: 'judgeUserName'
    },
    {
      label: '研判结果',
      key: 'judgeResultName'
    },
    {
      label: '研判描述',
      key: 'judgeDesc',
      span: 'col-span-2'
    }
  ],
  // imageVideoOpt: {
  //   show: true,
  //   title: '相关附件',
  //   list: [] as any[]
  // },
  // fileOpt: {
  //   show: false,
  //   title: '相关附件',
  //   list: [
  //     {
  //       name: '报警信息文件',
  //       id: '111',
  //       url: 'https://img2.baidu.com/it/u=3034424798,1226084080&fm=253&fmt=auto&app=138&f=JPEG?w=658&h=452'
  //     },
  //     {
  //       name: '报警信息2022-10-12 火灾报警',
  //       id: '1112',
  //       url: 'https://img2.baidu.com/it/u=3034424798,1226084080&fm=253&fmt=auto&app=138&f=JPEG?w=658&h=452'
  //     }
  //   ]
  // },
  data: {} as Indexable<any>
});

// if (props.showJudgeInfo) {
//   detailOpt.cols = detailOpt.cols.concat(detailOpt.judgeCols);
// }

const getstrategyDetail = async ({ ruleCode, strategyId, versionId }: { ruleCode: string; strategyId: string; versionId: string }) => {
  if (strategyId === '0' || versionId === '0') {
    strategyRuleList.value = [];
    return false;
  } else {
    const { data: data1 } = await apiMonitorStrategyObj.getFindMonitorStrategyVersionVO(versionId);
    versionName.value = data1.versionName;
    const { data } = await apiMonitorStrategyObj.getFindMonitorStrategyVersionDetail(versionId, strategyId);
    strategyDetail.value = data;
    strategyRuleList.value = data.strategyRuleVOS.filter(item => {
      return item.ruleCode === ruleCode;
    });
  }
};
const getAlarmInfo = async (id: string) => {
  const { data } = await apiYgfAlarmInfoObj.getEventInfo(id);
  const result = Object.assign(data, { targetDataName: data.eventTargetDataVO.targetDataName + (data.eventTargetDataVO.measureUnitName ? `(${data.eventTargetDataVO.measureUnitName})` : ''), collectTime: data.eventTargetDataVO.collectTime, dataValue: data.eventTargetDataVO.dataValue, judgeOptionName: data.judgeStatus === 0 ? '--' : '手动研判' });

  detailOpt.data = result;
  // 回显图片/视频
  // detailOpt.imageVideoOpt.list =
  //   data.attachments && data.attachments.length
  //     ? data.attachments.map(item => {
  //       return {
  //         id: item.fileId,
  //         name: item.originalName,
  //         url: item.url,
  //         attachmentType: item.attachmentType
  //       };
  //     })
  //     : [];
  // 获取策略详情
  // getstrategyDetail(pick(data, 'ruleCode', 'strategyId', 'versionId'));
};
const getUnit = (type: string) => {
  return frequencyUnits.value.filter((item: IgetListDictCustomVOsDictSpace.Data) => {
    return item.dictCode === type;
  })[0].dictName;
};
const getIntervalTime = (data: any) => {
  if (data.targetFrequencyUnit === 'DAY') return +data.targetFrequency / 60 / 60 / 24;
  if (data.targetFrequencyUnit === 'HOUR') return +data.targetFrequency / 60 / 60;
  if (data.targetFrequencyUnit === 'MINUTE') return +data.targetFrequency / 60;
  return 0;
};

const openDialog = async (row: any, source: string) => {
  // source  third 三方报警详情 没有指标数据
  console.log(row);
  alarmId.value = row.id;
  unitId = row.monitorUnitId;
  dialogVisible.value = true;
  chartsData.value = {
    xAxisData: [],
    yAxisData: [] // {name: '', unitName: '', values: []}
  };
  // 报警信息
  tabList.value = [
    {
      id: 1,
      show: true,
      name: '报警信息',
      activate: true
    }
    /* {
      id: 2,
      show: source !== 'third',
      name: '指标数据',
      activate: false
    },
    {
      id: 3,
      show: source !== 'third',
      name: '报警策略',
      activate: false
    } */
  ];
  tabName.value = '报警信息';
  getAlarmInfo(row.id); // 获取报警信息接口

  const units = await dictApi.list('MONITOR_FREQUENCY_UNIT');
  frequencyUnits.value = units.data;
};

defineExpose({ openDialog });
</script>

<style scoped lang="scss">
.alarm-detail {
  width: 100%;

  .echart-container {
    height: 600px;
    width: 100%;
  }
}
</style>
