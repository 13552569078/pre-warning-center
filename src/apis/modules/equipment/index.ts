import { requestHelper } from "@/apis/base/mapper-helper";
import { IselectEquipStatusSpace, IgetMonitorEquipSpace, IgetEnableSpace, IpostUpdateSpace, IdeleteMSpace, IlistSpace, IpostPageSpace, IaddSpace, IpostImportEquipListSpace, IpostExportEquipListSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class EquipmentApi {
  data2Mock: boolean = false;

  // 监测设备-设备状态下拉|监测设备-设备状态下拉-监测设备
  selectEquipStatus () {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorEquip/selectEquipStatus`;
    return requestHelper.getRequestData<IselectEquipStatusSpace.Model>(url, '8594721f-9d93-4248-beeb-bb62e888672e', this.data2Mock);
  }
  // 监测设备-明细|监测设备-明细-监测设备
  getMonitorEquip (id: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorEquip/${id}`;
    return requestHelper.getRequestData<IgetMonitorEquipSpace.Model>(url, 'a70add85-d262-4de8-8a48-41775f0b6794', this.data2Mock);
  }
  // 监测设备-判断名称是否可用|监测设备-判断名称是否可用-监测设备
  getEnable (equipName: string, id: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorEquip/enable?equipName=${equipName}&id=${id}`;
    return requestHelper.getRequestData<IgetEnableSpace.Model>(url, '3e9193e3-782e-4d6f-beb8-b7023ba041f5', this.data2Mock);
  }
  // 监测设备-修改|监测设备-修改-监测设备
  postUpdate (params: IpostUpdateSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorEquip/update`;
    return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, '5d621aff-612a-403f-9c01-604a0c7d35af', this.data2Mock, params);
  }
  // 监测设备-删除|监测设备-删除-监测设备
  deleteM (id: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorEquip/delete/${id}`;
    return requestHelper.deleteRequestData<IdeleteMSpace.Model>(url, '54108b33-1701-431b-ae15-079f1b2438b2', this.data2Mock);
  }
  // 监测设备-列表查询|监测设备-列表查询-监测设备
  list () {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorEquip/list`;
    return requestHelper.postRequestData<IlistSpace.Model>(url, '59cd8b28-680a-4f6c-8f68-941ea8f765bc', this.data2Mock, {});
  }
  // 监测设备-分页查询|监测设备-分页查询-监测设备
  postPage (params: IpostPageSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorEquip/page`;
    return requestHelper.postRequestData<IpostPageSpace.Model>(url, 'a8ab8200-5002-41b5-ab29-fa49e5e076b1', this.data2Mock, params);
  }
  // 监测设备-新增|监测设备-新增-监测设备
  add (params: IaddSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorEquip/add`;
    return requestHelper.postRequestData<IaddSpace.Model>(url, '90f0fd1f-0ea8-4c17-8e68-9978baa1a9fd', this.data2Mock, params);
  }
  // 导入设备列表|导入设备列表-监测设备
  postImportEquipList (file: any) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorEquip/importEquipList`;
    return requestHelper.postRequestData<IpostImportEquipListSpace.Model>(url, '4737fa0e-1714-4e17-b83f-fb6c540328c0', this.data2Mock, { file });
  }
  // 获取导入模板|获取导入模板-监测设备
  getGetImportTemplate () {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorEquip/getImportTemplate`;
    return requestHelper.getRequestData<any>(url, '97c4766d-4b96-4c0d-a91a-4a490858e298', this.data2Mock);
  }
  // 导出设备列表|导出设备列表-监测设备
  postExportEquipList (params: IpostExportEquipListSpace.RequestParams) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorEquip/exportEquipList`;
    return requestHelper.postRequestData<any>(url, '8b52bbef-0040-4ba7-a889-25f2d7042f95', this.data2Mock, params);
  }
}
export const apiEquipmentObj = new EquipmentApi();