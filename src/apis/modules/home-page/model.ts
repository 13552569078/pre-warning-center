/* eslint-disable @typescript-eslint/no-namespace */

      /**
      * 按报警阶段统计报警-Model类库
      */
       export namespace IgetFindAlarmStageStatisticsSpace {

        export class RequestParams{

          constructor(){

          }
        }

      export interface Data {
        strategyProduceNumber: number;
        thirdProduceNumber: number;
        unJudgeNumber: number;
        judgedNumber: number;
        eventCenterDealNumber: number;
      }

      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
      }
      }
            /**
            * 按日期统计报警信息-Model类库
            */
      export namespace IgetFindRecentAlarmNumberStatisticsSpace {

        export class RequestParams{

          constructor(){

          }
        }

      export interface AlarmDateList {}

      export interface RecentAlarmNumberItemVOList {
        alarmDate: string;
        alarmNumber: number;
      }

      export interface Data {
        alarmDateList: AlarmDateList[];
        recentAlarmNumberItemVOList: RecentAlarmNumberItemVOList[];
      }

      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
      }
      }
            /**
            * 查询最近15天接入数据-Model类库
            */
      export namespace IgetFindRecentAccessDataNumberStatisticsSpace {

        export class RequestParams{

          constructor(){

          }
        }

      export interface AccessDateList {}

      export interface RecentAccessDataNumberItemVOList {
        accessDate: string;
        accessDateNumber: number;
      }

      export interface Data {
        accessDateList: AccessDateList[];
        recentAccessDataNumberItemVOList: RecentAccessDataNumberItemVOList[];
      }

      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
      }
      }
            /**
            * 监测布控统计-Model类库
            */
      export namespace IgetMonitorStatisticSpace {

        export class RequestParams{

          constructor(){

          }
        }

      export interface Data {
        monitorRegionNum: number;
        monitorRegionTypeNum: number;
        monitorUnitNum: number;
        monitorEquipNum: number;
        targetNum: number;
        monitorStrategyNum: number;
        eventTypeNum: number;
      }

      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
      }
      }
            /**
            * 预警数据统计-Model类库
            */
      export namespace IgetAlarmStatisticSpace {

        export class RequestParams{

          constructor(){

          }
        }

      export interface Data {
        totalAlarmNum: number;
        alarmingNum: number;
        todayAlarmNum: number;
        accessDataNum: number;
      }

      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
      }
      }
            /**
            * 首页基础数据统计-Model类库
            */
      export namespace IgetFindHomePageDataStatisticSpace {

        export class RequestParams{

          constructor(){

          }
        }

      export interface Data {
        todayAlarmNumberNumber: number;
        alarmNumber: number;
        unJudgeAlarmNumber: number;
        accessDataNumber: number;
        dataTargetDataNumber: number;
      }

      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data;
      }
      }
            /**
            * 按报警等级统计报警-Model类库
            */
      export namespace IgetFindAlarmLevelStatisticsSpace {

        export class RequestParams{

          constructor(){

          }
        }

      export interface Data {
        code: string;
        name: string;
        value: number;
      }

      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 查询最近5条报警-Model类库
            */
      export namespace IgetFindRecentAlarmListSpace {

        export class RequestParams{

          constructor(){

          }
        }

      export interface Data {
        alarmTitle: string;
        eventTypeCode: string;
        eventTypeName: string;
        alarmTime: string;
      }

      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }
            /**
            * 监测主体信息统计-Model类库
            */
      export namespace IgetFindMonitorRegionUnitStatisticSpace {

        export class RequestParams{

          constructor(){

          }
        }

      export interface Data {
        monitorRegionTypeCode: string;
        monitorRegionTypeName: string;
        monitorRegionNumber: number;
        monitorUnitNumber: number;
      }

      export interface Model {
        code: string;
        desc: string;
        tips: string;
        data: Data[];
      }
      }

            /* eslint-disable @typescript-eslint/no-namespace */

      /**
      * 获取接入数据的最后统计时间-Model类库
      */
export namespace IgetFindRecentCountTimeSpace {

  export class RequestParams{

    constructor(){

    }
  }

export interface Model {
	code: string;
	desc: string;
	tips: string;
	data: string;
}
}

 /**
      * 近15日指标数据统计-Model类库
      */
 export namespace IgetFindRecentDataTargetResultNumberStatisticsSpace {

  export class RequestParams{
    sceneCode?:string;
    constructor(){
      this.sceneCode="";
    }
  }

export interface DateList {}

export interface NumberItemVOList {
	targetDate: string;
	dateTargetNumber: number;
}

export interface Data {
	dateList: DateList[];
	numberItemVOList: NumberItemVOList[];
}

export interface Model {
	code: string;
	desc: string;
	tips: string;
	data: Data;
}
}
