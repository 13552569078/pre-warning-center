import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // {
  //   path: 'facility-type-config',
  //   name: 'facilityTypeConfig',
  //   component: () => import('@/views/system-common-config/facility-type-config/index.vue'),
  //   meta: {
  //     title: '设施设备类型管理'
  //   }
  // },
  {
    path: 'subject',
    name: 'subject',
    component: () => import(/* webpackChunkName: "pool" */ '@/views/monitoring-elements/subject/index.vue'),
    meta: {
      title: 'menuRegion',
    }
  },
  {
    path: 'point',
    name: 'point',
    component: () => import(/* webpackChunkName: "pool" */ '@/views/monitoring-elements/point/index.vue'),
    meta: {
      title: '监测点管理'
    }
  },
  {
    path: 'point/basic-info',
    name: 'pointBasicInfo',
    component: () => import(/* webpackChunkName: "pool" */ '@/views/monitoring-elements/point/basic-info/index.vue'),
    meta: {
      title: '监测点位基本信息',
      hiddenMenu: true,
      showBack: true,
    }
  },
  {
    path: 'monitoring-config/point/access',
    name: 'pointMonitorAccess',
    component: () => import(/* webpackChunkName: "pool" */ '@/views/monitoring-elements/point/access/index.vue'),
    meta: {
      title: '配置报警接入数据',
      hiddenMenu: true,
      showBack: true,
    }
  },
  {
    path: 'warning-config/point/access',
    name: 'pointWarningAccess',
    component: () => import(/* webpackChunkName: "pool" */ '@/views/monitoring-elements/point/access/index.vue'),
    meta: {
      title: '配置预警接入数据',
      hiddenMenu: true,
      showBack: true,
    }
  },
  {
    path: 'monitoring-config/point/strategy',
    name: 'pointMonitorStrategy',
    component: () => import(/* webpackChunkName: "pool" */ '@/views/monitoring-elements/point/strategy/monitor/index.vue'),
    meta: {
      title: '配置报警策略',
      hiddenMenu: true,
      showBack: true,
    }
  },
  {
    path: 'warning-config/point/strategy',
    name: 'pointWarningStrategy',
    component: () => import(/* webpackChunkName: "pool" */ '@/views/monitoring-elements/point/strategy/warning/index.vue'),
    meta: {
      title: '配置预警策略',
      hiddenMenu: true,
      showBack: true,
    }
  },
  {
    path: '/point/setting',
    name: 'pointSetting',
    component: () => import(/* webpackChunkName: "pool" */ '@/views/monitoring-elements/point/setting/index.vue'),
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
    component: () => import(/* webpackChunkName: "pool" */ '@/views/monitoring-elements/point/setting/index.vue'),
    meta: {
      title: '监测点详情',
      hiddenMenu: true,
      showBack: true,
    }
  },
  {
    path: 'equipment',
    name: 'equipment',
    component: () => import(/* webpackChunkName: "pool" */ '@/views/monitoring-elements/equipment/index.vue'),
    meta: {
      title: '监测设备管理',
      keepAlive: true
    }
  },
  {
    path: 'infrastructure',
    name: 'infrastructure',
    component: () => import(/* webpackChunkName: "pool" */ '@/views/monitoring-elements/infrastructure/index.vue'),
    meta: {
      title: '基础设施管理',
      keepAlive: true
    },
    beforeEnter(to, from, next) {
      if (from.name === 'infrastructureDetail' || from.name === 'infrastructureForm') {
        to.query.typeCode = from.query.typeCode;
      }
      next();
    }
  },
  {
    path: 'infrastructure/form',
    name: 'infrastructureForm',
    component: () => import(/* webpackChunkName: "pool" */ '@/views/monitoring-elements/infrastructure/basic-form.vue'),
    meta: {
      title: '基础设施表单',
      hiddenMenu: true,
      showBack: true,
      isGotoKeepAlive: true
    }
  }
];

export default routes;
