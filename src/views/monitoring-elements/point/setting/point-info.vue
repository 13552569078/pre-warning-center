<template>
  <hl-group class="bg-content m-b-md" align="items-center items-middle" style="height: 168px;" full>
    <hl-group class="p-y-lg w-full" style="padding-right: 80px; padding-left: 300px;" align="items-middle" full>
      <hl-group align="items-left items-middle" class="w-full" gap="var(--md)">
        <hl-icon size="xl" fill class="radius-lg" effect="light" type="primary">
          <FillMonitor></FillMonitor>
        </hl-icon>
        <hl-group align="items-left items-top" dir="vertical" gap="var(--xxs)">
          <h3 class="text-regular text-center">{{ unitName }}</h3>
          <div class="text-secondary">当前监测点</div>
        </hl-group>
      </hl-group>
      <hl-group align="items-left items-middle" class="w-full" gap="var(--md)">
        <hl-icon size="xl" fill class="radius-lg" effect="light" type="success">
          <FillChartDoughnut></FillChartDoughnut>
        </hl-icon>
        <hl-group align="items-center items-top" dir="vertical" gap="var(--xxs)">
          <div class="text-regular font-lg font-bold text-center">{{ regionName }}</div>
          <div class="text-secondary text-center">监测主体</div>
        </hl-group>
      </hl-group>
      <hl-group align="items-left items-middle" class="w-full" gap="var(--md)">
        <hl-icon size="xl" fill class="radius-lg" effect="light" type="warning">
          <FillMap></FillMap>
        </hl-icon>
        <hl-group align="items-center items-top" dir="vertical" gap="var(--xxs)">
          <div class="text-regular font-lg font-bold text-center">{{ address }}</div>
          <div class="text-secondary text-center">位置</div>
        </hl-group>
      </hl-group>
    </hl-group>
  </hl-group>

</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { useTele, FxPageDetail, PageDetailOption } from 'fx-front-framework';
import { useI18n } from 'vue-i18n';
import { Indexable } from 'fx-front-utils';
const { t } = useI18n();
const detailOpt = reactive({
  cols: [
    {
      label: '监测点名称',
      key: 'unitName',
    },
    {
      label: '监测点编码',
      key: 'unitCode',
    },
    {
      label: `${t('region')}`,
      key: 'regionName',
    },
    {
      label: '设施类型',
      key: 'facilityTypeName',
    },
    {
      label: '设施名称',
      slot: 'facilityNameList',
    },
    {
      label: '点位类型',
      key: 'unitTypeName',
    },
    {
      label: '位置',
      key: 'address',
    },
    {
      label: '监测设备',
      slot: 'equipNameList',
    },
    {
      label: `${t('longitude')}`,
      key: 'longitude',
    },
    {
      label: `${t('latitude')}`,
      key: 'latitude',
    },
    {
      label: '高程(高程基准)',
      slot: 'altitudeDatumName',
    },
    {
      label: '启用时间',
      key: 'useStateTime',
    },
    {
      label: '最新更新时间',
      key: 'updatedAt',
    },
    {
      label: '描述',
      key: 'description',
    },
  ],
  imageOpt: {
    show: true,
    title: '相关附件',
    list: [] as string[],
  },
  data: {} as Indexable<any>,
} as unknown as PageDetailOption);

const props = defineProps({
  unitName: {
    type: String,
    default: ''
  },
  regionName: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
});

</script>

<style lang="scss" scoped>
  .bg-content {
    background: url('~@/assets/images/_bg.svg') no-repeat;
  }
</style>
