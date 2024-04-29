<template>
  <hl-dialog
    :model-value="true"
    class="md-dialog"
    width="820px"
    title="桥梁设施详情"
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
import { apiFacilitySiteObj } from '@/apis/modules/special-facility/facility-site';
import { apiFacilityBridgeObj } from '@/apis/modules/special-facility/facility-bridge';
import { IpostPageListSpace } from '@/apis/modules/special-facility/facility-bridge/model';
import { getFileDirUrl } from '@/common';

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
  title: '桥梁基础信息',
  cols: [
    {
      label: '桥梁名称',
      key: 'facilityName',
    },
    {
      label: '桥梁类别',
      key: 'bridgeTypeName',
    },
    {
      label: '桥梁位置',
      key: 'address',
    },
    {
      label: '行政区划',
      key: 'areaName',
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
      label: '桥梁状态',
      key: 'facilityStateVal',
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
      label: '备注',
      key: 'gasDesc',
    },
  ],
  imageOpt: {
    show: true,
    title: '桥梁照片',
    list: [] as string[],
  },
  data: {} as Indexable<any>,
});
const detailOpt2 = reactive({
  title: '桥梁识别信息',
  cols: [
    {
      label: '桥梁等级',
      key: 'bridgeLevelVal',
    },
    {
      label: '桥梁长度(m)',
      key: 'bridgeLength',
    },
    {
      label: '桥梁面积(㎡)',
      key: 'bridgeArea',
    },
    {
      label: '桥梁宽度(m)',
      key: 'bridgeWidth',
    },
    {
      label: '跨越种类',
      key: 'acrossTypeVal',
    },
    {
      label: '桥梁跨数(跨)',
      key: 'bridgeAcrossNum',
    },
    {
      label: '跨径组合:',
      key: 'spanCompose',
    },
    {
      label: '正斜交角(°)',
      key: 'positiveObliqueAngle',
    },
    {
      label: '抗震烈度(度)',
      key: 'seismicIntensity',
    },
    {
      label: '设计荷载(t):',
      key: 'designLoad',
    },
    {
      label: '限载标准(t)',
      key: 'loadLimit',
    },
    {
      label: '限高标准(m)',
      key: 'heightLimit',
    },
    {
      label: '河道等级',
      key: 'riverLevelVal',
    },
    {
      label: '河床标高(m)',
      key: 'riverbedHeight',
    },
    {
      label: '限高水位(m)',
      key: 'limitedHighWater',
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
    const { data } = await apiFacilityBridgeObj.getFacilityBridge(props.id);
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
