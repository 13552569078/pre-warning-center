import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: 'access-object',
    name: 'accessObject',
    component: () => import('@/views/access-management/access-object/index.vue'),
    meta: {
      title: '接入对象管理'
    }
  },
  {
    path: 'access-item',
    name: 'accessItem',
    component: () => import('@/views/access-management/access-item/index.vue'),
    meta: {
      title: '接入数据项管理'
    }
  },
  {
    path: 'access-item-add',
    name: 'accessItemAdd',
    component: () => import('@/views/access-management/access-item/components/factor-list/add.vue'),
    meta: {
      title: '<%= title%>',
      hiddenMenu: true,
      showBack: true,
    }
  },
  {
    path: 'indicator-data-access',
    name: 'indicatorDataAccess',
    component: () => import('@/views/access-management/indicator-data-access/index.vue'),
    meta: {
      title: '指标数据项管理'
    }
  },
  {
    path: 'indicator-data-access-detail',
    name: 'indicatorDataAccessDetail',
    component: () => import('@/views/access-management/indicator-data-access/components/factor-list/detail.vue'),
    meta: {
      title: '指标数据接入详情',
      hiddenMenu: true,
      showBack: true,
    }
  },
  {
    path: 'indicator-data-access-add-multiple',
    name: 'indicatorDataAccessAddMultiple',
    component: () => import('@/views/access-management/indicator-data-access/components/add-multiple/index.vue'),
    meta: {
      title: '<%= title%>',
      hiddenMenu: true,
      showBack: true,
    }
  },
  {
    path: 'indicator-data-access-add-batch-simple',
    name: 'indicatorDataAccessAddBatchSimple',
    component: () => import('@/views/access-management/indicator-data-access/components/add-batch-simple/index.vue'),
    meta: {
      title: '批量新增基础指标数据项',
      hiddenMenu: true,
      showBack: true,
    }
  },
];

export default routes;
