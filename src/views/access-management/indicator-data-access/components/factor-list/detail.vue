<template>
  <teleport to="#pageAction" v-if="showTeleport">
    <hl-button @click="$router.go(-1)">返回</hl-button>
  </teleport>
  <div class="factor-detail-page">
    <CommonDetail :detail-opt='detailOpt'>
    <template #targetFrequency="{ detail }">
      {{ `${detail.targetFrequency}${detail.targetFrequencyUnitName}` }}
    </template>
    <template #periodTypeName="{ detail }">
      {{ detail.targetFrequency === 0 ? '实时计算' : '周期计算' }}
    </template>
    <template #sholdValue="{ detail }">
      {{ detail.thresholdValue === 1 ? '开启' : '关闭' }}
    </template>
    <!-- <template #thresholdLevelVOList="{ detail }">
      <div class="text-regular font-md font-bold group-item"
        v-if="detail.thresholdLevelVOList && detail.thresholdLevelVOList !== '--' && detail.thresholdLevelVOList.length">
        <span v-for="(item, index) in detail.thresholdLevelVOList" :key="index">
          {{ item.thresholdLevelName }}&emsp;{{ item.thresholdLevelValue }}；
        </span>
      </div>
      <div v-else>--</div>
    </template> -->
  </CommonDetail>
  <CommonDetail :detail-opt='scopesList'>
    <template #scopesData="{ detail }">
      <hl-simple-table class="w-full" :cols="scopescols" :data="detail.timeScopes" :border="'bordered'">
        <template #tableIndex="{ rowIndex }">
          <span>{{ rowIndex + 1 }}</span>
        </template>

        <template #timeScopes="{ row }">
          <hl-group>
            <span>
              {{ row.dateStart }}
            </span>
            <span class="m-r-xs m-l-xs">至</span>

            <span>
              {{ row.dateEnd }}
            </span>
            <span class="m-r-md m-l-md"></span>
            <span>
              {{ row.timeStart }}
            </span>
            <span class="m-r-xs m-l-xs">至</span>
            <span>
              {{ row.timeEnd }}
            </span>
          </hl-group>
        </template>
      </hl-simple-table>
    </template>
  </CommonDetail>
  <CommonDetail v-if="Array.isArray(dataZoneList.data.thresholdLevelVOList)" :detail-opt='dataZoneList'>
    <template #timeZone="{ detail }">
      <hl-simple-table class="w-full" :cols="dataZoneCols" :data="detail.thresholdLevelVOList" :border="'bordered'">
        <template #tableIndex="{ rowIndex }">
          <span>{{ rowIndex + 1 }}</span>
        </template>
        <!-- <template #lowSholdValue="{ row }">
          <hl-group>
            <span>
              {{ EXPRESSIONS_NAMES[row.lowExpression] }}
            </span>
            <span class="m-r-xs m-l-xs"></span>
            <span>
              {{ row.lowValue }}
            </span>
          </hl-group>
        </template>
        <template #upSholdValue="{ row }">
          <hl-group>
            <span>
              {{ EXPRESSIONS_NAMES[row.upExpression] }}
            </span>
            <span class="m-r-xs m-l-xs"></span>
            <span>
              {{ row.upValue }}
            </span>
          </hl-group>
        </template> -->
      </hl-simple-table>
    </template>
  </CommonDetail>
  <CommonDetail v-if="detailOpt.data.isMultiple" :detail-opt='refList'>
    <template #referTargetData="{ detail }">
      <hl-simple-table class="w-full" :cols="cols" :data="detail.referTargetData" :border="'bordered'">
        <template #tableIndex="{ rowIndex }">
          <span>{{ rowIndex + 1 }}</span>
        </template>
      </hl-simple-table>
    </template>
  </CommonDetail>
  <CommonDetail v-else :detail-opt='itemList'>
    <template #referAccessItem="{ detail }">
      <hl-simple-table class="w-full" :cols="itemCols" :data="detail.referAccessItem" :border="'bordered'">
        <template #tableIndex="{ rowIndex }">
          <span>{{ rowIndex + 1 }}</span>
        </template>
      </hl-simple-table>
    </template>
  </CommonDetail>
  </div>
  <hl-affix position="bottom" :offset="0">
    <hl-group align="items-middle" class="affix-bottom w-full box-shadow-lg p-lg">
      <hl-button @click="$router.go(-1)">返回</hl-button>
    </hl-group>
  </hl-affix>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useTele, FxPageDetail, PageDetailOption } from 'fx-front-framework';
import { Indexable } from 'fx-front-utils';
import { apiTargetDataObj } from '@/apis/modules/target-data-access';

import { UNIT_TIME_LIST, getSecondsToUnitTime, EXPRESSIONS_NAMES } from '@/common';

const router = useRouter();
const route = useRoute();
const { showTeleport } = useTele();
const detailOpt = reactive({
  cols: [
    {
      label: '指标数据项名称',
      key: 'targetDataName',
      slot: '', // 可以定义插槽
    },
    {
      label: '指标',
      key: 'targetName',
      slot: '', // 可以定义插槽
    },
    {
      label: '指标分类',
      key: 'targetTypeName',
    },
    {
      label: '计算公式',
      key: 'formulaName',
    },
    {
      label: '计算周期类型',
      key: 'computePeriodTypeName',
    },
    {
      label: '数据频率',
      key: 'targetFrequencyName',
    },
    {
      label: '数据类型',
      key: 'dataTypeName',
    },
    {
      label: '计量单位',
      key: 'measureUnitName',
    },
    {
      label: '启用时间',
      key: 'initCollectTime',
      slot: '', // 可以定义插槽
    },
    {
      label: '更新时间',
      key: 'updatedAt',
    },
    {
      label: '描述',
      key: 'targetDataDesc',
    },
    /* {
      label: '阈值等级',
      key: 'thresholdLevelVOList',
      slot: 'thresholdLevelVOList'
    }, */
  ],
  data: {} as Indexable<string>,
} as unknown as PageDetailOption);

const refList = reactive({
  cols: [
    {
      label: '',
      key: 'targetDesc',
      slot: 'referTargetData',
      span: 'col-span-12',
    },
  ],
  data: {} as Indexable<string>,
} as unknown as PageDetailOption);

const itemList = reactive({
  cols: [
    {
      label: '',
      key: 'targetDesc',
      slot: 'referAccessItem',
      span: 'col-span-12',
    },
  ],
  data: {} as Indexable<string>,
} as unknown as PageDetailOption);

const telId = computed(() => route.query.id);

const scopesList = reactive({
  cols: [
    {
      label: '',
      key: 'timeScopes',
      slot: 'scopesData',
      span: 'col-span-12',
    },
  ],
  data: {} as Indexable<string>,
} as unknown as PageDetailOption);

const cols = [
  {
    title: '',
    slotName: 'tableIndex',
    width: 'fit-content',
  },
  { title: '指标数据项名称', prop: 'targetDataName' },
  { title: '数据类型', prop: 'dataTypeName' },
  { title: '数据频率', prop: 'targetFrequencyName' },
  { title: '启用时间', prop: 'initCollectTime' },
];

const itemCols = computed(() => {
  if (detailOpt.data.isMultiple === 1) {
    return [
      {
        title: '',
        slotName: 'tableIndex',
        width: 'fit-content',
      },
      { title: '接入数据项名称', prop: 'accessItemName' },
      { title: '数据类型', prop: 'dataTypeName' },
      { title: '数据频率', prop: 'targetFrequencyName' },
      { title: '接入数据项标识', prop: 'accessItemCode' },
    ];
  } else {
    return [
      {
        title: '',
        slotName: 'tableIndex',
        width: 'fit-content',
      },
      { title: '接入数据项名称', prop: 'accessItemName' },
      { title: '来源类型', prop: 'sourceName' },
      { title: '数据频率', prop: 'targetFrequencyName' },
      { title: '接入数据项标识', prop: 'accessItemCode' },
    ];
  }
});

const scopescols = [
  {
    title: '',
    slotName: 'tableIndex',
    width: 'fit-content',
  },
  { title: '数据时间区间', slotName: 'timeScopes' },
];

const dataZoneList = reactive({
  cols: [
    {
      span: 'col-span-12',
      label: '',
      key: 'timeZone',
      slot: 'timeZone', // 可以定义插槽
    },
  ],
  data: {} as Indexable<string>,
} as unknown as PageDetailOption);

const dataZoneCols = [
  {
    title: '',
    slotName: 'tableIndex',
    width: 'fit-content',
    align: 'center'
  },
  { title: '等级名称', prop: 'thresholdLevelName' },
  { title: '阈值', prop: 'thresholdLevelValue' },
];

onMounted(async () => {
  const { data } = await apiTargetDataObj.getDetail(telId.value as string);
  detailOpt.title = data.targetDataName;

  detailOpt.data = data as Indexable<any>;
  detailOpt.data.targetFrequencyName =
    detailOpt.data.targetFrequency > 0
      ? getSecondsToUnitTime(
        detailOpt.data,
        'targetFrequencyUnit',
        'targetFrequency'
      ) + detailOpt.data.targetFrequencyUnitName
      : '--';
  refList.data = data as Indexable<any>;
  refList.title = '引用指标';
  if (refList.data?.referTargetData?.length) {
    refList.data.referTargetData.forEach(e => {
      e.targetFrequencyName = e.targetFrequency > 0
        ? getSecondsToUnitTime(
          e,
          'targetFrequencyUnit',
          'targetFrequency'
        ) + e.targetFrequencyUnitName
        : '--';
    });
  }
  itemList.data = data as Indexable<any>;
  itemList.title = '接入数据项';
  if (itemList.data?.referAccessItem) {
    itemList.data.referAccessItem = [
      itemList.data.referAccessItem
    ];
    itemList.data.referAccessItem.forEach(e => {
      e.targetFrequencyName = e.targetFrequency > 0
        ? getSecondsToUnitTime(
          e,
          'targetFrequencyUnit',
          'targetFrequency'
        ) + e.targetFrequencyUnitName
        : '--';
    });
  }
  scopesList.data = data as Indexable<any>;
  scopesList.title = '数据时间区间';
  dataZoneList.title = '阈值等级';
  dataZoneList.data = data as Indexable<any>;
  if (dataZoneList.data.dataType === 'INTERZONE') {
    if (dataZoneList.data.thresholdValue && dataZoneList.data.thresholdValue.length) {
      // dataZoneList.data.thresholdValue = JSON.parse(dataZoneList.data.thresholdValue);
    } else {
      dataZoneList.data.thresholdValue = '';
    }
  } else if (dataZoneList.data.dataType === 'SWITCH') {
    detailOpt.cols.push(
      {
        label: '阈值',
        key: '',
        slot: 'sholdValue',

      });
    detailOpt.data.thresholdValue = +detailOpt.data.thresholdValue;
  }
});
</script>
<style lang="scss">
.factor-detail-page {
  margin-bottom: 40px;
  .hl-panel.borderless > .panel-header + .panel-body {
    padding: 0 !important;
    .hl-col {
      width: 600px !important;
      flex: none;
    }
  }
  .hl-row.m-t-lg {
    height: 0 !important;
    padding: 0 !important;
  }
  .panel-body {
    margin-bottom: -20px;
  }
}
</style>
