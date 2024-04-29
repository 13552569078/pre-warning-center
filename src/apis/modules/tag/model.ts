/* eslint-disable @typescript-eslint/no-namespace */

/**
* 删除标签-Model类库
*/
export namespace IdeleteTSpace {

  export class RequestParams {
    tagInfoId?: number;
    constructor() {
      this.tagInfoId = 0;
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
* 查看标签是否已被引用-Model类库
*/
export namespace IgetCheckTagInfoHasReferenceSpace {

  export class RequestParams {
    tagInfoId?: number;
    constructor() {
      this.tagInfoId = 0;
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
* 查看标签详情-Model类库
*/
export namespace IgetDetailSpace {

  export class RequestParams {
    tagInfoId?: number;
    constructor() {
      this.tagInfoId = 0;
    }
  }

  export interface Data {
    tagInfoId: number;
    tagCode: string;
    tagName: string;
    tagDesc: string;
    updatedAt: string;
    createdAt: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 查看标签分类名称是否存在-Model类库
*/
export namespace IgetCheckNameIfExistSpace {

  export class RequestParams {
    tagName?: string; tagInfoId?: number;
    constructor() {
      this.tagName = ""; this.tagInfoId = 0;
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
* 新增标签-Model类库
*/
export namespace IaddSpace {

  export class RequestParams {
    tagInfoId?: number; tagCode?: string; tagName?: string; tagDesc?: string;
    constructor() {
      this.tagInfoId = 0; this.tagCode = ""; this.tagName = ""; this.tagDesc = "";
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
* 分页查询标签-Model类库
*/
export namespace IpostPageSpace {

  export class RequestParams {
    currentPage?: number; pageSize?: number; orderColumnStr?: string; orderStr?: string;
    constructor() {
      this.currentPage = 0; this.pageSize = 0; this.orderColumnStr = ""; this.orderStr = "";
    }
  }

  export interface List {
    tagInfoId: string;
    tagCode: string;
    tagName: string;
    tagDesc: string;
    updatedAt: string;
    createdAt: string;
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
      * 查看标签分类标识是否存在-Model类库
      */
export namespace IgetCheckCodeIfExistSpace {

  export class RequestParams {
    tagCode?: string; tagInfoId?: number;
    constructor() {
      this.tagCode = ""; this.tagInfoId = 0;
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
* 更新标签-Model类库
*/
export namespace IpostUpdateSpace {

  export class RequestParams {
    tagInfoId?: string; tagCode?: string; tagName?: string; tagDesc?: string;
    constructor() {
      this.tagInfoId = ''; this.tagCode = ""; this.tagName = ""; this.tagDesc = "";
    }
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: boolean;
  }
}