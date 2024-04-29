/* eslint-disable @typescript-eslint/no-namespace */

/**
* 删除设备类型-Model类库
*/
export namespace IdeleteDeleteEquipTypeSpace {

  export class RequestParams {
    typeId?: number;
    constructor() {
      this.typeId = 0;
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
* 更新设备类型-Model类库
*/
export namespace IpostUpdateEquipTypeSpace {

  export class RequestParams {
    typeId?: number; typeCode?: string; typeName?: string; parentId?: number | string; equipType?: number;
    constructor() {
      this.typeId = 0; this.typeCode = ""; this.typeName = ""; this.parentId = 0; this.equipType = 0;
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
* 添加设备类型-Model类库
*/
export namespace IpostAddEquipTypeSpace {

  export class RequestParams {
    typeId?: number; typeCode?: string; typeName?: string; parentId?: number | string; equipType?: number;
    constructor() {
      this.typeId = 0; this.typeCode = ""; this.typeName = ""; this.parentId = 0; this.equipType = 0;
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
* 获取设备类型树-Model类库
*/
export namespace IgetTreeSpace {

  export class RequestParams {

    constructor() {

    }
  }

  export interface Children { }

  export interface Children {
    typeId: number;
    parentId: number;
    typeCode: string;
    typeName: string;
    children: Children[];
  }

  export interface Data {
    typeId: number;
    parentId: number;
    typeCode: string;
    typeName: string;
    equipType: number;
    children: Children[];
    id?: number;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 设备类型详情-Model类库
*/
export namespace IgetDetailSpace {

  export class RequestParams {
    typeId?: number;
    constructor() {
      this.typeId = 0;
    }
  }

  export interface Data {
    typeId: number;
    parentId: number;
    typeCode: string;
    typeName: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}

/* eslint-disable @typescript-eslint/no-namespace */

/**
* 获取设备类型-设备树-Model类库
*/
export namespace IgetEquipTreeSpace {
  export interface Children {
    parentId: number;
    name: string;
    type: number;
    children: Children[];
    id: number;
  }

  export interface Data {
    parentId: string;
    name: string;
    type: number;
    children: Children[];
    id: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}