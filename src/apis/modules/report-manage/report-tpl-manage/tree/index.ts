import { requestHelper } from "@/apis/base/mapper-helper";
import { IdeleteTSpace,IaddSpace,IgetTypeTemplateTreeSpace,IpostUpdateSpace,IgetDetailSpace,IgetTypeTreeSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class ReportTreeApi {
  data2Mock: boolean = false;
  
  // 删除模板分组|删除模板分组-模板分组管理
  deleteT(templateTypeId:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/templateType/delete/${templateTypeId}`;
      return requestHelper.deleteRequestData<IdeleteTSpace.Model>(url, 'fde5491a-c8dd-4e6b-bc79-74795e7728b8', this.data2Mock);
  }
  // 新增模板分组|新增模板分组-模板分组管理
  add(templateTypeId:string,templateTypeName:string,parentCode:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/templateType/add`;
      return requestHelper.postRequestData<IaddSpace.Model>(url, 'd7a6625c-2020-4826-8e33-ba39d6e4e67c', this.data2Mock, {templateTypeId,templateTypeName,parentCode});
  }
  // 查询模板分组-模板树|查询模板分组-模板树-模板分组管理
  getTypeTemplateTree() {
      const url = `${API_DOMAIN}${API_PREFIX}/templateType/typeTemplateTree`;
      return requestHelper.getRequestData<IgetTypeTemplateTreeSpace.Model>(url, '87a6e144-a1e4-4743-8e17-1c0d47c4a221', this.data2Mock);
  }
  // 更新模板分组|更新模板分组-模板分组管理
  postUpdate(templateTypeId:string,templateTypeName:string,parentCode:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/templateType/update`;
      return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, '6a995eed-521a-4cd5-a3b1-2d65027b4736', this.data2Mock, {templateTypeId,templateTypeName,parentCode});
  }
  // 查询模板分组详情|查询模板分组详情-模板分组管理
  getDetail(templateTypeId:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/templateType/detail/${templateTypeId}`;
      return requestHelper.getRequestData<IgetDetailSpace.Model>(url, '31098835-0cdd-4bed-9728-963b1d2074a1', this.data2Mock);
  }
  // 查询模板分组树|查询模板分组树-模板分组管理
  getTypeTree() {
      const url = `${API_DOMAIN}${API_PREFIX}/templateType/typeTree`;
      return requestHelper.getRequestData<IgetTypeTreeSpace.Model>(url, 'b6c19c7c-e3f8-4d31-b919-4e15c3b6be17', this.data2Mock);
  }
}
export const apiReportTreeObj = new ReportTreeApi();