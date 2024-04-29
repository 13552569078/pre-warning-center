/* eslint-disable @typescript-eslint/no-namespace */

      /**
      * 导入视频设备列表-Model类库
      */
      export namespace IpostImportVideoEquipListSpace {

        export class RequestParams{
          accessSourceObjectId?:number;targetInfoId?:number;
          constructor(){
            this.accessSourceObjectId=0;this.targetInfoId=0;
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
            /**
            * 新增监测策略-Model类库
            */
      export namespace IpostAddMonitorStrategySpace {

        export class RequestParams{
          monitorUnitId?:number;monitorStrategyId?:number;strategyType?:number;strategyName?:string;eventTypeCode?:string;strategyDesc?:string;updatedAt?:string;createdAt?:string;facilityType?:string;clearType?:number;clearTypeInterval?:number;intervalTime?:number;intervalTimeUnit?:string;strategyRuleParams?:[];silentConfigParams?:[];
          constructor(){
            this.monitorUnitId=0;this.monitorStrategyId=0;this.strategyType=0;this.strategyName="";this.eventTypeCode="";this.strategyDesc="";this.updatedAt="";this.createdAt="";this.facilityType="";this.clearType=0;this.clearTypeInterval=0;this.intervalTime=0;this.intervalTimeUnit="";this.strategyRuleParams=[];this.silentConfigParams=[];
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
            * 监测点-根据监测主体查询监测点-Model类库
            */
      export namespace IpostFindMonitorUnitByRegionIdSpace {

        export class RequestParams{
          regionIds?:[];
          constructor(){
            this.regionIds=[];
          }
        }

      export interface StrategyName {}

      export interface Unit {
        unitId: number;
        unitName: string;
        checked: Boolean,
        strategyNames: StrategyName[];
      }

      export interface Data {
        regionList: Unit[];
        regionId: number;
        regionName: string;
        units: Unit[];
        checked: Boolean,
      }

      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
