/* eslint-disable @typescript-eslint/no-namespace */
      
      /**
      * 设备状态分布-Model类库
      */
      export namespace IgetFindEquipStateListSpace {

        export class RequestParams{
          
          constructor(){
            
          }
        }
      
      export interface Data {
        code: string;
        name: string;
        value: number;
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 联网数据统计-Model类库
            */
      export namespace IgetFindEquipDataAnalysisSpace {
      
        export class RequestParams{
          
          constructor(){
            
          }
        }
      
      export interface Data {
        onLineNumber: number;
        offLineNumber: number;
        onLineRate: number;
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
      }
      }

            /**
      * 设备分页列表-Model类库
      */
export namespace IgetFindEquipListPageSpace {

  export interface List {
    equipName: string;
    equipStatus: string;
    equipStatusName: string;
    equipTypeCode: string;
    equipTypeName: string;
    equipCode: string;
    address: string;
    streetAreaCode: string;
    streetAreaCodeName: string;
    installTime: string;
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