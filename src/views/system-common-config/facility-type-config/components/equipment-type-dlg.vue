<template>
  <hl-dialog
    :model-value="true"
    class="md-dialog"
    width="700px"
    :title="`${id ? '编辑' : '添加' }设备类型`"
    @close="$emit('cancel')"
  >
    <hl-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :label-position="['items-left', 'items-middle']"
    >
      <hl-form-item label="设备类型名称" prop="typeName">
        <hl-input
          v-model="formData.typeName"
          placeholder="请输入设备类型名称"
          maxlength="20"
          show-word-limit
          block />
      </hl-form-item>
      <hl-form-item label="设备类型编号" prop="typeCode">
        <hl-input
          v-model="formData.typeCode"
          :disabled="!!id"
          placeholder="请输入设备类型编号" block />
      </hl-form-item>
      <hl-form-item label="设施类型" prop="facilityTypeCode">
        <!-- {{ currentFacility.typeName }} -->
        <hl-input
          :value="currentFacility.typeName"
          disabled
          block />
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
import { apiEquipmentTypeObj as api } from '@/apis/modules/equipment-type';
import { FacilitiesType } from '@/views/monitoring-config/components/index';

import type { IgetFacilityTreeSpace } from '@/apis/modules/facility-type/model';

const props = defineProps({
  id: String,
  currentFacility: {
    type: Object,
    default: () => { return {}; }
  }
});
const emit = defineEmits(['cancel', 'ok']);

const isLoading = ref(false);
const formRef = ref<FormInstance>();
const formData = reactive({
  typeName: '',
  typeCode: '',
  facilityTypeCode: props.currentFacility.typeCode
});

const rules = {
  typeName: [
    { required: true, message: '设备类型名称不能为空' },
    {
      min: 1,
      max: 20,
      message: '长度小于20个字符',
    }
  ],
  typeCode: [
    { required: true, message: '设备类型编号不能为空' },
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
        await api.postUpdate(formData.typeCode, formData.typeName, formData.facilityTypeCode);
      } else {
        // 新建
        response = await api.add(formData.typeCode, formData.typeName, formData.facilityTypeCode);
      }
    } finally {
      isLoading.value = false;
    }
    emit('ok', props.id ? result : response?.data);
  }
};

onMounted(async() => {
  if (props.id) {
    const detailResult = await api.postDetail(props.id);
    Object.assign(formData, detailResult.data);
  }
});

</script>
