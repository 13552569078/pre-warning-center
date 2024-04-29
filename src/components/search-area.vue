<template>
  <hl-selector
    :class="!isInForm ? '' : ''"
    ref="selector1"
    filterable
    clearable
    block
    popper-class="limit-height"
    @input="handleTreeInput"
    @clear="handleClear"
    @resize="resize"
    placeholder="请选择行政区划"
  >
    <hl-scrollbar max-height="240px">
      <hl-tree
      ref="hlTreeSingle"
      :style="treeStyle"
      node-key="areaCode"
      :data="areaList"
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
import { getAreaList } from '@/views/monitoring-elements/utils';
import { findNode } from '@/common/utils';
import { GlobalAPI } from '@/common/global-api';

const mapConfig = JSON.parse(GlobalAPI.config.MAP_CONFIG_MONITOR_WARNING_ONEPIC);

interface ItreeNode {
  label: string;
  children: any[];
  value: string;
  areaCode: string;
  areaName: string;
}

const props = defineProps({
  deep: {
    type: Boolean,
    default: true,
  },
  modelValue: String,
  isEmitAreaCode: {
    type: Boolean,
    default: false
  },
  isInForm: {
    type: Boolean,
    default: false
  }
});

watch(() => props.modelValue,
  n => {
    if (n) {
      if (props.isEmitAreaCode) {
        setValueByCode(props.modelValue as string);
      }
    } else {
      reset();
    }
  },
  {
    deep: true,
  });

const defaultProps = {
  children: 'children',
  label: 'label',
};

const emit = defineEmits(['areaChanged', 'update:modelValue', 'clearArea']);
const selector1 = ref();
const hlTreeSingle = ref();
const treeStyle = ref({
  width: '',
});
const areaList = ref();
const clickTree = (data: ItreeNode) => {
  // 表单内使用，仅能选择最后一级行政区划
  if (props.isEmitAreaCode && data?.children.length !== 0) return false;
  const areaName = setValueByCode(data.areaCode);
  selector1.value.togglePopperVisible(false);
  if (!props.isEmitAreaCode) {
    emit('update:modelValue', areaName);
  } else {
    emit('update:modelValue', data.areaCode);
  }
  emit('areaChanged', data.areaCode);
};
const reset = () => {
  selector1.value.setValue('');
  selector1.value.togglePopperVisible(false);
  hlTreeSingle.value.filter('');
  emit('clearArea');
};

const handleClear = () => {
  emit('update:modelValue', '');
  emit('areaChanged', '');
};

const filterNode = (value: string, data: ItreeNode) => {
  if (!value) return true;
  return data.label.indexOf(value) !== -1;
};
const handleTreeInput = (val: string) => {
  hlTreeSingle.value.filter(val);
};
const resize = (data: { offsetWidth: number }) => {
  treeStyle.value.width = data.offsetWidth + 'px';
};
const getAreaNamePath = (areaCode: string, areaArr: ItreeNode[], areaNamePath: string | boolean) => {
  let path = '';
  let count = 0;
  if (!areaCode) return path;
  let currentAreaCode = areaCode;
  while (currentAreaCode !== `${mapConfig.areaCode}` && count < 1000) {
    const node = findNode(currentAreaCode, 'areaCode', areaArr);
    if (node) {
      path = path ? `${node.areaName}-${path}` : `${node.areaName}`;
      currentAreaCode = node.parentId;
    }
    count++;
  }
  path = path ? `${mapConfig.areaName}-${path}` : '';
  return path;
};

const getAreaCodeByAreaName = (name: string) => {
  const node = findNode(name, 'label', areaList.value);
  if (node) {
    return node.value;
  }
  return '';
};

const setValueByCode = (areaCode: string) => {
  const areaName = getAreaNamePath(areaCode, areaList.value, '');
  selector1.value.setValue(areaName);
  return areaName;
};
// 格式化处理
const format = (arr:ItreeNode[]) => {
  return arr.map((e:ItreeNode) => {
    e.label = e.areaName;
    e.value = e.areaCode;
    // e.code = e.regionTypeCode
    if (e.children?.length) {
      e.children = format(e.children);
    }
    return e;
  });
};

onMounted(async() => {
  areaList.value = await getAreaList();
  if (areaList.value.length && props.modelValue) {
    setValueByCode(props.modelValue);
  }
  areaList.value = format(areaList.value);
});

defineExpose({
  setValueByCode,
  getAreaCodeByAreaName
});
</script>
