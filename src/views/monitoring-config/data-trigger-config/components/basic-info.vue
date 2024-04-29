<template>
  <hl-panel radius="0px" class="data-bg w-full" borderless padding="var(--xl)" body-padding="var(--xxl)" body-class="display-flex items-left items-top flex-row content" footer-style>
    <template #header>
      <panel-header title="基本信息"></panel-header>
    </template>
    <template #default>
      <hl-form ref="formRef" :model="formData" :rules="rules" :width="['120px', 'col']" :label-position="['items-left', 'items-middle']" item-gap="var(--md)" style="width: 1092px" class="m-l-xxl m-t-lg">
        <hl-form-item label="策略类型:">
          <span class="font-bold">数据触发</span>
          <span class="m-l-md">(在监测到有新接入的实时监测数据后，立即执行预警策略)</span>
        </hl-form-item>
        <!-- 预警策略模板 编辑时不回显展示 仅用于快捷回填信息-->
        <hl-form-item label="预警策略模板:" prop="templateId" v-if="action === 'add'">
          <hl-select v-model="formData.templateId" style="width: 400px" placeholder="请选择预警策略模板" @change="fetchTpl" filterable clearable>
            <hl-option v-for="t in templates" :key="t.monitorStrategyId" :label="t.strategyName" :value="t.monitorStrategyId" />
          </hl-select>
        </hl-form-item>
        <hl-form-item label="版本号:" v-if="action === 'edit'">
          <span class="font-bold" style="width: 400px">{{ versionName }}</span>
        </hl-form-item>
        <hl-form-item label="策略名称:" prop="strategyName">
          <hl-input v-model="formData.strategyName" :disabled="action === 'edit'" placeholder="请输入策略名称" style="width: 400px" maxlength="20" show-word-limit />
        </hl-form-item>
        <hl-form-item :label="`${$t('warningType')}:`" prop="eventTypeCode">
          <risk-type style="width: 400px !important" v-model="formData.eventTypeCode" :disabled="action === 'edit'" @riskChanged="riskChanged" :isConfigEventType="true" :isFullWidth="false" />
        </hl-form-item>
        <hl-form-item label="静默设置:" class="top-center" prop="silentConfigParams">
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
        <hl-form-item label="策略描述:">
          <hl-input placeholder="请输入策略描述" v-model="formData.strategyDesc" :disabled="action === 'edit'" native-type="textarea" style="width: 400px" maxlength="500" show-word-limit />
        </hl-form-item>
      </hl-form>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { omit, cloneDeep, isEmpty } from 'lodash-es';
import { PanelHeader } from '@/components';
import { apiMonitorStrategyObj } from '@/apis/modules/monitor-strategy/fixed-cycle';
import { IpostFindMonitorStrategyPageSpace } from '@/apis/modules/monitor-strategy/fixed-cycle/model';
import { useBasicInfo } from './use-basic-form';

const props = defineProps({
  detail: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['eventTypeCodeChange', 'getDetail']);

const route = useRoute();
const { formRef, formData, rules } = useBasicInfo();

watch(
  () => props.detail,
  n => {
    if (!isEmpty(n)) {
      Object.assign(formData, cloneDeep(props.detail));
    }
  },
  {
    deep: true
  }
);

const templates = ref<IpostFindMonitorStrategyPageSpace.List[]>([]);
const action = computed(() => route.query.action);
const versionName = computed(() => route.query.versionName);
const templateFlag = computed(() => {
  return formData.templateId;
});

const validate = async () => {
  await formRef.value?.validate();
};
const fetchTpl = async () => {
  emit('getDetail', formData.templateId);
};
const riskChanged = (eventTypeCode: number) => {
  formRef.value?.validateField('eventTypeCode');
  emit('eventTypeCodeChange', eventTypeCode);
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
// 传值数据组装 模板id不传
const getResult = () => {
  return {
    ...omit(formData, 'templateId'),
    silentConfigParams: formData.silentConfigParams,
    monitorStrategyId: action.value === 'add' ? '' : formData.monitorStrategyId
  };
};

onMounted(async () => {
  const { data } = await apiMonitorStrategyObj.postFindMonitorStrategyPage({
    isTemplate: 1,
    currentPage: 1,
    pageSize: 10000,
    triggerTypes: ['TRIGGER_DATA']
  });
  templates.value = data.list;
});

defineExpose({
  validate,
  getResult,
  templateFlag
});
</script>
<style lang="scss" scoped>
.data-bg {
  background: url('~@/assets/images/wholeAnalysis/top-bg.svg') no-repeat;
  background-color: var(--bg-content);
  background-position: right -10% bottom 10%;
  background-size: 36% 166%;
}
</style>
