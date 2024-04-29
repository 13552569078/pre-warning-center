import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetEventTypeConfigListSpace,IpostTemplateUpdateSpace,IpostEventTypeConfigUpateSpace,IgetTemplateListSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class NoticeApi {
  data2Mock: boolean = false;
  
  // 风险分类通知配置列表|风险分类通知配置列表-通知模板配置
  getEventTypeConfigList() {
      const url = `${API_DOMAIN}${API_PREFIX}/notify/config/eventTypeConfigList`;
      return requestHelper.getRequestData<IgetEventTypeConfigListSpace.Model>(url, '7f30e04e-d73b-44f4-bb02-fc00c84ebe29', this.data2Mock);
  }
  // 通知模板保存|通知模板保存-通知模板配置
  postTemplateUpdate(useFor:number,templateContents:[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/notify/config/templateUpdate`;
      return requestHelper.postRequestData<IpostTemplateUpdateSpace.Model>(url, '9169f214-ed34-40a9-bacb-ed091628d408', this.data2Mock, {useFor,templateContents});
  }
  // 风险分类通知配置批量保存|风险分类通知配置批量保存-通知模板配置
  postEventTypeConfigUpate(configParams:[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/notify/config/eventTypeConfigUpate`;
      return requestHelper.postRequestData<IpostEventTypeConfigUpateSpace.Model>(url, 'ef2f8648-d1bc-4b66-8921-14aafe4a5ac3', this.data2Mock, {configParams});
  }
  // 通知模板列表查询|通知模板列表查询-通知模板配置
  getTemplateList(useFor:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/notify/config/templateList?useFor=${useFor}`;
      return requestHelper.getRequestData<IgetTemplateListSpace.Model>(url, 'fc87bb90-8486-46c9-bdd1-7ce9162401ea', this.data2Mock);
  }
}
export const apiNoticeObj = new NoticeApi();