<template>
  <hl-dialog
    :model-value="true"
    class="md-dialog"
    body-class="bg-modal"
    header-class="custom-dialog-header"
    width="618px"
    title="指标详情"
    @close="$emit('close')"
    :close-on-click-modal="false"
  >
    <hl-group dir="vertical" gap="var(--lg)" full>
      <CommonDetail :detail-opt='detailOpt' count="count-3" customBodyClass="dialog-inner-panel" customClass="dialog-inner-detail">
        <template #targetFrequency="{ detail }">
          {{`${detail.targetFrequency}${detail.targetFrequencyUnitName}`}}
        </template>
        <template #sholdValue="{ detail }">
          <span class="text-regular font-md font-bold group-item">{{ detail.thresholdValue === 1 ? '开启' : '关闭'}}</span>
        </template>
      </CommonDetail>

      <CommonDetail
        v-if="Array.isArray(dataZoneList.data.thresholdLevelVOList) && dataZoneList.data.dataType === 'INTERZONE'"
        :detail-opt='dataZoneList'
        count="count-1"
        customBodyClass="dialog-inner-panel"
        customClass="dialog-inner-detail"
      >
        <template #timeZone="{ detail }">
          <hl-simple-table
            class="w-full"
            :cols="cols"
            :data="detail.thresholdLevelVOList"
            :border="'bordered'"
          >
              <template #tableIndex="{ rowIndex }">
              <span>{{ rowIndex + 1 }}</span>
            </template>
            <!-- <template #lowSholdValue="{ row }">
              <hl-group>
                <span>
                  {{EXPRESSIONS_NAMES[row.lowExpression]}}
                </span>
                <span class="m-r-xs m-l-xs"></span>
                <span>
                  {{row.lowValue}}
                </span>
              </hl-group>
            </template>
            <template #upSholdValue="{ row }">
              <hl-group>
                <span>
                  {{EXPRESSIONS_NAMES[row.upExpression]}}
                </span>
                <span class="m-r-xs m-l-xs"></span>
                <span>
                  {{row.upValue}}
                </span>
              </hl-group>
            </template> -->
          </hl-simple-table>
        </template>
      </CommonDetail>
    </hl-group>

  </hl-dialog>
</template>
<script lang="ts" setup>

import { onMounted, computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { PageDetailOption } from 'fx-front-framework';
import { Indexable } from 'fx-front-utils';
import { getSecondsToUnitTime, EXPRESSIONS_NAMES } from '@/common';
import { apiTargetInfoControllerObj } from '@/apis/modules/target-info-controller';

const props = defineProps({
  id: {
    type: String
  }
});

const route = useRoute();
const detailOpt = reactive({
  cols: [
    {
      label: '监测指标',
      key: 'targetName',
      slot: '', // 可以定义插槽
    },
    {
      label: '所属分组',
      key: 'targetTypeName',
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
      label: '计算周期类型',
      key: 'periodTypeName',
    },
    {
      label: '数据频率',
      key: 'targetFrequencyName',
    },
    {
      label: '描述',
      key: 'targetDesc',
      span: 'col-span-3'
    },
  ],
  data: {} as Indexable<string>,
} as unknown as PageDetailOption);

const dataZoneList = reactive({
  cols: [
    {
      label: '',
      key: 'timeZone',
      slot: 'timeZone', // 可以定义插槽
    },
  ],
  data: {} as Indexable<string>,
} as unknown as PageDetailOption);

const cols = [
  {
    title: '',
    slotName: 'tableIndex',
    width: 'fit-content',
    align: 'center'
  },
  { title: '等级名称', prop: 'thresholdLevelName' },
  { title: '阈值', prop: 'thresholdLevelValue' },
];

const telId = computed(() => props.id);

onMounted(async() => {
  const { data } = await apiTargetInfoControllerObj.getFindTargetInfo(
    telId.value as string
  );
  detailOpt.title = data.targetName;
  detailOpt.data = data as Indexable<any>;
  detailOpt.data.targetFrequencyName = +detailOpt.data.targetFrequency > 0 ? getSecondsToUnitTime(detailOpt.data, 'targetFrequencyUnitCode', 'targetFrequency') + detailOpt.data.targetFrequencyUnitName : '--';
  dataZoneList.title = '阈值等级';
  dataZoneList.data = data as Indexable<any>;
  if (dataZoneList.data.dataType === 'INTERZONE') {
    // dataZoneList.data.thresholdValue = JSON.parse(dataZoneList.data.thresholdValue);
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
