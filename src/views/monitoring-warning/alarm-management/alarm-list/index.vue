<template>
  <right-list :current-node="currentNode"></right-list>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { LeftRightLayout } from '@/components';
import LeftTree from '@/views/monitoring-warning/components/tree.vue';
import { IgetListMonitorEventTreesSpace } from '@/apis/modules/access-data/model';
import { RightList } from './components';

const currentNode = ref();

const upActiveNode = (data: IgetListMonitorEventTreesSpace.Data) => {
  currentNode.value = data;
};
</script>
