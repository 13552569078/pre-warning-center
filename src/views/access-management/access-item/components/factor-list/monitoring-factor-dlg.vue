<template>
  <hl-dialog
    :model-value="true"
    class="md-dialog"
    width="930px"
    :title="`${id ? '编辑' : '添加'}接入数据项`"
    @close="$emit('cancel')"
  >
    <hl-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :label-position="['items-left', 'items-middle']"
    >
      <hl-row
        class="show-col"
        gap="var(--md)"
      >
        <hl-col span="col-12">
          <hl-form-item
            label="接入源"
            prop="accessSourceId"
          >
            <hl-select
              :disabled="action==='edit'"
              v-model="formData.accessSourceId"
              placeholder="请选择接入源"
              block
              filterable
              clearable
            >
              <hl-option
                v-for="u in sourceList"
                :key="u.accessSourceId"
                :value="u.accessSourceId"
                :label="u.accessSourceName"
              />
            </hl-select>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-12">
          <hl-form-item
            label="接入对象"
            prop="accessSourceObjectId"
          >
            <hl-select
              :disabled="action==='edit'"
              v-model="formData.accessSourceObjectId"
              placeholder="请选择接入对象"
              block
              filterable
              clearable
            >
              <hl-option
                v-for="u in objList"
                :key="u.accessSourceObjectId"
                :value="u.accessSourceObjectId"
                :label="u.objectName"
              />
            </hl-select>
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-form-item
        label="数据项名称"
        prop="accessItemName"
      >
        <hl-input
          :disabled="action==='edit'"
          v-model="formData.accessItemName"
          placeholder="请输入数据项名称"
          block
          maxlength="20"
          show-word-limit
        />
      </hl-form-item>
      <!-- <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-24">
          <hl-form-item label="计量单位" prop="measureUnitId">
            <hl-select v-model="formData.measureUnitId" placeholder="请选择计量单位" block filterable>
              <hl-option v-for="u in measureUnits" :key="u.measureUnitId" :value="u.measureUnitId" :label="u.measureUnitName" />
            </hl-select>
          </hl-form-item>
        </hl-col>
      </hl-row> -->
      <hl-row
        class="show-col"
        gap="var(--md)"
      >
        <hl-col span="col-24">
          <hl-form-item
            label="接入周期类型"
            prop="accessFrequencyOrigin"
          >
            <hl-radio-group
              v-model="formData.accessFrequencyOrigin"
              dir="vertical"
              gap="var(--xl)"
            >
              <hl-radio :label="0">
                实时计算
              </hl-radio>
              <hl-radio :label="1">
                周期计算
              </hl-radio>
            </hl-radio-group>
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row
        class="show-col"
        gap="var(--md)"
        v-if="formData.accessFrequencyOrigin !== 0"
      >
        <hl-col span="col-24">
          <hl-form-item
            label="数据频率"
            prop="accessFrequency"
          >
            <hl-group
              merge
              indent
            >
              <hl-input
                v-model="formData.accessFrequency"
                class="w-xs"
              />
              <hl-select
                v-model="formData.accessFrequencyUnit"
                placeholder="单位"
                class="static w-xs"
                filterable
              >
                <hl-option
                  v-for="item in frequencyUnits"
                  :key="item.dictCode"
                  :label="item.dictName"
                  :value="item.dictCode"
                > </hl-option>
              </hl-select>
            </hl-group>
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-form-item
        label="数据时间区间"
        class="top-center"
        prop="timeScopeParams"
      >
        <hl-button
          v-if="formData.timeScopeParams.length === 0"
          type="primary"
          icon-position="left"
          class="m-l-xxs"
          @click="addTimeConfigParams"
        >
          <template #icon>
            <hl-icon>
              <two-plus />
            </hl-icon>
          </template>
        </hl-button>
        <hl-group
          align="items-center"
          v-for="(item, index) in formData.timeScopeParams"
          :key="index"
          class="m-b-sm"
        >
          <hl-date-picker
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            v-model="item.dateStart"
            type="date"
            placeholder="请选择开始日期"
          />
          <span class="m-r-xs m-l-xs" style="lineHeight: 2;">至</span>
          <hl-date-picker
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            v-model="item.dateEnd"
            type="date"
            placeholder="请选择结束日期"
          />
          <hl-time-picker
            class="m-l-xl"
            v-model="item.timeStart"
            placeholder="选择开始时间"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
          />
          <span class="m-r-xs m-l-xs" style="lineHeight: 2;">至</span>
          <hl-time-picker
            format="HH:mm:ss"
            value-format="HH:mm:ss"
            v-model="item.timeEnd"
            placeholder="选择结束时间"
          />
          <hl-button
            type="primary"
            icon-position="left"
            class="m-l-xxs"
            v-if="index === 0 && action!=='edit'"
            @click="addTimeConfigParams"
          >
            <template #icon>
              <hl-icon>
                <two-plus />
              </hl-icon>
            </template>
          </hl-button>
          <hl-button
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
          </hl-button>
          <hl-button
            icon-position="left"
            class="m-l-xxs"
            v-if="index !== 0 && action!=='edit'"
            style="opacity: 0;"
          >
            <template #icon>
              <hl-icon>
                <FillMinus />
              </hl-icon>
            </template>
          </hl-button>
        </hl-group>
      </hl-form-item>
      <hl-form-item
        label="数据标识"
        prop="accessItemCode"
      >
        <hl-input
          v-model="formData.accessItemCode"
          placeholder="请输入数据项标识"
          block
          maxlength="20"
          show-word-limit
        />
      </hl-form-item>
      <hl-row
        class="show-col"
        gap="var(--md)"
      >
        <hl-col span="col-24">
          <hl-form-item
            label="监测设备"
            prop="equipId"
          >
            <search-equipment v-model="formData.equipId" />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-form-item label="描述">
        <hl-input
          v-model="formData.accessItemDesc"
          native-type="textarea"
          placeholder="请输入描述"
          maxlength="500"
          show-word-limit
          block
        />
      </hl-form-item>
    </hl-form>
    <template #footer>
      <span class="dialog-footer">
        <hl-button  style="min-width: 80px"  @click="$emit('cancel')">取消</hl-button>
        <hl-button
          type="primary"
          class="m-l-md"
          style="min-width: 80px"
          @click="ok"
        >{{ id ? '保存' : '确定' }}</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { onMounted, PropType, reactive, ref, watch } from 'vue';
import { FormInstance } from 'hongluan-ui';
import { cloneDeep } from 'lodash-es';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { apiTargetInfoControllerObj } from '@/apis/modules/target-info-controller';
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

const props = defineProps({
  id: Number,
  action: {
    type: String,
  },
  treeNode: {
    type: Object,
  },
});
const emit = defineEmits(['cancel', 'ok']);

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
  timeScopeParams: [] as {
    dateStart: string;
    dateEnd: string;
    timeStart: string;
    timeEnd: string;
  }[],
});

watch(
  () => formData.accessSourceId,
  val => {
    // 仅新增状态，「接入源」变化时重置「接入数据项」；编辑时需回显「接入数据项」，不能重置
    if (props.action !== 'edit' && !isInit.value) {
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

const ok = async() => {
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
    if (props.id) {
      await apiAccessItemObj.postUpdate(
        Object.assign({ accessItemId: props.id }, params)
      );
    } else {
      await apiAccessItemObj.add(params);
    }
    emit('ok');
  }
};
const validate = async() => {
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

const getObjList = async() => {
  const res = await apiAccessObjectObj.getGetAccessSourceObjectList(
    formData.accessSourceId
  );
  objList.value = res.data;
  console.log(objList.value, formData.accessSourceId, 111);
};

onMounted(async() => {
  const dict1 = await apiMeasureUnitObj.getListMeasureUnits('');
  const dict2 = await getListDict('TARGET_TYPE_CODE');
  const dict3 = await getListDict('MONITOR_FREQUENCY_UNIT');
  const dict4 = await apiAccessObjectObj.getGetAccessSourceList('');
  const dict5 = await apiEquipmentObj.list();

  measureUnits.value = dict1.data;
  dataTypes.value = dict2;
  frequencyUnits.value = dict3.filter(item => {
    return UNIT_FREQUENCY_LIST.includes(item.dictCode);
  });
  sourceList.value = dict4.data;
  equipList.value = dict5.data;
  if (props.id) {
    const result = await apiAccessItemObj.getDetail(props.id);
    Object.assign(formData, result.data);
    formData.timeScopeParams = result.data.timeScopes === '' ? [] : result.data.timeScopes;
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
    if (props.treeNode?.accessSourceId) {
      Object.assign(formData, props.treeNode);
    }
    console.log(props.treeNode, 2622);
  }
});
</script>
