import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostSaveSpace,IlistSpace,IdeleteAnalysisModelSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class AnalysisModelApi {
  data2Mock: boolean = false;
  
  // 保存分析模型|保存分析模型-分析模型api
  postSave(params: IpostSaveSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/analysisModel/save`;
      return requestHelper.postRequestData<IpostSaveSpace.Model>(url, '0f836ed9-9348-4eae-82e4-926305bb3881', this.data2Mock, params);
  }
  // 查询分析模型列表|查询分析模型列表-分析模型api
  list(analysisModelName:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/analysisModel/list`;
      return requestHelper.postRequestData<IlistSpace.Model>(url, 'dc0c9c0b-e3f5-4f4e-8bf2-378a36a42cd8', this.data2Mock, {analysisModelName});
  }
  // 删除分析模型|删除分析模型-分析模型api
  deleteAnalysisModel(analysisModelId:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/analysisModel/${analysisModelId}`;
      return requestHelper.deleteRequestData<IdeleteAnalysisModelSpace.Model>(url, '811e34f5-d57f-4a44-8676-1ab69e43ec22', this.data2Mock);
  }
}
export const apiAnalysisModelObj = new AnalysisModelApi();