interface ApiModel<T> {
  code: string
  data: T
  desc: string
  httpStatusCode: number
  tips: string
}

export namespace Dict {

  export interface Data {
    typeCode: string
    dictCode: string
    dictName: string
  }

  export type Model = ApiModel<Data[]>
}
