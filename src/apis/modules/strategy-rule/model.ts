/* eslint-disable @typescript-eslint/no-namespace */

/**
* 保存报警风险分类策略规则-Model类库
*/
export namespace IpostModifyStrategyConfigSpace {

  export class RequestParams {
    eventTypeCode?: string; strategyConfigParams?: [];
    constructor() {
      this.eventTypeCode = ""; this.strategyConfigParams = [];
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
* 报警风险分类策略规则列表-Model类库
*/
export namespace IgetListHandleRuleConfigVOsSpace {

  export class RequestParams {
    param?: any;
    constructor() {
      this.param = "";
    }
  }


  export interface Data {
    ruleConfigId: number;
    eventLevel: number;
    eventLevelName: string;
    checkOption: number;
    handleOption: number;
    disseminationOptions: string[];
    cancelOptions: string[];
  }

  export interface Model {
    code: number;
    desc: string;
    tips: string;
    data: Data[];
  }
}