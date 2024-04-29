/* eslint-disable @typescript-eslint/no-namespace */
      
      /**
      * 删除模板分组-Model类库
      */
       export namespace IdeleteTSpace {

        export class RequestParams{
          templateTypeId?:number;
          constructor(){
            this.templateTypeId=0;
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
            * 更新模板分组-Model类库
            */
      export namespace IpostUpdateSpace {
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: boolean;
      }
      }
            /**
            * 新增模板分组-Model类库
            */
      export namespace IaddSpace {
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: boolean;
      }
      }
            /**
            * 查询模板分组-模板树-Model类库
            */
      export namespace IgetTypeTemplateTreeSpace {
      
        export class RequestParams{
          
          constructor(){
            
          }
        }
      
      export interface Children {}
      
      export interface Children {
        parentCode: string;
        name: string;
        templateTypeCode: string;
        type: number;
        children: Children[];
        id: number;
      }
      
      export interface Data {
        parentCode: string;
        name: string;
        templateTypeCode: string;
        type: number;
        children: Children[];
        id: number;
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 查询模板分组树-Model类库
            */
      export namespace IgetTypeTreeSpace {
      
        export class RequestParams{
          
          constructor(){
            
          }
        }
      
      export interface Children {}
      
      export interface Children {
        templateTypeId: string;
        templateTypeCode: string;
        templateTypeName: string;
        parentCode: string;
        parentName: string;
        children: Children[];
      }
      
      export interface Data {
        templateTypeId: string;
        templateTypeCode: string;
        templateTypeName: string;
        parentCode: string;
        parentName: string;
        children: Children[];
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 查询模板分组详情-Model类库
            */
      export namespace IgetDetailSpace {
      
        export class RequestParams{
          templateTypeId?:number;
          constructor(){
            this.templateTypeId=0;
          }
        }
      
      export interface Data {
        templateTypeId: string;
        templateTypeName: string;
        templateTypeCode: string;
        parentCode: string;
      }
      
      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
      }
      }