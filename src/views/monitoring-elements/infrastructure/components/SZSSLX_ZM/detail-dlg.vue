<template>
<hl-dialog
    :model-value="true"
    class="md-dialog"
    width="820px"
    title="照明设施详情"
    @close="$emit('close')"
    :close-on-click-modal="false"
    borderless
  >
    <common-detail :detail-opt='detailOpt' />
    <common-detail :detail-opt='detailOpt2' class="m-t-lg"></common-detail>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Indexable } from 'fx-front-utils';
import { useTele } from 'fx-front-framework';
import { useI18n } from 'vue-i18n';
import { getFileDirUrl } from '@/common';
import { apiFacilitySiteObj } from '@/apis/modules/special-facility/facility-site';
import { apiFacilityLightObj } from '@/apis/modules/special-facility/facility-light';

const { showTeleport } = useTele();

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
  title: '路灯基础信息',
  cols: [
    {
      label: '路灯名称',
      key: 'facilityName',
    },
    {
      label: '路灯类别',
      key: 'lightTypeName',
    },
    {
      label: '路灯位置',
      key: 'address',
    },
    {
      label: '行政区划',
      key: 'areaName',
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
      label: '所属道路',
      key: 'belongRoad',
    },
    {
      label: '所属路段',
      key: 'belongRoadSection',
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
      label: '路灯状态',
      key: 'facilityStateVal',
    },
    {
      label: '备注',
      key: 'lightDesc',
    },
  ],
  imageOpt: {
    show: true,
    title: '路灯照片',
    list: [] as string[],
  },
  data: {} as Indexable<any>,
});
const detailOpt2 = reactive({
  title: '路灯识别信息',
  cols: [
    {
      label: '路灯型号',
      key: 'lightModel',
    },
    {
      label: '采购时间',
      key: 'purchaseTime',
    },
    {
      label: '采购厂商',
      key: 'purchaseManufacturer',
    },
    {
      label: '保质期限',
      key: 'warrantyLimit',
    },
    {
      label: '灯杆类型',
      key: 'lamppostTypeVal',
    },
    {
      label: '灯杆编号',
      key: 'lamppostNo',
    },
    {
      label: '灯具类型:',
      key: 'lanternTypeVal',
    },
    {
      label: '灯具名称',
      key: 'lanternName',
    }
  ],
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
    const { data } = await apiFacilityLightObj.getFacilityLight(props.id);
    detailOpt.imageOpt.list =
      data.photoFile && data.photoFile.length
        ? data.photoFile.map((item: any) => {
          return getFileDirUrl(item);
        })
        : [];
    detailOpt.data = data;
    detailOpt2.data = data;
  }
});
</script>
