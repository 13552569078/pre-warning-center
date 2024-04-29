<template show-source>
  <hl-header>
    <div class="logo">
      <img :src="logoFXUrl" alt="hongluan.ui" />
      <h1>{{ TITLE }}</h1>
    </div>
    <hl-group class="header-left" gap="var(--xs)">
      <!-- <hl-button type="link" class="text-inverse">可视化大屏</hl-button>
      <hl-button type="link" class="text-inverse">Hongluan.Ui</hl-button> -->
    </hl-group>
    <div class="header-right">
      <hl-group gap="var(--xs)" class="m-r-xxl"> </hl-group>
      <div class="userinfo">
        <span class="name">Hi，{{ userName }}</span>
        <hl-dropdown class="m-l-xs">
          <hl-thumb round type="primary" size="md" light class="face" :src="userHead" fit="cover">
            <!-- <span>{{ userName.substring(0, 1) }}</span> -->
          </hl-thumb>
          <!-- <hl-thumb round type="primary" size="sm" light class="face">
            <span>{{ userName.substring(0, 1) }}</span>
          </hl-thumb> -->
          <template #dropdown>
            <hl-dropdown-menu>
              <hl-dropdown-item @click="configTheme">主题配置</hl-dropdown-item>
              <hl-dropdown-item @click="userLogout">退出</hl-dropdown-item>
            </hl-dropdown-menu>
          </template>
        </hl-dropdown>
      </div>
    </div>
  </hl-header>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { ModelessDialogManager } from 'hongluan-business-ui';
import { useUserInfo } from '@/hooks';
import { GlobalAPI } from '@/common';
import ThemePreview from './theme.vue';
import logoFXUrl from '../assets/images/logo-fx.png';
import userHead from '../assets/images/user-head.jpeg';

const TITLE = GlobalAPI.config.TITLE_CENTRE_CONFIG;

const { userName, setUserInfo, userLogout } = useUserInfo();

if (!userName.value) {
  setUserInfo();
}

const configTheme = () => {
  ModelessDialogManager.show({
    id: 'themeDialog',
    title: '主题定制',
    showMaximize: false,
    body: h(ThemePreview)
  });
};
</script>
<style lang="scss">
div[id='themeDialog'] {
  width: 850px;
  height: 500px;
  left: 50%;
  transform: translate(-50%, 0);
  .panel-body {
    height: 100%;
    padding: 0;
  }
}
.hl-layout.fixed-header .hl-header {
  background-image: url('@/assets/images/navbar.png') !important;
}
</style>
