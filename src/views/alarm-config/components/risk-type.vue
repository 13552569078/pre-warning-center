<template>
  <hl-selector class="w-xxl" ref="selector1" filterable clearable block @input="handleTreeInput" @clear="handleClear"
    @resize="resize" :placeholder="`请选择${props.useFor === 1 ? `${$t('warningType')}` : '报警类型'}`">
    <hl-tree ref="hlTreeSingle" :style="treeStyle" node-key="systemCode" :data="eventTypeData"
      :filter-node-method="filterNode" class="p-md" @node-click="clickTree" :props="defaultProps" />
  </hl-selector>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { eventTypeApiObj as eventTypeApi } from '@/apis/modules/event-type-api';
import { HlMessage } from 'hongluan-ui';
import { IgetListEventTreeVOsEventTypeSpace } from '@/apis/modules/event-type/model';

const props = defineProps({
  modelValue: String,
  useFor: Number
});

const emit = defineEmits(['riskChanged', 'update:modelValue']);

const eventTypeData = ref<any>([]);
const defaultProps = {
  children: 'childrens',
  label: 'eventTypeName',
};
const selector1 = ref();
const hlTreeSingle = ref();
const treeStyle = ref({
  width: '',
});

watch(() => props.modelValue,
  n => {
    if (n) {
      const currentNode = findNode(n as string, eventTypeData.value);
      if (currentNode) {
        selector1.value.setValue(currentNode.eventTypeName);
      }
    }
  },
  {
    deep: true,
  });

const clickTree = (data: IgetListEventTreeVOsEventTypeSpace.Data) => {
  if (!data.leafNode) {
    HlMessage({
      message: '仅可选择叶子结点!',
    });
    return;
  }
  selector1.value.setValue(data.eventTypeName);
  selector1.value.togglePopperVisible(false);
  hlTreeSingle.value.filter('');
  emit('update:modelValue', data.systemCode);
  emit('riskChanged', data.systemCode);
};
const getEventTypeCode = (data: IgetListEventTreeVOsEventTypeSpace.Data[]) => {
  return data.reduce((pre: string[], cur) => {
    if (cur.leafNode) {
      pre.push(cur.systemCode);
    } else {
      if (Object.prototype.toString.call(cur.childrens) === '[object Array]') {
        // eslint-disable-next-line no-param-reassign
        pre = getEventTypeCode(cur.childrens as IgetListEventTreeVOsEventTypeSpace.Data[]);
      }
    }
    return pre;
  }, []);
};
const clearValue = () => {
  selector1.value.setValue('');
  handleClear();
};
const handleClear = () => {
  emit('riskChanged', '');
  emit('update:modelValue', '');
};
const filterNode = (value: string, data: IgetListEventTreeVOsEventTypeSpace.Data) => {
  if (!value) return true;
  return data.eventTypeName.indexOf(value) !== -1;
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
const getData = async() => {
  const { data } = await eventTypeApi.tree(1);
  eventTypeData.value = data;
};
const findNode = (systemCode: string, tree: IgetListEventTreeVOsEventTypeSpace.Data[]): any => {
  if (!tree) return;
  let node = tree.find(item => item.systemCode === systemCode);
  if (node) {
    return node;
  } else {
    for (let i = 0; i < tree.length; i++) {
      node = findNode(systemCode, tree[i].childrens);
      if (node) break;
    }
  }
  return node;
};
const getOptionName = (systemCode: string) => {
  const node = findNode(systemCode, eventTypeData.value);
  return node ? node.eventTypeName : '';
};

onMounted(async() => {
  await getData();
  if (props.modelValue) {
    const currentNode = findNode(props.modelValue, eventTypeData.value);
    if (currentNode) {
      selector1.value.setValue(currentNode.eventTypeName);
    }
  }
});

defineExpose({
  setRisk,
  getOptionName,
  clearValue
});
</script>
