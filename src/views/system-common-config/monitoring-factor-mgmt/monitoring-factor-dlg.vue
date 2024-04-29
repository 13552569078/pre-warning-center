<template>
  <hl-dialog :model-value="true" class="md-dialog" width="700px" :title="`${id ? '编辑' : '添加'}监测因子`" @close="$emit('cancel')">
    <hl-form ref="formRef" :model="formData" :rules="rules" :label-position="['items-left', 'items-middle']">
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-12">
          <hl-form-item :label="`${$t('warningType')}:`" prop="riskTypeCode">
            <event-type-selector v-model="formData.riskTypeCode" :useFor="1" />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-12">
          <hl-form-item label="因子编码" prop="factorCode">
            <hl-input v-model="formData.factorCode" placeholder="禁用保留字：alarmNum、alarmLevel等" maxlength="20" show-word-limit block />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-form-item label="监测因子" prop="factorName">
        <hl-input v-model="formData.factorName" placeholder="请输入监测因子" block maxlength="20" show-word-limit />
      </hl-form-item>
      <hl-form-item label="数据类型" prop="factorDataTypeCode">
        <hl-radio-group v-model="formData.factorDataTypeCode" dir="vertical" gap="var(--xl)">
          <hl-radio v-for="r in RULES_ARR" :key="r[0]" :label="r[0]">
            {{ r[1] }}
            <span class="text-secondary m-l-sm">{{ r[2] }}</span>
          </hl-radio>
        </hl-radio-group>
      </hl-form-item>
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-12">
          <hl-form-item label="设施类型" prop="facilityTypeCode">
            <falility-type-selector v-model="formData.facilityTypeCode" />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-12">
          <hl-form-item label="计量单位" prop="measureUnitId">
            <hl-select v-model="formData.measureUnitId" placeholder="请选择计量单位" block filterable clearable>
              <hl-option v-for="u in measureUnits" :key="u.measureUnitId" :value="u.measureUnitId" :label="u.measureUnitName" />
            </hl-select>
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-12">
          <hl-form-item label="启用状态" prop="useState">
            <hl-radio v-model="formData.useState" :label="1">启用中</hl-radio>
            <hl-radio v-model="formData.useState" :label="0">未启用</hl-radio>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-12">
          <hl-form-item label="预警类型" prop="warningTypeCode">
            <event-type-selector v-model="formData.warningTypeCode" :useFor="2" />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-form-item label="描述">
        <hl-input v-model="formData.factorDesc" native-type="textarea" placeholder="请输入描述" maxlength="500" show-word-limit block />
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
import { onMounted, PropType, reactive, ref } from 'vue';
import { FormInstance } from 'hongluan-ui';

import { RULES_ARR } from '@/common';
import { apiMonitorFactorObj } from '@/apis/modules/monitoring-factor';
import { apiMeasureUnitObj } from '@/apis/modules/measure-unit';
import { IgetListMeasureUnitsSpace } from '@/apis/modules/measure-unit/model';
import { isValidName } from '@/common';
import FalilityTypeSelector from '@/views/monitoring-config/components/facilities-type.vue';
import EventTypeSelector from '@/views/monitoring-config/components/risk-type.vue';

const props = defineProps({
  id: Number,
});
const emit = defineEmits(['cancel', 'ok']);

const formRef = ref<FormInstance>();
const formData = reactive({
  factorName: '',
  measureUnitId: '',
  factorDataTypeCode: '',
  factorDesc: '',
  factorCode: '',
  facilityTypeCode: '',
  riskTypeCode: '',
  warningTypeCode: '',
  useState: '',
});

const isValidCodeChars = async(
  rule: any,
  value: string,
  callback: (error?: Error) => void
) => {
  const reg = /^[A-Za-z0-9_]+$/g;
  if (!reg.test(value)) {
    callback(new Error('仅可输入数字、字母、下划线'));
  } else if (['alarmNum', 'alarmLevel'].includes(value)) {
    callback(new Error('因子编码值不可用 alarmNum 或 alarmLevel'));
  } else {
    const res = await apiMonitorFactorObj.getFindFactorCodeVerify(
      value,
      props.id!
    );
    if (!res.data) {
      callback(new Error('编码已存在，请更换编码'));
    }
  }
  callback();
};

const isValidNameChars = async(
  rule: any,
  value: string,
  callback: (error?: Error) => void
) => {
  const res = await apiMonitorFactorObj.getFindFactorNameVerify(
    value,
    props.id!
  );
  if (!res.data) {
    callback(new Error('因子名称已存在，请更换名称'));
  }
  callback();
};

const rules = {
  factorCode: [
    { required: true, message: '因子编码不能为空' },
    {
      min: 1,
      max: 20,
      message: '长度小于20个字符',
    },
    { validator: isValidCodeChars, trigger: 'blur' },
  ],
  factorName: [
    { required: true, message: '监测因子名称不能为空' },
    {
      min: 1,
      max: 20,
      message: '长度小于20个字符',
    },
    { validator: isValidNameChars, trigger: 'blur' },
    { validator: isValidName, trigger: 'blur' },
  ],
  factorDataTypeCode: [{ required: true, message: '请选择数据类型' }],
};
const measureUnits = ref<IgetListMeasureUnitsSpace.Data[]>([]);

const ok = async() => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    if (props.id) {
      await apiMonitorFactorObj.postModifyMonitorFactorMonitorFactor(
        Object.assign({ factorId: props.id }, formData)
      );
    } else {
      await apiMonitorFactorObj.postAddMonitorFactorMonitorFactor(formData);
    }
    emit('ok');
  }
};

onMounted(async() => {
  if (props.id) {
    const result = await apiMonitorFactorObj.getFindMonitorFactorMonitorFactor(
      props.id
    );
    Object.assign(formData, result.data);
  }

  const dict = await apiMeasureUnitObj.getListMeasureUnits('');
  measureUnits.value = dict.data;
});
</script>
