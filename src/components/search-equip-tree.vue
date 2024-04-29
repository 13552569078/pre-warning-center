<template>
      <!-- popper-class="limit-height" -->
  <hl-selector
    class="w-full"
    ref="selector1"
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
      node-key="typeCode"
      :data="orgTreeData"
      :filter-node-method="filterNode"
      class="p-md"
      @node-click="clickTree"
      :props="defaultProps"
    >
      <template #default="{ node, data }">
        <span
          class="text-ellipsis w-full"
          :style="data.typeCode === IS_IOT_EQUIP || data.typeCode === IS_VIDEO_EQUIP ? 'color: var(--text-secondary);' : ''">{{ node.label }}</span>
      </template>
    </hl-tree>
  </hl-scrollbar>
  </hl-selector>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { apiEquipmentTypeObj } from '@/apis/modules/equipment-type-new/index';
import { IgetTreeSpace } from '@/apis/modules/equipment-type-new/model';
import { IS_IOT_EQUIP, IS_VIDEO_EQUIP } from '@/common';

interface ItreeNode {
  typeName: string;
  typeId: string;
  typeCode: string;
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
      const currentNode = findNode(props.modelValue as string, orgTreeData.value);
      if (currentNode) {
        selector1.value.setValue(currentNode.typeName);
      }
    } else {
      selector1.value.setValue('');
    }
  },
  {
    deep: true,
  });
const defaultProps = {
  children: 'children',
  label: 'typeName'
};

const emit = defineEmits(['orgChanged', 'update:modelValue', 'clearOrg']);
const orgTreeData = ref<IgetTreeSpace.Data[]>([]);
const selector1 = ref();
const hlTreeSingle = ref();
const treeStyle = ref({
  width: '',
});
const clickTree = (data: ItreeNode) => {
  if (data.typeCode === IS_VIDEO_EQUIP || data.typeCode === IS_IOT_EQUIP) return;
  if ((data.children && data.children.length !== 0 && props.isEmitCode) || data.type === 0) { return false; }
  selector1.value.setValue(data.typeName);
  selector1.value.togglePopperVisible(false);
  hlTreeSingle.value.filter('');
  emit('orgChanged', data);
  console.log(data);
  // if (!props.isEmitCode) {
  //   emit('update:modelValue', data.typeName);
  // } else {
  //   emit('update:modelValue', data.typeCode);
  // }
  emit('update:modelValue', data.typeCode);
};
const reset = () => {
  emit('update:modelValue', '');
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
    let node = tree.find(item => item.typeCode === code);
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
  return data.typeName.indexOf(value) !== -1;
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

// 查询设备类型tree并格式化数据
const getOrgTree = async() => {
  const result = await apiEquipmentTypeObj.getTree();
  if (+result.code === 0) {
    orgTreeData.value = result.data;
  }
};

onMounted(async() => {
  await getOrgTree();
  if (props.modelValue) {
    const currentNode = findNode(props.modelValue, orgTreeData.value);
    if (currentNode) {
      selector1.value.setValue(currentNode.typeName);
    }
  }
});

defineExpose({
  setOrg,
});
</script>
