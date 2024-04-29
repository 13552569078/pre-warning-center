<template>
  <collapse-panel title="监测点位基本信息" class="m-b-md h-full">
    <hl-group block align="items-center">
      <hl-form ref="formRef" :model="formData" :rules="getBasicFormRules(formData)" :label-position="['items-left', 'items-left']" gap="var(--lg)" item-gap="var(--md)" :width="['120px', 'col']" style="width: 700px">
        <hl-group full gap="var(--xxl)">
          <hl-form-item label="监测点名称" prop="unitName">
            <hl-input v-model.trim="formData.unitName" placeholder="监测点名称" maxlength="20" show-word-limit block />
          </hl-form-item>

          <!-- <hl-form-item label="监测点编码" prop="unitCode">
            <hl-input v-model.trim="formData.unitCode" placeholder="监测点编码" maxlength="20" show-word-limit block />
          </hl-form-item> -->
        </hl-group>

        <hl-form-item :label="`${$t('region')}:`" prop="regionName">
          <hl-input v-model.trim="formData.regionName" :placeholder="`${$t('region')}:`" block disabled />
        </hl-form-item>

        <hl-form-item label="点位类型" v-project-item prop="unitType">
          <uni-selector v-model="formData.unitType" placeholder="请选择点位类型" dictType="UNIT_TYPE_CODE"/>
        </hl-form-item>

        <hl-form-item label="设施类型" v-project-item prop="facilityType">
          <facility-type v-model="formData.facilityType" />
        </hl-form-item>

        <hl-form-item label="设施名称" v-project-item prop="facilityId">
          <hl-select
            v-model="formData.facilityId"
            clearable
            placeholder="请选择设施">
            <hl-option
              v-for="item in optionFacility"
              :key="item.name"
              :label="item.value"
              :value="item.name"
            />
          </hl-select>
        </hl-form-item>

        <hl-form-item label="位置" prop="address">
          <hl-input v-model.trim="formData.address" placeholder="位置" maxlength="100" block class="address-input">
            <template #suffix>
              <hl-icon class="cursor-pointer" @click="locationDialogVisiable = true"><TwoPoint /></hl-icon>
            </template>
          </hl-input>
        </hl-form-item>

        <hl-form-item :label="`${$t('longlatitude')}:`" prop="longLat">
          <hl-group block align="items-between itms-center itmes-middle">
            <hl-group>
              <hl-input v-model.trim="formData.longitude" :placeholder="`${$t('longitude')}:`" block maxlength="10" />
            </hl-group>
            <hl-group class="text-light m-l-md m-r-md itmes-middle"> - </hl-group>
            <hl-group>
              <hl-input v-model.trim="formData.latitude" :placeholder="`${$t('latitude')}:`" block maxlength="10" />
            </hl-group>
          </hl-group>
        </hl-form-item>

        <hl-form-item label="高程" v-project-item prop="altitude">
          <hl-input v-model.trim="formData.altitude" placeholder="高程（单位：米）" block />
        </hl-form-item>

        <hl-form-item label="高程基准" v-project-item prop="altitudeDatum">
          <uni-selector v-model="formData.altitudeDatum" placeholder="请选择高程基准" dictType="ALTITUD_EDATUM_CODE"/>
        </hl-form-item>

        <hl-form-item label="所在区域" v-project-item prop="streetAreaCode">
          <search-area ref="areaSelectorRef" v-model="formData.streetAreaCode" :is-emit-area-code="true"></search-area>
        </hl-form-item>

        <!-- <hl-form-item label="监测设备" prop="equipIdList">

          <hl-group gap="var(--md)" align="items-between items-middle" >
            <hl-group gap="var(--md)" align="items-between items-middle">
              <hl-tag
                v-for="equip in selectedEquip"
                :key="equip.id"
                closable
                @close="handleRemoveEquip(equip.id)">
                {{ equip.name }}
              </hl-tag>
            </hl-group>
            <hl-group>
              <hl-button type="primary" size="sm" @click="handleShowEquipSelector">添加设备</hl-button>
            </hl-group>
          </hl-group>
        </hl-form-item> -->

        <hl-form-item label="描述" prop="description">
          <hl-input v-model.trim="formData.description" native-type="textarea" :rows="3" block maxlength="500" show-word-limit />
        </hl-form-item>

        <hl-form-item label="场景照片:">
          <file-uploader v-model="fileList"/>
        </hl-form-item>

      </hl-form>
    </hl-group>
  </collapse-panel>

  <!-- 设备选择弹框 -->
  <equipment-selector
    v-if="dialogVisible"
    :selected="selectedEquip"
    :longitude="formData.longitude"
    :latitude="formData.latitude"
    @close="handleCloseEquipSelector"
    @ok="handleAddEquipment"/>

  <location-map
    :visiable="locationDialogVisiable"
    :mark-data="formData.regionGisOutlineVo.gisOutline"
    :longitude="formData.longitude"
    :latitude="formData.latitude"
    @locationClose="locationDialogVisiable = false"
    @locationSubmit="locationSubmit"></location-map>

  <hl-dialog v-model="dialogPreviewVisible" title="查看图片" width="600px">
    <hl-thumb :src="dialogImageUrl" class="full" />
  </hl-dialog>

  <hl-affix position="bottom" :offset="0">
    <hl-group v-if="!$props.pointFrom" align="items-middle" class="affix-bottom w-full box-shadow-lg p-lg">
      <hl-button class="m-r-sm" type="primary" @click="ok"> {{ $route.query.pointId ? '保存' : '新建' }} </hl-button>
      <hl-button @click="$router.go(-1)">取消</hl-button>
    </hl-group>
  </hl-affix>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { LocationMap } from '@/components';
import UniSelector from '@/views/monitoring-config/components/universal-dict-selector.vue';
import FacilityType from '@/views/monitoring-config/components/facilities-type.vue';
// import { SearchArea } from '@/views/monitoring-elements/components/index';
import type { IlocalInfo } from '@/types/local-info';
import { apiEquipmentObj } from '@/apis/modules/equipment';
import { apiFacilityObj } from '@/apis/modules/facility';
import { IlistSpace } from '@/apis/modules/equipment/model';
import { apiMonitorPointObj } from '@/apis/modules/monitor-unit';
import EquipmentSelector from '@/views/monitoring-elements/equipment/index-selector.vue';
import { getBasicFormRules } from '../utils';

interface UploadUserFile {
  name: string;
  url: string;
  id: string;
}

const route = useRoute();
const router = useRouter();

const dialogImageUrl = ref('');
const dialogPreviewVisible = ref(false);

const equipList = ref<IlistSpace.Data[]>([]);
const optionFacility = ref();
const locationDialogVisiable = ref(false);
const formRef = ref();
const formData = reactive({
  unitName: '',
  unitCode: '',
  regionName: route.query?.regionTypeName, // route.query?.regionTypeName
  regionId: route.query?.regionId as string,
  address: route.query?.address,
  longitude: route.query?.longitude as string,
  latitude: route.query?.latitude as string,
  description: '',
  equipIdList: [] as string[],
  equipNameList: [] as string[],
  unitType: '',
  facilityType: '',
  altitudeDatum: '',
  altitude: '',
  facilityId: '',
  facilityIdList: [] as string[],
  fileIds: '',
  streetAreaCode: '',
  streetAreaCodeName: '',
  regionGisOutlineVo: {}
});

watch(() => formData.facilityType, type => {
  fetchFacility(type);
});

const dialogVisible = ref(false);

const fileList = ref<UploadUserFile[]>([]);

const locationSubmit = (info: IlocalInfo) => {
  locationDialogVisiable.value = false;
  Object.assign(formData, info);
};

const fetchFacility = async(facilityType: string) => {
  const res = await apiFacilityObj.getListByFacilityType(facilityType);
  optionFacility.value = res.data;
};

const ok = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      formSubmit();
    } else {
      console.log('error submit!!');
      return false;
    }
  });
};
const formSubmit = async() => {
  console.log(formData);
  formData.facilityIdList = formData.facilityId ? [formData.facilityId] : [];
  formData.fileIds = fileList.value.map((files: UploadUserFile) => {
    return files.id;
  }).join();
  await apiMonitorPointObj.postUpdateUnit(formData);
  router.push({
    name: 'point',
    query: {
      regionId: route.query.regionId
    }
  });
};

onMounted(async() => {
  if (route.query.pointId) {
    const { data } = await apiMonitorPointObj.getBaseInfo(route.query.pointId as unknown as number);
    fileList.value = data.photoFile && data.photoFile.length
      ? data.photoFile.map(item => {
        return {
          ...item,
          id: item.id,
          name: item.originalName,
          url: item.url
        };
      })
      : [];
    formData.facilityId = data.facilityIdList[0];
    Object.assign(formData, data);
  }
  // 设备列表
  const { data } = await apiEquipmentObj.list();
  equipList.value = data;
});
</script>
