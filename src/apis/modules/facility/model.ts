/* eslint-disable @typescript-eslint/no-namespace */

/**
* 根据设施类型查询设施列表-下拉-Model类库
*/
export namespace IgetListByFacilityTypeSpace {

  export class RequestParams {
    facilityTypeCode?: string;
    constructor() {
      this.facilityTypeCode = "";
    }
  }

  export interface Data {
    name: string;
    value: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
      /**
      * 批量删除校验接口-Model类库
      */
       export namespace IpostDeleteCheckSpace {

        export class RequestParams{
          ids?:[];
          constructor(){
            this.ids=[];
          }
        }
      
      export interface FacilityName {}
      
      export interface Data {
        checkResult: boolean;
        facilityNames: FacilityName[];
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
      }
      }