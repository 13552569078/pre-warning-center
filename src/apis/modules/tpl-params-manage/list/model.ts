/* eslint-disable @typescript-eslint/no-namespace */

/**
* 更新参数-Model类库
*/
export namespace IpostUpdateSpace {

  export class RequestParams {
    paramId?: number; paramName?: string; paramGroupCode?: string; paramTypeId?: number; paramUseId?: number; paramSubUseId?: number; timeCondition?: string; paramDesc?: string;
    constructor() {
      this.paramId = 0; this.paramName = ""; this.paramGroupCode = ""; this.paramTypeId = 0; this.paramUseId = 0; this.paramSubUseId = 0; this.timeCondition = ""; this.paramDesc = "";
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
* 查询模板参数详情-Model类库
*/
export namespace IgetDetailSpace {

  export class RequestParams {
    paramId?: number;
    constructor() {
      this.paramId = 0;
    }
  }

  export interface Data {
    paramId: number;
    paramName: string;
    paramGroupCode: string;
    paramTypeId: number;
    paramTypeName: string;
    paramUseId: number;
    paramUseName: string;
    paramSubUseId: number;
    paramSubUseName: string;
    timeCondition: string;
    timeConditionName: string;
    paramDesc: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 查询模板参数列表-Model类库
*/
export namespace IpostPageSpace {

  export class RequestParams {
    currentPage?: number; pageSize?: number; paramGroupCode?: string; paramName?: string; paramTypeIds?: [];
    constructor() {
      this.currentPage = 0; this.pageSize = 0; this.paramGroupCode = ""; this.paramName = ""; this.paramTypeIds = [];
    }
  }

  export interface ReferTemplate {
    paramId: number;
    paramName: string;
    templateId: number;
    templateName: string;
  }

  export interface List {
    paramId: number;
    paramName: string;
    paramGroupCode: string;
    paramTypeId: number;
    paramTypeName: string;
    paramUseId: number;
    paramUseName: string;
    paramSubUseId: number;
    paramSubUseName: string;
    timeCondition: string;
    timeConditionName: string;
    paramDesc: string;
    referTemplates: ReferTemplate[];
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
* 删除参数-Model类库
*/
export namespace IdeleteTSpace {

  export class RequestParams {
    paramId?: number;
    constructor() {
      this.paramId = 0;
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
* 新增参数-Model类库
*/
export namespace IaddSpace {

  export class RequestParams {
    paramId?: number; paramName?: string; paramGroupCode?: string; paramTypeId?: number; paramUseId?: number; paramSubUseId?: number; timeCondition?: string; paramDesc?: string;
    constructor() {
      this.paramId = 0; this.paramName = ""; this.paramGroupCode = ""; this.paramTypeId = 0; this.paramUseId = 0; this.paramSubUseId = 0; this.timeCondition = ""; this.paramDesc = "";
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
* 解析模板参数-Model类库
*/
export namespace IgetGetParamsFromTemplateFileSpace {

  export class RequestParams {
    url?: string;
    constructor() {
      this.url = "";
    }
  }

  export interface Data {
    paramId: number;
    paramName: string;
    isAvailable: number;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 查询模板参数类型字典-Model类库
*/
export namespace IgetGetParamTypeDictSpace {

  export interface TimeConditionList {
    timeCondition: string;
    timeConditionName: string;
  }

  export interface ParamUseList {
    paramTypeId: string;
    paramUseId: string;
    paramUseName: string;
    timeConditionList: TimeConditionList[];
  }

  export interface ParamSubUseList {
    paramTypeId: string;
    paramSubUseId: string;
    paramSubUseName: string;
  }

  export interface Data {
    paramTypeId: string;
    paramTypeName: string;
    paramUseList: ParamUseList[];
    paramSubUseList: ParamSubUseList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}