import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostUpdateSpace,IdeleteSSpace,IgetChangeSpace,IaddSpace,IgetSceneSpace,IlistSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class SceneApi {
  data2Mock: boolean = false;
  
  // 场景定义-修改|场景定义-修改-场景定义
  postUpdate(params: IpostUpdateSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/scene/update`;
      return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, '0c4a9712-af51-456a-aaf5-37569bebda63', this.data2Mock, params);
  }
  // 场景定义-删除|场景定义-删除-场景定义
  deleteS(id:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/scene/delete/${id}`;
      return requestHelper.deleteRequestData<IdeleteSSpace.Model>(url, '7ed32e83-51c3-42bd-a720-c15040e63ef9', this.data2Mock);
  }
  // 场景定义-启用停用|场景定义-启用停用-场景定义
  getChange(id:number,useState:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/scene/change?id=${id}&useState=${useState}`;
      return requestHelper.getRequestData<IgetChangeSpace.Model>(url, 'fc34b557-a412-4ef0-b2b1-70fd900b7e2f', this.data2Mock);
  }
  // 场景定义-新增|场景定义-新增-场景定义
  add(params: IpostUpdateSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/scene/add`;
      return requestHelper.postRequestData<IaddSpace.Model>(url, 'ea1daa9e-36d8-41b5-9412-f500b95b8d22', this.data2Mock, params);
  }
  // 场景定义-明细|场景定义-明细-场景定义
  getScene(id:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/scene/${id}`;
      return requestHelper.getRequestData<IgetSceneSpace.Model>(url, 'd7274d7b-e8f0-4b2a-b56c-4da8729f628e', this.data2Mock);
  }
  // 场景定义-列表查询|场景定义-列表查询-场景定义
  list() {
      const url = `${API_DOMAIN}${API_PREFIX}/scene/list`;
      return requestHelper.getRequestData<IlistSpace.Model>(url, 'df7387e9-212a-4f07-a8c6-c19995a42f18', this.data2Mock);
  }
}
export const apiSceneObj = new SceneApi();