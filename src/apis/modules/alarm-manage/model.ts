/* eslint-disable @typescript-eslint/no-namespace */

/**
 * 报警中数据统计-Model类库
 */
export namespace IgetAlarmingNumberSpace {
  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: number;
  }
}
/**
 * 查询报警列表-Model类库
 */
export namespace IgetFindAlarmLogPageSpace {

  export class RequestParams {
    eventId?: string;
    currentPage?: number;
    pageSize?: number;
    regionTypeCode?: string;
    regionId?: number;
    monitorUnitId?: string;
    monitorUnitName?: string;
    alarmState?: number;
    alarmLevel?: string;
    eventTypeCode?: string;
    startTime?: string;
    endTime?: string;
    alarmTitle?: string;
    judgeStatus?: string;
    judgeType?: string;
    checkStatusCode?: number;
    alarmOrigin?: string;
    handleOption?: string;
    selfTagNames?: string;

    constructor() {
      this.currentPage = 0;
      this.pageSize = 0;
      this.regionTypeCode = "";
      this.regionId = 0;
      this.monitorUnitId = "";
      this.monitorUnitName = "";
      this.alarmState = 0;
      this.alarmLevel = "";
      this.eventTypeCode = "";
      this.startTime = "";
      this.endTime = "";
      this.alarmTitle = "";
      this.judgeStatus = "";
      this.checkStatusCode = 0;
      this.selfTagNames = "";
    }
  }

  export interface List {
    selection: boolean;
    id: number;
    regionName: string;
    monitorUnitId: string;
    monitorUnitName: string;
    eventTypeCode: string;
    eventTypeName: string;
    alarmLevelCode: string;
    alarmLevelName: string;
    alarmTitle: string;
    startTime: string;
    endTime: string;
    alarmState: number;
    checkStatusCode: string;
    checkStatusName: string;
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
 * 查询今日报警数量-Model类库
 */
export namespace IgetFindTodayAlarmNumberSpace {
  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: number;
  }
}
/**
 * 查询报警详情-Model类库
 */
export namespace IgetAlarmSpace {

  export class RequestParams {
    id?: number;

    constructor() {
      this.id = 0;
    }
  }

  export interface Data {
    id: number;
    alarmTitle: string;
    eventTypeCode: string;
    eventTypeName: string;
    alarmLevel: string;
    alarmLevelName: string;
    regionName: string;
    monitorUnit: string;
    monitorUnitId?: string;
    areaCode: string;
    areaCodeName: string;
    alarmAddress: string;
    startTime: string;
    endTime: string;
    alarmState: string;
    alarmDesc: string;
    attachments: any[]
    ruleCode: string;
    strategyId: string;
    versionId: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}

/**
 * 查询指标数据折线图-Model类库
 */
export namespace IgetFindAlarmTargetDataSpace {

  export class RequestParams {

    constructor() {
    }
  }

  // export interface CollectTimeList {
  // }

  export interface AlarmTargetDataItemVOList {
    collectDate: string;
    collectTime: string;
    targetDataName: string;
    value: number;
    measureUnitName: string;
    dataType: string;
  }

  export interface AlarmTargetDataVOList {
    targetDataName: string;
    alarmTargetDataItemVOList: AlarmTargetDataItemVOList[];
  }

  export interface Data {
    collectTimeList: string[];
    alarmTargetDataVOList: AlarmTargetDataVOList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}

/**
 * 报警研判-Model类库
 */
export namespace IpostJudgeAlarmSpace {

  export class RequestParams {
    alarmId?: string; judgeStatusCode?: number; alarmLevelCode?: string; judgeDesc?: string;
    constructor() {
      this.alarmId = ""; this.judgeStatusCode = 0; this.alarmLevelCode = ""; this.judgeDesc = "";
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
 * 查询报警趋势-Model类库
 */
export namespace IgetFindHistoryAlarmTrendSpace {

  export class RequestParams {
    unitId?: string; timeRange?: string; eventTypeCode?: string; alarmLevel?: string; endEventCode?: string;
    constructor() {
      this.unitId = ""; this.timeRange = ""; this.eventTypeCode = ""; this.alarmLevel = ""; this.endEventCode = "";
    }
  }

  export interface HistoryAlarmTrendItemVOList {
    time: string;
    alarmNumber: number;
  }

  export interface Data {
    timeList: string[];
    historyAlarmTrendItemVOList: HistoryAlarmTrendItemVOList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}

/* eslint-disable @typescript-eslint/no-namespace */

/**
* 查询详情里的指标数据-Model类库
*/
export namespace IgetFindAlarmTargetDataListSpace {

  export interface DataList {
    collectTime: string;
    dataValue: string;
  }

  export interface Data {
    targetDataName: string;
    dataList: DataList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}

/**
 * 监测点-关联监测设备-Model类库
 */
export namespace IgetFindMonitorUnitEquipsSpace {

  export class RequestParams{
    unitId?:number;
    constructor(){
      this.unitId=0;
    }
  }

  export interface Data {
    id: number;
    equipName: string;
    equipType: number;
    equipCode: string;
    equipTypeCode: string;
    equipTypeCodeName: string;
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
      * 手动消警-Model类库
      */
      export namespace IgetArtificialEndAlarmSpace {

        export interface Model {
          code: string;
          desc: string;
          tips: string;
          data: boolean;
        }
        }
