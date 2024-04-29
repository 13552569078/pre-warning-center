<template>
  <hl-aside :class="collapse">
    <hl-group block dir="vertical" class="h-full">
      <!-- <div class="aside-logo">
        <h1 style="--text-inverse: #3f4254">{{ TITLE }}</h1>
      </div> -->
      <hl-group class="index-button p-l-lg p-r-md" align="items-middle items-between" gap="var(--sm)" @click="handleGoHome" style="cursor: pointer">
        <span class="font-bold font-lg w-full">{{ TITLE }}</span>
        <hl-icon size="xs" class="cursor-pointer static text-primary" @click.stop="isCollapse = !isCollapse">
          <FillSignout v-show="isCollapse" />
          <FillSignin v-show="!isCollapse" />
        </hl-icon>
      </hl-group>
      <div class="scrollable no-thumb">
        <hl-menu :default-active="defaultActive" :router="readRoute" :unique-opened="true" :collapse="isCollapse" @select="selectMenu">
          <menuItem :menuList="moreChildren" :readRoute="readRoute" />
        </hl-menu>
      </div>
    </hl-group>
  </hl-aside>
</template>
<script lang="ts" setup>
import { defineComponent, onMounted, ref, watch, getCurrentInstance, computed, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { FillSignin, FillSignout } from '@hongluan-ui/icons';
import { use18n } from '@/hooks';
import { GlobalAPI } from '@/common';
import menuItem from '@/layout/menuItem.vue';
import { menuTree } from '@/router/menu';
import { menuListPros } from '@/types/detail';

const emit = defineEmits(['selectedMenu']);

defineOptions({
  components: {
    FillSignin,
    FillSignout
  }
});

const props = defineProps({
  collapse: String,
  readRoute: Boolean
});

const route = useRoute();
const router = useRouter();
const { vuei18nKeys, get18nName } = use18n();

const isCollapse = ref(false);
const TITLE = GlobalAPI.config.TITLE_CENTRE_CONFIG;

const menuList = ref<any[]>([]);

const { proxy } = getCurrentInstance()!;
const routeList = proxy?.$router.getRoutes() || [];
if (props.readRoute) {
  routeList.forEach(item => {
    if (item.meta?.menu && item.children && item.children.length > 0) {
      item.children = item.children.filter(sonItem => !sonItem.meta?.hiddenMenu);
      menuList.value.push(item);
    }
  });
} else {
  menuList.value = menuTree;
}

menuList.value.sort((m1, m2) => ((m1.meta?.sort ?? 0) as number) - ((m2.meta?.sort ?? 0) as number));

const defaultActive = ref<string>('');

let selectedMenu = {};
const tree = (data: menuListPros[]) => {
  data.forEach(item => {
    if (item.fullPath === defaultActive.value) {
      selectedMenu = item;
      return;
    }
    if (item?.children?.length) {
      tree(item.children);
    }
  });
};

const moreChildren = computed(() => menuList.value.filter(m => !m?.meta?.onlyOne && !m?.meta?.hasParent));
watch(defaultActive, (newValue: string) => {
  if (!props.readRoute) {
    // 读取菜单，从菜单中把title取出来，赋值
    tree(moreChildren.value);
    emit('selectedMenu', selectedMenu);
  }
});

const setDefaultActive = () => {
  const { path, meta } = route;
  if (meta.defaultActive) {
    defaultActive.value = meta.defaultActive as string;
  } else {
    defaultActive.value = path;
  }
};
const handleGoHome = () => {
  router.push({
    name: 'homepageIndex'
  });
};

onMounted(() => {
  setDefaultActive();
});

watch(
  () => route.path,
  () => {
    setDefaultActive();
  }
);

const secondMenuIndex = (menu: { meta: { onlyOne: any }; path: string; children: { path: string }[] }) => {
  if (menu.meta.onlyOne) {
    return menu.path + '/' + menu.children[0].path;
  } else {
    return menu.path;
  }
};

const selectMenu = (index: any, indexPath: any, item: any) => {
  console.log(123, index, indexPath, item);
};
</script>
