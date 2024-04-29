<template>
  <!-- 公用基础设施表单模板 -->
  <!-- 燃气类 -->
  <SZSSLX_RQ_FORM
    v-if="typeCode === 'SZSSLX_RQ'"
    :id="facilityId"
    :action="action"
    :typeCode="typeCode"
  />
  <!-- 供水类 -->
  <SZSSLX_GS_FORM
    v-if="typeCode === 'SZSSLX_GS'"
    :id="facilityId"
    :action="action"
    :typeCode="typeCode"
  />
  <!-- 排水类 -->
  <SZSSLX_PS_FORM
    v-if="typeCode === 'SZSSLX_PS'"
    :id="facilityId"
    :action="action"
    :typeCode="typeCode"
  />
  <!-- 供热类 -->
  <SZSSLX_GR_FORM
    v-if="typeCode === 'SZSSLX_GR'"
    :id="facilityId"
    :action="action"
    :typeCode="typeCode"
  />
  <!-- 管廊类 -->
  <SZSSLX_GL_FORM
    v-if="typeCode === 'SZSSLX_GL'"
    :id="facilityId"
    :action="action"
    :typeCode="typeCode"
  />
  <!-- 环卫设施类 -->
  <SZSSLX_HW_FORM
    v-if="typeCode === 'SZSSLX_HW'"
    :id="facilityId"
    :action="action"
    :typeCode="typeCode"
  />
  <!-- 道路类 -->
  <SZSSLX_DL_FORM
    v-if="typeCode === 'SZSSLX_DL'"
    :id="facilityId"
    :action="action"
    :typeCode="typeCode"
  />
  <!-- 房屋设施类 -->
  <FWSSLX_DT_FORM
    v-if="typeCode === 'FWSSLX_DT'"
    :id="facilityId"
    :action="action"
    :typeCode="typeCode"
  />
  <!-- 桥梁类 -->
  <JTSSLX_QL_FORM
    v-if="typeCode === 'JTSSLX_QL'"
    :id="facilityId"
    :action="action"
    :typeCode="typeCode"
  />
  <!-- 隧道设施 -->
  <JTSSLX_SD_FORM
    v-if="typeCode === 'JTSSLX_SD'"
    :id="facilityId"
    :action="action"
    :typeCode="typeCode"
  />
  <!-- 建筑工地 -->
  <JZGD_DL_FORM
    v-if="typeCode === 'JZGD_DL'"
    :id="facilityId"
    :action="action"
    :typeCode="typeCode"
  />
  <!-- 照明设施 -->
  <SZSSLX_ZM_FORM
    v-if="typeCode === 'SZSSLX_ZM'"
    :id="facilityId"
    :action="action"
    :typeCode="typeCode"
  />
  <!-- 人员密集场所 -->
  <RYMJCS_DL_FORM
    v-if="typeCode === 'RYMJCS_DL'"
    :id="facilityId"
    :action="action"
    :typeCode="typeCode"
  />
</template>
<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  SZSSLX_RQ_FORM,
  SZSSLX_GS_FORM,
  SZSSLX_PS_FORM,
  SZSSLX_GR_FORM,
  SZSSLX_GL_FORM,
  SZSSLX_HW_FORM,
  SZSSLX_DL_FORM,
  FWSSLX_DT_FORM,
  JTSSLX_QL_FORM,
  JTSSLX_SD_FORM,
  JZGD_DL_FORM,
  SZSSLX_ZM_FORM,
  RYMJCS_DL_FORM,
} from './components';

const router = useRouter();
const route = useRoute();
const facilityId = computed(() => route.query.facilityId);
// action: add edit
const action = computed(() => route.query.action);
const typeCode = computed(() => route.query.typeCode);
</script>
