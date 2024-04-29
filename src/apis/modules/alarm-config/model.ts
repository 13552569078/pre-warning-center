/* eslint-disable @typescript-eslint/no-namespace */
      
      /**
      * 主体类型-主体-监测点树-Model类库
      */
       export namespace IgetRegionMonitorUnitTreeSpace {

        export class RequestParams{
          
          constructor(){
            
          }
        }
      
      export interface UnitList {
        unitId: number;
        unitName: string;
        streetAreaCode: string;
        streetAreaName: string;
        treeType: string;
        facilityTypeCode: string;
        value: string;
        regionName: string;
        targetIdList: string;
        label: string;
      }
      
      export interface RegionList {
        regionTypeCode: string;
        regionId: number;
        regionName: string;
        treeType: string;
        unitList: UnitList[];
      }
      
      export interface Data {
        label: string;
        value: string;
        disabled: boolean;
        children: any[];
        regionTypeName: string;
        regionTypeCode: string;
        treeType: string;
        regionList: any[];
        unitName: string;
        regionName: string;
        unitId: string;
        regionId: string;
        unitList: any[];
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 报警策略列表(分页)-Model类库
            */
      export namespace IpostFindStrategyPageSpace {
      
        export class RequestParams{
          currentPage?:number;pageSize?:number;useFor?:number;strategyName?:string;eventTypeCodes?:[];isTemplate?:number;orderColumnStr?:string;orderStr?:string;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.useFor=0;this.strategyName="";this.eventTypeCodes=[];this.isTemplate=0;this.orderColumnStr="";this.orderStr="";
          }
        }
      
      export interface UnitVO {
        strategyId: number;
        unitId: number;
        strategyName: string;
        unitName: string;
        regionName: string;
      }
      
      export interface List {
        strategyId: number;
        strategyName: string;
        eventTypeCode: string;
        eventTypeCodeName: string;
        targetName: string;
        unitName: string;
        relationUnitNum: number;
        unitVOS: UnitVO[];
        updatedAt: string;
        isTemplate: number;
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
            * 修改监测策略-Model类库
            */
      export namespace IpostModifyStrategySpace {
      
        export class RequestParams{
          strategyId?:number;strategyName?:string;eventTypeCode?:string;strategyDesc?:string;targetId?:number;templateId?:number;strategyRuleParam?:[];unitParam?:[];
          constructor(){
            this.strategyId=0;this.strategyName="";this.eventTypeCode="";this.strategyDesc="";this.targetId=0;this.templateId=0;this.strategyRuleParam=[];this.unitParam=[];
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
            * 策略详情-Model类库
            */
      export namespace IgetFindStrategySpace {
      
        export class RequestParams{
          strategyId?:number;
          constructor(){
            this.strategyId=0;
          }
        }
      
      export interface StrategyRuleVO {
        ruleId: number;
        ruleName: string;
        ruleLevel: string;
        ruleLevelName: string;
        ruleDesc: string;
        factorValue: string;
      }
      
      export interface TargetDataNameList {}
      
      export interface UnitVO {
        unitId: number;
        unitName: string;
        targetDataNameList: TargetDataNameList[];
      }
      
      export interface Data {
        strategyId: string;
        strategyName: string;
        eventTypeCode: string;
        eventTypeCodeName: string;
        strategyDesc: string;
        targetId: number;
        targetName: string;
        templateId: number;
        templateName: string;
        updatedAt: string;
        createdAt: string;
        strategyRuleVOS: StrategyRuleVO[];
        unitVOS: UnitVO[];
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
      }
      }
            /**
            * 校验名称是否重复-Model类库
            */
      export namespace IpostCheckIfNameExistSpace {
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: boolean;
      }
      }
            /**
            * 监测点报警策略列表(分页)-Model类库
            */
 /**
      * 监测点报警策略列表(分页)-Model类库
      */
  export namespace IpostFindUnitStrategyPageSpace {

    export class RequestParams{
      currentPage?:number;pageSize?:number;useFor?:number;strategyName?:string;eventTypeCodes?:[];unitName?:string;regionName?:string;orderColumnStr?:string;orderStr?:string;strategyId?:number;
      constructor(){
        this.currentPage=0;this.pageSize=0;this.useFor=0;this.strategyName="";this.eventTypeCodes=[];this.unitName="";this.regionName="";this.orderColumnStr="";this.orderStr="";this.strategyId=0;
      }
    }
  
  export interface List {
    regionId: number;
    regionName: string;
    unitId: number;
    unitName: string;
    strategyId: number;
    strategyName: string;
    eventTypeCode: string;
    eventTypeCodeName: string;
    targetName: string;
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
            * 新增监测策略-Model类库
            */
      export namespace IpostAddStrategySpace {
      
        export class RequestParams{
          strategyId?:number;strategyName?:string;eventTypeCode?:string;strategyDesc?:string;targetId?:number;templateId?:number;strategyRuleParam?:[];unitParam?:[];
          constructor(){
            this.strategyId=0;this.strategyName="";this.eventTypeCode="";this.strategyDesc="";this.targetId=0;this.templateId=0;this.strategyRuleParam=[];this.unitParam=[];
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
            * 删除策略-Model类库
            */
      export namespace IpostRemoveMonitorStrategySpace {
      
        export class RequestParams{
          strategyType?:number;monitorStrategyId?:number;
          constructor(){
            this.strategyType=0;this.monitorStrategyId=0;
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
      * 报警策略模板模板(不分页)-Model类库
      */
export namespace IgetListStrategyTemplatesSpace {

  export class RequestParams{
    
    constructor(){
      
    }
  }

export interface Data {
	templateId: number;
	strategyName: string;
  templateName: string;
}

export interface Model {
	code: string;
	desc: string;
	tips: string;
	data: Data[];
}
}

/**
* 查询指标树-Model类库
*/
export namespace IgetListTargetTreeSpace {
  export class RequestParams {
    targetFrequency?: number;
    constructor() {
      this.targetFrequency = 0;
    }
  }
  export interface ParentCode {
    id: number;
    targetTypeCode: string;
    targetTypeName: string;
    parentCode: ParentCode[];
    parentTargetName: string;
    type: number;
    children: ParentCode[]
  }

  export interface Data {
    id: string;
    targetTypeCode: string;
    targetTypeName: string;
    parentCode: ParentCode[];
    parentTargetName: string;
    children: Data[];
    type: number;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}
      /**
      * 监测指标数据-Model类库
      */
       export namespace IgetTargetDataListSpace {

        export class RequestParams{
          targetId?:number;strategyId?:number;
          constructor(){
            this.targetId=0;this.strategyId=0;
          }
        }
      
      export interface Data {
        targetDataId: string;
        targetDataName: string;
        isPublic: number;
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 设为/取消模板-Model类库
            */
      export namespace IpostModifyTemplateSpace {
      
        export class RequestParams{
          monitorStrategyId?:number;isTemplate?:number;
          constructor(){
            this.monitorStrategyId=0;this.isTemplate=0;
          }
        }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: boolean;
      }
      }