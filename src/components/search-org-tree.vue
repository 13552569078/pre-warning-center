<template>
  <hl-selector
    class="w-full"
    ref="selector1"
    popper-class="monitor-tree-select"
    filterable
    clearable
    block
    @input="handleTreeInput"
    @clear="reset"
    @resize="resize"
    :placeholder="placeholder"
  >
  <hl-scrollbar max-height="350px">
    <hl-tree
      ref="hlTreeSingle"
      :style="treeStyle"
      node-key="id"
      :data="orgTreeData"
      :filter-node-method="filterNode"
      class="p-md"
      @node-click="clickTree"
      :props="defaultProps"
    />
  </hl-scrollbar>
  </hl-selector>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { apiSwanObj } from '@/apis/modules/hongling';
import { IgetOrgTreeSpace } from '@/apis/modules/hongling/model';

interface ItreeNode {
  parentUnitId: string,
  unitCode: string,
  unitDesc: string,
  unitId: number,
  unitLevel: number,
  unitName: string,
  unitSeq: number,
  unitShort: string,
  children: any[];
}

const props = defineProps({
  deep: {
    type: Boolean,
    default: true,
  },
  modelValue: String,
  // 表单内开启，开启后仅能选择最后一级
  isEmitCode: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
});
watch(() => props.modelValue,
  n => {
    if (n) {
      console.log(props.modelValue, orgTreeData.value, 122);
      const currentNode = findNode(props.modelValue, orgTreeData.value);
      if (currentNode) {
        selector1.value.setValue(currentNode.unitName);
      }
    }
  },
  {
    deep: true,
  });
const defaultProps = {
  children: 'children',
  label: 'unitName'
};

const emit = defineEmits(['orgChanged', 'update:modelValue', 'clearOrg']);
const orgTreeData = ref<IgetOrgTreeSpace.Data[]>([]);
const selector1 = ref();
const hlTreeSingle = ref();
const treeStyle = ref({
  width: '',
});
const clickTree = (data: ItreeNode) => {
  if (data.children && data.children.length !== 0 && props.isEmitCode) { return false; }
  selector1.value.setValue(data.unitName);
  selector1.value.togglePopperVisible(false);
  hlTreeSingle.value.filter('');
  emit('orgChanged', data);
  // if (!props.isEmitCode) {
  //   emit('update:modelValue', data.orgName);
  // } else {
  //   emit('update:modelValue', data.id);
  // }
  emit('update:modelValue', data.unitCode);
};
const reset = () => {
  emit('update:modelValue', '');
  selector1.value.setValue('');
  selector1.value.togglePopperVisible(false);
  hlTreeSingle.value.filter('');
  emit('clearOrg');
};
const findNode = (
  code: string | undefined,
  tree: ItreeNode[]
): ItreeNode | undefined => {
  let node;
  if (!code || !tree) {
    return undefined;
  }
  node = tree.find(item => item.unitCode === code);
  if (node) {
    return node;
  } else {
    if (tree.length) {
      for (let i = 0; i < tree.length; i++) {
        node = findNode(code, tree[i].children);
        if (node) break;
      }
    }
  }
  return node;
};

const filterNode = (value: string, data: ItreeNode) => {
  if (!value) return true;
  return data.unitName.indexOf(value) !== -1;
};
const handleTreeInput = (val: string) => {
  hlTreeSingle.value.filter(val);
};
const resize = (data: { offsetWidth: number }) => {
  treeStyle.value.width = data.offsetWidth + 'px';
};
const setOrg = (name: string) => {
  selector1.value.setValue(name);
};

// 查询部门tree并格式化数据
const getOrgTree = async() => {
  const result = await apiSwanObj.getOrgTree();
  if (+result.code === 0) {
    orgTreeData.value = result.data;
  }
};

onMounted(async() => {
  await getOrgTree();
  if (props.modelValue) {
    const currentNode = findNode(props.modelValue, orgTreeData.value);
    if (currentNode) {
      selector1.value.setValue(currentNode.unitName);
    }
  }
});

defineExpose({
  setOrg,
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
