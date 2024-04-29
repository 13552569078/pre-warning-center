<template>
  <hl-dialog
    :model-value="true"
    class="md-dialog"
    width="820px"
    title="建筑工地设施详情"
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
      label: '建筑工地名称',
      key: 'facilityName',
    },
    {
      label: '建筑工地类型',
      key: 'siteTypeName',
    },
    {
      label: '施工单位',
      key: 'constructionUnit',
    },
    {
      label: '项目开始时间',
      key: 'projectStartTime',
    },
    {
      label: '项目结束时间',
      slot: 'projectEndTime',
    },
    {
      label: '地址',
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
      label: '行政区划',
      key: 'areaName',
    },
    {
      label: '施工单位责任人',
      key: 'constructionPerson',
    },
    {
      label: '施工单位责任人电话',
      key: 'constructionTel',
    },
    {
      label: '设计建筑面积',
      key: 'architectureArea',
    },
    {
      label: '地基挖方量',
      key: 'foundationDig',
    },
    {
      label: '挖槽土运出量',
      key: 'trenchSoil',
    },
    {
      label: '施工建筑垃圾产生量',
      key: 'constructionWaste',
    },
    {
      label: '施工可回收废物产生量',
      key: 'constructionRecyclableWaste',
    },
    {
      label: '拆除建筑物面积',
      key: 'dismantleArea',
    },
    {
      label: '装修垃圾产生量',
      key: 'renovationWaste',
    },
    {
      label: '拆除可回收废物量',
      key: 'dismantleRecyclableWaste',
    },
    {
      label: '总覆盖面积',
      key: 'totalCoverArea',
    },
    {
      label: '总挖掘体积',
      key: 'totalExcavateVolume',
    },
    {
      label: '残留体积',
      key: 'remainVolume',
    },
    {
      label: '准运证编号',
      key: 'transportPermitNo',
    },
    {
      label: '标准有效期起始日期',
      key: 'standardValidityStartTime',
    },
    {
      label: '标准有效期截止日期',
      key: 'standardValidityEndTime',
    },
    {
      label: '称重设备代码',
      key: 'weighDeviceCode',
    },
    {
      label: '备注',
      key: 'siteDesc',
    },
  ],
  imageOpt: {
    show: true,
    title: '场景照片',
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
  // areaList.value = await getAreaList();
  // const { data } = await apiFacilitySiteObj.getTypeList();
  // typeList.value = data;
  if (props.id.length) {
    const { data } = await apiFacilitySiteObj.getFacilitySite(props.id);
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
