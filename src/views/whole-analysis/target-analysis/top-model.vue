<template>
  <hl-group
    class="p-x-xxl bg-content w-full data-bg"
    style="padding-top: 24px; padding-bottom: 40px;"
    align="items-left items-top"
  >
    <hl-form
      ref="formRef"
       style="width: 80%"
      :model="formData"
      :rules="rules"
      gap="var(--xl)"
      inline
      :label-position="left"
      :width="['120px', '']"
    >
      <hl-group
        align
        class="w-full"
        gap="var(--xl)"
        full
        :width="['120px', '']"
      >
        <hl-form-item
          class="w-full"
          label="分析模型"
        >
          <hl-group
            align="items-between items-top"
            class="w-full"
            gap="40px"
          >
            <SearchModel ref="searchModelRef" @modelChanged="modelChanged" @addNewModel="addNewModel" />
          </hl-group>
        </hl-form-item>
        <hl-form-item
          class="w-full"
          label="监测指标"
          prop="targetId"
        >
          <hl-group
            align
            class="w-full"
            full
          >
            <hl-group
              align="items-between items-top"
              class="w-full"
              gap="40px"
            >
              <hl-group
                style="width: 300px;"
                align="items-left items-middle"
                gap="var(--lg)"
              >
                <search-target-tree
                  ref="targetTreeRef"
                  v-model="formData.targetId"
                  :isEmitCode="true"
                  :dataType="'INTERZONE'"
                  :targetFrequency="'none'"
                  @changed="changeTargetSelect"
                />
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-form-item>
      </hl-group>
      <hl-form-item
        class="static"
        label="指标数据项"
      >
        <hl-group
          align
          class="w-full"
          dir="vertical"
          gap="var(--lg)"
          full
        >
          <hl-group
            class="p-lg bg-light radius-md w-full"
            align="items-left items-top"
            dir="vertical"
            gap="var(--sm)"
          >
            <hl-group
              style="flex-wrap: wrap;width: 800px;"
              align="items-left items-top"
              gap="var(--sm)"
            >
              <hl-group
                v-for="item in targetList"
                :key="item.targetDataId"
                class="p-y-xs p-x-sm bg-content radius-lg box-shadow-sm"
                align="items-left items-middle"
                gap="var(--xs)"
              ><span class="text-regular">{{item.targetDataName}}</span>
                <hl-icon
                  size="xs"
                  class="static text-regular cursor-pointer"
                  @click="handleRemove('target', item.targetDataId)"
                >
                  <TwoClose></TwoClose>
                </hl-icon>
              </hl-group>
              <hl-group
                class="p-y-xs p-x-md radius-lg cursor-pointer"
                align="items-center items-middle"
                gap="var(--xxs)"
                @click="addLinkData"
              >
                <hl-icon
                  size="xs"
                  class="static"
                  type="primary"
                >
                  <TwoPlus></TwoPlus>
                </hl-icon><span class="text-primary">选择指标数据项</span>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-group>
      </hl-form-item>
      <hl-form-item
        class="w-full"
        label="起始时间"
        prop="timeRange"
      >
        <hl-group
          align="items-left items-top"
          class="w-full"
        >
          <hl-date-picker
           @change="changeTime"
            type="datetimerange"
            v-model="formData.timeRange"
            class="static"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            style="width: 400px;"
            start-placeholder="开始时间"
            range-separator="至"
            end-placeholder="结束时间"
          ></hl-date-picker>
        </hl-group>
      </hl-form-item>
      <hl-form-item
        class="static"
        label=" "
      >
        <hl-group
          align="items-left items-top"
          class="w-full"
          dir="vertical"
          gap="var(--lg)"
        >
          <hl-group
            class="radius-md static"
            align="items-left items-top"
            gap="var(--sm)"
          >
            <hl-button
              icon-position="left"
              type="primary"
              rational
              @click="addModel('addOrSave')"
            ><template #icon>
                <hl-icon>
                  <TwoSave></TwoSave>
                </hl-icon>
              </template>保存分析模型</hl-button>
              <hl-button
              :disabled="disabledSaveAs"
              class="static"
              effect="light"
              type="primary"
              @click="addModel('saveAs')"
            >另存为</hl-button>
            <hl-button
              class="static"
              effect="light"
              type="primary"
              @click="searchAnalysisModel"
            >查询分析</hl-button>
          </hl-group>
        </hl-group>
      </hl-form-item>
    </hl-form>
  </hl-group>
  <TargetTransfer
    ref="transferRef"
    :selected="targetList"
    @ok="handleUpdateTarget"
    @close="handleCloseTarget"
  />
  <ModelNameDialog
  ref="nameRef"
    @saveName="saveName"
  />
</template>
<script lang="ts" setup>
import { computed, ref, reactive, watch } from 'vue';
import { HlMessageBox, HlMessage, FormInstance } from 'hongluan-ui';
import { cloneDeep, max, min } from 'lodash-es';
import dayjs from 'dayjs';
import { apiAnalysisModelObj } from '@/apis/modules/analysis-model';
import { SearchModel, TargetTransfer, ModelNameDialog } from './components';
import { apiTargetDataObj } from '@/apis/modules/target-data-access';

import { IlistSpace } from '@/apis/modules/analysis-model/model';

const emit = defineEmits(['queryModel']);

const formRef = ref<FormInstance>();
const nameRef = ref();
const transferRef = ref();
const targetTreeRef = ref();
const formData = reactive({
  targetId: '',
  analysisModelName: '',
  targetDataIds: [],
  startTime: '',
  endTime: '',
  timeRange: []
  //  analysisModelId?: number;
});
const rules = {
  targetId: [{ required: true, message: '请选择监测指标', trigger: ['change', 'blur'] }],
  timeRange: [{ required: true, message: '请选择时间', trigger: ['change', 'blur'] }],
};
const dlgVisible = ref(false);
const searchModelRef = ref();
const curSaveType = ref('addOrSave');
const curModel = ref();
const targetList = ref();
const targetDataIdList = ref();
const allTargetDataList = ref();
const disabledSaveAs = computed(() => !curModel.value?.analysisModelId);
// watch(
//   () => targetList.value,
//   newVal => {
//     if (targetList.value.length) {
//       if (targetList.value.length === 1) {
//         formData.timeRange = [targetList.value[0].initCollectTime, ''];
//       } else {
//         const timeList = targetList.value.map(e => new Date(e.initCollectTime).getTime());
//         const maxTime = dayjs(max(timeList)).format('YYYY-MM-DD HH:mm:ss');
//         const minTime = dayjs(min(timeList)).format('YYYY-MM-DD HH:mm:ss');
//         formData.timeRange = [minTime, maxTime];
//       }
//     } else {
//       formData.timeRange = [];
//     }
//   }
// );

watch(
  () => formData.targetId,
  async(newVal: string|number) => {
    if (newVal) {
      const result = await apiTargetDataObj.list(newVal as number);
      allTargetDataList.value = result.data;
    }
  }
);

const modelChanged = (data: IlistSpace.Data) => {
  curModel.value = data;
  if (curModel.value?.analysisModelId) {
    formData.targetId = curModel.value.targetId;
    targetList.value = curModel.value.referTargetDataList;
    formData.timeRange = [curModel.value.startTime, curModel.value.endTime];
  }
};

const changeTime = () => {
  const dayDiff = dayjs(formData.timeRange[1]).diff(formData.timeRange[0], 'days');
  if (dayDiff > 180) {
    HlMessage({
      message: `选择时间跨度不得超过180天!,目前跨度【${dayDiff}】天`,
    });
  }
  return dayDiff > 360;
};

const addNewModel = () => {
  curModel.value = {};
  formData.timeRange = [dayjs().format('YYYY-MM-DD 00:00:00'), dayjs().format('YYYY-MM-DD 23:59:59')];
  formData.targetId = '';
  targetTreeRef.value.reset();
  targetList.value = [];
};
const changeTargetSelect = e => {
  formData.targetId = e.id;
  formRef.value?.validateField('targetId');
  targetList.value = [];
};
const addLinkData = () => {
  if (targetList.value?.length > 20) {
    HlMessage.warning('至多选择20条指标数据项目');
    return;
  }
  if (formData.targetId) {
    transferRef.value.getTargetDataList(allTargetDataList.value);
  } else {
    HlMessage.warning('请先选择指标');
  }
};
const handleUpdateTarget = targets => {
  targetList.value = allTargetDataList.value.filter(e => targets.find(k => k === e.targetDataId));
};

const handleCloseTarget = () => {
  dlgVisible.value = false;
};

const handleRemove = (type: string, id: string) => {
  targetList.value = targetList.value.filter(
    item => item.targetDataId !== id
  );
};

const addModel = async(saveType: string) => {
  const isValid = await formRef.value?.validate();
  // if (isValid) {
  //   if (saveType === 'addOrSave') {
  //     if (curModel.value?.analysisModelId) {
  //       saveName(curModel.value.analysisModelName);
  //     } else {
  //       nameRef.value.addName({});
  //     }
  //   } else if (saveType === 'saveAs') {
  //   // nameRef.value.editName(curModel.value);
  //     nameRef.value.addName({});
  //   }
  // }
  if (isValid) {
    if (changeTime()) return false;
    const query = solveParams();
    if (query) {
      curSaveType.value = saveType;
      if (saveType === 'addOrSave') {
        if (curModel.value?.analysisModelId) {
          saveName(curModel.value.analysisModelName);
        } else {
          nameRef.value.addName({});
        }
      } else if (saveType === 'saveAs') {
        // nameRef.value.editName(curModel.value);
        nameRef.value.addName({});
      }
    }
  }
};

const saveName = (name: string) => {
  formData.analysisModelName = name;
  saveModel();
};
const saveModel = async() => {
  const query = solveParams();
  if (query) {
    if (curSaveType.value === 'saveAs') query.analysisModelId = '';
    const result = await apiAnalysisModelObj.postSave(query);
    if (result.data === true) {
      HlMessage.success('保存成功');
      nameRef.value.cancel();
      searchModelRef.value.getModelList(true);
    }
  }
};

const solveParams = () => {
  const params = cloneDeep(formData);
  if (targetList.value?.length) {
    if (curModel.value?.analysisModelId) {
      params.analysisModelId = curModel.value?.analysisModelId;
    }
    params.targetDataIds = targetList.value.map(e => e.targetDataId);
    params.startTime = params.timeRange[0];
    params.endTime = params.timeRange[1];
    return params;
  } else {
    HlMessage.warning('请至少添加一条指标数据项');
    return false;
  }
};

const searchAnalysisModel = async() => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    // 日期不允许超出
    if (changeTime()) return false;
    const query = solveParams();
    emit('queryModel', query);
  }
};

// onMounted(async() => {
// });
</script>
<style lang="scss">
  .data-bg {
    background: url('~@/assets/images/wholeAnalysis/top-bg.svg') no-repeat;
    background-color: var(--bg-content);
    background-position: right -10% bottom 30%;
    background-size: 36% 166%;
  }
</style>
