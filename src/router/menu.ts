export const menuTree = [
  {
    path: '/monitoring-center',
    name: 'MonitoringCenter',
    meta: {
      icon: 'FillSet',
      title: '指标管理',
      menu: true,
    },
    children: [
      {
        path: 'computational-formula-mgmt',
        name: 'computationalFormulaManagement',
        fullPath: '/system-common-config/computational-formula-mgmt',
        meta: {
          title: '内置公式库',
          menu: true,
        },
      },
      {
        path: 'measuring-unit-mgmt',
        name: 'measuringUnitManagement',
        fullPath: '/system-common-config/measuring-unit-mgmt',
        meta: {
          title: '计量单位管理',
          menu: true,
        },
      },
      {
        path: 'indicator-mgmt',
        name: 'indicatorManagement',
        fullPath: '/system-common-config/indicator-mgmt',
        meta: {
          title: '指标管理',
          menu: true,
        },
      },
    ],
  },
  {
    path: '/monitoring-config',
    name: 'monitoringConfigRoutes',
    meta: {
      icon: 'FillAlert',
      title: '预警策略',
      menu: true,
    },
    children: [
      {
        path: 'event-type',
        name: 'eventTypeConfig',
        fullPath: '/monitoring-config/event-type',
        meta: {
          title: '风险分类管理',
          menu: true,
        },
      },
      {
        path: 'alarm-strategy-config',
        name: 'alarmStrategyConfig',
        fullPath: '/monitoring-config/alarm-strategy-config',
        meta: {
          title: '预警策略配置',
          menu: true,
        },
      }
    ],
  },
  {
    path: '/access-management',
    name: 'accessManagement',
    meta: {
      icon: 'FillChartDoughnut',
      title: '数据接入',
      menu: true,
    },
    children: [
      {
        path: 'access-object',
        name: 'accessObject',
        fullPath: '/access-management/access-object',
        meta: {
          title: '接入对象管理',
          menu: true,
        },
      },
      {
        path: 'access-item',
        name: 'accessItem',
        fullPath: '/access-management/access-item',
        meta: {
          title: '接入数据项管理',
          menu: true,
        },
      },
      {
        path: 'indicator-data-access',
        name: 'indicatorDataAccess',
        fullPath: '/access-management/indicator-data-access',
        meta: {
          title: '指标数据项管理',
          menu: true,
        },
      }
    ],
  },
  {
    path: '/monitoring-elements',
    name: 'monitoringElements',
    meta: {
      icon: 'FillShapeAnnular',
      title: '监测布控',
      menu: true,
    },
    children: [
      {
        path: 'subject',
        name: 'subject',
        fullPath: '/monitoring-elements/subject',
        meta: {
          title: '监测主体管理',
          menu: true,
        },
      },
      {
        path: 'point',
        name: 'point',
        fullPath: '/monitoring-elements/point',
        meta: {
          title: '监测点管理',
          menu: true,
        },
      },
      {
        path: 'equipment',
        name: 'equipment',
        fullPath: '/monitoring-elements/equipment',
        meta: {
          title: '监测设备管理',
          menu: true,
        },
      }
    ],
  },
  {
    path: '/monitoring-warning',
    name: 'MonitoringAlarm',
    meta: {
      icon: 'FillNews',
      title: '监测预警',
      menu: true,
    },
    children: [
      {
        path: 'realtime-monitoring',
        name: 'RealtimeMonitoring',
        meta: {
          title: '实时监测',
          menu: true,
          hasParent: true,
          keepAlive: true,
        },
        children: [
          {
            path: 'monitoring-control',
            name: 'MonitoringControl',
            fullPath: '/monitoring-warning/realtime-monitoring/monitoring-control',
            meta: {
              title: '接入数据监测',
              menu: true,
              keepAlive: true,
            }
          },
          {
            path: 'online-monitoring',
            name: 'OnlineMonitoring',
            fullPath: '/monitoring-warning/realtime-monitoring/online-monitoring',
            meta: {
              title: '指标数据监测',
              menu: true,
              keepAlive: true,
            }
          },
        ],
      },
      {
        path: 'warning-management',
        name: 'WarningManagement',
        fullPath: '/monitoring-elements/point',
        meta: {
          title: '预警管理',
          menu: true,
        },
        children: [
          {
            path: 'realtime-warning',
            name: 'RealtimeWarning',
            fullPath: '/monitoring-warning/warning-management/realtime-warning',
            meta: {
              title: '实时预警',
              menu: true
            }
          },
          {
            path: 'warning-judgment',
            name: 'WarningJudgment',
            fullPath: '/monitoring-warning/warning-management/warning-judgment',
            meta: {
              title: '预警研判',
              menu: true
            }
          },
          {
            path: 'third-warning',
            name: 'ThirdWarning',
            fullPath: '/monitoring-warning/warning-management/third-warning',
            meta: {
              title: '第三方预警',
              menu: true
            }
          },
          {
            path: 'historical-warning',
            name: 'HistoricalWarning',
            fullPath: '/monitoring-warning/warning-management/historical-warning',
            meta: {
              title: '历史预警',
              menu: true
            }
          },
        ],
      },
    ],
  },
  {
    path: '/whole-analysis',
    name: 'WholeAnalysis',
    meta: {
      title: '综合分析',
      icon: 'FillChartBar',
      menu: true,
    },
    children: [
      // 指标综合分析
      {
        path: 'target-analysis',
        name: 'TargetAnalysis',
        fullPath: '/whole-analysis/target-analysis',
        meta: {
          title: '指标综合分析'
        }
      },
      // 预警高发分析
      {
        path: 'high-incidence',
        name: 'HighIncidence',
        fullPath: '/whole-analysis/high-incidence',
        meta: {
          title: '预警高发分析'
        }
      },
      {
        path: '/report-management',
        name: 'ReportManagement',
        meta: {
          title: '报告管理',
          menu: true
        },
        children: [
          // 参数管理
          {
            path: 'parameter',
            name: 'reportManagementParameter',
            fullPath: '/report-management/parameter',
            meta: {
              title: '参数管理'
            }
          },
          // 模板管理
          {
            path: 'tpl',
            name: 'reportManagementTpl',
            fullPath: '/report-management/tpl',
            meta: {
              title: '模板管理'
            }
          }, // 报告任务管理
          {
            path: 'task',
            name: 'reportManagementTask',
            fullPath: '/report-management/task',
            meta: {
              title: '报告任务管理'
            }
          },
          // 历史报告
          {
            path: 'history-report',
            name: 'reportManagementHistoryReport',
            fullPath: '/report-management/history-report',
            meta: {
              title: '历史报告'
            }
          },
        ]
      },
    ],
  },
  {
    path: '/scene-config',
    name: 'SceneConfig',
    meta: {
      sort: 9,
      icon: 'FillFirm',
      title: '场景配置',
      menu: true
    },
    children: [
      {
        path: 'scene',
        name: 'Scene',
        fullPath: '/scene-config/scene',
        meta: {
          title: '专项类型配置'
        }
      },
      {
        path: 'scene-notice',
        name: 'SceneNotice',
        fullPath: '/scene-config/scene-notice',
        meta: {
          title: '场景通知',
        }
      },
    ]
  }
  /* {
    path: 'scene-notice',
    name: 'SceneNotice',
    component: () => import('@/views/scene-config/notice/index.vue'),
    fullPath: '/scene-config/scene-notice',
    meta: {
      title: '场景通知',
      showBack: true
    }
  }, */
];
