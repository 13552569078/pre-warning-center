/* eslint-disable @typescript-eslint/no-namespace */

/**
 * 监测主体下拉框列表-Model类库
 */
export namespace IgetRegionSimpleListSpace {
  export class RequestParams {
    regionName?: string;
    constructor() {
      this.regionName = "";
    }
  }

  export interface Data {
    regionTypeCode: string;
    id: number;
    regionName: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
 * 监测主体-修改-Model类库
 */
export namespace IpostUpdateSpace {
  export class RequestParams {
    id?: number;
    regionName?: string;
    regionTypeCode?: any;
    principalName?: string;
    principalMobile?: string;
    responsibleName?: string;
    responsibleMobile?: string;
    address?: string;
    longitude?: string;
    latitude?: string;
    streetAreaCode?: string;
    belongOrgId?: number;
    belongName?: string;
    belongMobile?: string;
    chargeOrgId?: number;
    chargeName?: string;
    chargeMobile?: string;
    description?: string;
    photoFileIds?: [];
    constructor() {
      this.id = 0;
      this.regionName = "";
      this.regionTypeCode = "";
      this.principalName = "";
      this.principalMobile = "";
      this.responsibleName = "";
      this.responsibleMobile = "";
      this.address = "";
      this.longitude = "";
      this.latitude = "";
      this.streetAreaCode = "";
      this.belongOrgId = 0;
      this.belongName = "";
      this.belongMobile = "";
      this.chargeOrgId = 0;
      this.chargeName = "";
      this.chargeMobile = "";
      this.description = "";
      this.photoFileIds = [];
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
 * 监测主体-新增-Model类库
 */
export namespace IaddSpace {
  export class RequestParams {
    id?: number;
    regionName?: string;
    regionTypeCode?: any;
    principalName?: string;
    principalMobile?: string;
    responsibleName?: string;
    responsibleMobile?: string;
    address?: string;
    longitude?: string;
    latitude?: string;
    streetAreaCode?: string;
    belongOrgId?: number;
    belongName?: string;
    belongMobile?: string;
    chargeOrgId?: number;
    chargeName?: string;
    chargeMobile?: string;
    description?: string;
    photoFileIds?: [];
    constructor() {
      this.id = 0;
      this.regionName = "";
      this.regionTypeCode = "";
      this.principalName = "";
      this.principalMobile = "";
      this.responsibleName = "";
      this.responsibleMobile = "";
      this.address = "";
      this.longitude = "";
      this.latitude = "";
      this.streetAreaCode = "";
      this.belongOrgId = 0;
      this.belongName = "";
      this.belongMobile = "";
      this.chargeOrgId = 0;
      this.chargeName = "";
      this.chargeMobile = "";
      this.description = "";
      this.photoFileIds = [];
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
 * 主体类型-主体-监测点树-Model类库
 */
export namespace IgetRegionMonitorUnitTreeSpace {

  export interface UnitList {
    unitId: string;
    unitName: string;
    streetAreaCode: string;
    streetAreaName: string;
    treeType: string;
    label: string;
  }

  export interface RegionList {
    regionTypeCode: string;
    regionId: string;
    regionName: string;
    unitList: UnitList[];
    treeType: string;
    label: string;
  }

  export interface Data {
    regionTypeName: string;
    regionTypeCode: string;
    regionList: RegionList[];
    treeType: string;
    label: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
 * 监测主体-停用启用-Model类库
 */
export namespace IgetEnableOrDisableSpace {
  export class RequestParams {
    id?: number;
    useState?: number;
    constructor() {
      this.id = 0;
      this.useState = 0;
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
 * 监测主体-判断名称是否可用-Model类库
 */
export namespace IgetEnableSpace {
  export class RequestParams {
    regionName?: string;
    id?: string;
    constructor() {
      this.regionName = "";
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
 * 监测主体-主体轮廓-Model类库
 */
export namespace IgetOutlineSpace {
  export class RequestParams {
    regionId?: number;
    constructor() {
      this.regionId = 0;
    }
  }

  export interface Data {
    regionId: number;
    gisOutline: string;
    gisPoint: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 监测主体-删除-Model类库
 */
export namespace IdeleteMSpace {
  export class RequestParams {
    id?: number;
    constructor() {
      this.id = 0;
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
 * 监测点-监测主体列表-Model类库
 */
export namespace IgetRegionListSpace {
  export class RequestParams {
    constructor() { }
  }

  export interface RegionList {
    regionTypeCode: string;
    id: number;
    regionName: string;
    regionTypeName: string;
    label: string;
  }

  export interface Data {
    id: string;
    regionTypeName: string;
    regionName: string;
    regionTypeCode: string;
    address: string;
    longitude: string;
    latitude: string;
    label: string;
    regionList: RegionList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
 * 监测点-监测主体列表(根据事件类型过滤)-Model类库
 */
export namespace IpostRegionListFilterByEventSpace {
  export class RequestParams {
    codeList?: [];
    constructor() {
      this.codeList = [];
    }
  }

  export interface RegionList {
    regionTypeCode: string;
    id: number;
    regionName: string;
  }

  export interface Data {
    id: number;
    regionTypeName: string;
    regionTypeCode: string;
    regionList: RegionList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
/**
 * 监测主体-更新轮廓信息-Model类库
 */
export namespace IpostUpdateGisOutlineSpace {
  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: number;
  }
}
/**
 * 监测主体-分页查询-Model类库
 */
export namespace IpostPageSpace {
  export class RequestParams {
    currentPage?: number;
    pageSize?: number;
    regionName?: string;
    regionTypeCode?: string;
    streetAreaCode?: string;
    constructor() {
      this.currentPage = 0;
      this.pageSize = 0;
      this.regionName = "";
      this.regionTypeCode = "";
      this.streetAreaCode = "";
    }
  }

  export interface List {
    id: number;
    regionName: string;
    regionTypeCode: string;
    regionTypeName: string;
    principalName: string;
    principalMobile: string;
    address: string;
    streetAreaCode: string;
    streetAreaName: string;
    belongOrgId: number;
    belongOrgName: string;
    chargeOrgId: number;
    chargeOrgName: string;
    useState: number;
  }

  export interface Data {
    totalRow: number;
    totalPage: number;
    currentPage: number;
    pageSize: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
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
 * 监测主体-明细-Model类库
 */
export namespace IgetMonitorRegionSpace {
  export class RequestParams {
    id?: number;
    constructor() {
      this.id = 0;
    }
  }

  export interface PhotoFile {
    id: string;
    originalName: string;
    url: string;
  }

  export interface Data {
    id: number;
    regionName: string;
    regionTypeCode: string;
    regionTypeName: string;
    principalName: string;
    principalMobile: string;
    responsibleName: string;
    responsibleMobile: string;
    address: string;
    longitude: string;
    latitude: string;
    streetAreaCode: string;
    streetAreaName: string;
    belongOrgId: number;
    belongOrgName: string;
    belongName: string;
    belongMobile: string;
    chargeOrgId: number;
    chargeOrgName: string;
    chargeName: string;
    chargeMobile: string;
    description: string;
    photoFile: PhotoFile[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}

/**
      * 主体及监测点集合转换为树接口-Model类库
      */
export namespace IpostChangeRegionUnitListToTreeSpace {

  export class RequestParams{
    regionUnitParams?:[];
    constructor(){
      this.regionUnitParams=[];
    }
  }

export interface UnitList {
	unitId: number;
	unitName: string;
	streetAreaCode: string;
	streetAreaName: string;
	treeType: string;
	facilityTypeCode: string;
	regionName: string;
}

export interface RegionList {
	regionTypeCode: string;
	regionId: number;
	regionName: string;
	treeType: string;
	unitList: UnitList[];
}

export interface Data {
	regionTypeName: string;
	regionTypeCode: string;
	treeType: string;
	regionList: RegionList[];
}

export interface Model {
	code: string;
	desc: string;
	tips: string;
	data: Data[];
}
}