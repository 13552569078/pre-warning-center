<template>
  <hl-layout
    :class="showMenuAndSub ? [boxed, showHeader ? header : null, fullHeader, aside, subHeader, fullSubHeader, footer, fullFooter] : [boxed]"
    style="height: 100%">
    <layout-header v-if="showHeader" />
    <hl-sub-header v-if="showSubHeader" class="border-top items-between">
      <hl-group dir="horizontal" align="items-middle" indent="var(--xl)">
        <div :class="['page-title', meta.hiddenSubTitle ? 'display-none' : 'page-main']">
          <hl-button class="go-back" equal no-fill v-if="meta.showBack" @click="router.go(-1)">
            <template #icon>
              <hl-icon>
                <TwoArrowLeft />
              </hl-icon>
            </template>
          </hl-button>
          <h5>{{ vuei18nKeys.includes(pageTitle) ? get18nName(pageTitle) : pageTitle }}</h5>
          <h6 class="text-secondary m-l-sm">{{ vuei18nKeys.includes(pageSubTitle) ? get18nName(pageSubTitle) :
            pageSubTitle }}</h6>
        </div>
        <div class="sub-header-left" id="pageBreadcrumb"></div>
      </hl-group>
      <div class="sub-header-right" id="pageAction"></div>
    </hl-sub-header>
    <hl-container style="background: #eaf1f7;" :class="!showHeader ? 'iframe-container' : null">
      <layout-menu v-if="showSidebar" :readRoute="readRoute" @selectedMenu="selectedMenu" />
      <hl-main v-if="showMenuAndSub && state.showRouter"
        :style="{height: isEmbed ? 'calc(100vh - (var(--layout-header-height) + var(--layout-sub-header-height) + var(--layout-footer-height)))' : 'auto'}">
        <LayoutBlank></LayoutBlank>
      </hl-main>
      <!-- iframe 无间距 -->
      <hl-main style="--layout-out-padding: 0;" v-if="!showMenuAndSub && state.showRouter" class="iframe-wujie">
        <LayoutBlank></LayoutBlank>
      </hl-main>
    </hl-container>
  </hl-layout>
</template>

<script lang="ts" setup>
import { computed, toRefs, reactive, nextTick, provide, ref } from 'vue';
import { template } from 'lodash-es';
import LayoutHeader from './header.vue';
import LayoutMenu from './menu.vue';
import { useIframe } from '@/hooks';
import { useRoute, useRouter } from 'vue-router'; // /*RouteRecordRaw*/
import { use18n } from '@/hooks';
import { GlobalAPI } from '@/common/global-api';
import LayoutBlank from './layout-blank.vue';

// TODO: 后续挪到 serverconfig 上
const readRoute = ref(false);

const route = useRoute();
const router = useRouter();
const { isInframe } = useIframe();
const { vuei18nKeys, get18nName } = use18n();

const layoutConfig = reactive({
  boxed: ['boxed1'],
  header: ['fixed-header'],
  fullHeader: ['full-header'],
  aside: ['fixed-aside'],
  subHeader: ['fixed-sub-header'],
  fullSubHeader: ['full-sub-header1'],
  footer: ['fixed-footer1'],
  fullFooter: ['full-footer1']
});

const meta = computed(() => route.meta);
const pageTitle = computed(() => template((meta?.value.title as string) || '')(Object.assign({}, route.params, route.query)));
const pageSubTitle = computed(() => template((meta?.value.subTitle as string) || '')(Object.assign({}, route.params, route.query)));

const SHOW_LAYOUT_MENU = GlobalAPI.config.LAYOUT_MENU === 'show';
const SHOW_SUB_HEADER = GlobalAPI.config.SUB_HEADER === 'show';
const SHOW_LAYOUT_HEADER = GlobalAPI.config.LAYOUT_HEADER === 'show';

const isEmbed = computed(() => {
  return (window as any).embed || (window as any).__POWERED_BY_WUJIE__ || isInframe.value;
});

const showMenuAndSub = computed(() => (!isEmbed.value || (isEmbed.value && SHOW_LAYOUT_MENU && SHOW_SUB_HEADER)));
const showHeader = computed(() => (!isEmbed.value || (isEmbed.value && SHOW_LAYOUT_HEADER)));
const showSubHeader = computed(() => {
  if (meta.value.hiddenSubHeader) {
    return false;
  } else {
    if (isEmbed.value) {
      return SHOW_SUB_HEADER;
    }
    return true;
  }
});
const showSidebar = computed(() => (!isEmbed.value || (isEmbed.value && SHOW_LAYOUT_MENU)));

const selectedMenu = (item: any) => {
  if (item.meta) {
    meta.value.title = item.meta.title;
    meta.value.subTitle = item.meta.subTitle;
  }
};

const state = reactive({
  showRouter: true
});

const reload = () => {
  state.showRouter = false;
  nextTick(() => {
    state.showRouter = true;
  });
};

provide('reload', reload);

router.beforeEach((to, from, next) => {
  if (!from.meta.isGotoKeepAlive && to.meta.keepAlive) {
    console.log('更新缓存');
    reload();
  }
  next();
});

const { boxed, header, fullHeader, aside, subHeader, fullSubHeader, footer, fullFooter } = toRefs(layoutConfig);
</script>
<style lang="scss" scoped>
.iframe-container {
  height: 100% !important;
  min-height: none !important;
}
.iframe-wujie {
  height: 100% !important;
  &.hl-main{
    min-height: auto;
  }
}
</style>
