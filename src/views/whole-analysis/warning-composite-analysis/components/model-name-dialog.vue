<template>
  <hl-dialog v-model="dialogVisible" width="calc(var(--xxs) * 100)" :placement="'center'">
    <template #header>
      <h4>保存模型</h4>
    </template>
    <hl-form ref="formRef" :model="formData" :rules="rules" :label-position="['items-left', 'items-middle']" @submit.prevent>
      <hl-form-item label="模型名称" prop="analysisModelName">
        <hl-input v-model.trim="formData.analysisModelName" placeholder="请输入模型名称" maxlength="20" show-word-limit block />
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
import { ref, reactive } from 'vue';
import { apiWarningWholeAnalysisObj } from '@/apis/modules/whole-analysis/warning-whole-analysis';

const emit = defineEmits(['saveName']);

const dialogVisible = ref(false);
const formRef = ref();
const formData = reactive({
  analysisModelName: ''
});

const isValidModelName = async(rule: any, value: string, callback: (error?: Error) => void) => {
  // 业务逻辑 重命名为新增
  const res = await apiWarningWholeAnalysisObj.getCheckNameIfExist(value, '');
  res.data ? callback(new Error('模型名称已存在，请更换')) : callback();
};
const show = () => {
  dialogVisible.value = true;
  formData.analysisModelName = '';
};
const cancel = () => {
  formRef.value?.resetFields();
  dialogVisible.value = false;
};
const submitName = async() => {
  await formRef.value?.validate();
  emit('saveName', formData.analysisModelName);
};

const rules = {
  analysisModelName: [
    { required: true, message: '请输入模型名称', trigger: ['change', 'blur'] },
    { validator: isValidModelName, trigger: 'blur' },
    {
      min: 0,
      max: 20,
      message: '长度小于20个字符'
    }
  ]
};

defineExpose({
  cancel,
  show
});
</script>
