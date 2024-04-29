import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  // 报警策略模板
  {
    path: 'alarm-strategy-tpl',
    name: 'ygfAlarmStrategyTpl',
    component: () => import('@/views/alarm-config/alarm-strategy-tpl/index.vue'),
    meta: {
      title: '报警策略模板'
    }
  },
  // 配置报警策略列表
  {
    path: 'alarm-strategy-config',
    name: 'ygfAlarmStrategyConfig',
    component: () => import('@/views/alarm-config/alarm-strategy-config/index.vue'),
    meta: {
      title: '报警策略配置'
    }
  },
  // 配置监测点策略
  {
    path: 'unit-alarm-strategy',
    name: 'ygfUnitAlarmStrategyList',
    component: () => import('@/views/alarm-config/unit-alarm-strategy/index.vue'),
    meta: {
      title: '监测点报警策略'
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
];

export default routes;
