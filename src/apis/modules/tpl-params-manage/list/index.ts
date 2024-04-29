import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetGetParamTypeDictSpace, IpostUpdateSpace, IgetDetailSpace, IaddSpace, IdeleteTSpace, IpostPageSpace, IgetGetParamsFromTemplateFileSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class TemplateParamsManagementApi {
  data2Mock: boolean = false;

  // 查询模板参数类型字典|查询模板参数类型字典-模板参数管理
  getGetParamTypeDict () {
    const url = `${API_DOMAIN}${API_PREFIX}/templateParamInfo/getParamTypeDict`;
    return requestHelper.getRequestData<IgetGetParamTypeDictSpace.Model>(url, '9b98b018-e7ff-42dd-a259-4d350f853dd7', this.data2Mock);
  }
  // 更新参数|更新参数-模板参数管理
  postUpdate (params: IpostUpdateSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/templateParamInfo/update`;
    return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, 'f4f23974-793e-487e-98cd-cc58dea07f51', this.data2Mock, params);
  }
  // 查询模板参数详情|查询模板参数详情-模板参数管理
  getDetail (paramId: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/templateParamInfo/detail/${paramId}`;
    return requestHelper.getRequestData<IgetDetailSpace.Model>(url, '2821ab60-75d9-4cd4-85c2-29f4760d4bc0', this.data2Mock);
  }
  // 新增参数|新增参数-模板参数管理
  add (params: IaddSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/templateParamInfo/add`;
    return requestHelper.postRequestData<IaddSpace.Model>(url, '0556e80f-d705-4d8d-bb79-b4ad889a2b81', this.data2Mock, params);
  }
  // 删除参数|删除参数-模板参数管理
  deleteT (paramId: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/templateParamInfo/delete/${paramId}`;
    return requestHelper.deleteRequestData<IdeleteTSpace.Model>(url, '36758d46-fe42-4147-bb8c-a2213f51b6f8', this.data2Mock);
  }
  // 查询模板参数列表|查询模板参数列表-模板参数管理
  postPage (params: IpostPageSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/templateParamInfo/page`;
    return requestHelper.postRequestData<IpostPageSpace.Model>(url, '004e1aae-6337-487f-b828-d8e4d45c8fbf', this.data2Mock, params);
  }
  // 解析模板参数|解析模板参数-模板参数管理
  getGetParamsFromTemplateFile (urlStr: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/templateParamInfo/getParamsFromTemplateFile?url=${urlStr}`;
    return requestHelper.getRequestData<IgetGetParamsFromTemplateFileSpace.Model>(url, 'ede7ee6b-1586-4602-900a-e505bb190717', this.data2Mock);
  }
}
export const apiTemplateParamsManagementObj = new TemplateParamsManagementApi();