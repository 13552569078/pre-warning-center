/* eslint-disable @typescript-eslint/no-namespace */

/**
* 添加标签-Model类库
*/
export namespace IpostAddEntityTagTagSpace {

  export class RequestParams {
    tagId?: number; keyCode?: string; keyName?: string; keyDesc?: string; sort?: number;
    constructor() {
      this.tagId = 0; this.keyCode = ""; this.keyName = ""; this.keyDesc = ""; this.sort = 0;
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
* 修改标签-Model类库
*/
export namespace IpostModifyEntityTagTagSpace {

  export class RequestParams {
    tagId?: number; keyCode?: string; keyName?: string; keyDesc?: string; sort?: number;
    constructor() {
      this.tagId = 0; this.keyCode = ""; this.keyName = ""; this.keyDesc = ""; this.sort = 0;
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
* 根据标签ID查询标签-Model类库
*/
export namespace IgetFindEntityTagTagSpace {

  export class RequestParams {
    tagId?: number;
    constructor() {
      this.tagId = 0;
    }
  }

  export interface Data {
    tagId: number;
    keyCode: string;
    keyName: string;
    keyDesc: string;
    sort: number;
  }

  export interface Model {
    code: number;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 删除标签-Model类库
*/
export namespace IpostRemoveEntityTagTagSpace {

  export class RequestParams {
    tagId?: number;
    constructor() {
      this.tagId = 0;
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
* 查询标签列表-Model类库
*/
export namespace IgetFindTagPageTagSpace {

  export class RequestParams {

    constructor() {

    }
  }

  export interface List {
    tagId: number;
    keyCode: string;
    keyName: string;
    keyDesc: string;
    sort: number;
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
* 根据风险分类Code获取事件详情-Model类库
*/
export namespace IgetFindEventTypeDetailVOEventTypeSpace {

  export class RequestParams {
    systemCode?: string;
    constructor() {
      this.systemCode = "";
    }
  }

  export interface AlarmLevelTypeList { }

  export interface WarningLevelTypeList { }

  export interface Data {
    fullSystemCode: string;
    systemCode: string;
    eventTypeCode: string;
    eventTypeName: string;
    parentEventType: string;
    parentEventTypeName: string;
    eventTypeDesc: string;
    alarmLevelTypeList: string[];
    warningLevelTypeList: string[];
  }

  export interface Model {
    code: number;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 根据风险分类分类查询风险分类列表-Model类库
*/
export namespace IgetListEventTypeVOPageEventTypeSpace {

  export class RequestParams {
    systemCode?: string;
    constructor() {
      this.systemCode = "";
    }
  }

  export interface AlarmLevelTypeList { }

  export interface WarningLevelTypeList { }

  export interface List {
    fullSystemCode: string;
    systemCode: string;
    eventTypeCode: string;
    eventTypeName: string;
    eventTypeDesc: string;
    isNeedStrategy: number;
    parentFullSystemCode: string;
    parentEventTypeCode: string;
    parentEventTypeName: string;
    alarmLevelTypeList: AlarmLevelTypeList[];
    warningLevelTypeList: WarningLevelTypeList[];
    handleConfig: number;
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
* 查询风险分类列表（下拉框）-Model类库
*/
export namespace IgetListEventTypeListVOsEventTypeSpace {

  export class RequestParams {

    constructor() {

    }
  }

  export interface Data {
    eventTypeCode: string;
    eventTypeName: string;
  }

  export interface Model {
    code: number;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 获取风险分类树列表-Model类库
*/
export namespace IgetListEventTreeVOsEventTypeSpace {

  export class RequestParams {

    constructor() {

    }
  }

  export interface Children {
    leafNode: number;
  }

  export interface Children {
    parentEventTypeCode: string;
    parentFullSystemCode: string;
    fullSystemCode: string;
    systemCode: string;
    eventTypeCode: string;
    eventTypeName: string;
    childrens: Children[];
    leafNode: number;
  }

  export interface Data {
    parentEventTypeCode: string;
    parentFullSystemCode: string;
    fullSystemCode: string;
    systemCode: string;
    eventTypeCode: string;
    eventTypeName: string;
    childrens: Children[];
    leafNode: number;
    [propname: string]: any;
  }

  export interface Model {
    code: number;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 批量修改风险分类等级-Model类库
*/
export namespace IpostModifyEventTypeLevelEventTypeSpace {

  export class RequestParams {
    eventTypeCode?: string; alarmLevelTypeList?: string[]; warningLevelTypeList?: string[];
    constructor() {
      this.eventTypeCode = ""; this.alarmLevelTypeList = []; this.warningLevelTypeList = [];
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
* 根据事件编码修改事件-Model类库
*/
export namespace IpostModifyEventTypeEventTypeSpace {

  export class RequestParams {
    systemCode?: string; eventTypeCode?: string; eventTypeName?: string; parentEventTypeCode?: string; parentEventTypeName?: string; eventTypeDesc?: string; alarmLevelTypeList?: string[]; warningLevelTypeList?: string[];
    constructor() {
      this.systemCode = ""; this.eventTypeCode = ""; this.eventTypeName = ""; this.parentEventTypeCode = ""; this.parentEventTypeName = ""; this.eventTypeDesc = ""; this.alarmLevelTypeList = []; this.warningLevelTypeList = [];
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
* 根据风险分类Code删除风险分类-Model类库
*/
export namespace IpostRemoveEventTypeEventTypeSpace {

  export class RequestParams {
    systemCode?: string;
    constructor() {
      this.systemCode = "";
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
* 添加事件/事件分类-Model类库
*/
export namespace IpostAddEventTypeEventTypeSpace {

  export class RequestParams {
    systemCode?: string; eventTypeCode?: string; eventTypeName?: string; parentEventTypeCode?: string; parentEventTypeName?: string; eventTypeDesc?: string; alarmLevelTypeList?: string[]; warningLevelTypeList?: string[];
    constructor() {
      this.systemCode = ""; this.eventTypeCode = ""; this.eventTypeName = ""; this.parentEventTypeCode = ""; this.parentEventTypeName = ""; this.eventTypeDesc = ""; this.alarmLevelTypeList = []; this.warningLevelTypeList = [];
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
* 查询所有风险分类的叶子节点-Model类库
*/
export namespace IgetFindEventTypePageEventTypeSpace {

  export class RequestParams {

    constructor() {

    }
  }

  export interface AlarmLevelTypeList { }

  export interface WarningLevelTypeList { }

  export interface List {
    [key: string]: any
    eventTypeCode: string;
    eventTypeCodeName: string;
    alarmLevelTypeList: AlarmLevelTypeList[];
    warningLevelTypeList: WarningLevelTypeList[];
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
      * 根据事件类型Code判断是否有下级节点-Model类库
      */
      export namespace IpostCheckEventTypeHaveChildrenSpace {

        export class RequestParams{
          systemCode?:string;
          constructor(){
            this.systemCode="";
          }
        }

      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: boolean;
      }
      }
