import { requestHelper } from "@/apis/base/mapper-helper";
import { IpostUpdateSpace, IdeleteMSpace, IlistSpace, IaddSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class SubjectTypeApi {
  data2Mock: boolean = false;

  // 监测主体类型-修改|监测主体类型-修改-监测主体类型
  postUpdate(id: string, regionTypeName: string, description: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorRegionType/update`;
    return requestHelper.postRequestData<IpostUpdateSpace.Model>(url, 'b1183494-281e-47aa-8076-14295d52e2a5', this.data2Mock, { id, regionTypeName, description });
  }
  // 监测主体类型-删除|监测主体类型-删除-监测主体类型
  deleteM(id: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorRegionType/delete/${id}`;
    return requestHelper.deleteRequestData<IdeleteMSpace.Model>(url, '7c82e200-1ad1-414e-ac60-6e7862c8a687', this.data2Mock);
  }
  // 监测主体类型-列表|监测主体类型-列表-监测主体类型
  list() {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorRegionType/list`;
    return requestHelper.getRequestData<IlistSpace.Model>(url, '85a58ef3-5d2a-48c3-a9b1-6712c51732fa', this.data2Mock);
  }
  // 监测主体类型-新增|监测主体类型-新增-监测主体类型
  add(id: string, regionTypeName: string, description: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/monitorRegionType/add`;
    return requestHelper.postRequestData<IaddSpace.Model>(url, '5a343e3a-8999-4cd8-b6c4-4419ae180cdb', this.data2Mock, { id, regionTypeName, description });
  }

  Run(methodName: string, params: any) {
    let result: any = new Promise(() => ({ data: {} }));
    switch (methodName) {

      case "postUpdate":
        {
          const { id, regionTypeName, description } = params;
          result = this.postUpdate(id, regionTypeName, description);
        }
        break;

      case "deleteM":
        {
          const { id } = params;
          result = this.deleteM(id);
        }
        break;

      case "list":
        result = this.list();
        break;

      case "add":
        {
          const { id, regionTypeName, description } = params;
          result = this.add(id, regionTypeName, description);
        }
        break;

      default:
        break;
    }
    return result;
  }
}
export const apiSubjectTypeObj = new SubjectTypeApi();