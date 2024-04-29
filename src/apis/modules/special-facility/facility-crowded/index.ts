import { requestHelper } from "@/apis/base/mapper-helper";
import { IdeleteFSpace,IaddSpace,IgetFacilityCrowdedSpace,IdeleteSpace,IpostUpdateSpace,IpostPageListSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class FacilityCrowdedApi {
  data2Mock: boolean = false;
  
  // 删除人员密集场所|删除人员密集场所-设施-人员密集场所
  deleteF(id:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityCrowded/delete/${id}`;
      return requestHelper.deleteRequestData<IdeleteFSpace.Model>(url, '989c9f1f-24aa-4382-be22-629e3059af47', this.data2Mock);
  }
  // 新增人员密集场所|新增人员密集场所-设施-人员密集场所
  add(params: IaddSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityCrowded/add`;
      return requestHelper.postRequestData<IaddSpace.Model>(url, '303217f9-3d5f-423d-8bd6-397439241479', this.data2Mock, params);
  }
  // 桥梁人员密集场所详情|桥梁人员密集场所详情-设施-人员密集场所
  getFacilityCrowded(id:number|string) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityCrowded/${id}`;
      return requestHelper.getRequestData<IgetFacilityCrowdedSpace.Model>(url, 'd1f30b18-aedb-4ac6-b908-9382381dc5f1', this.data2Mock);
  }
  // 批量删除人员密集场所|批量删除人员密集场所-设施-人员密集场所
  delete(ids:[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityCrowded/delete`;
      return requestHelper.postRequestData<IdeleteSpace.Model>(url, 'deefb178-3a08-48ec-af85-ab58bcad294c', this.data2Mock, {ids});
  }
  // 更新人员密集场所|更新人员密集场所-设施-人员密集场所
  postUpdate(params: IpostUpdateSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityCrowded/update`;
      return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, '5bb70aa7-63a6-429f-8130-33cc7fab3219', this.data2Mock, params);
  }
  // 分页查询人员密集场所列表|分页查询人员密集场所列表-设施-人员密集场所
  postPageList(params: IpostPageListSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityCrowded/pageList`;
      return requestHelper.postRequestData<IpostPageListSpace.Model>(url, '3d6bdbb8-c5a0-4987-9552-47706fef82f6', this.data2Mock, params);
  }
}
export const apiFacilityCrowdedObj = new FacilityCrowdedApi();