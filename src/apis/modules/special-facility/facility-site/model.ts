/* eslint-disable @typescript-eslint/no-namespace */
      
      /**
      * 建筑工地类型下拉列表-Model类库
      */
       export namespace IgetTypeListSpace {

        export class RequestParams{
          
          constructor(){
            
          }
        }
      
      export interface Data {
        name: string;
        value: string;
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 建筑工地详情-Model类库
            */
      export namespace IgetFacilitySiteSpace {
      
        export class RequestParams{
          id?:number;
          constructor(){
            this.id=0;
          }
        }
      
      export interface Data {
        id: number;
        facilityTypeCode: string;
        facilityTypeName: string;
        facilityName: string;
        areaCode: string;
        areaName: string;
        streetAreaCode: string;
        siteTypeCode: string;
        siteTypeName: string;
        address: string;
        latitude: string;
        longitude: string;
        projectStartTime: string;
        projectEndTime: string;
        constructionUnit: string;
        constructionPerson: string;
        constructionTel: string;
        architectureArea: number;
        foundationDig: number;
        trenchSoil: number;
        constructionWaste: number;
        constructionRecyclableWaste: number;
        dismantleArea: number;
        dismantleWaste: number;
        renovationWaste: number;
        dismantleRecyclableWaste: number;
        totalCoverArea: number;
        totalExcavateVolume: number;
        remainVolume: number;
        transportPermitNo: string;
        standardValidityStartTime: string;
        standardValidityEndTime: string;
        weighDeviceCode: string;
        siteDesc: string;
        imageUrls: string;
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
      }
      }
            /**
            * 更新建筑工地-Model类库
            */
      export namespace IpostUpdateSpace {
      
        export class RequestParams{
          currentPage?:number;pageSize?:number;id?:number;facilityTypeCode?:string;facilityName?:string;areaCode?:string;streetAreaCode?:string;siteTypeCode?:string;address?:string;latitude?:string;longitude?:string;projectStartTime?:string;projectEndTime?:string;constructionUnit?:string;constructionPerson?:string;constructionTel?:string;architectureArea?:number;foundationDig?:number;trenchSoil?:number;constructionWaste?:number;constructionRecyclableWaste?:number;dismantleArea?:number;dismantleWaste?:number;renovationWaste?:number;dismantleRecyclableWaste?:number;totalCoverArea?:number;totalExcavateVolume?:number;remainVolume?:number;transportPermitNo?:string;standardValidityStartTime?:string;standardValidityEndTime?:string;weighDeviceCode?:string;siteDesc?:string;imageUrls?:string;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.id=0;this.facilityTypeCode="";this.facilityName="";this.areaCode="";this.streetAreaCode="";this.siteTypeCode="";this.address="";this.latitude="";this.longitude="";this.projectStartTime="";this.projectEndTime="";this.constructionUnit="";this.constructionPerson="";this.constructionTel="";this.architectureArea=0;this.foundationDig=0;this.trenchSoil=0;this.constructionWaste=0;this.constructionRecyclableWaste=0;this.dismantleArea=0;this.dismantleWaste=0;this.renovationWaste=0;this.dismantleRecyclableWaste=0;this.totalCoverArea=0;this.totalExcavateVolume=0;this.remainVolume=0;this.transportPermitNo="";this.standardValidityStartTime="";this.standardValidityEndTime="";this.weighDeviceCode="";this.siteDesc="";this.imageUrls="";
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
            * 分页查询建筑工地列表-Model类库
            */
      export namespace IpostPageListSpace {
      
        export class RequestParams{
          currentPage?:number;pageSize?:number;facilityName?:string;siteTypeCode?:string;areaCode?:string;constructionUnit?:string;orderColumnStr?:string;orderStr?:string;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.facilityName="";this.siteTypeCode="";this.areaCode="";this.constructionUnit="";this.orderColumnStr="";this.orderStr="";
          }
        }
      
      export interface List {
        id: number;
        facilityName: string;
        siteTypeCode: string;
        siteTypeName: string;
        areaCode: string;
        areaName: string;
        constructionUnit: string;
        constructionPerson: string;
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
            * 新增建筑工地-Model类库
            */
      export namespace IaddSpace {
      
        export class RequestParams{
          currentPage?:number;pageSize?:number;id?:number;facilityTypeCode?:string;facilityName?:string;areaCode?:string;streetAreaCode?:string;siteTypeCode?:string;address?:string;latitude?:string;longitude?:string;projectStartTime?:string;projectEndTime?:string;constructionUnit?:string;constructionPerson?:string;constructionTel?:string;architectureArea?:number;foundationDig?:number;trenchSoil?:number;constructionWaste?:number;constructionRecyclableWaste?:number;dismantleArea?:number;dismantleWaste?:number;renovationWaste?:number;dismantleRecyclableWaste?:number;totalCoverArea?:number;totalExcavateVolume?:number;remainVolume?:number;transportPermitNo?:string;standardValidityStartTime?:string;standardValidityEndTime?:string;weighDeviceCode?:string;siteDesc?:string;imageUrls?:string;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.id=0;this.facilityTypeCode="";this.facilityName="";this.areaCode="";this.streetAreaCode="";this.siteTypeCode="";this.address="";this.latitude="";this.longitude="";this.projectStartTime="";this.projectEndTime="";this.constructionUnit="";this.constructionPerson="";this.constructionTel="";this.architectureArea=0;this.foundationDig=0;this.trenchSoil=0;this.constructionWaste=0;this.constructionRecyclableWaste=0;this.dismantleArea=0;this.dismantleWaste=0;this.renovationWaste=0;this.dismantleRecyclableWaste=0;this.totalCoverArea=0;this.totalExcavateVolume=0;this.remainVolume=0;this.transportPermitNo="";this.standardValidityStartTime="";this.standardValidityEndTime="";this.weighDeviceCode="";this.siteDesc="";this.imageUrls="";
          }
        }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: number;
      }
      }