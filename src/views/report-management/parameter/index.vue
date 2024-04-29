<template>
  <left-right-layout>
    <template #left>
      <left-tree
        ref="tree"
        :currentId="monitorPointId"
        @upActiveId="upActiveId"
        @upUniqueId="upUniqueId"
        @update:EventNode="updateEventNode"></left-tree>
    </template>
    <template #right>
      <right-list :param-group-id="monitorPointId" :unique-id="uniquePointId" :event-node="eventNodeData" @updated="handleTableUpdated"></right-list>
    </template>
  </left-right-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { LeftRightLayout } from '@/components';
import { RightList, LeftTree } from './components';
import { IgetListMonitorEventTreesSpace } from '@/apis/modules/access-data/model';

const monitorPointId = ref('');
const uniquePointId = ref('');
const eventNodeData = ref<IgetListMonitorEventTreesSpace.Data>();
const tree = ref();

const upActiveId = (id: string) => {
  // console.log(id, 111);
  monitorPointId.value = id;
};
const upUniqueId = (id: string) => {
  uniquePointId.value = id;
};
const updateEventNode = (eventNode: IgetListMonitorEventTreesSpace.Data) => {
  eventNodeData.value = eventNode;
};

const handleTableUpdated = () => {
  console.log(monitorPointId.value, 888);
  tree.value.getTreeData();
};
</script>
