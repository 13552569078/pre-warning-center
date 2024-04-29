/* eslint-disable @typescript-eslint/no-namespace */

/**
* 删除道路设施设施-Model类库
*/
export namespace IdeleteFSpace {

  export class RequestParams {
    id?: string;
    constructor() {
      this.id = '';
    }
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: boolean;
  }
}
/**
* 更新道路设施设施-Model类库
*/
export namespace IpostUpdateSpace {

  export class RequestParams {
    currentPage?: number; pageSize?: number; id?: string; facilityTypeCode?: string; facilityName?: string; roadTypeCode?: string; areaCode?: string; belongRoad?: string; address?: string; latitude?: string; longitude?: string; maintainUnitCode?: string; maintainUnitVal?: string; directeUnitCode?: string; directeUnitVal?: string; maintainLevelCode?: string; maintainLevelName?: string; owerUnitCode?: string; owerUnitVal?: string; designUnitName?: string; buildUnitName?: string; superviseUnitName?: string; workUnitName?: string; completedTime?: string; totalCost?: string; facilityStateCode?: string; facilityStateVal?: string; roadDesc?: string; imageUrls?: string; roadLevel?: string; roadLength?: string; roadWidth?: string; roadArea?: string; roadwayArea?: string; sidewalkArea?: string; reformLength?: string; reformArea?: string; drainLength?: string; rainPipeLength?: string; sewageConduitLength?: string; rainSewageLength?: string; intakeNum?: string; drainageWellNum?: string; socialWellNum?: string; blindRoadLength?: string; blindRoadNum?: string; ironGuardrailLength?: string; stoneGuardrailLength?: string; crashGuardrailLength?: string; isolationGuardrailLength?: string; roadBarrierNum?: string; retainWallVolume?: string; roadNameplateNum?: string;
    constructor() {
      this.currentPage = 0; this.pageSize = 0; this.id = ''; this.facilityTypeCode = ""; this.facilityName = ""; this.roadTypeCode = ""; this.areaCode = ""; this.belongRoad = ""; this.address = ""; this.latitude = ""; this.longitude = ""; this.maintainUnitCode = ""; this.maintainUnitVal = ""; this.directeUnitCode = ""; this.directeUnitVal = ""; this.maintainLevelCode = ""; this.maintainLevelName = ""; this.owerUnitCode = ""; this.owerUnitVal = ""; this.designUnitName = ""; this.buildUnitName = ""; this.superviseUnitName = ""; this.workUnitName = ""; this.completedTime = ""; this.totalCost = ""; this.facilityStateCode = ""; this.facilityStateVal = ""; this.roadDesc = ""; this.imageUrls = ""; this.roadLevel = ""; this.roadLength = ""; this.roadWidth = ""; this.roadArea = ""; this.roadwayArea = ""; this.sidewalkArea = ""; this.reformLength = ""; this.reformArea = ""; this.drainLength = ""; this.rainPipeLength = ""; this.sewageConduitLength = ""; this.rainSewageLength = ""; this.intakeNum = ""; this.drainageWellNum = ""; this.socialWellNum = ""; this.blindRoadLength = ""; this.blindRoadNum = ""; this.ironGuardrailLength = ""; this.stoneGuardrailLength = ""; this.crashGuardrailLength = ""; this.isolationGuardrailLength = ""; this.roadBarrierNum = ""; this.retainWallVolume = ""; this.roadNameplateNum = "";
    }
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: number;
  }
}
/**
* 分页查询道路设施设施列表-Model类库
*/
export namespace IpostPageListSpace {

  export class RequestParams {
    currentPage?: number; pageSize?: number; facilityName?: string; roadTypeCode?: string; areaCode?: string; directeUnitVal?: string; maintainUnitVal?: string; facilityStateCode?: string; orderColumnStr?: string; orderStr?: string;
    constructor() {
      this.currentPage = 0; this.pageSize = 0; this.facilityName = ""; this.roadTypeCode = ""; this.areaCode = ""; this.directeUnitVal = ""; this.maintainUnitVal = ""; this.facilityStateCode = ""; this.orderColumnStr = ""; this.orderStr = "";
    }
  }

  export interface List {
    id: number;
    facilityName: string;
    roadTypeCode: string;
    roadTypeName: string;
    areaCode: string;
    areaName: string;
    directeUnitCode: string;
    directeUnitVal: string;
    maintainUnitCode: string;
    maintainUnitVal: string;
    maintainLevelCode: string;
    maintainLevelName: string;
    facilityStateCode: string;
    facilityStateVal: string;
    updatedAt: string;
  }

  export interface Data {
    totalRow: number;
    totalPage: number;
    currentPage: number;
    pageSize: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    list: List[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 新增道路设施设施-Model类库
*/
export namespace IaddSpace {

  export class RequestParams {
    currentPage?: number; pageSize?: number; id?: string; facilityTypeCode?: string; facilityName?: string; roadTypeCode?: string; areaCode?: string; belongRoad?: string; address?: string; latitude?: string; longitude?: string; maintainUnitCode?: string; maintainUnitVal?: string; directeUnitCode?: string; directeUnitVal?: string; maintainLevelCode?: string; maintainLevelName?: string; owerUnitCode?: string; owerUnitVal?: string; designUnitName?: string; buildUnitName?: string; superviseUnitName?: string; workUnitName?: string; completedTime?: string; totalCost?: string; facilityStateCode?: string; facilityStateVal?: string; roadDesc?: string; imageUrls?: string; roadLevel?: string; roadLength?: string; roadWidth?: string; roadArea?: string; roadwayArea?: string; sidewalkArea?: string; reformLength?: string; reformArea?: string; drainLength?: string; rainPipeLength?: string; sewageConduitLength?: string; rainSewageLength?: string; intakeNum?: string; drainageWellNum?: string; socialWellNum?: string; blindRoadLength?: string; blindRoadNum?: string; ironGuardrailLength?: string; stoneGuardrailLength?: string; crashGuardrailLength?: string; isolationGuardrailLength?: string; roadBarrierNum?: string; retainWallVolume?: string; roadNameplateNum?: string;
    constructor() {
      this.currentPage = 0; this.pageSize = 0; this.id = ''; this.facilityTypeCode = ""; this.facilityName = ""; this.roadTypeCode = ""; this.areaCode = ""; this.belongRoad = ""; this.address = ""; this.latitude = ""; this.longitude = ""; this.maintainUnitCode = ""; this.maintainUnitVal = ""; this.directeUnitCode = ""; this.directeUnitVal = ""; this.maintainLevelCode = ""; this.maintainLevelName = ""; this.owerUnitCode = ""; this.owerUnitVal = ""; this.designUnitName = ""; this.buildUnitName = ""; this.superviseUnitName = ""; this.workUnitName = ""; this.completedTime = ""; this.totalCost = ""; this.facilityStateCode = ""; this.facilityStateVal = ""; this.roadDesc = ""; this.imageUrls = ""; this.roadLevel = ""; this.roadLength = ""; this.roadWidth = ""; this.roadArea = ""; this.roadwayArea = ""; this.sidewalkArea = ""; this.reformLength = ""; this.reformArea = ""; this.drainLength = ""; this.rainPipeLength = ""; this.sewageConduitLength = ""; this.rainSewageLength = ""; this.intakeNum = ""; this.drainageWellNum = ""; this.socialWellNum = ""; this.blindRoadLength = ""; this.blindRoadNum = ""; this.ironGuardrailLength = ""; this.stoneGuardrailLength = ""; this.crashGuardrailLength = ""; this.isolationGuardrailLength = ""; this.roadBarrierNum = ""; this.retainWallVolume = ""; this.roadNameplateNum = "";
    }
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: number;
  }
}
/**
* 道路设施设施详情-Model类库
*/
export namespace IgetFacilityRoadSpace {

  export class RequestParams {
    id?: string;
    constructor() {
      this.id = '';
    }
  }

  export interface PhotoFile {
    id: string;
    originalName: string;
    url: string;
  }

  export interface Data {
    id: number;
    facilityTypeCode: string;
    facilityTypeName: string;
    facilityName: string;
    areaCode: string;
    areaName: string;
    roadTypeCode: string;
    roadTypeName: string;
    belongRoad: string;
    address: string;
    latitude: string;
    longitude: string;
    maintainUnitCode: string;
    maintainUnitVal: string;
    directeUnitCode: string;
    directeUnitVal: string;
    maintainLevelCode: string;
    maintainLevelName: string;
    owerUnitCode: string;
    owerUnitVal: string;
    designUnitName: string;
    buildUnitName: string;
    superviseUnitName: string;
    workUnitName: string;
    completedTime: string;
    totalCost: string;
    facilityStateCode: string;
    facilityStateVal: string;
    roadDesc: string;
    photoFile: PhotoFile[];
    roadLevel: string;
    roadLength: string;
    roadWidth: string;
    roadArea: string;
    roadwayArea: string;
    sidewalkArea: string;
    reformLength: string;
    reformArea: string;
    drainLength: string;
    rainPipeLength: string;
    sewageConduitLength: string;
    rainSewageLength: string;
    intakeNum: string;
    drainageWellNum: string;
    socialWellNum: string;
    blindRoadLength: string;
    blindRoadNum: string;
    ironGuardrailLength: string;
    stoneGuardrailLength: string;
    crashGuardrailLength: string;
    isolationGuardrailLength: string;
    roadBarrierNum: string;
    retainWallVolume: string;
    roadNameplateNum: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 批量删除道路设施设施-Model类库
*/
export namespace IdeleteSpace {

  export class RequestParams {
    ids?: [];
    constructor() {
      this.ids = [];
    }
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: boolean;
  }
}