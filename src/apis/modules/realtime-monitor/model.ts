/* eslint-disable @typescript-eslint/no-namespace */

/**
 * 接入数据监测-历史数据-Model类库
 */
export namespace IpostGetAccessItemDataHistorySpace {
  export class RequestParams {
    currentPage?: number;
    pageSize?: number;
    accessItemId?: number|string;
    timeFrom?: string;
    timeTo?: string;
    constructor() {
      this.currentPage = 0;
      this.pageSize = 0;
      this.accessItemId = 0;
      this.timeFrom = "";
      this.timeTo = "";
    }
  }

  export interface TimeStart {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeEnd {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeScope {
    accessItemId: number;
    dateStart: string;
    timeStart: TimeStart;
    dateEnd: string;
    timeEnd: TimeEnd;
  }

  export interface AccessItemDetail {
    accessItemId: number;
    accessSourceId: number;
    accessSourceObjectId: number;
    accessItemName: string;
    accessItemCode: string;
    accessFrequency: number;
    accessFrequencyUnit: string;
    accessFrequencyUnitName: string;
    accessSourceName: string;
    accessSourceObjectName: string;
    accessItemDesc: string;
    equipId: number;
    equipName: string;
    updatedAt: string;
    timeScopes: TimeScope[];
  }

  export interface List {
    accessItemId: number;
    collectTime: string;
    createdAt: string;
    dataValue: string;
  }

  export interface HistoryPage {
    totalRow: number;
    totalPage: number;
    currentPage: number;
    pageSize: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    list: List[];
  }

  export interface Stat {
    dateTimeStart: string;
    dateTimeEnd: string;
    dataNum: number;
  }

  export interface Data {
    accessItemDetail: AccessItemDetail;
    historyPage: HistoryPage;
    stats: Stat;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 在线监测-Model类库
 */
export namespace IpostGetTargetDataRealTimePageSpace {
  export class RequestParams {
    currentPage?: number;
    pageSize?: number;
    targetDataName?: string;
    isMultiple?: number;
    dataType?: string;
    targetTypeCode?: string;
    targetId?: number;
    targetFrequency?: number;
    constructor() {
      this.currentPage = 0;
      this.pageSize = 0;
      this.targetDataName = "";
      this.isMultiple = 0;
      this.dataType = "";
      this.targetTypeCode = "";
      this.targetId = 0;
      this.targetFrequency = 0;
    }
  }

  export interface List {
    dataResultId: number;
    accessItemId: number;
    targetDataId: number;
    targetDataName: string;
    isMultiple: number;
    dataType: string;
    dataTypeName: string;
    targetTypeId: number;
    targetTypeName: string;
    dataValue: string;
    targetFrequency: number;
    targetFrequencyUnit: string;
    targetFrequencyUnitName: string;
    collectTime: string;
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
 * 接入数据监测统计信息-Model类库
 */
export namespace IgetGetAccessItemStatsSpace {
  export class RequestParams {
    constructor() {}
  }

  export interface Data {
    accessItemNum: number;
    accessItemDataNum: number;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 接入数据监测-设备详情-Model类库
 */
export namespace IgetGetEquipDetailSpace {
  export class RequestParams {
    equipId?: number;
    constructor() {
      this.equipId = 0;
    }
  }

  export interface EquipDetail {
    id: number;
    equipName: string;
    equipType: number;
    equipTypeName: string;
    equipCode: string;
    equipParam: string;
    address: string;
    longitude: string;
    latitude: string;
    useFor: string;
    description: string;
    monitorUnitId: number;
    monitorUnitName: string;
    equipTypeCode: string;
    facilityTypeCode: string;
    facilityTypeName: string;
    streetAreaCode: string;
    installTime: string;
    registerTime: string;
    equipStatus: string;
    equipStatusName: string;
  }

  export interface AccessItem {
    accessItemId: number;
    accessItemName: string;
    dataTypeName: string;
    targetFrequency: number;
    targetFrequencyUnit: string;
    targetFrequencyUnitName: string;
  }

  export interface Data {
    equipDetail: EquipDetail;
    accessItems: AccessItem[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 获取复合指标数据项单条历史数据对应的指标数据项详情集合-Model类库
 */
export namespace IgetGetHistoryTargetDataDetailsSpace {
  export class RequestParams {
    dataResultId?: number;
    constructor() {
      this.dataResultId = 0;
    }
  }

  export interface TimeStart {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeEnd {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeScope {
    targetDataId: number;
    dateStart: string;
    timeStart: TimeStart;
    dateEnd: string;
    timeEnd: TimeEnd;
  }

  export interface TimeStart {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeEnd {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeScope {
    targetDataId: number;
    dateStart: string;
    timeStart: TimeStart;
    dateEnd: string;
    timeEnd: TimeEnd;
  }

  export interface ReferTargetData {
    targetDataId: number;
    accessItemId: number;
    accessSourceObjectName: string;
    targetId: number;
    targetName: string;
    targetTypeId: number;
    targetTypeName: string;
    dataType: string;
    dataTypeName: string;
    targetDataName: string;
    isMultiple: number;
    formulaId: number;
    formulaName: string;
    computePeriodTypeName: string;
    targetFrequency: number;
    targetFrequencyUnit: string;
    targetFrequencyUnitName: string;
    measureUnitName: string;
    initCollectTime: string;
    updatedAt: string;
    timeScopes: TimeScope[];
  }

  export interface Data {
    targetDataId: number;
    accessItemId: number;
    accessSourceObjectName: string;
    targetId: number;
    targetName: string;
    targetTypeId: number;
    targetTypeName: string;
    dataType: string;
    dataTypeName: string;
    targetDataName: string;
    isMultiple: number;
    formulaId: number;
    formulaName: string;
    computePeriodTypeName: string;
    targetFrequency: number;
    targetFrequencyUnit: string;
    targetFrequencyUnitName: string;
    measureUnitName: string;
    useState: number;
    useStateName: string;
    initCollectTime: string;
    updatedAt: string;
    timeScopes: TimeScope[];
    referTargetData: ReferTargetData[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
 * 监测布控-获取设备列表-Model类库
 */
export namespace IpostGetEquipRealTimePageSpace {
  export class RequestParams {
    currentPage?: number;
    pageSize?: number;
    equipTypeName?: string;
    equipStatus?: string;
    equipName?: string;
    constructor() {
      this.currentPage = 0;
      this.pageSize = 0;
      this.equipTypeName = "";
      this.equipStatus = "";
      this.equipName = "";
    }
  }

  export interface List {
    equipId: number;
    equipName: string;
    equipTypeName: string;
    equipCode: string;
    streetAreaCode: string;
    areaCodeName: string;
    equipStatusName: string;
    accessItemNum: number;
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
 * 简单指标数据项数据溯源-Model类库
 */
export namespace IpostGetTraceSimpleTargetDataSpace {
  export class RequestParams {
    currentPage?: number;
    pageSize?: number;
    dataResultId?: number;
    accessItemId?: number;
    constructor() {
      this.currentPage = 0;
      this.pageSize = 0;
      this.dataResultId = 0;
      this.accessItemId = 0;
    }
  }

  export interface TimeStart {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeEnd {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeScope {
    accessItemId: number;
    dateStart: string;
    timeStart: TimeStart;
    dateEnd: string;
    timeEnd: TimeEnd;
  }

  export interface AccessItemDetail {
    accessItemId: number;
    accessSourceId: number;
    accessSourceObjectId: number;
    accessItemName: string;
    accessItemCode: string;
    accessFrequency: number;
    accessFrequencyUnit: string;
    accessFrequencyUnitName: string;
    accessSourceName: string;
    accessSourceObjectName: string;
    accessItemDesc: string;
    updatedAt: string;
    timeScopes: TimeScope[];
  }

  export interface List {
    accessItemId: number;
    accessItemName: string;
    collectTime: string;
    dataValue: string;
  }

  export interface TracePage {
    totalRow: number;
    totalPage: number;
    currentPage: number;
    pageSize: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    list: List[];
  }

  export interface Data {
    accessItemDetail: AccessItemDetail;
    tracePage: TracePage;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 历史数据-Model类库
 */
export namespace IpostHistorySpace {
  export class RequestParams {
    currentPage?: number;
    pageSize?: number;
    targetDataId?: number;
    timeFrom?: string;
    timeTo?: string;
    constructor() {
      this.currentPage = 0;
      this.pageSize = 0;
      this.targetDataId = 0;
      this.timeFrom = "";
      this.timeTo = "";
    }
  }

  export interface List {
    dataResultId: number;
    targetDataId: number;
    dataValue: string;
    collectTime: string;
    accessItemId: string;
    targetId: number;
  }

  export interface HistoryPage {
    totalRow: number;
    totalPage: number;
    currentPage: number;
    pageSize: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    list: List[];
  }

  export interface TimeStart {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeEnd {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeScope {
    targetDataId: number;
    dateStart: string;
    timeStart: TimeStart;
    dateEnd: string;
    timeEnd: TimeEnd;
  }

  export interface TimeStart {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeEnd {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeScope {
    targetDataId: number;
    dateStart: string;
    timeStart: TimeStart;
    dateEnd: string;
    timeEnd: TimeEnd;
  }

  export interface ReferTargetData {
    targetDataId: number;
    accessItemId: number;
    accessSourceObjectName: string;
    targetId: number;
    targetName: string;
    targetTypeId: number;
    targetTypeName: string;
    dataType: string;
    dataTypeName: string;
    targetDataName: string;
    isMultiple: number;
    formulaId: number;
    formulaName: string;
    computePeriodTypeName: string;
    targetFrequency: number;
    targetFrequencyUnit: string;
    targetFrequencyUnitName: string;
    measureUnitName: string;
    initCollectTime: string;
    updatedAt: string;
    timeScopes: TimeScope[];
  }

  export interface TargetDataDetail {
    targetDataId: number;
    accessItemId: number;
    accessSourceObjectName: string;
    targetId: number;
    targetName: string;
    targetTypeId: number;
    targetTypeName: string;
    dataType: string;
    dataTypeName: string;
    targetDataName: string;
    isMultiple: number;
    formulaId: number;
    formulaName: string;
    computePeriodTypeName: string;
    targetFrequency: number;
    targetFrequencyUnit: string;
    targetFrequencyUnitName: string;
    measureUnitName: string;
    useState: number;
    useStateName: string;
    initCollectTime: string;
    updatedAt: string;
    timeScopes: TimeScope[];
    referTargetData: ReferTargetData[];
  }

  export interface Data {
    historyPage: HistoryPage;
    targetDataDetail: TargetDataDetail;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 监测数据-获取监测数据图表数据-Model类库
 */
export namespace IpostGetRegionMonitorChartDataSpace {
  export interface ChartDataList {
    equipId: number;
    accessItemId: number;
    collectTime: string;
    dataValue: string;
  }

  export interface Data {
    chartDataList: ChartDataList[];
    accessItemId: number;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
 * 复合指标数据项数据溯源-Model类库
 */
export namespace IpostGetTraceMultipleTargetDataSpace {
  export class RequestParams {
    currentPage?: number;
    pageSize?: number;
    dataResultId?: number;
    targetDataId?: number;
    constructor() {
      this.currentPage = 0;
      this.pageSize = 0;
      this.dataResultId = 0;
      this.targetDataId = 0;
    }
  }

  export interface TimeStart {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeEnd {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeScope {
    targetDataId: number;
    dateStart: string;
    timeStart: TimeStart;
    dateEnd: string;
    timeEnd: TimeEnd;
  }

  export interface TimeStart {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeEnd {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeScope {
    targetDataId: number;
    dateStart: string;
    timeStart: TimeStart;
    dateEnd: string;
    timeEnd: TimeEnd;
  }

  export interface ReferTargetData {
    targetDataId: number;
    accessItemId: number;
    accessSourceObjectName: string;
    targetId: number;
    targetName: string;
    targetTypeId: number;
    targetTypeName: string;
    dataType: string;
    dataTypeName: string;
    targetDataName: string;
    isMultiple: number;
    formulaId: number;
    formulaName: string;
    computePeriodTypeName: string;
    targetFrequency: number;
    targetFrequencyUnit: string;
    targetFrequencyUnitName: string;
    measureUnitName: string;
    initCollectTime: string;
    updatedAt: string;
    timeScopes: TimeScope[];
  }

  export interface TargetDataDetail {
    targetDataId: number;
    accessItemId: number;
    accessSourceObjectName: string;
    targetId: number;
    targetName: string;
    targetTypeId: number;
    targetTypeName: string;
    dataType: string;
    dataTypeName: string;
    targetDataName: string;
    isMultiple: number;
    formulaId: number;
    formulaName: string;
    computePeriodTypeName: string;
    targetFrequency: number;
    targetFrequencyUnit: string;
    targetFrequencyUnitName: string;
    measureUnitName: string;
    useState: number;
    useStateName: string;
    initCollectTime: string;
    updatedAt: string;
    timeScopes: TimeScope[];
    referTargetData: ReferTargetData[];
  }

  export interface List {
    targetDataId: number;
    targetDataName: string;
    collectTime: string;
    dataValue: string;
  }

  export interface TracePage {
    totalRow: number;
    totalPage: number;
    currentPage: number;
    pageSize: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    list: List[];
  }

  export interface Data {
    targetDataDetail: TargetDataDetail;
    tracePage: TracePage;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 获取复合指标数据项单条历史数据对应的指标数据项id集合-Model类库
 */
export namespace IgetGetHistoryTargetDataIdsSpace {
  export class RequestParams {
    dataResultId?: number;
    constructor() {
      this.dataResultId = 0;
    }
  }

  export interface Data {}

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
 * 接入数据监测-获取监测数据列表-Model类库
 */
export namespace IpostGetAccessItemRealTimePageSpace {
  export class RequestParams {
    currentPage?: number;
    pageSize?: number;
    accessItemName?: string;
    accessItemCode?: string;
    accessFrequency?: number;
    equipId?: number;
    constructor() {
      this.currentPage = 0;
      this.pageSize = 0;
      this.accessItemName = "";
      this.accessItemCode = "";
      this.accessFrequency = 0;
      this.equipId = 0;
    }
  }

  export interface TimeStart {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeEnd {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeScope {
    accessItemId: number;
    dateStart: string;
    timeStart: TimeStart;
    dateEnd: string;
    timeEnd: TimeEnd;
  }

  export interface List {
    accessItemId: number;
    accessItemName: string;
    accessItemCode: string;
    accessFrequency: number;
    accessFrequencyUnit: string;
    accessFrequencyUnitName: string;
    accessSourceObjectName: string;
    equipId: number;
    equipName: string;
    timeScopes: TimeScope[];
    dataValue: string;
    collectTime: string;
    createdAt: string;
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
 * 指标数据监测统计信息-Model类库
 */
export namespace IgetGetTargetDataStatsSpace {
  export class RequestParams {
    constructor() {}
  }

  export interface Data {
    targetDataNum: number;
    targetDataResultNum: number;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 监测数据-获取监测数据接入数据项详情-Model类库
 */
export namespace IgetGetRegionMonitorAccessItemsSpace {
  export class RequestParams {
    equipId?: number;
    constructor() {
      this.equipId = 0;
    }
  }

  export interface TimeStart {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeEnd {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

  export interface TimeScope {
    accessItemId: number;
    dateStart: string;
    timeStart: TimeStart;
    dateEnd: string;
    timeEnd: TimeEnd;
  }

  export interface Data {
    accessItemId: number;
    accessSourceId: number;
    accessSourceObjectId: number;
    accessItemName: string;
    accessItemCode: string;
    accessFrequency: number;
    accessFrequencyUnit: string;
    accessFrequencyUnitName: string;
    accessSourceName: string;
    accessSourceObjectName: string;
    accessItemDesc: string;
    updatedAt: string;
    timeScopes: TimeScope[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
