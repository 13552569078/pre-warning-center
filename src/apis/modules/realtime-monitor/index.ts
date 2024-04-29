import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostGetTargetDataRealTimePageSpace,IpostGetAccessItemRealTimePageSpace,IpostGetAccessItemDataHistorySpace,IgetGetTargetDataStatsSpace,IpostHistorySpace,IgetGetAccessItemStatsSpace,IgetGetRegionMonitorAccessItemsSpace,IgetGetEquipDetailSpace,IpostGetEquipRealTimePageSpace,IpostGetTraceMultipleTargetDataSpace,IpostGetTraceSimpleTargetDataSpace,IpostGetRegionMonitorChartDataSpace,IgetGetHistoryTargetDataDetailsSpace,IgetGetHistoryTargetDataIdsSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class RealTimeMonitorApi {
  data2Mock: boolean = false;
  
  // 在线监测|在线监测-实时监测
  postGetTargetDataRealTimePage(params: IpostGetTargetDataRealTimePageSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/realTimeMonitor/target/getTargetDataRealTimePage`;
      return requestHelper.postRequestData<IpostGetTargetDataRealTimePageSpace.Model>(url, 'ceb1f980-952f-4741-b1e8-a0adceaa3867', this.data2Mock, params);
  }
  // 接入数据监测-获取监测数据列表|接入数据监测-获取监测数据列表-实时监测
  postGetAccessItemRealTimePage(params: IpostGetAccessItemRealTimePageSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/realTimeMonitor/accessItem/getAccessItemRealTimePage`;
      return requestHelper.postRequestData<IpostGetAccessItemRealTimePageSpace.Model>(url, '4a7e7fa7-e0a7-4dfd-9e5c-72e9394f1269', this.data2Mock, params);
  }
  // 接入数据监测-历史数据|接入数据监测-历史数据-实时监测
  postGetAccessItemDataHistory(params: IpostGetAccessItemDataHistorySpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/realTimeMonitor/accessItem/getAccessItemDataHistory`;
      return requestHelper.postRequestData<IpostGetAccessItemDataHistorySpace.Model>(url, '970eede4-8a82-438b-9339-c7b1ecd09aeb', this.data2Mock, params);
  }
  // 指标数据监测统计信息|指标数据监测统计信息-实时监测
  getGetTargetDataStats() {
      const url = `${API_DOMAIN}${API_PREFIX}/realTimeMonitor/targetData/getTargetDataStats`;
      return requestHelper.getRequestData<IgetGetTargetDataStatsSpace.Model>(url, '38fcbf8c-4f00-4545-8501-19099816fcd7', this.data2Mock);
  }
  // 历史数据|历史数据-实时监测
  postHistory(params: IpostHistorySpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/realTimeMonitor/target/history`;
      return requestHelper.postRequestData<IpostHistorySpace.Model>(url, '93c4709d-31ca-46f6-9d2a-db3a31fd59c8', this.data2Mock, params);
  }
  // 接入数据监测统计信息|接入数据监测统计信息-实时监测
  getGetAccessItemStats() {
      const url = `${API_DOMAIN}${API_PREFIX}/realTimeMonitor/accessItem/getAccessItemStats`;
      return requestHelper.getRequestData<IgetGetAccessItemStatsSpace.Model>(url, 'efaf06b3-dea6-4d2a-a825-e899cc5a8e7c', this.data2Mock);
  }
  // 监测数据-获取监测数据接入数据项详情|监测数据-获取监测数据接入数据项详情-实时监测
  getGetRegionMonitorAccessItems(equipId:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/realTimeMonitor/region/getRegionMonitorAccessItems?equipId=${equipId}`;
      return requestHelper.getRequestData<IgetGetRegionMonitorAccessItemsSpace.Model>(url, 'dda4c3aa-c76a-4c43-ac57-0ef25d79da48', this.data2Mock);
  }
  // 接入数据监测-设备详情|接入数据监测-设备详情-实时监测
  getGetEquipDetail(equipId:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/realTimeMonitor/accessItem/getEquipDetail?equipId=${equipId}`;
      return requestHelper.getRequestData<IgetGetEquipDetailSpace.Model>(url, '43f1b60f-6519-4def-b9c4-11071af54018', this.data2Mock);
  }
  // 监测布控-获取设备列表|监测布控-获取设备列表-实时监测
  postGetEquipRealTimePage(params: IpostGetEquipRealTimePageSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/realTimeMonitor/equip/getEquipRealTimePage`;
      return requestHelper.postRequestData<IpostGetEquipRealTimePageSpace.Model>(url, 'c9387187-2d9f-494f-b33b-ca9d26eb668b', this.data2Mock, params);
  }
  // 复合指标数据项数据溯源|复合指标数据项数据溯源-实时监测
  postGetTraceMultipleTargetData(params: IpostGetTraceMultipleTargetDataSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/realTimeMonitor/target/getTraceMultipleTargetData`;
      return requestHelper.postRequestData<IpostGetTraceMultipleTargetDataSpace.Model>(url, 'b1fecff0-635a-4ca8-abcc-96f205ebf0cc', this.data2Mock, params);
  }
  // 简单指标数据项数据溯源|简单指标数据项数据溯源-实时监测
  postGetTraceSimpleTargetData(params: IpostGetTraceSimpleTargetDataSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/realTimeMonitor/target/getTraceSimpleTargetData`;
      return requestHelper.postRequestData<IpostGetTraceSimpleTargetDataSpace.Model>(url, '566ab0c9-09a6-4c4c-9c00-c6a8070d3ee1', this.data2Mock, params);
  }
  // 监测数据-获取监测数据图表数据|监测数据-获取监测数据图表数据-实时监测
  postGetRegionMonitorChartData(equipId:number,timeFrom:string,timeTo:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/realTimeMonitor/region/getRegionMonitorChartData`;
      return requestHelper.postRequestData<IpostGetRegionMonitorChartDataSpace.Model>(url, 'b67be272-63aa-42d9-a97e-9291d9ccd06d', this.data2Mock, {equipId,timeFrom,timeTo});
  }
  // 获取复合指标数据项单条历史数据对应的指标数据项详情集合|获取复合指标数据项单条历史数据对应的指标数据项详情集合-实时监测
  getGetHistoryTargetDataDetails(dataResultId:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/realTimeMonitor/target/getHistoryTargetDataDetails?dataResultId=${dataResultId}`;
      return requestHelper.getRequestData<IgetGetHistoryTargetDataDetailsSpace.Model>(url, 'e3bbf8e5-69ce-4f8a-96f7-4f029f1dd7b8', this.data2Mock);
  }
  // 获取复合指标数据项单条历史数据对应的指标数据项id集合|获取复合指标数据项单条历史数据对应的指标数据项id集合-实时监测
  getGetHistoryTargetDataIds(dataResultId:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/realTimeMonitor/target/getHistoryTargetDataIds?dataResultId=${dataResultId}`;
      return requestHelper.getRequestData<IgetGetHistoryTargetDataIdsSpace.Model>(url, 'b8e96c8d-e815-41d5-b1c7-8d0c4411625d', this.data2Mock);
  }
}
export const apiRealTimeMonitorObj = new RealTimeMonitorApi();