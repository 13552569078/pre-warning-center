/* eslint-disable @typescript-eslint/no-namespace */

/**
* 查询监测因子详情-Model类库
*/
export namespace IgetFindMonitorFactorMonitorFactorSpace {

  export class RequestParams {
    factorId?: number;
    constructor() {
      this.factorId = 0;
    }
  }

  export interface Data {
    factorId: number;
    factorName: string;
    factorDataTypeCode: string;
    factorDataTypeName: string;
    factorDesc: string;
    measureUnitCode: string;
    measureUnitName: string;
    useState: string | number;
  }

  export interface Model {
    code: number;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 修改监测因子-Model类库
*/
export namespace IpostModifyMonitorFactorMonitorFactorSpace {

  export class RequestParams {
    factorId?: number; factorName?: string; factorDataTypeCode?: string; factorDesc?: string; measureUnitCode?: string; factorCode?: string;
    constructor() {
      this.factorId = 0; this.factorName = ""; this.factorDataTypeCode = ""; this.factorDesc = ""; this.measureUnitCode = ""; this.factorCode = "";
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
* 查询监测因子列表-Model类库
*/
export namespace IgetFindMonitorFactorPageMonitorFactorSpace {

  export class RequestParams {

    constructor() {

    }
  }

  export interface List {
    factorId: number;
    factorName: string;
    factorCode: string;
    factorDataTypeCode: string;
    factorDataTypeName: string;
    factorDesc: string;
    measureUnitCode: string;
    measureUnitName: string;
    riskTypeCode: string;
    riskTypeName: string;
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
    code: number;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 删除监测因子-Model类库
*/
export namespace IpostRemoveMonitorFactorMonitorFactorSpace {

  export class RequestParams {
    factorId?: number;
    constructor() {
      this.factorId = 0;
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
* 添加监测因子-Model类库
*/
export namespace IpostAddMonitorFactorMonitorFactorSpace {

  export class RequestParams {
    factorId?: number; factorName?: string; factorDataTypeCode?: string; factorDesc?: string; measureUnitCode?: string; factorCode?: string;
    constructor() {
      this.factorId = 0; this.factorName = ""; this.factorDataTypeCode = ""; this.factorDesc = ""; this.measureUnitCode = ""; this.factorCode = "";
    }
  }

  export interface Model {
    code: number;
    desc: string;
    tips: string;
    data: boolean;
  }
}

/* eslint-disable @typescript-eslint/no-namespace */

/**
* 监测因子编码验重-Model类库
*/
export namespace IgetFindFactorCodeVerifySpace {

  export class RequestParams {
    factorCode?: string; factorId?: number;
    constructor() {
      this.factorCode = ""; this.factorId = 0;
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
* 监测因子名称验重-Model类库
*/
export namespace IgetFindFactorNameVerifySpace {

  export class RequestParams {
    factorName?: string; factorId?: number;
    constructor() {
      this.factorName = ""; this.factorId = 0;
    }
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: boolean;
  }
}