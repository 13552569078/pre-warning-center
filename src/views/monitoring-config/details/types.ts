// 头部信息
interface IdetailsHead {
  eventTypeCodeName?: string
  strategyName?: string
  updatedAt?: string
  createdAt?: string
}

// 预警设置
interface IsilentCronExpressionItem {
  startDate?: string
  endDate?: string
  startTime?: string
  endTime?: string
}
interface IdetailsMode {
  isReuseData?: string
  strategyName?: string
  eventTypeCodeName?: string
  facilityTypeName?: string
  clearType?: number
  intervalTimeUnit?: string
  intervalTime?: number
  silentConfigVOS?: any[]
  updatedAt?: string
  createdAt?: string
  strategyDesc?: string
  // ruleValue?: any
  // silentCronExpression?: any
  // updatedAt?: string
  // templateDesc?: string
  // createdAt?: string
}

export { IdetailsHead, IdetailsMode };
