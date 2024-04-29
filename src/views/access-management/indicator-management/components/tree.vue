<template>
  <hl-panel
    class="h-full w-full"
    borderless
    inner-scroll
    full-body>
    <template #header>
      <hl-input v-model="filterText" placeholder="输入指标关键字" block fill  maxlength="20">
        <template #suffix>
          <two-search />
        </template>
      </hl-input>
    </template>
    <hl-scrollbar class="no-padding-top-bottom" style="overflow-x: hidden;">
      <hl-tree
        ref="tree"
        class="indicator-tree filter-tree"
        node-key="targetTypeCode"
        :data="indicatorGroupTree"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
        :highlight-current="true">
        <template #default="{ node, data }">
          <hl-group class="w-full" gap="var(--xs)" align="items-between items-center"  :class="['event-type-label', isHovering(node.id) ? 'is-hovering' : '']"
            @mouseenter="enterTreeNode(node.id)"
            @mouseleave="leaveTreeNode(node.id)">
            <span
              class="tree-node-label ellipsis static"
              :style="`width:${180 - node.level * 14}px`"
              :title="data.targetTypeName"
            >
            {{ node.label}}
            </span>
            <hl-dropdown class="m-r-sm static more-actions" v-city-life-line>
              <hl-icon @click.stop type="primary">
                <fill-edit />
              </hl-icon>
              <template #dropdown>
                <hl-dropdown-menu  @mouseenter="enterTreeNode(node.id)" @mouseleave="leaveTreeNode(node.id)">
                  <hl-dropdown-item @click="addGroup(data, 'down', node)">添加下级</hl-dropdown-item>
                  <hl-dropdown-item  v-if="data.id!==-999" @click="addGroup(data, 'self', node)">添加本级</hl-dropdown-item>
                  <hl-dropdown-item  v-if="data.id!==-999" @click="editGroup(data)">编辑</hl-dropdown-item>
                  <hl-dropdown-item  v-if="data.id!==-999" @click="deleteGroup(data)">删除</hl-dropdown-item>
                </hl-dropdown-menu>
              </template>
            </hl-dropdown>
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
        <h4>{{ isEdit ? '编辑' : '新增'}}分组</h4>
      </template>
      <p class="m-b-md">上级分组名称：{{parentName}}</p>
      <hl-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :label-position="['items-left', 'items-middle']"
      @submit.prevent
    >
      <hl-form-item label="分组名称" prop="targetTypeName">
        <hl-input
          v-model.trim="formData.targetTypeName"
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
import { ref, watch, nextTick, reactive, computed } from 'vue';
import { HlMessageBox, HlMessage } from 'hongluan-ui';
import { apiTargetTypeControllerObj } from '@/apis/modules/target-type-controller';
import { IgetListTargetTypeTreeSpace } from '@/apis/modules/target-type-controller/model';
import { useHovering } from '@/hooks';

const emit = defineEmits(['upActiveId', 'upUniqueId', 'update:EventNode']);
// 筛选树
const filterText = ref('');
const tree = ref();
const indicatorGroupTree = ref();
const isEdit = computed(() => {
  return type.value !== 'add';
});

const defaultProps = ref({
  children: 'children',
  label: 'targetTypeName'
});
const activeId = ref();
const activeUniqueId = ref();
const dialogVisible = ref(false);
const parentName = ref('');
const addLevel = ref('self');
const type = ref('add');
const curNode = ref<IgetListTargetTypeTreeSpace.Data>();
const formRef = ref();
const formData = reactive({
  targetTypeName: ''
});

const rules = {
  targetTypeName: [
    { required: true, message: '请输入分组名称', trigger: ['change', 'blur'] },
    {
      min: 0,
      max: 20,
      message: '长度小于20个字符',
    }]
};

const {
  enter: enterTreeNode,
  leave: leaveTreeNode,
  isHovering,
} = useHovering();

const filterNode = (value: string, treeData: IgetListTargetTypeTreeSpace.Data) => {
  if (!value) return true;
  return treeData.targetTypeName.indexOf(value) !== -1;
};

watch(filterText, val => {
  tree.value.filter(val);
});

const findFirstLeaf = (treeData: IgetListTargetTypeTreeSpace.Data[], isFirstCall?: boolean): IgetListTargetTypeTreeSpace.Data => {
  if (isFirstCall) {
    emit('update:EventNode', treeData[0]);
  }
  if (treeData[0].children.length === 0) {
    return treeData[0];
  } else {
    return findFirstLeaf(treeData[0].children, false);
  }
};

const isLeaf = (node: IgetListTargetTypeTreeSpace.Data) => {
  return node.children.length === 0;
};

const updateActivedId = (id: number, uniqueId: number, typeCode: string) => {
  activeId.value = id;
  activeUniqueId.value = uniqueId;
  emit('upActiveId', typeCode);
  emit('upUniqueId', uniqueId);
};

const updateEventNode = (eventNode: IgetListTargetTypeTreeSpace.Data) => {
  emit('update:EventNode', eventNode);
};

watch(() => indicatorGroupTree.value, treeData => {
  // if (treeData.length) {
  //   const leaf = findFirstLeaf(treeData, true);
  //   nextTick(() => {
  //     updateActivedId(leaf.id, leaf.id, leaf.targetTypeCode);
  //   });
  // }
  updateActivedId(-999, -999, '');
});

const handleNodeClick = (data: IgetListTargetTypeTreeSpace.Data, node: any) => {
  updateActivedId(data.id, data.id, data.targetTypeCode);
  updateEventNode(data);
};

const getIndicatorGroupTree = async() => {
  const res = await apiTargetTypeControllerObj.getListTargetTypeTree();
  res.data.forEach(e => {
    e.parentTargetName = '监测指标';
  });
  const tempData = [{
    id: -999,
    uniqueId: '',
    targetTypeCode: '',
    targetTypeName: '监测指标',
    parentTargetName: '监测指标',
    children: res.data
  }];
  indicatorGroupTree.value = tempData;
  return res.data;
};
const addGroup = async(data: IgetListTargetTypeTreeSpace.Data, level: string, node: IgetListTargetTypeTreeSpace.Data) => {
  dialogVisible.value = true;
  formData.targetTypeName = '';
  curNode.value = data;
  if (level === 'self') {
    parentName.value = data.parentTargetName;
  } else {
    parentName.value = data.targetTypeName;
  }
  type.value = 'add';
  addLevel.value = level;
};
const editGroup = async(data: IgetListTargetTypeTreeSpace.Data) => {
  dialogVisible.value = true;
  curNode.value = data;
  formData.targetTypeName = data.targetTypeName;
  type.value = 'edit';
};
const submitGroup = async() => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    if (type.value === 'add') {
      const res = await apiTargetTypeControllerObj.postAddTargetType({
      // id: curNode.value?.id,
        parentCode: addLevel.value === 'self' ? curNode.value?.parentCode : curNode.value?.targetTypeCode || '',
        targetTypeName: formData.targetTypeName
      });
    } else if (type.value === 'edit') {
      const res = await apiTargetTypeControllerObj.postModifyTargetType({
        id: curNode.value?.id,
        targetTypeName: formData.targetTypeName,
        parentCode: curNode.value?.parentCode || '',
        targetTypeCode: curNode.value?.targetTypeCode
      });
    }
    getIndicatorGroupTree();
    cancel();
  }
};

const cancel = () => {
  formRef.value?.resetFields();
  dialogVisible.value = false;
};

const deleteGroup = async(row: IgetListTargetTypeTreeSpace.Data) => {
  await HlMessageBox.confirm(`您确认删除[${row.targetTypeName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
    type: 'success',
  });
  await apiTargetTypeControllerObj.getRemoveTargetType(row.id);
  HlMessage.success('删除成功');
  getIndicatorGroupTree();
};

getIndicatorGroupTree();
</script>
<style lang="scss" scoped>
:deep(.scrollbar-wrap) {
  overflow-x: hidden;
}
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
