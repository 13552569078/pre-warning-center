<template>
  <hl-selector
    :class="!isInForm ? 'w-xxl' : ''"
    ref="selector1"
    popper-class="fact-tree-select"
    filterable
    clearable
    block
    :disabled="disabled"
    @input="handleTreeInput"
    @clear="handleTreeInput('')"
    @resize="resize"
    placeholder="请选择设施类型"
  >
    <hl-tree
      ref="hlTreeSingle"
      :style="treeStyle"
      node-key="typeCode"
      :data="treeData"
      :filter-node-method="filterNode"
      class="p-md"
      @node-click="clickTree"
      :props="defaultProps"
    />
  </hl-selector>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { apiFacilityTypeObj } from '@/apis/modules/facility-type';
import { IgetFacilityTreeSpace } from '@/apis/modules/facility-type/model';
import { Indexable } from 'fx-front-utils';

interface ItreeNode {
  typeName: string;
  typeCode: string;
  childrens: Indexable<any>[];
  leafNode: number;
}

watch(() => props.modelValue,
  n => {
    if (n) {
      const currentNode = findNode(n as string, treeData.value);
      if (currentNode) {
        selector1.value.setValue(currentNode.typeName);
      }
    } else {
      reset();
    }
  },
  {
    deep: true,
  });

const emit = defineEmits(['facilitiesChanged', 'update:modelValue']);
const props = defineProps({
  modelValue: String,
  disabled: Boolean,
  isInForm: {
    type: Boolean,
    default: false
  }
});
const treeData = ref<IgetFacilityTreeSpace.Data[]>([]);
// 设施类型
const defaultProps = {
  children: 'childrens',
  label: 'typeName',
};
const selector1 = ref();
const hlTreeSingle = ref();
const treeStyle = ref({
  width: '',
});
const clickTree = (data: ItreeNode) => {
  // if (data.leafNode) {
  //   selector1.value.setValue(data.typeName);
  //   selector1.value.togglePopperVisible(false);
  //   hlTreeSingle.value.filter('');
  //   emit('update:modelValue', data.typeCode);
  //   emit('facilitiesChanged', data.typeCode);
  // }
  selector1.value.setValue(data.typeName);
  selector1.value.togglePopperVisible(false);
  hlTreeSingle.value.filter('');
  emit('update:modelValue', data.typeCode);
  emit('facilitiesChanged', data.typeCode);
};
const filterNode = (value: string, data: ItreeNode) => {
  if (!value) return true;
  return data.typeName.indexOf(value) !== -1;
};
const handleTreeInput = (val: string) => {
  hlTreeSingle.value.filter(val);
};
const resize = (data: { offsetWidth: number }) => {
  treeStyle.value.width = data.offsetWidth + 'px';
};
const setFacilities = (name: string) => {
  selector1.value.setValue(name);
};
const getData = async() => {
  const { data } = await apiFacilityTypeObj.getFacilityTree('2');
  treeData.value = data;
};

const findNode = (typeCode: string, tree: IgetFacilityTreeSpace.Data[]): IgetFacilityTreeSpace.Data | undefined => {
  let node = tree.find(item => item.typeCode === typeCode);
  if (node) {
    return node;
  } else {
    if (tree.length) {
      for (let i = 0; i < tree.length; i++) {
        node = findNode(typeCode, tree[i].childrens);
        if (node) break;
      }
    }
  }
  return node;
};
const reset = () => {
  selector1.value.setValue('');
  selector1.value.togglePopperVisible(false);
  hlTreeSingle.value.filter('');
};

onMounted(async() => {
  await getData();
  if (props.modelValue) {
    const currentNode = findNode(props.modelValue, treeData.value);
    if (currentNode) {
      selector1.value.setValue(currentNode.typeName);
    }
  }
});

defineExpose({
  setFacilities,
});
</script>
<style lang="scss" scoped>
.fact-tree-select {
  .hl-tree {
    max-height: 30vh;
    overflow-y: scroll;
  }
}
</style>
