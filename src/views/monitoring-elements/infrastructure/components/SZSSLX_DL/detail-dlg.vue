<template>
  <hl-dialog
    :model-value="true"
    class="md-dialog"
    width="820px"
    title="道路设施详情"
    @close="$emit('close')"
    :close-on-click-modal="false"
    borderless
  >
    <common-detail :detail-opt='detailOpt' />
    <common-detail :detail-opt='detailOpt2' class="m-t-lg" />
    <common-detail :detail-opt='detailOpt3' class="m-t-lg" />
  </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Indexable } from 'fx-front-utils';
import { useI18n } from 'vue-i18n';
import { getFileDirUrl } from '@/common';
import { apiFacilityRoadObj as api } from '@/apis/modules/special-facility/facility-road';

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
      label: '道路名称',
      key: 'facilityName',
    },
    {
      label: '道路类别',
      key: 'roadTypeName',
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
      label: '道路位置',
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
      label: '道路状态',
      key: 'facilityStateVal',
    },
    {
      label: '备注',
      key: 'roadDesc',
    },
  ],
  imageOpt: {
    show: true,
    title: '设施照片',
    list: [] as string[],
  },
  data: {} as Indexable<any>,
});

const detailOpt2 = reactive({
  title: '道路识别信息',
  cols: [
    {
      label: '道路等级',
      key: 'roadLevel',
    },
    {
      label: '道路长度(m)',
      key: 'roadLength',
    },
    {
      label: '道路宽度(m)',
      key: 'roadWidth',
    },
    {
      label: '道路面积(㎡)',
      key: 'roadArea',
    },
    {
      label: '车行道面积(㎡)',
      key: 'roadwayArea',
    },
    {
      label: '人行道面积(㎡)',
      key: 'sidewalkArea',
    },
    {
      label: '年度改造长度(km)',
      key: 'reformLength',
    },
    {
      label: '年度改造(万㎡)',
      key: 'reformArea',
    },
  ],
  data: {} as Indexable<any>,
});

const detailOpt3 = reactive({
  title: '道路附属设施信息',
  cols: [
    {
      label: '排水管道长度(km)',
      key: 'drainLength',
    },
    {
      label: '雨水管道长度(km)',
      key: 'rainPipeLength',
    },
    {
      label: '污水管道长度(km)',
      key: 'sewageConduitLength',
    },
    {
      label: '雨污合流管道长度(km)',
      key: 'rainSewageLength',
    },
    {
      label: '进水口数量(座)',
      key: 'intakeNum',
    },
    {
      label: '排水井数量(座)',
      key: 'drainageWellNum',
    },
    {
      label: '社会单位井盖数(座)',
      key: 'socialWellNum',
    },
    {
      label: '盲道长度(m)',
      key: 'blindRoadLength',
    },
    {
      label: '盲道口数量(个)',
      key: 'blindRoadNum',
    },
    {
      label: '铁护栏长度(m)',
      key: 'ironGuardrailLength',
    },
    {
      label: '石护栏长度(m)',
      key: 'stoneGuardrailLength',
    },
    {
      label: '防撞护栏长度(m)',
      key: 'crashGuardrailLength',
    },
    {
      label: '盲中间隔离护栏长度(m)',
      key: 'isolationGuardrailLength',
    },
    {
      label: '隔离墩数量(个)',
      key: 'roadBarrierNum',
    },
    {
      label: '挡墙体积(m³)',
      key: 'retainWallVolume',
    },
    {
      label: '路铭牌数量(块)',
      key: 'roadNameplateNum',
    },
  ],
  data: {} as Indexable<any>,
});

onMounted(async() => {
  if (props.id.length) {
    const { data } = await api.getFacilityRoad(props.id);
    detailOpt.imageOpt.list =
      data.photoFile && data.photoFile.length
        ? data.photoFile.map((item: any) => {
          return getFileDirUrl(item);
        })
        : [];
    detailOpt.data = data;
    detailOpt2.data = data;
    detailOpt3.data = data;
  }
});
</script>
