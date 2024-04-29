import { requestHelper } from "@/apis/base/mapper-helper";
import { IdeleteDeleteEquipTypeSpace, IpostUpdateEquipTypeSpace, IpostAddEquipTypeSpace, IgetDetailSpace, IgetTreeSpace, IgetEquipTreeSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class EquipmentTypeApi {
  data2Mock: boolean = false;

  // 删除设备类型|删除设备类型-设备类型管理
  deleteDeleteEquipType (typeId: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/equipType/deleteEquipType?typeId=${typeId}`;
    return requestHelper.deleteRequestData<IdeleteDeleteEquipTypeSpace.Model>(url, 'f47e634b-b502-4a04-8ed0-43ae263b0bd3', this.data2Mock);
  }
  // 更新设备类型|更新设备类型-设备类型管理
  postUpdateEquipType (params: IpostUpdateEquipTypeSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/equipType/updateEquipType`;
    return requestHelper.postRequestData<IpostUpdateEquipTypeSpace.Model>(url, '3beae1a3-e1b5-46a7-bb5c-2b924279c31a', this.data2Mock, params);
  }
  // 添加设备类型|添加设备类型-设备类型管理
  postAddEquipType (params: IpostAddEquipTypeSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/equipType/addEquipType`;
    return requestHelper.postRequestData<IpostAddEquipTypeSpace.Model>(url, 'e433de92-8149-48fa-94dd-3ae2181cb7b5', this.data2Mock, params);
  }
  // 设备类型详情|设备类型详情-设备类型管理
  getDetail (typeId: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/equipType/detail?typeId=${typeId}`;
    return requestHelper.getRequestData<IgetDetailSpace.Model>(url, '7462555c-20ba-4a4f-8bec-4d7d592e447c', this.data2Mock);
  }
  // 获取设备类型树|获取设备类型树-设备类型管理
  getTree () {
    const url = `${API_DOMAIN}${API_PREFIX}/equipType/tree`;
    return requestHelper.getRequestData<IgetTreeSpace.Model>(url, '76a50566-a71a-4aad-93ab-5085d4072b7c', this.data2Mock);
  }
  // 获取设备类型-设备树|获取设备类型-设备树-设备类型管理
  getEquipTree () {
    const url = `${API_DOMAIN}${API_PREFIX}/equipType/equipTree`;
    return requestHelper.getRequestData<IgetEquipTreeSpace.Model>(url, '78831031-cdd5-4713-950c-5bf64f509fc8', this.data2Mock);
  }
}
export const apiEquipmentTypeObj = new EquipmentTypeApi();