import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  // 风险分类配置
  {
    path: 'event-type',
    name: 'eventTypeConfig',
    component: () => import('@/views/monitoring-config/event-type/index.vue'),
    meta: {
      title: 'menuWarningType'
    }
  },
  // {
  //   path: 'event-type2',
  //   name: 'eventTypeConfig2',
  //   component: () => import('@/views/monitoring-config/event-type/index.vue'),
  //   meta: {
  //     title: 'menuWarningType'
  //   }
  // },
  // 预警策略模板
  {
    path: 'alarm-strategy-tpl',
    name: 'alarmStrategyTpl',
    component: () => import('@/views/monitoring-config/alarm-strategy-tpl/index.vue'),
    meta: {
      title: '预警策略模板'
    }
  },
  // 配置预警策略
  {
    path: 'alarm-strategy-config',
    name: 'alarmStrategyConfig',
    component: () => import('@/views/monitoring-config/alarm-strategy-config/index.vue'),
    meta: {
      title: '预警策略配置'
    }
  },
  // 周期策略 新增编辑
  {
    path: 'alarm-strategy',
    name: 'alarmStrategy',
    component: () => import('@/views/monitoring-config/alarm-strategy-config/alarm-strategy.vue'),
    meta: {
      title: '<%= action === "edit" ? "编辑" : (action === "add" ? "新增" : "") %>周期/触发策略',
      hiddenMenu: true,
      showBack: true
    }
  },
  // 周期策略详情
  {
    path: 'details',
    name: 'monitoringConfigDetails',
    component: () => import('@/views/monitoring-config/details/index.vue'),
    meta: {
      // title: '周期策略详情',
      title: '<%= action === "cycle" ? "周期" : "触发" %>策略详情',
      hiddenMenu: true,
      showBack: true,
      isGotoKeepAlive: true
    }
  },
  // 配置高级预警策略 新增编辑
  {
    path: 'advanced-strategy',
    name: 'advancedStrategy',
    component: () => import('@/views/monitoring-config/advanced-strategy-config/index.vue'),
    meta: {
      title: '<%= action === "edit" ? "编辑" : (action === "add" ? "新增" : "") %>高级预警策略',
      hiddenMenu: true,
      showBack: true
    }
  },
  // 配置高级预警策略 详情
  {
    path: 'advanced-trigger-detail',
    name: 'advancedTriggerDetail',
    component: () => import('@/views/monitoring-config/advanced-strategy-config/details/index.vue'),
    meta: {
      title: '高级预警策略详情',
      hiddenMenu: true,
      showBack: true
    }
  },
  // 配置数据触发策略 新增编辑
  {
    path: 'data-trigger-config',
    name: 'dataTriggerConfig',
    component: () => import('@/views/monitoring-config/data-trigger-config/index.vue'),
    meta: {
      title: '<%= action === "edit" ? "编辑" : (action === "add" ? "新增" : "") %>数据触发策略',
      hiddenMenu: true,
      showBack: true
    }
  },
  // 配置数据触发策略 详情
  {
    path: 'data-trigger-detail',
    name: 'dataTriggerDetail',
    component: () => import('@/views/monitoring-config/data-trigger-config/details/index.vue'),
    meta: {
      title: '数据触发策略详情',
      hiddenMenu: true,
      showBack: true
    }
  },
  // 配置二次预警策略 新增编辑
  {
    path: 'second-trigger-config',
    name: 'secondTriggerConfig',
    component: () => import('@/views/monitoring-config/second-trigger-config/index.vue'),
    meta: {
      title: '<%= action === "edit" ? "编辑" : (action === "add" ? "新增" : "") %>二次预警策略',
      hiddenMenu: true,
      showBack: true
    }
  },
  // 配置二次预警策略 详情
  {
    path: 'second-trigger-detail',
    name: 'secondTriggerDetail',
    component: () => import('@/views/monitoring-config/second-trigger-config/details/index.vue'),
    meta: {
      title: '二次预警策略详情',
      hiddenMenu: true,
      showBack: true
    }
  },
  // 配置监测点策略
  // {
  //   path: 'unit-alarm-strategy',
  //   name: 'unitAlarmStrategyList',
  //   component: () => import('@/views/monitoring-config/unit-alarm-strategy/index.vue'),
  //   meta: {
  //     title: '监测点预警策略'
  //   }
  // },
  // 配置监测点策略 编辑
  {
    path: 'unit-alarm-strategy-config',
    name: 'unitAlarmStrategy',
    component: () => import('@/views/monitoring-config/unit-alarm-strategy/unit-strategy.vue'),
    meta: {
      title: '<%= action === "edit" ? "编辑" : (action === "add" ? "新增" : "") %>监测点预警策略',
      subTitle: '<%= action === "edit" ? "(说明：修改后将生成新的预警策略)" : "" %>',
      hiddenMenu: true,
      showBack: true
    }
  },
  // 警后策略配置
  // {
  //   path: 'strategy-rule',
  //   name: 'strategyRuleConfig',
  //   component: () => import('@/views/monitoring-config/strategy-rule/index.vue'),
  //   meta: {
  //     title: '警后策略配置'
  //   }
  // }
];

export default routes;
