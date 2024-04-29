<template>
  <hl-dialog
    :model-value="true"
    class="md-dialog"
    width="480px"
    title="参数详情"
    @close="$emit('close')"
    :close-on-click-modal="false"
    borderless
  >
  <CommonDetail :detail-opt='detailOpt' count="count-1" :onlyInfo="true">
    <template #targetFrequency="{ detail }">
      {{`${detail.targetFrequency}${detail.targetFrequencyUnitName}`}}
    </template>
    <template #sholdValue="{ detail }">
      {{ detail.thresholdValue === 1 ? '开启' : '关闭'}}
    </template>
  </CommonDetail>

  </hl-dialog>
</template>
<script lang="ts" setup>

import { onMounted, computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { PageDetailOption } from 'fx-front-framework';
import { Indexable } from 'fx-front-utils';
import { apiTemplateParamsManagementObj as api } from '@/apis/modules/tpl-params-manage/list';

const props = defineProps({
  id: {
    type: String
  }
});

const route = useRoute();
const detailOpt = reactive({
  cols: [
    {
      label: '参数名称',
      key: 'paramName',
    },
    {
      label: '更新时间',
      key: 'updatedAt',
    },
    {
      label: '参数类型',
      key: 'paramTypeName',
    },
    {
      label: '参数用途',
      key: 'paramUseName',
    },
    {
      label: '时间条件',
      key: 'timeConditionName',
    },
    {
      label: '描述',
      key: 'paramDesc',
    },
  ],
  data: {} as Indexable<string>,
} as unknown as PageDetailOption);

const id = computed(() => props.id);

onMounted(async() => {
  const { data } = await api.getDetail(
    id.value as string
  );
  // detailOpt.title = data.targetName;
  detailOpt.data = data as Indexable<any>;
});

</script>
