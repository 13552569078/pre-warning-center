import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostUpdateSpace, IgetCheckCodeIfExistSpace, IgetCheckNameIfExistSpace, IdeleteTSpace, IgetCheckTagInfoHasReferenceSpace, IaddSpace, IpostPageSpace, IgetDetailSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class TagClassificationApi {
    data2Mock: boolean = false;

    // 查看标签是否已被引用|查看标签是否已被引用-标签管理
    getCheckTagInfoHasReference(tagInfoId: string) {
        const url = `${API_DOMAIN}${API_PREFIX}/tag/checkTagInfoHasReference?tagInfoId=${tagInfoId}`;
        return requestHelper.getRequestData<IgetCheckTagInfoHasReferenceSpace.Model>(url, '21862138-6ecd-42c0-aaf7-e0fc936c40cf', this.data2Mock);
    }
    // 新增标签|新增标签-标签管理
    add(params: IaddSpace.RequestParams) {
        const url = `${API_DOMAIN}${API_PREFIX}/tag/add`;
        return requestHelper.postRequestData<IaddSpace.Model>(url, '0b0164d1-db36-4094-9140-872cd7c8baa8', this.data2Mock, params);
    }
    // 分页查询标签|分页查询标签-标签管理
    postPage(params: IpostPageSpace.RequestParams) {
        const url = `${API_DOMAIN}${API_PREFIX}/tag/page`;
        return requestHelper.postRequestData<IpostPageSpace.Model>(url, 'a78855c7-47e1-4544-9ff2-1fd94e9b6767', this.data2Mock, params);
    }
    // 查看标签详情|查看标签详情-标签管理
    getDetail(tagInfoId: string) {
        const url = `${API_DOMAIN}${API_PREFIX}/tag/detail?tagInfoId=${tagInfoId}`;
        return requestHelper.getRequestData<IgetDetailSpace.Model>(url, '62f88029-ad77-4918-8bf3-624f0119e66c', this.data2Mock);
    }
    // 更新标签|更新标签-标签管理
    postUpdate(params: IpostUpdateSpace.RequestParams) {
        const url = `${API_DOMAIN}${API_PREFIX}/tag/update`;
        return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, 'c68554e8-f8bd-4c23-a636-2656edf69771', this.data2Mock, params);
    }
    // 查看标签分类标识是否存在|查看标签分类标识是否存在-标签管理
    getCheckCodeIfExist(tagCode: string, tagInfoId: string) {
        const url = `${API_DOMAIN}${API_PREFIX}/tag/checkCodeIfExist?tagCode=${tagCode}&tagInfoId=${tagInfoId}`;
        return requestHelper.getRequestData<IgetCheckCodeIfExistSpace.Model>(url, '7de0b4c8-1483-4bb6-8ae3-263929bf2558', this.data2Mock);
    }
    // 查看标签分类名称是否存在|查看标签分类名称是否存在-标签管理
    getCheckNameIfExist(tagName: string, tagInfoId: string) {
        const url = `${API_DOMAIN}${API_PREFIX}/tag/checkNameIfExist?tagName=${tagName}&tagInfoId=${tagInfoId}`;
        return requestHelper.getRequestData<IgetCheckNameIfExistSpace.Model>(url, '2462db88-c991-4d83-88ca-a3bf36750af3', this.data2Mock);
    }
    // 删除标签|删除标签-标签管理
    deleteT(tagInfoId: string) {
        const url = `${API_DOMAIN}${API_PREFIX}/tag/delete/${tagInfoId}`;
        return requestHelper.deleteRequestData<IdeleteTSpace.Model>(url, '6b0b9b6f-2714-433d-ab6e-6d7206581520', this.data2Mock);
    }
}
export const apiTagClassificationObj = new TagClassificationApi();