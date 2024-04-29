import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetFacilityBuildingSpace, IpostUpdateSpace, IdeleteFSpace, IpostPageListSpace, IaddSpace, IdeleteSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class FacilityBuildingApi {
  data2Mock: boolean = false;

  // 房屋设施详情|房屋设施详情-设施-房屋设施
  getFacilityBuilding (id: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityBuilding/${id}`;
    return requestHelper.getRequestData<IgetFacilityBuildingSpace.Model>(url, 'c39b6858-621d-4cfa-8293-6aab4cf8c8c9', this.data2Mock);
  }
  // 更新房屋设施|更新房屋设施-设施-房屋设施
  postUpdate (params: IpostUpdateSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityBuilding/update`;
    return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, 'a5fff725-8688-4ee6-8c9c-877af5b9d0c1', this.data2Mock, params);
  }
  // 删除建筑工地|删除建筑工地-设施-房屋设施
  deleteF (id: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityBuilding/delete/${id}`;
    return requestHelper.deleteRequestData<IdeleteFSpace.Model>(url, '28ff8a3b-65af-4676-8841-146cc3515bd9', this.data2Mock);
  }
  // 分页查询房屋设施列表|分页查询房屋设施列表-设施-房屋设施
  postPageList (params: IpostPageListSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityBuilding/pageList`;
    return requestHelper.postRequestData<IpostPageListSpace.Model>(url, 'aec55e5a-2806-4b95-92ed-49cd3b1b2779', this.data2Mock, params);
  }
  // 新增房屋设施|新增房屋设施-设施-房屋设施
  add (params: IaddSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityBuilding/add`;
    return requestHelper.postRequestData<IaddSpace.Model>(url, '033dfb0e-786a-471f-8bf7-e875929dfc0e', this.data2Mock, params);
  }
  // 批量删除建筑工地|批量删除建筑工地-设施-房屋设施
  delete (ids: []) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityBuilding/delete`;
    return requestHelper.postRequestData<IdeleteSpace.Model>(url, '2a0ede38-70e9-4a1b-89c4-34c236516c05', this.data2Mock, { ids });
  }
}
export const apiFacilityBuildingObj = new FacilityBuildingApi();