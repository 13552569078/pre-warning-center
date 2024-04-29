import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetAlarmStatisticSpace,IgetFindRecentAlarmNumberStatisticsSpace,IgetFindAlarmLevelStatisticsSpace,IgetFindRecentAccessDataNumberStatisticsSpace,IgetFindAlarmStageStatisticsSpace,IgetMonitorStatisticSpace,IgetFindHomePageDataStatisticSpace,IgetFindRecentAlarmListSpace,IgetFindMonitorRegionUnitStatisticSpace,IgetFindRecentCountTimeSpace, IgetFindRecentDataTargetResultNumberStatisticsSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class HomePageApi {
  data2Mock: boolean = false;

  // 预警数据统计|预警数据统计-工作台-首页
  getAlarmStatistic() {
      const url = `${API_DOMAIN}${API_PREFIX}/homepage/alarmStatistic`;
      return requestHelper.getRequestData<IgetAlarmStatisticSpace.Model>(url, '525e8ba7-f7c4-4fe7-89f7-47871a268197', this.data2Mock);
  }
  // 按日期统计报警信息|按日期统计报警信息-工作台-首页
  getFindRecentAlarmNumberStatistics() {
      const url = `${API_DOMAIN}${API_PREFIX}/homepage/findRecentAlarmNumberStatistics`;
      return requestHelper.getRequestData<IgetFindRecentAlarmNumberStatisticsSpace.Model>(url, 'e0668dee-9e72-47d4-a3ef-1a7e79010612', this.data2Mock);
  }
  // 按报警等级统计报警|按报警等级统计报警-工作台-首页
  getFindAlarmLevelStatistics() {
      const url = `${API_DOMAIN}${API_PREFIX}/homepage/findAlarmLevelStatistics`;
      return requestHelper.getRequestData<IgetFindAlarmLevelStatisticsSpace.Model>(url, '68fe388f-9cd8-4ebc-937b-60280fbf0660', this.data2Mock);
  }
  // 查询最近15天接入数据|查询最近15天接入数据-工作台-首页
  getFindRecentAccessDataNumberStatistics() {
      const url = `${API_DOMAIN}${API_PREFIX}/homepage/findRecentAccessDataNumberStatistics`;
      return requestHelper.getRequestData<IgetFindRecentAccessDataNumberStatisticsSpace.Model>(url, '4d0ed4bd-cfca-491c-97f3-72e41551c77b', this.data2Mock);
  }
  // 按报警阶段统计报警|按报警阶段统计报警-工作台-首页
  getFindAlarmStageStatistics() {
      const url = `${API_DOMAIN}${API_PREFIX}/homepage/findAlarmStageStatistics`;
      return requestHelper.getRequestData<IgetFindAlarmStageStatisticsSpace.Model>(url, 'dfd9b9ea-2f50-4620-907d-e010cea6e831', this.data2Mock);
  }
  // 监测布控统计|监测布控统计-工作台-首页
  getMonitorStatistic() {
      const url = `${API_DOMAIN}${API_PREFIX}/homepage/monitorStatistic`;
      return requestHelper.getRequestData<IgetMonitorStatisticSpace.Model>(url, '73828d02-ebd6-4c73-913c-049b80bb2ffd', this.data2Mock);
  }
  // 首页基础数据统计|首页基础数据统计-工作台-首页
  getFindHomePageDataStatistic() {
      const url = `${API_DOMAIN}${API_PREFIX}/homepage/findHomePageDataStatistic`;
      return requestHelper.getRequestData<IgetFindHomePageDataStatisticSpace.Model>(url, 'b3c8a9b6-cf30-463a-ae16-6e93ae3c286b', this.data2Mock);
  }
  // 查询最近5条报警|查询最近5条报警-工作台-首页
  getFindRecentAlarmList() {
      const url = `${API_DOMAIN}${API_PREFIX}/homepage/findRecentAlarmList`;
      return requestHelper.getRequestData<IgetFindRecentAlarmListSpace.Model>(url, '244c1d98-6103-4ee0-bd87-a831c5c45fd9', this.data2Mock);
  }
  // 监测主体信息统计|监测主体信息统计-工作台-首页
  getFindMonitorRegionUnitStatistic() {
      const url = `${API_DOMAIN}${API_PREFIX}/homepage/findMonitorRegionUnitStatistic`;
      return requestHelper.getRequestData<IgetFindMonitorRegionUnitStatisticSpace.Model>(url, 'f895d0ec-f946-4166-9490-0131141c1c3c', this.data2Mock);
  }
   // 接入数据总数时间
  getFindRecentCountTime() {
    const url = `${API_DOMAIN}${API_PREFIX}/dataAccessItemCount/findRecentCountTime`;
    return requestHelper.getRequestData<IgetFindRecentCountTimeSpace.Model>(url, '73828d02-ebd6-4c73-913c-049b80bb2ffd', this.data2Mock);
  }
  // 指标接入数据时间
  getTatgetCountTime() {
    const url = `${API_DOMAIN}${API_PREFIX}/dataTargetDataResultCount/findRecentCountTime`;
    return requestHelper.getRequestData<IgetFindRecentCountTimeSpace.Model>(url, '73828d02-ebd6-4c73-913c-049b80bb2ffd', this.data2Mock);
  }
  // 近15日指标数据统计|近15日指标数据统计-工作台-首页
  getFindRecentDataTargetResultNumberStatistics() {
    const url = `${API_DOMAIN}${API_PREFIX}/homepage/findRecentDataTargetResultNumberStatistics`;
    return requestHelper.getRequestData<IgetFindRecentDataTargetResultNumberStatisticsSpace.Model>(url, '770ec174-e5ba-431f-a354-7ef974a775bc', this.data2Mock);
  }
}
export const apiHomePageObj = new HomePageApi();
