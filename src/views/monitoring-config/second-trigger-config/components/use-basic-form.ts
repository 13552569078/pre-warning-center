import { ref, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { FormInstance } from 'hongluan-ui';
import { isValidName } from '@/common';
import { apiMonitorStrategyObj } from '@/apis/modules/monitor-strategy/fixed-cycle';

function useBasicInfo(type = 'TRIGGER_SECOND') {
  const route = useRoute();

  const monitorStrategyId = computed(() => route.query.id); // 策略id

  const formRef = ref<FormInstance>();
  const formData = reactive({
    monitorStrategyId: '', // 策略id
    facilityType: '', // 设备字段，前端不处理 后台必传否则报错
    triggerType: type,
    strategyName: '', // 策略名称
    eventTypeCode: '', // 风险类型
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
    eventTypeCode: [{ required: true, message: '请选择风险分类', trigger: ['blur', 'change'] }]
  };

  return {
    formRef,
    formData,
    rules
  };
}

export { useBasicInfo };
