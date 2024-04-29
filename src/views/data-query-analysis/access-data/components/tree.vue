<template>
  <hl-panel borderless class="auto-height w-full">
    <hl-group full dir="vertical">
      <hl-group dir="vertical">
        <hl-input v-model="filterText" placeholder="输入监测主体关键字" block fill  maxlength="20">
          <template #suffix>
            <hl-icon><two-search /></hl-icon>
          </template>
        </hl-input>
        <hl-scrollbar height="calc(var(--lg) * 37)">
          <hl-tree
            ref="tree"
            class="filter-tree m-t-md"
            node-key="uniqueId"
            :data="monitorPointTree"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
            :highlight-current="true">
            <template #default="{ node, data }">
              <hl-group full gap="var(--xs)" align="items-between">
                <hb-text-overflow method="length" :length="14" effect="light">
                  <span :class="activeUniqueId === data.uniqueId ? 'text-primary' : null">{{ node.label }}</span>
                </hb-text-overflow>
              </hl-group>
            </template>
          </hl-tree>
        </hl-scrollbar>
      </hl-group>
    </hl-group>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue';
import { useAccessData } from '@/hooks';
import { IgetListMonitorEventTreesSpace } from '@/apis/modules/access-data/model';

const { monitorPointTree, getMonitorDataTree } = useAccessData();

const emit = defineEmits(['upActiveId', 'upUniqueId', 'update:EventNode']);
// 筛选树
const filterText = ref('');
const tree = ref();

const defaultProps = ref({
  children: 'children',
  label: 'name'
});
const activeId = ref();
const activeUniqueId = ref();

const filterNode = (value: string, treeData: IgetListMonitorEventTreesSpace.Data) => {
  if (!value) return true;
  return treeData.name.indexOf(value) !== -1;
};

watch(filterText, val => {
  tree.value.filter(val);
});

const findFirstLeaf = (treeData: IgetListMonitorEventTreesSpace.Data[], isFirstCall?: boolean): IgetListMonitorEventTreesSpace.Data => {
  if (isFirstCall) {
    emit('update:EventNode', treeData[0]);
  }
  if (treeData[0].children.length === 0) {
    return treeData[0];
  } else {
    return findFirstLeaf(treeData[0].children, false);
  }
};

const isLeaf = (node: IgetListMonitorEventTreesSpace.Data) => {
  return node.children.length === 0;
};

const updateActivedId = (id: string, uniqueId: string) => {
  activeId.value = id;
  activeUniqueId.value = uniqueId;
  emit('upActiveId', activeId.value);
  emit('upUniqueId', uniqueId);
};

const updateEventNode = (eventNode: IgetListMonitorEventTreesSpace.Data) => {
  emit('update:EventNode', eventNode);
};

watch(() => monitorPointTree.value, treeData => {
  if (treeData.length) {
    const leaf = findFirstLeaf(treeData, true);
    nextTick(() => {
      tree.value.setCurrentKey(leaf.uniqueId);
      updateActivedId(leaf.id, leaf.uniqueId as string);
    });
  }
});

const handleNodeClick = (data: IgetListMonitorEventTreesSpace.Data, node: any) => {
  if (isLeaf(data)) {
    updateActivedId(data.id, data.uniqueId as string);
    updateEventNode(node.parent.parent.data);
  }
};

getMonitorDataTree();
</script>
