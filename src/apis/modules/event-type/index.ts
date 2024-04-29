import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetListEventTypeVOPageEventTypeSpace,IpostRemoveEventTypeEventTypeSpace,IpostAddEventTypeEventTypeSpace,IgetFindEventTypePageEventTypeSpace,IgetListEventTypeListVOsEventTypeSpace,IpostModifyEventTypeLevelEventTypeSpace,IpostModifyEventTypeEventTypeSpace,IgetFindEventTypeDetailVOEventTypeSpace,IgetListEventTreeVOsEventTypeSpace,IpostCheckEventTypeHaveChildrenSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class EventTypeApi {
  data2Mock: boolean = false;

  // 根据风险分类分类查询风险分类列表|根据风险分类分类查询风险分类列表-EventTypeController
  getListEventTypeVOPageEventType(params:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/eventType/listEventTypeVOPage?${params}`;
      return requestHelper.getRequestData<IgetListEventTypeVOPageEventTypeSpace.Model>(url, '53db4139-a625-4348-a701-1c720f00139d', this.data2Mock);
  }
  // 根据风险分类Code删除风险分类|根据风险分类Code删除风险分类-EventTypeController
  postRemoveEventTypeEventType(systemCode:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/eventType/removeEventType?systemCode=${systemCode}`;
      return requestHelper.postRequestData<IpostRemoveEventTypeEventTypeSpace.Model>(url, '63fe86ad-f25d-4d37-bd94-48559c225ffe', this.data2Mock, {systemCode});
  }
  // 添加事件/事件分类|添加事件/事件分类-EventTypeController
  postAddEventTypeEventType(params: IpostAddEventTypeEventTypeSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/eventType/addEventType`;
      return requestHelper.postRequestData<IpostAddEventTypeEventTypeSpace.Model>(url, '41245a14-af4a-49b8-8d51-f18b5392bc4f', this.data2Mock, params);
  }
  // 查询所有风险分类的叶子节点|查询所有风险分类的叶子节点-EventTypeController
  getFindEventTypePageEventType(params: string) {
      const url = `${API_DOMAIN}${API_PREFIX}/eventType/findEventTypePage?${params}`;
      return requestHelper.getRequestData<IgetFindEventTypePageEventTypeSpace.Model>(url, 'e33c5327-3f2b-4d74-b8e2-df94c9128e2c', this.data2Mock);
  }
  // 查询风险分类列表（下拉框）|查询风险分类列表（下拉框）-EventTypeController
  getListEventTypeListVOsEventType() {
      const url = `${API_DOMAIN}${API_PREFIX}/eventType/listEventTypeListVOs`;
      return requestHelper.getRequestData<IgetListEventTypeListVOsEventTypeSpace.Model>(url, '45e85eb2-bf16-4352-a034-fa8d6f3257d5', this.data2Mock);
  }
  // 批量修改风险分类等级|批量修改风险分类等级-EventTypeController
  postModifyEventTypeLevelEventType(params: IpostModifyEventTypeLevelEventTypeSpace.RequestParams[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/eventType/modifyEventTypeLevel`;
      return requestHelper.postRequestData<IpostModifyEventTypeLevelEventTypeSpace.Model>(url, '85680a0b-790d-485a-b08c-67362895265a', this.data2Mock, params);
  }
  // 根据事件编码修改事件|根据事件编码修改事件-EventTypeController
  postModifyEventTypeEventType(params: IpostModifyEventTypeEventTypeSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/eventType/modifyEventType`;
      return requestHelper.postRequestData<IpostModifyEventTypeEventTypeSpace.Model>(url, '38cc0c54-9403-431b-bc81-fea17e0fb7b8', this.data2Mock, params);
  }
  // 根据风险分类Code获取事件详情|根据风险分类Code获取事件详情-EventTypeController
  getFindEventTypeDetailVOEventType(systemCode:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/eventType/findEventTypeDetailVO?systemCode=${systemCode}`;
      return requestHelper.getRequestData<IgetFindEventTypeDetailVOEventTypeSpace.Model>(url, 'bbc776d5-f01c-4af1-b78b-f541683dc871', this.data2Mock);
  }
  // 获取风险分类树列表|获取风险分类树列表-EventTypeController
  getListEventTreeVOsEventType() {
      const url = `${API_DOMAIN}${API_PREFIX}/eventType/listEventTreeVOs`;
      return requestHelper.getRequestData<IgetListEventTreeVOsEventTypeSpace.Model>(url, 'adc7023f-d545-40a0-a88e-122da3b3a469', this.data2Mock);
  }
  // 获取风险分类树列表|获取风险分类树列表-EventTypeController
  getListConfigEventTreeVOsEventType() {
    const url = `${API_DOMAIN}${API_PREFIX}/eventType/listConfigEventTreeVOs?useFor=1`;
    return requestHelper.getRequestData<IgetListEventTreeVOsEventTypeSpace.Model>(url, 'adc7023f-d545-40a0-a88e-122da3b3a469', this.data2Mock);
}
// 根据事件类型Code判断是否有下级节点|根据事件类型Code判断是否有下级节点-EventTypeController
postCheckEventTypeHaveChildren(systemCode:string) {
  const url = `${API_DOMAIN}${API_PREFIX}/eventType/checkEventTypeHaveChildren?systemCode=${systemCode}`;
  return requestHelper.getRequestData<IpostCheckEventTypeHaveChildrenSpace.Model>(url, '53695b2c-58fe-41c8-bb97-dcaa4893fe3a', this.data2Mock, {systemCode});
}

  Run(methodName: string, params: any) {
    let result:any = new Promise(() => ({ data: {} }));
    switch (methodName) {

    case "getListEventTypeVOPageEventType":
      {
        const { systemCode } = params;
        result = this.getListEventTypeVOPageEventType(systemCode);
      }
      break;

    case "postRemoveEventTypeEventType":
      {
        const { systemCode } = params;
        result = this.postRemoveEventTypeEventType(systemCode);
      }
      break;

    case "postAddEventTypeEventType":
      result = this.postAddEventTypeEventType(params as IpostAddEventTypeEventTypeSpace.RequestParams);
      break;

    case "getFindEventTypePageEventType":
        result = this.getFindEventTypePageEventType(params);
      break;

    case "getListEventTypeListVOsEventType":
        result = this.getListEventTypeListVOsEventType();
      break;

    case "postModifyEventTypeLevelEventType":
      {
        result = this.postModifyEventTypeLevelEventType(params as IpostModifyEventTypeLevelEventTypeSpace.RequestParams[]);
      }
      break;

    case "postModifyEventTypeEventType":
      result = this.postModifyEventTypeEventType(params as IpostModifyEventTypeEventTypeSpace.RequestParams);
      break;

    case "getFindEventTypeDetailVOEventType":
      {
        const { systemCode } = params;
        result = this.getFindEventTypeDetailVOEventType(systemCode);
      }
      break;

    case "getListEventTreeVOsEventType":
        result = this.getListEventTreeVOsEventType();
      break;

      default:
        break;
    }
    return result;
  }
}
export const apiEventTypeObj = new EventTypeApi();
