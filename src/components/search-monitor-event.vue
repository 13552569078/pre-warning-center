<template>
  <hl-selector
    class="w-full"
    ref="selector1"
    popper-class="monitor-tree-select"
    filterable
    clearable
    block
    @input="handleTreeInput"
    @clear="emit('areaChanged', [])"
    @resize="resize"
    placeholder="请选择监测点"
  >
    <hl-tree
      ref="hlTreeSingle"
      :style="treeStyle"
      node-key="value"
      :data="monitorPointTreeSingle"
      :filter-node-method="filterNode"
      class="p-md"
      @node-click="clickTree"
      :props="defaultProps"
    >
      <template #default="{ node, data }">
        <span
          class="text-ellipsis w-full"
          :style="data.treeType === 'MONITOR_UNIT' ? '' : 'color: var(--text-secondary);'">{{ node.label }}</span>
      </template>
    </hl-tree>
  </hl-selector>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useAccessData } from '@/hooks';
import { findNode as findNodeInTree } from '@/common/utils';
const { monitorPointTreeSingle, getMonitorPointTreeAndFormat } = useAccessData();

interface ItreeNode {
  label: string;
  children: any[];
  value: string;
  treeType: string;
  treeValue: string;
  facilityTypeCode: string;
  unitId?: string;
}

const props = defineProps({
  deep: {
    type: Boolean,
    default: true,
  },
  modelValue: String,
  isEmitCode: {
    type: Boolean,
    default: false
  }
});
watch(
  () => props.modelValue,
  (n, o) => {
    if (n) {
      if (n) {
        setValueByCode();
      }
    } else {
      reset();
    }
  }
);
const defaultProps = {
  children: 'children',
  label: 'label',
};

const emit = defineEmits(['pointChanged', 'update:modelValue', 'clearPoint']);
const selector1 = ref();
const hlTreeSingle = ref();
const treeStyle = ref({
  width: '100%',
});
const clickTree = (data: ItreeNode, node: any) => {
  // 表单内使用，仅能选择最后一级
  if ((!data.unitId && props.isEmitCode)) return false;
  selector1.value.setValue(data.label);
  selector1.value.togglePopperVisible(false);
  hlTreeSingle.value.filter('');
  emit('pointChanged', {
    treeType: data.treeType,
    treeValue: data.value,
    treeName: data.label,
    parent: node.parent,
    treeFacilityTypeCode: data.facilityTypeCode
  });
  // emit('update:modelValue', data.label);
  if (!props.isEmitCode) {
    emit('update:modelValue', data.label);
  } else {
    emit('update:modelValue', data.value);
  }
};
const reset = () => {
  selector1.value.setValue('');
  selector1.value.togglePopperVisible(false);
  hlTreeSingle.value.filter('');
  emit('clearPoint');
};
const findNode = (typeCode: string, tree: any[]): ItreeNode | undefined => {
  let node = tree && tree.find(item => item.value === typeCode);
  if (node) {
    return node;
  } else {
    if (tree && tree.length) {
      for (let i = 0; i < tree.length; i++) {
        node = findNode(typeCode, tree[i].children);
        if (node) break;
      }
    }
  }
  return node;
};

const filterNode = (value: string, data: ItreeNode) => {
  if (!value) return true;
  return data.label.indexOf(value) !== -1;
};
const handleTreeInput = (val: string) => {
  hlTreeSingle.value.filter(val);
};
const resize = (data: { offsetWidth: number }) => {
  treeStyle.value.width = data.offsetWidth + 'px';
};

const setRisk = (name: string) => {
  selector1.value.setValue(name);
};

const getPointDataByPointName = (name: string) => {
  const node = findNodeInTree(name, 'label', monitorPointTreeSingle.value);
  if (node) {
    return {
      treeType: node.treeType,
      treeValue: node.value,
      treeName: node.label,
      treeFacilityTypeCode: node.facilityTypeCode
    };
  }
  return '';
};

const setValueByCode = () => {
  const currentNode = findNode(props.modelValue as string, monitorPointTreeSingle.value);
  if (currentNode) {
    selector1.value.setValue(currentNode.label);
  }
};

onMounted(async() => {
  await getMonitorPointTreeAndFormat(); setValueByCode;
  props.modelValue && setValueByCode();
});

defineExpose({
  setRisk,
  getPointDataByPointName
});
</script>
<style lang="scss" scoped>
.monitor-tree-select {
  .hl-tree {
    max-height: 40vh;
    overflow-y: scroll;
  }
}
</style>
