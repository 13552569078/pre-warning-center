/* eslint-disable @typescript-eslint/no-namespace */

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
* 监测点-风险分类-Model类库
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
    unitFactorId: string;
    factorId: string;
    factorName: string;
    formulaCode: string;
    formulaCodeName: string;
    formulaExpression: string;
    formulaUrl: string;
    accessDataCodes: AccessDataCode[];
  }

  export interface Data {
    unitId: string;
    unitEventId: string;
    eventTypeCode: string;
    eventTypeName: string;
    frequencyList: FrequencyList[];
    monitorFactors: MonitorFactor[];
    unitEventOutputCode: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 监测点-修改-Model类库
*/
export namespace IpostUpdateUnitSpace {

  export class RequestParams {
    id?: string; regionId?: string; unitName?: string; unitCode?: string; address?: string; longitude?: string; latitude?: string; equipIdList?: string[]; description?: string;
    constructor() {
      this.id = ''; this.regionId = ''; this.unitName = ""; this.unitCode = ""; this.address = ""; this.longitude = ""; this.latitude = ""; this.equipIdList = ['']; this.description = "";
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
* 监测点风险分类-删除-Model类库
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
* 监测点-基本信息-Model类库
*/
export namespace IgetBaseInfoSpace {

  export class RequestParams {
    id?: number;
    constructor() {
      this.id = 0;
    }
  }

  export interface EquipIdList { }

  export interface EquipNameList { }

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
    equipIdList: EquipIdList[];
    equipNameList: EquipNameList[];
    photoFile: any[]
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 监测点-更新报警预警策略-Model类库
*/
export namespace IpostFrequencyStrategySpace {

  export class RequestParams {
    unitEventList?: [];
    constructor() {
      this.unitEventList = [];
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
* 监测点-新增-Model类库
*/
export namespace IaddSpace {

  export class RequestParams {
    id?: number; regionId?: number; unitName?: string; unitCode?: string; address?: string; longitude?: string; latitude?: string; equipIdList?: []; description?: string;
    constructor() {
      this.id = 0; this.regionId = 0; this.unitName = ""; this.unitCode = ""; this.address = ""; this.longitude = ""; this.latitude = ""; this.equipIdList = []; this.description = "";
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
    id?: number;
    constructor() {
      this.id = 0;
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
* 监测点列表-分页查询-Model类库
*/
export namespace IpostPageSpace {

  export class RequestParams {
    currentPage?: number; pageSize?: number; regionId?: number; regionName?: string;
    constructor() {
      this.currentPage = 0; this.pageSize = 0; this.regionId = 0; this.regionName = "";
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