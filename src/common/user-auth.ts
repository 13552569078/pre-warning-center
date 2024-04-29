// 用户授权验证
import { AUTH_TOKEN } from './constant';
import { defaultCacheObj } from './cache';
import { GlobalAPI } from '@/common';

const cacheTools = {
  save: (info: string) => {
    defaultCacheObj.set(AUTH_TOKEN, info);
  },
  get: () => AUTH_TOKEN || sessionStorage.getItem('TOKEN')
};

type getUserCenterUrlParams = {
  baseURL: string,
  clientId: string,
  callbackUrl: string,
  redirectUrl?: string,
  api?: string,
}

const getUserCenterUrl = ({
  baseURL,
  clientId,
  callbackUrl,
  redirectUrl = '',
  api = '/permission/oauth2/authorize',
}: getUserCenterUrlParams) => {
  return `${baseURL}${api}?response_type=code&client_id=${clientId}&redirect_uri=${callbackUrl}&scope=openid&state=${redirectUrl}`;
};

// 增加城市生命线入口权限
const isCityLifeLine = () => {
  return !!(localStorage.getItem('sceneCode') && localStorage.getItem('sceneCode') !== 'ALL');
};

/**
 * 用户授权操作
 */
export default {
  // 验证登录状态
  checkLogin: () => !!cacheTools.get(),
  // 退出登录，清除token
  logoff: (isOnlyRemoveToken?: boolean) => {
    try {
      defaultCacheObj.remove('TOKEN');
      sessionStorage.removeItem('TOKEN');
    } catch (err) {
      console.log(err);
    }
    if ((window as any).__POWERED_BY_WUJIE__) {
      (window as any)?.$wujie?.props?.method?.logout?.();
    } else {
      const currentUrl = encodeURIComponent(window.location.href);
      if (!isOnlyRemoveToken) {
        setTimeout(() => {
          window.location.href = getUserCenterUrl({
            baseURL: GlobalAPI.config.API_PREFIX_USER_CENTER,
            clientId: GlobalAPI.config.CLIENT_ID_CENTRE_CONFIG,
            callbackUrl: GlobalAPI.config.CALLBACK_URL_CENTRE_CONFIG,
            redirectUrl: currentUrl,
          });
        }, 100);
      }
    }
  },
  saveToken: cacheTools.save,
  getToken: cacheTools.get,
  cityLifeLine: isCityLifeLine
};
