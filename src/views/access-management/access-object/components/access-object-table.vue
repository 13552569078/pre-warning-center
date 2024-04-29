<template show-source>
  <fx-page-table-v2 ref="tableRef" :cols="cols" :table-data="tableData" :table-props="{rowKey: 'accessSourceObjectId'}" :data-fetcher="getData" :show-search-bar="false" :search-items="searchItems" @sort-change="sortChange">
    <template #toolbar-extra-after>
      <fx-action-button type="main" label="新增接入对象" :disabled="!$props.accessSourceId" @click="add" />
    </template>
    <template #objectName="{row}">
      <span class="text-primary cursor-pointer" @click="showDetail(row)">{{ row.objectName }}</span>
    </template>
    <template #actions="{ row }">
      <hl-button type="link" @click="edit(row)">编辑</hl-button>
      <hl-button type="link" @click="del(row)" :disabled="row.isRefer" no-fill>删除</hl-button>
    </template>
  </fx-page-table-v2>

  <!-- 新增/编辑接入对象 弹框 -->
  <add-access-object
    v-if="dialogVisible"
    :data="toRaw(formData)"
    :accessSourceId="$props.accessSourceId"
    :dataSourceType="$props.accessType"
    @close="handleClose"/>

  <!-- 接入对象详情 弹框 -->
  <detail-access-object
    v-if="detailDialogVisible"
    :data="toRaw(formData)"
    @close="detailDialogVisible = false"
  />
</template>

<script lang="ts" setup>
import { ref, reactive, toRaw } from 'vue';
import { HlMessageBox, HlMessage } from 'hongluan-ui';
import { DataFetcherParams, FxPageTable } from 'fx-front-framework';
import { Indexable } from 'fx-front-utils';
import { isValidName } from '@/common';
import { useSort } from '@/hooks';
import { apiAccessObjectObj } from '@/apis/modules/access-object';
import { IpostFindAccessSourceObjectPageSpace } from '@/apis/modules/access-object/model';
import addAccessObject from './add-access-object.vue';
import detailAccessObject from './detail-access-object.vue';

const props = defineProps({
  accessType: {
    type: String,
    default: '',
  },
  accessSourceId: {
    type: String,
    default: '',
  },
  accessSourceName: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['updated']);

const cols = ref([
  { title: '', align: 'center', width: 'fit-content', slotName: 'tableIndex' },
  { title: '接入对象名称', prop: 'objectName', slotName: 'objectName', minWidth: '12em', showTooltip: true, tooltipProps: { maxWidth: '240px' }, fixed: true },
  { title: '接入源名称', prop: 'accessSourceName', minWidth: '12em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '连接地址', prop: 'linkUrl', minWidth: '10em', showTooltip: true, tooltipProps: { maxWidth: '240px' } },
  { title: '连接参数',
    prop: 'linkParam',
    minWidth: '160px',
    showTooltip: true,
    tooltipProps: { maxWidth: '340px' } },
  { title: '接入类型',
    prop: 'accessSourceTypeName',
    minWidth: '120px',
    showTooltip: true,
    tooltipProps: { maxWidth: '240px' } },
  { title: '更新时间', prop: 'updatedAt', sortable: true, minWidth: '200px' },
  { title: '描述',
    prop: 'accessSourceObjectDesc',
    minWidth: '160px',
    showTooltip: true,
    tooltipProps: { maxWidth: '340px' } },
  { title: '操作', slotName: 'actions', align: 'left', fixed: 'right', width: '120px' },
]);
const searchItems = reactive([
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '接入对象名称',
    placeholder: '接入对象名称',
    value: '',
    name: 'objectName',
  },
]);

const tableData = ref<IpostFindAccessSourceObjectPageSpace.List[]>([]);
const tableRef = ref<InstanceType<typeof FxPageTable>>();

const formRef = ref();
const dialogVisible = ref(false);
const detailDialogVisible = ref(false);
const formData = reactive<Indexable<string>>({
  accessSourceObjectId: '',
  accessSourceId: '',
  objectName: '',
  linkUrl: '',
  linkParam: '',
  accessSourceObjectDesc: '',
});

const { sortQuery, sortChange } = useSort(tableRef, cols);

const handleClose = (data: any) => {
  if (data) {
    tableRef.value?.refresh();
  }
  dialogVisible.value = false;
};

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
  if (sortQuery.value) {
    searchParams.orderColumnStr = sortQuery.value.prop;
    searchParams.orderStr = sortQuery.value.sort;
  }
  if (props.accessType) {
    searchParams.accessSourceType = props.accessType;
  }
  if (props.accessSourceId) {
    searchParams.accessSourceId = props.accessSourceId;
  }
  const result = await apiAccessObjectObj.postFindAccessSourceObjectPage(
    searchParams
  );
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};

const resetFormData = () => {
  Object.keys(formData).forEach(key => {
    formData[key] = '';
  });
};

const add = () => {
  resetFormData();
  dialogVisible.value = true;
};

const getAccessObjectDetail = async (accessSourceObjectId: string | number) => {
  const { data } = await apiAccessObjectObj.getGetAccessSourceObjectDetail(accessSourceObjectId);
  Object.assign(formData, data);
};

const edit = async(row: IpostFindAccessSourceObjectPageSpace.List) => {
  await getAccessObjectDetail(row.accessSourceObjectId);
  dialogVisible.value = true;
};

const showDetail = async(row: IpostFindAccessSourceObjectPageSpace.List) => {
  await getAccessObjectDetail(row.accessSourceObjectId);
  detailDialogVisible.value = true;
};
const del = async(row: IpostFindAccessSourceObjectPageSpace.List) => {
  await HlMessageBox.confirm(
    `您确认删除[${row.accessSourceName}]吗?`,
    '删除提示',
    {
      confirmButtonText: '确定',
      confirmButtonType: 'danger',
      cancelButtonText: '取消',
    }
  );
  await apiAccessObjectObj.postDeleteAccessSourceObject(
    row.accessSourceObjectId
  );
  HlMessage.success('删除成功');
  refreshTable();
  emit('updated');
};
const ok = async() => {
  await formRef.value?.validate();
  formData.accessSourceId = props.accessSourceId;
  formData.accessSourceObjectId
    ? await apiAccessObjectObj.postUpdateAccessSourceObject(formData)
    : await apiAccessObjectObj.postAddAccessSourceObject(formData);
  resetForm();
  refreshTable();
  emit('updated');
};
const resetForm = () => {
  Object.keys(formData).forEach((item: string) => {
    (formData as any)[item] = '';
  });
  dialogVisible.value = false;
};
const refreshTable = () => {
  tableRef.value?.refresh();
};

defineExpose({
  refreshTable,
});

const rules = {
  objectName: [
    { required: true, message: '接入对象名称不能为空', trigger: ['blur'] },
    { validator: isValidName, trigger: 'blur' },
  ],
  linkUrl: [{ required: true, message: '链接地址不能为空', trigger: ['blur'] }],
  linkParam: [
    { required: true, message: '连接参数不能为空', trigger: ['blur'] },
  ],
};
</script>
