/* eslint-disable @typescript-eslint/no-namespace */

/**
* 查询策略版本详情-Model类库
*/
export namespace IgetFindMonitorStrategyVersionDetailSpace {

    export class RequestParams {
        versionId?: number; strategyId?: number;
        constructor() {
            this.versionId = 0; this.strategyId = 0;
        }
    }

    export interface ThresholdLevelVOList {
        thresholdLevelId: number;
        thresholdLevelName: string;
        thresholdLevelValue: string;
    }

    export interface StrategyRuleFactorVO {
        targetName: string;
        targetId: number;
        targetFrequency: number;
        targetFrequencyUnit: string;
        factorId: number;
        factorValue: string;
        factorDataTypeCode: string;
        thresholdLevelVOList: ThresholdLevelVOList[];
    }

    export interface StrategyRuleVO {
        ruleId: number;
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
        alarmTitle: string;
        alarmDesc: string;
        warningNumberThresholdValue: string;
        rateThresholdValue: string;
        strategyCalculateFrequencyCorn: string;
        warningRuleModel: string;
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

    export interface MonitorRegion {
        regionId: number;
        regionName: string;
    }

    export interface UnitId { }

    export interface EventTypeList {
        eventTypeCode: string;
        eventTypeName: string;
    }

    export interface WarningObject {
        monitorRegions: MonitorRegion[];
        targetId: number;
        unitIds: UnitId[];
        eventTypeList: EventTypeList[];
    }

    export interface StatisticalItemsTypeList { }

    export interface SecondaryWarningStrategyFilterCriteriaVO {
        statisticalItemsTypeList: StatisticalItemsTypeList[];
        statisticalItemsTypeName: string;
        warningNumberType: string;
        warningNumberTypeName: string;
        statisticalDuration: number;
        statisticalDurationUnit: string;
        statisticalDurationUnitName: string;
        statisticalCycleType: string;
        statisticalCycleTypeName: string;
        accessoryId: string;
        accessoryIdName: string;
    }

    export interface Data {
        versionId: number;
        versionName: string;
        monitorStrategyId: number;
        strategyName: string;
        triggerType: string;
        triggerTypeName: string;
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
        clearTypeValue: string;
        clearTypeUnit: string;
        clearTypeInterval: number;
        intervalTime: number;
        intervalTimeUnit: string;
        tenantId: string;
        warningObject: WarningObject;
        secondaryWarningStrategyFilterCriteriaVO: SecondaryWarningStrategyFilterCriteriaVO;
    }

    export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
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

    export interface ThresholdLevelVOList {
        thresholdLevelId: number;
        thresholdLevelName: string;
        thresholdLevelValue: string;
    }

    export interface StrategyRuleFactorVO {
        targetName: string;
        targetId: number;
        targetFrequency: number;
        targetFrequencyUnit: string;
        factorId: number;
        factorValue: string;
        factorDataTypeCode: string;
        thresholdLevelVOList: ThresholdLevelVOList[];
    }

    export interface StrategyRuleVO {
        ruleId: number;
        ruleCode: number;
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
        alarmTitle: string;
        alarmDesc: string;
        warningNumberThresholdValue: string;
        rateThresholdValue: string;
        strategyCalculateFrequencyCorn: string;
        warningRuleModel: string;
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

    export interface MonitorRegion {
        regionId: number;
        regionName: string;
    }

    export interface UnitId { }

    export interface EventTypeList {
        eventTypeCode: string;
        eventTypeName: string;
    }

    export interface WarningObject {
        monitorRegions: MonitorRegion[];
        targetId: number;
        unitIds: UnitId[];
        eventTypeList: EventTypeList[];
    }

    export interface StatisticalItemsTypeList { }

    export interface SecondaryWarningStrategyFilterCriteriaVO {
        statisticalItemsTypeList: StatisticalItemsTypeList[];
        statisticalItemsTypeName: string;
        warningNumberType: string;
        warningNumberTypeName: string;
        statisticalDuration: number;
        statisticalDurationUnit: string;
        statisticalDurationUnitName: string;
        statisticalCycleType: string;
        statisticalCycleTypeName: string;
        accessoryId: string;
        accessoryIdName: string;
    }

    export interface Data {
        versionId: number;
        versionName: string;
        monitorStrategyId: number;
        strategyName: string;
        triggerType: string;
        triggerTypeName: string;
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
        clearTypeValue: string;
        clearTypeUnit: string;
        clearTypeInterval: number;
        intervalTime: number;
        intervalTimeUnit: string;
        tenantId: string;
        warningObject: WarningObject;
        secondaryWarningStrategyFilterCriteriaVO: SecondaryWarningStrategyFilterCriteriaVO;
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
        monitorUnitId?: number; monitorStrategyId?: number; strategyType?: number; strategyName?: string; triggerType?: string; eventTypeCode?: string; strategyDesc?: string; updatedAt?: string; createdAt?: string; facilityType?: string; clearType?: number; clearTypeInterval?: number; clearTypeValue?: string; clearTypeUnit?: string; intervalTime?: number; intervalTimeUnit?: string; strategyRuleParams?: []; silentConfigParams?: []; warningObject?: any; strategyFilterCriteriaParam?: any;
        constructor() {
            this.monitorUnitId = 0; this.monitorStrategyId = 0; this.strategyType = 0; this.strategyName = ""; this.triggerType = ""; this.eventTypeCode = ""; this.strategyDesc = ""; this.updatedAt = ""; this.createdAt = ""; this.facilityType = ""; this.clearType = 0; this.clearTypeInterval = 0; this.clearTypeValue = ""; this.clearTypeUnit = ""; this.intervalTime = 0; this.intervalTimeUnit = ""; this.strategyRuleParams = []; this.silentConfigParams = []; this.warningObject = ""; this.strategyFilterCriteriaParam = "";
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
* 新增监测策略-Model类库
*/
export namespace IpostAddMonitorStrategySpace {

    export class RequestParams {
        monitorUnitId?: number; monitorStrategyId?: number; strategyType?: number; strategyName?: string; triggerType?: string; eventTypeCode?: string; strategyDesc?: string; updatedAt?: string; createdAt?: string; facilityType?: string; clearType?: number; clearTypeInterval?: number; clearTypeValue?: string; clearTypeUnit?: string; intervalTime?: number; intervalTimeUnit?: string; strategyRuleParams?: []; silentConfigParams?: []; warningObject?: any; strategyFilterCriteriaParam?: any;
        constructor() {
            this.monitorUnitId = 0; this.monitorStrategyId = 0; this.strategyType = 0; this.strategyName = ""; this.triggerType = ""; this.eventTypeCode = ""; this.strategyDesc = ""; this.updatedAt = ""; this.createdAt = ""; this.facilityType = ""; this.clearType = 0; this.clearTypeInterval = 0; this.clearTypeValue = ""; this.clearTypeUnit = ""; this.intervalTime = 0; this.intervalTimeUnit = ""; this.strategyRuleParams = []; this.silentConfigParams = []; this.warningObject = ""; this.strategyFilterCriteriaParam = "";
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
      * 获取cron表达式下次执行时间-Model类库
      */
export namespace IgetFindNextExecTimeSpace {

    export class RequestParams {
        cron?: string;
        constructor() {
            this.cron = "";
        }
    }

    // export interface Data { }

    export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: string[];
    }
}

/**
* 校验corn表达式-Model类库
*/
export namespace IgetCheckCornSpace {

    export class RequestParams {
        cron?: string;
        constructor() {
            this.cron = "";
        }
    }

    export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: boolean;
    }
}