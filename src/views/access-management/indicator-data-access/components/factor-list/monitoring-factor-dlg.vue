<template>
  <hl-dialog :model-value="true" class="md-dialog" width="910px" :title="`${id ? '编辑' : '添加'}指标数据项`"
    @close="$emit('cancel')" borderless>
    <hl-form ref="formRef" :model="formData" :rules="rules" class="w-full" gap="var(--lg)"
      style="--form-label-color: var(--text-regular);">
      <hl-group align="items-left" class="w-full" gap="var(--lg)" full style="--form-label-color: var(--text-regular);">
        <hl-form-item class="w-full" label="指标数据项名称" prop="targetDataName">
          <hl-group align="items-top" class="w-full" full>
            <hl-input v-model="formData.targetDataName" block maxlength="100" placeholder="指标数据项名称"></hl-input>
          </hl-group>
        </hl-form-item>
        <hl-form-item class="w-full" label="指标">
          <hl-group align="items-top" class="w-full" full>
            <hl-select block disabled v-model="formData.targetId" placeholder="请选择指标" clearable>
              <hl-option v-for="item in indicatorList" :key="item.targetId" :value="item.targetId"
                :label="item.targetName"></hl-option>
            </hl-select>
          </hl-group>
        </hl-form-item>
      </hl-group>
      <hl-group align="items-left items-middle" class="w-full" gap="var(--lg)" full
        style="--form-label-color: var(--text-regular);">
        <hl-form-item class="w-full" label="数据类型">
          <hl-group align="items-center" class="w-full" dir="vertical" full>
            <hl-input disabled v-model="curTarget.dataTypeName" block placeholder="数据类型"></hl-input>
          </hl-group>
        </hl-form-item>
        <hl-form-item class="w-full" label="是否公用">
          <hl-group align="items-center" class="w-full" dir="vertical" full>
            <hl-select block placeholder="是否公用" v-model="formData.isPublic" :disabled="$props.id && formData.isRefer">
              <hl-option v-for="item in publicOptionList" :key="item.dictCode" :label="item.dictName"
                :value="item.dictCode"></hl-option>
            </hl-select>
          </hl-group>
        </hl-form-item>
        <hl-form-item class="w-full" label="计算周期类型">
          <hl-group align="items-center" class="w-full" dir="vertical" full>
            <hl-input disabled v-model="curTarget.computePeriodTypeName" block placeholder="计算周期类型"></hl-input>
          </hl-group>
        </hl-form-item>

      </hl-group>
      <hl-group align="items-left items-middle" class="w-full" gap="var(--lg)" full
        style="--form-label-color: var(--text-regular);">
        <hl-form-item class="w-full" label="数据频率">
          <hl-group align="items-center" class="w-full" dir="vertical" full>
            <hl-input v-model="curTarget.targetFrequencyName" block disabled placeholder="数据频率"></hl-input>
          </hl-group>
        </hl-form-item>
        <hl-form-item class="w-full" label="启用时间" prop="initCollectTime">
          <hl-group align="items-center" class="w-full" dir="vertical" full>
            <hl-date-picker v-model="formData.initCollectTime" format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss" type="datetime" block placeholder="启用时间"></hl-date-picker>
          </hl-group>
        </hl-form-item>
      </hl-group>

      <!-- 简单指标阈值等级调整 -->
      <hl-form-item label="阈值等级" prop="thresholdLevelVOList" class="col-span-24" v-if="formData.dataType === 'INTERZONE'">
        <hl-group align="items-top" class="w-full" full>
          <hl-group class="p-lg bg-light w-full" gap="var(--sm)" full>
            <hl-row class="show-col w-full m-xs" gap="var(--md)">
              <!-- <hl-col span="col-8"> -->
                <hl-form-item v-for="(item, index) in formData.thresholdLevelVOList" :key="index" class="col-12 hl-col"
                :label="item.thresholdLevelName" :prop="'thresholdLevelVOList.' + index + '.thresholdLevelValue'"
                :rules="rules2">
                <hl-group align="items-top" class="w-full">
                  <hl-input v-model="item.thresholdLevelValue" maxlength="100" placeholder="请输入阈值" clearable
                    style="width: 80%"></hl-input>
                </hl-group>
              </hl-form-item>
              <!-- </hl-col> -->
            </hl-row>
          </hl-group></hl-group>
      </hl-form-item>
      <hl-form-item class="w-full" label="数据时间区间" prop="timeScopeParams">
        <hl-group align="items-top" class="w-full" dir="vertical" full>
          <hl-group class="p-lg bg-light w-full" align="items-left" dir="vertical" gap="var(--sm)" full>
            <hl-group v-if="formData.timeScopeParams && formData.timeScopeParams.length" dir="vertical">
              <hl-group align="items-center" v-for="(item, index) in formData.timeScopeParams" :key="index"
                class="m-b-sm">
                <hl-date-picker format="YYYY-MM-DD" value-format="YYYY-MM-DD" v-model="item.dateStart" type="date"
                  class="w-xxl" placeholder="请选择开始日期" :disabled="action === 'edit'" />
                <span class="m-r-xs m-l-xs m-t-xxs" align="items-center">至</span>
                <hl-date-picker format="YYYY-MM-DD" value-format="YYYY-MM-DD" v-model="item.dateEnd" type="date"
                  class="w-xxl" placeholder="请选择结束日期" :disabled="action === 'edit'" />
                <hl-time-picker class="m-l-xl" v-model="item.timeStart" placeholder="选择开始时间" format="HH:mm:ss"
                  value-format="HH:mm:ss" :disabled="action === 'edit'" />
                <span class="m-r-xs m-l-xs m-t-xxs">至</span>
                <hl-time-picker format="HH:mm:ss" value-format="HH:mm:ss" v-model="item.timeEnd" placeholder="选择结束时间"
                  :disabled="action === 'edit'" />
                <!-- <hl-button
                icon-position="left"
                class="m-l-xxs"
                v-if="action!=='edit'"
                @click="delTimeConfigParams(index)"
              >
                <template #icon>
                  <hl-icon>
                    <FillMinus />
                  </hl-icon>
                </template>
              </hl-button> -->
              </hl-group>
              <!-- <hl-group
              @click="addTimeConfigParams"
              class="p-x-md radius-lg w-full"
              style="padding-top: 6px; padding-bottom: 6px;cursor:pointer;"
              align="items-center items-middle"
              gap="var(--xxs)"
            >
              <hl-icon
                size="xs"
                class="static"
                type="primary"
              >
                <TwoPlus></TwoPlus>
              </hl-icon><span class="text-primary">增加时间区间</span>
            </hl-group> -->

            </hl-group>
            <hl-group v-else align="items-center">
              暂无数据
            </hl-group>

          </hl-group>

        </hl-group>
      </hl-form-item>
      <hl-group align="items-left items-middle" class="w-full" gap="var(--lg)" full
        style="--form-label-color: var(--text-regular);">
        <hl-form-item class="w-full" label="计量单位">
          <hl-group align="items-center" class="w-full" dir="vertical" full>
            <hl-input v-model="curTarget.measureUnitName" block disabled placeholder="计量单位"></hl-input>
          </hl-group>
        </hl-form-item>
        <hl-form-item class="w-full" label="指标分类">
          <hl-group align="items-center" class="w-full" dir="vertical" full>
            <hl-input v-model="curTarget.targetTypeName" block disabled placeholder="指标分类"></hl-input>
          </hl-group>
        </hl-form-item>
        <hl-form-item class="w-full" label="计算公式">
          <hl-group align="items-center" class="w-full" dir="vertical" full>
            <hl-select block placeholder="计算公式" v-model="formData.formulaId" clearable>
              <hl-option v-for="item in formulList" :key="item.formulaId" :label="item.formulaName"
                :value="item.formulaId"></hl-option>
            </hl-select>
          </hl-group>
        </hl-form-item>
      </hl-group>
      <hl-form-item class="w-full" label="描述">
        <hl-group align="items-left" class="w-full" dir="vertical" full>
          <hl-input v-model="formData.targetDataDesc" native-type="textarea" block placeholder="0/500"></hl-input>
        </hl-group>
      </hl-form-item>
    </hl-form>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="$emit('cancel')">取消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="ok">{{ id ? '保存' : '确定' }}</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { onMounted, PropType, reactive, ref, watch } from 'vue';
import { FormInstance } from 'hongluan-ui';

// import { RULES_ARR } from '@/common';
// import { getListDict } from '@/common';
// import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { apiTargetInfoControllerObj } from '@/apis/modules/target-info-controller';
// import { apiMeasureUnitObj } from '@/apis/modules/measure-unit';
// import { apiEquipmentObj } from '@/apis/modules/equipment';
// import { apiDictObj } from '@/apis/modules/dict';
// import { IgetListMeasureUnitsSpace } from '@/apis/modules/measure-unit/model';
import { apiAccessItemObj } from '@/apis/modules/target-access-item';
import { apiTargetDataObj } from '@/apis/modules/target-data-access';
import { apiFormulaDefinedObj } from '@/apis/modules/formula-defined';
import { getSecondsToUnitTime } from '@/common';
import { isValidName, EXPRESSIONS } from '@/common';
import { addFactorItem } from '@/views/monitoring-config/second-trigger-config/utils';
import { cloneDeep } from 'lodash-es';
import { ruleNumber } from '@/common/validator';

/* const delWarningItem = (item: any, index: number) => {
  item.splice(index, 1);
  validate();
};
const addWarningItem = (item: any) => {
  item.push(addFactorItem());
}; */
const rules2 = ref([
  {
    required: true, message: '阈值不能为空', trigger: 'blur'
  },
  ruleNumber,
  {
    validator: (
      _: any,
      value: any,
      callback: (err?: Error) => void
    ) => {
      let isValid = true;
      if (value) {
        // 判断阈值是否有重复
        const thresholdLevelValueArr = formData.thresholdLevelVOList.map(item => { return item.thresholdLevelValue; });
        if (Array.from(new Set(thresholdLevelValueArr)).length < thresholdLevelValueArr.length) {
          callback(new Error('阈值不能重复'));
          isValid = false;
        }
        if (isValid) callback();
      } else {
        callback();
      }
    },
    trigger: 'blur'
  }
]
);
const props = defineProps({
  id: Number,
  action: String,
});
const emit = defineEmits(['cancel', 'ok']);

const formRef = ref<FormInstance>();
const formData = reactive({
  targetDataName: '',
  targetId: '',
  isMultiple: 1,
  isPublic: 0,
  formulaId: '',
  targetDataDesc: '',
  timeScopeParams: [] as {
    dateStart: string;
    dateEnd: string;
    timeStart: string;
    timeEnd: string;
  }[],
  referTargetDataIds: [] as number[],
  thresholdLevelVOList: []
});
const curTarget = ref({
  dataTypeName: '',
  computePeriodTypeName: '',
  targetFrequency: '',
  targetFrequencyName: '',
  targetFrequencyUnitName: '',
  measureUnitName: '',
  targetTypeName: '',
  isPublicName: '否'
});
const publicOptionList = ref([
  { dictName: '是', dictCode: 1 },
  { dictName: '否', dictCode: 0 },
]);
const isValidNameChars = async (
  rule: any,
  value: string,
  callback: (error?: Error) => void
) => {
  const res = await apiTargetInfoControllerObj.getFindTargetInfoNameVerify(
    value,
    props.id!
  );
  if (!res.data) {
    callback(new Error('数据项名称已存在，请更换名称'));
  }
  callback();
};

const rules = {
  targetDataName: [
    { required: true, message: '数据项名称不能为空' },
    {
      min: 1,
      max: 100,
      message: '长度小于100个字符',
    },
    // { validator: isValidNameChars, trigger: 'blur' },
    { validator: isValidName, trigger: 'blur' },
  ],
};
const indicatorList = ref();
const formulList = ref();
const ok = async () => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    const params = cloneDeep(formData);
    params.timeScopes = params.timeScopeParams;
    params.thresholdLevelParamList = params.thresholdLevelVOList;
    if (props.id) {
      await apiTargetDataObj.postUpdateSimpleTargetData(
        Object.assign({ targetDataId: props.id }, params)
      );
    } else {
      await apiAccessItemObj.add(params);
    }
    emit('ok');
  }
};
const validate = async () => {
  await formRef.value?.validate();
};
// 添加时间区间
const addTimeConfigParams = () => {
  formData.timeScopeParams.push({
    dateStart: '',
    dateEnd: '',
    timeStart: '',
    timeEnd: '',
  });
};
const delTimeConfigParams = (index: number) => {
  formData.timeScopeParams.splice(index, 1);
  formData.timeScopeParams.length && validate();
};
onMounted(async () => {
  const dict1 = await apiTargetInfoControllerObj.getListTargetInfoListVOs('');
  indicatorList.value = dict1.data;
  if (props.id) {
    const { data } = await apiTargetDataObj.getDetail(
      props.id as number
    );
    Object.assign(formData, data);
    Object.assign(curTarget.value, data);
    formData.timeScopeParams = data.timeScopes === '' ? [] : data.timeScopes;
    curTarget.value.targetFrequencyName = +curTarget.value.targetFrequency > 0 ? getSecondsToUnitTime(curTarget.value, 'targetFrequencyUnit', 'targetFrequency') + curTarget.value.targetFrequencyUnitName : '--';
    curTarget.value.isPublicName = curTarget.value.isPublic === 1 ? '是' : '否';
    const params = {
      useForPeriod: '',
      useForRealtime: '',
      useForSimple: 1,
    };
    if (formData.targetFrequency > 0) {
      params.useForPeriod = 1;
    } else {
      params.useForRealtime = 1;
    }
    const formulaResult = await apiFormulaDefinedObj.getListNewFormulaDefinedVOs(params);
    formulList.value = formulaResult.data;
  }
});
</script>
