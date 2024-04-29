<template>
  <hl-panel
    class="h-full w-full"
    header-style="height: clac(var(--panel-header-height) + var(--xs)); min-height: calc(var(--panel-header-height) + var(--xs));"
    borderless
    inner-scroll
    full-body>
    <template #header>
      <hl-input v-model="filterText" placeholder="输入专项关键字" block fill  maxlength="20">
        <template #suffix>
          <two-search />
        </template>
      </hl-input>
    </template>
    <hl-scrollbar class="no-padding-top-bottom" style="overflow-x: hidden; padding-bottom: var(--lg);">
      <hl-tree
        ref="tree"
        class="indicator-tree filter-tree"
        node-key="id"
        :data="sceneTree"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
        :highlight-current="true">
        <template #default="{ node, data }">
          <hl-group class="w-full" gap="var(--xs)" align="items-between items-center"  :class="['event-type-label', isHovering(node.id) ? 'is-hovering' : '']"
            @mouseenter="enterTreeNode(node.id)"
            @mouseleave="leaveTreeNode(node.id)">
            <span
              class="tree-node-label ellipsis static"
              :style="`width:${180 - node.level * 14}px`"
              :title="data.sceneName"
            >
            {{ node.label}}
            </span>
          </hl-group>
        </template>
      </hl-tree>
    </hl-scrollbar>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue';
import { useHovering } from '@/hooks';

import { apiSpecialTypeConfigObj } from '@/apis/modules/special-type-config';
import { IgetListTreeSpace } from '@/apis/modules/special-type-config/model';

const emit = defineEmits(['updateSceneCode']);
// 筛选树
const filterText = ref('');
const tree = ref();
const sceneTree = ref();

const defaultProps = ref({
  children: 'children',
  label: 'sceneName'
});

const {
  enter: enterTreeNode,
  leave: leaveTreeNode,
  isHovering,
} = useHovering();

const filterNode = (value: string, treeData: IgetListTreeSpace.Data) => {
  if (!value) return true;
  return treeData.sceneName.indexOf(value) !== -1;
};

watch(filterText, val => {
  tree.value.filter(val);
});

const getAllSceneCodes = (treeObj: any) => {
  const sceneCodes: string[] = [];
  if (treeObj.sceneCode) {
    sceneCodes.push(treeObj.sceneCode);
  }
  if (treeObj.children && treeObj.children.length) {
    treeObj.children.forEach(child => {
      sceneCodes.push(...getAllSceneCodes(child));
    });
  }
  return sceneCodes;
};

const handleNodeClick = (data: IgetListTreeSpace.Data, node: any) => {
  console.log(80, data, node);
  if (data.sceneCode === -1) {
    emit('updateSceneCode', ['-1']);
  } else {
    console.log(96, getAllSceneCodes(data));
    emit('updateSceneCode', getAllSceneCodes(data));
  }
};

const getSceneTree = async() => {
  const res = await apiSpecialTypeConfigObj.getListTree();
  const tempData = [{
    id: -999,
    sceneCode: -1,
    sceneName: '全部专项类型',
    children: res.data
  }];
  sceneTree.value = tempData;
  nextTick(() => {
    tree.value.setCurrentKey(-999);
    emit('updateSceneCode', ['-1']);
  });
};

getSceneTree();
</script>
<style lang="scss" scoped>
:deep(.scrollbar-wrap) {
  overflow-x: hidden;
}
:deep(.hl-tree) {
  overflow-x: hidden;
  .tree-node-content {
    background-color: transparent;
  }
}
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
