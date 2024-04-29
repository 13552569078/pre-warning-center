<template>
  <left-right-layout v-if="!isChecking">
    <template #left>
      <event-type-tree ref="leftTree" @add-next-level="addNextLevel" @add-same-level="addSameLevel" @edit="edit" @del="del" @click="loadTableData" />
    </template>
    <template #right>
      <hl-group v-if="hasRecords" full class="h-full" gap="var(--lg)">
        <event-type-table ref="rightTable" @config="configStrategy" @del="del" @edit="edit" />
      </hl-group>
      <empty-scene v-else @add="addEventType({ node: null, isNextLevel: false })" />
    </template>
  </left-right-layout>

  <!-- 新增编辑弹框 -->
  <event-type-dlg v-if="eventTypeDlgVisble" :id="editingId" :has-parent="hasParent" :parent="parentData" :is-leaf-node="isLeafNode" @cancel="eventTypeDlgVisble = false" @ok="addEventTypeOK" />
  <!-- 警后策略配置 -->
  <config-dlg v-if="dlgVisible" :id="editingId" @ok="ok" @cancel="dlgVisible = false" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { HlMessageBox, HlMessage } from 'hongluan-ui';
import { AnyFunction } from 'fx-front-utils';
import { ROOT_TREE_LEVEL, TOP_TREE_LEVEL } from '@/common';
import { apiEventTypeObj } from '@/apis/modules/event-type';
import { LeftRightLayout } from '@/components';
import ConfigDlg from '@/views/monitoring-config/strategy-rule/config-dlg.vue';
import type { IgetListEventTreeVOsEventTypeSpace } from '@/apis/modules/event-type/model';
import { IgetListEventTypeVOPageEventTypeSpace } from '@/apis/modules/event-type/model';
import { EventTypeItem } from './types';
import { EventTypeTree, EventTypeTable } from './components';
import EmptyScene from './empty-scene.vue';
import EventTypeDlg from './event-type-dlg.vue';

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

const dlgVisible = ref(false);

let treeOperCallback: AnyFunction<void>;

const setDlgParams = (node: EventTypeItem, isNextLevel = false) => {
  parentData.value = isNextLevel ? node.data : node.level > ROOT_TREE_LEVEL + 1 ? node.parent.data : undefined;
  hasParent.value = isNextLevel ? true : node.level > ROOT_TREE_LEVEL + 1;

  isLeafNode.value = node?.data && !!node.data.leafNode;
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
  if (!treeOperCallback) {
    leftTree.value.getData();
  }
  rightTable.value.queryBySystemCode(currentSystemCode.value, false);
};

const edit = (item: EventTypeItem) => {
  setDlgParams(item);
  editingId.value = item.data.systemCode;
  eventTypeDlgVisble.value = true;
  treeOperCallback = item.treeOperCallback;
};
const del = async (item: EventTypeItem) => {
  const { data: hasChild } = await apiEventTypeObj.postCheckEventTypeHaveChildren(item.data.systemCode);
  if (hasChild) {
    HlMessage.warning('有子节点，不允许删除');
    return;
  }
  await HlMessageBox.confirm(`您确认删除[${item.data.eventTypeName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消'
  });
  await apiEventTypeObj.postRemoveEventTypeEventType(item.data.systemCode);
  HlMessage.success('删除成功');
  item.treeOperCallback(); // 回调处理数据 用于列表及树的刷新
  // rightTable.value.queryBySystemCode();
  // 列表删除叶子节点 刷新列表
  // rightTable.value.queryBySystemCode(item.data.parentFullSystemCode);
};

const loadTableData = (node: EventTypeItem) => {
  currentSystemCode.value = node.data.systemCode;
  rightTable.value.queryBySystemCode(node.data.systemCode);
};

// 配置警后策略
const configStrategy = (row: IgetListEventTypeVOPageEventTypeSpace.List) => {
  editingId.value = row.systemCode;
  dlgVisible.value = true;
};
const ok = () => {
  dlgVisible.value = false;
  rightTable.value.queryBySystemCode(currentSystemCode.value);
};

onMounted(async () => {
  const result = await apiEventTypeObj.getListEventTypeVOPageEventType('');
  hasRecords.value = result.data.totalRow > 0;
  isChecking.value = false;
});
</script>
