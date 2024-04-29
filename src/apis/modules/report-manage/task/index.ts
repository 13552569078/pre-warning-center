import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetFindReportTaskSpace,IpostAddReportTaskSpace,IgetEnableSpace,IgetCreateReportSpace,IgetFindReportPageSpace,IgetTypeTemplateTreeSpace,IgetListDateFeaturesSpace, IdeleteRSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;
/**
 * 数据访问，此类代码生成器生成
 */
class ReportTsakApi {
  data2Mock: boolean = false;
  
  // 查询任务详情|查询任务详情-ReportTaskController
  getFindReportTask(taskId:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/reportTask/findReportTask?taskId=${taskId}`;
      return requestHelper.getRequestData<IgetFindReportTaskSpace.Model>(url, '4920040f-e910-45da-b512-6c9fafa29ce5', this.data2Mock);
  }
  // 创建报告任务|创建报告任务-ReportTaskController
  postAddReportTask(params: IpostAddReportTaskSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/reportTask/addReportTask`;
      return requestHelper.postRequestData<IpostAddReportTaskSpace.Model>(url, '82d6b63d-dd43-49ee-aca0-e5cf230aac4b', this.data2Mock, params);
  }
  // 停用启用任务|停用启用任务-ReportTaskController
  getEnable(id:number,useState:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/reportTask/enable/${id}?useState=${useState}`;
      return requestHelper.getRequestData<IgetEnableSpace.Model>(url, '866f0d66-e110-4c0e-a09b-ad59e052d531', this.data2Mock);
  }
  // 手动生成报告|手动生成报告-ReportTaskController
  getCreateReport(taskId:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/reportTask/createReport?taskId=${taskId}`;
      return requestHelper.getRequestData<IgetCreateReportSpace.Model>(url, 'a14b6d66-c8f8-4351-92ae-7cd05d905cdf', this.data2Mock);
  }
  // 分页查询报告任务列表|分页查询报告任务列表-ReportTaskController
  getFindReportPage(params: IgetFindReportPageSpace.RequestParams) {
      const {currentPage,pageSize,templateId,templateTypeCode,taskName,taskTypeList,startTime,endTime} = params;
      const url = `${API_DOMAIN}${API_PREFIX}/reportTask/findReportPage?currentPage=${currentPage}&pageSize=${pageSize}&templateId=${templateId}&templateTypeCode=${templateTypeCode}&taskName=${taskName}&taskTypeList=${taskTypeList}&startTime=${startTime}&endTime=${endTime}`;
      return requestHelper.getRequestData<IgetFindReportPageSpace.Model>(url, '3aa4d3af-833b-420a-97d0-a36123cc3ac3', this.data2Mock);
  }
  // 查询模板分组-模板树|查询模板分组-模板树-模板分组管理
  getTypeTemplateTree() {
      const url = `${API_DOMAIN}${API_PREFIX}/templateType/typeTemplateTree`;
      return requestHelper.getRequestData<IgetTypeTemplateTreeSpace.Model>(url, '732901b2-57fc-4410-8c8e-ce28d8973a8d', this.data2Mock);
  }
  // 根据任务周期类型查询时间特征|根据任务周期类型查询时间特征-ReportTaskController
  getListDateFeatures(taskPeriod:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/reportTask/listDateFeatures?taskPeriod=${taskPeriod}`;
      return requestHelper.getRequestData<IgetListDateFeaturesSpace.Model>(url, 'b1d288ba-36f9-4c14-b510-af05711ac3e9', this.data2Mock);
  }
  // 任务-删除|任务-删除-ReportTaskController
  deleteR(id:number) {
    const url = `${API_DOMAIN}${API_PREFIX}/reportTask/delete/${id}`;
    return requestHelper.getRequestData<IdeleteRSpace.Model>(url, '8053fe54-ea06-4382-afc0-4304f4dce1bc', this.data2Mock);
}
}
export const apiReportTsakObj = new ReportTsakApi();