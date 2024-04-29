/* eslint-disable @typescript-eslint/no-namespace */

      /**
      * 监测点维护标签list-Model类库
      */
       export namespace IgetListMonitorUnitOutEntityTagVOsMonitorUnitSpace {

        export class RequestParams{
          monitorUnitId?:number;
          constructor(){
            this.monitorUnitId=0;
          }
        }

      export interface Data {
        outEntityKeyCode: string;
        outEntityKeyName: string;
        outEntityValue: string;
      }

      export interface Model {
        code: number;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 修改监测点监测因子-Model类库
            */
      export namespace IpostModifyMonitorUnitFactorMonitorUnitSpace {

        export class RequestParams{
          monitorUnitId?:[];
          constructor(){
            this.monitorUnitId=[];
          }
        }

      export interface Model {
        code: number;
        desc: string;
        tips: string;
        data: boolean;
      }
      }

      export namespace IgetFindUnitNameMonitorUnitSpace {
      export interface Model {
        code: number;
        desc: string;
        tips: string;
        data: boolean;
      }
      }
            /**
            * 监测点监测因子信息-Model类库
            */
      export namespace IgetListMonitorUnitFactorsMonitorUnitSpace {

        export class RequestParams{
          monitorUnitId?:number;
          constructor(){
            this.monitorUnitId=0;
          }
        }

      export interface MonitorUnitVO {
        monitorUnitId: number;
        unitName: string;
        accessDataCode: string;
      }

      export interface Data {
        factorId: number;
        factorName: string;
        monitorUnitVOS: MonitorUnitVO[];
        formulaCode: string;
        formulaCodeName: string;
        formulaExpression: string;
        formulaUrl: string;
      }

      export interface Model {
        code: number;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 修改监测点关联标签-Model类库
            */
      export namespace IpostModifyMonitorUnitOutEntityTagMonitorUnitSpace {

        export class RequestParams{
          monitorUnitId?:number;outEntityTagParams?:[];
          constructor(){
            this.monitorUnitId=0;this.outEntityTagParams=[];
          }
        }

      export interface Model {
        code: number;
        desc: string;
        tips: string;
        data: boolean;
      }
      }
            /**
            * 监测点list-Model类库
            */
      export namespace IgetListMonitorUnitRelationVOsMonitorUnitSpace {

        export class RequestParams{
          param?:any;
          constructor(){
            this.param="";
          }
        }

      export interface OutEntityTag {
        outEntityKeyCode: string;
        outEntityKeyName: string;
        outEntityValue: string;
      }

      export interface Data {
        monitorUnitId: string;
        unitName: string;
        accessDataCode: string;
        outEntityTags: OutEntityTag[];
      }

      export interface Model {
        code: number;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 删除监测点-Model类库
            */
      export namespace IpostRemoveMonitorUnitMonitorUnitSpace {

        export class RequestParams{
          monitorUnitId?:number;
          constructor(){
            this.monitorUnitId=0;
          }
        }

      export interface Model {
        code: number;
        desc: string;
        tips: string;
        data: boolean;
      }
      }
            /**
            * 新增监测点(基础监测点、综合监测点)-Model类库
            */
      export namespace IpostAddMonitorUnitMonitorUnitSpace {

        export class RequestParams{
          unitUserFor?:number;unitName?:string;eventTypeCode?:string;accessDataCode?:string;monitorFrequency?:number;monitorFrequencyUnit?:string;unitDesc?:string;relationMonitorUnits?:[];
          constructor(){
            this.unitUserFor=0;this.unitName="";this.eventTypeCode="";this.accessDataCode="";this.monitorFrequency=0;this.monitorFrequencyUnit="";this.unitDesc="";this.relationMonitorUnits=[];
          }
        }

      export interface Model {
        code: number;
        desc: string;
        tips: string;
        data: boolean;
      }
      }
            /**
            * 监测点详情-Model类库
            */
      export namespace IgetFindMonitorUnitMonitorUnitSpace {

        export class RequestParams{
          monitorUnitId?:number;
          constructor(){
            this.monitorUnitId=0;
          }
        }

      export interface OutEntityTag {
        outEntityKeyCode: string;
        outEntityKeyName: string;
        outEntityValue: string;
      }

      export interface RelationMonitorUnit {
        monitorUnitId: number;
        unitName: string;
        accessDataCode: string;
        outEntityTags: OutEntityTag[];
      }

      export interface OutEntityTag {
        outEntityKeyCode: string;
        outEntityKeyName: string;
        outEntityValue: string;
      }

      export interface MonitorUnitVO {
        monitorUnitId: number;
        unitName: string;
        accessDataCode: string;
      }

      export interface MonitorFactor {
        factorId: number;
        unitFactorId: number;
        accessDataCodes: Array<{ dataCode: string; dataCodeDesc: string; }>
        factorName: string;
        monitorUnitVOS: MonitorUnitVO[];
        formulaCode: string;
        formulaCodeName: string;
        formulaExpression: string;
        formulaUrl: string;
      }

      export interface Data {
        monitorUnitId: number;
        unitName: string;
        eventTypeCode: string;
        eventTypeCodeName: string;
        accessDataCode: string;
        outputDataCode: string;
        accessDataSource: string;
        accessDataSourceName: string;
        unitType: number;
        unitTypeName: string;
        monitorFrequency: number;
        monitorFrequencyUnit: string;
        monitorFrequencyUnitName: string;
        unitDesc: string;
        createdAt: string;
        relationMonitorUnits: RelationMonitorUnit[];
        outEntityTags: OutEntityTag[];
        monitorFactors: MonitorFactor[];
        updatedAt: string;
      }

      export interface Model {
        code: number;
        desc: string;
        tips: string;
        data: Data;
      }
      }
            /**
            * 修改监测点(基础监测点、综合监测点)-Model类库
            */
      export namespace IpostModifyMonitorUnitMonitorUnitSpace {

        export class RequestParams{
          unitUserFor?:number;monitorUnitId?:number;unitName?:string;eventTypeCode?:string;accessDataCode?:string;monitorFrequency?:number;monitorFrequencyUnit?:string;unitDesc?:string;relationMonitorUnits?:[];
          constructor(){
            this.unitUserFor=0;this.monitorUnitId=0;this.unitName="";this.eventTypeCode="";this.accessDataCode="";this.monitorFrequency=0;this.monitorFrequencyUnit="";this.unitDesc="";this.relationMonitorUnits=[];
          }
        }

      export interface Model {
        code: number;
        desc: string;
        tips: string;
        data: boolean;
      }
      }
            /**
            * 监测点列表(分页)-Model类库
            */
      export namespace IgetFindMonitorUnitPageMonitorUnitSpace {

        export class RequestParams{
          param?:any;
          constructor(){
            this.param="";
          }
        }

      export interface OutEntityTag {
        outEntityKeyCode: string;
        outEntityKeyName: string;
        outEntityValue: string;
      }

      export interface MonitorFactor {
        factorId: number;
        factorName: string;
      }

      export interface List {
        monitorUnitId: number;
        unitName: string;
        eventTypeCode: string;
        eventTypeCodeName: string;
        accessDataCode: string;
        outputDataCode: string;
        accessDataSource: string;
        accessDataSourceName: string;
        unitType: number;
        unitTypeName: string;
        monitorFrequencyStr: string;
        monitorFrequency: number;
        monitorFrequencyUnit: string;
        monitorFrequencyUnitName: string;
        outEntityTags: OutEntityTag[];
        monitorFactors: MonitorFactor[];
        unitDesc: string;
        createdAt: string;
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
        code: number;
        desc: string;
        tips: string;
        data: Data;
      }
      }
            /**
            * 根据监测点查询关联的监测点-Model类库
            */
      export namespace IgetListMonitorUnitsMonitorUnitSpace {

        export class RequestParams{
          monitorUnitId?:number;
          constructor(){
            this.monitorUnitId=0;
          }
        }

      export interface Data {
        monitorUnitId: number;
        unitName: string;
        accessDataCode: string;
      }

      export interface Model {
        code: number;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
