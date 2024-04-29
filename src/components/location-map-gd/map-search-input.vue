<template>
  <div class="map-search-input">
    <hl-group dir="vertical" gap="var(--md)">
      <hl-input
        style="width: calc(var(--lg) * 14);"
        clearable
        id="inline-input"
        placeholder="请输入内容"
        v-model="serarchValue"
        @change="mapSearchHandle(`${mapSearchType}`)"
        @clear="handleClearSearch"
      >
        <template #suffix>
          <hl-icon size="md" style="cursor: pointer" @click="mapSearchHandle(`${mapSearchType}`)"><two-search /></hl-icon>
        </template>
      </hl-input>
      <hl-group v-if="searchResult && searchResult.length" class="select-box" dir="vertical" gap="var(--sm)">
        <hl-scrollbar height="calc(var(--lg) * 10)">
          <hl-group v-for="(item, index) in searchResult" :key="index" block dir="vertical" gap="var(--xxs)" @click="mapPosition(item)" class="cursor-pointer">
            <hl-group>
              <span class="">{{ index + 1 }}、{{ item.name }}</span>
            </hl-group>
            <span class="text-secondary">{{item.address}}</span>
          </hl-group>
        </hl-scrollbar>
        <hl-pagination
          v-if="searchResult.length > 0"
          full
          block
          size="sm"
          align="items-center"
          layout="prev, pager, next"
          :total="paginationParams.total"
          :pageSize="paginationParams.pageSize"
          :current-page="paginationParams.currentPage"
          @current-change="handleCurrentChange"
          class="w-full p-r-md">
        </hl-pagination>
      </hl-group>
    </hl-group>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, reactive } from 'vue';
import { HlMessage } from 'hongluan-ui';
import { initGeocoder, initPlaceSearch, initDistrictSearch } from '@hongtu/amap-next/dist';
import { GlobalAPI } from '@/common';

const emit = defineEmits(['setMapCenter', 'searchMap']);

const { areaName } = GlobalAPI.config.MAP_CONFIG_MONITOR_WARNING_ONEPIC;

const visible = ref(false);
const searchResult = ref<any>([]);
const showBufferList = ref(false);
const showAddBuffer = ref(false);
const editBufferId = ref();
const mapSearchType = ref('POI');
const serarchValue = ref('');
const options = ref([
  {
    value: 'POI',
    label: '地址'
  },
  {
    value: 'COOR',
    label: '坐标'
  }
]);
const paginationParams = reactive({
  'currentPage': 1,
  'total': 0,
  'pageSize': 10
});
const selecRef = ref();
const outsideIgnore = computed(() => [
  selecRef.value?.popperPaneRef,
]);
const getMapSearchType = (v: string) => {
  mapSearchType.value = v;
};
const searchMapToolHandle = () => {
  visible.value = !visible.value;
  searchResult.value = [];
  serarchValue.value = '';
  mapSearchHandle(mapSearchType.value);
};
const mapPosition = (item: any) => {
  console.log('===item', item);
  emit('setMapCenter', item);
};
const handleClearSearch = () => {
  paginationParams.total = 0;
  searchResult.value = [];
};
const mapSearchHandle = (type: string) => {
  if (type === 'POI') {
    initPlaceSearch({ city: areaName, citylimit: false, pageIndex: paginationParams.currentPage, pageSize: paginationParams.pageSize }).then((placeSearch: any) => {
      placeSearch.search(serarchValue.value, (status: string, result: any) => {
        console.log('=-====result', result, status);
        if (status === 'complete' && result.info === 'OK') {
          console.log('====> searchMap:POI', status, result);
          paginationParams.total = result.poiList.count;
          searchResult.value = result.poiList.pois;
          const poiList = result.poiList.pois.map((poi: any) => {
            poi.lnglat = [poi.location.lng, poi.location.lat];
            poi.type = 'POI';
            return poi;
          });
          emit('searchMap', poiList);
        } else {
          emit('searchMap', []);
        }
      });
    });
  } else if (type === 'COOR') {
    initDistrictSearch({ level: 'city', extensions: 'all' }).then((districtSearch: any) => {
      districtSearch.search(areaName, function(status: string, result: any) {
        if (status === 'complete' && result.info === 'OK') {
          const bounds = result.districtList[0].boundaries;
          let isPointInRing = false;
          if (bounds.length > 0) {
            for (let i = 0; i < bounds.length; i++) {
              const lnglatArr = bounds[i].map((bound: any) => {
                return [bound.lng, bound.lat];
              });
              isPointInRing = AMap.GeometryUtil.isPointInRing([Number(serarchValue.value.split(',')[0]), Number(serarchValue.value.split(',')[1])], lnglatArr);
              if (isPointInRing) {
                break;
              }
            }
            if (isPointInRing) {
              initGeocoder({ city: areaName }).then((geocoder: any) => {
                // eslint-disable-next-line @typescript-eslint/no-shadow
                geocoder.getAddress(serarchValue.value.split(','), (status: string, result: any) => {
                  console.log('searchMap:COOR', status, result);
                  searchResult.value = [];
                  result.regeocode.lnglat = serarchValue.value.split(',');
                  result.regeocode.type = 'COOR';
                  emit('searchMap', [result.regeocode]);
                });
              });
            } else {
              HlMessage.warning({ message: `坐标不在${areaName}范围内` });
            }
          }
        } else {
          emit('searchMap', []);
        }
      });
    });
  }
};
const handleCurrentChange = (current: number) => {
  console.log('current', current);
  paginationParams.currentPage = current;
  mapSearchHandle(mapSearchType.value);
};
const handleShowAddBuffer = (id: any) => {
  showBufferList.value = false;
  showAddBuffer.value = true;
  editBufferId.value = id;
};
</script>
<style lang="scss" scoped>
.map-search-input {
  position: absolute;
  left: calc(var(--xxs) * 6);
  top: var(--md);
  // height: calc(var(--xxs) * 5);
  display: flex;
  align-items: center;
  z-index: 1;
  button {
    border: none;
  }
  .tool-label  {
    color: #0f0f0f;
    font-size: var(--font-md);
    cursor: pointer;
    &:last-child {
      color: white;
      font-weight: bold;
    }
  }
  .select-box {
    background: #fff;
    padding: var(--md) 0 var(--md) var(--md);
  }
}
</style>
