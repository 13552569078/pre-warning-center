<template>
<hl-dialog
      v-model="dialogVisible"
      width="calc(var(--xxs) * 100)"
      :placement="'center'"
    >
      <template #header>
        <h4>保存模型</h4>
      </template>
      <hl-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :label-position="['items-left', 'items-middle']"
      @submit.prevent
    >
      <hl-form-item label="模型名称" prop="analysisModelName">
        <hl-input
          v-model.trim="formData.analysisModelName"
          placeholder="请输入模型名称"
          maxlength="20"
          show-word-limit
          block />
      </hl-form-item>
      </hl-form>
      <template #footer>
        <span class="dialog-footer">
          <hl-button @click="cancel">取 消</hl-button>
          <hl-button type="primary" class="m-l-md" @click="submitName">确 定</hl-button>
        </span>
      </template>
    </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, watch, nextTick, reactive } from 'vue';
import { HlMessageBox } from 'hongluan-ui';
import { apiTargetTypeControllerObj } from '@/apis/modules/target-type-controller';
import { IlistSpace } from '@/apis/modules/analysis-model/model';

const emit = defineEmits(['saveName']);

const dialogVisible = ref(false);
const type = ref('add');
const curNode = ref<IlistSpace.Data>();
const formRef = ref();
const formData = reactive({
  analysisModelName: ''
});

const rules = {
  analysisModelName: [
    { required: true, message: '请输入模型名称', trigger: ['change', 'blur'] },
    {
      min: 0,
      max: 20,
      message: '长度小于20个字符',
    }]
};

const addName = async(data: IlistSpace.Data) => {
  dialogVisible.value = true;
  formData.analysisModelName = '';
  type.value = 'add';
};
const editName = async(data: IlistSpace.Data) => {
  dialogVisible.value = true;
  formData.analysisModelName = data.analysisModelName;
  type.value = 'edit';
};
const submitName = async() => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    emit('saveName', formData.analysisModelName);
  }
};

const cancel = () => {
  formRef.value?.resetFields();
  dialogVisible.value = false;
};

defineExpose({
  addName,
  editName,
  cancel
});
</script>
