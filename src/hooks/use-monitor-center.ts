import { ref } from 'vue';
import { apiSourceDataObj as api } from '@/apis/modules/access-data';


const useMonitorCenter = () => {
  // 监测事件的监测点信息
  const eventMonitorPointData = ref();

  // 获取监测事件的监测点信息
  const getEventPointData = async (alarmDataId: string) => {
    const res = await api.getFindMonitorUnitFactorValue(alarmDataId)
    const temp = res.data;
    if(temp.monitorStrategyRuleList&&temp.monitorStrategyRuleList.length>0){
      temp.monitorStrategyRuleList.forEach(item=> {
        item.show = true;
        if(item.strategyRuleFactorVOS&&item.strategyRuleFactorVOS.length>0){
          item.strategyRuleFactorVOS.forEach(item2 => {
            item2.factorValue = JSON.parse(item2.factorValue)
          })
        }
      })
    }
    eventMonitorPointData.value = temp;
    return res.data
  };
  return {
    eventMonitorPointData,
    getEventPointData
  }
}

export { useMonitorCenter }
