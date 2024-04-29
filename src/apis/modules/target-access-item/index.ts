import { requestHelper } from "@/apis/base/mapper-helper";
import { IaddSpace,IgetDetailSpace,IpostPageSpace,IpostUpdateSpace,IdeleteSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class AccessItemApi {
  data2Mock: boolean = false;
  
  // 新增数据项|新增数据项-接入数据项管理
  add(params: IaddSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/accessItem/add`;
      return requestHelper.postRequestData<IaddSpace.Model>(url, 'bafe03c8-5592-4300-8d2a-5f124f7e4747', this.data2Mock, params);
  }
  // 查看数据项详情|查看数据项详情-接入数据项管理
  getDetail(accessItemId:number|string) {
      const url = `${API_DOMAIN}${API_PREFIX}/accessItem/detail?accessItemId=${accessItemId}`;
      return requestHelper.getRequestData<IgetDetailSpace.Model>(url, '8f60c939-584d-4b84-9631-d88c08cd615f', this.data2Mock);
  }
  // 分页查询数据项|分页查询数据项-接入数据项管理
  postPage(params: IpostPageSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/accessItem/page`;
      return requestHelper.postRequestData<IpostPageSpace.Model>(url, 'bddb3a12-f2bf-4c46-8c3b-fd4734a432d9', this.data2Mock, params);
  }
  // 更新数据项|更新数据项-接入数据项管理
  postUpdate(params: IpostUpdateSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/accessItem/update`;
      return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, '233d53c3-a43f-4b95-9ba9-0c0150340083', this.data2Mock, params);
  }
  // 更新数据项|更新数据项-接入数据项管理
  delete(accessItemId:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/accessItem/delete?accessItemId=${accessItemId}`;
      return requestHelper.postRequestData<IdeleteSpace.Model>(url, 'ee11117c-23bd-4692-9c7f-0ac17e5f4484', this.data2Mock, {accessItemId});
  }
  // 下载导入模板
  getDownload(targetId: number|string) {
    const url = `${API_DOMAIN}${API_PREFIX}/accessItem/getImportTemplate?targetId=${targetId}`;
    return requestHelper.getRequestData<IgetDetailSpace.Model>(url, '8f60c939-584d-4b84-9631-d88c08cd615f', this.data2Mock);
}
}
export const apiAccessItemObj = new AccessItemApi();