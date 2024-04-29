/* eslint-disable @typescript-eslint/no-namespace */
      
      /**
      * 编辑预警-Model类库
      */
       export namespace IpostUpdateAlarmSpace {

        export class RequestParams{
          alarmId?:string;alarmTitle?:string;eventTypeCode?:string;alarmLevel?:string;alarmAddress?:string;longitude?:string;latitude?:string;monitorUnitId?:string;monitorRegionId?:string;areaCode?:string;startTime?:string;alarmState?:number;alarmOrigin?:string;handleOption?:number;judgeOption?:number;alarmDesc?:string;attachments?:any[];
          constructor(){
            this.alarmId='';this.alarmTitle="";this.eventTypeCode="";this.alarmLevel="";this.alarmAddress="";this.longitude="";this.latitude="";this.monitorUnitId='';this.monitorRegionId='';this.areaCode="";this.startTime="";this.alarmState=0;this.alarmOrigin="";this.handleOption=0;this.judgeOption=0;this.alarmDesc="";this.attachments=[];
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
            * 导入预警列表-Model类库
            */
      export namespace IpostImportAlarmListSpace {
      
        export class RequestParams{
          
          constructor(){
            
          }
        }
      
      export interface AlarmInfo {
        order: number;
        alarmTitle: string;
        eventTypeName: string;
        alarmLevel: string;
        alarmAddress: string;
        latitude: string;
        longitude: string;
        areaCode: string;
        startTime: string;
        alarmState: string;
        handleOption: string;
        monitorUnitName: string;
        alarmDesc: string;
      }
      
      export interface Data {
        alarmInfo: AlarmInfo;
        msg: string;
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 外部预警-删除-Model类库
            */
      export namespace IdeleteTSpace {
      
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
        data: boolean;
      }
      }
            /**
            * 手工新建预警-Model类库
            */
      export namespace IpostAddAlarmSpace {
      
        export class RequestParams{
          alarmId?:string;alarmTitle?:string;eventTypeCode?:string;alarmLevel?:string;alarmAddress?:string;longitude?:string;latitude?:string;monitorUnitId?:string;monitorRegionId?:string;areaCode?:string;startTime?:string;alarmState?:number;alarmOrigin?:string;handleOption?:number;judgeOption?:number;alarmDesc?:string;attachments?:any[];
          constructor(){
            this.alarmId='';this.alarmTitle="";this.eventTypeCode="";this.alarmLevel="";this.alarmAddress="";this.longitude="";this.latitude="";this.monitorUnitId='';this.monitorRegionId='';this.areaCode="";this.startTime="";this.alarmState=0;this.alarmOrigin="";this.handleOption=0;this.judgeOption=0;this.alarmDesc="";this.attachments=[];
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
            * 查询预警列表-Model类库
            */
      export namespace IgetFindAlarmLogPageSpace {
      
        export class RequestParams{
          currentPage?:number;pageSize?:number;regionTypeCode?:string;regionId?:number;monitorUnitName?:string;monitorUnitId?:number;alarmState?:number;alarmLevels?:[];eventTypeCodes?:[];startTime?:string;endTime?:string;alarmTitle?:string;judgeStatus?:number;judgeType?:number;alarmOrigin?:[];handleOption?:number;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.regionTypeCode="";this.regionId=0;this.monitorUnitName="";this.monitorUnitId=0;this.alarmState=0;this.alarmLevels=[];this.eventTypeCodes=[];this.startTime="";this.endTime="";this.alarmTitle="";this.judgeStatus=0;this.judgeType=0;this.alarmOrigin=[];this.handleOption=0;
          }
        }
      
      export interface List {
        id: string;
        regionName: string;
        monitorUnitName: string;
        monitorUnitId: number;
        eventTypeCode: string;
        eventTypeName: string;
        alarmLevelCode: string;
        alarmLevelName: string;
        alarmTitle: string;
        startTime: string;
        endTime: string;
        alarmState: number;
        judgeStatus: number;
        judgeStatusName: string;
        judgeResult: number;
        judgeResultName: string;
        judgeType: number;
        judgeTypeName: string;
        handleStatus: number;
        handleStatusName: string;
        judgeTime: string;
        alarmOriginName: string;
        handleOptionName: string;
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
 * 查询报警详情-Model类库
 */
export namespace IgetAlarmSpace {

  export class RequestParams {
    id?: number;

    constructor() {
      this.id = 0;
    }
  }

  export interface Data {
    id: string;
    alarmTitle: string;
    eventTypeCode: string;
    eventTypeName: string;
    alarmLevel: string;
    alarmLevelName: string;
    regionName: string;
    monitorUnit: string;
    areaCode: string;
    areaCodeName: string;
    alarmAddress: string;
    startTime: string;
    endTime: string;
    alarmState: string;
    alarmDesc: string;
    attachments: any[]
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}