import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetListByFacilityTypeSpace,IpostDeleteCheckSpace  } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class FacilityApi {
  data2Mock: boolean = false;

  // 根据设施类型查询设施列表-下拉|根据设施类型查询设施列表-下拉-设施
  getListByFacilityType (facilityTypeCode: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/facility/listByFacilityType?facilityTypeCode=${facilityTypeCode}`;
    return requestHelper.getRequestData<IgetListByFacilityTypeSpace.Model>(url, 'f8415240-7123-4016-b8a9-8e6a499d34d5', this.data2Mock);
  }
  // 批量删除校验接口|批量删除校验接口-设施
  postDeleteCheck(ids:string[]) {
    const url = `${API_DOMAIN}${API_PREFIX}/facility/deleteCheck`;
    return requestHelper.postRequestData<IpostDeleteCheckSpace.Model>(url, '1cc66fa7-50c8-456c-8f97-31abba54a63c', this.data2Mock, {ids});
}
}
export const apiFacilityObj = new FacilityApi();