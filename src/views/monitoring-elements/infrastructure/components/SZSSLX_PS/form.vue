<template>
  <hl-panel style="--panel-body-padding:calc(var(--xxl) + var(--md));">
    <template #header>
      <div class="panel-title">
        <h4>排水类</h4>
      </div>
    </template>
    <hl-form
      ref="formRef"
      :disabled="dialogsType === 'detail'"
      :model="form"
      :rules="formRules"
      :label-position="['items-left', 'items-left']"
      :width="['col-24', 'col-24']"
    >
      <hl-row
        class="show-col"
        gap="var(--md)"
      >
        <hl-col span="col-16">
          <hl-form-item
            label="设施名称:"
            prop="facilityName"
          >
            <hl-input
              v-model.trim="form.facilityName"
              placeholder="设施名称"
              maxlength="100"
              show-word-limit
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="设施类别:"
            prop="drainageTypeCode"
          >
            <hl-select
              v-model="form.drainageTypeCode"
              placeholder="设施类别"
              block
              filterable
              clearable
            >
              <hl-option
                :label="item.dictName"
                :value="item.dictCode"
                v-for="(item, index) in typeList"
                :key="index"
              />
            </hl-select>
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row
        class="show-col"
        gap="var(--md)"
      >
        <hl-col span="col-8">
           <hl-form-item
            label="养护等级:"
            prop="maintainLevelCode"
          >
            <hl-select
              v-model="form.maintainLevelCode"
              placeholder="养护等级"
              block
              filterable
              clearable
            >
              <hl-option
                :label="item.dictName"
                :value="item.dictCode"
                v-for="(item, index) in levelList"
                :key="index"
              />
            </hl-select>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
           <hl-form-item
            label="养护单位:"
            prop="maintainUnitCode"
          >
            <search-org-tree v-model="form.maintainUnitCode"  @orgChanged="changeMaintain"/>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="主管部门:"
            prop="directeUnitCode"
          >
          <search-org-tree v-model="form.directeUnitCode" @orgChanged="changeDirecte"/>
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row
        class="show-col"
        gap="var(--md)"
      >
        <hl-col span="col-8">
          <hl-form-item
            label="地址:"
            prop="address"
          >
            <hl-input
              v-model.trim="form.address"
              placeholder="地址"
              maxlength="200"
              show-word-limit
              block
              class="address-input"
            >
              <template #suffix>
                <hl-icon
                  class="cursor-pointer"
                  @click.stop="locationDialogVisiable = true"
                >
                  <TwoPoint />
                </hl-icon>
              </template>
            </hl-input>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            :label="`${$t('longitude')}:`"
            prop="longitude"
          >
            <hl-input
              v-model.trim="form.longitude"
              :placeholder="`${$t('longitude')}:`"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            :label="`${$t('latitude')}:`"
            prop="latitude"
          >
            <hl-input
              v-model.trim="form.latitude"
              :placeholder="`${$t('latitude')}:`"
              block
            />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row
        class="show-col"
        gap="var(--md)"
      >
        <hl-col span="col-8">
          <hl-form-item
            label="行政区划:"
            prop="areaCode"
          >
            <search-area ref="areaSelectorRef" v-model="form.areaCode" :isEmitAreaCode="true"></search-area>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="权属单位:"
            prop="owerUnitCode"
          >
            <search-org-tree v-model="form.owerUnitCode" @orgChanged="changeOwer"/>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="设计单位:"
            prop="designUnitName"
          >
            <hl-input
              v-model.trim="form.designUnitName"
              placeholder="设计单位"
              maxlength="100"
              show-word-limit
              block
            />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row
        class="show-col"
        gap="var(--md)"
      >
        <hl-col span="col-8">
          <hl-form-item
            label="建设单位:"
            prop="buildUnitName"
          >
            <hl-input
              v-model.trim="form.buildUnitName"
              placeholder="建设单位"
              maxlength="100"
              show-word-limit
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="监理单位:"
            prop="superviseUnitName"
          >
            <hl-input
              v-model.trim="form.superviseUnitName"
              placeholder="监理单位"
              maxlength="100"
              show-word-limit
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="施工单位:"
            prop="workUnitName"
          >
            <hl-input
              v-model.trim="form.workUnitName"
              placeholder="施工单位"
              maxlength="100"
              show-word-limit
              block
            />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row
        class="show-col"
        gap="var(--md)"
      >
        <hl-col span="col-8">
           <hl-form-item
            label="建成时间:"
            prop="completedTime"
          >
            <hl-date-picker
              class="w-full"
              value-format="YYYY-MM-DD HH:mm:ss"
              v-model="form.completedTime"
              type="date"
              placeholder="建成时间"
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="总造价（万元）:"
            prop="totalCost"
          >
            <hl-input
              v-model.trim="form.totalCost"
              placeholder="总造价（万元）"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="设施状态:"
            prop="facilityStateCode"
          >
            <hl-select
              v-model="form.facilityStateCode"
              placeholder="设施状态"
              block
              filterable
              clearable
            >
              <hl-option
                :label="item.dictName"
                :value="item.dictCode"
                v-for="(item, index) in statusList"
                :key="index"
              />
            </hl-select>
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row
        class="show-col"
        gap="var(--md)"
      >
        <hl-col span="col-24">
          <hl-form-item
            label="备注:"
            prop="drainageDesc"
          >
            <hl-input
              native-type="textarea"
              :rows="4"
              v-model.trim="form.drainageDesc"
              placeholder="备注"
              block
              maxlength="500"
              show-word-limit
            />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-form-item label="场景照片:">
        <file-uploader v-model="fileList"/>
      </hl-form-item>
    </hl-form>
  </hl-panel>
  <location-map
    :visiable="locationDialogVisiable"
    @locationClose="locationClose"
    @locationSubmit="locationSubmit"
    :longitude="editForm.longitude"
    :latitude="editForm.latitude"
  ></location-map>

  <hl-affix position="bottom" :offset="0">
    <hl-group align="items-middle" class="affix-bottom w-full box-shadow-lg p-lg">
      <hl-button type="primary" class="m-r-sm" @click="formSubmit">确 定</hl-button>
      <hl-button @click="formCancel">取 消</hl-button>
    </hl-group>
  </hl-affix>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { LocationMap, SearchOrgTree, SearchArea } from '@/components';
import type { IlocalInfo } from '@/types/local-info';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { getListDict } from '@/common';
import { IgetOrgTreeSpace } from '@/apis/modules/hongling/model';
import { apiFacilityDrainageObj } from '@/apis/modules/special-facility/facility-drainage';
import { IgetFacilityDrainageSpace } from '@/apis/modules/special-facility/facility-drainage/model';
import { ruleRequired, ruleNumber } from '../../rules';

interface UploadUserFile {
  name: string;
  url: string;
  id: string;
}

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  action: {
    type: String,
    default: () => 'add',
  },
  typeCode: {
    type: String,
    default: '',
  },
});

// const emit = defineEmits(['refreshList']);
const router = useRouter();

const typeList = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const levelList = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const statusList = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const formRef = ref();
const formRules = {
  facilityName: [
    ruleRequired,
    {
      max: 100,
      message: '长度不超过100个字符',
      trigger: ['change', 'blur'],
    },
  ],
  drainageTypeCode: [
    ruleRequired,
  ],
  address: [
    ruleRequired,
  ],
  longitude: [
    ruleRequired,
    ruleNumber,
  ],
  latitude: [
    ruleRequired,
    ruleNumber,
  ],
  areaCode: [
    ruleRequired,
  ],
  directeUnitCode: [
    ruleRequired,
  ],
  maintainUnitCode: [
    ruleRequired,
  ],
  maintainLevelCode: [
    ruleRequired,
  ],
  completedTime: [
    ruleRequired,
  ],
  facilityStateCode: [
    ruleRequired,
  ],
  totalCoverArea: [
    ruleRequired,
  ],
  totalCost: [ruleNumber]
};
const form = ref({
  facilityTypeCode: props.typeCode,
  drainageTypeCode: '',
  facilityName: '',
  maintainLevelCode: '',
  maintainUnitCode: '',
  maintainUnitVal: '',
  directeUnitCode: '',
  directeUnitVal: '',
  areaCode: '',
  owerUnitCode: '',
  owerUnitVal: '',
  address: '',
  longitude: '',
  latitude: '',
  designUnitName: '',
  buildUnitName: '',
  superviseUnitName: '',
  workUnitName: '',
  completedTime: '',
  totalCost: '',
  facilityStateCode: '',
  drainageDesc: '',
  imageUrls: '',
});
const editForm = ref({});

const resetForm = () => {
  formRef.value.resetFields();
};
const formSubmit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      // 文件id传入
      const photoFileIds = fileList.value.map((files: UploadUserFile) => {
        return files.id;
      });
      form.value.imageUrls = photoFileIds.join(',');
      saveForm(form.value);
    } else {
      console.log('error submit!!');
      return false;
    }
  });
  editForm.value = {};
};
const formCancel = () => {
  resetForm();
  editForm.value = {};
  backList();
};
const saveForm = async(data: IgetFacilityDrainageSpace.Data) => {
  const searchParams = { ...data };
  props.action === 'add'
    ? await apiFacilityDrainageObj.add(searchParams)
    : await apiFacilityDrainageObj.postUpdate(searchParams);
  formCancel();
  backList();
};

const backList = () => {
  router.push({
    name: 'infrastructure',
    query: {
      typeCode: props.typeCode,
    },
  });
};

const changeDirecte = (data: IgetOrgTreeSpace.Data) => {
  form.value.directeUnitVal = data.unitName;
};
const changeOwer = (data: IgetOrgTreeSpace.Data) => {
  form.value.owerUnitVal = data.unitName;
};
const changeMaintain = (data: IgetOrgTreeSpace.Data) => {
  form.value.maintainUnitVal = data.unitName;
};

// 图片上传
const fileList = ref<UploadUserFile[]>([]);

// 地图
const locationDialogVisiable = ref(false);
const locationClose = () => {
  locationDialogVisiable.value = false;
};
const locationSubmit = (info: IlocalInfo) => {
  locationDialogVisiable.value = false;
  form.value.address = info.address;
  form.value.longitude = info.longitude;
  form.value.latitude = info.latitude;
};
onMounted(async() => {
  const dict1 = await getListDict(props.typeCode);
  typeList.value = dict1;
  const dict2 = await getListDict('MAINTAIN_LEVEL');
  levelList.value = dict2;
  const dict3 = await getListDict('FACILITY_STATE');
  statusList.value = dict3;
  if (props.id.length) {
    const res = await apiFacilityDrainageObj.getFacilityDrainage(props.id);
    editForm.value = res.data;
    if (Object.keys(editForm.value).length) {
      Object.assign(form.value, editForm.value);
      fileList.value = editForm.value.photoFile;
    }
  }
});

defineExpose({
  formSubmit,
  resetForm,
});
</script>
