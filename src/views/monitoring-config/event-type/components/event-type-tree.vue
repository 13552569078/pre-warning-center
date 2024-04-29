<template show-source>
  <hl-panel class="h-full w-full" borderless inner-scroll full-body>
    <template #header>
      <hl-input v-model="searchText" placeholder="输入风险分类关键字" block fill maxlength="20">
        <template #suffix>
          <two-search />
        </template>
      </hl-input>
    </template>
    <hl-scrollbar class="no-padding-top-bottom">
      <hl-tree ref="eventTypeTreeRef" :data="eventTypeData" :props="defaultProps" :default-expanded-keys="defaultExpandedKeys" node-key="systemCode" gap="0" :expand-on-click-node="false" :highlight-current="true" :filter-node-method="filterNode" @node-click="handleNodeClick">
        <template #default="{ node, data }">
          <hl-group full gap="var(--xs)" align="items-between items-middle" :class="['event-type-label', isHovering(node.id) ? 'is-hovering' : '']" @mouseenter="enterTreeNode(node.id)" @mouseleave="leaveTreeNode(node.id)">
            <hl-group class="tree-node-label ellipsis static items-middle" :style="`width:${node.level <= 1 ? '160' : '120'}px`">
              <hb-text-overflow method="length" :length="14" effect="light" class="tree-start">
                <span>{{ getTreeNodeLabel(data, node) }}</span>
              </hb-text-overflow>
            </hl-group>
            <hl-dropdown class="static more-actions" v-if="!readonly && node.level > ROOT_TREE_LEVEL">
              <hl-icon @click.stop type="primary">
                <fill-edit />
              </hl-icon>
              <template #dropdown>
                <hl-dropdown-menu @mouseenter="enterTreeNode(node.id)" @mouseleave="leaveTreeNode(node.id)">
                  <hl-dropdown-item v-if="!data.leafNode" @click="addNextLevel(data, node)">添加下级</hl-dropdown-item>
                  <hl-dropdown-item @click="addSameLevel(data, node)">添加同级</hl-dropdown-item>
                  <hl-dropdown-item @click="edit(data, node)">编辑</hl-dropdown-item>
                  <!-- <hl-dropdown-item v-if="!node.childrens?.length && !data.isRefer" @click="del(data, node)">删除</hl-dropdown-item> -->
                  <!-- childrens为空 且 无子节点可删除 -->
                  <hl-dropdown-item v-if="!hasChild" @click="del(data, node)">删除</hl-dropdown-item>
                </hl-dropdown-menu>
              </template>
            </hl-dropdown>
          </hl-group>
        </template>
      </hl-tree>
    </hl-scrollbar>
  </hl-panel>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { HlTree } from 'hongluan-ui';
import { useI18n } from 'vue-i18n';
import { useHovering } from '@/hooks';
import { ROOT_TREE_LEVEL } from '@/common';
import { formatLabel } from '../utils';
import { eventTypeApiObj as eventTypeApi } from '@/apis/modules/event-type-api';

import type { IgetListEventTreeVOsEventTypeSpace } from '@/apis/modules/event-type/model';

defineProps({
  readonly: Boolean
});
const emit = defineEmits(['add-next-level', 'add-same-level', 'edit', 'del', 'click']);

const { t } = useI18n();

const searchText = ref('');
const eventTypeTreeRef = ref<InstanceType<typeof HlTree>>();

const eventTypeData = ref<any[]>([]);
const defaultProps = {
  children: 'childrens',
  label: 'systemCode'
};
const defaultExpandedKeys = ref(['-1']);

const { enter: enterTreeNode, leave: leaveTreeNode, isHovering } = useHovering();

const getTreeNodeLabel = (data: IgetListEventTreeVOsEventTypeSpace.Data, node: any) => {
  return formatLabel(data.fullSystemCode, data.eventTypeName);
};

const filterNode = (value: string, data: IgetListEventTreeVOsEventTypeSpace.Data) => {
  console.log('--tree--node--', value, data);
  if (!value) return true;
  return (data.systemCode.indexOf(value) !== -1 || data.eventTypeName.indexOf(value) !== -1) && data.leafNode === 0;
};

const handleNodeClick = (data: IgetListEventTreeVOsEventTypeSpace.Data, node: any) => {
  emit('click', { data, node, level: node.level, parent: node.parent });
};

const addNextLevel = (data: IgetListEventTreeVOsEventTypeSpace.Data, node: any) => {
  emit('add-next-level', {
    data,
    node,
    level: node.level,
    parent: node.parent,
    treeOperCallback: (newData: IgetListEventTreeVOsEventTypeSpace.Data) => {
      // 叶子节点添加 左侧树前端不主动添加
      if (newData.leafNode) return;
      eventTypeTreeRef.value?.append(newData, node);
      node.expand();
    }
  });
};
const addSameLevel = (data: IgetListEventTreeVOsEventTypeSpace.Data, node: any) => {
  emit('add-same-level', {
    data,
    node,
    level: node.level,
    parent: node.parent,
    treeOperCallback: (newData: IgetListEventTreeVOsEventTypeSpace.Data) => {
      // 叶子节点添加 左侧树前端不主动添加
      if (newData.leafNode) return;
      eventTypeTreeRef.value?.insertAfter(newData, node);
    }
  });
};
const edit = (data: IgetListEventTreeVOsEventTypeSpace.Data, node: any) => {
  emit('edit', {
    data,
    node,
    level: node.level,
    parent: node.parent,
    treeOperCallback: (newData: IgetListEventTreeVOsEventTypeSpace.Data) => {
      Object.assign(data, newData);
    }
  });
};
const del = (data: IgetListEventTreeVOsEventTypeSpace.Data, node: any) => {
  emit('del', {
    data,
    node,
    level: node.level,
    parent: node.parent,
    treeOperCallback: () => {
      eventTypeTreeRef.value?.remove(data);
    }
  });
};

watch(searchText, val => {
  eventTypeTreeRef.value?.filter(val);
});

const filterTreeArray = (tree: IgetListEventTreeVOsEventTypeSpace.Data[]) => {
  return tree
    .filter(item => {
      return item.leafNode === 0;
    })
    .map((item: any) => {
      // eslint-disable-next-line no-param-reassign
      item = Object.assign({}, item);
      if (item.childrens && item.childrens.length) {
        item.childrens = filterTreeArray(item.childrens);
      }
      return item;
    });
};

const getData = async () => {
  const { data } = await eventTypeApi.tree(1);
  const tree = filterTreeArray(data);
  eventTypeData.value.splice(0, eventTypeData.value.length);
  eventTypeData.value.push({
    systemCode: '-1',
    eventTypeName: `${t('warningType')}`,
    childrens: tree
  });
};

defineExpose({
  getData
});

onMounted(() => {
  getData();
});
</script>
<style lang="scss" scoped>
.event-type-label {
  .more-actions {
    visibility: hidden;
  }
  &.is-hovering {
    .more-actions {
      visibility: visible;
    }
  }
}
</style>
