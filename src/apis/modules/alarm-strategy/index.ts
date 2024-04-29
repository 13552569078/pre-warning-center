import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetFindMonitorStrategyPageSpace,IgetFindMonitorStrategyRelatedConfigSpace,IgetListMonitorStrategyUnitVOsSpace,IgetFindMonitorUnitStrategySpace,IpostRemoveMonitorStrategySpace,IgetFindMonitorUnitStrategyPageSpace,IpostModifyMonitorStrategySpace,IgetFindMonitorStrategySpace,IpostModifyMonitorStrategyUnitSpace,IpostModifyMonitorStrategyToTemplateSpace,IpostModifyMonitorStrategyStateSpace,IpostAddMonitorStrategySpace,IpostAddMonitorUnitStrategySpace, IgetFindstrategyNameVerifySpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class MonitorStrategyApi {
  data2Mock: boolean = false;

  // 报警策略列表(分页)|报警策略列表(分页)-MonitorStrategyController
  getFindMonitorStrategyPage(param:any) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/findMonitorStrategyPage?${param}`;
      return requestHelper.getRequestData<IgetFindMonitorStrategyPageSpace.Model>(url, 'c3842752-579c-4352-9e47-67923b8662b7', this.data2Mock);
  }
  // 监测/预警中枢查看策略配置是否可以进行配置|监测/预警中枢查看策略配置是否可以进行配置-MonitorStrategyController
  getFindMonitorStrategyRelatedConfig() {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/findMonitorStrategyRelatedConfig`;
      return requestHelper.getRequestData<IgetFindMonitorStrategyRelatedConfigSpace.Model>(url, 'faff72c9-278f-47bb-b3ea-40145daf1135', this.data2Mock);
  }
  // 查询策略关联的监测点列表,无分页|查询策略关联的监测点列表,无分页-MonitorStrategyController
  getListMonitorStrategyUnitVOs(param:any) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/findMonitorStrategyUnitVOPage?${param}`;
      return requestHelper.getRequestData<IgetListMonitorStrategyUnitVOsSpace.Model>(url, '43a7f692-e20c-4add-8979-c3b0e33d92ac', this.data2Mock);
  }
  // 监测点关联策略详情信息|监测点关联策略详情信息-MonitorStrategyController
  getFindMonitorUnitStrategy(param:any) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/findMonitorUnitStrategy?${param}`;
      return requestHelper.getRequestData<IgetFindMonitorUnitStrategySpace.Model>(url, '4511f4c8-547a-49b4-8baf-5ef2c78651e6', this.data2Mock);
  }
  // 删除策略|删除策略-MonitorStrategyController
  postRemoveMonitorStrategy(monitorStrategyId:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/removeMonitorStrategy?monitorStrategyId=${monitorStrategyId}`;
      return requestHelper.postRequestData<IpostRemoveMonitorStrategySpace.Model>(url, '6f0a069d-ac15-4b54-b8a9-28044331b944', this.data2Mock, {monitorStrategyId});
  }
  // 根据监测点的报警策略列表(分页)|根据监测点的报警策略列表(分页)-MonitorStrategyController
  getFindMonitorUnitStrategyPage(param:any) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/findMonitorUnitStrategyPage?${param}`;
      return requestHelper.getRequestData<IgetFindMonitorUnitStrategyPageSpace.Model>(url, 'fa6204cb-f3de-4e4d-920d-e0adafa2fe4b', this.data2Mock);
  }
  // 修改监测策略|修改监测策略-MonitorStrategyController
  postModifyMonitorStrategy(params: IpostModifyMonitorStrategySpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/modifyMonitorStrategy`;
      return requestHelper.postRequestData<IpostModifyMonitorStrategySpace.Model>(url, '1b76b5b7-7461-44f5-9f48-c622f9e15d1f', this.data2Mock, params);
  }
  // 策略详情|策略详情-MonitorStrategyController
  getFindMonitorStrategy(monitorStrategyId:any) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/findMonitorStrategy?monitorStrategyId=${monitorStrategyId}`;
      return requestHelper.getRequestData<IgetFindMonitorStrategySpace.Model>(url, '543e505b-5974-43c5-ab0a-68da73d11312', this.data2Mock);
  }
  // 修改策略关联的监测点|修改策略关联的监测点-MonitorStrategyController
  postModifyMonitorStrategyUnit(monitorStrategyId:any,monitorUnitIds:any[], unitFrequencyParams:any[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/modifyMonitorStrategyUnit`;
      return requestHelper.postRequestData<IpostModifyMonitorStrategyUnitSpace.Model>(url, 'c4177e27-c13e-4da1-b996-8e472b33d6f4', this.data2Mock, {monitorStrategyId,monitorUnitIds, unitFrequencyParams});
  }
  // 根据监测策略另存为策略模板|根据监测策略另存为策略模板-MonitorStrategyController
  postModifyMonitorStrategyToTemplate(params:any) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/modifyMonitorStrategyToTemplate`;
      return requestHelper.postRequestData<IpostModifyMonitorStrategyToTemplateSpace.Model>(url, '7d6f4052-f1f3-4119-be97-666bc2fb98a3', this.data2Mock, params);
  }
  // 启用/停用策略|启用/停用策略-MonitorStrategyController
  postModifyMonitorStrategyState(unitStrategyStateParams:any[],strategyState:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/modifyMonitorStrategyState`;
      return requestHelper.postRequestData<IpostModifyMonitorStrategyStateSpace.Model>(url, '6763aca6-12ea-4ed1-b5b3-4c8eba1d9176', this.data2Mock, {unitStrategyStateParams,strategyState});
  }
  // 新增监测策略|新增监测策略-MonitorStrategyController
  postAddMonitorStrategy(params: IpostAddMonitorStrategySpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/addMonitorStrategy`;
      return requestHelper.postRequestData<IpostAddMonitorStrategySpace.Model>(url, '5579da76-00f9-4cc2-b72e-37eb5f695e96', this.data2Mock, params);
  }
  // 保存监测点策略(创建新的策略)|保存监测点策略(创建新的策略)-MonitorStrategyController
  postAddMonitorUnitStrategy(params: IpostAddMonitorUnitStrategySpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/addMonitorUnitStrategy`;
      return requestHelper.postRequestData<IpostAddMonitorUnitStrategySpace.Model>(url, '23716428-6d7c-4ead-9265-084c629dee59', this.data2Mock, params);
  }
  // 策略名称验重接口
  getFindstrategyNameVerify(strategyName:string,strategyId?:number) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/findStrategyName?strategyName=${strategyName}&strategyId=${strategyId}`;
    return requestHelper.getRequestData<IgetFindstrategyNameVerifySpace.Model>(url, '4da11597-7280-4475-976f-be31c3577b9a', this.data2Mock);
  }

  Run(methodName: string, params: any) {
    let result:any = new Promise(() => ({ data: {} }));
    switch (methodName) {

    case "getFindMonitorStrategyPage":
      {
        const { param } = params;
        result = this.getFindMonitorStrategyPage(param);
      }
      break;

    case "getFindMonitorStrategyRelatedConfig":
      {
        result = this.getFindMonitorStrategyRelatedConfig();
      }
      break;

    case "getListMonitorStrategyUnitVOs":
      {
        const { param } = params;
        result = this.getListMonitorStrategyUnitVOs(param);
      }
      break;

    case "getFindMonitorUnitStrategy":
      {
        const { param } = params;
        result = this.getFindMonitorUnitStrategy(param);
      }
      break;

    case "postRemoveMonitorStrategy":
      {
        const { monitorStrategyId } = params;
        result = this.postRemoveMonitorStrategy(monitorStrategyId);
      }
      break;

    case "getFindMonitorUnitStrategyPage":
      {
        const { param } = params;
        result = this.getFindMonitorUnitStrategyPage(param);
      }
      break;

    case "postModifyMonitorStrategy":
      result = this.postModifyMonitorStrategy(params as IpostModifyMonitorStrategySpace.RequestParams);
      break;

    case "getFindMonitorStrategy":
      {
        const { monitorStrategyId } = params;
        result = this.getFindMonitorStrategy(monitorStrategyId);
      }
      break;

    case "postModifyMonitorStrategyUnit":
      {
        const { monitorStrategyId,monitorUnitIds, unitFrequencyParams } = params;
        result = this.postModifyMonitorStrategyUnit(monitorStrategyId,monitorUnitIds, unitFrequencyParams);
      }
      break;

    case "postModifyMonitorStrategyToTemplate":
      {
        const { monitorStrategyId } = params;
        result = this.postModifyMonitorStrategyToTemplate(monitorStrategyId);
      }
      break;

    case "postModifyMonitorStrategyState":
      {
        const { unitStrategyStateParams,strategyState } = params;
        result = this.postModifyMonitorStrategyState(unitStrategyStateParams,strategyState);
      }
      break;

    case "postAddMonitorStrategy":
      result = this.postAddMonitorStrategy(params as IpostAddMonitorStrategySpace.RequestParams);
      break;

    case "postAddMonitorUnitStrategy":
      result = this.postAddMonitorUnitStrategy(params as IpostAddMonitorUnitStrategySpace.RequestParams);
      break;
    
    case "getFindstrategyNameVerify":
      {
        const { param } = params;
        result = this.getFindstrategyNameVerify(param);
      }
      break;

      default:
        break;
    }
    return result;
  }
}
export const apiMonitorStrategyObj = new MonitorStrategyApi();
