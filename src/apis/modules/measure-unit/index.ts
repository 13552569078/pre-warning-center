import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostModifyMeasureUnitSpace, IgetFindMeasureUnitPageSpace, IgetRemoveMeasureUnitSpace, IpostMeasureUnitSpace, IgetFindMeasureUnitDetailSpace, IgetListMeasureUnitsSpace, IgetFindMeasureUnitCodeVerifySpace, IgetFindMeasureUnitNameVerifySpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class MeasureUnitApi {
  data2Mock: boolean = false;

  // 修改计量单位|修改计量单位-MeasureUnitController
  postModifyMeasureUnit (params: IpostModifyMeasureUnitSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/measureUnit/modifyMeasureUnit`;
    return requestHelper.postRequestData<IpostModifyMeasureUnitSpace.Model>(url, 'c51ae333-6aba-4d74-9490-cbec14460073', this.data2Mock, params);
  }
  // 计量单位列表(分页)|计量单位列表(分页)-MeasureUnitController
  getFindMeasureUnitPage (params: IgetFindMeasureUnitPageSpace.RequestParams) {
    const { currentPage, pageSize, measureUnitCode, measureUnitName, orderColumnStr, orderStr } = params
    const url = `${API_DOMAIN}${API_PREFIX}/measureUnit/findMeasureUnitPage?currentPage=${currentPage}&pageSize=${pageSize}&measureUnitCode=${measureUnitCode}&measureUnitName=${measureUnitName}&orderColumnStr=${orderColumnStr}&orderStr=${orderStr}`;
    return requestHelper.getRequestData<IgetFindMeasureUnitPageSpace.Model>(url, '2cb803c7-0e69-4f3d-9a22-b45437aef404', this.data2Mock);
  }
  // 查询计量单位列表|查询计量单位列表-MeasureUnitController
  getListMeasureUnits (measureUnitName: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/measureUnit/listMeasureUnits?measureUnitName=${measureUnitName}`;
    return requestHelper.getRequestData<IgetListMeasureUnitsSpace.Model>(url, 'e2b2396f-b1da-4dc2-b952-d61d6c2136a9', this.data2Mock);
  }
  // 删除计量单位|删除计量单位-MeasureUnitController
  getRemoveMeasureUnit (measureUnitId: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/measureUnit/removeMeasureUnit?measureUnitId=${measureUnitId}`;
    return requestHelper.getRequestData<IgetRemoveMeasureUnitSpace.Model>(url, 'efdbf5d7-60a2-480d-8c47-b439b5349374', this.data2Mock);
  }
  // 添加计量单位|添加计量单位-MeasureUnitController
  postMeasureUnit (params: IpostMeasureUnitSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/measureUnit/addMeasureUnit`;
    return requestHelper.postRequestData<IpostMeasureUnitSpace.Model>(url, '0166018b-e999-41b7-a548-bdd22dc05e0c', this.data2Mock, params);
  }
  // 查询计量单位详情|查询计量单位详情-MeasureUnitController
  getFindMeasureUnitDetail (measureUnitId: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/measureUnit/findMeasureUnitDetail?measureUnitId=${measureUnitId}`;
    return requestHelper.getRequestData<IgetFindMeasureUnitDetailSpace.Model>(url, '20836285-7922-4565-bcea-702358626063', this.data2Mock);
  }
  // 计量单位编码验重|计量单位编码验重-MeasureUnitController
  getFindMeasureUnitCodeVerify (measureUnitCode: string, measureUnitId?: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/measureUnit/findMeasureUnitCodeVerify?measureUnitCode=${measureUnitCode}&measureUnitId=${measureUnitId}`;
    return requestHelper.getRequestData<IgetFindMeasureUnitCodeVerifySpace.Model>(url, 'bda8f14a-41c8-4a47-b153-5a13082c688c', this.data2Mock);
  }
  // 计量单位名称验重|计量单位名称验重-MeasureUnitController
  getFindMeasureUnitNameVerify (measureUnitName: string, measureUnitId?: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/measureUnit/findMeasureUnitNameVerify?measureUnitName=${measureUnitName}&measureUnitId=${measureUnitId}`;
    return requestHelper.getRequestData<IgetFindMeasureUnitNameVerifySpace.Model>(url, 'b45e83a6-4de9-46f5-ad2a-4003671f93eb', this.data2Mock);
  }
}
export const apiMeasureUnitObj = new MeasureUnitApi();