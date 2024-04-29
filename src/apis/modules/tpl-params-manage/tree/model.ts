/* eslint-disable @typescript-eslint/no-namespace */

/**
* 新增参数分组-Model类库
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
* 删除参数分组-Model类库
*/
export namespace IdeleteTSpace {

  export class RequestParams {
    templateParamGroupId?: number;
    constructor() {
      this.templateParamGroupId = 0;
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
* 查询参数分组详情-Model类库
*/
export namespace IgetDetailSpace {

  export class RequestParams {
    templateParamGroupId?: number;
    constructor() {
      this.templateParamGroupId = 0;
    }
  }

  export interface Data {
    templateParamGroupId: number;
    templateParamGroupName: string;
    templateParamGroupCode: string;
    parentCode: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 查询参数分组树-Model类库
*/
export namespace IgetTreeSpace {

  export interface Children {
    templateParamGroupId: string;
    templateParamGroupCode: string;
    templateParamGroupName: string;
    parentCode: string;
    parentName: string;
    children: Children[];
    parent: any;
  }

  export interface Data {
    templateParamGroupId: string;
    templateParamGroupCode: string;
    templateParamGroupName: string;
    parentCode: string;
    parentName: string;
    parent: any;
    children: Children[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 更新参数分组-Model类库
*/
export namespace IpostUpdateSpace {

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: boolean;
  }
}