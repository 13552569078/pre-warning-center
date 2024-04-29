<template>
  <hl-panel
    class="h-full w-full"
    borderless
    inner-scroll
    full-body>
    <template #header>
      <hl-group align="items-between items-middle" class="w-full">
        <hl-group><h4>主体类型</h4></hl-group>
        <hl-button type="primary" effect="light" @click="openDialogs('新增', 'add')" v-city-life-line
          >添加类型
          <template #icon>
            <hl-icon><two-plus /></hl-icon>
          </template>
        </hl-button>
      </hl-group>
    </template>
    <hl-scrollbar class="no-padding-top-bottom">
      <hl-tree
        ref="tree"
        class="custom-hilight custom-tree-node"
        :data="listDataTree"
        :props="defaultProps"
        default-expand-all
        @node-click="changeActive"
        node-key="id"
        :expand-on-click-node="false"
        :highlight-current="true">
        <template #default="{ data }">
          <hl-group full gap="var(--xs)" class="w-full hover-wrap" align="items-between items-middle">
            <hb-text-overflow method="length" :length="11" effect="light" class="w-full">
              <span :class="activeId === data.id ? 'text-primary' : null">{{ data.regionTypeName }}</span>
            </hb-text-overflow>
            <hl-group gap="var(--md)" class="static hover-show" v-if="data.id !== -1" v-city-life-line>
              <hl-icon class="text-link" @click="edit(data)" color="#5E6278"><FillEdit /></hl-icon>
              <hl-icon v-if="!data.isRefer" class="text-link m-l-md" @click="remove(data)" color="#5E6278"><FillDelete /></hl-icon>
            </hl-group>
          </hl-group>
        </template>
      </hl-tree>
    </hl-scrollbar>

  </hl-panel>

  <!-- 新增类型 -->
  <hl-dialog v-model="dialogVisible" width="450px" :close-on-click-modal="false" borderless :title="`${ dialogTitle }类型`">
    <hl-form ref="formRef" :model="form" :rules="formRules" :label-position="['items-left', 'items-left']" gap="var(--lg)" item-gap="var(--lg2)">
      <hl-form-item label="类型名称" prop="regionTypeName">
        <hl-input v-model.trim="form.regionTypeName" placeholder="请输入类型名称" maxlength="20" show-word-limit block />
      </hl-form-item>
      <hl-form-item label="描述" prop="description">
        <hl-input v-model.trim="form.description" placeholder="请输入描述" native-type="textarea" rows="3" block maxlength="500" show-word-limit />
      </hl-form-item>
    </hl-form>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="resetForm">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="submitForm">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import { HlMessageBox, HlMessage } from 'hongluan-ui';
import { apiSubjectTypeObj } from '@/apis/modules/element-subject-type';
import { IlistSpace } from '@/apis/modules/element-subject-type/model';
import { cloneDeep } from 'lodash-es';

const emit = defineEmits(['upActiveId']);

interface ListDataTree {
  id: number | string,
  regionTypeName: string,
  regionTypeCode?: string,
  children: IlistSpace.Data[]
}

const defaultProps = {
  children: 'children',
  label: 'regionTypeName'
};

const tree = ref();
const listData = ref<IlistSpace.Data[]>([]);
const listDataTree = ref<ListDataTree[]>([]);
const dialogVisible = ref(false);
const dialogTitle = ref('新增');
const formRef = ref();
const formRules = {
  regionTypeName: [
    { required: true, message: '请输入类型名称', trigger: ['change', 'blur'] },
    {
      max: 50,
      message: '长度不超过50个字符',
      trigger: ['change', 'blur']
    }
  ],
  description: [
    {
      max: 500,
      message: '长度不超过500个字符',
      trigger: ['change', 'blur']
    }
  ]
};
const activeId = ref<number | string>('');
const formType = ref('add');
const formTemp = {
  regionTypeName: '',
  regionTypeCode: '',
  regionNumber: '',
  description: '',
  id: ''
};
const form = ref(cloneDeep(formTemp));

const openDialogs = (title: string, type: string) => {
  dialogVisible.value = true;
  dialogTitle.value = title;
  if (type === 'add') {
    form.value = cloneDeep(formTemp);
  }
  formType.value = type;
  formRef.value.clearValidate();
};
const submitForm = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      formDone();
    } else {
      console.log('error submit!!');
      return false;
    }
  });
};
const resetForm = () => {
  form.value = cloneDeep(formTemp);
  dialogVisible.value = false;
};
const changeActive = (data: ListDataTree) => {
  activeId.value = data.regionTypeCode!;
  emit('upActiveId', activeId.value);
};
const edit = (data: IlistSpace.Data) => {
  form.value = { ...data };
  openDialogs('编辑', 'edit');
};
const remove = async(data: IlistSpace.Data) => {
  await HlMessageBox.confirm(`您确认删除[${data.regionTypeName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
    type: 'success'
  });
  await apiSubjectTypeObj.deleteM(data.id);
  HlMessage.success('删除成功');
  getList();
};
const formDone = async() => {
  formRef.value.validate(async(valid: boolean) => {
    if (valid) {
      formType.value === 'add' ? await apiSubjectTypeObj.add(form.value.id, form.value.regionTypeName, form.value.description) : await apiSubjectTypeObj.postUpdate(form.value.id, form.value.regionTypeName, form.value.description);
      resetForm();
      getList();
    } else {
      console.log('error submit!!');
      return false;
    }
  });
};
const getList = async() => {
  const { data } = await apiSubjectTypeObj.list();
  listData.value = data;
  const tempData = [{
    id: -1,
    regionTypeName: '全部',
    children: data
  }];
  listDataTree.value = tempData;
  tree.value.setCurrentKey(activeId);
};

defineExpose({ getList });

onMounted(async() => {
  await getList();
  activeId.value = -1;
  nextTick(() => {
    tree.value.setCurrentKey(-1);
  });
});

</script>
