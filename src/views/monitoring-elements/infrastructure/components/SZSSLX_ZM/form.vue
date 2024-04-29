<template>
  <hl-panel style="--panel-body-padding:calc(var(--xxl) + var(--md));">
    <template #header>
      <div class="panel-title">
        <h4>路灯基础信息</h4>
      </div>
    </template>
    <hl-form ref="formRef" :model="form" :rules="formRules" :label-position="['items-left', 'items-left']" :width="['col-24', 'col-24']">
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-12">
          <hl-form-item label="路灯名称:" prop="facilityName">
            <hl-input v-model.trim="form.facilityName" placeholder="路灯名称" maxlength="100" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="路灯类别:" prop="lightTypeCode">
            <hl-select v-model="form.lightTypeCode" placeholder="请选择" block filterable clearable>
              <hl-option :label="item.dictName" :value="item.dictCode" v-for="(item, index) in lightTypeCodeList" :key="index" />
            </hl-select>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="路灯位置:" prop="address">
            <hl-input v-model.trim="form.address" placeholder="地址" maxlength="100" block show-word-limit class="address-input">
              <template #suffix>
                <hl-icon class="cursor-pointer" @click.stop="locationDialogVisiable = true">
                  <TwoPoint />
                </hl-icon>
              </template>
            </hl-input>
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-6">
          <hl-form-item label="行政区划:" prop="areaCode">
            <search-area ref="areaSelectorRef" v-model="form.areaCode" :isEmitAreaCode="true" :is-in-form="true"></search-area>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item :label="`${$t('longitude')}:`" prop="longitude">
            <hl-input v-model.trim="form.longitude" :placeholder="`${$t('longitude')}:`" block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item :label="`${$t('latitude')}:`" prop="latitude">
            <hl-input v-model.trim="form.latitude" :placeholder="`${$t('latitude')}:`" block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="所属道路:" prop="belongRoad">
            <hl-input v-model.trim="form.belongRoad" placeholder="所属道路" maxlength="100" show-word-limit block />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-6">
          <hl-form-item label="所属路段:" prop="belongRoadSection">
            <hl-input v-model.trim="form.belongRoadSection" placeholder="所属路段" maxlength="100" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="养护等级:" prop="maintainLevelCode">
            <hl-select v-model="form.maintainLevelCode" placeholder="养护等级" block filterable clearable>
              <hl-option :label="item.dictName" :value="item.dictCode" v-for="(item, index) in maintainLevelCodeList" :key="index" />
            </hl-select>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="养护单位:" prop="maintainUnitCode">
            <search-org-tree v-model="form.maintainUnitCode" @orgChanged="changeMaintain" />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="主管部门:" prop="directeUnitCode">
            <search-org-tree v-model="form.directeUnitCode" @orgChanged="changeDirecte" />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-6">
          <hl-form-item label="权属单位:" prop="owerUnitCode">
            <search-org-tree v-model="form.owerUnitCode" @orgChanged="changeOwer" />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="设计单位:">
            <hl-input v-model.trim="form.designUnitName" placeholder="设计单位" maxlength="100" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="建设单位:">
            <hl-input v-model.trim="form.buildUnitName" placeholder="建设单位" maxlength="100" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="监理单位:">
            <hl-input v-model.trim="form.superviseUnitName" placeholder="监理单位" maxlength="100" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="施工单位:">
            <hl-input v-model.trim="form.workUnitName" placeholder="施工单位" maxlength="100" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="建成时间:" prop="completedTime">
            <hl-date-picker class="w-full" value-format="YYYY-MM-DD HH:mm:ss" v-model="form.completedTime" type="date" placeholder="项目开始时间" />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="总造价(万元):" prop="totalCost">
            <hl-input v-model.trim="form.totalCost" placeholder="总造价(万元)" maxlength="100" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="路灯状态:" prop="facilityStateCode">
            <hl-select v-model="form.facilityStateCode" placeholder="请选择" block filterable clearable>
              <hl-option :label="item.dictName" :value="item.dictCode" v-for="(item, index) in facilityStateCodeList" :key="index" />
            </hl-select>
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-24">
          <hl-form-item label="备注:">
            <hl-input
            native-type="textarea"
            :rows="4"
            v-model.trim="form.lightDesc"
            placeholder="备注"
            block
            maxlength="500"
            show-word-limit
          />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-form-item label="路灯照片:">
        <file-uploader v-model="fileList"/>
      </hl-form-item>
    </hl-form>
  </hl-panel>
  <hl-panel style="--panel-body-padding:calc(var(--xxl) + var(--md));" class="m-t-lg">
    <template #header>
      <div class="panel-title">
        <h4>路灯识别信息</h4>
      </div>
    </template>
    <hl-form ref="formRef2" :model="form2" :rules="formRules2" :label-position="['items-left', 'items-left']" :width="['col-24', 'col-24']">
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-6">
          <hl-form-item label="路灯型号:" prop="lightLevelCode">
            <hl-input v-model.trim="form2.lightModel" placeholder="路灯型号" show-word-limit block maxlength="50"/>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="采购时间:" prop="lightLength">
          <hl-date-picker class="w-full" value-format="YYYY-MM-DD HH:mm:ss" v-model="form2.purchaseTime" type="date" placeholder="采购时间" />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="采购厂商:" prop="lightHeight">
            <hl-input v-model.trim="form2.purchaseManufacturer" placeholder="采购厂商" show-word-limit block maxlength="100"/>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="保质期限:" prop="lightWidth">
            <hl-input v-model.trim="form2.warrantyLimit" placeholder="保质期限" show-word-limit block maxlength="50"/>
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-6">
          <hl-form-item label="灯杆类型:">
            <hl-select v-model="form2.lamppostTypeCode" placeholder="请选择" block filterable clearable>
              <hl-option :label="item.dictName" :value="item.dictCode" v-for="(item, index) in lamppostTypeCodeList" :key="index" />
            </hl-select>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="灯杆编号:">
            <hl-input v-model.trim="form2.lamppostNo" placeholder="灯杆编号" maxlength="50" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="灯具类型:">
           <hl-select v-model="form2.lanternTypeCode" placeholder="请选择" block filterable clearable>
              <hl-option :label="item.dictName" :value="item.dictCode" v-for="(item, index) in lanternTypeCodeList" :key="index" />
            </hl-select>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="灯具名称:">
            <hl-input v-model.trim="form2.lanternName" placeholder="灯具名称" maxlength="50" show-word-limit block />
          </hl-form-item>
        </hl-col>
      </hl-row>
    </hl-form>
  </hl-panel>
  <location-map :visiable="locationDialogVisiable" @locationClose="locationClose" @locationSubmit="locationSubmit" :longitude="editForm.longitude" :latitude="editForm.latitude"></location-map>
  <hl-dialog v-model="dialogVisible" title="查看图片" width="600px">
    <hl-thumb :src="dialogImageUrl" class="full" />
  </hl-dialog>
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
import { cloneDeep, pick } from 'lodash-es';
import { LocationMap, SearchOrgTree, SearchArea } from '@/components';
import type { IlocalInfo } from '@/types/local-info';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { getListDict } from '@/common';
import { IgetOrgTreeSpace } from '@/apis/modules/hongling/model';
import { apiFacilityLightObj } from '@/apis/modules/special-facility/facility-light';
import { IgetFacilityLightSpace } from '@/apis/modules/special-facility/facility-light/model';
import { formRules, formData, formRules2, formData2 } from './utils';

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

const lightTypeCodeList = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const maintainLevelCodeList = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const facilityStateCodeList = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const lamppostTypeCodeList = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const lanternTypeCodeList = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);

const formRef = ref();
const formRef2 = ref();
const form = ref(cloneDeep(formData));
const form2 = ref(cloneDeep(formData2));
const editForm = ref({});
const resetForm = () => {
  formRef.value.resetFields();
  formRef2.value.resetFields();
};
const formSubmit = async() => {
  await Promise.all([formRef.value.validate(), formRef2.value.validate()]);
  // 文件id传入
  const photoFileIds = fileList.value.map((files: UploadUserFile) => {
    return files.id;
  });
  form.value.imageUrls = photoFileIds.join(',');
  saveForm();
  editForm.value = {};
};
const formCancel = () => {
  resetForm();
  editForm.value = {};
  backList();
};
const saveForm = async(data: IgetFacilityLightSpace.Data) => {
  const searchParams = { ...form.value, ...form2.value };
  props.action === 'add'
    ? await apiFacilityLightObj.add(searchParams)
    : await apiFacilityLightObj.postUpdate(searchParams);
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
  // 字典项获取
  lightTypeCodeList.value = await getListDict('SZSSLX_ZM');
  maintainLevelCodeList.value = await getListDict('MAINTAIN_LEVEL');
  facilityStateCodeList.value = await getListDict('FACILITY_STATE');
  lamppostTypeCodeList.value = await getListDict('LAMPPOST_TYPE');
  lanternTypeCodeList.value = await getListDict('LANTERN_TYPE');
  if (props.id.length) {
    const res = await apiFacilityLightObj.getFacilityLight(props.id);
    editForm.value = res.data;
    if (Object.keys(editForm.value).length) {
      Object.assign(form.value, pick(editForm.value, ...Object.keys(formData)));
      Object.assign(
        form2.value,
        pick(editForm.value, ...Object.keys(formData2))
      );
      fileList.value = editForm.value.photoFile;
    }
  }
});

defineExpose({
  formSubmit,
  resetForm,
});
</script>
