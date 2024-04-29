/* eslint-disable @typescript-eslint/no-namespace */
      
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
            * 场景定义-修改-Model类库
            */
      export namespace IpostUpdateSpace {
      
        export class RequestParams{
          id?:string;sceneName?:string;description?:string;photoFileIds?:any[];eventTypeCodeList?:any[];sceneRegionList?:any[];
          constructor(){
            this.id='';this.sceneName="";this.description="";this.photoFileIds=[];this.eventTypeCodeList=[];this.sceneRegionList=[];
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
            * 场景定义-明细-Model类库
            */
      export namespace IgetSceneSpace {
      
        export class RequestParams{
          id?:number;
          constructor(){
            this.id=0;
          }
        }
      
      export interface PhotoFile {
        id: string;
        originalName: string;
        url: string;
        type: string;
      }
      
      export interface EventTypeList {
        code: string;
        name: string;
      }
      
      export interface RegionList {
        regionId: number;
        regionName: string;
      }
      
      export interface Data {
        id: number;
        sceneName: string;
        description: string;
        photoFile: PhotoFile[];
        eventTypeList: EventTypeList[];
        regionList: RegionList[];
        targetList: any;
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
      }
      }
            /**
            * 场景定义-新增-Model类库
            */
      export namespace IaddSpace {
      
        export class RequestParams{
          id?:number;sceneName?:string;description?:string;photoFileIds?:[];eventTypeCodeList?:[];sceneRegionList?:[];
          constructor(){
            this.id=0;this.sceneName="";this.description="";this.photoFileIds=[];this.eventTypeCodeList=[];this.sceneRegionList=[];
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
            * 场景定义-启用停用-Model类库
            */
      export namespace IgetChangeSpace {
      
        export class RequestParams{
          id?:number;useState?:number;
          constructor(){
            this.id=0;this.useState=0;
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
            * 场景定义-删除-Model类库
            */
      export namespace IdeleteSSpace {
      
        export class RequestParams{
          id?:number;
          constructor(){
            this.id=0;
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
            * 场景定义-列表查询-Model类库
            */
      export namespace IlistSpace {
      
        export class RequestParams{
          
          constructor(){
            
          }
        }
      
      export interface PhotoFile {
        id: string;
        originalName: string;
        url: string;
        type: string;
      }
      
      export interface EventTypeNameList {}
      
      export interface RegionNameList {}
      
      export interface Data {
        id: number;
        sceneName: string;
        useState: number;
        description: string;
        photoFile: PhotoFile[];
        eventTypeNameList: EventTypeNameList[];
        regionNameList: RegionNameList[];
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }