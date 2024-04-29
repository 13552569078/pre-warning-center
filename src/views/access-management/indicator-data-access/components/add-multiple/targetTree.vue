<template>
  <hl-panel
    class="h-full w-full"
    borderless
    inner-scroll
    body-style="padding-left:20px; padding-right: 20px;"
    full-body>
    <template #header>
      <div class="panel-title">
        <hl-input v-model="searchText" placeholder="输入指标关键字" block fill maxlength="20">
          <template #suffix>
            <two-search />
          </template>
        </hl-input>
      </div>
    </template>
    <hl-scrollbar>
      <hl-tree
        ref="treeRef"
        :data="data"
        :props="defaultProps"
        :filter-node-method="filterNode"
        :highlight-current="true"
        node-key="id"
        @node-click="handleNodeClick"
        :default-expand-all="true"
        :expand-on-click-node="false"
      >
        <template #default="{ node, data }">
          <hl-group full gap="var(--xs)" align="items-between">
            <template v-if="node.label.length>10">
              <hb-text-overflow method="length" :length="10" effect="light">
                <span :class="currentId === data.id && data.type !== ROOT && data.type !== TARGET_TYPE ? 'text-primary' : 'no-hilight'" class="overflow-text">{{ node.label.substring(0, 10) + '...' }}</span>
              </hb-text-overflow>
            </template>
            <span v-else :class="currentId === data.id && data.type !== ROOT && data.type !== TARGET_TYPE ? 'text-primary' : 'no-hilight'" class="overflow-text">{{ node.label }}</span>
          </hl-group>
        </template>
      </hl-tree>
    </hl-scrollbar>
  </hl-panel>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, watch, nextTick } from 'vue';
import { apiTargetTypeControllerObj as api } from '@/apis/modules/target-type-controller';
import { IgetListTargetTreeSpace } from '@/apis/modules/target-type-controller/model';

const data = ref();
const searchText = ref();
const treeRef = ref();
const currentId = ref();
const TARGET_TYPE = 0;
const ROOT = -1;
const TARGET = 1;

const emit = defineEmits(['click']);

const defaultProps = {
  children: 'children',
  label: 'targetTypeName',
};

const filterNode = (value: string, nodeData: IgetListTargetTreeSpace.Data) => {
  console.log(value, data);
  if (!value) return true;
  return nodeData.targetTypeName.indexOf(value) !== -1;
};

const findFirstLeaf = (treeData: IgetListTargetTreeSpace.Data[]): IgetListTargetTreeSpace.Data => {
  if (treeData[0].children.length === 0) {
    return treeData[0];
  } else {
    return findFirstLeaf(treeData[0].children);
  }
};

const handleNodeClick = (nodeData: IgetListTargetTreeSpace.Data) => {
  let key = '';
  if (nodeData.type === TARGET_TYPE) {
    key = 'targetTypeCode';
  } else {
    key = 'targetId';
  }
  treeRef.value.setCurrentKey(nodeData.id);
  console.log(nodeData.id);
  currentId.value = nodeData.id;
  emit('click', { [key]: nodeData.id });
};

watch(searchText, val => {
  treeRef.value?.filter(val);
});

watch(() => data.value, treeData => {
  if (treeData.length) {
    const leaf = findFirstLeaf(treeData);
    console.log(leaf);
    nextTick(() => {
      treeRef.value.setCurrentKey(leaf.id);
      currentId.value = leaf.id;
      handleNodeClick(leaf);
    });
  }
});

onBeforeMount(async() => {
  const res = await api.getListTargetTree({});
  const tempData = [{
    id: '',
    type: -1,
    targetTypeName: '监测指标',
    children: res.data
  }];
  data.value = tempData;
});
</script>
