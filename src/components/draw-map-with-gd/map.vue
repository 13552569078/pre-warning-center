<template>
    <component :is="com"></component>
</template>
<script lang="ts" setup>
import { GlobalAPI } from '@/common/global-api';
import DrawMapGD from './draw-map-gd.vue';
import DrawMapT from './draw-map-t.vue';

const mapType = GlobalAPI.config.MAP_TYPE;

const com = mapType === 'TMAP' ? DrawMapT : DrawMapGD;
// const com = DrawMapGD;
</script>
