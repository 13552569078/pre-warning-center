<template>
  <hl-panel radius="0px" class="content w-full dialog-inner-panel" borderless padding="var(--lg)" header-class="bg-content"
    body-padding="var(--lg)" body-class="display-flex items-left items-top flex-row content dialog-no-600" footer-style>
    <template #header>
      <panel-header title="预警规则"></panel-header>
    </template>
    <template #default>
      <hl-group dir="vertical" gap="var(--lg)" class="w-full">
        <collapse-section :default-open="true" :title="item.ruleName" v-for="(item, index) in detail" :key="index"
          :show-delete="false" style="width: 80%; background: var(--bg-content)" :border-title="false"
          :class="[source === 'strategy' ? 'w-60' : 'w-100']">
          <template #default="{ isOpen: isRuleOpen }">
            <hl-form v-show="isRuleOpen" :label-position="['items-left', 'items-middle']" gap="var(--lg)" item-gap="var(--lg2)">
              <hl-form-item class="w-full detail-row-font" label="规则名称">
                <hl-group align="items-left items-top" class="w-full">
                  <div class="text-regular font-bold">{{ item.ruleName }}</div>
                </hl-group>
              </hl-form-item>
              <hl-form-item class="w-full" label="预警等级">
                <hl-tag type="warning">{{ item.ruleLevelName }}</hl-tag>
              </hl-form-item>
              <hl-form-item class="w-full" label="规则描述">
                <hl-group align="items-left items-top" dir="vertical">
                  <div class="text-regular font-bold">
                    {{ item.ruleDesc }}
                  </div>
                </hl-group>
              </hl-form-item>
              <hl-form-item class="w-full" label="预警标题生成规则">
                <hl-group align="items-left items-top" dir="vertical">
                  <div class="text-regular font-bold">
                    {{ item.alarmTitle }}
                  </div>
                </hl-group>
              </hl-form-item>
              <hl-form-item class="w-full" label="预警描述生成规则">
                <hl-group align="items-left items-top" dir="vertical">
                  <div class="text-regular font-bold">
                    {{ item.alarmDesc }}
                  </div>
                </hl-group>
              </hl-form-item>
              <hl-form-item class="w-full" label="预警条件">
                <hl-group align="items-left items-top" dir="vertical" v-if="item.conditionType === 1">
                  <div class="text-regular font-bold">无附加条件</div>
                </hl-group>
                <hl-group align="items-left items-top" dir="vertical" v-if="item.conditionType === 2">
                  <div class="text-regular font-bold">连续次数 {{ item.lastTimes }} 次</div>
                </hl-group>
                <hl-group align="items-left items-top" dir="vertical" v-if="item.conditionType === 3">
                  <div class="text-regular font-bold">计算周期 {{ item.totalDuration / item.targetFrequencyCycle }}个 {{
                    item.totalTimes }} 次</div>
                </hl-group>
              </hl-form-item>
              <hl-form-item class="w-full" label="监测指标">
                <hl-group align="items-middle" class="w-full m-b-xs" dir="vertical" gap="var(--xs)" full
                  v-for="(itm, idx) in item.strategyRuleFactorVOS" :key="idx">
                  <hl-panel class="w-full"
                    style="border: 1px solid #c0bfff; background-color: #f8fdff; --panel-header-height: 46px; --panel-border-color: #c0bfff"
                    radius="4px" header-style="background-color: #EBEBFF;" body-padding="var(--lg)"
                    body-class="display-flex items-center items-top flex-col" footer-style>
                    <template #header>
                       <hl-group align="items-between" full>
                        <hl-group align="items-middle">
                          <hl-badge class="static" type="primary" :value="idx + 1"></hl-badge>
                          <h6 class="text-primary m-l-sm">
                            {{ itm.targetName }}
                          </h6>
                          <hl-badge class="static m-l-xxl" type="primary"
                            :value="`${RULE_TYPE_NAMES[itm.factorDataTypeCode]}`"></hl-badge>
                          <span class="m-l-xxl font-bold">{{ itm.targetFrequency > 0 ? '周期计算:' : '实时计算' }}</span>
                          <span v-if="itm.targetFrequency > 0" class="m-l-xxs font-bold">{{ getIntervalTime(itm) }} {{
                            getUnit(itm.targetFrequencyUnit) }}</span>
                          <span class="m-l-xxl font-bold">单位：{{ itm?.measureUnitName }}</span>
                        </hl-group>
                      </hl-group>
                    </template>
                    <template #default>
                      <!-- 开关型 -->
                      <hl-group align="items-top" class="w-full w-65" full
                        v-if="itm.factorDataTypeCode === RULE_TYPE_SWITCH">
                        <hl-group align="items-top" class="w-full w-65" full>
                          <hl-group align="items-left items-middle" class="w-full" dir="vertical">
                            <hl-group align="items-left items-top" gap="var(--xxs)" class="w-full">
                              <div class="text-regular font-bold">指标值：</div>
                              <div class="text-primary font-bold">{{ itm.factorValue ? '等于' : '不等于' }}</div>
                            </hl-group>
                          </hl-group>
                        </hl-group>
                      </hl-group>
                      <!-- 区间型 -->
                      <hl-group align="items-left" class="w-full" dir="vertical" gap="var(--sm)" full
                        v-if="itm.factorDataTypeCode === RULE_TYPE_INTERZONE">
                        <hl-group align="items-top" class="w-full" full
                          v-for="(itm1, inx1) in JSON.parse(itm.factorValue)" :key="inx1">
                          <hl-group align="items-left items-top" class="w-full">
                            <div class="text-secondary" style="width: 70px">下区间：</div>
                            <hl-group align="items-left items-top" gap="var(--xxs)">
                              <div class="text-regular font-bold" style="width: 70px">{{
                                EXPRESSIONS_NAMES[itm1.lowExpression] }}</div>
                              <div class="text-primary font-bold">
                                <hb-text-overflow method="length" :length="12" effect="light">
                                  {{ getThresholdLevelName(itm.thresholdLevelVOList, itm1.lowValue) }}
                                </hb-text-overflow>
                              </div>
                            </hl-group>
                          </hl-group>
                          <hl-group align="items-left items-top" class="w-full">
                            <div class="text-secondary" style="width: 70px">上区间：</div>
                            <hl-group align="items-left items-top" gap="var(--xxs)">
                              <div class="text-regular font-bold" style="width: 70px">{{
                                EXPRESSIONS_NAMES[itm1.upExpression] }}</div>
                              <div class="text-primary font-bold">
                                <hb-text-overflow method="length" :length="12" effect="light">
                                  {{ getThresholdLevelName(itm.thresholdLevelVOList,itm1.upValue) }}
                                </hb-text-overflow>
                              </div>
                            </hl-group>
                          </hl-group>
                        </hl-group>
                      </hl-group>
                    </template>
                  </hl-panel>
                  <hl-tag effect="light" type="primary" v-if="item.strategyRuleFactorVOS.length !== idx + 1"> {{
                    item.ruleLogicRelationship === 1 ? '与' : '或' }}</hl-tag>
                </hl-group>
              </hl-form-item>
            </hl-form>
          </template>
        </collapse-section>
      </hl-group>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { isEmpty } from 'lodash-es';
import { apiDictObj as dictApi } from '@/apis/modules/dict-api';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { EXPRESSIONS_NAMES, RULE_TYPE_NAMES, RULE_TYPE_INTERZONE, RULE_TYPE_SWITCH } from '@/common';

defineProps({
  detail: Object,
  source: {
    type: String,
    default: 'strategy' // 策略新窗口 详情
  }
});

const frequencyUnits = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);

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
const getThresholdLevelName = (list: { thresholdLevelId: string; thresholdLevelName: string; thresholdLevelValue: string }[], id: string) => {
  const target = list.filter(item => {
    return item.thresholdLevelId === id;
  });
  return isEmpty(target) ? '--' : `${target[0].thresholdLevelName}(${target[0].thresholdLevelValue})`;
};

const initDict = async () => {
  const units = await dictApi.list('MONITOR_FREQUENCY_UNIT');
  frequencyUnits.value = units.data;
};
initDict();
</script>
<style lang="scss" scoped>
:deep(.collapse-section-title) {
  padding-top: 0 !important;
  padding-left: 0 !important;
}
</style>
