<template>
  <hl-group full class="h-full" gap="var(--lg)">
    <fx-page-table-v2
      ref="tableRef"
      :cols="cols"
      :table-data="tableData"
      :data-fetcher="getData"
      :table-props="{ rowKey: 'factorId' }"
      selector-col-count="count-xl-2 count-lg-1 count-md-1"
      :show-search-bar="false"
      :searchItems="searchItems"
      @sort-change="sortChange">
      <template #toolbar-extra-after>
        <fx-action-button type="main" @click="addFactor" label="新增监测因子" />
      </template>
        <template #factorName="{ row }">
      <span class="text-primary cursor-pointer" @click="openDetail(row)">{{
        row.factorName
      }}</span>
    </template>
      <template #action="{ row }">
        <hl-button type="link" @click="editFactor(row)">编辑</hl-button>
        <hl-button type="link" @click="delFactor(row)">删除</hl-button>
      </template>
    </fx-page-table-v2>
  </hl-group>
  <monitoring-factor-dlg v-if="dlgVisible" :id="editintId" @cancel="dlgVisible = false" @ok="ok" />
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { DataFetcherParams, FxPageTable } from 'fx-front-framework';
import { CommonUtils } from 'fx-front-utils';
import { HlMessageBox } from 'hongluan-ui';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useSort } from '@/hooks';
import { PlusButton } from '@/components';
import { EventTypeTree } from '../event-type-config/components';
import { apiMonitorFactorObj } from '@/apis/modules/monitoring-factor';
import { EventTypeItem } from '@/views/system-common-config/event-type-config/types';
import MonitoringFactorDlg from './monitoring-factor-dlg.vue';

import type { IgetFindMonitorFactorPageMonitorFactorSpace } from '@/apis/modules/monitoring-factor/model';

const router = useRouter();
const { t } = useI18n();

const tableData = ref<IgetFindMonitorFactorPageMonitorFactorSpace.List[]>([]);
const selectedRickTypeCode = ref();

const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex'
  },
  { title: `${t('warningType')}`, prop: 'riskTypeName' },
  { title: '因子编码', prop: 'factorCode' },
  { title: '监测因子', prop: 'factorName', slotName: 'factorName', },
  { title: '预警类型', prop: 'warningTypeName' },
  { title: '设施类型', prop: 'facilityTypeName' },
  { title: '启用状态', prop: 'useStateName' },
  { title: '启用/停用时间', prop: 'useStateTime' },
  { title: '更新时间', prop: 'updatedAt', sortable: true, minWidth: '200px' },
  { title: '操作', slotName: 'action', align: 'center' }
]);
const searchItems = reactive([{
  type: 'input',
  maxlength: '20',
  showWordLimit: false,
  label: '因子名称',
  placeholder: '因子名称',
  value: '',
  name: 'factorName',
}, {
  type: 'input',
  maxlength: '20',
  showWordLimit: false,
  label: '因子编号',
  placeholder: '因子编号',
  value: '',
  name: 'factorCode',
}, {
  type: 'select',
  label: '启用状态',
  placeholder: '请选择启用状态',
  value: '',
  name: 'useState',
  options: [
    {
      label: '启用',
      value: '1'
    },
    {
      label: '停用',
      value: '0'
    }
  ]
}]);

const tableRef = ref<InstanceType<typeof FxPageTable>>();
const editintId = ref<string | number>('');
const dlgVisible = ref(false);

const { sortQuery, sortChange } = useSort(tableRef, cols);

const getData = async({ params, pageSize, currentPage, setTotal }: DataFetcherParams) => {
  const searchParams = {
    pageSize,
    currentPage,
    ...params
  };
  if (sortQuery.value) {
    searchParams.orderColumnStr = sortQuery.value.prop;
    searchParams.orderStr = sortQuery.value.sort;
  }
  const result = await apiMonitorFactorObj.getFindMonitorFactorPageMonitorFactor(CommonUtils.toQuery(searchParams));
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};

const addFactor = () => {
  editintId.value = '';
  dlgVisible.value = true;
};
const editFactor = (row: IgetFindMonitorFactorPageMonitorFactorSpace.List) => {
  editintId.value = row.factorId;
  dlgVisible.value = true;
};
const openDetail = (row:IgetFindMonitorFactorPageMonitorFactorSpace.List) => {
  router.push({
    name: 'monitoringFactorMgmtDetail',
    query: {
      title: '监测因子详情',
      id: row.factorId
    },
  });
};
const delFactor = async(row: IgetFindMonitorFactorPageMonitorFactorSpace.List) => {
  await HlMessageBox.confirm(`您确认删除[${row.factorName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消'
  });
  await apiMonitorFactorObj.postRemoveMonitorFactorMonitorFactor(row.factorId);
  tableRef.value?.refresh();
};

const ok = () => {
  dlgVisible.value = false;
  tableRef.value?.refresh();
};
</script>
