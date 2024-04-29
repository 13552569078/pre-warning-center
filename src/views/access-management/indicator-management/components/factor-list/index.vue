<template>
  <hl-group full class="h-full" gap="var(--lg)">
    <fx-page-table-v2 v-if="isShowTable" ref="tableRef" :cols="cols" :table-data="tableData" :data-fetcher="getData"
      :table-props="{ rowKey: 'factorId' }" selector-col-count="count-xl-2 count-lg-1 count-md-1" :show-search-bar="false"
      :searchItems="searchItems" @sort-change="sortChange">
      <template #toolbar-extra-after>
        <fx-action-button type="main" @click="addFactor" :disabled="!$props.monitorPointId" label="新增指标" v-city-life-line />
      </template>
      <template #targetName="{ row }">
        <hb-text-overflow style="display: inline-block; width: 12em" effect="light">
          <span class="text-primary cursor-pointer" @click="openDetail(row)">{{
            row.targetName
          }}</span>
        </hb-text-overflow>
      </template>
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
      <template #action="{ row }">
        <hl-button type="link" @click="editFactor(row)" v-city-life-line>编辑</hl-button>
        <hl-button type="link" @click="delFactor(row)" :disabled="isDel(row)" no-fill v-city-life-line>删除</hl-button>
      </template>
    </fx-page-table-v2>
  </hl-group>

  <detail-dlg v-if="detailDlgVisible" :id="editintId" @close="detailDlgVisible = false" />
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { DataFetcherParams, FxPageTable } from 'fx-front-framework';
import { HlMessageBox, HlMessage } from 'hongluan-ui';
import { useRouter } from 'vue-router';
import { useSort } from '@/hooks';
import { PlusButton } from '@/components';
import { getListDict, getSecondsToUnitTime } from '@/common';
import { apiTargetInfoControllerObj } from '@/apis/modules/target-info-controller';
import { IgetFindTargetInfoPageSpace } from '@/apis/modules/target-info-controller/model';
import DetailDlg from './detail-dlg.vue';
import { TwoMore } from '@hongluan-ui/icons';

const props = defineProps({
  monitorPointId: {
    type: String,
  },
  eventNode: {
    type: Object,
  },
  uniqueId: {
    type: String,
  },
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
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex',
  },
  { title: '指标名称', prop: 'targetName', slotName: 'targetName' },
  { title: '数据类型', prop: 'dataTypeName' },
  { title: '计量单位', prop: 'measureUnitName' },
  { title: '计算周期类型', prop: 'periodTypeName' },
  { title: '数据频率', prop: 'targetFrequencyName' },
  {
    title: '阈值等级/阈值',
    prop: 'thresholdLevelVOList',
    slotName: 'thresholdLevelVOList',
    minWidth: '120px',
  },
  { title: '操作', slotName: 'action', align: 'left', minWidth: '8em' },
]);

if (localStorage.getItem('sceneCode') && localStorage.getItem('sceneCode') !== 'ALL') cols.value.splice(cols.value.length - 1, 1);
const searchItems = reactive([
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '指标名称',
    placeholder: '指标名称',
    value: '',
    name: 'targetName',
  },
  // {
  //   type: 'slot',
  //   slotName: 'computePeriod',
  //   label: '计算周期类型',
  //   value: '',
  //   name: 'targetFrequencyType',
  // },
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
    options: [
      { dictName: '周期计算', dictCode: 1 },
      { dictName: '实时计算', dictCode: 0 },
    ],
    multiple: true,
  },
]);
const isShowTable = ref(false);
const optionComputePeriod = ref([
  { dictName: '周期计算', dictCode: 1 },
  { dictName: '实时计算', dictCode: 0 },
]);

const editintId = ref<string | number>('');
const dlgVisible = ref(false);
const detailDlgVisible = ref(false);

const { sortQuery, sortChange } = useSort(tableRef, cols);

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
    ...params,
  };
  const result = await apiTargetInfoControllerObj.getFindTargetInfoPage(searchParams);
  result.data.list.forEach(e => {
    e.targetFrequencyName =
      e.targetFrequency > 0
        ? getSecondsToUnitTime(e, 'targetFrequencyUnitCode', 'targetFrequency') +
        e.targetFrequencyUnitName
        : '--';
  });
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};

const addFactor = () => {
  editintId.value = '';
  router.push({
    name: 'indicatorAdd',
    query: {
      targetTypeCode: props.monitorPointId,
      targetId: editintId.value,
    },
  });
};
const editFactor = (row: IgetFindTargetInfoPageSpace.List) => {
  editintId.value = row.targetId;
  router.push({
    name: 'indicatorAdd',
    query: {
      targetTypeCode: props.monitorPointId,
      targetId: editintId.value,
    },
  });
};
const openDetail = (row: IgetFindTargetInfoPageSpace.List) => {
  editintId.value = row.targetId;
  detailDlgVisible.value = true;
};
const delFactor = async (row: IgetFindTargetInfoPageSpace.List) => {
  await HlMessageBox.confirm(`您确认删除[${row.targetName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
  });
  await apiTargetInfoControllerObj.getRemoveTargetInfo(row.targetId);
  HlMessage.success('删除成功');
  tableRef.value?.refresh();
};
const ok = () => {
  dlgVisible.value = false;
  tableRef.value?.refresh();
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

const isDel = (row: { thresholdLevelVOList: string | any[]; }) => {
  let state = false;
  if (row.thresholdLevelVOList &&
    row.thresholdLevelVOList !== '--' &&
    row.thresholdLevelVOList.length) {
    for (let index = 0; index < row.thresholdLevelVOList.length; index++) {
      const element = row.thresholdLevelVOList[index];
      if (element.isRefer) {
        state = true;
        break;
      }
    }
  }
  return state;
};

onMounted(() => {
  getSearchItem();
});
</script>
