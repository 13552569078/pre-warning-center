<template>
  <hl-form ref="formRef" :model="formData" :rules="rules" :width="['w-sm', 'col-15']"
    :label-position="['items-right', 'items-middle']" item-gap="var(--md)" class="m-b-xl">
    <!-- 报警策略模板 编辑时不回显展示 仅用于快捷回填信息 模板id不传后台-->
    <hl-form-item label="报警策略模板:" v-if="action!=='edit'">
      <hl-select v-model="formData.templateId" class="w-xxl" placeholder="请选择报警策略模板" @change="fetchTpl" filterable
        clearable>
        <hl-option v-for="t in templates" :key="t.templateId" :label="t.templateName"
          :value="t.templateId" />
      </hl-select>
    </hl-form-item>
    <hl-form-item label="策略名称:" prop="strategyName">
      <hl-input v-model="formData.strategyName" placeholder="请输入模板名称" class="w-xxl" maxlength="20" show-word-limit />
    </hl-form-item>
    <hl-form-item :label="`${$t('warningType')}:`" prop="eventTypeCode">
      <risk-type v-model="formData.eventTypeCode" :disabled="action==='edit'" @riskChanged="riskChanged" :isConfigEventType="true" :isFullWidth="false" />
    </hl-form-item>
    <hl-form-item label="监测指标:" prop="targetId" >
      <target-type v-model="formData.targetId" :disabled="action==='edit'" @target-changed="targetChange"/>
    </hl-form-item>
    <hl-form-item label="策略描述:">
      <hl-input v-model="formData.strategyDesc" native-type="textarea" class="w-xxl" maxlength="500" show-word-limit />
    </hl-form-item>
  </hl-form>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { FormInstance } from 'hongluan-ui';
import { omit, cloneDeep } from 'lodash-es';
import { isValidName } from '@/common';
import { TargetType } from '@/views/alarm-config/components/index';
import { apiYgfWarningConfigObj } from '@/apis/modules/alarm-config';
import { IgetListStrategyTemplatesSpace } from '@/apis/modules/alarm-config/model';

const props = defineProps({
  basicInfoData: {
    type: Object,
    default: () => ({}),
  },
});

const route = useRoute();
const { t } = useI18n();

const emit = defineEmits(['eventTypeCodeChange', 'getDetail', 'targetChanged']);

const formData = reactive({
  strategyId: '',
  templateId: '',
  strategyName: '',
  eventTypeCode: '', // 风险类型
  targetId: '', // 指标类型
  strategyDesc: '',
});
const formRef = ref<FormInstance>();
const templates = ref<IgetListStrategyTemplatesSpace.Data[]>([]);

const strategyId = computed(() => route.query.id); // 策略id
const action = computed(() => route.query.action);

watch(
  () => props.basicInfoData,
  (n, o) => {
    if (n) {
      // 深拷贝防止formData变更，多次监听props
      Object.assign(formData, cloneDeep(props.basicInfoData));
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

const fetchTpl = async() => {
  emit('getDetail', formData.templateId, true);
};
const riskChanged = (eventTypeCode: number) => {
  formRef.value?.validateField('eventTypeCode');
  emit('eventTypeCodeChange', eventTypeCode);
};
const targetChange = (id:string) => {
  emit('targetChanged', id);
};
const validate = async() => {
  await formRef.value?.validate();
};
// 传值数据组装 模板id不传
const getResult = () => {
  return omit(formData, 'templateId');
};

onMounted(async() => {
  const { data } = await apiYgfWarningConfigObj.getListStrategyTemplates();
  templates.value = data;
});

const isValidstrategyName = async(
  rule: any,
  value: string,
  callback: (error?: Error) => void
) => {
  const res = await apiYgfWarningConfigObj.postCheckIfNameExist(
    value,
    1,
    strategyId.value as string
  );
  if (res.data) {
    callback(new Error('报警策略名称已存在，请更换名称'));
  }
  callback();
};

const rules = {
  strategyName: [
    { required: true, message: '策略名称不能为空' },
    { validator: isValidstrategyName, trigger: 'blur' },
    { validator: isValidName, trigger: 'blur' },
  ],
  eventTypeCode: [{ required: true, message: `请选择${t('warningType')}` }],
  targetId: [{ required: true, message: '请选择监测指标' }],
};

defineExpose({
  validate,
  getResult
});
</script>
