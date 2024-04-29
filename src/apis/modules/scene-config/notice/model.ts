/* eslint-disable @typescript-eslint/no-namespace */
      
      /**
      * 风险分类通知配置列表-Model类库
      */
      export namespace IgetEventTypeConfigListSpace {

        export class RequestParams{
          
          constructor(){
            
          }
        }
      
      export interface Data {
        eventTypeCode: string;
        eventTypeName: string;
        alarmUseState: any;
        eventUseState: any;
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 通知模板列表查询-Model类库
            */
      export namespace IgetTemplateListSpace {
      
        export class RequestParams{
          useFor?:number;
          constructor(){
            this.useFor=0;
          }
        }
      
      export interface TemplateContent {
        templateContent: string;
        templateId: string;
        useState: number;
      }
      
      export interface Data {
        useFor: number;
        sendFor: string;
        sendForName: string;
        alarmLevelCode: string;
        templateContents: TemplateContent[];
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 通知模板保存-Model类库
            */
      export namespace IpostTemplateUpdateSpace {
      
        export class RequestParams{
          useFor?:number;templateContents?:[];
          constructor(){
            this.useFor=0;this.templateContents=[];
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
            * 风险分类通知配置批量保存-Model类库
            */
      export namespace IpostEventTypeConfigUpateSpace {
      
        export class RequestParams{
          configParams?:[];
          constructor(){
            this.configParams=[];
          }
        }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: boolean;
      }
      }