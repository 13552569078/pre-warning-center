<template>
  <!-- 接入对象 -->
  <hl-dialog v-model="dialogVisible" class="md-dialog" width="700px" :title="`${isEdit ? '编辑' : '新增'}接入对象`" @close="$emit('close')" :close-on-click-modal="false" borderless>
    <hl-form ref="formRef" :model="formData" :rules="rules" :label-position="['items-left', 'items-middle']" gap="var(--lg)" item-gap="var(--lg2)">
      <hl-form-item label="接入对象名称" prop="objectName">
        <hl-input v-model="formData.objectName" maxlength="20" show-word-limit block placeholder="接入对象名称" />
      </hl-form-item>
      <hl-form-item label="数据源" prop="accessSourceId">
        <search-access-data-source-tree style="width: 100%;" v-model:accessSourceId="formData.accessSourceId" v-model:dataSourceType="formData.dataSourceType" @clear="handleSelectorClear" @updated="handleUpdated" disabled />
      </hl-form-item>
      <template v-if="!isKafka">
        <!-- prop="linkUrl" -->
        <hl-form-item label="接入对象连接地址">
          <hl-input v-model="formData.linkUrl" maxlength="20" show-word-limit block placeholder="接入对象连接地址" />
        </hl-form-item>
        <!-- prop="linkParam" -->
        <hl-form-item label="接入对象连接参数">
          <hl-input v-model="formData.linkParam" native-type="textarea" placeholder="接入对象连接参数" maxlength="500" show-word-limit block :row="3" />
        </hl-form-item>
      </template>
    </hl-form>
    <sub-form-kafka ref="subFormRef" v-if="isKafka" v-model="subFormData" />
    <hl-form ref="formEndRef" class="m-t-md" :model="formData" :label-position="['items-left', 'items-middle']">
      <hl-form-item label="接入对象描述">
        <hl-input v-model="formData.accessSourceObjectDesc" native-type="textarea" placeholder="描述" maxlength="500" show-word-limit block :row="3" />
      </hl-form-item>
    </hl-form>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="$emit('close')">取消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="ok">确定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang='ts' setup>
import { ref, reactive, computed, toRaw, onMounted, nextTick } from 'vue';
import { HlMessage } from 'hongluan-ui';
import { apiAccessObjectObj as api } from '@/apis/modules/access-object';
import subFormKafka from './sub-form-kafka.vue';
import { Indexable } from 'fx-front-utils';

const props = defineProps({
  data: {
    type: Object,
    default: () => (null)
  },
  accessSourceId: {
    type: String
  }
});

const emit = defineEmits(['close']);

const dialogVisible = ref(true);

const formData = reactive({
  accessSourceObjectId: '',
  accessSourceId: '',
  objectName: '',
  linkUrl: '',
  linkParam: '',
  accessSourceObjectDesc: '',
  dataSourceType: '',
  kafkaTopic: '',
  paramJsonPath: ''
});

const formRef = ref();
const subFormData = ref();
const subFormRef = ref();

const rules = computed(() => {
  const r: Indexable<object> = {
    objectName: [{ required: true, message: '请输入接入对象名称', trigger: ['blur', 'change'] }],
    accessSourceId: [{ required: true, message: '请选择数据源', trigger: ['blur', 'change'] }]
  };
  if (!isKafka.value) {
    r.linkUrl = [{ required: true, message: '请输入接入对象连接地址', trigger: ['blur', 'change'] }];
    r.linkParam = [{ required: true, message: '请输入接入对象连接参数', trigger: ['blur', 'change'] }];
  }
  return r;
});

const isEdit = computed(() => {
  if (props.data.accessSourceObjectId) {
    return true;
  }
  return false;
});

const isKafka = computed(() => {
  return formData.dataSourceType === 'KAFKA';
});

const handleSelectorClear = () => {
  formData.accessSourceId = '';
  formData.dataSourceType = '';
};

const ok = async () => {
  let data = null;
  await formRef.value.validate();
  if (isKafka.value) {
    if (subFormRef.value) {
      try {
        await subFormRef.value.validate();
        subFormRef.value.getFormData();
        data = {
          ...toRaw(formData),
          ...subFormData.value
        };
      } catch (e: any) {
        HlMessage.error(e.message);
      }
    } else {
      HlMessage.error('请先解析数据格式');
    }
  } else {
    data = {
      ...toRaw(formData),
    };
  }

  if (!data) return;

  if (isEdit.value) {
    await api.postUpdateAccessSourceObject(data);
  } else {
    await api.postAddAccessSourceObject(data);
  }
  emit('close', 1);
};

const handleUpdated = () => {
  setTimeout(() => {
    formRef.value?.clearValidate();
    subFormRef.value?.clearValidate();
  }, 100);
};

onMounted(() => {
  Object.assign(formData, props.data);
  if (!formData.accessSourceId) {
    formData.accessSourceId = props.accessSourceId as string;
  }
  subFormData.value = {
    kafkaTopic: formData.kafkaTopic,
    paramJsonPath: formData.paramJsonPath
  };
});

</script>
