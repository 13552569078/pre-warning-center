<template>
  <hl-dialog
    :model-value="true"
    class="md-dialog mock-data-dlg"
    body-class="bg-modal"
    width="1080px"
    title="数据模拟"
    @close="$emit('cancel')"
  >
    <common-detail
      v-if="currentRow"
      count="count-4"
      :detail-opt='detailOpt'
      customClass="dialog-inner-detail">
      <template #accessFrequencyType="{ detail }">
        <span>{{
          detail.accessFrequency > 0 ? '周期型' : '实时型'
        }}</span>
      </template>
      <template #timeScopes="{ detail }">
        <span v-if="typeof detail.timeScopes === 'string'">--</span>
        <template v-else>
          <div v-for="(item, index) in detail.timeScopes" :key="`t-${index}`">
            <span>
              {{item.dateStart}}
            </span>
            <span class="m-r-xs m-l-xs">至</span>
            <span>
              {{item.dateEnd}}
            </span>
            <span class="m-r-md m-l-md"></span>
            <span>
              {{item.timeStart}}
            </span>
            <span class="m-r-xs m-l-xs">至</span>
            <span>
              {{item.timeEnd}}
            </span>
          </div>
        </template>
      </template>
    </common-detail>

    <hl-group align class="w-full m-t-md dialog-inner-panel" gap="var(--lg)" style="min-height: 200px;" full>
      <hl-group align class="static" style="width: 280px;" dir="vertical" gap="var(--lg)" full>
        <hl-panel class="w-full" body-class="display-flex items-left items-top flex-col gap-md mock-date" borderless>
          <template #header>
            <div class="panel-header-left">
            </div>
            <panel-header title="模拟发送记录"/>
            <div class="panel-header-right"></div>
          </template>
          <template #default>
            <hl-group align="items-left" class="w-full" dir="vertical" full>
              <hl-list v-if="list && list.length" hover>
                <hl-list-item v-for="(item, index) in list" :key="index" @click="handleRestoreData(item)">
                  <span :class="item.dataTitle === currentAccessItemId ? 'text-primary' : ''">{{ item.dataTitle }}</span>
                </hl-list-item>
              </hl-list>
              <hb-empty v-else image-size="4vw" description="暂无数据" />
            </hl-group>

          </template>
        </hl-panel>
      </hl-group>

      <hl-group align="items-left items-top" class="w-full" dir="vertical" full>
        <hl-group align="items-left items-top" class="w-full" dir="vertical" gap="var(--sm)">
          <!-- <hl-scrollbar ref="scrollBarRef" class="w-full"> -->
            <hl-form ref="formRef" :model="form" class="w-full" gap="var(--md)">
              <hl-group v-for="(item, index) in form.dataArr" :key="index" class="p-y-sm p-x-md bg-content radius-lg static box-shadow-sm w-full" align="items-between items-middle" gap="var(--lg)">
                <hl-group align="items-left items-middle" gap="var(--lg)">
                  <span class="text-regular" style="width: 44px;">数据值</span>
                  <hl-form-item
                    :prop="'dataArr.' + index + '.dataValue'"
                    :rules="getRules"
                  >
                    <hl-group align="items-left items-middle" gap="var(--xs)">
                      <hl-input v-model="item.dataValue" class="static" placeholder="请输入数值" maxLength="20" style="width: 240px;"></hl-input>
                    </hl-group>
                  </hl-form-item>

                  <span class="text-regular" style="width: 60px;">数据时间</span>
                  <hl-form-item
                    :prop="'dataArr.' + index + '.collectTime'"
                    :rules="[
                      { required: true, message: '数据时间不能为空', trigger: 'blur'},
                      rulePastTime
                    ]"
                  >
                    <hl-group align="items-left items-middle" gap="var(--xs)">
                      <hl-date-picker
                        v-model="item.collectTime"
                        type="datetime" class="static"
                        :placeholder="item.placeholder"
                        value-format="YYYY-MM-DD HH:mm:ss" style="width: 240px;"></hl-date-picker>
                    </hl-group>
                  </hl-form-item>
                </hl-group>
                <hl-icon v-if="form.dataArr.length > 1" size="xs" class="static cursor-pointer" type="danger" @click="handleDelete(index)">
                  <FillCircleMinus></FillCircleMinus>
                </hl-icon>
              </hl-group>
            </hl-form>
          <!-- </hl-scrollbar> -->

          <hl-group
            class="p-x-md radius-lg static w-full user-select-none"
            style="padding-top: 6px; padding-bottom: 6px;"
            :style="(form.dataArr.length < 10) ? '' : 'visibility: hidden;'"
            align="items-center items-middle"
            gap="var(--xxs)">
            <hl-icon size="xs" class="static cursor-pointer" type="primary" @click="handleAdd">
              <TwoPlus></TwoPlus>
            </hl-icon><span class="text-primary cursor-pointer user-select-none" @click="handleAdd" >增加数据值</span>
          </hl-group>
        </hl-group>
      </hl-group>

    </hl-group>

    <template #footer>
      <span class="dialog-footer">
        <hl-button  style="min-width: 80px"  @click="handleReset">重置</hl-button>
        <hl-button
          type="primary"
          class="m-l-md"
          style="min-width: 80px"
          :loading="isLoading"
          @click="handleSend"
        >发送</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';
import { reactive, ref, computed } from 'vue';
import { HlMessage } from 'hongluan-ui';
import { apiFakeDataObj as api } from '@/apis/modules/fake-data';
import { IpostPageSpace } from '@/apis/modules/target-access-item/model';
import { PageDetailOption } from 'fx-front-framework';
import { getSecondsToUnitTime } from '@/common';
import { IgetListMockDatasSpace, IpostMockDataSpace } from '@/apis/modules/fake-data/model';
import { ruleNumber, ruleDatetime, ruleVideoEquipData, rulePastTime } from '@/common/validator';

const props = defineProps<{
  currentRow: IpostPageSpace.List
}>();

const isLoading = ref(false);

const getDataTemplate = () => {
  return {
    accessItemCode: props.currentRow!.accessItemCode,
    dataValue: '',
    collectTime: '',
    placeholder: dayjs().format('YYYY-MM-DD HH:mm:ss')
  };
};

const form = reactive<{
  dataArr: IpostMockDataSpace.Data[]
}>({
  dataArr: [getDataTemplate()]
});

const list = ref();
const currentAccessItemId = ref();
const formRef = ref();
const scrollBarRef = ref();

const detailOpt = reactive({
  title: '接入数据项详情',
  cols: [
    {
      label: '数据项名称',
      key: 'accessItemName',
    },
    {
      label: '数据标识',
      key: 'accessItemCode',
    },
    {
      label: '接入周期类型',
      key: 'accessFrequency',
      slot: 'accessFrequencyType'
    },
    {
      label: '数据频率',
      key: 'accessFrequencyName',
    },
    {
      label: '来源分析',
      key: 'sourceName',
    },
    {
      label: '数据时间区间',
      key: 'timeScopes',
      slot: 'timeScopes',
      span: 'col-span-2'
    }
  ],
  data: props.currentRow,
} as unknown as PageDetailOption);

const emit = defineEmits(['cancel']);

const getRules = computed(() => {
  if (props.currentRow.source !== 'VIDEO_ANALYSIS') {
    return [{
      required: true, message: '数据值不能为空', trigger: 'blur',
    },
    ruleNumber,
    {
      max: 20, message: '长度必须小于20位', trigger: 'blur',
    }];
  } else {
    return [{
      required: true, message: '数据值不能为空', trigger: 'blur',
    },
    ruleVideoEquipData,
    {
      max: 20, message: '长度必须小于20位', trigger: 'blur',
    }];
  }
});

const fetchData = async() => {
  const res = await api.getListMockDatas(
    props.currentRow!.accessItemId,
  );
  list.value = res.data;
};

const handleSend = () => {
  console.log('send', form.dataArr);
  formRef.value.validate(async(isValid: boolean) => {
    if (isValid) {
      isLoading.value = true;
      try {
        await sendData();
        await saveData();
        HlMessage.success('发送模拟数据成功');
        isLoading.value = false;
        currentAccessItemId.value = '';
      } catch (err) {
        console.log(err);
      }
    }
  });
};

const sendData = async() => {
  const dataWrapper = {
    outCode: 'ZDE1Y2ZjZDVlY2E1MDMwYTY=',
    collectTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    dataValues: form.dataArr
  };
  const res = api.postMockData(dataWrapper);
  return res;
};

const saveData = async() => {
  const title = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const res = await api.postAddMockData(
    props.currentRow!.accessItemId,
    title,
    JSON.stringify(form.dataArr)
  );
  fetchData();
  return res;
};

const handleDelete = (index: number) => {
  console.log(index);
  form.dataArr.splice(index, 1);
};

const handleAdd = () => {
  if (form.dataArr.length < 10) {
    form.dataArr.push(getDataTemplate());
    scrollBarRef.value.setScrollTop(999999);
  }
};

const handleReset = () => {
  form.dataArr = [getDataTemplate()];
  formRef.value.clearValidate();
  currentAccessItemId.value = '';
};

const handleRestoreData = (item: IgetListMockDatasSpace.Data) => {
  currentAccessItemId.value = item.dataTitle;
  form.dataArr = JSON.parse(item.dataValue);
  formRef.value.clearValidate();
};

fetchData();

detailOpt.data.accessFrequencyName = detailOpt.data.accessFrequency > 0 ?
  getSecondsToUnitTime(detailOpt.data, 'accessFrequencyUnit', 'accessFrequency') + detailOpt.data.accessFrequencyUnitName :
  '--';

console.log(props.currentRow);
</script>

<style lang="scss">
  .send-button {
    width: 80px;
    height: 80px;
    position: absolute;
    left: 872px;
    bottom: 0px;
    width: 80px !important;
    height: 80px !important;
  }

  .mock-data-dlg {
    .mock-date {
      padding-left: 20px !important;
      padding-right: 20px !important;
    }
    .panel-footer {
      margin-top: 0 !important;
    }
  }
</style>
