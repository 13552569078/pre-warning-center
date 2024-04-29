import { requestHelper } from "@/apis/base/mapper-helper";
import { Dict } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class DictApi {
  data2Mock: boolean = false;

  list(key: string): Promise<Dict.Model> {
    const url = `${API_DOMAIN}${API_PREFIX}/dict/listDictCustomVOs?typeCodeList=${key}`;
    return requestHelper.getRequestData<Dict.Model>(url, '1cc66fa7-50c8-456c-8f97-31abba54a63c', this.data2Mock)
  }
}
export const apiDictObj = new DictApi();