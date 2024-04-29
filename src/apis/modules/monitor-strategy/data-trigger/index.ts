import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostAddMonitorStrategySpace,IpostFindMonitorUnitByRegionIdSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;


/**
 * 数据访问，此类代码生成器生成
 */
class DataTriggerConfigApi {
  data2Mock: boolean = false;

  // 新增监测策略|新增监测策略-策略API
  postAddMonitorStrategy(params: IpostAddMonitorStrategySpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/addMonitorStrategy`;
      return requestHelper.postRequestData<IpostAddMonitorStrategySpace.Model>(url, 'e8c0908e-6c13-48ab-b061-e2e07f9e930b', this.data2Mock, params);
  }

  // 监测点-根据监测主体查询监测点|监测点-根据监测主体查询监测点-MonitorUnitController
  postFindMonitorUnitByRegionId(regionIds:string[],targetId:string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/findMonitorUnitByRegionId`;
    return requestHelper.postRequestData<IpostFindMonitorUnitByRegionIdSpace.Model>(url, '0f837683-2043-4a83-bbf4-d859a07d09c2', this.data2Mock, {regionIds,targetId});
}
}
export const apiDataTriggerConfigObj = new DataTriggerConfigApi();
