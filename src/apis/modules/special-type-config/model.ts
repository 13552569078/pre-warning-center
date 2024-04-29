/* eslint-disable @typescript-eslint/no-namespace */

/**
 * 场景定义-专项类型分页列表-Model类库
 */
export namespace IpostPageSpace {
  export interface List {
    id: number;
    sceneName: string;
    useState: number;
    description: string;
    sceneCode: string;
    parentCode: string;
    eventTypeNum: number;
    regionNum: number;
    unitNum: number;
    targetNum: number;
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
 * 场景定义-专项类型树-Model类库
 */
export namespace IgetListTreeSpace {
  export class RequestParams {
    constructor() {}
  }

  export interface Children {}

  export interface Children {
    id: number;
    sceneName: string;
    sceneCode: string;
    parentCode: string;
    children: Children[];
  }

  export interface Data {
    id: number;
    sceneName: string;
    sceneCode: string;
    parentCode: string;
    children: Children[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
