/* eslint-disable @typescript-eslint/no-namespace */

/**
* 查询指标树-Model类库
*/
export namespace IgetListTargetTreeSpace {
  export class RequestParams {
    targetFrequency?: number;
    dataType?:string[];
    constructor() {
      this.targetFrequency = 0;
      this.dataType = [];
    }
  }
  export interface ParentCode {
    id: number;
    targetTypeCode: string;
    targetTypeName: string;
    parentCode: ParentCode[];
    parentTargetName: string;
    type: number;
    children: ParentCode[]
  }

  export interface Data {
    id: string;
    targetTypeCode: string;
    targetTypeName: string;
    parentCode: ParentCode[];
    parentTargetName: string;
    children: Data[];
    type: number;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 根据指标分组类型id删除指标分组-Model类库
*/
export namespace IgetRemoveTargetTypeSpace {

  export class RequestParams {
    targetTypeId?: number;
    constructor() {
      this.targetTypeId = 0;
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
* 查询指标分组树-Model类库
*/
export namespace IgetListTargetTypeTreeSpace {

  export class RequestParams {

    constructor() {

    }
  }

  export interface ParentCode { }

  export interface ParentCode {
    id: number;
    targetTypeCode: string;
    targetTypeName: string;
    parentCode: ParentCode[];
  }

  export interface Data {
    id: number;
    targetTypeCode: string;
    targetTypeName: string;
    parentTargetName:  string;
    parentCode: ParentCode[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 添加指标分组-Model类库
*/
export namespace IpostAddTargetTypeSpace {

  export class RequestParams {
    id?: number; targetTypeCode?: string; targetTypeName?: string; targetTypeDesc?: string; parentCode?: string;
    constructor() {
      this.id = 0; this.targetTypeCode = ""; this.targetTypeName = ""; this.targetTypeDesc = ""; this.parentCode = "";
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
* 修改指标分组-Model类库
*/
export namespace IpostModifyTargetTypeSpace {

  export class RequestParams {
    id?: number; targetTypeCode?: string; targetTypeName?: string; targetTypeDesc?: string; parentCode?: string;
    constructor() {
      this.id = 0; this.targetTypeCode = ""; this.targetTypeName = ""; this.targetTypeDesc = ""; this.parentCode = "";
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
* 根据指标分组id查询指标分组-Model类库
*/
export namespace IgetFindTargetTypeDetailSpace {

  export class RequestParams {
    targetTypeId?: number;
    constructor() {
      this.targetTypeId = 0;
    }
  }

  export interface Data {
    id: number;
    targetTypeCode: string;
    targetTypeName: string;
    targetTypeDesc: string;
    parentCode: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
