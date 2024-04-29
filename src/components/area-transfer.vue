<template>
  <hl-dialog :model-value="true" class="md-dialog" width="800px" title="行政区划" @close="$emit('close')" :close-on-click-modal="false" stripe>
    <hl-transfer
      class="w-full"
      style="--transfer-height: 500px"
      v-model="areaCodes"
      :titles="['未选择', '已选择']"
      :data="areaList"
      filterable
      :filter-method="filterMethod"
      filter-placeholder="输入关键字"
      :props="{
        key: 'areaCode',
        label: 'areaName'
      }"
      :filter-props="{
        maxLength: 20
      }"
    />
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="$emit('close')">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="areaOk">确定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, onMounted, PropType } from 'vue';
import { pick } from 'lodash-es';
import { getAreaList } from '@/views/monitoring-elements/utils';

const emit = defineEmits(['areaChanged', 'close']);

const props = defineProps({
  modelValue: {
    type: Array as PropType<any[]>,
    default: () => {
      return [];
    }
  }
});

const areaList = ref<any[]>();
// 默认回显
const areaCodes = ref(
  props.modelValue.map(item => {
    return item.areaCode;
  })
);

const filterMethod = (query: string, item: any) => {
  return item.areaName.indexOf(query) > -1;
};
const areaOk = () => {
  const checkedList = areaList.value
    ?.filter((item: any) => {
      return areaCodes.value.includes(item.areaCode);
    })
    .map(item1 => {
      return {
        ...pick(item1, 'areaCode', 'areaName', 'id')
      };
    });
  emit('areaChanged', checkedList);
  emit('close');
};

onMounted(async() => {
  areaList.value = await getAreaList();
});
</script>
