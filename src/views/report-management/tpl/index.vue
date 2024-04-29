<template>
  <left-right-layout>
    <template #left>
      <Tree ref="tree" @click="loadTableData"></Tree>
    </template>
    <template #right>
      <Table :template-model="templateModel" ref="rightTable" @updated="handleTableUpdated"></Table>
    </template>
  </left-right-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Tree, Table } from './components/index';

const templateModel = ref();
const rightTable = ref();
const tree = ref();

const loadTableData = (data: any) => {
  templateModel.value = data;
};

const handleTableUpdated = () => {
  tree.value.getData();
};
</script>
