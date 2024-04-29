<template>
  <hl-selector ref="selector1" filterable clearable block @input="handleTreeInput" @clear="handleClear" @resize="resize" placeholder="请选择监测指标" :disabled="disabled">
    <hl-scrollbar max-height="350px">
      <hl-tree ref="hlTreeSingle" :style="treeStyle" node-key="id" :data="targetData" :filter-node-method="filterNode" class="p-md" @node-click="clickTree" :props="defaultProps" />
    </hl-scrollbar>
  </hl-selector>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { HlMessage } from 'hongluan-ui';
import { apiTargetTypeControllerObj } from '@/apis/modules/target-type-controller';
import { IgetListTargetTreeSpace } from '@/apis/modules/target-type-controller/model';

const emit = defineEmits(['targetChanged', 'update:modelValue']);

const props = defineProps({
  modelValue: String,
  disabled: Boolean
});

watch(
  () => props.modelValue,
  n => {
    if (n) {
      const currentNode = findNode(n as string, targetData.value);
      if (currentNode) {
        selector1.value.setValue(currentNode.targetTypeName);
      }
    }
  },
  {
    deep: true
  }
);

const targetData = ref<IgetListTargetTreeSpace.Data[]>([]);
const defaultProps = {
  children: 'children',
  label: 'targetTypeName'
};

const selector1 = ref();
const hlTreeSingle = ref();
const treeStyle = ref({
  width: ''
});

const clickTree = (data: IgetListTargetTreeSpace.Data) => {
  if (!data.type) {
    HlMessage({
      message: '仅可选择叶子结点!'
    });
    return;
  }
  selector1.value.setValue(data.targetTypeName);
  selector1.value.togglePopperVisible(false);
  hlTreeSingle.value.filter('');
  emit('update:modelValue', data.id);
  emit('targetChanged', data);
};
const clearValue = () => {
  selector1.value.setValue('');
  handleClear();
};
const handleClear = () => {
  emit('targetChanged', {});
  emit('update:modelValue', '');
};
const filterNode = (value: string, data: IgetListTargetTreeSpace.Data) => {
  if (!value) return true;
  return data.targetTypeName.indexOf(value) !== -1;
};
const handleTreeInput = (val: string) => {
  hlTreeSingle.value.filter(val);
};
const resize = (data: { offsetWidth: number }) => {
  treeStyle.value.width = data.offsetWidth + 'px';
};
const setTarget = (name: string) => {
  selector1.value.setValue(name);
};

const getData = async () => {
  // 仅仅查询开关型
  const { data } = await apiTargetTypeControllerObj.getListTargetTree({ dataType: ['switch'] });
  targetData.value = data;
};
const findNode = (id: string, tree: any[]) => {
  if (!tree) return;
  let node = tree.find(item => item.id === id);
  if (node) {
    return node;
  } else {
    for (let i = 0; i < tree.length; i++) {
      node = findNode(id, tree[i].children);
      if (node) break;
    }
  }
  return node;
};

onMounted(async () => {
  await getData();
  if (props.modelValue) {
    const currentNode = findNode(props.modelValue, targetData.value);
    if (currentNode) {
      selector1.value.setValue(currentNode.targetTypeName);
    }
  }
});

defineExpose({
  clearValue
});
</script>
