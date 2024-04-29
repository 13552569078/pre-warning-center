<template>
  <hl-panel radius="0px" class="data-bg w-full" borderless padding="var(--lg)" body-class="display-flex items-left items-top flex-row content p-l-lg p-r-lg p-b-lg" footer-style>
    <template #header>
      <panel-header title="基本信息"></panel-header>
    </template>
    <template #default>
      <hl-form ref="formRef" :model="formData" :rules="rules" :label-position="['items-left', 'items-middle']" gap="var(--lg)" item-gap="var(--lg2)" class="form-size">
        <hl-group gap="var(--lg2)">
          <hl-form-item label="策略类型">
            <hl-radio-group v-model="formData.triggerType" :disabled="action === 'edit'" gap="var(--xl)" type="primary" size="md" @change="strategyTypeChange" class="form-item-size">
              <hl-radio label="TRIGGER_CYCLE">周期策略</hl-radio>
              <hl-radio label="TRIGGER_DATA">触发策略</hl-radio>
            </hl-radio-group>
          </hl-form-item>
          <!-- 预警策略模板 编辑时不回显展示 仅用于快捷回填信息-->
          <hl-form-item label="预警策略模板" prop="templateId" v-if="action !== 'edit'">
            <hl-select v-model="formData.templateId" class="form-item-size" placeholder="请选择预警策略模板" @change="fetchTpl" filterable clearable>
              <hl-option v-for="t in templates" :key="t.monitorStrategyId" :label="t.strategyName" :value="t.monitorStrategyId" />
            </hl-select>
          </hl-form-item>
        </hl-group>
        <hl-form-item label="版本号" v-if="action === 'edit'">
          <span class="font-bold form-item-size">{{ versionName }}</span>
        </hl-form-item>
        <hl-group gap="var(--lg2)">
          <hl-form-item label="策略名称" prop="strategyName">
          <hl-input v-model="formData.strategyName" :disabled="action === 'edit'" placeholder="请输入模板名称" class="form-item-size" maxlength="20" show-word-limit />
        </hl-form-item>
        <hl-form-item :label="`${$t('warningType')}`" prop="eventTypeCode">
          <risk-type style="min-width: 600px !important" v-model="formData.eventTypeCode" :disabled="action === 'edit'" @riskChanged="riskChanged" :isConfigEventType="true" :isFullWidth="false" />
        </hl-form-item>
        </hl-group>
        <hl-form-item label="静默设置" class="top-center" prop="silentConfigParams">
          <hl-group dir="vertical" align="items-middle" class="bg-light p-md block w-full">
            <hl-group align="items-left items-top" full dir="vertical" gap="var(--sm)">
              <hl-group align="items-left items-middle" gap="var(--xs)" class="bg-content p-sm static w-100" v-for="(item, index) in formData.silentConfigParams" :key="index">
                <hl-date-picker format="YYYY-MM-DD" value-format="YYYY-MM-DD" v-model="item.dateStart" type="date" class="w-xxl" placeholder="开始日期" />
                <span class="m-r-xs m-l-xxs">至</span>
                <hl-date-picker format="YYYY-MM-DD" value-format="YYYY-MM-DD" v-model="item.dateEnd" type="date" class="w-xxl" placeholder="结束日期" />
                <hl-time-picker v-model="item.timeStart" placeholder="开始时间" format="HH:mm:ss" value-format="HH:mm:ss" class="m-l-xl"> </hl-time-picker>
                <span class="m-r-xs m-l-xxs">至</span>
                <hl-time-picker v-model="item.timeEnd" placeholder="结束时间" format="HH:mm:ss" value-format="HH:mm:ss"> </hl-time-picker>
                <hl-icon size="xs" class="static cursor-pointer" type="danger" @click="delsilentConfigParams(index)">
                  <FillCircleMinus></FillCircleMinus>
                </hl-icon>
              </hl-group>
            </hl-group>
            <hl-group class="p-y-xs p-x-md radius-lg" align="items-center items-middle" gap="var(--xxs)" @click="addsilentConfigParams">
              <hl-icon size="xs" class="static" type="primary">
                <TwoPlus></TwoPlus>
              </hl-icon>
              <span class="text-primary static cursor-pointer">增加静默时间</span>
            </hl-group>
          </hl-group>
        </hl-form-item>
        <hl-form-item label="策略描述">
          <hl-input v-model="formData.strategyDesc" :disabled="action === 'edit'" native-type="textarea" class="form-item-size" maxlength="500" show-word-limit />
        </hl-form-item>
      </hl-form>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { FormInstance } from 'hongluan-ui';
import { omit, cloneDeep } from 'lodash-es';
import { isValidName, ruleRequired } from '@/common';
import { GlobalAPI } from '@/common';
import { apiMonitorStrategyObj } from '@/apis/modules/monitor-strategy/fixed-cycle';
import { IpostFindMonitorStrategyPageSpace } from '@/apis/modules/monitor-strategy/fixed-cycle/model';
import { alarmStateOptions } from '@/views/monitoring-config/alarm-strategy-config/utils';

const props = defineProps({
  basicInfoData: {
    type: Object,
    default: () => ({})
  }
});

const route = useRoute();
const { t } = useI18n();

const emit = defineEmits(['eventTypeCodeChange', 'getDetail', 'strategyTypeChange']);
const templateFlag = computed(() => {
  return formData.templateId;
});

const formData = reactive({
  monitorStrategyId: '',
  templateId: '',
  triggerType: 'TRIGGER_CYCLE',
  strategyName: '',
  eventTypeCode: '', // 风险类型
  facilityType: '', // 设施类型
  silentConfigParams: [] as {
    dateStart: string;
    dateEnd: string;
    timeStart: string;
    timeEnd: string;
  }[], // 静默设置
  strategyDesc: ''
});
const formRef = ref<FormInstance>();
const templates = ref<IpostFindMonitorStrategyPageSpace.List[]>([]);

const monitorStrategyId = computed(() => route.query.id || props.basicInfoData.monitorStrategyId); // 策略id
const action = computed(() => route.query.action);
const versionId = computed(() => route.query.versionId);
const associated = computed(() => route.query.associated);
const versionName = computed(() => route.query.versionName);

const strategyTypeChange = (val: string) => {
  // 模板
  getTempls();
  emit('strategyTypeChange', val);
};
const fetchTpl = async () => {
  emit('getDetail', formData.templateId);
};
const riskChanged = (eventTypeCode: number) => {
  formRef.value?.validateField('eventTypeCode');
  emit('eventTypeCodeChange', eventTypeCode);
};
const validate = async () => {
  await formRef.value?.validate();
};
// 传值数据组装 模板id不传
const getResult = () => {
  return {
    ...omit(formData, 'templateId')
  };
};
const getsilentConfigParams = () => {
  return {
    silentConfigParams: JSON.stringify(formData.silentConfigParams)
  };
};
// 添加静默设置
const addsilentConfigParams = () => {
  formData.silentConfigParams.push({
    dateStart: '',
    dateEnd: '',
    timeStart: '',
    timeEnd: ''
  });
};
const delsilentConfigParams = (index: number) => {
  formData.silentConfigParams.splice(index, 1);
  formRef.value?.validateField('silentConfigParams');
};

watch(
  () => props.basicInfoData,
  (n, o) => {
    if (n) {
      // 深拷贝防止formData变更，多次监听props
      Object.assign(formData, cloneDeep(props.basicInfoData));
    }
  },
  {
    deep: true
  }
);
const getTempls = async () => {
  const tpls = await apiMonitorStrategyObj.postFindMonitorStrategyPage({
    isTemplate: 1,
    currentPage: 1,
    pageSize: 10000,
    triggerTypes: [formData.triggerType]
  });
  templates.value = tpls.data.list;
};

onMounted(() => {
  getTempls();
});

const isValidStrategyName = async (rule: any, value: string, callback: (error?: Error) => void) => {
  const res = await apiMonitorStrategyObj.postCheckIfNameExist(value, monitorStrategyId.value);
  if (res.data) {
    callback(new Error('预警策略名称已存在，请更换名称'));
  }
  callback();
};

const rules = {
  strategyName: [
    { required: true, message: '策略名称不能为空' },
    { validator: isValidStrategyName, trigger: 'blur' },
    { validator: isValidName, trigger: 'blur' }
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
          if (!item.dateStart || !item.dateEnd || !item.timeStart || !item.timeEnd) {
            validata += 1;
          }
        });
        if (validata > 0) {
          callback(new Error('开始日期,结束日期,开始时间,结束时间均不能为空'));
        } else {
          callback();
        }
      }
    }
  ]
};
// const checkStartDate = (startTime: any) => {
//   return startTime.getTime() > Date.now(); // 今天时间之后的不能选择
// };
// const checkEndDate = (startTime: any, endTime: any) => {
//   if (!startTime || !endTime) {
//     return false;
//   }
//   return new Date(startTime).getTime() < new Date(endTime).getTime();
// };

defineExpose({
  validate,
  getResult,
  templateFlag,
  getsilentConfigParams
});
</script>
<style lang="scss">
.data-bg {
  background: url('~@/assets/images/wholeAnalysis/top-bg.svg') no-repeat;
  background-color: var(--bg-content);
  background-position: right -10% bottom 10%;
  background-size: 36% 166%;
}
</style>
