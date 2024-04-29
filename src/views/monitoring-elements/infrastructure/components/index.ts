// 左侧-切换专项基础设施类型
import LeftTree from './tree.vue';
/***
 * 列表页面
 * code对照：
 * SZSSLX_RQ 燃气类  ｜ SZSSLX_GS 供水类    ｜ SZSSLX_PS 排水类
 * SZSSLX_GR 供热类  ｜ SZSSLX_GL 管廊类    ｜ SZSSLX_HW 环卫设施类
 * SZSSLX_DL 道路类  ｜ FWSSLX_DT 房屋设施类 ｜ JTSSLX_QL 桥梁类
 * JTSSLX_SD 隧道设施 | JZGD_DL   建筑工地   | SZSSLX_ZM 照明设施
 * RYMJCS_DL 人员密集场所 | SSLX_QT 其他类
 */
//  燃气类
import SZSSLX_RQ from './SZSSLX_RQ/index.vue';
import SZSSLX_RQ_FORM from './SZSSLX_RQ/form.vue';
// 供水类
import SZSSLX_GS from './SZSSLX_GS/index.vue';
import SZSSLX_GS_FORM from './SZSSLX_GS/form.vue';
// 排水类
import SZSSLX_PS from './SZSSLX_PS/index.vue';
import SZSSLX_PS_FORM from './SZSSLX_PS/form.vue';
// 供热类
import SZSSLX_GR from './SZSSLX_GR/index.vue';
import SZSSLX_GR_FORM from './SZSSLX_GR/form.vue';
// 管廊类
import SZSSLX_GL from './SZSSLX_GL/index.vue';
import SZSSLX_GL_FORM from './SZSSLX_GL/form.vue';
// 环卫设施类
import SZSSLX_HW from './SZSSLX_HW/index.vue';
import SZSSLX_HW_FORM from './SZSSLX_HW/form.vue';
// 道路类
import SZSSLX_DL from './SZSSLX_DL/index.vue';
import SZSSLX_DL_FORM from './SZSSLX_DL/form.vue';
// 房屋设施类
import FWSSLX_DT from './FWSSLX_DT/index.vue';
import FWSSLX_DT_FORM from './FWSSLX_DT/form.vue';
// 桥梁类
import JTSSLX_QL from './JTSSLX_QL/index.vue';
import JTSSLX_QL_FORM from './JTSSLX_QL/form.vue';
// 隧道设施
import JTSSLX_SD from './JTSSLX_SD/index.vue';
import JTSSLX_SD_FORM from './JTSSLX_SD/form.vue';
// 建筑工地
import JZGD_DL from './JZGD_DL/index.vue';
import JZGD_DL_FORM from './JZGD_DL/form.vue';
// 照明设施
import SZSSLX_ZM from './SZSSLX_ZM/index.vue';
import SZSSLX_ZM_FORM from './SZSSLX_ZM/form.vue';
// 人员密集场所
import RYMJCS_DL from './RYMJCS_DL/index.vue';
import RYMJCS_DL_FORM from './RYMJCS_DL/form.vue';

export {
  SZSSLX_RQ,
  SZSSLX_RQ_FORM,
  SZSSLX_GS,
  SZSSLX_GS_FORM,
  SZSSLX_PS,
  SZSSLX_PS_FORM,
  SZSSLX_GR,
  SZSSLX_GR_FORM,
  SZSSLX_GL,
  SZSSLX_GL_FORM,
  SZSSLX_HW,
  SZSSLX_HW_FORM,
  SZSSLX_DL,
  SZSSLX_DL_FORM,
  FWSSLX_DT,
  FWSSLX_DT_FORM,
  JTSSLX_QL,
  JTSSLX_QL_FORM,
  JTSSLX_SD,
  JTSSLX_SD_FORM,
  JZGD_DL,
  JZGD_DL_FORM,
  SZSSLX_ZM,
  SZSSLX_ZM_FORM,
  RYMJCS_DL,
  RYMJCS_DL_FORM,
  LeftTree
};
