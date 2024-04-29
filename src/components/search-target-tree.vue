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
import { apiTargetTypeControllerObj } from '@/apis/modules/target-type-controller';
import { IgetListTargetTreeSpace } from '@/apis/modules/target-type-controller/model';

interface ItreeNode {
  targetTypeName: string;
  id: string;
  targetId: string;
  label: string;
  children: any[];
  value: string;
  type: number;
}

const props = defineProps({
  deep: {
    type: Boolean,
    default: true,
  },
  targetFrequency: {
    type: [Number, String],
    default: 1,
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
  dataType: {
    type: String,
    default: '',
  },
});
watch(() => props.modelValue,
  n => {
    if (n) {
      const currentNode = findNode(props.modelValue, orgTreeData.value);
      if (currentNode) {
        selector1.value.setValue(currentNode.targetTypeName);
      }
    }
  },
  {
    deep: true,
  });

watch(() => props.targetFrequency, (val: number) => {
  getOrgTree();
});

const defaultProps = {
  children: 'children',
  label: 'targetTypeName'
};

const emit = defineEmits(['changed', 'update:modelValue', 'clearOrg']);
const orgTreeData = ref<IgetListTargetTreeSpace.Data[]>([]);
const selector1 = ref();
const hlTreeSingle = ref();
const treeStyle = ref({
  width: '',
});
const clickTree = (data: ItreeNode) => {
  if ((data.children && data.children.length !== 0 && props.isEmitCode) || data.type === 0) { return false; }
  selector1.value.setValue(data.targetTypeName);
  selector1.value.togglePopperVisible(false);
  hlTreeSingle.value.filter('');
  // if (!props.isEmitCode) {
  //   emit('update:modelValue', data.targetTypeName);
  // } else {
  //   emit('update:modelValue', data.id);
  // }
  emit('update:modelValue', data.id);
  emit('changed', data);
};
const reset = () => {
  emit('update:modelValue', '');
  emit('changed', '');
  selector1.value.setValue('');
  selector1.value.togglePopperVisible(false);
  hlTreeSingle.value.filter('');
  emit('clearOrg');
};
const findNode = (
  code: string,
  tree: ItreeNode[]
): ItreeNode | undefined => {
  if (tree.length) {
    let node = tree.find(item => item.id === code);
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
  }
};

const filterNode = (value: string, data: ItreeNode) => {
  if (!value) return true;
  return data.targetTypeName.indexOf(value) !== -1;
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
  const params = {
    dataType: [props.dataType]
  };
  if (props.targetFrequency !== 'none') {
    params.targetFrequency = props.targetFrequency;
  }
  const result = await apiTargetTypeControllerObj.getListTargetTree(params);

  if (+result.code === 0) {
    orgTreeData.value = result.data;
  }
};

onMounted(async() => {
  await getOrgTree();
  if (props.modelValue) {
    const currentNode = findNode(props.modelValue, orgTreeData.value);
    if (currentNode) {
      selector1.value.setValue(currentNode.targetTypeName);
    }
  }
});

defineExpose({
  setOrg,
  reset
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
