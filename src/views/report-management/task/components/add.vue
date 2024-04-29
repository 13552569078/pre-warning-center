<template>
  <hl-panel header-style="gap: 0px;" borderless padding="var(--lg)" header-class="p-lg" body-class="p-y-lg" body-style="padding-right: 40px; padding-left: 40px;" footer-class="items-left gap-md p-lg" class="data-bg h-full" @close="$emit('close')" full-body>
    <template #header>
      <div class="panel-header-left">
        <hl-icon class="static" type="primary" size="md">
          <FillOrnamentTitle4></FillOrnamentTitle4>
        </hl-icon>
      </div>
      <div class="panel-title">
        <h5 class="text-title">报告任务</h5>
      </div>
      <div class="panel-header-right"></div>
    </template>
    <template #default>
      <hl-form ref="formRef" :model="taskFormData" :rules="rules" class="static" gap="var(--xl)" style="width: 900px" :width="['119px', 'col']">
        <hl-form-item class="w-full" label="报告名称" prop="taskName">
          <hl-input class="static" placeholder="请输入报告名称" style="min-width: 400px" v-model="taskFormData.taskName" maxlength="50" show-word-limit></hl-input>
        </hl-form-item>
        <hl-form-item class="w-full" label="模板分组">
          <span class="font-bold static">{{ tplDetail?.templateTypeName }}</span>
        </hl-form-item>
        <hl-form-item class="w-full" label="模板名称">
          <span class="font-bold static">{{ tplDetail?.templateName }}</span>
        </hl-form-item>
        <hl-form-item class="w-full" label="上传模板名称">
          <hl-group class="p-y-sm p-x-md border solid border-regular radius-md" align="items-left items-middle" gap="var(--sm)">
            <hl-icon size="lg" class="static">
              <FileDoc></FileDoc>
            </hl-icon>
            <span class="text-title static cursor-pointer" @click="downLoad">{{ tplDetail?.templateFileInfo?.originalName }}</span>
          </hl-group>
        </hl-form-item>
        <hl-form-item class="w-full" label="任务类型" prop="taskType">
          <uni-selector style="width: 400px; height: 32px; min-width: 400px" v-model="taskFormData.taskType" dictType="REPORT_TASK_TYPE" placeholder="请选择任务类型" :block="true" @change="changeTaskType" />
        </hl-form-item>
        <!-- 周期型 -->
        <template v-if="taskFormData.taskType === 'CYCLE_TASK'">
          <hl-form-item class="w-full" label="生成报告周期" prop="taskPeriod">
            <uni-selector style="width: 200px; height: 32px; min-width: 200px" v-model="taskFormData.taskPeriod" dictType="REPORT_CYCLE" placeholder="请选择生成报告周期" :block="true" @change="resetDateFeatures" />
          </hl-form-item>
          <hl-form-item class="w-full" label="日期特征" prop="dateFeatures" v-if="taskFormData.taskPeriod">
            <hl-select clearable placeholder="请选择日期特征" filterable v-model="taskFormData.dateFeatures" style="width: 200px; height: 32px; min-width: 200px">
              <hl-option v-for="item in dateFeaturesList" :key="item.value" :label="item.name" :value="item.value" />
            </hl-select>
          </hl-form-item>
          <hl-form-item class="w-full" label="生成时间" prop="reportTime">
            <hl-time-picker class="static" style="width: 200px" placeholder="选择生成时间" format="HH:mm:ss" value-format="HH:mm:ss" v-model="taskFormData.reportTime"></hl-time-picker>
          </hl-form-item>
        </template>
        <!-- 一次性任务 -->
        <template v-if="taskFormData.taskType === 'DISPOSABLE_TASK'">
          <hl-form-item class="w-full" label="生成报告周期" prop="dateFeaturesTime">
            <hl-date-picker class="static" value-format="YYYY-MM-DD" v-model="taskFormData.dateFeaturesTime" type="daterange" placeholder="请选择生成报告周期" style="width: 400px" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="changeTime"/>
          </hl-form-item>
          <hl-form-item class="w-full" label="生成时间" prop="reportDate">
            <hl-date-picker class="static" value-format="YYYY-MM-DD HH:mm:ss" v-model="taskFormData.reportDate" type="datetime" placeholder="请选择生成时间" style="width: 400px"/>
          </hl-form-item>
        </template>
      </hl-form>
    </template>
    <template #footer>
      <hl-button class="static" type="primary" @click="ok">确定</hl-button>
      <hl-button class="static" @click="$router.go(-1)">取消</hl-button>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { dayjs, HlMessage } from 'hongluan-ui';
import { downloadByUrl } from '@/common';
import { disabledDatePass } from '@/common';
import { UniSelector } from '@/components';
// 模板
import { apiReportListObj } from '@/apis/modules/report-manage/report-tpl-manage/list/index';
import { IgetDetailSpace } from '@/apis/modules/report-manage/report-tpl-manage/list/model';
// 任务
import { apiReportTsakObj } from '@/apis/modules/report-manage/task/index';
import { IgetListDateFeaturesSpace } from '@/apis/modules/report-manage/task/model';

const router = useRouter();
const route = useRoute();

// 报告
const taskFormData = reactive({
  taskName: '',
  taskType: 'CYCLE_TASK', // 任务类型
  taskPeriod: '', // 周期类型  周期任务特有
  dateFeatures: '', // 日期特征 周期任务特有
  reportTime: '', // 生成时间 周期任务特有
  reportDate: '', // 生成时间 一次性任务特有
  dateFeaturesTime: '' // 生成报告周期 一次性任务特有
});
// 模板详情
const tplDetail = ref<IgetDetailSpace.Data>();
const dateFeaturesList = ref<IgetListDateFeaturesSpace.Data[]>([]);
const formRef = ref();

const templateId = computed(() => route.query.id); // 模板id

const getTplDetail = async() => {
  const { data } = await apiReportListObj.getDetail(templateId.value as string);
  tplDetail.value = data;
};
const downLoad = () => {
  downloadByUrl(tplDetail.value!.templateFileInfo);
};
// 报告周期 重置 日期特征
const resetDateFeatures = async() => {
  taskFormData.dateFeatures = '';
  if (taskFormData.taskPeriod) {
    const { data } = await apiReportTsakObj.getListDateFeatures(taskFormData.taskPeriod);
    dateFeaturesList.value = data;
  } else {
    dateFeaturesList.value = [];
  }
};
const changeTaskType = () => {
  taskFormData.taskPeriod = '';
  taskFormData.dateFeatures = ''; // 日期特征 周期任务特有
  taskFormData.reportTime = ''; // 生成时间 周期任务特有
  taskFormData.reportDate = ''; // 生成时间 一次性任务特有
  taskFormData.dateFeaturesTime = ''; // 生成报告周期 一次性任务特有
};
const ok = async() => {
  await formRef.value?.validate();
  const params = {
    ...taskFormData,
    templateId: templateId.value as string,
    reportStartDate: Array.isArray(taskFormData.dateFeaturesTime) ? taskFormData.dateFeaturesTime[0] : '',
    reportEndDate: Array.isArray(taskFormData.dateFeaturesTime) ? taskFormData.dateFeaturesTime[1] : ''
  };
  await apiReportTsakObj.postAddReportTask(params);
  router.go(-1);
};
const changeTime = () => {
  const dayDiff = dayjs(taskFormData.dateFeaturesTime[1]).diff(taskFormData.dateFeaturesTime[0], 'days');
  if (dayDiff > 360) {
    HlMessage.warning({
      message: `选择时间跨度不得超过360天!,目前跨度【${dayDiff}】天`,
    });
    taskFormData.dateFeaturesTime = '';
  }
};

onMounted(() => {
  getTplDetail();
});
const isValidName = (rule: any, value: string, callback: any) => {
  // const reg = /^[\u4e00-\u9fa5a-zA-Z0-9()（）[\]-【】_.——/-]+$/g;
  const reg = /^[\u4e00-\u9fa5a-zA-Z0-9()（）[\]\-【】_.——{}-]+$/g;
  if (!reg.test(value)) {
    callback(new Error('仅可输入中文、字符、数字、小括号、中括号、大括号、下划线、小数点、连接符'));
  } else {
    callback();
  }
};

const rules = {
  taskName: [
    { required: true, message: '请输入报告名称', trigger: ['change', 'blur'] },
    { validator: isValidName, trigger: 'blur' }
  ],
  taskType: [{ required: true, message: '请选择任务类型', trigger: ['change', 'blur'] }],
  taskPeriod: [{ required: true, message: '请选择生成报告周期', trigger: ['change', 'blur'] }],
  dateFeatures: [{ required: true, message: '请选择日期特征', trigger: ['change', 'blur'] }],
  reportTime: [{ required: true, message: '请选择生成时间', trigger: ['change', 'blur'] }],
  reportDate: [
    { required: true, message: '请选择生成时间', trigger: ['change', 'blur'] },
    {
      validator: (_: any, value: any, callback: any) => {
        console.log(new Date(value).getTime() < Date.now());
        debugger;
        if (value && new Date(value).getTime() < Date.now()) {
          callback(new Error('生成时间不能小于当前时间'));
        } else {
          callback();
        }
      }
    }
  ],
  dateFeaturesTime: [{ required: true, message: '请选择生成报告周期', trigger: ['change', 'blur'] }]
};
</script>
<style lang="scss">
.data-bg {
  background: url('~@/assets/images/wholeAnalysis/top-bg.svg') no-repeat;
  background-color: var(--bg-content);
  background-position: right -10% bottom -2%;
  background-size: 36% 166%;
}
</style>
