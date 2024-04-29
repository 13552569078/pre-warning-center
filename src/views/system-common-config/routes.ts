import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: 'computational-formula-mgmt',
    name: 'computationalFormulaManagement',
    component: () => import('@/views/access-management/computational-formula-management/index.vue'),
    meta: {
      title: '内置公式库'
    }
  },
  {
    path: 'measuring-unit-mgmt',
    name: 'measuringUnitManagement',
    component: () => import('@/views/access-management/measuring-unit-management/index.vue'),
    meta: {
      title: '计量单位管理'
    }
  },
  {
    path: 'indicator-mgmt',
    name: 'indicatorManagement',
    component: () => import('@/views/access-management/indicator-management/index.vue'),
    meta: {
      title: '指标管理'
    }
  },
  {
    path: 'indicator-add',
    name: 'indicatorAdd',
    component: () => import('@/views/access-management/indicator-management/add.vue'),
    meta: {
      title: '指标管理',
      hiddenMenu: true,
    }
  },
  // {
  //   path: 'warning-config/warning-type-config',
  //   name: 'warningTypeConfig',
  //   component: () => import('@/views/system-common-config/warning-type-config/index.vue'),
  //   meta: {
  //     title: '预警类型管理'
  //   }
  // },
  {
    path: 'monitoring-factor-mgmt-detail',
    name: 'monitoringFactorMgmtDetail',
    component: () => import('@/views/system-common-config/monitoring-factor-mgmt/detail.vue'),
    meta: {
      title: '监测因子详情',
      hiddenMenu: true,
      showBack: true,
    }
  },
  {
    path: 'tag-classification-mgmt',
    name: 'tagClassificationMgmt',
    component: () => import('@/views/system-common-config/tag-classification-mgmt/index.vue'),
    meta: {
      title: '标签分类管理'
    }
  },
];

export default routes;
