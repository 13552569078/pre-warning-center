<template>
  <div class="table-wrap">
    <right-top-card />
    <right-list :current-node="currentNode"></right-list>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { LeftRightLayout } from '@/components';
import LeftTree from '@/views/monitoring-warning/components/tree.vue';
import { IgetListMonitorEventTreesSpace } from '@/apis/modules/access-data/model';
import { RightList, RightTopCard } from './components';

const currentNode = ref();

const upActiveNode = (data: IgetListMonitorEventTreesSpace.Data) => {
  currentNode.value = data;
};
</script>
<style scoped lang="scss">
.table-wrap {
  height: 100%;

  .table-v2 {
    height: calc(100% - 154px);
  }
}

// .table-v2 {
//   height: 100%;
// }
</style>
