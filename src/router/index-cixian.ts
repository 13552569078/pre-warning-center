import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { GlobalAPI } from '@/common/global-api';
import userAuth from '@/common/user-auth';
import Layout from '@/layout/layout.vue';
const TITLE = GlobalAPI.config.TITLE_CENTRE_CONFIG;
// import SystemCommonConfigRoutes from '@/views/system-common-config/routes';
// import AccessManagementRoutes from '@/views/access-management/routes';
// import monitoringConfigRoutes from '@/views/monitoring-config/routes'; // 预警策略管理
// import MonitoringelementsRoutes from '@/views/monitoring-elements/routes'; // 监测布控
// import YgfWarningConfigRoutes from '@/views/alarm-config/routes'; // 运广服报警策略管理
// import WholeAnalysisRoutes from '@/views/whole-analysis/routes'; // 综合分析
// import ReportManagementRoutes from '@/views/report-management/routes'; // 报告管理
// import OnePicRoutes from '@/views/one-pic/routes'; // 一张图
// import MonitoringAlarm from '@/views/monitoring-warning/routes';
// import SceneConfigRoutes from '@/views/scene-config/routes'; // 场景定义

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'homepageIndex',
        component: () => import('@/views/homepage/index.vue'),
        meta: {
          icon: 'FillAirplay'
        }
      }
    ],
    meta: {
      icon: 'FillAirplay',
      onlyOne: true,
      sort: 0,
      menu: true,
      title: TITLE
    }
  },
  {
    path: '/monitoring-center',
    name: 'MonitoringCenter',
    component: Layout,
    meta: {
      sort: 1,
      icon: 'FillNews',
      title: '监测中心',
      menu: true,
    },
    children: [
      // 报警中心
      {
        path: 'onepic-monitoring',
        name: 'OnepicMonitoring',
        component: () => null,
        meta: {
          title: '工作台管理',
          outLink: true,
          gloableKey: 'ONE_MONITORING_LINK',
          menu: true,
        }
      },
      {
        path: 'monitoring-alarm',
        name: 'MonitoringAlarm',
        component: () => import('@/layout/layout-blank.vue'),
        children: [
          {
            path: 'alarm-list',
            name: 'AlarmList',
            component: () => import('@/views/monitoring-warning/alarm-management/alarm-list/index.vue'),
            meta: {
              title: '实时报警管理',
              menu: true,
              keepAlive: true,
            }
          },
          {
            path: 'alarm-judgment',
            name: 'AlarmJudgment',
            component: () => import('@/views/monitoring-warning/alarm-management/alarm-judgment/index.vue'),
            meta: {
              title: '报警研判管理',
              menu: true,
              keepAlive: true,
            }
          },
          {
            path: 'alarm-event',
            name: 'AlarmEvent',
            component: () => import('@/views/monitoring-warning/alarm-management/alarm-judgment/index.vue'),
            meta: {
              title: '报警事件统计',
              menu: true,
              keepAlive: true,
            }
          },
        ],
        meta: {
          title: '监测报警管理',
          menu: true,
          hasParent: true,
          keepAlive: true,
        },
      },
      {
        path: 'monitoring-statistical-analysis',
        name: 'MonitoringStatisticalAnalysis',
        component: () => import('@/layout/layout-blank.vue'),
        meta: {
          title: '监测统计分析',
          menu: true,
          hasParent: true //  出现三级 本身不渲染 由一级菜单渲染
        },
        children: [
          {
            path: 'alarm-composite-analysis',
            name: 'AlarmCompositeAnalysis',
            component: () => import('@/views/whole-analysis/alarm-composite-analysis/index.vue'),
            meta: {
              title: '监测布控统计',
              menu: true,
            }
          },
          // 报警高发分析
          {
            path: 'alarm-high-incidence',
            name: 'AlarmHighIncidence',
            component: () => import('@/views/whole-analysis/alarm-high-incidence/index.vue'),
            meta: {
              title: '报警统计分析',
              menu: true,
            }
          },
        ],
      },
    ]
  },
  {
    path: '/warning-center',
    name: 'WarningCenter',
    component: Layout,
    meta: {
      sort: 2,
      icon: 'FillAlert',
      title: '预警中心',
      menu: true,
    },
    children: [
      // 预警中心
      {
        path: 'onepic-warning',
        name: 'OnepicWarning',
        component: () => null,
        meta: {
          title: '工作台管理',
          outLink: true,
          gloableKey: 'ONE_WARNING_LINK'
        }
      },
      {
        path: 'warning-management',
        name: 'WarningManagement',
        component: () => import('@/layout/layout-blank.vue'),
        meta: {
          title: '预警信息管理',
          menu: true,
          hasParent: true //  出现三级 本身不渲染 由一级菜单渲染
        },
        children: [
          {
            path: 'historical-warning',
            name: 'HistoricalWarning',
            component: () => import('@/views/monitoring-warning/warning-management/historical-warning/index.vue'),
            meta: {
              title: '预警信息生成',
              menu: true
            }
          },
          {
            path: 'warning-judgment-statistical',
            name: 'WarningJudgmentStatistical',
            component: () => import('@/views/monitoring-warning/warning-management/warning-judgment/index.vue'),
            meta: {
              title: '预警研判分析',
              menu: true
            }
          },
          {
            path: 'warning-judgment-analysis',
            name: 'WarningJudgmentAnalysis',
            component: () => import('@/views/monitoring-warning/warning-management/warning-judgment/index.vue'),
            meta: {
              title: '预警研判统计',
              menu: true
            }
          },
        ],
      },
      {
        path: 'whole-analysis',
        name: 'WholeAnalysis',
        component: () => import('@/layout/layout-blank.vue'),
        children: [
          // 预警综合分析
          {
            path: 'warning-composite-analysis',
            name: 'WarningCompositeAnalysis',
            component: () => import('@/views/whole-analysis/warning-composite-analysis/index.vue'),
            meta: {
              title: '预警信息统计'
            }
          },
        ],
        meta: {
          sort: 7,
          // icon: 'FillChartBar',
          title: '预警统计分析',
          menu: true,
          hasParent: true //  出现三级 本身不渲染 由一级菜单渲染
        }
      },
    ]
  },
  {
    path: '/monitor-warning-center',
    name: 'MonitorWarningCenter',
    component: Layout,
    meta: {
      sort: 3,
      icon: 'FillFirm',
      title: '监测预警中枢',
      menu: true,
    },
    children: [
      {
        path: 'alarm-config',
        name: 'ygfWarningConfig',
        component: () => import('@/layout/layout-blank.vue'),
        children: [
          // 配置报警策略列表
          {
            path: 'alarm-strategy-config',
            name: 'ygfAlarmStrategyConfig',
            component: () => import('@/views/alarm-config/alarm-strategy-config/index.vue'),
            meta: {
              title: '报警策略管理'
            }
          },
          // 监测点策略 模板 配置策略 详情
          {
            path: 'details',
            name: 'ygfWarningConfigDetails',
            component: () => import('@/views/alarm-config/details/index.vue'),
            meta: {
              title: '<%= title %>详情',
              hiddenMenu: true,
              showBack: true,
            }
          },
          // 配置报警策略 新增编辑
          {
            path: 'alarm-strategy',
            name: 'ygfAlarmStrategy',
            component: () => import('@/views/alarm-config/alarm-strategy-config/alarm-strategy.vue'),
            meta: {
              title: '<%= action === "edit" ? "编辑" : (action === "add" ? "新增" : "") %>报警策略',
              hiddenMenu: true,
              showBack: true,
            }
          },
        ],
        meta: {
          sort: 3,
          title: '监测中枢',
          menu: true,
          hasParent: true,
        }
      },
      {
        path: 'monitoring-config',
        name: 'monitoringConfigRoutes',
        component: () => import('@/layout/layout-blank.vue'),
        children: [
          // 配置预警策略
          {
            path: 'alarm-strategy-config',
            name: 'alarmStrategyConfig',
            component: () => import('@/views/monitoring-config/alarm-strategy-config/index.vue'),
            meta: {
              title: '预警策略配置'
            }
          },
          // 配置预警策略 新增编辑
          {
            path: 'alarm-strategy',
            name: 'alarmStrategy',
            component: () => import('@/views/monitoring-config/alarm-strategy-config/alarm-strategy.vue'),
            meta: {
              title: '<%= action === "edit" ? "编辑" : (action === "add" ? "新增" : "") %>预警策略',
              hiddenMenu: true,
              showBack: true,
            }
          },
          // 配置监测点策略 编辑
          {
            path: 'unit-alarm-strategy-config',
            name: 'unitAlarmStrategy',
            component: () => import('@/views/monitoring-config/unit-alarm-strategy/unit-strategy.vue'),
            meta: {
              title: '<%= action === "edit" ? "编辑" : (action === "add" ? "新增" : "") %>监测点预警策略',
              subTitle: '<%= action === "edit" ? "(说明：修改后将生成新的预警策略)" : "" %>',
              hiddenMenu: true,
              showBack: true,
            }
          },
          // 监测点策略 模板 配置策略 详情
          {
            path: 'details',
            name: 'monitoringConfigDetails',
            component: () => import('@/views/monitoring-config/details/index.vue'),
            meta: {
              title: '<%= title %>详情',
              hiddenMenu: true,
              showBack: true,
              isGotoKeepAlive: true
            }
          },
        ],
        meta: {
          sort: 2,
          title: '预警中枢',
          menu: true,
          hasParent: true,
        }
      },
    ]
  },
  // 场景配置中心
  {
    path: '/scenario-configuration-center',
    name: 'ScenarioConfigurationCenter',
    component: Layout,
    meta: {
      sort: 4,
      icon: 'FillShapeAnnular',
      title: '场景配置中心',
      menu: true,
    },
    children: [
      {
        path: 'scene-config',
        name: 'SceneConfig',
        component: () => import('@/layout/layout-blank.vue'),
        children: [
          // 场景定义
          {
            path: 'scene',
            name: 'Scene',
            component: () => import('@/views/scene-config/scene/index.vue'),
            meta: {
              title: '场景定义'
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
            name: 'SceneNoticeConfig',
            component: () => import('@/views/scene-config/notice/index.vue'),
            meta: {
              title: '通知模板配置',
              showBack: true
            }
          }
        ],
        meta: {
          sort: 9,
          // icon: 'FillFirm',
          title: '业务场景管理',
          menu: true,
          hasParent: true
        }
      },
      {
        path: 'monitoring-elements',
        name: 'monitoringElements',
        component: () => import('@/layout/layout-blank.vue'),
        children: [
          {
            path: 'subject',
            name: 'subject',
            component: () => import(/* webpackChunkName: "subject" */ '@/views/monitoring-elements/subject/index.vue'),
            meta: {
              title: '监测主体管理',
              menu: true,
            }
          },
          {
            path: 'point',
            name: 'point',
            component: () => import(/* webpackChunkName: "point" */ '@/views/monitoring-elements/point/index.vue'),
            meta: {
              title: '监测点管理',
              menu: true,
            },
          },
          {
            path: 'equipment',
            name: 'equipment',
            component: () => import(/* webpackChunkName: "equipment" */ '@/views/monitoring-elements/equipment/index.vue'),
            meta: {
              title: '监测设备管理',
              keepAlive: true,
              menu: true,
            }
          },
          {
            path: 'point/basic-info',
            name: 'pointBasicInfo',
            component: () => import(/* webpackChunkName: "pointBasicInfo" */ '@/views/monitoring-elements/point/basic-info/index.vue'),
            meta: {
              title: '监测点位基本信息',
              hiddenMenu: true,
              showBack: true,
            }
          },
          {
            path: 'monitoring-config/point/access',
            name: 'pointMonitorAccess',
            component: () => import(/* webpackChunkName: "pointMonitorAccess" */ '@/views/monitoring-elements/point/access/index.vue'),
            meta: {
              title: '配置报警接入数据',
              hiddenMenu: true,
              showBack: true,
            }
          },
          {
            path: 'warning-config/point/access',
            name: 'pointWarningAccess',
            component: () => import(/* webpackChunkName: "pointWarningAccess" */ '@/views/monitoring-elements/point/access/index.vue'),
            meta: {
              title: '配置预警接入数据',
              hiddenMenu: true,
              showBack: true,
            }
          },
          {
            path: 'monitoring-config/point/strategy',
            name: 'pointMonitorStrategy',
            component: () => import(/* webpackChunkName: "pointMonitorStrategy" */ '@/views/monitoring-elements/point/strategy/monitor/index.vue'),
            meta: {
              title: '配置报警策略',
              hiddenMenu: true,
              showBack: true,
            }
          },
          {
            path: 'warning-config/point/strategy',
            name: 'pointWarningStrategy',
            component: () => import(/* webpackChunkName: "pointWarningStrategy" */ '@/views/monitoring-elements/point/strategy/warning/index.vue'),
            meta: {
              title: '配置预警策略',
              hiddenMenu: true,
              showBack: true,
            }
          },
          {
            path: '/point/setting',
            name: 'pointSetting',
            component: () => import(/* webpackChunkName: "pointSetting" */ '@/views/monitoring-elements/point/setting/index.vue'),
            meta: {
              title: '配置监测点策略',
              hiddenMenu: true,
              showBack: true,
              keepAlive: true
            }
          },
          {
            path: '/point/detail',
            name: 'pointDetail',
            component: () => import(/* webpackChunkName: "pointDetail" */ '@/views/monitoring-elements/point/setting/index.vue'),
            meta: {
              title: '监测点详情',
              hiddenMenu: true,
              showBack: true,
            }
          },
          {
            path: 'infrastructure/form',
            name: 'infrastructureForm',
            component: () => import(/* webpackChunkName: "infrastructureForm" */ '@/views/monitoring-elements/infrastructure/basic-form.vue'),
            meta: {
              title: '基础设施表单',
              hiddenMenu: true,
              showBack: true,
              isGotoKeepAlive: true
            }
          }
        ],
        meta: {
          sort: 9,
          // icon: 'FillFirm',
          title: '监测要素管理',
          menu: true,
          hasParent: true
        }
      },
      // 通知管理
      {
        path: 'notification-management',
        name: 'NotificationManagement',
        component: () => import('@/layout/layout-blank.vue'),
        children: [
          // 场景通知
          {
            path: 'scene-notice',
            name: 'SceneNotice',
            component: () => import('@/views/scene-config/notice/index.vue'),
            meta: {
              title: '通知模板配置',
              showBack: true
            }
          },
          {
            path: 'alarm-notice',
            name: 'AlarmNotice',
            component: () => import('@/views/monitoring-warning/warning-management/warning-notice/index.vue'),
            meta: {
              title: '报警通知管理',
              menu: true
            }
          },
          {
            path: 'warning-notice',
            name: 'WarningNotice',
            component: () => import('@/views/monitoring-warning/warning-management/warning-notice/index.vue'),
            meta: {
              title: '预警通知管理',
              menu: true
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
        ],
        meta: {
          sort: 9,
          // icon: 'FillFirm',
          title: '通知管理',
          menu: true,
          hasParent: true
        }
      },
    ]
  },
  // 通用配置中心
  {
    path: '/general-configuration-center',
    name: 'GeneralConfigurationCenter',
    component: Layout,
    meta: {
      sort: 5,
      icon: 'FillChartDoughnut',
      title: '通用配置中心',
      menu: true,
    },
    children: [
      {
        path: 'event-configuration',
        name: 'EventConfiguration',
        component: () => import('@/layout/layout-blank.vue'),
        children: [
          {
            path: 'event-type',
            name: 'eventTypeConfig',
            component: () => import('@/views/monitoring-config/event-type/index.vue'),
            meta: {
              title: '事件类型配置'
            }
          },
          {
            path: 'event-level',
            name: 'eventLevelConfig',
            component: () => import('@/views/monitoring-config/event-type/index.vue'),
            meta: {
              title: '事件等级配置'
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
        ],
        meta: {
          sort: 9,
          // icon: 'FillFirm',
          title: '事件配置',
          menu: true,
          hasParent: true
        }
      },
      {
        path: 'MonitoringFactorConfiguration',
        name: 'MonitoringFactorConfiguration',
        component: () => import('@/layout/layout-blank.vue'),
        children: [
          {
            path: 'indicator-mgmt',
            name: 'indicatorManagement',
            component: () => import('@/views/access-management/indicator-management/index.vue'),
            meta: {
              title: '监测因子管理'
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
        ],
        meta: {
          sort: 9,
          // icon: 'FillFirm',
          title: '监测因子配置',
          menu: true,
          hasParent: true
        }
      },
    ]
  },
];
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
  history: createWebHistory(`/${process.env.PROD_PREFIX}`),
  routes
});

router.beforeEach((to: any, from, next) => {
  to.meta.outLink ? window.open(`${GlobalAPI.config[to.meta.gloableKey]}?token=${userAuth.getToken()}`, '_blank') : next();
});

export default router;
