/* eslint-disable @typescript-eslint/no-namespace */

/**
* 模拟数据列表-Model类库
*/
export namespace IgetListMockDatasSpace {

  export class RequestParams {
    accessItemId?: number;
    constructor() {
      this.accessItemId = 0;
    }
  }

  export interface Data {
    accessItemId: number;
    dataTitle: string;
    dataValue: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 添加模拟数据-Model类库
*/
export namespace IpostAddMockDataSpace {

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: boolean;
  }
}

export namespace IpostMockDataSpace {

  export interface Data {
    accessItemCode: string,
    dataValue: string,
    collectTime: string,
    placeholder: string
  }

  export interface DataWrapper {
    outCode: string,
    collectTime: string,
    dataValues: Data[]
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: boolean;
  }
}