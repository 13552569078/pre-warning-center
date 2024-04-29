<template>
  <hl-dialog
    :model-value="true"
    class="md-dialog"
    width="700px"
    :title="`${id ? '编辑' : '添加' }设施类型`"
    @close="$emit('cancel')"
  >
    <hl-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :label-position="['items-left', 'items-middle']"
    >
      <hl-form-item label="设施类型名称" prop="typeName">
        <hl-input
          v-model="formData.typeName"
          placeholder="请输入设施类型名称"
          maxlength="20"
          show-word-limit
          block />
      </hl-form-item>
      <hl-form-item label="类型编号" prop="typeCode">
        <hl-input
          v-model="formData.typeCode"
          :disabled="!!id"
          placeholder="请输入类型编号"
          block
          maxlength="20"
          show-word-limit />
      </hl-form-item>
      <hl-form-item label="上级类型" v-if="hasParent">
        <!-- <span class="font-bold">{{ parentDisplayLabel ?? formData.parentTypeName }}</span> -->
        <hl-input
          :value="parentDisplayLabel ?? formData.parentTypeName"
          disabled
          block />
      </hl-form-item>
      <hl-form-item label="是否叶子节点" prop="leafNode">
        <hl-checkbox v-model="formData.leafNode" true-label="1" false-label="0">是</hl-checkbox>
      </hl-form-item>
    </hl-form>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="$emit('cancel')">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" :loading="isLoading" @click="ok">{{ id ? '保存' : '确定' }}</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { computed, onMounted, PropType, reactive, ref } from 'vue';
import { FormInstance } from 'hongluan-ui';

import { apiFacilityTypeObj as api } from '@/apis/modules/facility-type';

import type { IgetFacilityTreeSpace } from '@/apis/modules/facility-type/model';

const props = defineProps({
  id: String,
  hasParent: Boolean,
  parent: Object as PropType<IgetFacilityTreeSpace.Data>,
  isTopLevel: {
    type: Boolean,
    default: true,
  }
});
const emit = defineEmits(['cancel', 'ok']);

const isLoading = ref(false);
const formRef = ref<FormInstance>();
const formData = reactive({
  typeName: '',
  typeCode: '',
  parentTypeName: '',
  leafNode: '0'
});

const parentDisplayLabel = computed(() => {
  return props.parent ? props.parent.typeName : undefined;
});

const rules = {
  typeName: [
    { required: true, message: '设施类型名称不能为空' },
    {
      min: 1,
      max: 20,
      message: '长度小于20个字符',
    }
  ],
  typeCode: [
    { required: true, message: '类型编号不能为空' },
    {
      min: 1,
      max: 20,
      message: '长度小于20个字符',
    },
  ]
};

const ok = async() => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    isLoading.value = true;
    let result, response;

    try {
      // 编辑
      if (props.id) {
        result = formData;
        await api.modify(result);
      } else {
        // 新建
        result = Object.assign({}, formData, {
          parentTypeCode: props.parent?.typeCode === '-1' ? '0' : (props.parent?.typeCode ?? '0')
        });
        response = await api.add(result);
      }
    } finally {
      isLoading.value = false;
    }
    emit('ok', props.id ? result : response?.data);
  }
};

onMounted(async() => {
  if (props.id) {
    const detailResult = await api.getDetail(props.id);
    detailResult.data.leafNode = `${detailResult.data.leafNode}`;
    Object.assign(formData, detailResult.data);
  }
  console.log(props.parent);
});

</script>
