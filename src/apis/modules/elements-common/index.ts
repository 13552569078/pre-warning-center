import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetFindMonitorUnitListSpace,IpostAreaListSpace,IgetFindWarningUnitListSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class CommonApi {
  data2Mock: boolean = false;
  
  // 根据风险分类，过滤监测点|根据风险分类，过滤监测点-公共信息
  getFindMonitorUnitList(eventTypeCode:string,pointId:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/information/findMonitorUnitList?eventTypeCode=${eventTypeCode}&pointId=${pointId}`;
      return requestHelper.getRequestData<IgetFindMonitorUnitListSpace.Model>(url, '027d9862-0d62-48a0-bd1a-5e4fa2498cc3', this.data2Mock);
  }
  // 行政区划列表|行政区划列表-公共信息
  postAreaList(areaCode:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/information/areaList`;
      return requestHelper.postRequestData<IpostAreaListSpace.Model>(url, 'c785e8b5-e2b2-44cc-8ea7-691a1e06fa87', this.data2Mock, {areaCode});
  }
  // 根据风险分类，过滤监测点|根据风险分类，过滤监测点-公共信息
  getFindWarningUnitList(eventTypeCode:string,pointId:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/information/findWarningUnitList?eventTypeCode=${eventTypeCode}&pointId=${pointId}`;
      return requestHelper.getRequestData<IgetFindWarningUnitListSpace.Model>(url, '5a62d684-fb2b-475a-9c9f-fc46bb1e110f', this.data2Mock);
  }

  Run(methodName: string, params: any) {
    let result:any = new Promise(() => ({ data: {} }));
    switch (methodName) {
      
    case "getFindMonitorUnitList":
      {
        const { eventTypeCode,pointId } = params;
        result = this.getFindMonitorUnitList(eventTypeCode,pointId);
      }
      break;

    case "postAreaList":
      {
        const { areaCodes } = params;
        result = this.postAreaList(areaCodes);
      }
      break;

    case "getFindWarningUnitList":
      {
        const { eventTypeCode,pointId } = params;
        result = this.getFindWarningUnitList(eventTypeCode,pointId);
      }
      break;

      default:
        break;
    }
    return result;
  }
}
export const apiCommonObj = new CommonApi();