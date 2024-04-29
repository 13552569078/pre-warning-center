<template>
  <hl-group class="empty" align="items-center items-middle" dir="vertical" gap="var(--md)">
    <hl-thumb :src="emptyUrl" fit="cover" style="width: calc(var(--xxs) * 55); height: calc(var(--xxs) * 55)" />
    <p class="font-thin">{{ data }}</p>
    <slot></slot>
  </hl-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import emptyUrl from '@/assets/images/empty-image.png';

export default defineComponent({
  name: 'Empty',
  props: {
    data: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {
      emptyUrl
    };
  }
});
</script>
<style lang="scss" scoped>
.empty {
  width: 100%;
}
</style>
