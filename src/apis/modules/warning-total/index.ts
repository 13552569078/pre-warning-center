import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetFindJudgeAlarmStatisticSpace,IgetFindUnJudgeAlarmStatisticSpace,IgetFindRecentJudgeResultSpace, IgetFindAlarmLogPageStatisticSpace, IpostFindAlarmLogPageStatisticSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class WarningTotalApi {
  data2Mock: boolean = false;

  // 当前研判统计|当前研判统计-报警管理-报警记录
  getFindJudgeAlarmStatistic() {
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/findJudgeAlarmStatistic`;
    return requestHelper.getRequestData<IgetFindJudgeAlarmStatisticSpace.Model>(url, '6849ff1b-f20a-4302-a2a3-1c59fa5f392d', this.data2Mock);
  }
  // 待研判等级统计卡片|待研判等级统计卡片-报警管理-报警记录
  getFindUnJudgeAlarmStatistic() {
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/findUnJudgeAlarmStatistic`;
    return requestHelper.getRequestData<IgetFindUnJudgeAlarmStatisticSpace.Model>(url, '74067706-5827-43cc-9fee-0d80011f920e', this.data2Mock);
  }
  // 近期研判结果统计|近期研判结果统计-报警管理-报警记录
  getFindRecentJudgeResult(startTime:string,endTime:string) {
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/findRecentJudgeResult?startTime=${startTime}&endTime=${endTime}`;
    return requestHelper.getRequestData<IgetFindRecentJudgeResultSpace.Model>(url, 'e6e0a9a6-a746-43c1-b0ee-d41695d1ce87', this.data2Mock);
  }

  // 导出列表数据|导出列表数据-报警管理-报警记录
  postExportList(params: any) {
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/exportList`;
    return requestHelper.postRequestData(url, '23d79507-4a01-475e-932b-c08eb24535c9', this.data2Mock, params);
  }
  // 导出列表数据|导出列表数据-报警管理-实时监测
  postRealExportList(params: any) {
    const url = `${API_DOMAIN}${API_PREFIX}/realTimeMonitor/exportList`;
    return requestHelper.postRequestData(url, '23d79507-4a01-475e-932b-c08eb24535d9', this.data2Mock, params);
  }
  // 查询报警列表统计图表|查询报警列表统计图表-报警管理-报警记录
  getFindAlarmLogPageStatistic(params: IgetFindAlarmLogPageStatisticSpace.RequestParams) {
    const {currentPage,pageSize,regionTypeCode,regionId,monitorUnitName,monitorUnitId,alarmState,alarmLevel,alarmLevels,eventTypeCode,eventTypeCodes,startTime,endTime,alarmTitle,judgeStatus,judgeType,alarmOrigin,handleOption,handleStatus,selfTagNames} = params;
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/findAlarmLogPageStatistic?currentPage=${currentPage}&pageSize=${pageSize}&regionTypeCode=${regionTypeCode}&regionId=${regionId}&monitorUnitName=${monitorUnitName}&monitorUnitId=${monitorUnitId}&alarmState=${alarmState}&alarmLevel=${alarmLevel}&alarmLevels=${alarmLevels}&eventTypeCode=${eventTypeCode}&eventTypeCodes=${eventTypeCodes}&startTime=${startTime}&endTime=${endTime}&alarmTitle=${alarmTitle}&judgeStatus=${judgeStatus}&judgeType=${judgeType}&alarmOrigin=${alarmOrigin}&handleOption=${handleOption}&handleStatus=${handleStatus}&selfTagNames=${selfTagNames}`;
    return requestHelper.getRequestData<IgetFindAlarmLogPageStatisticSpace.Model>(url, '8ecd1a18-9566-4e71-aad2-cd74e0c67782', this.data2Mock);
  }

  // 查询指标数据采集值列表统计图表|查询指标数据采集值列表统计图表-实时监测
  postFindAlarmLogPageStatistic(params: IpostFindAlarmLogPageStatisticSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/realTimeMonitor/findAlarmLogPageStatistic`;
    return requestHelper.postRequestData<IpostFindAlarmLogPageStatisticSpace.Model>(url, 'f5a47ec5-d31c-428d-9010-2db83f1f05a6', this.data2Mock, params);
  }
}
export const apiWarningTotalObj = new WarningTotalApi();
