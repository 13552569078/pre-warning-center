<template>
  <hl-panel radius="0px" class="content w-full" borderless padding="var(--lg)" header-class="bg-content"
    body-padding="var(--lg)" body-class="display-flex items-left items-top flex-row content" footer-style>
    <template #header>
      <panel-header title="预警规则"></panel-header>
    </template>
    <template #default>
      <hl-group dir="vertical" gap="var(--lg)" class="w-full">
        <collapse-section :default-open="true" :title="item.ruleName" v-for="(item, index) in detail" :key="index"
          :show-delete="false" style="width: 80%; background: var(--bg-content)" :border-title="false">
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
              <hl-form-item label="策略计算频率" prop="strategyCalculateFrequencyCorn" class="col-span-2">
                <hl-group align="items-left items-top" dir="vertical">
                  <div class="text-regular font-bold">
                    {{ item.strategyCalculateFrequencyCorn }}
                  </div>
                </hl-group>
                <hl-popover placement="bottom-end" title="" :width="200" trigger="click">
                  <template #reference>
                    <hl-button class="m-l-md" type="primary" effect="light"
                      @click="getPlanList(item.strategyCalculateFrequencyCorn)">查看执行计划</hl-button>
                  </template>
                  <hl-list class="plan-list">
                    <hl-list-item v-for="(item, index) in datePlanList" :key="index">
                      {{ item }}
                    </hl-list-item>
                  </hl-list>
                </hl-popover>
              </hl-form-item>
              <hl-form-item class="w-full" label="预警规则模型">
                <hl-group align="items-left items-top" dir="vertical">
                  <div class="text-regular font-bold">
                    {{ item.warningRuleModelName }}
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
import { ref } from 'vue';
import { PanelHeader } from '@/components';
import { apiAdvancedStrategyObj } from '@/apis/modules/advanced-strategy';

defineProps({
  detail: Object,
  source: {
    type: String,
    default: 'strategy'
  }
});

const datePlanList = ref<string[]>([]);
const getPlanList = async (value: string) => {
  if (!value) return;
  datePlanList.value = [];
  const res = await apiAdvancedStrategyObj.getFindNextExecTime(value as string);
  datePlanList.value = res.data;
};

</script>
<style lang="scss" scoped>
.plan-list {
  .hl-list-item {
    height: 32px !important;
  }
}
</style>
