<template>
  <hl-form ref="formRef" :model="formData" :rules="rules" :width="['w-lg', 'col-15']"
    :label-position="['items-right', 'items-top']" item-gap="var(--md)" class="m-b-xl">
    <hl-form-item label="选择监测点:" class="top-center">
      <hl-button type="primary" class="cursor-pointer" @click="pointVisiable = true">选择监测点</hl-button>
    </hl-form-item>
    <hl-form-item label="指标数据项:" prop="fators" class="top-center">
      <hl-group v-for="(item, itemIdx) in formData.fators" :key="item.value" align="w-full items-between items-middle">
        <hl-group align="items-middle" class="m-b-sm">
          <!-- <span class="m-r-sm">{{ itemIdx + 1 }}:</span> -->
          <span class="m-r-sm w-lg">{{ item.regionName }}</span>
          <span class="m-r-sm w-lg">{{ item.label }}</span>
          <hl-select v-model="item.targetIdList" placeholder="请选择" class="w-md m-r-sm w-xxl" filterable clearable>
            <hl-option :value="item.targetDataId" :label="item.targetDataName" v-for="item in accessListComp"
              :key="item.targetDataId" :disabled="(item.disabled && !item.isPublic)" />
          </hl-select>
          <hl-icon @click="del(itemIdx)">
            <fill-delete class="cursor-pointer" />
          </hl-icon>
        </hl-group>
      </hl-group>
    </hl-form-item>
  </hl-form>
  <add-point v-if="pointVisiable" @cancel="cancel" @point-ok="pointOk" :checked-ids="checkedIds"></add-point>
</template>
<script lang="ts" setup>
import { onMounted, reactive, PropType, ref, watch, computed } from 'vue';
import { FormInstance } from 'hongluan-ui';
import { useRoute } from 'vue-router';
import { cloneDeep, omit } from 'lodash-es';
import { AddPoint } from '@/views/alarm-config/components/index';
import { apiYgfWarningConfigObj } from '@/apis/modules/alarm-config';
import { IgetRegionMonitorUnitTreeSpace, IgetTargetDataListSpace } from '@/apis/modules/alarm-config/model';
import { RecordAny } from '@/types';

const props = defineProps({
  ruleValue: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});

const route = useRoute();

const formRef = ref<FormInstance>();
const pointVisiable = ref(false);
const checkedIds = ref<string[]>([]);
const accessList = ref<IgetTargetDataListSpace.Data[]>([]);

const action = computed(() => route.query.action);

const formData = reactive<{ pointList: string[], fators: IgetRegionMonitorUnitTreeSpace.UnitList[] }>({
  pointList: [],
  fators: []
});

const accessListComp = computed(() => {
  const ids = formData.fators.map((item: IgetRegionMonitorUnitTreeSpace.UnitList) => {
    return item.targetIdList;
  });
  return accessList.value.map((item: IgetTargetDataListSpace.Data) => {
    // 已选择不可选
    return {
      ...item,
      disabled: ids.includes(item.targetDataId)
    };
  });
});

watch(
  () => props.ruleValue,
  (n, o) => {
    if (n) {
      // 深拷贝防止formData变更，多次监听props
      Object.assign(formData.fators, cloneDeep(props.ruleValue));
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
watch(
  () => formData.fators,
  n => {
    if (n) {
      checkedIds.value = formData.fators.map((item: any) => {
        return item.value;
      });
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

const del = (idx: number) => {
  formData.fators.splice(idx, 1);
  formRef.value?.validateField('fators');
};
const getResult = () => {
  return formData.fators.map((item: IgetRegionMonitorUnitTreeSpace.UnitList) => {
    return {
      unitId: item.value,
      targetIdList: [item.targetIdList]
    };
  });
};
const pointOk = (list: any[]) => {
  formData.fators = [...formData.fators, ...list];
  cancel();
};
const cancel = () => {
  pointVisiable.value = false;
};
const validate = async() => {
  await formRef.value?.validate();
};
const getAccessData = async(targetId: string = '', strategyId: string = '') => {
  if (targetId) {
    const { data } = await apiYgfWarningConfigObj.getTargetDataList(targetId, strategyId);
    accessList.value = data;
    // 新增 指标更改，清空取消
    if (action.value !== 'edit') {
      formData.fators.forEach((item:RecordAny) => {
        item.targetIdList = '';
      });
    }
  } else {
    formData.fators = [];
    accessList.value = [];
  }
};

const rules = {
  fators: [
    {
      validator: (
        _: any,
        value: any[],
        callback: (err?: Error) => void
      ) => {
        let isValid = true;
        value.forEach((fv: any, index: number) => {
          if (!fv.targetIdList) {
            callback(new Error(`请填写第【${index + 1}】行指标数据项信息`));
            isValid = false;
          }
        });
        if (isValid) callback();
      },
      trigger: ['change', 'blur']
    },
  ],
};

defineExpose({
  validate,
  getResult,
  getAccessData
});
</script>
