<template>
  <left-right-layout>
    <template #left>
      <access-object-tree ref="leftTree" @click="loadTableData" @refresh="refresh"/>
    </template>
    <template #right>
      <access-object-table
        ref="rightTable"
        :access-type="accessSourceType"
        :access-source-id="accessSourceId"
        :access-source-name="accessSourceName"
        @updated="refreshTree"/>
    </template>
  </left-right-layout>
</template>
<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import { LeftRightLayout } from '@/components';
import { accessObjectTree, accessObjectTable } from './components';

const accessSourceType = ref('');
const accessSourceId = ref('');
const accessSourceName = ref('');
const leftTree = ref();
const rightTable = ref();

const loadTableData = ({ data }:any) => {
  accessSourceType.value = data.accessSourceType;
  accessSourceId.value = data.accessSourceId > 10 ? data.accessSourceId : '';
  accessSourceName.value = data.accessSourceName;
  nextTick(() => {
    rightTable.value.refreshTable();
  });
};
const refresh = () => {
  accessSourceType.value = '';
  accessSourceId.value = '';
  nextTick(() => {
    rightTable.value.refreshTable();
  });
};

const refreshTree = () => {
  leftTree.value.getData();
};

</script>
