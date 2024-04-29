/* eslint-disable @typescript-eslint/no-namespace */
      
      /**
      * 查看数据项详情-Model类库
      */
       export namespace IgetDetailSpace {

        export class RequestParams{
          accessItemId?:number;
          constructor(){
            this.accessItemId=0;
          }
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
      
      export interface TimeScope {
        accessItemId: number;
        dateStart: string;
        timeStart: string;
        dateEnd: string;
        timeEnd: string;
      }
      
      export interface Data {
        accessItemId: number;
        accessSourceId: number;
        accessSourceObjectId: number;
        accessItemName: string;
        accessItemCode: string;
        accessFrequency: number;
        accessFrequencyUnit: string;
        accessSourceName: string;
        accessSourceObjectName: string;
        accessItemDesc: string;
        timeScopes: TimeScope[];
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
      }
      }
            /**
            * 新增数据项-Model类库
            */
      export namespace IaddSpace {
      
        export class RequestParams{
          accessItemId?:number|string;accessSourceId?:number|string;accessSourceObjectId?:number|string;accessItemName?:string;accessItemCode?:string;accessFrequency?:number;accessFrequencyUnit?:string;accessItemDesc?:string;timeScopeParams?:[];
          constructor(){
            this.accessItemId=0;this.accessSourceId=0;this.accessSourceObjectId=0;this.accessItemName="";this.accessItemCode="";this.accessFrequency=0;this.accessFrequencyUnit="";this.accessItemDesc="";this.timeScopeParams=[];
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
            * 更新数据项-Model类库
            */
      export namespace IdeleteSpace {
      
        export class RequestParams{
          accessItemId?:number;
          constructor(){
            this.accessItemId=0;
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
            * 分页查询数据项-Model类库
            */
      export namespace IpostPageSpace {
      
        export class RequestParams{
          currentPage?:number;pageSize?:number;accessItemName?:string;accessFrequency?:number;accessSourceId?:number;accessSourceObjectId?:number;orderColumnStr?:string;orderStr?:string;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.accessItemName="";this.accessFrequency=0;this.accessSourceId=0;this.accessSourceObjectId=0;this.orderColumnStr="";this.orderStr="";
          }
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
      
      export interface TimeScope {
        accessItemId: number;
        dateStart: string;
        timeStart: TimeStart;
        dateEnd: string;
        timeEnd: TimeEnd;
      }
      
      export interface List {
        accessItemId: number;
        accessSourceId: number;
        accessSourceObjectId: number;
        accessItemName: string;
        accessItemCode: string;
        accessFrequency: number;
        accessFrequencyUnit: string;
        accessSourceName: string;
        accessSourceObjectName: string;
        accessItemDesc: string;
        updatedAt: string;
        timeScopes: TimeScope[];
        source: string;
        sourceName: string;
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
            * 更新数据项-Model类库
            */
      export namespace IpostUpdateSpace {
      
        export class RequestParams{
          accessItemId?:number|string;accessSourceId?:number|string;accessSourceObjectId?:number|string;accessItemName?:string;accessItemCode?:string;accessFrequency?:number|string;accessFrequencyUnit?:string;accessItemDesc?:string;timeScopeParams?:[];
          constructor(){
            this.accessItemId=0;this.accessSourceId=0;this.accessSourceObjectId=0;this.accessItemName="";this.accessItemCode="";this.accessFrequency=0;this.accessFrequencyUnit="";this.accessItemDesc="";this.timeScopeParams=[];
          }
        }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: boolean;
      }
      }