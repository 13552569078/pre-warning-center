<template>
  <fx-page-table-v2
    ref="pageTableRef"
    header-class="hide"
    :cols="cols"
    :table-data="tableData"
    :table-props="{rowKey: 'typeCode'}"
    :data-fetcher="getData"
    :show-search-bar="false"
    @sort-change="sortChange"
  >
    <template #action="{ row }">
      <hl-button type="link" @click="showEdit(row)">编辑</hl-button>
      <hl-button type="link" @click="del(row)">删除</hl-button>
    </template>
    <template #toolbar-extra-after>
      <!-- <hl-button
        v-if="props.currentFacilityNode.leafNode == 1"
        type="primary"
        class="gradual-button"
        icon-position="left"
        style="--button-height: calc(var(--xs) * 6); --button-padding-x: calc(var(--xs) * 2); --form-icon-size: var(--xl);"
        @click="toggleDlgVisible(true)">
        增加设备类型
        <template #icon>
          <hl-icon>
            <svg viewBox="0 0 32 32">
              <defs>
                <linearGradient id="linearGradient-1" x1="50%" y1="0%" x2="50%" y2="99.889147%">
                  <stop stop-color="#FFFFFF" offset="0%" />
                  <stop stop-color="#BAE0FF" offset="100%" />
                </linearGradient>
              </defs>
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <rect
                  fill-opacity="0.01"
                  fill="#FFFFFF"
                  x="0"
                  y="0"
                  width="32"
                  height="32"
                />
                <path d="M26,3 L26,30 L6,30 L6,3 L26,3 Z M17.5,12 L15.5,12 L15.5,15.5 L12,15.5 L12,17.5 L15.5,17.5 L15.5,21 L17.5,21 L17.5,17.5 L21,17.5 L21,15.5 L17.5,15.5 L17.5,12 Z" fill-opacity="0.5" fill="#FFFFFF" />
                <path d="M29,9 L29,28 L3,28 L3,9 L29,9 Z M17.5,12 L15.5,12 L15.5,15.5 L12,15.5 L12,17.5 L15.5,17.5 L15.5,21 L17.5,21 L17.5,17.5 L21,17.5 L21,15.5 L17.5,15.5 L17.5,12 Z" fill-opacity="0.3" fill="#FFFFFF" />
                <path d="M27,2 L27,30 L5,30 L5,11.991862 L13.0142796,2 L27,2 Z M17.5,12 L15.5,12 L15.5,15.5 L12,15.5 L12,17.5 L15.5,17.5 L15.5,21 L17.5,21 L17.5,17.5 L21,17.5 L21,15.5 L17.5,15.5 L17.5,12 Z" fill="url(#linearGradient-1)" />
              </g>
            </svg>
          </hl-icon>
        </template>
      </hl-button> -->
    </template>
  </fx-page-table-v2>
  <equipment-type-dlg
    v-if="equipmentDlgVisible"
    :id="currentEditCode"
    :current-facility="props.currentFacilityNode"
    @ok="handleOk"
    @cancel="toggleDlgVisible(false)"/>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue';
import { DataFetcherParams, FxPageTable } from 'fx-front-framework';
import { useSort } from '@/hooks';
import { apiEquipmentTypeObj as api } from '@/apis/modules/equipment-type';
import equipmentTypeDlg from './equipment-type-dlg.vue';
import { HlMessageBox } from 'hongluan-ui';

import type { IgetListpageSpace } from '@/apis/modules/equipment-type/model';

const props = defineProps({
  currentFacilityNode: {
    type: Object,
    default: () => { return {}; }
  }
});
defineEmits(['edit', 'delete']);

const cols = ref([
  { title: '', align: 'center', width: 'fit-content', slotName: 'tableIndex' },
  { title: '设备类型编号', prop: 'typeCode', sortable: true },
  { title: '设备类型名称', prop: 'typeName' },
  { title: '设施类型', prop: 'facilityTypeName' },
  { title: '更新时间', prop: 'updatedAt', sortable: true, minWidth: '200px' },
  // { title: '操作', prop: 'action', slotName: 'action', minWidth: '4em' }
]);

const tableData = ref<IgetListpageSpace.List[]>([]);
const pageTableRef = ref<InstanceType<typeof FxPageTable>>();
const equipmentDlgVisible = ref(false);
const currentEditCode = ref();

const { sortQuery, sortChange } = useSort(pageTableRef, cols);

const getData = async({ pageSize, currentPage, setTotal }: DataFetcherParams) => {
  if (!props.currentFacilityNode.typeCode) return;
  const params: IgetListpageSpace.RequestParams = {
    pageSize,
    currentPage,
    facilityTypeCode: props.currentFacilityNode.typeCode
  };
  if (sortQuery.value) {
    params.orderColumnStr = sortQuery.value.prop;
    params.orderStr = sortQuery.value.sort;
  }
  const result = await api.getListpage(params);
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};

const queryData = (isReset = true) => {
  if (isReset) {
    pageTableRef.value?.reset();
  } else {
    pageTableRef.value?.refresh();
  }
};

const toggleDlgVisible = (booleanData: boolean) => {
  equipmentDlgVisible.value = booleanData;
  if (booleanData === false) {
    currentEditCode.value = '';
  }
};

const handleOk = () => {
  pageTableRef.value?.refresh();
  toggleDlgVisible(false);
};

const showEdit = (equipment: IgetListpageSpace.List) => {
  currentEditCode.value = equipment.typeCode;
  toggleDlgVisible(true);
};

const del = async(equipment: IgetListpageSpace.List) => {
  await HlMessageBox.confirm(`您确认删除[${equipment.typeName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
  });
  await api.delete(equipment.typeCode);
  queryData(false);
};

defineExpose({
  queryData
});

</script>
<style lang="scss" scoped>
.table-panel {
  width: calc(100vw - var(--layout-aside-width) - 2 * var(--xl) - var(--lg) - 10 * var(--xl));
}
</style>

<style lang="scss">
:deep(.fx-page-table-v2[header-class="hide"]) {
  background-color: red;
  .panel-header {
    display: none;
  }
}
</style>
