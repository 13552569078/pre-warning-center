import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostImportVideoEquipListSpace, IgetListAccessSourceObjectSpace, IgetListVideoEquipTargetInfoSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class VideoEquipmentApi {
  data2Mock: boolean = false;

  // 获取视频设备信息导入模板|获取视频设备信息导入模板-监测设备
  getGetVideoEquipImportTemplate () {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorEquip/getVideoEquipImportTemplate`;
    return requestHelper.getRequestData<any>(url, 'e09b2e06-5c90-40f7-8a4a-fd5f83843ae8', this.data2Mock);
  }
  // 导入视频设备列表|导入视频设备列表-监测设备
  postImportVideoEquipList (accessSourceObjectId: number, targetInfoId: number) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorEquip/importVideoEquipList`;
    return requestHelper.postRequestData<IpostImportVideoEquipListSpace.Model>(url, 'd1fdda99-129a-4f19-a1f4-ddf6bf5a7b70', this.data2Mock, { accessSourceObjectId, targetInfoId });
  }
  // 获取接入数据对象列表|获取接入数据对象列表-接入源、接入对象管理
  getListAccessSourceObject () {
    const url = `${API_DOMAIN}${API_PREFIX}/accessSource/object/listAccessSourceObject`;
    return requestHelper.getRequestData<IgetListAccessSourceObjectSpace.Model>(url, '6bb5fa32-02b1-45fd-bba0-d287f9da8183', this.data2Mock);
  }
  // 查询视频设备指标列表|查询视频设备指标列表-TargetInfoController
  getListVideoEquipTargetInfo () {
    const url = `${API_DOMAIN}${API_PREFIX}/targetInfo/listVideoEquipTargetInfo`;
    return requestHelper.getRequestData<IgetListVideoEquipTargetInfoSpace.Model>(url, 'a510c5dd-ca4d-46a0-a457-8f02b5235beb', this.data2Mock);
  }
}
export const apiVideoEquipmentObj = new VideoEquipmentApi();