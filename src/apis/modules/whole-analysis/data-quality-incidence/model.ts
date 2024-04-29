/* eslint-disable @typescript-eslint/no-namespace */
      
      /**
      * 风险分类通知配置列表-Model类库
      */
      export namespace IgetEventTypeConfigListSpace {

        export class RequestParams{
          
          constructor(){
            
          }
        }
      
      export interface Data {
        eventTypeCode: string;
        eventTypeName: string;
        alarmUseState: number;
        eventUseState: number;
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 通知模板保存-Model类库
            */
      export namespace IpostTemplateUpdateSpace {
      
        export class RequestParams{
          useFor?:number;templateContents?:[];
          constructor(){
            this.useFor=0;this.templateContents=[];
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
            * 风险分类通知配置批量保存-Model类库
            */
      export namespace IpostEventTypeConfigUpateSpace {
      
        export class RequestParams{
          configParams?:[];
          constructor(){
            this.configParams=[];
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
            * 通知模板列表查询-Model类库
            */
      export namespace IgetTemplateListSpace {
      
        export class RequestParams{
          useFor?:number;
          constructor(){
            this.useFor=0;
          }
        }
      
      export interface TemplateContent {
        templateContent: string;
        templateId: number;
        useState: number;
      }
      
      export interface Data {
        useFor: number;
        sendFor: string;
        sendForName: string;
        alarmLevelCode: string;
        templateContents: TemplateContent[];
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 报警质量统计-Model类库
            */
      export namespace IgetFindAlarmQualitySpace {
      
        export class RequestParams{
          
          constructor(){
            
          }
        }
      
      export interface Data {
        alarmNumber: number;
        notPassAlarmNumber: number;
        alarmAccuracyRate: number;
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
            * 报警趋势-Model类库
            */
      export namespace IgetFindAlarmTrendSpace {
      
        export class RequestParams{
          
          constructor(){
            
          }
        }
      
      export interface AlarmTimeList {}
      
      export interface AlarmTrendItemVOList {
        alarmDate: string;
        alarmNumber: number;
        accuracyRate: number;
      }
      
      export interface Data {
        alarmTimeList: AlarmTimeList[];
        alarmTrendItemVOList: AlarmTrendItemVOList[];
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
      }
      }
            /**
            * 今日报警质量统计-Model类库
            */
      export namespace IgetFindTodayAlarmQualitySpace {
      
        export class RequestParams{
          
          constructor(){
            
          }
        }
      
      export interface Data {
        alarmNumber: number;
        notPassAlarmNumber: number;
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
      }
      }