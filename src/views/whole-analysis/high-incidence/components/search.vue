<template>
  <hl-group class="p-lg bg-content" style="border-left: 4px solid #78A0C1;" align="items-left" dir="vertical"
    gap="var(--sm)" full>
    <hl-form class="w-full" :model="searchForm" inline gap="var(--xl)" item-gap="var(--sm)">
      <hl-group align="items-left items-top" gap="var(--lg)" item-gap="var(--lg2)" :width="['56px', '']">
        <hl-form-item label="预警时间">
          <hl-group align="items-left items-top">
            <hl-date-picker type="datetimerange" class="static" style="width: 380px;" start-placeholder="选择开始时间"
              v-model="searchForm.searchTime" range-separator="至" end-placeholder="选结束时间" :value-format="dateFormat"
              :clearable="false" @change="changeTime"></hl-date-picker>
          </hl-group>
        </hl-form-item>
        <hl-form-item :label="`${$t('warningType')}`">
          <div class="w-xxl">
            <search-risk-type-check @risk-changed="riskChanged" :placeholder="`请选择${$t('warningType')}`"
              ref="searchRiskRef" />
          </div>
        </hl-form-item>
        <hl-form-item label="预警来源" style="height: 32px;">
          <hl-group style="width: 350px;display: flex; align-items: center;">
            <hl-checkbox-group v-model="searchForm.alarmOriginList" gap="var(--xl)">
              <hl-checkbox v-for="item in alarmOriginData" :key="item.dictCode" :label="item.dictCode">{{ item.dictName }}
              </hl-checkbox>
            </hl-checkbox-group>
          </hl-group>
        </hl-form-item>
      </hl-group>
      <hl-form-item>
        <hl-group align="items-left items-middle" gap="var(--md)">
          <hl-button class="static" @click="resest">重置</hl-button>
          <hl-button class="static" type="primary" @click="search">查询分析</hl-button>
        </hl-group>
      </hl-form-item>
    </hl-form>
  </hl-group>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { dayjs, HlMessage } from 'hongluan-ui';
import { apiDictObj as dictApi } from '@/apis/modules/dict-api';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { dateFormat } from '@/common';
import { SearchRiskTypeCheck } from '@/components';

const emit = defineEmits(['searchSubmit']);

const searchForm = reactive({
  eventTypeCodeList: [],
  alarmOriginList: [],
  searchTime: [] as string[]
});
const alarmOriginData = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const searchRiskRef = ref();

const changeTime = () => {
  const dayDiff = dayjs(searchForm.searchTime[1]).diff(searchForm.searchTime[0], 'days');
  if (dayDiff > 360) {
    HlMessage({
      message: `选择时间跨度不得超过360天!,目前跨度【${dayDiff}】天`,
    });
  }
  return dayDiff > 360;
};
const resest = () => {
  searchForm.alarmOriginList = [];
  searchForm.eventTypeCodeList = [];
  initTime();
  searchRiskRef.value.reset();
};
const riskChanged = (data: string[]) => {
  (searchForm.eventTypeCodeList as string[]) = data;
};
const search = () => {
  // 日期不允许超出360
  if (changeTime()) return false;
  const params = {
    alarmOriginList: searchForm.alarmOriginList,
    eventTypeCodeList: searchForm.eventTypeCodeList,
    startTime: Array.isArray(searchForm.searchTime) ? searchForm.searchTime[0] : '',
    endTime: Array.isArray(searchForm.searchTime) ? searchForm.searchTime[1] : ''
  };
  emit('searchSubmit', params);
};
const initTime = () => {
  // 开始时间 前推2月的第一天 至今
  const startTime = dayjs().subtract(2, 'month').startOf('month').format(dateFormat);
  const endTime = dayjs().format(dateFormat);
  searchForm.searchTime = [startTime, endTime];
};
const getOriginList = async() => {
  const { data } = await dictApi.list('ALARM_ORIGIN');
  alarmOriginData.value = data;
};

onMounted(() => {
  initTime();
  getOriginList();
  search();
});
</script>
