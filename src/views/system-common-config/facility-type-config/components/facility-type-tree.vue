<template show-source>
  <hl-panel
    class="h-full w-full"
    borderless
    inner-scroll
    full-body>
    <template #header>
      <div class="panel-title">
        <hl-input v-model="searchText" placeholder="输入设施类型关键字" block fill maxlength="20">
          <template #suffix>
            <two-search />
          </template>
        </hl-input>
      </div>
    </template>
    <hl-scrollbar class="no-padding-top-bottom">
      <hl-tree
        ref="facilityTypeTreeRef"
        :data="eventTypeData"
        :props="defaultProps"
        node-key="typeCode"
        gap="0"
        :highlight-current="true"
        :expand-on-click-node="false"
        :default-expand-all="true"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
      >
        <template #default="{ node, data }">
          <hl-group
            full
            gap="var(--xs)"
            align="items-between"
            :class="['event-type-label', isHovering(node.id) ? 'is-hovering' : '']"
            @mouseenter="enterTreeNode(node.id)"
            @mouseleave="leaveTreeNode(node.id)"
          >
            <span
              class="tree-node-label ellipsis static"
              :style="`width:${node.level <= 3 ? '170' : '160'}px`"
              :title="data.typeName"
            >
              {{ `${ data.typeCode ? data.typeCode + ' | ' : ''}${data.typeName}` }}
            </span>
            <hl-dropdown class="static more-actions" v-if="!readonly && node.level > ROOT_TREE_LEVEL">
              <hl-icon @click.stop type="primary">
                <fill-edit />
              </hl-icon>
              <template #dropdown>
                <hl-dropdown-menu @mouseenter="enterTreeNode(node.id)" @mouseleave="leaveTreeNode(node.id)">
                  <hl-dropdown-item v-if="data.leafNode == IS_NOT_LEAF_NODE" @click="addNextLevel(data, node)">添加下级</hl-dropdown-item>
                  <hl-dropdown-item @click="addSameLevel(data, node)">添加同级</hl-dropdown-item>
                  <hl-dropdown-item @click="edit(data, node)">编辑</hl-dropdown-item>
                  <hl-dropdown-item v-if="!node.childNodes?.length" @click="del(data, node)">删除</hl-dropdown-item>
                </hl-dropdown-menu>
              </template>
            </hl-dropdown>
          </hl-group>
        </template>
      </hl-tree>
    </hl-scrollbar>
  </hl-panel>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, nextTick } from 'vue';
import { HlTree } from 'hongluan-ui';
import { useHovering } from '@/hooks';
import { ROOT_TREE_LEVEL } from '@/common';
import { apiFacilityTypeObj as api } from '@/apis/modules/facility-type';

import type { IgetFacilityTreeSpace } from '@/apis/modules/facility-type/model';

defineProps({
  readonly: Boolean
});
const emit = defineEmits(['add-next-level', 'add-same-level', 'edit', 'del', 'click', 'changeNode']);

const IS_NOT_LEAF_NODE = 0;
const searchText = ref('');
const facilityTypeTreeRef = ref<InstanceType<typeof HlTree>>();

const eventTypeData = ref<any[]>([]);
const defaultProps = {
  children: 'childrens',
  label: 'typeName',
};

const { enter: enterTreeNode, leave: leaveTreeNode, isHovering } = useHovering();

const filterNode = (value: string, data: IgetFacilityTreeSpace.Data) => {
  if (!value) return true;
  return data.typeName.indexOf(value) !== -1;
};

const handleNodeClick = (data: IgetFacilityTreeSpace.Data, node: any) => {
  emit('click', { data, node, level: node.level, parent: node.parent });
  if (data.parentTypeCode !== '0' && node.parentTypeCode !== '-1') {
    emit('changeNode', data.typeCode);
    console.log(data, node);
  } else {
    if (data.parentTypeCode === '0' && data.childrens.length) {
      emit('changeNode', data.childrens[0].typeCode);
    }
  }
};

const addNextLevel = (data: IgetFacilityTreeSpace.Data, node: any) => {
  emit('add-next-level', {
    data,
    node,
    level: node.level,
    parent: node.parent,
    treeOperCallback: (newData: IgetFacilityTreeSpace.Data) => {
      facilityTypeTreeRef.value?.append(newData, node);
      node.expand();
    }
  });
};
const addSameLevel = (data: IgetFacilityTreeSpace.Data, node: any) => {
  emit('add-same-level', {
    data,
    node,
    level: node.level,
    parent: node.parent,
    treeOperCallback: (newData: IgetFacilityTreeSpace.Data) => {
      facilityTypeTreeRef.value?.insertAfter(newData, node);
    }
  });
};
const edit = (data: IgetFacilityTreeSpace.Data, node: any) => {
  emit('edit', {
    data,
    node,
    level: node.level,
    parent: node.parent,
    treeOperCallback: (newData: IgetFacilityTreeSpace.Data) => {
      Object.assign(data, newData);
    }
  });
};
const del = (data: IgetFacilityTreeSpace.Data, node: any) => {
  emit('del', {
    data,
    node,
    level: node.level,
    parent: node.parent,
    treeOperCallback: () => {
      facilityTypeTreeRef.value?.remove(data);
    }
  });
};

watch(searchText, val => {
  facilityTypeTreeRef.value?.filter(val);
});

const getData = async() => {
  const result = await api.getFacilityTree();
  eventTypeData.value.splice(0, eventTypeData.value.length);
  eventTypeData.value = result.data;
  if (result.data.length && result.data[0].childrens.length) {
    if (result.data[0].parentTypeCode === '0') {
      emit('changeNode', result.data[0].childrens[0].typeCode);
    } else {
      emit('changeNode', result.data[0].typeCode);
    }
    nextTick(() => {
      facilityTypeTreeRef.value?.setCurrentKey(result.data[0].typeCode);
    });
  }
};

onMounted(() => {
  getData();
});

defineExpose({ getData });

</script>
<style lang="scss" scoped>
.event-type-label {
  .more-actions {
    visibility: hidden;
  }
  &.is-hovering {
    .more-actions {
      visibility: visible;
    }
  }
}

</style>
