/* eslint-disable @typescript-eslint/no-namespace */

/**
* 设备类型详情-Model类库
*/
export namespace IpostDetailSpace {

  export class RequestParams {
    typeCode?: string;
    constructor() {
      this.typeCode = "";
    }
  }

  export interface Data {
    typeCode: string;
    typeName: string;
    typeDesc: string;
    facilityTypeCode: string;
    facilityTypeName: string;
    updatedAt: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 根据设施类型分类查询设备类型列表-Model类库
*/
export namespace IgetListpageSpace {

  export class RequestParams {
    currentPage?: number; pageSize?: number; facilityTypeCode?: string; orderColumnStr?: string; orderStr?: string;
    constructor() {
      this.currentPage = 0; this.pageSize = 0; this.facilityTypeCode = ""; this.orderColumnStr = ""; this.orderStr = "";
    }
  }

  export interface List {
    typeCode: string;
    typeName: string;
    typeDesc: string;
    facilityTypeCode: string;
    facilityTypeName: string;
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
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 添加设备类型-Model类库
*/
export namespace IaddSpace {

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: boolean;
  }
}
/**
* 删除设备类型-Model类库
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
      * 设备类型编码验重-Model类库
      */
export namespace IgetCheckRepeatSpace {

  export class RequestParams {
    equipTypeCode?: string;
    constructor() {
      this.equipTypeCode = "";
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
      * 根据设施类型查询设备类型列表-无分页-Model类库
      */
export namespace IgetListEquipTypeByFacicityTypeCodeSpace {

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
      * 编辑设备类型-Model类库
      */
export namespace IpostUpdateSpace {

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: boolean;
  }
}