<template>
  <hl-panel radius="0px" class="content w-full m-b-lg dialog-inner-panel" borderless padding="var(--lg)" header-class="bg-content" body-padding="var(--lg)" body-class="display-flex items-left items-top flex-row content" footer-style>
    <template #header>
      <panel-header title="监测点"></panel-header>
    </template>
    <template #default>
      <hl-panel class="w-full border solid border-regular bg-content" radius="4px" header-class="bg-header" style="--panel-border-color: var(--border-regular);" body-padding="var(--lg)" body-class="display-flex items-center items-top flex-col gap-sm" footer-class>
        <template #default>
          <unit-detail-popover :id="pointId"/>
        </template>
      </hl-panel>
    </template></hl-panel>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import UnitDetailPopover from '@/views/monitoring-config/alarm-strategy-config/components/unit-detail-popover.vue';

const route = useRoute();

// 策略id
const pointId = computed(() => route.query.id as string);
</script>
