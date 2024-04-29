/* eslint-disable @typescript-eslint/no-namespace */
      
      /**
      * 新增照明设施-Model类库
      */
       export namespace IaddSpace {

        export class RequestParams{
          id?:number;facilityName?:string;facilityTypeCode?:string;lightTypeCode?:string;address?:string;latitude?:string;longitude?:string;areaCode?:string;belongRoad?:string;belongRoadSection?:string;maintainLevelCode?:string;maintainLevelName?:string;maintainUnitCode?:string;maintainUnitVal?:string;directeUnitCode?:string;directeUnitVal?:string;owerUnitCode?:string;owerUnitVal?:string;designUnitName?:string;buildUnitName?:string;superviseUnitName?:string;workUnitName?:string;completedTime?:string;totalCost?:string;facilityStateCode?:string;facilityStateVal?:string;lightDesc?:string;lightModel?:string;purchaseTime?:string;purchaseManufacturer?:string;warrantyLimit?:string;lamppostTypeCode?:string;lamppostTypeVal?:string;lamppostNo?:string;lanternTypeCode?:string;lanternTypeVal?:string;lanternName?:string;imageUrls?:string;
          constructor(){
            this.id=0;this.facilityName="";this.facilityTypeCode="";this.lightTypeCode="";this.address="";this.latitude="";this.longitude="";this.areaCode="";this.belongRoad="";this.belongRoadSection="";this.maintainLevelCode="";this.maintainLevelName="";this.maintainUnitCode="";this.maintainUnitVal="";this.directeUnitCode="";this.directeUnitVal="";this.owerUnitCode="";this.owerUnitVal="";this.designUnitName="";this.buildUnitName="";this.superviseUnitName="";this.workUnitName="";this.completedTime="";this.totalCost="";this.facilityStateCode="";this.facilityStateVal="";this.lightDesc="";this.lightModel="";this.purchaseTime="";this.purchaseManufacturer="";this.warrantyLimit="";this.lamppostTypeCode="";this.lamppostTypeVal="";this.lamppostNo="";this.lanternTypeCode="";this.lanternTypeVal="";this.lanternName="";this.imageUrls="";
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
            * 更新照明设施-Model类库
            */
      export namespace IpostUpdateSpace {
      
        export class RequestParams{
          id?:number;facilityName?:string;facilityTypeCode?:string;lightTypeCode?:string;address?:string;latitude?:string;longitude?:string;areaCode?:string;belongRoad?:string;belongRoadSection?:string;maintainLevelCode?:string;maintainLevelName?:string;maintainUnitCode?:string;maintainUnitVal?:string;directeUnitCode?:string;directeUnitVal?:string;owerUnitCode?:string;owerUnitVal?:string;designUnitName?:string;buildUnitName?:string;superviseUnitName?:string;workUnitName?:string;completedTime?:string;totalCost?:string;facilityStateCode?:string;facilityStateVal?:string;lightDesc?:string;lightModel?:string;purchaseTime?:string;purchaseManufacturer?:string;warrantyLimit?:string;lamppostTypeCode?:string;lamppostTypeVal?:string;lamppostNo?:string;lanternTypeCode?:string;lanternTypeVal?:string;lanternName?:string;imageUrls?:string;
          constructor(){
            this.id=0;this.facilityName="";this.facilityTypeCode="";this.lightTypeCode="";this.address="";this.latitude="";this.longitude="";this.areaCode="";this.belongRoad="";this.belongRoadSection="";this.maintainLevelCode="";this.maintainLevelName="";this.maintainUnitCode="";this.maintainUnitVal="";this.directeUnitCode="";this.directeUnitVal="";this.owerUnitCode="";this.owerUnitVal="";this.designUnitName="";this.buildUnitName="";this.superviseUnitName="";this.workUnitName="";this.completedTime="";this.totalCost="";this.facilityStateCode="";this.facilityStateVal="";this.lightDesc="";this.lightModel="";this.purchaseTime="";this.purchaseManufacturer="";this.warrantyLimit="";this.lamppostTypeCode="";this.lamppostTypeVal="";this.lamppostNo="";this.lanternTypeCode="";this.lanternTypeVal="";this.lanternName="";this.imageUrls="";
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
            * 批量删除照明设施-Model类库
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
            * 分页查询照明设施列表-Model类库
            */
      export namespace IpostPageListSpace {
      
        export class RequestParams{
          currentPage?:number;pageSize?:number;facilityName?:string;maintainUnitVal?:string;directeUnitVal?:string;maintainLevelCode?:string;areaCode?:string;facilityStateCode?:string;lightTypeCode?:string;orderColumnStr?:string;orderStr?:string;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.facilityName="";this.maintainUnitVal="";this.directeUnitVal="";this.maintainLevelCode="";this.areaCode="";this.facilityStateCode="";this.lightTypeCode="";this.orderColumnStr="";this.orderStr="";
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
        lightTypeCode: string;
        lightTypeName: string;
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
            * 照明设施详情-Model类库
            */
      export namespace IgetFacilityLightSpace {
      
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
        facilityName: string;
        facilityTypeCode: string;
        facilityTypeName: string;
        lightTypeCode: string;
        lightTypeName: string;
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
        lightDesc: string;
        lightModel: string;
        purchaseTime: string;
        purchaseManufacturer: string;
        warrantyLimit: string;
        lamppostTypeCode: string;
        lamppostTypeVal: string;
        lamppostNo: string;
        lanternTypeCode: string;
        lanternTypeVal: string;
        lanternName: string;
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
            * 删除照明设施-Model类库
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