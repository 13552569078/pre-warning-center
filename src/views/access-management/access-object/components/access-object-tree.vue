<template show-source>
  <hl-panel
    class="h-full w-full"
    borderless
    inner-scroll
    full-body>
    <template #header>
      <hl-input v-model="searchText" placeholder="输入接入对象关键字" block fill maxlength="20">
        <template #suffix>
          <two-search />
        </template>
      </hl-input>
    </template>
    <hl-scrollbar class="no-padding-top-bottom" style="overflow-x: hidden;">
      <hl-tree
        ref="accessTreeRef"
        :data="accessData"
        :props="defaultProps"
        :default-expanded-keys="defaultExpandedKeys"
        node-key="accessSourceId"
        gap="0"
        :expand-on-click-node="false"
        :highlight-current="true"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        :default-expand-all="true"
        :highlight-current-row="true">
        <template #default="{ node, data }">
          <hl-group class="w-full" gap="var(--xs)" align="items-between items-center items-middle"  :class="['event-type-label', isHovering(node.id) ? 'is-hovering' : '']"
            @mouseenter="enterTreeNode(node.id)"
            @mouseleave="leaveTreeNode(node.id)">
            <span
              class="tree-node-label static"
              :style="`width:${node.level <= 1 ? '118' : '118'}px; display: flex;`"
            >
              <hb-text-overflow method="length" :length="10" effect="light" class="tree-start">
                <span>{{ data.accessSourceName }}</span>
              </hb-text-overflow>
            </span>
            <hl-button
              v-if="data.accessSourceId === -1"
              type="link"
              style="position: relative; right: calc(var(--xs) * 3);"
              @click="addNextLevel(data, node)">添加接入源</hl-button>
            <hl-dropdown class="m-r-sm static more-actions" v-if="node.level>ROOT_TREE_LEVEL">
              <hl-icon @click.stop type="primary">
                <fill-edit />
              </hl-icon>
              <template #dropdown>
                <hl-dropdown-menu @mouseenter="enterTreeNode(node.id)" @mouseleave="leaveTreeNode(node.id)">
                  <hl-dropdown-item v-if="node.level!==ROOT_TREE_LEVEL" @click="browse(data, node)">详情</hl-dropdown-item>
                  <hl-dropdown-item v-if="node.level!==ROOT_TREE_LEVEL" @click="edit(data, node)">编辑</hl-dropdown-item>
                  <hl-dropdown-item v-if="(node.level!==ROOT_TREE_LEVEL && !data.isRefer)" @click="del(data)">删除</hl-dropdown-item>
                </hl-dropdown-menu>
              </template>
            </hl-dropdown>
          </hl-group>
        </template>
      </hl-tree>
    </hl-scrollbar>
  </hl-panel>
  <!-- 接入源添加 -->
  <add-dlg
    v-if="dialogVisible"
    :data="formData"
    @close="dialogVisible = false"
    @update="getData"/>

  <detail-dlg
    v-if="detailDialogVisible"
    :data="formData"
    @close="detailDialogVisible = false"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, reactive, nextTick } from 'vue';
import { HlTree, FormInstance, HlMessageBox } from 'hongluan-ui';
import { isValidName } from '@/common';
import { useHovering } from '@/hooks';
import { apiAccessObjectObj } from '@/apis/modules/access-object';
import { IpostGetAccessSourceGroupSpace } from '@/apis/modules/access-object/model';
import { getListDict, ACCESS_TYPE_NAMES, ROOT_TREE_LEVEL } from '../utils';
import addDlg from './add.vue';
import detailDlg from './detail.vue';

const emit = defineEmits(['click', 'refresh']);

const searchText = ref('');
const accessTreeRef = ref<InstanceType<typeof HlTree>>();
const formRef = ref<FormInstance>();

const accessData = ref<any[]>([]);
const accessDict = ref<any[]>([]);
const accessSourceId = ref('');
const defaultProps = {
  children: 'childrens',
  label: 'accessSourceName',
};
const defaultExpandedKeys = ref(['-1']);
const dialogVisible = ref(false);
const detailDialogVisible = ref(false);
const action = ref('新增');
const formData = reactive({
  accessSourceId: '',
  accessSourceType: '',
  accessSourceName: '',
});

const {
  enter: enterTreeNode,
  leave: leaveTreeNode,
  isHovering,
} = useHovering();

const filterNode = (
  value: string,
  data: IpostGetAccessSourceGroupSpace.Data
) => {
  if (!value) return true;
  return data.accessSourceName.indexOf(value) !== -1;
};

const handleNodeClick = (
  data: IpostGetAccessSourceGroupSpace.Data,
  node: any
) => {
  console.log(data, node);
  accessSourceId.value = data.accessSourceId;
  emit('click', { data, node, level: node.level });
};
const addNextLevel = (data: IpostGetAccessSourceGroupSpace.Data, node: any) => {
  dialogVisible.value = true;
  action.value = '添加';
  formData.accessSourceType = data.accessSourceType;
  formData.accessSourceName = '';
  formData.accessSourceId = '';
};
const del = async(row: IpostGetAccessSourceGroupSpace.Data) => {
  await HlMessageBox.confirm(
    `您确认删除[${row.accessSourceName}]吗?`,
    '删除提示',
    {
      confirmButtonText: '确定',
      confirmButtonType: 'danger',
      cancelButtonText: '取消',
    }
  );
  await apiAccessObjectObj.postDeleteAccessSource(row.accessSourceId);
  getData();
  if (accessSourceId.value === row.accessSourceId) {
    emit('refresh');
  }
};
const edit = (data: IpostGetAccessSourceGroupSpace.Data, node: any) => {
  dialogVisible.value = true;
  Object.assign(formData, data);
};

const browse = (data: IpostGetAccessSourceGroupSpace.Data, node: any) => {
  detailDialogVisible.value = true;
  Object.assign(formData, data);
};

watch(searchText, val => {
  dialogVisible.value = false;
  accessTreeRef.value?.filter(val);
});

const getData = async() => {
  const { data } = await apiAccessObjectObj.postGetAccessSourceGroup('');
  accessData.value.splice(0, accessData.value.length);
  // 处理后端得 map数据
  const accessArr: any[] = [];
  Object.keys(data).forEach((key: string, index: number) => {
    accessArr.push({
      accessSourceId: index,
      accessSourceType: key,
      accessSourceName: (ACCESS_TYPE_NAMES as Record<string, any>)[key],
      childrens: (data as any)[key],
    });
  });
  const tempData = [{
    accessSourceId: -1,
    accessSourceName: '全部',
    childrens: accessArr
  }];
  accessData.value = tempData;
  if (accessSourceId.value) {
    nextTick(() => {
      accessTreeRef.value?.setCurrentKey(accessSourceId.value);
    });
  }
};
const ok = async() => {
  await formRef.value?.validate();
  formData.accessSourceId
    ? await apiAccessObjectObj.postUpdateAccessSource(formData)
    : await apiAccessObjectObj.postAddAccessSource(formData);
  resetForm();
  getData();
};
const resetForm = () => {
  formRef.value?.resetFields();
  dialogVisible.value = false;
};

onMounted(async() => {
  accessDict.value = await getListDict();
  await getData();
  nextTick(() => {
    accessTreeRef.value?.setCurrentKey(-1);
  });
});

const rules = {
  accessSourceType: [
    { required: true, message: '接入源类型不能为空', trigger: ['blur'] },
  ],
  accessSourceName: [
    { required: true, message: '接入源名称不能为空', trigger: ['blur'] },
    { validator: isValidName, trigger: 'blur' },
  ],
};

defineExpose({
  getData
});

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
