import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetFacilitySiteSpace,IdeleteSpace,IgetTypeListSpace,IdeleteFSpace,IpostUpdateSpace,IpostPageListSpace,IaddSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;


/**
 * 数据访问，此类代码生成器生成
 */
class FacilitySiteApi {
  data2Mock: boolean = false;
  
  // 建筑工地详情|建筑工地详情-设施-建筑工地
  getFacilitySite(id:number|string) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilitySite/${id}`;
      return requestHelper.getRequestData<IgetFacilitySiteSpace.Model>(url, '3f9b82ff-c005-4a3e-911e-6a4f11276800', this.data2Mock);
  }
  // 批量删除建筑工地|批量删除建筑工地-设施-建筑工地
  delete(ids:[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilitySite/delete`;
      return requestHelper.postRequestData<IdeleteSpace.Model>(url, 'f45574a2-158e-46b3-9751-dc732c0cb023', this.data2Mock, {ids});
  }
  // 建筑工地类型下拉列表|建筑工地类型下拉列表-设施-建筑工地
  getTypeList() {
      const url = `${API_DOMAIN}${API_PREFIX}/facilitySite/typeList`;
      return requestHelper.getRequestData<IgetTypeListSpace.Model>(url, 'b3ee7bca-9e5a-4513-b245-0422beac7f70', this.data2Mock);
  }
  // 删除建筑工地|删除建筑工地-设施-建筑工地
  deleteF(id:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilitySite/delete/${id}`;
      return requestHelper.deleteRequestData<IdeleteFSpace.Model>(url, '9b36f8db-6d20-4d1e-a1a8-4b2a2e84110c', this.data2Mock);
  }
  // 更新建筑工地|更新建筑工地-设施-建筑工地
  postUpdate(params: IpostUpdateSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilitySite/update`;
      return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, 'da8695a0-1614-49c1-b1dc-e5ae8d7200c8', this.data2Mock, params);
  }
  // 分页查询建筑工地列表|分页查询建筑工地列表-设施-建筑工地
  postPageList(params: IpostPageListSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilitySite/pageList`;
      return requestHelper.postRequestData<IpostPageListSpace.Model>(url, '062946e8-b635-499a-9189-bc238aebd671', this.data2Mock, params);
  }
  // 新增建筑工地|新增建筑工地-设施-建筑工地
  add(params: IaddSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilitySite/add`;
      return requestHelper.postRequestData<IaddSpace.Model>(url, 'fcbb276f-ba30-479a-ac2b-0f75a64c1d38', this.data2Mock, params);
  }
}
export const apiFacilitySiteObj = new FacilitySiteApi();