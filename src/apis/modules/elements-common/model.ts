/* eslint-disable @typescript-eslint/no-namespace */
      
      /**
      * 根据风险分类，过滤监测点-Model类库
      */
       export namespace IgetFindMonitorUnitListSpace {

        export class RequestParams{
          eventTypeCode?:string;pointId?:number;
          constructor(){
            this.eventTypeCode="";this.pointId=0;
          }
        }
      
      export interface Data {
          id: number;
          uintName: string;
      }
      
      export interface Model {
          code: string;
          desc: string;
          tips: string;
          data: Data[];
      }
      }
            /**
            * 行政区划列表-Model类库
            */
      export namespace IpostAreaListSpace {
      
        export class RequestParams{
          areaCodes?:[];
          constructor(){
            this.areaCodes=[];
          }
        }
      
      export interface Data {
          id: number;
          areaCode: string;
          areaName: string;
          longitude: string;
          latitude: string;
          administrativeLevel: number;
          administrativeLevelName: string;
          parentId: number;
          sort: number;
      }
      
      export interface Model {
          code: string;
          desc: string;
          tips: string;
          data: Data[];
      }
      }
            /**
            * 根据风险分类，过滤监测点-Model类库
            */
      export namespace IgetFindWarningUnitListSpace {
      
        export class RequestParams{
          eventTypeCode?:string;pointId?:number;
          constructor(){
            this.eventTypeCode="";this.pointId=0;
          }
        }
      
      export interface Data {
          id: number;
          uintName: string;
      }
      
      export interface Model {
          code: string;
          desc: string;
          tips: string;
          data: Data[];
      }
      }