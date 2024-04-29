import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetFindTimeHighIncidenceAnalysisSpace,IgetFindUnitAlarmHighIncidenceAnalysisSpace,IgetFindAlarmTypeHighIncidenceAnalysisSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class AlarmHighIncidenceApi {
  data2Mock: boolean = false;
  
  // 报警时间高发分析|报警时间高发分析-YgfHighIncidenceAnalysisController
  getFindTimeHighIncidenceAnalysis(params: IgetFindTimeHighIncidenceAnalysisSpace.RequestParams) {
      const {eventTypeCodeList,areaCodeList,startTime,endTime,alarmOriginList,tenantId} = params;
      const url = `${API_DOMAIN}${API_PREFIX}/ygfHighIncidence/findTimeHighIncidenceAnalysis?eventTypeCodeList=${eventTypeCodeList}&areaCodeList=${areaCodeList}&startTime=${startTime}&endTime=${endTime}&alarmOriginList=${alarmOriginList}&tenantId=${tenantId}`;
      return requestHelper.getRequestData<IgetFindTimeHighIncidenceAnalysisSpace.Model>(url, '21ecb853-46ae-451f-ae51-5ab07961af7b', this.data2Mock);
  }
  // 报警地点高发分析|报警地点高发分析-YgfHighIncidenceAnalysisController
  getFindUnitAlarmHighIncidenceAnalysis(params: IgetFindUnitAlarmHighIncidenceAnalysisSpace.RequestParams) {
      const {eventTypeCodeList,areaCodeList,startTime,endTime,alarmOriginList,tenantId} = params;
      const url = `${API_DOMAIN}${API_PREFIX}/ygfHighIncidence/findUnitAlarmHighIncidenceAnalysis?eventTypeCodeList=${eventTypeCodeList}&areaCodeList=${areaCodeList}&startTime=${startTime}&endTime=${endTime}&alarmOriginList=${alarmOriginList}&tenantId=${tenantId}`;
      return requestHelper.getRequestData<IgetFindUnitAlarmHighIncidenceAnalysisSpace.Model>(url, '82a6b694-5490-4a7b-b800-3f8209f19697', this.data2Mock);
  }
  // 报警类型高发分析|报警类型高发分析-YgfHighIncidenceAnalysisController
  getFindAlarmTypeHighIncidenceAnalysis(params: IgetFindAlarmTypeHighIncidenceAnalysisSpace.RequestParams) {
      const {eventTypeCodeList,areaCodeList,startTime,endTime,alarmOriginList,tenantId} = params;
      const url = `${API_DOMAIN}${API_PREFIX}/ygfHighIncidence/findAlarmTypeHighIncidenceAnalysis?eventTypeCodeList=${eventTypeCodeList}&areaCodeList=${areaCodeList}&startTime=${startTime}&endTime=${endTime}&alarmOriginList=${alarmOriginList}&tenantId=${tenantId}`;
      return requestHelper.getRequestData<IgetFindAlarmTypeHighIncidenceAnalysisSpace.Model>(url, 'eac3b6a5-93aa-4c38-9ecf-5671045e1f87', this.data2Mock);
  }
}
export const apiAlarmHighIncidenceObj = new AlarmHighIncidenceApi();