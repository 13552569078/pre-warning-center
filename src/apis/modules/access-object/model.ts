/* eslint-disable @typescript-eslint/no-namespace */

/**
* 更新接入对象-Model类库
*/
export namespace IpostUpdateAccessSourceObjectSpace {

  export class RequestParams {
    accessSourceObjectId?: number; accessSourceId?: number; objectName?: string; linkUrl?: string; linkParam?: string; accessSourceObjectDesc?: string;
    constructor() {
      this.accessSourceObjectId = 0; this.accessSourceId = 0; this.objectName = ""; this.linkUrl = ""; this.linkParam = ""; this.accessSourceObjectDesc = "";
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
* 查看数据对象详情-Model类库
*/
export namespace IgetGetAccessSourceObjectDetailSpace {

  export class RequestParams {
    accessSourceObjectId?: number;
    constructor() {
      this.accessSourceObjectId = 0;
    }
  }

  export interface Data {
    accessSourceObjectId: number;
    accessSourceName: string;
    objectName: string;
    linkUrl: string;
    linkParam: string;
    accessSourceObjectDesc: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 查询接入源列表-Model类库
*/
export namespace IgetGetAccessSourceListSpace {

  export class RequestParams {
    accessSourceName?: string;
    constructor() {
      this.accessSourceName = "";
    }
  }

  export interface Data {
    accessSourceId: number;
    accessSourceName: string;
    accessSourceType: string;
    accessSourceDesc: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 分页查询接入对象-Model类库
*/
export namespace IpostFindAccessSourceObjectPageSpace {

  export class RequestParams {
    currentPage?: number; pageSize?: number; objectName?: string; accessSourceType?: string; accessSourceId?: number; orderColumnStr?: string; orderStr?: string;
    constructor() {
      this.currentPage = 0; this.pageSize = 0; this.objectName = ""; this.accessSourceType = ""; this.accessSourceId = 0; this.orderColumnStr = ""; this.orderStr = "";
    }
  }

  export interface List {
    accessSourceObjectId: number;
    accessSourceId: number;
    accessSourceName: string;
    objectName: string;
    linkUrl: string;
    linkParam: string;
    updatedAt: string;
    accessSourceObjectDesc: string;
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
* 删除接入对象-Model类库
*/
export namespace IpostDeleteAccessSourceObjectSpace {

  export class RequestParams {
    accessSourceObjectId?: number;
    constructor() {
      this.accessSourceObjectId = 0;
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
* 删除接入源-Model类库
*/
export namespace IpostDeleteAccessSourceSpace {

  export class RequestParams {
    accessSourceId?: number;
    constructor() {
      this.accessSourceId = 0;
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
* 更新接入源-Model类库
*/
export namespace IpostUpdateAccessSourceSpace {

  export class RequestParams {
    accessSourceId?: number; accessSourceName?: string; accessSourceType?: string; accessSourceDesc?: string;
    constructor() {
      this.accessSourceId = 0; this.accessSourceName = ""; this.accessSourceType = ""; this.accessSourceDesc = "";
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
* 根据接入源id查询接入对象列表-Model类库
*/
export namespace IgetGetAccessSourceObjectListSpace {

  export class RequestParams {
    accessSourceId?: number;
    constructor() {
      this.accessSourceId = 0;
    }
  }

  export interface Data {
    accessSourceObjectId: number;
    accessSourceId: number;
    accessSourceName: string;
    objectName: string;
    linkUrl: string;
    linkParam: string;
    updatedAt: string;
    accessSourceObjectDesc: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 分组查询按接入源分类对象列表-Model类库
*/
export namespace IgetGetAccessSourceObjectGroupSpace {

  export class RequestParams {
    name?: string;
    constructor() {
      this.name = "";
    }
  }

  export interface ObjectList {
    accessSourceObjectId: number;
    accessSourceId: number;
    accessSourceName: string;
    objectName: string;
    linkUrl: string;
    linkParam: string;
    updatedAt: string;
    accessSourceObjectDesc: string;
  }

  export interface Data {
    accessSourceId: number;
    accessSourceName: string;
    objectList: ObjectList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 新增接入对象-Model类库
*/
export namespace IpostAddAccessSourceObjectSpace {

  export class RequestParams {
    accessSourceObjectId?: number; accessSourceId?: number; objectName?: string; linkUrl?: string; linkParam?: string; accessSourceObjectDesc?: string;
    constructor() {
      this.accessSourceObjectId = 0; this.accessSourceId = 0; this.objectName = ""; this.linkUrl = ""; this.linkParam = ""; this.accessSourceObjectDesc = "";
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
* 新增接入源-Model类库
*/
export namespace IpostAddAccessSourceSpace {

  export class RequestParams {
    accessSourceId?: number; accessSourceName?: string; accessSourceType?: string; accessSourceDesc?: string;
    constructor() {
      this.accessSourceId = 0; this.accessSourceName = ""; this.accessSourceType = ""; this.accessSourceDesc = "";
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
* 验证接入源-Model类库
*/
export namespace IpostCheckAccessSourceSpace {

  export class RequestParams {
    dataSourceType?: string;
    sourceParamJson?: string;
    accessSourceId?: string;
    accessSourceType?: string;
    accessSourceName?: string;
    constructor() {
      this.dataSourceType = ""; this.sourceParamJson = "";this.accessSourceId = "";this.accessSourceType="";this.accessSourceName="";
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
* 分组查询接入源列表-Model类库
*/
export namespace IpostGetAccessSourceGroupSpace {

  export class RequestParams {
    accessSourceName?: string;
    constructor() {
      this.accessSourceName = "";
    }
  }

  export interface Data {
    accessSourceName: string
    accessSourceId: string
    accessSourceObjectId?: string
    childrens: any[]
    accessSourceType: string
    dataSourceType: string
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}

/**
* 获取接入数据接口需映射字段
*/
export namespace IgetlistMockRelationObjects {

  export interface Data {
    code: string,
    name: string,
    value: number
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}