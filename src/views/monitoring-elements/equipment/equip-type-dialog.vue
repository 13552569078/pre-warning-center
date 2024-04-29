<template>
  <hl-dialog show-close v-model="typeDialogVisible" title="设备类型管理" width="calc(var(--xs) * 60)"
    header-class="border-transparent" body-class="display-flex items-left items-top flex-col gap-lg">
    <hl-tree ref="tree" class="indicator-tree filter-tree w-full" node-key="targetTypeCode" :data="indicatorGroupTree"
      :props="defaultProps" default-expand-all :filter-node-method="filterNode" :expand-on-click-node="false"
      @node-click="handleNodeClick" :highlight-current="true"
      style="max-height: 60vh;overflow: auto;">
      <template #default="{ node, data }">
        <hl-group class="w-full" gap="var(--xs)" align="items-between items-center"
          :class="['event-type-label', isHovering(node.id) ? 'is-hovering' : '']" @mouseenter="enterTreeNode(node.id)"
          @mouseleave="leaveTreeNode(node.id)">
          <span class="tree-node-label ellipsis static" :style="`width:${320 - node.level * 14}px`"
            :title="data.typeName">
            {{ node.label }}
          </span>
          <hl-dropdown v-if="data.id !== -999" class="m-r-sm static more-actions">
            <hl-icon @click.stop type="primary">
              <fill-edit />
            </hl-icon>
            <template #dropdown>
              <hl-dropdown-menu @mouseenter="enterTreeNode(node.id)" @mouseleave="leaveTreeNode(node.id)">
                <hl-dropdown-item @click="addGroup(data, 'down', node)">添加下级</hl-dropdown-item>
                <hl-dropdown-item v-if="isShow(data)" @click="addGroup(data, 'self', node)">添加本级</hl-dropdown-item>
                <hl-dropdown-item v-if="isShow(data)" @click="editGroup(data)">编辑</hl-dropdown-item>
                <hl-dropdown-item v-if="isShow(data)" @click="deleteGroup(data)">删除</hl-dropdown-item>
              </hl-dropdown-menu>
            </template>
          </hl-dropdown>
        </hl-group>
      </template>
    </hl-tree>

    <hl-dialog v-model="dialogVisible" width="calc(var(--xxs) * 100)" :placement="'center'"
      :close-on-click-modal="false" borderless :title="`${ type === 'add' ? '新增' : '编辑' }设备类型`">
      <!-- <p class="m-b-md">上级分组名称：{{parentName}}</p> -->
      <hl-form ref="formRef" :model="formData" :rules="rules" :label-position="['items-left', 'items-middle']" gap="var(--lg)" item-gap="var(--lg2)">
        <hl-form-item label="设备类型" prop="typeName">
          <hl-input v-model.trim="formData.typeName" placeholder="请输入设备类型名称" maxlength="20" show-word-limit block />
        </hl-form-item>
        <hl-form-item label="设备类型编码" prop="typeCode">
          <hl-input v-model.trim="formData.typeCode" placeholder="请输入设备类型编码" maxlength="20" show-word-limit block />
        </hl-form-item>
      </hl-form>
      <template #footer>
        <span class="dialog-footer">
          <hl-button @click="cancel">取 消</hl-button>
          <hl-button type="primary" class="m-l-md" @click="submitGroup">确 定</hl-button>
        </span>
      </template>
    </hl-dialog>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, nextTick, watch, onMounted, reactive } from 'vue';
import { apiEquipmentTypeObj } from '@/apis/modules/equipment-type-new/index';
import { IgetTreeSpace } from '@/apis/modules/equipment-type-new/model';
import { HlMessageBox } from 'hongluan-ui';
import { useHovering } from '@/hooks';
import { IS_IOT_EQUIP, IS_VIDEO_EQUIP } from '@/common';

const typeDialogVisible = ref(false);
const emit = defineEmits(['updated']);

// 筛选树
const filterText = ref('');
const tree = ref();
const indicatorGroupTree = ref();

const defaultProps = ref({
  children: 'children',
  label: 'typeName'
});

const isShow = (data: IgetTreeSpace.Data) => {
  return data.typeCode !== IS_IOT_EQUIP && data.typeCode !== IS_VIDEO_EQUIP;
};

const dialogVisible = ref(false);
const parentName = ref('');
const addLevel = ref('self');
const type = ref('add');
const curNode = ref<IgetTreeSpace.Data>();
const formRef = ref();
const formData = reactive({
  typeCode: '',
  typeName: '',
  equipType: 0
});

const rules = {
  typeName: [
    { required: true, message: '请输入设备类型名称', trigger: ['change', 'blur'] },
    {
      min: 0,
      max: 20,
      message: '长度小于20个字符',
    }],
  typeCode: [
    { required: true, message: '请输入设备类型编码', trigger: ['change', 'blur'] },
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

const filterNode = (value: string, treeData: IgetTreeSpace.Data) => {
  if (!value) return true;
  return treeData.typeName.indexOf(value) !== -1;
};

watch(filterText, val => {
  tree.value.filter(val);
});

const getIndicatorGroupTree = async() => {
  const res = await apiEquipmentTypeObj.getTree();
  res.data.forEach(e => {
    e.parentId = 0;
  });
  const tempData = [{
    id: -999,
    typeCode: 0,
    parentId: 0,
    typeId: 0,
    typeName: '设备类型',
    children: res.data
  }];
  indicatorGroupTree.value = tempData;
  return res.data;
};
const addGroup = async(data: IgetTreeSpace.Data, level: string, node: IgetTreeSpace.Data) => {
  dialogVisible.value = true;
  curNode.value = data;
  // if (level === 'self') {
  //   parentName.value = data.parentTargetName;
  // } else {
  //   parentName.value = data.typeName;
  // }
  formRef.value?.resetFields();
  formData.typeCode = '';
  formData.typeName = '';
  formData.equipType = data.equipType;
  type.value = 'add';
  addLevel.value = level;
};
const editGroup = async(data: IgetTreeSpace.Data) => {
  dialogVisible.value = true;
  curNode.value = data;
  formData.typeCode = data.typeCode;
  formData.typeName = data.typeName;
  type.value = 'edit';
};
const submitGroup = async() => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    if (type.value === 'add') {
      const res = await apiEquipmentTypeObj.postAddEquipType({
        // id: curNode.value?.id,
        parentId: addLevel.value === 'self' ? curNode.value?.parentId : curNode.value?.typeId,
        typeName: formData.typeName,
        typeCode: formData.typeCode,
        equipType: formData.equipType
      });
    } else if (type.value === 'edit') {
      const res = await apiEquipmentTypeObj.postUpdateEquipType({
        typeId: curNode.value?.typeId,
        typeName: formData.typeName,
        parentId: curNode.value?.parentId,
        typeCode: formData.typeCode,
        equipType: formData.equipType
      });
    }
    getIndicatorGroupTree();
    emit('updated');
    cancel();
  }
};

const cancel = () => {
  formRef.value?.resetFields();
  dialogVisible.value = false;
};

const deleteGroup = async(row: IgetTreeSpace.Data) => {
  await HlMessageBox.confirm(`您确认删除[${row.typeName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
    type: 'success',
  });
  await apiEquipmentTypeObj.deleteDeleteEquipType(row.typeId);
  getIndicatorGroupTree();
};

getIndicatorGroupTree();

const openDialog = () => {
  typeDialogVisible.value = true;
};

defineExpose({ openDialog });
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
