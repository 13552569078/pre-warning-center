<template>
  <hl-group full class="h-full" gap="var(--lg)">
    <fx-page-table-v2 ref="tableRef" class="is-in-container" :cols="cols" :table-data="tableData" :data-fetcher="getData"
      :table-props="{ rowKey: 'accessItemCode', 'fixedHeader': true }"
      selector-col-count="count-xl-2 count-lg-1 count-md-1" :show-search-bar="false" :searchItems="searchItems"
      @sort-change="sortChange" :is-multiple-select="true" @selected-row-keys="selectedRowKeys">
      <template #accessFrequencyType="{ row }">
        <span>{{
          row.accessFrequency > 0 ? '周期计算' : '实时计算'
        }}</span>
      </template>
      <template #timeScopes="{ row }">
        <div v-if="row.timeScopes === '--'">{{ row.timeScopes }}</div>
        <div v-else>
          <p v-for="item in row.timeScopes" :key="item.accessItemId">{{
            `${item.dateStart} ${item.timeStart}-${item.dateEnd} ${item.timeEnd}`
          }}</p>
        </div>
      </template>
    </fx-page-table-v2>
  </hl-group>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { DataFetcherParams, FxPageTable } from 'fx-front-framework';
import { useSort } from '@/hooks';
import { apiDictObj } from '@/apis/modules/dict';
import { apiAccessItemObj } from '@/apis/modules/target-access-item';
import { IpostPageSpace } from '@/apis/modules/target-access-item/model';
import { getSecondsToUnitTime } from '@/common';

const emit = defineEmits(['changeAccessSelect']);

const props = defineProps({
  accessFrequency: {
    type: Number,
  },
  curSelectKeys: Array
});

const tableRef = ref<InstanceType<typeof FxPageTable>>();
watch(
  () => props.accessFrequency,
  newId => {
    tableRef.value?.reset();
    tableRef.value?.refresh();
  },
);
watch(
  () => props.curSelectKeys,
  newVal => {
    tableRef.value?.setSeletedRowKeys(newVal);
  },
);

const tableData = ref<IpostPageSpace.List[]>([]);

const cols = ref([
  { title: '', slotName: 'tableSelection', headerSlotName: 'selectionCol' },
  {
    title: '数据项名称',
    prop: 'accessItemName',
    minWidth: '170px',
    showTooltip: true,
    tooltipProps: { maxWidth: '340px' },
  },
  {
    title: '接入数据项名称',
    prop: 'accessSourceName',
    minWidth: '170px',
    showTooltip: true,
    tooltipProps: { maxWidth: '340px' },
  },
  { title: '接入周期类型', prop: 'accessFrequencyType', slotName: 'accessFrequencyType' },
  { title: '数据频率', prop: 'accessFrequencyName' },
  { title: '数据时间区间', prop: 'timeScopes', slotName: 'timeScopes', minWidth: '360px' },
  { title: '数据标识', prop: 'accessItemCode', minWidth: '180px', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  {
    title: '数据对象',
    prop: 'accessSourceObjectName',
    minWidth: '170px',
    showTooltip: true,
    tooltipProps: { maxWidth: '340px' },
  },
]);
const searchItems = reactive([
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '数据项名称',
    placeholder: '数据项名称',
    value: '',
    name: 'accessItemName',
  },
]);

const formulList = ref();
const selectedKeys = ref();

const { sortChange } = useSort(tableRef, cols);

const getData = async ({
  params,
  pageSize,
  currentPage,
  setTotal,
}: DataFetcherParams) => {
  params.accessFrequency = props.accessFrequency > 0 ? null : 0;
  const searchParams = {
    currentPage,
    pageSize,
    isUsed: 0,
    ...params,
  };
  const result = await apiAccessItemObj.postPage(searchParams);
  result.data.list.forEach(e => {
    e.id = e.accessItemId;
    e.accessFrequencyName = e.accessFrequency > 0 ? getSecondsToUnitTime(e, 'accessFrequencyUnit', 'accessFrequency') + e.accessFrequencyUnitName : '--';
  });
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};

const selectedRowKeys = (newKeys: string[]) => {
  selectedKeys.value = newKeys;

  const arr = [] as IpostPageSpace.List[];
  newKeys.forEach(id => {
    arr.push(tableData.value.find(e => e.accessItemId === id));
  });
  emit('changeAccessSelect', arr);
};

onMounted(async () => {
  const formulaResult = await apiDictObj.getListFormulaDefinedVOs();
  formulList.value = formulaResult.data;
});
</script>
