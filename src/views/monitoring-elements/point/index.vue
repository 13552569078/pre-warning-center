<template>
  <left-right-layout>
    <template #left>
      <left-tree @upActiveId="upActiveId" :region-id="regionId"></left-tree>
    </template>
    <template #right>
      <right-list
        :region-id="regionId"
        :region-type-code="regionTypeCode"
        :region-type-name="regionTypeName"
        :address="address"
        :longitude="longitude"
        :latitude="latitude">
      </right-list>
    </template>
  </left-right-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { LeftRightLayout } from '@/components';
import { RightList, LeftTree } from './components';
import { IgetRegionListSpace } from '@/apis/modules/element-subject/model';

const router = useRouter();
const route = useRoute();

const regionId = ref('');
const regionTypeName = ref('');
const regionTypeCode = ref('');
const address = ref('');
const longitude = ref('');
const latitude = ref('');

const upActiveId = (data: IgetRegionListSpace.Data) => {
  resetData();
  if (!data) {
    router.replace({
      name: 'point',
    });
  } else {
    if (data.regionName) {
      regionId.value = data.id;
      regionTypeName.value = data.regionName;
      address.value = data.address;
      longitude.value = data.longitude;
      latitude.value = data.latitude;
      router.replace({
        name: 'point',
        query: {
          regionId: data.id
        }
      });
    } else if (data.regionTypeName) {
      regionTypeCode.value = data.id;
      router.replace({
        name: 'point',
        query: {
          regionTypeCode: data.id
        }
      });
    }
  }
};

const resetData = () => {
  regionId.value = '';
  regionTypeCode.value = '';
  regionTypeName.value = '';
  address.value = '';
  longitude.value = '';
  latitude.value = '';
};

regionId.value = route.query.regionId as string;

</script>
