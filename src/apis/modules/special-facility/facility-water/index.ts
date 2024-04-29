import { requestHelper } from "@/apis/base/mapper-helper";
import { IdeleteSpace,IaddSpace,IdeleteFSpace,IgetFacilityWaterSpace,IpostPageListSpace,IpostUpdateSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class FacilityWaterApi {
  data2Mock: boolean = false;
  
  // 批量删除供水设施设施|批量删除供水设施设施-设施-供水设施
  delete(ids:[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityWater/delete`;
      return requestHelper.postRequestData<IdeleteSpace.Model>(url, 'c05a2893-88ad-40f0-b59b-498ba13e9dee', this.data2Mock, {ids});
  }
  // 新增供水设施设施|新增供水设施设施-设施-供水设施
  add(params: IaddSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityWater/add`;
      return requestHelper.postRequestData<IaddSpace.Model>(url, 'eecbcd8d-14e3-42f5-a124-62fcb6b57f34', this.data2Mock, params);
  }
  // 删除供水设施设施|删除供水设施设施-设施-供水设施
  deleteF(id:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityWater/delete/${id}`;
      return requestHelper.deleteRequestData<IdeleteFSpace.Model>(url, '6f750d33-0a7a-449b-bdec-6b7677775756', this.data2Mock);
  }
  // 供水设施设施详情|供水设施设施详情-设施-供水设施
  getFacilityWater(id:number|string) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityWater/${id}`;
      return requestHelper.getRequestData<IgetFacilityWaterSpace.Model>(url, 'f332c0e8-5dcd-4ecb-8f96-172681bf76a9', this.data2Mock);
  }
  // 分页查询供水设施设施列表|分页查询供水设施设施列表-设施-供水设施
  postPageList(params: IpostPageListSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityWater/pageList`;
      return requestHelper.postRequestData<IpostPageListSpace.Model>(url, '5fe0dbb7-e565-4576-8083-b4be54553dce', this.data2Mock, params);
  }
  // 更新供水设施设施|更新供水设施设施-设施-供水设施
  postUpdate(params: IpostUpdateSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityWater/update`;
      return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, '7f96dbb5-7041-481d-960a-da188a436318', this.data2Mock, params);
  }
}
export const apiFacilityWaterObj = new FacilityWaterApi();