<template>
  <common-detail :detail-opt="detailOpt" customClass="dialog-inner-detail">
    <!-- 设施名称 -->
    <template #facilityNameList="{ detail }">
      {{ detail.facilityNameList && detail.facilityNameList !== '-' && detail.facilityNameList.length ? detail.facilityNameList.join('；') : '--' }}
    </template>
    <!-- 监测设备 -->
    <template #equipNameList="{ detail }">
      {{ detail.equipNameList && detail.equipNameList !== '--' ? detail.equipNameList.join('；') : '--' }}
    </template>
    <!-- 设施名称 -->
    <template #isInvented="{ detail }">
      <span class="text-bold">{{ detail.isInvented === undefined ? '--' : detail.isInvented === 1 ? '是' : '否' }}</span>
    </template>
    <!-- altitudeDatumName 高程(高程基准)-->
    <template #altitudeDatumName="{ detail }"> {{ detail.altitude }}({{ detail.altitudeDatumName }}) </template>
  </common-detail>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { PageDetailOption } from 'fx-front-framework';
import { Indexable } from 'fx-front-utils';
import { useI18n } from 'vue-i18n';
import { GlobalAPI } from '@/common';
import { useMonitorUnit } from '../hook';
import { getFileDirUrl } from '@/common';

const { getMonitorUnitDetail } = useMonitorUnit();

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
});

const { t } = useI18n();

const basicDetail = [
  {
    label: '监测点名称',
    key: 'unitName'
  },
  {
    label: `${t('region')}`,
    key: 'regionName'
  },
  {
    label: '位置',
    key: 'address'
  },
  // {
  //   label: '监测设备',
  //   slot: 'equipNameList',
  // },
  {
    label: `${t('longitude')}`,
    key: 'longitude'
  },
  {
    label: `${t('latitude')}`,
    key: 'latitude'
  },
  {
    label: '启用时间',
    key: 'useStateTime'
  },
  {
    label: '最新更新时间',
    key: 'updatedAt'
  },
  { label: '是否虚拟', slot: 'isInvented' },
  {
    label: '业务标识',
    key: 'functionIdentifier'
  },
  {
    label: '描述',
    key: 'description',
    span: 'col-span-3'
  }
];

const additionDetail = [
  {
    label: '监测点名称',
    key: 'unitName'
  },
  // {
  //   label: '监测点编码',
  //   key: 'unitCode',
  // },
  {
    label: `${t('region')}`,
    key: 'regionName'
  },
  {
    label: '设施类型',
    key: 'facilityTypeName'
  },
  {
    label: '设施名称',
    slot: 'facilityNameList'
  },
  {
    label: '点位类型',
    key: 'unitTypeName'
  },
  {
    label: '位置',
    key: 'address'
  },
  // {
  //   label: '监测设备',
  //   slot: 'equipNameList',
  // },
  {
    label: `${t('longitude')}`,
    key: 'longitude'
  },
  {
    label: `${t('latitude')}`,
    key: 'latitude'
  },
  {
    label: '高程(高程基准)',
    slot: 'altitudeDatumName'
  },
  {
    label: '启用时间',
    key: 'useStateTime'
  },
  {
    label: '最新更新时间',
    key: 'updatedAt'
  },
  {
    label: '描述',
    key: 'description'
  }
];

const detailOpt = reactive({
  cols: GlobalAPI.config.DEPLOY_TYPE_CENTRE_CONFIG === 'product' ? basicDetail : additionDetail,
  imageOpt: {
    show: true,
    title: '相关附件',
    list: [] as string[]
  },
  data: {} as Indexable<any>
} as unknown as PageDetailOption);

onMounted(async () => {
  detailOpt.data = await getMonitorUnitDetail(props.id);
  detailOpt.imageOpt!.list =
    detailOpt.data.photoFile && detailOpt.data.photoFile.length
      ? detailOpt.data.photoFile.map((item: any) => {
        return getFileDirUrl(item);
      })
      : [];
});
</script>

<style lang="scss" scoped>
.rule-list {
  --collapse-bg-color: var(--bg-content);
  --collapse-border-color: var(--factor-bg-color);
  margin-bottom: var(--xl);
  .rule-item {
    margin-top: calc(var(--sm));
    padding: calc(var(--lg));
    padding-top: calc(var(--md));
    padding-bottom: calc(var(--md));
    background: var(--bg-light);
    margin-left: calc(var(--lg) + var(--xl));
  }
}
.sepatator-line {
  width: 100%;
  height: 1px;
  background: var(--border-regular);
}
</style>
