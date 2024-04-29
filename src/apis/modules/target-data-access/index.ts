import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostPageSpace, IdeleteSpace, IlistSpace, IpostAddMultipleTargetDataSpace, IpostUpdateSimpleTargetDataSpace, IgetDetailSpace, IpostUpdateMultipleTargetDataSpace, IpostAddSimpleTargetDataSpace, IpostAdjustThresholdLevelSpace, IgetTargetThresholdLevelVOListSpace,IpostBatchAdjustThresholdLevelSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class TargetDataApi {
    data2Mock: boolean = false;

    // 分页查询指标数据项|分页查询指标数据项-指标数据接入
    postPage(params: IpostPageSpace.RequestParams) {
        const url = `${API_DOMAIN}${API_PREFIX}/targetData/page`;
        return requestHelper.postRequestData<IpostPageSpace.Model>(url, '8e759d60-ab9f-429c-8b94-6aaaeef817d6', this.data2Mock, params);
    }
    // 删除指标数据项|删除指标数据项-指标数据接入
    delete(targetDataId: number) {
        const url = `${API_DOMAIN}${API_PREFIX}/targetData/delete?targetDataId=${targetDataId}`;
        return requestHelper.postRequestData<IdeleteSpace.Model>(url, '8fec71be-8864-4aa7-bfde-3fac9125fc39', this.data2Mock);
    }
    // 查询指标数据项列表|查询指标数据项列表-指标数据接入
    list(targetId: number) {
        const url = `${API_DOMAIN}${API_PREFIX}/targetData/list`;
        return requestHelper.postRequestData<IlistSpace.Model>(url, '00084cf3-c186-417d-b81d-8ff078f5b7b1', this.data2Mock, { targetId });
    }
    // 新增复合指标数据项|新增复合指标数据项-指标数据接入
    postAddMultipleTargetData(params: IpostAddMultipleTargetDataSpace.RequestParams) {
        const url = `${API_DOMAIN}${API_PREFIX}/targetData/addMultipleTargetData`;
        return requestHelper.postRequestData<IpostAddMultipleTargetDataSpace.Model>(url, '51044848-f0bc-4171-94d8-6ed466e8f7a2', this.data2Mock, params);
    }
    // 编辑简单指标数据项|编辑简单指标数据项-指标数据接入
    postUpdateSimpleTargetData(params: IpostUpdateSimpleTargetDataSpace.RequestParams) {
        const url = `${API_DOMAIN}${API_PREFIX}/targetData/updateSimpleTargetData`;
        return requestHelper.postRequestData<IpostUpdateSimpleTargetDataSpace.Model>(url, 'c779fd7f-1b11-4b7d-b265-7281e7553a78', this.data2Mock, params);
    }
    // 查询指标数据项详情|查询指标数据项详情-指标数据接入
    getDetail(targetDataId: string) {
        const url = `${API_DOMAIN}${API_PREFIX}/targetData/detail?targetDataId=${targetDataId}`;
        return requestHelper.getRequestData<IgetDetailSpace.Model>(url, 'ce8d66f9-79c0-48f3-aa15-2f4bef93e30a', this.data2Mock);
    }
    // 编辑复合指标数据项|编辑复合指标数据项-指标数据接入
    postUpdateMultipleTargetData(params: IpostUpdateMultipleTargetDataSpace.RequestParams) {
        const url = `${API_DOMAIN}${API_PREFIX}/targetData/updateMultipleTargetData`;
        return requestHelper.postRequestData<IpostUpdateMultipleTargetDataSpace.Model>(url, 'e2c0054b-a19e-4833-86d4-51f5b450ce8a', this.data2Mock, params);
    }
    // 批量新增基础指标数据项|批量新增基础指标数据项-指标数据接入
    postAddSimpleTargetData(simpleTargetParams: any[], targetId: number) {
        const url = `${API_DOMAIN}${API_PREFIX}/targetData/addSimpleTargetData`;
        return requestHelper.postRequestData<IpostAddSimpleTargetDataSpace.Model>(url, 'ff8404e1-f7b3-46b0-91d0-713b294249b7', this.data2Mock, { simpleTargetParams, targetId });
    }

    // 调整阈值|调整阈值-指标数据接入
    postAdjustThresholdLevel(thresholdLevelParamList: any[], targetDataId: string) {
        const url = `${API_DOMAIN}${API_PREFIX}/targetData/adjustThresholdLevel`;
        return requestHelper.postRequestData<IpostAdjustThresholdLevelSpace.Model>(url, 'f5ce65e1-d7cb-40af-b95b-7b7909559706', this.data2Mock, { thresholdLevelParamList, targetDataId });
    }

      // 查询指标阈值等级|查询指标阈值等级-TargetInfoController
    getTargetThresholdLevelVOList(targetId:string) {
        const url = `${API_DOMAIN}${API_PREFIX}/targetInfo/targetThresholdLevelVOList?targetId=${targetId}`;
        return requestHelper.getRequestData<IgetTargetThresholdLevelVOListSpace.Model>(url, 'bee80f96-ac5a-473c-8de5-d9ccd6dd1874', this.data2Mock);
    }
    // 批量指标阈值维护|批量指标阈值维护-指标数据接入
    postBatchAdjustThresholdLevel(thresholdLevelParamList:any[],targetId:number|string,targetDataIds:string[]) {
        const url = `${API_DOMAIN}${API_PREFIX}/targetData/batchAdjustThresholdLevel`;
        return requestHelper.postRequestData<IpostBatchAdjustThresholdLevelSpace.Model>(url, 'ef472365-1f24-49a3-836c-806d6f3fc2f7', this.data2Mock, {thresholdLevelParamList,targetId,targetDataIds});
    }
}
export const apiTargetDataObj = new TargetDataApi();
 