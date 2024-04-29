<template>
  <!-- <svg fill="none" version="1.1" width="24" height="24" viewBox="0 0 24 20">
    <g style="mix-blend-mode: passthrough">
      <g style="mix-blend-mode: passthrough">
        <g style="mix-blend-mode: passthrough">
          <rect x="9" y="1" width="4" height="18" rx="0" fill="#36A4FF" fill-opacity="1" />
        </g>
      </g>
    </g>
  </svg> -->
  <span class="line" />
  <div class="panel-title">
    <h4 class="text-title w-full">{{ title }}</h4>
  </div>
  <div class="panel-header-right"></div>
</template>
<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
});
</script>
<style scoped>
.line {
  width: 4px;
  height: 14px;
  background: #36A4FF;
  display: inline-block;
  margin-right: 8px;
}
</style>
