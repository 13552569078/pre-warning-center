/* eslint-disable @typescript-eslint/no-namespace */
/**
      * 计量单位编码验重-Model类库
      */
export namespace IgetFindMeasureUnitCodeVerifySpace {

  export class RequestParams {
    measureUnitCode?: string; measureUnitId?: number;
    constructor() {
      this.measureUnitCode = ""; this.measureUnitId = 0;
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
* 计量单位名称验重-Model类库
*/
export namespace IgetFindMeasureUnitNameVerifySpace {

  export class RequestParams {
    measureUnitName?: string; measureUnitId?: number;
    constructor() {
      this.measureUnitName = ""; this.measureUnitId = 0;
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
* 查询计量单位列表-Model类库
*/
export namespace IgetListMeasureUnitsSpace {

  export class RequestParams {
    measureUnitName?: string;
    constructor() {
      this.measureUnitName = "";
    }
  }

  export interface Data {
    measureUnitId: number;
    measureUnitCode: string;
    measureUnitName: string;
    desc: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
 * 计算公式列表(分页)-Model类库
 */
export namespace IgetFindFormulaDefinedPageSpace {
  export class RequestParams {
    totalRow?: number;
    totalPage?: number;
    currentPage?: number;
    pageSize?: number;
    isFirstPage?: any;
    isLastPage?: any;
    hasPreviousPage?: any;
    list?: [];
    constructor() {
      this.totalRow = 0;
      this.totalPage = 0;
      this.currentPage = 0;
      this.pageSize = 0;
      this.isFirstPage = "";
      this.isLastPage = "";
      this.hasPreviousPage = "";
      this.list = [];
    }
  }

  export interface List {
    formulaCode: string;
    formulaName: string;
    formulaDesc: string;
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
 * 计算公式列表-Model类库
 */
export namespace IgetListFormulaDefinedVOsSpace {
  export class RequestParams {
    constructor() { }
  }

  export interface Data {
    formulaCode: string;
    formulaName: string;
    说明: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
 * 查询计量单位详情-Model类库
 */
export namespace IgetFindMeasureUnitDetailSpace {
  export class RequestParams {
    measureUnitId?: number;
    constructor() {
      this.measureUnitId = 0;
    }
  }

  export interface Data {
    measureUnitId: number;
    measureUnitCode: string;
    measureUnitName: string;
    desc: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 删除计量单位-Model类库
 */
export namespace IgetRemoveMeasureUnitSpace {
  export class RequestParams {
    measureUnitId?: number;
    constructor() {
      this.measureUnitId = 0;
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
 * 添加计量单位-Model类库
 */
export namespace IpostMeasureUnitSpace {
  export class RequestParams {
    measureUnitId?: number;
    measureUnitCode?: string;
    measureUnitName?: string;
    desc?: string;
    sort?: number;
    constructor() {
      this.measureUnitId = 0;
      this.measureUnitCode = "";
      this.measureUnitName = "";
      this.desc = "";
      this.sort = 0;
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
 * 修改计量单位-Model类库
 */
export namespace IpostModifyMeasureUnitSpace {
  export class RequestParams {
    measureUnitId?: number;
    measureUnitCode?: string;
    measureUnitName?: string;
    desc?: string;
    sort?: number;
    constructor() {
      this.measureUnitId = 0;
      this.measureUnitCode = "";
      this.measureUnitName = "";
      this.desc = "";
      this.sort = 0;
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
 * 计量单位列表(分页)-Model类库
 */
export namespace IgetFindMeasureUnitPageSpace {
  export class RequestParams {
    currentPage?: number;
    pageSize?: number;
    measureUnitCode?: string;
    measureUnitName?: string;
    orderColumnStr?: string;
    orderStr?: string;
    constructor() {
      this.currentPage = 0;
      this.pageSize = 0;
      this.measureUnitCode = '';
      this.measureUnitName = '';
      this.orderColumnStr = '';
      this.orderStr = '';
    }
  }

  export interface List {
    measureUnitId: number;
    measureUnitCode: string;
    measureUnitName: string;
    desc: string;
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
