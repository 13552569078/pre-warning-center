export const noLoadingUrls = [];

export const arrayBufferUrls = [
  '/gateway/etcc-api/fileServer/file',
  '/monitorEquip/getImportTemplate',
  '/monitorEquip/exportEquipList',
  '/thirdAlarm/getImportTemplate', // 三方预警模板下载
  '/targetDataAnalysis/exportList', // 指标综合分析导出列表
  '/templateInfo/getDefaultTemplate', // 报告管理 模板下载
  '/alarm/exportList',
  '/alarmMultipleAnalysis/exportList', // 预警综合分析导出
  '/realTimeMonitor/exportList',
  '/ygf/eventInfo/exportList',
  '/ygf/eventInfo/eventNotifyExportList',
  '/YgfAlarmMultipleAnalysis/exportLis', // 报警综合分析导出
  '/alarm/notify/alarmNotifyExportList',
  '/monitorRegion/getImportTemplate', // 监测主体导出模板
  '/monitorUnit/getImportTemplate', // 监测点模板导出
  '/monitorEquip/getVideoEquipImportTemplate', // 视频设备导入模板,
  '/accessItem/getImportTemplate' // 接入数据导入模板
];

export const formDataUrls = [];

/** 接口提示msg，一般为新增/保存 */
export const showMsgUrls = [];

// 列表接口 不需要转为'--'
export const notTranslateEmpty = [];
