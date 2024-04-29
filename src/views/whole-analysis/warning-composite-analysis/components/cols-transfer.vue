<template>
  <hl-dialog model-value="true" :close-on-click-modal="false" title="设置列表展示字段" width="640px" @close="$emit('close')" body-class="bg-modal">
    <hl-checkbox-group v-model="colsChecks" dir="horizontal" gap="var(--xxl)" wrap>
      <hl-checkbox :label="item.columnName" v-for="item in colsList" :key="item.columnName">{{ item.columnLabel }}</hl-checkbox>
    </hl-checkbox-group>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="$emit('close')">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="ok" :disabled="colsChecks.length === 0">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { apiWarningWholeAnalysisObj } from '@/apis/modules/whole-analysis/warning-whole-analysis';
import { PAGE_CODE, getColsList } from './utils';
import type { Icols } from './utils';

const emit = defineEmits(['close', 'handleUpdateCols']);

const colsList = ref<Icols[]>([]);
const colsChecks = ref<string[]>([]);

watch(
  colsList,
  n => {
    if (n) {
      colsChecks.value = colsList.value.filter(item => item.displayFlag).map(item1 => item1.columnName);
    }
  },
  { deep: true }
);

const init = async() => {
  colsList.value = await getColsList();
};
const ok = async() => {
  const result = colsList.value.map(item => {
    return {
      ...item,
      displayFlag: !!colsChecks.value.includes(item.columnName)
    };
  });
  await apiWarningWholeAnalysisObj.postSaveFunctionUserColumn(PAGE_CODE, JSON.stringify(result));
  emit('handleUpdateCols');
  emit('close');
};

init();
</script>
