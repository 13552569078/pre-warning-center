import { requestHelper } from "@/apis/base/mapper-helper";
import { IdeleteSpace, IgetFacilityTreeSpace, IgetSelectFacilitiesSpace, ImodifySpace, IgetDetailSpace, IaddSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class FacilityTypeApi {
  data2Mock: boolean = false;

  // 根据设施类型Code删除设施类型|根据设施类型Code删除设施类型-设施类型管理
  delete (typeCode: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityType/delete?typeCode=${typeCode}`;
    return requestHelper.deleteRequestData<IdeleteSpace.Model>(url, '7ec1c230-6793-4210-9ca6-9ce8c9951db1', this.data2Mock);
  }
  // 获取设施类型树列表|获取设施类型树列表-设施类型管理
  getFacilityTree (level?: string|number) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityType/facilityTree?level=${level}`;
    return requestHelper.getRequestData<IgetFacilityTreeSpace.Model>(url, 'c499fd73-255d-4c80-99f6-d3da1dc364a5', this.data2Mock);
  }
  // 查询设施类型列表（下拉框）|查询设施类型列表（下拉框）-设施类型管理
  getSelectFacilities (typeName: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityType/selectFacilities?typeName=${typeName}`;
    return requestHelper.getRequestData<IgetSelectFacilitiesSpace.Model>(url, 'f0e31db2-3c41-4c69-9bc5-19e8c7aa8739', this.data2Mock);
  }
  // 修改设施类型|修改设施类型-设施类型管理
  modify (params: ImodifySpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityType/modify`;
    return requestHelper.postRequestData<ImodifySpace.Model>(url, 'ddae4173-c214-467d-8959-39715e5af357', this.data2Mock, params);
  }
  // 获取设施类型详情|获取设施类型详情-设施类型管理
  getDetail (typeCode: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityType/detail?typeCode=${typeCode}`;
    return requestHelper.getRequestData<IgetDetailSpace.Model>(url, '02d3f8b7-ede0-4a3b-a494-6158eb9a4ad1', this.data2Mock);
  }
  // 添加设施类型|添加设施类型-设施类型管理
  add (params: IaddSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityType/add`;
    return requestHelper.postRequestData<IaddSpace.Model>(url, 'a7fbdabc-b699-48b8-ae67-dbb04b8f00c6', this.data2Mock, params);
  }
}
export const apiFacilityTypeObj = new FacilityTypeApi();