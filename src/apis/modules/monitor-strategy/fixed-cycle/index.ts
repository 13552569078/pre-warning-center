import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostCheckIfNameExistSpace, IpostAddMonitorStrategySpace, IpostRemoveMonitorStrategySpace, IpostFindMonitorStrategyUnitVOPageSpace, IpostFindMonitorUnitStrategyPageSpace, IpostModifyTemplateSpace, IgetFindMonitorStrategySpace, IpostFindMonitorStrategyPageSpace, IpostModifyMonitorStrategySpace, IpostFindMonitorUnitStrategyListPageSpace, IgetFindTargetFrequencyCommonMultipleSpace, IpostModifyMonitorStrategyNameAndDescSpace, IgetCheckIfRelatedUnitSpace, IgetFindMonitorStrategyVersionDetailSpace, IgetListMonitorStrategyVersionSpace, IgetFindMonitorStrategyVersionVOSpace } from '../fixed-cycle/model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class MonitorStrategyApi {
  data2Mock: boolean = false;

  // 校验名称是否重复|校验名称是否重复-策略API
  postCheckIfNameExist(strategyName: string | number, monitorStrategyId: number | string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/checkIfNameExist`;
    return requestHelper.postRequestData<IpostCheckIfNameExistSpace.Model>(url, 'f6be3fdf-7848-4ffe-863a-93e59fc28fb6', this.data2Mock, { strategyName, monitorStrategyId });
  }
  // 新增监测策略|新增监测策略-策略API
  postAddMonitorStrategy(params: IpostAddMonitorStrategySpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/addMonitorStrategy`;
    return requestHelper.postRequestData<IpostAddMonitorStrategySpace.Model>(url, '3f3a688b-b548-41d6-a341-831aa4a72a02', this.data2Mock, params);
  }
  // 删除策略|删除策略-策略API
  postRemoveMonitorStrategy(monitorStrategyId: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/removeMonitorStrategy`;
    return requestHelper.postRequestData<IpostRemoveMonitorStrategySpace.Model>(url, '77f96b93-ad65-4142-a822-a91f214f7a7b', this.data2Mock, { monitorStrategyId });
  }
  // 查询策略关联的单元列表,分页|查询策略关联的单元列表,分页-策略API
  postFindMonitorStrategyUnitVOPage(params: IpostFindMonitorStrategyUnitVOPageSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/findMonitorStrategyUnitVOPage`;
    return requestHelper.postRequestData<IpostFindMonitorStrategyUnitVOPageSpace.Model>(url, '5b998c89-aef7-4d36-a180-8fbcfda875d5', this.data2Mock, params);
  }
  // 根据单元的报警策略列表(分页)|根据单元的报警策略列表(分页)-策略API
  postFindMonitorUnitStrategyPage(params: IpostFindMonitorUnitStrategyPageSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/findMonitorUnitStrategyPage`;
    return requestHelper.postRequestData<IpostFindMonitorUnitStrategyPageSpace.Model>(url, '0b31e7dc-153d-46f2-be5e-453596c42f34', this.data2Mock, params);
  }
  // 设为/取消模板|设为/取消模板-策略API
  postModifyTemplate(monitorStrategyId: string, isTemplate: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/modifyTemplate`;
    return requestHelper.postRequestData<IpostModifyTemplateSpace.Model>(url, '64c286fa-cc33-42bb-9bc9-15c968604020', this.data2Mock, { monitorStrategyId, isTemplate });
  }
  // 策略详情|策略详情-策略API
  getFindMonitorStrategy(monitorStrategyId: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/findMonitorStrategy?monitorStrategyId=${monitorStrategyId}`;
    return requestHelper.getRequestData<IgetFindMonitorStrategySpace.Model>(url, '84b0909c-126d-4b95-90e7-961b3e7731d4', this.data2Mock);
  }
  // 报警策略列表(分页)|报警策略列表(分页)-策略API
  postFindMonitorStrategyPage(params: IpostFindMonitorStrategyPageSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/findMonitorStrategyPage`;
    return requestHelper.postRequestData<IpostFindMonitorStrategyPageSpace.Model>(url, 'ffb7ef21-d2cf-4803-9c37-d6c408498b11', this.data2Mock, params);
  }
  // 修改监测策略|修改监测策略-策略API
  postModifyMonitorStrategy(params: IpostModifyMonitorStrategySpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/modifyMonitorStrategy`;
    return requestHelper.postRequestData<IpostModifyMonitorStrategySpace.Model>(url, '82f5751f-5773-4164-833c-c0b1ef93f9e1', this.data2Mock, params);
  }
  // 查询监测点配置策略列表|查询监测点配置策略列表-策略API
  postFindMonitorUnitStrategyListPage(params: IpostFindMonitorUnitStrategyListPageSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/findMonitorUnitStrategyListPage`;
    return requestHelper.postRequestData<IpostFindMonitorUnitStrategyListPageSpace.Model>(url, '5aa5adce-4e7c-4fbb-90c3-3fc6be73bf0a', this.data2Mock, params);
  }
  // 计算指标周期最小公倍数|计算指标周期最小公倍数-策略API
  getFindTargetFrequencyCommonMultiple(targetIds: string[]) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/findTargetFrequencyCommonMultiple?targetIds=${targetIds}`;
    return requestHelper.getRequestData<IgetFindTargetFrequencyCommonMultipleSpace.Model>(url, 'd2703862-86d0-4a23-8c82-fba439621391', this.data2Mock);
  }
  // 修改监测策略名称和描述|修改监测策略名称和描述-策略API
  postModifyMonitorStrategyNameAndDesc(monitorStrategyId: string, strategyName: string, strategyDesc: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/modifyMonitorStrategyNameAndDesc`;
    return requestHelper.postRequestData<IpostModifyMonitorStrategyNameAndDescSpace.Model>(url, '2bcc1698-a0c8-4ce5-9bf0-5fdc16fc273b', this.data2Mock, { monitorStrategyId, strategyName, strategyDesc });
  }
  // 修改二次监测策略名称和描述|修改监测策略名称和描述-策略API
  postSecondModifyMonitorStrategyNameAndDesc(monitorStrategyId: string, strategyName: string, strategyDesc: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/secondWarningMonitorStrategy/modifyMonitorStrategyNameAndDesc`;
    return requestHelper.postRequestData<IpostModifyMonitorStrategyNameAndDescSpace.Model>(url, '2bcc1698-a0c8-4ce5-9bf0-5fdc16fc273b', this.data2Mock, { monitorStrategyId, strategyName, strategyDesc });
  }

  // 查询策略版本详情|查询策略版本详情-策略API
  getFindMonitorStrategyVersionDetail(versionId: string, strategyId: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/findMonitorStrategyVersionDetail?versionId=${versionId}&strategyId=${strategyId}`;
    return requestHelper.getRequestData<IgetFindMonitorStrategyVersionDetailSpace.Model>(url, '36d556bd-7189-46ff-bb64-f02a848b766b', this.data2Mock);
  }
  // 查询策略历史版本|查询策略历史版本-策略API
  getListMonitorStrategyVersion(strategyId: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/listMonitorStrategyVersion?strategyId=${strategyId}`;
    return requestHelper.getRequestData<IgetListMonitorStrategyVersionSpace.Model>(url, 'fea10331-230f-4bf3-9ab2-a9cf954c71e9', this.data2Mock);
  }
  // 查询当前策略是否关联监测点|查询当前策略是否关联监测点-策略API
  getCheckIfRelatedUnit(strategyId: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/checkIfRelatedUnit?strategyId=${strategyId}`;
    return requestHelper.getRequestData<IgetCheckIfRelatedUnitSpace.Model>(url, 'b83e5a8c-9706-4b22-8dbc-a069e85f7df0', this.data2Mock);
  }

  // 查询策略版本信息|查询策略版本信息-策略API
  getFindMonitorStrategyVersionVO(versionId: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorStrategy/findMonitorStrategyVersionVO?versionId=${versionId}`;
    return requestHelper.getRequestData<IgetFindMonitorStrategyVersionVOSpace.Model>(url, 'e2f43ed8-0fde-4fbd-8960-65418a4a3a4e', this.data2Mock);
  }
}
export const apiMonitorStrategyObj = new MonitorStrategyApi();
