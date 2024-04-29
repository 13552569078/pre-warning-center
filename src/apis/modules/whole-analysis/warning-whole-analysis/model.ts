/* eslint-disable @typescript-eslint/no-namespace */

/**
* 查询分析模型列表-Model类库
*/
export namespace IlistSpace {

  export class RequestParams {
    analysisModelName?: string;
    constructor() {
      this.analysisModelName = "";
    }
  }

  export interface Data {
    analysisModelId: number;
    analysisModelName: string;
    modelText: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 保存分析模型-Model类库
*/
export namespace IpostSaveSpace {

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: boolean;
  }
}
/**
* 删除分析模型-Model类库
*/
export namespace IdeleteAlarmAnalysisModelSpace {

  export class RequestParams {
    analysisModelId?: number;
    constructor() {
      this.analysisModelId = 0;
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

  export class RequestParams {
    currentPage?: number; pageSize?: number; eventTypeCode?: string; areaCodeList?: string; startTime?: string; endTime?: string;
    constructor() {
      this.currentPage = 0; this.pageSize = 0; this.eventTypeCode = ""; this.areaCodeList = ""; this.startTime = ""; this.endTime = "";
    }
  }

  export interface List {
    id: number;
    alarmTitle: string;
    alarmLevelName: string;
    eventTypeName: string;
    startTime: string;
    alarmState: number;
    judgeStatusName: string;
    alarmOriginName: string;
    regionName: string;
    monitorUnitName: string;
    endTime: string;
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
* 查看分析模型名称是否存在-Model类库
*/
export namespace IgetCheckNameIfExistSpace {

  export class RequestParams {
    analysisModelName?: string; analysisModelId?: number;
    constructor() {
      this.analysisModelName = ""; this.analysisModelId = 0;
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
* 获取列表项展示功能-Model类库
*/
export namespace IgetFindFunctionUserColumnVOSpace {

  export class RequestParams {
    functionCode?: string;
    constructor() {
      this.functionCode = "";
    }
  }

  export interface Data {
    functionCode: string;
    columnText: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 保存列表展示数据-Model类库
*/
export namespace IpostSaveFunctionUserColumnSpace {

  export class RequestParams {
    functionCode?: string; columnText?: string;
    constructor() {
      this.functionCode = ""; this.columnText = "";
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
      * 查询预警列表图形统计-Model类库
      */
      export namespace IgetFindAlarmLogPageStatisticSpace {

        export class RequestParams{
          currentPage?:number;pageSize?:number;eventTypeCode?:string;areaCodeList?:string;startTime?:string;endTime?:string;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.eventTypeCode="";this.areaCodeList="";this.startTime="";this.endTime="";
          }
        }
      
      export interface EventTypeCodeVO {
        code: string;
        name: string;
        value: number;
        rate: number;
      }
      
      export interface AreaCodeVO {
        code: string;
        name: string;
        value: number;
        rate: number;
      }
      
      export interface Data {
        eventTypeCodeVOs: EventTypeCodeVO[];
        areaCodeVOs: AreaCodeVO[];
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
      }
      }