<template>
  <hl-panel radius="0px" class="content w-full" borderless padding="var(--xl)" header-class="bg-content" body-padding="var(--xxl)" body-class="display-flex items-left items-top flex-row content" footer-style>
    <template #header>
      <panel-header title="预警规则"></panel-header>
    </template>
    <template #default>
      <hl-group dir="vertical" gap="var(--lg)" class="w-full p-l-xxl m-t-lg">
        <hl-form :class="[source === 'strategy' ? 'w-60' : 'w-100']" style="--form-label-color: var(--text-secondary)" :width="['150px', 'col']" v-for="(item, index) in detail" :key="index">
          <hl-form-item class="w-full" label="规则名称：">
            <hl-group align="items-left items-top" class="w-full">
              <div class="text-regular font-bold">{{ item.ruleName }}</div>
            </hl-group>
          </hl-form-item>
          <hl-form-item class="w-full" label="预警等级：">
            <hl-tag type="warning">{{ item.ruleLevelName }}</hl-tag>
          </hl-form-item>
          <hl-form-item class="w-full" label="规则描述：">
            <hl-group align="items-left items-top" dir="vertical">
              <div class="text-regular font-bold">
                {{ item.ruleDesc }}
              </div>
            </hl-group>
          </hl-form-item>
          <hl-form-item class="w-full" label="预警标题生成规则：">
            <hl-group align="items-left items-top" dir="vertical">
              <div class="text-regular font-bold">
                {{ item.alarmTitle }}
              </div>
            </hl-group>
          </hl-form-item>
          <hl-form-item class="w-full" label="预警描述生成规则：">
            <hl-group align="items-left items-top" dir="vertical">
              <div class="text-regular font-bold">
                {{ item.alarmDesc }}
              </div>
            </hl-group>
          </hl-form-item>
          <hl-form-item class="w-full" label="预警条件：">
            <hl-group align="items-left items-top" dir="vertical">
              <div class="text-regular font-bold" v-if="item.conditionType === 3">
                累计次数
                <span class="static m-l-xxl">时长:</span>
                <span class="static m-l-xxs">
                  {{ item.totalDuration / getUnitTimes(item.totalDurationUnit) }}
                </span>
                <span class="static m-l-xxs">
                  {{ getUnitName(item.totalDurationUnit) }}
                </span>
                <span class="static m-l-xxl">累计:</span>
                <span class="static m-l-xxs"> {{ item.totalTimes }}次 </span>
              </div>
              <div class="text-regular font-bold" v-if="item.conditionType === 1">无附加条件</div>
            </hl-group>
          </hl-form-item>
          <hl-form-item class="w-full" label="监测指标：">
            <hl-group align="items-middle" class="w-full m-b-xs" dir="vertical" gap="var(--xs)" full>
              <hl-panel class="w-full" style="border: 1px solid #c0bfff; background-color: #f8fdff; --panel-header-height: 46px; --panel-border-color: #c0bfff" radius="4px" header-style="background-color: #EBEBFF;" body-padding="var(--lg)" body-class="display-flex items-center items-top flex-col" footer-style v-for="(itm, idx) in item.strategyRuleFactorVOS" :key="idx">
                <template #header>
                   <hl-group align="items-between" full>
                    <h6 class="text-primary m-l-xxs">{{ itm?.targetName }}</h6>
                    <span class="m-l-lg">实时计算</span>
                    <span class="text-secondary m-l-lg"></span>
                  </hl-group>
                </template>
                <template #default>
                  <hl-group align="items-top" class="w-full" full>
                    <hl-group align="items-left items-middle" class="w-full" dir="vertical">
                      <hl-group align="items-left items-top" gap="var(--xxs)" class="w-full">
                        <div class="text-regular font-bold">指标值：</div>
                        <div class="text-primary font-bold">{{ JSON.parse(itm.factorValue)?.value === 1 ? '等于' : '不等于' }}</div>
                      </hl-group>
                      <hl-group align="items-left items-top" gap="var(--xxs)" class="w-full">
                        <div class="text-regular font-bold">附加标识：</div>
                        <div class="text-primary font-bold">{{ getSwitchListName(JSON.parse(itm.factorValue)?.accessoryId)}}</div>
                      </hl-group>
                    </hl-group>
                  </hl-group>
                </template>
              </hl-panel>
            </hl-group>
          </hl-form-item>
        </hl-form>
      </hl-group>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { PanelHeader } from '@/components';
import { getUnitTimes, getUnitName, getSwitchListName } from '@/views/monitoring-config/data-trigger-config/utils';

defineProps({
  detail: Object,
  source: {
    type: String,
    default: 'strategy' // 策略新窗口 详情
  }
});
</script>
