<template>
  <hl-selector
    class="w-full"
    ref="selector1"
    filterable
    clearable
    block
    @input="handleTreeInput"
    @clear="reset"
    @resize="resize"
    :placeholder="`请选择${$t('warningType')}`"
  >
  <hl-scrollbar max-height="350px">
    <hl-tree
      ref="hlTreeSingle"
      :style="treeStyle"
      node-key="systemCode"
      :data="eventTypeData"
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
import { eventTypeApiObj as eventTypeApi } from '@/apis/modules/event-type-api';
import { Indexable } from 'fx-front-utils';

interface ItreeNode {
  eventTypeName: string;
  systemCode: string;
  childrens: any[];
  leafNode: number;
}

const props = defineProps({
  deep: {
    type: Boolean,
    default: true,
  },
  modelValue: String,
});

watch(
  () => props.modelValue,
  (n, o) => {
    !n && reset();
  }
);

const eventTypeData = ref<any>();
const defaultProps = {
  children: 'childrens',
  label: 'eventTypeName',
};

const emit = defineEmits(['riskChanged', 'update:modelValue']);

const selector1 = ref();
const hlTreeSingle = ref();
const treeStyle = ref({
  width: '',
});
const clickTree = (data: ItreeNode) => {
  let eventTypeCode = [];
  // 穿透
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
  emit('riskChanged', []);
};
const getEventTypeCode = (data: Indexable<any>[]) => {
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
  // 风险分类 默认传1
  const result = await eventTypeApi.tree(1);
  eventTypeData.value = result.data;
};

onMounted(() => {
  getData();
});

defineExpose({
  setRisk,
  reset
});
</script>
