import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetRegionMonitorUnitTreeSpace,IpostFindStrategyPageSpace,IpostFindUnitStrategyPageSpace,IgetTargetDataListSpace,IpostCheckIfNameExistSpace,IpostModifyStrategySpace,IpostModifyTemplateSpace,IgetFindStrategySpace,IpostRemoveMonitorStrategySpace,IpostAddStrategySpace, IgetListStrategyTemplatesSpace, IgetListTargetTreeSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;
/**
 * 数据访问，此类代码生成器生成
 */
class YgfWarningConfigApi {
  data2Mock: boolean = false;
  
  // 主体类型-主体-监测点树|主体类型-主体-监测点树-运管服报警策略及相关
  getRegionMonitorUnitTree() {
      const url = `${API_DOMAIN}${API_PREFIX}/ygf/regionMonitorUnitTree`;
      return requestHelper.getRequestData<IgetRegionMonitorUnitTreeSpace.Model>(url, '2d7820fb-b540-4a8c-ac1a-b2c35274481c', this.data2Mock);
  }
  // 报警策略列表(分页)|报警策略列表(分页)-运管服报警策略及相关
  postFindStrategyPage(params: IpostFindStrategyPageSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/ygf/findStrategyPage`;
      return requestHelper.postRequestData<IpostFindStrategyPageSpace.Model>(url, '331ed599-aa8f-473a-a1b3-ec5fcee4399b', this.data2Mock, params);
  }
   // 监测点报警策略列表(分页)|监测点报警策略列表(分页)-运管服报警策略及相关
   postFindUnitStrategyPage(params: IpostFindUnitStrategyPageSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/ygf/findUnitStrategyPage`;
    return requestHelper.postRequestData<IpostFindUnitStrategyPageSpace.Model>(url, 'b2cbac52-5229-4672-8a4a-ed12413e009e', this.data2Mock, params);
}
  // 监测指标数据|监测指标数据-运管服报警策略及相关
 // 监测指标数据|监测指标数据-运管服报警策略及相关
 getTargetDataList(targetId:string,strategyId:string) {
    const url = `${API_DOMAIN}${API_PREFIX}/ygf/targetDataList?targetId=${targetId}&strategyId=${strategyId}`;
    return requestHelper.getRequestData<IgetTargetDataListSpace.Model>(url, 'c4fadc87-ca2d-4dc3-873b-6052add5f1a6', this.data2Mock);
}
  // 校验名称是否重复|校验名称是否重复-运管服报警策略及相关
  postCheckIfNameExist(strategyName:string,useFor:number,monitorStrategyId:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/ygf/checkIfNameExist`;
      return requestHelper.postRequestData<IpostCheckIfNameExistSpace.Model>(url, 'd92e45ee-b08f-4ced-a15a-270f80a5b34f', this.data2Mock, {strategyName,useFor,monitorStrategyId});
  }
  // 修改监测策略|修改监测策略-运管服报警策略及相关
  postModifyStrategy(params: IpostModifyStrategySpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/ygf/modifyStrategy`;
      return requestHelper.postRequestData<IpostModifyStrategySpace.Model>(url, '05ee84b8-a1b4-46ac-8409-9b9d26d3ab00', this.data2Mock, params);
  }
  // 设为/取消模板|设为/取消模板-运管服报警策略及相关
  postModifyTemplate(monitorStrategyId:number,isTemplate:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/ygf/modifyTemplate`;
      return requestHelper.postRequestData<IpostModifyTemplateSpace.Model>(url, '99226fc8-c057-40c0-a12a-450636bc9f03', this.data2Mock, {monitorStrategyId,isTemplate});
  }
  // 策略详情|策略详情-运管服报警策略及相关
  getFindStrategy(strategyId:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/ygf/findStrategy?strategyId=${strategyId}`;
      return requestHelper.getRequestData<IgetFindStrategySpace.Model>(url, '4c274fab-6640-4baf-b508-f116fec61dbf', this.data2Mock);
  }
  // 删除策略|删除策略-运管服报警策略及相关
  postRemoveMonitorStrategy(strategyType:number,monitorStrategyId:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/ygf/removeMonitorStrategy`;
      return requestHelper.postRequestData<IpostRemoveMonitorStrategySpace.Model>(url, '9850697f-6c8f-49b1-9c89-ea1da3b2f0da', this.data2Mock, {strategyType,monitorStrategyId});
  }
  // 新增监测策略|新增监测策略-运管服报警策略及相关
  postAddStrategy(params: IpostAddStrategySpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/ygf/addStrategy`;
      return requestHelper.postRequestData<IpostAddStrategySpace.Model>(url, '39fbbb77-3b69-4892-97d1-1e5c44bc9a34', this.data2Mock, params);
  }
  // 报警策略模板模板(不分页)|报警策略模板模板(不分页)-运管服报警策略及相关
  getListStrategyTemplates() {
    const url = `${API_DOMAIN}${API_PREFIX}/ygf/listStrategyTemplates`;
    return requestHelper.getRequestData<IgetListStrategyTemplatesSpace.Model>(url, '2a0eb80c-54b8-4f5e-9051-803b7ebce2d8', this.data2Mock);
}
// 查询指标树|查询指标树-TargetTypeController
getListTargetTree(params: IgetListTargetTreeSpace.RequestParams) {
    const {targetFrequency}= params
    const url = `${API_DOMAIN}${API_PREFIX}/targetType/listTargetTree?targetFrequency=${targetFrequency}`;
    return requestHelper.getRequestData<IgetListTargetTreeSpace.Model>(url, '5ae60a0e-0daf-4bac-95df-d16d3584cf61', this.data2Mock);
}
}
export const apiYgfWarningConfigObj = new YgfWarningConfigApi();