<template>
  <hl-panel radius="0px" class="content w-full" borderless padding="var(--lg)" header-class="bg-content"
    body-padding="var(--lg)" body-class="display-flex items-left items-top flex-row content" footer-style>
    <template #header>
      <panel-header title="预警规则"></panel-header>
    </template>
    <template #default>
      <hl-group dir="vertical" gap="var(--lg)" class="w-full">
        <collapse-section :default-open="true" :title="item.ruleName" v-for="(item, index) in detail" :key="index"
          :show-delete="false" style="width: 80%; background: var(--bg-content)" :border-title="false"
          :class="[source === 'strategy' ? 'w-80' : 'w-100']">
          <template #default="{ isOpen: isRuleOpen }">
            <hl-form :class="[source === 'strategy' ? 'w-60' : 'w-100']" v-show="isRuleOpen" :label-position="['items-left', 'items-middle']" gap="var(--lg)" item-gap="var(--lg2)">
              <hl-form-item class="w-full" label="规则名称">
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
              <hl-form-item class="w-full" label="预警数阈值" v-if="filterType.includes(WARNING_NUMBER)">
                <hl-panel class="w-full"
                  style="border: 1px solid #c0bfff; background-color: #f8fdff; --panel-header-height: 46px; --panel-border-color: #c0bfff"
                  radius="4px" header-style="background-color: #EBEBFF;" body-padding="var(--lg)"
                  body-class="display-flex items-center items-top flex-col" footer-style>
                  <template #default>
                    <hl-group align="items-left" class="w-full" dir="vertical" gap="var(--sm)" full>
                      <hl-group align="items-top" class="w-full" full
                        v-for="(itm1, inx1) in JSON.parse(item.warningNumberThresholdValue)" :key="inx1">
                        <hl-group align="items-left items-middle" class="w-full">
                          <div class="text-secondary">下区间：</div>
                          <hl-group align="items-left items-top" gap="var(--xxs)">
                            <div class="text-regular font-bold">{{ EXPRESSIONS_NAMES[itm1.lowExpression] }}</div>
                            <div class="text-primary font-bold">{{ itm1.lowValue }}</div>
                          </hl-group>
                        </hl-group>
                        <hl-group align="items-left items-middle" class="w-full">
                          <div class="text-secondary">上区间：</div>
                          <hl-group align="items-left items-top" gap="var(--xxs)">
                            <div class="text-regular font-bold">{{ EXPRESSIONS_NAMES[itm1.upExpression] }}</div>
                            <div class="text-primary font-bold">{{ itm1.upValue }}</div>
                          </hl-group>
                        </hl-group>
                      </hl-group>
                    </hl-group>
                  </template>
                </hl-panel>
              </hl-form-item>
              <hl-form-item class="w-full" label="占比阈值" v-if="filterType.includes(RATIO)">
                <hl-panel class="w-full"
                  style="border: 1px solid #c0bfff; background-color: #f8fdff; --panel-header-height: 46px; --panel-border-color: #c0bfff"
                  radius="4px" header-style="background-color: #EBEBFF;" body-padding="var(--lg)"
                  body-class="display-flex items-center items-top flex-col" footer-style>
                  <template #default>
                    <hl-group align="items-left" class="w-full" dir="vertical" gap="var(--sm)" full>
                      <hl-group align="items-top" class="w-full" full
                        v-for="(itm1, inx1) in JSON.parse(item.rateThresholdValue)" :key="inx1">
                        <hl-group align="items-left items-middle" class="w-full">
                          <div class="text-secondary">下区间：</div>
                          <hl-group align="items-left items-top" gap="var(--xxs)">
                            <div class="text-regular font-bold">{{ EXPRESSIONS_NAMES[itm1.lowExpression] }}</div>
                            <div class="text-primary font-bold">{{ itm1.lowValue }}</div>
                          </hl-group>
                        </hl-group>
                        <hl-group align="items-left items-middle" class="w-full">
                          <div class="text-secondary">上区间：</div>
                          <hl-group align="items-left items-top" gap="var(--xxs)">
                            <div class="text-regular font-bold">{{ EXPRESSIONS_NAMES[itm1.upExpression] }}</div>
                            <div class="text-primary font-bold">{{ itm1.upValue }}</div>
                          </hl-group>
                        </hl-group>
                      </hl-group>
                    </hl-group>
                  </template>
                </hl-panel>
              </hl-form-item>
              <hl-form-item class="w-full" label="统计项间逻辑关系" v-if="filterType.length > 1">
                <hl-group align="items-left items-top" dir="vertical">
                  <div class="text-regular font-bold">
                    {{ item.ruleLogicRelationship == 1 ? '与' : '或' }}
                  </div>
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
import { PropType } from 'vue';
import { EXPRESSIONS_NAMES } from '@/common';
import { PanelHeader } from '@/components';
import { WARNING_NUMBER, RATIO } from '@/views/monitoring-config/second-trigger-config/utils';

defineProps({
  detail: Object,
  filterType: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  source: {
    type: String,
    default: 'strategy'
  }
});
</script>
