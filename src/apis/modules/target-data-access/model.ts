/* eslint-disable @typescript-eslint/no-namespace */

/**
 * 分页查询指标数据项-Model类库
 */
export namespace IpostPageSpace {
  export class RequestParams {
    currentPage?: number;
    pageSize?: number;
    targetTypeCode?: string;
    targetDataIds?: [];
    selectedTargetIds?: [];
    dataType?: string;
    targetDataName?: string;
    isMultiple?: number;
    targetFrequency?: number;
    orderColumnStr?: string;
    orderStr?: string;
    constructor() {
      this.currentPage = 0;
      this.pageSize = 0;
      this.targetTypeCode = "";
      this.targetDataIds = [];
      this.selectedTargetIds = [];
      this.dataType = "";
      this.targetDataName = "";
      this.isMultiple = 0;
      this.targetFrequency = 0;
      this.orderColumnStr = "";
      this.orderStr = "";
    }
  }

  export interface TimeStart {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeEnd {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeScope {
    targetDataId: number;
    dateStart: string;
    timeStart: TimeStart;
    dateEnd: string;
    timeEnd: TimeEnd;
  }

  export interface List {
    id?: string;
    targetDataId: number;
    accessItemId: number;
    accessSourceObjectName: string;
    targetId: number;
    targetName: string;
    targetTypeId: number;
    targetTypeName: string;
    dataType: string;
    dataTypeName: string;
    targetDataName: string;
    isMultiple: number;
    formulaId: number;
    formulaName: string;
    targetFrequency: number;
    targetFrequencyName?: string;
    targetFrequencyUnit: string;
    targetFrequencyUnitName: string;
    measureUnitName: string;
    initCollectTime: string;
    updatedAt: string;
    timeScopes: TimeScope[];
    thresholdLevelValue?: string;
    thresholdLevelVOList?: any[] | string;
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
 * 新增复合指标数据项-Model类库
 */
export namespace IpostAddMultipleTargetDataSpace {
  export class RequestParams {
    targetDataId?: number;
    accessItemId?: number;
    targetId?: number;
    targetDataName?: string;
    isMultiple?: number;
    formulaId?: number;
    equipId?: number;
    initCollectTime?: string;
    timeScopeParams?: [];
    referTargetDataIds?: [];
    constructor() {
      this.targetDataId = 0;
      this.accessItemId = 0;
      this.targetId = 0;
      this.targetDataName = "";
      this.isMultiple = 0;
      this.formulaId = 0;
      this.equipId = 0;
      this.initCollectTime = "";
      this.timeScopeParams = [];
      this.referTargetDataIds = [];
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
 * 查询指标数据项列表-Model类库
 */
export namespace IlistSpace {
  export class RequestParams {
    targetId?: number;
    constructor() {
      this.targetId = 0;
    }
  }

  export interface Data {
    targetDataId: number;
    targetId: number;
    targetDataName: string;
    unitName: string;
    isMultiple: number;
    isPublic: number;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
 * 编辑简单指标数据项-Model类库
 */
export namespace IpostUpdateSimpleTargetDataSpace {
  export class RequestParams {
    targetDataId?: number;
    accessItemId?: number;
    targetId?: number;
    targetDataName?: string;
    isMultiple?: number;
    formulaId?: number;
    equipId?: number;
    initCollectTime?: string;
    timeScopeParams?: [];
    constructor() {
      this.targetDataId = 0;
      this.accessItemId = 0;
      this.targetId = 0;
      this.targetDataName = "";
      this.isMultiple = 0;
      this.formulaId = 0;
      this.equipId = 0;
      this.initCollectTime = "";
      this.timeScopeParams = [];
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
 * 查询指标数据项详情-Model类库
 */
export namespace IgetDetailSpace {
  export class RequestParams {
    targetDataId?: number;
    constructor() {
      this.targetDataId = 0;
    }
  }

  export interface TimeStart {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeEnd {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeScope {
    targetDataId: number;
    dateStart: string;
    timeStart: TimeStart;
    dateEnd: string;
    timeEnd: TimeEnd;
  }

  export interface TimeStart {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeEnd {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeScope {
    targetDataId: number;
    dateStart: string;
    timeStart: TimeStart;
    dateEnd: string;
    timeEnd: TimeEnd;
  }

  export interface ReferTargetData {
    targetDataId: number;
    accessItemId: number;
    accessSourceObjectName: string;
    targetId: number;
    targetName: string;
    targetTypeId: number;
    targetTypeName: string;
    dataType: string;
    dataTypeName: string;
    targetDataName: string;
    isMultiple: number;
    formulaId: number;
    formulaName: string;
    targetFrequency: number;
    targetFrequencyUnit: string;
    targetFrequencyUnitName: string;
    measureUnitName: string;
    initCollectTime: string;
    updatedAt: string;
    timeScopes: TimeScope[];
  }

  export interface Data {
    targetDataId: number;
    accessItemId: number;
    accessSourceObjectName: string;
    targetId: number;
    targetName: string;
    targetTypeId: number;
    targetTypeName: string;
    dataType: string;
    dataTypeName: string;
    targetDataName: string;
    isMultiple: number;
    formulaId: number;
    formulaName: string;
    targetFrequency: number;
    targetFrequencyUnit: string;
    targetFrequencyUnitName: string;
    measureUnitName: string;
    initCollectTime: string;
    updatedAt: string;
    timeScopes: TimeScope[];
    referTargetData: ReferTargetData[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 批量新增基础指标数据项-Model类库
 */
export namespace IpostAddSimpleTargetDataSpace {
  export class RequestParams {
    simpleTargetParams?: [];
    targetId?: number;
    constructor() {
      this.simpleTargetParams = [];
      this.targetId = 0;
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
 * 删除指标数据项-Model类库
 */
export namespace IdeleteSpace {
  export class RequestParams {
    targetDataId?: number;
    constructor() {
      this.targetDataId = 0;
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
 * 编辑复合指标数据项-Model类库
 */
export namespace IpostUpdateMultipleTargetDataSpace {
  export class RequestParams {
    targetDataId?: number;
    accessItemId?: number;
    targetId?: number;
    targetDataName?: string;
    isMultiple?: number;
    formulaId?: number;
    equipId?: number;
    initCollectTime?: string;
    timeScopeParams?: [];
    referTargetDataIds?: [];
    constructor() {
      this.targetDataId = 0;
      this.accessItemId = 0;
      this.targetId = 0;
      this.targetDataName = "";
      this.isMultiple = 0;
      this.formulaId = 0;
      this.equipId = 0;
      this.initCollectTime = "";
      this.timeScopeParams = [];
      this.referTargetDataIds = [];
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
     * 调整阈值-Model类库
     */
export namespace IpostAdjustThresholdLevelSpace {

  export class RequestParams {
    thresholdLevelValue?: string; targetDataId?: number;
    constructor() {
      this.thresholdLevelValue = ""; this.targetDataId = 0;
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
      * 查询指标阈值等级-Model类库
      */
export namespace IgetTargetThresholdLevelVOListSpace {

  export class RequestParams{
    targetId?:number;
    constructor(){
      this.targetId=0;
    }
  }

export interface Data {
	thresholdLevelId: number;
	thresholdLevelName: string;
	thresholdLevelValue: string;
	isRefer: number;
}

export interface Model {
	code: string;
	desc: string;
	tips: string;
	data: Data[];
}
}
      /**
      * 批量指标阈值维护-Model类库
      */
export namespace IpostBatchAdjustThresholdLevelSpace {

export interface Model {
	code: string;
	desc: string;
	tips: string;
	data: boolean;
}
}
    