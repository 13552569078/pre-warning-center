import { requestHelper } from "@/apis/base/mapper-helper";
import { IaddSpace, IgetDetailSpace, IdeleteTSpace, IpostUpdateSpace, IgetTreeSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class TemplateParamsGroupApi {
  data2Mock: boolean = false;

  // 新增参数分组|新增参数分组-模板参数分组管理
  add (templateParamGroupName: string, parentCode: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/templateParamGroup/add`;
    return requestHelper.postRequestData<IaddSpace.Model>(url, '97785218-9065-4e4c-8d78-8e042d383633', this.data2Mock, { templateParamGroupName, parentCode });
  }
  // 查询参数分组详情|查询参数分组详情-模板参数分组管理
  getDetail (templateParamGroupId: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/templateParamGroup/detail/${templateParamGroupId}`;
    return requestHelper.getRequestData<IgetDetailSpace.Model>(url, 'd3c15e29-6b8c-42f7-bb3b-aa11c29844b3', this.data2Mock);
  }
  // 删除参数分组|删除参数分组-模板参数分组管理
  deleteT (templateParamGroupId: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/templateParamGroup/delete/${templateParamGroupId}`;
    return requestHelper.deleteRequestData<IdeleteTSpace.Model>(url, '65907428-5cb1-42fe-aa63-ca55d96119aa', this.data2Mock);
  }
  // 更新参数分组|更新参数分组-模板参数分组管理
  postUpdate (templateParamGroupId: string, templateParamGroupName: string, parentCode: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/templateParamGroup/update`;
    return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, '8b843f57-eb58-4e83-b5a6-fff2365f7cfb', this.data2Mock, { templateParamGroupId, templateParamGroupName, parentCode });
  }
  // 查询参数分组树|查询参数分组树-模板参数分组管理
  getTree () {
    const url = `${API_DOMAIN}${API_PREFIX}/templateParamGroup/tree`;
    return requestHelper.getRequestData<IgetTreeSpace.Model>(url, '74b5ac48-da49-4d0d-a64f-f5060f29223a', this.data2Mock);
  }
}
export const apiTemplateParamsGroupObj = new TemplateParamsGroupApi();