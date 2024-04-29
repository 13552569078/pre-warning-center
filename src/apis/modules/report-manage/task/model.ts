/* eslint-disable @typescript-eslint/no-namespace */
      
      /**
      * 根据任务周期类型查询时间特征-Model类库
      */
      export namespace IgetListDateFeaturesSpace {

        export class RequestParams{
          taskPeriod?:string;
          constructor(){
            this.taskPeriod="";
          }
        }
      
      export interface Data {
        code:string;
        name:string;
        value:string;
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 查询任务详情-Model类库
            */
      export namespace IgetFindReportTaskSpace {
      
        export class RequestParams{
          taskId?:number;
          constructor(){
            this.taskId=0;
          }
        }
      
      export interface ReportTime {
        hour: number;
        minute: number;
        second: number;
        nano: number;
      }
      
      export interface Data {
        taskId: string;
        taskName: string;
        templateId: string;
        templateName: string;
        taskType: string;
        taskTypeName: string;
        taskPeriod: string;
        taskPeriodName: string;
        dateFeatures: string;
        dateFeaturesName: string;
        reportDate: string;
        reportTime: string;
        reportStartDate: string;
        reportEndDate: string;
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
      }
      }
            /**
            * 分页查询报告任务列表-Model类库
            */
      export namespace IgetFindReportPageSpace {
      
        export class RequestParams{
          currentPage?:number;pageSize?:number;templateId?:number;templateTypeCode?:string;taskName?:string;taskTypeList?:string;startTime?:string;endTime?:string;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.templateId=0;this.templateTypeCode="";this.taskName="";this.taskTypeList="";this.startTime="";this.endTime="";
          }
        }
      
      export interface ReportTime {
        hour: number;
        minute: number;
        second: number;
        nano: number;
      }
      
      export interface List {
        taskId: number;
        taskName: string;
        templateId: number;
        templateName: string;
        taskType: string;
        taskTypeName: string;
        taskPeriod: string;
        taskPeriodName: string;
        dateFeatures: number;
        dateFeaturesName: string;
        reportDate: string;
        reportTime: ReportTime;
        lastReportTime: string;
        taskState: number;
        taskStateName: string;
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
            * 创建报告任务-Model类库
            */
      export namespace IpostAddReportTaskSpace {
      
        export class RequestParams{
          taskName?:string;templateId?:string;taskType?:string;taskPeriod?:string;dateFeatures?:string;reportDate?:string;reportTime?:any;reportStartDate?:string;reportEndDate?:string;
          constructor(){
            this.taskName="";this.templateId='';this.taskType="";this.taskPeriod="";this.dateFeatures='';this.reportDate="";this.reportTime="";this.reportStartDate="";this.reportEndDate="";
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
            * 停用启用任务-Model类库
            */
      export namespace IgetEnableSpace {
      
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
            * 手动生成报告-Model类库
            */
      export namespace IgetCreateReportSpace {
      
        export class RequestParams{
          taskId?:number;
          constructor(){
            this.taskId=0;
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
            * 查询模板分组-模板树-Model类库
            */
      export namespace IgetTypeTemplateTreeSpace {
      
        export class RequestParams{
          
          constructor(){
            
          }
        }
      
      export interface Children {}
      
      export interface Children {
        parentCode: string;
        name: string;
        templateTypeCode: string;
        type: number;
        children: Children[];
        id: number;
      }
      
      export interface Data {
        parentCode: string;
        name: string;
        templateTypeCode: string;
        type: number;
        children: Children[];
        id: number;
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }

            /**
      * 任务-删除-Model类库
      */
export namespace IdeleteRSpace {

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