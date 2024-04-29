<template>
  <left-right-layout>
    <template #left>
      <left-tree ref="tree" @upActiveId="upActiveId"></left-tree>
    </template>
    <template #right>
      <right-list :region-type-code="regionTypeCode" @updated="updated"></right-list>
    </template>
  </left-right-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { LeftRightLayout } from '@/components';
import { RightList, LeftTree } from './components';

const regionTypeCode = ref('');
const tree = ref();

const upActiveId = (id: string | number) => {
  regionTypeCode.value = id === -1 ? '' : id as string;
};

const updated = () => {
  tree.value.getList();
};

</script>
