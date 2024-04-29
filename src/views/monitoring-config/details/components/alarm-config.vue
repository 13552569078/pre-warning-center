<template>
  <hl-panel radius="0px" class="content w-full dialog-inner-panel" borderless padding="var(--lg)" header-class="bg-content" body-padding="var(--lg)" body-class="display-flex items-left items-top flex-row content" footer-style>
    <template #header>
      <panel-header title="策略设置"></panel-header>
    </template>
    <template #default>
      <hl-row layout="grid" class="w-full w-60" count="count-2" gap="var(--lg)" dir="vertical">
        <hl-col span="col col-span-2">
          <hl-group dir="vertical" gap-y="var(--lg2)">
            <span>预警间隔</span>
            <template v-if="detail?.intervalTime">
              <span class="font-bold">{{ detail?.intervalTime ? detail?.intervalTime / getUnitTimes(detail?.intervalTimeUnit) : '--' }}</span>
              <span class="m-l-xxs font-bold">{{ getUnitName(detail?.intervalTimeUnit) }}</span>
            </template>
            <template v-else> <span class="font-bold">未设置</span> </template>
          </hl-group>
        </hl-col>
        <hl-col span="col col-span-2">
          <hl-group dir="vertical" gap-y="var(--lg2)">
            <span>指标数据重复引用</span>
            <!-- 除显示关闭 否则均为开启 -->
            <span class="font-bold"> {{ detail?.isReuseData === 0 ? '关闭' : '开启' }}</span>
          </hl-group>
        </hl-col>
      </hl-row>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { PanelHeader } from '@/components';
import { getUnitTimes, getUnitName } from '@/views/monitoring-config/data-trigger-config/utils';

defineProps({
  detail: Object
});
</script>
