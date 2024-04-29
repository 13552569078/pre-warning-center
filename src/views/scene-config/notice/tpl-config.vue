<template>
  <hl-dialog :model-value="true" width="800px" :title="`配置${showType === 'alarm' ? '报警' : '预警'}通知模板`" class="alarm-event-config-dlg" :close-on-click-modal="false" body-padding="var(--xxl)" @close="$emit('cancel')">
    <hl-form class="static" gap="var(--xxl)" :width="['120px', 'col']" ref="formRef" :model="formData" :rules="formRules">
      <Head :title="`I级${showType === 'alarm' ? '报警' : '预警'}通知`"></Head>
      <hl-form-item class="w-full" label="通知内容:" prop="ALARM_LEVEL_CODE_1">
        <hl-select placeholder="选择通知内容" filterable v-model="formData.ALARM_LEVEL_CODE_1" style="width: calc(var(--xxl) * 22)" clearable>
          <hl-option v-for="item in templateList1" :key="item.templateId" :label="item.templateContent" :value="item.templateId" />
        </hl-select>
      </hl-form-item>
      <Head :title="`II级${showType === 'alarm' ? '报警' : '预警'}通知`"></Head>
      <hl-form-item class="w-full" label="通知内容:" prop="ALARM_LEVEL_CODE_2">
        <hl-select placeholder="选择通知内容" filterable v-model="formData.ALARM_LEVEL_CODE_2" style="width: calc(var(--xxl) * 22)" clearable>
          <hl-option v-for="item in templateList2" :key="item.templateId" :label="item.templateContent" :value="item.templateId" />
        </hl-select>
      </hl-form-item>
      <Head :title="`III级${showType === 'alarm' ? '报警' : '预警'}通知`"></Head>
      <hl-form-item class="w-full" label="通知内容:" prop="ALARM_LEVEL_CODE_3">
        <hl-select placeholder="选择通知内容" filterable v-model="formData.ALARM_LEVEL_CODE_3" style="width: calc(var(--xxl) * 22)" clearable>
          <hl-option v-for="item in templateList3" :key="item.templateId" :label="item.templateContent" :value="item.templateId" />
        </hl-select>
      </hl-form-item>
      <Head :title="`IV级${showType === 'alarm' ? '报警' : '预警'}通知`"></Head>
      <hl-form-item class="w-full" label="通知内容:" prop="ALARM_LEVEL_CODE_4">
        <hl-select placeholder="选择通知内容" filterable v-model="formData.ALARM_LEVEL_CODE_4" style="width: calc(var(--xxl) * 22)" clearable>
          <hl-option v-for="item in templateList4" :key="item.templateId" :label="item.templateContent" :value="item.templateId" />
        </hl-select>
      </hl-form-item>
    </hl-form>

    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="$emit('cancel')">取消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="ok">确定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, computed, reactive } from 'vue';
import { HlMessageSuccess } from '@/common';
import { apiNoticeObj } from '@/apis/modules/scene-config/notice';
import { IgetTemplateListSpace } from '@/apis/modules/scene-config/notice/model';
import Head from './head.vue';

const emit = defineEmits(['cancel']);

const props = defineProps({
  type: {
    type: String,
    default: 'alarm'
  }
});

const showType = computed(() => props.type);
const formRef = ref();

// 等级下拉模板
const templateList1 = ref<IgetTemplateListSpace.TemplateContent[]>([]);
const templateList2 = ref<IgetTemplateListSpace.TemplateContent[]>([]);
const templateList3 = ref<IgetTemplateListSpace.TemplateContent[]>([]);
const templateList4 = ref<IgetTemplateListSpace.TemplateContent[]>([]);

const formData = reactive({
  ALARM_LEVEL_CODE_1: '',
  ALARM_LEVEL_CODE_2: '',
  ALARM_LEVEL_CODE_3: '',
  ALARM_LEVEL_CODE_4: ''
});
// 全量模板
const noticeList = ref<IgetTemplateListSpace.TemplateContent[]>([]);
const formRules = {
  ALARM_LEVEL_CODE_1: { required: true, message: `请选择I级${showType.value === 'alarm' ? '报警' : '预警'}通知模板`, trigger: ['change', 'blur'] },
  ALARM_LEVEL_CODE_2: { required: true, message: `请选择II级${showType.value === 'alarm' ? '报警' : '预警'}通知模板`, trigger: ['change', 'blur'] },
  ALARM_LEVEL_CODE_3: { required: true, message: `请选择III级${showType.value === 'alarm' ? '报警' : '预警'}通知模板`, trigger: ['change', 'blur'] },
  ALARM_LEVEL_CODE_4: { required: true, message: `请选择IV级${showType.value === 'alarm' ? '报警' : '预警'}通知模板`, trigger: ['change', 'blur'] }
};

const init = async() => {
  const { data } = showType.value === 'alarm' ? await apiNoticeObj.getTemplateList(1) : await apiNoticeObj.getTemplateList(2);
  // 处理下拉 通知模板
  for (const item of data) {
    noticeList.value = [...noticeList.value, ...item.templateContents];
    if (item.alarmLevelCode === 'ALARM_LEVEL_CODE_1') {
      templateList1.value = item.templateContents;
      formData.ALARM_LEVEL_CODE_1 = getTplId(item.templateContents);
    }
    if (item.alarmLevelCode === 'ALARM_LEVEL_CODE_2') {
      templateList2.value = item.templateContents;
      formData.ALARM_LEVEL_CODE_2 = getTplId(item.templateContents);
    }
    if (item.alarmLevelCode === 'ALARM_LEVEL_CODE_3') {
      templateList3.value = item.templateContents;
      formData.ALARM_LEVEL_CODE_3 = getTplId(item.templateContents);
    }
    if (item.alarmLevelCode === 'ALARM_LEVEL_CODE_4') {
      templateList4.value = item.templateContents;
      formData.ALARM_LEVEL_CODE_4 = getTplId(item.templateContents);
    }
  }
};
const getTplId = (list: IgetTemplateListSpace.TemplateContent[]) => {
  return (
    list.filter(item => {
      return item.useState === 1;
    })[0].templateId ?? ''
  );
};
const ok = async() => {
  await formRef.value?.validate();
  // 获取formData value
  const ids = Object.values(formData);
  const params = noticeList.value.map(item => {
    return {
      templateId: item.templateId,
      useState: ids.includes(item.templateId) ? 1 : 0
    };
  });
  await apiNoticeObj.postTemplateUpdate(showType.value === 'alarm' ? 1 : 0, params as []);
  HlMessageSuccess('保存成功');
  emit('cancel');
};

init();
</script>
