/* eslint-disable @typescript-eslint/no-namespace */

/**
* 监测点-删除-Model类库
*/
export namespace IdeleteVSpace {

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
    data: number;
  }
}
/**
* 监测点-修改-Model类库
*/
export namespace IpostUpdateUnitSpace {

  export class RequestParams {
    id?: number; regionId?: string; unitName?: string; unitCode?: string; address?: string; longitude?: string; latitude?: string; equipIdList?: string[]; description?: string; unitType?: string; altitude?: string; altitudeDatum?: string; streetAreaCode?: string; fileIds?: string; facilityType?: string; facilityIdList?: string[];
    constructor() {
      this.id = 0; this.regionId = ''; this.unitName = ""; this.unitCode = ""; this.address = ""; this.longitude = ""; this.latitude = ""; this.equipIdList = []; this.description = ""; this.unitType = ""; this.altitude = ""; this.altitudeDatum = ""; this.streetAreaCode = ""; this.fileIds = ""; this.facilityType = ""; this.facilityIdList = [];
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
* 监测点-查询报警预警策略-Model类库
*/
export namespace IgetFrequencyStrategySpace {

  export class RequestParams {
    id?: number; useFor?: number;
    constructor() {
      this.id = 0; this.useFor = 0;
    }
  }

  export interface FrequencyList {
    unitFrequencyId: number;
    frequencyName: string;
    alarmStrategyName: string;
    alarmStrategyId: number;
    warnStrategyName: string;
    warnStrategyId: number;
  }

  export interface Data {
    unitId: number;
    eventTypeCode: string;
    eventTypeName: string;
    frequencyList: FrequencyList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
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


  export interface Data {
    id: number;
    regionId: number;
    regionName: string;
    unitName: string;
    unitCode: string;
    address: string;
    longitude: string;
    latitude: string;
    useState: number;
    useStateName: string;
    useStateTime: string;
    description: string;
    equipIdList: string[];
    equipNameList: string[];
    unitType: string;
    unitTypeName: string;
    altitude: string;
    altitudeDatum: string;
    altitudeDatumName: string;
    streetAreaCode: string;
    streetAreaCodeName: string;
    photoFile: PhotoFile[];
    facilityType: string;
    facilityTypeName: string;
    facilityIdList: string[];
    facilityNameList: string[];
    updatedAt: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 监测点-事件类型-Model类库
*/
export namespace IgetEventTypesSpace {

  export class RequestParams {
    id?: string;
    constructor() {
      this.id = '';
    }
  }

  export interface FrequencyList {
    id: string;
    frequencyName: string;
    frequencyType: number;
    frequencyTypeName: string;
    frequencyCornStr: string;
    alarmStrategyName: string;
    alarmStrategyId: string;
    warnStrategyName: string;
    warnStrategyId: string;
  }

  export interface AccessDataCode {
    dataCode: string;
    dataCodeDesc: string;
  }

  export interface MonitorFactor {
    unitFactorId: number;
    factorId: number;
    factorName: string;
    accessDataCodes: AccessDataCode[];
    formulaCode: string;
    formulaCodeName: string;
    formulaExpression: string;
    formulaUrl: string;
  }

  export interface Data {
    unitId: string;
    unitEventId: string;
    eventTypeCode: string;
    eventTypeName: string;
    unitEventOutputCode: string;
    frequencyList: FrequencyList[];
    monitorFactors: MonitorFactor[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 监测点-接入数据配置-Model类库
*/
export namespace IpostUpdateAccessDataSpace {

  export class RequestParams {
    unitEventTypeList?: [];
    constructor() {
      this.unitEventTypeList = [];
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
* 监测点事件类型-删除-Model类库
*/
export namespace IdeleteESpace {

  export class RequestParams {
    unitEventId?: number;
    constructor() {
      this.unitEventId = 0;
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
    currentPage?: number; pageSize?: number; regionId?: number; regionName?: string; unitName?: string; unitCode?: string; facilityName?: string; useState?: number; unitType?: string; orderColumnStr?: string; orderStr?: string;
    constructor() {
      this.currentPage = 0; this.pageSize = 0; this.regionId = 0; this.regionName = ""; this.unitName = ""; this.unitCode = ""; this.facilityName = ""; this.useState = 0; this.unitType = ""; this.orderColumnStr = ""; this.orderStr = "";
    }
  }

  export interface EventTypeName { }

  export interface List {
    id: number;
    regionId: number;
    regionName: string;
    unitName: string;
    unitCode: string;
    eventTypeNames: EventTypeName[];
    useState: number;
    useStateName: string;
    useStateTime: string;
    updatedAt: string;
    facilityName: string;
    facilityType: string;
    facilityTypeName: string;
    unitType: string;
    unitTypeName: string;
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
* 监测点-新增-Model类库
*/
export namespace IaddSpace {

  export class RequestParams {
    id?: number; regionId?: number; unitName?: string; unitCode?: string; address?: string; longitude?: string; latitude?: string; equipIdList?: []; description?: string; unitType?: string; altitude?: string; altitudeDatum?: string; streetAreaCode?: string; fileIds?: string; facilityType?: string; facilityIdList?: [];
    constructor() {
      this.id = 0; this.regionId = 0; this.unitName = ""; this.unitCode = ""; this.address = ""; this.longitude = ""; this.latitude = ""; this.equipIdList = []; this.description = ""; this.unitType = ""; this.altitude = ""; this.altitudeDatum = ""; this.streetAreaCode = ""; this.fileIds = ""; this.facilityType = ""; this.facilityIdList = [];
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
* 监测点-更新报警预警策略-Model类库
*/
export namespace IpostFrequencyStrategySpace {

  export class RequestParams {
    unitEventList?: []; useFor?: number;
    constructor() {
      this.unitEventList = []; this.useFor = 0;
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
      * 监测点频段树形结构-Model类库
      */
       export namespace IgetListRegionTypeUnitFrequencyTreeVOsSpace {

        export class RequestParams{
          useFor?:number;unitName?:string;eventTypeCodes?:any[];factorIds?:any[];
          constructor(){
            this.useFor=0;this.unitName="";this.eventTypeCodes=[];this.factorIds=[];
          }
        }
      
      export interface Children {
        frequencyId: number;
        frequencyName: string;
      }
      
      export interface Children {
        unitId: number;
        unitName: string;
        children: Children[];
      }
      
      export interface Children {
        regionId: number;
        regionName: string;
        regionTypeCode: string;
        children: Children[];
      }
      
      export interface Data {
        regionTypeName: string;
        regionTypeCode: string;
        children: Children[];
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }