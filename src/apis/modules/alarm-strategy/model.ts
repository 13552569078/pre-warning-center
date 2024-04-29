/* eslint-disable @typescript-eslint/no-namespace */

/**
 * 保存监测点策略(创建新的策略)-Model类库
 */
export namespace IpostAddMonitorUnitStrategySpace {
  export class RequestParams {
    monitorUnitId?: number;
    strategyType?: number;
    templateId?: number;
    strategyName?: string;
    eventTypeCode?: string;
    targetId?: number;
    excuteCronExpression?: string;
    silentCronExpression?: string;
    strategyDesc?: string;
    strategyRuleParams?: [];
    constructor() {
      this.monitorUnitId = 0;
      this.strategyType = 0;
      this.templateId = 0;
      this.strategyName = "";
      this.eventTypeCode = "";
      this.targetId = 0;
      this.excuteCronExpression = "";
      this.silentCronExpression = "";
      this.strategyDesc = "";
      this.strategyRuleParams = [];
    }
  }

  export interface Model {
    code: number;
    desc: string;
    tips: string;
    data: boolean;
  }
}
/**
 * 根据监测点的报警策略列表(分页)-Model类库
 */
export namespace IgetFindMonitorUnitStrategyPageSpace {
  export class RequestParams {
    param?: any;
    constructor() {
      this.param = "";
    }
  }

  export interface List {
    monitorUnitId: number;
    unitFrequencyId: number | string;
    unitName: string;
    monitorStrategyId: number;
    strategyName: string;
    eventTypeCode: string;
    eventTypeCodeName: string;
    targetName: string;
    strategyState: number;
    strategyStateName: string;
    strategyLanuchTime: string;
    excuteCronExpression: string;
    silentCronExpression: string;
    createdAt: string;
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
    code: number;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 报警策略列表(分页)-Model类库
 */
export namespace IgetFindMonitorStrategyPageSpace {
  export class RequestParams {
    param?: any;
    constructor() {
      this.param = "";
    }
  }

  export interface OutEntityTag {
    outEntityKeyCode: string;
    outEntityKeyName: string;
    outEntityValue: string;
  }

  export interface UnitVO {
    monitorUnitId: number;
    unitName: string;
    accessDataCode: string;
    outEntityTags: OutEntityTag[];
  }

  export interface List {
    monitorStrategyId: number;
    strategyName: string;
    eventTypeCode: string;
    eventTypeCodeName: string;
    targetName: string;
    unitName: string;
    relationUnitNum: number;
    unitVOS: UnitVO[];
    excuteCronExpression: string;
    silentCronExpression: string;
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
    code: number;
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
    strategyType?: number;
    templateId?: number;
    strategyName?: string;
    eventTypeCode?: string;
    targetId?: number;
    excuteCronExpression?: string;
    silentCronExpression?: string;
    strategyDesc?: string;
    strategyRuleParams?: [];
    monitorUnitIds?: [];
    constructor() {
      this.strategyType = 0;
      this.templateId = 0;
      this.strategyName = "";
      this.eventTypeCode = "";
      this.targetId = 0;
      this.excuteCronExpression = "";
      this.silentCronExpression = "";
      this.strategyDesc = "";
      this.strategyRuleParams = [];
      this.monitorUnitIds = [];
    }
  }

  export interface Model {
    code: number;
    desc: string;
    tips: string;
    data: boolean;
  }
}
/**
 * 修改策略关联的监测点-Model类库
 */
export namespace IpostModifyMonitorStrategyUnitSpace {
  export class RequestParams {
    monitorStrategyId?: number;
    monitorUnitIds?: [];
    constructor() {
      this.monitorStrategyId = 0;
      this.monitorUnitIds = [];
    }
  }

  export interface Model {
    code: number;
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
    monitorStrategyId?: number;
    constructor() {
      this.monitorStrategyId = 0;
    }
  }

  export interface StrategyRuleFactorVO {
    strategyRuleFactorId: number;
    factorId: number;
    factorName: string;
    measureUnit: string;
    factorDataType: string;
    factorDataTypeName: string;
    factorValue: string;
  }

  export interface StrategyRuleVO {
    ruleId: number;
    ruleName: string;
    ruleLevel: number;
    ruleLevelName: string;
    ruleLogicRelationship: number;
    ruleDesc: string;
    strategyRuleFactorVOS: StrategyRuleFactorVO[];
  }

  export interface UnitVO {
    monitorUnitId: number;
    unitName: string;
    accessDataCode: string;
  }

  export interface Data {
    monitorStrategyId: number;
    strategyName: string;
    eventTypeCode: string;
    eventTypeCodeName: string;
    targetName: string;
    targetId: number;
    excuteCronExpression: string;
    silentCronExpression: string;
    strategyDesc: string;
    strategyRuleVOS: StrategyRuleVO[];
    unitVOS: UnitVO[];
    ruleCode: string;
    ruleValue: string;
  }

  export interface Model {
    code: number;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 查询策略关联的监测点列表,无分页-Model类库
 */
export namespace IgetListMonitorStrategyUnitVOsSpace {
  export class RequestParams {
    param?: any;
    constructor() {
      this.param = "";
    }
  }

  export interface OutEntityTag {
    outEntityKeyCode: string;
    outEntityKeyName: string;
    outEntityValue: string;
  }

  export interface Data {
    totalRow: number;
    list: Array<List>;
  }

  export interface List {
    monitorUnitId: number;
    unitName: string;
    accessDataCode: string;
    unitFrequencyId: string;
    outEntityTags: OutEntityTag[];
  }

  export interface Model {
    code: number;
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
    monitorStrategyId?: number;
    strategyType?: number;
    templateId?: number;
    strategyName?: string;
    eventTypeCode?: string;
    targetId?: number;
    excuteCronExpression?: string;
    silentCronExpression?: string;
    strategyDesc?: string;
    strategyRuleParams?: [];
    constructor() {
      this.monitorStrategyId = 0;
      this.strategyType = 0;
      this.templateId = 0;
      this.strategyName = "";
      this.eventTypeCode = "";
      this.targetId = 0;
      this.excuteCronExpression = "";
      this.silentCronExpression = "";
      this.strategyDesc = "";
      this.strategyRuleParams = [];
    }
  }

  export interface Model {
    code: number;
    desc: string;
    tips: string;
    data: boolean;
  }
}
/**
 * 启用/停用策略-Model类库
 */
export namespace IpostModifyMonitorStrategyStateSpace {
  export class RequestParams {
    unitStrategyStateParams?: [];
    strategyState?: number;
    constructor() {
      this.unitStrategyStateParams = [];
      this.strategyState = 0;
    }
  }

  export interface Model {
    code: number;
    desc: string;
    tips: string;
    data: boolean;
  }
}
/**
 * 根据监测策略另存为策略模板-Model类库
 */
export namespace IpostModifyMonitorStrategyToTemplateSpace {
  export class RequestParams {
    monitorStrategyId?: number;
    constructor() {
      this.monitorStrategyId = 0;
    }
  }

  export interface Model {
    code: number;
    desc: string;
    tips: string;
    data: boolean;
  }
}
/**
 * 监测/预警中枢查看策略配置是否可以进行配置-Model类库
 */
export namespace IgetFindMonitorStrategyRelatedConfigSpace {
  export class RequestParams {
    strategyType?: number;
    constructor() {
      this.strategyType = 0;
    }
  }

  export interface Model {
    code: number;
    desc: string;
    tips: string;
    data: boolean;
  }
}
/**
 * 监测点关联策略详情信息-Model类库
 */
export namespace IgetFindMonitorUnitStrategySpace {
  export class RequestParams {
    param?: any;
    constructor() {
      this.param = "";
    }
  }

  export interface StrategyRuleFactorVO {
    strategyRuleFactorId: number;
    factorId: number;
    factorName: string;
    measureUnit: string;
    factorDataType: string;
    factorDataTypeName: string;
    factorValue: string;
  }

  export interface StrategyRuleVO {
    ruleId: number;
    ruleName: string;
    ruleLevel: number;
    ruleLevelName: string;
    ruleLogicRelationship: number;
    ruleDesc: string;
    strategyRuleFactorVOS: StrategyRuleFactorVO[];
  }

  export interface Data {
    monitorUnitId: number;
    unitName: string;
    accessDataCode: string;
    monitorStrategyId: number;
    strategyName: string;
    eventTypeCode: string;
    eventTypeCodeName: string;
    targetName: string;
    targetId: number;
    excuteCronExpression: string;
    silentCronExpression: string;
    strategyDesc: string;
    strategyRuleVOS: StrategyRuleVO[];
    ruleCode: string;
    ruleValue: string;
    facilityType: string;
    facilityTypeName: string;
  }

  export interface Model {
    code: number;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 删除策略-Model类库
 */
export namespace IpostRemoveMonitorStrategySpace {
  export class RequestParams {
    monitorStrategyId?: number;
    constructor() {
      this.monitorStrategyId = 0;
    }
  }

  export interface Model {
    code: number;
    desc: string;
    tips: string;
    data: boolean;
  }
}
/**
 * 策略名称验重-Model类库
 */
 export namespace IgetFindstrategyNameVerifySpace {
  export class RequestParams {
    strategyName?: string;
    strategyId?: number;
    constructor() {
      this.strategyName = "";
      this.strategyId = 0;
    }
  }

  export interface Model {
    code: number;
    desc: string;
    tips: string;
    data: boolean;
  }
}