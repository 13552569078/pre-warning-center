/* eslint-disable @typescript-eslint/no-namespace */
      
      /**
      * 分页查询燃气设施列表-Model类库
      */
       export namespace IpostPageListSpace {

        export class RequestParams{
          currentPage?:number;pageSize?:number;facilityName?:string;gasTypeCode?:string;areaCode?:string;directeUnitVal?:string;maintainUnitVal?:string;facilityStateCode?:string;orderColumnStr?:string;orderStr?:string;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.facilityName="";this.gasTypeCode="";this.areaCode="";this.directeUnitVal="";this.maintainUnitVal="";this.facilityStateCode="";this.orderColumnStr="";this.orderStr="";
          }
        }
      
      export interface List {
        id: number;
        facilityName: string;
        gasTypeCode: string;
        gasTypeName: string;
        areaCode: string;
        areaName: string;
        maintainUnitCode: string;
        maintainUnitVal: string;
        directeUnitCode: string;
        directeUnitVal: string;
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
            * 更新燃气设施-Model类库
            */
      export namespace IpostUpdateSpace {
      
        export class RequestParams{
          currentPage?:number;pageSize?:number;id?:number;facilityTypeCode?:string;facilityName?:string;gasTypeCode?:string;areaCode?:string;address?:string;latitude?:string;longitude?:string;maintainUnitCode?:string;maintainUnitVal?:string;directeUnitCode?:string;directeUnitVal?:string;maintainLevelCode?:string;maintainLevelName?:string;owerUnitCode?:string;owerUnitVal?:string;designUnitName?:string;buildUnitName?:string;superviseUnitName?:string;workUnitName?:string;completedTime?:string;totalCost?:string;facilityStateCode?:string;facilityStateVal?:string;gasDesc?:string;imageUrls?:string;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.id=0;this.facilityTypeCode="";this.facilityName="";this.gasTypeCode="";this.areaCode="";this.address="";this.latitude="";this.longitude="";this.maintainUnitCode="";this.maintainUnitVal="";this.directeUnitCode="";this.directeUnitVal="";this.maintainLevelCode="";this.maintainLevelName="";this.owerUnitCode="";this.owerUnitVal="";this.designUnitName="";this.buildUnitName="";this.superviseUnitName="";this.workUnitName="";this.completedTime="";this.totalCost="";this.facilityStateCode="";this.facilityStateVal="";this.gasDesc="";this.imageUrls="";
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
            * 删除燃气设施-Model类库
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
            * 燃气设施详情-Model类库
            */
      export namespace IgetFacilityGasSpace {
      
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
        gasTypeCode: string;
        gasTypeName: string;
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
        gasDesc: string;
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
            * 新增燃气设施-Model类库
            */
      export namespace IaddSpace {
      
        export class RequestParams{
          currentPage?:number;pageSize?:number;id?:number;facilityTypeCode?:string;facilityName?:string;gasTypeCode?:string;areaCode?:string;address?:string;latitude?:string;longitude?:string;maintainUnitCode?:string;maintainUnitVal?:string;directeUnitCode?:string;directeUnitVal?:string;maintainLevelCode?:string;maintainLevelName?:string;owerUnitCode?:string;owerUnitVal?:string;designUnitName?:string;buildUnitName?:string;superviseUnitName?:string;workUnitName?:string;completedTime?:string;totalCost?:string;facilityStateCode?:string;facilityStateVal?:string;gasDesc?:string;imageUrls?:string;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.id=0;this.facilityTypeCode="";this.facilityName="";this.gasTypeCode="";this.areaCode="";this.address="";this.latitude="";this.longitude="";this.maintainUnitCode="";this.maintainUnitVal="";this.directeUnitCode="";this.directeUnitVal="";this.maintainLevelCode="";this.maintainLevelName="";this.owerUnitCode="";this.owerUnitVal="";this.designUnitName="";this.buildUnitName="";this.superviseUnitName="";this.workUnitName="";this.completedTime="";this.totalCost="";this.facilityStateCode="";this.facilityStateVal="";this.gasDesc="";this.imageUrls="";
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
            * 批量删除燃气设施-Model类库
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