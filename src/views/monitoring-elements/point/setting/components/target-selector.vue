<template>
  <hl-dialog v-model="dialogVisible" :close-on-click-modal="false" title="关联指标数据项" width="1160px" @close="handleClose" body-class="bg-modal" class="dialog-inner-panel  target-selector-dialog" footer-class="target-selector-dialog-footer">

    <left-right-layout :is-in-dialog="true">
      <template #left>
        <target-tree @click="handleNodeClick"/>
      </template>
      <template #right>
        <fx-page-table-v2
          class="fixed-table is-in-container"
          ref="tableRef"
          v-if="showTable"
          :cols="cols"
          :table-data="tableData"
          :data-fetcher="getData"
          selector-col-count="count-2"
          search-placement="top"
          :search-items="searchItems"
          :is-multiple-select="false"
          @selected-row-keys="selectedRowKeys"
          @row-click="clickRow"
        >
          <template #computePeriodTypeName="{ row }">
            <hl-group dir="vertical">
              <span v-for="(item, index) in row.computePeriodTypeName.split(',')" :key="index">{{ item }}</span>
            </hl-group>
          </template>
          <template #searchIsPublic="{ searchForm }">
            <search-is-public
              ref="searchIsPublicRef"
              v-model="searchForm['isPublic']"
            />
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
          <template #targetFrequency="{ row }">
            <span v-if="!row.targetFrequency">--</span>
            <span v-else>{{ `${getSecondsToUnitTime(row, 'targetFrequencyUnit', 'targetFrequency')} ${row.targetFrequencyUnitName}`}}</span>
          </template>
          <template #timeScopes="{ row }">
            <span v-if="!Array.isArray(row.timeScopes)">{{ row.timeScopes }}</span>
            <template v-else>
              <span v-for="time in getTimeScopesArr(row.timeScopes)" :key="time">{{ time }}</span>
            </template>
          </template>

        </fx-page-table-v2>
      </template>
    </left-right-layout>

    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="handleClose">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="ok">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick, watch, computed } from 'vue';
import { EmptyUtils } from 'fx-front-utils';
import { DataFetcherParams } from 'fx-front-framework';
import { LeftRightLayout } from '@/components';
import { apiTargetDataObj as api } from '@/apis/modules/target-data-access';
import { IpostPageSpace } from '@/apis/modules/target-data-access/model';
import { getListDict, getSecondsToUnitTime } from '@/common';
import { getTimeScopesArr } from '@/views/monitoring-elements/point/setting/utils';
import TargetTree from './targetTree.vue';

const emit = defineEmits(['close', 'ok']);
const props = defineProps({
  selected: Array,
});

const tableData = ref<IpostPageSpace.List[]>([]);
const tableRef = ref();
const searchIsPublicRef = ref();
const showTable = ref(false);
const currentPageNum = ref(1);
const dialogVisible = ref(true);

const selectedTargets = ref<IpostPageSpace.List[]>([]);

const cols = ref([
  { title: '', slotName: 'tableSelection', headerSlotName: 'selectionCol', fixed: 'left', minWidth: '4em', maxWidth: '4em', align: 'center' },
  { title: '指标数据项名称',
    prop: 'targetDataName',
    minWidth: '160px',
    showTooltip: true,
    tooltipProps: { maxWidth: '340px' },
    fixed: { position: 'left', } },
  { title: '指标',
    prop: 'targetName',
    minWidth: '160px',
    showTooltip: true,
    tooltipProps: { maxWidth: '340px' }, },
  { title: '数据类型', prop: 'dataTypeName', minWidth: '120px' },
  { title: '是否公用', slotName: 'isPublic', minWidth: '90px' },
  { title: '计量单位', prop: 'measureUnitName', minWidth: '150px' },
  { title: '计算周期类型', slotName: 'computePeriodTypeName', minWidth: '120px' },
  { title: '数据频率', slotName: 'targetFrequency', minWidth: '120px' },
  { title: '数据时间区间', slotName: 'timeScopes', minWidth: '360px' },
  { title: '指标分类', slotName: 'isMultiple', minWidth: '160px' },
  { title: '计算公式', prop: 'formulaName', minWidth: '120px' },
  { title: '数据对象', prop: 'accessSourceObjectName', minWidth: '160px' },
  { title: '更新时间', prop: 'updatedAt', minWidth: '200px' },
]);
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
    options: [{ dictName: '周期计算', dictCode: '1' }, { dictName: '实时计算', dictCode: '0' }],
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
    options: [{ dictName: '基础指标', dictCode: 0 }, { dictName: '复合指标', dictCode: 1 }],
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
]);

const oldKeys = ref([] as string[]);
const selectedTreeNodeId = ref();

const getSelectedTargets = (keys: string[]) => {
  if (!keys.length) return [];
  const arr: Set<IpostPageSpace.List> = new Set();
  keys.map(id => {
    const found = tableData.value.find(eq => eq.id === id);
    if (found) {
      arr.add(found);
    }
    return id;
  });
  return arr;
};

const arrayDiff = (arr1: string[], arr2: string[]) => {
  const newArr = arr1.filter(function(val) {
    return !(arr2.indexOf(val) >= 0);
  }).concat(arr2.filter(function(val) {
    return !(arr1.indexOf(val) >= 0);
  }));
  return newArr;
};

const selectedRowKeys = (newKeys: string[]) => {
  console.log('newKey', newKeys);
  console.log('oldKey', oldKeys.value);
  // 1、添加选择：newKeys > oldKeys
  if (newKeys.length > oldKeys.value.length) {
    console.log('增加了', selectedTargets);
    const diff = arrayDiff(newKeys, oldKeys.value);
    console.log('diff', diff);
    const tempSet = new Set(diff);
    const targetArr = Array.from(getSelectedTargets(Array.from(tempSet)));
    selectedTargets.value = selectedTargets.value.concat(targetArr);
  } else if (newKeys.length < oldKeys.value.length) {
    // 2、取消选择：newKeys < oldKeys
    console.log('减少了');
    const diff = arrayDiff(newKeys, oldKeys.value);
    oldKeys.value = oldKeys.value.filter(id => !diff.includes(id));
    const targetArr = Array.from(getSelectedTargets(oldKeys.value));
    selectedTargets.value = targetArr;
  }
  console.log(selectedTargets.value, 889);
  oldKeys.value = newKeys;
};

const clickRow = (row: IpostPageSpace.List) => {
  console.log('click row', row);
};
const getSearchItem = async() => {
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
  showTable.value = true;
};

const getData = async({
  pageSize,
  currentPage,
  params,
  setTotal,
}: DataFetcherParams) => {
  if (params.targetFrequency) {
    if (params.targetFrequency?.length > 1) {
      params.targetFrequency = '';
    } else {
      params.targetFrequency = params.targetFrequency[0];
    }
  }
  if (params.isPublic) {
    if (params.isPublic?.length > 1) {
      params.isPublic = '';
    } else {
      params.isPublic = params.isPublic[0];
    }
  }
  currentPageNum.value = currentPage;
  const searchParams = {
    pageSize,
    currentPage,
    isUsed: 0,
    ...params,
    ...selectedTreeNodeId.value,
    selectedTargetDataIds: props.selected?.map(item => item.targetDataId),
    selectedTargetIds: props.selected?.map(item => item.targetId)
  };
  tableData.value = [];
  const { data } = await api.postPage(searchParams);
  data.list.map(item => {
    item.id = item.targetDataId;
    return item;
  });
  tableData.value = EmptyUtils.formatArray(data.list) as IpostPageSpace.List[];
  setTotal(data.totalRow);
  nextTick(() => {
    console.log('载入啦', selectedTargets.value);
    if (selectedTargets.value.length) {
      tableRef.value.setSeletedRowKeys(selectedTargets.value.map(item => item.targetDataId));
    }
  });
};

const handleNodeClick = params => {
  console.log(params);
  selectedTreeNodeId.value = params;
  tableRef.value.refresh();
};

const handleClose = () => {
  emit('close');
};

const ok = () => {
  const idArr = Array.from(new Set(selectedTargets.value.map(item => item.id || item.targetDataId)));
  const emitArr = idArr.map(id => {
    return selectedTargets.value.find(item => item.id === id || item.targetDataId === id);
  });
  emit('ok', emitArr[0]);
};

onMounted(() => {
  selectedTargets.value = props.selected as IpostPageSpace.List[];
  getSearchItem();
});
</script>
<style lang="scss">
.target-selector-dialog {
  .panel-header.flex-wrap {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .full-page-dialog {
    height: 540px !important;
  }
}
.target-selector-dialog-footer {
  margin-top: 0 !important;
}
</style>
