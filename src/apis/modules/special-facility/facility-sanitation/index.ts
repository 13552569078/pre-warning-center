import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostPageListSpace, IpostUpdateSpace, IaddSpace, IgetFacilitySanitationSpace, IdeleteFSpace, IdeleteSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class FacilitySanitationApi {
  data2Mock: boolean = false;

  // 分页查询环卫设施设施列表|分页查询环卫设施设施列表-设施-环卫设施
  postPageList (params: IpostPageListSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilitySanitation/pageList`;
    return requestHelper.postRequestData<IpostPageListSpace.Model>(url, 'b0022ec2-5016-4393-b795-1d074596595d', this.data2Mock, params);
  }
  // 更新环卫设施设施|更新环卫设施设施-设施-环卫设施
  postUpdate (params: IpostUpdateSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilitySanitation/update`;
    return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, '727a6452-0d33-4383-a470-cdce6636b88c', this.data2Mock, params);
  }
  // 新增环卫设施设施|新增环卫设施设施-设施-环卫设施
  add (params: IaddSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilitySanitation/add`;
    return requestHelper.postRequestData<IaddSpace.Model>(url, 'aeed39e4-9905-43af-bbe8-c2edc0157c7d', this.data2Mock, params);
  }
  // 环卫设施设施详情|环卫设施设施详情-设施-环卫设施
  getFacilitySanitation (id: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilitySanitation/${id}`;
    return requestHelper.getRequestData<IgetFacilitySanitationSpace.Model>(url, 'b283062a-e7e2-4159-9206-0e44063c6fce', this.data2Mock);
  }
  // 删除环卫设施设施|删除环卫设施设施-设施-环卫设施
  deleteF (id: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilitySanitation/delete/${id}`;
    return requestHelper.deleteRequestData<IdeleteFSpace.Model>(url, '738ee87b-fa55-466c-8316-d32723dbb026', this.data2Mock);
  }
  // 批量删除环卫设施设施|批量删除环卫设施设施-设施-环卫设施
  delete (ids: []) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilitySanitation/delete`;
    return requestHelper.postRequestData<IdeleteSpace.Model>(url, 'f77016d8-f807-4a05-abe2-a8543da9a667', this.data2Mock, { ids });
  }
}
export const apiFacilitySanitationObj = new FacilitySanitationApi();