import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  // 预警中心
  {
    path: 'onepic-warning',
    name: 'OnepicWarning',
    component: () => null,
    meta: {
      title: '预警中心',
      outLink: true,
      gloableKey: 'ONE_WARNING_LINK'
    }
  },
  // 报警中心
  {
    path: 'onepic-monitoring',
    name: 'OnepicMonitoring',
    component: () => null,
    meta: {
      title: '报警中心',
      outLink: true,
      gloableKey: 'ONE_MONITORING_LINK'
    }
  }
];

export default routes;
