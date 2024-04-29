import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: 'access-data',
    name: 'AccessData',
    component: () => import('@/views/data-query-analysis/access-data/index.vue'),
    meta: {
      title: '接入数据查询'
    }
  },
  {
    path: 'monitoring-data-search',
    name: 'MonitoringDataSearch',
    component: () => import('@/views/data-query-analysis/monitoring-data-search/index.vue'),
    meta: {
      title: '监测数据查询'
    }
  },
  // {
  //   path: 'monitoring-data',
  //   name: 'MonitoringData',
  //   component: () => import('@/views/data-query-analysis/monitoring-data/index.vue'),
  //   meta: {
  //     title: '监测数据'
  //   }
  // },
  {
    path: 'alarm-information',
    name: 'AlarmInformation',
    component: () => import('@/views/data-query-analysis/alarm-information/index.vue'),
    meta: {
      title: '报警信息查询'
    }
  },
  {
    path: 'warning-information',
    name: 'WarningInformation',
    component: () => import('@/views/data-query-analysis/warning-information/index.vue'),
    meta: {
      title: '预警信息查询'
    }
  },

];

export default routes;
