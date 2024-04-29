<template>
  <hl-dialog
    :model-value="true"
    class="md-dialog"
    width="820px"
    :title="`${$t('region')}详情`"
    @close="$emit('close')"
    :close-on-click-modal="false"
    borderless
  >
    <CommonDetail
      :detail-opt='detailOpt'
      count="count-2"
      :onlyInfo="true"
    />
  </hl-dialog>
</template>
<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { Indexable } from 'fx-front-utils';

const { t } = useI18n();

const props = defineProps({
  detail: {
    type: Object,
    default: () => ({})
  }
});

const detailOpt = reactive({
  cols: [
    {
      label: '监测主体名称',
      key: 'regionName',
    },
    {
      label: '负责人',
      key: 'principalName',
    },
    {
      label: '负责人电话',
      key: 'principalMobile',
    },
    {
      label: '联系人',
      key: 'responsibleName',
    },
    {
      label: '联系人电话',
      key: 'responsibleMobile',
    },
    {
      label: '地址',
      key: 'address',
    },
    {
      label: '行政区划',
      key: 'streetAreaName',
    },
    {
      label: '业务标识',
      key: 'functionIdentifier',
    },
    {
      label: '描述',
      key: 'description',
      span: 'col-span-3'
    }
  ],
  imageVideoOpt: {
    show: true,
    title: '场景照片',
    list: [] as any[]
  },
  data: props.detail as Indexable<string>,
});

onMounted(() => {
  detailOpt.imageVideoOpt.list = props.detail.photoFile && props.detail.photoFile.length
    ? props.detail.photoFile.map(item => {
      return {
        ...item,
        id: item.id,
        name: item.originalName,
        url: item.url,
        attachmentType: 'IMAGE'
      };
    })
    : [];
  console.log(detailOpt.imageVideoOpt.list);
});

</script>
