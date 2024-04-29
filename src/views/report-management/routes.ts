import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  // 参数管理
  {
    path: 'parameter',
    name: 'reportManagementParameter',
    component: () => import('@/views/report-management/parameter/index.vue'),
    meta: {
      title: '参数管理'
    }
  },
  // 模板管理
  {
    path: 'tpl',
    name: 'reportManagementTpl',
    component: () => import('@/views/report-management/tpl/index.vue'),
    meta: {
      title: '模板管理'
    }
  },
  {
    path: 'tplConfig',
    name: 'reportManagementConfig',
    component: () => import('@/views/report-management/tpl/components/add.vue'),
    meta: {
      title: '<%= action === "edit" ? "编辑" : (action === "add" ? "新增" : "") %>模板管理',
      hiddenMenu: true,
      showBack: true,
    }
  },
  // 报告任务管理
  {
    path: 'task',
    name: 'reportManagementTask',
    component: () => import('@/views/report-management/task/index.vue'),
    meta: {
      title: '报告任务管理'
    }
  },
  // 报告任务新增
  {
    path: 'taskConfig',
    name: 'reportManagementTaskConfig',
    component: () => import('@/views/report-management/task/components/add.vue'),
    meta: {
      title: '<%= action === "edit" ? "编辑" : (action === "add" ? "新增" : "") %>任务管理',
      hiddenMenu: true,
      showBack: true,
    }
  },
  // 历史报告
  {
    path: 'history-report',
    name: 'reportManagementHistoryReport',
    component: () => import('@/views/report-management/history-report/index.vue'),
    meta: {
      title: '历史报告'
    }
  },
];

export default routes;
