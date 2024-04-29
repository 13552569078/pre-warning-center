<template>
  <hl-dialog v-model="dialogVisiable" :close-on-click-modal="false" custom-class="map-container" title="选择区域" width="800px" height="728px" :append-to-body="true" @closed="handleClose" >
    <div style="height: 100%; width: 100%">
      <x-map
        :center="curCameraConfig.center"
        :zoom="curCameraConfig.zoom"
        @created="mapCreatedHandler"
        :mapStyle="mapStyle"
        :extendProps="extendProps">
        <x-tianditu-layer v-if="!isChangzhouProject" :token="GlobalAPI.config.TIANDITU_TOKEN" />
        <template v-else>
          <x-wms-layer
          id="wmsLayer1"
          :url=" `${CHANGZHOU_API_PREFIX}/CityMap/map-ugcv5-LightMap4490230110/wms111`"
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
            @created="wmsCreated"
          ></x-wms-layer>
        </template>
      </x-map>
    </div>
    <hl-group align="items-right" gap="var(--md)" block style="position: absolute; left: 60px; top: 120px">
      <hl-button @click="mapClearAll">重置</hl-button>
      <hl-button @click="mapDrawShape('draw_polygon')" type="primary" :disabled="areaData?.id">开始绘制</hl-button>
      <!-- <hl-button @click="review" type="primary">回显</hl-button> -->
    </hl-group>
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
import * as hongtuUtil from '@hongtu-next/util';
import { Deferred } from 'ts-deferred';
import MapboxDraw from 'hongtu-draw';
import 'hongtu-draw/dist/mapbox-gl-draw.css';
import { apiChangZhouMapObj as api } from '@/apis/modules/changzhou';
import { IgetOutlineSpace } from '@/apis/modules/element-subject/model';
import { GlobalAPI } from '@/common/global-api';
const { center } = JSON.parse(GlobalAPI.config.MAP_CONFIG_MONITOR_WARNING_ONEPIC);
const isChangzhouProject = GlobalAPI.config.IS_CHANGZHOU_PROJECT === 'true';
const { CHANGZHOU_API_PREFIX } = GlobalAPI.config;
const isTokenReady = ref(false);
const extraParams = 'token=BNThbNkRdphg7yNwweFKHOjpYiXhoka3k1kEy1XQMkdl25jnthgHt-LOVEf3F8JIRI4aSaISVTBSR5PASuYHhw..';
const changzhouToken = ref('');

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

const emit = defineEmits(['drawClose', 'drawSubmit']);

const areaData = ref({});
const mapInstance = ref();
const dialogVisiable = ref(props.visiable);
const { protocol, host, pathname } = window.location;
const mapStyle = {
  version: 8,
  glyphs: `${protocol}//${host}${pathname}map/fonts/{fontstack}/{range}.pbf`,
  sprite: `${protocol}//${host}${pathname}map/sprites/sprites`,
  sources: {},
  layers: []
};
let $map;
const $draw = ref();
const mapVmDeffered = new Deferred();
const location = ref([]);
const centers = ref([]);
const originCameraConfig = ref({
  center: centers,
  zoom: 14,
  bearing: 0,
  pitch: 0
});
const curCameraConfig = ref({
  center: centers,
  zoom: 14,
  bearing: 0,
  pitch: 0
});

watch(
  () => props.visiable,
  (count, prevCount) => {
    centers.value = [props.longitude || center[0], props.latitude || center[1]];
    location.value = [props.longitude || center[0], props.latitude || center[1]];
    dialogVisiable.value = count;
  }
);
// 回显后端返回的图形数据
watch(
  () => props.markData,
  async val => {
    // 等待地图加载完成
    await mapVmDeffered.promise;
    mapClearAll();
    if (val !== '') {
      const markString = JSON.parse(val);
      console.log(markString, 167);
      try {
        if (markString.type === 'Feature') {
          $draw.value?.add(markString);
          areaData.value = markString;
        }
        curCameraConfig.value.center = hongtuUtil.center(markString).geometry.coordinates;
      } catch (err) {
        console.log(err, 173);
      }
    }
  },
  {
    immediate: true,
    deep: true
  }
);
const handleClose = () => {
  emit('drawClose');
};

const wmsCreated = () => {
  $map = mapInstance.value.$map;
  $map.resize();
  $draw.value = new MapboxDraw($map, {
    userProperties: true
  });
  mapVmDeffered.resolve();
  $map.on('draw.selectionchange', data => {
    if (data.features?.length > 0) {
      areaData.value = data.features[0];
      // emit('mapSelectShape', data.features[0]);
    } else {
      // emit('mapSelectBlank');
    }
  });
  $map.on('draw.update', data => {
    if (data.features?.length > 0) {
      // emit('mapUpdateShape', data.features[0]);
    } else {
      // emit('mapSelectBlank');
    }
  });
};

const mapCreatedHandler = mapVM => {
  mapInstance.value = mapVM;
  if (!isChangzhouProject) {
    nextTick(() => {
      wmsCreated();
    });
  }
};
const review = () => {
  $draw.value?.add({
    id: '1c04c477459544fec79e62c8a1a644fc',
    type: 'Feature',
    properties: {
      name: '多边形',
      'fill-color': '#54A6F2',
      'line-color': '#54A6F2',
      opacity: 0.1,
      visible: true,
      description: '',
      'properties-dictionary': [
        { key: 'name', label: '名称', type: 'string' },
        { key: 'fill-color', label: '填充色', type: 'color' },
        { key: 'line-color', label: '边框色', type: 'color' },
        { key: 'opacity', label: '透明度', type: 'number', step: 0.1, min: 0, max: 1 },
        { key: 'description', label: '说明', type: 'textArea' }
      ]
    },
    geometry: {
      coordinates: [
        [
          [116.39044660049262, 39.91449531028479],
          [116.40490907150053, 39.91245447602637],
          [116.39220612960457, 39.9063974485947],
          [116.39044660049262, 39.91449531028479]
        ]
      ],
      type: 'Polygon'
    }
  });
};
const mapMsgReset = () => {
  if ($map) {
    $map.easeTo(originCameraConfig.value);
  }
};
const mapClearAll = () => {
  $draw.value?.deleteAll();
  areaData.value = [];
};
const mapZoomIn = () => {
  if ($map) {
    $map.setZoom($map.getZoom() + 1);
  }
};
const mapZoomOut = () => {
  if ($map) {
    $map.setZoom($map.getZoom() - 1);
  }
};
// 绘制图形
const mapDrawShape = shape => {
  $draw.value.changeMode(shape);
};
const handleCenter = {
  mapZoomIn,
  mapZoomOut,
  mapClearAll,
  mapMsgReset
};
const mapHandle = code => {
  handleCenter[code]();
};
const handleConfirm = () => {
  const emitAreaData = {
    gisOutline: areaData.value?.id ? JSON.stringify(areaData.value) : '{}',
    gisPoint: areaData.value?.id ? JSON.stringify(areaData.value.geometry.coordinates[0]) : '[]'
  };
  emit('drawSubmit', emitAreaData);
  mapClearAll();
};

onMounted(async () => {
  centers.value = [props.longitude || center[0], props.latitude || center[1]];
  location.value = [props.longitude || center[0], props.latitude || center[1]];
  if (isChangzhouProject) {
    const res = await api.getToken();
    changzhouToken.value = res.access_token;
    isTokenReady.value = true;
  }
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
  .panel-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>
