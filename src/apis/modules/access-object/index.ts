import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostAddAccessSourceObjectSpace,IgetGetAccessSourceObjectDetailSpace,IgetGetAccessSourceObjectListSpace,IpostUpdateAccessSourceSpace,IpostUpdateAccessSourceObjectSpace,IpostAddAccessSourceSpace,IpostDeleteAccessSourceSpace,IgetGetAccessSourceListSpace,IgetGetAccessSourceObjectGroupSpace,IpostFindAccessSourceObjectPageSpace,IpostDeleteAccessSourceObjectSpace,IpostGetAccessSourceGroupSpace, IpostCheckAccessSourceSpace, IgetlistMockRelationObjects } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class AccessObjectApi {
  data2Mock: boolean = false;
  
  // 新增接入对象|新增接入对象-接入源、接入对象管理
  postAddAccessSourceObject(params: any) {
      const url = `${API_DOMAIN}${API_PREFIX}/accessSource/object/addAccessSourceObject`;
      return requestHelper.postRequestData<IpostAddAccessSourceObjectSpace.Model>(url, 'eb6ba926-3781-4d56-a13d-ea3f7edcb14c', this.data2Mock, params);
  }
  // 查看数据对象详情|查看数据对象详情-接入源、接入对象管理
  getGetAccessSourceObjectDetail(accessSourceObjectId:number | string) {
      const url = `${API_DOMAIN}${API_PREFIX}/accessSource/object/getAccessSourceObjectDetail?accessSourceObjectId=${accessSourceObjectId}`;
      return requestHelper.getRequestData<IgetGetAccessSourceObjectDetailSpace.Model>(url, 'a4cd2f4c-eae2-4878-9420-0d82d7d02d07', this.data2Mock);
  }
  // 根据接入源id查询接入对象列表|根据接入源id查询接入对象列表-接入源、接入对象管理
  getGetAccessSourceObjectList(accessSourceId:number | string) {
      const url = `${API_DOMAIN}${API_PREFIX}/accessSource/object/getAccessSourceObjectList?accessSourceId=${accessSourceId}`;
      return requestHelper.getRequestData<IgetGetAccessSourceObjectListSpace.Model>(url, 'f17b1e85-6db8-4f5a-ab6c-86123d86c1ae', this.data2Mock);
  }
  // 更新接入源|更新接入源-接入源、接入对象管理
  postUpdateAccessSource(params: any) {
      const url = `${API_DOMAIN}${API_PREFIX}/accessSource/updateAccessSource`;
      return requestHelper.postRequestData<IpostUpdateAccessSourceSpace.Model>(url, 'fb3090bc-1018-448d-984d-cea7c43b2c3f', this.data2Mock, params);
  }
  // 更新接入对象|更新接入对象-接入源、接入对象管理
  postUpdateAccessSourceObject(params: any) {
      const url = `${API_DOMAIN}${API_PREFIX}/accessSource/object/updateAccessSourceObject`;
      return requestHelper.postRequestData<IpostUpdateAccessSourceObjectSpace.Model>(url, '46ee2435-01b3-4441-9a27-709b7fa6f1b4', this.data2Mock, params);
  }
  // 新增接入源|新增接入源-接入源、接入对象管理
  postCheckAccessSource(params: any) {
      const url = `${API_DOMAIN}${API_PREFIX}/accessSource/checkAccessSource`;
      return requestHelper.postRequestData<IpostAddAccessSourceSpace.Model>(url, 'd65335dc-c697-4989-b39a-aad3dbe86bdb', this.data2Mock, params);
  }
  // 验证接入源|接入源、接入对象管理
  postAddAccessSource(params: IpostCheckAccessSourceSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/accessSource/addAccessSource`;
    return requestHelper.postRequestData<IpostCheckAccessSourceSpace.Model>(url, 'd65335dc-c697-4989-b39a-aad3dbe86bdb', this.data2Mock, params);
}
  // 删除接入源|删除接入源-接入源、接入对象管理
  postDeleteAccessSource(accessSourceId:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/accessSource/deleteAccessSource?accessSourceId=${accessSourceId}`;
      return requestHelper.postRequestData<IpostDeleteAccessSourceSpace.Model>(url, 'da9a39ed-a4b6-4b56-8a21-5403fc11ffc9', this.data2Mock);
  }
  // 查询接入源列表|查询接入源列表-接入源、接入对象管理
  getGetAccessSourceList(accessSourceName:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/accessSource/getAccessSourceList?accessSourceName=${accessSourceName}`;
      return requestHelper.getRequestData<IgetGetAccessSourceListSpace.Model>(url, '0bc516da-1d52-44d9-b571-430cc86279bf', this.data2Mock);
  }
  // 分组查询按接入源分类对象列表|分组查询按接入源分类对象列表-接入源、接入对象管理
  getGetAccessSourceObjectGroup(name:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/accessSource/object/getAccessSourceObjectGroup?name=${name}`;
      return requestHelper.getRequestData<IgetGetAccessSourceObjectGroupSpace.Model>(url, '37ba307f-f38b-49d6-a9da-b73f2c5cafa5', this.data2Mock);
  }
  // 分页查询接入对象|分页查询接入对象-接入源、接入对象管理
  postFindAccessSourceObjectPage(params: IpostFindAccessSourceObjectPageSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/accessSource/object/findAccessSourceObjectPage`;
      return requestHelper.postRequestData<IpostFindAccessSourceObjectPageSpace.Model>(url, 'ed648f19-9d2a-4a74-a18f-ea929f91a7e0', this.data2Mock, params);
  }
  // 删除接入对象|删除接入对象-接入源、接入对象管理
  postDeleteAccessSourceObject(accessSourceObjectId:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/accessSource/object/deleteAccessSourceObject?accessSourceObjectId=${accessSourceObjectId}`;
      return requestHelper.postRequestData<IpostDeleteAccessSourceObjectSpace.Model>(url, '19ffaa52-a7cc-4fc9-afff-a3fe7236f4fa', this.data2Mock);
  }
  // 分组查询接入源列表|分组查询接入源列表-接入源、接入对象管理
  postGetAccessSourceGroup(accessSourceName:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/accessSource/getAccessSourceGroup`;
      return requestHelper.postRequestData<IpostGetAccessSourceGroupSpace.Model>(url, 'febc8472-b12e-481b-890e-ecf244d7c4a6', this.data2Mock, {accessSourceName});
  }
  // 获取接入数据接口需映射字段
  getlistMockRelationObjects() {
    const url = `${API_DOMAIN}${API_PREFIX}/accessSource/listMockRelationObjects`;
    return requestHelper.getRequestData<IgetlistMockRelationObjects.Model>(url, '37ba307f-f38b-49d6-a9da-b73f2c5cafa5', this.data2Mock);
}
}
export const apiAccessObjectObj = new AccessObjectApi();