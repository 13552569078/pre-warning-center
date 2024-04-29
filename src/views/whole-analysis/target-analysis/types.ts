import { AnyFunction } from 'fx-front-utils';
import type { IlistSpace, IpostChartDataSpace } from '@/apis/modules/target-analysis/model';

export type TableParam = {
  startTime: string
  endTime: string
  targetDataIds: string[];
}

type BarItem = {
  value: string|number,
  targetDataName: string
}
export type EchartsItem = {
  xAxis: IpostChartDataSpace.TimeList,
  total: number[],
  highOneNum: BarItem[],
  highTwoNum: BarItem[],
  highThrNum: BarItem[],
}
