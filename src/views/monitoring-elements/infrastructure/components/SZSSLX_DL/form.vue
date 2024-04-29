<template>
  <hl-panel style="--panel-body-padding:calc(var(--xxl) + var(--md));">
    <template #header>
      <div class="panel-title">
        <h4>道路基础信息</h4>
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
            label="道路名称:"
            prop="facilityName"
          >
            <hl-input
              v-model.trim="form.facilityName"
              placeholder="道路名称"
              maxlength="100"
              show-word-limit
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="道路类别:"
            prop="roadTypeCode"
          >
            <dict-selector
              v-model="form.roadTypeCode"
              dictType="SZSSLX_DL"
              placeholder="道路类别"
              :block="true"
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
            label="养护等级:"
            prop="maintainLevelCode"
          >
            <dict-selector
              v-model="form.maintainLevelCode"
              dictType="MAINTAIN_LEVEL"
              placeholder="养护等级"
              :block="true"
            />
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
            label="道路位置:"
            prop="address"
          >
            <hl-input
              v-model.trim="form.address"
              placeholder="道路位置"
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
            label="所属道路"
            prop="belongRoad"
          >
            <hl-input
              v-model.trim="form.belongRoad"
              placeholder="所属道路"
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
      </hl-row>
      <hl-row
        class="show-col"
        gap="var(--md)"
      >
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
      </hl-row>
      <hl-row
        class="show-col"
        gap="var(--md)"
      >
        <hl-col span="col-8">
          <hl-form-item
            label="道路状态:"
            prop="facilityStateCode"
          >
            <dict-selector
              v-model="form.facilityStateCode"
              dictType="FACILITY_STATE"
              placeholder="道路状态"
              :block="true"
            />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row>
        <hl-col span="col-24">
          <hl-form-item
            label="备注:"
            prop="roadDesc"
          >
            <hl-input
              native-type="textarea"
              :rows="4"
              v-model.trim="form.roadDesc"
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
  <hl-panel style="--panel-body-padding:calc(var(--xxl) + var(--md));" class="m-t-lg">
    <template #header>
      <div class="panel-title">
        <h4>道路识别信息</h4>
      </div>
    </template>

    <hl-form
      ref="formRef2"
      :disabled="dialogsType === 'detail'"
      :model="form2"
      :rules="formRules2"
      :label-position="['items-left', 'items-left']"
      :width="['col-24', 'col-24']"
    >
      <hl-row
        class="show-col"
        gap="var(--md)"
      >
        <hl-col span="col-6">
          <hl-form-item
            label="道路等级:"
            prop="roadLevel"
          >
            <hl-input
              v-model.trim="form2.roadLevel"
              placeholder="道路等级"
              maxlength="50"
              show-word-limit
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item
            label="道路长度(km):"
            prop="roadLength"
          >
            <hl-input
              v-model.trim="form2.roadLength"
              placeholder="道路长度"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item
            label="道路宽度(m):"
            prop="roadWidth"
          >
            <hl-input
              v-model.trim="form2.roadWidth"
              placeholder="道路宽度"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item
            label="道路面积（万㎡）"
            prop="roadArea"
          >
            <hl-input
              v-model.trim="form2.roadArea"
              placeholder="道路面积"
              block
            />
          </hl-form-item>
        </hl-col>
      </hl-row>
      <hl-row
        class="show-col"
        gap="var(--md)"
      >
        <hl-col span="col-6">
          <hl-form-item
            label="车行道面积(万㎡):"
            prop="roadwayArea"
          >
            <hl-input
              v-model.trim="form2.roadwayArea"
              placeholder="车行道面积"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item
            label="人行道面积(万㎡):"
            prop="sidewalkArea"
          >
            <hl-input
              v-model.trim="form2.sidewalkArea"
              placeholder="人行道面积"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item
            label="年度改造长度(km):"
            prop="reformLength"
          >
            <hl-input
              v-model.trim="form2.reformLength"
              placeholder="年度改造长度"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item
            label="年度改造面积(万㎡)"
            prop="reformArea"
          >
            <hl-input
              v-model.trim="form2.reformArea"
              placeholder="年度改造面积"
              block
            />
          </hl-form-item>
        </hl-col>
      </hl-row>
    </hl-form>

  </hl-panel>

  <hl-panel style="--panel-body-padding:calc(var(--xxl) + var(--md));" class="m-t-lg">
    <template #header>
      <div class="panel-title">
        <h4>道路附属设施信息</h4>
      </div>
    </template>

    <hl-form
      ref="formRef3"
      :disabled="dialogsType === 'detail'"
      :model="form3"
      :rules="formRules3"
      :label-position="['items-left', 'items-left']"
      :width="['col-24', 'col-24']"
    >
      <hl-row
        class="show-col"
        gap="var(--md)"
      >
        <hl-col span="col-6">
          <hl-form-item
            label="排水管道长度(km):"
            prop="drainLength"
          >
            <hl-input
              v-model.trim="form3.drainLength"
              placeholder="排水管道长度"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item
            label="雨水管道长度(km):"
            prop="rainPipeLength"
          >
            <hl-input
              v-model.trim="form3.rainPipeLength"
              placeholder="雨水管道长度"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item
            label="污水管道长度(km):"
            prop="sewageConduitLength"
          >
            <hl-input
              v-model.trim="form3.sewageConduitLength"
              placeholder="污水管道长度"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item
            label="雨污合流管道长度(km)"
            prop="rainSewageLength"
          >
            <hl-input
              v-model.trim="form3.rainSewageLength"
              placeholder="雨污合流管道长度"
              block
            />
          </hl-form-item>
        </hl-col>
      </hl-row>

      <hl-row
        class="show-col"
        gap="var(--md)"
      >
        <hl-col span="col-6">
          <hl-form-item
            label="进水口数量(座):"
            prop="intakeNum"
          >
            <hl-input
              v-model.trim="form3.intakeNum"
              placeholder="进水口数量"
              maxlength="50"
              show-word-limit
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item
            label="排水井数量(座):"
            prop="drainageWellNum"
          >
            <hl-input
              v-model.trim="form3.drainageWellNum"
              placeholder="排水井数量"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item
            label="社会单位井盖数(座):"
            prop="socialWellNum"
          >
            <hl-input
              v-model.trim="form3.socialWellNum"
              placeholder="社会单位井盖数"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item
            label="盲道长度(m)"
            prop="blindRoadLength"
          >
            <hl-input
              v-model.trim="form3.blindRoadLength"
              placeholder="盲道长度"
              block
            />
          </hl-form-item>
        </hl-col>
      </hl-row>

      <hl-row
        class="show-col"
        gap="var(--md)"
      >
        <hl-col span="col-6">
          <hl-form-item
            label="盲道口数量(个):"
            prop="blindRoadNum"
          >
            <hl-input
              v-model.trim="form3.blindRoadNum"
              placeholder="盲道口数量"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item
            label="铁护栏长度(m):"
            prop="ironGuardrailLength"
          >
            <hl-input
              v-model.trim="form3.ironGuardrailLength"
              placeholder="铁护栏长度"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item
            label="石护栏长度(m):"
            prop="stoneGuardrailLength"
          >
            <hl-input
              v-model.trim="form3.stoneGuardrailLength"
              placeholder="石护栏长度"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item
            label="防撞护栏长度(m)"
            prop="crashGuardrailLength"
          >
            <hl-input
              v-model.trim="form3.crashGuardrailLength"
              placeholder="防撞护栏长度"
              block
            />
          </hl-form-item>
        </hl-col>
      </hl-row>

      <hl-row
        class="show-col"
        gap="var(--md)"
      >
        <hl-col span="col-6">
          <hl-form-item
            label="中间隔离护栏长度(m):"
            prop="isolationGuardrailLength"
          >
            <hl-input
              v-model.trim="form3.isolationGuardrailLength"
              placeholder="中间隔离护栏长度"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item
            label="隔离墩数量（个）:"
            prop="roadBarrierNum"
          >
            <hl-input
              v-model.trim="form3.roadBarrierNum"
              placeholder="隔离墩数量"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item
            label="挡墙体积(m³):"
            prop="retainWallVolume"
          >
            <hl-input
              v-model.trim="form3.retainWallVolume"
              placeholder="挡墙体积"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-6">
          <hl-form-item
            label="路铭牌数量(块)"
            prop="roadNameplateNum"
          >
            <hl-input
              v-model.trim="form3.roadNameplateNum"
              placeholder="路铭牌数量"
              block
            />
          </hl-form-item>
        </hl-col>
      </hl-row>
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
import { pick } from 'lodash-es';
import type { IlocalInfo } from '@/types/local-info';
import { IgetOrgTreeSpace } from '@/apis/modules/hongling/model';
import { apiFacilityRoadObj as api } from '@/apis/modules/special-facility/facility-road';
import DictSelector from '@/views/monitoring-config/components/universal-dict-selector.vue';
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
const actionString = props.id ? '编辑' : '新增';

// const emit = defineEmits(['refreshList']);
const router = useRouter();
const formRef = ref();
const formRef2 = ref();
const formRef3 = ref();
const formRules = {
  facilityName: [
    ruleRequired,
    {
      max: 100,
      message: '长度不超过100个字符',
      trigger: ['change', 'blur'],
    },
  ],
  roadTypeCode: [
    ruleRequired,
  ],
  address: [
    ruleRequired,
  ],
  longitude: [
    ruleRequired,
    ruleNumber
  ],
  latitude: [
    ruleRequired,
    ruleNumber
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
  totalCost: [
    ruleNumber
  ],
  belongRoad: [
    ruleRequired
  ]
};
const formRules2 = {
  roadLevel: [
    ruleRequired
  ],
  roadLength: [
    ruleRequired,
    ruleNumber
  ],
  roadWidth: [
    ruleRequired,
    ruleNumber
  ],
  roadArea: [
    ruleRequired,
    ruleNumber
  ],
};
const formRules3 = {
  drainLength: [
    ruleNumber
  ],
  rainPipeLength: [
    ruleNumber
  ],
  sewageConduitLength: [
    ruleNumber
  ],
  rainSewageLength: [
    ruleNumber
  ],
  intakeNum: [
    ruleNumber
  ],
  drainageWellNum: [
    ruleNumber
  ],
  socialWellNum: [
    ruleNumber
  ],
  blindRoadLength: [
    ruleNumber
  ],
  blindRoadNum: [
    ruleNumber
  ],
  ironGuardrailLength: [
    ruleNumber
  ],
  stoneGuardrailLength: [
    ruleNumber
  ],
  crashGuardrailLength: [
    ruleNumber
  ],
  isolationGuardrailLength: [
    ruleNumber
  ],
  roadBarrierNum: [
    ruleNumber
  ],
  retainWallVolume: [
    ruleNumber
  ],
  roadNameplateNum: [
    ruleNumber
  ],
};
const form = ref({
  id: '',
  facilityTypeCode: props.typeCode,
  roadTypeCode: '', // modify
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
  roadDesc: '', // modify
  imageUrls: '',
  belongRoad: ''
});
const form2 = ref({
  roadLevel: '',
  roadLength: '',
  roadWidth: '',
  roadArea: '',
  roadwayArea: '',
  sidewalkArea: '',
  reformLength: '',
  reformArea: '',
});

const form3 = ref({
  drainLength: '',
  rainPipeLength: '',
  sewageConduitLength: '',
  rainSewageLength: '',
  intakeNum: '',
  drainageWellNum: '',
  socialWellNum: '',
  blindRoadLength: '',
  blindRoadNum: '',
  ironGuardrailLength: '',
  stoneGuardrailLength: '',
  crashGuardrailLength: '',
  isolationGuardrailLength: '',
  roadBarrierNum: '',
  retainWallVolume: '',
  roadNameplateNum: '',
});
const editForm = ref({});

const resetForm = () => {
  formRef.value.resetFields();
};
const formSubmit = async() => {
  await Promise.all([formRef.value.validate(), formRef2.value.validate(), formRef3.value.validate()]);
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
const saveForm = async() => {
  const searchParams = { ...form.value, ...form2.value, ...form3.value };
  console.log(form2.value, searchParams, 880);
  props.action === 'add'
    ? await api.add(searchParams)
    : await api.postUpdate(searchParams);
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
  if (props.id.length) {
    const res = await api.getFacilityRoad(props.id);
    editForm.value = res.data;
    if (Object.keys(editForm.value).length) {
      Object.assign(form.value, pick(editForm.value, ...Object.keys(form.value)));
      Object.assign(form2.value, pick(editForm.value, ...Object.keys(form2.value)));
      Object.assign(form3.value, pick(editForm.value, ...Object.keys(form3.value)));
      fileList.value = editForm.value.photoFile;
    }
  }
});

defineExpose({
  formSubmit,
  resetForm,
});
</script>
