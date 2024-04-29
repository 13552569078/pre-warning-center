import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetFindMonitorFactorPageMonitorFactorSpace, IpostRemoveMonitorFactorMonitorFactorSpace, IgetFindMonitorFactorMonitorFactorSpace, IpostAddMonitorFactorMonitorFactorSpace, IpostModifyMonitorFactorMonitorFactorSpace, IgetFindFactorNameVerifySpace, IgetFindFactorCodeVerifySpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class MonitorFactorApi {
  data2Mock: boolean = false;

  // 查询监测因子列表|查询监测因子列表-MonitorFactorController
  getFindMonitorFactorPageMonitorFactor (params: any) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorFactor/findMonitorFactorPage?${params}`;
    return requestHelper.getRequestData<IgetFindMonitorFactorPageMonitorFactorSpace.Model>(url, '89dd650e-0898-4a74-a48d-5144ed6a51eb', this.data2Mock);
  }
  // 删除监测因子|删除监测因子-MonitorFactorController
  postRemoveMonitorFactorMonitorFactor (factorId: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorFactor/removeMonitorFactor?factorId=${factorId}`;
    return requestHelper.postRequestData<IpostRemoveMonitorFactorMonitorFactorSpace.Model>(url, '63cd1543-275c-4556-a110-610740925506', this.data2Mock, { factorId });
  }
  // 查询监测因子详情|查询监测因子详情-MonitorFactorController
  getFindMonitorFactorMonitorFactor (factorId: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorFactor/findMonitorFactor?factorId=${factorId}`;
    return requestHelper.getRequestData<IgetFindMonitorFactorMonitorFactorSpace.Model>(url, '83ec879d-57ce-4d19-99c4-e8f88f687e80', this.data2Mock);
  }
  // 添加监测因子|添加监测因子-MonitorFactorController
  postAddMonitorFactorMonitorFactor (params: IpostAddMonitorFactorMonitorFactorSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorFactor/addMonitorFactor`;
    return requestHelper.postRequestData<IpostAddMonitorFactorMonitorFactorSpace.Model>(url, 'c70e485d-c909-4dd7-8615-97259dc7e351', this.data2Mock, params);
  }
  // 修改监测因子|修改监测因子-MonitorFactorController
  postModifyMonitorFactorMonitorFactor (params: IpostModifyMonitorFactorMonitorFactorSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorFactor/modifyMonitorFactor`;
    return requestHelper.postRequestData<IpostModifyMonitorFactorMonitorFactorSpace.Model>(url, '763f2a75-7d2e-4f6a-b3c7-79c0b2592cf4', this.data2Mock, params);
  }
  // 监测因子编码验重|监测因子编码验重-MonitorFactorController
  getFindFactorCodeVerify(factorCode:string,factorId:number) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorFactor/findFactorCodeVerify?factorCode=${factorCode}&factorId=${factorId}`;
    return requestHelper.getRequestData<IgetFindFactorCodeVerifySpace.Model>(url, '9aa7c924-14e5-4848-851c-341feddc33fe', this.data2Mock);
}
  // 监测因子名称验重|监测因子名称验重-MonitorFactorController
  getFindFactorNameVerify(factorName:string,factorId:number) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorFactor/findFactorNameVerify?factorName=${factorName}&factorId=${factorId}`;
    return requestHelper.getRequestData<IgetFindFactorNameVerifySpace.Model>(url, '4da11597-7280-4475-976f-be31c3577b9a', this.data2Mock);
  }
}
export const apiMonitorFactorObj = new MonitorFactorApi();
