import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetBaseInfoSpace, IpostPageSpace, IdeleteVSpace, IgetEnableSpace, IdeleteESpace, IpostUpdateAccessDataSpace, IgetFrequencyStrategySpace, IgetListRegionTypeUnitFrequencyTreeVOsSpace, IpostFrequencyStrategySpace, IgetEventTypesSpace, IaddSpace, IpostUpdateUnitSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class MonitorPointV2Api {
  data2Mock: boolean = false;

  // 监测点-基本信息|监测点-基本信息-监测点V2
  getBaseInfo (id: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/baseInfo/${id}`;
    return requestHelper.getRequestData<IgetBaseInfoSpace.Model>(url, '67dec1fd-740d-489f-8650-1c382f8e9526', this.data2Mock);
  }
  // 监测点列表-分页查询|监测点列表-分页查询-监测点V2
  postPage (params: IpostPageSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/page`;
    return requestHelper.postRequestData<IpostPageSpace.Model>(url, '74e07a26-d47c-4595-81cd-edfd62fd0559', this.data2Mock, params);
  }
  // 监测点-删除|监测点-删除-监测点V2
  deleteV (id: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/delete/${id}`;
    return requestHelper.deleteRequestData<IdeleteVSpace.Model>(url, '9138c51e-30d1-48ba-b9b0-ca81a0533c48', this.data2Mock);
  }
  // 监测点-停用启用|监测点-停用启用-监测点V2
  getEnable (id: number, useState: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/enable/${id}?useState=${useState}`;
    return requestHelper.getRequestData<IgetEnableSpace.Model>(url, '40ce1dce-bdd6-4227-9134-ead0f2e4307e', this.data2Mock);
  }
  // 监测点事件类型-删除|监测点事件类型-删除-监测点V2
  deleteE (unitEventId: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/eventType/delete/${unitEventId}`;
    return requestHelper.deleteRequestData<IdeleteESpace.Model>(url, '698d85be-c485-46ca-8553-5bdfa2fd217c', this.data2Mock);
  }
  // 监测点-接入数据配置|监测点-接入数据配置-监测点V2
  postUpdateAccessData (unitEventTypeList: []) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/accessData/updateAccessData`;
    return requestHelper.postRequestData<IpostUpdateAccessDataSpace.Model>(url, '2c9b5379-a77a-41f6-b361-ab384d48d789', this.data2Mock, { unitEventTypeList });
  }
  // 监测点-查询报警预警策略|监测点-查询报警预警策略-监测点V2
  getFrequencyStrategy (id: number, useFor: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/frequencyStrategy/${id}?useFor=${useFor}`;
    return requestHelper.getRequestData<IgetFrequencyStrategySpace.Model>(url, 'effe270a-86b0-41e6-80f6-5d720ffce4f3', this.data2Mock);
  }
  // 监测点-更新报警预警策略|监测点-更新报警预警策略-监测点V2
  postFrequencyStrategy (unitEventList: [], useFor: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/frequencyStrategy`;
    return requestHelper.postRequestData<IpostFrequencyStrategySpace.Model>(url, '9a0a9c82-cdc4-4382-9475-9b407a4fa6f1', this.data2Mock, { unitEventList, useFor });
  }
  // 监测点-事件类型|监测点-事件类型-监测点V2
  getEventTypes (id: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/eventTypes/${id}`;
    return requestHelper.getRequestData<IgetEventTypesSpace.Model>(url, '1914eec4-0429-4bec-82c6-97ecf8516495', this.data2Mock);
  }
  // 监测点-新增|监测点-新增-监测点V2
  add (params: IaddSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/add`;
    return requestHelper.postRequestData<IaddSpace.Model>(url, '49a6a6e8-956b-4954-9e98-6a3d2dde21d1', this.data2Mock, params);
  }
  // 监测点-修改|监测点-修改-监测点V2
  postUpdateUnit (params: IpostUpdateUnitSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/updateUnit`;
    return requestHelper.postRequestData<IpostUpdateUnitSpace.Model>(url, 'e070210b-e9ab-4346-9550-c077b7e38c09', this.data2Mock, params);
  }
    // 监测点频段树形结构|监测点频段树形结构-监测点V2
    getListRegionTypeUnitFrequencyTreeVOs(params: IgetListRegionTypeUnitFrequencyTreeVOsSpace.RequestParams) {
      const {useFor,unitName,eventTypeCodes,factorIds} = params;
      const url = `${API_DOMAIN}${API_PREFIX}/monitorUnit/v2/listRegionTypeUnitFrequencyTreeVOs?useFor=${useFor}&unitName=${unitName}&eventTypeCodes=${eventTypeCodes}&factorIds=${factorIds}`;
      return requestHelper.getRequestData<IgetListRegionTypeUnitFrequencyTreeVOsSpace.Model>(url, '498a5f4d-addd-4a5e-99ba-9ff899d4c355', this.data2Mock);
  }
}
export const apiMonitorPointV2Obj = new MonitorPointV2Api();