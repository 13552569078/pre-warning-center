<template>
  <div class="new-item-action bg-primary-light-5" @click.stop="$emit('click')">
    <hl-icon class="m-r-xs" type="primary">
      <two-plus />
    </hl-icon>
    <span class="text-primary">{{ title }}</span>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: String
});
defineEmits(['click']);
</script>

<style lang="scss" scoped>
.new-item-action {
  width: 100%;
  border: 1px solid var(--primary);
  padding-top: var(--xs);
  padding-bottom: var(--xs);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  text-align: center;
  cursor: pointer;
}
</style>
