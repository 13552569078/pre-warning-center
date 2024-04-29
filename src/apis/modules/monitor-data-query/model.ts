/* eslint-disable @typescript-eslint/no-namespace */
      
      /**
      * 数据分页查询-Model类库
      */
       export namespace IgetDataPageSpace {

        export class RequestParams{
          currentPage?:number;pageSize?:number;monitorRegionName?:string;monitorUnitName?:string;monitorEquipName?:string;online?:number;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.monitorRegionName="";this.monitorUnitName="";this.monitorEquipName="";this.online=0;
          }
        }
      
      export interface List {
        monitorUnitId: string;
        monitorRegionName: string;
        monitorPointId: string;
        monitorEquipName: string;
        equipStatus: string;
        equipStatusName: string;
        facilityName: string;
        online: number;
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
            * 实时监测数据-Model类库
            */
      export namespace IgetRealDataSpace {
      
        export class RequestParams{
          monitorUnitId?:number;
          constructor(){
            this.monitorUnitId=0;
          }
        }
      
      export interface Data {
        factorName: string;
        factorCode: string;
        factorValue: string;
        collectTime: string;
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 监测项下拉选择-Model类库
            */
      export namespace IgetFactorListSpace {
      
        export class RequestParams{
          monitorUnitId?:number;
          constructor(){
            this.monitorUnitId=0;
          }
        }
      
      export interface Data {
        factorName: string;
        factorCode: string;
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 历史监测数据-Model类库
            */
      export namespace IgetHistoryDataSpace {
      
        export class RequestParams{
          currentPage?:number;pageSize?:number;monitorUnitId?:number;factorCode?:string;collectionStartTime?:string;collectionEndTime?:string;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.monitorUnitId=0;this.factorCode="";this.collectionStartTime="";this.collectionEndTime="";
          }
        }
      
      export interface List {
        factorValue: string;
        collectTime: string;
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