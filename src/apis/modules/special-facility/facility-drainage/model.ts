/* eslint-disable @typescript-eslint/no-namespace */
      
      /**
      * 排水设施设施详情-Model类库
      */
       export namespace IgetFacilityDrainageSpace {

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
        facilityTypeCode: string;
        facilityTypeName: string;
        facilityName: string;
        areaCode: string;
        areaName: string;
        drainageTypeCode: string;
        drainageTypeName: string;
        address: string;
        latitude: string;
        longitude: string;
        maintainUnitCode: string;
        maintainUnitVal: string;
        directeUnitCode: string;
        directeUnitVal: string;
        maintainLevelCode: string;
        maintainLevelName: string;
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
        drainageDesc: string;
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
            * 批量删除排水设施设施-Model类库
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
            * 删除排水设施设施-Model类库
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
            * 分页查询排水设施设施列表-Model类库
            */
      export namespace IpostPageListSpace {
      
        export class RequestParams{
          currentPage?:number;pageSize?:number;facilityName?:string;drainageTypeCode?:string;areaCode?:string;directeUnitVal?:string;maintainUnitVal?:string;facilityStateCode?:string;orderColumnStr?:string;orderStr?:string;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.facilityName="";this.drainageTypeCode="";this.areaCode="";this.directeUnitVal="";this.maintainUnitVal="";this.facilityStateCode="";this.orderColumnStr="";this.orderStr="";
          }
        }
      
      export interface List {
        id: number;
        facilityName: string;
        drainageTypeCode: string;
        drainageTypeName: string;
        areaCode: string;
        areaName: string;
        directeUnitCode: string;
        directeUnitVal: string;
        maintainUnitCode: string;
        maintainUnitVal: string;
        maintainLevelCode: string;
        maintainLevelName: string;
        facilityStateCode: string;
        facilityStateVal: string;
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
            * 更新排水设施设施-Model类库
            */
      export namespace IpostUpdateSpace {
      
        export class RequestParams{
          currentPage?:number;pageSize?:number;id?:number;facilityTypeCode?:string;facilityName?:string;drainageTypeCode?:string;areaCode?:string;address?:string;latitude?:string;longitude?:string;maintainUnitCode?:string;maintainUnitVal?:string;directeUnitCode?:string;directeUnitVal?:string;maintainLevelCode?:string;maintainLevelName?:string;owerUnitCode?:string;owerUnitVal?:string;designUnitName?:string;buildUnitName?:string;superviseUnitName?:string;workUnitName?:string;completedTime?:string;totalCost?:string;facilityStateCode?:string;facilityStateVal?:string;drainageDesc?:string;imageUrls?:string;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.id=0;this.facilityTypeCode="";this.facilityName="";this.drainageTypeCode="";this.areaCode="";this.address="";this.latitude="";this.longitude="";this.maintainUnitCode="";this.maintainUnitVal="";this.directeUnitCode="";this.directeUnitVal="";this.maintainLevelCode="";this.maintainLevelName="";this.owerUnitCode="";this.owerUnitVal="";this.designUnitName="";this.buildUnitName="";this.superviseUnitName="";this.workUnitName="";this.completedTime="";this.totalCost="";this.facilityStateCode="";this.facilityStateVal="";this.drainageDesc="";this.imageUrls="";
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
            * 新增排水设施设施-Model类库
            */
      export namespace IaddSpace {
      
        export class RequestParams{
          currentPage?:number;pageSize?:number;id?:number;facilityTypeCode?:string;facilityName?:string;drainageTypeCode?:string;areaCode?:string;address?:string;latitude?:string;longitude?:string;maintainUnitCode?:string;maintainUnitVal?:string;directeUnitCode?:string;directeUnitVal?:string;maintainLevelCode?:string;maintainLevelName?:string;owerUnitCode?:string;owerUnitVal?:string;designUnitName?:string;buildUnitName?:string;superviseUnitName?:string;workUnitName?:string;completedTime?:string;totalCost?:string;facilityStateCode?:string;facilityStateVal?:string;drainageDesc?:string;imageUrls?:string;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.id=0;this.facilityTypeCode="";this.facilityName="";this.drainageTypeCode="";this.areaCode="";this.address="";this.latitude="";this.longitude="";this.maintainUnitCode="";this.maintainUnitVal="";this.directeUnitCode="";this.directeUnitVal="";this.maintainLevelCode="";this.maintainLevelName="";this.owerUnitCode="";this.owerUnitVal="";this.designUnitName="";this.buildUnitName="";this.superviseUnitName="";this.workUnitName="";this.completedTime="";this.totalCost="";this.facilityStateCode="";this.facilityStateVal="";this.drainageDesc="";this.imageUrls="";
          }
        }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: number;
      }
      }