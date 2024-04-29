/* eslint-disable @typescript-eslint/no-namespace */
      
      /**
      * 删除人员密集场所-Model类库
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
            * 批量删除人员密集场所-Model类库
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
            * 桥梁人员密集场所详情-Model类库
            */
      export namespace IgetFacilityCrowdedSpace {
      
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
        crowdedTypeCode: string;
        crowdedTypeName: string;
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
        crowdedDesc: string;
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
            * 更新人员密集场所-Model类库
            */
      export namespace IpostUpdateSpace {
      
        export class RequestParams{
          id?:number;facilityName?:string;facilityTypeCode?:string;crowdedTypeCode?:string;address?:string;latitude?:string;longitude?:string;areaCode?:string;maintainLevelCode?:string;maintainLevelName?:string;maintainUnitCode?:string;maintainUnitVal?:string;directeUnitCode?:string;directeUnitVal?:string;owerUnitCode?:string;owerUnitVal?:string;designUnitName?:string;buildUnitName?:string;superviseUnitName?:string;workUnitName?:string;completedTime?:string;totalCost?:string;facilityStateCode?:string;facilityStateVal?:string;crowdedDesc?:string;imageUrls?:string;
          constructor(){
            this.id=0;this.facilityName="";this.facilityTypeCode="";this.crowdedTypeCode="";this.address="";this.latitude="";this.longitude="";this.areaCode="";this.maintainLevelCode="";this.maintainLevelName="";this.maintainUnitCode="";this.maintainUnitVal="";this.directeUnitCode="";this.directeUnitVal="";this.owerUnitCode="";this.owerUnitVal="";this.designUnitName="";this.buildUnitName="";this.superviseUnitName="";this.workUnitName="";this.completedTime="";this.totalCost="";this.facilityStateCode="";this.facilityStateVal="";this.crowdedDesc="";this.imageUrls="";
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
            * 新增人员密集场所-Model类库
            */
      export namespace IaddSpace {
      
        export class RequestParams{
          id?:number;facilityName?:string;facilityTypeCode?:string;crowdedTypeCode?:string;address?:string;latitude?:string;longitude?:string;areaCode?:string;maintainLevelCode?:string;maintainLevelName?:string;maintainUnitCode?:string;maintainUnitVal?:string;directeUnitCode?:string;directeUnitVal?:string;owerUnitCode?:string;owerUnitVal?:string;designUnitName?:string;buildUnitName?:string;superviseUnitName?:string;workUnitName?:string;completedTime?:string;totalCost?:string;facilityStateCode?:string;facilityStateVal?:string;crowdedDesc?:string;imageUrls?:string;
          constructor(){
            this.id=0;this.facilityName="";this.facilityTypeCode="";this.crowdedTypeCode="";this.address="";this.latitude="";this.longitude="";this.areaCode="";this.maintainLevelCode="";this.maintainLevelName="";this.maintainUnitCode="";this.maintainUnitVal="";this.directeUnitCode="";this.directeUnitVal="";this.owerUnitCode="";this.owerUnitVal="";this.designUnitName="";this.buildUnitName="";this.superviseUnitName="";this.workUnitName="";this.completedTime="";this.totalCost="";this.facilityStateCode="";this.facilityStateVal="";this.crowdedDesc="";this.imageUrls="";
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
            * 分页查询人员密集场所列表-Model类库
            */
      export namespace IpostPageListSpace {
      
        export class RequestParams{
          currentPage?:number;pageSize?:number;facilityName?:string;maintainUnitVal?:string;directeUnitVal?:string;maintainLevelCode?:string;areaCode?:string;facilityStateCode?:string;crowdedTypeCode?:string;orderColumnStr?:string;orderStr?:string;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.facilityName="";this.maintainUnitVal="";this.directeUnitVal="";this.maintainLevelCode="";this.areaCode="";this.facilityStateCode="";this.crowdedTypeCode="";this.orderColumnStr="";this.orderStr="";
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
        crowdedTypeCode: string;
        crowdedTypeName: string;
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