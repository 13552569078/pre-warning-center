<template>
  <div class="empty-scene">
    <img :src="emptyEventTypeImage" />
    <hl-group block align="items-center"></hl-group>
    <p>请先接入数据</p>
  </div>
</template>
<script lang="ts" setup>
import emptyEventTypeImage from '@/assets/images/empty-event-type.png';
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
