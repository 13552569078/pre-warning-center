<template>
  <template v-if="!isChecking">
    <hl-group v-if="hasRecords" full class="h-full" gap="var(--lg)">
      <event-type-tree
        ref="leftTree"
        @add-next-level="addNextLevel"
        @add-same-level="addSameLevel"
        @edit="edit"
        @del="del"
        @click="loadTableData"
      />
      <event-type-table ref="rightTable" />
    </hl-group>
    <empty-scene v-else @add="addEventType({ level: 1 })"/>
  </template>
  <event-type-dlg
    v-if="eventTypeDlgVisble"
    :id="editingId"
    :has-parent="hasParent"
    :parent="parentData"
    :is-leaf-node="isLeafNode"
    @cancel="eventTypeDlgVisble=false"
    @ok="addEventTypeOK"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { HlMessageBox } from 'hongluan-ui';
import { AnyFunction } from 'fx-front-utils';
import { ROOT_TREE_LEVEL } from '@/common';
import { apiEventTypeObj } from '@/apis/modules/event-type';
import { EventTypeTree, EventTypeTable } from './components';
import EmptyScene from './empty-scene.vue';
import EventTypeDlg from './event-type-dlg.vue';
import type { IgetListEventTreeVOsEventTypeSpace } from '@/apis/modules/event-type/model';

const hasRecords = ref(false);
const isChecking = ref(true);

const editingId = ref();
const hasParent = ref(false);
const isLeafNode = ref(false);
const parentData = ref<any | undefined>(undefined);
const eventTypeDlgVisble = ref(false);
const currentSystemCode = ref('');

const leftTree = ref();
const rightTable = ref();

let treeOperCallback: AnyFunction<void>;

const setDlgParams = (node: EventTypeItem, isNextLevel = false) => {
  parentData.value = isNextLevel ? node.data : (node.level > ROOT_TREE_LEVEL + 1 ? node.parent.data : undefined);
  hasParent.value = isNextLevel ? true : (node.level > ROOT_TREE_LEVEL + 1);

  isLeafNode.value = !!node.data.leafNode;
};

const addEventType = (node: EventTypeItem, isNextLevel = false) => {
  setDlgParams(node, isNextLevel);
  editingId.value = null;
  eventTypeDlgVisble.value = true;
};
const addSameLevel = (item: EventTypeItem) => {
  addEventType(item);
  treeOperCallback = item.treeOperCallback;
};
const addNextLevel = (item: EventTypeItem) => {
  addEventType(item, true);
  treeOperCallback = item.treeOperCallback;
};

const addEventTypeOK = (data: IgetListEventTreeVOsEventTypeSpace.Data) => {
  hasRecords.value = true;
  eventTypeDlgVisble.value = false;

  treeOperCallback && treeOperCallback(data); // 回调树处理数据
  rightTable.value.queryBySystemCode(currentSystemCode.value, false);
};

const edit = (item: EventTypeItem) => {
  setDlgParams(item);
  editingId.value = item.data.systemCode;
  eventTypeDlgVisble.value = true;
  treeOperCallback = item.treeOperCallback;
};
const del = async(item: EventTypeItem) => {
  await HlMessageBox.confirm(`您确认删除[${item.data.eventTypeName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
  });
  await apiEventTypeObj.postRemoveEventTypeEventType(item.data.systemCode);
  item.treeOperCallback(); // 回调树处理数据
  rightTable.value.queryBySystemCode();
};

const loadTableData = (node: EventTypeItem) => {
  currentSystemCode.value = node.data.systemCode;
  rightTable.value.queryBySystemCode(node.data.systemCode);
};

onMounted(async() => {
  const result = await apiEventTypeObj.getListEventTypeVOPageEventType('');
  hasRecords.value = result.data.totalRow > 0;
  isChecking.value = false;
});

type EventTypeNode = {
  id: number
  level: number;
}
type EventTypeItem = EventTypeNode & {
  data: IgetListEventTreeVOsEventTypeSpace.Data;
  node: EventTypeNode
  parent: EventTypeNode & { data: IgetListEventTreeVOsEventTypeSpace.Data };
  treeOperCallback: AnyFunction<void>
}
</script>
