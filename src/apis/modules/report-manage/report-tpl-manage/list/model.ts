/* eslint-disable @typescript-eslint/no-namespace */
      
      /**
      * 查询模板详情-Model类库
      */
       export namespace IgetDetailSpace {

        export class RequestParams{
          templateId?:number;
          constructor(){
            this.templateId=0;
          }
        }
      
      export interface TemplateFileInfo {
        templateFileId: string;
        originalName: string;
        url: string;
        type: string;
      }
      
      export interface ParamList {
        paramId: number;
        paramName: string;
        templateId: number;
        templateName: string;
      }
      
      export interface AreaList {
        areaCode: string;
        areaName: string;
      }
      
      export interface EventTypeList {
        eventTypeSystemCode: string;
        eventTypeName: string;
      }
      
      export interface Data {
        templateId: number;
        templateName: string;
        templateTypeName: string;
        templateDesc: string;
        templateFileInfo: TemplateFileInfo;
        paramList: ParamList[];
        areaList: AreaList[];
        eventTypeList: EventTypeList[];
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
      }
      }
            /**
            * 新增模板-Model类库
            */
      export namespace IaddSpace {
      
        export class RequestParams{
          templateId?:string;templateName?:string;templateTypeCode?:string;templateFileId?:string;templateAreaCodes?:string;templateEventTypeCodes?:string;templateDesc?:string;paramIds?:any[];
          constructor(){
            this.templateId='';this.templateName="";this.templateTypeCode="";this.templateFileId="";this.templateAreaCodes="";this.templateEventTypeCodes="";this.templateDesc="";this.paramIds=[];
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
            * 分页查询模板列表-Model类库
            */
      export namespace IpostPageSpace {
      
        export class RequestParams{
          currentPage?:number;pageSize?:number;templateName?:string;templateTypeCode?:string;startTime?:string;endTime?:string;
          constructor(){
            this.currentPage=0;this.pageSize=0;this.templateName="";this.templateTypeCode="";this.startTime="";this.endTime="";
          }
        }
      
      export interface ParamList {
        paramId: number;
        paramName: string;
        templateId: string;
        templateName: string;
      }
      
      export interface AreaList {
        areaCode: string;
        areaName: string;
      }
      
      export interface EventTypeList {
        eventTypeSystemCode: string;
        eventTypeName: string;
      }
      
      export interface List {
        templateFileId: string;
        templateId: string;
        templateName: string;
        paramList: ParamList[];
        areaList: AreaList[];
        eventTypeList: EventTypeList[];
        updatedAt: string;
        isRefer: number;
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
            * 更新模板-Model类库
            */
      export namespace IpostUpdateSpace {
      
        export class RequestParams{
          templateId?:string;templateName?:string;templateTypeCode?:string;templateFileId?:string;templateAreaCodes?:string;templateEventTypeCodes?:string;templateDesc?:string;paramIds?:any[];
          constructor(){
            this.templateId='';this.templateName="";this.templateTypeCode="";this.templateFileId="";this.templateAreaCodes="";this.templateEventTypeCodes="";this.templateDesc="";this.paramIds=[];
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
            * 删除模板-Model类库
            */
      export namespace IdeleteTSpace {
      
        export class RequestParams{
          templateId?:number;
          constructor(){
            this.templateId=0;
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
 * 导出模板
 */
 export namespace IpostExportListSpace {
  export interface TimeList {}

  export interface TargetDataList {
    targetDataId: number;
    targetDataName: string;
    exceptionNum: number;
  }

  export interface DataList {
    time: string;
    exceptionNum: number;
    targetDataList: TargetDataList[];
  }

  export interface Data {
    timeList: TimeList[];
    dataList: DataList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}

      /**
      * 解析模板参数-Model类库
      */
       export namespace IgetGetParamsFromTemplateFileSpace {

        export class RequestParams{
          url?:string;
          constructor(){
            this.url="";
          }
        }
      
      export interface Data {
        paramId: number;
        paramName: string;
        isAvailable: number;
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }

      /**
      * 获取模板文件信息-Model类库
      */
export namespace IgetGetTemplateFileInfoSpace {

  export class RequestParams{
    templateFileId?:string;
    constructor(){
      this.templateFileId="";
    }
  }

export interface Data {
	templateFileId: string;
	originalName: string;
	url: string;
	type: string;
}

export interface Model {
	code: string;
	desc: string;
	tips: string;
	data: Data;
}
}