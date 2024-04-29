<template>
  <hl-group class="w-full table-v2" gap="var(--lg)">
    <fx-page-table-v2 ref="tableRef" :cols="cols" :table-data="tableData" :data-fetcher="getData"
      :table-props="{ rowKey: 'factorId' }" selector-col-count="count-xl-2 count-lg-1 count-md-1" :show-search-bar="false"
      :searchItems="searchItems" @sort-change="sortChange" class="h-full">
      <template #targetFrequencyType="{ searchForm }">
        <hl-checkbox-group v-model="searchForm['targetFrequencyType']" gap="var(--xl)">
          <hl-checkbox v-for="item in typeList1" :label="item.value" :key="item.label">{{ item.label }}</hl-checkbox>
        </hl-checkbox-group>
      </template>
      <template #equipName="{ row }">
        <span v-if="row.equipName !== '--'" class="text-primary cursor-pointer" @click="openDetail(row)">{{
          row.equipName
        }}</span>
        <span v-else>{{
          row.equipName
        }}</span>
      </template>
      <template #accessFrequencyType="{ row }">
        <span>{{
          row.accessFrequency > 0 ? '周期型' : '实时型'
        }}</span>
      </template>
      <template #timeScopes="{ row }">
        <div v-if="row.timeScopes === '--'">{{ row.timeScopes }}</div>
        <div v-else>
          <p v-for="item in row.timeScopes" :key="item.accessItemId">{{
            `${item.dateStart} 至 ${item.dateEnd} ${item.timeStart} 至 ${item.timeEnd}`
          }}</p>
        </div>
      </template>
      <template #action="{ row }">
        <hl-button type="link" @click="historyData(row)">历史数据</hl-button>
      </template>
    </fx-page-table-v2>
    <monitor-data-dialog ref="monitorDataDialogRef" />
  </hl-group>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted, nextTick } from 'vue';
import { DataFetcherParams, FxPageTable } from 'fx-front-framework';
import { CommonUtils } from 'fx-front-utils';
import { HlMessageBox } from 'hongluan-ui';
import { useRouter, useRoute } from 'vue-router';
import { useSort } from '@/hooks';
import { PlusButton } from '@/components';
import { getSecondsToUnitTime } from '@/common';
import { apiAccessItemObj } from '@/apis/modules/target-access-item';
import { apiEquipmentObj } from '@/apis/modules/equipment';
import { apiRealTimeMonitorObj } from '@/apis/modules/realtime-monitor';
import { IpostPageSpace } from '@/apis/modules/target-access-item/model';
import monitorDataDialog from './monitorDataDialog.vue';

const props = defineProps({
  treeNode: {
    type: Object
  },
  eventNode: {
    type: Object
  },
});

const router = useRouter();
const tableRef = ref<InstanceType<typeof FxPageTable>>();
watch(
  () => props.treeNode,
  newId => {
    tableRef.value?.reset();
    // tableRef.value?.refresh();
  }
);
const monitorDataDialogRef = ref();
const tableData = ref<IpostPageSpace.List[]>([]);
const action = ref('add');
const typeList1 = [{ label: '实时型', value: 0 }, { label: '周期型', value: 1 }];

const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex',
    fixed: 'left'
  },
  { title: '数据项名称', prop: 'accessItemName', minWidth: '270px', fixed: { position: 'left' } },
  { title: '接入周期类型', prop: 'accessFrequencyType', slotName: 'accessFrequencyType', minWidth: '8em' },
  { title: '数据频率', prop: 'accessFrequencyName' },
  { title: '数据业务时间', prop: 'collectTime', minWidth: '170px' },
  { title: '监测值', prop: 'dataValue', minWidth: '8em' },
  { title: '数据时间区间', prop: 'timeScopes', slotName: 'timeScopes', minWidth: '360px' },
  { title: '数据标识', prop: 'accessItemCode', minWidth: '180px', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '监测设备', prop: 'equipName', minWidth: '170px', slotName: 'equipName', },
  { title: '接入对象', prop: 'accessSourceObjectName', minWidth: '170px' },
  { title: '数据入库时间', prop: 'createdAt', sortable: true, minWidth: '170px' },
  { title: '操作', slotName: 'action', align: 'left', fixed: 'right' }
]);
const searchItems = reactive([{
  type: 'input',
  maxlength: '20',
  showWordLimit: false,
  label: '接入数据项名称',
  placeholder: '接入数据项名称',
  value: '',
  name: 'accessItemName',
},
{
  type: 'input',
  maxlength: '20',
  showWordLimit: false,
  label: '数据标识',
  placeholder: '数据标识',
  value: '',
  name: 'accessItemCode',
},
// {
//   type: 'select',
//   label: '计算周期类型',
//   placeholder: '请选择计算周期类型',
//   value: '',
//   filterable: true,
//   name: 'targetFrequencyType',
//   prop: {
//     label: 'dictName',
//     value: 'dictCode',
//   },
//   options: [{ dictName: '周期计算', dictCode: 1 }, { dictName: '实时计算', dictCode: 0 }],
//   multiple: true,
// }
{
  type: 'slot',
  label: '接入周期类型',
  placeholder: '请选择接入周期类型',
  value: [],
  name: 'targetFrequencyType',
  slotName: 'targetFrequencyType',
  display: (item: any) => {
    return typeList1.filter(e => item.value.includes(e.value)).map(e => e.label).join(', ');
  },
},
]);

const optionComputePeriod = ref([{ dictName: '周期计算', dictCode: 1 }, { dictName: '实时计算', dictCode: 0 }]);

const editintId = ref<string | number>('');
const dlgVisible = ref(false);

const { sortQuery, sortChange } = useSort(tableRef, cols);

const getData = async ({ params, pageSize, currentPage, setTotal }: DataFetcherParams) => {
  if (params.targetFrequencyType) {
    if (params.targetFrequencyType?.length > 1) {
      params.accessFrequency = '';
    } else {
      params.accessFrequency = params.targetFrequencyType[0];
    }
  }
  const searchParams = {
    pageSize,
    currentPage,
    ...props.treeNode,
    ...params
  };
  if (sortQuery.value) {
    searchParams.orderColumnStr = sortQuery.value.prop;
    searchParams.orderStr = sortQuery.value.sort;
  }
  const result = await apiRealTimeMonitorObj.postGetAccessItemRealTimePage(searchParams);
  tableData.value = result.data.list;
  tableData.value.forEach(e => {
    e.accessFrequencyName = e.accessFrequency > 0 ? getSecondsToUnitTime(e, 'accessFrequencyUnit', 'accessFrequency') + e.accessFrequencyUnitName : '--';
  });
  setTotal(+result.data.totalRow);
};
const getSearchItems = async () => {
  const result1 = await apiEquipmentObj.list();
  const item1 = {
    type: 'select',
    label: '监测设备',
    placeholder: '请选择监测设备',
    value: '',
    name: 'equipId',
    prop: {
      label: 'equipName',
      value: 'id',
    },
    options: [...result1.data],
  };
  searchItems.push(item1);
};
const historyData = (row: any) => {
  router.push({
    name: 'accessHistoryData',
    query: {
      title: '接入历史数据',
      id: row.accessItemId
    },
  });
};

const openDetail = (row: any) => {
  nextTick(() => {
    monitorDataDialogRef.value.openDialog(row);
  });
};
onMounted(async () => {
  getSearchItems();
});
</script>
<style scoped lang="scss">
.table-v2 {
  height: calc(100% - 74px);
}
</style>
