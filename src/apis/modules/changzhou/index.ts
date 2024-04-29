import { requestHelper } from "@/apis/base/mapper-helper";
import { GlobalAPI } from "@/common";

const API_PREFIX = GlobalAPI.config.CHANGZHOU_API_PREFIX;
const APP_ID = GlobalAPI.config.CHANGZHOU_APP_ID;
const APP_SECRET = GlobalAPI.config.CHANGZHOU_APP_SECRET;

class ChangZhouMapApi {
  data2Mock: boolean = false;

  // 获取token
  getToken(appId = APP_ID, appSecret = APP_SECRET) {
    const url = `${API_PREFIX}/auth/accesstoken/create?appId=${appId}&appSecret=${appSecret}`;
    return requestHelper.getRequestData<{ access_token: string }>(
      url,
      "0b8086f6-7b5a-4392-9883-188147227e33",
      this.data2Mock
    );
  }

  queryKeyword(token: string, query: Record<'query' | 'page_size' | 'page_num', any>) {
    const params = {
      ack: '691b3290d48943ba888f3915bf7bdeba',
      infos: '0',
      region: '320400',
      ...query,
    }
    const qStr = Object.entries(params).reduce((prev, current) => prev + `${current[0]}=${current[1]}&`, '')
    const url = `${API_PREFIX}/CityMap/addrdata/open/api/search?${qStr}`;
    return requestHelper.getRequestData<{ message: string; status: number; result: any[]; }>(
      url,
      "0b8086f6-7b5a-4392-9883-188147227e33",
      this.data2Mock,
      {
        authoritytype: '2',
        access_token: token,
        testmarker: '0',
        heartbeat: '1',
        elementsVersion: '1.00'
      }
    );
  }

  queryTips(token: string, query: string) {
    const params = {
      ack: '691b3290d48943ba888f3915bf7bdeba',
      region: '320400',
      query,
    }
    const qStr = Object.entries(params).reduce((prev, current) => prev + `${current[0]}=${current[1]}&`, '')
    const url = `${API_PREFIX}/CityMap/addrdata/open/api/tips?${qStr}`;
    return requestHelper.getRequestData<{ message: string; status: number; result: any[]; }>(
      url,
      "0b8086f6-7b5a-4392-9883-188147227e33",
      this.data2Mock,
      {
        authoritytype: '2',
        access_token: token,
        testmarker: '0',
        heartbeat: '0',
        elementsVersion: '1.00'
      }
    );
  }

  rgeo(token: string, lnglat: string) {
    const params = {
      ack: '691b3290d48943ba888f3915bf7bdeba',
      lnglat,
    }
    const qStr = Object.entries(params).reduce((prev, current) => prev + `${current[0]}=${current[1]}&`, '')
    const url = `${API_PREFIX}/CityMap/addrdata/open/api/rgeo?${qStr}`;
    return requestHelper.getRequestData<{ message: string; status: number; result: any[]; }>(
      url,
      "0b8086f6-7b5a-4392-9883-188147227e33",
      this.data2Mock,
      {
        authoritytype: '2',
        access_token: token,
        testmarker: '0',
        heartbeat: '0',
        elementsVersion: '1.00'
      }
    );
  }

  geo(token: string, address: string) {
    const params = {
      ack: '691b3290d48943ba888f3915bf7bdeba',
      city: '320400',
      address,
    }
    const qStr = Object.entries(params).reduce((prev, current) => prev + `${current[0]}=${current[1]}&`, '')
    const url = `{API_PREFIX}/CityMap/addrdata/open/api/geo?${qStr}`;
    return requestHelper.getRequestData<{ message: string; status: number; result: any[]; }>(
      url,
      "0b8086f6-7b5a-4392-9883-188147227e33",
      this.data2Mock,
      {
        authoritytype: '2',
        access_token: token,
        testmarker: '0',
        heartbeat: '0',
        elementsVersion: '1.00'
      }
    );
  }
}
export const apiChangZhouMapObj = new ChangZhouMapApi();
