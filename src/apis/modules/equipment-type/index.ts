import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostDetailSpace, IgetListpageSpace, IaddSpace, IdeleteSpace, IgetCheckRepeatSpace, IpostUpdateSpace, IgetListEquipTypeByFacicityTypeCodeSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class EquipmentTypeApi {
  data2Mock: boolean = false;

  // 设备类型详情|设备类型详情-设备类型管理
  postDetail (typeCode: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/equipType/detail?typeCode=${typeCode}`;
    return requestHelper.getRequestData<IpostDetailSpace.Model>(url, 'fc0cac18-ad0d-4c7d-bb4d-c70d591b7b02', this.data2Mock );
  }
  // 根据设施类型分类查询设备类型列表|根据设施类型分类查询设备类型列表-设备类型管理
  getListpage (params: IgetListpageSpace.RequestParams) {
    const { currentPage, pageSize, facilityTypeCode, orderColumnStr, orderStr } = params;
    const url = `${API_DOMAIN}${API_PREFIX}/equipType/listpage?currentPage=${currentPage}&pageSize=${pageSize}&facilityTypeCode=${facilityTypeCode}&orderColumnStr=${orderColumnStr}&orderStr=${orderStr}`;
    return requestHelper.getRequestData<IgetListpageSpace.Model>(url, '37c02326-96e1-476c-8c06-fa49608c5774', this.data2Mock);
  }
  // 添加设备类型|添加设备类型-设备类型管理
  add (typeCode: string, typeName: string, facilityTypeCode: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/equipType/add`;
    return requestHelper.postRequestData<IaddSpace.Model>(url, '5e1ec1ae-03fb-41f6-88c8-1884ec03abf9', this.data2Mock, { typeCode, typeName, facilityTypeCode });
  }
  // 删除设备类型|删除设备类型-设备类型管理
  delete (typeCode: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/equipType/delete?typeCode=${typeCode}`;
    return requestHelper.deleteRequestData<IdeleteSpace.Model>(url, '48caf9ce-ccd2-4dce-89bb-b69c84adbe9a', this.data2Mock);
  }
  // 设备类型编码验重|设备类型编码验重-设备类型管理
  getCheckRepeat (equipTypeCode: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/equipType/checkRepeat?equipTypeCode=${equipTypeCode}`;
    return requestHelper.getRequestData<IgetCheckRepeatSpace.Model>(url, '55dc95fa-e59e-423e-a092-7325ff2ec73a', this.data2Mock);
  }
  // 编辑设备类型|编辑设备类型-设备类型管理
  postUpdate (typeCode: string, typeName: string, facilityTypeCode: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/equipType/update`;
    return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, 'aa80dae3-051a-47fe-9b7a-bbf527b5facb', this.data2Mock, { typeCode, typeName, facilityTypeCode });
  }
  // 根据设施类型查询设备类型列表-无分页|根据设施类型查询设备类型列表-无分页-设备类型管理
  getListEquipTypeByFacicityTypeCode (facilityTypeCode: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/equipType/listEquipTypeByFacicityTypeCode?facilityTypeCode=${facilityTypeCode}`;
    return requestHelper.getRequestData<IgetListEquipTypeByFacicityTypeCodeSpace.Model>(url, '1fa2e497-3236-4e1b-8410-cc1814b9f60b', this.data2Mock);
  }
}
export const apiEquipmentTypeObj = new EquipmentTypeApi();