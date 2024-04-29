<template>

  <left-right-layout :leftWidth="80">
    <template #left>
      <template v-if="!isChecking">
        <hl-group v-if="hasRecords" full class="h-full" gap="var(--lg)">
          <facility-type-tree
            ref="leftTree"
            @add-next-level="addNextLevel"
            @add-same-level="addSameLevel"
            @edit="edit"
            @del="del"
            @click="loadTableData"
          />
        </hl-group>
        <empty-scene v-else @add="addEventType({ level: 1 })"/>
      </template>
    </template>
    <template #right>
      <equipment-type-table ref="rightTable" :currentFacilityNode="currentFacilityNode"/>
    </template>
  </left-right-layout>
  <facility-type-dlg
    v-if="eventTypeDlgVisble"
    :id="editingId"
    :has-parent="hasParent"
    :parent="parentData"
    :is-top-level="isTopLevel"
    @cancel="eventTypeDlgVisble=false"
    @ok="addEventTypeOK"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue';
import { HlMessageBox } from 'hongluan-ui';
import { AnyFunction } from 'fx-front-utils';
import { ROOT_TREE_LEVEL, TOP_TREE_LEVEL } from '@/common';
import { LeftRightLayout } from '@/components';
import { apiEventTypeObj } from '@/apis/modules/event-type';
import { FacilityTypeTree, EquipmentTypeTable } from './components';
import EmptyScene from './empty-scene.vue';
import FacilityTypeDlg from './facility-type-dlg.vue';
import { apiFacilityTypeObj as api } from '@/apis/modules/facility-type';

import type { IgetFacilityTreeSpace } from '@/apis/modules/facility-type/model';

const hasRecords = ref(false);
const isChecking = ref(true);

const editingId = ref();
const hasParent = ref(false);
const isTopLevel = ref(false);
const parentData = ref<any | undefined>(undefined);
const eventTypeDlgVisble = ref(false);
const currentFacilityCode = ref('');
const currentFacilityNode = ref<IgetFacilityTreeSpace.Data>();

const leftTree = ref();
const rightTable = ref();

let treeOperCallback: AnyFunction<void>;

const setDlgParams = (node: FacilityTypeItem, isNextLevel = false) => {
  parentData.value = isNextLevel ? node.data : (node.level > ROOT_TREE_LEVEL + 1 ? node.parent.data : undefined);
  hasParent.value = isNextLevel ? true : (node.level > ROOT_TREE_LEVEL + 1);

  isTopLevel.value = (isNextLevel ? node.level + 1 : node.level) <= TOP_TREE_LEVEL;
};

const addEventType = (node: FacilityTypeItem, isNextLevel = false) => {
  setDlgParams(node, isNextLevel);
  editingId.value = null;
  eventTypeDlgVisble.value = true;
};
const addSameLevel = (item: FacilityTypeItem) => {
  addEventType(item);
  treeOperCallback = item.treeOperCallback;
};
const addNextLevel = (item: FacilityTypeItem) => {
  addEventType(item, true);
  treeOperCallback = item.treeOperCallback;
};

const addEventTypeOK = (data: IgetFacilityTreeSpace.Data) => {
  hasRecords.value = true;
  eventTypeDlgVisble.value = false;

  treeOperCallback && treeOperCallback(data); // 回调树处理数据
  rightTable.value.queryBySystemCode(currentFacilityCode.value, false);
};

const edit = (item: FacilityTypeItem) => {
  setDlgParams(item);
  editingId.value = item.data.typeCode;
  eventTypeDlgVisble.value = true;
  treeOperCallback = item.treeOperCallback;
};
const del = async(item: FacilityTypeItem) => {
  await HlMessageBox.confirm(`您确认删除[${item.data.typeName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
  });
  await api.delete(item.data.typeCode);
  item.treeOperCallback(); // 回调树处理数据
  rightTable.value.queryBySystemCode();
};

const loadTableData = (node: FacilityTypeItem) => {
  currentFacilityNode.value = node.data;
  currentFacilityCode.value = node.data.typeCode;
  nextTick(() => {
    rightTable.value.queryData(true);
  });
};

onMounted(async() => {
  const result = await apiEventTypeObj.getListEventTypeVOPageEventType('');
  hasRecords.value = result.data.totalRow > 0;
  isChecking.value = false;
});

type FacilityTypeNode = {
  id: number
  level: number;
}
type FacilityTypeItem = FacilityTypeNode & {
  data: IgetFacilityTreeSpace.Data;
  node: FacilityTypeNode
  parent: FacilityTypeNode & { data: IgetFacilityTreeSpace.Data };
  treeOperCallback: AnyFunction<void>
}
</script>
