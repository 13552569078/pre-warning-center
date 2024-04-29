import { requestHelper } from "@/apis/base/mapper-helper";
import { IlistSpace,IpostDetailSpace,IpostExportListSpace,IpostChartDataSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class TargetAnalysisApi {
  data2Mock: boolean = false;
  
  // 查询列表信息|查询列表信息-指标综合分析api
  list(startTime:string,endTime:string,targetDataIds:[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/targetDataAnalysis/list`;
      return requestHelper.postRequestData<IlistSpace.Model>(url, '24e8e6a9-a4e4-4dd6-9bc4-165b6128af5b', this.data2Mock, {startTime,endTime,targetDataIds});
  }
  // 查询指标分析数据项详情|查询指标分析数据项详情-指标综合分析api
  postDetail(startTime:string,endTime:string,targetDataId:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/targetDataAnalysis/detail`;
      return requestHelper.postRequestData<IpostDetailSpace.Model>(url, '751a635f-01b2-48e4-b58c-ec7bf60a3dcb', this.data2Mock, {startTime,endTime,targetDataId});
  }
  // 导出列表数据|导出列表数据-指标综合分析api
  postExportList(startTime:string,endTime:string,targetDataIds:[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/targetDataAnalysis/exportList`;
      return requestHelper.postRequestData<IpostExportListSpace.Model>(url, '6c2c8826-abdf-4e5b-abe1-6668aba154d8', this.data2Mock, {startTime,endTime,targetDataIds});
  }
  // 查询图表数据|查询图表数据-指标综合分析api
  postChartData(startTime:string,endTime:string,targetDataIds:[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/targetDataAnalysis/chartData`;
      return requestHelper.postRequestData<IpostChartDataSpace.Model>(url, '6de53c64-4609-49a2-b9dc-1a20bf0dcc63', this.data2Mock, {startTime,endTime,targetDataIds});
  }
}
export const apiTargetAnalysisObj = new TargetAnalysisApi();