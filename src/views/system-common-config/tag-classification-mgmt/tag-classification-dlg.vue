<template>
  <hl-dialog :model-value="true" class="md-dialog" width="460px" :title="`${id ? '编辑' : '添加'}标签分类`" @close="$emit('cancel')" borderless>
    <hl-form ref="formRef" :model="formData" :rules="rules" :label-position="['items-left', 'items-middle']" gap="var(--lg)" item-gap="var(--lg2)">
      <hl-form-item label="分类标识" prop="tagCode">
        <hl-input v-model="formData.tagCode" placeholder="请输入分类标识" maxlength="20" show-word-limit block :disabled="!!$props.id" />
      </hl-form-item>
      <hl-form-item label="分类名称" prop="tagName">
        <hl-input v-model="formData.tagName" placeholder="请输入分类名称" maxlength="20" show-word-limit block />
      </hl-form-item>
      <hl-form-item label="描述">
        <hl-input v-model="formData.tagDesc" native-type="textarea" placeholder="请输入描述" maxlength="500" show-word-limit block />
      </hl-form-item>
    </hl-form>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="$emit('cancel')">取消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="ok">{{ id ? '保存' : '确定' }}</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { FormInstance } from 'hongluan-ui';
import { apiTagClassificationObj } from '@/apis/modules/tag';
import { isValidName } from '@/common';

const emit = defineEmits(['cancel', 'ok']);

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
});

const formRef = ref<FormInstance>();
const formData = reactive({
  tagCode: '',
  tagName: '',
  tagDesc: ''
});

const isValidtagCode = async(rule: any, value: string, callback: (error?: Error) => void) => {
  const res = await apiTagClassificationObj.getCheckCodeIfExist(value, props.id!);
  res.data ? callback(new Error('分类标识已存在，请更换')) : callback();
};
const isValidtagName = async(rule: any, value: string, callback: (error?: Error) => void) => {
  const res = await apiTagClassificationObj.getCheckNameIfExist(value, props.id!);
  res.data ? callback(new Error('分类名称已存在，请更换')) : callback();
};
const getDetail = async() => {
  const { data } = await apiTagClassificationObj.getDetail(props.id);
  Object.assign(formData, data);
};
const ok = async() => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    props.id ? await apiTagClassificationObj.postUpdate(Object.assign({ tagInfoId: props.id }, formData)) : await apiTagClassificationObj.add(formData);
    emit('ok');
  }
};

onMounted(async() => {
  props.id && getDetail();
});

const rules = {
  tagCode: [
    { required: true, message: '分类标识不能为空' },
    {
      min: 1,
      max: 20,
      message: '长度小于20个字符'
    },
    { validator: isValidName, trigger: 'blur' },
    { validator: isValidtagCode, trigger: 'blur' }
  ],
  tagName: [
    { required: true, message: '分类名称不能为空' },
    {
      min: 1,
      max: 20,
      message: '长度小于20个字符'
    },
    { validator: isValidName, trigger: 'blur' },
    { validator: isValidtagName, trigger: 'blur' }
  ]
};
</script>
