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
  <hl-scrollbar max-height="420px">
    <hl-tree
      ref="hlTreeSingle"
      show-checkbox
      :style="treeStyle"
      node-key="systemCode"
      :data="eventTypeData"
      :filter-node-method="filterNode"
      @check-change="chooseTree"
      class="p-md"
      :props="defaultProps"
    />
  </hl-scrollbar>
  </hl-selector>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { eventTypeApiObj as eventTypeApi } from '@/apis/modules/event-type-api';

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
const chooseTree = () => {
  const checkNodes = hlTreeSingle.value.getCheckedNodes();
  // 选中list
  const checkList = checkNodes.map((cur:ItreeNode) => {
    return { eventTypeName: cur.eventTypeName, systemCode: cur.systemCode };
  });
  // 选中 ids
  const checkIds = checkList.map((cur:ItreeNode) => {
    return cur.systemCode;
  });
  // 回显类型
  if (checkList.length) {
    selector1.value.setValue(`【${checkList[0].eventTypeName}】等${checkList.length}类型`);
    emit('update:modelValue', `【${checkList[0].eventTypeName}】等${checkList.length}类型`);
  } else {
    selector1.value.setValue('');
    emit('update:modelValue', '');
  }
  emit('riskChanged', checkIds);
};
const reset = () => {
  selector1.value.setValue('');
  selector1.value.togglePopperVisible(false);
  hlTreeSingle.value.filter('');
  hlTreeSingle.value.setCheckedKeys([]); // 清空树选中
  emit('riskChanged', []);
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
