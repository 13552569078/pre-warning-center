/* eslint-disable @typescript-eslint/no-namespace */

/**
* 监测点-停用启用-Model类库
*/
export namespace IgetEnableSpace {

  export class RequestParams {
    id?: number; useState?: number;
    constructor() {
      this.id = 0; this.useState = 0;
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
* 监测点-修改-Model类库
*/
export namespace IpostUpdateUnitSpace {

  export class RequestParams {
    id?: number; regionId?: number; unitName?: string; unitType?: string; facilityType?: string; facilityIdList?: []; address?: string; longitude?: string; latitude?: string; description?: string; altitude?: string; altitudeDatum?: string; streetAreaCode?: string; fileIds?: string;
    constructor() {
      this.id = 0; this.regionId = 0; this.unitName = ""; this.unitType = ""; this.facilityType = ""; this.facilityIdList = []; this.address = ""; this.longitude = ""; this.latitude = ""; this.description = ""; this.altitude = ""; this.altitudeDatum = ""; this.streetAreaCode = ""; this.fileIds = "";
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
* 监测点-关联指标策略-Model类库
*/
export namespace IpostAddStrategyTargetSpace {

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: boolean;
  }
}
/**
* 监测点-基本信息-Model类库
*/
export namespace IgetBaseInfoSpace {

  export class RequestParams {
    id?: number;
    constructor() {
      this.id = 0;
    }
  }

  export interface PhotoFile {
    id: string;
    originalName: string;
    url: string;
  }

  export interface FacilityIdList { }

  export interface FacilityNameList { }

  export interface MonitorEquipListVOList {
    id: number;
    equipName: string;
    equipType: number;
    equipCode: string;
  }

  export interface Data {
    id: number;
    regionId: number;
    regionName: string;
    unitName: string;
    unitType: string;
    unitTypeName: string;
    address: string;
    longitude: string;
    latitude: string;
    useState: number;
    useStateName: string;
    useStateTime: string;
    description: string;
    altitude: string;
    altitudeDatum: string;
    altitudeDatumName: string;
    streetAreaCode: string;
    streetAreaCodeName: string;
    photoFile: PhotoFile[];
    facilityType: string;
    facilityTypeName: string;
    facilityIdList: FacilityIdList[];
    facilityNameList: FacilityNameList[];
    updatedAt: string;
    monitorEquipListVOList: MonitorEquipListVOList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 监测点-关联设备-Model类库
*/
export namespace IpostAddEquipListSpace {

  export class RequestParams {
    unitId?: number; equipIdList?: [];
    constructor() {
      this.unitId = 0; this.equipIdList = [];
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
* 监测点-新增-Model类库
*/
export namespace IaddSpace {

  export class RequestParams {
    id?: number; regionId?: number; unitName?: string; unitType?: string; facilityType?: string; facilityIdList?: []; address?: string; longitude?: string; latitude?: string; description?: string; altitude?: string; altitudeDatum?: string; streetAreaCode?: string; fileIds?: string;
    constructor() {
      this.id = 0; this.regionId = 0; this.unitName = ""; this.unitType = ""; this.facilityType = ""; this.facilityIdList = []; this.address = ""; this.longitude = ""; this.latitude = ""; this.description = ""; this.altitude = ""; this.altitudeDatum = ""; this.streetAreaCode = ""; this.fileIds = "";
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
* 监测点列表-分页查询-Model类库
*/
export namespace IpostPageSpace {

  export class RequestParams {
    currentPage?: number; pageSize?: number; regionId?: number; regionName?: string; unitName?: string; unitCode?: string; facilityName?: string; useState?: number; unitType?: string; orderColumnStr?: string; orderStr?: string; regionTypeCode?: string;
    constructor() {
      this.currentPage = 0; this.pageSize = 0; this.regionId = 0; this.regionName = ""; this.unitName = ""; this.unitCode = ""; this.facilityName = ""; this.useState = 0; this.unitType = ""; this.orderColumnStr = ""; this.orderStr = ""; this.regionTypeCode = "";
    }
  }

  export interface List {
    id: number | string;
    regionId: number | string;
    regionName: string;
    unitName: string;
    unitCode: string;
    facilityName: string;
    facilityType: string;
    facilityTypeName: string;
    useState: number;
    useStateName: string;
    unitType: string;
    unitTypeName: string;
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
    hasNextPage: boolean;
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
* 监测点-接入指标数据项-Model类库
*/
export namespace IgetFindMonitorUnitTargetStrategySpace {

  export class RequestParams {
    id?: number;
    constructor() {
      this.id = 0;
    }
  }

  export interface MonitorUnitTargetListVOList {
    targetDataId: string;
    targetDataName: string;
    targetDataType: string;
    targetName: string;
    targetMeasureUnitName: string;
    targetFrequencyType: string;
    targetFrequency: number;
    targetFrequencyUnit: string;
    targetTimeList: string[];
    targetDataIsMultiple: number;
    formulaName: string;
  }


  export interface MonitorUnitStrategyListVOList {
    id?: string;
    strategyId: string;
    strategyName: string;
    eventTypeCode: string;
    eventTypeName: string;
    isTemplate: number;
    targetDataNameList: string[];
    targetDataIdList: string[];
  }

  export interface MonitorEquipNameList { }

  export interface Data {
    monitorUnitName: string;
    monitorRegionName: string;
    monitorUnitAddress: string;
    monitorUnitTargetListVOList: MonitorUnitTargetListVOList[];
    monitorUnitStrategyListVOList: MonitorUnitStrategyListVOList[];
    monitorEquipNameList: MonitorEquipNameList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 监测点-删除-Model类库
*/
export namespace IdeleteMSpace {

  export class RequestParams {
    id?: number;
    constructor() {
      this.id = 0;
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
      * 校验名称是否重复-Model类库
      */
export namespace IpostCheckIfNameExistSpace {

  export class RequestParams {
    unitName?: string; unitId?: number;
    constructor() {
      this.unitName = ""; this.unitId = 0;
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
      * 策略关联监测点信息-Model类库
      */
export namespace IgetListMonitorStrategyUnitSpace {

  export class RequestParams {
    monitorStrategyId?: number;
    constructor() {
      this.monitorStrategyId = 0;
    }
  }

  export interface Data {
    id: number;
    name: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 根据策略查询监测点树-Model类库
*/
export namespace IgetRegionMonitorUnitTreeSpace {

  export class RequestParams {
    monitorStrategyId?: number;
    constructor() {
      this.monitorStrategyId = 0;
    }
  }

  export interface UnitList {
    unitId: number;
    unitName: string;
    streetAreaCode: string;
    streetAreaName: string;
    treeType: string;
    facilityTypeCode: string;
    regionName: string;
  }

  export interface RegionList {
    regionTypeCode: string;
    regionId: number;
    regionName: string;
    treeType: string;
    unitList: UnitList[];
  }

  export interface Data {
    regionTypeName: string;
    regionTypeCode: string;
    treeType: string;
    regionList: RegionList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 配置策略关联监测点-Model类库
*/
export namespace IpostAddStrategyUnitSpace {

  export class RequestParams {
    monitorStrategyId?: number; unitIds?: [];
    constructor() {
      this.monitorStrategyId = 0; this.unitIds = [];
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
      * 查询策略执行时间调整列表-Model类库
      */
      export namespace IgetListStrategyTaskModifyLogSpace {

        export class RequestParams{
          strategyId?:number;
          constructor(){
            this.strategyId=0;
          }
        }

      export interface Data {
        taskTime: string;
        operateTime: string;
      }

      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }

      /**
      * 调整策略执行时间-Model类库
      */
export namespace IgetModifyStrategyTaskTimeSpace {

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: boolean;
  }
  }
