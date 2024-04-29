<template>
  <hl-dialog v-model="dialogVisiable" custom-class="map-container" title="选择位置" width="800px" height="728px" :append-to-body="true" @closed="handleClose">
    <div class="select-wrap">
      <hl-select class="w-full" v-model="keyword" filterable remote reserve-keyword placeholder="请输入搜索地址" :remote-method="remoteMethod" :loading="loading" clearable @change="selectChange">
        <hl-option v-for="item in addSearchResult" :key="item.hotPointID" :label="`${item.name}--${item.address}`" :value="item.lonlat" />
      </hl-select>
    </div>
    <x-map
      :zoom="14"
      @click="handleMapClick"
      :center="centers"
      :extendProps="extendProps"
      @created="mapCreatedHandler">
      <x-tianditu-layer v-if="!isChangzhouProject" :token="GlobalAPI.config.TIANDITU_TOKEN" @created="handleCreated"/>
      <template v-else>
        <x-wms-layer
        id="wmsLayer1"
        :url="`${CHANGZHOU_API_PREFIX}/CityMap/map-ugcv5-LightMap4490230110/wms111`"
        layers="0"
        srs="EPSG:4490"
        :extraParams="extraParams"
        ></x-wms-layer>
        <x-wms-layer
          id="wmsLayer2"
          :url="`${CHANGZHOU_API_PREFIX}/CityMap/map-ugcv5-LightAnno4490230110/wms111`"
          layers="0"
          srs="EPSG:4490"
          :extraParams="extraParams"
        ></x-wms-layer>
      </template>
      <x-map-marker :coordinates="locations" :draggable="false" color="red" />
    </x-map>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="handleClose">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="handleConfirm">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>

<script setup>
import { ref, onMounted, watch, computed, nextTick } from 'vue';
import { Deferred } from 'ts-deferred';
import * as hongtuUtil from '@hongtu-next/util';
import { GlobalAPI } from '@/common/global-api';
import { isValidLongitude, isValidLatitude } from '@/common/utils';
import { apiChangZhouMapObj as api } from '@/apis/modules/changzhou';
// eslint-disable-next-line camelcase
const { center } = JSON.parse(GlobalAPI.config.MAP_CONFIG_MONITOR_WARNING_ONEPIC);
const { mapBound } = JSON.parse(GlobalAPI.config.MAP_CONFIG_MONITOR_WARNING_ONEPIC) || '120.106864,33.347893,120.326338,33.231227';
const { CHANGZHOU_API_PREFIX } = GlobalAPI.config;

let $map = null;

const props = defineProps({
  visiable: {
    type: Boolean,
    default: false
  },
  longitude: {
    type: Number
  },
  latitude: {
    type: Number
  },
  markData: {
    type: Object,
    default: () => {
      return {};
    }
  }
});

const emit = defineEmits(['locationClose', 'locationSubmit']);
const dialogVisiable = ref(props.visiable);
const centers = ref([]); // 地图中心点
const locations = ref([]); // 地图打点图标位置
const addSearchResult = ref([]);
const keyword = ref('');
const loading = ref(false);
const changzhouToken = ref('');
const isChangzhouProject = GlobalAPI.config.IS_CHANGZHOU_PROJECT === 'true';
const isTokenReady = ref(false);
const extraParams = 'token=BNThbNkRdphg7yNwweFKHOjpYiXhoka3k1kEy1XQMkdl25jnthgHt-LOVEf3F8JIRI4aSaISVTBSR5PASuYHhw..';

const mapVmDeffered = new Deferred();
const areaData = ref({});

const curCameraConfig = ref({
  center: [centers.value[0], centers.value[1]],
  zoom: 14,
  bearing: 0,
  pitch: 0
});

const extendProps = computed(() => {
  if (!isChangzhouProject) {
    return undefined;
  } else {
    return {
      crs: 'EPSG:4490',
      transformRequest(url) {
        return {
          url,
          headers: {
            authoritytype: '2',
            testmarker: '0',
            heartbeat: '1',
            access_token: changzhouToken.value,
            elementsVersion: '1.00',
          }
        };
      }
    };
  }
});

watch(
  () => props.visiable,
  (count, prevCount) => {
    updateMapData();
    dialogVisiable.value = count;
  }
);

const mapCreatedHandler = mapVM => {
  $map = mapVM;
  mapVmDeffered.resolve();
  mapVM.resize();
};

const handleCreated = mapVM => {
  nextTick(() => {
    $map.resize();
  });
};

const resetSearchBox = () => {
  keyword.value = '';
  addSearchResult.value = [];
};
const handleMapClick = info => {
  locations.value = info.coordinates;
  resetSearchBox();
};
const handleClose = () => {
  emit('locationClose');
};
const handleConfirm = async() => {
  let locationInfo = null;
  if (!isChangzhouProject) {
    const url = `//api.tianditu.gov.cn/geocoder?postStr={'lon':${locations.value[0]},'lat':${locations.value[1]},'ver':1}&type=geocode&tk=b8ed92ff9b64aebcb0110acca15e478f`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status !== '0') return;
        locationInfo = {
          longitude: parseFloat(locations.value[0])?.toFixed(6),
          latitude: parseFloat(locations.value[1])?.toFixed(6),
          address: data?.result?.formatted_address,
          addressComponent: data?.result?.addressComponent,
          location: data?.result?.location,
        };
        console.log('地址信息', locationInfo);
        emit('locationSubmit', locationInfo);
      })
      .catch(e => console.log('maps-error', e));
  } else {
    const res = await api.rgeo(changzhouToken.value, `${locations.value[0]},${locations.value[1]}`);
    locationInfo = {
      longitude: locations.value[0],
      latitude: locations.value[1],
      address: res.result.length ? res.result[0].sf_rgeo_result.name : '',
      location: {
        lon: locations.value[0],
        lat: locations.value[1]
      },
    };
    if (res.result.length) {
      locationInfo.addressComponent = {
        areaCode: res.result[0].sf_rgeo_result.adcode,
        ...res.result[0].sf_rgeo_result
      };
    }
    console.log('地址信息', locationInfo);
    emit('locationSubmit', locationInfo);
  }
};
const _searchAddreList = query => {
  const url = `//api.tianditu.gov.cn/search?postStr={"keyWord":"${query}","level":"11","mapBound":"${mapBound}","queryType":"1","count":"20","start":"0"}&type=query&tk=b8ed92ff9b64aebcb0110acca15e478f`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      addSearchResult.value = data.pois;
      loading.value = false;
    })
    .catch(e => console.log('maps-error', e));
};

const _searchAddressListChangzhou = async query => {
  const res = await api.queryTips(changzhouToken.value, query);
  addSearchResult.value = res.result.map(item => ({
    address: item.address,
    hotPointID: item.uid,
    lonlat: `${item.location.lng} ${item.location.lat}`,
    name: item.name,
    areaCode: item.adcode
  }));
  loading.value = false;
};

const searchAddress = async query => {
  if (!isChangzhouProject) {
    _searchAddreList(query);
  } else {
    _searchAddressListChangzhou(query);
  }
};
const remoteMethod = query => {
  if (query !== '') {
    loading.value = true;
    // searchAddreList(query);
    searchAddress(query);
  } else {
    addSearchResult.value = [];
  }
};
const selectChange = value => {
  if (!value) return;
  locations.value = value.split(' ');
  addSearchResult.value = [];
  centers.value = locations.value;
};

const updateMapData = () => {
  const lon = isValidLongitude(props.longitude) ? props.longitude : center[0];
  const lat = isValidLatitude(props.latitude) ? props.latitude : center[1];
  locations.value = [lon, lat];
  centers.value = [lon, lat];
};

onMounted(async() => {
  if (isChangzhouProject) {
    const res = await api.getToken();
    changzhouToken.value = res.access_token;
    isTokenReady.value = true;
  }
  updateMapData();
  await mapVmDeffered.promise;
});
</script>
<style lang="scss">
.map-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  .panel-body {
    height: 100%;
  }
}
.mapboxgl-marker {
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;
}
.select-wrap {
  position: absolute;
  left: 60px;
  top: 120px;
  width: 250px;
  height: 100px;
  z-index: 1000;
}
</style>
