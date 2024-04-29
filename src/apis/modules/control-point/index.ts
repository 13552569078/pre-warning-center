import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostUpdateAccessDataSpace,IpostFrequencyStrategySpace,IgetEventTypesSpace,IgetEnableSpace,IpostUpdateUnitSpace,IaddSpace,IgetBaseInfoSpace,IdeleteVSpace,IgetFrequencyStrategySpace,IdeleteESpace,IpostPageSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class ControlPointApi {
  data2Mock: boolean = false;

  // 监测点-接入数据配置|监测点-接入数据配置-监测点V2
  postUpdateAccessData(unitEventTypeList:any[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/accessData/updateAccessData`;
      return requestHelper.postRequestData<IpostUpdateAccessDataSpace.Model>(url, 'df385289-1471-4d00-a01b-fae3033c8fba', this.data2Mock, {unitEventTypeList});
  }
  // 监测点-更新报警预警策略|监测点-更新报警预警策略-监测点V2
  postFrequencyStrategy(unitEventList:any[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/frequencyStrategy`;
      return requestHelper.postRequestData<IpostFrequencyStrategySpace.Model>(url, 'f6fdf101-56cb-4afa-9993-d100bb43a121', this.data2Mock, {unitEventList});
  }
  // 监测点-风险分类|监测点-风险分类-监测点V2
  getEventTypes(id:number, useFor: string) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/eventTypes/${id}?useFor=${useFor}`;
      return requestHelper.getRequestData<IgetEventTypesSpace.Model>(url, 'dfc12dbd-681e-4e91-aaee-d74a5f31bacd', this.data2Mock);
  }
  // 监测点-停用启用|监测点-停用启用-监测点V2
  getEnable(id:number,useState:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/enable/${id}?useState=${useState}`;
      return requestHelper.getRequestData<IgetEnableSpace.Model>(url, 'c5910dc5-bf2b-4b05-a012-25782972deb3', this.data2Mock);
  }
  // 监测点-修改|监测点-修改-监测点V2
  postUpdateUnit(params: IpostUpdateUnitSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/updateUnit`;
      return requestHelper.postRequestData<IpostUpdateUnitSpace.Model>(url, '9c418330-c996-4cce-9339-71db0f494bfc', this.data2Mock, params);
  }
  // 监测点-新增|监测点-新增-监测点V2
  add(params: IaddSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/add`;
      return requestHelper.postRequestData<IaddSpace.Model>(url, '90d61a80-e29b-4266-854f-257f3f05ecd0', this.data2Mock, params);
  }
  // 监测点-基本信息|监测点-基本信息-监测点V2
  getBaseInfo(id:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/baseInfo/${id}`;
      return requestHelper.getRequestData<IgetBaseInfoSpace.Model>(url, '429ab51d-b3c0-44cc-8916-c8097818d7dc', this.data2Mock);
  }
  // 监测点-删除|监测点-删除-监测点V2
  deleteV(id:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/delete/${id}`;
      return requestHelper.deleteRequestData<IdeleteVSpace.Model>(url, '9ac8d2ba-3063-420b-9f3a-55e6aae5ba0c', this.data2Mock);
  }
  // 监测点-查询报警预警策略|监测点-查询报警预警策略-监测点V2
  getFrequencyStrategy(id:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/frequencyStrategy/${id}`;
      return requestHelper.getRequestData<IgetFrequencyStrategySpace.Model>(url, '194a8659-5797-447c-b5e3-6d501e0fe931', this.data2Mock);
  }
  // 监测点风险分类-删除|监测点风险分类-删除-监测点V2
  deleteE(unitEventId:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/eventType/delete/${unitEventId}`;
      return requestHelper.deleteRequestData<IdeleteESpace.Model>(url, 'e7ec834a-f33a-4403-938c-01187e22de7f', this.data2Mock);
  }
  // 监测点列表-分页查询|监测点列表-分页查询-监测点V2
  postPage(params: IpostPageSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/page`;
      return requestHelper.postRequestData<IpostPageSpace.Model>(url, '94928664-fb6c-455b-9ddb-ca9a3fe31e27', this.data2Mock, params);
  }
}
export const apiControlPointObj = new ControlPointApi();
