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
        <h4 class="text-title w-full">监测点及指标数据项</h4>
      </div>
    </template>
    <template #default>
      <hl-panel class="w-full border solid border-regular bg-content" radius="4px" header-class="bg-header"
        style="--panel-border-color: var(--border-regular);" body-padding="var(--lg)"
        body-class="display-flex items-center items-top flex-col gap-sm" footer-class>
        <template #default>
          <unit-detail-popover :id="strategyId" />
        </template>
      </hl-panel>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import UnitDetailPopover from '@/views/alarm-config/alarm-strategy-config/components/unit-detail-popover.vue';

const route = useRoute();

// 策略id
const strategyId = computed(() => route.query.id as string);
</script>
