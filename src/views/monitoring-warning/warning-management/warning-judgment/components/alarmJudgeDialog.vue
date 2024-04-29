<template>
  <hl-dialog show-close v-model="dialogVisible" title="预警研判" width="1307px" header-class="border-transparent"
    body-class="display-flex items-left items-top flex-col gap-lg bg-light" body-padding="24px" destroy-on-close
    @close="emit('refreshList')">
    <hl-group full class="w-full" gap="var(--md)">
      <hl-group align class="static" style="width: 380px" dir="vertical" gap="var(--lg)" full>
        <hl-panel class="w-full border solid border-transparent static" padding="var(--xl)"
          header-class="border-transparent"
          body-class="display-flex items-left items-middle flex-row gap-md p-b-xl p-x-xl" body-style="padding-top: 0px;">
          <template #header>
            <div class="panel-header-left">
              <hl-icon class="static" type="primary" size="md">
                <FillOrnamentTitle4></FillOrnamentTitle4>
              </hl-icon>
            </div>
            <div class="panel-title">
              <h5 class="text-title w-full">研判操作</h5>
            </div>
          </template>
          <template #default>
            <hl-form :model="judgeFormData" :disabled="judgeStatus === 1 || judgeType === 1" ref="ruleFormRef"
              :rules="rules" class="w-full" gap="var(--md)" style="--form-label-color: var(--text-regular)">
              <hl-group align="items-left" class="w-full" gap="var(--md)" full
                style="--form-label-color: var(--text-regular)">
                <hl-form-item class="w-full" label="研判结果" prop="judgeStatusCode">
                  <hl-group align="items-left" class="w-full" dir="vertical" full>
                    <hl-radio-group v-model="judgeFormData.judgeStatusCode" style="padding-top: 5px; padding-bottom: 5px"
                      align="items-left items-middle" class="w-full" gap="var(--xl)">
                      <hl-radio :label="REAL_ALARM">
                        <span class="checked:text-primary">真实</span>
                      </hl-radio>
                      <hl-radio class="checked:text-primary" :label="FAKE_ALARM">
                        <span class="checked:text-primary">误报</span>
                      </hl-radio>
                    </hl-radio-group>
                  </hl-group>
                </hl-form-item>
                <hl-form-item v-if="judgeFormData.judgeStatusCode === REAL_ALARM" class="w-full" label="新预警等级"
                  prop="alarmLevelCode">
                  <hl-group align="items-top" class="w-full" full>
                    <uni-selector ref="newSearchAlarmLevelRef" v-model="judgeFormData.alarmLevelCode"
                      dictType="ALARM_LEVEL_CODE" />
                  </hl-group>
                </hl-form-item>
              </hl-group>
              <hl-group v-if="judgeFormData.judgeStatusCode === REAL_ALARM" align="items-left" class="w-full"
                gap="var(--md)" full style="--form-label-color: var(--text-regular)">
                <hl-form-item class="w-full" label="处置规则">
                  <hl-group align="items-left" class="w-full" dir="vertical" full>
                    <hl-radio-group v-model="judgeFormData.endEventCode" style="padding-top: 5px; padding-bottom: 5px"
                      align="items-left items-middle" class="w-full" gap="var(--xl)">
                      <hl-radio :label="NO_NEED_TO_HANDLE">
                        <span class="checked:text-primary">无需处置</span>
                      </hl-radio>
                      <hl-radio :label="NEED_HANDLE">
                        <span class="checked:text-primary">事件中心处置</span>
                      </hl-radio>
                    </hl-radio-group>
                  </hl-group>
                </hl-form-item>
              </hl-group>
              <hl-form-item class="w-full" label="描述">
                <hl-group align="items-left" class="w-full" dir="vertical" full>
                  <hl-input v-model="judgeFormData.judgeDesc" native-type="textarea" block placeholder="请输入描述"
                    maxlength="200" show-word-limit></hl-input>
                </hl-group>
              </hl-form-item>
              <hl-form-item>
                <hl-group align="items-left items-middle" gap="var(--md)">
                  <hl-button class="static" style="width: 80px" type="main" @click="submitForm">保存</hl-button>
                  <hl-button class="static" style="width: 80px" @click="resetJudgeFormData">取消</hl-button>
                </hl-group>
              </hl-form-item>
            </hl-form>
          </template>
        </hl-panel>
        <hl-panel class="w-full" padding="var(--xl)" header-class="border-transparent"
          body-class="display-flex items-left items-middle flex-row gap-md p-b-xl p-x-xl" body-style="padding-top: 0px;">
          <template #header>
            <div class="panel-header-left">
              <hl-icon class="static" type="primary" size="md">
                <FillOrnamentTitle4></FillOrnamentTitle4>
              </hl-icon>
            </div>
            <div class="panel-title">
              <h5 class="text-title w-full">预警详情</h5>
            </div>
          </template>
          <common-detail :detail-opt="detailOpt" :only-info="true" count="count-4" />
        </hl-panel>
        <hl-panel class="w-full" padding="var(--xl)" header-class="border-transparent"
          body-class="display-flex items-left items-middle flex-row gap-md p-b-xl p-x-xl" body-style="padding-top: 0px;">
          <template #header>
            <div class="panel-header-left">
              <hl-icon class="static" type="primary" size="md">
                <FillOrnamentTitle4></FillOrnamentTitle4>
              </hl-icon>
            </div>
            <div class="panel-title">
              <h5 class="text-title w-full">监测设备</h5>
            </div>
          </template>
          <!--    设备列表      -->
          <div>
            <hl-tag :type="item.equipType ? 'primary' : 'success'" effect="light" v-for="item in equipList" :key="item.id"
              :class="['m-r-sm m-b-sm', item.equipType ? 'cursor-pointer' : '']"
              @click="openVideo(item)">{{ item.equipName }}</hl-tag>
          </div>

        </hl-panel>
      </hl-group>
      <hl-group align="items-top" class="w-full" dir="vertical" gap="var(--lg)" full-x>
        <hl-group class="p-lg bg-content w-full" align="items-left" dir="vertical" gap="var(--sm)" full-x>
          <hl-form class="w-full" inline gap="var(--lg)" item-gap="var(--sm)"
            style="--form-label-color: var(--text-regular)">
            <hl-form-item label="风险分类">
              <hl-group align="items-left items-top">
                <event-type-selector v-model="searchFormData.eventTypeCode" body-class="w-md" ref="searchEventTypeRef"
                  :use-for="1" />
              </hl-group>
            </hl-form-item>
            <hl-form-item label="预警等级">
              <hl-group align="items-left items-top">
                <uni-selector ref="searchAlarmLevelRef" body-class="w-sm" v-model="searchFormData.alarmLevel"
                  dictType="ALARM_LEVEL_CODE" style="width: 202px" />
              </hl-group>
            </hl-form-item>
            <hl-form-item>
              <hl-group align="items-left items-middle" gap="var(--md)">
                <hl-button class="static" style="width: 80px" @click="clearRightSearch">重置</hl-button>
                <hl-button class="static" style="width: 80px" type="main" @click="queryRightData">查询</hl-button>
              </hl-group>
            </hl-form-item>
          </hl-form>
        </hl-group>

        <hl-panel class="w-full content" borderless style="--panel-header-height: 74px" padding="var(--lg)"
          header-class="bg-content" body-class>
          <template #header>
            <div class="panel-header-left">
              <hl-icon class="static" type="primary" size="md">
                <FillOrnamentTitle4></FillOrnamentTitle4>
              </hl-icon>
            </div>
            <div class="panel-title">
              <h4 class="text-title w-full">预警发生趋势</h4>
            </div>
            <div class="panel-header-right">
              <hl-group v-for="item in dateList" :key="item.id"
                :class="['p-x-sm', item.bg, 'radius-md', 'cursor-pointer']" @click="changeDateList(item)"
                style="padding-top: 5px; padding-bottom: 5px" align="items-left items-middle" gap="var(--xs)"><span
                  :class="[item.color, 'text-center']">{{ item.name }}</span></hl-group>
            </div>
          </template>
          <template #default>
            <hl-group align="items-left items-top" class="w-full" dir="vertical" full>
              <hl-group align="items-left items-middle" gap="var(--sm)" class="w-full" full>
                <div ref="chartContainer" id="alarm-trend" style="width: 100%; height: 300px"></div>
              </hl-group>
            </hl-group>
          </template>
        </hl-panel>
        <hl-panel class="w-full content" borderless style="--panel-header-height: 74px" padding="var(--lg)"
          header-class="bg-content" body-class="p-x-lg" body-style="padding-top: 0px; padding-bottom: 0px;"
          footer-class="gap-md">
          <template #header>
            <div class="panel-header-left">
              <hl-icon class="static" type="primary" size="md">
                <FillOrnamentTitle4></FillOrnamentTitle4>
              </hl-icon>
            </div>
            <div class="panel-title">
              <hl-group full>
                <h4 class="text-title w-full">预警历史数据</h4>
                <hl-date-picker @change="getAlarmLogList" v-model="historySearchTime" format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" range-separator="至"
                  type="daterange" placeholder="选择启用时间" block />
              </hl-group>
            </div>
          </template>
          <hl-simple-table :cols="cols" :data="tableData" border="border-x" fixed-header class="m-b-lg" size="md">
            <template #tableIndex="{ rowIndex }">
              <span>{{ rowIndex + 1 }}</span>
            </template>
            <template #alarmState="{ row }">
              <tag-warning v-if="row.alarmState == 0" />
              <tag-unwarned v-else />
            </template>
          </hl-simple-table>
          <template #footer>
            <hl-pagination :total="pagination.total" block align="items-left items-middle"
              @current-change="handleCurrentChange" layout="prev,pager,next"></hl-pagination>
          </template>
        </hl-panel>
      </hl-group>
    </hl-group>
    <hl-dialog v-model="dialogVisible2" title="查看" width="600px" append-to-body>
      <video v-if="dialogVisible2" :src="require('@/assets/test.mp4')" class="item-thumb w-full" controls></video>
    </hl-dialog>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, nextTick, reactive, watch } from 'vue';
import * as echarts from 'echarts';
import { Indexable } from 'fx-front-utils';
import { apiAlarmManageObj as api } from '@/apis/modules/alarm-manage';
import { IgetFindHistoryAlarmTrendSpace, IgetFindMonitorUnitEquipsSpace } from '@/apis/modules/alarm-manage/model';
import UniSelector from '@/views/monitoring-config/components/universal-dict-selector.vue';
import EventTypeSelector from '@/views/monitoring-config/components/risk-type.vue';
import { HlMessageBox, HlMessage } from 'hongluan-ui';
// import videoUrl from '@/assets/test.mp4';

const emit = defineEmits(['refreshList']);
const REAL_ALARM = 1; // 真实预警
const FAKE_ALARM = 2; // 误报
const NEED_HANDLE = 1; // 需要处置
const NO_NEED_TO_HANDLE = 0; // 无需处置

let alarmId = '';
let monitorUnitId = '';
let timeRange = 'DAY';
const judgeFormData = ref({
  alarmId: alarmId,
  judgeStatusCode: null,
  alarmLevelCode: '',
  endEventCode: 1,
  judgeDesc: ''
});
const resetJudgeFormData = () => {
  judgeFormData.value = {
    alarmId: alarmId,
    judgeStatusCode: null,
    alarmLevelCode: '',
    endEventCode: 1,
    judgeDesc: ''
  };
  resetForm();
};
const ruleFormRef = ref();

watch(
  () => judgeFormData.value.judgeStatusCode,
  (status: number | null) => {
    // 误报，则处置规则设为「无需处置」
    if (status === FAKE_ALARM) {
      judgeFormData.value.endEventCode = NO_NEED_TO_HANDLE;
    } else if (status === REAL_ALARM) {
      judgeFormData.value.endEventCode = NEED_HANDLE;
    }
  }
);

const submitForm = () => {
  ruleFormRef.value.validate((valid: any) => {
    if (valid) {
      judgeFormData.value.alarmId = alarmId;
      api.postJudgeAlarm(judgeFormData.value).then(res => {
        HlMessageBox.confirm('预警信息已研判保存成功！', '提示', {
          confirmButtonText: '继续查看',
          confirmButtonType: 'main',
          cancelButtonText: '关闭窗口',
          type: 'success'
        })
          .then(() => {
            console.log(res);
          })
          .catch(() => {
            dialogVisible.value = false;
            emit('refreshList');
          });
      });
    } else {
      console.log('error submit!!');
      return false;
    }
  });
};
const resetForm = () => {
  ruleFormRef.value.resetFields();
};
const rules = ref({
  judgeStatusCode: [{ required: true, message: '请选择研判结果', trigger: 'change' }],
  alarmLevelCode: [{ required: true, message: '请选择新预警等级', trigger: 'change' }]
});
const detailOpt = reactive({
  cols: [
    {
      label: '预警标题',
      key: 'alarmTitle',
      span: 'col-span-3'
    },
    {
      label: '预警等级',
      key: 'alarmLevelName',
      span: 'col-span-2'
    },
    {
      label: '风险分类',
      key: 'eventTypeName',
      span: 'col-span-2'
    },
    {
      label: '预警时间',
      key: 'startTime',
      span: 'col-span-2'
    },
    {
      label: '预警状态',
      key: 'alarmStateName',
      span: 'col-span-2'
    },
    {
      label: '预警地点',
      key: 'alarmAddress',
      span: 'col-span-3'
    },
    {
      label: '预警描述',
      key: 'alarmDesc',
      span: 'col-span-3'
    }
  ],
  data: {} as Indexable<any>
});
const getAlarmInfo = async (id: string) => {
  const result = await api.getAlarm(id);
  detailOpt.data = result.data;
  monitorUnitId = result.data.monitorUnitId!;
  if (monitorUnitId !== '--') {
    getHistoryAlarmTrend();
    getAlarmLogList();
    getEquipList();
  }
};
const searchFormData = ref({
  eventTypeCode: '',
  alarmLevel: '',
  timeRange: ''
});
const historySearchTime = ref([]); // 指标历史数据 时间
const searchEventTypeRef = ref();
const clearRightSearch = () => {
  searchFormData.value = {
    eventTypeCode: '',
    alarmLevel: '',
    timeRange: ''
  };
  searchEventTypeRef.value?.clearValue();
  queryRightData();
};
const queryRightData = () => {
  getHistoryAlarmTrend();
  getAlarmLogList();
};
// 时间范围 HOUR 按时 DAY 按日 MONTH 按月
const dateList = ref([
  {
    id: 'HOUR',
    name: '时',
    bg: 'bg-transparent',
    color: 'text-regular',
    active: false
  },
  {
    id: 'DAY',
    name: '日',
    bg: 'bg-primary',
    color: 'text-inverse',
    active: true
  },
  {
    id: 'MONTH',
    name: '月',
    bg: 'bg-transparent',
    color: 'text-regular',
    active: false
  }
]);
const changeDateList = (item: { id: string; bg: string; color: string }) => {
  timeRange = item.id;
  dateList.value.forEach(date => {
    if (item.id === date.id) {
      date.bg = 'bg-primary';
      date.color = 'text-inverse';
      date.active = true;
    } else {
      date.bg = 'bg-transparent';
      date.color = 'text-regular';
      date.active = false;
    }
  });
  getHistoryAlarmTrend();
};

let trendList: IgetFindHistoryAlarmTrendSpace.Data = {
  timeList: [],
  historyAlarmTrendItemVOList: []
};
const getHistoryAlarmTrend = async () => {
  const params = {
    unitId: monitorUnitId || '1571823302426447873',
    timeRange,
    eventTypeCode: searchFormData.value.eventTypeCode,
    alarmLevel: searchFormData.value.alarmLevel
  };
  const { data } = await api.getFindHistoryAlarmTrend(params);
  trendList = data;
  renderChart();
};
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
});
const handleCurrentChange = (val: number) => {
  console.log(`当前页: ${val}`);
  pagination.currentPage = val;
  getAlarmLogList();
};
const tableData = ref();
const getAlarmLogList = async () => {
  const result = await api.getFindAlarmLogPage({
    ...pagination,
    monitorUnitId: monitorUnitId || '1571823302426447873',
    eventTypeCode: searchFormData.value.eventTypeCode,
    alarmLevel: searchFormData.value.alarmLevel,
    startTime: Object.prototype.toString.call(historySearchTime.value) === '[object Array]' ? historySearchTime.value[0] : '',
    endTime: Object.prototype.toString.call(historySearchTime.value) === '[object Array]' ? historySearchTime.value[1] : ''
  });
  tableData.value = result.data.list;
  pagination.total = result.data.totalRow;
};
const cols = ref([
  { title: '', slotName: 'tableIndex', width: 'fit-content', },
  { title: '预警标题', prop: 'alarmTitle', showTooltip: true, tooltipProps: { minWidth: '240px' } },
  { title: '预警等级', prop: 'alarmLevelName', showTooltip: true, tooltipProps: { minWidth: '240px' } },
  { title: '预警开始时间', prop: 'startTime', minWidth: '10rem' },
  { title: '风险分类', prop: 'eventTypeName', showTooltip: true, tooltipProps: { minWidth: '240px' } },
  { title: '预警状态', prop: 'alarmState', slotName: 'alarmState', minWidth: '8em' }
]);
const dialogVisible = ref(false);
const renderChart = () => {
  let chartDom = echarts.getInstanceByDom(document.getElementById('alarm-trend'));
  if (chartDom == null) {
    chartDom = echarts.init(document.getElementById('alarm-trend'));
  }
  const option = {
    tooltip: {
      show: true
    },
    grid: {
      top: 10,
      bottom: '25%'
    },
    xAxis: {
      type: 'category',
      data: trendList.timeList,
      name: '预警日期',
      axisLabel: {
        rotate: 40
      }
    },
    yAxis: {
      type: 'value',
      name: '预警数（件）',
      minInterval: 1
    },
    series: [
      {
        data: trendList.historyAlarmTrendItemVOList.map(item => item.alarmNumber),
        type: 'line',
        symbol: 'emptyCircle',
        symbolSize: 4,
        smooth: true,
        lineStyle: {
          color: '#36a4ff'
        },
        itemStyle: {
          borderWidth: 2,
          color: '#36a4ff',
          borderColor: '#36a4ff'
        }
      }
    ]
  };

  option && chartDom.setOption(option);
};
const judgeStatus = ref(0);
const judgeType = ref(3);
const openDialog = (row: { id: string; monitorUnitId: string; judgeStatus: number }) => {
  console.log(row);
  judgeStatus.value = row.judgeStatus;
  judgeType.value = row.judgeType;
  alarmId = row.id;
  // monitorUnitId = row.monitorUnitId;
  dialogVisible.value = true;
  nextTick(() => {
    getAlarmInfo(alarmId);
  });
};

/* [
  {
    "id": 0,
    "equipName": "",
    "equipType": 0,
    "equipCode": "",
    "equipTypeCode": "",
    "equipTypeCodeName": ""
  }
] */
const equipList = ref<IgetFindMonitorUnitEquipsSpace.Data[]>([
  /* {
    'id': 1,
    'equipName': '南门视频1',
    'equipType': 0,
    'equipCode': '',
    'equipTypeCode': '',
    'equipTypeCodeName': ''
  },
  {
    'id': 2,
    'equipName': '南门视频2',
    'equipType': 0,
    'equipCode': '',
    'equipTypeCode': '',
    'equipTypeCodeName': ''
  },
  {
    'id': 3,
    'equipName': '南门雨量计1',
    'equipType': 0,
    'equipCode': '',
    'equipTypeCode': '',
    'equipTypeCodeName': ''
  },
  {
    'id': 4,
    'equipName': '南门雨量计2',
    'equipType': 0,
    'equipCode': '',
    'equipTypeCode': '',
    'equipTypeCodeName': ''
  },
  {
    'id': 5,
    'equipName': '南门雨量计2',
    'equipType': 0,
    'equipCode': '',
    'equipTypeCode': '',
    'equipTypeCodeName': ''
  },
  {
    'id': 6,
    'equipName': '南门雨量计2',
    'equipType': 0,
    'equipCode': '',
    'equipTypeCode': '',
    'equipTypeCodeName': ''
  } */
]);
const getEquipList = async () => {
  const { data } = await api.getFindMonitorUnitEquips(monitorUnitId || '1571823302426447873');
  equipList.value = data;
};

const dialogVisible2 = ref(false);
const openVideo = (item: { equipType: any; }) => {
  if (item.equipType) { dialogVisible2.value = true; }
};
defineExpose({ openDialog });
</script>

<style scoped lang="scss">.monitor-data {
  width: 100%;

  .echart-container {
    height: 380px;
    width: 100%;
  }
}</style>
