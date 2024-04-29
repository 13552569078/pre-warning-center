<template>
  <hl-selector class="w-xxl" ref="selector1" filterable clearable block @input="handleTreeInput"
    @clear="emit('riskChanged', [])" @resize="resize" :placeholder="`请选择${$t('warningType')}`">
    <hl-tree ref="hlTreeSingle" :style="treeStyle" node-key="systemCode" :data="eventTypeData"
      :filter-node-method="filterNode" class="p-md" @node-click="clickTree" :props="defaultProps" />
  </hl-selector>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { eventTypeApiObj as eventTypeApi } from '@/apis/modules/event-type-api';

interface ItreeNode {
  eventTypeName: string;
  systemCode: string;
  childrens: Record<string, string>[];
  leafNode: number;
}

const props = defineProps({
  deep: {
    type: Boolean,
    default: true,
  },
  modelValue: String,
});

const emit = defineEmits(['riskChanged', 'update:modelValue']);

const eventTypeData = ref<any>();
const defaultProps = {
  children: 'childrens',
  label: 'eventTypeName',
};
const selector1 = ref();
const hlTreeSingle = ref();
const treeStyle = ref({
  width: '',
});

watch(
  () => props.modelValue,
  n => {
    !n && reset();
  }
);

const clickTree = (data: ItreeNode) => {
  let eventTypeCode = [];
  // 穿透查询组
  if (data.leafNode) {
    eventTypeCode.push(data.systemCode);
  } else {
    eventTypeCode = getEventTypeCode(data.childrens);
  }
  selector1.value.setValue(data.eventTypeName);
  selector1.value.togglePopperVisible(false);
  hlTreeSingle.value.filter('');
  emit('riskChanged', eventTypeCode);
  emit('update:modelValue', data.eventTypeName);
};
const reset = () => {
  selector1.value.setValue('');
  selector1.value.togglePopperVisible(false);
  hlTreeSingle.value.filter('');
};
const getEventTypeCode = (data: any[]) => {
  return data.reduce((pre: string[], cur) => {
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
const getData = async() => {
  // 获取风险分类
  const result = await eventTypeApi.tree(1);
  eventTypeData.value = result.data;
};

onMounted(() => {
  getData();
});

defineExpose({
  setRisk,
});
</script>
