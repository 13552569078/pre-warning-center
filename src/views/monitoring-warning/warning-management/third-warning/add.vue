<template>
  <hl-panel header-style="gap: 0px;" borderless padding="var(--lg)" header-class="p-lg"
    body-style="padding-right: 20px; padding-left: 20px;" footer-class="items-left gap-md p-lg bg-content"
    class="data-bg second-page-fixed-footer">
    <template #header>
      <div class="panel-header-left">
        <!-- <hl-icon class="static" type="primary" size="md">
          <FillOrnamentTitle4></FillOrnamentTitle4>
        </hl-icon> -->
      </div>
      <!-- <div class="panel-title">
        <h4 class="text-title">第三方预警</h4>
      </div> -->
      <panel-header title="第三方预警"/>
      <div class="panel-header-right"></div>
    </template>
    <template #default>
      <hl-form class="static form-size" :label-position="['items-left', 'items-middle']" gap="var(--lg)" item-gap="var(--lg2)" ref="formRef" :model="form" :rules="formRules">
        <hl-form-item class="w-full" label="预警标题:" prop="alarmTitle">
          <hl-input class="static" v-model.trim="form.alarmTitle" placeholder="预警标题" maxlength="50" show-word-limit
            style="width: 600px;"></hl-input>
        </hl-form-item>
        <hl-group class="w-full" gap="var(--lg2)" full="full-x">
          <hl-form-item class="w-full" :label="`${$t('warningType')}`" prop="eventTypeCode">
            <risk-type v-model="form.eventTypeCode" :disabled="action === 'edit'" @riskChanged="riskChangedClear"
              style="width: 600px !important;" />
          </hl-form-item>
          <hl-form-item class="w-full" prop="alarmLevel" label="预警等级">
            <hl-select style="width: 600px;" v-model="form.alarmLevel" placeholder="请选择预警等级" block filterable clearable>
              <hl-option v-for="item in alarmLevels" :key="item.dictCode" :label="item.dictName"
                :value="item.dictCode" />
            </hl-select>
          </hl-form-item>
        </hl-group>
        <hl-group class="w-full" gap="var(--lg2)">
          <hl-form-item label="预警地点:" prop="alarmAddress">
            <hl-input v-model.trim="form.alarmAddress" placeholder="请选择预警地点" maxlength="50" class="address-input"
              show-word-limit style="width: 600px;">
              <template #suffix>
                <hl-icon class="cursor-pointer" @click.stop="locationDialogVisiable = true">
                  <TwoPoint />
                </hl-icon>
              </template>
            </hl-input>
          </hl-form-item>
          <hl-form-item label="所在区域" prop="areaCode">
            <search-area ref="areaSelectorRef" v-model="form.areaCode" :is-emit-area-code="true" :is-in-form="true"
              style="width: 600px;">
            </search-area>
          </hl-form-item>
        </hl-group>
        <hl-group class="w-full" gap="var(--lg2)">
          <hl-form-item class="w-full" label="发生时间:" prop="startTime">
          <hl-date-picker class="static" value-format="YYYY-MM-DD HH:mm:ss" v-model="form.startTime" type="datetime"
            placeholder="发生时间" :disabled-date="disabledDateFuture" style="width: 600px;" />
        </hl-form-item>
        <hl-form-item class="w-full" label="预警状态" prop="alarmState">
          <hl-radio-group v-model="form.alarmState" dir="horizontal" gap="var(--xl)" type="primary">
            <hl-radio :label="item.value" v-for="item in alarmStateList" :key="item.value">{{ item.label
            }}</hl-radio>
          </hl-radio-group>
        </hl-form-item>
        </hl-group>
        <!-- <hl-form-item class="w-full" label="处置方式:" prop="handleOption">
          <hl-radio-group v-model="form.handleOption" dir="horizontal" gap="var(--md)" type="primary">
            <hl-radio :label="item.value" v-for="item in handleOptionList" :key="item.value">{{ item.label
            }}</hl-radio>
          </hl-radio-group>
        </hl-form-item> -->
        <hl-form-item class="w-full" label="预警转发:" prop="needTransfer">
          <hl-group dir="vertical" gap="var(--sm)">
            <hl-radio-group dir="vertical" v-model="form.needTransfer" gap="var(--sm)" @change="changeTransfer">
              <hl-radio :label="NO_NEED_TO_TRANSFER">无需转发</hl-radio>
              <hl-radio :label="NEED_TO_TRANSFER">需要转发</hl-radio>
            </hl-radio-group>
            <hl-checkbox-group dir="vertical" class="p-l-md" v-model="form.transferType" gap="var(--sm)" @change="changeTransferType">
              <hl-checkbox :label="'1'">事件中心</hl-checkbox>
              <hl-checkbox :label="'2'">第三方系统</hl-checkbox>
            </hl-checkbox-group>
          </hl-group>
        </hl-form-item>
        <hl-group align="items-top" class="w-full" gap="var(--lg2)" full="full-x">
          <hl-form-item class="w-full" label="预警来源" prop="alarmOrigin">
            <hl-select v-model="form.alarmOrigin" placeholder="请选择预警来源" block filterable clearable disabled>
              <hl-option v-for="item in alarmOriginList" :key="item.dictCode" :label="item.dictName"
                :value="item.dictCode" />
            </hl-select>
          </hl-form-item>
          <hl-form-item class="w-full" label="研判方式" prop="judgeOption">
            <hl-select v-model="form.judgeOption" placeholder="请选择研判方式" block filterable clearable disabled>
              <hl-option v-for="item in judgeOptionList" :key="item.value" :label="item.label" :value="item.value" />
            </hl-select>
          </hl-form-item>
        </hl-group>
        <hl-group align="items-top" class="w-full" gap="var(--lg2)" full="full-x">
          <hl-form-item class="w-full" label="监测点">
            <search-monitor-event @point-changed="pointChanged" :isEmitCode="true" v-model="form.monitorUnitId" />
          </hl-form-item>
          <hl-form-item class="w-full" label="监测主体">
            <hl-input v-model.trim="form.regionName" placeholder="监测主体" maxlength="50" show-word-limit block disabled />
          </hl-form-item>
        </hl-group>
        <hl-form-item class="w-full" label="描述" prop="alarmDesc">
          <hl-input style="width: 600px;" v-model.trim="form.alarmDesc" native-type="textarea" :rows="3" maxlength="150"
            show-word-limit />
        </hl-form-item>
        <hl-form-item class="w-full" label="相关附件">
          <file-uploader v-model="fileList" accept=".jpg,.png,.jpeg,.pdf,.mp4" :limit='5' />
        </hl-form-item>
        <hl-form-item class="w-full" label=" ">
          <hl-group dir="vertical">
            <div class="text-secondary m-t-xxs" style="width: 360px; height: 22px;">1.请上传的文件不超过5个文件</div>
            <div class="text-secondary m-t-xxs" style="width: 360px; height: 22px;">
              2.图片文件大小不超过20M，pdf、png或jpg格式</div>
            <div class="text-secondary m-t-xxs" style="width: 360px; height: 22px;">3.视频文件大小不超过100M，mp4格式
            </div>
          </hl-group>
        </hl-form-item>
      </hl-form>
    </template>
    <template #footer>
      <hl-button type="primary" @click="confirm" :disabled="disabledFlag" class="main" style="width: 80px;">
        确定</hl-button>
      <hl-button class="static" @click="$router.go(-1)" style="width: 80px;">取消</hl-button>
    </template>
  </hl-panel>

  <location-map :visiable="locationDialogVisiable" @locationClose="locationClose" @locationSubmit="locationSubmit">
  </location-map>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { HlMessageBox } from 'hongluan-ui';
import { cloneDeep, omit } from 'lodash-es';
import { apiDictObj as dictApi } from '@/apis/modules/dict-api';
import { eventTypeApiObj as eventTypeApi } from '@/apis/modules/event-type-api';
import { disabledDateFuture } from '@/common';
import { UploadUserFile } from '@/types';
import type { IlocalInfo } from '@/types/local-info';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { apiThridAlarmObj } from '@/apis/modules/third-alarm';
import { formRules, formData, alarmStateList, judgeOptionList } from './utils';

const NEED_TO_TRANSFER = '-1';
const NO_NEED_TO_TRANSFER = '0';

const router = useRouter();
const route = useRoute();

const formRef = ref();
const form = ref(cloneDeep(formData));
const action = computed(() => route.query.action);
const alarmId = computed(() => route.query.id);

const alarmLevels = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const allAlarmLevels = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const alarmOriginList = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);

const locationDialogVisiable = ref(false);
const disabledFlag = ref(false);

const fileList = ref<UploadUserFile[]>([]);

const confirm = async() => {
  await validate();
  disabledFlag.value = true;
  const result = getResult();
  // 编辑 新增
  result.alarmId ? await apiThridAlarmObj.postUpdateAlarm(result) : await apiThridAlarmObj.postAddAlarm(result);
  disabledFlag.value = false;
  router.push({
    name: 'ThirdWarning',
  });
};
const validate = async() => {
  await formRef.value?.validate();
};
const getResult = () => {
  let disseminationOptions = null;
  if (form.value.needTransfer === NO_NEED_TO_TRANSFER) {
    disseminationOptions = [NO_NEED_TO_TRANSFER];
  } else {
    disseminationOptions = form.value.transferType;
  }
  return {
    ...omit(form.value, 'regionName'),
    attachments: fileList.value.map((files: UploadUserFile) => {
      return files.id;
    }),
    disseminationOptions
  };
};
// ------------------------------- 监测点 带出 监测主体
const pointChanged = (data: any) => {
  form.value.monitorRegionId = data.parent.data.regionId;
  form.value.regionName = data.parent.data.regionName;
};
// ------------------------------- map
const locationClose = () => {
  locationDialogVisiable.value = false;
};
const locationSubmit = async(info: IlocalInfo) => {
  if (form.value.alarmAddress?.length) {
    await HlMessageBox.confirm('刚选择的地址会覆盖已填写的“预警地点”数据，请确认是否覆盖？', '确认选择', {
      confirmButtonText: '确定',
      confirmButtonType: 'warning',
      cancelButtonText: '取消',
      type: 'success',
    });
  }
  locationDialogVisiable.value = false;
  form.value.alarmAddress = info.address;
  form.value.longitude = info.longitude;
  form.value.latitude = info.latitude;
};
// ------------------------------- 风险分类
// 获取预警等级 根据风险分类
const riskChanged = async(eventTypeCode: string) => {
  const result = await eventTypeApi.detail(eventTypeCode);
  alarmLevels.value = allAlarmLevels.value.filter(a => result.data.alarmLevelTypeList.includes(a.dictCode));
};
const riskChangedClear = async(eventTypeCode: string) => {
  const result = await eventTypeApi.detail(eventTypeCode);
  alarmLevels.value = allAlarmLevels.value.filter(a => result.data.alarmLevelTypeList.includes(a.dictCode));
  // 风险分类变更 清空等级
  if (form.value.alarmLevel) form.value.alarmLevel = '';
};
// 全部风险分类等级 字典
const getDict = async() => {
  // 预警等级
  const result = await dictApi.list('ALARM_LEVEL_CODE');
  allAlarmLevels.value = result.data;
  // 预警来源
  const { data: data1 } = await dictApi.list('ALARM_ORIGIN');
  alarmOriginList.value = data1;
};
const getDetails = async() => {
  const { data } = await apiThridAlarmObj.getAlarm(alarmId.value as string);
  riskChanged(data.eventTypeCode);
  Object.assign(form.value, data);
  form.value.alarmId = data.id; // 转义id
  fileList.value = data.attachments && data.attachments.length
    ? data.attachments.map(item => {
      return {
        ...item,
        id: item.fileId,
        name: item.originalName,
        url: item.url,
        attachmentType: item.attachmentType
      };
    })
    : [];
  // 回显预警转发
  if (form.value.disseminationOptions.length === 1 && form.value.disseminationOptions[0] === NO_NEED_TO_TRANSFER) {
    form.value.needTransfer = form.value.disseminationOptions[0];
  } else {
    form.value.needTransfer = NEED_TO_TRANSFER;
    form.value.transferType = form.value.disseminationOptions;
  }
};

const changeTransfer = (value: string) => {
  if (value === NO_NEED_TO_TRANSFER) {
    form.value.transferType = [];
  }
};

const changeTransferType = (value: string[]) => {
  if (value.length !== 0) {
    form.value.needTransfer = NEED_TO_TRANSFER;
  } else {
    form.value.needTransfer = NO_NEED_TO_TRANSFER;
  }
};

onMounted(() => {
  // 详情获取
  alarmId.value && getDetails();
  // 风险分类等级
  getDict();
});

defineExpose({
  getResult,
  validate
});
</script>

<style lang="scss">
.data-bg {
  background: url('~@/assets/images/wholeAnalysis/top-bg.svg') no-repeat;
  background-color: var(--bg-content);
  background-position: right -10% bottom -2%;
  background-size: 36% 166%;
}
</style>
