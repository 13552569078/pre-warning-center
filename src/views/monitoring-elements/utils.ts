import { apiCommonObj } from '@/apis/modules/elements-common';
import { GlobalAPI } from '@/common/global-api';
const { areaCode } = JSON.parse(GlobalAPI.config.MAP_CONFIG_MONITOR_WARNING_ONEPIC);

export const getAreaList = async() => {
  const result = await apiCommonObj.postAreaList(areaCode);
  return result.data;
};
