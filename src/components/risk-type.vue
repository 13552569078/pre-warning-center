<template>
  <hl-selector :class="isFullWidth ? 'w-full' : 'w-xxl'" ref="selector1" filterable clearable block @input="handleTreeInput" @clear="handleClear" @resize="resize" :placeholder="`请选择${$t('warningType')}`">
    <!-- :placeholder="`请选择${props.useFor === 1 ? `${$t('warningType')}` : '预警类型'}`" -->
    <hl-scrollbar max-height="350px">
      <hl-tree ref="hlTreeSingle" :style="treeStyle" node-key="systemCode" :data="eventTypeData" :filter-node-method="filterNode" class="p-md" @node-click="clickTree" :props="defaultProps" />
    </hl-scrollbar>
  </hl-selector>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { eventTypeApiObj as eventTypeApi } from '@/apis/modules/event-type-api';
import { Indexable } from 'fx-front-utils';
import { HlMessage } from 'hongluan-ui';
import { apiEventTypeObj as api } from '@/apis/modules/event-type';

interface ItreeNode {
  eventTypeName: string;
  systemCode: string;
  childrens: Indexable<any>[];
  leafNode: number;
}

const props = defineProps({
  modelValue: String,
  useFor: Number,
  isConfigEventType: {
    type: Boolean,
    default: false
  },
  isFullWidth: {
    type: Boolean,
    default: true
  }
});

watch(
  () => props.modelValue,
  n => {
    if (n) {
      const currentNode = findNode(n as string, eventTypeData.value);
      if (currentNode) {
        selector1.value.setValue(currentNode.eventTypeName);
      }
    }
  },
  {
    deep: true
  }
);

const eventTypeData = ref<any>([]);
const defaultProps = {
  children: 'childrens',
  label: 'eventTypeName'
};

const emit = defineEmits(['riskChanged', 'update:modelValue']);

const selector1 = ref();
const hlTreeSingle = ref();
const treeStyle = ref({
  width: ''
});
const clickTree = (data: ItreeNode) => {
  if (!data.leafNode) {
    HlMessage({
      message: '仅可选择叶子结点!'
    });
    return;
  }
  selector1.value.setValue(data.eventTypeName);
  selector1.value.togglePopperVisible(false);
  hlTreeSingle.value.filter('');
  emit('update:modelValue', data.systemCode);
  emit('riskChanged', data.systemCode);
};
const getEventTypeCode = (data: any[]) => {
  return data.reduce((pre: Indexable<any>[], cur) => {
    if (cur.leafNode) {
      pre.push(cur.systemCode);
    } else {
      if (Object.prototype.toString.call(cur.childrens) === '[object Array]') {
        // eslint-disable-next-line no-param-reassign
        pre = getEventTypeCode(cur.childrens);
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
const filterNode = (value: string, data: ItreeNode) => {
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

const getData = async () => {
  let result = null;
  console.log(props.isConfigEventType);
  if (!props.isConfigEventType) {
    result = await eventTypeApi.tree(1);
  } else {
    result = await api.getListConfigEventTreeVOsEventType();
  }
  eventTypeData.value = result.data;
};

const findNode = (systemCode: string, tree: any[]) => {
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

onMounted(async () => {
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
