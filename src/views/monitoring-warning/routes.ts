import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: 'realtime-monitoring',
    name: 'RealtimeMonitoring',
    component: () => import('@/layout/layout-blank.vue'),
    children: [
      {
        path: 'monitoring-control',
        name: 'MonitoringControl',
        component: () => import('@/views/monitoring-warning/realtime-monitoring/access-monitoring/index.vue'),
        meta: {
          title: '接入数据监测',
          menu: true,
          keepAlive: true,
        }
      },
      {
        path: 'online-monitoring',
        name: 'OnlineMonitoring',
        component: () => import('@/views/monitoring-warning/realtime-monitoring/online-monitoring/index.vue'),
        meta: {
          title: '指标数据监测',
          menu: true,
          keepAlive: true,
        }
      },
    ],
    meta: {
      title: '实时监测',
      menu: true,
      hasParent: true,
      keepAlive: true,
    },
  },
  {
    path: 'online-historyData',
    name: 'onlineHistoryData',
    component: () => import('@/views/monitoring-warning/realtime-monitoring/online-monitoring/history/index.vue'),
    meta: {
      title: '指标历史数据',
      hiddenMenu: true,
      showBack: true,
      isGotoKeepAlive: true
    }
  },
  {
    path: 'access-historyData',
    name: 'accessHistoryData',
    component: () => import('@/views/monitoring-warning/realtime-monitoring/access-monitoring/history/index.vue'),
    meta: {
      title: '接入历史数据',
      hiddenMenu: true,
      showBack: true,
      isGotoKeepAlive: true
    }
  },
  {
    path: 'warning-management',
    name: 'WarningManagement',
    component: () => import('@/layout/layout-blank.vue'),
    meta: {
      title: '预警管理',
      menu: true,
      hasParent: true //  出现三级 本身不渲染 由一级菜单渲染
    },
    children: [
      {
        path: 'realtime-warning',
        name: 'RealtimeWarning',
        component: () => import('@/views/monitoring-warning/warning-management/realtime-warning/index.vue'),
        meta: {
          title: '实时预警',
          menu: true
        }
      },
      {
        path: 'historical-warning',
        name: 'HistoricalWarning',
        component: () => import('@/views/monitoring-warning/warning-management/historical-warning/index.vue'),
        meta: {
          title: '历史预警',
          menu: true
        }
      },
      {
        path: 'warning-judgment',
        name: 'WarningJudgment',
        component: () => import('@/views/monitoring-warning/warning-management/warning-judgment/index.vue'),
        meta: {
          title: '预警研判',
          menu: true
        }
      },
      {
        path: 'third-warning',
        name: 'ThirdWarning',
        component: () => import('@/views/monitoring-warning/warning-management/third-warning/index.vue'),
        meta: {
          title: '第三方预警',
          menu: true
        }
      },
      {
        path: 'warning-notice',
        name: 'WarningNotice',
        component: () => import('@/views/monitoring-warning/warning-management/warning-notice/index.vue'),
        meta: {
          title: '预警通知',
          menu: true
        }
      }
    ],
  },
  {
    path: 'alarm-management',
    name: 'AlarmtManagement',
    component: () => import('@/layout/layout-blank.vue'),
    meta: {
      title: '报警管理',
      menu: true,
      hasParent: true //  出现三级 本身不渲染 由一级菜单渲染
    },
    children: [
      {
        path: 'alarm-list',
        name: 'AlarmList',
        component: () => import('@/views/monitoring-warning/alarm-management/alarm-list/index.vue'),
        meta: {
          title: '报警查询',
          menu: true
        }
      },
      {
        path: 'alarm-judgment',
        name: 'AlarmJudgment',
        component: () => import('@/views/monitoring-warning/alarm-management/alarm-judgment/index.vue'),
        meta: {
          title: '报警研判',
          menu: true
        }
      },
      // {
      //   path: 'alarm-judgment2',
      //   name: 'AlarmJudgment2',
      //   component: () => import('@/views/monitoring-warning/alarm-management/alarm-judgment/index.vue'),
      //   meta: {
      //     title: '报警研判',
      //     menu: true
      //   }
      // },
      {
        path: 'alarm-notice',
        name: 'AlarmNotice',
        component: () => import('@/views/monitoring-warning/warning-management/warning-notice/index.vue'),
        meta: {
          title: '报警通知',
          menu: true
        }
      }
    ],
  },
  {
    // 新增三方预警
    path: 'third-alarm-config',
    name: 'ThirdAlarmConfig',
    component: () => import('@/views/monitoring-warning/warning-management/third-warning/add.vue'),
    meta: {
      title: '<%= action === "edit" ? "编辑" : (action === "add" ? "新增" : "") %>第三方预警',
      hiddenMenu: true,
      showBack: true,
    }
  }
];

export default routes;
