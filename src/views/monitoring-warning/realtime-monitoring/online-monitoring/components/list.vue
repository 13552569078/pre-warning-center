<template>
  <div class="h-full">
    <fx-page-table-v2
      ref="tableRef"
      :cols="cols"
      :table-data="tableData"
      :data-fetcher="getData"
      :search-items="searchItems"
      selector-col-count="count-2"
      search-placement="top"
      :searcher="{ show: false }"
      class="h-full"
      >
      <template #toolbar-extra-after>
        <!-- <hl-button type="primary" icon-position="left" @click="exportOnlineList" class="m-r-lg">
          导出
          <template #icon>
            <hl-icon>
              <FillExport />
            </hl-icon>
          </template>
        </hl-button>
        <hl-button type="primary" icon-position="left" @click="showCharts">
          图表
          <template #icon>
            <hl-icon>
              <FillChartDoughnut />
            </hl-icon>
          </template>
        </hl-button> -->
        <fx-action-button label="导出" @click="exportOnlineList" type="secondary">
          <template #icon>
            <FillExport />
          </template>
        </fx-action-button>
        <fx-action-button label="图表" @click="showCharts">
          <template #icon>
            <FillChartDoughnut />
          </template>
        </fx-action-button>
      </template>
      <template #dataType="{ searchForm }">
        <uni-selector ref="searchDataTypeRef" v-model="searchForm['dataType']" dictType="TARGET_TYPE_CODE" />
      </template>
      <template #targetFrequency="{ searchForm }">
        <hl-checkbox-group v-model="searchForm['targetFrequency']" gap="var(--xl)">
          <hl-checkbox v-for="item in typeList1" :label="item.value" :key="item.label">{{ item.label }}</hl-checkbox>
        </hl-checkbox-group>
        </template>
        <template #searchIsPublic="{ searchForm }">
          <search-is-public
            ref="searchIsPublicRef"
            v-model="searchForm['isPublic']"
          />
        </template>
        <template #isMultiple="{ searchForm }">
          <hl-checkbox-group v-model="searchForm['isMultiple']" gap="var(--xl)">
          <hl-checkbox v-for="item in typeList2" :label="item.value" :key="item.label">{{ item.label }}</hl-checkbox>
        </hl-checkbox-group>
        </template>
        <template #isPublic="{ row }">
        {{ row.isPublic?'是':'否'}}
      </template>
      <template #dataValue="{ row }">
        {{ row.targetFrequency?'周期计算':'实时计算'}}
      </template>
      <template #action="{ row }">
        <hl-button type="link" @click="historyData(row)">历史数据</hl-button>
      </template>
    </fx-page-table-v2>
    <history-data-dialog ref="historyDataDialogRef"/>

    <online-charts-dlg ref="onLineChartsDlgRef" :exportParams="exportParams" v-if="showOnlineChartsDlg" @cancel="showOnlineChartsDlg=false"/>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from 'vue';
import { DataFetcherParams } from 'fx-front-framework';
import { useRouter } from 'vue-router';
import { useIframe } from '@/hooks';
import { apiRealTimeMonitorObj as api } from '@/apis/modules/realtime-monitor';
import { IpostGetTargetDataRealTimePageSpace } from '@/apis/modules/realtime-monitor/model';
import historyDataDialog from './historyDataDialog.vue';
import UniSelector from '@/views/monitoring-config/components/universal-dict-selector.vue';
import { getSecondsToUnitTime } from '@/common/time';
import { apiWarningTotalObj } from '@/apis/modules/warning-total';
import onlineChartsDlg from '@/views/monitoring-warning/realtime-monitoring/online-monitoring/components/online-charts-dlg.vue';

const { isIframe } = useIframe();

const props = defineProps({
  targetNode: {
    type: Object
  },
});

watch(
  () => props.targetNode,
  newId => {
    tableRef.value?.reset();
    tableRef.value?.refresh();
  }
);

const tableData = ref<IpostGetTargetDataRealTimePageSpace.List[]>([]);
const tableRef = ref();
const searchIsPublicRef = ref();
const router = useRouter();

const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex'
  },
  { title: '指标数据项名称', prop: 'targetDataName', minWidth: '22em', showTooltip: true, tooltipProps: { minWidth: '240px' }, fixed: 'left' },
  { title: '指标名称', prop: 'targetName', minWidth: '15em', showTooltip: true },
  { title: '数据类型', prop: 'dataTypeName', minWidth: '8em', showTooltip: true },
  { title: '计算周期类型', prop: 'dataValue', slotName: 'dataValue' },
  { title: '是否公用', prop: 'isPublic', slotName: 'isPublic' },
  { title: '数据频率', prop: 'targetFrequencyName' },
  { title: '指标分类', prop: 'isMultipleName' },
  { title: '指标值', prop: 'dataValue', minWidth: '8em' },
  { title: '指标时间', prop: 'collectTime', minWidth: '12em', },
  { title: '操作', slotName: 'action', align: 'left', fixed: 'right' }
]);

const typeList1 = [{ label: '实时计算', value: 0 }, { label: '周期计算', value: 1 }];
const typeList2 = [{ label: '基础指标', value: 0 }, { label: '复合指标', value: 1 }];

const searchDataTypeRef = ref();
const searchItems = reactive([
  {
    span: 'col-span-2',
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    name: 'targetDataName',
    label: '指标数据项名称',
    placeholder: '请输入指标数据项名称',
    value: '',
    clearable: true,
  },
  {
    type: 'slot',
    label: '数据类型',
    placeholder: '请选择数据类型',
    value: '',
    name: 'dataType',
    slotName: 'dataType',
    clearable: true,
    display: (item: any) => {
      return searchDataTypeRef.value.getOptionName(item.value);
    },
    // prop: {
    //   label: 'dictName',
    //   value: 'dictCode',
    // },
    // options: [{ dictName: '正常', dictCode: 1 }, { dictName: '异常', dictCode: 0 }],
  },
  {
    type: 'slot',
    slotName: 'searchIsPublic',
    label: '是否公用',
    value: '',
    name: 'isPublic',
    display: (item: any) => {
      return searchIsPublicRef.value?.getOptionName(item.value);
    }
  },
  {
    type: 'slot',
    label: '计算周期类型',
    placeholder: '请选择计算周期类型',
    value: [],
    name: 'targetFrequency',
    slotName: 'targetFrequency',
    display: (item: any) => {
      return typeList1.filter(e => item.value.includes(e.value)).map(e => e.label).join(', ');
    },
  },
  {
    type: 'slot',
    label: '指标分类',
    placeholder: '请选择指标分类',
    value: [],
    name: 'isMultiple',
    slotName: 'isMultiple',
    display: (item: any) => {
      return typeList2.filter(e => item.value.includes(e.value)).map(e => e.label).join(', ');
    },
  },
]);

const historyDataDialogRef = ref();
const historyData = (row: any) => {
  router.push({
    name: 'onlineHistoryData',
    query: {
      title: '指标历史数据',
      id: row.targetDataId
    },
  });
};
const getData = async({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
  const total = await fetchData({ pageSize, currentPage, params, setTotal });
  setTotal(total);
};
const exportParams = ref({});
const fetchData = async({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
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
  if (params.isMultiple) {
    if (params.isMultiple?.length > 1) {
      params.isMultiple = '';
    } else {
      params.isMultiple = params.isMultiple[0];
    }
  }
  const searchParams = {
    pageSize,
    currentPage,
    ...params,
    targetId: props.targetNode?.type === 1 ? props.targetNode.id : undefined,
    targetTypeCode: props.targetNode?.type === 0 ? props.targetNode.targetTypeCode : undefined,
  };
  exportParams.value = searchParams;
  const { data } = await api.postGetTargetDataRealTimePage(searchParams);
  tableData.value = data.list.map(item => {
    item.isMultipleName = item.isMultiple === 0 ? '基础指标' : '复合指标';
    item.targetFrequencyName = item.targetFrequency ? getSecondsToUnitTime(item, 'targetFrequencyUnit', 'targetFrequency') + item.targetFrequencyUnitName : '--';
    return item;
  });
  return data.totalRow;
};

const exportOnlineList = () => {
  apiWarningTotalObj.postRealExportList(exportParams.value);
};

const onLineChartsDlgRef = ref();
const showOnlineChartsDlg = ref(false);
const showCharts = () => {
  showOnlineChartsDlg.value = true;
};
</script>
<style scoped lang="scss">
.table-v2 {
  height: calc(100% - 74px);
}
</style>
