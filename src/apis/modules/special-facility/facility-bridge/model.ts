/* eslint-disable @typescript-eslint/no-namespace */
      
      /**
      * 分页查询桥梁设施列表-Model类库
      */
       export namespace IpostPageListSpace {

        export class RequestParams{
          currentPage?:number;pageSize?:number;facilityName?:string;maintainUnitVal?:string;directeUnitVal?:string;maintainLevelCode?:string;areaCode?:string;facilityStateCode?:string;bridgeTypeCode?:string;orderColumnStr?:string;orderStr?:string;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.facilityName="";this.maintainUnitVal="";this.directeUnitVal="";this.maintainLevelCode="";this.areaCode="";this.facilityStateCode="";this.bridgeTypeCode="";this.orderColumnStr="";this.orderStr="";
          }
        }
      
      export interface List {
        id: number;
        facilityName: string;
        facilityTypeCode: string;
        facilityTypeName: string;
        areaCode: string;
        areaName: string;
        maintainUnitVal: string;
        directeUnitVal: string;
        facilityStateCode: string;
        facilityStateVal: string;
        maintainLevelCode: string;
        maintainLevelName: string;
        updatedAt: string;
        bridgeTypeCode: string;
        bridgeTypeName: string;
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
            * 批量删除建筑工地-Model类库
            */
      export namespace IdeleteSpace {
      
        export class RequestParams{
          ids?:[];
          constructor(){
            this.ids=[];
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
            * 删除建筑工地-Model类库
            */
      export namespace IdeleteFSpace {
      
        export class RequestParams{
          id?:number;
          constructor(){
            this.id=0;
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
            * 桥梁设施详情-Model类库
            */
      export namespace IgetFacilityBridgeSpace {
      
        export class RequestParams{
          id?:number;
          constructor(){
            this.id=0;
          }
        }
      
      export interface PhotoFile {
        id: string;
        originalName: string;
        url: string;
      }
      
      export interface Data {
        id: number;
        bridgeTypeCode: string;
        bridgeTypeName: string;
        facilityName: string;
        facilityTypeCode: string;
        facilityTypeName: string;
        address: string;
        areaCode: string;
        areaName: string;
        belongRoad: string;
        belongRoadSection: string;
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
        bridgeDesc: string;
        bridgeLevelCode: string;
        bridgeLevelVal: string;
        bridgeLength: string;
        bridgeArea: string;
        bridgeWidth: string;
        acrossTypeCode: string;
        acrossTypeVal: string;
        bridgeAcrossNum: number;
        spanCompose: string;
        positiveObliqueAngle: string;
        seismicIntensity: string;
        designLoad: string;
        loadLimit: string;
        heightLimit: string;
        riverLevelCode: string;
        riverLevelVal: string;
        riverbedHeight: string;
        limitedHighWater: string;
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
            * 更新桥梁设施-Model类库
            */
      export namespace IpostUpdateSpace {
      
        export class RequestParams{
          id?:number;facilityName?:string;facilityTypeCode?:string;bridgeTypeCode?:string;address?:string;areaCode?:string;belongRoad?:string;belongRoadSection?:string;maintainLevelCode?:string;maintainLevelName?:string;maintainUnitCode?:string;maintainUnitVal?:string;directeUnitCode?:string;directeUnitVal?:string;owerUnitCode?:string;owerUnitVal?:string;designUnitName?:string;buildUnitName?:string;superviseUnitName?:string;workUnitName?:string;completedTime?:string;totalCost?:string;facilityStateCode?:string;facilityStateVal?:string;bridgeDesc?:string;bridgeLevelCode?:string;bridgeLevelVal?:string;bridgeLength?:string;bridgeArea?:string;bridgeWidth?:string;acrossTypeCode?:string;acrossTypeVal?:string;bridgeAcrossNum?:number;spanCompose?:string;positiveObliqueAngle?:string;seismicIntensity?:string;designLoad?:string;loadLimit?:string;heightLimit?:string;riverLevelCode?:string;riverLevelVal?:string;riverbedHeight?:string;limitedHighWater?:string;imageUrls?:string;
          constructor(){
            this.id=0;this.facilityName="";this.facilityTypeCode="";this.bridgeTypeCode="";this.address="";this.areaCode="";this.belongRoad="";this.belongRoadSection="";this.maintainLevelCode="";this.maintainLevelName="";this.maintainUnitCode="";this.maintainUnitVal="";this.directeUnitCode="";this.directeUnitVal="";this.owerUnitCode="";this.owerUnitVal="";this.designUnitName="";this.buildUnitName="";this.superviseUnitName="";this.workUnitName="";this.completedTime="";this.totalCost="";this.facilityStateCode="";this.facilityStateVal="";this.bridgeDesc="";this.bridgeLevelCode="";this.bridgeLevelVal="";this.bridgeLength="";this.bridgeArea="";this.bridgeWidth="";this.acrossTypeCode="";this.acrossTypeVal="";this.bridgeAcrossNum=0;this.spanCompose="";this.positiveObliqueAngle="";this.seismicIntensity="";this.designLoad="";this.loadLimit="";this.heightLimit="";this.riverLevelCode="";this.riverLevelVal="";this.riverbedHeight="";this.limitedHighWater="";this.imageUrls="";
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
            * 新增桥梁设施-Model类库
            */
      export namespace IaddSpace {
      
        export class RequestParams{
          id?:number;facilityName?:string;facilityTypeCode?:string;bridgeTypeCode?:string;address?:string;areaCode?:string;belongRoad?:string;belongRoadSection?:string;maintainLevelCode?:string;maintainLevelName?:string;maintainUnitCode?:string;maintainUnitVal?:string;directeUnitCode?:string;directeUnitVal?:string;owerUnitCode?:string;owerUnitVal?:string;designUnitName?:string;buildUnitName?:string;superviseUnitName?:string;workUnitName?:string;completedTime?:string;totalCost?:string;facilityStateCode?:string;facilityStateVal?:string;bridgeDesc?:string;bridgeLevelCode?:string;bridgeLevelVal?:string;bridgeLength?:string;bridgeArea?:string;bridgeWidth?:string;acrossTypeCode?:string;acrossTypeVal?:string;bridgeAcrossNum?:number;spanCompose?:string;positiveObliqueAngle?:string;seismicIntensity?:string;designLoad?:string;loadLimit?:string;heightLimit?:string;riverLevelCode?:string;riverLevelVal?:string;riverbedHeight?:string;limitedHighWater?:string;imageUrls?:string;
          constructor(){
            this.id=0;this.facilityName="";this.facilityTypeCode="";this.bridgeTypeCode="";this.address="";this.areaCode="";this.belongRoad="";this.belongRoadSection="";this.maintainLevelCode="";this.maintainLevelName="";this.maintainUnitCode="";this.maintainUnitVal="";this.directeUnitCode="";this.directeUnitVal="";this.owerUnitCode="";this.owerUnitVal="";this.designUnitName="";this.buildUnitName="";this.superviseUnitName="";this.workUnitName="";this.completedTime="";this.totalCost="";this.facilityStateCode="";this.facilityStateVal="";this.bridgeDesc="";this.bridgeLevelCode="";this.bridgeLevelVal="";this.bridgeLength="";this.bridgeArea="";this.bridgeWidth="";this.acrossTypeCode="";this.acrossTypeVal="";this.bridgeAcrossNum=0;this.spanCompose="";this.positiveObliqueAngle="";this.seismicIntensity="";this.designLoad="";this.loadLimit="";this.heightLimit="";this.riverLevelCode="";this.riverLevelVal="";this.riverbedHeight="";this.limitedHighWater="";this.imageUrls="";
          }
        }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: number;
      }
      }