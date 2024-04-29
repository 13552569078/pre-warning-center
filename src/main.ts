import { createApp } from 'vue';

import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// eslint-disable-next-line
import VueAMap, { initAMapApiLoader } from '@hongtu/amap-next/dist';
import App from './App.vue';
import router from './router/index';
import store from './store';
import hongtuCore from '@hongtu-next/core';
import * as hongtuUtil from '@hongtu-next/util';
import { registerDirective } from '@/directives';
import i18n from './i18n';
import './assets/styles/index.scss';
import '@hongtu/amap-next/dist/style.css';

import userAuth from '@/common/user-auth';

echarts.use([
  BarChart,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  CanvasRenderer,
  PieChart,
  LineChart
]);

const app = createApp(App);
app.config.globalProperties.$gisUtil = hongtuUtil;
app.config.globalProperties.$cityLifeLine = userAuth.cityLifeLine;

app.use(store);
app.use(router);
app.use(hongtuCore);
app.use(i18n);
app.use(VueAMap);
registerDirective(app);
app.mount('#app');
