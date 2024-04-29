<template>
  <hl-panel radius="0px" borderless padding="var(--lg)" body-padding="var(--lg)" body-class="display-flex items-left items-top flex-row content" footer-style>
    <template #header>
      <panel-header title="预警对象"></panel-header>
    </template>
    <template #default>
      <hl-row layout="grid" :class="[source === 'strategy' ? 'w-60' : 'w-100']" class="w-full" gap="var(--lg)">
        <hl-col span="col">
          <hl-group dir="vertical" align="items-left items-top" class="static w-full" gap="var(--lg2)">
            <span class="text-secondary static">监测主体</span>
            <hl-group class="p-lg bg-light radius-md w-full" align="items-left items-top" dir="vertical" gap="var(--sm)">
              <hl-group align="items-left items-top" gap="var(--sm)" wrap>
                <hl-group class="p-y-xs p-x-sm bg-content radius-lg box-shadow-sm" align="items-left items-middle" gap="var(--xs)" v-for="(item, index) in detail?.monitorRegions" :key="index">
                  <span class="static">{{ item?.regionName }}</span>
                </hl-group>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-col>
        <hl-col span="col">
          <hl-group dir="vertical" align="items-left items-top" class="static w-full" gap="var(--lg2)">
            <span class="text-secondary static">风险分类</span>
            <hl-group class="p-lg bg-light radius-md w-full" align="items-left items-top" dir="vertical" gap="var(--sm)">
              <hl-group align="items-left items-middle" gap="var(--sm)" wrap>
                <hl-group class="p-y-xs p-x-sm bg-content radius-lg box-shadow-sm" align="items-left items-middle" gap="var(--xs)" v-for="(item, index) in detail?.eventTypeList" :key="index">
                  <span class="static">{{ item?.eventTypeName }}</span>
                </hl-group>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-col>
      </hl-row>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps({
  detail: Object,
  source: {
    type: String,
    default: 'strategy' // 策略新窗口 详情,  区别历史预警
  }
});
</script>
