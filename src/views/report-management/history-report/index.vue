<template>
  <fx-page-table-v2 ref="tableRef" :cols="cols" :table-data="tableData" :table-props="{ rowKey: 'monitorStrategyId' }"
    :data-fetcher="getData" :search-items="searchItems" selector-col-count="count-3" :searcher="{ show: false }">
    <template #templateName="{ row }">
      <span class="text-primary cursor-pointer" @click="showDetail(row)">{{
          row.templateName
      }}</span>
    </template>
    <template #reportState="{ row }">
      <hl-group align="items-left items-middle" gap="var(--xxs)" v-if="row.reportState === 1">
        <hl-icon size="xs" class="static" type="danger">
          <TwoCircleError></TwoCircleError>
        </hl-icon><span class="text-danger static" style="font-size: 14px; line-height: 22px;">失败</span>
      </hl-group>
      <hl-group align="items-left items-middle" gap="var(--xxs)" v-if="row.reportState === 0">
        <hl-icon size="xs" class="static" type="success">
          <TwoCircleCheck></TwoCircleCheck>
        </hl-icon><span class="text-success static" style="font-size: 14px; line-height: 22px;">成功</span>
      </hl-group>
      <hl-group align="items-left items-middle" gap="var(--xxs)" v-if="row.reportState === 2">
        <hl-icon size="xs" class="static" type="primary">
          <TwoCircleCheck></TwoCircleCheck>
        </hl-icon><span class="text-primary static" style="font-size: 14px; line-height: 22px;">修正</span>
      </hl-group>
    </template>
    <template #actions="{ row }">
      <hb-overflow-list :show-count="3">
        <hl-button type="link" @click="edit(row)">修正报告</hl-button>
        <hl-button type="link" @click="del(row)">删除</hl-button>
        <hl-button type="link" @click="download(row)">下载报告</hl-button>
        <hl-button type="link" @click="saveAs(row)">模板另存为</hl-button>
        <template #more>
          <hl-icon>
            <TwoChevronBottom />
          </hl-icon>
        </template>
      </hb-overflow-list>
    </template>
  </fx-page-table-v2>
  <!-- 模板详情 -->
  <report-detail @close="detailVisiable = false" :template-id="templateId" v-if="detailVisiable"></report-detail>
  <!-- 修正报告 -->
  <correct :report-id="reportId" v-if="correctVisiable"  @close="correctVisiable = false" @correct-ok="correctOk"></correct>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
import { FxPageTable, DataFetcherParams } from 'fx-front-framework';
import { useRoute } from 'vue-router';
import { HlMessageBox } from 'hongluan-ui';
import { HlMessageSuccess, dateFormat, downloadByUrl } from '@/common';
import { apiHistoryReportObj } from '@/apis/modules/report-manage/history/index';
import { IgetFindReportPageSpace } from '@/apis/modules/report-manage/history/model';
import { ReportDetail } from '../tpl/components/index';
import Correct from './correct.vue';

const route = useRoute();

const detailVisiable = ref(false);
const templateId = ref('');
const reportId = ref('');
const correctVisiable = ref(false);

const reportTaskId = computed(() => route.query.taskId);

const tableRef = ref<InstanceType<typeof FxPageTable>>();
const tableData = ref<IgetFindReportPageSpace.List[]>([]);
const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex',
  },
  {
    title: '报告名称',
    prop: 'reportName',
    minWidth: '120px',
    showTooltip: true,
    tooltipProps: { maxWidth: '340px' }
  },
  { title: '模板名称', minWidth: '120px', slotName: 'templateName', showTooltip: true, tooltipProps: { maxWidth: '340px' } },
  { title: '任务类型', prop: 'taskTypeName', minWidth: '120px', showTooltip: true, tooltipProps: { maxWidth: '340px' } },
  { title: '报告生成时间', prop: 'createdAt', minWidth: '120px', showTooltip: true, tooltipProps: { maxWidth: '340px' } },
  { title: '生成状态', slotName: 'reportState', minWidth: '120px' },
  { title: '操作', slotName: 'actions', align: 'left', fixed: 'right', width: '18em' },
]);
const searchItems = reactive([
  {
    type: 'datetimerange',
    label: '报告生成时间',
    value: [],
    name: 'timeRange',
    'is-range': true,
    'range-separator': '至',
    'start-placeholder': '报告开始时间',
    'end-placeholder': '报告结束时间',
    'placeholder': '选择时间范围',
    format: dateFormat,
    'value-format': dateFormat,
    clearable: false,
    editable: false
  },
]);

const getData = async({
  pageSize,
  currentPage,
  params,
  setTotal,
}: DataFetcherParams) => {
  const searchParams = {
    pageSize,
    currentPage,
    ...params,
  };
  if (params.timeRangeStart) {
    searchParams.startTime = params.timeRangeStart;
    searchParams.endTime = params.timeRangeEnd;
  }
  if (reportTaskId.value) {
    searchParams.reportTaskId = reportTaskId.value;
  }
  const result =
    await apiHistoryReportObj.getFindReportPage(
      searchParams
    );
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};
// 模板详情
const showDetail = (row: IgetFindReportPageSpace.List) => {
  templateId.value = row.templateId;
  detailVisiable.value = true;
};
const download = (row: IgetFindReportPageSpace.List) => {
  downloadByUrl(row.reportFileVO);
};
const edit = (row: IgetFindReportPageSpace.List) => {
  reportId.value = row.reportId;
  correctVisiable.value = true;
};
const saveAs = (row: IgetFindReportPageSpace.List) => {
  // 下载模板
  downloadByUrl(row.templateFileVO);
};
const del = async(row: IgetFindReportPageSpace.List) => {
  await HlMessageBox.confirm(`您确认删除[${row.reportName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
    type: 'success',
  });
  await apiHistoryReportObj.getRemoveReport(row.reportId);
  HlMessageSuccess('删除成功');
  tableRef.value?.refresh();
};
const correctOk = () => {
  tableRef.value?.refresh();
  correctVisiable.value = false;
};
</script>
