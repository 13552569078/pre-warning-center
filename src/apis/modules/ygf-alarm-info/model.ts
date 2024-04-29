/* eslint-disable @typescript-eslint/no-namespace */

/**
 * 报警研判-近期研判结果统计-Model类库
 */
export namespace IgetFindRecentJudgeResultSpace {

  export class RequestParams{
    startTime?:string;endTime?:string;
    constructor(){
      this.startTime="";this.endTime="";
    }
  }

  export interface AlarmVO {
    code: string;
    name: string;
    value: number;
  }

  export interface Data {
    alarmVOs: AlarmVO[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 查询报警列表统计图表-Model类库
 */
export namespace IpostFindEventInfoPageStatisticSpace {

  export class RequestParams{
    currentPage?:number;pageSize?:number;regionTypeCode?:string;regionId?:number;monitorUnitId?:number;alarmLevels?:[];eventTypeCodes?:[];startTime?:string;endTime?:string;eventTitle?:string;judgeStatus?:[];
    constructor(){
      this.currentPage=0;this.pageSize=0;this.regionTypeCode="";this.regionId=0;this.monitorUnitId=0;this.alarmLevels=[];this.eventTypeCodes=[];this.startTime="";this.endTime="";this.eventTitle="";this.judgeStatus=[];
    }
  }

  export interface AlarmLevelVO {
    code: string;
    name: string;
    value: number;
  }

  export interface EventTypeVO {
    eventTypeCode: string;
    eventTypeName: string;
    alarmNumber: number;
    rate: number;
  }

  export interface Data {
    alarmNumber: number;
    alarmLevelVOs: AlarmLevelVO[];
    eventTypeVOs: EventTypeVO[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 报警详情-Model类库
 */
export namespace IgetEventInfoSpace {

  export class RequestParams{
    id?:number;
    constructor(){
      this.id=0;
    }
  }

  export interface EventTargetDataVO {
    targetDataName: string;
    dataValue: string;
    collectTime: string;
    measureUnitCode: string;
    measureUnitName: string;
  }

  export interface Data {
    id: number;
    regionName: string;
    monitorUnitName: string;
    monitorUnitId: number;
    eventTypeCode: string;
    eventTypeName: string;
    alarmLevelCode: string;
    alarmLevelName: string;
    eventTitle: string;
    startTime: string;
    judgeStatus: number;
    judgeStatusName: string;
    judgeTime: string;
    handleOption: number;
    handleOptionName: string;
    eventDesc: string;
    targetDataId: number;
    areaCode: string;
    areaCodeName: string;
    eventAddress: string;
    longitude: string;
    latitude: string;
    eventTargetDataVO: EventTargetDataVO;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 报警研判-当前研判统计-Model类库
 */
export namespace IgetFindJudgeStatisticSpace {

  export class RequestParams{

    constructor(){

    }
  }

  export interface Data {
    judgeAlarmNumber: number;
    unJudgeAlarmNumber: number;
    judgeRate: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 报警研判-待研判等级统计表头-Model类库
 */
export namespace IgetFindUnJudgeStatisticSpace {

  export class RequestParams{

    constructor(){

    }
  }

  export interface AlarmLevelVO {
    code: string;
    name: string;
    value: number;
  }

  export interface Data {
    unJudgeAlarmNumber: number;
    alarmLevelVOs: AlarmLevelVO[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 报警列表(分页)-Model类库
 */
export namespace IpostFindEventInfoPageSpace {

  export class RequestParams{
    currentPage?:number;pageSize?:number;regionTypeCode?:string;regionId?:number;monitorUnitId?:number;alarmLevels?:string[];eventTypeCodes?:string[];startTime?:string;endTime?:string;eventTitle?:string;judgeStatus?:string[];
    constructor(){
      this.currentPage=0;this.pageSize=0;this.regionTypeCode="";this.regionId=0;this.monitorUnitId=0;this.alarmLevels=[];this.eventTypeCodes=[];this.startTime="";this.endTime="";this.eventTitle="";this.judgeStatus=[];
    }
  }

  export interface List {
    id: number;
    regionName: string;
    monitorUnitName: string;
    monitorUnitId: number;
    eventTypeCode: string;
    eventTypeName: string;
    alarmLevelCode: string;
    alarmLevelName: string;
    eventTitle: string;
    startTime: string;
    judgeStatus: number;
    judgeStatusName: string;
    judgeTime: string;
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

/* eslint-disable @typescript-eslint/no-namespace */

/**
 * 报警研判-历史报警趋势-Model类库
 */
export namespace IgetFindHistoryEventTrendSpace {

  export class RequestParams{
    unitId?:number;
    constructor(){
      this.unitId=0;
    }
  }

  export interface TimeList {}

  export interface HistoryAlarmTrendItemVOList {
    time: string;
    alarmNumber: number;
  }

  export interface Data {
    timeList: TimeList[];
    historyAlarmTrendItemVOList: HistoryAlarmTrendItemVOList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 报警研判-研判保存-Model类库
 */
export namespace IpostJudgeEventInfoSpace {

  export class RequestParams{
    eventInfoId?:string;judgeStatus?:number;alarmLevelCode?:string;judgeDesc?:string;handleOption?:number;
    constructor(){
      this.eventInfoId="";this.judgeStatus=0;this.alarmLevelCode="";this.judgeDesc="";this.handleOption=0;
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
 * 报警通知-查询报警通知列表统计图表-Model类库
 */
export namespace IpostFindEventNotifyPageStatisticSpace {

  export class RequestParams{
    currentPage?:number;pageSize?:number;regionTypeCode?:string;regionId?:number;monitorUnitId?:number;alarmLevels?:[];eventTypeCodes?:[];startTime?:string;endTime?:string;sendContent?:string;
    constructor(){
      this.currentPage=0;this.pageSize=0;this.regionTypeCode="";this.regionId=0;this.monitorUnitId=0;this.alarmLevels=[];this.eventTypeCodes=[];this.startTime="";this.endTime="";this.sendContent="";
    }
  }

  export interface EventTypeVO {
    eventTypeCode: string;
    eventTypeName: string;
    alarmNumber: number;
    rate: number;
  }

  export interface Data {
    number: number;
    eventTypeVOs: EventTypeVO[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 报警通知-报警通知列表(分页)-Model类库
 */
export namespace IpostFindEventNotifyPageSpace {

  export class RequestParams{
    currentPage?:number;pageSize?:number;regionTypeCode?:string;regionId?:number;monitorUnitId?:number;alarmLevels?:[];eventTypeCodes?:[];startTime?:string;endTime?:string;sendContent?:string;
    constructor(){
      this.currentPage=0;this.pageSize=0;this.regionTypeCode="";this.regionId=0;this.monitorUnitId=0;this.alarmLevels=[];this.eventTypeCodes=[];this.startTime="";this.endTime="";this.sendContent="";
    }
  }

  export interface List {
    id: number;
    sendContent: string;
    regionName: string;
    monitorUnitName: string;
    eventTypeCode: string;
    eventTypeName: string;
    alarmLevelCode: string;
    alarmLevelName: string;
    eventTitle: string;
    eventId: number;
    sendFor: string;
    sendForName: string;
    sendTime: string;
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
 * 预警通知-预警通知列表(分页)-Model类库
 */
export namespace IpostFindAlarmNotifyPageSpace {

  export class RequestParams{
    currentPage?:number;pageSize?:number;regionTypeCode?:string;regionId?:number;monitorUnitId?:number;alarmLevels?:[];eventTypeCodes?:[];startTime?:string;endTime?:string;sendContent?:string;
    constructor(){
      this.currentPage=0;this.pageSize=0;this.regionTypeCode="";this.regionId=0;this.monitorUnitId=0;this.alarmLevels=[];this.eventTypeCodes=[];this.startTime="";this.endTime="";this.sendContent="";
    }
  }

  export interface List {
    id: number;
    sendContent: string;
    regionName: string;
    monitorUnitName: string;
    eventTypeCode: string;
    eventTypeName: string;
    alarmLevelCode: string;
    alarmLevelName: string;
    eventTitle: string;
    eventId: number;
    sendTime: string;
    sendFor: string;
    sendForName: string;
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
 * 预警通知-查询预警通知列表统计图表-Model类库
 */
export namespace IpostFindAlarmNotifyPageStatisticSpace {

  export class RequestParams{
    currentPage?:number;pageSize?:number;regionTypeCode?:string;regionId?:number;monitorUnitId?:number;alarmLevels?:[];eventTypeCodes?:[];startTime?:string;endTime?:string;sendContent?:string;
    constructor(){
      this.currentPage=0;this.pageSize=0;this.regionTypeCode="";this.regionId=0;this.monitorUnitId=0;this.alarmLevels=[];this.eventTypeCodes=[];this.startTime="";this.endTime="";this.sendContent="";
    }
  }

  export interface EventTypeVO {
    eventTypeCode: string;
    eventTypeName: string;
    alarmNumber: number;
    rate: number;
  }

  export interface Data {
    number: number;
    eventTypeVOs: EventTypeVO[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
