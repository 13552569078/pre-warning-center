import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetFindEquipStateListSpace,IgetFindEquipDataAnalysisSpace, IgetFindEquipListPageSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class NetworkQualityIncidenceApi {
  data2Mock: boolean = false;

  // 设备分页列表|设备分页列表-联网数据分析api
  getFindEquipListPage(currentPage:number,pageSize:number,isOnline:number) {
    const url = `${API_DOMAIN}${API_PREFIX}/YgfEquipDataAnalysis/findEquipListPage?currentPage=${currentPage}&pageSize=${pageSize}&isOnline=${isOnline}`;
    return requestHelper.getRequestData<IgetFindEquipListPageSpace.Model>(url, 'b42bc985-482d-41e2-98c3-e20fd93284c4', this.data2Mock);
}
  // 设备状态分布|设备状态分布-联网数据分析api
  getFindEquipStateList() {
      const url = `${API_DOMAIN}${API_PREFIX}/YgfEquipDataAnalysis/findEquipStateList`;
      return requestHelper.getRequestData<IgetFindEquipStateListSpace.Model>(url, 'fbce94d2-bd58-481c-a9cd-e710b2322d49', this.data2Mock);
  }
  // 联网数据统计|联网数据统计-联网数据分析api
  getFindEquipDataAnalysis() {
      const url = `${API_DOMAIN}${API_PREFIX}/YgfEquipDataAnalysis/findEquipDataAnalysis`;
      return requestHelper.getRequestData<IgetFindEquipDataAnalysisSpace.Model>(url, '0f800c87-e10d-4ec3-af43-d3d68dd8f063', this.data2Mock);
  }
}
export const apiNetworkQualityIncidenceObj = new NetworkQualityIncidenceApi();