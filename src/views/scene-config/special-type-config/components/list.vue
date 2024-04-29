<template>
  <fx-page-table-v2 ref="tableRef" :cols="cols" :table-data="tableData" :table-props="{ rowKey: 'id' }"
    :data-fetcher="getData" selector-col-count="count-xl-2 count-lg-1 count-md-1" :show-search-bar="false"
    :search-items="searchItems" class="h-full" :show-adv-search="false">
    <template #action="{ row }">
      <hl-button type="link" @click="editScene(row.id)">编辑</hl-button>
    </template>
  </fx-page-table-v2>
</template>

<script lang="ts" setup>
import { ref, reactive, PropType, watch, nextTick } from 'vue';
import { FxPageTable, DataFetcherParams } from 'fx-front-framework';
import { useSort } from '@/hooks';
import { useRouter } from 'vue-router';
import { apiSpecialTypeConfigObj } from '@/apis/modules/special-type-config';
import { IpostPageSpace } from '@/apis/modules/special-type-config/model';

const props = defineProps({
  sceneCodes: {
    type: Array as PropType<string[]>,
    default: () => []
  }
});
// tableRef.value?.refresh();

const router = useRouter();

interface anyObject {
  [key: string]: string;
}

const tableRef = ref<InstanceType<typeof FxPageTable>>();
const tableData = ref<IpostPageSpace.List[]>([]);
const cols = ref([
  {
    title: '',
    align: 'left',
    width: 'fit-content',
    slotName: 'tableIndex'
  },
  { title: '专项类型名称', prop: 'sceneName' },
  { title: '专项类型编码', prop: 'sceneCode' },
  { title: '风险分类数', prop: 'eventTypeNum' },
  { title: '监测主体数', prop: 'regionNum' },
  { title: '监测点数', prop: 'unitNum' },
  { title: '监测指标数', prop: 'targetNum' },
  { title: '更新日期', prop: 'updatedAt', minWidth: '200px' },
  { title: '操作', slotName: 'action', align: 'left', fixed: 'right' },
]);
const searchItems = reactive([]);

const getData = async ({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
  const searchParams = {
    pageSize,
    currentPage,
    sceneCodes: props.sceneCodes.includes('-1') ? [] : props.sceneCodes
  };
  const result = await apiSpecialTypeConfigObj.postPage(searchParams.currentPage, searchParams.pageSize, searchParams.sceneCodes);
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};
watch(() => props.sceneCodes, () => {
  nextTick(() => {
    tableRef.value?.refresh();
  });
}, {
  deep: true
});

const editScene = (sceneId: string) => {
  router.push({
    name: 'SceneEdit',
    query: {
      action: 'edit',
      sceneId
    }
  });
};
</script>
