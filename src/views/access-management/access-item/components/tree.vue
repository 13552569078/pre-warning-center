<template>
  <hl-panel
    class="h-full w-full"
    borderless
    inner-scroll
    full-body>
    <template #header>
      <hl-input v-model="filterText" placeholder="输入接入数据项关键字" block fill  maxlength="20">
        <template #suffix>
          <two-search />
        </template>
      </hl-input>
    </template>
    <hl-scrollbar class="no-padding-top-bottom">
      <hl-tree
        ref="tree"
        class="indicator-tree filter-tree"
        node-key="id"
        :data="indicatorGroupTree"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        :expand-on-click-node="false"
        :highlight-current="true">
        <template #default="{ node, data }">
          <hl-group class="w-full" gap="var(--xs)" align="items-between">
            <hb-text-overflow method="length" :length="14" effect="light" class="tree-start">
              <span :class="activeId === data.id ? 'text-primary' : null">{{ node.label }}</span>
            </hb-text-overflow>
          </hl-group>
        </template>
      </hl-tree>
    </hl-scrollbar>
    <hl-dialog
      v-model="dialogVisible"
      width="calc(var(--xxs) * 100)"
      :placement="'center'"
    >
      <template #header>
        <h4>新增分组</h4>
      </template>
      <p class="m-b-md">上级分组名称：{{parentName}}</p>
      <hl-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :label-position="['items-left', 'items-middle']"
    >
      <hl-form-item label="分组名称" prop="eventTypeName">
        <hl-input
          v-model="formData.targetTypeName"
          placeholder="请输入分组名称"
          maxlength="20"
          show-word-limit
          block />
      </hl-form-item>
      </hl-form>
      <template #footer>
        <span class="dialog-footer">
          <hl-button @click="cancel">取 消</hl-button>
          <hl-button type="primary" class="m-l-md" @click="submitGroup">确 定</hl-button>
        </span>
      </template>
    </hl-dialog>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref, watch, nextTick, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { apiAccessObjectObj } from '@/apis/modules/access-object';
import { IgetGetAccessSourceObjectGroupSpace } from '@/apis/modules/access-object/model';
import { findNode } from '@/common/utils';

interface GroupTreeItem {
  accessSourceObjectId: string,
  accessSourceId: string,
  accessSourceType: string,
  accessSourceName: string,
  targetTypeName: string,
  parentCode: string,
  targetTypeCode: string,
  children: GroupTreeItem[]
}
const emit = defineEmits(['upActiveId', 'update:EventNode']);

const router = useRouter();
const route = useRoute();

// 筛选树
const filterText = ref('');
const tree = ref();
const indicatorGroupTree = ref();
const currentAccessItemId = route.query.accessItemId;

const defaultProps = ref({
  children: 'children',
  label: 'name'
});
const activeId = ref();
const dialogVisible = ref(false);
const parentName = ref('');
const formRef = ref();
const formData = reactive({
  targetTypeName: ''
});

const rules = {
  targetTypeName: [{
    min: 0,
    max: 20,
    message: '长度小于20个字符',
  }]
};

const filterNode = (value: string, treeData: GroupTreeItem) => {
  if (!value) return true;
  return treeData.accessSourceName.indexOf(value) !== -1;
};

watch(filterText, val => {
  tree.value.filter(val);
});

const findFirstLeaf = (treeData: GroupTreeItem[], isFirstCall?: boolean): GroupTreeItem => {
  if (isFirstCall) {
    updateActivedId(treeData[0].accessSourceId);
  }
  if (treeData[0].children?.length === 0) {
    return treeData[0];
  } else {
    return findFirstLeaf(treeData[0].children, false);
  }
};

const updateActivedId = (id: string) => {
  activeId.value = id;
};

const getNodeInfo = (data: GroupTreeItem, node: any) => {
  const id = node.level === 1 ? data.accessSourceId : data.accessSourceObjectId;
  const params = node.level === 1 ? { level: 1, accessSourceId: data.accessSourceId } : { level: 2, accessSourceId: data.accessSourceId, accessSourceObjectId: data.accessSourceObjectId };
  return {
    id, params
  };
};

const handleNodeClick = (data: GroupTreeItem, node: any) => {
  const { id, params } = getNodeInfo(data, node);
  activeId.value = id;
  router.push({
    name: 'accessItem',
    query: {
      accessItemId: id
    }
  });
  emit('upActiveId', params);
};

const cancel = () => {
  formRef.value?.resetFields();
  dialogVisible.value = false;
};

onMounted(async() => {
  const { code, data } = await apiAccessObjectObj.getGetAccessSourceObjectGroup('');
  const sourceData = data.map((e: IgetGetAccessSourceObjectGroupSpace.Data) => {
    return {
      accessSourceName: e.accessSourceName,
      accessSourceId: e.accessSourceId,
      id: e.accessSourceId,
      isLeaf: false,
      name: e.accessSourceName,
      children: e.objectList.map(i => {
        return {
          ...i,
          name: i.objectName,
          id: i.accessSourceObjectId
        };
      })
    };
  });
  const tempData = [{
    id: -999,
    accessSourceId: '',
    targetTypeCode: -999,
    accessSourceName: '接入数据项',
    name: '接入数据项',
    children: sourceData
  }];
  indicatorGroupTree.value = tempData;
  if (currentAccessItemId) {
    nextTick(() => {
      tree.value.setCurrentKey(currentAccessItemId);
      const nodeData = findNode(currentAccessItemId as string, 'id', indicatorGroupTree.value) as GroupTreeItem;
      const node = tree.value.getNode(currentAccessItemId);
      const { params } = getNodeInfo(nodeData, node);
      activeId.value = currentAccessItemId;
      emit('upActiveId', params);
    });
  }
});

</script>
