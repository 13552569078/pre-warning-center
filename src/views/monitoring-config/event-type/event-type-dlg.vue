<template>
  <hl-dialog :model-value="true" class="md-dialog" width="700px" :title="`${id ? '编辑' : '添加'}${$t('warningType')}`" @close="$emit('cancel')" :close-on-click-modal="false" borderless>
    <hl-form ref="formRef" :model="formData" :rules="rules" :label-position="['items-left', 'items-middle']" gap="var(--lg)" item-gap="var(--lg2)">
      <hl-form-item :label="`${$t('warningType')}名称`" prop="eventTypeName">
        <hl-input v-model="formData.eventTypeName" :placeholder="`请输入${$t('warningType')}名称`" maxlength="20" show-word-limit block />
      </hl-form-item>
      <hl-form-item label="上级类型" v-if="hasParent">
        <hl-input :value="parentDisplayLabel ?? formatLabel(formData.parentFullSystemCode, formData.parentEventTypeName)" disabled block />
      </hl-form-item>
      <hl-form-item label="系统编号" prop="systemCode">
        <hl-input v-model="formData.systemCode" :disabled="!!id" placeholder="请输入系统编号" block />
      </hl-form-item>
      <hl-form-item label="标准编号" prop="eventTypeCode" show-word-limit>
        <hl-input v-model="formData.eventTypeCode" placeholder="请输入标准编号" maxlength="20" block />
      </hl-form-item>
      <hl-form-item label="是否叶子节点" prop="leafNode">
        <hl-checkbox v-model="formData.leafNode" :true-label="1" :false-label="0" @change="changeleafNode" v-if="!props.id">是</hl-checkbox>
        <span v-else class="font-bold">{{ formData.leafNode ? '是' : '否' }}</span>
      </hl-form-item>
      <hl-form-item v-if="formData.leafNode" label="预警等级" prop="alarmLevelTypeList">
        <hl-checkbox-group v-model="formData.alarmLevelTypeList" dir="horizontal" gap="var(--xl)">
          <hl-checkbox v-for="item in alarmLevels" :key="item.dictCode" :label="item.dictCode">
            {{ item.dictName }}
          </hl-checkbox>
        </hl-checkbox-group>
      </hl-form-item>
      <hl-form-item label="描述">
        <hl-input v-model="formData.eventTypeDesc" native-type="textarea" placeholder="请输入描述" maxlength="500" show-word-limit block />
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
import { useI18n } from 'vue-i18n';
import { apiDictObj as dictApi } from '@/apis/modules/dict-api';
import { eventTypeApiObj as eventTypeApi } from '@/apis/modules/event-type-api';
import { apiEventTypeObj } from '@/apis/modules/event-type';
import { isValidName } from '@/common';
import { formatLabel } from './utils';

import type { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import type { IgetFindEventTypeDetailVOEventTypeSpace } from '@/apis/modules/event-type/model';

const { t } = useI18n();

const props = defineProps({
  id: String,
  hasParent: Boolean,
  parent: Object as PropType<IgetFindEventTypeDetailVOEventTypeSpace.Data>,
  isLeafNode: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits(['cancel', 'ok']);

const isLoading = ref(false);
const formRef = ref<FormInstance>();
const formData = reactive({
  eventTypeName: '',
  systemCode: '',
  eventTypeCode: '',
  parentSystemCode: '',
  parentFullSystemCode: '',
  parentEventTypeName: '',
  alarmLevelTypeList: [] as string[],
  warningLevelTypeList: [] as string[],
  eventTypeDesc: '',
  leafNode: ''
});
const alarmLevels = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const warningLevels = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);

const parentDisplayLabel = computed(() => {
  return props.parent ? formatLabel(props.parent.fullSystemCode, props.parent.eventTypeName) : undefined;
});
const changeleafNode = () => {
  formRef.value?.validateField('systemCode');
};

const isValidSystemCode = (rule: any, value: string, callback: any) => {
  if (props.id) {
    callback();
    return;
  }
  // const reg = /^\d{2}$/;
  // if (reg.test(value)) {
  //   callback();
  // } else {
  //   callback(new Error('系统编号必须为2位数字'));
  // }
  if (formData.leafNode) {
    const reg = /^[a-zA-Z0-9]{1,16}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error('叶子节点系统编号最多16位的大小写字母或数字'));
    }
  } else {
    const reg = /^[a-zA-Z0-9]{1,2}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error('非叶子节点系统编号最多2位的大小写字母或数字'));
    }
  }
};

const rules = {
  eventTypeName: [
    { required: true, message: `${t('warningType')}名称不能为空` },
    {
      min: 1,
      max: 20,
      message: '长度小于20个字符'
    },
    { validator: isValidName, trigger: 'blur' }
  ],
  systemCode: [
    { required: true, message: '系统编号不为空' },
    { validator: isValidSystemCode, trigger: 'blur' }
  ],
  eventTypeCode: [
    {
      min: 0,
      max: 20,
      message: '长度小于20个字符'
    }
  ],
  alarmLevelTypeList: [{ required: true, message: '预警等级至少选择一项' }]
  // warningLevelTypeList: [{ required: true, message: '预警等级至少选择一项' }]
};

const ok = async () => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    isLoading.value = true;
    let result, response;
    try {
      if (props.id) {
        result = formData;
        await apiEventTypeObj.postModifyEventTypeEventType(result);
      } else {
        result = Object.assign({}, formData, {
          parentSystemCode: props.parent?.systemCode === '-1' ? '' : props.parent?.systemCode ?? ''
        });
        response = await apiEventTypeObj.postAddEventTypeEventType(result);
      }
    } finally {
      isLoading.value = false;
    }
    emit('ok', props.id ? result : response?.data);
  }
};

onMounted(async () => {
  const result = await dictApi.list('WARNING_LEVEL_CODE,ALARM_LEVEL_CODE');
  result.data.forEach(item => {
    if (item.typeCode === 'WARNING_LEVEL_CODE') {
      warningLevels.value.push(item);
    } else if (item.typeCode === 'ALARM_LEVEL_CODE') {
      alarmLevels.value.push(item);
    }
  });

  if (props.id) {
    const detailResult = await eventTypeApi.detail(props.id);
    Object.assign(formData, detailResult.data);
  }
});
</script>
