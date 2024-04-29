<template>
  <div class="empty-scene">
    <img :src="emptyEventTypeImage" />
    <hl-group block align="items-center"></hl-group>
    <hl-button type="primary" @click="$emit('openEventDialog')">
      {{ `添加${pageType}` }}
      <template #icon>
        <hl-icon>
          <two-plus />
        </hl-icon>
      </template>
    </hl-button>
  </div>
</template>
<script lang="ts" setup>
import { funcIsMonitorPage } from '@/common/utils';
import { useI18n } from 'vue-i18n';
import emptyEventTypeImage from '@/assets/images/empty-event-type.png';

const { t } = useI18n();

const pageType = funcIsMonitorPage() ? `${t('warningType')}` : '预警类型';

defineEmits(['openEventDialog']);

</script>
<style lang="scss" scoped>
.empty-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    transform:scale(50%, 50%);
    display:block;
  }
}
</style>
