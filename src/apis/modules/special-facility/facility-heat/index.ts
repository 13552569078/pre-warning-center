import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostPageListSpace,IdeleteFSpace,IaddSpace,IgetFacilityHeatSpace,IpostUpdateSpace,IdeleteSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class FacilityHeatApi {
  data2Mock: boolean = false;
  
  // 分页查询供热设施设施列表|分页查询供热设施设施列表-设施-供热设施
  postPageList(params: IpostPageListSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityHeat/pageList`;
      return requestHelper.postRequestData<IpostPageListSpace.Model>(url, 'eb465b0b-717b-419d-9c82-b36cbe07f9a5', this.data2Mock, params);
  }
  // 删除供热设施设施|删除供热设施设施-设施-供热设施
  deleteF(id:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityHeat/delete/${id}`;
      return requestHelper.deleteRequestData<IdeleteFSpace.Model>(url, '1c413bb1-6cb7-4882-aee7-c5481ecf60dd', this.data2Mock);
  }
  // 新增供热设施设施|新增供热设施设施-设施-供热设施
  add(params: IaddSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityHeat/add`;
      return requestHelper.postRequestData<IaddSpace.Model>(url, '0f26eca0-85f3-4e4b-b36d-cf9ec336bd29', this.data2Mock, params);
  }
  // 供热设施设施详情|供热设施设施详情-设施-供热设施
  getFacilityHeat(id:number|string) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityHeat/${id}`;
      return requestHelper.getRequestData<IgetFacilityHeatSpace.Model>(url, '5348c72b-fe11-4e55-861c-f1edb704e74a', this.data2Mock);
  }
  // 更新供热设施设施|更新供热设施设施-设施-供热设施
  postUpdate(params: IpostUpdateSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityHeat/update`;
      return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, '3c6785cd-a151-46b7-8403-2dd92d8146a7', this.data2Mock, params);
  }
  // 批量删除供热设施设施|批量删除供热设施设施-设施-供热设施
  delete(ids:[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityHeat/delete`;
      return requestHelper.postRequestData<IdeleteSpace.Model>(url, '3da69060-52d1-4c2f-9c54-416027262720', this.data2Mock, {ids});
  }
}
export const apiFacilityHeatObj = new FacilityHeatApi();