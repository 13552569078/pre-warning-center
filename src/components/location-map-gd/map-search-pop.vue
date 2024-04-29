<template>
  <fx-v-panel :title="`${properties.name}`" class="panel-card" v-if="properties.type === 'POI'">
    <span v-if="properties.address != ''">地址：{{ properties.address }}</span>
  </fx-v-panel>
  <fx-v-panel title="坐标信息" class="panel-card" v-if="properties.type === 'COOR'">
    <hl-group dir="vertical" gap="var(--sm)">
      <span>行政区划：{{ properties.addressComponent.city }}/{{ properties.addressComponent.district }}/{{ properties.addressComponent.province }}</span>
      <span v-if="properties.formattedAddress != ''">地址：{{ properties.formattedAddress }}</span>
    </hl-group>
  </fx-v-panel>
</template>
<script setup lang="ts">
defineProps({
  id: [String, Number],
  properties: {
    type: Object,
    default: () => ({})
  }
});
</script>
