import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostModifyStrategyConfigSpace,IgetListHandleRuleConfigVOsSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class StrategyConfigApi {
  data2Mock: boolean = false;

  // 保存报警风险分类策略规则|保存报警风险分类策略规则-StrategyConfigController
  postModifyStrategyConfig(eventTypeCode:string,strategyConfigParams:any[]) {
      const url = `${API_DOMAIN}${API_PREFIX}/strategyConfig/modifyStrategyConfig`;
      return requestHelper.postRequestData<IpostModifyStrategyConfigSpace.Model>(url, 'dc0e68d7-8bac-4688-b3c0-215e6df495b4', this.data2Mock, {eventTypeCode,strategyConfigParams});
  }
  // 报警风险分类策略规则列表|报警风险分类策略规则列表-StrategyConfigController
  getListHandleRuleConfigVOs(param:any) {
      const url = `${API_DOMAIN}${API_PREFIX}/strategyConfig/listHandleRuleConfigVOs?${param}`;
      return requestHelper.getRequestData<IgetListHandleRuleConfigVOsSpace.Model>(url, '0e165286-956c-44f1-b5ae-063f8698a4cd', this.data2Mock);
  }

  Run(methodName: string, params: any) {
    let result:any = new Promise(() => ({ data: {} }));
    switch (methodName) {

    case "postModifyStrategyConfig":
      {
        const { eventTypeCode,strategyConfigParams } = params;
        result = this.postModifyStrategyConfig(eventTypeCode,strategyConfigParams);
      }
      break;

    case "getListHandleRuleConfigVOs":
      {
        const { param } = params;
        result = this.getListHandleRuleConfigVOs(param);
      }
      break;

      default:
        break;
    }
    return result;
  }
}
export const apiStrategyConfigObj = new StrategyConfigApi();
