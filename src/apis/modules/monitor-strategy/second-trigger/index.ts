import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostAddMonitorStrategySpace, IpostModifyMonitorStrategySpace, IgetFindMonitorStrategySpace, IgetFindMonitorStrategyVersionDetailSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class SecondTriggerApi {
  data2Mock: boolean = false;

   // 查询策略版本详情|查询策略版本详情-二次预警策略API
   getFindMonitorStrategyVersionDetail(versionId:string,strategyId:string) {
    const url = `${API_DOMAIN}${API_PREFIX}/secondWarningMonitorStrategy/findMonitorStrategyVersionDetail?versionId=${versionId}&strategyId=${strategyId}`;
    return requestHelper.getRequestData<IgetFindMonitorStrategyVersionDetailSpace.Model>(url, '74cc6504-dcb7-44cf-9594-3928fcd3ba81', this.data2Mock);
}
  // 策略详情|策略详情-二次预警策略API
  getFindMonitorStrategy(monitorStrategyId: number, userFor: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/secondWarningMonitorStrategy/findMonitorStrategy?monitorStrategyId=${monitorStrategyId}&userFor=${userFor}`;
    return requestHelper.getRequestData<IgetFindMonitorStrategySpace.Model>(url, '422f3020-db9f-4e13-8b8b-9a69a4932e78', this.data2Mock);
  }
  // 新增监测策略|新增监测策略-二次预警策略API
  postAddMonitorStrategy(params: IpostAddMonitorStrategySpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/secondWarningMonitorStrategy/addMonitorStrategy`;
    return requestHelper.postRequestData<IpostAddMonitorStrategySpace.Model>(url, '153c25e8-49c4-4a8c-a8a1-a65df0075788', this.data2Mock, params);
  }
  // 修改监测策略|修改监测策略-二次预警策略API
  postModifyMonitorStrategy(params: IpostModifyMonitorStrategySpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/secondWarningMonitorStrategy/modifyMonitorStrategy`;
    return requestHelper.postRequestData<IpostModifyMonitorStrategySpace.Model>(url, '8977848e-ebd2-4c3a-9205-663417349ca7', this.data2Mock, params);
  }
}
export const apiSecondTriggerObj = new SecondTriggerApi();
