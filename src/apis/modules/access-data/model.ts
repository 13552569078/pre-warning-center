/* eslint-disable @typescript-eslint/no-namespace */

/**
 * 查询监测数据列表-Model类库
 */
export namespace IgetFindMonitorDataPageSpace {

  export interface ColumnHeaderList {
    dataId: number;
    code: string;
    codeName: string;
    value: number;
    formulaCode: string;
    formulaCodeName: string;
  }

  export interface MonitorDataList {
    dataId: number;
    code: string;
    codeName: string;
    value: number;
    formulaCode: string;
    formulaCodeName: string;
  }

  export interface List {
    monitorPointId: number;
    monitorPointName: string;
    monitorTime: string;
    handleTime: string;
    columnHeaderList: ColumnHeaderList[];
    monitorDataList: MonitorDataList[];
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
 * 查询监测数据详情-Model类库
 */
export namespace IgetFindMonitorDataDetailSpace {

  export interface Data {
    monitorPointId: number;
    monitorPointName: string;
    monitorPointCode: string;
    dataValue: string;
    monitorTime: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 查询监测点树-Model类库
*/
export namespace IgetListMonitorEventTreesSpace {

  export interface children {
    id: string;
    code: string;
    name: string;
    children: children[];
    uniqueId?: string;
    value?: string;
  }

  export interface Data {
    id: string;
    code: string;
    name: string;
    uniqueId?: string;
    value?: string;
    label?: string;
    children: children[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 查询开始时间-Model类库
*/
export namespace IgetFindStartTimeSpace {

  export class RequestParams {
    type?: number; pointId?: number;
    constructor() {
      this.type = 0; this.pointId = 0;
    }
  }

  export interface Data {
    startTime: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 查询报警预警信息列表-Model类库
 */
export namespace IgetFindAlarmDataPageSpace {

  export class RequestParams{
    currentPage?:number;pageSize?:number;useFor?:number;monitorRegionId?:number;monitorRegionName?:string;monitorPointName?:string;monitorPointId?:number;eventTypeCodeList?:[];alarmLevelCodeList?:[];startTime?:string;endTime?:string;
    constructor(){
      this.currentPage=0;this.pageSize=0;this.useFor=0;this.monitorRegionId=0;this.monitorRegionName="";this.monitorPointId=0;this.monitorPointName="";this.eventTypeCodeList=[];this.alarmLevelCodeList=[];this.startTime="";this.endTime="";
    }
  }

  export interface List {
    monitorRegionId: number;
    monitorRegionName: string;
    monitorPointId: number;
    monitorPointName: string;
    eventTypeCode: string;
    eventTypeName: string;
    alarmLevelCode: string;
    alarmLevelName: string;
    alarmTime: string;
    alarmTitle: string;
    alarmState: number;
    alarmEndTime: string;
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
* 查询接入数据列表-Model类库
*/
export namespace IgetFindAccessDatePageSpace {

  export class RequestParams {
    currentPage?: number; pageSize?: number; monitorPointId?: string | string; startTime?: string; endTime?: string; eventId?: string; eventTypeCode: string;
    constructor() {
      this.currentPage = 0; this.pageSize = 10; this.monitorPointId = ''; this.startTime = ""; this.endTime = ""; this.eventId = ""; this.eventTypeCode = "";
    }
  }

  export interface List {
    dataId: number;
    accessDataCode: string;
    dataValue: string;
    collectTime: string;
    accessTime: string;
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
 * 查询监测事件详情-Model类库
 */
export namespace IgetFindMonitorEventDetailSpace {

  export class RequestParams {
    eventId?: string;
    constructor() {
      this.eventId = '';
    }
  }

  export interface Data {
    eventId: string;
    eventTitle: string;
    regionName: string;
    eventTypeCode: string;
    eventTypeName: string;
    eventLevelCode: string;
    eventLevelName: string;
    streetAreaCode: string;
    streetAreaName: string;
    pointAddress: string;
    startTime: string;
    eventDesc: string;
    videoUrl: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}

/**
 * 查询监测事件的监测数据(图形展示)-Model类库
 */
export namespace IgetListMonitorFactorDataListSpace {

  export class RequestParams {
    currentPage?: number; pageSize?: number; useFor?: number; eventId?: string; startTime?: string; endTime?: string; pointId?: string;
    constructor() {
      this.currentPage = 0; this.pageSize = 0; this.useFor = 0; this.eventId = ''; this.startTime = ""; this.endTime = ""; this.pointId = "";
    }
  }

  export interface ThresholdList { }

  export interface MonitorFactorDataVOList {
    monitorTime: string;
    factorValue: number;
  }

  export interface Data {
    factorName: string;
    thresholdList: ThresholdList[];
    monitorFactorDataVOList: MonitorFactorDataVOList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}

/**
 * 查询监测事件的监测数据(列表展示)-Model类库
 */
export namespace IgetListMonitorDataListSpace {

  export class RequestParams {
    currentPage?: number; pageSize?: number; useFor?: number; eventId?: string; startTime?: string; endTime?: string; pointId?: string;
    constructor() {
      this.currentPage = 0; this.pageSize = 0; this.useFor = 0; this.eventId = ''; this.startTime = ""; this.endTime = ""; this.pointId = "";
    }
  }

  export interface FactorValueList {
    name: string;
    value: string;
  }

  export interface List {
    monitorTime: string;
    factorValueList: FactorValueList[];
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
 * 查询监测事件的监测点信息-Model类库
 */
export namespace IgetFindMonitorEventPointSpace {

  export class RequestParams{
    eventId?:number;
    constructor(){
      this.eventId=0;
    }
  }

  export interface MonitorEquipNameList {}

  export interface MonitorFactorValueVOList {
    strategyRuleFactorId: number;
    factorId: number;
    factorName: string;
    measureUnitCode: string;
    measureUnitName: string;
    factorDataTypeCode: string;
    factorDataTypeName: string;
    factorValue: string;
  }

  export interface MonitorFactorVOList {
    factorId: number;
    factorName: string;
    measureUnitCode: string;
    measureUnitName: string;
    monitorFactorValueVOList: MonitorFactorValueVOList[];
    show?: boolean;
  }

  export interface Data {
    eventTypeCode: string;
    eventTypeName: string;
    monitorPointName: string;
    monitorEquipNameList: MonitorEquipNameList[];
    targetName: string;
    monitorFactorVOList: MonitorFactorVOList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}

/**
 * 监测点-不分页列表-Model类库
 */
export namespace IgetListMonitorPointsSpace {

  export class RequestParams{
    pointName?:string;
    constructor(){
      this.pointName="";
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
 * 查询报警策略规则因子值-Model类库
 */
export namespace IgetFindMonitorUnitFactorValueSpace {

  export class RequestParams{
    alarmDataId?:number;
    constructor(){
      this.alarmDataId=0;
    }
  }

  export interface StrategyRuleFactorVO {
    strategyRuleFactorId: number;
    factorId: number;
    factorName: string;
    measureUnitCode: string;
    measureUnitName: string;
    factorDataTypeCode: string;
    factorDataTypeName: string;
    factorValue: string;
  }

  export interface MonitorStrategyRuleList {
    ruleId: number;
    ruleName: string;
    ruleLevel: string;
    ruleLevelName: string;
    ruleLogicRelationship: number;
    ruleDesc: string;
    show?: boolean;
    strategyRuleFactorVOS: StrategyRuleFactorVO[];
  }

  export interface Data {
    eventTypeCode: string;
    eventTypeName: string;
    targetName: string;
    monitorStrategyRuleList: MonitorStrategyRuleList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}

/**
 * 查询报警信息详情-Model类库
 */
export namespace IgetFindAlarmDetailSpace {

  export class RequestParams{
    alarmDataId?:number;
    constructor(){
      this.alarmDataId=0;
    }
  }

  export interface Data {
    eventTitle: string;
    eventTypeCode: string;
    eventTypeName: string;
    monitorRegionId: number;
    monitorRegionName: string;
    areaCode: string;
    areaCodeName: string;
    eventDesc: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}

/**
 * 查询产生报警的监测数据-Model类库
 */
export namespace IgetListAlarmMonitorDataSpace {

  export class RequestParams{
    alarmDataId?:number;
    constructor(){
      this.alarmDataId=0;
    }
  }

  export interface ColumnHeaderList {
    dataId: number;
    code: string;
    codeName: string;
    value: number;
    formulaCode: string;
    formulaCodeName: string;
  }

  export interface MonitorDataList {
    dataId: number;
    code: string;
    codeName: string;
    value: number;
    formulaCode: string;
    formulaCodeName: string;
  }

  export interface Data {
    monitorTime: string;
    columnHeaderList: ColumnHeaderList[];
    monitorDataList: MonitorDataList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}

/**
 * 查询监测点列表-Model类库
 */
export namespace IgetListMonitorUnitListSpace {

  export class RequestParams{
    pointName?:string;
    constructor(){
      this.pointName="";
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
 * 查询产生报警的区间型监测数据-Model类库
 */
export namespace IgetListIntervalAlarmMonitorDataSpace {

  export class RequestParams{
    alarmDataId?:number;
    constructor(){
      this.alarmDataId=0;
    }
  }

  export interface ThresholdList {}

  export interface MonitorTime {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface MonitorFactorDataVOList {
    monitorTime: MonitorTime;
    factorValue: number;
  }

  export interface Data {
    factorName: string;
    thresholdList: ThresholdList[];
    monitorFactorDataVOList: MonitorFactorDataVOList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
