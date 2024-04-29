import { requestHelper } from "@/apis/base/mapper-helper";
import { IdeleteFSpace,IgetFacilityDrainageSpace,IaddSpace,IpostUpdateSpace,IdeleteSpace,IpostPageListSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class FacilityDrainageApi {
  data2Mock: boolean = false;
  
  // 删除排水设施设施|删除排水设施设施-设施-排水设施
  deleteF(id:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityDrainage/delete/${id}`;
      return requestHelper.deleteRequestData<IdeleteFSpace.Model>(url, '4e8b87ee-d16e-4e12-96bb-cca9442b060b', this.data2Mock);
  }
  // 排水设施设施详情|排水设施设施详情-设施-排水设施
  getFacilityDrainage(id:number|string) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityDrainage/${id}`;
      return requestHelper.getRequestData<IgetFacilityDrainageSpace.Model>(url, 'd8b6ef21-2c45-49a7-a5a8-ecda2b2801e8', this.data2Mock);
  }
  // 新增排水设施设施|新增排水设施设施-设施-排水设施
  add(params: IaddSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityDrainage/add`;
      return requestHelper.postRequestData<IaddSpace.Model>(url, '827f4ff4-50b8-4b05-b52e-60b33065221a', this.data2Mock, params);
  }
  // 更新排水设施设施|更新排水设施设施-设施-排水设施
  postUpdate(params: IpostUpdateSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityDrainage/update`;
      return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, '3418f566-0782-4b1f-97f0-160827d788f0', this.data2Mock, params);
  }
  // 批量删除排水设施设施|批量删除排水设施设施-设施-排水设施
  delete(ids:[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityDrainage/delete`;
      return requestHelper.postRequestData<IdeleteSpace.Model>(url, '30905f19-d11c-4133-bb97-389358cd6836', this.data2Mock, {ids});
  }
  // 分页查询排水设施设施列表|分页查询排水设施设施列表-设施-排水设施
  postPageList(params: IpostPageListSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityDrainage/pageList`;
      return requestHelper.postRequestData<IpostPageListSpace.Model>(url, '7815849a-a954-4f50-a474-978cc0b3a7d4', this.data2Mock, params);
  }
}
export const apiFacilityDrainageObj = new FacilityDrainageApi();