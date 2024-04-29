import { EmptyUtils } from 'fx-front-utils';
import { apiMonitorPointObj as api } from '@/apis/modules/monitor-unit';
import { IgetBaseInfoSpace, IgetFindMonitorUnitTargetStrategySpace } from '@/apis/modules/monitor-unit/model';
import { ref, computed } from 'vue';

// 监测点
function useMonitorUnit() {
  const monitorUnitDetail = ref<IgetBaseInfoSpace.Data>();
  const cardInfo = ref();
  const targetList = ref<IgetFindMonitorUnitTargetStrategySpace.MonitorUnitTargetListVOList[]>([]);
  const strategyList = ref<IgetFindMonitorUnitTargetStrategySpace.MonitorUnitStrategyListVOList[]>([]);

  const strategyIdList = computed(() => {
    if (strategyList.value) {
      return strategyList.value.map((item: IgetFindMonitorUnitTargetStrategySpace.MonitorUnitStrategyListVOList) => item.strategyId);
    } else {
      return [] as string[];
    }
  });

  const targetIdList = computed(() => {
    if (targetList.value) {
      return targetList.value.map((item: IgetFindMonitorUnitTargetStrategySpace.MonitorUnitTargetListVOList) => item.targetDataId);
    } else {
      return [] as string[];
    }
  });

  const targetDataIdListUsed = computed(() => {
    return strategyList.value.reduce((total, current: IgetFindMonitorUnitTargetStrategySpace.MonitorUnitStrategyListVOList) => {
      return total.concat(current.targetDataIdList);
    }, [] as string[]);
  });

  // 详情
  const getMonitorUnitDetail = async(id: string) => {
    const res = await api.getBaseInfo(id);
    monitorUnitDetail.value = res.data;
    return res.data;
  };

  // 获取已关联指标、策略
  const getRelatedList = async(id: string) => {
    const res = await api.getFindMonitorUnitTargetStrategy(id);
    cardInfo.value = {
      unitName: res.data.monitorUnitName,
      regionName: res.data.monitorRegionName,
      address: res.data.monitorUnitAddress
    };
    targetList.value = EmptyUtils.formatArray(res.data.monitorUnitTargetListVOList) as IgetFindMonitorUnitTargetStrategySpace.MonitorUnitTargetListVOList[];
    strategyList.value = EmptyUtils.formatArray(res.data.monitorUnitStrategyListVOList) as IgetFindMonitorUnitTargetStrategySpace.MonitorUnitStrategyListVOList[];
    return res.data;
  };

  return {
    monitorUnitDetail,
    cardInfo,
    targetList,
    strategyList,
    strategyIdList,
    targetIdList,
    targetDataIdListUsed,
    getMonitorUnitDetail,
    getRelatedList
  };
}

export { useMonitorUnit };
