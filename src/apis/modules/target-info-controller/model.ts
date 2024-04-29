/* eslint-disable @typescript-eslint/no-namespace */
      
      /**
      * 查询指标详情-Model类库
      */
       export namespace IgetFindTargetInfoSpace {

        export class RequestParams{
          targetId?:number;
          constructor(){
            this.targetId=0;
          }
        }
      
      export interface Data {
        targetId: number;
        targetName: string;
        dataType: string;
        dataTypeName: string;
        measureUnitId: number;
        measureUnitName: string;
        targetFrequency: number;
        targetFrequencyUnitCode: string;
        targetFrequencyUnitName: string;
        targetTypeCode: string;
        targetTypeName: string;
        targetDesc: string;
        thresholdLevelVOList?: any[];
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
      }
      }
            /**
            * 查询指标列表(不分页)-Model类库
            */
      export namespace IgetListTargetInfoListVOsSpace {
      
        export class RequestParams{
          targetInfoName?:string;
          constructor(){
            this.targetInfoName="";
          }
        }
      
      export interface Data {
        targetId: number;
        targetName: string;
        targetTypeCode: string;
        targetTypeName: string;
        measureUnit: string;
        periodTypeName: string;
        targetFrequency: number;
        targetFrequencyUnitCode: string;
        targetFrequencyUnitName: string;
        updatedAt: string;
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 删除指标信息-Model类库
            */
      export namespace IgetRemoveTargetInfoSpace {
      
        export class RequestParams{
          targetInfoId?:number;
          constructor(){
            this.targetInfoId=0;
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
            * 指标名称验重-Model类库
            */
      export namespace IgetFindTargetInfoNameVerifySpace {
      
        export class RequestParams{
          targetInfoName?:string;targetInfoId?:number;
          constructor(){
            this.targetInfoName="";this.targetInfoId=0;
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
            * 修改指标-Model类库
            */
      export namespace IpostModifyTargetInfoSpace {
      
        export class RequestParams{
          targetId?:number|string;targetName?:string;dataType?:string;measureUnitId?:number|string;targetFrequency?:number|string;targetFrequencyUnitCode?:string;targetTypeCode?:string;
          constructor(){
            this.targetId=0;this.targetName="";this.dataType="";this.measureUnitId=0;this.targetFrequency=0;this.targetFrequencyUnitCode="";this.targetTypeCode="";
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
            * 添加指标-Model类库
            */
      export namespace IpostAddTargetInfoSpace {
      
        export class RequestParams{
          targetId?:number;targetName?:string;dataType?:string;measureUnitId?:number|string;targetFrequency?:number|string;targetFrequencyUnitCode?:string;targetTypeCode?:string|number;targetDesc?:string;
          constructor(){
            this.targetId=0;this.targetName="";this.dataType="";this.measureUnitId=0;this.targetFrequency=0;this.targetFrequencyUnitCode="";this.targetTypeCode="";this.targetDesc="";
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
            * 查询指标列表-Model类库
            */
      export namespace IgetFindTargetInfoPageSpace {
      
        export class RequestParams{
          currentPage?:number;pageSize?:number;targetName?:string;dataType?:string;targetTypeCode?:string;targetFrequencyType?:number;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.targetName="";this.dataType="";this.targetTypeCode="";this.targetFrequencyType=0;
          }
        }
      
      export interface List {
        targetId: number;
        targetName: string;
        targetTypeCode: string;
        targetTypeName: string;
        measureUnit: string;
        periodTypeName: string;
        targetFrequency: number;
        targetFrequencyUnitCode: string;
        targetFrequencyUnitName: string;
        updatedAt: string;
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