<template>
  <template v-if="strategyRuleList.length > 0">
    <!-- 基本信息 -->
    <hl-panel radius="0px" class="content w-full m-t-lg" borderless padding="var(--xl)" header-class="bg-content p-l-sm" body-padding="var(--xxl)" body-class="display-flex items-left items-top flex-row content" footer-style style="--panel-padding: 0px">
      <template #header>
        <panel-header title="基本信息"></panel-header>
      </template>
      <template #default>
        <hl-row layout="grid" class="w-full" count="count-2" gap="var(--lg)">
          <hl-col span="col">
            <hl-group align="items-left items-top" class="static" gap="var(--xl)">
              <span class="text-secondary static">策略名称:</span>
              <span class="font-bold static">{{ strategyDetail?.strategyName }}</span>
            </hl-group>
          </hl-col>
          <hl-col span="col">
            <hl-group align="items-left items-top" class="static" gap="var(--xl)">
              <span class="text-secondary static">策略版本:</span>
              <span class="font-bold static">{{ versionName }}</span>
            </hl-group>
          </hl-col>
          <hl-col span="col">
            <hl-group align="items-left items-top" class="static" gap="var(--xl)">
              <span class="text-secondary static">风险分类:</span>
              <span class="font-bold static">{{ strategyDetail?.eventTypeCodeName }}</span>
            </hl-group>
          </hl-col>
          <hl-col span="col col-span-2">
            <hl-group align="items-left items-top w-full" class="static" gap="var(--xl)">
              <span class="text-secondary static">静默设置:</span>
              <hl-group dir="vertical" class="bg-light p-md block w-full w-80" gap="var(--sm)" v-if="strategyDetail?.silentConfigVOS.length">
                <hl-group align="items-left items-top" gap="var(--xs)" class="bg-content p-sm static" :key="index" v-for="(item, index) in strategyDetail?.silentConfigVOS">
                  <div class="text-regular font-bold">{{ item.dateStart }} {{ item.dateEnd }}</div>
                  <div class="text-secondary font-bold">至</div>
                  <div class="text-regular font-bold">{{ item.timeStart }} {{ item.timeEnd }}</div>
                </hl-group>
              </hl-group>
            </hl-group>
          </hl-col>
        </hl-row>
      </template>
    </hl-panel>
    <!-- 预警规则 -->
    <hl-panel radius="0px" class="content w-full m-t-lg" borderless padding="var(--xl)" header-class="bg-content p-l-sm" body-padding="var(--xxl)" body-class="display-flex items-left items-top flex-row content" footer-style style="--panel-padding: 0px">
      <template #header>
        <panel-header title="预警规则"></panel-header>
      </template>
      <template #default>
        <hl-group class="w-full" dir="vertical">
          <hl-row layout="grid" class="w-full m-b-xxl" :class="[strategyRuleList.length && index !== strategyRuleList.length - 1 ? 'border-bottom p-b-xxl' : '', 'solid']" count="count-2" gap="var(--lg)" v-for="(item, index) in strategyRuleList" :key="index">
            <hl-col span="col">
              <hl-group align="items-left items-top" class="static" gap="var(--xl)">
                <span class="text-secondary static">规则名称:</span>
                <span class="font-bold static">{{ item.ruleName }}</span>
              </hl-group>
            </hl-col>
            <hl-col span="col">
              <hl-group align="items-left items-top" class="static" gap="var(--xl)">
                <span class="text-secondary static">预警等级:</span>
                <span class="font-bold static">{{ item.ruleLevelName }}</span>
              </hl-group>
            </hl-col>
            <hl-col span="col col-span-2">
              <hl-group align="items-left items-top" class="static" gap="var(--xl)">
                <span class="text-secondary static">规则描述:</span>
                <span class="font-bold">{{ item.ruleDesc }}</span>
              </hl-group>
            </hl-col>
            <hl-col span="col col-span-2">
              <hl-group align="items-left items-top" class="static" gap="var(--xl)">
                <span class="text-secondary static">预警标题生成规则：</span>
                <span class="font-bold">{{ item.alarmTitle ?? '--' }}</span>
              </hl-group>
            </hl-col>
            <hl-col span="col col-span-2">
              <hl-group align="items-left items-top" class="static" gap="var(--xl)">
                <span class="text-secondary static">预警描述生成规则：</span>
                <span class="font-bold">{{ item.alarmDesc ?? '--' }}</span>
              </hl-group>
            </hl-col>
            <hl-col span="col col-span-2">
              <hl-group align="items-left items-top w-full" class="static">
                <span class="text-secondary static m-b-lg">监测指标:</span>
                <hl-group dir="vertical" full class="m-l-lg">
                  <hl-group align="items-middle" class="w-full m-b-xs" gap="var(--xs)" full v-for="(itm, idx) in item.strategyRuleFactorVOS" :key="idx" dir="vertical">
                    <hl-panel class="w-full" style="border: 1px solid #c0bfff; background-color: #f8fdff; --panel-header-height: 46px; --panel-border-color: #c0bfff" radius="4px" header-style="background-color: #EBEBFF;" body-padding="var(--lg)" body-class="display-flex items-center flex-col" footer-style>
                      <template #header>
                         <hl-group align="items-between" full>
                          <hl-group align="items-middle">
                            <hl-badge class="static" type="primary" :value="idx + 1"></hl-badge>
                            <h6 class="text-primary m-l-xxs">
                              {{ itm.targetName }}
                            </h6>
                          </hl-group>
                          <hl-group class="static" align="items-middle">
                            <hl-badge class="static" type="primary" :value="`${RULE_TYPE_NAMES[itm.factorDataTypeCode]}`"></hl-badge>
                            <span class="text-secondary m-l-lg">{{ itm.targetFrequency > 0 ? '周期计算:' : '实时计算' }}</span>
                            <span v-if="itm.targetFrequency > 0" class="font-bold m-l-xxs">{{ getIntervalTime(itm) }} {{ getUnit(itm.targetFrequencyUnit) }}</span>
                          </hl-group>
                        </hl-group>
                      </template>
                      <template #default>
                        <!-- 开关型 -->
                        <hl-group align="items-top" class="w-full" full v-if="itm.factorDataTypeCode === RULE_TYPE_SWITCH">
                          <hl-group align="items-top" class="w-full w-65" full>
                            <hl-group align="items-left items-middle" class="w-full" dir="vertical">
                              <hl-group align="items-left items-top" gap="var(--xxs)" class="w-full">
                                <div class="text-regular font-bold">指标值：</div>
                                <div class="text-primary font-bold">{{ JSON.parse(itm.factorValue) === 1 ? '等于' : '不等于' }}</div>
                              </hl-group>
                              <!-- <hl-group align="items-left items-top" gap="var(--xxs)" class="w-full">
                                <div class="text-regular font-bold">附加标识：</div>
                                <div class="text-primary font-bold">{{ getSwitchListName(JSON.parse(itm.factorValue)?.accessoryId) }}</div>
                              </hl-group> -->
                            </hl-group>
                          </hl-group>
                        </hl-group>
                        <!-- 区间型 -->
                        <hl-group align="items-left" class="w-full" dir="vertical" full v-if="itm.factorDataTypeCode === RULE_TYPE_INTERZONE">
                          <hl-group align="items-top" class="w-full" full v-for="(itm1, inx1) in JSON.parse(itm.factorValue)" :key="inx1">
                            <hl-group align="items-left items-middle" class="w-full">
                              <div class="text-secondary">下区间：</div>
                              <hl-group align="items-left items-top" gap="var(--xxs)">
                                <div class="text-regular font-bold">{{ EXPRESSIONS_NAMES[itm1.lowExpression] }}</div>
                                <!-- <div class="text-primary font-bold">{{ itm1.lowValue }}</div> -->
                                <div class="text-primary font-bold">{{ getThresholdLevelName(itm.thresholdLevelVOList, itm1.lowValue) }}</div>
                              </hl-group>
                            </hl-group>
                            <hl-group align="items-left items-middle" class="w-full">
                              <div class="text-secondary">上区间：</div>
                              <hl-group align="items-left items-top" gap="var(--xxs)">
                                <div class="text-regular font-bold">{{ EXPRESSIONS_NAMES[itm1.upExpression] }}</div>
                                <!-- <div class="text-primary font-bold">{{ itm1.upValue }}</div> -->
                                <div class="text-primary font-bold">{{ getThresholdLevelName(itm.thresholdLevelVOList, itm1.upValue) }}</div>
                              </hl-group>
                            </hl-group>
                          </hl-group>
                        </hl-group>
                      </template>
                    </hl-panel>
                    <hl-tag effect="light" type="primary" v-if="item.strategyRuleFactorVOS.length !== idx + 1"> {{ item.ruleLogicRelationship === 1 ? '与' : '或' }}</hl-tag>
                  </hl-group>
                </hl-group>
              </hl-group>
            </hl-col>
            <hl-col span="col col-span-2">
              <hl-group align="items-left items-top" class="static" gap="var(--xl)">
                <span class="text-secondary static">预警条件:</span>
                <hl-group align="items-left items-top" dir="vertical" v-if="item.conditionType === 1">
                  <div class="text-regular font-bold">无附加条件</div>
                </hl-group>
                <hl-group align="items-left items-top" dir="vertical" v-if="item.conditionType === 2">
                  <div class="text-regular font-bold">连续次数 {{ item.lastTimes }} 次</div>
                </hl-group>
                <hl-group align="items-left items-top" dir="vertical" v-if="item.conditionType === 3">
                  <div class="text-regular font-bold">
                    <!-- 累计次数 -->
                    计算周期 {{ item.totalDuration / item.targetFrequencyCycle }}个 {{ item.totalTimes }} 次
                  </div>
                </hl-group>
              </hl-group>
            </hl-col>
          </hl-row>
        </hl-group>
      </template>
    </hl-panel>
    <!-- 预警方式 -->
    <hl-panel radius="0px" class="content w-full m-t-lg" borderless padding="var(--xl)" header-class="bg-content p-l-md" body-padding="var(--xxl)" body-class="display-flex items-left items-top flex-row content" footer-style style="--panel-padding: 0px">
      <template #header>
        <panel-header title="预警方式"></panel-header>
      </template>
      <template #default>
        <hl-row layout="grid" class="w-full" count="count-2" gap="var(--lg)">
          <!-- 4.11取消预警间隔 -->
          <!-- <hl-col span="col col-span-2">
            <hl-group align="items-left items-top" class="static" gap="var(--xl)">
              <span class="text-secondary static">预警间隔:</span>
              <template v-if="!strategyDetail?.intervalTimeUnit">
                <div class="text-regular font-bold">无间隔</div>
              </template>
              <template v-else>
                <div class="text-regular font-bold">
                  {{ getSecondsToUnitTime(strategyDetail, 'intervalTimeUnit', 'intervalTime') }}
                  {{ getUnitName(frequencyUnits, strategyDetail?.intervalTimeUnit) }}
                </div>
              </template>
            </hl-group>
          </hl-col> -->
          <hl-col span="col col-span-2">
            <hl-group align="items-left items-top" class="static" gap="var(--xl)">
              <span class="text-secondary static">消警方式:</span>
              <template v-if="strategyDetail?.clearType === 1">
                <div class="text-regular font-bold">立即消警</div>
              </template>
              <template v-if="strategyDetail?.clearType === 2">
                <div class="text-regular font-bold">规则(数据)消警</div>
              </template>
            </hl-group>
          </hl-col>
        </hl-row>
      </template>
    </hl-panel>
  </template>
  <hb-empty description="暂无数据" v-else />
</template>
<script lang="ts" setup>
import { PropType } from 'vue';
import { isEmpty } from 'lodash-es';
import { Indexable } from 'fx-front-utils';
import { EXPRESSIONS_NAMES, RULE_TYPE_NAMES, RULE_TYPE_INTERZONE, RULE_TYPE_SWITCH } from '@/common';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';

const props = defineProps({
  strategyDetail: Object as PropType<Indexable<any>>,
  strategyRuleList: Object as PropType<Indexable<any>[]>,
  versionName: {
    type: String,
    default: ''
  },
  frequencyUnits: [] as PropType<IgetListDictCustomVOsDictSpace.Data[]> // 单位dict
});

const getUnit = (type: string) => {
  return (props.frequencyUnits as IgetListDictCustomVOsDictSpace.Data[]).filter((item: IgetListDictCustomVOsDictSpace.Data) => {
    return item.dictCode === type;
  })[0].dictName;
};
const getIntervalTime = (data: any) => {
  if (data.targetFrequencyUnit === 'DAY') return +data.targetFrequency / 60 / 60 / 24;
  if (data.targetFrequencyUnit === 'HOUR') return +data.targetFrequency / 60 / 60;
  if (data.targetFrequencyUnit === 'MINUTE') return +data.targetFrequency / 60;
  return 0;
};
const getThresholdLevelName = (list: { thresholdLevelId: string; thresholdLevelName: string; thresholdLevelValue: string }[], id: string) => {
  const target = list.filter(item => {
    return item.thresholdLevelId === id;
  });
  return isEmpty(target) ? '--' : target[0].thresholdLevelValue;
};
</script>
