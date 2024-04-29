<template>
  <hl-panel
    class="h-full w-full"
    borderless
    inner-scroll
    full-body>
    <template #header>
      <hl-input v-model="filterText" placeholder="输入监测主体关键字" block fill maxlength="20">
        <template #suffix>
          <hl-icon><two-search /></hl-icon>
        </template>
      </hl-input>
    </template>
    <hl-scrollbar class="no-padding-top-bottom">
      <hl-tree
        ref="tree"
        class="custom-hilight"
        :data="listData"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        node-key="id"
        :expand-on-click-node="false"
        :highlight-current="true">
        <template #default="{ node, data }">
          <hl-group full gap="var(--xs)" align="items-between">
            <hb-text-overflow method="length" :length="14" effect="light">
              <span :class="activeId === data.id ? 'text-primary' : null">{{ node.label }}</span>
            </hb-text-overflow>
          </hl-group>
        </template>
      </hl-tree>
    </hl-scrollbar>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import { apiSubjectObj } from '@/apis/modules/element-subject';
import { IgetRegionListSpace } from '@/apis/modules/element-subject/model';
import { findNode } from '@/common/utils';

interface ItreeNode {
  label: string;
}

const emit = defineEmits(['upActiveId']);
const props = defineProps({
  regionId: {
    type: String,
    default: ''
  }
});

const once = watch(() => props.regionId, id => {
  console.log('set region');
  if (id) {
    tree.value.setCurrentKey(id);
    once();
  }
});

// 筛选树
const filterText = ref('');
const tree = ref();
const listData = ref<IgetRegionListSpace.Data[]>([]);
const defaultProps = ref({
  children: 'regionList',
  label: 'label'
});
const activeId = ref();

const filterNode = (value: string, treeData: ItreeNode) => {
  if (!value) return true;
  return treeData.label.indexOf(value) !== -1;
};

watch(filterText, val => {
  tree.value.filter(val);
});
const handleNodeClick = (data: IgetRegionListSpace.RegionList) => {
  if (!data) return;
  // 主体允许点击，类型不允许点击
  if (data.regionName || data.regionTypeName) {
    activeId.value = data.id;
    emit('upActiveId', data);
  } else {
    activeId.value = -1;
    emit('upActiveId', null);
  }
};

const getList = async() => {
  const { data } = await apiSubjectObj.getRegionList();

  data.forEach((item: IgetRegionListSpace.Data) => {
    item.label = item.regionTypeName;
    if (item.regionList.length) {
      item.regionList.forEach((item2: IgetRegionListSpace.RegionList) => {
        item2.label = item2.regionName;
      });
    }
  });

  const tempData = [{
    id: -1,
    label: '全部',
    regionList: data
  }];

  listData.value = tempData;

  nextTick(() => {
    if (props.regionId && listData.value.length) {
      console.log('设置监测主体');
      tree.value.setCurrentKey(props.regionId);
      const regionData = findNode(props.regionId, 'id', listData.value, 'regionList');
      handleNodeClick(regionData);
    } else {
      tree.value.setCurrentKey(-1);
    }
  });
};

getList();
</script>
