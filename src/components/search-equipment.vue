<template>
  <hl-selector
    ref="selector"
    popper-class="limit-height"
    clearable
    filterable
    block
    @input="handleTreeInput"
    @clear="handleClear"
    @resize="resize"
  >
    <hl-tree
      ref="hlTreeRef"
      node-key="id"
      style="width: 300px; max-height:400px"
      :data="equipTree"
      :filter-node-method="filterNode"
      :props="defaultProps"
      @node-click="clickTree"
    >
      <template #default="{ node, data }">
        <span
          class="text-ellipsis w-full"
          :style="data.type === 0 ? 'color: var(--text-secondary);' : ''">{{ node.label }}</span>
      </template>
    </hl-tree>

  </hl-selector>
</template>
<script lang='ts' setup>
import { onMounted, ref, watch } from 'vue';

import { findNode } from '@/common/utils';
import { apiEquipmentTypeObj } from '@/apis/modules/equipment-type-new';
import { IgetEquipTreeSpace } from '@/apis/modules/equipment-type-new/model';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: String
});

const treeStyle = ref<Record<string, any>>({});
const equipTree = ref<IgetEquipTreeSpace.Data[]>([]);
const selector = ref();
const hlTreeRef = ref();

const defaultProps = {
  children: 'children',
  label: 'name',
  value: 'id'
};

const getEquipTree = async() => {
  const res = await apiEquipmentTypeObj.getEquipTree();
  equipTree.value = res.data;
};

const resize = ({ offsetWidth }: {offsetWidth: number}) => {
  treeStyle.value.width = offsetWidth + 'px';
};
const clickTree = (data: IgetEquipTreeSpace.Data) => {
  // console.log(data);
  if (data.type !== 1) return;
  selector.value.setValue(data.name);
  hlTreeRef.value.filter('');
  selector.value.togglePopperVisible(false);
  console.log(data.name, data.id);
  emit('update:modelValue', data.id);
};
const filterNode = (value: string, data: IgetEquipTreeSpace.Data) => {
  if (!value) return true;
  return (data.name.indexOf(value) !== -1) && data.type === 1;
};
const handleTreeInput = (val: string) => {
  hlTreeRef.value.filter(val);
};
const handleClear = () => {
  handleTreeInput('');
  emit('update:modelValue', '');
};

onMounted(async() => {
  await getEquipTree();
  if (props.modelValue) {
    const node = findNode(props.modelValue, 'id', equipTree.value);
    node && selector.value.setValue(node.name);
  }
});

watch(() => props.modelValue, value => {
  if (value) {
    const node = findNode(value, 'id', equipTree.value);
    node && selector.value.setValue(node.name);
  }
});

</script>
