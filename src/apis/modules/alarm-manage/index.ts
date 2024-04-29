import { requestHelper } from "@/apis/base/mapper-helper";
import {
  IgetFindTodayAlarmNumberSpace,
  IgetAlarmingNumberSpace,
  IgetFindAlarmLogPageSpace,
  IgetAlarmSpace,
  IgetFindAlarmTargetDataSpace,
  IpostJudgeAlarmSpace,
  IgetFindHistoryAlarmTrendSpace,
  IgetFindAlarmTargetDataListSpace,
  IgetFindMonitorUnitEquipsSpace,
  IgetArtificialEndAlarmSpace
} from './model';
import { GlobalAPI } from '@/common';

const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class AlarmManageApi {
  data2Mock: boolean = false;

  // 查询今日报警数量|查询今日报警数量-报警管理-报警记录
  getFindTodayAlarmNumber () {
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/findTodayAlarmNumber`;
    return requestHelper.getRequestData<IgetFindTodayAlarmNumberSpace.Model>(url, 'd0722343-5cf2-49b8-ab97-09de29c46176', this.data2Mock);
  }

  // 报警中数据统计|报警中数据统计-报警管理-报警记录
  getAlarmingNumber () {
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/alarmingNumber`;
    return requestHelper.getRequestData<IgetAlarmingNumberSpace.Model>(url, 'd46fc106-cb95-4bd3-b907-ab84d2b4b651', this.data2Mock);
  }

  // 查询报警列表|查询报警列表-报警管理-报警记录
  getFindAlarmLogPage (params: IgetFindAlarmLogPageSpace.RequestParams) {
    const { currentPage, pageSize, regionTypeCode, regionId, monitorUnitName, alarmState, alarmLevel, eventTypeCode, startTime, endTime, alarmTitle, checkStatusCode, monitorUnitId, judgeStatus, judgeType, alarmOrigin, handleOption, selfTagNames,eventId } = params;
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/findAlarmLogPage?currentPage=${currentPage}&pageSize=${pageSize}&regionTypeCode=${regionTypeCode}&regionId=${regionId}&monitorUnitName=${monitorUnitName}&alarmState=${alarmState}&alarmLevel=${alarmLevel}&eventTypeCode=${eventTypeCode}&startTime=${startTime}&endTime=${endTime}&alarmTitle=${alarmTitle}&checkStatusCode=${checkStatusCode}&monitorUnitId=${monitorUnitId}&judgeStatus=${judgeStatus}&judgeType=${judgeType}&alarmOrigin=${alarmOrigin}&handleOption=${handleOption}&selfTagNames=${selfTagNames}&eventId=${eventId}`;
    return requestHelper.getRequestData<IgetFindAlarmLogPageSpace.Model>(url, 'c30470a6-ab33-4ff5-987f-d867ee45e2ff', this.data2Mock);
  }

  // 查询报警详情|查询报警详情-报警管理-报警记录
  getAlarm (id: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/${id}`;
    return requestHelper.getRequestData<IgetAlarmSpace.Model>(url, 'ceaf13dc-e822-4cab-ad1a-100e5001c400', this.data2Mock);
  }

  // 查询指标数据折线图|查询指标数据折线图-报警管理-报警记录
  getFindAlarmTargetData (unitId: string, startTime: string, endTime: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/findAlarmTargetData?unitId=${unitId}&startTime=${startTime}&endTime=${endTime}`;
    return requestHelper.getRequestData<IgetFindAlarmTargetDataSpace.Model>(url, '811b55df-7c64-4446-a35d-2c2aebdd155d', this.data2Mock);
  }

  // 报警研判|报警研判-报警管理-报警记录
  postJudgeAlarm (params: IpostJudgeAlarmSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/judgeAlarm`;
    return requestHelper.postRequestData<IpostJudgeAlarmSpace.Model>(url, 'b3775828-bd72-4249-ba2a-ecaaa09c8d88', this.data2Mock, params);
  }

  // 查询报警趋势|查询报警趋势-报警管理-报警记录
  getFindHistoryAlarmTrend (params: IgetFindHistoryAlarmTrendSpace.RequestParams) {
    const { unitId, timeRange, eventTypeCode, alarmLevel } = params;
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/findHistoryAlarmTrend?unitId=${unitId}&timeRange=${timeRange}&eventTypeCode=${eventTypeCode}&alarmLevel=${alarmLevel}`;
    return requestHelper.getRequestData<IgetFindHistoryAlarmTrendSpace.Model>(url, 'ae8bf63f-b4fd-4480-99b8-77099faad278', this.data2Mock);
  }

  // 查询详情里的指标数据|查询详情里的指标数据-报警管理-报警记录
  getFindAlarmTargetDataList (alarmLogId: string, startTime?: string, endTime?: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/findAlarmTargetDataList?alarmLogId=${alarmLogId}&startTime=${startTime}&endTime=${endTime}`;
    return requestHelper.getRequestData<IgetFindAlarmTargetDataListSpace.Model>(url, '690b71f9-c3de-46f9-bb4f-991fab11a44d', this.data2Mock);
  }

  // 监测点-关联监测设备|监测点-关联监测设备-MonitorUnitController
  getFindMonitorUnitEquips(unitId:string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/findMonitorUnitEquips/${unitId}`;
    return requestHelper.getRequestData<IgetFindMonitorUnitEquipsSpace.Model>(url, '1a396747-3185-42d2-8300-1fb1c165d620', this.data2Mock);
  }

  // 手动消警|手动消警-报警管理-报警记录
  getArtificialEndAlarm(alarmIdList:number[],endAlarmType:number,endAlarmReason:string) {
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/artificialEndAlarm?alarmIdList=${alarmIdList}&endAlarmType=${endAlarmType}&endAlarmReason=${endAlarmReason}`;
    return requestHelper.getRequestData<IgetArtificialEndAlarmSpace.Model>(url, '29b8bc7f-1c82-4091-b20a-4411076faed3', this.data2Mock);
  }
}

export const apiAlarmManageObj = new AlarmManageApi();
