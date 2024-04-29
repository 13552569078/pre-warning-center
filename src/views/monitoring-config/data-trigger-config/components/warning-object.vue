<template>
  <hl-panel class="m-t-lg" radius="0px" borderless padding="var(--xl)" body-padding="var(--xxl)" body-class="display-flex items-left items-top flex-row content" footer-style>
    <template #header>
      <panel-header title="预警对象"></panel-header>
    </template>
    <template #default>
      <hl-form ref="formRef" :model="formData" :rules="rules" :width="['120px', 'col']" :label-position="['items-left', 'items-top']" item-gap="var(--md)" style="width: 1092px" class="m-l-xxl m-t-lg">
        <hl-form-item class="w-full" label="监测主体" prop="regionList">
          <hl-group class="p-lg bg-light radius-md w-full" align="items-left items-top" dir="vertical" gap="var(--sm)">
            <hl-group align="items-left items-top" gap="var(--sm)" wrap>
              <hl-group class="p-y-xs p-x-sm bg-content radius-lg box-shadow-sm" align="items-left items-middle" gap="var(--xs)" v-for="(item, index) in formData.regionList" :key="index">
                <span class="static">{{ item?.regionName }}</span>
                <hl-icon size="xs" class="static text-regular" @click="delSubject(index)">
                  <TwoClose></TwoClose>
                </hl-icon>
              </hl-group>
              <hl-group class="p-y-xs p-x-md radius-lg" align="items-center items-middle" gap="var(--xxs)" @click="subjectVisiable = true">
                <hl-icon size="xs" class="static" type="primary"> <TwoPlus></TwoPlus> </hl-icon><span class="text-primary static">增加</span>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-form-item>
        <hl-form-item label="监测指标:" prop="targetId">
          <form-select-target v-model="formData.targetId" style="width: 400px" @targetChanged="targetChange" :disabled="action === 'edit' || !formData.regionList.length" v-bind="$attrs" />
        </hl-form-item>
        <hl-form-item label="监测点:" prop="point" class="is-required">
          <hl-row layout="flow" count="count-2" gap="var(--xl)" style="padding-left: 0 !important" class="show-col">
            <hl-col span="col" class="collapse-section m-b-md" style="width: 650px" dir="vertical" v-for="item in formData.point" :key="item.regionId">
              <hl-group class="w-full p-sm p-l-lg p-r-lg border" align="items-middle items-left">
                <span class="font-bold"> {{ item.regionName }} </span>
              </hl-group>
              <hl-group dir="vertical" gap="var(--md)" class="p-lg border w-full" style="background: var(--factor-bg-color)">
                <hl-group align="items-top items-left" v-for="(itm, index) in item.units" :key="index">
                  <hl-checkbox v-model="itm.checked" size="sm" class="m-t-xxs m-r-lg" style="min-width: 150px">{{ itm.unitName }}</hl-checkbox>
                  <div block class="text-primary text-left">{{ itm.strategyNames ? itm.strategyNames.join(', ') : '--' }}</div>
                </hl-group>
              </hl-group>
            </hl-col>
          </hl-row>
        </hl-form-item>
      </hl-form>
    </template>
  </hl-panel>
  <!-- 新增监测主体 -->
  <subject-multiple-dialog v-if="subjectVisiable" @close="subjectVisiable = false" @subject-changed="subjectChange" v-model="formData.regionList"></subject-multiple-dialog>
</template>
<script lang="ts" setup>
import { ref, computed, reactive, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { pick, cloneDeep, isEmpty } from 'lodash';
import { PanelHeader, FormSelectTarget } from '@/components';
import { apiDataTriggerConfigObj as API } from '@/apis/modules/monitor-strategy/data-trigger';
import { IpostFindMonitorUnitByRegionIdSpace } from '@/apis/modules/monitor-strategy/data-trigger/model';
import { Indexable } from 'fx-front-utils';

const props = defineProps({
  detail: {
    type: Object,
    default: () => ({})
  }
});

const route = useRoute();

const action = computed(() => route.query.action);
const unitIds = computed(() => props.detail.unitIds ?? []);
const unitRegions = computed(
  () =>
    props.detail.regionList.map((item: any) => {
      return item.regionId;
    }) ?? []
);

const subjectVisiable = ref(false);
const formRef = ref();
const formData = reactive({
  regionList: [] as Indexable<any>[],
  targetId: '',
  point: [] as IpostFindMonitorUnitByRegionIdSpace.Data[]
});

watch(
  () => props.detail,
  n => {
    if (!isEmpty(n)) {
      Object.assign(formData, cloneDeep(props.detail));
    }
  },
  {
    deep: true
  }
);
watch(
  () => formData.regionList,
  async (n, o) => {
    if (n.length) {
      formData.targetId && getPoint();
    } else {
      formData.point = [];
    }
  },
  {
    deep: true
  }
);

const targetChange = () => {
  formData.point = [];
  getPoint();
};
const getPoint = async () => {
  // 获取监测点
  const ids = formData?.regionList.map((item: any) => {
    return item.regionId;
  });
  const { data } = await API.postFindMonitorUnitByRegionId(ids, formData.targetId);
  /*
  只要新增操作 监测点初始选中
  编辑回显监测点，未返回得未选中
  */
  for (const item of data) {
    for (const item1 of item.units) {
      if (action.value === 'edit') {
        unitIds.value.includes(item1.unitId) ? (item1.checked = true) : (item1.checked = false);
      } else {
        item1.checked = true;
      }
    }
  }
  /*
  新旧数据比较，旧数据不变
  */
  for (const item of data) {
    for (const item1 of formData.point) {
      if (item.regionId === item1.regionId) {
        item.units = cloneDeep(item1.units);
      }
    }
  }
  /*
  编辑时 新选择监测点默认选中
  */
  if (action.value === 'edit') {
    for (const item of data) {
      if (!unitRegions.value.includes(item.regionId)) {
        for (const item1 of item.units) {
          item1.checked = true;
        }
      }
    }
  }
  /*
  监测点为空不回显
  */
  const hasUnits = data.filter(item => {
    return item.units.length;
  });
  formData.point = hasUnits;
  formRef.value?.validateField('regionList');
};
const rules = {
  regionList: [{ required: true, message: '请选择监测主体' }],
  targetId: [{ required: true, message: '请选择监测指标' }],
  point: [
    {
      validator: (_: any, __: any, callback: any) => {
        if (formData.point.length) {
          // 获取选中得监测点
          const units = [];
          for (const item1 of formData.point) {
            for (const item2 of item1.units) {
              item2.checked && units.push(item2);
            }
          }
          if (!units.length) callback(new Error('监测点不能为空'));
          callback();
        } else {
          callback(new Error('监测点不能为空'));
        }
      }
    }
  ]
};
const validate = async () => {
  await formRef.value?.validate();
};
const getResult = () => {
  let unitIdList = [] as any[];
  for (const item of formData.point) {
    if (item.units.length) {
      unitIdList = [...unitIdList, ...item.units];
    }
  }
  const unitIdListCheck = unitIdList
    .filter(item => {
      return item.checked;
    })
    .map(item1 => {
      return item1.unitId;
    });
  return {
    ...pick(formData, 'targetId'),
    regionList: formData.regionList.map((item: any) => {
      return item.regionId;
    }),
    unitIdList: unitIdListCheck
  };
};

// 监测主体edit
const subjectChange = (data: any[]) => {
  formData.regionList = data;
  formRef.value?.validateField('regionList');
};
const delSubject = (index: number) => {
  formData.regionList.splice(index, 1);
  formRef.value?.validateField('regionList');
};

defineExpose({
  validate,
  getResult
});
</script>
<!-- 透传 -->
<script lang="ts">
export default {
  inheritAttrs: false
};
</script>
<style lang="scss" scoped>
:deep(.hl-row) > * {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>
