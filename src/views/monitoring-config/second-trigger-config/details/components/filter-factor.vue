<template>
  <hl-panel radius="0px" borderless padding="var(--lg)" body-padding="var(--lg)"
    body-class="display-flex items-left items-top flex-row content" footer-style>
    <template #header>
      <panel-header title="统计项筛选条件"></panel-header>
    </template>
    <template #default>
      <hl-row layout="grid" :class="[source === 'strategy' ? 'w-60' : 'w-100']" class="w-full detail-row-font"
        count="count-2" gap="var(--lg)">
        <hl-col span="col">
          <hl-group dir="vertical" align="items-left items-top" class="static" gap="var(--lg2)">
            <span class="text-secondary static">统计项</span>
            <span class="font-bold static" v-for="item in detail?.statisticalItemsTypeList" :key="item">{{
              (STATISTICA_LIST as any)[item] }}</span>
          </hl-group>
        </hl-col>
        <hl-col span="col" v-if="detail?.statisticalItemsTypeList.includes(WARNING_NUMBER)">
          <hl-group dir="vertical" align="items-left items-top" class="static" gap="var(--lg2)">
            <span class="text-secondary static">重复计数</span>
            <span class="font-bold static">{{ COUNT_LIST[detail?.warningNumberType] }}</span>
          </hl-group>
        </hl-col>
        <hl-col span="col">
          <hl-group dir="vertical" align="items-left items-top" class="static" gap="var(--lg2)">
            <span class="text-secondary static">统计时长</span>
            <span class="font-bold static">{{ detail?.statisticalDuration }} {{
              getDurationName(detail?.statisticalDurationUnit) }}</span>
          </hl-group>
        </hl-col>
        <hl-col span="col">
          <hl-group dir="vertical" align="items-left items-top" class="static" gap="var(--lg2)">
            <span class="text-secondary static">统计周期类型</span>
            <span class="font-bold static">{{ CYCLE_LIST[detail?.statisticalCycleType] }}</span>
          </hl-group>
        </hl-col>
        <hl-col span="col">
          <hl-group dir="vertical" align="items-left items-top" class="static" gap="var(--lg2)">
            <span class="text-secondary static">附加标识</span>
            <span class="font-bold static">{{ EQUAL_LIST[detail?.accessoryId] }}</span>
          </hl-group>
        </hl-col>
      </hl-row>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { STATISTICA_LIST, COUNT_LIST, WARNING_NUMBER, getDurationName, CYCLE_LIST, EQUAL_LIST } from '@/views/monitoring-config/second-trigger-config/utils';

defineProps({
  detail: Object,
  source: {
    type: String,
    default: 'strategy' // 策略新窗口 详情,  区别历史预警
  }
});
</script>
