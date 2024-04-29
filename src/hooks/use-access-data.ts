import { ref, computed } from 'vue';
import { apiSourceDataObj as api } from '@/apis/modules/access-data';
import { IgetListMonitorEventTreesSpace } from '@/apis/modules/access-data/model';
import { apiSubjectObj } from '@/apis/modules/element-subject';
import { IgetRegionMonitorUnitTreeSpace } from '@/apis/modules/element-subject/model';

import dayjs from 'dayjs';
interface ItreeNode {
  label: string;
  code: string;
  children: any[];
  value: string;
}
function useAccessData() {

  const dataAvailableTime = ref();
  const monitorPointTree = ref<IgetListMonitorEventTreesSpace.Data[]>([]);
  const monitorPointTreeSingle = ref<IgetRegionMonitorUnitTreeSpace.Data[]>([]);
  const treeDataWithFakeRoot = computed(() => {
    return monitorPointTreeSingle.value.length ? 
    [{
      id: -1,
      label: '全部',
      children: monitorPointTreeSingle.value
    }] :
    []
  })

  /*
   * 查询数据接入开始时间
   * type：1-接入数据 2-监测数据 3-报警信息 4-预警信息
  */
  const getDataAvailableTime = async (type: string, monitorId: string) => {
    const res = await api.getFindStartTime(type, monitorId)
    dataAvailableTime.value = dayjs(res.data.startTime).startOf('day').format('YYYY-MM-DD HH:mm:ss');
    return res.data.startTime;
  }

  const setUniqueId = (arr: any) => {
    return arr.map((item:any) => {
      item.uniqueId = Math.random().toString(36).substr(2);
      if (item.children.length) {
        item.children = setUniqueId(item.children)
      }
      return item;
    })
  }

  // 查询监测点树
  const getMonitorPointTree = async () => {
    const res = await api.getListMonitorEventTrees();
    monitorPointTree.value = setUniqueId(res.data);
    return res.data
  }

  // 查询监测点树-V2
  const getMonitorDataTree = async () => {
    const res = await api.getListMonitorDataTrees();
    monitorPointTree.value = setUniqueId(res.data);
    return res.data
  }

  // 查询监测点树并格式化数据
  const getMonitorPointTreeAndFormat = async () => {
    const res = await apiSubjectObj.getRegionMonitorUnitTree();
    monitorPointTreeSingle.value = format(res.data)
    return res.data
  }

  // 格式化处理
  const format = (arr:IgetRegionMonitorUnitTreeSpace.Data[]) => {
    return arr.map((e:any) => {
      e.label = e.regionTypeName || e.regionName || e.unitName
      e.value = e.unitId || e.regionId || e.regionTypeCode
      e.treeType = e.treeType
      if (e.regionList?.length) {
        e.children = format(e.regionList)
      }
      if (e.unitList?.length) {
        e.children = format(e.unitList)
      }
      return e
    })
  }

  return {
    dataAvailableTime,
    monitorPointTree,
    monitorPointTreeSingle,
    treeDataWithFakeRoot,
    getDataAvailableTime,
    getMonitorPointTree,
    getMonitorDataTree,
    getMonitorPointTreeAndFormat
  }
}

export { useAccessData };
