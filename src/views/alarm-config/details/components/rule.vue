<template>
  <hl-panel radius="0px" class="content w-full" borderless padding="var(--xl)" header-class="bg-content"
    body-padding="var(--xxl)" body-class="display-flex items-left items-top flex-row content" footer-style>
    <template #header>
      <svg fill="none" version="1.1" width="24" height="24" viewBox="0 0 24 24">
        <g style="mix-blend-mode:passthrough">
          <g style="mix-blend-mode:passthrough">
            <g style="mix-blend-mode:passthrough">
              <rect x="9" y="1" width="6" height="22" rx="0" fill="#36A4FF" fill-opacity="1" />
            </g>
          </g>
        </g>
      </svg>
      <div class="panel-title">
        <h4 class="text-title static">报警规则</h4>
      </div>
    </template>
    <template #default>
      <hl-group dir="vertical" gap="var(--lg)" class="w-full">
        <hl-group align="items-top" class="w-full m-b-lg" full v-for="(item, index) in detail" :key="index">
          <hl-panel class="w-full border solid border-regular" radius="6px" header-class="bg-light"
            style="--panel-border-color: var(--border-regular)" body-padding="var(--xxl)"
            body-class="display-flex items-left items-top flex-row" footer-style><template #header>
              <div class="panel-title">
                <h4 class="text-title static">{{ item.ruleName }}</h4>
              </div>
              <div class="panel-header-right"></div>
            </template>
            <template #default>
              <hl-form class="w-full" style="--form-label-color: var(--text-secondary)" :width="['100px', 'col']">
                <hl-form-item class="w-full" label="规则名称：">
                  <hl-group align="items-left items-top" class="w-full">
                    <div class="text-regular font-bold">{{ item.ruleName }}</div>
                  </hl-group>
                </hl-form-item>
                <hl-form-item class="w-full" label="报警等级：">
                  <hl-tag type="warning">{{ item.ruleLevelName }}</hl-tag>
                </hl-form-item>
                <hl-form-item class="w-full" label="规则描述：">
                  <hl-group align="items-left items-top" dir="vertical">
                    <div class="text-regular font-bold">
                      {{ item.ruleDesc }}
                    </div>
                  </hl-group>
                </hl-form-item>
                <hl-form-item class="w-full" label="阈值范围：">
                  <hl-group align="items-middle" class="w-full m-b-xs" dir="vertical" gap="var(--xs)" full>
                    <hl-panel class="w-full" style="
                      border: 1px solid #c0bfff;
                      background-color: #f8fdff;
                      --panel-header-height: 46px;
                      --panel-border-color: #c0bfff;" radius="4px" header-style="background-color: #EBEBFF;"
                      body-padding="var(--lg)" body-class="display-flex items-center items-top flex-col" footer-style>
                      <template #default>
                        <!-- 目前仅支持区间型 -->
                        <hl-group align="items-left" class="w-full" dir="vertical" gap="var(--sm)" full>
                          <hl-group align="items-top" class="w-full" full
                            v-for="(item1, itemIdx) in item.strategyRuleFactorParams" :key="itemIdx">
                            <hl-group align="items-left items-middle" class="w-full">
                              <div class="text-secondary">下区间：</div>
                              <hl-group align="items-left items-top" gap="var(--xxs)">
                                <div class="text-regular font-bold">{{ EXPRESSIONS_NAMES[item1.lowExpression] }}</div>
                                <div class="text-primary font-bold">{{ item1.lowValue }}</div>
                              </hl-group>
                            </hl-group>
                            <hl-group align="items-left items-middle" class="w-full">
                              <div class="text-secondary">上区间：</div>
                              <hl-group align="items-left items-top" gap="var(--xxs)">
                                <div class="text-regular font-bold">{{ EXPRESSIONS_NAMES[item1.upExpression] }}</div>
                                <div class="text-primary font-bold">{{ item1.upValue }}</div>
                              </hl-group>
                            </hl-group>
                          </hl-group>
                        </hl-group>
                      </template>
                    </hl-panel>
                  </hl-group>
                </hl-form-item>
              </hl-form>
            </template>
          </hl-panel>
        </hl-group>
      </hl-group>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';
import { EXPRESSIONS_NAMES } from '@/common';

defineProps({
  detail: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => []
  },
});
</script>
