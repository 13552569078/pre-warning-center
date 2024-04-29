<template>
  <hl-panel
    class="h-full w-full"
    borderless
    inner-scroll
    full-body
    :style="isIframe ? 'height: calc(100vh - 0px) !important;' : null">
    <template #header>
      <hl-input v-model="searchText" placeholder="输入指标数据项关键字" block fill maxlength="20">
        <template #suffix>
          <two-search />
        </template>
      </hl-input>
    </template>
    <hl-scrollbar class="no-padding-top-bottom" style="height: calc(100vh - 240px)">
      <hl-tree
        ref="facilityTypeTreeRef"
        :data="data"
        :props="defaultProps"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        :default-expand-all="true"
        :highlight-current="true"
        :expand-on-click-node="false"
      >
        <template #default="{ data }">
          <hl-group full gap="var(--xs)" align="items-between">
            <hb-text-overflow method="length" :length="14" effect="light">
              <span :class="activeId === data.id ? 'text-primary' : null">{{ data.targetTypeName }}</span>
            </hb-text-overflow>
          </hl-group>
        </template>
      </hl-tree>
    </hl-scrollbar>
  </hl-panel>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, watch } from 'vue';
import { apiTargetTypeControllerObj as api } from '@/apis/modules/target-type-controller';
import { IgetListTargetTreeSpace } from '@/apis/modules/target-type-controller/model';
import { useIframe } from '@/hooks';

const { isIframe } = useIframe();

const data = ref();
const searchText = ref();
const facilityTypeTreeRef = ref();
const activeId = ref();

const emit = defineEmits(['click', 'update:EventNode']);

const defaultProps = {
  children: 'children',
  label: 'targetTypeName',
};

const filterNode = (value: string, nodeData: IgetListTargetTreeSpace.Data) => {
  if (!value) return true;
  return nodeData.targetTypeName.indexOf(value) !== -1;
};

const handleNodeClick = (nodeData: IgetListTargetTreeSpace.Data) => {
  activeId.value = nodeData.id;
  emit('update:EventNode', nodeData);
};

watch(searchText, val => {
  facilityTypeTreeRef.value?.filter(val);
});

onBeforeMount(async() => {
  const res = await api.getListTargetTree({});
  const tempData = [{
    id: '',
    type: '-1',
    targetTypeName: '监测指标',
    children: res.data
  }];
  data.value = tempData;
});
</script>
