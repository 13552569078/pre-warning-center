import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetListMockDatasSpace, IpostAddMockDataSpace, IpostMockDataSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class FakeDataApi {
  data2Mock: boolean = false;

  // 模拟数据列表|模拟数据列表-模拟数据相关接口
  getListMockDatas (accessItemId: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/mockData/listMockDatas?accessItemId=${accessItemId}`;
    return requestHelper.getRequestData<IgetListMockDatasSpace.Model>(url, 'c38e74cc-936e-416d-ad80-7086cd540df4', this.data2Mock);
  }
  // 添加模拟数据|添加模拟数据-模拟数据相关接口
  postAddMockData (accessItemId: number, dataTitle: string, dataValue: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/mockData/addMockData`;
    return requestHelper.postRequestData<IpostAddMockDataSpace.Model>(url, '5330e060-388e-4cf2-86ac-fb60f2a30b55', this.data2Mock, { accessItemId, dataTitle, dataValue });
  }
  postMockData (data: IpostMockDataSpace.DataWrapper) {
    const url = `${API_DOMAIN}${API_PREFIX}/dataAccess/httpData`
    return requestHelper.postRequestData<IpostMockDataSpace.Model>(url, '5330e060-388e-4cf2-86ac-fb60f2a30b55', this.data2Mock, data);
  }
}
export const apiFakeDataObj = new FakeDataApi();