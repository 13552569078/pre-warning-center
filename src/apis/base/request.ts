import { AxiosInstance, AxiosResponse, AxiosRequestConfig, Method, AxiosRequestHeaders } from 'axios';
import { HlLoading } from 'hongluan-ui';
import { Loading } from 'fx-front-framework';
import { CommonUtils, Indexable, EmptyUtils } from 'fx-front-utils';
import axios from './caxios';
import { showMsgUrls, arrayBufferUrls, notTranslateEmpty } from './http-config';
import { handleFileBuffer } from '@/common/utils';

/**
 * 返回类型基础类
 */

export interface EmptyResponseData {
  [key: string]: any;
}

export interface ResponseData {
  code: number | string;
  desc?: string;
  tips?: string;
  data: unknown;
}

export interface MockResponseData {
  code?: number | string;
  data: ResponseData;
  message: string;
  meta: any;
  success: boolean;
}

export interface TableList {
  list: Indexable<any>[]
}
/**
 * api 调用辅助类
 */
class RequestAxios {
  private serverObj: AxiosInstance;
  constructor() {
    this.serverObj = axios;
  }

  post(url: string, data: unknown = null) {
    return this.http(url, data, 'POST');
  }
  put(url: string, data: unknown = null) {
    return this.http(url, data, 'PUT');
  }
  get(url: string, headers?: AxiosRequestHeaders) {
    return this.http(url, null, 'GET', headers);
  }
  delete(url: string) {
    return this.http(url, null, 'DELETE');
  }

  http(url: string, data: unknown, method: Method, headers?: AxiosRequestHeaders) {
    return new Promise<ResponseData>((resolve, reject) => {
      const config: AxiosRequestConfig = {
        url,
        method,
        // baseURL: "",
        data,
        headers: headers || {}
      };
      const showDownloading = arrayBufferUrls.some(item => config.url?.indexOf(item) !== -1);
      const tableNotTranslateEmpty = notTranslateEmpty.some(item => config.url?.indexOf(item) !== -1);
      let loadingInstance: any = null;
      if (showDownloading) {
        loadingInstance = HlLoading.service({
          lock: true,
          text: '下载中',
          spinner: 'fw-icon-loading',
          background: 'rgba(1, 1, 1, 0.1)',
        });
      }
      this.serverObj.request(config).then(
        (response: AxiosResponse) => {
          const respDataWrapper: ResponseData | MockResponseData = response.data;
          if (respDataWrapper instanceof ArrayBuffer) {
            console.log('走下载');
            /* if (config.url?.indexOf('/targetDataAnalysis/exportList') !== -1) {
              handleFileBuffer(response);
            } else {
              CommonUtils.handleFileBuffer(response);
            } */
            CommonUtils.handleFileBuffer(response);
            loadingInstance && loadingInstance.close();
            resolve({ code: 0, data: true, desc: '下载成功' });
          } else {
            const respData = 'success' in respDataWrapper ? respDataWrapper.data || respDataWrapper : respDataWrapper;
            // const respData: ResponseData | MockResponseData = respDataWrapper;
            const isInShowMsgUrls = showMsgUrls.some(item => config.url?.indexOf(item) !== -1);
            if (isInShowMsgUrls && (+respData.code === 0 || respData.code === '200010000')) {
              Loading.showMessageTip(1, respData.desc || '操作成功');
              resolve(respData);
            } else {
              if ((+respData.code === 0 || respData.code === '200010000') && respData.data && (respData.data as TableList)?.list && !tableNotTranslateEmpty) {
                (respData.data as TableList).list = EmptyUtils.formatArray((respData.data as TableList).list);
              }
              (+respData.code === 0 || respData.code === '200010000') || /\/CityMap\/|accesstoken\/create/.test(url) ? resolve(respData) : reject(respData);
            }
          }
        },
        (err: unknown) => {
          loadingInstance && loadingInstance.close();
          reject(err);
        }
      ).catch(err => {
        reject(err);
      });
    });
  }

  private static singleObj: RequestAxios;
  static getInstance() {
    if (!this.singleObj) {
      this.singleObj = new RequestAxios();
    }
    return this.singleObj;
  }
}
export const axiosRequestSingle = RequestAxios.getInstance();
