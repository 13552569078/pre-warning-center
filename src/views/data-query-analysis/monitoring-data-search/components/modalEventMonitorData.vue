<template>
  <hl-group v-if="eventMonitorPointData" gap="var(--lg)" full class="h-full p-lg" dir="vertical">
    <hl-group dir="vertical" full class="static" gap="var(--md)">
      <hl-group gap="var(--md)" dir="vertical">
          <h2>{{ eventMonitorPointData.eventTypeName }}</h2>
          <hl-group>
            <hl-group gap="var(--lg)">
              <hl-group gap="var(--sm)" align="items-center items-middle">
                <hl-icon><fill-map /></hl-icon>
                <span>监测指标：{{ eventMonitorPointData.targetName }}</span>
              </hl-group>
              <hl-group gap="var(--sm)" align="items-center items-middle">
                <hl-icon><fill-map /></hl-icon>
                <span>监测点：{{ eventMonitorPointData.monitorPointName}}</span>
              </hl-group>
            </hl-group>
          </hl-group>
          <hr style="margin: 0;" />
          <hl-group gap="var(--sm)" align="items-middle">
            <span>设备：</span>
            <hl-tag v-for="(equit, index) in eventMonitorPointData.monitorEquipNameList" :key="`equip-${index}`">{{ equit }}</hl-tag>
          </hl-group>
      </hl-group>
      <hl-group gap="var(--lg)" full class="" style="height: calc(var(--xs) * 90)">
        <hl-group dir="vertical" align="items-between" style="width: calc(var(--xxs) * 100)">
          <hl-scrollbar>
            <hl-group dir="vertical" full gap="var(--md)">
              <hl-group v-for="factor in eventMonitorPointData.monitorStrategyRuleList"
                        :key="factor.factorId"
                        dir="vertical"
                        full>
                <hl-group full class="m-b-md">
                  <h5 class="p-l-md">{{factor.ruleName}}</h5>
                  <hl-group style="float: right" class="items-right m-r-sm m-t-xxs cursor-pointer">
                    <hl-icon @click="factor.show=false" v-if="factor.show"><TwoChevronBottom /></hl-icon>
                    <hl-icon @click="factor.show=true" v-else><TwoChevronRight /></hl-icon>
                  </hl-group>
                </hl-group>
                <template v-if="factor.show">
                  <hl-group dir="vertical" class="bg-light m-b-md p-md" v-for="(item, index) in factor.strategyRuleFactorVOS" :key="item.factorId">
                    <hl-group full align="items-top">
                      <hl-group dir="vertical" gap="var(--xxs)">
                        <h5>因子{{index + 1}}：{{ item.factorName }}</h5>
                        <span class="text-secondary">计量单位：{{item.measureUnitName}}</span>
                      </hl-group>
                      <hl-tag size="sm" type="primary">{{ item.factorDataTypeName }}</hl-tag>
                    </hl-group>
                    <!-- 这里有三种类型数据 -->
                    <hl-group dir="vertical" full class="m-t-md border-top p-t-md">
                      <hl-row gap="var(--md)">
                        <template v-if="item.factorDataTypeCode==='interzone'">
                          <hl-col :span="12">
                            <span class="text-secondary"> {{item.factorValue[0].lowKey}}：</span>
                            <span class="content">{{getSymbol(item.factorValue[0].lowExpression)}}{{item.factorValue[0].lowValue}}</span>
                          </hl-col>
                          <hl-col :span="12">
                            <span class="text-secondary">{{item.factorValue[0].upKey}}：</span>
                            <span class="content">{{getSymbol(item.factorValue[0].upExpression)}}{{item.factorValue[0].upValue}}</span>
                          </hl-col>
                        </template>
                        <template v-if="['contain','in'].includes(item.factorDataTypeCode)">
                          <hl-col :span="24">
                            <span class="content">{{item.factorValue[0].value}}</span>
                          </hl-col>
                        </template>
                        <template v-if="['switch'].includes(item.factorDataTypeCode)">
                          <hl-col :span="24">
                            <span class="content">{{Number(item.factorValue)===0?'否':'是'}}</span>
                          </hl-col>
                        </template>
                      </hl-row>
                    </hl-group>
                  </hl-group>
                  <hl-group dir="vertical" class="bg-light m-b-md p-md" v-if="factor.monitorFactorValueVOList&&factor.monitorFactorValueVOList.length>1">
                    <hl-group full align="items-top">
                      <hl-group dir="vertical" gap="var(--xxs)">
                        <h5>因子逻辑关系</h5>
                      </hl-group>
                    </hl-group>
                    <hl-group dir="vertical" full class="m-t-md border-top p-t-md">
                      <hl-row gap="var(--md)">
                        <hl-col :span="24">
                          <hl-group class="m-r-xl" :class="factor.ruleLogicRelationship==1?'text-primary':'text-secondary'">
                            <hl-icon size="md" class="m-r-xs" v-if="factor.ruleLogicRelationship==1"><TwoChecked /></hl-icon><hl-icon v-else size="md" class="m-r-xs"><TwoRemove /></hl-icon>与
                          </hl-group>
                          <hl-group :class="factor.ruleLogicRelationship==2?'text-primary':'text-secondary'">
                            <hl-icon size="md" class="m-r-xs"  v-if="factor.ruleLogicRelationship==2"><TwoChecked /></hl-icon><hl-icon v-else size="md" class="m-r-xs"><TwoRemove /></hl-icon>或
                          </hl-group>
<!--                          <hl-radio-group v-model="factor.ruleLogicRelationship" gap="var(&#45;&#45;md)" type="primary" size="md">
                            <hl-radio :label="1">与</hl-radio>
                            <hl-radio :label="2">或</hl-radio>
                          </hl-radio-group>-->
                        </hl-col>
                      </hl-row>
                    </hl-group>
                  </hl-group>
                </template>
              </hl-group>
            </hl-group>
          </hl-scrollbar>
        </hl-group>
        <hl-group full dir="vertical" class="h-full">
          <hb-table-searchbar
            class="static p-b-lg border-bottom no-more-button"
            @change="searchChanged"
            :selector="selector"
            :searcher="searcher"
            padding="0"
            gap="var(--md)">
          <template #suffix>
            <hl-group merge indent class="static">
              <hl-radio-group v-model="tableCharts" custom merge indent @change="changeTableChart">
              <hl-radio :label="1">
                <hl-button size="md">
                  <template #icon>
                    <hl-icon>
                      <TwoAlignJustify />
                    </hl-icon>
                  </template>
                </hl-button>
              </hl-radio>
              <hl-radio :label="2">
                <hl-button size="md">
                  <template #icon>
                    <hl-icon>
                      <TwoChartLine />
                    </hl-icon>
                  </template>
                </hl-button>
              </hl-radio>
            </hl-radio-group>
            </hl-group>
          </template>
            <template #time>
              <hl-date-picker
                v-model="time"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                block
              />
            </template>
          </hb-table-searchbar>

          <hl-scrollbar  style="height: calc(var(--xxl) * 10);width: 100%">
            <hl-simple-table
              fixed-header
              v-if="tableCharts === 1"
              class="borderless-last"
              border="border-x"
              padding="var(--xl)"
              hover
              stripe
              :cols="cols"
              :data="tableData">
              <template #tableIndex="{ rowIndex }">
                <span>{{ rowIndex + 1 }}</span>
              </template>
            </hl-simple-table>
            <markline-chart
              :style="pointIdData!==''?{'max-width': 'calc(var(--lg) * 48.5)'}:{}"
              v-if="tableCharts===2&&lineChartData.length>0"
              :lineChartData="lineChartData"/>
            <hb-empty
              v-if="tableCharts===2&&lineChartData.length===0"
              image-size="20vh"/>
          </hl-scrollbar>
          <!-- <hl-group class="static p-y-lg  border-top" v-if="tableCharts === 1">
            <hl-pagination
              full
              align="items-right"
              layout="prev, pager, next, jumper, sizes"
              :total="tableParams.total"
              :page-size="tableParams.pageSize"
              :current-page="tableParams.currentPage"
              :page-sizes="[10, 20, 30, 50]"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              block
              class="w-full">
            </hl-pagination>
          </hl-group> -->
        </hl-group>
      </hl-group>
    </hl-group>
  </hl-group>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useMonitorCenter } from '@/hooks';
import { Indexable } from 'fx-front-utils';
import { apiSourceDataObj } from '@/apis/modules/access-data';
import {
  IgetListIntervalAlarmMonitorDataSpace,
  IgetListMonitorFactorDataListSpace
} from '@/apis/modules/access-data/model';
import MarklineChart from './markline-chart.vue';

interface COLS {
  title: string,
  prop?: string,
  width?: string|number
  slotName?: string;
  fixed?: string;
}

const props = defineProps({
  alarmDataId: {
    type: String,
    default: ''
  },
  startTime: {
    type: String,
    default: ''
  },
  endTime: {
    type: String,
    default: ''
  },
  pointIdData: {
    type: String,
    default: ''
  }
});

const { eventMonitorPointData, getEventPointData } = useMonitorCenter();

const tableData = ref<any[]>([

]);
const cols = ref<COLS[]>([

]);
const time = ref([]);
const tableParams = reactive({
  'currentPage': 1,
  'pageSize': 10,
  'useFor': 1,
  'alarmDataId': props.alarmDataId,
  'pointId': props.pointIdData,
  'startTime': '',
  'endTime': '',
  total: 0 });
const getListMonitorDataList = async() => {
  const result = await apiSourceDataObj.getListAlarmMonitorData(props.alarmDataId);
  // 处理表格数据
  const table:any[] = [];
  result.data.forEach(item => {
    const col:COLS[] = [
      { title: '', slotName: 'tableIndex', width: 'fit-content', },
      { title: '监测时间', prop: 'monitorTime', minWidth: '120', fixed: 'left' }
    ];
    const tableItem = {
      monitorTime: item.monitorTime,
    };
    item.columnHeaderList.forEach(item2 => {
      col.push(
        { title: '监测因子·' + item2.codeName, prop: item2.code }
      );
      tableItem[item2.code] = item.monitorDataList.filter(item3 => {
        return item3.code === item2.code;
      })[0].value || '--';
    });
    table.push(tableItem);
    cols.value = col;
  });
  tableData.value = table;
};
const lineChartData = ref<IgetListIntervalAlarmMonitorDataSpace.Data[]>([]);
const getListMonitorFactorDataList = async() => {
  const result = await apiSourceDataObj.getListIntervalAlarmMonitorData(props.alarmDataId);
  lineChartData.value = result.data;
};
const tableCharts = ref(1);
const changeTableChart = (type:number) => {
  if (type === 1) {
    getListMonitorDataList();
  } else {
    getListMonitorFactorDataList();
  }
};

const init = () => {
  getEventPointData(props.alarmDataId as string);
  tableParams.startTime = props.startTime as string;
  tableParams.endTime = props.endTime as string;
  getListMonitorDataList();
};

init();

const handleSizeChange = (val:number) => {
  console.log(`每页 ${val} 条`);
  tableParams.pageSize = val;
  getListMonitorDataList();
};
const handleCurrentChange = (val: number) => {
  console.log(`当前页: ${val}`);
  tableParams.currentPage = val;
  getListMonitorDataList();
};

const getSymbol = (expression: string) => {
  const mapper:Indexable<string> = {
    lt: '<',
    gt: '>',
    eq: '=',
    ge: '≥',
    le: '≤'
  };
  return mapper[expression];
};

const pagination = reactive({
  pageSize: 100,
  total: 400,
  currentPage: 1,
  show: false,
});

const originItems = [
  {
    span: 'xl:col-span-2',
    type: 'datetimerange',
    name: 'time',
    value: [props.startTime, props.endTime],
    'is-range': true,
    'range-separator': '至',
    'start-placeholder': '开始时间',
    'end-placeholder': '结束时间',
    'placeholder': '选择时间范围',
    format: 'YYYY-MM-DD HH:mm:ss',
    'value-format': 'YYYY-MM-DD HH:mm:ss',
    disabled: true // TODO 这一版本V4.1.0后端来不及加条件，前端先禁用选择
  },
];
const searchChanged = (urlParams: any, mapParams: any, originalParams: any) => {
  console.log(urlParams, mapParams, originalParams);
  tableParams.startTime = mapParams.timeStart ? mapParams.timeStart : undefined;
  tableParams.endTime = mapParams.timeEnd ? mapParams.timeEnd : undefined;
  changeTableChart(tableCharts.value);
};
const searcher = reactive({
  show: false,
});
const selector = reactive({
  colCount: 'md:count-3 sm:count-2',
  items: originItems,
});
</script>
<style lang="scss">
.rule-tag {
  background: rgba(113, 248,252,0.24) !important;
  color: rgba(113, 248,252,1) !important;
}
</style>
