<template>
<hl-dialog
    :model-value="true"
    class="md-dialog"
    width="820px"
    title="隧道设施详情"
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
import { apiFacilityTunnelObj } from '@/apis/modules/special-facility/facility-tunnel';
import { IpostPageListSpace } from '@/apis/modules/special-facility/facility-tunnel/model';

const { showTeleport } = useTele();
const { t } = useI18n();

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

const detailOpt = reactive({
  title: '隧道基础信息',
  cols: [
    {
      label: '隧道名称',
      key: 'facilityName',
    },
    {
      label: '隧道类别',
      key: 'tunnelTypeName',
    },
    {
      label: '隧道位置',
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
      label: '隧道状态',
      key: 'facilityStateVal',
    },
    {
      label: '备注',
      key: 'tunnelDesc',
    },
  ],
  imageOpt: {
    show: true,
    title: '隧道照片',
    list: [] as string[],
  },
  data: {} as Indexable<any>,
});
const detailOpt2 = reactive({
  title: '隧道识别信息',
  cols: [
    {
      label: '隧道等级',
      key: 'tunnelLevelVal',
    },
    {
      label: '隧道长度(m)',
      key: 'tunnelLength',
    },
    {
      label: '隧道净高(m)',
      key: 'tunnelHeight',
    },
    {
      label: '隧道宽度(m)',
      key: 'tunnelWidth',
    },
    {
      label: '穿越类型',
      key: 'acrossTypeVal',
    },
    {
      label: '隧道形式',
      key: 'tunnelType',
    },
    {
      label: '进口形式:',
      key: 'entranceType',
    },
    {
      label: '出口形式',
      key: 'exitType',
    },
    {
      label: '断面形式',
      key: 'sectionType',
    },
    {
      label: '路面类型:',
      key: 'pavementType',
    },
    {
      label: '路面纵坡(%):',
      key: 'longitudeSlope',
    },
    {
      label: '路面横坡(%):',
      key: 'crossSlope',
    },
    {
      label: '衬砌材料:',
      key: 'liningMaterial',
    },
    {
      label: '抗震烈度(度):',
      key: 'seismicIntensity',
    },
    {
      label: '设计荷载(t)',
      key: 'designLoad',
    },
    {
      label: '排水类型',
      key: 'drainageType',
    },
    {
      label: '照明情况:',
      key: 'lightInfo',
    },
    {
      label: '通风情况',
      key: 'ventilateInfo',
    },
    {
      label: '装饰情况',
      key: 'decorateInfo',
    },
    {
      label: '消防情况',
      key: 'fireControlInfo',
    },
    {
      label: '安全通道(个)',
      key: 'emergencyAccess',
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
    const { data } = await apiFacilityTunnelObj.getFacilityTunnel(props.id);
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
