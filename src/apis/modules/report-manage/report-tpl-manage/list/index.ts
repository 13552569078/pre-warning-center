import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetDetailSpace,IpostPageSpace,IpostUpdateSpace,IdeleteTSpace,IaddSpace,IgetGetParamsFromTemplateFileSpace, IgetGetTemplateFileInfoSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class ReportListApi {
  data2Mock: boolean = false;
  
  // 查询模板详情|查询模板详情-模板管理
  getDetail(templateId:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/templateInfo/detail/${templateId}`;
      return requestHelper.getRequestData<IgetDetailSpace.Model>(url, '83d7f03a-42a2-45b1-9994-a732d4c114e5', this.data2Mock);
  }
  // 分页查询模板列表|分页查询模板列表-模板管理
  postPage(params: IpostPageSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/templateInfo/page`;
      return requestHelper.postRequestData<IpostPageSpace.Model>(url, 'bffc8015-ae15-4e23-9e99-e85d403ad2a9', this.data2Mock, params);
  }
  // 更新模板|更新模板-模板管理
  postUpdate(params: IpostUpdateSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/templateInfo/update`;
      return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, 'ad45eeef-2bab-42dd-9ef5-24d3a29fcbe7', this.data2Mock, params);
  }
  // 删除模板|删除模板-模板管理
  deleteT(templateId:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/templateInfo/delete/${templateId}`;
      return requestHelper.deleteRequestData<IdeleteTSpace.Model>(url, 'd4d3275b-dc5b-4df3-9389-e59e13fd6f8d', this.data2Mock);
  }
  // 新增模板|新增模板-模板管理
  add(params: IaddSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/templateInfo/add`;
      return requestHelper.postRequestData<IaddSpace.Model>(url, 'fa02a735-7bac-49dc-a793-6fd0ff6af33f', this.data2Mock, params);
  }
    // 获取导入模板
    getGetImportTemplate() {
        const url = `${API_DOMAIN}${API_PREFIX}/templateInfo/getDefaultTemplate`;
        return requestHelper.getRequestData<any>(url, 'd805b5f3-5863-4960-ba8e-7688fb9f7827', this.data2Mock);
    }

    // 解析模板参数|解析模板参数-模板参数管理
    getGetParamsFromTemplateFile(fileurl:string) {
        const url = `${API_DOMAIN}${API_PREFIX}/templateParamInfo/getParamsFromTemplateFile?url=${fileurl}`;
        return requestHelper.getRequestData<IgetGetParamsFromTemplateFileSpace.Model>(url, 'b0f5950e-465c-41d9-a515-069f29ad866a', this.data2Mock);
    }
    // 获取模板文件信息|获取模板文件信息-模板管理
  getGetTemplateFileInfo(templateFileId:string) {
    const url = `${API_DOMAIN}${API_PREFIX}/templateInfo/getTemplateFileInfo?templateFileId=${templateFileId}`;
    return requestHelper.getRequestData<IgetGetTemplateFileInfoSpace.Model>(url, 'f1514ca5-0e0e-4ca2-92b0-b05487a294a7', this.data2Mock);
}
}
export const apiReportListObj = new ReportListApi();