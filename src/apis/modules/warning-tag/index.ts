import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetTagDetailSpace,IpostSaveAlarmTagInfoParamSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class WarningTagApi {
  data2Mock: boolean = false;

  // 标签维护明细|标签维护明细-报警管理-报警记录
  getTagDetail(alarmId:string) {
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/tagDetail?alarmId=${alarmId}`;
    return requestHelper.getRequestData<IgetTagDetailSpace.Model>(url, 'cdace023-bd2d-428e-9113-339afb572ff2', this.data2Mock);
  }
  // 标签维护保存|标签维护保存-报警管理-报警记录
  postSaveAlarmTagInfoParam(alarmId:string,tagInfoParamList:IgetTagDetailSpace.Data[]) {
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/saveAlarmTagInfoParam`;
    return requestHelper.postRequestData<IpostSaveAlarmTagInfoParamSpace.Model>(url, 'd0fccffd-f52f-406f-a39c-7341223d96f0', this.data2Mock, {alarmId,tagInfoParamList});
  }
}
export const apiWarningTagObj = new WarningTagApi();
