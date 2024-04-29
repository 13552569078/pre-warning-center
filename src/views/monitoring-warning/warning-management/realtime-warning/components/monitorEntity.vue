<template>
  <hl-selector ref="selector" filterable clearable block @input="handleTreeInput" @resize="resize" placeholder="清选择监测布控"
    popper-class="monitor-tree-select">
    <hl-tree ref="hlTreeSingle" :style="treeStyle" node-key="value" :data="monitorPointTreeSingle"
      :filter-node-method="filterNode" :expand-on-click-node="false" class="p-md" @node-click="clickTree" />
  </hl-selector>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useAccessData } from '@/hooks';
import { IgetRegionMonitorUnitTreeSpace } from '@/apis/modules/element-subject/model';

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const selector = ref();
const hlTreeSingle = ref();

const { monitorPointTreeSingle, getMonitorPointTreeAndFormat } = useAccessData();

const treeStyle = ref({ width: '' });

watch(
  () => props.modelValue,
  n => {
    if (!n) {
      selector.value.setValue('');
    }
  },
  {
    deep: true,
  }
);

const resize = ({ offsetWidth }: { offsetWidth: number }) => {
  treeStyle.value.width = offsetWidth + 'px';
};
const clickTree = (
  data: IgetRegionMonitorUnitTreeSpace.Data &
    IgetRegionMonitorUnitTreeSpace.RegionList &
    IgetRegionMonitorUnitTreeSpace.UnitList
) => {
  selector.value.setValue(data.label);
  hlTreeSingle.value.filter('');
  emit('update:modelValue', data);
};
const filterNode = (value: string, treeData: IgetRegionMonitorUnitTreeSpace.Data) => {
  if (!value) return true;
  return treeData.label.indexOf(value) !== -1;
};
const handleTreeInput = (val: string) => {
  hlTreeSingle.value.filter(val);
};

getMonitorPointTreeAndFormat();
</script>
<style lang="scss">
.monitor-tree-select {
  .hl-tree {
    max-height: 40vh;
    overflow-y: scroll;
  }
}
</style>
