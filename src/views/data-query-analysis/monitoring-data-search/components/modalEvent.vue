<template>
  <hl-dialog
    :model-value="$props.modelValue"
    :append-to-body="true"
    width="880px"
    full-body
    @closed="handleClosed">
    <template #title>
      <div class="panel-header-left">
        <hl-tabs
          v-model="activeNameCurrent"
          type="line"
          :show-pane="false"
          style="flex-grow: 1;"
          nav-height="calc(var(--xxs) * 18)">
          <hl-tab-pane label="实时数据" name="realData"/>
          <hl-tab-pane label="历史数据" name="historyData" />
        </hl-tabs>
      </div>
      <div class="w-full"></div>
    </template>
     <real-data
       v-if="activeNameCurrent === 'realData'"
      :monitorUnitId="$props.monitorUnitId"/>
    <history-data
      v-else
       :monitorUnitId="$props.monitorUnitId"
      :startTime="$props.startTime"
      :endTime="$props.endTime"/>
  </hl-dialog>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import historyData from './historyData.vue';
import realData from './realData.vue';

const props = defineProps({
  modelValue: Boolean,
  monitorUnitId: String,
  activeName: String,
});
const activeNameCurrent = ref(props.activeName);
const emit = defineEmits(['update:modelValue']);

const handleClosed = () => {
  emit('update:modelValue', false);
};
</script>

<style lang="scss">
</style>
