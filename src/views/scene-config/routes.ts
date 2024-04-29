import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  // 场景定义
  {
    path: 'scene',
    name: 'Scene',
    // component: () => import('@/views/scene-config/scene/index.vue'),
    // meta: {
    //   title: '场景定义'
    // }
    component: () => import('@/views/scene-config/special-type-config/index.vue'),
    meta: {
      title: '专项类型配置'
    }
  },
  // 场景定义新增编辑
  {
    path: 'scene-edit',
    name: 'SceneEdit',
    component: () => import('@/views/scene-config/scene/edit.vue'),
    meta: {
      title: '<%= action === "edit" ? "编辑" : (action === "add" ? "新增" : "") %>场景定义',
      hiddenMenu: true,
      showBack: true
    }
  },
  // 场景通知
  {
    path: 'scene-notice',
    name: 'SceneNotice',
    component: () => import('@/views/scene-config/notice/index.vue'),
    meta: {
      title: '场景通知',
      showBack: false
    }
  },
  // 生命城市线单功能
  // {
  //   path: 'special-type-config',
  //   name: 'SpecialTypeConfig',
  //   component: () => import('@/views/scene-config/special-type-config/index.vue'),
  //   meta: {
  //     title: '专项类型配置'
  //   }
  // },
];

export default routes;
