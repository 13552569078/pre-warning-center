import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetListTargetTreeSpace,IgetRemoveTargetTypeSpace,IpostAddTargetTypeSpace,IgetListTargetTypeTreeSpace,IpostModifyTargetTypeSpace,IgetFindTargetTypeDetailSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
 class TargetTypeControllerApi {
    data2Mock: boolean = false;
    
    // 查询指标树|查询指标树-TargetTypeController
    getListTargetTree(params: IgetListTargetTreeSpace.RequestParams) {
        const {targetFrequency, dataType }= params
        const url = `${API_DOMAIN}${API_PREFIX}/targetType/listTargetTree?targetFrequency=${targetFrequency}&dataType=${dataType}`;
        return requestHelper.getRequestData<IgetListTargetTreeSpace.Model>(url, '5ae60a0e-0daf-4bac-95df-d16d3584cf61', this.data2Mock);
    }
    // 根据指标分组类型id删除指标分组|根据指标分组类型id删除指标分组-TargetTypeController
    getRemoveTargetType(targetTypeId:number) {
        const url = `${API_DOMAIN}${API_PREFIX}/targetType/removeTargetType?targetTypeId=${targetTypeId}`;
        return requestHelper.getRequestData<IgetRemoveTargetTypeSpace.Model>(url, 'd018c070-7f73-4179-889c-25e3cdbf2758', this.data2Mock);
    }
    // 添加指标分组|添加指标分组-TargetTypeController
    postAddTargetType(params: IpostAddTargetTypeSpace.RequestParams) {
        const url = `${API_DOMAIN}${API_PREFIX}/targetType/addTargetType`;
        return requestHelper.postRequestData<IpostAddTargetTypeSpace.Model>(url, 'f59cf4ad-1089-48d2-8fa8-69af691348f6', this.data2Mock, params);
    }
    // 查询指标分组树|查询指标分组树-TargetTypeController
    getListTargetTypeTree() {
        const url = `${API_DOMAIN}${API_PREFIX}/targetType/listTargetTypeTree`;
        return requestHelper.getRequestData<IgetListTargetTypeTreeSpace.Model>(url, '5159d073-909d-4e38-8162-01f860b646f7', this.data2Mock);
    }
    // 修改指标分组|修改指标分组-TargetTypeController
    postModifyTargetType(params: IpostModifyTargetTypeSpace.RequestParams) {
        const url = `${API_DOMAIN}${API_PREFIX}/targetType/modifyTargetType`;
        return requestHelper.postRequestData<IpostModifyTargetTypeSpace.Model>(url, '5f9d3c07-ef3b-458d-ab42-cddf0e41ee86', this.data2Mock, params);
    }
    // 根据指标分组id查询指标分组|根据指标分组id查询指标分组-TargetTypeController
    getFindTargetTypeDetail(targetTypeId:number|string) {
        const url = `${API_DOMAIN}${API_PREFIX}/targetType/findTargetTypeDetail?targetTypeId=${targetTypeId}`;
        return requestHelper.getRequestData<IgetFindTargetTypeDetailSpace.Model>(url, 'a9d2a81f-95de-443e-ae7c-c67c23517aac', this.data2Mock);
    }
  }
  export const apiTargetTypeControllerObj = new TargetTypeControllerApi();
      