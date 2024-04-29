import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import * as qs from 'qs';
import { Loading } from 'fx-front-framework';
import { GlobalAPI } from '@/common';
import { noLoadingUrls, arrayBufferUrls, formDataUrls } from './http-config';
import userAuth from '@/common/user-auth';

const pending = new Map(); // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识

const setHeaderToFormData = (config: AxiosRequestConfig, axiosConfig: CAxiosConfig) => {
  // 设置content-type特殊方式
  const formDataFlag = (axiosConfig.formDataUrls || []).some(
    (url: any) => config.url?.indexOf(url) !== -1
  );
  if (formDataFlag) {
    if (config.headers) config.headers['Content-Type'] = 'multipart/form-data';
  }
};

// 下载文件配置
const setResponseTypeToBuffer = (config: AxiosRequestConfig, axiosConfig: CAxiosConfig) => {
  const flag = (axiosConfig.arrayBufferUrls || []).some(item => config.url?.indexOf(item) !== -1);
  if (flag) {
    config.responseType = 'arraybuffer';
  }
};

const setFavicon = (url: string) => {
  if (url) {
    const favicon = (document.querySelector('link[rel*=\'icon\']') || document.createElement('link')) as HTMLLinkElement;
    favicon.type = 'image/x-icon';
    favicon.rel = 'shortcut icon';
    favicon.href = url;
    document.getElementsByTagName('head')[0].appendChild(favicon);
  }
};

interface CAxiosConfig extends AxiosRequestConfig {
  noLoadingUrls?: string[];
  arrayBufferUrls?: string[];
  formDataUrls?: string[];
  removeRepeatedUrl?: boolean;
  serverConfig?: { [x: string]: any };
  axiosConfig?: any[];
}

const handleParms = (config: AxiosRequestConfig<any>, key: string, value: string | null) => {
  if (config.method?.toLocaleUpperCase() === 'GET') {
    config.url += (config.url!.indexOf('?') > -1 ? '&' : '?') + `${key}=${value}`;
  } else if (config.method?.toLocaleUpperCase() === 'POST') {
    const pObj = { [key]: value };
    // 下面只处理的plain object情况，其他情况需要的话，还需要处理。
    // config.params = config.params ? Object.assign(pObj, config.params) : pObj;
    config.data = config.data ? (!Array.isArray(config.data) ? Object.assign(pObj, config.data) : pObj) : pObj;
  }
};

class CAxios {
  service: AxiosInstance;
  constructor(axiosConfig = { timeout: 100000 } as CAxiosConfig) {
    if (axiosConfig.serverConfig && typeof axiosConfig.serverConfig === 'object') {
      const xhr = new XMLHttpRequest();
      xhr.open('get', `${document.location.origin}/swan-gateway-warning/serverconfig/swanwarning`, false);
      xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
          const responseJson = JSON.parse(xhr.responseText);
          setFavicon(responseJson.LOGO);
          document.title = responseJson.TITLE_CENTRE_CONFIG || '智能预警平台';
          // axiosConfig.baseURL = JSON.parse(xhr.responseText).BASE_URL;
          Object.assign(axiosConfig.serverConfig!, responseJson);
        }
      };
      xhr.send();
    }
    this.service = axios.create(axiosConfig);
    // 设置 post、put 默认 Content-Type
    this.service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
    this.service.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8';

    const noLoadingString = (axiosConfig.noLoadingUrls || []).join('|').replace(/\//g, '\\/');
    this.service.interceptors.request.use(
      config => {
        if (!config.url?.match(noLoadingString)) {
          Loading.showFullScreenLoading();
        }
        setResponseTypeToBuffer(config, axiosConfig);
        setHeaderToFormData(config, axiosConfig);
        const url = [
          config.method,
          config.url,
          qs.stringify(config.params),
          qs.stringify(config.data),
        ].join('&');
        config.cancelToken =
          config.cancelToken ||
          new axios.CancelToken(cancel => {
            if (!pending.has(url)) {
              // 如果 pending 中不存在当前请求，则添加进去
              pending.set(url, cancel);
            }
          });
        this.handleRequestConfig(config, url);
        return config;
      },
      error => {
        Loading.tryHideFullScreenLoading();
        console.error(error); // for debug
        return Promise.reject(error);
      }
    );

    this.service.interceptors.response.use(
      response => {
        if (!response.config.url?.match(noLoadingString)) {
          Loading.tryHideFullScreenLoading();
        }
        // removeRepeatUrl(response.config, axiosConfig); // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
        if (response.data instanceof ArrayBuffer) {
          return response;
        }
        const responseCode = response.data.code;

        if (String(responseCode) !== '0' && String(responseCode) !== '200010000' && !/\/CityMap\/|accesstoken\/create/.test(response.config.url!)) {
          // 约定只要responseCode不等于0，就是异常状态
          Loading.showMessageTip(2, response.data.desc || '系统异常');
          console.log(`响应信息:${response.data.desc}`);
        }
        switch (String(responseCode)) {
          case '3A0311':
          case '1A0101':
            if (window.parent !== window) {
              window.parent.postMessage({ method: 'logout' }, '*');
            } else {
              userAuth.logoff();
            }
            break;
        }
        return response;
      },
      error => {
        console.error(error.response); // for debug
        Loading.tryHideFullScreenLoading();
        // 可以根据后端返回的状态码进行不同的操作
        if (error.response) {
          const errorCode = error.response.status;
          switch (errorCode) {
            case 400:
              Loading.showMessageTip(5, '请求出现错误');
              break;
            case 401:
              Loading.showMessageTip(2, 'Token过期，请重新登录');
              break;
            case 403:
              Loading.showMessageTip(2, '权限认证失效，请重新登录');
              break;
            case 404:
              Loading.showMessageTip(5, '网络请求不存在');
              break;
            case 500:
              Loading.showMessageTip(5, '系统异常');
              break;
            case 501:
              Loading.showMessageTip(5, '请求还没有被实现');
              break;
            case 502:
              Loading.showMessageTip(5, '网关错误');
              break;
            case 503:
              Loading.showMessageTip(5, '服务暂时不可用');
              break;
            case 505:
              Loading.showMessageTip(5, '请求的 HTTP 版本不支持');
              break;
            default:
              break;
          }
        }
        return Promise.reject(error);
      }
    );
  }
  handleRequestConfig(config: AxiosRequestConfig, url: string) {
    const token = userAuth.getToken();
    if (token) {
      if (config.headers) {
        if (url.includes('/permission')) {
          config.headers.authorization = `Bearer ${token}`;
        } else {
          config.headers.authorization = token;
        }
      }
    }
    // 退出接口header加token加cookie
    if (url.includes('/permission')) {
      config.withCredentials = true;
      if (config.headers && token) config.headers.token = token;
    }

    // 处理 预警|报警 参数
    const useFor = document.location.href.indexOf('/monitoring-config/') > -1 ? '1' : '2';
    if (/\/monitoring-config\/|\/warning-config\//.test(document.location.href)) {
      handleParms(config, 'useFor', useFor);
    }

    // 处理城市专题入口参数
    if (localStorage.getItem('sceneCode')) {
      handleParms(config, 'sceneCode', localStorage.getItem('sceneCode'));
    }
  }
}

const HongLingAxios = new CAxios({
  // baseURL: GlobalAPI.config.BASE_URL,
  noLoadingUrls,
  arrayBufferUrls,
  formDataUrls,
  serverConfig: process.env.NODE_ENV === 'production' ? GlobalAPI.config : undefined,
}).service;

export default HongLingAxios;
