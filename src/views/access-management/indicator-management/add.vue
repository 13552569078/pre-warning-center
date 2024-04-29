<template>
  <hl-panel class="data-bg" style="min-height: 920px;" header-style="gap: 0px;" borderless padding="var(--lg)"
    header-class="p-lg" body-style="padding-right: 20px; padding-left: 20px;"
    footer-class="items-left gap-md p-lg bg-content"><template #header>
      <div class="panel-header-left">
        <!-- <hl-icon class="static" type="primary" size="md">
          <FillOrnamentTitle4></FillOrnamentTitle4>
        </hl-icon> -->
      </div>
     <!-- <div class="panel-title">
        <h5 class="text-title">{{ `${targetId ? '编辑' : '添加'}监测指标` }}</h5>
      </div> -->
      <panel-header :title="`${targetId? '编辑' : '添加'}监测指标`"/>
      <div class="panel-header-right"></div>
    </template><template #default>
      <hl-form ref="formRef" :model="formData" :rules="rules" class="static" gap="var(--lg)" item-gap="var(--lg2)" :label-position="['items-left', 'items-middle']" >
        <!-- <hl-group full gap="var(--lg)"> -->
          <hl-form-item class="w-full" label="监测指标" prop="targetName">
            <hl-input v-model="formData.targetName" placeholder="请输入监测指标" block maxlength="20" show-word-limit
              style="max-width: 600px;" />
          </hl-form-item>
          <hl-form-item class="w-full" label="数据类型" prop="dataType">
            <hl-group align="items-left items-middle" gap="var(--md)">
              <hl-radio-group v-model="formData.dataType" gap="var(--xl)" :disabled="formDisabled">
                <!-- <hl-radio v-for="r in dataTypes" :key="r.dictCode" :label="r.dictCode" custom>
                  <hl-group class="p-x-sm border solid border-regular checked:border-primary radius-lg"
                    style="padding-top: 5px; padding-bottom: 5px; --border-size: 2px;" align="items-left items-middle"
                    gap="6px">
                    <span class="text-center static checked:text-primary checked:font-bold ">{{ r.dictName }}</span>
                  </hl-group>
                </hl-radio> -->
                <hl-radio v-for="r in dataTypes" :key="r.dictCode" :label="r.dictCode">{{ r.dictName }}</hl-radio>
              </hl-radio-group>
            </hl-group>
          </hl-form-item>
      <!-- </hl-group> -->
        <!-- TODO 预警等级 -->
        <hl-form-item v-if="formData.dataType === 'INTERZONE'" class="w-full" label="阈值等级" prop="thresholdLevelList">
          <hl-group class="p-lg bg-light radius-md w-full" align="items-top" dir="vertical" gap="var(--sm)" full="full-x">
            <hl-group v-for="(item, index) in formData.thresholdLevelList" :key="index"
              class="p-y-sm p-x-md bg-content radius-lg w-full box-shadow-sm" align="items-between items-middle"
              gap="var(--lg)">
              <hl-group align="items-left items-middle" gap="var(--lg)">
                <span class="static">等级名称</span>
                <hl-group align="items-left items-middle" gap="var(--xs)">
                  <hl-input v-model="item.thresholdLevelName" class="static" placeholder="请输入" maxlength="20"
                    style="width: 100%;"></hl-input>

                </hl-group><span class="static">阈值</span>
                <hl-group align="items-left items-middle" gap="var(--xs)">
                  <hl-input v-model="item.thresholdLevelValue" class="static" placeholder="请输入" style="width: 100%;"
                    maxlength="20"></hl-input>
                </hl-group>
              </hl-group>
              <hl-icon v-if="index !== 0 && !item.isRefer" size="xs" type="danger"
                class="static text-secondary cursor-pointer hover:text-danger"
                @click="delThresholdLevel(formData.thresholdLevelList as thresholdLevel[], index)">
                <FillCircleMinus></FillCircleMinus>
              </hl-icon>
            </hl-group>

            <hl-group v-if="Array.isArray(formData.thresholdLevelList) && formData.thresholdLevelList.length <= 9"
              class="p-x-md radius-lg w-full" style="padding-top: 6px; padding-bottom: 6px;"
              align="items-center items-middle" gap="var(--xxs)">
              <hl-icon size="xs" class="static" type="primary" @click="addThresholdLevel">
                <TwoPlus></TwoPlus>
              </hl-icon><span class="text-primary static cursor-pointer" @click="addThresholdLevel">增加阈值等级</span>
            </hl-group>
          </hl-group>
        </hl-form-item>
        <!-- <hl-form-item v-if="formData.dataType === 'INTERZONE' && Array.isArray(formData.thresholdValue)" class="w-full"
          label="阈值范围" prop="thresholdValue">
          <hl-group class="p-lg bg-light radius-md w-full" align="items-top" dir="vertical" gap="var(--sm)" full="full-x">
            <hl-group v-for="(item, index) in formData.thresholdValue" :key="index"
              class="p-y-sm p-x-md bg-content radius-lg w-full box-shadow-sm" align="items-between items-middle"
              gap="var(--lg)">
              <hl-group align="items-left items-middle" gap="var(--lg)">
                <span class="static">下区间</span>
                <hl-group align="items-left items-middle" gap="var(--xs)">
                  <hl-select class="static" style="width: 100px; width: 100px;" placeholder="请选择"
                    v-model="item.lowExpression" filterable clearable>
                    <hl-option v-for="ep in EXPRESSIONS" :key="ep.key" :value="ep.key" :label="ep.label" />
                  </hl-select>
                  <hl-input v-model="item.lowValue" class="static" placeholder="请输入" style="width: 140px;"></hl-input>

                </hl-group><span class="static">上区间</span>
                <hl-group align="items-left items-middle" gap="var(--xs)">
                  <hl-select v-model="item.upExpression" class="static" style="width: 100px; width: 100px;"
                    placeholder="请选择" filterable clearable>
                    <hl-option v-for="ep in EXPRESSIONS" :key="ep.key" :value="ep.key" :label="ep.label" />
                  </hl-select>
                  <hl-input v-model="item.upValue" class="static" placeholder="请输入" style="width: 140px;"></hl-input>
                </hl-group>
              </hl-group>
              <hl-icon v-if="index !== 0" size="xs" type="danger"
                class="static text-secondary cursor-pointer hover:text-danger"
                @click="delTimeZone(formData.thresholdValue as ThresholdValue[], index)">
                <FillCircleMinus></FillCircleMinus>
              </hl-icon>
            </hl-group>

            <hl-group v-if="Array.isArray(formData.thresholdValue) && formData.thresholdValue.length <= 9"
              class="p-x-md radius-lg w-full" style="padding-top: 6px; padding-bottom: 6px;"
              align="items-center items-middle" gap="var(--xxs)">
              <hl-icon size="xs" class="static" type="primary" @click="addTimeZone">
                <TwoPlus></TwoPlus>
              </hl-icon><span class="text-primary static cursor-pointer" @click="addTimeZone">增加阈值范围</span>
            </hl-group>
          </hl-group>
        </hl-form-item> -->
        <hl-form-item v-else-if="formData.dataType === 'SWITCH'" class="w-full" label="阈值" prop="thresholdValue">
          <hl-group class="p-lg bg-light radius-md w-full" align="items-left items-middle" gap="var(--sm)"
            style="width: 500px;">
            <span class="text-light static">关闭</span>
            <hl-switch v-model="formData.thresholdValue" :active-value="1" :inactive-value="0" active-color="#4CC09E" inactive-color="#BDBDBD"></hl-switch>
            <span class="text-primary static">开启</span>
          </hl-group>
        </hl-form-item>
        <hl-form-item class="w-full" label="计量单位" prop="measureUnitId">
          <hl-select v-model="formData.measureUnitId" placeholder="请选择计量单位" block filterable clearable
            style="width: 600px; min-width: 600px;">
            <hl-option v-for="u in measureUnits" :key="u.measureUnitId" :value="u.measureUnitId"
              :label="u.measureUnitName" />
          </hl-select>
        </hl-form-item>
        <hl-form-item class="w-full" label="计算周期类型" prop="targetFrequencyOrigin">
          <hl-group align="items-left items-middle" class="w-full" gap="var(--lg)">
            <hl-radio-group v-model="formData.targetFrequencyOrigin" gap="var(--xl)" :disabled="formDisabled">
              <hl-radio type="primary" :label="'0'">实时计算</hl-radio>
              <hl-radio type="primary" :label="'1'">周期计算</hl-radio>
            </hl-radio-group>
          </hl-group>
        </hl-form-item>

        <hl-form-item label="数据频率" prop="targetFrequency" v-if="formData.targetFrequencyOrigin !== '0'">
          <hl-group merge indent>
            <hl-input v-model="formData.targetFrequency" class="w-xs" :disabled="formDisabled" />
            <hl-select v-model="formData.targetFrequencyUnitCode" placeholder="单位" class="static w-xs" filterable
              :disabled="formDisabled">
              <hl-option v-for="item in frequencyUnits" :key="item.dictCode" :label="item.dictName"
                :value="item.dictCode"></hl-option>
            </hl-select>
          </hl-group>
        </hl-form-item>

        <hl-form-item class="w-full" label="描述">
          <hl-input v-model="formData.targetDesc" native-type="textarea" class="static" placeholder="请输入描述"
            show-word-limit maxlength="500" style="min-width: 600px;"></hl-input>
        </hl-form-item>
      </hl-form>
    </template></hl-panel>

  <hl-affix position="bottom" :offset="0">
    <hl-group align="items-middle" class="affix-bottom w-full box-shadow-lg p-lg">
      <hl-button type="primary" class="m-r-md page-primary-button" @click="ok">{{ targetId ? '保 存' : '确 定' }}</hl-button>
      <hl-button @click="$router.go(-1)">取 消</hl-button>
    </hl-group>
  </hl-affix>
</template>

<script lang="ts" setup>
import { onMounted, watch, reactive, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { cloneDeep } from 'lodash-es';
import { FormInstance } from 'hongluan-ui';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { apiTargetInfoControllerObj } from '@/apis/modules/target-info-controller';
import { apiMeasureUnitObj } from '@/apis/modules/measure-unit';
import { IgetListMeasureUnitsSpace } from '@/apis/modules/measure-unit/model';
import { isValidName } from '@/common';
import {
  getSecondsToUnitTime,
  getUnitTimeToSeconds,
  UNIT_FREQUENCY_LIST,
  getListDict,
  EXPRESSIONS,
} from '@/common';
import type { FormData, ThresholdValue, thresholdLevel } from './types';

const addThresholdLevel = () => {
  if (Array.isArray(formData.thresholdLevelList)) {
    if (formData.thresholdLevelList.length > 9) return;
    formData.thresholdLevelList.push({
      thresholdLevelId: '',
      thresholdLevelName: '',
      thresholdLevelValue: ''
    });
  }
};
const delThresholdLevel = (factors: thresholdLevel[], idx: number) => {
  factors.splice(idx, 1);
};

const route = useRoute();
const router = useRouter();
const targetTypeCode = computed(() => route.query.targetTypeCode as string);
const targetId = computed(() => route.query.targetId as string);

const formRef = ref<FormInstance>();
const formData = reactive<FormData>({
  targetId: '',
  targetTypeCode: '',
  targetName: '',
  measureUnitId: '',
  dataType: '',
  targetFrequency: '0',
  targetFrequencyOrigin: '0',
  targetDesc: '',
  thresholdValue: [],
  thresholdLevelList: [],
  targetFrequencyUnitCode: 'SECOND',
});

const formDisabled = computed(() => { return !!formData.targetId; });

watch(
  () => formData.dataType,
  async (n, o) => {
    /* if (n === 'INTERZONE') {
      if (!Array.isArray(formData.thresholdValue)) {
        formData.thresholdValue = [] as ThresholdValue[];
      }
    } else  */if (n === 'SWITCH') {
      formData.thresholdValue = 1;
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

const isValidNameChars = async (
  rule: any,
  value: string,
  callback: (error?: Error) => void
) => {
  const res = await apiTargetInfoControllerObj.getFindTargetInfoNameVerify(
    value,
    targetId.value
  );
  if (!res.data) {
    callback(new Error('指标名称已存在，请更换名称'));
  }
  callback();
};
const isValidTargetFrequency = (
  rule: any,
  value: string,
  callback: (error?: Error) => void
) => {
  if (+value > 0) {
    callback();
  } else {
    callback(new Error('周期频率必须大于0'));
  }
};

const rules = {
  targetName: [
    { required: true, message: '指标名称不能为空' },
    {
      min: 1,
      max: 20,
      message: '长度小于20个字符',
    },
    { validator: isValidNameChars, trigger: 'blur' },
    { validator: isValidName, trigger: 'blur' },
  ],
  dataType: [{ required: true, message: '请选择数据类型' }],
  /* thresholdValue:
  {
    required: true,
    validator: (
      _: any,
      value: any,
      callback: (err?: Error) => void
    ) => {
      if (formData.dataType === 'INTERZONE') {
        if (!value.length) callback(new Error('阈值范围不允许为空'));
        if (value.length) {
          if (value.length > 10) { callback(new Error('阈值最多为10条')); }
          let isValid = true;
          (value as any).forEach((fv: any) => {
            if (fv.lowExpression === 'none' || fv.upExpression === 'none') {
              if (
                fv.lowExpression === 'none' &&
                fv.upExpression === 'none'
              ) {
                isValid = true;
              }
              if (
                fv.lowExpression === 'none' &&
                fv.upExpression !== 'none' &&
                !fv.upValue
              ) {
                callback(new Error('请填写上区间值'));
                isValid = false;
              }
              if (
                fv.upExpression === 'none' &&
                fv.lowExpression !== 'none' &&
                !fv.lowValue
              ) {
                callback(new Error('请填写下区间值'));
                isValid = false;
              }
            } else {
              if (
                !fv.lowExpression ||
                !fv.lowValue ||
                !fv.upExpression ||
                !fv.upValue
              ) {
                callback(new Error('请填写阈值范围信息'));
                isValid = false;
              }
            }
          });
          if (isValid) callback();
        } else {
          callback();
        }
      } else {
        callback();
      }
    },
  }, */
  thresholdLevelList:
  {
    required: true,
    validator: (
      _: any,
      value: any,
      callback: (err?: Error) => void
    ) => {
      if (!value.length) callback(new Error('阈值等级不允许为空'));
      if (value.length) {
        if (value.length > 10) { callback(new Error('阈值等级最多为10条')); }
        let isValid = true;
        console.log('332', value);
        (value as any).forEach((fv: any) => {
          if (fv.thresholdLevelName === '' && fv.thresholdLevelValue === '') {
            if (
              !fv.thresholdLevelName ||
              !fv.thresholdLevelValue
            ) {
              callback(new Error('请填写阈值等级'));
              isValid = false;
            }
          } else {
            if (
              fv.thresholdLevelName !== '' &&
              fv.thresholdLevelValue === ''
            ) {
              callback(new Error('请填写阈值'));
              isValid = false;
            }
            if (
              fv.thresholdLevelName === '' &&
              fv.thresholdLevelValue !== ''
            ) {
              callback(new Error('请填写等级名称'));
              isValid = false;
            }

            if (fv.thresholdLevelValue !== '') {
              // 判断阈值等级是否是数字
              const regExp = /^[-]{0,1}[0-9]+[.]{0,1}[0-9]*$/;
              if (fv.thresholdLevelValue && !regExp.test(fv.thresholdLevelValue)) {
                callback(new Error('阈值必须是数字值'));
                isValid = false;
              }
            }
          }
        });
        // 判断阈值名称是否有重复
        const thresholdLevelNameArr = value.map((item: { thresholdLevelName: any; }) => { return item.thresholdLevelName; });
        if (Array.from(new Set(thresholdLevelNameArr)).length < thresholdLevelNameArr.length) {
          callback(new Error('等级名称不能重复'));
          isValid = false;
        }
        // 判断阈值是否有重复
        const thresholdLevelValueArr = value.map((item: { thresholdLevelValue: any; }) => { return item.thresholdLevelValue; });
        if (Array.from(new Set(thresholdLevelValueArr)).length < thresholdLevelValueArr.length) {
          callback(new Error('阈值不能重复'));
          isValid = false;
        }
        if (isValid) callback();
      } else {
        callback();
      }
    },
  },
  targetFrequencyOrigin: [{ required: true, message: '请选择计算周期' }],
  targetFrequency: [
    { required: true, message: '数据频率不能为空' },
    { validator: isValidTargetFrequency, trigger: 'blur' },
  ],
};
const measureUnits = ref<IgetListMeasureUnitsSpace.Data[]>([]);
const dataTypes = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const frequencyUnits = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);

const addTimeZone = () => {
  if (Array.isArray(formData.thresholdValue)) {
    if (formData.thresholdValue.length > 9) return;
    formData.thresholdValue.push({
      lowExpression: '',
      lowValue: '',
      upExpression: '',
      upValue: '',
    });
  }
};
const delTimeZone = (factors: ThresholdValue[], idx: number) => {
  factors.splice(idx, 1);
};
const ok = async () => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    const params = cloneDeep(formData);
    params.thresholdLevelParamList = params.thresholdLevelList;
    params.thresholdValue =
      Array.isArray(params.thresholdValue)
        ? JSON.stringify(params.thresholdValue)
        : params.thresholdValue;
    params.targetFrequency =
      params.targetFrequencyOrigin === '0'
        ? '0'
        : getUnitTimeToSeconds(
          params,
          'targetFrequencyUnit',
          'targetFrequency'
        );
    if (targetId.value) {
      await apiTargetInfoControllerObj.postModifyTargetInfo(
        Object.assign({ targetId: targetId.value }, params)
      );
    } else {
      params.targetTypeCode = targetTypeCode.value;
      await apiTargetInfoControllerObj.postAddTargetInfo(params);
    }
    router.go(-1);
  }
};

onMounted(async () => {
  if (targetId.value) {
    const result = await apiTargetInfoControllerObj.getFindTargetInfo(targetId.value);
    Object.assign(formData, result.data);
    formData.thresholdLevelList = result.data.thresholdLevelVOList || [];
    /* if (formData.dataType === 'INTERZONE') {
      if (typeof (formData.thresholdValue) === 'string' && formData.thresholdValue?.length) {
        formData.thresholdValue = JSON.parse(formData.thresholdValue as unknown as string);
      } else {
        formData.thresholdValue = [];
      }
    } else  */if (formData.dataType === 'SWITCH') {
      formData.thresholdValue = +formData.thresholdValue;
    }

    formData.targetFrequency =
      +formData.targetFrequency > 0
        ? getSecondsToUnitTime(
          formData,
          'targetFrequencyUnitCode',
          'targetFrequency'
        )
        : formData.targetFrequency;
    formData.targetFrequencyOrigin =
      formData.targetFrequency === '0' ? '0' : '1';
  }

  const dict1 = await apiMeasureUnitObj.getListMeasureUnits('');
  const dict2 = await getListDict('TARGET_TYPE_CODE');
  const dict3 = await getListDict('MONITOR_FREQUENCY_UNIT');

  measureUnits.value = dict1.data;
  dataTypes.value = dict2;
  frequencyUnits.value = dict3;
  frequencyUnits.value = dict3.filter(item => {
    return UNIT_FREQUENCY_LIST.includes(item.dictCode);
  });
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
