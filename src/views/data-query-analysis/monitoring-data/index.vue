<template>
  <left-right-layout>
    <template #left>
      <left-tree
        @upActiveId="upActiveId"
        @upUniqueId="upUniqueId"
        @update:EventNode="updateEventNode"></left-tree>
    </template>
    <template #right>
      <right-list :monitor-point-id="monitorPointId" :unique-id="uniquePointId" :event-node="eventNodeData"></right-list>
    </template>
  </left-right-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { LeftRightLayout } from '@/components';
import { RightList } from './components';
import { LeftTree } from './components';
import { IgetListMonitorEventTreesSpace } from '@/apis/modules/access-data/model';

const monitorPointId = ref('');
const uniquePointId = ref('');
const eventNodeData = ref<IgetListMonitorEventTreesSpace.Data>();

const upActiveId = (id: string) => {
  monitorPointId.value = id;
};
const upUniqueId = (id: string) => {
  uniquePointId.value = id;
};
const updateEventNode = (eventNode: IgetListMonitorEventTreesSpace.Data) => {
  eventNodeData.value = eventNode;
};
</script>
