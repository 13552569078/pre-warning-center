<template>
  <fx-page-table-v2 ref="tableRef" :cols="cols" :table-data="tableData" :table-props="{ rowKey: 'strategyId' }" :data-fetcher="getData" :search-items="searchItems" selector-col-count="count-3" :searcher="{ show: false }" @sort-change="sortChange">
      <!-- 风险分类搜索 -->
      <template #risk="{ searchForm }">
        <search-risk-type @risk-changed="riskChanged" v-model="searchForm['risk']" />
      </template>
      <!-- table 策略名称 -->
      <template #strategyName="{ row }">
        <span class="text-primary cursor-pointer" @click="openDetail(row)">{{
          row.strategyName
        }}</span>
      </template>
      <!-- 是否为模板 -->
      <template #isTemplate="{ row }">
        {{ row.isTemplate?"是":"否"}}
      </template>
      <!-- 监测点 -->
      <template #unitVOS="{ row }">
        <hl-group v-if="row.unitName && row.relationUnitNum" align="items-between items-middle" class="w-md">
          <span>{{ row.unitName }}</span>
          <span class="hl-button link" @mouseover="
              (e) => {
                buttonRef = e.currentTarget;
                editingId = row.strategyId;
              }
            " v-click-outside="() => onClickOutside(row)">
            {{ row.relationUnitNum }}
          </span>
        </hl-group>
        <span v-else>--</span>
      </template>
      <template #actions="{ row }">
        <hl-button type="link" @click="editStrategy(row)" effect="light" no-fill>编辑</hl-button>
        <!-- :disabled="row.relationUnitNum" -->
        <hl-button type="link" @click="delStrategy(row)" effect="light" no-fill>删除</hl-button>
        <hl-button type="link" @click="saveOtherTpl(row)" :disabled="row.isTemplate" effect="light" no-fill>设置为模板</hl-button>
      </template>
      <template #toolbar-extra-after>
        <fx-action-button type="main" @click="openStrategyPage" label="新增报警策略" />
      </template>
  </fx-page-table-v2>
  <hl-popover ref="popoverRef" placement="left" popper-class="unit-detail-popover" :virtual-ref="buttonRef" virtual-triggering trigger="click" width="800px">
    <unit-detail-popover :id="editingId" />
  </hl-popover>
</template>

<script lang="ts" setup>
import { ref, reactive, unref } from 'vue';
import { useRouter } from 'vue-router';
import { FxPageTable, DataFetcherParams } from 'fx-front-framework';
import { HlMessageBox, ClickOutside as vClickOutside } from 'hongluan-ui';
import { omit } from 'lodash-es';
import { useI18n } from 'vue-i18n';
import { HlMessageSuccess } from '@/common';
import { PlusButton } from '@/components';
import { useSort } from '@/hooks';
import { SearchRiskType } from '@/views/alarm-config/components/index';
import { apiYgfWarningConfigObj } from '@/apis/modules/alarm-config';
import { IpostFindStrategyPageSpace } from '@/apis/modules/alarm-config/model';
import UnitDetailPopover from './components/unit-detail-popover.vue';

const router = useRouter();
const { t } = useI18n();

const tableData = ref<IpostFindStrategyPageSpace.List[]>([]);
const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex',
  },
  { title: '策略名称', prop: 'strategyName', slotName: 'strategyName' },
  { title: `${t('warningType')}`, prop: 'eventTypeCodeName' },
  { title: '指标', prop: 'targetName' },
  { title: '监测点', slotName: 'unitVOS' },
  { title: '是否为模板', slotName: 'isTemplate' },
  { title: '更新时间', prop: 'updatedAt', sortable: true, minWidth: '200px' },
  {
    title: '操作',
    slotName: 'actions',
    align: 'left',
    fixed: 'right',
    minWidth: '220px',
  },
]);

const searchItems = reactive([
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '策略名称',
    placeholder: '策略名称',
    value: '',
    name: 'strategyName',
  },
  {
    label: `${t('warningType')}`,
    span: 'grid-col-span-xl-2',
    type: 'slot',
    slotName: 'risk',
    name: 'risk',
    value: '',
    display: (item: any) => {
      return item.value;
    },
  },
]);
const eventTypeCodes = ref<string[]>([]);
const tableRef = ref<InstanceType<typeof FxPageTable>>();

const buttonRef = ref();
const popoverRef = ref();
const editingId = ref();

const { sortQuery, sortChange } = useSort(tableRef, cols);

const getData = async({
  pageSize,
  currentPage,
  params,
  setTotal,
}: DataFetcherParams) => {
  let searchParams = {
    pageSize,
    currentPage,
    ...params,
    isTemplate: ''
  };
  if (sortQuery.value) {
    searchParams.orderColumnStr = sortQuery.value.prop;
    searchParams.orderStr = sortQuery.value.sort;
  }
  if (params.risk) {
    searchParams.eventTypeCodes = eventTypeCodes.value;
  }
  if (eventTypeCodes.value.length === 0) {
    searchParams = omit(searchParams, 'eventTypeCodes');
  }
  searchParams = omit(searchParams, 'risk');
  const result = await apiYgfWarningConfigObj.postFindStrategyPage(
    searchParams
  );
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};
const onClickOutside = (row: IpostFindStrategyPageSpace.List) => {
  unref(popoverRef).popperRef?.hide?.();
};
const riskChanged = (data: string[]) => {
  eventTypeCodes.value = data;
};
const openStrategyPage = () => {
  router.push({
    name: 'ygfAlarmStrategy',
    query: {
      action: 'add',
    },
  });
};
const openDetail = (row: IpostFindStrategyPageSpace.List) => {
  router.push({
    name: 'ygfWarningConfigDetails',
    query: {
      action: 'detail',
      title: '报警策略配置',
      id: row.strategyId
    },
  });
};
const editStrategy = async(row: IpostFindStrategyPageSpace.List) => {
  await HlMessageBox.confirm(`【${row.strategyName}】策略关联的所有监测点执行策略同步更新!`, '编辑提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'warning',
    cancelButtonText: '取消',
  });
  router.push({
    name: 'ygfAlarmStrategy',
    query: {
      action: 'edit',
      id: row.strategyId,
    },
  });
};
const delStrategy = async(row: IpostFindStrategyPageSpace.List) => {
  await HlMessageBox.confirm(`您确认删除[${row.strategyName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
  });
  await apiYgfWarningConfigObj.postRemoveMonitorStrategy(1, row.strategyId);
  HlMessageSuccess('删除成功');
  tableRef.value?.refresh();
};
const saveOtherTpl = async(row: IpostFindStrategyPageSpace.List) => {
  await apiYgfWarningConfigObj.postModifyTemplate(row.strategyId, 1);
  tableRef.value?.refresh();
  HlMessageSuccess('设为模板成功');
  router.push({
    name: 'ygfAlarmStrategyTpl',
  });
};
</script>
<style lang="scss">
.unit-detail-popover {
  --popover-padding-y: var(--lg);
  --popover-padding-x: var(--lg);
  .hb-table-searchbar {
    padding-right: 0;
    padding-bottom: var(--sm);
  }
  .hb-table-toolbar {
    padding-left: 0;
    padding-top: var(--md) !important;
    padding-bottom: var(--md);
    margin-bottom: var(--sm);
  }
}
</style>
