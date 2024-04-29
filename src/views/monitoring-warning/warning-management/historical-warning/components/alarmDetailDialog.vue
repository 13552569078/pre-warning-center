<template>
  <div class="alarm-detail">
    <hl-dialog show-close append-to-body v-model="dialogVisible" v-if="dialogVisible" width="820px" header-class="border-transparent" padding="var(--xxl)" :body-class="['display-flex', 'items-left', 'items-top', 'flex-col', 'gap-lg', 'p-t-none', 'my-content', 'bg-light', 'not-footer-dialog']" body-style="padding-top: 0px;">
      <template #title>
        <div class="panel-title">
          <!-- <hl-group align="items-left items-middle" class="static" gap="var(--lg)" full-x>
            <hl-group v-for="item in tabList" :key="item.id" style="padding-top: 7px; padding-bottom: 7px" :style="{ '--border-bottom-width': item.activate ? '2px' : 'none' }" :class="[item.activate ? 'border-bottom' : '', 'solid', 'border-primary', 'static', 'cursor-pointer']" align="items-left items-middle" gap="var(--xs)" @click="changeTab(item)">
              <span class="font-md" :class="[item.activate ? 'text-primary' : 'text-regular', item.activate ? 'font-bold' : '', 'text-center']" v-if="item.show">
                {{ item.name }}
              </span>
            </hl-group>
          </hl-group> -->
          <hl-radio-group v-model="tabName" style="height: 48px" custom gap="0px" class="radio-tabs">
            <hl-radio v-for="item in tabList.filter(item => item.show)" :key="item.id" :label="item.name">
              <hl-button>{{ item.name }}</hl-button>
            </hl-radio>
          </hl-radio-group>
        </div>
      </template>
      <div v-if="tabName === '预警信息'" class="w-full bg-content p-lg">
        <common-detail :detail-opt="detailOpt" count="count-3" only-info customBodyClass="dialog-no-600">
          <template #disseminationOptions>
            <span class="font-bold" v-if="detailOpt.data.disseminationOptions && detailOpt.data.disseminationOptions.length === 1 && detailOpt.data.disseminationOptions[0] === '0'">无需转发</span>
            <template v-else>
              <span class="font-bold" v-for="(item, index) in detailOpt.data.disseminationOptions" :key="index">{{ index > 0 ? ', ' : '' }}{{ item === '1' ? '事件中心' : '第三方系统' }}</span>
            </template>
          </template>
          <template #endAlarmType>
            <span class="font-bold" v-if="detailOpt.data.endAlarmType === 2">{{ '手动消警' }}</span>
            <span class="font-bold" v-else-if="detailOpt.data.endAlarmType === 1">{{ '策略消警' }}</span>
            <span class="font-bold" v-else>{{ '--' }}</span>
          </template>
           <template #endAlarmReason>
            <span class="font-bold" v-if="detailOpt.data.endAlarmType === 2" style="word-break: break-all">{{ detailOpt.data.endAlarmReason }}</span>
            <span class="font-bold" v-else>{{ '--' }}</span>
          </template>
        </common-detail>
      </div>
      <hl-group v-if="tabName === '指标数据'" class="w-full bg-content p-l-lg p-r-lg-p-b-lg" dir="vertical">
        <table-list :data="tableData" v-if="tableData.length" />
        <!-- <multiple-charts :charts-data="chartsData" v-if="chartsData.yAxisData.length"/> -->
        <hb-empty description="暂无数据" v-else />
        <div style="color: rgba(128, 128, 160, 0.65)" class="m-b-xs">( 注：系统仅提供查询近30天指标数据的功能 )</div>
      </hl-group>
      <hl-group v-if="tabName === '预警策略'" class="w-full bg-light" dir="vertical">
        <!-- 周期 -->
        <template v-if="strategyDetail?.triggerType === TRIGGER_CYCLE">
          <cycle-detail :id="strategyDetail?.monitorStrategyId" source="history" :latestVersion="strategyVersionId" :strategy-rule-code="strategyRuleCode"></cycle-detail>
        </template>
        <!-- 数据触发 -->
        <template v-if="strategyDetail?.triggerType === TRIGGER_DATA">
          <!-- <trigger-detail :id="strategyDetail?.monitorStrategyId" source="history" :latestVersion="strategyVersionId"></trigger-detail> -->
          <cycle-detail :id="strategyDetail?.monitorStrategyId" source="history" :latestVersion="strategyVersionId" :strategy-rule-code="strategyRuleCode"></cycle-detail>
        </template>
        <!-- 二次预警 -->
        <template v-if="strategyDetail?.triggerType === TRIGGER_SECOND">
          <second-detail :id="strategyDetail?.monitorStrategyId" source="history" :latestVersion="strategyVersionId" :strategy-rule-code="strategyRuleCode"></second-detail>
        </template>
        <!-- 高级预警 -->
        <template v-if="strategyDetail?.triggerType === TRIGGER_SENIOR">
          <advanced-detail :id="strategyDetail?.monitorStrategyId" source="history" :latestVersion="strategyVersionId" :strategy-rule-code="strategyRuleCode"></advanced-detail>
        </template>
      </hl-group>
    </hl-dialog>
  </div>
</template>
<script lang="ts" setup name="historyDataDialog">
import { ref, reactive, watch } from 'vue';
// import * as echarts from 'echarts';
import { pick } from 'lodash-es';
import { apiDictObj as dictApi } from '@/apis/modules/dict-api';
import { apiAlarmManageObj as api } from '@/apis/modules/alarm-manage';
import { IgetFindAlarmTargetDataListSpace } from '@/apis/modules/alarm-manage/model';
import { apiMonitorStrategyObj } from '@/apis/modules/monitor-strategy/fixed-cycle'; // 策略
import { IgetFindMonitorStrategyVersionDetailSpace } from '@/apis/modules/monitor-strategy/fixed-cycle/model'; // 策略
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { TRIGGER_CYCLE, TRIGGER_DATA, TRIGGER_SECOND, TRIGGER_SENIOR } from '@/views/monitoring-config/alarm-strategy-config/utils';
import { Indexable } from 'fx-front-utils';
import TableList from './targetDataTableList.vue';
// import CycleDetail from './cycle-detail.vue';
import CycleDetail from '@/views/monitoring-config/details/index.vue'; // 周期详情
import triggerDetail from '@/views/monitoring-config/data-trigger-config/details/index.vue'; // 数据触发详情
import secondDetail from '@/views/monitoring-config/second-trigger-config/details/index.vue'; // 二次预警详情
import advancedDetail from '@/views/monitoring-config/advanced-strategy-config/details/index.vue'; // 二次预警详情

const props = defineProps({
  showJudgeInfo: {
    type: Boolean,
    default: false
  }
});

const alarmId = ref();
const tabList = ref([
  {
    id: 1,
    name: '预警信息',
    show: true,
    activate: true
  },
  {
    id: 2,
    show: true,
    name: '指标数据',
    activate: false
  }
]);
const tabName = ref('预警信息');
const strategyVersionId = ref('');
const strategyRuleCode = ref('');

const frequencyUnits = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const strategyRuleList = ref<any[]>([]);
const strategyDetail = ref<IgetFindMonitorStrategyVersionDetailSpace.Data>();
// const versionName = ref();

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
      label: '预警标题',
      key: 'alarmTitle'
    },
    {
      label: '预警等级',
      key: 'alarmLevelName'
    },
    {
      label: '风险分类',
      key: 'eventTypeName'
    },
    {
      label: '预警状态',
      key: 'alarmStateName'
    },
    {
      label: '处置状态',
      key: 'handleStatusName'
    },
    {
      label: '预警时间',
      key: 'startTime'
    },
    {
      label: '研判方式',
      key: 'judgeOptionName'
    },
    {
      label: '预警地点',
      key: 'alarmAddress',
      span: 'col-span-2'
    },
    {
      label: '行政区划',
      key: 'areaCodeName'
    },
    {
      label: '消警时间',
      key: 'endTime'
    },
    {
      label: '消警方式',
      key: 'endAlarmType',
      slot: 'endAlarmType'
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
      label: '预警转发',
      key: 'disseminationOptions',
      slot: 'disseminationOptions'
    },
    {
      label: '预警描述',
      key: 'alarmDesc',
      span: 'col-span-3'
    },
    {
      label: '消警原因',
      key: 'endAlarmReason',
      slot: 'endAlarmReason',
      span: 'col-span-3'
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
  imageVideoOpt: {
    show: true,
    title: '相关附件',
    list: [] as any[]
  },
  fileOpt: {
    show: false,
    title: '相关附件',
    list: [
      {
        name: '预警信息文件',
        id: '111',
        url: 'https://img2.baidu.com/it/u=3034424798,1226084080&fm=253&fmt=auto&app=138&f=JPEG?w=658&h=452'
      },
      {
        name: '预警信息2022-10-12 火灾预警',
        id: '1112',
        url: 'https://img2.baidu.com/it/u=3034424798,1226084080&fm=253&fmt=auto&app=138&f=JPEG?w=658&h=452'
      }
    ]
  },
  data: {} as Indexable<any>
});

if (props.showJudgeInfo) {
  detailOpt.cols = detailOpt.cols.concat(detailOpt.judgeCols);
}

const getstrategyDetail = async ({ ruleCode, strategyId, versionId }: { ruleCode: string; strategyId: string; versionId: string }) => {
  if (strategyId === '0' || versionId === '0') {
    strategyRuleList.value = [];
    return false;
  } else {
    // const { data: data1 } = await apiMonitorStrategyObj.getFindMonitorStrategyVersionVO(versionId);
    // versionName.value = data1.versionName;
    const { data } = await apiMonitorStrategyObj.getFindMonitorStrategyVersionDetail(versionId, strategyId);
    strategyDetail.value = data;
    // 如果是二次预警则过滤掉指标数据
    if (data.triggerType === 'TRIGGER_SECOND') tabList.value = tabList.value.filter(item => item.name !== '指标数据');
    // strategyRuleList.value = data.strategyRuleVOS.filter(item => {
    //   return item.ruleCode === ruleCode;
    // });
  }
};
const getAlarmInfo = async (id: string) => {
  const { data } = await api.getAlarm(id);
  detailOpt.data = data;
  // 回显图片/视频
  detailOpt.imageVideoOpt.list =
    data.attachments && data.attachments.length
      ? data.attachments.map(item => {
        return {
          ...item,
          id: item.fileId,
          name: item.originalName,
          url: item.url,
          attachmentType: item.attachmentType
        };
      })
      : [];
  // 获取策略详情
  getstrategyDetail(pick(data, 'ruleCode', 'strategyId', 'versionId'));
  strategyVersionId.value = data.versionId;
  strategyRuleCode.value = data.ruleCode;
};

const openDialog = async (row: any, source: string) => {
  // source  third 三方预警详情 没有指标数据
  alarmId.value = row.id;
  dialogVisible.value = true;
  chartsData.value = {
    xAxisData: [],
    yAxisData: [] // {name: '', unitName: '', values: []}
  };
  // 预警信息
  tabList.value = [
    {
      id: 1,
      show: true,
      name: '预警信息',
      activate: true
    },
    {
      id: 2,
      show: source !== 'third',
      name: '指标数据',
      activate: false
    },
    {
      id: 3,
      show: source !== 'third',
      name: '预警策略',
      activate: false
    }
  ];
  tabName.value = '预警信息';
  getAlarmInfo(row.id); // 获取预警信息接口

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
