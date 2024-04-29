import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetFindAlarmLogPageSpace, IgetCheckNameIfExistSpace, IlistSpace, IdeleteAlarmAnalysisModelSpace, IgetFindFunctionUserColumnVOSpace, IpostSaveFunctionUserColumnSpace, IpostSaveSpace, IgetFindAlarmLogPageStatisticSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class WarningWholeAnalysisApi {
  data2Mock: boolean = false;

  // 查询预警列表|查询预警列表-预警综合分析api
  getFindAlarmLogPage(params: IgetFindAlarmLogPageSpace.RequestParams) {
    const { currentPage, pageSize, eventTypeCode, areaCodeList, startTime, endTime } = params;
    const url = `${API_DOMAIN}${API_PREFIX}/alarmMultipleAnalysis/findAlarmLogPage?currentPage=${currentPage}&pageSize=${pageSize}&eventTypeCode=${eventTypeCode}&areaCodeList=${areaCodeList}&startTime=${startTime}&endTime=${endTime}`;
    return requestHelper.getRequestData<IgetFindAlarmLogPageSpace.Model>(url, 'e4410eee-010e-49a1-bb20-351ed4a50029', this.data2Mock);
  }
  // 查看分析模型名称是否存在|查看分析模型名称是否存在-预警综合分析模型api
  getCheckNameIfExist(analysisModelName: string, analysisModelId: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/alarmAnalysisModel/checkNameIfExist?analysisModelName=${analysisModelName}&analysisModelId=${analysisModelId}`;
    return requestHelper.getRequestData<IgetCheckNameIfExistSpace.Model>(url, '8c397ad8-f0b4-49b4-ae8f-29c8acc372da', this.data2Mock);
  }
  // 查询分析模型列表|查询分析模型列表-预警综合分析模型api
  list(analysisModelName: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/alarmAnalysisModel/list`;
    return requestHelper.postRequestData<IlistSpace.Model>(url, '8136a9b4-232c-4583-a051-5f59f4c2eb47', this.data2Mock, { analysisModelName });
  }
  // 删除分析模型|删除分析模型-预警综合分析模型api
  deleteAlarmAnalysisModel(analysisModelId: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/alarmAnalysisModel/${analysisModelId}`;
    return requestHelper.deleteRequestData<IdeleteAlarmAnalysisModelSpace.Model>(url, '05321047-fe13-41f6-a425-04846f980459', this.data2Mock);
  }
  // 保存分析模型|保存分析模型-预警综合分析模型api
  postSave(analysisModelId: string, analysisModelName: string, modelText: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/alarmAnalysisModel/save`;
    return requestHelper.postRequestData<IpostSaveSpace.Model>(url, '9bc5f8bf-1235-45d9-bf54-bdd601de59d0', this.data2Mock, { analysisModelId, analysisModelName, modelText });
  }
  // 导出预警列表数据|导出预警列表数据-预警综合分析api
  postExportList(params: any) {
    const url = `${API_DOMAIN}${API_PREFIX}/alarmMultipleAnalysis/exportList`;
    return requestHelper.postRequestData<any>(url, 'd4f4e326-f91e-4cda-a4a9-30ea4e6ae00d', this.data2Mock, params);
  }
  // 查询预警列表图形统计|查询预警列表图形统计-预警综合分析api
  getFindAlarmLogPageStatistic(params: IgetFindAlarmLogPageStatisticSpace.RequestParams) {
    const {currentPage,pageSize,eventTypeCode,areaCodeList,startTime,endTime} = params;
    const url = `${API_DOMAIN}${API_PREFIX}/alarmMultipleAnalysis/findAlarmLogPageStatistic?currentPage=${currentPage}&pageSize=${pageSize}&eventTypeCode=${eventTypeCode}&areaCodeList=${areaCodeList}&startTime=${startTime}&endTime=${endTime}`;
    return requestHelper.getRequestData<IgetFindAlarmLogPageStatisticSpace.Model>(url, '619614a4-6655-4635-86c6-90dbb3c65f6f', this.data2Mock);
  }
    // 获取列表项展示功能|获取列表项展示功能-列表项个性化展示功能api
    getFindFunctionUserColumnVO(functionCode: string) {
      const url = `${API_DOMAIN}${API_PREFIX}/functionUserColumn/findFunctionUserColumnVO?functionCode=${functionCode}`;
      return requestHelper.getRequestData<IgetFindFunctionUserColumnVOSpace.Model>(url, '81a8ca5c-4fb0-4ee3-9b3d-d3cf6a0bf135', this.data2Mock);
    }
    // 保存列表展示数据|保存列表展示数据-列表项个性化展示功能api
    postSaveFunctionUserColumn(functionCode: string, columnText: string) {
      const url = `${API_DOMAIN}${API_PREFIX}/functionUserColumn/saveFunctionUserColumn`;
      return requestHelper.postRequestData<IpostSaveFunctionUserColumnSpace.Model>(url, 'bb71e6cd-9ef6-499a-bc77-adb2b69fb48f', this.data2Mock, { functionCode, columnText });
    }
}
export const apiWarningWholeAnalysisObj = new WarningWholeAnalysisApi();