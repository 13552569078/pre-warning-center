<template>
  <left-right-layout>
    <template #left>
      <Tree @click="loadTableData"></Tree>
    </template>
    <template #right>
      <Table :template-model="templateModel" ref="rightTable"></Table>
    </template>
  </left-right-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Tree, Table } from './components/index';

const templateModel = ref();
const rightTable = ref();

const loadTableData = (data: any) => {
  templateModel.value = data;
};
</script>
