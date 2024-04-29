import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostPageSpace,IgetListTreeSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class SpecialTypeConfigApi {
  data2Mock: boolean = false;
  
  // 场景定义-专项类型分页列表|场景定义-专项类型分页列表-场景定义
  postPage(currentPage:number,pageSize:number,sceneCodes:string[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/scene/page`;
      return requestHelper.postRequestData<IpostPageSpace.Model>(url, 'f2b7c415-cf91-436d-ad77-1f2e2ab0b452', this.data2Mock, {currentPage,pageSize,sceneCodes});
  }
  // 场景定义-专项类型树|场景定义-专项类型树-场景定义
  getListTree() {
      const url = `${API_DOMAIN}${API_PREFIX}/scene/listTree`;
      return requestHelper.getRequestData<IgetListTreeSpace.Model>(url, '720f78bd-fc80-487e-9c29-830c9616085d', this.data2Mock);
  }
}
export const apiSpecialTypeConfigObj = new SpecialTypeConfigApi();