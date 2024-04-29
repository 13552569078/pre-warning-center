<template>
  <hl-panel
    class="h-full w-full"
    borderless
    inner-scroll
    full-body>
    <template #header>
      <hl-input v-model="filterText" placeholder="输入监测点关键字" block fill  maxlength="20">
        <template #suffix>
          <hl-icon><two-search /></hl-icon>
        </template>
      </hl-input>
    </template>
    <hl-scrollbar class="no-padding-top-bottom">
      <hl-tree
        ref="tree"
        class="filter-tree"
        node-key="value"
        :data="treeDataWithFakeRoot"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        :expand-on-click-node="false"
        :highlight-current="true">
        <template #default="{ node, data }">
          <hl-group full gap="var(--xs)" align="items-between">
            <hb-text-overflow method="length" :length="14" effect="light">
              <span :class="activeUniqueId === data.value ? 'text-primary' : null">{{ node.label }}</span>
            </hb-text-overflow>
          </hl-group>
        </template>
      </hl-tree>
    </hl-scrollbar>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue';
import { useAccessData } from '@/hooks';
import { IgetListMonitorEventTreesSpace } from '@/apis/modules/access-data/model';

const { treeDataWithFakeRoot, getMonitorPointTreeAndFormat } = useAccessData();

const emit = defineEmits(['upActiveNode']);
// 筛选树
const filterText = ref('');
const tree = ref();

const defaultProps = ref({
  children: 'children',
  label: 'label'
});
const activeUniqueId = ref('');

const filterNode = (value: string, treeData: IgetListMonitorEventTreesSpace.Data) => {
  if (!value) return true;
  console.log(treeData);
  return treeData.label?.indexOf(value) !== -1;
};

watch(filterText, val => {
  tree.value.filter(val);
});

const updateActivedId = (data: IgetListMonitorEventTreesSpace.Data) => {
  emit('upActiveNode', data);
};

const handleNodeClick = (data: IgetListMonitorEventTreesSpace.Data) => {
  console.log(data);
  updateActivedId(data);
  activeUniqueId.value = data.value!;
};

getMonitorPointTreeAndFormat();
</script>
