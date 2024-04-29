/* eslint-disable @typescript-eslint/no-namespace */
      
      /**
      * 报告详情-Model类库
      */
       export namespace IgetFindReportHisDetailSpace {

        export class RequestParams{
          reportId?:number;
          constructor(){
            this.reportId=0;
          }
        }
      
      export interface Data {
        reportId: string;
        reportName: string;
        templateName: string;
        templateGroupCode: string;
        templateGroupName: string;
        createAt: string;
        reportUrl: string;
        taskTypeName: string;
        templateFileVO: {
          url:string,
          originalName: string,
        }
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
      }
      }
            /**
            * 分页查询报告-Model类库
            */
      export namespace IgetFindReportPageSpace {
      
        export class RequestParams{
          currentPage?:number;pageSize?:number;startTime?:string;endTime?:string;reportTaskId:string;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.startTime="";this.endTime="";this.reportTaskId="";
          }
        }
      
      export interface List {
        reportId: string;
        reportName: string;
        templateName: string;
        taskType: string;
        taskTypeName: string;
        createdAt: string;
        reportState: number;
        reportStateName: string;
        reportUrl: string;
        templateUrl: string;
        templateId: string;
        reportFileVO:{
          url:string,
          originalName:string
        };
        templateFileVO:{
          url:string,
          originalName:string
        };
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
            * 修正报告-Model类库
            */
      export namespace IgetCorrectReportFileSpace {
      
        export class RequestParams{
          reportId?:number;reportFileId?:string;
          constructor(){
            this.reportId=0;this.reportFileId="";
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
            * 删除报告-Model类库
            */
      export namespace IgetRemoveReportSpace {
      
        export class RequestParams{
          reportId?:number;
          constructor(){
            this.reportId=0;
          }
        }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: boolean;
      }
      }