import { GlobalAPI } from '@/common';

/**
 * 已知系统
 * product 产品
 * ygf 运管服
 */
const PRODUCT = 'product';
const YGF = 'ygf';

export const systemShow = (systemList:string[] = []) => {
  return systemList.includes(GlobalAPI.config.DEPLOY_TYPE_CENTRE_CONFIG);
};
