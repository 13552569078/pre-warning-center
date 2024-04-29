<template>
  <hl-dialog
    :model-value="true"
    class="md-dialog"
    width="820px"
    title="燃气设施详情"
    @close="$emit('close')"
    :close-on-click-modal="false"
    borderless
  >
    <CommonDetail
      :detail-opt='detailOpt'
      count="count-3"
      :onlyInfo="true"
    />
  </hl-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { Indexable } from 'fx-front-utils';
import { useI18n } from 'vue-i18n';
import { getFileDirUrl } from '@/common';
import { apiFacilityGasObj } from '@/apis/modules/special-facility/facility-gas';

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  typeCode: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['close']);
const { t } = useI18n();

const detailOpt = reactive({
  cols: [
    {
      label: '设施名称',
      key: 'facilityName',
    },
    {
      label: '设施类别',
      key: 'gasTypeName',
    },
    {
      label: '养护等级',
      key: 'maintainLevelName',
    },
    {
      label: '养护单位',
      key: 'maintainUnitVal',
    },
    {
      label: '主管部门',
      key: 'directeUnitVal',
    },
    {
      label: '行政区划',
      key: 'areaName',
    },
    {
      label: '设施地址',
      key: 'address',
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
      label: '权属单位',
      key: 'owerUnitVal',
    },
    {
      label: '设计单位',
      key: 'designUnitName',
    },
    {
      label: '建设单位',
      key: 'buildUnitName',
    },
    {
      label: '监理单位',
      key: 'superviseUnitName',
    },
    {
      label: '施工单位',
      key: 'workUnitName',
    },
    {
      label: '建成时间',
      key: 'completedTime',
    },
    {
      label: '总造价（万元）',
      key: 'totalCost',
    },
    {
      label: '设施状态',
      key: 'facilityStateVal',
    },
    {
      label: '备注',
      key: 'gasDesc',
    },
  ],
  imageOpt: {
    show: true,
    title: '设施照片',
    list: [] as string[],
  },
  data: {} as Indexable<any>,
});

onMounted(async() => {
  if (props.id.length) {
    const { data } = await apiFacilityGasObj.getFacilityGas(props.id);
    detailOpt.imageOpt.list =
      data.photoFile && data.photoFile.length
        ? data.photoFile.map((item: any) => {
          return getFileDirUrl(item);
        })
        : [];
    detailOpt.data = data;
  }
});
</script>
