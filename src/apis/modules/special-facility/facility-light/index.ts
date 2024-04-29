import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostUpdateSpace,IaddSpace,IdeleteSpace,IpostPageListSpace,IgetFacilityLightSpace,IdeleteFSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class FacilityLightApi {
  data2Mock: boolean = false;
  
  // 更新照明设施|更新照明设施-设施-照明设施
  postUpdate(params: IpostUpdateSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityLight/update`;
      return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, '48bba50f-507e-4c17-9e45-8aab6fa2d428', this.data2Mock, params);
  }
  // 新增照明设施|新增照明设施-设施-照明设施
  add(params: IaddSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityLight/add`;
      return requestHelper.postRequestData<IaddSpace.Model>(url, 'ce9252b4-a898-4150-a1a5-eb5b6de4eb74', this.data2Mock, params);
  }
  // 批量删除照明设施|批量删除照明设施-设施-照明设施
  delete(ids:[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityLight/delete`;
      return requestHelper.postRequestData<IdeleteSpace.Model>(url, '306898a5-2c4f-4ac2-ace7-7e1f7d0c5a6d', this.data2Mock, {ids});
  }
  // 分页查询照明设施列表|分页查询照明设施列表-设施-照明设施
  postPageList(params: IpostPageListSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityLight/pageList`;
      return requestHelper.postRequestData<IpostPageListSpace.Model>(url, 'b2a50cc4-46cb-4e48-a3da-a19637adad7f', this.data2Mock, params);
  }
  // 照明设施详情|照明设施详情-设施-照明设施
  getFacilityLight(id:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityLight/${id}`;
      return requestHelper.getRequestData<IgetFacilityLightSpace.Model>(url, '1884f27a-4ff5-40b6-8063-07d8747f3594', this.data2Mock);
  }
  // 删除照明设施|删除照明设施-设施-照明设施
  deleteF(id:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityLight/delete/${id}`;
      return requestHelper.deleteRequestData<IdeleteFSpace.Model>(url, '6aa2b119-2f81-4f40-9a5f-e5bac982c522', this.data2Mock);
  }
}
export const apiFacilityLightObj = new FacilityLightApi();