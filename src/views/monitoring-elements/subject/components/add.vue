<template>
  <hl-form ref="formRef" :disabled="dialogsType === 'detail'" :model="form" :rules="formRules" :label-position="['items-left', 'items-left']" gap="var(--lg)" item-gap="var(--lg2)">
    <!-- <hl-row class="show-col">
      <hl-col span="col-24"> -->
        <hl-form-item :label="`${$t('region')}名称`" prop="regionName">
          <hl-input v-model.trim="form.regionName" :placeholder="`${$t('region')}名称:`" maxlength="20" show-word-limit block />
        </hl-form-item>
      <!-- </hl-col>
    </hl-row> -->
    <hl-group gap="var(--lg2)">
        <hl-form-item label="负责人" prop="principalName">
          <hl-input v-model.trim="form.principalName" placeholder="负责人" maxlength="20" style="width: 305px;" />
        </hl-form-item>
      <!-- </hl-col> -->
      <!-- <hl-col span="col-12"> -->
        <hl-form-item label="负责人电话" prop="principalMobile">
          <hl-input v-model.trim="form.principalMobile" placeholder="负责人电话" maxlength="11" style="width: 305px;"/>
        </hl-form-item>
      <!-- </hl-col> -->
    <!-- </hl-row> -->
    </hl-group>
    <hl-group gap="var(--lg2)">
    <!-- <hl-row class="show-col" gap="var(--md)">
      <hl-col span="col-12"> -->
        <hl-form-item label="联系人" prop="responsibleName">
          <hl-input v-model.trim="form.responsibleName" placeholder="联系人" maxlength="20" style="width: 305px;" />
        </hl-form-item>
      <!-- </hl-col>
      <hl-col span="col-12"> -->
        <hl-form-item label="联系人电话" prop="responsibleMobile">
          <hl-input v-model.trim="form.responsibleMobile" placeholder="联系人电话" maxlength="11" style="width: 305px;"/>
        </hl-form-item>
      <!-- </hl-col>
    </hl-row> -->
  </hl-group>
    <hl-group gap="var(--lg2)">
        <hl-form-item label="主管部门">
          <hl-input v-model.trim="form.chargeOrgName" placeholder="主管部门" maxlength="50" style="width: 305px;" />
        </hl-form-item>
        <hl-form-item label="权属单位">
          <hl-input v-model.trim="form.belongOrgName" placeholder="权属单位" maxlength="50" style="width: 305px;"/>
        </hl-form-item>
  </hl-group>
  <hl-group gap="var(--lg2)">
    <!-- <hl-row class="show-col" gap="var(--md)">
      <hl-col span="col-12"> -->
        <hl-form-item label="地址" prop="address">
          <hl-input v-model.trim="form.address" placeholder="地址" maxlength="200" style="width: 305px;">
            <template #suffix>
              <hl-icon class="cursor-pointer" @click.stop="locationDialogVisiable = true"><TwoPoint /></hl-icon>
            </template>
          </hl-input>
        </hl-form-item>
      <!-- </hl-col>
      <hl-col span="col-12"> -->
        <hl-form-item label="行政区划" prop="streetAreaCode">
          <search-area
            ref="areaSelectorRef"
            v-model="form.streetAreaCode"
            :is-emit-area-code="true"
            :is-in-form="true"
            @areaChanged="formRef.validateField('streetAreaCode')" style="width: 305px;"></search-area>
        </hl-form-item>
      <!-- </hl-col>
    </hl-row> -->
  </hl-group>
  <hl-group gap="var(--lg2)">
        <hl-form-item label="相对坐标（三维）:">
          <hl-input v-model.trim="form.d3x" placeholder="x" maxlength="20" style="width: 180px;"/> &emsp;-&emsp;
          <hl-input v-model.trim="form.d3y" placeholder="y" maxlength="20" style="width: 180px;"/> &emsp;-&emsp;
          <hl-input v-model.trim="form.d3z" placeholder="z" maxlength="20" style="width: 180px;"/>
        </hl-form-item>
    </hl-group>
    <!-- <hl-row class="show-col" gap="var(--md)">
      <hl-col span="col-24"> -->
        <hl-form-item label="业务标识" prop="functionIdentifier">
          <hl-input v-model.trim="form.functionIdentifier" placeholder="业务标识" maxlength="32" block show-word-limit />
        </hl-form-item>
      <!-- </hl-col>
    </hl-row> -->
    <!-- <hl-row class="show-col" gap="var(--md)">
      <hl-col span="col-24"> -->
        <hl-form-item label="描述" prop="description">
          <hl-input v-model.trim="form.description" native-type="textarea" rows="3" block maxlength="500" show-word-limit />
        </hl-form-item>
      <!-- </hl-col>
    </hl-row> -->
    <hl-form-item label="场景照片">
      <file-uploader v-model="fileList"/>
    </hl-form-item>
  </hl-form>
  <location-map :visiable="locationDialogVisiable" @locationClose="locationClose" @locationSubmit="locationSubmit" :longitude="editForm.longitude" :latitude="editForm.latitude"></location-map>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { LocationMap } from '@/components';
import type { IlocalInfo } from '@/types/local-info';
import { isValidName } from '@/common';
import { getAreaList } from '@/views/monitoring-elements/utils';
import { IpostAreaListSpace } from '@/apis/modules/elements-common/model';
import { apiSubjectObj } from '@/apis/modules/element-subject';
import { isValidPhoneNumber } from '@/common/utils';
import { rulesFunctionIdentifier } from '@/common';

interface UploadUserFile {
  name: string;
  url: string;
  id: string;
}

const { t } = useI18n();

const fileList = ref<UploadUserFile[]>([]);

const isValidNameChars = async(rule: any, value: string, callback: (error?: Error) => void) => {
  const res = await apiSubjectObj.getEnable(value, props?.editForm.id || '');
  if (!res.data) {
    callback(new Error('主体名称已存在，请更换名称'));
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

const areaList = ref<IpostAreaListSpace.Data[]>([]);
const formRef = ref();
const formRules = {
  regionName: [
    { required: true, message: `${t('region')}名称`, trigger: ['change', 'blur'] },
    {
      max: 20,
      message: '长度不超过20个字符',
      trigger: ['change', 'blur']
    },
    { validator: isValidNameChars, trigger: 'blur' },
    { validator: isValidName, trigger: 'blur' },
  ],
  longitude: [{ required: true, message: '不允许为空', trigger: ['change', 'blur'] }],
  latitude: [{ required: true, message: '不允许为空', trigger: ['change', 'blur'] }],
  responsibleName: [{ required: true, message: '不允许为空', trigger: ['change', 'blur'] }],
  principalMobile: [
    { validator: isValidPhoneNumber, trigger: ['change', 'blur'] }
  ],
  responsibleMobile: [
    { required: true, message: '不允许为空', trigger: ['change', 'blur'] },
    { validator: isValidPhoneNumber, trigger: ['change', 'blur'] }
  ],
  address: [{ required: true, message: '不允许为空', trigger: ['change', 'blur'] }],
  streetAreaCode: [{ required: true, message: '不允许为空', trigger: ['change', 'blur'] }],
  description: [
    {
      max: 500,
      message: '长度不超过500个字符',
      trigger: ['change', 'blur']
    }
  ],
  functionIdentifier: [rulesFunctionIdentifier]
};
const form = ref({
  id: '',
  regionTypeCode: '',
  regionName: '',
  principalName: '',
  principalMobile: '',
  responsibleName: '',
  responsibleMobile: '',
  address: '',
  longitude: '',
  latitude: '',
  streetAreaCode: '',
  belongOrgId: '',
  belongName: '',
  belongMobile: '',
  chargeOrgId: '',
  chargeName: '',
  chargeMobile: '',
  description: '',
  photoFileIds: [] as string[],
  belongOrgName: '',
  chargeOrgName: '',
  functionIdentifier: '',

  d3x: '',
  d3y: '',
  d3z: ''
});

const resetForm = () => {
  formRef.value.resetFields();
};
const formSubmit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      // 文件id传入
      form.value.photoFileIds = fileList.value.map((files: UploadUserFile) => {
        return files.id;
      });
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
const locationSubmit = (info: IlocalInfo) => {
  locationDialogVisiable.value = false;
  Object.assign(form.value, info);
};

onMounted(async() => {
  Object.keys(props.editForm).length && Object.assign(form.value, props.editForm);
  if (Object.keys(props.editForm).length) {
    fileList.value = props.editForm.photoFile || [];
  }
  areaList.value = await getAreaList();
});

defineExpose({
  formSubmit,
  resetForm
});
</script>
