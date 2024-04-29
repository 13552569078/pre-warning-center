<template>
  <hl-dialog :model-value="true" class="md-dialog" width="585px" :title="`${id ? '编辑' : '添加'}${pageType}`" @close="$emit('cancel')">
    <hb-tree-transfer
      v-if="isShow"
      v-model="selectEvents"
      :titles="[pageType, '已选择']"
      filterable
      :filter-placeholder="`请输入${pageType}`"
      :data="eventTypes"
      :tree-props="treeProps"
      style="--transfer-height: 500px" />
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="$emit('cancel')">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="ok">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, onMounted, PropType, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { getEventTypeTree } from '@/views/monitoring-config/event-type/utils';

const { t } = useI18n();

const emits = defineEmits(['eventAddOk', 'cancel']);
const isMonitorPage = document.location.href.indexOf('/monitoring-config/') > -1;
const pageType = isMonitorPage ? `${t('warningType')}` : '预警类型';

const props = defineProps({
  id: String,
  eventList: {
    type: Array as PropType<string[]>,
    default: () => ([])
  }
});

const filterNode = (value: string, data:any) => {
  if (!value) return true;
  return data.label.indexOf(value) !== -1;
};
const isShow = ref(false);
const selectEvents = ref<string[] | null>(null);
const eventTypes = ref();
const treeProps = reactive({
  nodeKey: 'systemCode',
  checkStrictly: true,
  showCheckbox: false,
  filterNodeMethod: filterNode,
  data: eventTypes,
  props: {
    children: 'childrens',
    label: 'eventTypeName',
  },
});

const loopData = (data: any) => {
  data.forEach((item: any) => {
    item.disabled = !item.leafNode;
    if (item.childrens) {
      loopData(item.childrens);
    }
  });
};

const ok = () => {
  console.log('eventAddOk', selectEvents.value);
  emits('eventAddOk', selectEvents.value);
};

onMounted(async() => {
  const eventTree = await getEventTypeTree();
  loopData(eventTree);
  eventTypes.value = eventTree;
  selectEvents.value = props.eventList;
});

const w = watch(() => selectEvents.value, () => {
  isShow.value = true;
  w();
});

</script>
