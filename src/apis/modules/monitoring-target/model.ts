/* eslint-disable @typescript-eslint/no-namespace */

      /**
      * 监测指标列表(分页)-Model类库
      */
       export namespace IgetFindMonitorTargetPageSpace {

        export class RequestParams{
          param?:any;
          constructor(){
            this.param="";
          }
        }

      export interface TargetFactorNameVO {
        factorId: number;
        factorName: string;
      }

      export interface List {
        targetId: number;
        targetName: string;
        eventTypeCode: string;
        eventTypeCodeName: string;
        targetFactorNameVOs: TargetFactorNameVO[];
        targetDesc: string;
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
        code: number;
        desc: string;
        tips: string;
        data: Data;
      }
      }
            /**
            * 删除监测指标-Model类库
            */
      export namespace IpostRemoveMonitorTargetSpace {

        export class RequestParams{
          monitorTargetId?:number;
          constructor(){
            this.monitorTargetId=0;
          }
        }

      export interface Model {
        code: number;
        desc: string;
        tips: string;
        data: boolean;
      }
      }
            /**
            * 监测指标详情-Model类库
            */
      export namespace IgetFindMonitorTargetSpace {

        export class RequestParams{
          monitorTargetId?:number;
          constructor(){
            this.monitorTargetId=0;
          }
        }

      export interface TargetFactorVO {
        factorId: number;
        factorName: string;
        measureUnit: string;
        factorDataType: string;
        factorDataTypeName: string;
        measureUnitName: string;
      }

      export interface Data {
        targetId: number;
        targetName: string;
        eventTypeCode: string;
        eventTypeCodeName: string;
        targetFactorVOs: TargetFactorVO[];
        targetDesc: string;
      }

      export interface Model {
        code: number;
        desc: string;
        tips: string;
        data: any[];
      }
      }
            /**
            * 新增监测指标-Model类库
            */
      export namespace IpostAddMonitorTargetSpace {

        export class RequestParams{
          targetType?:number;targetName?:string;eventTypeCode?:string;factorIds?:any[];targetDesc?:string;
          constructor(){
            this.targetType=0;this.targetName="";this.eventTypeCode="";this.factorIds=[];this.targetDesc="";
          }
        }

      export interface Model {
        code: number;
        desc: string;
        tips: string;
        data: boolean;
      }
      }
            /**
            * 指标列表(无分页)-Model类库
            */
      export namespace IgetListMonitorTargetsSpace {

        export class RequestParams{
          param?:any;
          constructor(){
            this.param="";
          }
        }

      export interface Data {
        targetId: number;
        targetName: string;
        eventTypeCode: string;
      }

      export interface Model {
        code: number;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 修改监测指标-Model类库
            */
      export namespace IpostModifyMonitorTargetSpace {

        export class RequestParams{
          targetId?:number;targetName?:string;eventTypeCode?:string;factorIds?:any[];targetDesc?:string;
          constructor(){
            this.targetId=0;this.targetName="";this.eventTypeCode="";this.factorIds=[];this.targetDesc="";
          }
        }

      export interface Model {
        code: number;
        desc: string;
        tips: string;
        data: boolean;
      }
      }
