<template>
  <hl-group align="items-middle">
    <div class="panel-title">
      <h4 class="text-title">{{ title }}</h4>
    </div>
    <div class="panel-title m-l-xxl">目的地：{{ sourceName }}</div>
  </hl-group>
</template>
<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: '标题'
  },
  sourceName: {
    type: String,
    default: '消息中心'
  }
});
</script>
