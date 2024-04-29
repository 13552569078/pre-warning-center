<template>
    <component :is="comName"></component>
</template>
<script lang="ts" setup>
import { GlobalAPI } from '@/common/global-api';
import { LocationMapT, LocationMapGD } from './index';
import VueAMap, { initAMapApiLoader } from '@hongtu/amap-next/dist';

const comName = GlobalAPI.config.MAP_TYPE === 'TMAP' ? LocationMapT : LocationMapGD;
if (GlobalAPI.config.MAP_TYPE !== 'TMAP') {
  initAMapApiLoader({
    key: 'd9c8c39b15d50bf97df34dcfa5873196',
    securityJsCode: '24b033df5f41c948aff9d26cb7d59133',
    plugins: []
  });
}
</script>
