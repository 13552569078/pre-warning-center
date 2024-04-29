<template>
  <hl-panel class="m-t-lg" radius="0px" borderless padding="var(--lg)" body-class="display-flex items-left items-top flex-row content p-l-lg p-r-lg p-b-lg" footer-style>
    <template #header>
      <panel-header title="预警对象"></panel-header>
    </template>
    <template #default>
      <hl-form ref="formRef" :model="formData" :rules="rules" :label-position="['items-left', 'items-middle']" gap="var(--lg)" item-gap="var(--lg2)" style="width: 1092px">
        <hl-form-item label="监测主体" prop="regionList">
          <hl-group class="p-lg bg-light radius-md w-full" align="items-left items-top" dir="vertical" gap="var(--sm)">
            <hl-group align="items-left items-top" gap="var(--sm)" wrap>
              <hl-group class="p-y-xs p-x-sm bg-content radius-lg box-shadow-sm" align="items-left items-middle" gap="var(--xs)" v-for="(item, index) in formData.regionList" :key="index">
                <span class="static">{{ item?.regionName }}</span>
                <hl-icon size="xs" class="static text-regular" @click="delSubject(index)">
                  <TwoClose></TwoClose>
                </hl-icon>
              </hl-group>
              <hl-group class="p-y-xs p-x-md radius-lg" align="items-center items-middle" gap="var(--xxs)" @click="subjectVisiable = true">
                <hl-icon size="xs" class="static" type="primary">
                  <TwoPlus></TwoPlus>
                </hl-icon>
                <span class="text-primary static">增加</span>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-form-item>
        <hl-form-item label="风险分类" prop="eventTypeList">
          <hl-group class="p-lg bg-light radius-md w-full" align="items-left items-top" dir="vertical" gap="var(--sm)">
            <hl-group align="items-left items-top" gap="var(--sm)" wrap>
              <hl-group class="p-y-xs p-x-sm bg-content radius-lg box-shadow-sm" align="items-left items-middle" gap="var(--xs)" v-for="(item, index) in formData.eventTypeList" :key="index">
                <span class="static">{{ item.eventTypeName }}</span>
                <hl-icon size="xs" class="static text-regular" @click="delRisk(index)">
                  <TwoClose></TwoClose>
                </hl-icon>
              </hl-group>
              <hl-group class="p-y-xs p-x-md radius-lg" align="items-center items-middle" gap="var(--xxs)" @click="eventVisiable = true">
                <hl-icon size="xs" class="static" type="primary">
                  <TwoPlus></TwoPlus>
                </hl-icon>
                <span class="text-primary static">增加</span>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-form-item>
      </hl-form>
    </template>
  </hl-panel>
  <!-- 风险分类 -->
  <event-multiple-dialog v-if="eventVisiable" @close="eventVisiable = false" @risk-changed="riskChange" v-model="formData.eventTypeList"></event-multiple-dialog>
  <!-- 监测主体 -->
  <subject-multiple-dialog v-if="subjectVisiable" @close="subjectVisiable = false" @subject-changed="subjectChange" v-model="formData.regionList"></subject-multiple-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import { cloneDeep, isEmpty } from 'lodash';
import { PanelHeader } from '@/components';
import { Indexable } from 'fx-front-utils';

const props = defineProps({
  detail: {
    type: Object,
    default: () => ({})
  }
});

const subjectVisiable = ref(false);
const eventVisiable = ref(false);
const formRef = ref();
const formData = reactive({
  regionList: [] as Indexable<any>[],
  eventTypeList: [] as Indexable<any>[]
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

const rules = {
  regionList: [{ required: true, message: '请选择监测主体' }],
  eventTypeList: [{ required: true, message: '请选择风险分类', trigger: ['blur'] }]
};
const validate = async () => {
  await formRef.value?.validate();
};
const getResult = () => {
  return {
    regionIds: formData.regionList.map((item: any) => {
      return item.regionId;
    }),
    eventTypeCodeList: formData.eventTypeList.map(item => {
      return item.systemCode;
    })
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
// 风险分类edit
const riskChange = (data: any[]) => {
  formData.eventTypeList = data;
  formRef.value?.validateField('eventTypeList');
};
const delRisk = (index: number) => {
  formData.eventTypeList.splice(index, 1);
  formRef.value?.validateField('eventTypeList');
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
// :deep(.hl-row) > * {
//   padding-left: 0 !important;
//   padding-right: 0 !important;
// }
</style>
