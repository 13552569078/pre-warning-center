import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostUpdateGisOutlineSpace,IgetRegionSimpleListSpace,IgetOutlineSpace,IgetRegionListSpace,IpostRegionListFilterByEventSpace,IpostUpdateSpace,IdeleteMSpace,IgetRegionMonitorUnitTreeSpace,IaddSpace,IgetEnableSpace,IpostPageSpace,IgetMonitorRegionSpace, IgetEnableOrDisableSpace, IpostChangeRegionUnitListToTreeSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class SubjectApi {
  data2Mock: boolean = false;

  // 监测主体-更新轮廓信息|监测主体-更新轮廓信息-监测主体
  postUpdateGisOutline(regionId:number,gisOutline:string,gisPoint:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorRegion/updateGisOutline`;
      return requestHelper.postRequestData<IpostUpdateGisOutlineSpace.Model>(url, '1f672306-3539-4cc3-8109-718912e9f82e', this.data2Mock, {regionId,gisOutline,gisPoint});
  }
  // 监测主体下拉框列表|监测主体下拉框列表-监测主体
  getRegionSimpleList(regionName:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorRegion/regionSimpleList?regionName=${regionName}`;
      return requestHelper.getRequestData<IgetRegionSimpleListSpace.Model>(url, '2bbc59d5-314a-4539-9b4d-3a4037dd8bbb', this.data2Mock);
  }
  // 监测主体-主体轮廓|监测主体-主体轮廓-监测主体
  getOutline(regionId:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorRegion/outline/${regionId}`;
      return requestHelper.getRequestData<IgetOutlineSpace.Model>(url, 'b39a516d-a94f-4da7-9082-898d5b035fac', this.data2Mock);
  }
  // 监测点-监测主体列表|监测点-监测主体列表-监测主体
  getRegionList() {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorRegion/regionList`;
      return requestHelper.getRequestData<IgetRegionListSpace.Model>(url, 'dc49fa34-b80e-49e4-aaa3-2be66d6dce4f', this.data2Mock);
  }
  // 监测点-监测主体列表(根据事件类型过滤)|监测点-监测主体列表(根据事件类型过滤)-监测主体
  postRegionListFilterByEvent(codeList:[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorRegion/regionListFilterByEvent`;
      return requestHelper.postRequestData<IpostRegionListFilterByEventSpace.Model>(url, '269231c4-98a1-480d-860d-6aaafeca1431', this.data2Mock, {codeList});
  }
  // 监测主体-修改|监测主体-修改-监测主体
  postUpdate(params: IpostUpdateSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorRegion/update`;
      return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, '508b7579-f1ee-4f34-8372-db365800c8f9', this.data2Mock, params);
  }
  // 监测主体-删除|监测主体-删除-监测主体
  deleteM(id:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorRegion/delete/${id}`;
      return requestHelper.deleteRequestData<IdeleteMSpace.Model>(url, '2873cb34-3b93-463f-aa66-dcec79164782', this.data2Mock);
  }
  // 主体类型-主体-监测点树|主体类型-主体-监测点树-监测主体
  // TODO 报警管理 左侧tree共用
  getRegionMonitorUnitTree() {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorRegion/regionMonitorUnitTree`;
      return requestHelper.getRequestData<IgetRegionMonitorUnitTreeSpace.Model>(url, '79281f6d-3def-4e5f-b73e-734100e17da6', this.data2Mock);
  }
  // 监测主体-新增|监测主体-新增-监测主体
  add(params: IaddSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorRegion/add`;
      return requestHelper.postRequestData<IaddSpace.Model>(url, '9d700e07-af65-4ec9-9dbe-ec29b79c44e4', this.data2Mock, params);
  }
  // 监测主体-判断名称是否可用|监测主体-判断名称是否可用-监测主体
  getEnable(regionName:string,id:string) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorRegion/enable?regionName=${regionName}&id=${id}`;
      return requestHelper.getRequestData<IgetEnableSpace.Model>(url, '2f3b575b-6cc5-4dda-b3d2-1c8f44f39cb7', this.data2Mock);
  }
  // 监测主体-分页查询|监测主体-分页查询-监测主体
  postPage(params: IpostPageSpace.RequestParams) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorRegion/page`;
      return requestHelper.postRequestData<IpostPageSpace.Model>(url, '1e84cb04-7297-41b8-b2f6-ed2dcaf1daff', this.data2Mock, params);
  }
  // 监测主体-停用启用|监测主体-停用启用-监测主体
  getEnableOrDisable(id:number, useState:number) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorRegion/enable/${id}?useState=${useState}`;
      return requestHelper.getRequestData<IgetEnableOrDisableSpace.Model>(url, '87a43274-9426-4fc7-ace2-c177190172a9', this.data2Mock);
  }
  // 监测主体-明细|监测主体-明细-监测主体
  getMonitorRegion(id:number | string) {
      const url = `${API_DOMAIN}${API_PREFIX}/monitorRegion/${id}`;
      return requestHelper.getRequestData<IgetMonitorRegionSpace.Model>(url, '8fe5650d-ff62-4b8c-8d07-26951c721758', this.data2Mock);
  }
  // 获取监测主体模板
  getGetImportTemplate() {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorRegion/getImportTemplate`;
    return requestHelper.getRequestData<any>(url, 'd805b5f3-5863-4960-ba8e-7688fb9f7827', this.data2Mock);
  }
  // 监测主体-停用启用|监测主体-停用启用-监测主体
  getEnableOrDisableBatch(regionIdList: string[], useState: number) {
    const url = `${API_DOMAIN}${API_PREFIX}//monitorRegion/enableBatch?regionIdList=${regionIdList}&useState=${useState}`;
    return requestHelper.getRequestData<IgetEnableOrDisableSpace.Model>(url, '87a43274-9426-4fc7-ace2-c177190172a9', this.data2Mock);
  }
  // 主体及监测点集合转换为树接口|主体及监测点集合转换为树接口-场景定义
  postChangeRegionUnitListToTree(regionUnitParams: any) {
    const url = `${API_DOMAIN}${API_PREFIX}/scene/changeRegionUnitListToTree`;
    return requestHelper.postRequestData<IpostChangeRegionUnitListToTreeSpace.Model>(url, '3c1ed7e0-1bcc-4d15-911b-dcbf2f51e0c0', this.data2Mock, {regionUnitParams});
  }
}
export const apiSubjectObj = new SubjectApi();
