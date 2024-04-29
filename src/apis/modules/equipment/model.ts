/* eslint-disable @typescript-eslint/no-namespace */

/**
* 监测设备-设备状态下拉-Model类库
*/
export namespace IselectEquipStatusSpace {

  export class RequestParams {

    constructor() {

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
* 监测设备-判断名称是否可用-Model类库
*/
export namespace IgetEnableSpace {

  export class RequestParams {
    equipName?: string; id?: number;
    constructor() {
      this.equipName = ""; this.id = 0;
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
* 监测设备-明细-Model类库
*/
export namespace IgetMonitorEquipSpace {

  export class RequestParams {
    id?: number;
    constructor() {
      this.id = 0;
    }
  }

  export interface Data {
    id: number;
    equipName: string;
    equipType: number;
    equipTypeName: string;
    equipCode: string;
    equipParam: string;
    address: string;
    longitude: string;
    latitude: string;
    useFor: string;
    description: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 监测设备-列表查询-Model类库
*/
export namespace IlistSpace {

  export class RequestParams {

    constructor() {

    }
  }

  export interface Data {
    id: number;
    equipName: string;
    equipType: number;
    equipCode: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 监测设备-删除-Model类库
*/
export namespace IdeleteMSpace {

  export class RequestParams {
    id?: number;
    constructor() {
      this.id = 0;
    }
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: number;
  }
}
/**
* 监测设备-新增-Model类库
*/
export namespace IaddSpace {

  export class RequestParams {
    id?: number; equipName?: string; equipType?: number; equipCode?: string; equipParam?: string; address?: string; useFor?: string; description?: string;
    constructor() {
      this.id = 0; this.equipName = ""; this.equipType = 0; this.equipCode = ""; this.equipParam = ""; this.address = ""; this.useFor = ""; this.description = "";
    }
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: number;
  }
}
/**
* 监测设备-分页查询-Model类库
*/
export namespace IpostPageSpace {

  export class RequestParams {
    currentPage?: number; pageSize?: number; equipType?: number; equipName?: string;
    constructor() {
      this.currentPage = 0; this.pageSize = 0; this.equipType = 0; this.equipName = "";
    }
  }

  export interface List {
    id: string;
    equipName: string;
    equipType: number;
    equipTypeName: string;
    equipCode: string;
    address: string;
    longitude: string;
    latitude: string;
    useFor: string;
    description: string;
  }

  export interface Data {
    totalRow: number;
    totalPage: number;
    currentPage: number;
    pageSize: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
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
* 监测设备-修改-Model类库
*/
export namespace IpostUpdateSpace {

  export class RequestParams {
    id?: number; equipName?: string; equipType?: number; equipCode?: string; equipParam?: string; address?: string; useFor?: string; description?: string;
    constructor() {
      this.id = 0; this.equipName = ""; this.equipType = 0; this.equipCode = ""; this.equipParam = ""; this.address = ""; this.useFor = ""; this.description = "";
    }
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: number;
  }
}

/**
* 导入设备列表-Model类库
*/
export namespace IpostImportEquipListSpace {

  export class RequestParams {

    constructor() {

    }
  }

  export interface EquipInfo {
    order: number;
    equipName: string;
    equipCode: string;
    equipTypeName: string;
    equipParam: string;
    address: string;
    longitude: string;
    latitude: string;
    equipStatusName: string;
    installTime: string;
    registerTime: string;
  }

  export interface Data {
    equipInfo: EquipInfo;
    msg: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}

/**
* 导入设备列表-Model类库
*/
export namespace IpostExportEquipListSpace {

  export class RequestParams {
    currentPage: number;
    pageSize: number;
    equipName: string;
    equipCode: string;
    address: string;
    equipTypeCode: string;
    equipStatus: string;
    installBeginTime: string;
    installEndTime: string;
    treeType: string;
    treeValue: 0;
    streetAreaCode: string;
    orderColumnStr: string;
    orderStr: string;
    longitude: string;
    latitude: string;
    distance: string;
    linked: number;
    constructor() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.equipName = '';
      this.equipCode= '';
      this.address= '';
      this.equipTypeCode= '';
      this.equipStatus= '';
      this.installBeginTime= '';
      this.installEndTime= '';
      this.treeType= '';
      this.treeValue = 0;
      this.streetAreaCode= '';
      this.orderColumnStr= '';
      this.orderStr= '';
      this.longitude= '';
      this.latitude= '';
      this.distance= '';
      this.linked = 0;
    }
  }

  export interface EquipInfo {
    order: number;
    equipName: string;
    equipCode: string;
    equipTypeName: string;
    equipParam: string;
    address: string;
    longitude: string;
    latitude: string;
    equipStatusName: string;
    installTime: string;
    registerTime: string;
  }

  export interface Data {
    equipInfo: EquipInfo;
    msg: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}