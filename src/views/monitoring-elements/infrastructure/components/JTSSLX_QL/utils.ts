import { apiDictObj } from '@/apis/modules/dict';
import { ruleRequired, ruleNumber } from '../../rules';
export const formData = {
  id: '',
  facilityName: '', // 桥梁名称
  facilityTypeCode: 'JTSSLX_QL',
  bridgeTypeCode: '', // 桥梁类型编码
  address: '', // 桥梁位置
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
  facilityStateCode: '', // 桥梁状态
  bridgeDesc: '', // 备注
  imageUrls: '', // 场景照片
  longitude: '',
  latitude: '',
};

export const formRules = {
  facilityName: [
    ruleRequired,
    {
      max: 100,
      message: '长度不超过100个字符',
      trigger: ['change', 'blur'],
    },
  ],
  bridgeTypeCode: [
    ruleRequired,
  ],
  address: [
    ruleRequired,
    {
      max: 100,
      message: '长度不超过100个字符',
      trigger: ['change', 'blur'],
    },
  ],
  areaCode: [
    ruleRequired,
  ],
  maintainLevelCode: [
    ruleRequired,
  ],
  maintainUnitCode: [
    ruleRequired,
  ],
  directeUnitCode: [
    ruleRequired,
  ],
  completedTime: [
    ruleRequired,
  ],
  facilityStateCode: [
    ruleRequired,
  ],
  longitude: [
    ruleRequired,
    ruleNumber
  ],
  latitude: [
    ruleRequired,
    ruleNumber
  ],
  totalCost: [
    ruleNumber
  ]
};

export const formData2 = {
  bridgeLevelCode: '', // 桥梁等级
  bridgeLength: '', // 桥梁长度
  bridgeArea: '', // 桥梁面积
  bridgeWidth: '', // 桥梁宽度
  acrossTypeCode: '', // 跨越种类编码
  bridgeAcrossNum: '', // 桥梁跨数
  spanCompose: '', // 跨径组合
  positiveObliqueAngle: '', // 正协交角
  seismicIntensity: '', // 抗震烈度
  designLoad: '', // 设计荷载
  loadLimit: '', // 限载标准
  heightLimit: '', // 限高标准
  riverLevelCode: '', // 河道等级编码
  riverbedHeight: '', // 河床标高
  limitedHighWater: '', // 限高水位
};

export const formRules2 = {
  bridgeLevelCode: [
    ruleRequired
  ],
  bridgeLength: [
    ruleRequired,
    ruleNumber
  ],
  bridgeArea: [
    ruleRequired,
    ruleNumber
  ],
  bridgeWidth: [
    ruleRequired,
    ruleNumber
  ],
  bridgeAcrossNum: [
    ruleNumber
  ],
  positiveObliqueAngle: [
    ruleNumber
  ],
  seismicIntensity: [
    ruleNumber
  ],
  designLoad: [
    ruleNumber
  ],
  loadLimit: [
    ruleNumber
  ],
  heightLimit: [
    ruleNumber
  ],
  riverbedHeight: [
    ruleNumber
  ],
  limitedHighWater: [
    ruleNumber
  ],
};
