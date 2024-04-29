import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  // 指标综合分析
  {
    path: 'target-analysis',
    name: 'TargetAnalysis',
    component: () => import('@/views/whole-analysis/target-analysis/index.vue'),
    meta: {
      title: '指标综合分析'
    }
  },
  // 预警高发分析
  {
    path: 'high-incidence',
    name: 'HighIncidence',
    component: () => import('@/views/whole-analysis/high-incidence/index.vue'),
    meta: {
      title: '预警高发分析'
    }
  },
  // 预警综合分析
  {
    path: 'warning-composite-analysis',
    name: 'WarningCompositeAnalysis',
    component: () => import('@/views/whole-analysis/warning-composite-analysis/index.vue'),
    meta: {
      title: '预警综合分析'
    }
  },
  // 报警高发分析
  {
    path: 'alarm-high-incidence',
    name: 'AlarmHighIncidence',
    component: () => import('@/views/whole-analysis/alarm-high-incidence/index.vue'),
    meta: {
      title: '报警高发分析'
    }
  },
  // 报警综合分析
  {
    path: 'alarm-composite-analysis',
    name: 'AlarmCompositeAnalysis',
    component: () => import('@/views/whole-analysis/alarm-composite-analysis/index.vue'),
    meta: {
      title: '报警综合分析'
    }
  },
  // 数据质量分析
  {
    path: 'data-quality-incidence',
    name: 'DataQualityIncidence',
    component: () => import('@/views/whole-analysis/data-quality-incidence/index.vue'),
    meta: {
      title: '数据质量分析'
    }
  },
  // 联网质量分析
  {
    path: 'network-quality-incidence',
    name: 'NetworkQualityIncidence',
    component: () => import('@/views/whole-analysis/network-quality-incidence/index.vue'),
    meta: {
      title: '联网质量分析'
    }
  }
];

export default routes;
