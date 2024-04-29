import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import type { UserInfo } from '@/store/types';
import { GlobalAPI, UserAuth } from '@/common';
import { apiSwanObj } from '@/apis/modules/hongling';
import { IpostLoginSsoSpace } from '@/apis/modules/hongling/model';
import { requestHelper } from "@/apis/base/mapper-helper";

const userInfo = ref({} as UserInfo);

function useUserInfo() {
  const store = useStore();

  const userName = computed(() => store.state.currentUser.userInfo?.userName || store.state.currentUser.userInfo?.userId || '');
  const userId = computed(() => store.state.currentUser.userInfo?.userId || '');
  const orgName = computed(() => store.state.currentUser.userInfo?.orgName || '');

  const userInfoTranslator = (data: any) => {
    return {
      userId: data.userId,
      userName: data.userName,
      mobile: data.mobileNo,
      account: data.userName,
      tenantId: data.tenantId,
      orgName: data.orgname
    }
  }

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

  // const logout = async (token = '') => {
  //   const url = `${GlobalAPI.config.API_PREFIX_USER_CENTER}/permission/v1/oauth2/logout`;
  //   const data = {
  //     token
  //   }
  //   const res = await requestHelper.postRequestData(url, '9269ff9-15a9-47e1-8b6b-264e06258605', false, data )
  // }

  const logout = (token: string, redirectUrl?: string) => {
    if ((window as any).__POWERED_BY_WUJIE__) {
      (window as any)?.$wujie?.props?.method?.logout?.();
    } else {
      document.location.href = `${GlobalAPI.config.API_PREFIX_USER_CENTER}/permission/logout?token=${token}&post_logout_redirect_uri=${redirectUrl || ''}`;
    }
  }

  const setUserInfo = async () => {
    const token = UserAuth.getToken() as string;
    // const res = await getUserInfo(GlobalAPI.config.SWAN_SYSTEM_ID_MONITOR_WARNING_ONEPIC, token);
    const url = `${GlobalAPI.config.API_PREFIX_USER_CENTER}/permission/v1/user/getLoginUserInfo`;
    try {
      const res = await requestHelper.postRequestData(url, '9269ff9-15a9-47e1-8b6b-264e06258605', false)
      userInfo.value = userInfoTranslator(res.data) as unknown as UserInfo;
      store.commit('currentUser/setUserInfo', userInfo.value);
    } catch (err: any) {
      console.log(err, 111);
      // throw new Error(err.message);
    }
  };
  const getUserAreaCode = () => store.state.currentUser.userInfo?.orgList[0]?.areaCode || '';
  const getCurrentAreaCode = () => store.state.currentUser.userInfo?.orgList[0]?.areaCode || '';
  const userLogout = async () => {
    const token = UserAuth.getToken() as string;
    // await logout(token);
    const redirectUrl = `${document.location.origin}/pre-warning-center/homepage/index`;
    store.commit('currentUser/setUserInfo', {});
    UserAuth.logoff(true);
    logout(token, redirectUrl)
  };
  const userLogin = async(params:IpostLoginSsoSpace.RequestParams) => {
    const res = await apiSwanObj.postLoginSso(params);
    return res.data?.authorization
  };

  return {
    userName,
    userId,
    orgName,
    setUserInfo,
    getUserAreaCode,
    getCurrentAreaCode,
    userLogout,
    userLogin
  };
}

export { useUserInfo };
