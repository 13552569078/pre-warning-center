/* eslint-disable @typescript-eslint/no-namespace */
      
      /**
      * 报警时间高发分析-Model类库
      */
      export namespace IgetFindTimeHighIncidenceAnalysisSpace {

        export class RequestParams{
          eventTypeCodeList?:[];areaCodeList?:[];startTime?:string;endTime?:string;alarmOriginList?:[];tenantId?:string;
          constructor(){
            this.eventTypeCodeList=[];this.areaCodeList=[];this.startTime="";this.endTime="";this.alarmOriginList=[];this.tenantId="";
          }
        }
      
      export interface TimeList {}
      
      export interface AlarmInfoList {
        eventTypeName: string;
        alarmNumber: number;
      }
      
      export interface TimeHighIncidenceAnalysisItemVOList {
        time: string;
        alarmNumber: number;
        alarmInfoList: AlarmInfoList[];
      }
      
      export interface Data {
        timeList: string[];
        timeHighIncidenceAnalysisItemVOList: TimeHighIncidenceAnalysisItemVOList[];
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
      }
      }
            /**
            * 报警地点高发分析-Model类库
            */
      export namespace IgetFindUnitAlarmHighIncidenceAnalysisSpace {
      
        export class RequestParams{
          eventTypeCodeList?:[];areaCodeList?:[];startTime?:string;endTime?:string;alarmOriginList?:[];tenantId?:string;
          constructor(){
            this.eventTypeCodeList=[];this.areaCodeList=[];this.startTime="";this.endTime="";this.alarmOriginList=[];this.tenantId="";
          }
        }
      
      export interface UnitAlarmHighIncidenceAnalysisItemVOList {
        monitorUnitName: string;
        alarmNumber: number;
      }
      
      export interface Data {
        monitorRegionId: number;
        monitorRegionName: string;
        alarmNumber: number;
        unitAlarmHighIncidenceAnalysisItemVOList: UnitAlarmHighIncidenceAnalysisItemVOList[];
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 报警类型高发分析-Model类库
            */
      export namespace IgetFindAlarmTypeHighIncidenceAnalysisSpace {
      
        export class RequestParams{
          eventTypeCodeList?:[];areaCodeList?:[];startTime?:string;endTime?:string;alarmOriginList?:[];tenantId?:string;
          constructor(){
            this.eventTypeCodeList=[];this.areaCodeList=[];this.startTime="";this.endTime="";this.alarmOriginList=[];this.tenantId="";
          }
        }
      
      export interface Data {
        eventTypeCode: string;
        eventTypeName: string;
        alarmNumber: number;
        rate: number;
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }