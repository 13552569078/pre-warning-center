import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetFindReportHisDetailSpace,IgetCorrectReportFileSpace,IgetFindReportPageSpace,IgetRemoveReportSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class HistoryReportApi {
  data2Mock: boolean = false;
  
  // 报告详情|报告详情-ReportHisController
  getFindReportHisDetail(reportId:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/reportHis/findReportHisDetail?reportId=${reportId}`;
      return requestHelper.getRequestData<IgetFindReportHisDetailSpace.Model>(url, '3c965623-5a53-45d7-b600-afd2ebb54d6b', this.data2Mock);
  }
  // 修正报告|修正报告-ReportHisController
  getCorrectReportFile(reportId:string,reportFileId:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/reportHis/correctReportFile?reportId=${reportId}&reportFileId=${reportFileId}`;
      return requestHelper.getRequestData<IgetCorrectReportFileSpace.Model>(url, 'c16ef564-1b53-409f-afae-ecd01e5f58c0', this.data2Mock);
  }
  // 分页查询报告|分页查询报告-ReportHisController
  getFindReportPage(params: IgetFindReportPageSpace.RequestParams) {
      const {currentPage,pageSize,startTime,endTime,reportTaskId} = params;
      const url = `${API_DOMAIN}${API_PREFIX}/reportHis/findReportPage?currentPage=${currentPage}&pageSize=${pageSize}&startTime=${startTime}&endTime=${endTime}&reportTaskId=${reportTaskId}`;
      return requestHelper.getRequestData<IgetFindReportPageSpace.Model>(url, '7b2dc3f5-6736-4dab-90c6-d5f01df60aff', this.data2Mock);
  }
  // 删除报告|删除报告-ReportHisController
  getRemoveReport(reportId:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/reportHis/removeReport?reportId=${reportId}`;
      return requestHelper.getRequestData<IgetRemoveReportSpace.Model>(url, '0ea5d3f0-d2e3-406f-83ce-9e8f9ac2bfb1', this.data2Mock);
  }
}
export const apiHistoryReportObj = new HistoryReportApi();