import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetFindRecentJudgeResultSpace,IgetEventInfoSpace,IpostFindEventInfoPageSpace,IpostFindEventInfoPageStatisticSpace,IgetFindJudgeStatisticSpace,IgetFindUnJudgeStatisticSpace, IgetFindHistoryEventTrendSpace,IpostJudgeEventInfoSpace,IpostFindEventNotifyPageSpace,IpostFindEventNotifyPageStatisticSpace, IpostFindAlarmNotifyPageStatisticSpace,IpostFindAlarmNotifyPageSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class YgfAlarmInfoApi {
  data2Mock: boolean = false;

  // 报警研判-近期研判结果统计|报警研判-近期研判结果统计-运管服报警信息
  getFindRecentJudgeResult(startTime:string,endTime:string) {
    const url = `${API_DOMAIN}${API_PREFIX}/ygf/eventInfo/findRecentJudgeResult?startTime=${startTime}&endTime=${endTime}`;
    return requestHelper.getRequestData<IgetFindRecentJudgeResultSpace.Model>(url, 'a7cf5507-57f9-4cb3-afd0-a74308225770', this.data2Mock);
  }
  // 报警详情|报警详情-运管服报警信息
  getEventInfo(id:string) {
    const url = `${API_DOMAIN}${API_PREFIX}/ygf/eventInfo/${id}`;
    return requestHelper.getRequestData<IgetEventInfoSpace.Model>(url, 'd266e7f8-93c5-4982-aa0d-8561b8930448', this.data2Mock);
  }
  // 报警列表(分页)|报警列表(分页)-运管服报警信息
  postFindEventInfoPage(params: IpostFindEventInfoPageSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/ygf/eventInfo/findEventInfoPage`;
    return requestHelper.postRequestData<IpostFindEventInfoPageSpace.Model>(url, '253ee292-7bb7-4559-b69f-a586c5c982fc', this.data2Mock, params);
  }
  // 查询报警列表统计图表|查询报警列表统计图表-运管服报警信息
  postFindEventInfoPageStatistic(params: IpostFindEventInfoPageStatisticSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/ygf/eventInfo/findEventInfoPageStatistic`;
    return requestHelper.postRequestData<IpostFindEventInfoPageStatisticSpace.Model>(url, '3fa2e6fc-1b0f-436b-9e02-4b2dc2224e34', this.data2Mock, params);
  }
  // 报警研判-当前研判统计|报警研判-当前研判统计-运管服报警信息
  getFindJudgeStatistic() {
    const url = `${API_DOMAIN}${API_PREFIX}/ygf/eventInfo/findJudgeStatistic`;
    return requestHelper.getRequestData<IgetFindJudgeStatisticSpace.Model>(url, '33a62ead-ac99-44a6-b022-b67bf4bee412', this.data2Mock);
  }
  // 报警研判-待研判等级统计表头|报警研判-待研判等级统计表头-运管服报警信息
  getFindUnJudgeStatistic() {
    const url = `${API_DOMAIN}${API_PREFIX}/ygf/eventInfo/findUnJudgeStatistic`;
    return requestHelper.getRequestData<IgetFindUnJudgeStatisticSpace.Model>(url, '2ae985ec-1224-4ae8-8d87-9946c9c5f5b2', this.data2Mock);
  }
  // 导出报警列表数据|导出报警列表数据-运管服报警信息
  postExportList(params: any) {
    const url = `${API_DOMAIN}${API_PREFIX}/ygf/eventInfo/exportList`;
    return requestHelper.postRequestData(url, 'a53623ba-4b2c-4a92-8350-7c94b2e09229', this.data2Mock, params);
  }


  // 报警研判-历史报警趋势|报警研判-历史报警趋势-运管服报警信息
  getFindHistoryEventTrend(unitId:string) {
    const url = `${API_DOMAIN}${API_PREFIX}/ygf/eventInfo/findHistoryEventTrend?unitId=${unitId}`;
    return requestHelper.getRequestData<IgetFindHistoryEventTrendSpace.Model>(url, 'c0308d61-604a-4f35-84a0-29cb42a33247', this.data2Mock);
  }
  // 报警研判-研判保存|报警研判-研判保存-运管服报警信息
  postJudgeEventInfo(params: IpostJudgeEventInfoSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/ygf/eventInfo/judgeEventInfo`;
    return requestHelper.postRequestData<IpostJudgeEventInfoSpace.Model>(url, '8ab86c9d-0fc1-4c51-98ba-caaf8ae69e48', this.data2Mock, params);
  }
  // 报警通知-报警通知列表(分页)|报警通知-报警通知列表(分页)-运管服报警信息
  postFindEventNotifyPage(params: IpostFindEventNotifyPageSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/ygf/eventInfo/findEventNotifyPage`;
    return requestHelper.postRequestData<IpostFindEventNotifyPageSpace.Model>(url, 'e8460810-8803-49d5-bb4d-34ba97d5790b', this.data2Mock, params);
  }
  // 报警通知-查询报警通知列表统计图表|报警通知-查询报警通知列表统计图表-运管服报警信息
  postFindEventNotifyPageStatistic(params: IpostFindEventNotifyPageStatisticSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/ygf/eventInfo/findEventNotifyPageStatistic`;
    return requestHelper.postRequestData<IpostFindEventNotifyPageStatisticSpace.Model>(url, '61a06da0-1b89-4ce3-932e-d4797eb9fecd', this.data2Mock, params);
  }
  // 报警通知-导出报警通知列表数据|报警通知-导出报警通知列表数据-运管服报警信息
  postEventNotifyExportList(params: any) {
    const url = `${API_DOMAIN}${API_PREFIX}/ygf/eventInfo/eventNotifyExportList`;
    return requestHelper.postRequestData(url, 'fd776559-f8e7-4595-8a3a-ddf4205167a7', this.data2Mock, params);
  }
  // 预警通知-查询预警通知列表统计图表|预警通知-查询预警通知列表统计图表-预警通知
  postFindAlarmNotifyPageStatistic(params: IpostFindAlarmNotifyPageStatisticSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/notify/findAlarmNotifyPageStatistic`;
    return requestHelper.postRequestData<IpostFindAlarmNotifyPageStatisticSpace.Model>(url, '513f39eb-4cb1-4472-9f75-fa2852dd882f', this.data2Mock, params);
  }
  // 预警通知-预警通知列表(分页)|预警通知-预警通知列表(分页)-预警通知
  postFindAlarmNotifyPage(params: IpostFindAlarmNotifyPageSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/notify/findAlarmNotifyPage`;
    return requestHelper.postRequestData<IpostFindAlarmNotifyPageSpace.Model>(url, 'f6922ced-ba2b-44d9-8270-a344bc379d06', this.data2Mock, params);
  }
  // 预警通知-导出预警通知列表数据|预警通知-导出预警通知列表数据-预警通知
  postAlarmNotifyExportList(params: any) {
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/notify/alarmNotifyExportList`;
    return requestHelper.postRequestData(url, 'e5ac440c-e4ab-477e-83cf-1778c5ee12ab', this.data2Mock, params);
  }
}
export const apiYgfAlarmInfoObj = new YgfAlarmInfoApi();
