<template>
  <hl-panel class="h-full w-full" borderless inner-scroll full-body>
    <template #header>
      <hl-input v-model="filterText" placeholder="输入分组关键字" block fill maxlength="20">
        <template #suffix>
          <two-search />
        </template>
      </hl-input>
    </template>
    <hl-scrollbar class="no-padding-top-bottom">
      <hl-tree ref="tree" class="indicator-tree filter-tree" node-key="templateParamGroupCode" :data="treeData" :props="defaultProps" default-expand-all :filter-node-method="filterNode" :expand-on-click-node="false" @node-click="handleNodeClick" :highlight-current="true">
        <template #default="{ node, data }">
          <hl-group class="w-full" gap="var(--xs)" align="items-between items-center" :class="['event-type-label', isHovering(node.id) ? 'is-hovering' : '']" @mouseenter="enterTreeNode(node.id)" @mouseleave="leaveTreeNode(node.id)">
            <span class="tree-node-label ellipsis static" :style="`width:${180 - node.level * 14}px`" :title="data.templateParamGroupName">
              {{ node.label }}
            </span>
            <hl-dropdown class="m-r-sm static more-actions">
              <hl-icon @click.stop type="primary">
                <fill-edit />
              </hl-icon>
              <template #dropdown>
                <hl-dropdown-menu @mouseenter="enterTreeNode(node.id)" @mouseleave="leaveTreeNode(node.id)">
                  <hl-dropdown-item @click="addGroup(data, 'down', node)">添加下级</hl-dropdown-item>
                  <hl-dropdown-item v-if="data.templateParamGroupId !== ROOT_ID" @click="addGroup(data, SELF, node)">添加本级</hl-dropdown-item>
                  <hl-dropdown-item v-if="data.templateParamGroupId !== ROOT_ID" @click="editGroup(data)">编辑</hl-dropdown-item>
                  <hl-dropdown-item v-if="data.templateParamGroupId !== ROOT_ID && data.children.length === 0 && data.isRefer !== 1" @click="deleteGroup(data)">删除</hl-dropdown-item>
                </hl-dropdown-menu>
              </template>
            </hl-dropdown>
          </hl-group>
        </template>
      </hl-tree>
    </hl-scrollbar>

    <hl-dialog v-if="dialogVisible" v-model="dialogVisible" width="calc(var(--xxs) * 100)" :placement="'center'" @close="cancel">
      <template #header>
        <h4>{{ type === 'add' ? '新增' : '编辑' }}分组</h4>
      </template>
      <p class="m-b-md">上级分组名称：{{ parentName }}</p>
      <hl-form ref="formRef" :model="formData" :rules="rules" :label-position="['items-left', 'items-middle']" @submit.prevent>
        <hl-form-item label="分组名称" prop="templateParamGroupName">
          <hl-input v-model.trim="formData.templateParamGroupName" placeholder="请输入分组名称" maxlength="20" show-word-limit block />
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
import { HlMessageBox } from 'hongluan-ui';
import { apiTemplateParamsGroupObj as api } from '@/apis/modules/tpl-params-manage/tree';
import { IgetTreeSpace } from '@/apis/modules/tpl-params-manage/tree/model';
import { useHovering } from '@/hooks';

const ROOT_ID = '-1';
const ROOT_NAME = '全部';
const SELF = 'self';
const ADD = 'add';
const EDIT = 'edit';
const actionFlag = ref('add');

const emit = defineEmits(['upActiveId', 'upUniqueId', 'update:EventNode']);
const props = defineProps({
  currentId: String
});
// 筛选树
const filterText = ref('');
const tree = ref();
const treeData = ref();

const defaultProps = ref({
  children: 'children',
  label: 'templateParamGroupName'
});
const activeId = ref();
const activeUniqueId = ref();
const dialogVisible = ref(false);
const parentName = ref('');
const addLevel = ref(SELF);
const type = ref(ADD);
const curNode = ref<IgetTreeSpace.Data>({} as IgetTreeSpace.Data);
const formRef = ref();
const formData = reactive({
  templateParamGroupName: ''
});

const rules = {
  templateParamGroupName: [
    { required: true, message: '请输入分组名称', trigger: ['change', 'blur'] },
    {
      min: 0,
      max: 20,
      message: '长度小于20个字符'
    }
  ]
};

const { enter: enterTreeNode, leave: leaveTreeNode, isHovering } = useHovering();

const filterNode = (value: string, data: IgetTreeSpace.Data) => {
  if (!value) return true;
  return data.templateParamGroupName.indexOf(value) !== -1;
};

watch(filterText, val => {
  tree.value.filter(val);
});

const findFirstLeaf = (data: IgetTreeSpace.Data[], isFirstCall?: boolean): IgetTreeSpace.Data => {
  if (isFirstCall) {
    emit('update:EventNode', data[0]);
  }
  if (data[0].children.length === 0) {
    return data[0];
  } else {
    return findFirstLeaf(data[0].children, false);
  }
};

const isLeaf = (node: IgetTreeSpace.Data) => {
  return node.children.length === 0;
};

const updateActivedId = (id: string, uniqueId: string, typeCode: string) => {
  activeId.value = id;
  activeUniqueId.value = uniqueId;
  emit('upActiveId', typeCode);
  emit('upUniqueId', uniqueId);
};

const updateEventNode = (eventNode: IgetTreeSpace.Data) => {
  emit('update:EventNode', eventNode);
};

const handleNodeClick = (data: IgetTreeSpace.Data, node: any) => {
  updateActivedId(data.templateParamGroupId, data.templateParamGroupId, data.templateParamGroupCode);
  updateEventNode(data);
};

const getTreeData = async() => {
  const res = await api.getTree();
  res.data.forEach(e => {
    e.parentName = ROOT_NAME;
  });
  const tempData = [
    {
      templateParamGroupId: ROOT_ID,
      uniqueId: '',
      templateParamGroupCode: ROOT_ID,
      templateParamGroupName: ROOT_NAME,
      parentName: ROOT_NAME,
      children: res.data
    }
  ];
  treeData.value = tempData;
  nextTick(() => {
    if (props.currentId) {
      tree.value.setCurrentKey(props.currentId);
    }
  });
  return res.data;
};
const addGroup = async(data: IgetTreeSpace.Data, level: string, node: IgetTreeSpace.Data) => {
  dialogVisible.value = true;
  formData.templateParamGroupName = '';
  curNode.value = data;
  if (level === SELF) {
    parentName.value = node.parent.data.templateParamGroupName;
  } else {
    parentName.value = data.templateParamGroupName;
  }
  type.value = ADD;
  addLevel.value = level;
};
const editGroup = async(data: IgetTreeSpace.Data) => {
  dialogVisible.value = true;
  curNode.value = data;
  formData.templateParamGroupName = data.templateParamGroupName;
  type.value = EDIT;
};
const submitGroup = async() => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    if (type.value === ADD) {
      const res = await api.add(formData.templateParamGroupName, addLevel.value === SELF ? curNode.value?.parentCode : curNode.value?.templateParamGroupCode === '-1' ? '' : curNode.value?.templateParamGroupCode);
    } else if (type.value === EDIT) {
      const res = await api.postUpdate(curNode.value.templateParamGroupId, formData.templateParamGroupName, curNode.value?.parentCode || '');
    }
    getTreeData();
    cancel();
  }
};

const cancel = () => {
  formRef.value?.resetFields();
  dialogVisible.value = false;
};

const deleteGroup = async(row: IgetTreeSpace.Data) => {
  await HlMessageBox.confirm(`您确认删除[${row.templateParamGroupName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
    type: 'success'
  });
  await api.deleteT(row.templateParamGroupId);
  getTreeData();
};

onMounted(async() => {
  await getTreeData();
  nextTick(() => {
    tree.value.setCurrentKey(ROOT_ID);
  });
});

defineExpose({ getTreeData });
</script>
<style lang="scss" scoped>
.hl-tree {
  :deep(.tree-node-content) {
    background-color: transparent;
  }
}
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
