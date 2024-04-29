<template>
  <hl-dialog :model-value="true" class="md-dialog" width="820px" title="监测设备详情" @close="$emit('close')" :close-on-click-modal="false" borderless>
    <CommonDetail :detail-opt="detailOpt" count="count-3" :onlyInfo="true" />
  </hl-dialog>
</template>
<script lang="ts" setup>
import { reactive, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Indexable } from 'fx-front-utils';
import { PageDetailOption } from 'fx-front-framework';
import { apiEquipmentObj } from '@/apis/modules/equipment';

const router = useRouter();
const route = useRoute();

const props = defineProps({
  id: String
});

const detailOpt = reactive({
  cols: [
    {
      label: '设备名称',
      key: 'equipName'
    },
    {
      label: '设备编号',
      key: 'equipCode'
    },
    // {
    //   label: '监测点',
    //   key: 'monitorUnitName',
    // },
    {
      label: '用途',
      key: 'useFor'
    },
    {
      label: '设备参数',
      key: 'equipParam'
    },
    // {
    //   label: '设施类型',
    //   key: 'facilityTypeName',
    // },
    {
      label: '设备类型',
      key: 'equipTypeName'
    },
    {
      label: '安装时间',
      key: 'installTime'
    },
    {
      label: '注册上线时间',
      key: 'registerTime'
    },
    {
      label: '监测点',
      key: 'monitorUnitName'
    },
    {
      label: '安装位置',
      key: 'address'
    },
    // {
    //   label: '所在区域',
    //   key: 'streetAreaCode',
    // },
    {
      label: '设备状态',
      key: 'equipStatusName'
    },
    {
      label: '描述',
      key: 'description',
      span: 'col-span-3'
    }
  ],
  data: {} as Indexable<string>
} as unknown as PageDetailOption);

const equipmentId = computed(() => props.id as string);

onMounted(async () => {
  const { data } = await apiEquipmentObj.getMonitorEquip(equipmentId.value);
  detailOpt.data = data;
});
</script>
