<template>
  <hl-panel radius="0px" class="content w-full" borderless padding="var(--lg)" header-class="bg-content" body-padding="var(--lg)" body-class="display-flex items-left items-top flex-row content" footer-style>
    <template #header>
      <panel-header title="消警规则"></panel-header>
    </template>
    <template #default>
      <hl-row layout="grid" class="w-full w-60" count="count-2" gap="var(--lg)" dir="vertical">
        <hl-col span="col col-span-2">
          <hl-group align="items-left items-top" class="static" gap-y="var(--lg2)" dir="vertical">
            <span class="text-secondary static">消警方式</span>
            <hl-group align="items-left items-top" class="w-full" gap="var(--xxs)">
              <div class="text-regular font-bold">{{ getClearTypeName(detail?.clearType) }}</div>
            </hl-group>
          </hl-group>
        </hl-col>
        <hl-col span="col col-span-2">
          <div v-if="detail?.clearType === 2">
            <span>连续一段时间未接收到监测数据即自动消警，时长：</span>
            <span class="m-l-xxs font-bold">{{ detail?.clearTypeUnit?(detail?.clearTypeInterval / getUnitTimes(detail?.clearTypeUnit)):'--' }}</span>
            <span class="m-l-xxs font-bold">{{ getUnitName(detail?.clearTypeUnit) }}</span>
          </div>
          <div v-if="detail?.clearType === 3">
            <span>预警后，间隔一定时间再消警：</span>
            <span class="m-l-xxs font-bold">{{ getTriggerTimeName(detail?.clearTypeInterval) }}</span>
          </div>
          <div v-if="detail?.clearType === 4">
            <span>预警后，某时间点立即消警：</span>
            <span class="m-l-xxs font-bold">{{ getTriggerNextName(detail?.clearTypeValue) }}</span>
          </div>
        </hl-col>
      </hl-row>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { PanelHeader } from '@/components';
import { getUnitTimes, getUnitName, getTriggerTimeName, getTriggerNextName } from '@/views/monitoring-config/data-trigger-config/utils';
import { getClearTypeName } from '@/views/monitoring-config/second-trigger-config/utils';

defineProps({
  detail: Object,
  source: {
    type: String,
    default: 'strategy' // 策略新窗口 详情,  区别历史预警
  }
});
</script>
