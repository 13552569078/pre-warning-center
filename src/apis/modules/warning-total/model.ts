/* eslint-disable @typescript-eslint/no-namespace */

/**
 * 近期研判结果统计-Model类库
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
 * 待研判等级统计卡片-Model类库
 */
export namespace IgetFindUnJudgeAlarmStatisticSpace {

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
 * 当前研判统计-Model类库
 */
export namespace IgetFindJudgeAlarmStatisticSpace {

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
 * 查询报警列表统计图表-Model类库
 */
export namespace IgetFindAlarmLogPageStatisticSpace {

  export class RequestParams{
    currentPage?:number;pageSize?:number;regionTypeCode?:string;regionId?:number;monitorUnitName?:string;monitorUnitId?:number;alarmState?:number;alarmLevel?:string;alarmLevels?:[];eventTypeCode?:string;eventTypeCodes?:[];startTime?:string;endTime?:string;alarmTitle?:string;judgeStatus?:number;judgeType?:number;alarmOrigin?:[];handleOption?:number;handleStatus?:number;selfTagNames?:[];
    constructor(){
      this.currentPage=0;this.pageSize=0;this.regionTypeCode="";this.regionId=0;this.monitorUnitName="";this.monitorUnitId=0;this.alarmState=0;this.alarmLevel="";this.alarmLevels=[];this.eventTypeCode="";this.eventTypeCodes=[];this.startTime="";this.endTime="";this.alarmTitle="";this.judgeStatus=0;this.judgeType=0;this.alarmOrigin=[];this.handleOption=0;this.handleStatus=0;this.selfTagNames=[];
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
 * 查询指标数据采集值列表统计图表-Model类库
 */
export namespace IpostFindAlarmLogPageStatisticSpace {

  export class RequestParams{
    currentPage?:number;pageSize?:number;targetDataName?:string;isMultiple?:number;isPublic?:number;dataType?:string;targetTypeCode?:string;targetId?:number;targetFrequency?:number;
    constructor(){
      this.currentPage=0;this.pageSize=0;this.targetDataName="";this.isMultiple=0;this.isPublic=0;this.dataType="";this.targetTypeCode="";this.targetId=0;this.targetFrequency=0;
    }
  }

  export interface IsPublicTargetVO {
    code: string;
    name: string;
    value: number;
  }

  export interface IsPublicDataVO {
    code: string;
    name: string;
    value: number;
    rate: number;
  }

  export interface TargetFrequencyTargetVO {
    code: string;
    name: string;
    value: number;
  }

  export interface TargetFrequencyDataVO {
    code: string;
    name: string;
    value: number;
    rate: number;
  }

  export interface Data {
    targetDataNumber: number;
    dataNumber: number;
    isPublicTargetVOs: IsPublicTargetVO[];
    isPublicDataVOs: IsPublicDataVO[];
    targetFrequencyTargetVOs: TargetFrequencyTargetVO[];
    targetFrequencyDataVOs: TargetFrequencyDataVO[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
