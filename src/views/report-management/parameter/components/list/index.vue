<template>
  <hl-group full class="h-full" gap="var(--lg)">
    <fx-page-table-v2 v-if="isShowTable" ref="tableRef" :cols="cols" :table-data="tableData" :data-fetcher="getData" :table-props="{ rowKey: 'factorId' }" selector-col-count="count-xl-2 count-lg-1 count-md-1" :show-search-bar="false" :searchItems="searchItems" @sort-change="sortChange">
      <template #toolbar-extra-after>
        <fx-action-button type="main" @click="addFactor" :disabled="!paramGroupId" label="新增参数" />
      </template>
      <template #paramName="{ row }">
        <hb-text-overflow style="display: inline-block; width: 12em" effect="light">
          <span class="text-primary cursor-pointer" @click="openDetail(row)">{{ row.paramName }}</span>
        </hb-text-overflow>
      </template>

      <template #referTemplates="{ row }">
        <hl-popover v-if="row.referTemplates.length" content="Bottom Center" placement="bottom" trigger="hover">
          <hl-group dir="vertical" gap="var(--md)">
            <hl-tag v-for="(t, index) in row.referTemplates" effect="light" type="primary" :key="index">{{ t.templateName }}</hl-tag>
          </hl-group>
          <template #reference>
            <hl-group class="cursor-pointer hover:text-link" align="items-left items-middle" gap="var(--xxs)">
              <hl-icon size="xxs" class="static">
                <TwoSearch />
              </hl-icon>
              <div>查看</div>
            </hl-group>
          </template>
        </hl-popover>
        <span v-else>--</span>
      </template>

      <template #paramDesc="{ row }">
        <hl-popover v-if="row.paramDesc !== '--'" content="Bottom Center" placement="bottom" trigger="hover" width="320px">
          <div style="width: 100%; max-height: 150px; overflow: auto">{{ row.paramDesc }}</div>
          <template #reference>
            <hl-group class="cursor-pointer hover:text-link" align="items-left items-middle" gap="var(--xxs)">
              <hl-icon size="xxs" class="static">
                <TwoSearch />
              </hl-icon>
              <div>查看</div>
            </hl-group>
          </template>
        </hl-popover>
        <span v-else>--</span>
      </template>

      <template #action="{ row }">
        <hl-button type="link" @click="edit(row)" effect="light"
                   no-fill>编辑
        </hl-button>
        <hl-button type="link" @click="del(row)" :disabled="row.isRefer" effect="light"
                   no-fill>删除
        </hl-button>
      </template>
    </fx-page-table-v2>
  </hl-group>
  <!-- 详情 -->
  <detail-dlg v-if="detailDlgVisible" :id="editintId" @close="detailDlgVisible = false" />
  <!-- 新增/编辑 -->
  <edit-dlg v-if="editDlgVisible" :id="editintId" :param-group-id="paramGroupId" @ok="ok" @close="editDlgVisible = false" />
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { DataFetcherParams, FxPageTable } from 'fx-front-framework';
import { HlMessageBox, HlMessage } from 'hongluan-ui';
import { useRouter, useRoute } from 'vue-router';
import { useSort } from '@/hooks';
import { PlusButton } from '@/components';
import { apiTemplateParamsManagementObj as api } from '@/apis/modules/tpl-params-manage/list';
import { IpostPageSpace } from '@/apis/modules/tpl-params-manage/list/model';
import DetailDlg from './detail-dlg.vue';
import EditDlg from './edit-dlg.vue';

const props = defineProps({
  paramGroupId: {
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
  () => props.paramGroupId,
  newId => {
    tableRef.value?.reset();
    tableRef.value?.refresh();
  }
);

const tableData = ref<IpostPageSpace.List[]>([]);

const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex',
    fixed: 'left'
  },
  { title: '参数名称', prop: 'paramName', slotName: 'paramName', minWidth: '10em', fixed: { position: 'left', } },
  { title: '参数类型', prop: 'paramTypeName', minWidth: '4em' },
  { title: '参数用途', prop: 'paramUseName', minWidth: '14em' },
  { title: '子用途', prop: 'paramSubUseName', minWidth: '14em' },
  { title: '时间条件', prop: 'timeConditionName', minWidth: '10em' },
  { title: '使用情况', prop: 'referTemplates', slotName: 'referTemplates', minWidth: '4em' },
  { title: '参数说明', prop: 'paramDesc', slotName: 'paramDesc', minWidth: '4em' },
  { title: '更新时间', prop: 'updatedAt', minWidth: '12em' },
  { title: '操作', slotName: 'action', align: 'left', minWidth: '6em', fixed: { position: 'right' } }
]);
const searchItems = reactive([
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '参数名称',
    placeholder: '参数名称',
    value: '',
    name: 'paramName'
  }
  // {
  //   type: 'slot',
  //   slotName: 'computePeriod',
  //   label: '计算周期类型',
  //   value: '',
  //   name: 'targetFrequencyType',
  // },
]);
const isShowTable = ref(false);
const optionComputePeriod = ref([
  { dictName: '周期计算', dictCode: 1 },
  { dictName: '实时计算', dictCode: 0 }
]);

const editintId = ref<string | number>('');
const dlgVisible = ref(false);
const detailDlgVisible = ref(false);
const editDlgVisible = ref(false);

const { sortQuery, sortChange } = useSort(tableRef, cols);

const emit = defineEmits(['updated']);

const getData = async({ params, pageSize, currentPage, setTotal }: DataFetcherParams) => {
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
    paramGroupCode: props.paramGroupId === '-1' ? '' : props.paramGroupId,
    ...params
  };
  const result = await api.postPage(searchParams);

  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};

const addFactor = () => {
  editintId.value = '';
  editDlgVisible.value = true;
};
const edit = (row: IpostPageSpace.List) => {
  editintId.value = row.paramId;
  editDlgVisible.value = true;
};
const openDetail = (row: IpostPageSpace.List) => {
  editintId.value = row.paramId;
  detailDlgVisible.value = true;
};
const del = async(row: IpostPageSpace.List) => {
  await HlMessageBox.confirm(`您确认删除[${row.paramName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消'
  });
  await api.deleteT(row.paramId);
  HlMessage.success('删除成功');
  tableRef.value?.refresh();
  emit('updated');
};
const ok = () => {
  editDlgVisible.value = false;
  tableRef.value?.refresh();
  emit('updated');
};

const getParamsTypeDict = async() => {
  const res = await api.getGetParamTypeDict();
  return res;
};

const getSearchItem = async() => {
  const data = await getParamsTypeDict();
  console.log(data);
  searchItems.push({
    type: 'select',
    label: '参数类型',
    placeholder: '请选择参数类型',
    value: '',
    name: 'paramTypeIds',
    clearable: true,
    multiple: true,
    'collapse-tags': true,
    'collapse-tags-tooltip': true,
    prop: {
      label: 'paramTypeName',
      value: 'paramTypeId'
    },
    options: data.data
  });
  isShowTable.value = true;
};

onMounted(() => {
  getSearchItem();
});
</script>
