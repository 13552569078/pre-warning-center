import { requestHelper } from "@/apis/base/mapper-helper";
import { IdeleteSpace, IgetFacilityBridgeSpace, IaddSpace, IpostPageListSpace, IdeleteFSpace, IpostUpdateSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class FacilityBridgeApi {
    data2Mock: boolean = false;

    // 批量删除建筑工地|批量删除建筑工地-设施-桥梁设施
    delete(ids: []) {
        const url = `${API_DOMAIN}${API_PREFIX}/facilityBridge/delete`;
        return requestHelper.postRequestData<IdeleteSpace.Model>(url, '9e2ba3da-4d04-416c-a8be-b89bec8a60e5', this.data2Mock, { ids });
    }
    // 桥梁设施详情|桥梁设施详情-设施-桥梁设施
    getFacilityBridge(id: number) {
        const url = `${API_DOMAIN}${API_PREFIX}/facilityBridge/${id}`;
        return requestHelper.getRequestData<IgetFacilityBridgeSpace.Model>(url, '564e12c5-893c-4756-9897-a1f93cff7537', this.data2Mock);
    }
    // 新增桥梁设施|新增桥梁设施-设施-桥梁设施
    add(params: IaddSpace.RequestParams) {
        const url = `${API_DOMAIN}${API_PREFIX}/facilityBridge/add`;
        return requestHelper.postRequestData<IaddSpace.Model>(url, '3a842063-d702-4428-8a40-08fc5e138777', this.data2Mock, params);
    }
    // 分页查询桥梁设施列表|分页查询桥梁设施列表-设施-桥梁设施
    postPageList(params: IpostPageListSpace.RequestParams) {
        const url = `${API_DOMAIN}${API_PREFIX}/facilityBridge/pageList`;
        return requestHelper.postRequestData<IpostPageListSpace.Model>(url, 'e0ef3a0a-91e8-4671-8cd3-446f930f8ccc', this.data2Mock, params);
    }
    // 删除建筑工地|删除建筑工地-设施-桥梁设施
    deleteF(id: number) {
        const url = `${API_DOMAIN}${API_PREFIX}/facilityBridge/delete/${id}`;
        return requestHelper.deleteRequestData<IdeleteFSpace.Model>(url, '8b1f377c-6e72-4ca1-9e5b-646140289f8c', this.data2Mock);
    }
    // 更新桥梁设施|更新桥梁设施-设施-桥梁设施
    postUpdate(params: IpostUpdateSpace.RequestParams) {
        const url = `${API_DOMAIN}${API_PREFIX}/facilityBridge/update`;
        return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, 'c0d40d35-0fb4-4dba-bb38-30abc8ab4306', this.data2Mock, params);
    }
}
export const apiFacilityBridgeObj = new FacilityBridgeApi();