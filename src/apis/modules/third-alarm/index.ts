import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostUpdateAlarmSpace,IpostAddAlarmSpace,IdeleteTSpace,IpostImportAlarmListSpace,IgetFindAlarmLogPageSpace, IgetAlarmSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class ThridAlarmApi {
  data2Mock: boolean = false;
  
  // 编辑预警|编辑预警-第三方预警
  postUpdateAlarm(params: IpostUpdateAlarmSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/thirdAlarm/updateAlarm`;
      return requestHelper.postRequestData<IpostUpdateAlarmSpace.Model>(url, '5d02b95e-8d04-48e6-b5c7-e0202bad9b79', this.data2Mock, params);
  }
  // 手工新建预警|手工新建预警-第三方预警
  postAddAlarm(params: IpostAddAlarmSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/thirdAlarm/addAlarm`;
      return requestHelper.postRequestData<IpostAddAlarmSpace.Model>(url, '8dc4f500-3570-4878-b1b6-de744dfaf1a5', this.data2Mock, params);
  }
  // 外部预警-删除|外部预警-删除-第三方预警
  deleteT(id:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/thirdAlarm/delete/${id}`;
      return requestHelper.deleteRequestData<IdeleteTSpace.Model>(url, '7c773aba-efb7-4020-9542-ce7afed0ebc9', this.data2Mock);
  }
  // 导入预警列表|导入预警列表-第三方预警
  postImportAlarmList() {
      const url = `${API_DOMAIN}${API_PREFIX}/thirdAlarm/importAlarmList`;
      return requestHelper.postRequestData<IpostImportAlarmListSpace.Model>(url, '3adf1352-e554-4d98-8792-0163e1854e4a', this.data2Mock, {});
  }
  // 查询预警列表|查询预警列表-第三方预警
  getFindAlarmLogPage(params: IgetFindAlarmLogPageSpace.RequestParams) {
      const {currentPage,pageSize,regionTypeCode,regionId,monitorUnitName,monitorUnitId,alarmState,alarmLevels,eventTypeCodes,startTime,endTime,alarmTitle,judgeStatus,judgeType,alarmOrigin,handleOption} = params;
      const url = `${API_DOMAIN}${API_PREFIX}/thirdAlarm/findAlarmLogPage?currentPage=${currentPage}&pageSize=${pageSize}&regionTypeCode=${regionTypeCode}&regionId=${regionId}&monitorUnitName=${monitorUnitName}&monitorUnitId=${monitorUnitId}&alarmState=${alarmState}&alarmLevels=${alarmLevels}&eventTypeCodes=${eventTypeCodes}&startTime=${startTime}&endTime=${endTime}&alarmTitle=${alarmTitle}&judgeStatus=${judgeStatus}&judgeType=${judgeType}&alarmOrigin=${alarmOrigin}&handleOption=${handleOption}`;
      return requestHelper.getRequestData<IgetFindAlarmLogPageSpace.Model>(url, 'f68c8307-508f-4b15-83d1-0aed9971c6b3', this.data2Mock);
  }
  // 获取导入模板|获取导入模板-第三方预警
  getGetImportTemplate() {
      const url = `${API_DOMAIN}${API_PREFIX}/thirdAlarm/getImportTemplate`;
      return requestHelper.getRequestData<any>(url, 'd805b5f3-5863-4960-ba8e-7688fb9f7827', this.data2Mock);
  }
  // 查询报警详情|查询报警详情-报警管理-报警记录
  getAlarm (id: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/${id}`;
    return requestHelper.getRequestData<IgetAlarmSpace.Model>(url, 'ceaf13dc-e822-4cab-ad1a-100e5001c400', this.data2Mock);
  }
}
export const apiThridAlarmObj = new ThridAlarmApi();