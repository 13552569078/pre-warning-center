<template>
    <hl-dialog
      v-model="dialogVisiable"
      :close-on-click-modal="false"
      custom-class="map-container"
      title="选择位置"
      width="900px"
      height="600px"
      append-to-body
      @closed="$emit('locationClose')"
    >
      <div style="position:relative" class="w-full h-full">
        <g-amap
          :center="initCenter"
          :zoom="14"
          :show-label="true"
          @init="initMap"
          @click="clickMap"
        >
          <g-amap-mass-marks
            :data="eventData"
            :styles="iconStyle.address"
          />
          <g-amap-info-window
            v-for="popup in popups"
            :key="popup.id"
            :position="popup.coordinates"
            :offset="popup.offset"
            :visible="popup.show"
            :isCustom="true"
          >
            <component
              :is="popup.component"
              :id="popup.id"
              :properties="popup.properties"
            />
          </g-amap-info-window>
        </g-amap>
        <map-search-input @setMapCenter="markAddressPoint"/>
      </div>
      <template #footer>
        <hl-button type="primary" class="m-l-md" @click="handleConfirm">确 定</hl-button>
      </template>
    </hl-dialog>
  </template>

<script lang="ts" setup>
import { ref, watch, onBeforeUnmount } from 'vue';
import '@amap/amap-jsapi-types';
import { initGeocoder } from '@hongtu/amap-next/dist';
import { GlobalAPI } from '@/common/global-api';
import { MapSearchInput, MapSearchPop } from './index';
import { HlMessage } from 'hongluan-ui';
import { useMap } from '@/hooks';

const { center: defaultCenter } = GlobalAPI.config.MAP_CONFIG_MONITOR_WARNING_ONEPIC;

const props = defineProps({
  visiable: {
    type: Boolean,
    default: false
  },
  longitude: {
    type: [Number, String]
  },
  latitude: {
    type: [Number, String]
  }
});
const emit = defineEmits(['locationClose', 'locationSubmit']);

let amap: AMap.Map;
const initCenter = ref<number[]>([]);
const eventData = ref<Record<string, any>[]>([]);
const iconStyle = ref({
  address: {
    id: 'addressIcon',
    // eslint-disable-next-line camelcase, no-undef
    url: __webpack_public_path__ + 'images/map/sourse_map.png',
    anchor: [28, 56],
    size: [56, 56]
  }
});
const dialogVisiable = ref(props.visiable);

const { popups, showPopup, hidePopups } = useMap();

const initMap = (map: AMap.Map) => {
  amap = map;
};
const clickMap = (e: any) => {
  eventData.value = [{
    lnglat: [+e.lnglat.lng, +e.lnglat.lat],
    icon_id: 'addressIcon',
  }];
  initGeocoder({}).then((geocoder: any) => {
    geocoder.getAddress(eventData.value[0].lnglat, (_: string, result: any) => {
      showAddressPop({
        lnglat: eventData.value[0].lnglat,
        name: result.regeocode.addressComponent.township,
        address: result.regeocode.formattedAddress,
        type: 'POI',
      });
    });
  });
};

const markAddressPoint = async(item: any) => {
  eventData.value = [{
    lnglat: item.lnglat,
    icon_id: 'addressIcon',
  }];
  showAddressPop(item);
  window.setTimeout(() => {
    initCenter.value = item.lnglat;
  }, 500);
};

function showAddressPop(item: any) {
  showPopup(
    {
      id: 'eventAddressPopup',
      coordinates: item.lnglat,
      show: true,
      offset: [0, -56],
      properties: item,
      component: MapSearchPop,
    }
  );
}

const handleConfirm = () => {
  if (eventData.value.length) {
    initGeocoder({ extensions: 'all' }).then((geocoder: any) => {
      geocoder.getAddress(eventData.value[0].lnglat, (_: string, result: any) => {
        emit('locationSubmit', {
          regeocode: result.regeocode,
          address: result.regeocode.formattedAddress,
          areaName: result.regeocode.addressComponent.city,
          adcode: result.regeocode.addressComponent.adcode,
          citycode: result.regeocode.addressComponent.citycode,
          longitude: eventData.value[0].lnglat[0],
          latitude: eventData.value[0].lnglat[1],
        });
      });
    });
  } else {
    HlMessage.warning({ message: '请在地图上选点' });
  }
};

watch(() => [props.longitude, props.latitude], () => {
  eventData.value = [];
  if (props.longitude && props.latitude) {
    initCenter.value = [+props.longitude, +props.latitude];
    eventData.value.push({ lnglat: [...initCenter.value], icon_id: 'eventIcon' });
  } else {
    initCenter.value = [defaultCenter[0], defaultCenter[1]];
  }
}, {
  immediate: true,
});
watch(
  () => props.visiable,
  count => {
    dialogVisiable.value = count;
  }
);

onBeforeUnmount(() => {
  hidePopups(['eventAddressPopup']);
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
  </style>
