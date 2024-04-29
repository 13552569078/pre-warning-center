// 头部信息
interface IdetailsHead {
    eventTypeCodeName?: string
    strategyName?: string
    updatedAt?: string
    createdAt?: string
}

// 报警设置
interface IsilentCronExpressionItem {
    startDate?:string
    endDate?:string
    startTime?:string
    endTime?:string
}
interface IdetailsMode {
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
    targetName?: string
}

export { IdetailsHead, IdetailsMode };
