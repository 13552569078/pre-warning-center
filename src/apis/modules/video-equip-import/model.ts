/* eslint-disable @typescript-eslint/no-namespace */

/**
* 导入视频设备列表-Model类库
*/
export namespace IpostImportVideoEquipListSpace {

  export class RequestParams {
    accessSourceObjectId?: number; targetInfoId?: number;
    constructor() {
      this.accessSourceObjectId = 0; this.targetInfoId = 0;
    }
  }

  export interface VideoEquipExcelVO {
    order: number;
    unitName: string;
    regionName: string;
    address: string;
    longitude: string;
    latitude: string;
    unitDesc: string;
    equipName: string;
    equipCode: string;
    equipTypeName: string;
    equipParam: string;
    equipStatusName: string;
    analysisAlgorithm: string;
    installTime: string;
    registerTime: string;
  }

  export interface Data {
    videoEquipExcelVO: VideoEquipExcelVO;
    msg: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}

export namespace IgetGetVideoEquipImportTemplateSpace {
  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: any;
  }
}

/* eslint-disable @typescript-eslint/no-namespace */

/**
* 获取接入数据对象列表-Model类库
*/
export namespace IgetListAccessSourceObjectSpace {

  export class RequestParams {

    constructor() {

    }
  }

  export interface Data {
    code: string;
    name: string;
    value: number;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}

/* eslint-disable @typescript-eslint/no-namespace */

/**
* 获取接入数据对象列表-Model类库
*/
export namespace IgetListAccessSourceObjectSpace {

  export interface Data {
    code: string;
    name: string;
    value: number;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
* 查询视频设备指标列表-Model类库
*/
export namespace IgetListVideoEquipTargetInfoSpace {

  export interface Data {
    code: string;
    name: string;
    value: number;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}