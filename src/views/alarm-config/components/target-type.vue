<template>
  <hl-selector class="w-xxl" ref="selector1" filterable clearable block @input="handleTreeInput"
    @resize="resize" :placeholder="`请选择监测指标`" @clear="$emit('targetChanged','')">
    <hl-scrollbar max-height="350px">
      <hl-tree ref="hlTreeSingle" :style="treeStyle" node-key="value" :data="monitorPointTreeSingle"
        :filter-node-method="filterNode" class="p-md" @node-click="clickTree" :props="defaultProps" />
    </hl-scrollbar>
  </hl-selector>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { Indexable } from 'fx-front-utils';
import { HlMessage } from 'hongluan-ui';
import { apiYgfWarningConfigObj } from '@/apis/modules/alarm-config';
import { IgetListTargetTreeSpace } from '@/apis/modules/alarm-config/model';

interface ItreeNode {
  label: string;
  value: string;
  children: Indexable<string>[];
  treeType: string;
  targetTypeName: string;
  id: string;
  type: number;
}

const emit = defineEmits(['targetChanged', 'update:modelValue']);

const props = defineProps({
  modelValue: String
});

const defaultProps = {
  children: 'children',
  label: 'targetTypeName',
};

const selector1 = ref();
const hlTreeSingle = ref();
const treeStyle = ref({
  width: '',
});
const monitorPointTreeSingle = ref<IgetListTargetTreeSpace.Data[]>([]);

watch(
  () => props.modelValue,
  async n => {
    if (n) {
      await getMonitorPointTreeAndFormat();
      if (props.modelValue) {
        const currentNode = getObjById(props.modelValue, monitorPointTreeSingle.value);
        if (currentNode) {
          selector1.value.setValue(currentNode.targetTypeName);
        }
      }
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

const clickTree = (data: ItreeNode) => {
  if (data.type !== 1) {
    HlMessage({
      message: '仅可选择叶子结点!',
    });
    return;
  }
  selector1.value.setValue(data.targetTypeName);
  selector1.value.togglePopperVisible(false);
  hlTreeSingle.value.filter('');
  emit('update:modelValue', data.id);
  emit('targetChanged', data.id);
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
const getObjById = (value: string, tree: IgetListTargetTreeSpace.Data[]):any => {
  if (!tree) return;
  for (const i in tree) {
    const item = tree[i];
    if (item.id === value) return item;
    else {
      if (item.children) {
        const obj = getObjById(value, item.children);
        if (obj) return obj;
      }
    }
  }
};
// 查询监测点树并格式化数据
const getMonitorPointTreeAndFormat = async() => {
  const { data } = await apiYgfWarningConfigObj.getListTargetTree({});
  monitorPointTreeSingle.value = data;
};

onMounted(async() => {
  await getMonitorPointTreeAndFormat();
  if (props.modelValue) {
    const currentNode = getObjById(props.modelValue, monitorPointTreeSingle.value);
    if (currentNode) {
      selector1.value.setValue(currentNode.targetTypeName);
    }
  }
});

</script>
