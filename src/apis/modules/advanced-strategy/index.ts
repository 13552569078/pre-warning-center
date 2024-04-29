import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetFindMonitorStrategySpace, IgetFindMonitorStrategyVersionDetailSpace, IpostAddMonitorStrategySpace, IpostModifyMonitorStrategySpace, IgetCheckCornSpace, IgetFindNextExecTimeSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class AdvancedStrategyApi {
    data2Mock: boolean = false;

    // 策略详情|策略详情-高级预警策略API
    getFindMonitorStrategy(monitorStrategyId: number, userFor: number) {
        const url = `${API_DOMAIN}${API_PREFIX}/SeniorWarningMonitorStrategy/findMonitorStrategy?monitorStrategyId=${monitorStrategyId}&userFor=${userFor}`;
        return requestHelper.getRequestData<IgetFindMonitorStrategySpace.Model>(url, 'dc4b9bce-3247-4ca1-a36b-3b8b2e4db9f0', this.data2Mock);
    }
    // 查询策略版本详情|查询策略版本详情-高级预警策略API
    getFindMonitorStrategyVersionDetail(versionId: string, strategyId: string) {
        const url = `${API_DOMAIN}${API_PREFIX}/SeniorWarningMonitorStrategy/findMonitorStrategyVersionDetail?versionId=${versionId}&strategyId=${strategyId}`;
        return requestHelper.getRequestData<IgetFindMonitorStrategyVersionDetailSpace.Model>(url, 'fe424ce8-c0f0-49f2-95d7-6fe3107f99d1', this.data2Mock);
    }
    // 新增监测策略|新增监测策略-高级预警策略API
    postAddMonitorStrategy(params: IpostAddMonitorStrategySpace.RequestParams) {
        const url = `${API_DOMAIN}${API_PREFIX}/SeniorWarningMonitorStrategy/addMonitorStrategy`;
        return requestHelper.postRequestData<IpostAddMonitorStrategySpace.Model>(url, 'e315c74a-348c-4440-86e8-d2d07d1d5074', this.data2Mock, params);
    }
    // 修改监测策略|修改监测策略-高级预警策略API
    postModifyMonitorStrategy(params: IpostModifyMonitorStrategySpace.RequestParams) {
        const url = `${API_DOMAIN}${API_PREFIX}/SeniorWarningMonitorStrategy/modifyMonitorStrategy`;
        return requestHelper.postRequestData<IpostModifyMonitorStrategySpace.Model>(url, '62dc5ee5-2f5a-4e01-bfe7-e45822b0537e', this.data2Mock, params);
    }

    // 校验corn表达式|校验corn表达式-高级预警策略API
    getCheckCorn(cron: string) {
        const url = `${API_DOMAIN}${API_PREFIX}/SeniorWarningMonitorStrategy/checkCorn`;
        return requestHelper.postRequestData<IgetCheckCornSpace.Model>(url, 'a1ce87bb-af1a-48eb-b29c-660affcee68a', this.data2Mock, { cron });
    }

    // 获取cron表达式下次执行时间|获取cron表达式下次执行时间-高级预警策略API
    getFindNextExecTime(cron: string) {
        const url = `${API_DOMAIN}${API_PREFIX}/SeniorWarningMonitorStrategy/findNextExecTime`;
        return requestHelper.postRequestData<IgetFindNextExecTimeSpace.Model>(url, 'f671a59d-c380-45ec-badd-52bcb28eea8e', this.data2Mock, { cron });
    }
}
export const apiAdvancedStrategyObj = new AdvancedStrategyApi();