<template>
  <div class="app-container">
    <router-view/>
  </div>
</template>
<script lang="ts" setup>
import { defaultCacheObj, addStyle, THEME_STYLE_NAME, THEME_ORIGIN_DATA } from '@/common';
import { onMounted } from 'vue';
import { useTheme } from '@/hooks';

const { completeLoading } = useTheme();
const targetOrigin = 'http://theme.front.etcc.group/';

window.addEventListener(
  'message',
  function(event) {
    if (event.origin !== targetOrigin) return;
    if (event.data.type === 'THEME-CHANGED') {
      addStyle(event.data.css);
      defaultCacheObj.set(THEME_STYLE_NAME, event.data.css);
      defaultCacheObj.set(THEME_ORIGIN_DATA, event.data.origin);
    } else if (event.data.type === 'THEME-INIT') {
      const themeData = defaultCacheObj.get(THEME_ORIGIN_DATA);
      if (themeData) {
        const themeFrame = document.getElementById('themeFrame') as any;
        themeFrame?.contentWindow.postMessage({ type: 'RESTORE-THEME', origin: themeData }, targetOrigin);
      }
    } else if (event.data.type === 'THEME-LOADED') {
      completeLoading();
    }
  },
  false
);

const searchParams = new URLSearchParams(window.location.search); // H5模式
// 这里处理-生命城市线-专项跳转问题 首页入口
/*
    传参的值就是这个字典：
        燃气 GAS
        供水 WATER_SUPPLY
        排水 DRAINAGE
        热力 HEATING
        桥梁 BRIDGES
        隧道 TUNNELS
        综合管廊 COMPREHENSIVE_PIPE_GALLERIES http://10.253.200.46/
    */
const cityType = searchParams.get('speType') || searchParams.get('SpecialType');
if (cityType) {
  localStorage.setItem('sceneCode', cityType!);
} else if (cityType === 'all' || cityType === 'ALL') {
  localStorage.removeItem('sceneCode');
} else if ((location.href.indexOf('10.255.144.202') > -1 || location.href.indexOf('10.253.200.46') > -1) && !cityType) {
  localStorage.removeItem('sceneCode');
}

onMounted(() => {
  const theme = defaultCacheObj.get(THEME_STYLE_NAME);
  if (theme) {
    addStyle(theme);
  }
});
</script>

<style lang="scss">
  @import 'fx-front-framework/theme/index.scss';
</style>
