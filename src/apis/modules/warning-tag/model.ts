/* eslint-disable @typescript-eslint/no-namespace */

/**
 * 标签维护明细-Model类库
 */
export namespace IgetTagDetailSpace {

  export class RequestParams{
    alarmId?:number;
    constructor(){
      this.alarmId=0;
    }
  }

  export interface Data {
    alarmTagInfoId: number;
    tagInfoId: number;
    tagName: string;
    selfTagName: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
 * 标签维护保存-Model类库
 */
export namespace IpostSaveAlarmTagInfoParamSpace {

  export class RequestParams{
    alarmId?:number;tagInfoParamList?:[];
    constructor(){
      this.alarmId=0;this.tagInfoParamList=[];
    }
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: boolean;
  }
}
