
<template>
  <hl-group full class="h-full" gap="var(--lg)">
    <fx-page-table-v2 v-if="isShowTable" ref="tableRef" class="is-in-container" :cols="cols" :table-data="tableData"
      :data-fetcher="getData" selector-col-count="count-2" search-placement="top" :search-items="searchItems"
      :is-multiple-select="false" @selected-row-keys="selectedRowKeys" @sort-change="sortChange">
      <template #thresholdLevelVOList="{ row }">
        <div v-if="
          row.thresholdLevelVOList &&
          row.thresholdLevelVOList !== '--' &&
          row.thresholdLevelVOList.length
        ">
          <template v-if="row.thresholdLevelVOList.length <= 3">
            <div v-for="(item, index) in row.thresholdLevelVOList.slice(0, 3)" :key="index"
              class="display-flex items-middle">
              <hb-text-overflow method="length" :length="8" effect="light">
                {{ item.thresholdLevelName }}
              </hb-text-overflow>
              &emsp;
              {{ item.thresholdLevelValue }}
            </div>
          </template>
          <template v-else>
            <div v-for="(item, index) in row.thresholdLevelVOList.slice(0, 3)" :key="index"
              class="display-flex items-middle">
              <hb-text-overflow method="length" :length="8" effect="light">
                {{ item.thresholdLevelName }}
              </hb-text-overflow>
              &emsp;
              {{ item.thresholdLevelValue }}
            </div>
            <hl-popover placement="right" trigger="click" class="m-r-lg">
              <template #reference>
                <hl-icon type="primary" size="xxs" class="cursor-pointer">
                  <two-more />
                </hl-icon>
              </template>
              <div v-for="(item, index) in row.thresholdLevelVOList" :key="index" class="display-flex items-middle">
                <hb-text-overflow method="length" :length="8" effect="light">
                  {{ item.thresholdLevelName }}
                </hb-text-overflow>
                &emsp;
                {{ item.thresholdLevelValue }}
              </div>
            </hl-popover>
          </template>
        </div>
        <div v-else>--</div>
      </template>
    </fx-page-table-v2>
  </hl-group>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { DataFetcherParams, FxPageTable } from 'fx-front-framework';
import { useRouter } from 'vue-router';
import { useSort } from '@/hooks';
import { getListDict, getSecondsToUnitTime } from '@/common';
import { apiTargetInfoControllerObj } from '@/apis/modules/target-info-controller';
import { IgetFindTargetInfoPageSpace } from '@/apis/modules/target-info-controller/model';

const emit = defineEmits(['changeSelect']);
const props = defineProps({
  monitorPointId: {
    type: String
  },
  eventNode: {
    type: Object
  },
  uniqueId: {
    type: String
  }
});

const router = useRouter();
const tableRef = ref<InstanceType<typeof FxPageTable>>();

watch(
  () => props.monitorPointId,
  newId => {
    tableRef.value?.reset();
    tableRef.value?.refresh();
  }
);

const tableData = ref<IgetFindTargetInfoPageSpace.List[]>([]);

const cols = ref([
  { title: '', slotName: 'tableSelection', headerSlotName: 'selectionCol', minWidth: '60px', width: '60px' },
  { title: '指标名称', prop: 'targetName' },
  { title: '数据类型', prop: 'dataTypeName' },
  { title: '计量单位', prop: 'measureUnitName' },
  { title: '计算周期类型', prop: 'periodTypeName' },
  { title: '计算周期', prop: 'targetFrequencyName' },
  { title: '阈值等级/阈值', prop: 'thresholdLevelVOList', slotName: 'thresholdLevelVOList', minWidth: '120px' },
  { title: '更新时间', prop: 'updatedAt', minWidth: '200px' },
]);
const searchItems = reactive([{
  type: 'input',
  maxlength: '20',
  showWordLimit: false,
  label: '指标名称',
  placeholder: '指标名称',
  value: '',
  name: 'targetName',
},
{
  type: 'select',
  label: '计算周期类型',
  placeholder: '请选择计算周期类型',
  value: '',
  filterable: true,
  name: 'targetFrequencyType',
  prop: {
    label: 'dictName',
    value: 'dictCode',
  },
  options: [{ dictName: '周期计算', dictCode: '1' }, { dictName: '实时计算', dictCode: '0' }],
  multiple: true,
}
]);
const isShowTable = ref(false);

const { sortChange } = useSort(tableRef, cols);

const getData = async ({ params, pageSize, currentPage, setTotal }: DataFetcherParams) => {
  if (params.targetFrequencyType) {
    if (params.targetFrequencyType?.length > 1) {
      params.targetFrequencyType = '';
    } else {
      params.targetFrequencyType = params.targetFrequencyType[0];
    }
  }
  const searchParams = {
    pageSize,
    currentPage,
    targetTypeCode: props.monitorPointId,
    ...params
  };
  const result = await apiTargetInfoControllerObj.getFindTargetInfoPage(searchParams);
  result.data.list.forEach(e => {
    e.id = e.targetId;
    e.targetFrequencyName = e.targetFrequency > 0 ? getSecondsToUnitTime(e, 'targetFrequencyUnitCode', 'targetFrequency') + e.targetFrequencyUnitName : '--';
  });
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};
const selectedKeys = ref([] as string[]);

const selectedRowKeys = (newKeys: string[]) => {
  selectedKeys.value = newKeys;
  if (selectedKeys.value.length) {
    emit('changeSelect', tableData.value.find(e => e.targetId === selectedKeys.value[0]));
  } else {
    emit('changeSelect', {});
  }
};

const getSearchItem = async () => {
  const dict = await getListDict('TARGET_TYPE_CODE');
  searchItems.push({
    type: 'select',
    label: '数据类型',
    placeholder: '请选择数据类型',
    value: '',
    name: 'dataType',
    clearable: true,
    prop: {
      label: 'dictName',
      value: 'dictCode',
    },
    options: dict,
  });
  isShowTable.value = true;
};

onMounted(() => {
  getSearchItem();
});

</script>
