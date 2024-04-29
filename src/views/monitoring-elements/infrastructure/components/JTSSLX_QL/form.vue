<template>
  <hl-panel style="--panel-body-padding:calc(var(--xxl) + var(--md));">
    <template #header>
      <div class="panel-title">
        <h4>桥梁基础信息</h4>
      </div>
    </template>
    <hl-form ref="formRef" :model="form" :rules="formRules" :label-position="['items-left', 'items-left']" :width="['col-24', 'col-24']">
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-6">
          <hl-form-item label="桥梁名称:" prop="facilityName">
            <hl-input v-model.trim="form.facilityName" placeholder="桥梁名称" maxlength="100" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="桥梁类别:" prop="bridgeTypeCode">
            <hl-select v-model="form.bridgeTypeCode" placeholder="请选择" block filterable clearable>
              <hl-option :label="item.dictName" :value="item.dictCode" v-for="(item, index) in bridgeTypeCodeList" :key="index" />
            </hl-select>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="桥梁位置:" prop="address">
            <hl-input v-model.trim="form.address" placeholder="桥梁位置" maxlength="100" block class="address-input">
              <template #suffix>
                <hl-icon class="cursor-pointer" @click.stop="locationDialogVisiable = true">
                  <TwoPoint />
                </hl-icon>
              </template>
            </hl-input>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="行政区划:" prop="areaCode">
            <search-area ref="areaSelectorRef" v-model="form.areaCode" :isEmitAreaCode="true" :is-in-form="true"></search-area>
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row class="show-col" gap="var(--md)">
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
        <hl-col span="col-6">
          <hl-form-item label="所属路段:">
            <hl-input v-model.trim="form.belongRoadSection" placeholder="所属路段" maxlength="100" show-word-limit block />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row class="show-col" gap="var(--md)">
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
        <hl-col span="col-6">
          <hl-form-item label="权属单位:" prop="owerUnitCode">
            <search-org-tree v-model="form.owerUnitCode" @orgChanged="changeOwer" />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row class="show-col" gap="var(--md)">
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
          <hl-form-item label="总造价(万元):" prop="totalCost" >
            <hl-input v-model.trim="form.totalCost" placeholder="总造价(万元)" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="桥梁状态:" prop="facilityStateCode">
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
              v-model.trim="form.bridgeDesc"
              placeholder="备注"
              block
              maxlength="500"
              show-word-limit
            />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-form-item label="桥梁照片:">
        <file-uploader v-model="fileList"/>
      </hl-form-item>
    </hl-form>
  </hl-panel>
  <hl-panel style="--panel-body-padding:calc(var(--xxl) + var(--md));" class="m-t-lg">
    <template #header>
      <div class="panel-title">
        <h4>桥梁识别信息</h4>
      </div>
    </template>
    <hl-form ref="formRef2" :model="form2" :rules="formRules2" :label-position="['items-left', 'items-left']" :width="['col-24', 'col-24']">
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-6">
          <hl-form-item label="桥梁等级:" prop="bridgeLevelCode">
            <hl-select v-model="form2.bridgeLevelCode" placeholder="请选择" block filterable clearable>
              <hl-option :label="item.dictName" :value="item.dictCode" v-for="(item, index) in bridgeLevelCodeList" :key="index" />
            </hl-select>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="桥梁长度(m):" prop="bridgeLength">
            <hl-input v-model.trim="form2.bridgeLength" placeholder="桥梁长度" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="桥梁面积(㎡):" prop="bridgeArea">
            <hl-input v-model.trim="form2.bridgeArea" placeholder="桥梁面积" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="桥梁宽度(m):" prop="bridgeWidth">
            <hl-input v-model.trim="form2.bridgeWidth" placeholder="桥梁宽度" show-word-limit block />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-6">
          <hl-form-item label="跨越种类:">
            <hl-select v-model="form2.acrossTypeCode" placeholder="请选择" block filterable clearable>
              <hl-option :label="item.dictName" :value="item.dictCode" v-for="(item, index) in acrossTypeCodeList" :key="index" />
            </hl-select>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="桥梁跨数(跨):" prop="bridgeAcrossNum">
            <hl-input v-model.trim="form2.bridgeAcrossNum" placeholder="桥梁跨数" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="跨径组合:">
            <hl-input v-model.trim="form2.spanCompose" placeholder="跨径组合" maxlength="100" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="正斜交角(°):" prop="positiveObliqueAngle">
            <hl-input v-model.trim="form2.positiveObliqueAngle" placeholder="正斜交角" show-word-limit block />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-6">
          <hl-form-item label="抗震烈度(度):" prop="seismicIntensity">
            <hl-input v-model.trim="form2.seismicIntensity" placeholder="抗震烈度" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="设计荷载(t):" prop="designLoad">
            <hl-input v-model.trim="form2.designLoad" placeholder="设计荷载" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="限载标准(t):" prop="loadLimit">
            <hl-input v-model.trim="form2.loadLimit" placeholder="限载标准" block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="限高标准(m):" prop="heightLimit">
            <hl-input v-model.trim="form2.heightLimit" placeholder="限高标准" block />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row class="show-col" gap="var(--md)">
        <hl-col span="col-6">
          <hl-form-item label="河道等级:">
            <hl-select v-model="form2.riverLevelCode" placeholder="请选择" block filterable clearable>
              <hl-option :label="item.dictName" :value="item.dictCode" v-for="(item, index) in riverLevelCodeList" :key="index" />
            </hl-select>
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="河床标高(m):" prop="riverbedHeight">
            <hl-input v-model.trim="form2.riverbedHeight" placeholder="河床标高" show-word-limit block />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item label="限高水位(m):" prop="limitedHighWater">
            <hl-input v-model.trim="form2.limitedHighWater" placeholder="限高水位" show-word-limit block />
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
import { useRouter, useRoute } from 'vue-router';
import { Indexable } from 'fx-front-utils';
import { cloneDeep, pick } from 'lodash-es';
import { LocationMap, SearchOrgTree, SearchArea } from '@/components';
import type { IlocalInfo } from '@/types/local-info';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { getListDict } from '@/common';
import { IgetOrgTreeSpace } from '@/apis/modules/hongling/model';
import { apiFacilityBridgeObj } from '@/apis/modules/special-facility/facility-bridge';
import { IgetFacilityBridgeSpace } from '@/apis/modules/special-facility/facility-bridge/model';
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

const bridgeTypeCodeList = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const maintainLevelCodeList = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const facilityStateCodeList = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const bridgeLevelCodeList = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const acrossTypeCodeList = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const riverLevelCodeList = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);

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
const saveForm = async(data: IgetFacilityBridgeSpace.Data) => {
  const searchParams = { ...form.value, ...form2.value };
  props.action === 'add'
    ? await apiFacilityBridgeObj.add(searchParams)
    : await apiFacilityBridgeObj.postUpdate(searchParams);
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
  bridgeTypeCodeList.value = await getListDict('JTSSLX_QL');
  maintainLevelCodeList.value = await getListDict('MAINTAIN_LEVEL');
  facilityStateCodeList.value = await getListDict('FACILITY_STATE');
  bridgeLevelCodeList.value = await getListDict('BRIDGE_DEGREE');
  acrossTypeCodeList.value = await getListDict('CROSSING_TYPE');
  riverLevelCodeList.value = await getListDict('RIVER_DEGREE');
  if (props.id.length) {
    const res = await apiFacilityBridgeObj.getFacilityBridge(props.id);
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
