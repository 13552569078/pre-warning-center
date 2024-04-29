import { ruleRequired, ruleNumber } from '../../rules';
export const formData = {
  id: '',
  facilityName: '', // 隧道名称
  facilityTypeCode: 'JTSSLX_SD',
  tunnelTypeCode: '', // 隧道类型编码
  address: '', // 隧道位置
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
  facilityStateCode: '', // 隧道状态
  tunnelDesc: '', // 备注
  imageUrls: '', // 场景照片
};

export const formRules = {
  facilityName: [
    ruleRequired
  ],
  tunnelTypeCode: [
    ruleRequired
  ],
  address: [
    ruleRequired
  ],
  areaCode: [
    { required: true, message: '不允许为空', trigger: ['change', 'blur'] },
  ],
  longitude: [
    ruleRequired,
    ruleNumber
  ],
  latitude: [
    ruleRequired,
    ruleNumber
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
  tunnelLevelCode: '', // 隧道等级
  tunnelLength: '', // 隧道长度
  tunnelHeight: '', // 隧道净高（m）
  tunnelWidth: '', // 隧道净宽
  acrossTypeCode: '', // 穿越类型
  tunnelType: '', // 隧道形式
  entranceType: '', // 进口形式
  exitType: '', // 出口形式
  sectionType: '', // 断面形式
  pavementType: '', // 路面类型
  longitudeSlope: '', // 路面纵坡
  crossSlope: '', // 路面横坡
  liningMaterial: '', // 衬砌材料
  seismicIntensity: '', // 抗震烈度
  designLoad: '', // 设计荷载
  drainageType: '', // 排水类型
  lightInfo: '', // 照明情况
  ventilateInfo: '', // 通风情况
  decorateInfo: '', // 装饰情况
  fireControlInfo: '', // 消防情况
  emergencyAccess: '', // 安全通道
};

export const formRules2 = {
  tunnelLevelCode: [
    ruleRequired
  ],
  tunnelLength: [
    ruleRequired,
    ruleNumber
  ],
  tunnelHeight: [
    ruleRequired,
    ruleNumber
  ],
  tunnelWidth: [
    ruleRequired,
    ruleNumber
  ],
  longitudeSlope: [
    ruleNumber
  ],
  crossSlope: [
    ruleNumber
  ],
  seismicIntensity: [
    ruleNumber
  ],
  designLoad: [
    ruleNumber
  ],
  emergencyAccess: [
    ruleNumber
  ],
};
