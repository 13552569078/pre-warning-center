import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetFindTargetInfoSpace, IgetListTargetInfoListVOsSpace, IgetFindTargetInfoNameVerifySpace, IgetRemoveTargetInfoSpace, IpostAddTargetInfoSpace, IpostModifyTargetInfoSpace, IgetFindTargetInfoPageSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class TargetInfoControllerApi {
  data2Mock: boolean = false;

  // 查询指标详情|查询指标详情-TargetInfoController
  getFindTargetInfo (targetId: number | string) {
    const url = `${API_DOMAIN}${API_PREFIX}/targetInfo/findTargetInfo?targetId=${targetId}`;
    return requestHelper.getRequestData<IgetFindTargetInfoSpace.Model>(url, 'deb6640e-a6eb-4b5e-9785-d6a9c8a43a44', this.data2Mock);
  }
  // 查询指标列表(不分页)|查询指标列表(不分页)-TargetInfoController
  getListTargetInfoListVOs (targetInfoName: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/targetInfo/listTargetInfoListVOs?targetInfoName=${targetInfoName}`;
    return requestHelper.getRequestData<IgetListTargetInfoListVOsSpace.Model>(url, '97e37e56-7fa8-4b6f-8a8e-a9342fcac41d', this.data2Mock);
  }
  // 指标名称验重|指标名称验重-TargetInfoController
  getFindTargetInfoNameVerify (targetInfoName: string, targetInfoId: number | string) {
    const url = `${API_DOMAIN}${API_PREFIX}/targetInfo/findTargetInfoNameVerify?targetInfoName=${targetInfoName}&targetInfoId=${targetInfoId}`;
    return requestHelper.getRequestData<IgetFindTargetInfoNameVerifySpace.Model>(url, 'f0b7e45a-9653-4d95-b247-01188080d0a4', this.data2Mock);
  }
  // 删除指标信息|删除指标信息-TargetInfoController
  getRemoveTargetInfo (targetInfoId: number | string) {
    const url = `${API_DOMAIN}${API_PREFIX}/targetInfo/removeTargetInfo?targetInfoId=${targetInfoId}`;
    return requestHelper.getRequestData<IgetRemoveTargetInfoSpace.Model>(url, '0476719d-24d2-46d5-ad40-4539c12cb341', this.data2Mock);
  }
  // 添加指标|添加指标-TargetInfoController
  postAddTargetInfo (params: IpostAddTargetInfoSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/targetInfo/addTargetInfo`;
    return requestHelper.postRequestData<IpostAddTargetInfoSpace.Model>(url, '0a372857-7358-4ea8-bf0a-636f8ee9012f', this.data2Mock, params);
  }
  // 修改指标|修改指标-TargetInfoController
  postModifyTargetInfo (params: IpostModifyTargetInfoSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/targetInfo/modifyTargetInfo`;
    return requestHelper.postRequestData<IpostModifyTargetInfoSpace.Model>(url, '33c78de5-4bc2-46a3-b64a-4a8ff39f97b1', this.data2Mock, params);
  }
  // 查询指标列表|查询指标列表-TargetInfoController
  getFindTargetInfoPage (params: IgetFindTargetInfoPageSpace.RequestParams) {
    const { currentPage, pageSize, targetName, dataType, targetTypeCode, targetFrequencyType } = params;
    const url = `${API_DOMAIN}${API_PREFIX}/targetInfo/findTargetInfoPage?currentPage=${currentPage}&pageSize=${pageSize}&targetName=${targetName}&dataType=${dataType}&targetTypeCode=${targetTypeCode}&targetFrequencyType=${targetFrequencyType}`;
    return requestHelper.getRequestData<IgetFindTargetInfoPageSpace.Model>(url, '66e694ad-6e8c-4ec1-85bd-48a6d5f69a30', this.data2Mock);
  }
}
export const apiTargetInfoControllerObj = new TargetInfoControllerApi();
