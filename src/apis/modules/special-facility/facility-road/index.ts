import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostUpdateSpace, IdeleteFSpace, IpostPageListSpace, IaddSpace, IgetFacilityRoadSpace, IdeleteSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class FacilityRoadApi {
  data2Mock: boolean = false;

  // 更新道路设施设施|更新道路设施设施-设施-道路设施
  postUpdate (params: IpostUpdateSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityRoad/update`;
    return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, '243a22b6-4550-4796-86ad-3d0f747dc4b1', this.data2Mock, params);
  }
  // 删除道路设施设施|删除道路设施设施-设施-道路设施
  deleteF (id: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityRoad/delete/${id}`;
    return requestHelper.deleteRequestData<IdeleteFSpace.Model>(url, 'd72ead45-c2e0-43f3-9761-f2037a6919cf', this.data2Mock);
  }
  // 分页查询道路设施设施列表|分页查询道路设施设施列表-设施-道路设施
  postPageList (params: IpostPageListSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityRoad/pageList`;
    return requestHelper.postRequestData<IpostPageListSpace.Model>(url, '50c1f3c0-840c-4ac9-a7ad-a38ca2028949', this.data2Mock, params);
  }
  // 新增道路设施设施|新增道路设施设施-设施-道路设施
  add (params: IaddSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityRoad/add`;
    return requestHelper.postRequestData<IaddSpace.Model>(url, 'bedb39c0-e0ee-49d8-9494-1848a1b06179', this.data2Mock, params);
  }
  // 道路设施设施详情|道路设施设施详情-设施-道路设施
  getFacilityRoad (id: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityRoad/${id}`;
    return requestHelper.getRequestData<IgetFacilityRoadSpace.Model>(url, '3eca2189-b7e4-4321-8eef-0e7bf95db708', this.data2Mock);
  }
  // 批量删除道路设施设施|批量删除道路设施设施-设施-道路设施
  delete (ids: []) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityRoad/delete`;
    return requestHelper.postRequestData<IdeleteSpace.Model>(url, '07bf4b0e-1d75-4b51-8d52-ee438059196e', this.data2Mock, { ids });
  }
}
export const apiFacilityRoadObj = new FacilityRoadApi();