<template>
  <hl-panel style="--panel-body-padding:calc(var(--xxl) + var(--md));">
    <template #header>
      <div class="panel-title">
        <h4>隧道基础信息</h4>
      </div>
    </template>
    <hl-form ref="formRef" :model="form" :rules="formRules" :label-position="['items-left', 'items-left']" :width="['col-24', 'col-24']">
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-12">
          <hl-form-item label="隧道名称:" prop="facilityName">
            <hl-input v-model.trim="form.facilityName" placeholder="隧道名称" maxlength="100" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="隧道类别:" prop="tunnelTypeCode">
            <hl-select v-model="form.tunnelTypeCode" placeholder="请选择" block filterable clearable>
              <hl-option :label="item.dictName" :value="item.dictCode" v-for="(item, index) in tunnelTypeCodeList" :key="index" />
            </hl-select>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="隧道位置:" prop="address">
            <hl-input v-model.trim="form.address" placeholder="隧道位置" maxlength="100" block show-word-limit class="address-input">
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
          <hl-form-item label="所属道路:">
            <hl-input v-model.trim="form.belongRoad" placeholder="所属道路" maxlength="100" show-word-limit block />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-6">
          <hl-form-item label="所属路段:">
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
          <hl-form-item label="隧道状态:" prop="facilityStateCode">
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
            v-model.trim="form.tunnelDesc"
            placeholder="备注"
            block
            maxlength="500"
            show-word-limit
          />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-form-item label="隧道照片:">
        <file-uploader v-model="fileList"/>
      </hl-form-item>
    </hl-form>
  </hl-panel>
  <hl-panel style="--panel-body-padding:calc(var(--xxl) + var(--md));" class="m-t-lg">
    <template #header>
      <div class="panel-title">
        <h4>隧道识别信息</h4>
      </div>
    </template>
    <hl-form ref="formRef2" :model="form2" :rules="formRules2" :label-position="['items-left', 'items-left']" :width="['col-24', 'col-24']">
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-6">
          <hl-form-item label="隧道等级:" prop="tunnelLevelCode">
            <hl-select v-model="form2.tunnelLevelCode" placeholder="请选择" block filterable clearable>
              <hl-option :label="item.dictName" :value="item.dictCode" v-for="(item, index) in tunnelLevelCodeList" :key="index" />
            </hl-select>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="隧道长度(m):" prop="tunnelLength">
            <hl-input v-model.trim="form2.tunnelLength" placeholder="隧道长度" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="隧道净高(m):" prop="tunnelHeight">
            <hl-input v-model.trim="form2.tunnelHeight" placeholder="隧道面积" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="隧道宽度(m):" prop="tunnelWidth">
            <hl-input v-model.trim="form2.tunnelWidth" placeholder="隧道宽度" show-word-limit block />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-6">
          <hl-form-item label="穿越类型:">
            <hl-select v-model="form2.acrossTypeCode" placeholder="请选择" block filterable clearable>
              <hl-option :label="item.dictName" :value="item.dictCode" v-for="(item, index) in acrossTypeCodeList" :key="index" />
            </hl-select>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="隧道形式:">
            <hl-input v-model.trim="form2.tunnelType" placeholder="隧道跨数" maxlength="50" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="进口形式:">
            <hl-input v-model.trim="form2.entranceType" placeholder="进口形式" maxlength="50" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="出口形式:">
            <hl-input v-model.trim="form2.exitType" placeholder="出口形式" maxlength="50" show-word-limit block />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-6">
          <hl-form-item label="断面形式:">
            <hl-input v-model.trim="form2.sectionType" placeholder="断面形式" maxlength="50" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="路面类型:">
            <hl-input v-model.trim="form2.pavementType" placeholder="路面类型" maxlength="50" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="路面纵坡(%):" prop="longitudeSlope">
            <hl-input v-model.trim="form2.longitudeSlope" placeholder="路面纵坡" block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="路面横坡(%):" prop="crossSlope">
            <hl-input v-model.trim="form2.crossSlope" placeholder="路面横坡" block />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-6">
          <hl-form-item label="衬砌材料:">
            <hl-input v-model.trim="form2.liningMaterial" placeholder="衬砌材料" block maxlength="100" show-word-limit/>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="抗震烈度(度):"  prop="seismicIntensity">
            <hl-input v-model.trim="form2.seismicIntensity" placeholder="抗震烈度" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="设计荷载(t):"  prop="designLoad">
            <hl-input v-model.trim="form2.designLoad" placeholder="设计荷载" block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="排水类型:">
            <hl-input v-model.trim="form2.drainageType" placeholder="排水类型" show-word-limit block maxlength="100" />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-6">
          <hl-form-item label="照明情况:">
            <hl-input v-model.trim="form2.lightInfo" placeholder="照明情况" block maxlength="100" />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="通风情况:">
            <hl-input v-model.trim="form2.ventilateInfo" placeholder="通风情况" show-word-limit block maxlength="100" />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="装饰情况:">
            <hl-input v-model.trim="form2.decorateInfo" placeholder="装饰情况" block maxlength="100" />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="消防情况:">
            <hl-input v-model.trim="form2.fireControlInfo" placeholder="消防情况" show-word-limit block maxlength="100" />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-6">
          <hl-form-item label="安全通道(个):" prop="emergencyAccess">
            <hl-input v-model.trim="form2.emergencyAccess" placeholder="安全通道" block maxlength="100" />
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
import { Indexable } from 'fx-front-utils';
import { cloneDeep, pick } from 'lodash-es';
import { LocationMap, SearchOrgTree, SearchArea } from '@/components';
import type { IlocalInfo } from '@/types/local-info';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { getListDict } from '@/common';
import { IgetOrgTreeSpace } from '@/apis/modules/hongling/model';
import { apiFacilityTunnelObj } from '@/apis/modules/special-facility/facility-tunnel';
import { IgetFacilityTunnelSpace } from '@/apis/modules/special-facility/facility-tunnel/model';
import { formRules, formData, formRules2, formData2 } from './utils';

interface UploadUserFile {
  name: string;
  url: string;
  id: string;
}
interface IsuccessUpload {
  data: Indexable<any>;
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

const tunnelTypeCodeList = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const maintainLevelCodeList = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const facilityStateCodeList = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const tunnelLevelCodeList = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const acrossTypeCodeList = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);

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
const saveForm = async(data: IgetFacilityTunnelSpace.Data) => {
  const searchParams = { ...form.value, ...form2.value };
  props.action === 'add'
    ? await apiFacilityTunnelObj.add(searchParams)
    : await apiFacilityTunnelObj.postUpdate(searchParams);
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
  tunnelTypeCodeList.value = await getListDict('JTSSLX_SD');
  maintainLevelCodeList.value = await getListDict('MAINTAIN_LEVEL');
  facilityStateCodeList.value = await getListDict('FACILITY_STATE');
  tunnelLevelCodeList.value = await getListDict('TUNNEL_DEGREE');
  acrossTypeCodeList.value = await getListDict('PASS_TYPE');
  if (props.id.length) {
    const res = await apiFacilityTunnelObj.getFacilityTunnel(props.id);
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
