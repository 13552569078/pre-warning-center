<template>
  <hl-dialog :model-value="true" class="md-dialog" width="460px" title="标签维护" @close="$emit('cancel')">
    <hl-form ref="formRef" :model="formData" :label-position="['items-left', 'items-middle']">
      <hl-scrollbar max-height="350px">
        <hl-form-item :label="item.tagName" v-for="(item, index) in formData.form" :rules="rules" :key="index" :prop="'form.' + index + '.selfTagName'" class="m-r-xs m-b-md">
          <hl-input v-model="item.selfTagName" placeholder="请输入标签名称" maxlength="8" show-word-limit block />
        </hl-form-item>
      </hl-scrollbar>
    </hl-form>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="$emit('cancel')">取消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="ok">保存</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { FormInstance } from 'hongluan-ui';
import { isValidName } from '@/common';
import { apiWarningTagObj } from '@/apis/modules/warning-tag';
import { IgetTagDetailSpace } from '@/apis/modules/warning-tag/model';

const props = defineProps({
  alarmId: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['cancel', 'ok']);

const formRef = ref<FormInstance>();
const formData = reactive<{ form: IgetTagDetailSpace.Data[] }>({
  form: []
});

const ok = async() => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    await apiWarningTagObj.postSaveAlarmTagInfoParam(props.alarmId, formData.form);
    emit('ok');
  }
};
const rules = [
  {
    min: 1,
    max: 20,
    message: '长度小于20个字符',
    trigger: 'blur'
  },
  { validator: isValidName, trigger: 'blur' }
];
const getDetail = async() => {
  const result = await apiWarningTagObj.getTagDetail(props.alarmId);
  formData.form = result.data;
};

onMounted(async() => {
  await getDetail();
});
</script>
