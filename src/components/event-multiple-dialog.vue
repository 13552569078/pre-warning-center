<template>
  <hl-dialog :model-value="true" class="md-dialog" body-class="dialog-no-600" width="550px" title="风险分类" @close="$emit('close')" :close-on-click-modal="false" borderless>
    <hl-panel class="h-full w-full" borderless inner-scroll full-body header-class="inner-pannel-header">
      <template #header>
        <hl-input v-model="searchText" placeholder="输入风险分类关键字" block fill maxlength="20">
          <template #suffix>
            <two-search />
          </template>
        </hl-input>
      </template>
      <hl-scrollbar class="no-padding-top-bottom" max-height="550px">
        <hl-tree ref="eventTypeTreeRef" show-checkbox node-key="systemCode" :data="eventTypeData" :filter-node-method="filterNode" :props="defaultProps" />
      </hl-scrollbar>
    </hl-panel>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="$emit('close')">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="ok">确定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch, PropType, nextTick } from 'vue';
import { eventTypeApiObj as eventTypeApi } from '@/apis/modules/event-type-api';

interface ItreeNode {
  eventTypeName: string;
  systemCode: string;
  childrens: any[];
  leafNode: number;
}
const defaultProps = {
  children: 'childrens',
  label: 'eventTypeName'
};

const emit = defineEmits(['riskChanged', 'close']);

const props = defineProps({
  modelValue: [] as PropType<any[]>
});

const searchText = ref('');
const eventTypeData = ref<any>();
const checkedList = ref<any>();

const eventTypeTreeRef = ref();

watch(searchText, val => {
  eventTypeTreeRef.value?.filter(val);
});

const filterNode = (value: string, data: ItreeNode) => {
  if (!value) return true;
  return data.eventTypeName.indexOf(value) !== -1;
};
const getData = async() => {
  // 风险分类 默认传1
  const result = await eventTypeApi.tree(1);
  eventTypeData.value = result.data;
};
const ok = () => {
  const checkNodes = eventTypeTreeRef.value.getCheckedNodes();
  // 选中列表
  checkedList.value = checkNodes
    .filter((item: ItreeNode) => {
      return item.leafNode;
    })
    .map((cur: ItreeNode) => {
      return { eventTypeName: cur.eventTypeName, systemCode: cur.systemCode };
    });
  emit('riskChanged', checkedList.value);
  emit('close');
};

onMounted(() => {
  getData();
  const checkIds = props.modelValue?.map(item => {
    return item.systemCode;
  });
  nextTick(() => {
    eventTypeTreeRef.value.setCheckedKeys(checkIds);
  });
});
</script>
