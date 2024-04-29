<template>
  <hl-dialog
    :model-value="true"
    class="md-dialog"
    width="460px"
    :title="`${id ? '编辑' : '添加' }计量单位`"
    @close="$emit('cancel')"
    borderless
  >
    <hl-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :label-position="['items-left', 'items-middle']"
      gap="var(--xl)" item-gap="var(--lg2)"
    >
      <!-- <hl-group full gap="var(--lg)"> -->
        <hl-form-item label="计量单位名称" prop="measureUnitCode">
          <hl-input v-model.trim="formData.measureUnitCode" placeholder="请输入计量单位名称" maxlength="20" show-word-limit block />
        </hl-form-item>
        <hl-form-item label="显示名称" prop="measureUnitName">
          <hl-input v-model.trim="formData.measureUnitName" placeholder="请输入显示名称" maxlength="20" show-word-limit block />
        </hl-form-item>
      <!-- </hl-group> -->
      <hl-form-item label="描述">
        <hl-input v-model.trim="formData.desc" native-type="textarea" placeholder="请输入描述" maxlength="500" show-word-limit block />
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
import { onMounted, PropType, reactive, ref } from 'vue';
import { FormInstance } from 'hongluan-ui';
import { apiMeasureUnitObj } from '@/apis/modules/measure-unit';

const props = defineProps({
  id: Number,
});
const emit = defineEmits(['cancel', 'ok']);

const formRef = ref<FormInstance>();
const formData = reactive({
  measureUnitCode: '',
  measureUnitName: '',
  desc: ''
});

// 全局唯一判断 - 单位名称
const isValidUnitCode = async(rule: any, value: string, callback: (error?: Error) => void) => {
  const res = await apiMeasureUnitObj.getFindMeasureUnitCodeVerify(value, props.id!);
  if (!res.data) {
    callback(new Error('单位名称已存在，请更换'));
  }
  callback();
};

// 全局唯一判断 - 单位显示
const isValidUnitName = async(rule: any, value: string, callback: (error?: Error) => void) => {
  const res = await apiMeasureUnitObj.getFindMeasureUnitNameVerify(value, props.id!);
  if (!res.data) {
    callback(new Error('单位显示名称已存在，请更换'));
  }
  callback();
};

const rules = {
  measureUnitCode: [
    { required: true, message: '计量单位名称不能为空' },
    {
      min: 1,
      max: 100,
      message: '长度小于100个字符',
    },
    { validator: isValidUnitCode, trigger: 'blur' }
  ],
  measureUnitName: [
    { required: true, message: '显示名称不能为空' },
    {
      min: 1,
      max: 20,
      message: '长度小于20个字符',
    },
    { validator: isValidUnitName, trigger: 'blur' }
  ]
};

const ok = async() => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    if (props.id) {
      await apiMeasureUnitObj.postModifyMeasureUnit(Object.assign({ tagId: props.id }, formData));
    } else {
      await apiMeasureUnitObj.postMeasureUnit(formData);
    }
    emit('ok');
  }
};

onMounted(async() => {
  if (props.id) {
    const result = await apiMeasureUnitObj.getFindMeasureUnitDetail(props.id);
    Object.assign(formData, result.data);
  }
});

</script>
