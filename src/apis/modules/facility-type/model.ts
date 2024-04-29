/* eslint-disable @typescript-eslint/no-namespace */

/**
* 根据设施类型Code删除设施类型-Model类库
*/
export namespace IdeleteSpace {

  export class RequestParams {
    typeCode?: string;
    constructor() {
      this.typeCode = "";
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
* 修改设施类型-Model类库
*/
export namespace ImodifySpace {

  export class RequestParams {
    typeCode?: string; typeName?: string; parentTypeCode?: string; parentTypeName?: string; typeDesc?: string; leafNode?: string;
    constructor() {
      this.typeCode = ""; this.typeName = ""; this.parentTypeCode = ""; this.parentTypeName = ""; this.typeDesc = ""; this.leafNode = "";
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
* 获取设施类型树列表-Model类库
*/
export namespace IgetFacilityTreeSpace {

  export interface Children {
    parentTypeCode: string;
    typeCode: string;
    typeName: string;
    leafNode: number;
    childrens: Children[];
  }

  export interface Data {
    parentTypeCode: string;
    typeCode: string;
    typeName: string;
    leafNode: number;
    childrens: Children[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 查询设施类型列表（下拉框）-Model类库
*/
export namespace IgetSelectFacilitiesSpace {

  export class RequestParams {
    typeName?: string;
    constructor() {
      this.typeName = "";
    }
  }

  export interface Data {
    typeCode: string;
    typeName: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 添加设施类型-Model类库
*/
export namespace IaddSpace {

  export class RequestParams {
    typeCode?: string; typeName?: string; parentTypeCode?: string; parentTypeName?: string; typeDesc?: string; leafNode?: string;
    constructor() {
      this.typeCode = ""; this.typeName = ""; this.parentTypeCode = ""; this.parentTypeName = ""; this.typeDesc = ""; this.leafNode = '';
    }
  }

  export interface Children { }

  export interface Children {
    parentTypeCode: string;
    typeCode: string;
    typeName: string;
    leafNode: number;
    childrens: Children[];
  }

  export interface Data {
    parentTypeCode: string;
    typeCode: string;
    typeName: string;
    leafNode: number;
    childrens: Children[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 获取设施类型详情-Model类库
*/
export namespace IgetDetailSpace {

  export class RequestParams {
    typeCode?: string;
    constructor() {
      this.typeCode = "";
    }
  }

  export interface Data {
    typeId: string;
    typeCode: string;
    typeName: string;
    typeDesc: string;
    parentTypeCode: string;
    parentTypeName: string;
    leafNode: string;
    updatedAt: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}