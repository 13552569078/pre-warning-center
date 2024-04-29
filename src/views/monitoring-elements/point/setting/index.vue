<template>
  <div class="h-full">
    <point-info v-if="isSettingPage" v-bind="cardInfo" />

    <div v-else class="m-b-md">
      <card :id="pointId" />
    </div>

    <panel id="accsss" title="已关联指标数据项" button-text="关联指标数据" :show-edit="isSettingPage" @click="handleAddTarget">
      <div class="table-scroll scroll-column">
        <hl-simple-table class="w-full" :cols="colsFactor" :data="targetList">
          <template #tableIndex="{ rowIndex }">
            <span>{{ rowIndex + 1 }}</span>
          </template>
          <template #targetTimeList="{ row }">
            <template v-if="!row.targetTimeList?.length">
              <span>--</span>
            </template>
            <template v-else>
              <span v-for="{ timeRange, index } in row.targetTimeList" :key="index" style="display: block">{{ timeRange }}</span>
            </template>
          </template>
          <template #targetDataIsMultiple="{ row }">
            <span v-if="row.targetDataIsMultiple !== undefined">{{ row.targetDataIsMultiple ? '复合' : '简单' }}</span>
            <span v-else>{{ row.isMultiple ? '复合' : '简单' }}</span>
          </template>
          <template #targetFrequency="{ row }">
            <span v-if="!row.targetFrequency">--</span>
            <span v-else>{{
              `${getSecondsToUnitTime(row, 'targetFrequencyUnit', 'targetFrequency')}
                        ${row.targetFrequencyUnitName}`
            }}</span>
          </template>
          <template #targetDataType="{ row }">
            <span>{{ row.targetDataType || row.dataTypeName }}</span>
          </template>
          <template #thresholdLevelVOList="{ row }">
            <div v-if="row.thresholdLevelVOList && row.thresholdLevelVOList !== '--' && row.thresholdLevelVOList.length">
              <template v-if="row.thresholdLevelVOList.length <= 3">
                <div v-for="(item, index) in row.thresholdLevelVOList.slice(0, 3)" :key="index" class="display-flex items-middle">
                  <hb-text-overflow method="length" :length="8" effect="light">
                    {{ item.thresholdLevelName }}
                  </hb-text-overflow>
                  &emsp;
                  <span style="white-space: nowrap">{{ item.thresholdLevelValue }}</span>
                </div>
              </template>
              <template v-else>
                <div v-for="(item, index) in row.thresholdLevelVOList.slice(0, 3)" :key="index" class="display-flex items-middle">
                  <hb-text-overflow method="length" :length="8" effect="light">
                    {{ item.thresholdLevelName }}
                  </hb-text-overflow>
                  &emsp;
                  <span style="white-space: nowrap">{{ item.thresholdLevelValue }}</span>
                </div>
                <hl-popover placement="right" trigger="click" class="m-r-lg">
                  <template #reference>
                    <hl-icon type="primary" size="xxs" class="cursor-pointer">
                      <two-more />
                    </hl-icon>
                  </template>
                  <div v-for="(item, index) in row.thresholdLevelVOList" :key="index" class="display-flex items-middle">
                    <hb-text-overflow method="length" :length="8" effect="light">
                      {{ item.thresholdLevelName }}
                    </hb-text-overflow>
                    &emsp;
                    {{ item.thresholdLevelValue }}
                  </div>
                </hl-popover>
              </template>
            </div>
            <div v-else>--</div>
          </template>
          <template #isPublic="{ row }">
            <span>{{ row.isPublic ? '是' : '否' }}</span>
          </template>
          <template #targetMeasureUnitName="{ row }">
            <span>{{ row.targetMeasureUnitName || row.measureUnitName }}</span>
          </template>
          <template #timeScopes="{ row }">
            <span v-if="!Array.isArray(row.timeScopes)">--</span>
            <template v-else>
              <span v-for="time in getTimeScopesArr(row.timeScopes)" :key="time">{{ time }}</span>
            </template>
          </template>
          <template #handle="{ row }">
            <hl-button type="link" @click="handleRemove('target', row.targetDataId)">移除</hl-button>
          </template>
        </hl-simple-table>
      </div>
    </panel>

    <panel id="strategy" title="已配置策略" button-text="关联预警策略" :show-edit="isSettingPage" @click="handleAddStrategy">
      <hl-simple-table class="w-full" :cols="colsStrategy" :data="strategyList">
        <template #tableIndex="{ rowIndex }">
          <span>{{ rowIndex + 1 }}</span>
        </template>
        <template #strategyName="{ row }">
          <span class="text-link" style="cursor: pointer" @click="handleGo(row)">{{ row.strategyName }}</span>
        </template>
        <template #isTemplate="{ row }">
          <span>{{ row.isTemplate ? '是' : '否' }}</span>
        </template>
        <template #targetDataNameList="{ row }">
          <hl-group dir="vertical">
            <span v-for="(target, index) in row.targetDataNameList" :key="index">{{ target }}</span>
          </hl-group>
        </template>
        <template #handle="{ row }">
          <hl-button type="link" @click="handleRemove('strategy', row.id || row.strategyId)">移除</hl-button>
        </template>
        <!-- 详情页面 仅周期策略-->
        <template #time="{ row }">
          <span>{{ row.triggerType === 'TRIGGER_CYCLE' ? row.currentTaskTime : '--' }}</span>
        </template>
        <template #opration="{ row }">
          <hl-button type="link" @click="changeStarageTime(row)" v-if="row.triggerType === 'TRIGGER_CYCLE'">调整执行时间</hl-button>
        </template>
      </hl-simple-table>
    </panel>

    <hl-affix v-if="isSettingPage" position="bottom" :offset="0" class="bottom-btn">
      <hl-group align="items-middle" class="affix-bottom w-full box-shadow-lg p-lg" style="margin-top: 120px;">
        <hl-button class="m-r-sm" type="primary" @click="ok">保存配置</hl-button>
        <hl-button @click="$router.go(-1)">取消</hl-button>
      </hl-group>
    </hl-affix>
    <hl-affix v-else position="bottom" :offset="0" class="bottom-btn">
      <hl-group align="items-middle" class="affix-bottom w-full box-shadow-lg p-lg" style="margin-top: 120px;">
        <hl-button @click="$router.go(-1)">返回</hl-button>
      </hl-group>
    </hl-affix>

    <strategy-selector v-if="showStrategySelector" :strategy-list="strategyList" :target-list="targetList" @ok="handlePushStrategy" @close="handleCloseStrategy" />

    <target-selector v-if="showTargetSelector" :selected="targetList" @ok="handleUpdateTarget" @close="handleCloseTarget" />

    <strategy-time ref="strategyTimeRef" @changeTimeSubmit="init"></strategy-time>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { HlMessage } from 'hongluan-ui';
import { apiMonitorPointObj as api } from '@/apis/modules/monitor-unit/index';
import { getSecondsToUnitTime } from '@/common/time';
import { getTimeScopesArr } from '@/views/monitoring-elements/point/setting/utils';
import { IpostFindMonitorUnitStrategyListPageSpace } from '@/apis/modules/monitor-strategy/fixed-cycle/model';
import { IgetFindMonitorUnitTargetStrategySpace } from '@/apis/modules/monitor-unit/model';
import { STRATEGY_TYPE_ROUTERNAME_DETAIL } from '@/views/monitoring-config/alarm-strategy-config/utils';
import PointInfo from './point-info.vue';
import StrategySelector from './components/strategy-selector.vue';
import targetSelector from './components/target-selector.vue';
import StrategyTime from './components/strategy-time.vue';
import { useMonitorUnit } from '../hook';
import Panel from '../components/panel.vue';
import Card from '../components/detail-card.vue';

const route = useRoute();
const router = useRouter();
const pointId = route.query.pointId as string;
const anchor = route.query.anchor as string;

const isSettingPage = route.path.includes('setting');

const { cardInfo, targetList, strategyList, strategyIdList, targetIdList, targetDataIdListUsed, getRelatedList } = useMonitorUnit();

const showStrategySelector = ref(false);
const showTargetSelector = ref(false);

const strategyTimeRef = ref();

const colsFactor = [
  {
    title: '',
    width: 'fit-content',
    align: 'left',
    slotName: 'tableIndex',
    fixed: 'left'
  },
  { title: '指标数据项名称', prop: 'targetDataName', minWidth: '12em', fixed: { position: 'left', }, showTooltip: true },
  { title: '监测指标', prop: 'targetName', minWidth: '12em' },
  { title: '数据类型', slotName: 'targetDataType', minWidth: '120px' },
  { title: '阈值等级', slotName: 'thresholdLevelVOList', minWidth: '15em' },
  { title: '是否公用', slotName: 'isPublic', minWidth: '4em' },
  { title: '计量单位', slotName: 'targetMeasureUnitName', minWidth: '120px' },
  { title: '计算周期类型', prop: 'computePeriodTypeName', minWidth: '120px' },
  { title: '数据频率', slotName: 'targetFrequency', minWidth: '120px' },
  { title: '数据时间区间', slotName: 'timeScopes' },
  { title: '指标分类', slotName: 'targetDataIsMultiple', minWidth: '120px' },
  { title: '计算公式', prop: 'formulaName', minWidth: '120px' }
];

const colsStrategy = [
  {
    title: '',
    width: 'fit-content',
    align: 'left',
    slotName: 'tableIndex'
  },
  { title: '策略名称', slotName: 'strategyName', minWidth: '20%' },
  { title: '风险分类', prop: 'eventTypeName', minWidth: '20%' },
  { title: '策略类型', prop: 'triggerTypeName', minWidth: '20%' },
  { title: '指标数据项', slotName: 'targetDataNameList', minWidth: '20%' },
  { title: '是否为模板', slotName: 'isTemplate', minWidth: '10%' }
];

if (isSettingPage) {
  const action = { title: '操作', slotName: 'handle', align: 'left', width: '80px' };
  colsFactor.push(action);
  colsStrategy.push(action);
} else {
  colsStrategy.push(
    { title: '当前执行时间', slotName: 'time', minWidth: '10%' },
    { title: '操作', slotName: 'opration', width: '3%', align: 'left' }
  );
}

const handleGo = (row: any) => {
  const routerName = STRATEGY_TYPE_ROUTERNAME_DETAIL[row.triggerType];
  router.push({
    name: routerName,
    query: {
      title: '预警策略模板',
      id: row.strategyId || row.id,
      source: 'pointSetting',
      action: row.triggerType === 'TRIGGER_CYCLE' ? 'cycle' : 'trigger'
    }
  });
};

const handleAddTarget = () => {
  console.log('添加指标');
  showTargetSelector.value = true;
};

const handleAddStrategy = () => {
  console.log('添加策略');
  showStrategySelector.value = true;
};

const handleCloseStrategy = () => {
  showStrategySelector.value = false;
};

const handlePushStrategy = (strategy: IpostFindMonitorUnitStrategyListPageSpace.List) => {
  handleCloseStrategy();
  strategyList.value.push(strategy);
};

const handleUpdateTarget = (target: IgetFindMonitorUnitTargetStrategySpace.MonitorUnitTargetListVOList) => {
  handleCloseTarget();
  targetList.value.push(target);
};
// 调整时限
const changeStarageTime = (strategy: IpostFindMonitorUnitStrategyListPageSpace.List) => {
  strategyTimeRef.value.showChangeTimeDialog(strategy.strategyId);
};

const handleCloseTarget = () => {
  showTargetSelector.value = false;
};

const ok = async () => {
  console.log(pointId, targetIdList.value, strategyIdList.value);
  const res = await api.postAddStrategyTarget(pointId, targetIdList.value, strategyIdList.value);
  router.go(-1);
};

const handleRemove = (type: string, id: string) => {
  if (type === 'target') {
    if (targetDataIdListUsed.value.includes(id)) {
      console.log('不能删除');
      HlMessage.warning({
        message: '该指标数据项已被策略引用，不能删除！'
      });
    } else {
      targetList.value = targetList.value.filter(item => item.targetDataId !== id);
    }
  } else {
    console.log(id, strategyList.value);
    strategyList.value = strategyList.value.filter(item => item.id !== id && item.strategyId !== id);
  }
};

const init = async () => {
  await getRelatedList(pointId);
  if (anchor) {
    const element = document.querySelector(`#${anchor}`);
    nextTick(() => {
      element?.scrollIntoView({ behavior: 'smooth' });
    });
  }
};

init();
</script>
