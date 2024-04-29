import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetListMonitorUnitOutEntityTagVOsMonitorUnitSpace,IgetListMonitorUnitsMonitorUnitSpace,IpostModifyMonitorUnitFactorMonitorUnitSpace,IgetFindMonitorUnitPageMonitorUnitSpace,IgetFindMonitorUnitMonitorUnitSpace,IgetListMonitorUnitFactorsMonitorUnitSpace,IpostModifyMonitorUnitMonitorUnitSpace,IgetListMonitorUnitRelationVOsMonitorUnitSpace,IpostRemoveMonitorUnitMonitorUnitSpace,IpostModifyMonitorUnitOutEntityTagMonitorUnitSpace,IpostAddMonitorUnitMonitorUnitSpace, IgetFindUnitNameMonitorUnitSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class MonitorUnitApi {
  data2Mock: boolean = false;

  // 监测点维护标签list|监测点维护标签list-MonitorUnitController
  getFindUnitNameMonitorUnit(name:string, id: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/findUnitName?unitName=${encodeURIComponent(name)}&unitId=${id || ''}`;
    return requestHelper.getRequestData<IgetFindUnitNameMonitorUnitSpace.Model>(url, 'be6e722d-2362-437b-9baa-8ece566ff2ae', this.data2Mock);
  }
  // 监测点维护标签list|监测点维护标签list-MonitorUnitController
  getListMonitorUnitOutEntityTagVOsMonitorUnit(monitorUnitId:any) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/listMonitorUnitOutEntityTagVOs?monitorUnitId=${monitorUnitId}`;
      return requestHelper.getRequestData<IgetListMonitorUnitOutEntityTagVOsMonitorUnitSpace.Model>(url, 'be6e722d-2362-437b-9baa-8ece566ff2ae', this.data2Mock);
  }
  // 根据监测点查询关联的监测点|根据监测点查询关联的监测点-MonitorUnitController
  getListMonitorUnitsMonitorUnit(monitorUnitId:any) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/listMonitorUnits?monitorUnitId=${monitorUnitId}`;
      return requestHelper.getRequestData<IgetListMonitorUnitsMonitorUnitSpace.Model>(url, '6f1dcd9e-67f1-40fe-b8ff-97faf3394950', this.data2Mock);
  }
  // 修改监测点监测因子|修改监测点监测因子-MonitorUnitController
  postModifyMonitorUnitFactorMonitorUnit(monitorUnitId:any, outEntityTagParams: any[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/modifyMonitorUnitFactor`;
      return requestHelper.postRequestData<IpostModifyMonitorUnitFactorMonitorUnitSpace.Model>(url, 'e9f4eda3-260c-461f-853e-b3d09ccdde96', this.data2Mock, {outEntityTagParams, monitorUnitId});
  }
  // 监测点列表(分页)|监测点列表(分页)-MonitorUnitController
  getFindMonitorUnitPageMonitorUnit(param:any) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/findMonitorUnitPage?${param}`;
      return requestHelper.getRequestData<IgetFindMonitorUnitPageMonitorUnitSpace.Model>(url, '2ee0c96f-ea4b-4d1b-8114-3fb9f55f26b7', this.data2Mock);
  }
  // 监测点详情|监测点详情-MonitorUnitController
  getFindMonitorUnitMonitorUnit(monitorUnitId:any) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/findMonitorUnit?monitorUnitId=${monitorUnitId}`;
      return requestHelper.getRequestData<IgetFindMonitorUnitMonitorUnitSpace.Model>(url, '2053ff0d-1a18-4b09-b869-5ff0ea6564da', this.data2Mock);
  }
  // 监测点监测因子信息|监测点监测因子信息-MonitorUnitController
  getListMonitorUnitFactorsMonitorUnit(monitorUnitId:any) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/listMonitorUnitFactors?monitorUnitId=${monitorUnitId}`;
      return requestHelper.getRequestData<IgetListMonitorUnitFactorsMonitorUnitSpace.Model>(url, 'e68f273f-9164-4da9-b3ba-fc9d053d6ede', this.data2Mock);
  }
  // 修改监测点(基础监测点、综合监测点)|修改监测点(基础监测点、综合监测点)-MonitorUnitController
  postModifyMonitorUnitMonitorUnit(params: IpostModifyMonitorUnitMonitorUnitSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/modifyMonitorUnit`;
      return requestHelper.postRequestData<IpostModifyMonitorUnitMonitorUnitSpace.Model>(url, 'd0f0ae79-cbf1-4fc0-a133-082cb0d58cc5', this.data2Mock, params);
  }
  // 监测点list|监测点list-MonitorUnitController
  getListMonitorUnitRelationVOsMonitorUnit(param?:any) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/listMonitorUnitRelationVOs?${param ?? ''}`;
      return requestHelper.getRequestData<IgetListMonitorUnitRelationVOsMonitorUnitSpace.Model>(url, 'b00c6983-786c-4e99-a874-63ba0901cb11', this.data2Mock);
  }
  // 删除监测点|删除监测点-MonitorUnitController
  postRemoveMonitorUnitMonitorUnit(monitorUnitId:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/removeMonitorUnit?monitorUnitId=${monitorUnitId}`;
      return requestHelper.postRequestData<IpostRemoveMonitorUnitMonitorUnitSpace.Model>(url, '4e1f28fe-b894-4414-b28a-73b8120d5145', this.data2Mock, {monitorUnitId});
  }
  // 修改监测点关联标签|修改监测点关联标签-MonitorUnitController
  postModifyMonitorUnitOutEntityTagMonitorUnit(monitorUnitId:number,outEntityTagParams:any[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/modifyMonitorUnitOutEntityTag`;
      return requestHelper.postRequestData<IpostModifyMonitorUnitOutEntityTagMonitorUnitSpace.Model>(url, 'c2ddeb67-9c18-4b96-9bf1-b71f11bfbd64', this.data2Mock, {monitorUnitId,outEntityTagParams});
  }
  // 新增监测点(基础监测点、综合监测点)|新增监测点(基础监测点、综合监测点)-MonitorUnitController
  postAddMonitorUnitMonitorUnit(params: IpostAddMonitorUnitMonitorUnitSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/addMonitorUnit`;
      return requestHelper.postRequestData<IpostAddMonitorUnitMonitorUnitSpace.Model>(url, '03370b24-2822-4249-9031-b30342798b63', this.data2Mock, params);
  }

  Run(methodName: string, params: any) {
    let result:any = new Promise(() => ({ data: {} }));
    switch (methodName) {

    case "getListMonitorUnitOutEntityTagVOsMonitorUnit":
      {
        const { monitorUnitId } = params;
        result = this.getListMonitorUnitOutEntityTagVOsMonitorUnit(monitorUnitId);
      }
      break;

    case "getListMonitorUnitsMonitorUnit":
      {
        const { monitorUnitId } = params;
        result = this.getListMonitorUnitsMonitorUnit(monitorUnitId);
      }
      break;

    case "postModifyMonitorUnitFactorMonitorUnit":
      {
        const { monitorUnitId, outEntityTagParams } = params;
        result = this.postModifyMonitorUnitFactorMonitorUnit(monitorUnitId, outEntityTagParams);
      }
      break;

    case "getFindMonitorUnitPageMonitorUnit":
      {
        const { param } = params;
        result = this.getFindMonitorUnitPageMonitorUnit(param);
      }
      break;

    case "getFindMonitorUnitMonitorUnit":
      {
        const { monitorUnitId } = params;
        result = this.getFindMonitorUnitMonitorUnit(monitorUnitId);
      }
      break;

    case "getListMonitorUnitFactorsMonitorUnit":
      {
        const { monitorUnitId } = params;
        result = this.getListMonitorUnitFactorsMonitorUnit(monitorUnitId);
      }
      break;

    case "postModifyMonitorUnitMonitorUnit":
      result = this.postModifyMonitorUnitMonitorUnit(params as IpostModifyMonitorUnitMonitorUnitSpace.RequestParams);
      break;

    case "getListMonitorUnitRelationVOsMonitorUnit":
      {
        const { param } = params;
        result = this.getListMonitorUnitRelationVOsMonitorUnit(param);
      }
      break;

    case "postRemoveMonitorUnitMonitorUnit":
      {
        const { monitorUnitId } = params;
        result = this.postRemoveMonitorUnitMonitorUnit(monitorUnitId);
      }
      break;

    case "postModifyMonitorUnitOutEntityTagMonitorUnit":
      {
        const { monitorUnitId,outEntityTagParams } = params;
        result = this.postModifyMonitorUnitOutEntityTagMonitorUnit(monitorUnitId,outEntityTagParams);
      }
      break;

    case "postAddMonitorUnitMonitorUnit":
      result = this.postAddMonitorUnitMonitorUnit(params as IpostAddMonitorUnitMonitorUnitSpace.RequestParams);
      break;

      default:
        break;
    }
    return result;
  }
}
export const apiMonitorUnitObj = new MonitorUnitApi();
