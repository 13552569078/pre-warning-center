<template>
  <template v-for="menu in menuList" :key="menu.path">
    <template v-if="menu.children && menu.children.length">
      <hl-sub-menu :index="menu.path" :popper-append-to-body="true" :fallback-placements="['right-start']">
        <template #title>
          <hl-icon class="item-icon" v-if="menu.meta.icon">
            <component :is="menu.meta.icon"></component>
          </hl-icon>
          <span>{{ menu.meta.title }}</span>
        </template>
        <menuItem :menuList="menu.children" :parentPath="parentPath + '/' + menu.path" :readRoute="readRoute" />
      </hl-sub-menu>
    </template>
    <hl-menu-item :index="getRoutePath(menu)" :key="menu.name" v-if="!menu.meta?.hiddenMenu && !menu.children" @click="routerSkip(menu)">
      <hl-icon class="item-icon" v-if="menu.meta.icon">
        <component :is="menu.meta.icon"></component>
      </hl-icon>
      <template #title> {{ vuei18nKeys.includes(menu.meta.title) ? get18nName(menu.meta.title) : menu.meta.title }}</template>
    </hl-menu-item>
  </template>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';
import { use18n } from '@/hooks';
import { useRouter } from 'vue-router';
import { FillSet, FillChartDoughnut, FillAirplay, FillSliders, FillWarning, FillServer, FillAlert, FillArrowLineCurve, FillShapeAnnular, FillNews, FillChartBar, FillMap2, FillFirm } from '@hongluan-ui/icons';
import { menuListPros } from '@/types/detail';

defineOptions({
  components: {
    FillSet,
    FillChartDoughnut,
    FillAirplay,
    FillServer,
    FillAlert,
    FillWarning,
    FillArrowLineCurve,
    FillShapeAnnular,
    FillSliders,
    FillNews,
    FillChartBar,
    FillMap2,
    FillFirm
  }
});

const props = defineProps({
  menuList: {
    type: Array as PropType<menuListPros[]>,
    default: () => []
  },
  parentPath: {
    type: String,
    default: ''
  },
  readRoute: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();
const { vuei18nKeys, get18nName } = use18n();

const getRoutePath = (menu: any) => {
  if (props.readRoute) {
    return (props.parentPath + '/' + menu.path).replaceAll('//', '/');
  } else {
    return menu.fullPath;
  }
};

const routerSkip = (menu: any) => {
  if (!props.readRoute) {
    router.push(menu.fullPath);
  }
};
</script>
