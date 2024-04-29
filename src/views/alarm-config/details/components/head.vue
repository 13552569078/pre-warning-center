<template>
  <hl-panel radius="0px" class="header-bg" body-padding="26px 0"
    body-class="display-flex items-center items-middle flex-row content">
    <template #default>
      <hl-group class="p-y-lg w-full" style="padding-right: 80px; padding-left: 300px;" align="items-middle" full>
        <hl-group align="items-left items-middle" class="w-full" gap="var(--md)">
          <hl-group align="items-left items-top" dir="vertical" gap="var(--xxs)">
            <h2 class="text-regular text-center">{{ detail?.strategyName }}</h2>
            <hl-tag type="primary" round>{{ detail?.eventTypeCodeName }}</hl-tag>
          </hl-group>
        </hl-group>
        <hl-group align="items-left items-middle" class="w-full" gap="var(--md)">
          <hl-icon size="lg" fill class="radius-lg" type="primary" effect="light">
            <FillArchive></FillArchive>
          </hl-icon>
          <hl-group align="items-center items-top" dir="vertical" gap="var(--xxs)">
            <div class="text-regular font-lg font-bold text-center">
              {{ detail?.createdAt }}
            </div>
            <div class="text-secondary text-center">创建时间</div>
          </hl-group>
        </hl-group>
        <hl-group align="items-left items-middle" class="w-full" gap="var(--md)">
          <hl-icon size="lg" fill class="radius-lg" type="warning" effect="light">
            <FillEdit></FillEdit>
          </hl-icon>
          <hl-group align="items-center items-top" dir="vertical" gap="var(--xxs)">
            <div class="text-regular font-lg font-bold text-center">
              {{ detail?.updatedAt }}
            </div>
            <div class="text-secondary text-center">最后修改时间</div>
          </hl-group>
        </hl-group>
      </hl-group>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';
import type { IdetailsHead } from '../types';

defineProps({
  detail: Object as PropType<IdetailsHead>,
});

</script>
<style lang="scss">
.header-bg {
  background: url("./image/head-bg.png") no-repeat;
  background-color: var(--bg-content);
  background-size: contain;
}
</style>
