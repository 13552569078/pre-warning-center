/* eslint-disable @typescript-eslint/no-namespace */

/**
* 房屋设施详情-Model类库
*/
export namespace IgetFacilityBuildingSpace {

  export class RequestParams {
    id?: string;
    constructor() {
      this.id = '';
    }
  }

  export interface PhotoFile {
    id: string;
    originalName: string;
    url: string;
  }

  export interface Data {
    id: string;
    facilityName: string;
    facilityTypeCode: string;
    facilityTypeName: string;
    buildingTypeCode: string;
    buildingTypeName: string;
    address: string;
    areaCode: string;
    areaName: string;
    maintainLevelCode: string;
    maintainLevelName: string;
    maintainUnitCode: string;
    maintainUnitVal: string;
    directeUnitCode: string;
    directeUnitVal: string;
    owerUnitCode: string;
    owerUnitVal: string;
    designUnitName: string;
    buildUnitName: string;
    superviseUnitName: string;
    workUnitName: string;
    completedTime: string;
    totalCost: string;
    facilityStateCode: string;
    facilityStateVal: string;
    buildingDesc: string;
    photoFile: PhotoFile[];
    updatedAt: string;
    createdAt: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
* 更新房屋设施-Model类库
*/
export namespace IpostUpdateSpace {

  export class RequestParams {
    id?: string; facilityName?: string; facilityTypeCode?: string; buildingTypeCode?: string; address?: string; areaCode?: string; maintainLevelCode?: string; maintainLevelName?: string; maintainUnitCode?: string; maintainUnitVal?: string; directeUnitCode?: string; directeUnitVal?: string; owerUnitCode?: string; owerUnitVal?: string; designUnitName?: string; buildUnitName?: string; superviseUnitName?: string; workUnitName?: string; completedTime?: string; totalCost?: string; facilityStateCode?: string; facilityStateVal?: string; buildingDesc?: string; imageUrls?: string;
    constructor() {
      this.id = ''; this.facilityName = ""; this.facilityTypeCode = ""; this.buildingTypeCode = ""; this.address = ""; this.areaCode = ""; this.maintainLevelCode = ""; this.maintainLevelName = ""; this.maintainUnitCode = ""; this.maintainUnitVal = ""; this.directeUnitCode = ""; this.directeUnitVal = ""; this.owerUnitCode = ""; this.owerUnitVal = ""; this.designUnitName = ""; this.buildUnitName = ""; this.superviseUnitName = ""; this.workUnitName = ""; this.completedTime = ""; this.totalCost = ""; this.facilityStateCode = ""; this.facilityStateVal = ""; this.buildingDesc = ""; this.imageUrls = "";
    }
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: number;
  }
}
/**
* 删除建筑工地-Model类库
*/
export namespace IdeleteFSpace {

  export class RequestParams {
    id?: string;
    constructor() {
      this.id = '';
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
* 分页查询房屋设施列表-Model类库
*/
export namespace IpostPageListSpace {

  export class RequestParams {
    currentPage?: number; pageSize?: number; facilityName?: string; buildingTypeCode?: string; areaCode?: string; maintainUnitVal?: string; directeUnitVal?: string; facilityStateCode?: string; orderColumnStr?: string; orderStr?: string;
    constructor() {
      this.currentPage = 0; this.pageSize = 0; this.facilityName = ""; this.buildingTypeCode = ""; this.areaCode = ""; this.maintainUnitVal = ""; this.directeUnitVal = ""; this.facilityStateCode = ""; this.orderColumnStr = ""; this.orderStr = "";
    }
  }

  export interface List {
    id: string;
    facilityName: string;
    facilityTypeCode: string;
    facilityTypeName: string;
    buildingTypeCode: string;
    buildingTypeName: string;
    areaCode: string;
    areaName: string;
    maintainUnitVal: string;
    directeUnitVal: string;
    facilityStateCode: string;
    facilityStateVal: string;
    maintainLevelCode: string;
    maintainLevelName: string;
    updatedAt: string;
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
* 新增房屋设施-Model类库
*/
export namespace IaddSpace {

  export class RequestParams {
    id?: string; facilityName?: string; facilityTypeCode?: string; buildingTypeCode?: string; address?: string; areaCode?: string; maintainLevelCode?: string; maintainLevelName?: string; maintainUnitCode?: string; maintainUnitVal?: string; directeUnitCode?: string; directeUnitVal?: string; owerUnitCode?: string; owerUnitVal?: string; designUnitName?: string; buildUnitName?: string; superviseUnitName?: string; workUnitName?: string; completedTime?: string; totalCost?: string; facilityStateCode?: string; facilityStateVal?: string; buildingDesc?: string; imageUrls?: string;
    constructor() {
      this.id = ''; this.facilityName = ""; this.facilityTypeCode = ""; this.buildingTypeCode = ""; this.address = ""; this.areaCode = ""; this.maintainLevelCode = ""; this.maintainLevelName = ""; this.maintainUnitCode = ""; this.maintainUnitVal = ""; this.directeUnitCode = ""; this.directeUnitVal = ""; this.owerUnitCode = ""; this.owerUnitVal = ""; this.designUnitName = ""; this.buildUnitName = ""; this.superviseUnitName = ""; this.workUnitName = ""; this.completedTime = ""; this.totalCost = ""; this.facilityStateCode = ""; this.facilityStateVal = ""; this.buildingDesc = ""; this.imageUrls = "";
    }
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: number;
  }
}
/**
* 批量删除建筑工地-Model类库
*/
export namespace IdeleteSpace {

  export class RequestParams {
    ids?: [];
    constructor() {
      this.ids = [];
    }
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: boolean;
  }
}