import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostAddMonitorTargetSpace,IgetFindMonitorTargetSpace,IpostRemoveMonitorTargetSpace,IgetListMonitorTargetsSpace,IgetFindMonitorTargetPageSpace,IpostModifyMonitorTargetSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class MonitorTargetApi {
  data2Mock: boolean = false;

  // 新增监测指标|新增监测指标-MonitorTargetController
  postAddMonitorTarget(params: IpostAddMonitorTargetSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorTarget/addMonitorTarget`;
      return requestHelper.postRequestData<IpostAddMonitorTargetSpace.Model>(url, 'd4e5694c-4f20-4d13-933b-c4a092e4dd93', this.data2Mock, params);
  }
  // 监测指标详情|监测指标详情-MonitorTargetController
  getFindMonitorTarget(monitorTargetId:any) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorTarget/findMonitorTarget?monitorTargetId=${monitorTargetId}`;
      return requestHelper.getRequestData<IgetFindMonitorTargetSpace.Model>(url, '9fb2b38e-e773-4bdd-9852-dbfdfe321bcf', this.data2Mock);
  }
  // 设备风险类型获取 监测因子
  getlistMonitorFactorVOs(param:any) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/listMonitorFactorVOs?${param}`;
    return requestHelper.getRequestData<IgetFindMonitorTargetSpace.Model>(url, '9fb2b38e-e773-4bdd-9852-dbfdfe321bcf', this.data2Mock);
}

  // 删除监测指标|删除监测指标-MonitorTargetController
  postRemoveMonitorTarget(monitorTargetId:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorTarget/removeMonitorTarget?monitorTargetId=${monitorTargetId}`;
      return requestHelper.postRequestData<IpostRemoveMonitorTargetSpace.Model>(url, 'f1ccfcb3-595b-4d28-ab9d-e139d5bb8cdd', this.data2Mock, {monitorTargetId});
  }
  // 指标列表(无分页)|指标列表(无分页)-MonitorTargetController
  getListMonitorTargets(param:any) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorTarget/listMonitorTargets?${param}`;
      return requestHelper.getRequestData<IgetListMonitorTargetsSpace.Model>(url, '9169a9ee-9f49-41cb-802b-e8ab431e2bc9', this.data2Mock);
  }
  // 监测指标列表(分页)|监测指标列表(分页)-MonitorTargetController
  getFindMonitorTargetPage(param:any) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorTarget/findMonitorTargetPage?${param}`;
      return requestHelper.getRequestData<IgetFindMonitorTargetPageSpace.Model>(url, '06f66c4e-e6c1-43d7-b609-be5d84dc3b3c', this.data2Mock);
  }
  // 修改监测指标|修改监测指标-MonitorTargetController
  postModifyMonitorTarget(params: IpostModifyMonitorTargetSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorTarget/modifyMonitorTarget`;
      return requestHelper.postRequestData<IpostModifyMonitorTargetSpace.Model>(url, 'a9ab9d4f-12ef-4dd0-8e82-9237e3a74481', this.data2Mock, params);
  }

  Run(methodName: string, params: any) {
    let result:any = new Promise(() => ({ data: {} }));
    switch (methodName) {

    case "postAddMonitorTarget":
      result = this.postAddMonitorTarget(params as IpostAddMonitorTargetSpace.RequestParams);
      break;

    case "getFindMonitorTarget":
      {
        const { monitorTargetId } = params;
        result = this.getFindMonitorTarget(monitorTargetId);
      }
      break;

    case "postRemoveMonitorTarget":
      {
        const { monitorTargetId } = params;
        result = this.postRemoveMonitorTarget(monitorTargetId);
      }
      break;

    case "getListMonitorTargets":
      {
        const { param } = params;
        result = this.getListMonitorTargets(param);
      }
      break;

    case "getFindMonitorTargetPage":
      {
        const { param } = params;
        result = this.getFindMonitorTargetPage(param);
      }
      break;

    case "postModifyMonitorTarget":
      result = this.postModifyMonitorTarget(params as IpostModifyMonitorTargetSpace.RequestParams);
      break;

      default:
        break;
    }
    return result;
  }
}
export const apiMonitorTargetObj = new MonitorTargetApi();
