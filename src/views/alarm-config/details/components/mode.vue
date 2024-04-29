<template>
  <hl-panel radius="0px" class="content w-full" borderless padding="var(--xl)" header-class="bg-content"
    body-padding="var(--xxl)" body-class="display-flex items-left items-top flex-row content" footer-style><template
      #header>
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
        <h4 class="text-title w-full">策略信息</h4>
      </div>
    </template>
    <template #default>
      <hl-form class="w-full" style="--form-label-color: var(--text-secondary)" :width="['100px', 'col']">
        <hl-form-item class="w-full" label="策略名称：">
          <hl-group align="items-left items-top" class="w-full" gap="var(--xxs)">
            <div class="text-regular font-bold">{{ detail?.strategyName }}</div>
          </hl-group>
        </hl-form-item>
        <hl-form-item class="static" :label="`${$t('warningType')}:`">
          <hl-group align="items-left items-top" class="w-full" gap="var(--xxs)">
            <div class="text-regular font-bold">{{ detail?.eventTypeCodeName }}</div>
          </hl-group>
        </hl-form-item>
        <hl-form-item label="指标名称：">
          <hl-group align="items-left items-top" class="w-full" gap="var(--xxs)">
            <div class="text-regular font-bold">{{ detail?.targetName || '--' }}</div>
          </hl-group>
        </hl-form-item>
        <hl-form-item label="创建时间：">
          <hl-group align="items-left items-top" class="w-full" gap="var(--xxs)">
            <div class="text-regular font-bold">{{ detail?.createdAt || '--' }}</div>
          </hl-group>
        </hl-form-item>
        <hl-form-item label="最后修改时间：">
          <hl-group align="items-left items-top" class="w-full" gap="var(--xxs)">
            <div class="text-regular font-bold">{{ detail?.updatedAt }}</div>
          </hl-group>
        </hl-form-item>
        <hl-form-item label="描述：">
          <hl-group align="items-left items-top" class="w-full" gap="var(--xxs)">
            <div class="text-regular font-bold">{{ detail?.strategyDesc }}</div>
          </hl-group>
        </hl-form-item>
      </hl-form>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';
import type { IdetailsMode } from '../types';

defineProps({
  detail: Object as PropType<IdetailsMode>,
});
</script>
