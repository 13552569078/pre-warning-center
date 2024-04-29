<template>
  <div class="empty-scene">
    <img :src="emptyEventTypeImage" />
    <hl-button type="primary" @click="$emit('add')">
      添加风{{$t('warningType')}}
      <template #icon>
        <hl-icon>
          <two-plus />
        </hl-icon>
      </template>
    </hl-button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import emptyEventTypeImage from '@/assets/images/empty-event-type.png';

defineEmits(['add']);

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
