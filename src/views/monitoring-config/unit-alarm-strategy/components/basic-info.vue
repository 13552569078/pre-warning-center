<template>
  <hl-form ref="formRef" :model="formData" :rules="rules" :width="['w-sm', 'col-15']"
    :label-position="['items-right', 'items-middle']" item-gap="var(--md)" class="m-b-xl">
    <hl-form-item label="当前监测点" prop="strategyName">
      <hl-input :value="unitName" placeholder="当前监测点" :disabled="action === 'edit'" class="w-xxl" maxlength="20"
        show-word-limit />
    </hl-form-item>
    <hl-form-item label="策略名称" prop="strategyName">
      <hl-input v-model="formData.strategyName" placeholder="请输入模板名称" class="w-xxl" maxlength="20" show-word-limit />
    </hl-form-item>
    <hl-form-item :label="`${$t('warningType')}:`" prop="eventTypeCode">
      <risk-type v-model="formData.eventTypeCode" :disabled="action === 'edit'" @riskChanged="riskChanged" />
    </hl-form-item>
    <hl-form-item label="策略描述">
      <hl-input v-model="formData.strategyDesc" native-type="textarea" class="w-xxl" maxlength="500" show-word-limit />
    </hl-form-item>
    <hl-form-item label="静默设置" class="top-center" prop="silentConfigParams">
      <hl-button v-if="formData.silentConfigParams.length === 0 && action !== 'edit'" type="primary" icon-position="left"
        class="m-l-xxs" @click="addsilentConfigParams">
        <template #icon>
          <hl-icon>
            <two-plus />
          </hl-icon>
        </template>
      </hl-button>
      <hl-group align="items-center items-middle" v-for="(item, index) in formData.silentConfigParams" :key="index"
        class="m-b-sm">
        <hl-date-picker format="YYYY-MM-DD" value-format="YYYY-MM-DD" v-model="item.dateStart" type="date" class="w-xxl"
          placeholder="请选择开始日期" :disabled="action === 'edit'" />
        <span class="m-r-xs m-l-xs">至</span>
        <hl-date-picker format="YYYY-MM-DD" value-format="YYYY-MM-DD" v-model="item.dateEnd" type="date" class="w-xxl"
          placeholder="请选择结束日期" :disabled="action === 'edit'" />
        <hl-time-picker class="m-l-xl" v-model="item.timeStart" placeholder="选择开始时间" format="HH:mm:ss"
          value-format="HH:mm:ss" :disabled="action === 'edit'" />
        <span class="m-r-xs m-l-xs">至</span>
        <hl-time-picker format="HH:mm:ss" value-format="HH:mm:ss" v-model="item.timeEnd" placeholder="选择结束时间"
          :disabled="action === 'edit'" />
        <hl-button type="primary" icon-position="left" class="m-l-xxs" v-if="index === 0 && action !== 'edit'"
          @click="addsilentConfigParams">
          <template #icon>
            <hl-icon>
              <two-plus />
            </hl-icon>
          </template>
        </hl-button>
        <hl-button icon-position="left" class="m-l-xxs" v-if="action !== 'edit'" @click="delsilentConfigParams(index)">
          <template #icon>
            <hl-icon>
              <FillMinus />
            </hl-icon>
          </template>
        </hl-button>
      </hl-group>
    </hl-form-item>
  </hl-form>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { FormInstance } from 'hongluan-ui';
import { omit, pick } from 'lodash-es';
import {
  FacilitiesType,
  RiskType,
} from '@/views/monitoring-config/components/index';
import { apiMonitorStrategyObj } from '@/apis/modules/monitor-strategy/fixed-cycle';
import { IpostFindMonitorStrategyPageSpace } from '@/apis/modules/monitor-strategy/fixed-cycle/model';

const route = useRoute();
const { t } = useI18n();

const props = defineProps({
  basicInfoData: {
    type: Object,
    default: () => ({}),
  },
  unitName: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['eventTypeCodeChange', 'getDetail']);

const isValidStrategyName = async(
  rule: any,
  value: string,
  callback: (error?: Error) => void
) => {
  const res = await apiMonitorStrategyObj.postCheckIfNameExist(
    value,
    monitorStrategyId.value
  );
  if (res.data) {
    callback(new Error('预警策略名称已存在，请更换名称'));
  }
  callback();
};

const monitorStrategyId = computed(() => route.query.id as string);

// 策略id
const formData = reactive({
  monitorStrategyId: '',
  templateId: '',
  strategyType: 1,
  strategyName: '',
  eventTypeCode: '', // 风险类型
  facilityType: '', // 设施类型
  silentConfigParams: [] as {
    dateStart: string;
    dateEnd: string;
    timeStart: string;
    timeEnd: string;
  }[],
  strategyDesc: '',
});
const action = computed(() => route.query.action);
const unitName = computed(() => route.query.unitName);
const formRef = ref<FormInstance>();
const templates = ref<IpostFindMonitorStrategyPageSpace.List[]>([]);

const fetchTpl = async() => {
  emit('getDetail', formData.templateId);
};
const riskChanged = (eventTypeCode: number) => {
  emit('eventTypeCodeChange', eventTypeCode);
};

const validate = async() => {
  await formRef.value?.validate();
};

const getResult = () => {
  return {
    ...omit(formData, 'templateId'),
  };
};
const getsilentConfigParams = () => {
  return {
    silentConfigParams: JSON.stringify(formData.silentConfigParams),
  };
};
// 添加静默设置
const addsilentConfigParams = () => {
  formData.silentConfigParams.push({
    dateStart: '',
    dateEnd: '',
    timeStart: '',
    timeEnd: '',
  });
};
const delsilentConfigParams = (index: number) => {
  formData.silentConfigParams.splice(index, 1);
  formData.silentConfigParams.length && validate();
};

watch(
  () => props.basicInfoData,
  (n, o) => {
    if (n) {
      Object.assign(formData, props.basicInfoData);
    }
  },
  {
    deep: true,
  }
);

onMounted(async() => {
  const tpls = await apiMonitorStrategyObj.postFindMonitorStrategyPage({
    isTemplate: 1,
  });
  templates.value = tpls.data.list;
});

const rules = {
  strategyName: [
    { required: true, message: '策略名称不能为空' },
    { validator: isValidStrategyName, trigger: 'blur' },
  ],
  eventTypeCode: [{ required: true, message: `请选择${t('warningType')}` }],
  // facilityType: [{ required: true, message: '请选择设施类型' }],
  targetId: [{ required: true, message: '请选择预警指标' }],
  silentConfigParams: [
    {
      validator: (_: any, value: any, callback: any) => {
        if (formData.silentConfigParams.length === 0) callback();
        let validata = 0;
        formData.silentConfigParams.forEach((item: any) => {
          if (
            !item.dateStart ||
            !item.dateEnd ||
            !item.timeStart ||
            !item.timeEnd
          ) {
            validata += 1;
          }
        });
        if (validata > 0) {
          callback(new Error('开始日期,结束日期,开始时间,结束时间均不能为空'));
        } else {
          callback();
        }
      },
    },
  ],
};

defineExpose({
  validate,
  getResult,
  getsilentConfigParams,
});
</script>
