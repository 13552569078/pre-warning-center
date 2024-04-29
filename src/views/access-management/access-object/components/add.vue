<template>
  <!-- 接入对象 -->
  <hl-dialog v-model="isShowDialog" class="md-dialog" width="700px" :title="`${action}接入源`" :close-on-click-modal="false" @close="$emit('close')" borderless>
    <hl-form ref="formRef" :model="formData" :rules="mainFormRules" :label-position="['items-left', 'items-middle']" gap="var(--lg)" item-gap="var(--lg2)">
      <hl-form-item label="接入源名称" prop="accessSourceName">
        <hl-input v-model="formData.accessSourceName" maxlength="20" show-word-limit block placeholder="请输入接入源名称" />
      </hl-form-item>
      <hl-form-item label="数据类型" prop="sourceType">
          <hl-radio-group
            v-model="formData.sourceType"
            dir="vertical"
            gap="var(--xl)">
            <hl-group gap="var(--xl)">
              <span class="item-label">关系数据库</span>
              <hl-radio :label="DATA_SOURCE_TYPE.MYSQL">mysql</hl-radio>
            </hl-group>
            <hl-group gap="var(--xl)">
              <span class="item-label">接口</span>
              <hl-radio :label="DATA_SOURCE_TYPE.KAFKA">kafka</hl-radio>
              <hl-radio :label="DATA_SOURCE_TYPE.HTTP">http</hl-radio>
            </hl-group>
          </hl-radio-group>
      </hl-form-item>
    </hl-form>

    <hl-form
      v-if="formData.sourceType === DATA_SOURCE_TYPE.KAFKA"
      ref="subFormRef"
      :model="formDataKafka"
      :rules="subFormRules"
      class="m-t-lg"
      :label-position="['items-left', 'items-middle']" gap="var(--lg)" item-gap="var(--lg2)">
      <hl-form-item label="brokers" prop="brokers">
        <hl-input placeholder="请输入" maxlength="100" v-model="formDataKafka.brokers" show-word-limit block/>
      </hl-form-item>
    </hl-form>

    <hl-form
      ref="formEndRef"
      :model="formData"
      :label-position="['items-left', 'items-middle']"
      class="m-t-lg" gap="var(--lg)" item-gap="var(--lg2)">
      <hl-form-item label="描述" prop="accessSourceDesc">
        <hl-input native-type="textarea" v-model="formData.accessSourceDesc" maxlength="500" show-word-limit block placeholder="请输入接入源名称" />
      </hl-form-item>
    </hl-form>
    <hl-alert v-if="isLinkTestPassed === true" title="数据源测试连接成功" type="success" effect="light" show-icon class="m-t-md" :closable="false" />
    <hl-alert v-else-if="isLinkTestPassed === false" title="数据源测试连接失败" type="danger" effect="light" show-icon class="m-t-md" :closable="false" />
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="$emit('close')">取消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="check" :disabled="isLinkTestDisabled">验证</hl-button>
        <hl-button type="primary" class="m-l-md" @click="ok" :loading="loading" :disabled="!isLinkTestDisabled && !isLinkTestPassed">保存</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang='ts' setup>
import { ref, reactive, computed, watch } from 'vue';
import { FormInstance, HlMessageBox } from 'hongluan-ui';
import { apiAccessObjectObj as api } from '@/apis/modules/access-object';

const DATA_SOURCE_TYPE = {
  KAFKA: 'MQ:KAFKA',
  HTTP: 'HTTP:HTTP',
  MYSQL: 'DB:MYSQL'
};

const emits = defineEmits(['update', 'close']);

const props = defineProps({
  data: {
    type: Object,
  }
});
const action = computed(() => {
  return props.data?.accessSourceId ? '编辑' : '新增';
});
const formRef = ref<FormInstance>();
const subFormRef = ref<FormInstance>();
const isShowDialog = true;
const loading = ref(false);
const formData = reactive({
  accessSourceId: props.data?.accessSourceId || '',
  sourceType: props.data?.accessSourceType ? `${props.data?.accessSourceType}:${props.data?.dataSourceType}` : '',
  accessSourceName: props.data?.accessSourceName || '',
  accessSourceDesc: props.data?.accessSourceDesc || '',
});
const formDataKafka = reactive({
  brokers: props.data?.sourceParamJson ? JSON.parse(props.data?.sourceParamJson).brokers : ''
});
const mainFormRules = {
  accessSourceName: [
    { required: true, message: '请输入接入源名称', trigger: ['blur', 'change'] }
  ],
  sourceType: [
    { required: true, message: '请选择数据类型', trigger: ['blur', 'change'] }
  ]
};
const subFormRules = {
  brokers: [
    { required: true, message: '请输入 brokers', trigger: ['blur', 'change'] }
  ]
};
const isLinkTestPassed = ref<boolean | ''>('');
const isLinkTestDisabled = computed(() => {
  const needTestArr = [DATA_SOURCE_TYPE.KAFKA];
  if (needTestArr.includes(formData.sourceType)) {
    return false;
  }
  return true;
});

watch(() => formData.sourceType, () => {
  isLinkTestPassed.value = '';
  subFormRef.value?.resetFields();
});

watch(() => formDataKafka.brokers, () => {
  isLinkTestPassed.value = '';
});

const check = async () => {
  formRef.value?.validate();
  await subFormRef.value?.validate();
  const data = {
    dataSourceType: formData.sourceType.split(':')[1],
    sourceParamJson: ''
  };
  if (formData.sourceType === DATA_SOURCE_TYPE.KAFKA) {
    data.sourceParamJson = JSON.stringify(formDataKafka);
  }
  const res = await api.postCheckAccessSource(data);
  if (res.data) {
    isLinkTestPassed.value = true;
  } else {
    isLinkTestPassed.value = false;
  }
};
const ok = async () => {
  await formRef.value?.validate();
  await subFormRef.value?.validate();
  const sourceType = formData.sourceType.split(':');
  const data = {
    ...formData,
    accessSourceType: sourceType[0],
    dataSourceType: sourceType[1],
    sourceParamJson: ''
  };
  if (formData.sourceType === DATA_SOURCE_TYPE.KAFKA) {
    data.sourceParamJson = JSON.stringify(formDataKafka);
  }
  loading.value = true;
  try {
    formData.accessSourceId
      ? await api.postUpdateAccessSource(data)
      : await api.postAddAccessSource(data);
    loading.value = false;
    emits('close');
    emits('update');
  } catch (e) {
    loading.value = false;
  }
};
</script>

<style lang="scss">
  .item-label {
    width: calc(var(--md) * 5)
  }
</style>
