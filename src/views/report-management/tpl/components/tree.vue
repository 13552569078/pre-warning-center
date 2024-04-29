<template show-source>
  <hl-panel class="h-full w-full" borderless inner-scroll full-body>
    <template #header>
      <hl-input v-model="searchText" placeholder="输入分组关键字" block fill maxlength="20">
        <template #suffix>
          <two-search />
        </template>
      </hl-input>
    </template>
    <hl-scrollbar class="no-padding-top-bottom">
      <hl-tree ref="reportTreeRef" :data="reportTplData" :props="defaultProps"
        :default-expanded-keys="defaultExpandedKeys" node-key="templateTypeId" gap="0" :expand-on-click-node="false"
        :highlight-current="true" :filter-node-method="filterNode" @node-click="handleNodeClick"
        default-expand-all
        >
        <template #default="{ node, data }">
          <hl-group full gap="var(--xs)" align="items-between items-middle"
            :class="['event-type-label', isHovering(node.id) ? 'is-hovering' : '']" @mouseenter="enterTreeNode(node.id)"
            @mouseleave="leaveTreeNode(node.id)">
            <hl-group class="tree-node-label ellipsis static items-middle"
              :style="`width:${node.level <= 1 ? '160' : '150'}px`">
              <hb-text-overflow method="length" :length="14" effect="light" class="tree-start">
                <span>{{ data.templateTypeName }}</span>
              </hb-text-overflow>
            </hl-group>
            <hl-dropdown class="static more-actions">
              <hl-icon @click.stop type="primary">
                <fill-edit />
              </hl-icon>
              <template #dropdown>
                <hl-dropdown-menu @mouseenter="enterTreeNode(node.id)" @mouseleave="leaveTreeNode(node.id)">
                  <hl-dropdown-item v-if="node.level" @click="addNextLevel(data, node)">添加下级</hl-dropdown-item>
                  <hl-dropdown-item v-if="node.level>1" @click="addSameLevel(data, node)">添加同级</hl-dropdown-item>
                  <hl-dropdown-item v-if="node.level>1" @click="edit(data, node)">编辑</hl-dropdown-item>
                  <hl-dropdown-item v-if="(!node.childNodes.length && node.level > 1) && data.isRefer === 0" @click="del(data, node)">删除</hl-dropdown-item>
                </hl-dropdown-menu>
              </template>
            </hl-dropdown>
          </hl-group>
        </template>
      </hl-tree>
    </hl-scrollbar>
  </hl-panel>

  <hl-dialog model-value="true" v-if="dialogVisible" class="md-dialog" width="400px" :title="`${isEdit ? '编辑' : '新增'}报告模板分组`" @close="dialogVisible = false"
    :close-on-click-modal="false">
    <hl-form ref="formRef" :model="formData" :rules="rules" :label-position="['items-left', 'items-middle']">
      <hl-form-item label="上级分组名称" prop="parentCodeName">
        <hl-input v-model="formData.parentCodeName" maxlength="20" show-word-limit block disabled />
      </hl-form-item>
      <hl-form-item label="分组名称" prop="templateTypeName">
        <hl-input v-model="formData.templateTypeName" placeholder="请输入分组名称" maxlength="20" show-word-limit block />
      </hl-form-item>
    </hl-form>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="dialogVisible = false">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="ok">{{ formData.templateTypeId ? '保存' : '确定' }}</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, reactive, nextTick } from 'vue';
import { HlTree } from 'hongluan-ui';
import { useHovering } from '@/hooks';
import { HlMessageBox } from 'hongluan-ui';
import { apiReportTreeObj } from '@/apis/modules/report-manage/report-tpl-manage/tree/index';
import { IgetTypeTreeSpace } from '@/apis/modules/report-manage/report-tpl-manage/tree/model';

const emit = defineEmits(['click']);

const formRef = ref();
const dialogVisible = ref(false);
const formData = reactive({
  templateTypeId: '', // 分组id
  templateTypeName: '', // 分组名称
  parentCode: '', // 父节点type
  parentCodeName: '', // 父节点Name
});
const rules = {
  // parentCodeName: [{ required: true, message: '未选中父节点', trigger: ['change', 'blur'] }],
  templateTypeName: [{ required: true, message: '请输入分组名称', trigger: ['change', 'blur'] }]
};

const searchText = ref('');
const isEdit = ref(false);
const currentId = ref();
const reportTreeRef = ref<InstanceType<typeof HlTree>>();

const reportTplData = ref<any[]>([]);
const defaultProps = {
  children: 'children',
  label: 'templateTypeName',
};
const defaultExpandedKeys = ref(['-1']);

const { enter: enterTreeNode, leave: leaveTreeNode, isHovering } = useHovering();

const filterNode = (value: string, data: IgetTypeTreeSpace.Data) => {
  if (!value) return true;
  return data.templateTypeId.indexOf(value) !== -1 || data.templateTypeName.indexOf(value) !== -1;
};
const handleNodeClick = (data: IgetTypeTreeSpace.Data, node: any) => {
  currentId.value = data.templateTypeId;
  emit('click', data);
};

const addNextLevel = async(data: IgetTypeTreeSpace.Data, node: any) => {
  formData.templateTypeId = '';
  formData.templateTypeName = '';
  formData.parentCode = data.templateTypeCode;
  formData.parentCodeName = data.templateTypeName;
  isEdit.value = false;
  dialogVisible.value = true;
};
const addSameLevel = async(data: IgetTypeTreeSpace.Data, node: any) => {
  formData.templateTypeId = '';
  formData.templateTypeName = '';
  formData.parentCode = node.level > 2 ? node.parent.data.templateTypeCode : '';
  formData.parentCodeName = node.level > 2 ? node.parent.data.templateTypeName : '全部';
  isEdit.value = false;
  dialogVisible.value = true;
};
const edit = async(data: IgetTypeTreeSpace.Data, node: any) => {
  formData.templateTypeId = data.templateTypeId;
  formData.templateTypeName = data.templateTypeName;
  formData.parentCode = node.level > 2 ? node.parent.data.templateTypeCode : '';
  formData.parentCodeName = node.level > 2 ? node.parent.data.templateTypeName : '全部';
  isEdit.value = true;
  dialogVisible.value = true;
};
const del = async(data: IgetTypeTreeSpace.Data, node: any) => {
  await HlMessageBox.confirm(`您确认删除${data.templateTypeName}吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
    type: 'success',
  });
  await apiReportTreeObj.deleteT(data.templateTypeId);
  // 刷新列表
  getData();
  dialogVisible.value = false;
};
const ok = async() => {
  await formRef.value.validate();
  console.log(formData);
  // 新增
  if (!formData.templateTypeId) await apiReportTreeObj.add(formData.templateTypeId, formData.templateTypeName, formData.parentCode);
  // 编辑
  if (formData.templateTypeId) await apiReportTreeObj.postUpdate(formData.templateTypeId, formData.templateTypeName, formData.parentCode);
  // 刷新列表
  getData();
  dialogVisible.value = false;
};

watch(searchText, val => {
  reportTreeRef.value?.filter(val);
});

const getData = async() => {
  const result = await apiReportTreeObj.getTypeTree();
  reportTplData.value.splice(0, reportTplData.value.length);
  reportTplData.value.push({
    templateTypeId: '-1',
    templateTypeName: '全部',
    children: result.data,
    templateTypeCode: '',
  });
  console.log(currentId.value, 999);
  nextTick(() => {
    if (currentId.value) {
      reportTreeRef.value?.setCurrentKey(currentId.value);
    }
  });
};

onMounted(async() => {
  await getData();
  reportTreeRef.value?.setCurrentKey('-1');
});

defineExpose({
  getData
});

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
