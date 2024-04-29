<template>

  <left-right-layout>
    <template #left>
      <event-type-tree
        ref="leftTree"
        readonly
        @click="loadTableData"
      />
    </template>
    <template #right>
      <event-type-table ref="rightTable" table-type="strategy" @config="configStrategy" />
    </template>
  </left-right-layout>
  <config-dlg v-if="dlgVisible" :id="editingId" @ok="ok" @cancel="dlgVisible=false"/>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { LeftRightLayout } from '@/components';
import { EventTypeTree, EventTypeTable } from '@/views/monitoring-config/event-type/components';
import ConfigDlg from './config-dlg.vue';
import { IgetListEventTypeVOPageEventTypeSpace } from '@/apis/modules/event-type/model';

const rightTable = ref();
const dlgVisible = ref(false);
const editingId = ref();
const currentSystemCode = ref('');

const loadTableData = (node: { data: { systemCode: string; } }) => {
  currentSystemCode.value = node.data.systemCode;
  rightTable.value.queryBySystemCode(node.data.systemCode);
};
const configStrategy = (row: IgetListEventTypeVOPageEventTypeSpace.List) => {
  editingId.value = row.systemCode;
  dlgVisible.value = true;
};
const ok = () => {
  dlgVisible.value = false;
  rightTable.value.queryBySystemCode(currentSystemCode.value);
};

</script>
