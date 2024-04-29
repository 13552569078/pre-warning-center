import { ref, onMounted, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { FormInstance } from 'hongluan-ui';
import { isValidName } from '@/common';
import { apiMonitorStrategyObj } from '@/apis/modules/monitor-strategy/fixed-cycle';
import { TRIGGER_DATA } from '@/views/monitoring-config/alarm-strategy-config/utils';

function useBasicInfo() {
  const route = useRoute();

  const monitorStrategyId = computed(() => route.query.id); // 策略id

  const formRef = ref<FormInstance>();
  const formData = reactive({
    monitorStrategyId: '', // 策略id
    templateId: '',
    facilityType: '', // 没用 后台报错
    triggerType: TRIGGER_DATA,
    strategyName: '', // 策略名称
    eventTypeCode: '', // 风险类型
    silentConfigParams: [] as {
      dateStart: string;
      dateEnd: string;
      timeStart: string;
      timeEnd: string;
    }[], // 静默设置
    strategyDesc: ''
  });

  const isValidStrategyName = async (rule: any, value: string, callback: (error?: Error) => void) => {
    const res = await apiMonitorStrategyObj.postCheckIfNameExist(value, monitorStrategyId.value as string);
    if (res.data) {
      callback(new Error('预警策略名称已存在，请更换名称'));
    }
    callback();
  };
  const rules = {
    strategyName: [
      { required: true, message: '策略名称不能为空' },
      { validator: isValidStrategyName, trigger: 'blur' },
      { validator: isValidName, trigger: 'blur' }
    ],
    eventTypeCode: [{ required: true, message: '请选择风险分类', trigger: ['blur', 'change'] }],
    silentConfigParams: [
      {
        validator: (_: any, value: any, callback: any) => {
          if (formData.silentConfigParams.length === 0) callback();
          let validata = 0;
          formData.silentConfigParams.forEach((item: any) => {
            if (!item.dateStart || !item.dateEnd || !item.timeStart || !item.timeEnd) {
              validata += 1;
            }
          });
          if (validata > 0) {
            callback(new Error('开始日期,结束日期,开始时间,结束时间均不能为空'));
          } else {
            callback();
          }
        }
      }
    ]
  };

  return {
    formRef,
    formData,
    rules
  };
}

export { useBasicInfo };
