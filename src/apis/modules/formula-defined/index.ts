import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetFindFormulaDefinedPageSpace, IgetListFormulaDefinedVOsSpace,IgetNewFormulaDefinedVOsSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class FormulaDefinedApi {
  data2Mock: boolean = false;

  // 计算公式列表(分页)|计算公式列表(分页)-FormulaDefinedController
  getFindFormulaDefinedPage (params: IgetFindFormulaDefinedPageSpace.RequestParams) {
    const { totalRow, totalPage, currentPage, pageSize, isFirstPage, isLastPage, hasPreviousPage, list, formulaCode, formulaName, orderColumnStr, orderStr, useForMultiple, useForPeriod, useForRealtime, useForSimple } = params;
    const url = `${API_DOMAIN}${API_PREFIX}/formulaDefined/findFormulaDefinedPage?totalRow=${totalRow}&totalPage=${totalPage}&currentPage=${currentPage}&pageSize=${pageSize}&isFirstPage=${isFirstPage}&isLastPage=${isLastPage}&hasPreviousPage=${hasPreviousPage}&list=${list}&formulaCode=${formulaCode}&formulaName=${formulaName}&orderStr=${orderStr}&orderColumnStr=${orderColumnStr}&useForMultiple=${useForMultiple}&useForPeriod=${useForPeriod}&useForRealtime=${useForRealtime}&useForSimple=${useForSimple}`;
    return requestHelper.getRequestData<IgetFindFormulaDefinedPageSpace.Model>(url, 'b1a27615-2bf7-401f-bcb9-fc9a12bf8235', this.data2Mock);
  }
  // 计算公式列表|计算公式列表-FormulaDefinedController
  getListFormulaDefinedVOs () {
    const url = `${API_DOMAIN}${API_PREFIX}/formulaDefined/listFormulaDefinedVOs`;
    return requestHelper.getRequestData<IgetListFormulaDefinedVOsSpace.Model>(url, '4f44d946-8775-41dd-9fe0-11639e845c07', this.data2Mock);
  }
  // 计算公式列表|计算公式列表-FormulaDefinedController
  getListNewFormulaDefinedVOs (params:IgetNewFormulaDefinedVOsSpace.RequestParams) {
    const {useForRealtime, useForPeriod,useForSimple, useForMultiple}=params
    const url = `${API_DOMAIN}${API_PREFIX}/formulaDefined/listFormulaDefinedVOs?useForRealtime=${useForRealtime}&useForPeriod=${useForPeriod}&useForSimple=${useForSimple}&useForMultiple=${useForMultiple}`;
    return requestHelper.getRequestData<IgetNewFormulaDefinedVOsSpace.Model>(url, '4f44d946-8775-41dd-9fe0-11639e845c07', this.data2Mock);
  }
}
export const apiFormulaDefinedObj = new FormulaDefinedApi();