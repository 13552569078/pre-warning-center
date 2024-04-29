import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostPageListSpace, IaddSpace, IpostUpdateSpace, IdeleteSpace, IgetFacilityPipelineSpace, IdeleteFSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class FacilityPipelineApi {
  data2Mock: boolean = false;

  // 分页查询管廊设施设施列表|分页查询管廊设施设施列表-设施-管廊设施
  postPageList (params: IpostPageListSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityPipeline/pageList`;
    return requestHelper.postRequestData<IpostPageListSpace.Model>(url, '9d16eb7b-3d23-459d-930e-28ce952f9a84', this.data2Mock, params);
  }
  // 新增管廊设施设施|新增管廊设施设施-设施-管廊设施
  add (params: IaddSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityPipeline/add`;
    return requestHelper.postRequestData<IaddSpace.Model>(url, '8d97045d-e73b-4650-87cb-abc525be2de3', this.data2Mock, params);
  }
  // 更新管廊设施设施|更新管廊设施设施-设施-管廊设施
  postUpdate (params: IpostUpdateSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityPipeline/update`;
    return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, '3d2ab90e-210f-4423-8539-d34f53169a83', this.data2Mock, params);
  }
  // 批量删除管廊设施设施|批量删除管廊设施设施-设施-管廊设施
  delete (ids: []) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityPipeline/delete`;
    return requestHelper.postRequestData<IdeleteSpace.Model>(url, '29afd323-e465-4d06-b854-07b6c1c4f906', this.data2Mock, { ids });
  }
  // 管廊设施设施详情|管廊设施设施详情-设施-管廊设施
  getFacilityPipeline (id: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityPipeline/${id}`;
    return requestHelper.getRequestData<IgetFacilityPipelineSpace.Model>(url, 'd56bf2b1-c7a7-4271-890b-6426aeba00fc', this.data2Mock);
  }
  // 删除管廊设施设施|删除管廊设施设施-设施-管廊设施
  deleteF (id: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/facilityPipeline/delete/${id}`;
    return requestHelper.deleteRequestData<IdeleteFSpace.Model>(url, '03e4d19b-acc8-44d4-b035-7368cd75f48b', this.data2Mock);
  }
}
export const apiFacilityPipelineObj = new FacilityPipelineApi();