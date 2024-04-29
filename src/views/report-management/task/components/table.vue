<template>
  <fx-page-table-v2 ref="tableRef" :cols="cols" :table-data="tableData" :table-props="{ rowKey: 'monitorStrategyId' }" :data-fetcher="getData" :search-items="searchItems" selector-col-count="count-3" :searcher="{ show: false }">
    <!-- 新增任务 -->
    <template #toolbar-extra-after>
      <fx-action-button type="main" :disabled="$props?.templateModel?.type !== 1" label="新增报告任务" @click="add" />
    </template>
    <!-- 任务名称 -->
    <template #taskName="{ row }">
      <span class="text-primary cursor-pointer" @click="showTaskDetail(row)">{{ row.taskName }}</span>
    </template>
    <!-- 模板名称 -->
    <template #templateName="{ row }">
      <span class="text-primary cursor-pointer" @click="showTplDetail(row)">{{ row.templateName }}</span>
    </template>
    <!-- 生成时间 -->
    <template #reportDate="{ row }">
      <span v-if="row.taskType === 'DISPOSABLE_TASK'">{{ row.reportDate }}</span>
      <span v-if="row.taskType === 'CYCLE_TASK'">{{ row.reportTime }}</span>
    </template>
    <!-- 任务状态 -->
    <template #taskState="{ row }">
      <hl-tag v-if="row.taskState === 0" gap="var(--md)" effect="light" class="border-transparent">
        <hl-icon size="xs" class="static m-r-xxs text-secondary">
          <TwoCircleDisabled></TwoCircleDisabled> </hl-icon
        ><span class="static text-secondary" style="font-size: 14px; line-height: 22px">停用</span>
      </hl-tag>
      <hl-tag v-if="row.taskState === 1" type="primary" effect="light" gap="var(--md)">
        <hl-icon size="xs" class="static m-r-xxs" type="primary">
          <TwoCircleCheck></TwoCircleCheck> </hl-icon
        ><span class="text-primary static" style="font-size: 14px; line-height: 22px">启用</span>
      </hl-tag>
    </template>
    <!-- opration -->
    <template #actions="{ row }">
      <hb-overflow-list :show-count="3">
        <hl-button type="link" @click="goHistory(row)">历史报告</hl-button>
        <hl-button type="link" @click="handelReport(row)" :disabled="row.taskState === 0" no-fill>手动生成</hl-button>
        <hl-button type="link" @click="changeTaskState(row, 0)" v-if="row.taskState === 1">停用</hl-button>
        <hl-button type="link" @click="changeTaskState(row, 1)" v-if="row.taskState === 0">启用</hl-button>
        <hl-button type="link" @click="del(row)" :disabled="row.taskState === 1" no-fill>删除</hl-button>
        <template #more>
          <hl-icon>
            <TwoChevronBottom />
          </hl-icon>
        </template>
      </hb-overflow-list>
    </template>
    <!-- 高级检索 -->
    <!-- 任务类型 -->
    <template #taskTypeList="{ searchForm }">
      <uni-selector ref="searchTaskTypeRef" v-model="searchForm['taskTypeList']" dictType="REPORT_TASK_TYPE" multiple />
    </template>
  </fx-page-table-v2>
  <!-- 任务详情 -->
  <task-detail @close="detailTaskVisiable = false" :task-id="taskId" :template-id="templateId" v-if="detailTaskVisiable" />
  <!-- 模板详情 -->
  <report-detail @close="detailTplVisiable = false" :template-id="templateId" v-if="detailTplVisiable"></report-detail>
</template>

<script lang="ts" setup>
import { ref, reactive, PropType, watch, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { HlMessageBox } from 'hongluan-ui';
import { FxPageTable, DataFetcherParams } from 'fx-front-framework';
import { pick } from 'lodash-es';
import { Indexable } from 'fx-front-utils';
import { UniSelector } from '@/components';
import { HlMessageSuccess, dateFormat } from '@/common';
import { ReportDetail } from '@/views/report-management/tpl/components/index';
import { apiReportTsakObj } from '@/apis/modules/report-manage/task/index';
import { IgetFindReportPageSpace } from '@/apis/modules/report-manage/task/model';
import { TaskDetail } from './index';

const props = defineProps({
  templateModel: {
    type: Object as PropType<Indexable<any>>,
    default: () => {
      return {};
    }
  }
});

const router = useRouter();
const route = useRoute();

const detailTaskVisiable = ref(false);
const taskId = ref();
const detailTplVisiable = ref(false);
const templateId = ref();

const tableRef = ref<InstanceType<typeof FxPageTable>>();
const tableData = ref<IgetFindReportPageSpace.List[]>([]);
const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex'
  },
  {
    title: '任务名称',
    slotName: 'taskName',
    minWidth: '180px',
    showTooltip: true,
    tooltipProps: { maxWidth: '340px' },
    fixed: 'left',
  },
  { title: '模板名称', minWidth: '180px', slotName: 'templateName', showTooltip: true, tooltipProps: { maxWidth: '340px' } },
  { title: '任务类型', prop: 'taskTypeName', minWidth: '160px' },
  { title: '生成报告周期', prop: 'taskPeriodName', minWidth: '240px', showTooltip: true, tooltipProps: { maxWidth: '340px' } },
  { title: '更新时间', prop: 'updatedAt', minWidth: '180px' },
  { title: '最后生成时间', prop: 'lastReportTime', minWidth: '180px' },
  { title: '任务状态', slotName: 'taskState', minWidth: '120px' },
  { title: '操作', slotName: 'actions', align: 'left', fixed: 'right', minWidth: '240px' }
]);
const searchItems = reactive([
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '任务名称',
    placeholder: '请输入任务名称',
    value: '',
    name: 'taskName'
  },
  {
    type: 'slot',
    slotName: 'taskTypeList',
    label: '任务类型',
    value: [],
    name: 'taskTypeList',
    display: (item: any) => {
      return searchTaskTypeRef.value.getOptionName(item.value);
    }
  },
  {
    type: 'datetimerange',
    label: '最后生成时间',
    value: [],
    name: 'timeRange',
    'is-range': true,
    'range-separator': '至',
    'start-placeholder': '起始时间',
    'end-placeholder': '结束时间',
    placeholder: '选择时间范围',
    format: dateFormat,
    'value-format': dateFormat,
    clearable: false,
    editable: false
  }
]);

const searchTaskTypeRef = ref();

watch(
  () => props.templateModel.id,
  () => {
    tableRef.value?.refresh();
  }
);

const getData = async({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
  const searchParams = {
    pageSize,
    currentPage,
    ...params
  };
  if (params.timeRangeStart) {
    searchParams.startTime = params.timeRangeStart;
    searchParams.endTime = params.timeRangeEnd;
  }
  // 模板
  if (props.templateModel.type === 1) {
    searchParams.templateId = props.templateModel.id;
  }
  // 模板分组
  if (props.templateModel.type === 0) {
    searchParams.templateTypeCode = props.templateModel.id !== -1 ? props.templateModel.templateTypeCode : '';
  }
  const result = await apiReportTsakObj.getFindReportPage(searchParams);
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};
// 模板详情
const showTaskDetail = (row: IgetFindReportPageSpace.List) => {
  taskId.value = row.taskId;
  templateId.value = row.templateId;
  detailTaskVisiable.value = true;
};
// 模板详情
const showTplDetail = (row: IgetFindReportPageSpace.List) => {
  templateId.value = row.templateId;
  detailTplVisiable.value = true;
};
// 启用 停用
const changeTaskState = async(row: IgetFindReportPageSpace.List, status: number) => {
  await apiReportTsakObj.getEnable(row.taskId, status);
  HlMessageSuccess(`${status === 1 ? '启用' : '关闭'}成功`);
  tableRef.value?.refresh();
};
// 历史报告
const goHistory = (row: IgetFindReportPageSpace.List) => {
  router.push({
    name: 'reportManagementHistoryReport',
    query: {
      taskId: row.taskId
    }
  });
};
// 手动生成
const handelReport = async(row: IgetFindReportPageSpace.List) => {
  await apiReportTsakObj.getCreateReport(row.taskId);
  HlMessageSuccess('手动生成成功');
};
// 新增任务
const add = () => {
  router.push({
    name: 'reportManagementTaskConfig',
    query: {
      action: 'add',
      ...pick(props.templateModel, 'id') // 模板id
    }
  });
};
// 删除
const del = async(row: IgetFindReportPageSpace.List) => {
  await HlMessageBox.confirm(`您确认删除[${row.taskName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
    type: 'success'
  });
  await apiReportTsakObj.deleteR(row.taskId);
  HlMessageSuccess('删除成功');
  tableRef.value?.refresh();
};
</script>
