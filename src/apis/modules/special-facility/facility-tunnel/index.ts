import { requestHelper } from "@/apis/base/mapper-helper";
import { IaddSpace,IpostUpdateSpace,IdeleteSpace,IdeleteFSpace,IpostPageListSpace,IgetFacilityTunnelSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class FacilityTunnelApi {
  data2Mock: boolean = false;
  
  // 新增隧道设施|新增隧道设施-设施-隧道设施
  add(params: IaddSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityTunnel/add`;
      return requestHelper.postRequestData<IaddSpace.Model>(url, 'a0ed8625-f2f2-42f5-b60a-1c40b43fe25c', this.data2Mock, params);
  }
  // 更新隧道设施|更新隧道设施-设施-隧道设施
  postUpdate(params: IpostUpdateSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityTunnel/update`;
      return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, 'ef65e689-3108-4bf5-953a-56027edf4b0d', this.data2Mock, params);
  }
  // 批量删除隧道设施|批量删除隧道设施-设施-隧道设施
  delete(ids:[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityTunnel/delete`;
      return requestHelper.postRequestData<IdeleteSpace.Model>(url, '811f77f1-ad17-4abd-abc8-577084a90f4e', this.data2Mock, {ids});
  }
  // 删除隧道设施|删除隧道设施-设施-隧道设施
  deleteF(id:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityTunnel/delete/${id}`;
      return requestHelper.deleteRequestData<IdeleteFSpace.Model>(url, '07094048-fa51-4cdb-bdf3-f69305cf866b', this.data2Mock);
  }
  // 分页查询隧道设施列表|分页查询隧道设施列表-设施-隧道设施
  postPageList(params: IpostPageListSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityTunnel/pageList`;
      return requestHelper.postRequestData<IpostPageListSpace.Model>(url, '477ff1c1-6dff-4e67-9f76-25458d2d9625', this.data2Mock, params);
  }
  // 隧道设施详情|隧道设施详情-设施-隧道设施
  getFacilityTunnel(id:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/facilityTunnel/${id}`;
      return requestHelper.getRequestData<IgetFacilityTunnelSpace.Model>(url, '7c8662f7-1bf4-421a-9898-199ebd85bebe', this.data2Mock);
  }
}
export const apiFacilityTunnelObj = new FacilityTunnelApi();