<template>
  <hl-panel style="--panel-body-padding:calc(var(--xxl) + var(--md));">
    <template #header>
      <div class="panel-title">
        <h4>建筑工地</h4>
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
            label="建筑工地名称:"
            prop="facilityName"
          >
            <hl-input
              v-model.trim="form.facilityName"
              placeholder="建筑工地名称"
              maxlength="100"
              show-word-limit
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="建筑工地类型:"
            prop="siteTypeCode"
          >
            <hl-select
              v-model="form.siteTypeCode"
              placeholder="建筑工地类型"
              block
              filterable
              clearable
            >
              <hl-option
                :label="item.value"
                :value="item.name"
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
            label="施工单位:"
            prop="constructionUnit"
          >
            <hl-input
              v-model.trim="form.constructionUnit"
              placeholder="施工单位"
              maxlength="100"
              show-word-limit
              block
            />
          </hl-form-item>

        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="项目开始时间:"
            prop="projectStartTime"
          >
            <hl-date-picker
              class="w-full"
              value-format="YYYY-MM-DD HH:mm:ss"
              v-model="form.projectStartTime"
              type="date"
              placeholder="项目开始时间"
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="项目结束时间:"
            prop="projectEndTime"
          >
            <hl-date-picker
              class="w-full"
              value-format="YYYY-MM-DD HH:mm:ss"
              v-model="form.projectEndTime"
              type="date"
              placeholder="项目结束时间"
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
            label="施工单位责任人:"
            prop="constructionPerson"
          >
            <hl-input
              v-model.trim="form.constructionPerson"
              placeholder="施工单位责任人"
              maxlength="40"
              show-word-limit
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="施工单位责任人电话:"
            prop="constructionTel"
          >
            <hl-input
              v-model.trim="form.constructionTel"
              placeholder="施工单位责任人电话"
              maxlength="20"
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
            label="设计建筑面积:"
            prop="architectureArea"
          >
            <hl-input
              v-model.trim="form.architectureArea"
              placeholder="设计建筑面积"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="地基挖方量:"
            prop="foundationDig"
          >
            <hl-input
              v-model.trim="form.foundationDig"
              placeholder="地基挖方量"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="挖槽土运出量:"
            prop="trenchSoil"
          >
            <hl-input
              v-model.trim="form.trenchSoil"
              placeholder="挖槽土运出量"
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
            label="施工建筑垃圾产生量:"
            prop="constructionWaste"
          >
            <hl-input
              v-model.trim="form.constructionWaste"
              placeholder="施工建筑垃圾产生量"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="施工可回收废物产生量:"
            prop="constructionRecyclableWaste"
          >
            <hl-input
              v-model.trim="form.constructionRecyclableWaste"
              placeholder="施工可回收废物产生量"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="拆除建筑物面积:"
            prop="dismantleArea"
          >
            <hl-input
              v-model.trim="form.dismantleArea"
              placeholder="拆除建筑物面积"
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
            label="装修垃圾产生量:"
            prop="renovationWaste"
          >
            <hl-input
              v-model.trim="form.renovationWaste"
              placeholder="装修垃圾产生量"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="拆除可回收废物量:"
            prop="dismantleRecyclableWaste"
          >
            <hl-input
              v-model.trim="form.dismantleRecyclableWaste"
              placeholder="拆除可回收废物量"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="总覆盖面积:"
            prop="totalCoverArea"
          >
            <hl-input
              v-model.trim="form.totalCoverArea"
              placeholder="总覆盖面积"
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
            label="总挖掘体积:"
            prop="totalExcavateVolume"
          >
            <hl-input
              v-model.trim="form.totalExcavateVolume"
              placeholder="总挖掘体积"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="残留体积:"
            prop="remainVolume"
          >
            <hl-input
              v-model.trim="form.remainVolume"
              placeholder="残留体积"
              block
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="准运证编号:"
            prop="transportPermitNo"
          >
            <hl-input
              v-model.trim="form.transportPermitNo"
              maxlength="40"
              show-word-limit
              placeholder="准运证编号"
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
            label="标准有效期起始日期:"
            prop="standardValidityStartTime"
          >
            <hl-date-picker
              class="w-full"
              value-format="YYYY-MM-DD HH:mm:ss"
              v-model="form.standardValidityStartTime"
              type="date"
              placeholder="标准有效期起始日期"
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="标准有效期截止日期:"
            prop="standardValidityEndTime"
          >
            <hl-date-picker
              class="w-full"
              value-format="YYYY-MM-DD HH:mm:ss"
              v-model="form.standardValidityEndTime"
              type="date"
              placeholder="标准有效期截止日期"
            />
          </hl-form-item>
        </hl-col>
        <hl-col span="col-8">
          <hl-form-item
            label="称重设备代码:"
            prop="weighDeviceCode"
          >
            <hl-input
              v-model.trim="form.weighDeviceCode"
              placeholder="称重设备代码"
              maxlength="32"
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
        <hl-col span="col-24">
          <hl-form-item
            label="备注:"
            prop="siteDesc"
          >
            <hl-input
              native-type="textarea"
              :rows="4"
              v-model.trim="form.siteDesc"
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
  <hl-dialog
    v-model="dialogVisible"
    title="查看图片"
    width="600px"
  >
    <hl-thumb
      :src="dialogImageUrl"
      class="full"
    />
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
import { LocationMap, SearchArea } from '@/components';
import type { IlocalInfo } from '@/types/local-info';
import { getAreaList } from '@/views/monitoring-elements/utils';
import { IpostAreaListSpace } from '@/apis/modules/elements-common/model';
import { apiFacilitySiteObj } from '@/apis/modules/special-facility/facility-site';
import { IgetTypeListSpace, IgetFacilitySiteSpace } from '@/apis/modules/special-facility/facility-site/model';
import { ruleRequired, ruleNumber } from '../../rules';

interface UploadUserFile {
  name: string;
  url: string;
  id: string;
}
interface ItreeNode {
  orgName: string;
  id: string;
}
interface ItreeTag {
  text: string;
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

const areaList = ref<IpostAreaListSpace.Data[]>([]);
const typeList = ref<IgetTypeListSpace.Data[]>([]);
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
  facilityTypeCode: [
    ruleRequired,
  ],
  siteTypeCode: [
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
  streetAreaCode: [
    ruleRequired,
  ],
  projectStartTime: [
    ruleRequired,
  ],
  projectEndTime: [
    ruleRequired,
  ],
  constructionUnit: [
    ruleRequired,
  ],
  constructionPerson: [
    ruleRequired,
  ],
  constructionTel: [
    ruleRequired,
  ],
  totalCoverArea: [
    ruleRequired,
    ruleNumber
  ],
  totalExcavateVolume: [
    ruleRequired,
    ruleNumber
  ],
  remainVolume: [
    ruleRequired,
    ruleNumber
  ],
  transportPermitNo: [
    ruleRequired,
  ],
  standardValidityStartTime: [
    ruleRequired,
  ],
  standardValidityEndTime: [
    ruleRequired,
  ],
  weighDeviceCode: [
    ruleRequired,
  ],
  architectureArea: [
    ruleNumber
  ],
  foundationDig: [ruleNumber],
  trenchSoil: [ruleNumber],
  constructionWaste: [ruleNumber],
  constructionRecyclableWaste: [ruleNumber],
  dismantleArea: [ruleNumber],
  renovationWaste: [ruleNumber],
  dismantleRecyclableWaste: [ruleNumber],
};
const form = ref({
  facilityTypeCode: props.typeCode,
  facilityName: '',
  areaCode: '',
  streetAreaCode: '',
  siteTypeCode: '',
  address: '',
  longitude: '',
  latitude: '',
  projectStartTime: '',
  projectEndTime: '',
  constructionUnit: '',
  constructionPerson: '',
  constructionTel: '',
  architectureArea: '',
  foundationDig: '',
  trenchSoil: '',
  constructionWaste: '',
  constructionRecyclableWaste: '',
  dismantleArea: '',
  dismantleWaste: '',
  renovationWaste: '',
  dismantleRecyclableWaste: '',
  totalCoverArea: '',
  totalExcavateVolume: '',
  remainVolume: '',
  transportPermitNo: '',
  standardValidityStartTime: '',
  standardValidityEndTime: '',
  weighDeviceCode: '',
  siteDesc: '',
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
const saveForm = async(data: IgetFacilitySiteSpace.Data) => {
  const searchParams = { ...data };
  props.action === 'add'
    ? await apiFacilitySiteObj.add(searchParams)
    : await apiFacilitySiteObj.postUpdate(searchParams);
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

// 图片上传
const fileList = ref<UploadUserFile[]>([]);

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
  areaList.value = await getAreaList();
  const { data } = await apiFacilitySiteObj.getTypeList();
  typeList.value = data;
  if (props.id.length) {
    const res = await apiFacilitySiteObj.getFacilitySite(props.id);
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
