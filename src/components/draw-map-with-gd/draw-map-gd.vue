<template>
  <hl-dialog
    v-model="dialogVisiable"
    class="map-container"
    title="选择区域"
    width="800px"
    height="728px"
    :close-on-click-modal="false"
    @closed="handleClose"
  >
    <div
      id="gdContainer"
      style="height: 100%; width: 100%"
    >
    </div>
    <hl-group
      align="items-right"
      gap="var(--md)"
      block
      style="position: absolute; left: 60px; top: 120px"
    >
      <hl-button @click="mapClearAll">重置</hl-button>
      <hl-button
        @click="startPolygon()"
        type="primary"
        :disabled="areaData?.id"
      >开始绘制</hl-button>
      <!-- <hl-button @click="review" type="primary">回显</hl-button> -->
    </hl-group>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="handleClose">取 消</hl-button>
        <hl-button
          type="primary"
          class="m-l-md"
          @click="handleConfirm"
        >确 定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>

<script lang="ts"  setup>
import { ref, onMounted, watch, onBeforeUnmount, nextTick } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import '@amap/amap-jsapi-types';
import { Deferred } from 'ts-deferred';
import { IgetOutlineSpace } from '@/apis/modules/element-subject/model';
import { initPolyEditor } from '@hongtu/amap-next/dist';
import { GlobalAPI } from '@/common/global-api';
import { useMap } from '@/hooks';
const { center } = JSON.parse(
  GlobalAPI.config.MAP_CONFIG_MONITOR_WARNING_ONEPIC
);

const props = defineProps({
  visiable: {
    type: Boolean,
    default: false,
  },
  longitude: {
    type: [Number, String],
  },
  latitude: {
    type: [Number, String],
  },
  // markData: {
  //   type: Object,
  //   default: () => {
  //     return {};
  //   },
  // },
  markData: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['drawClose', 'drawSubmit']);

let map: AMap.Map;
const polyEditor = ref();
const polygonShape = ref();
const editPolygonShape = ref();
const initCenter = ref<number[]>([]);
const eventData = ref<Record<string, any>[]>([]);
const areaData = ref();
const dialogVisiable = ref(false);
const compatibleData = ref(
  {
    id: 'bade11d13a1631c40b16d67169780c81',
    type: 'Feature',
    properties:
    { name: '多边形',
      'fill-color': '#54A6F2',
      'line-color': '#54A6F2',
      opacity: 0.1,
      visible: true,
      description: '',
      'properties-dictionary': [{
        key: 'name', label: '名称', type: 'string'
      }, {
        key: 'fill-color', label: '填充色', type: 'color' },
      { key: 'line-color', label: '边框色', type: 'color' },
      { key: 'opacity', label: '透明度', type: 'number', step: 0.1, min: 0, max: 1 },
      { key: 'description', label: '说明', type: 'textArea' }] },
    geometry: {
      coordinates: [
        []
      ],
      type: 'Polygon'
    }
  }
);
const initMap = (path: any) => {
  AMapLoader.load({
    key: 'd9c8c39b15d50bf97df34dcfa5873196',
    plugins: ['AMap.PolygonEditor'],
    version: '2.0',
  })
    .then(AMap => {
      map = new AMap.Map('gdContainer', {
        center: initCenter.value,
        zoom: 15,
        plugin: [
          // 一些工具插件
          {
            pName: 'MapType', // 地图类型
            defaultType: 0,
          },
        ],
      });
      // const path1 = [[120.18319501315636, 33.31906780413317],
      //   [120.19804372226275, 33.31935469260067],
      //   [120.1983441296718, 33.3213270252281]];
      if (path.length) {
        const polygon1 = new AMap.Polygon({
          path
        });
        map.add([polygon1]);
      }
      polyEditor.value = new AMap.PolygonEditor(map);
    })
    .catch();
};
const mapVmDeffered = new Deferred();
const defaultConfig = {
  cursor: 'pointer',
  fillOpacity: 0.3,
  strokeColor: '#1791fc',
  strokeOpacity: 0.8,
  strokeStyle: 'solid',
  strokeWeight: 4,
};
const mapClearAll = () => {
  polyEditor.value?.setTarget();
  map?.clearMap();
  areaData.value = {};
  if (map) {
    map?.destroy();
    map = null;
  }
};

watch(
  () => props.visiable,
  (count, prevCount) => {
    initCenter.value = [
      +props.longitude || center[0],
      +props.latitude || center[1],
    ];
    if (count !== prevCount) {
      dialogVisiable.value = count;
      if (dialogVisiable.value) {
        mapClearAll();
        if (props.markData !== '') {
          const markString = JSON.parse(props.markData);
          console.log(markString, 167);
          try {
            if (markString.type === 'Feature') {
              areaData.value = markString;
              initMap(areaData.value.geometry.coordinates);
              // debugger;
            }
          } catch (err) {
            console.log(err, 173);
          }
        } else {
          nextTick(() => {
            if (document.querySelector('#gdContainer')) {
              initMap([]);
            }
          });
        }
      }
    }
  }
);
// 回显后端返回的图形数据
// watch(
//   () => props.markData,
//   async val => {
//     mapClearAll();
//     if (val !== '') {
//       const markString = JSON.parse(val);
//       console.log(markString, 167);
//       try {
//         if (markString.type === 'Feature') {
//           areaData.value = markString;
//           initMap(areaData.value.geometry.coordinates);
//         }
//       } catch (err) {
//         console.log(err, 173);
//       }
//     } else {
//       nextTick(() => {
//         if (document.querySelector('#gdContainer')) {
//           initMap([]);
//         }
//       });
//       // if (document.querySelector('#gdContainer')) {
//       //   initMap([]);
//       // }
//     }
//   },
//   {
//     immediate: true,
//     deep: true,
//   }
// );
const handleClose = () => {
  mapClearAll();
  emit('drawClose');
};

const startPolygon = () => {
  polyEditor.value?.close();
  polyEditor.value.setTarget();
  polyEditor.value.open();
  polyEditor.value.on('add', data => {
    polygonShape.value = data.target;
    // polyEditor.value.addAdsorbPolygons(polygon);
    polygonShape.value.on('dblclick', () => {
      polyEditor.value.close();
    });
  });
  polyEditor.value.on('end', event => {
    const endpath = event.target.getPath();
    if (areaData.value?.id) {
      areaData.value.geometry.coordinates[0] = endpath;
    } else {
      compatibleData.value.geometry.coordinates[0] = endpath;
    }
  });
};

const handleConfirm = () => {
  polyEditor.value.close();
  const emitAreaData = {
    gisOutline: areaData.value?.id ? JSON.stringify(areaData.value) : JSON.stringify(compatibleData.value),
    gisPoint: areaData.value?.id
      ? JSON.stringify(areaData.value.geometry.coordinates[0])
      : JSON.stringify(compatibleData.value.geometry.coordinates[0]),
  };
  emit('drawSubmit', emitAreaData);
  mapClearAll();
};

// onMounted(() => {

// });
onBeforeUnmount(() => {
  if (map) {
    map?.destroy();
    map = null;
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
}
</style>
