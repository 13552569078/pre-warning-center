<template>
  <!-- <hl-group class="w-full add-bg" style="overflow-y: auto;height: calc(100% - 128px);"> -->
    <hl-panel header-style="gap: 0px;" borderless padding="var(--lg)" header-class="p-lg" body-style="padding-right: 20px; padding-left: 20px; padding-top: 0; margin-bottom: 40px;" class="add-bg">
      <template
        #header>
        <div class="panel-header-left">
          <!-- <hl-icon class="static" type="primary" size="md">
            <FillOrnamentTitle4></FillOrnamentTitle4>
          </hl-icon> -->
        </div>
        <panel-header :title="`${$route.query.id ? '编辑' : '添加'}接入数据项`"/>
        <!-- <div class="panel-title">
          <h5 class="text-title">{{ `${$route.query.id ? '编辑' : '添加'}接入数据项` }}</h5>
        </div> -->
        <div class="panel-header-right"></div>
      </template><template #default>
        <hl-form class="static form-size" gap="var(--lg)" item-gap="var(--lg2)" ref="formRef" :model="formData" :rules="rules">
          <hl-group gap="var(--lg)">
            <hl-form-item label="来源类型" prop="source">
              <hl-radio-group v-model="formData.source" gap="var(--xl)" class="form-item-size">
                <hl-radio v-for="item in sourceOption" :label="item.dictCode"  :key="item.dictCode">{{ item.dictName }}</hl-radio>
              </hl-radio-group>
            </hl-form-item>
            <hl-form-item label="接入源" prop="accessSourceId">
              <hl-select :disabled="action === 'edit'" v-model="formData.accessSourceId" placeholder="请选择"
                class="form-item-size" block filterable clearable>
                <hl-option v-for="u in sourceList" :key="u.accessSourceId" :value="u.accessSourceId"
                  :label="u.accessSourceName" />
              </hl-select>
            </hl-form-item>
          </hl-group>
          <hl-group gap="var(--lg)">
            <hl-form-item label="接入对象" prop="accessSourceObjectId">
            <hl-select :disabled="action === 'edit'" v-model="formData.accessSourceObjectId" placeholder="请选择"
              class="form-item-size" block filterable clearable>
              <hl-option v-for="u in objList" :key="u.accessSourceObjectId" :value="u.accessSourceObjectId"
                :label="u.objectName" />
            </hl-select>
          </hl-form-item>
          <hl-form-item label="数据项名称" prop="accessItemName">
            <hl-input class="static form-item-size" :disabled="action === 'edit'" v-model="formData.accessItemName"
              placeholder="请输入" maxlength="100" show-word-limit />
          </hl-form-item>
          </hl-group>
          <hl-form-item class="w-full" label="接入周期类型" prop="accessFrequencyOrigin">
            <hl-group align="items-top" class="w-full" dir="vertical" gap="var(--xxs)" full="full-x">
              <hl-radio-group v-model="formData.accessFrequencyOrigin" gap="var(--xl)">
                <hl-radio :label="0">
                  实时计算
                </hl-radio>
                <hl-radio :label="1">
                  周期计算
                </hl-radio>
              </hl-radio-group>

            </hl-group>
          </hl-form-item>
          <hl-group v-if="formData.accessFrequencyOrigin !== 0" class="p-lg bg-light radius-md static"
            align="items-left items-top" dir="vertical" gap="var(--sm)" style="width: 600px;margin-left: 120px;">
            <hl-form-item label="" prop="accessFrequency">
              <hl-group merge indent>
                <hl-input v-model="formData.accessFrequency" class="w-xs" />
                <hl-select v-model="formData.accessFrequencyUnit" placeholder="单位" class="static w-xs" filterable>
                  <hl-option v-for="item in frequencyUnits" :key="item.dictCode" :label="item.dictName"
                    :value="item.dictCode"> </hl-option>
                </hl-select>
              </hl-group>
            </hl-form-item>
          </hl-group>
          <hl-form-item class="w-full" label="数据时间区间" prop="timeScopeParams">
            <hl-group align="items-top" class="w-full" dir="vertical" full>
              <hl-group class="p-lg bg-light" dir="vertical" gap="var(--sm)" style="width: 920px;">
                <hl-group class="m-b-sm bg-content p-md  w-full" v-for="(item, index) in formData.timeScopeParams"
                  :key="index" align="items-between items-middle">
                  <hl-group gap="var(--xs)" style="align-items:center;">
                    <span>日期</span>
                    <hl-date-picker format="YYYY-MM-DD" value-format="YYYY-MM-DD" v-model="item.dateStart" type="date"
                      style="width: 164px;" placeholder="开始日期" />
                    <span>至</span>
                    <hl-date-picker format="YYYY-MM-DD" value-format="YYYY-MM-DD" v-model="item.dateEnd" type="date"
                      style="width: 164px;" placeholder="结束日期" />
                    <span class="m-l-md">时间</span>
                    <hl-time-picker v-model="item.timeStart" placeholder="开始时间" style="width: 136px;" format="HH:mm:ss"
                      value-format="HH:mm:ss" />
                    <span>至</span>
                    <hl-time-picker format="HH:mm:ss" value-format="HH:mm:ss" style="width: 136px;" v-model="item.timeEnd"
                      placeholder="结束时间" />
                  </hl-group>
                  <hl-icon style="cursor:pointer;" size="xs" class="static" type="danger"
                    @click="delTimeConfigParams(index)">
                    <FillCircleMinus></FillCircleMinus>
                  </hl-icon>
                </hl-group>
                <hl-group class="p-x-md radius-lg w-full" style="padding-top: 6px; padding-bottom: 6px;"
                  align="items-center items-middle" gap="var(--xxs)">
                  <hl-icon @click="addTimeConfigParams" style="cursor:pointer;" size="xs" class="static" type="primary">
                    <TwoPlus></TwoPlus>
                  </hl-icon><span style="cursor:pointer;" @click="addTimeConfigParams" class="text-primary">增加时间区间</span>
                </hl-group>
              </hl-group>
            </hl-group>
          </hl-form-item>
          <hl-group gap="var(--lg)">
            <hl-form-item class="w-full" label="数据标识" prop="accessItemCode">
            <hl-input v-model="formData.accessItemCode" placeholder="请输入" class="form-item-size" maxlength="255"
              show-word-limit />
          </hl-form-item>
          <hl-form-item class="w-full" label="监测设备" prop="equipId">
            <search-equipment class="form-item-size" v-model="formData.equipId" />
          </hl-form-item>
          </hl-group>
          <hl-form-item class="w-full" label="描述">
            <hl-input native-type="textarea" v-model="formData.accessItemDesc" class="static form-item-size" placeholder="请输入"
              show-word-limit maxlength="500"></hl-input>
          </hl-form-item>
        </hl-form>
      </template>
      <!-- <template #footer>
        <hl-button type="primary" style="min-width: 80px" @click="ok">{{ $route.query.id ? '保存' : '确定' }}</hl-button>
        <hl-button style="min-width: 80px" @click="router.go(-1)">取消</hl-button>
      </template> -->
    </hl-panel>
    <hl-affix position="bottom" :offset="0">
          <hl-group align="items-middle" class="affix-bottom w-full box-shadow-lg p-lg">
            <hl-button type="primary" style="min-width: 80px" @click="ok" class="m-r-md">{{ $route.query.id ? '保存' : '确定' }}</hl-button>
            <hl-button style="min-width: 80px" @click="router.go(-1)">取消</hl-button>
          </hl-group>
        </hl-affix>
  <!-- </hl-group> -->
</template>
<script lang="ts" setup>
import { onMounted, computed, reactive, ref, watch } from 'vue';
import { FormInstance } from 'hongluan-ui';
import { cloneDeep } from 'lodash-es';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { useRouter, useRoute } from 'vue-router';
import { apiMeasureUnitObj } from '@/apis/modules/measure-unit';
import { apiEquipmentObj } from '@/apis/modules/equipment';
import { IgetListMeasureUnitsSpace } from '@/apis/modules/measure-unit/model';
import { apiAccessObjectObj } from '@/apis/modules/access-object';
import { apiAccessItemObj } from '@/apis/modules/target-access-item';
import {
  getSecondsToUnitTime,
  getUnitTimeToSeconds,
  UNIT_FREQUENCY_LIST,
  getListDict,
} from '@/common';

import { isValidName } from '@/common';
const router = useRouter();
const route = useRoute();

const props = defineProps({
  id: Number,
  action: {
    type: String,
  },
  treeNode: {
    type: Object,
  },
});
const action = computed(() => route.query.action);
const isInit = ref(true);

const formRef = ref<FormInstance>();
const formData = reactive({
  accessItemName: '',
  accessSourceId: '',
  accessSourceObjectId: '',
  dataType: '',
  accessItemCode: '',
  accessFrequency: 0,
  accessFrequencyOrigin: 0,
  accessItemDesc: '',
  accessFrequencyUnit: 'MINUTE',
  equipId: '',
  source: '',
  timeScopeParams: [] as {
    dateStart: string;
    dateEnd: string;
    timeStart: string;
    timeEnd: string;
  }[],
});

const sourceOption = ref([]);

watch(
  () => formData.accessSourceId,
  val => {
    // 仅新增状态，「接入源」变化时重置「接入数据项」；编辑时需回显「接入数据项」，不能重置
    if (action.value !== 'edit' && !isInit.value) {
      formData.accessSourceObjectId = '';
    }
    isInit.value = false;
    if (formData.accessSourceId) {
      getObjList();
    }
  }
);

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
  source: [{ required: true, message: '请选择来源类型' }],
  accessSourceId: [{ required: true, message: '请选择接入源' }],
  accessSourceObjectId: [{ required: true, message: '请选择接入对象' }],
  accessItemCode: [{ required: true, message: '请选择数据标识' }],
  accessItemName: [
    { required: true, message: '数据项名称不能为空' },
    {
      min: 1,
      max: 100,
      message: '长度小于100个字符',
    },
    // { validator: isValidNameChars, trigger: 'blur' },
    { validator: isValidName, trigger: 'blur' },
  ],
  dataType: [{ required: true, message: '请选择数据类型' }],
  accessFrequencyOrigin: [{ required: true, message: '请选择计算周期' }],
  accessFrequency: [
    { required: true, message: '数据频率不能为空' },
    { validator: isValidTargetFrequency, trigger: 'blur' },
  ],
  timeScopeParams: [
    {
      validator: (_: any, value: any, callback: any) => {
        if (value.length) {
          value.forEach((e, i) => {
            if (
              e.dateStart?.length &&
              e.dateEnd?.length &&
              e.timeStart?.length &&
              e.timeEnd?.length
            ) {
              if (i === value.length - 1) {
                callback();
              }
            } else {
              callback(new Error('请填写时间区间'));
            }
          });
        } else {
          callback();
        }
      },
    },
  ],
};
const measureUnits = ref<IgetListMeasureUnitsSpace.Data[]>([]);
const dataTypes = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const frequencyUnits = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const sourceList = ref();
const objList = ref();
const equipList = ref();

const ok = async () => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    const params = cloneDeep(formData);
    params.accessFrequency =
      params.accessFrequencyOrigin === 0
        ? 0
        : getUnitTimeToSeconds(
          params,
          'accessFrequencyUnit',
          'accessFrequency'
        );
    if (route.query.id) {
      await apiAccessItemObj.postUpdate(
        Object.assign({ accessItemId: route.query.id }, params)
      );
    } else {
      await apiAccessItemObj.add(params);
    }
    router.go(-1);
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

const getObjList = async () => {
  const res = await apiAccessObjectObj.getGetAccessSourceObjectList(
    formData.accessSourceId
  );
  objList.value = res.data;
  console.log(objList.value, formData.accessSourceId, 111);
};

onMounted(async () => {
  const dict1 = await apiMeasureUnitObj.getListMeasureUnits('');
  const dict2 = await getListDict('TARGET_TYPE_CODE');
  const dict3 = await getListDict('MONITOR_FREQUENCY_UNIT');
  const dict4 = await apiAccessObjectObj.getGetAccessSourceList('');
  const dict5 = await apiEquipmentObj.list();
  const dict6 = await getListDict('ACCESS_ITEM_DATA_SOURCE');

  measureUnits.value = dict1.data;
  dataTypes.value = dict2;
  frequencyUnits.value = dict3.filter(item => {
    return UNIT_FREQUENCY_LIST.includes(item.dictCode);
  });
  sourceList.value = dict4.data;
  equipList.value = dict5.data;
  sourceOption.value = dict6;

  if (route.query.id) {
    const result = await apiAccessItemObj.getDetail(route.query.id);
    Object.assign(formData, result.data);
    formData.timeScopeParams =
      result.data.timeScopes === '' ? [] : result.data.timeScopes;
    delete formData.timeScopes;
    formData.accessFrequency =
      formData.accessFrequency > 0
        ? getSecondsToUnitTime(
          formData,
          'accessFrequencyUnit',
          'accessFrequency'
        )
        : formData.accessFrequency;
    formData.accessFrequencyOrigin = formData.accessFrequency === 0 ? 0 : 1;
  } else {
    formData.source = dict6[0].dictCode;
    if (route.query?.accessSourceId) {
      Object.assign(formData, {
        accessSourceId: route.query?.accessSourceId,
        accessSourceObjectId: route.query?.accessSourceObjectId,
      });
    }
  }
});
</script>
<style lang="scss" scoped>
.add-bg {
  height: calc(100% - 50px);
  background: url('~@/assets/images/wholeAnalysis/top-bg.svg') no-repeat;
  background-color: var(--bg-content);
  background-position: right -10% bottom 5%;
  background-size: 36% 166%;
}
</style>
