<template>
  <hl-dialog
    :model-value="true"
    class="md-dialog"
    width="480px"
    :title="`${isEdit ? '编辑' : '新增'}参数`"
    @close="close"
    :close-on-click-modal="false"
    borderless
  >
    <hl-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      class="w-full"
      style="width: 424px;">
      <hl-form-item class="w-full" label="参数名称" prop="paramName">
        <hl-input v-model="formData.paramName" block placeholder="请输入参数名称" show-word-limit maxlength="50"></hl-input>
      </hl-form-item>
      <hl-form-item class="w-full" label="参数类型" prop="paramTypeId">
        <hl-select v-model="formData.paramTypeId" block style="height: 32px;" placeholder="请选择参数类型" @change="selectionChange(0)">
          <hl-option v-for="option in dictObj" :key="option.paramTypeId" :label="option.paramTypeName" :value="option.paramTypeId" />
        </hl-select>
        <hl-group
          v-if="formData.paramTypeId"
          class="p-t-xs p-b-lg p-x-lg bg-light radius-md w-full" align="items-top" dir="vertical" gap="var(--sm)" full="full-x">
          <hl-form-item
            v-if="currentOptions.paramUseList"
            class="w-full" label="参数用途"
            prop="paramUseId">
            <hl-select
              v-model="formData.paramUseId"
              @change="selectionChange(1)"
              block style="height: 32px;" placeholder="请选择参数用途">
              <hl-option
                v-for="option in currentOptions.paramUseList"
                :key="option.paramUseId"
                :label="option.paramUseName"
                :value="option.paramUseId" />
            </hl-select>
          </hl-form-item>
          <hl-form-item
            v-if="currentOptions.paramSubUseList"
            class="w-full" label="参数子用途"
            prop="paramSubUseId">
            <hl-select
              v-model="formData.paramSubUseId"
              block style="height: 32px;" placeholder="请选择参数子用途">
              <hl-option
                v-for="option in currentOptions.paramSubUseList"
                :key="option.paramSubUseId"
                :label="option.paramSubUseName"
                :value="option.paramSubUseId" />
            </hl-select>
          </hl-form-item>
          <hl-form-item
            v-if="currentTimeConditionOptions.length"
            class="w-full" label="时间条件"
            prop="timeCondition">
            <hl-select v-model="formData.timeCondition" block style="height: 32px;" placeholder="请选择时间条件">
              <hl-option
                v-for="option in currentTimeConditionOptions"
                :key="option.timeCondition"
                :label="option.timeConditionName"
                :value="option.timeCondition" />
            </hl-select>
          </hl-form-item>
        </hl-group>
      </hl-form-item>
      <hl-form-item class="w-full" label="参数说明">
        <hl-input v-model="formData.paramDesc" native-type="textarea" block placeholder="请输入参数说明" show-word-limit maxlength="500"></hl-input>
      </hl-form-item>
    </hl-form>

    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="close">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="ok">确 定</hl-button>
      </span>
    </template>

  </hl-dialog>
</template>
<script lang="ts" setup>

import { onMounted, computed, reactive, ref } from 'vue';
import { Indexable } from 'fx-front-utils';
import { apiTemplateParamsManagementObj as api } from '@/apis/modules/tpl-params-manage/list';
import { IgetGetParamTypeDictSpace } from '@/apis/modules/tpl-params-manage/list/model';

const props = defineProps({
  id: {
    type: String
  },
  paramGroupId: {
    type: String
  }
});

const emit = defineEmits(['ok', 'close']);

const id = computed(() => props.id);
const isEdit = computed(() => !!id.value);
const dictObj = ref();
const formRef = ref();

const formData = reactive<Indexable<string>>({
  paramId: '',
  paramName: '',
  paramTypeId: '',
  paramUseId: '',
  paramSubUseId: '',
  timeCondition: '',
  paramDesc: ''
});

const isValidName = (rule: any, value: string, callback: any) => {
  // const reg = /^[\u4e00-\u9fa5a-zA-Z0-9()（）[\]-【】_.——/-]+$/g;
  const reg = /^[\u4e00-\u9fa5a-zA-Z0-9()（）[\]\-【】_——-]+$/g;
  if (!reg.test(value)) {
    callback(new Error('仅可输入中文、字符、数字、小括号、中括号、下划线、连接符'));
  } else {
    callback();
  }
};
const rules = {
  paramName: [
    { required: true, message: '请填写参数名称', trigger: ['blur', 'change'] },
    { validator: isValidName, trigger: 'blur' },
  ],
  paramTypeId: [{ required: true, message: '请选择参数类型', trigger: ['blur', 'change'] }],
  paramUseId: [{ required: true, message: '请选择参数用途', trigger: ['blur', 'change'] }],
  paramSubUseId: [{ required: true, message: '请选择参数子用途', trigger: ['blur', 'change'] }],
  timeCondition: [{ required: true, message: '请选择时间条件', trigger: ['blur', 'change'] }]
};

const currentOptions = computed(() => {
  if (formData.paramTypeId && dictObj.value) {
    return dictObj.value.find((item: IgetGetParamTypeDictSpace.Data) => item.paramTypeId === formData.paramTypeId);
  }
  return {};
});

const currentTimeConditionOptions = computed(() => {
  if (Object.keys(currentOptions.value).length && currentOptions.value.paramUseList) {
    const paramUse = currentOptions.value.paramUseList.find(item => item.paramUseId === formData.paramUseId);
    if (paramUse) {
      return paramUse.timeConditionList;
    }
    return [];
  }
  return [];
});

const selectionChange = (count?: number) => {
  const keyArr = ['paramUseId', 'paramSubUseId', 'paramSubUseName', 'timeCondition', 'timeConditionName'];
  let resetArr = null;
  if (!count) {
    resetArr = keyArr;
  } else {
    resetArr = keyArr.slice(count);
  }
  resetArr.forEach(key => {
    formData[key] = '';
    console.log(key);
  });
};

const getParamsTypeDict = async() => {
  const res = await api.getGetParamTypeDict();
  dictObj.value = res.data;
};

const ok = async() => {
  const isValid = await formRef.value.validate();
  if (!isValid) return;
  if (props.id) {
    formData.paramId = props.id;
  }
  formData.paramGroupCode = props.paramGroupId!;
  if (isEdit.value) {
    await api.postUpdate(formData);
  } else {
    await api.add(formData);
  }
  emit('ok');
};

const close = () => {
  emit('close');
};

getParamsTypeDict();

onMounted(async() => {
  if (isEdit.value) {
    const { data } = await api.getDetail(
      id.value as string
    );
    Object.assign(formData, data);
  }
});

</script>
