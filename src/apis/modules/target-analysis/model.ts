/* eslint-disable @typescript-eslint/no-namespace */

/**
 * 查询列表信息-Model类库
 */
export namespace IlistSpace {
  export interface Data {
    targetDataId: number;
    targetDataName: string;
    thresholdValue: string;
    dataNum: number;
    exceptionNum: number;
    exceptionPercentage: string;
    maxValue: string;
    minValue: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
 * 查询指标分析数据项详情-Model类库
 */
export namespace IpostDetailSpace {
  export interface TimeList {}

  export interface DataList {
    collectTime: string;
    dataValue: string;
    isException: boolean;
  }

  export interface Data {
    targetDataId: number;
    targetDataName: string;
    thresholdValue: string;
    maxValue: string;
    minValue: string;
    measureUnitName: string;
    timeList: TimeList[];
    dataList: DataList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 查询图表数据-Model类库
 */
export namespace IpostChartDataSpace {
  export interface TimeList {}

  export interface TargetDataList {
    targetDataId: number;
    targetDataName: string;
    exceptionNum: number;
  }

  export interface DataList {
    time: string;
    exceptionNum: number;
    targetDataList: TargetDataList[];
  }

  export interface Data {
    timeList: TimeList[];
    dataList: DataList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 导出列表-Model类库
 */
 export namespace IpostExportListSpace {
  export interface TimeList {}

  export interface TargetDataList {
    targetDataId: number;
    targetDataName: string;
    exceptionNum: number;
  }

  export interface DataList {
    time: string;
    exceptionNum: number;
    targetDataList: TargetDataList[];
  }

  export interface Data {
    timeList: TimeList[];
    dataList: DataList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
