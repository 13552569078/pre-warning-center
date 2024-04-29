<template>
  <hl-dialog
    :model-value="true"
    class="md-dialog"
    width="820px"
    title="房屋设施详情"
    @close="$emit('close')"
    :close-on-click-modal="false"
    borderless
  >
    <common-detail :detail-opt='detailOpt'>
    </common-detail>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Indexable } from 'fx-front-utils';
import { useI18n } from 'vue-i18n';
import { getFileDirUrl } from '@/common';
import { apiFacilitySiteObj } from '@/apis/modules/special-facility/facility-site';
import { apiFacilityBuildingObj as api } from '@/apis/modules/special-facility/facility-building';
import {
  IgetTypeListSpace,
  IgetFacilitySiteSpace,
} from '@/apis/modules/special-facility/facility-site/model';

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

// const emit = defineEmits(['refreshList']);
const router = useRouter();
const { t } = useI18n();

const detailOpt = reactive({
  cols: [
    {
      label: '房屋名称',
      key: 'facilityName',
    },
    {
      label: '房屋类别',
      key: 'buildingTypeName',
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
      label: '房屋地址',
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
      label: '房屋状态',
      key: 'facilityStateVal',
    },
    {
      label: '备注',
      key: 'buildingDesc',
    },
  ],
  imageOpt: {
    show: true,
    title: '房屋照片',
    list: [] as string[],
  },
  data: {} as Indexable<any>,
});

const cancel = () => {
  router.push({
    name: 'infrastructure',
    query: {
      typeCode: props.typeCode,
    },
  });
};

onMounted(async() => {
  if (props.id.length) {
    const { data } = await api.getFacilityBuilding(props.id);
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
