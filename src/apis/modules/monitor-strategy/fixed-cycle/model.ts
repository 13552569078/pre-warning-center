/* eslint-disable @typescript-eslint/no-namespace */

/**
* 校验名称是否重复-Model类库
*/
export namespace IpostCheckIfNameExistSpace {

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: boolean;
  }
}
/**
* 查询策略关联的单元列表,分页-Model类库
*/
export namespace IpostFindMonitorStrategyUnitVOPageSpace {

  export class RequestParams {
    currentPage?: number; pageSize?: number; monitorStrategyId?: number; unitName?: string;
    constructor() {
      this.currentPage = 0; this.pageSize = 0; this.monitorStrategyId = 0; this.unitName = "";
    }
  }

  export interface List {
    monitorUnitId: number;
    unitName: string;
    unitCode: string;
    regionName: string;
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
* 新增监测策略-Model类库
*/
export namespace IpostAddMonitorStrategySpace {

  export class RequestParams {
    monitorUnitId?: number; monitorStrategyId?: number; strategyType?: number; strategyName?: string; eventTypeCode?: string; strategyDesc?: string; updatedAt?: string; createdAt?: string; facilityType?: string; clearType?: number; clearTypeInterval?: number; intervalTime?: number; strategyRuleParams?: []; silentConfigParams?: [];
    constructor() {
      this.monitorUnitId = 0; this.monitorStrategyId = 0; this.strategyType = 0; this.strategyName = ""; this.eventTypeCode = ""; this.strategyDesc = ""; this.updatedAt = ""; this.createdAt = ""; this.facilityType = ""; this.clearType = 0; this.clearTypeInterval = 0; this.intervalTime = 0; this.strategyRuleParams = []; this.silentConfigParams = [];
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
* 删除策略-Model类库
*/
export namespace IpostRemoveMonitorStrategySpace {

  export class RequestParams {

    constructor() {

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
* 根据单元的报警策略列表(分页)-Model类库
*/
export namespace IpostFindMonitorUnitStrategyPageSpace {

  export class RequestParams {
    currentPage?: number; pageSize?: number; useFor?: number; strategyName?: string; eventTypeCodes?: []; unitName?: string; regionName?: string; orderColumnStr?: string; orderStr?: string;
    constructor() {
      this.currentPage = 0; this.pageSize = 0; this.useFor = 0; this.strategyName = ""; this.eventTypeCodes = []; this.unitName = ""; this.regionName = ""; this.orderColumnStr = ""; this.orderStr = "";
    }
  }

  export interface List {
    regionId: number;
    regionName: string;
    monitorUnitId: number;
    unitName: string;
    monitorStrategyId: number;
    strategyName: string;
    eventTypeCode: string;
    eventTypeCodeName: string;
    strategyState: number;
    strategyStateName: string;
    strategyLanuchTime: string;
    createdAt: string;
    updatedAt: string;
    facilityName: string;
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
* 报警策略列表(分页)-Model类库
*/
export namespace IpostFindMonitorStrategyPageSpace {

  export class RequestParams {
    currentPage?: number; pageSize?: number; useFor?: number; strategyName?: string; eventTypeCodes?: []; isTemplate?: number; orderColumnStr?: string; orderStr?: string; triggerTypes?:string[]
    constructor() {
      this.currentPage = 0; this.pageSize = 0; this.useFor = 0; this.strategyName = ""; this.eventTypeCodes = []; this.isTemplate = 0; this.orderColumnStr = ""; this.orderStr = "";this.triggerTypes = [];
    }
  }

  export interface List {
    triggerType: string;
    monitorStrategyId: string;
    strategyName: string;
    eventTypeCode: string;
    eventTypeCodeName: string;
    targetName: string;
    unitName: string;
    relationUnitNum: number;
    isTemplate: number;
    createdAt: string;
    updatedAt: string;
    facilityType: string;
    facilityTypeName: string;
    strategyDesc: string;
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
* 设为/取消模板-Model类库
*/
export namespace IpostModifyTemplateSpace {

  export class RequestParams {
    monitorStrategyId?: number; isTemplate?: number;
    constructor() {
      this.monitorStrategyId = 0; this.isTemplate = 0;
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
* 策略详情-Model类库
*/
export namespace IgetFindMonitorStrategySpace {

  export class RequestParams {
    monitorStrategyId?: number; userFor?: number;
    constructor() {
      this.monitorStrategyId = 0; this.userFor = 0;
    }
  }

  export interface StrategyRuleFactorVO {
    targetName: string;
    targetId: number;
    factorId: number;
    factorValue: string;
  }

  export interface StrategyRuleVO {
    ruleId: number;
    ruleName: string;
    ruleLevel: string;
    ruleLevelName: string;
    ruleLogicRelationship: number;
    ruleDesc: string;
    lastTimes: number;
    totalDuration: number;
    totalTimes: number;
    strategyRuleFactorVOS: StrategyRuleFactorVO[];
  }

  export interface UnitVO {
    monitorUnitId: number;
    unitName: string;
    unitFrequencyId: number;
    frequencyName: string;
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

  export interface SilentConfigVO {
    strategySilentConfigId: number;
    dateStart: string;
    timeStart: TimeStart;
    dateEnd: string;
    timeEnd: TimeEnd;
  }

  export interface Data {
    monitorStrategyId: number;
    strategyName: string;
    eventTypeCode: string;
    eventTypeCodeName: string;
    strategyDesc: string;
    strategyRuleVOS: StrategyRuleVO[];
    unitVOS: UnitVO[];
    silentConfigVOS: SilentConfigVO[];
    updatedAt: string;
    createdAt: string;
    facilityType: string;
    facilityTypeName: string;
    clearType: number;
    clearTypeInterval: number;
    intervalTime: number;
    alarmInterval: string;
    intervalTimeUnit: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 修改监测策略-Model类库
*/
export namespace IpostModifyMonitorStrategySpace {

  export class RequestParams {
    monitorUnitId?: number; monitorStrategyId?: number; strategyType?: number; strategyName?: string; eventTypeCode?: string; strategyDesc?: string; updatedAt?: string; createdAt?: string; facilityType?: string; clearType?: number; clearTypeInterval?: number; intervalTime?: number; strategyRuleParams?: []; silentConfigParams?: [];
    constructor() {
      this.monitorUnitId = 0; this.monitorStrategyId = 0; this.strategyType = 0; this.strategyName = ""; this.eventTypeCode = ""; this.strategyDesc = ""; this.updatedAt = ""; this.createdAt = ""; this.facilityType = ""; this.clearType = 0; this.clearTypeInterval = 0; this.intervalTime = 0; this.strategyRuleParams = []; this.silentConfigParams = [];
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
* 查询监测点配置策略列表-Model类库
*/
export namespace IpostFindMonitorUnitStrategyListPageSpace {

  export class RequestParams {
    currentPage?: number; pageSize?: number; unitId?: number; targetDataIdList?: []; strategyIdList?: [];
    constructor() {
      this.currentPage = 0; this.pageSize = 0; this.unitId = 0; this.targetDataIdList = []; this.strategyIdList = [];
    }
  }

  export interface List {
    id?: string;
    strategyId: string;
    strategyName: string;
    eventTypeCode: string;
    eventTypeName: string;
    targetDataNameList: string[];
    targetDataIdList: string[],
    isTemplate: number;
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

export namespace IgetFindTargetFrequencyCommonMultipleSpace {

  export class RequestParams {
    targetIds?: [];
    constructor() {
      this.targetIds = [];
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
* 查询策略版本详情-Model类库
*/
export namespace IgetFindMonitorStrategyVersionDetailSpace {

  export class RequestParams {
    versionId?: string; strategyId?: string;
    constructor() {
      this.versionId = ''; this.strategyId = '';
    }
  }

  export interface StrategyRuleFactorVO {
    targetName: string;
    targetId: number;
    targetFrequency: number;
    targetFrequencyUnit: string;
    factorId: number;
    factorValue: string;
    factorDataTypeCode: string;
  }

  export interface StrategyRuleVO {
    ruleId: string;
    ruleCode: string;
    ruleName: string;
    ruleLevel: string;
    ruleLevelName: string;
    ruleLogicRelationship: number;
    ruleDesc: string;
    conditionType: number;
    lastTimes: number;
    totalDuration: number;
    totalDurationUnit: string;
    totalTimes: number;
    strategyRuleFactorVOS: StrategyRuleFactorVO[];
    targetFrequencyCycle: number;
    triggerType: string;
  }

  export interface UnitVO {
    monitorUnitId: number;
    unitName: string;
    unitFrequencyId: number;
    frequencyName: string;
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

  export interface SilentConfigVO {
    strategySilentConfigId: number;
    dateStart: string;
    timeStart: TimeStart;
    dateEnd: string;
    timeEnd: TimeEnd;
  }

  export interface Data {
    isReuseData: any,
    warningObject: any,
    clearTypeUnit: string;
    monitorStrategyId: string;
    strategyName: string;
    eventTypeCode: string;
    eventTypeCodeName: string;
    strategyDesc: string;
    strategyRuleVOS: StrategyRuleVO[];
    unitVOS: UnitVO[];
    silentConfigVOS: SilentConfigVO[];
    updatedAt: string;
    createdAt: string;
    facilityType: string;
    facilityTypeName: string;
    clearType: number;
    clearTypeInterval: number;
    intervalTime: number;
    intervalTimeUnit: string;
    tenantId: string;
    triggerType: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 查询当前策略是否关联监测点-Model类库
*/
export namespace IgetCheckIfRelatedUnitSpace {

  export class RequestParams {
    strategyId?: number;
    constructor() {
      this.strategyId = 0;
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
* 查询策略历史版本-Model类库
*/
export namespace IgetListMonitorStrategyVersionSpace {

  export class RequestParams {
    strategyId?: number;
    constructor() {
      this.strategyId = 0;
    }
  }

  export interface Data {
    versionId: number;
    versionName: string;
    strategyId: number;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 修改监测策略名称和描述-Model类库
*/
export namespace IpostModifyMonitorStrategyNameAndDescSpace {

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: boolean;
  }
}

/**
* 查询策略版本信息-Model类库
*/
export namespace IgetFindMonitorStrategyVersionVOSpace {

  export class RequestParams {
    versionId?: string;
    constructor() {
      this.versionId = '';
    }
  }

  export interface Data {
    versionId: string;
    versionName: string;
    strategyId: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
