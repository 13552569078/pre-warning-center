/* eslint-disable @typescript-eslint/no-namespace */
      
      /**
      * 新增隧道设施-Model类库
      */
       export namespace IaddSpace {

        export class RequestParams{
          id?:number;facilityName?:string;facilityTypeCode?:string;tunnelTypeCode?:string;address?:string;latitude?:string;longitude?:string;areaCode?:string;belongRoad?:string;belongRoadSection?:string;maintainLevelCode?:string;maintainLevelName?:string;maintainUnitCode?:string;maintainUnitVal?:string;directeUnitCode?:string;directeUnitVal?:string;owerUnitCode?:string;owerUnitVal?:string;designUnitName?:string;buildUnitName?:string;superviseUnitName?:string;workUnitName?:string;completedTime?:string;totalCost?:string;facilityStateCode?:string;facilityStateVal?:string;tunnelDesc?:string;tunnelLevelCode?:string;tunnelLevelVal?:string;tunnelHeight?:string;tunnelWidth?:string;acrossTypeCode?:string;acrossTypeVal?:string;entranceType?:string;exitType?:string;sectionType?:string;pavementType?:string;longitudeSlope?:string;crossSlope?:string;liningMaterial?:string;seismicIntensity?:string;designLoad?:string;drainageType?:string;lightInfo?:string;ventilateInfo?:string;decorateInfo?:string;fireControlInfo?:string;emergencyAccess?:number;validFlag?:number;gmtCreated?:string;gmtModified?:string;imageUrls?:string;
          constructor(){
            this.id=0;this.facilityName="";this.facilityTypeCode="";this.tunnelTypeCode="";this.address="";this.latitude="";this.longitude="";this.areaCode="";this.belongRoad="";this.belongRoadSection="";this.maintainLevelCode="";this.maintainLevelName="";this.maintainUnitCode="";this.maintainUnitVal="";this.directeUnitCode="";this.directeUnitVal="";this.owerUnitCode="";this.owerUnitVal="";this.designUnitName="";this.buildUnitName="";this.superviseUnitName="";this.workUnitName="";this.completedTime="";this.totalCost="";this.facilityStateCode="";this.facilityStateVal="";this.tunnelDesc="";this.tunnelLevelCode="";this.tunnelLevelVal="";this.tunnelHeight="";this.tunnelWidth="";this.acrossTypeCode="";this.acrossTypeVal="";this.entranceType="";this.exitType="";this.sectionType="";this.pavementType="";this.longitudeSlope="";this.crossSlope="";this.liningMaterial="";this.seismicIntensity="";this.designLoad="";this.drainageType="";this.lightInfo="";this.ventilateInfo="";this.decorateInfo="";this.fireControlInfo="";this.emergencyAccess=0;this.validFlag=0;this.gmtCreated="";this.gmtModified="";this.imageUrls="";
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
            * 更新隧道设施-Model类库
            */
      export namespace IpostUpdateSpace {
      
        export class RequestParams{
          id?:number;facilityName?:string;facilityTypeCode?:string;tunnelTypeCode?:string;address?:string;latitude?:string;longitude?:string;areaCode?:string;belongRoad?:string;belongRoadSection?:string;maintainLevelCode?:string;maintainLevelName?:string;maintainUnitCode?:string;maintainUnitVal?:string;directeUnitCode?:string;directeUnitVal?:string;owerUnitCode?:string;owerUnitVal?:string;designUnitName?:string;buildUnitName?:string;superviseUnitName?:string;workUnitName?:string;completedTime?:string;totalCost?:string;facilityStateCode?:string;facilityStateVal?:string;tunnelDesc?:string;tunnelLevelCode?:string;tunnelLevelVal?:string;tunnelHeight?:string;tunnelWidth?:string;acrossTypeCode?:string;acrossTypeVal?:string;entranceType?:string;exitType?:string;sectionType?:string;pavementType?:string;longitudeSlope?:string;crossSlope?:string;liningMaterial?:string;seismicIntensity?:string;designLoad?:string;drainageType?:string;lightInfo?:string;ventilateInfo?:string;decorateInfo?:string;fireControlInfo?:string;emergencyAccess?:number;validFlag?:number;gmtCreated?:string;gmtModified?:string;imageUrls?:string;
          constructor(){
            this.id=0;this.facilityName="";this.facilityTypeCode="";this.tunnelTypeCode="";this.address="";this.latitude="";this.longitude="";this.areaCode="";this.belongRoad="";this.belongRoadSection="";this.maintainLevelCode="";this.maintainLevelName="";this.maintainUnitCode="";this.maintainUnitVal="";this.directeUnitCode="";this.directeUnitVal="";this.owerUnitCode="";this.owerUnitVal="";this.designUnitName="";this.buildUnitName="";this.superviseUnitName="";this.workUnitName="";this.completedTime="";this.totalCost="";this.facilityStateCode="";this.facilityStateVal="";this.tunnelDesc="";this.tunnelLevelCode="";this.tunnelLevelVal="";this.tunnelHeight="";this.tunnelWidth="";this.acrossTypeCode="";this.acrossTypeVal="";this.entranceType="";this.exitType="";this.sectionType="";this.pavementType="";this.longitudeSlope="";this.crossSlope="";this.liningMaterial="";this.seismicIntensity="";this.designLoad="";this.drainageType="";this.lightInfo="";this.ventilateInfo="";this.decorateInfo="";this.fireControlInfo="";this.emergencyAccess=0;this.validFlag=0;this.gmtCreated="";this.gmtModified="";this.imageUrls="";
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
            * 批量删除隧道设施-Model类库
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
            * 隧道设施详情-Model类库
            */
      export namespace IgetFacilityTunnelSpace {
      
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
        tunnelTypeCode: string;
        tunnelTypeName: string;
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
        tunnelDesc: string;
        tunnelLevelCode: string;
        tunnelLevelVal: string;
        tunnelHeight: string;
        tunnelWidth: string;
        acrossTypeCode: string;
        acrossTypeVal: string;
        entranceType: string;
        exitType: string;
        sectionType: string;
        pavementType: string;
        longitudeSlope: string;
        crossSlope: string;
        liningMaterial: string;
        seismicIntensity: string;
        designLoad: string;
        drainageType: string;
        lightInfo: string;
        ventilateInfo: string;
        decorateInfo: string;
        fireControlInfo: string;
        emergencyAccess: number;
        validFlag: number;
        gmtCreated: string;
        gmtModified: string;
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
            * 分页查询隧道设施列表-Model类库
            */
      export namespace IpostPageListSpace {
      
        export class RequestParams{
          currentPage?:number;pageSize?:number;facilityName?:string;maintainUnitVal?:string;directeUnitVal?:string;maintainLevelCode?:string;areaCode?:string;facilityStateCode?:string;tunnelTypeCode?:string;orderColumnStr?:string;orderStr?:string;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.facilityName="";this.maintainUnitVal="";this.directeUnitVal="";this.maintainLevelCode="";this.areaCode="";this.facilityStateCode="";this.tunnelTypeCode="";this.orderColumnStr="";this.orderStr="";
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
        tunnelTypeCode: string;
        tunnelTypeName: string;
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
            * 删除隧道设施-Model类库
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