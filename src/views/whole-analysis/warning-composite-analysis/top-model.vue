<template>
  <hl-group class="p-x-xxl bg-content w-full data-bg" style="padding-top: 24px; padding-bottom: 40px" align="items-left items-top">
    <hl-form ref="formRef" style="width: 80%" :model="formData" :rules="rules" gap="var(--xl)" inline label-position="left" :width="['120px', '']">
      <hl-group align class="w-full" gap="var(--xl)" full :width="['100px', '']">
        <hl-form-item class="w-full" label="分析模型">
          <hl-group align="items-between items-top" class="w-full" gap="40px">
            <SearchModel ref="searchModelRef" @modelChanged="modelChanged" @addNewModel="addNewModel" />
          </hl-group>
        </hl-form-item>
        <hl-form-item class="w-full" label="起始时间" prop="timeRange">
          <hl-group align="items-left items-top" class="w-full">
            <hl-date-picker type="datetimerange" v-model="formData.timeRange" class="static" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" style="width: 400px" start-placeholder="开始时间" range-separator="至" end-placeholder="结束时间"></hl-date-picker>
          </hl-group>
        </hl-form-item>
      </hl-group>
      <hl-form-item class="static" label="行政区划">
        <hl-group align class="w-full" dir="vertical" gap="var(--lg)" full>
          <hl-group class="p-lg bg-light radius-md w-full" align="items-left items-top" dir="vertical" gap="var(--sm)">
            <hl-group style="flex-wrap: wrap; width: 800px" align="items-left items-top" gap="var(--sm)">
              <hl-group v-for="(item, index) in formData.areaCodeList" :key="item.targetDataId" class="p-y-xs p-x-sm bg-content radius-lg box-shadow-sm" align="items-left items-middle" gap="var(--xs)"
                ><span class="text-regular">{{ item.areaName }}</span>
                <hl-icon size="xs" class="static text-regular cursor-pointer" @click="delArea(index)">
                  <TwoClose></TwoClose>
                </hl-icon>
              </hl-group>
              <hl-group class="p-y-xs p-x-md radius-lg cursor-pointer" align="items-center items-middle" gap="var(--xxs)" @click="areaVisiable = true">
                <hl-icon size="xs" class="static" type="primary"> <TwoPlus></TwoPlus> </hl-icon><span class="text-primary">选择行政区划</span>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-group>
      </hl-form-item>
      <hl-form-item class="static" label="风险分类">
        <hl-group align class="w-full" dir="vertical" gap="var(--lg)" full>
          <hl-group class="p-lg bg-light radius-md w-full" align="items-left items-top" dir="vertical" gap="var(--sm)">
            <hl-group style="flex-wrap: wrap; width: 800px" align="items-left items-top" gap="var(--sm)">
              <hl-group v-for="(item, index) in formData.eventTypeCode" :key="item.targetDataId" class="p-y-xs p-x-sm bg-content radius-lg box-shadow-sm" align="items-left items-middle" gap="var(--xs)"
                ><span class="text-regular">{{ item.eventTypeName }}</span>
                <hl-icon size="xs" class="static text-regular cursor-pointer" @click="delRisk(index)">
                  <TwoClose></TwoClose>
                </hl-icon>
              </hl-group>
              <hl-group class="p-y-xs p-x-md radius-lg cursor-pointer" align="items-center items-middle" gap="var(--xxs)" @click="eventVisiable = true">
                <hl-icon size="xs" class="static" type="primary"> <TwoPlus></TwoPlus> </hl-icon><span class="text-primary">选择风险分类</span>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-group>
      </hl-form-item>
      <hl-group align="items-left items-top" class="w-full" dir="vertical" gap="var(--lg)">
        <hl-form-item class="static" label=" ">
          <hl-group class="radius-md static" align="items-left items-top" gap="var(--sm)">
            <hl-button icon-position="left" type="primary" rational @click="addModel"
              ><template #icon>
                <hl-icon>
                  <TwoSave></TwoSave>
                </hl-icon> </template
              >保存分析模型</hl-button
            >
            <hl-button :disabled="disabledSaveAs" class="static" effect="light" type="primary" @click="saveAs">另存为</hl-button>
            <hl-button class="static" effect="light" type="primary" @click="searchAnalysisModel">查询分析</hl-button>
          </hl-group>
        </hl-form-item>
      </hl-group>
    </hl-form>
  </hl-group>
  <area-transfer v-if="areaVisiable" @close="areaVisiable = false" @area-changed="areaChanged" v-model="formData.areaCodeList" />
  <event-multiple-dialog v-if="eventVisiable" @close="eventVisiable = false" @risk-changed="riskChange" v-model="formData.eventTypeCode" />
  <ModelNameDialog ref="nameRef" @saveName="saveName" :analysisModelId="formData.analysisModelId" :action="action" />
</template>
<script lang="ts" setup>
import { computed, ref, reactive, onMounted } from 'vue';
import { HlMessage, FormInstance } from 'hongluan-ui';
import { pick } from 'lodash-es';
import dayjs from 'dayjs';
import { HlMessageSuccess, monthStartToNow } from '@/common';
import { AreaTransfer, EventMultipleDialog } from '@/components';
import { apiWarningWholeAnalysisObj } from '@/apis/modules/whole-analysis/warning-whole-analysis';
import { IlistSpace } from '@/apis/modules/whole-analysis/warning-whole-analysis/model';
import { SearchModel, ModelNameDialog } from './components';

const emit = defineEmits(['queryModel']);

const formRef = ref<FormInstance>();
const nameRef = ref();
const searchModelRef = ref();

const action = ref('add');
const formData = reactive({
  analysisModelId: '',
  analysisModelName: '',
  areaCodeList: [] as any[], // 行政区划
  eventTypeCode: [] as any[], // 风险分类
  timeRange: [] as string[]
});

const areaVisiable = ref(false);
const eventVisiable = ref(false);

const rules = {
  timeRange: [{ required: true, message: '请选择时间', trigger: ['change', 'blur'] }]
};

const disabledSaveAs = computed(() => !formData.analysisModelId);

const addNewModel = () => {
  formData.analysisModelId = '';
  formData.analysisModelName = '';
  formData.areaCodeList = [];
  formData.timeRange = monthStartToNow();
  formData.eventTypeCode = [];
};
const modelChanged = (data: IlistSpace.Data) => {
  const modelText = JSON.parse(data.modelText);
  const params = {
    analysisModelId: data.analysisModelId,
    analysisModelName: data.analysisModelName,
    areaCodeList: modelText.areaCodeList,
    eventTypeCode: modelText.eventTypeCode,
    timeRange: modelText.timeRange
  };
  Object.assign(formData, params);
  formRef.value?.validateField('timeRange');
};
// 风险分类
const riskChange = (data: any[]) => {
  formData.eventTypeCode = data;
};
const delRisk = (index: number) => {
  formData.eventTypeCode.splice(index, 1);
};
// 区域
const areaChanged = (data: any[]) => {
  formData.areaCodeList = data;
};
const delArea = (index: number) => {
  formData.areaCodeList.splice(index, 1);
};
// 自定义新增为新增模型 有analysisModelId为空 为编辑模型
const addModel = async() => {
  await formRef.value?.validate();
  // 判断有无analysisModelId  有则直接保存===编辑本模型  没有则是自定义模型
  if (formData.analysisModelId) {
    action.value = 'edit';
    saveName(formData.analysisModelName);
  } else {
    action.value = 'add';
    nameRef.value.show();
  }
};
// 另存为 相当于新增 以当前的模板为原型 新增模型 校验名称重复 analysisModelId为空
const saveAs = async() => {
  await formRef.value?.validate();
  action.value = 'add';
  nameRef.value.show();
};
const saveName = async(name: string) => {
  formData.analysisModelName = name;
  const { analysisModelId, analysisModelName } = formData;
  const modelText = {
    ...pick(formData, 'eventTypeCode', 'areaCodeList', 'timeRange')
  };
  // 新增编辑模型
  await apiWarningWholeAnalysisObj.postSave(action.value === 'add' ? '' : analysisModelId, analysisModelName, JSON.stringify(modelText));
  HlMessageSuccess('保存成功');
  nameRef.value.cancel();
  await searchModelRef.value.getModelList(true);
};
const searchAnalysisModel = async() => {
  await formRef.value?.validate();
  const params = {
    eventTypeCode: formData.eventTypeCode.map(item => {
      return item.systemCode;
    }),
    areaCodeList: formData.areaCodeList.map(item => {
      return item.areaCode;
    }),
    startTime: formData.timeRange[0] ?? '',
    endTime: formData.timeRange[1] ?? ''
  };
  emit('queryModel', params);
};
onMounted(() => {
  formData.timeRange = monthStartToNow();
});
</script>
<style lang="scss">
.data-bg {
  background: url('~@/assets/images/wholeAnalysis/top-bg.svg') no-repeat;
  background-color: var(--bg-content);
  background-position: right -10% bottom 30%;
  background-size: 36% 166%;
}
</style>
