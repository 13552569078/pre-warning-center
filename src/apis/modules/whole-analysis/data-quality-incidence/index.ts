import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetFindAlarmQualitySpace,IpostFindEventNotifyPageSpace,IgetFindAlarmTrendSpace,IgetFindTodayAlarmQualitySpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class DataQualityIncidenceApi {
  data2Mock: boolean = false;
  
  // 报警质量统计|报警质量统计-报警质量分析api
  getFindAlarmQuality() {
      const url = `${API_DOMAIN}${API_PREFIX}/YgfAlarmQualityAnalysis/findAlarmQuality`;
      return requestHelper.getRequestData<IgetFindAlarmQualitySpace.Model>(url, 'ba23b2b8-2263-4fd6-a144-ddb98a492a9e', this.data2Mock);
  }
  // 报警通知-报警通知列表(分页)|报警通知-报警通知列表(分页)-运管服报警信息
  postFindEventNotifyPage(params: IpostFindEventNotifyPageSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/YgfAlarmQualityAnalysis/findEventInfoPage`;
      return requestHelper.postRequestData<IpostFindEventNotifyPageSpace.Model>(url, '5b4e7573-4c4a-4334-bcc6-fc1fd7ef9b47', this.data2Mock, params);
  }
  // 报警趋势|报警趋势-报警质量分析api
  getFindAlarmTrend() {
      const url = `${API_DOMAIN}${API_PREFIX}/YgfAlarmQualityAnalysis/findAlarmTrend`;
      return requestHelper.getRequestData<IgetFindAlarmTrendSpace.Model>(url, '579fc9b7-35a5-454e-9db4-beb8871ca04c', this.data2Mock);
  }
  // 今日报警质量统计|今日报警质量统计-报警质量分析api
  getFindTodayAlarmQuality() {
      const url = `${API_DOMAIN}${API_PREFIX}/YgfAlarmQualityAnalysis/findTodayAlarmQuality`;
      return requestHelper.getRequestData<IgetFindTodayAlarmQualitySpace.Model>(url, 'ede5cf9a-0a0a-409f-9c53-e8e33f9a2912', this.data2Mock);
  }
}
export const apiDataQualityIncidenceObj = new DataQualityIncidenceApi();