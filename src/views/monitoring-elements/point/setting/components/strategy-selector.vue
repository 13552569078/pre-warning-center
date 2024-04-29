<template>
  <hl-dialog v-model="dialogVisible" title="关联策略" width="900px" @close="handleClose" body-class="strategy-selector-dialog-body bg-modal" footer-class="dialog-footer-margin-top-0">
    <fx-page-table-v2
      ref="tableRef"
      class="is-in-container"
      v-if="shwoTable"
      :cols="cols"
      :table-data="tableData"
      :data-fetcher="getData"
      selector-col-count="count-2"
      search-placement="top"
      :search-items="searchItems"
      :is-multiple-select="false"
      @selected-row-keys="selectedRowKeys"
    >
      <template #risk="{ searchForm }">
        <risk-type @risk-changed="riskChanged" v-model="searchForm['risk']" :use-for="1"/>
      </template>
      <template #triggerType="{ searchForm }">
        <search-trigger-type ref="searchTriggerTypeRef" v-model="searchForm['triggerType']"/>
      </template>
      <template #isTemplate="{ row }">
        <span>{{ row.isTemplate ? '是' : '否'}}</span>
      </template>
      <template #strategyName="{ row }">
        <span class="text-link" style="cursor: pointer;" @click="handleGo(row.id)">{{ row.strategyName }}</span>
      </template>
    </fx-page-table-v2>
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
import { DataFetcherParams } from 'fx-front-framework';
import { RiskType } from '@/views/monitoring-config/components/index';
import { IgetFindMonitorUnitTargetStrategySpace } from '@/apis/modules/monitor-unit/model';
import { apiMonitorStrategyObj as api } from '@/apis/modules/monitor-strategy/fixed-cycle';
import { IpostFindMonitorUnitStrategyListPageSpace } from '@/apis/modules/monitor-strategy/fixed-cycle/model';
import router from '@/router';

type SelectedEquipment = {
  id: string,
  name: string
}

const emit = defineEmits(['close', 'ok']);
const props = defineProps<{
  strategyList: IgetFindMonitorUnitTargetStrategySpace.MonitorUnitStrategyListVOList[],
  targetList: IgetFindMonitorUnitTargetStrategySpace.MonitorUnitTargetListVOList[],
}>();

const tableData = ref<IpostFindMonitorUnitStrategyListPageSpace.List[]>([]);
const tableRef = ref();
const shwoTable = ref(false);
const currentPageNum = ref(1);
const dialogVisible = ref(true);

const selectedEquipments = ref<SelectedEquipment[]>([]);
const searchTriggerTypeRef = ref();

const cols = ref([
  { title: '', slotName: 'tableSelection', headerSlotName: 'selectionCol', maxWidth: '4em', minWidth: '4em', align: 'center', },
  { title: '策略名称', slotName: 'strategyName' },
  { title: '风险分类', prop: 'eventTypeName' },
  { title: '策略类型', prop: 'triggerTypeName' },
  { title: '监测点', prop: 'monitorUnitNumber' },
  { title: '是否为模板', slotName: 'isTemplate' },
  { title: '更新时间', prop: 'updateAt', minWidth: '200px' }
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
    type: 'slot',
    label: '风险分类',
    placeholder: '风险分类',
    value: '',
    name: 'risk',
    slotName: 'risk',
  },
  {
    type: 'slot',
    label: '策略类型',
    placeholder: '策略类型',
    value: '',
    name: 'triggerType',
    slotName: 'triggerType',
    display: (item: any) => {
      return searchTriggerTypeRef.value.getOptionName(item.value);
    },
  }
]);

const selectedKeys = ref([] as string[]);

const eventTypeCodes = ref<string[]>([]);

const handleGo = (id: string) => {
  router.push({
    name: 'monitoringConfigDetails',
    query: {
      title: '预警策略模板',
      id,
      source: 'pointSetting'
    }
  });
};

const riskChanged = (data: string[]) => {
  eventTypeCodes.value = data;
};

const selectedRowKeys = (newKeys: string[]) => {
  selectedKeys.value = newKeys;
};

const getSearchItems = async() => {
  shwoTable.value = true;
};

const getData = async({
  pageSize,
  currentPage,
  params,
  setTotal,
}: DataFetcherParams) => {
  currentPageNum.value = currentPage;
  const searchParams = {
    pageSize,
    currentPage,
    ...params,
    targetDataIdList: props.targetList?.map(item => item.targetDataId),
    strategyIdList: props.strategyList?.map(item => item.strategyId)
  };
  tableData.value = [];
  const { data } = await api.postFindMonitorUnitStrategyListPage(searchParams);
  tableData.value = data.list;
  setTotal(data.totalRow);
};

const handleClose = () => {
  emit('close');
};

const ok = () => {
  const strategy = tableData.value.find(item => item.id! === selectedKeys.value[0]);
  strategy!.strategyId = strategy!.id!;
  emit('ok', strategy);
};

// const w = watch(() => props.selected, () => {
//   if (props.selected?.length) {
//     selectedEquipments.value = props.selected as SelectedEquipment[];
//   }
//   w();
// });

onMounted(() => {
  getSearchItems();
});
</script>
<style lang="scss">
.strategy-selector-dialog-body {
  .panel-header.flex-wrap {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}
</style>
