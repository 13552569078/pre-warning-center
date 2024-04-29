import { ruleRequired, ruleNumber } from '../../rules';
export const formData = {
  id: '',
  facilityName: '', // 路灯名称
  facilityTypeCode: 'SZSSLX_ZM',
  lightTypeCode: '', // 路灯类型编码
  address: '', // 路灯位置
  longitude: '',
  latitude: '',
  areaCode: '', // 行政区划
  belongRoad: '', // 所属道路
  belongRoadSection: '', // 所属路段
  maintainLevelCode: '', // 养护等级
  maintainUnitCode: '', // 养护单位编码
  maintainUnitVal: '', // 养护单位名称
  directeUnitCode: '', // 主管部门编码
  directeUnitVal: '', // 主管部门名称
  owerUnitVal: '', // 权属单位
  owerUnitCode: '', // 权属单位code
  designUnitName: '', // 设计单位
  buildUnitName: '', // 建设单位
  superviseUnitName: '', // 监理单位
  workUnitName: '', // 施工单位
  completedTime: '', // 建成时间
  totalCost: '', // 总造价
  facilityStateCode: '', // 路灯状态
  lightDesc: '', // 备注
  imageUrls: '', // 场景照片
};

export const formRules = {
  facilityName: [
    ruleRequired
  ],
  lightTypeCode: [
    ruleRequired
  ],
  address: [
    ruleRequired
  ],
  longitude: [
    ruleRequired,
    ruleNumber
  ],
  latitude: [
    ruleRequired,
    ruleNumber
  ],
  areaCode: [
    ruleRequired
  ],
  belongRoad: [
    ruleRequired
  ],
  belongRoadSection: [
    ruleRequired
  ],
  maintainLevelCode: [
    ruleRequired
  ],
  maintainUnitCode: [
    ruleRequired
  ],
  directeUnitCode: [
    ruleRequired
  ],
  completedTime: [
    ruleRequired
  ],
  facilityStateCode: [
    ruleRequired
  ],
  totalCost: [
    ruleNumber
  ],
};

export const formData2 = {
  lightModel: '', // 路灯型号
  purchaseTime: '', // 采购时间
  purchaseManufacturer: '', // 采购厂商
  warrantyLimit: '', // 保质期限
  lamppostTypeCode: '', // 灯杆类型
  lamppostNo: '', // 灯杆编号
  lanternTypeCode: '', // 灯具类型
  lanternName: '', // 灯具名称
};

export const formRules2 = {};
