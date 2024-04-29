import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetFindUnitAlarmHighIncidenceAnalysisSpace,IgetFindAlarmTypeHighIncidenceAnalysisSpace,IgetFindTimeHighIncidenceAnalysisSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class ComprehensiveAnalysisApi {
  data2Mock: boolean = false;

  // 预警地点高发分析|预警地点高发分析-HighIncidenceController
  getFindUnitAlarmHighIncidenceAnalysis(params: IgetFindUnitAlarmHighIncidenceAnalysisSpace.RequestParams) {
    const {eventTypeCodeList,startTime,endTime,alarmOriginList,tenantId} = params;
    const url = `${API_DOMAIN}${API_PREFIX}/highIncidence/findUnitAlarmHighIncidenceAnalysis?eventTypeCodeList=${eventTypeCodeList}&startTime=${startTime}&endTime=${endTime}&alarmOriginList=${alarmOriginList}&tenantId=${tenantId}`;
    return requestHelper.getRequestData<IgetFindUnitAlarmHighIncidenceAnalysisSpace.Model>(url, 'd203193a-e959-452e-8c37-c94eaee7b10f', this.data2Mock);
  }
  // 预警类型高发分析|预警类型高发分析-HighIncidenceController
  getFindAlarmTypeHighIncidenceAnalysis(params: IgetFindAlarmTypeHighIncidenceAnalysisSpace.RequestParams) {
    const {eventTypeCodeList,startTime,endTime,alarmOriginList,tenantId} = params;
    const url = `${API_DOMAIN}${API_PREFIX}/highIncidence/findAlarmTypeHighIncidenceAnalysis?eventTypeCodeList=${eventTypeCodeList}&startTime=${startTime}&endTime=${endTime}&alarmOriginList=${alarmOriginList}&tenantId=${tenantId}`;
    return requestHelper.getRequestData<IgetFindAlarmTypeHighIncidenceAnalysisSpace.Model>(url, '8ed1be2c-f6f9-4b53-82ae-ed82b037abf7', this.data2Mock);
  }
  // 预警时间高发分析|预警时间高发分析-HighIncidenceController
  getFindTimeHighIncidenceAnalysis(params: IgetFindTimeHighIncidenceAnalysisSpace.RequestParams) {
    const {eventTypeCodeList,startTime,endTime,alarmOriginList,tenantId} = params;
    const url = `${API_DOMAIN}${API_PREFIX}/highIncidence/findTimeHighIncidenceAnalysis?eventTypeCodeList=${eventTypeCodeList}&startTime=${startTime}&endTime=${endTime}&alarmOriginList=${alarmOriginList}&tenantId=${tenantId}`;
    return requestHelper.getRequestData<IgetFindTimeHighIncidenceAnalysisSpace.Model>(url, 'e2833ed2-e29b-44bf-96c3-e60aafe7c3cd', this.data2Mock);
  }
}
export const apiComprehensiveAnalysisObj = new ComprehensiveAnalysisApi();
