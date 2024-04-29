import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { GlobalAPI } from '@/common/global-api';
import userAuth from '@/common/user-auth';
import Layout from '@/layout/layout.vue';
import SystemCommonConfigRoutes from '@/views/system-common-config/routes';
import AccessManagementRoutes from '@/views/access-management/routes';
import monitoringConfigRoutes from '@/views/monitoring-config/routes'; // 预警策略管理
import MonitoringelementsRoutes from '@/views/monitoring-elements/routes'; // 监测布控
import YgfWarningConfigRoutes from '@/views/alarm-config/routes'; // 运广服报警策略管理
import WholeAnalysisRoutes from '@/views/whole-analysis/routes'; // 综合分析
import ReportManagementRoutes from '@/views/report-management/routes'; // 报告管理
import OnePicRoutes from '@/views/one-pic/routes'; // 一张图
import MonitoringAlarm from '@/views/monitoring-warning/routes';
import SceneConfigRoutes from '@/views/scene-config/routes'; // 场景定义

const TITLE = GlobalAPI.config.TITLE_CENTRE_CONFIG;

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
  // {
  //   path: '/monitoring-config/landing',
  //   name: 'monitorLanding',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'monitorLandingIndex',
  //       component: () => import('@/views/monitoring-config-landing/monitor.vue'),
  //       meta: {
  //         hiddenSubHeader: true,
  //         icon: 'FillAirplay',
  //       }
  //     },
  //   ],
  //   meta: {
  //     icon: 'FillAirplay',
  //     onlyOne: true,
  //     sort: 2,
  //     menu: true,
  //     title: '系统流程'
  //   }
  // },
  {
    path: '/system-common-config',
    name: 'systemCommonConfig',
    component: Layout,
    children: [...SystemCommonConfigRoutes],
    meta: {
      sort: 1,
      icon: 'FillSet',
      title: '指标管理',
      menu: true
    }
  },
  {
    path: '/monitoring-config',
    name: 'monitoringConfigRoutes',
    component: Layout,
    children: [...monitoringConfigRoutes],
    meta: {
      sort: 2,
      icon: 'FillAlert',
      title: '预警策略',
      menu: true
    }
  },
  {
    path: '/alarm-config',
    name: 'ygfWarningConfig',
    component: Layout,
    children: [...YgfWarningConfigRoutes],
    meta: {
      sort: 3,
      icon: 'FillAlert',
      title: '报警策略',
      menu: true
    }
  },
  {
    path: '/access-management',
    name: 'accessManagement',
    component: Layout,
    children: [...AccessManagementRoutes],
    meta: {
      sort: 4,
      icon: 'FillChartDoughnut',
      title: '数据接入',
      menu: true
    }
  },
  {
    path: '/monitoring-elements',
    name: 'monitoringElements',
    component: Layout,
    children: [...MonitoringelementsRoutes],
    meta: {
      sort: 5,
      icon: 'FillShapeAnnular',
      title: '监测布控',
      menu: true
    }
  },
  {
    path: '/monitoring-warning',
    name: 'MonitoringAlarm',
    component: Layout,
    children: [...MonitoringAlarm],
    meta: {
      sort: 6,
      icon: 'FillNews',
      title: '智能预警',
      menu: true,
      rank: 3
    }
  },
  {
    path: '/whole-analysis',
    name: 'WholeAnalysis',
    component: Layout,
    children: [...WholeAnalysisRoutes],
    meta: {
      sort: 7,
      icon: 'FillChartBar',
      title: '综合分析',
      menu: true
    }
  },
  {
    path: '/report-management',
    name: 'ReportManagement',
    component: Layout,
    children: [...ReportManagementRoutes],
    meta: {
      sort: 8,
      icon: 'FillNews',
      title: '报告管理',
      menu: true
    }
  },
  {
    path: '/scene-config',
    name: 'SceneConfig',
    component: Layout,
    children: [...SceneConfigRoutes],
    meta: {
      sort: 9,
      icon: 'FillFirm',
      title: '场景配置',
      menu: true
    }
  },
  // 一张图外部跳转
  {
    path: '/one-pic',
    name: 'OnePic',
    component: Layout,
    children: [...OnePicRoutes],
    meta: {
      sort: 10,
      icon: 'FillMap2',
      title: '一张图',
      menu: true
    }
  }
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

// 适配【联动指挥】无界外壳
router.afterEach((to, from) => {
  window.parent?.postMessage({ method: 'routerChanged', to: to.fullPath, from: from.fullPath }, '*');
});

(window as any).$wujie?.bus.$on('redirect-router', (route: any) => {
  const hasRoute = router.getRoutes().some(r => r.path === route?.path || r.path === route || r.name === route?.name);
  hasRoute && router.push(route);
});

// 【微前端】适配【城市生命线】无界外壳路由
(window as any)?.$wujie?.props?.method?.hackRouter?.(router);

export default router;
