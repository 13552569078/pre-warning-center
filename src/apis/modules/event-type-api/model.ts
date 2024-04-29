interface ApiModel<T> {
  code: string
  data: T
  desc: string
  httpStatusCode: number
  tips: string
}

/**
* 查询事件类型列表（下拉框）-Model类库
*/
export namespace EventTypeList {

  export interface Data {
    eventTypeCode: string
    eventTypeName: string
  }

  export type Model = ApiModel<Data[]>
}

export namespace EventTypeTree {

  export interface Data {
    parentEventTypeCode: string
    parentFullSystemCode: string
    fullSystemCode: string
    systemCode: string
    eventTypeCode: string
    eventTypeName: string
    childrens: Data[]
  }

  export type Model = ApiModel<Data>
}

export namespace EventTypeDetail {

  export interface Data {
    fullSystemCode: string
    systemCode: string
    eventTypeCode: string
    eventTypeName: string
    parentEventType: string
    parentEventTypeName: string
    eventTypeDesc: string
    alarmLevelTypeList: string[]
    warningLevelTypeList: string[]
  }

  export type Model = ApiModel<Data>
}
