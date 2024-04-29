import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostPageListSpace,IpostUpdateSpace,IgetFacilityGasSpace,IaddSpace,IdeleteFSpace,IdeleteSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class FacilityGasApi {
  data2Mock: boolean = false;
  
  // 分页查询燃气设施列表|分页查询燃气设施列表-设施-燃气设施
  postPageList(params: IpostPageListSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityGas/pageList`;
      return requestHelper.postRequestData<IpostPageListSpace.Model>(url, '1c542c09-e7cc-4320-8c21-9df6fe2c130e', this.data2Mock, params);
  }
  // 更新燃气设施|更新燃气设施-设施-燃气设施
  postUpdate(params: IpostUpdateSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityGas/update`;
      return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, 'df0c7078-0b91-458c-8922-28dbd4e4e9c6', this.data2Mock, params);
  }
  // 燃气设施详情|燃气设施详情-设施-燃气设施
  getFacilityGas(id:number|string) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityGas/${id}`;
      return requestHelper.getRequestData<IgetFacilityGasSpace.Model>(url, '51a05666-5741-4a2e-9d45-42ff019d48c5', this.data2Mock);
  }
  // 新增燃气设施|新增燃气设施-设施-燃气设施
  add(params: IaddSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityGas/add`;
      return requestHelper.postRequestData<IaddSpace.Model>(url, 'c5186f73-541d-4e09-82c2-4f84075feba6', this.data2Mock, params);
  }
  // 删除燃气设施|删除燃气设施-设施-燃气设施
  deleteF(id:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityGas/delete/${id}`;
      return requestHelper.deleteRequestData<IdeleteFSpace.Model>(url, '3be20e64-aeee-4ab9-9103-e8233fcf2e7a', this.data2Mock);
  }
  // 批量删除燃气设施|批量删除燃气设施-设施-燃气设施
  delete(ids:[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityGas/delete`;
      return requestHelper.postRequestData<IdeleteSpace.Model>(url, '0bec26d6-2205-4dc9-8435-2662720aacd8', this.data2Mock, {ids});
  }
}
export const apiFacilityGasObj = new FacilityGasApi();