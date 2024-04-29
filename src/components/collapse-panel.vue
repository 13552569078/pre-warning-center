
<template>
  <hl-panel
    :collapsed="minStatus"
  >
    <template #header>
      <div class="panel-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="panel-header-right">
        <hl-button equal no-fill @click="min">
          <hl-icon>
            <two-chevron-bottom v-if="!minStatus" />
            <two-chevron-right v-else />
          </hl-icon>
        </hl-button>
      </div>
    </template>
    <slot></slot>
  </hl-panel>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue';

defineProps({
  title: String
});

const minStatus = ref(false);

const min = () => {
  minStatus.value = !minStatus.value;
};

</script>
