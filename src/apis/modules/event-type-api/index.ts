import { requestHelper } from "@/apis/base/mapper-helper";
import { EventTypeList, EventTypeTree, EventTypeDetail } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class EventTypeApi {
  data2Mock: boolean = false;

  listAll(): Promise<EventTypeList.Model> {
    const url = `${API_DOMAIN}${API_PREFIX}/eventType/listEventTypeListVOs`;
    return requestHelper.getRequestData<EventTypeList.Model>(url, '1cc66fa7-50c8-456c-8f97-31abba54a63c', this.data2Mock)
  }
  tree(useFor?: number): Promise<EventTypeTree.Model> {
    const url = `${API_DOMAIN}${API_PREFIX}/eventType/listEventTreeVOs${useFor ? `?useFor=${useFor}` : ''}`;
    return requestHelper.getRequestData<EventTypeTree.Model>(url, '1cc66fa7-50c8-456c-8f97-31abba54a63c', this.data2Mock)
  }
  detail(systemCode: string): Promise<EventTypeDetail.Model> {
    const url = `${API_DOMAIN}${API_PREFIX}/eventType/findEventTypeDetailVO?systemCode=${systemCode}`;
    return requestHelper.getRequestData<EventTypeDetail.Model>(url, '1cc66fa7-50c8-456c-8f97-31abba54a63c', this.data2Mock)
  }
}
export const eventTypeApiObj = new EventTypeApi();