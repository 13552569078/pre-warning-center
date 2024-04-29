<template>
  <teleport to="#pageAction" v-if="showTeleport">
    <hl-button @click="$router.go(-1)">返回</hl-button>
  </teleport>
  <fx-page-detail :detail-opt='detailOpt' />
</template>
<script lang="ts" setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useTele, FxPageDetail, PageDetailOption } from 'fx-front-framework';
import { Indexable } from 'fx-front-utils';
import { apiMonitorFactorObj } from '@/apis/modules/monitoring-factor';
const router = useRouter();
const route = useRoute();
const { showTeleport } = useTele();
const detailOpt = reactive({
  cols: [
    {
      label: '风险类型',
      key: 'riskTypeName',
      slot: '', // 可以定义插槽
    },
    {
      label: '因子编码',
      key: 'factorCode',
    },
    {
      label: '监测因子',
      key: 'factorName',
    },
    {
      label: '数据类型',
      key: 'factorDataTypeName',
    },
    {
      label: '设施类型',
      key: 'facilityTypeName',
    },
    {
      label: '计量单位',
      key: 'measureUnitName',
    },
    {
      label: '启用状态',
      key: 'useStateName',
    },
    {
      label: '预警类型',
      key: 'warningTypeName',
    },
    {
      label: '描述',
      key: 'factorDesc',
    },
  ],
  data: {} as Indexable<string>,
} as unknown as PageDetailOption);

const telId = computed(() => route.query.id);

onMounted(async() => {
  const { data } = await apiMonitorFactorObj.getFindMonitorFactorMonitorFactor(
    telId.value as string
  );
  detailOpt.title = data.factorName + '因子';
  detailOpt.data = data as Indexable<any>;
});
</script>
