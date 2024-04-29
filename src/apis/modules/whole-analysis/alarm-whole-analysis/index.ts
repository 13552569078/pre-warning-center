import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostSaveSpace,IgetFindAlarmLogPageStatisticSpace,IlistSpace,IgetCheckNameIfExistSpace,IdeleteYgfAlarmAnalysisModelSpace,IgetFindAlarmLogPageSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class AlarmWholeAnalysApi {
  data2Mock: boolean = false;
   // 保存分析模型|保存分析模型-预警综合分析模型api
   postSave(analysisModelId: string, analysisModelName: string, modelText: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/ygfAlarmAnalysisModel/save`;
    return requestHelper.postRequestData<IpostSaveSpace.Model>(url, '9bc5f8bf-1235-45d9-bf54-bdd601de59d0', this.data2Mock, { analysisModelId, analysisModelName, modelText });
  }
  // 查询报警列表图形统计|查询报警列表图形统计-报警综合分析api
  getFindAlarmLogPageStatistic(params: IgetFindAlarmLogPageStatisticSpace.RequestParams) {
      const {currentPage,pageSize,eventTypeCode,areaCodeList,startTime,endTime} = params;
      const url = `${API_DOMAIN}${API_PREFIX}/YgfAlarmMultipleAnalysis/findAlarmLogPageStatistic?currentPage=${currentPage}&pageSize=${pageSize}&eventTypeCode=${eventTypeCode}&areaCodeList=${areaCodeList}&startTime=${startTime}&endTime=${endTime}`;
      return requestHelper.getRequestData<IgetFindAlarmLogPageStatisticSpace.Model>(url, 'e7a4f1c4-71c9-494f-91e0-22d738edf5c6', this.data2Mock);
  }
  // 查询分析模型列表|查询分析模型列表-报警综合分析模型api
  list(analysisModelName:string,useFor:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/ygfAlarmAnalysisModel/list`;
      return requestHelper.postRequestData<IlistSpace.Model>(url, '8830e6fa-19bf-4b8b-8321-0e15a8ed9e6e', this.data2Mock, {analysisModelName,useFor});
  }
  // 查看分析模型名称是否存在|查看分析模型名称是否存在-报警综合分析模型api
  getCheckNameIfExist(analysisModelName:string,analysisModelId:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/ygfAlarmAnalysisModel/checkNameIfExist?analysisModelName=${analysisModelName}&analysisModelId=${analysisModelId}`;
      return requestHelper.getRequestData<IgetCheckNameIfExistSpace.Model>(url, '66c545d9-96ae-4ba4-b8f7-4d773cb0bb17', this.data2Mock);
  }
  // 删除分析模型|删除分析模型-报警综合分析模型api
  deleteYgfAlarmAnalysisModel(analysisModelId:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/ygfAlarmAnalysisModel/${analysisModelId}`;
      return requestHelper.deleteRequestData<IdeleteYgfAlarmAnalysisModelSpace.Model>(url, '51c42ef6-4673-4621-9075-ac4f80c9d924', this.data2Mock);
  }
  // 查询报警列表|查询报警列表-报警综合分析api
  getFindAlarmLogPage(params: IgetFindAlarmLogPageSpace.RequestParams) {
      const {currentPage,pageSize,eventTypeCode,areaCodeList,startTime,endTime} = params;
      const url = `${API_DOMAIN}${API_PREFIX}/YgfAlarmMultipleAnalysis/findAlarmLogPage?currentPage=${currentPage}&pageSize=${pageSize}&eventTypeCode=${eventTypeCode}&areaCodeList=${areaCodeList}&startTime=${startTime}&endTime=${endTime}`;
      return requestHelper.getRequestData<IgetFindAlarmLogPageSpace.Model>(url, '6d975fa0-c578-4c18-9244-57059bef378d', this.data2Mock);
  }
  // 导出报警列表数据|导出报警列表数据-报警综合分析api
  postExportList(params: any) {
      const url = `${API_DOMAIN}${API_PREFIX}/YgfAlarmMultipleAnalysis/exportList`;
      return requestHelper.postRequestData<any>(url, '8ec0f40c-b9f4-4387-9155-635e551c37e8', this.data2Mock, params);
  }
}
export const apiAlarmWholeAnalysObj = new AlarmWholeAnalysApi();