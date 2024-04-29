import { requestHelper } from "@/apis/base/mapper-helper";
import {
  IgetListMonitorEventTreesSpace,
  IgetFindStartTimeSpace,
  IgetFindAlarmDataPageSpace,
  IgetFindAccessDatePageSpace,
  IgetFindMonitorEventDetailSpace,
  IgetListMonitorDataListSpace,
  IgetListMonitorFactorDataListSpace,
  IgetFindMonitorEventPointSpace,
  IgetFindMonitorUnitFactorValueSpace,
  IgetFindAlarmDetailSpace,
  IgetListAlarmMonitorDataSpace,

  IgetFindMonitorDataDetailSpace,
  IgetFindMonitorDataPageSpace,

  IgetListMonitorPointsSpace,

  IgetListMonitorUnitListSpace,
  IgetListIntervalAlarmMonitorDataSpace
} from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;
const ONEPIC_BASE_URL = GlobalAPI.config.ONEPIC_BASE_URL;

/**
 * 数据访问，此类代码生成器生成
 */
class SourceDataApi {
  data2Mock: boolean = false;

  // 查询监测数据详情|查询监测数据详情-AccessDataController
  getFindMonitorDataDetail(monitorPointId:number,dataId:number,dataCode:string) {
    const url = `${API_DOMAIN}${API_PREFIX}/accessData/findMonitorDataDetail?monitorPointId=${monitorPointId}&dataId=${dataId}&dataCode=${dataCode}`;
    return requestHelper.getRequestData<IgetFindMonitorDataDetailSpace.Model>(url, '0479354a-eb9d-44be-ba10-f84f959f3508', this.data2Mock);
  }
  // 查询监测数据列表|查询监测数据列表-AccessDataController
  getFindMonitorDataPage(params: IgetFindAccessDatePageSpace.RequestParams) {
    const { currentPage, pageSize, monitorPointId, startTime, endTime, eventTypeCode } = params;
    let url = "";
    if(startTime){
      url = `${API_DOMAIN}${API_PREFIX}/accessData/findMonitorDataPage?currentPage=${currentPage}&pageSize=${pageSize}&monitorPointId=${monitorPointId}&eventTypeCode=${eventTypeCode}&startTime=${startTime}&endTime=${endTime}`;
    } else {
      url = `${API_DOMAIN}${API_PREFIX}/accessData/findMonitorDataPage?currentPage=${currentPage}&pageSize=${pageSize}&monitorPointId=${monitorPointId}&eventTypeCode=${eventTypeCode}`;
    }
    return requestHelper.getRequestData<IgetFindMonitorDataPageSpace.Model>(url, 'd9269ff9-15a9-47e1-8b6b-264e06258605', this.data2Mock);
  }

  // 查询监测点树|查询监测点树-AccessDataController
  getListMonitorEventTrees () {
    const url = `${API_DOMAIN}${API_PREFIX}/accessData/listMonitorEventTrees`;
    return requestHelper.getRequestData<IgetListMonitorEventTreesSpace.Model>(url, '1d7cfa08-b420-41f9-9e5a-fdf89b4b124c', this.data2Mock);
  }
  getListMonitorDataTrees () {
    const url = `${API_DOMAIN}${API_PREFIX}/accessData/listAccessDataMonitorTrees`;
    return requestHelper.getRequestData<IgetListMonitorEventTreesSpace.Model>(url, '1d7cfa08-b420-41f9-9e5a-fdf89b4b124c', this.data2Mock);
  }
  // 查询开始时间|查询开始时间-AccessDataController
  getFindStartTime (type: number|string, pointId: number|string) {
    const url = `${API_DOMAIN}${API_PREFIX}/accessData/findStartTime?type=${type}&pointId=${pointId}`;
    return requestHelper.getRequestData<IgetFindStartTimeSpace.Model>(url, '46537be9-872b-4f6e-9baf-d0b062fd64a1', this.data2Mock);
  }

  // 查询报警预警信息列表|查询报警预警信息列表-AccessDataController
  getFindAlarmDataPage(params: IgetFindAlarmDataPageSpace.RequestParams) {
    const {currentPage,pageSize,useFor,monitorRegionId,monitorRegionName,monitorPointId,monitorPointName,eventTypeCodeList,alarmLevelCodeList,startTime,endTime} = params;
    let url = "";
    if(startTime) {
      url = `${API_DOMAIN}${API_PREFIX}/accessData/findAlarmDataPage?currentPage=${currentPage}&pageSize=${pageSize}&useFor=${useFor}&monitorRegionName=${monitorRegionName}&monitorPointName=${monitorPointName}&eventTypeCodeList=${eventTypeCodeList}&alarmLevelCodeList=${alarmLevelCodeList}&startTime=${startTime}&endTime=${endTime}`;
    } else {
      url = `${API_DOMAIN}${API_PREFIX}/accessData/findAlarmDataPage?currentPage=${currentPage}&pageSize=${pageSize}&useFor=${useFor}&monitorRegionName=${monitorRegionName}&monitorPointName=${monitorPointName}&eventTypeCodeList=${eventTypeCodeList}&alarmLevelCodeList=${alarmLevelCodeList}`;
    }
    return requestHelper.getRequestData<IgetFindAlarmDataPageSpace.Model>(url, '35e70b98-5191-44cd-93d1-d19b94b15181', this.data2Mock);
  }

  // 查询接入数据列表|查询接入数据列表-AccessDataController
  getFindAccessDatePage (params: IgetFindAccessDatePageSpace.RequestParams) {
    const { currentPage, pageSize, monitorPointId, startTime, endTime, eventTypeCode } = params;
    const url = `${API_DOMAIN}${API_PREFIX}/accessData/findAccessDatePage?currentPage=${currentPage}&pageSize=${pageSize}&monitorPointId=${monitorPointId}&startTime=${startTime}&endTime=${endTime}&eventTypeCode=${eventTypeCode}`;
    return requestHelper.getRequestData<IgetFindAccessDatePageSpace.Model>(url, 'cf07d5a6-f72f-4e86-b8b2-499a1fe461f2', this.data2Mock);
  }

  // 查询报警策略规则因子值|查询报警策略规则因子值-AccessDataController
  getFindMonitorUnitFactorValue(alarmDataId:string) {
    const url = `${API_DOMAIN}${API_PREFIX}/accessData/findMonitorUnitFactorValue?alarmDataId=${alarmDataId}`;
    return requestHelper.getRequestData<IgetFindMonitorUnitFactorValueSpace.Model>(url, '24efc9aa-56c3-4cb5-81ef-9e731c74cf60', this.data2Mock);
  }

  // 查询报警信息详情|查询报警信息详情-AccessDataController
  getFindAlarmDetail(alarmDataId:string) {
    const url = `${API_DOMAIN}${API_PREFIX}/accessData/findAlarmDetail?alarmDataId=${alarmDataId}`;
    return requestHelper.getRequestData<IgetFindAlarmDetailSpace.Model>(url, '6cf5f63d-d0da-43ba-b070-5d0927112717', this.data2Mock);
  }

  // 查询产生报警的监测数据|查询产生报警的监测数据-AccessDataController
  getListAlarmMonitorData(alarmDataId:string) {
    const url = `${API_DOMAIN}${API_PREFIX}/accessData/listAlarmMonitorData?alarmDataId=${alarmDataId}`;
    return requestHelper.getRequestData<IgetListAlarmMonitorDataSpace.Model>(url, 'b7db0274-065e-4919-87e4-48f0c80ace13', this.data2Mock);
  }


  // TODO 以下监测数据弹窗相关接口
  // 查询监测事件详情|查询监测事件详情-监测-预警中心API
  getFindMonitorEventDetail(eventId:string) {
    const url = `${ONEPIC_BASE_URL}${API_PREFIX}/monitor/findMonitorEventDetail?eventId=${eventId}`;
    return requestHelper.getRequestData<IgetFindMonitorEventDetailSpace.Model>(url, '88f95543-f139-4ff1-b535-e8eb6a507486', this.data2Mock);
  }

  // 查询监测事件的监测数据(列表展示)|查询监测事件的监测数据(列表展示)-监测-预警中心API
  getListMonitorDataList(params: IgetListMonitorDataListSpace.RequestParams) {
    const {currentPage,pageSize,useFor,eventId,startTime,endTime, pointId} = params;
    let url = "";
    if(startTime){
      url = `${ONEPIC_BASE_URL}${API_PREFIX}/monitor/listMonitorDataList?currentPage=${currentPage}&pageSize=${pageSize}&eventId=${eventId}&startTime=${startTime}&endTime=${endTime}&pointId=${pointId}`;
    } else {
      url = `${ONEPIC_BASE_URL}${API_PREFIX}/monitor/listMonitorDataList?currentPage=${currentPage}&pageSize=${pageSize}&eventId=${eventId}&pointId=${pointId}`;
    }
    return requestHelper.getRequestData<IgetListMonitorDataListSpace.Model>(url, '51f1f9a9-00b8-490a-840c-701805b1b027', this.data2Mock);
  }

  // 查询监测事件的监测数据(图形展示)|查询监测事件的监测数据(图形展示)-监测-预警中心API
  getListMonitorFactorDataList(params: IgetListMonitorFactorDataListSpace.RequestParams) {
    const {currentPage,pageSize,useFor,eventId,startTime,endTime, pointId} = params;
    const url = `${ONEPIC_BASE_URL}${API_PREFIX}/monitor/listMonitorFactorDataList?currentPage=${currentPage}&pageSize=${pageSize}&eventId=${eventId}&startTime=${startTime}&endTime=${endTime}&pointId=${pointId}`;
    return requestHelper.getRequestData<IgetListMonitorFactorDataListSpace.Model>(url, '6e7cbaab-0071-4d90-abb6-305ba8640895', this.data2Mock);
  }
  // 查询监测事件的监测点信息|查询监测事件的监测点信息-监测-预警中心API
  getFindMonitorEventPoint(eventId:string, pointId: string) {
    const url = `${ONEPIC_BASE_URL}${API_PREFIX}/monitor/findMonitorEventPoint?eventId=${eventId}&pointId=${pointId}`;
    return requestHelper.getRequestData<IgetFindMonitorEventPointSpace.Model>(url, 'f3ac40f6-cf45-4ff9-83a9-af5a5484a891', this.data2Mock);
  }

  // 监测点-不分页列表|监测点-不分页列表-监测点
  getListMonitorPoints(pointName:string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorPoint/listMonitorPoints?pointName=${pointName}`;
    return requestHelper.getRequestData<IgetListMonitorPointsSpace.Model>(url, 'dc9dcd6d-1925-4056-8baa-445e6f823d0a', this.data2Mock);
  }

  // 查询监测点列表|查询监测点列表-MonitorUnitController
  getListMonitorUnitList(pointName:string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/listMonitorUnitList?pointName=${pointName}`;
    return requestHelper.getRequestData<IgetListMonitorUnitListSpace.Model>(url, 'f11ef652-9417-40e0-af4c-c46e8c5b3ca6', this.data2Mock);
  }

  // 查询产生报警的区间型监测数据|查询产生报警的区间型监测数据-AccessDataController
  getListIntervalAlarmMonitorData(alarmDataId:string) {
    const url = `${API_DOMAIN}${API_PREFIX}/accessData/listIntervalAlarmMonitorData?alarmDataId=${alarmDataId}`;
    return requestHelper.getRequestData<IgetListIntervalAlarmMonitorDataSpace.Model>(url, 'a9889af7-6c77-432a-bbf4-e5b182689be4', this.data2Mock);
  }
}
export const apiSourceDataObj = new SourceDataApi();
