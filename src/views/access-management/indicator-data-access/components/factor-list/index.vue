<template>
  <fx-page-table-v2 v-if="isShowTable" class="access-table custom-table" ref="tableRef" :cols="cols" :table-data="tableData"
    row-key="targetDataId" :data-fetcher="getData" :table-props="{ rowKey: 'factorId' }"
    selector-col-count="count-xl-2 count-lg-1 count-md-1" :show-search-bar="false" :searchItems="searchItems"
    @sort-change="sortChange" :selection-actions="selectionActions" @selected-row-keys="selectedRowKeys">
    <template #toolbar-extra-after>
      <fx-action-button type="secondary" @click="addMultiple" label="新增复合指标数据项" style="margin-left: 16px;" v-city-life-line/>
      <fx-action-button type="main" class="m-l-md" @click="addSimple" label="批量新增基础指标数据项" v-city-life-line/>
    </template>
    <template #searchIsPublic="{ searchForm }">
      <search-is-public ref="searchIsPublicRef" v-model="searchForm['isPublic']" />
    </template>
    <template #targetDataName="{ row }">
      <hb-text-overflow style="display: inline-block; width: 12em;" effect="light">
        <span class="text-primary cursor-pointer" @click="openDetail(row)">{{
          row.targetDataName
        }}</span>
      </hb-text-overflow>
    </template>
    <template #isMultiple="{ row }">
      <span>{{
        row.isMultiple ? '复合指标' : '基础指标'
      }}</span>
    </template>
    <template #isPublic="{ row }">
      <span>{{
        row.isPublic ? '是' : '否'
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
    <template #thresholdLevelVOList="{ row }">
      <div v-if="row.thresholdLevelVOList &&
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
      <hl-button type="link" @click="editFactor(row)">编辑</hl-button>
      <hl-button type="link" @click="delFactor(row)" :disabled="row.isRefer" no-fill>删除</hl-button>
      <hl-button type="link" @click="adjustThreshold(row, 'single')"
        :disabled="!(row.thresholdLevelVOList && row.thresholdLevelVOList !== '--' && row.thresholdLevelVOList.length)"
        no-fill>调整阈值</hl-button>
    </template>
  </fx-page-table-v2>
  <monitoring-factor-dlg v-if="dlgVisible" :id="editintId" :action="action" @cancel="dlgVisible = false" @ok="ok" />
  <adjust-threshold-dlg v-if="showAdjustThresholdDlg" :thresholdValueList="thresholdValueList" ref="adjustThresholdDlgRef"
    :targetDataId="targetDataId" :targetId="targetId" :targetDataIds="rowKeys" @cancel="showAdjustThresholdDlg = false" @ok="ok" />
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted, computed, nextTick } from 'vue';
import { DataFetcherParams, FxPageTable } from 'fx-front-framework';
import { HlMessageBox, HlMessage } from 'hongluan-ui';
import { useRouter, useRoute } from 'vue-router';
import { useSort } from '@/hooks';
import { PlusButton } from '@/components';
import { getListDict, getSecondsToUnitTime } from '@/common';
import { apiTargetDataObj } from '@/apis/modules/target-data-access';
import { IpostPageSpace } from '@/apis/modules/target-data-access/model';
import MonitoringFactorDlg from './monitoring-factor-dlg.vue';
import AdjustThresholdDlg from './adjust-threshold-dlg.vue';
import { cloneDeep } from 'lodash-es';

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

const rowKeys = ref<number[]>([]);
const selectionActions = computed(() => {
  return localStorage.getItem('sceneCode')
    ? []
    : [{ label: '批量调整阈值', icon: 'TwoEdit', noFill: false, show: true, disabled: new Set(tableData.value.filter(item => rowKeys.value.includes(item.targetDataId)).map(item2 => item2.targetId)).size > 1, onClick: () => { adjustThreshold(null, 'batch'); } }];
});
const selectedRowKeys = (keys: never[]) => {
  console.log('keys', keys);
  rowKeys.value = keys;
};

const showAdjustThresholdDlg = ref(false);
const thresholdValueList = ref();

const targetDataId = ref('');
const targetId = ref('');
const adjustThresholdDlgRef = ref();
const adjustThreshold = async (row: IpostPageSpace.List | null, type: string) => {
  if (type === 'single') {
    if (row?.thresholdLevelVOList && row?.thresholdLevelVOList !== '--' && row.thresholdLevelVOList.length) {
      thresholdValueList.value = cloneDeep(row.thresholdLevelVOList);
    } else {
      HlMessage.warning('没有阈值等级');
      return;
    }
    targetDataId.value = String(row.targetDataId);
    showAdjustThresholdDlg.value = true;
  } else {
    targetId.value = tableData.value.filter(item => rowKeys.value.includes(item.targetDataId))[0].targetId + '';
    const { data } = await apiTargetDataObj.getTargetThresholdLevelVOList(targetId.value);
    if (data.length) {
      thresholdValueList.value = cloneDeep(data);
      showAdjustThresholdDlg.value = true;
      nextTick(() => {
        adjustThresholdDlgRef.value.openDialog();
      });
    } else {
      HlMessage.warning('当前指标还未配置阈值等级，请去指标管理模块先配置');
    }
  }
};

const router = useRouter();
const tableRef = ref<InstanceType<typeof FxPageTable>>();
const searchIsPublicRef = ref();

watch(
  () => props.eventNode,
  newId => {
    rowKeys.value = [];
    tableRef.value?.reset();
    tableRef.value?.refresh();
  }
);

const tableData = ref<IpostPageSpace.List[]>([]);
const selectedRickTypeCode = ref();

const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex',
    fixed: 'left',
  },
  { title: '', slotName: 'tableSelection', headerSlotName: 'selectionCol', disabled: true, fixed: 'left' },
  {
    title: '指标数据项名称',
    prop: 'targetDataName',
    slotName: 'targetDataName',
    minWidth: '170px',
    fixed: { position: 'left', },
    showTooltip: true,
    tooltipProps: { maxWidth: '340px' },
  },
  {
    title: '监测指标',
    prop: 'targetName',
    minWidth: '170px',
    showTooltip: true,
    tooltipProps: { maxWidth: '240px' },
  },
  { title: '是否公用', prop: 'isPublic', slotName: 'isPublic', minWidth: '90px' },
  { title: '数据类型', prop: 'dataTypeName' },
  { title: '阈值等级/阈值', prop: 'thresholdLevelVOList', slotName: 'thresholdLevelVOList', minWidth: '200px' },
  {
    title: '计量单位',
    prop: 'measureUnitName',
    minWidth: '90px',
    showTooltip: true,
    tooltipProps: { maxWidth: '240px' },
  },
  { title: '计算周期类型', prop: 'computePeriodTypeName' },
  { title: '数据频率', prop: 'targetFrequencyName' },
  {
    title: '数据时间区间',
    prop: 'timeScopes',
    slotName: 'timeScopes',
    minWidth: '360px'
  },
  { title: '指标分类', slotName: 'isMultiple', minWidth: '160px' },
  { title: '计算公式', prop: 'formulaName' },
  { title: '启用时间', prop: 'initCollectTime', minWidth: '170px' },
  { title: '更新时间', prop: 'updatedAt', sortable: true, minWidth: '200px' },
  { title: '操作', slotName: 'action', align: 'left', fixed: 'right' },
]);
if (localStorage.getItem('sceneCode') && localStorage.getItem('sceneCode') !== 'ALL') cols.value.splice(cols.value.length - 1, 1);

const searchItems = reactive([
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '指标数据项名称',
    placeholder: '指标数据项名称',
    value: '',
    name: 'targetDataName',
  },
  {
    type: 'slot',
    slotName: 'searchIsPublic',
    label: '是否公用',
    value: '',
    name: 'isPublic',
    display: (item: any) => {
      return searchIsPublicRef.value?.getOptionName(item.value);
    },
  },
  {
    type: 'select',
    label: '计算周期类型',
    placeholder: '请选择计算周期类型',
    value: '',
    name: 'targetFrequency',
    clearable: true,
    prop: {
      label: 'dictName',
      value: 'dictCode',
    },
    multiple: true,
    options: [
      { dictName: '周期计算', dictCode: 1 },
      { dictName: '实时计算', dictCode: 0 },
    ],
  },

  {
    type: 'select',
    label: '指标分类',
    placeholder: '请选择指标分类',
    value: '',
    name: 'isMultiple',
    clearable: true,
    prop: {
      label: 'dictName',
      value: 'dictCode',
    },
    options: [
      { dictName: '基础指标', dictCode: 0 },
      { dictName: '复合指标', dictCode: 1 },
    ],
  },
]);

const editintId = ref<string | number>('');
const dlgVisible = ref(false);
const isShowTable = ref(false);
const action = ref('add');

const { sortQuery, sortChange } = useSort(tableRef, cols);

const getData = async ({
  params,
  pageSize,
  currentPage,
  setTotal,
}: DataFetcherParams) => {
  if (params.isPublic) {
    if (params.isPublic?.length > 1) {
      params.isPublic = '';
    } else {
      params.isPublic = params.isPublic[0];
    }
  }
  if (params.targetFrequency) {
    if (params.targetFrequency?.length > 1) {
      params.targetFrequency = '';
    } else {
      params.targetFrequency = params.targetFrequency[0];
    }
  }
  // 如果是指标 type为1 传targetId
  // 不是指标 type为0  不传targetId
  const treeParams =
    props.eventNode?.type === 1 ? { targetId: props.eventNode?.id } : {};
  const searchParams = {
    pageSize,
    currentPage,
    targetTypeCode: props.eventNode?.targetTypeCode,
    ...treeParams,
    ...params,
  };
  if (sortQuery.value) {
    searchParams.orderColumnStr = sortQuery.value.prop;
    searchParams.orderStr = sortQuery.value.sort;
  }
  const { data } = await apiTargetDataObj.postPage(searchParams);
  data.list.forEach(e => {
    e.targetFrequencyName =
      e.targetFrequency > 0
        ? getSecondsToUnitTime(e, 'targetFrequencyUnit', 'targetFrequency') +
        e.targetFrequencyUnitName
        : '--';
    e.id = String(e.targetDataId);
  });
  tableData.value = data.list;
  setTotal(+data.totalRow);
};

const editFactor = (row: IpostPageSpace.List) => {
  editintId.value = row.targetDataId;
  action.value = 'edit';
  if (row.isMultiple === 1) {
    router.push({
      name: 'indicatorDataAccessAddMultiple',
      query: {
        title: '编辑复合指标数据项',
        id: row.targetDataId,
      },
    });
  } else {
    dlgVisible.value = true;
  }
};
const openDetail = (row: IpostPageSpace.List) => {
  router.push({
    name: 'indicatorDataAccessDetail',
    query: {
      title: '指标数据接入详情',
      id: row.targetDataId,
    },
  });
};

const addMultiple = (row: IpostPageSpace.List) => {
  router.push({
    name: 'indicatorDataAccessAddMultiple',
    query: {
      title: '新增复合指标数据项',
    },
  });
};
const addSimple = (row: IpostPageSpace.List) => {
  router.push({
    name: 'indicatorDataAccessAddBatchSimple',
    query: {
      title: '批量新增基础指标数据项',
    },
  });
};
const ok = () => {
  dlgVisible.value = false;
  showAdjustThresholdDlg.value = false;
  tableRef.value?.refresh();
};
const delFactor = async (row: IpostPageSpace.List) => {
  await HlMessageBox.confirm(
    `您确认删除[${row.targetDataName}]吗?`,
    '删除提示',
    {
      confirmButtonText: '确定',
      confirmButtonType: 'danger',
      cancelButtonText: '取消',
    }
  );
  await apiTargetDataObj.delete(row.targetDataId);
  HlMessage.success('删除成功');
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

onMounted(() => {
  getSearchItem();
});
</script>
