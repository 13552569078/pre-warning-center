import { apiWarningWholeAnalysisObj } from '@/apis/modules/whole-analysis/warning-whole-analysis';

export type Icols = {
  columnName: string;
  columnLabel: string;
  displayFlag: boolean;
};

export const PAGE_CODE = 'YGF_ALARM_MULTIPLE_STATISTICS_ALARM_PAGE';

export const PAGE_COLS = [
  {
    columnName: 'alarmTitle',
    columnLabel: '报警标题',
    displayFlag: true
  },
  {
    columnName: 'alarmLevelName',
    columnLabel: '报警等级',
    displayFlag: true
  },
  {
    columnName: 'eventTypeName',
    columnLabel: '风险分类',
    displayFlag: true
  },
  {
    columnName: 'startTime',
    columnLabel: '报警开始时间',
    displayFlag: true
  },
  // {
  //   columnName: 'alarmState',
  //   columnLabel: '报警状态',
  //   displayFlag: true
  // },
  // {
  //   columnName: 'judgeStatusName',
  //   columnLabel: '研判状态',
  //   displayFlag: true
  // },
  // {
  //   columnName: 'alarmOriginName',
  //   columnLabel: '报警来源',
  //   displayFlag: true
  // },
  {
    columnName: 'regionName',
    columnLabel: '监测主体',
    displayFlag: true
  },
  {
    columnName: 'monitorUnitName',
    columnLabel: '监测点',
    displayFlag: true
  },
  {
    columnName: 'endTime',
    columnLabel: '消警时间',
    displayFlag: true
  }
];

export const TABLE_COLS = [
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    prop: 'tableIndex',
    slotName: 'tableIndex',
    fixed: 'left'
  },
  { title: '报警标题', prop: 'alarmTitle', slotName: 'alarmTitle', minWidth: '16em', showTooltip: true, tooltipProps: { minWidth: '240px' }, fixed: { position: 'left', } },
  { title: '报警等级', prop: 'alarmLevelName', minWidth: '8em' },
  { title: '风险分类', prop: 'eventTypeName', minWidth: '12em', showTooltip: true, tooltipProps: { minWidth: '240px' } },
  { title: '报警开始时间', prop: 'startTime', minWidth: '14em' },
  // { title: '报警状态', prop: 'alarmState', slotName: 'alarmState', minWidth: '8em' },
  // { title: '研判状态', prop: 'judgeStatusName' },
  // { title: '报警来源', prop: 'alarmOriginName' },
  { title: '监测主体', prop: 'regionName', minWidth: '16em', showTooltip: true, tooltipProps: { minWidth: '240px' } },
  { title: '监测点', prop: 'monitorUnitName', minWidth: '16em', showTooltip: true, tooltipProps: { minWidth: '240px' } },
  { title: '消警时间', prop: 'endTime', minWidth: '12em' }
];

export const getColsList = async(code = PAGE_CODE) => {
  const { data } = await apiWarningWholeAnalysisObj.getFindFunctionUserColumnVO(code);
  return data.columnText ? JSON.parse(data.columnText) : PAGE_COLS;
};

export const getColsKeys = (list: Icols[]) => {
  return list
    .filter(item => {
      return item.displayFlag;
    })
    .map(item1 => {
      return item1.columnName;
    });
};
