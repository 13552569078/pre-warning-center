<template>
  <location-map></location-map>
  <left-right-layout>
    <template #left>
      <facility-type-tree
        ref="leftTree"
        :readonly="true"
        @changeNode="upActiveId"
      />
    </template>
    <template #right>
      <template v-if="refreshFlag">
        <!-- 燃气类 -->
        <SZSSLX_RQ
          v-if="regionTypeCode === 'SZSSLX_RQ'"
          :regionTypeCode="regionTypeCode"
        />
        <!-- 供水类 -->
        <SZSSLX_GS
          v-if="regionTypeCode === 'SZSSLX_GS'"
          :regionTypeCode="regionTypeCode"
        />
        <!-- 排水类 -->
        <SZSSLX_PS
          v-if="regionTypeCode === 'SZSSLX_PS'"
          :regionTypeCode="regionTypeCode"
        />
        <!-- 供热类 -->
        <SZSSLX_GR
          v-if="regionTypeCode === 'SZSSLX_GR'"
          :regionTypeCode="regionTypeCode"
        />
        <!-- 管廊类 -->
        <SZSSLX_GL
          v-if="regionTypeCode === 'SZSSLX_GL'"
          :regionTypeCode="regionTypeCode"
        />
        <!-- 环卫设施类 -->
        <SZSSLX_HW
          v-if="regionTypeCode === 'SZSSLX_HW'"
          :regionTypeCode="regionTypeCode"
        />
        <!-- 道路类 -->
        <SZSSLX_DL
          v-if="regionTypeCode === 'SZSSLX_DL'"
          :regionTypeCode="regionTypeCode"
        />
        <!-- 房屋设施类 -->
        <FWSSLX_DT
          v-if="regionTypeCode === 'FWSSLX_DT'"
          :regionTypeCode="regionTypeCode"
        />
        <!-- 桥梁类 -->
        <JTSSLX_QL
          v-if="regionTypeCode === 'JTSSLX_QL'"
          :regionTypeCode="regionTypeCode"
        />
        <!-- 隧道设施 -->
        <JTSSLX_SD
          v-if="regionTypeCode === 'JTSSLX_SD'"
          :regionTypeCode="regionTypeCode"
        />
        <!-- 建筑工地 -->
        <JZGD_DL
          v-if="regionTypeCode === 'JZGD_DL'"
          :regionTypeCode="regionTypeCode"
        />
        <!-- 照明设施 -->
        <SZSSLX_ZM
          v-if="regionTypeCode === 'SZSSLX_ZM'"
          :regionTypeCode="regionTypeCode"
        />
        <!-- 人员密集场所 -->
        <RYMJCS_DL
          v-if="regionTypeCode === 'RYMJCS_DL'"
          :regionTypeCode="regionTypeCode"
        />
      </template>
    </template>
  </left-right-layout>
</template>
<script lang="ts" setup>
import { ref, onMounted, onActivated, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { LeftRightLayout, LocationMap } from '@/components';
import {
  SZSSLX_RQ,
  SZSSLX_GS,
  SZSSLX_PS,
  SZSSLX_GR,
  SZSSLX_GL,
  SZSSLX_HW,
  SZSSLX_DL,
  FWSSLX_DT,
  JTSSLX_QL,
  JTSSLX_SD,
  JZGD_DL,
  SZSSLX_ZM,
  RYMJCS_DL,
} from './components';
import { FacilityTypeTree } from '@/views/system-common-config/facility-type-config/components';

const route = useRoute();
const regionTypeCode = ref('');
const refreshFlag = ref(true);

const upActiveId = (id: string) => {
  console.log(id);
  regionTypeCode.value = id;
};
onMounted(() => {
  regionTypeCode.value = (route.query.typeCode as string) || '';
});
onActivated(() => {
  console.log('active');
  refreshFlag.value = false;
  nextTick(() => {
    refreshFlag.value = true;
  });
});
</script>
