import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostAddStrategyTargetSpace, IpostPageSpace, IdeleteMSpace, IgetBaseInfoSpace, IgetFindMonitorUnitTargetStrategySpace, IaddSpace, IpostAddEquipListSpace, IgetEnableSpace, IpostUpdateUnitSpace, IpostCheckIfNameExistSpace, IgetListMonitorStrategyUnitSpace, IgetRegionMonitorUnitTreeSpace, IpostAddStrategyUnitSpace
,IgetListStrategyTaskModifyLogSpace, IgetModifyStrategyTaskTimeSpace
} from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class MonitorPointApi {
  data2Mock: boolean = false;

  // 监测点-关联指标策略|监测点-关联指标策略-MonitorUnitController
  postAddStrategyTarget (unitId: number | string, targetIdList: string[], strategyIdList: string[]) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/addStrategyTarget`;
    return requestHelper.postRequestData<IpostAddStrategyTargetSpace.Model>(url, '03e6e986-4c34-411c-84d6-5bff38f53dfc', this.data2Mock, { unitId, targetIdList, strategyIdList });
  }
  // 监测点列表-分页查询|监测点列表-分页查询-MonitorUnitController
  postPage (params: IpostPageSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/page`;
    return requestHelper.postRequestData<IpostPageSpace.Model>(url, '321bab13-006a-42bd-be35-7c3e3a610132', this.data2Mock, params);
  }
  // 监测点-删除|监测点-删除-MonitorUnitController
  deleteM (id: number | string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/delete/${id}`;
    return requestHelper.getRequestData<IdeleteMSpace.Model>(url, '64f606fa-8ebc-4b91-b45b-36cb16d340ce', this.data2Mock);
  }
  // 监测点-基本信息|监测点-基本信息-MonitorUnitController
  getBaseInfo (id: number | string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/baseInfo/${id}`;
    return requestHelper.getRequestData<IgetBaseInfoSpace.Model>(url, '780773b3-dc1b-4e4f-958b-283095e6a6df', this.data2Mock);
  }
  // 监测点-接入指标数据项|监测点-接入指标数据项-MonitorUnitController
  getFindMonitorUnitTargetStrategy (id: number | string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/findMonitorUnitTargetStrategy/${id}`;
    return requestHelper.getRequestData<IgetFindMonitorUnitTargetStrategySpace.Model>(url, '357455b2-8cce-493f-a390-f0d0b025807a', this.data2Mock);
  }
  // 监测点-新增|监测点-新增-MonitorUnitController
  add (params: IaddSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/add`;
    return requestHelper.postRequestData<IaddSpace.Model>(url, '13f9ec68-4474-41e2-96d2-4aa894d21087', this.data2Mock, params);
  }
  // 监测点-关联设备|监测点-关联设备-MonitorUnitController
  postAddEquipList (unitId: number | string, equipIdList: []) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/addEquipList`;
    return requestHelper.postRequestData<IpostAddEquipListSpace.Model>(url, 'ea53bf49-a85a-489a-b663-87c10955ff02', this.data2Mock, { unitId, equipIdList });
  }
  // 监测点-停用启用|监测点-停用启用-MonitorUnitController
  getEnable (id: number | string, useState: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/enable/${id}?useState=${useState}`;
    return requestHelper.getRequestData<IgetEnableSpace.Model>(url, '641cd90e-91dd-4782-a46b-de32b3d347da', this.data2Mock);
  }
  // 监测点-批量停用启用|监测点-停用启用-MonitorUnitController
  getEnableBatch (unitIdList: string[], useState: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/enableBatch?unitIdList=${unitIdList}&useState=${useState}`;
    return requestHelper.getRequestData<IgetEnableSpace.Model>(url, '641cd90e-91dd-4782-a46b-de32b3d347da', this.data2Mock);
  }
  // 监测点-修改|监测点-修改-MonitorUnitController
  postUpdateUnit (params: IpostUpdateUnitSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/updateUnit`;
    return requestHelper.postRequestData<IpostUpdateUnitSpace.Model>(url, '39ef9fa4-7203-4ef7-9cb6-16f826c77af0', this.data2Mock, params);
  }
  // 校验名称是否重复|校验名称是否重复-MonitorUnitController
  postCheckIfNameExist(unitName:string,unitId?: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/checkIfNameExist`;
    return requestHelper.postRequestData<IpostCheckIfNameExistSpace.Model>(url, '82800820-686f-48e4-9a3a-c8c049420a98', this.data2Mock, {unitName,unitId});
}
  // 获取监测点体模板
  getGetImportTemplate() {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/getImportTemplate`;
    return requestHelper.getRequestData<any>(url, 'd805b5f3-5863-4960-ba8e-7688fb9f7827', this.data2Mock);
  }

  // 策略关联监测点信息|策略关联监测点信息-策略API
  getListMonitorStrategyUnit(monitorStrategyId: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/listMonitorStrategyUnit?monitorStrategyId=${monitorStrategyId}`;
    return requestHelper.getRequestData<IgetListMonitorStrategyUnitSpace.Model>(url, 'c5572a8c-2752-477b-91fd-cf5666da715e', this.data2Mock);
  }
  // 根据策略查询监测点树|根据策略查询监测点树-策略API
  getRegionMonitorUnitTree(monitorStrategyId: string) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/regionMonitorUnitTree?monitorStrategyId=${monitorStrategyId}`;
      return requestHelper.getRequestData<IgetRegionMonitorUnitTreeSpace.Model>(url, '8fcde9a2-3c9a-44d1-8c0e-a5a4cb55e496', this.data2Mock);
  }
  // 配置策略关联监测点|配置策略关联监测点-策略API
  postAddStrategyUnit(monitorStrategyId: string, unitIds: string[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/addStrategyUnit`;
      return requestHelper.postRequestData<IpostAddStrategyUnitSpace.Model>(url, '50f47f61-11af-412d-870f-67f0ebde23e9', this.data2Mock, { monitorStrategyId, unitIds });
  }
  // 查询策略执行时间调整列表|查询策略执行时间调整列表-策略API
  getListStrategyTaskModifyLog(strategyId:string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/listStrategyTaskModifyLog?strategyId=${strategyId}`;
    return requestHelper.getRequestData<IgetListStrategyTaskModifyLogSpace.Model>(url, '17599b03-3889-4ff7-88a0-a74dddaf2f49', this.data2Mock);
  }
  // 调整策略执行时间|调整策略执行时间-策略API
  getModifyStrategyTaskTime(strategyId:string,unitId:string,newTime:string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/modifyStrategyTaskTime?strategyId=${strategyId}&unitId=${unitId}&newTime=${newTime}`;
    return requestHelper.getRequestData<IgetModifyStrategyTaskTimeSpace.Model>(url, '4c8f6c65-d381-47c5-9cb3-9dc4d99d0a40', this.data2Mock);
  }
}
export const apiMonitorPointObj = new MonitorPointApi();
