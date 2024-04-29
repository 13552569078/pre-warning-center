import { IgetRegionMonitorUnitTreeSpace } from '@/apis/modules/element-subject/model';

const REGION_TYPE = 'REGION_TYPE';
const REGION = 'REGION';
const MONITOR_UNIT = 'MONITOR_UNIT';

const getMonitorControlParams = (node: IgetRegionMonitorUnitTreeSpace.Data & IgetRegionMonitorUnitTreeSpace.RegionList & IgetRegionMonitorUnitTreeSpace.UnitList) => {
  let key = '';
  let value = '';
  if (!node) return {};
  switch (node.treeType) {
    case REGION_TYPE:
      key = 'regionTypeCode';
      value = node.regionTypeCode;
      break;
    case REGION:
      key = 'regionId';
      value = node.regionId;
      break;
    case MONITOR_UNIT:
      key = 'unitId';
      value = node.unitId;
      break;
  }
  if (key) {
    return { [key]: value };
  } else {
    return {};
  }
};

export { getMonitorControlParams };
