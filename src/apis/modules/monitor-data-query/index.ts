import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetDataPageSpace,IgetRealDataSpace,IgetFactorListSpace,IgetHistoryDataSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class MonitorDataQueryApi {
  data2Mock: boolean = false;
  
  // 数据分页查询|数据分页查询-监测数据查询
  getDataPage(params: IgetDataPageSpace.RequestParams) {
      const {currentPage,pageSize,monitorRegionName,monitorUnitName,monitorEquipName,online} = params;
      const url = `${API_DOMAIN}${API_PREFIX}/monitorDataQuery/dataPage?currentPage=${currentPage}&pageSize=${pageSize}&monitorRegionName=${monitorRegionName}&monitorUnitName=${monitorUnitName}&monitorEquipName=${monitorEquipName}&online=${online}`;
      return requestHelper.getRequestData<IgetDataPageSpace.Model>(url, '379a7d9e-9ca0-4997-9e28-c5fd9727b316', this.data2Mock);
  }
  // 实时监测数据|实时监测数据-监测数据查询
  getRealData(monitorUnitId:number|string) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorDataQuery/realData?monitorUnitId=${monitorUnitId}`;
      return requestHelper.getRequestData<IgetRealDataSpace.Model>(url, 'e4babaea-8c47-4445-bd78-e092acae95aa', this.data2Mock);
  }
  // 监测项下拉选择|监测项下拉选择-监测数据查询
  getFactorList(monitorUnitId:number|string) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorDataQuery/factorList?monitorUnitId=${monitorUnitId}`;
      return requestHelper.getRequestData<IgetFactorListSpace.Model>(url, '864d89e5-1c2f-4d9e-b30d-c7073764a468', this.data2Mock);
  }
  // 历史监测数据|历史监测数据-监测数据查询
  getHistoryData(params: IgetHistoryDataSpace.RequestParams) {
      const {currentPage,pageSize,monitorUnitId,factorCode,collectionStartTime,collectionEndTime} = params;
      const url = `${API_DOMAIN}${API_PREFIX}/monitorDataQuery/historyData?currentPage=${currentPage}&pageSize=${pageSize}&monitorUnitId=${monitorUnitId}&factorCode=${factorCode}&collectionStartTime=${collectionStartTime}&collectionEndTime=${collectionEndTime}`;
      return requestHelper.getRequestData<IgetHistoryDataSpace.Model>(url, '8a802678-be1e-4096-bf4b-c60b6a37907d', this.data2Mock);
  }
}
export const apiMonitorDataQueryObj = new MonitorDataQueryApi();