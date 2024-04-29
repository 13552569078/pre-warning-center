<template>
  <hl-form ref="formRef" :disabled="dialogsType === 'detail'" :model="form" :rules="formRules"
    :label-position="['items-left', 'items-left']" gap="var(--xl)" item-gap="var(--lg2)">
    <hl-group gap="var(--lg2)">
      <hl-form-item label="设备名称" prop="equipName">
        <hl-input v-model.trim="form.equipName" placeholder="设备名称" maxlength="64" show-word-limit style="width: 305px;" />
      </hl-form-item>
      <hl-form-item label="设备编号" prop="equipCode">
        <hl-input v-model.trim="form.equipCode" placeholder="设备编号" maxlength="32" show-word-limit style="width: 305px;" />
      </hl-form-item>
    </hl-group>
    <!-- <hl-col span="col-12">
        <hl-form-item label="监测点">
          <search-monitor-event @point-changed="pointChanged" :isEmitCode="true"  v-model="form['monitorUnitId']" />
        </hl-form-item>
      </hl-col> -->
    <hl-group gap="var(--lg2)">
      <hl-form-item label="设备类型" prop="equipTypeCode">
        <search-equip-tree v-model="form.equipTypeCode" :isEmitCode="false" @org-changed="handleEquipTypeChange"
          style="width: 305px !important;" />
      </hl-form-item>
      <hl-form-item label="用途">
        <hl-input v-model.trim="form.useFor" placeholder="用途" maxlength="64" show-word-limit style="width: 305px;" />
      </hl-form-item>
    </hl-group>
    <hl-form-item label="设备参数" prop="equipParam">
      <hl-input v-model.trim="form.equipParam" native-type="textarea" :rows="3" placeholder="设备参数" maxlength="256" block
        show-word-limit />
    </hl-form-item>
    <!-- <hl-row class="show-col" gap="var(--md)">
      <hl-col span="col-12">
        <hl-form-item label="设施类型" prop="facilityTypeCode">
        <hl-select v-model="form.facilityTypeCode" placeholder="设施类型" block filterable clearable>
            <hl-option :label="item.typeName" :value="item.typeCode" v-for="item in facilityTypeList" :key="item.typeCode"/>
          </hl-select>
        </hl-form-item>
      </hl-col>
      <hl-col span="col-12">
        <hl-form-item label="设备类型" prop="equipTypeCode">
          <search-equip-tree
            v-model="form.equipTypeCode"
            :isEmitCode="false"
            @org-changed="handleEquipTypeChange"
          />
        </hl-form-item>
      </hl-col>
    </hl-row> -->
    <hl-group gap="var(--lg2)">
      <hl-form-item label="安装时间" prop="installTime">
        <hl-date-picker class="w-full" value-format="YYYY-MM-DD HH:mm:ss" v-model="form.installTime" type="date"
          placeholder="安装时间" @change="(value: string | null) => {
            handleDatePickerChange(value, 'installTime')
          }" style="width: 305px;" />
      </hl-form-item>
      <hl-form-item label="注册上线时间" prop="registerTime">
        <hl-date-picker class="w-full" value-format="YYYY-MM-DD HH:mm:ss" v-model="form.registerTime" type="date"
          placeholder="注册上线时间" @change="(value: string | null) => {
            handleDatePickerChange(value, 'registerTime')
          }" style="width: 305px;" />
      </hl-form-item>
    </hl-group>
    <hl-form-item label="监测点" prop="monitorUnitId">
      <search-monitor-event @point-changed="pointChanged" :isEmitCode="true" v-model="form.monitorUnitId" />
    </hl-form-item>
    <hl-form-item label="安装位置" prop="address">
      <hl-input v-model.trim="form.address" placeholder="安装位置" maxlength="100" block class="address-input">
        <template #suffix>
          <hl-icon class="cursor-pointer" @click.stop="locationDialogVisiable = true">
            <TwoPoint />
          </hl-icon>
        </template>
      </hl-input>
    </hl-form-item>
    <hl-group gap="var(--lg2)">
      <hl-form-item label="所在区域" prop="address">
        <search-area ref="areaSelectorRef" v-model="form.streetAreaCode" :is-emit-area-code="true" :is-in-form="true"
          style="width: 305px;"></search-area>
      </hl-form-item>
      <hl-form-item label="设备状态" prop="equipStatus">
        <hl-select v-model="form.equipStatus" placeholder="设备状态" style="width: 305px;" filterable clearable>
          <hl-option :label="item.value" :value="item.name" v-for="item in equipmentStatusList" :key="item.name" />
        </hl-select>
      </hl-form-item>
    </hl-group>
    <hl-form-item label="描述" prop="description">
      <hl-input v-model.trim="form.description" native-type="textarea" :rows="3" block maxlength="500" show-word-limit />
    </hl-form-item>
  </hl-form>
  <location-map :visiable="locationDialogVisiable" @locationClose="locationClose"
    @locationSubmit="locationSubmit"></location-map>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { HlMessageBox } from 'hongluan-ui';
import { LocationMap, SearchEquipTree } from '@/components';
import { isValidName } from '@/common';
import type { IlocalInfo } from '@/types/local-info';
import { apiEquipmentObj } from '@/apis/modules/equipment';
import { IgetTreeSpace } from '@/apis/modules/equipment-type-new/model';
import { apiFacilityTypeObj } from '@/apis/modules/facility-type';
// import { SearchMonitorEvent, SearchArea, FacilitiesType } from '@/views/monitoring-elements/components/index';
import { SearchMonitorEvent, FacilitiesType } from '@/views/monitoring-elements/components/index';

const isValidNameChars = async (rule: any, value: string, callback: (error?: Error) => void) => {
  const res = await apiEquipmentObj.getEnable(value, props?.editForm.id || '');
  if (!res.data) {
    callback(new Error('设备名称已存在，请更换名称'));
  }
  callback();
};

const props = defineProps({
  editForm: {
    type: Object,
    default: () => ({})
  },
  dialogsType: {
    type: String,
    default: () => 'add'
  }
});

const emit = defineEmits(['saveForm']);

const formRef = ref();
const formRules = {
  equipName: [
    { required: true, message: '监测设备名称', trigger: ['change', 'blur'] },
    {
      max: 64,
      message: '长度不超过64个字符',
      trigger: ['change', 'blur']
    },
    { validator: isValidName, trigger: 'blur' }
  ],
  equipCode: [
    { required: true, message: '不允许为空', trigger: ['change', 'blur'] },
    {
      max: 32,
      message: '长度不超过32个字符',
      trigger: ['change', 'blur']
    }
  ],
  monitorUnitId: [{ required: true, message: '不允许为空', trigger: ['change', 'blur'] }],
  equipTypeCode: [{ required: true, message: '不允许为空', trigger: ['change', 'blur'] }],
  registerTime: [{ required: true, message: '不允许为空', trigger: ['change', 'blur'] }],
  installTime: [{ required: true, message: '不允许为空', trigger: ['change', 'blur'] }]
};
const equipmentStatusList = ref();
const facilityTypeList = ref();
const isEditInit = ref(false);

const form = ref({
  id: '',
  equipName: '',
  equipCode: '',
  equipParam: '',
  address: '',
  longitude: '',
  latitude: '',
  useFor: '',
  description: '',
  monitorUnitId: '',
  facilityTypeCode: '',
  equipTypeCode: '',
  streetAreaCode: '',
  installTime: '',
  registerTime: '',
  equipStatus: 'NORMAL',
  equipShowName: '',
  equipType: ''
});

const handleDatePickerChange = (value: string | null, key: 'installTime' | 'registerTime') => {
  if (!value) {
    form.value[key] = '';
  }
};

const resetForm = () => {
  formRef.value.resetFields();
};
const formSubmit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      emit('saveForm', form.value);
    } else {
      console.log('error submit!!');
      return false;
    }
  });
};
// 地图
const locationDialogVisiable = ref(false);
const locationClose = () => {
  locationDialogVisiable.value = false;
};
const locationSubmit = async (info: IlocalInfo) => {
  if (form.value.address?.length) {
    await HlMessageBox.confirm('刚选择的地址会覆盖已填写的“安装位置”数据，请确认是否覆盖？', '确认选择', {
      confirmButtonText: '确定',
      confirmButtonType: 'warning',
      cancelButtonText: '取消',
      type: 'success'
    });
  }
  locationDialogVisiable.value = false;
  form.value.address = info.address;
  form.value.longitude = info.longitude;
  form.value.latitude = info.latitude;
  form.value.streetAreaCode = info.addressComponent.county_code;
};

const pointChanged = (data: any) => {
  // form.value.facilityTypeCode = data.treeFacilityTypeCode;
  // debugger;
};
const changeTargetSelect = (data: IgetTreeSpace.Data) => {
  form.value.equipShowName = data.typeName;
};
// 下拉-设施类型
const getFacilityType = async () => {
  const res = await apiFacilityTypeObj.getFacilityTree('2');
  facilityTypeList.value = res.data;
};
// 下拉-设备状态
const getEquipmentStatus = async () => {
  const res = await apiEquipmentObj.selectEquipStatus();
  equipmentStatusList.value = res.data;
};

const handleEquipTypeChange = (equipTypeObj: IgetTreeSpace.Data) => {
  form.value.equipType = `${equipTypeObj.equipType}`;
};
onMounted(() => {
  getEquipmentStatus();
  getFacilityType();
  facilityTypeList;
  Object.keys(props.editForm).length && Object.assign(form.value, props.editForm);
  isEditInit.value = form.value?.id?.length > 0;
});

defineExpose({
  formSubmit,
  resetForm
});
</script>
