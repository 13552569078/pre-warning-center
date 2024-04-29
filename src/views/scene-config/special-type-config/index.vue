<template>
  <left-right-layout>
    <template #left>
      <left-tree @updateSceneCode="updateSceneCode"></left-tree>
    </template>
    <template #right>
      <right-list :sceneCodes="sceneCodes" v-if="sceneCodes.length"/>
    </template>
  </left-right-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { LeftRightLayout } from '@/components';
import { LeftTree, RightList } from './components';

const sceneCodes = ref([]);
const updateSceneCode = (code: string) => {
  sceneCodes.value = code;
};
</script>
