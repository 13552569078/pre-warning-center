<template>
  <hl-dialog :model-value="true" class="md-dialog" body-class="bg-modal not-footer-dialog" width="618px" title="接入数据项详情" @close="$emit('close')" :close-on-click-modal="false">
    <hl-group dir="vertical" full class="h-full">
      <CommonDetail :detail-opt="detailOpt" count="count-2" customBodyClass="dialog-inner-panel"
      customClass="dialog-inner-detail">
        <template #periodTypeName="{ detail }">
          {{ detail.accessFrequency === 0 ? '实时计算' : '周期计算' }}
        </template>
      </CommonDetail>
      <CommonDetail v-if="scopesList.data.timeScopes && scopesList.data.timeScopes.length > 0" :detail-opt="scopesList" customBodyClass="dialog-inner-panel"
      customClass="dialog-inner-detail">
        <template #scopesData="{ detail }">
          <hl-simple-table class="w-full" :cols="cols" :data="detail.timeScopes" :border="'bordered'">
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
    </hl-group>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { onMounted, computed, reactive } from 'vue';
import { PageDetailOption } from 'fx-front-framework';
import { Indexable } from 'fx-front-utils';
import { apiAccessItemObj } from '@/apis/modules/target-access-item';
import { getSecondsToUnitTime } from '@/common';

const props = defineProps({
  id: String
});

const detailOpt = reactive({
  cols: [
    {
      label: '数据项名称',
      key: 'accessItemName',
      slot: '' // 可以定义插槽
    },
    {
      label: '接入源',
      key: 'accessSourceName'
    },
    {
      label: '接入对象',
      key: 'accessSourceObjectName'
    },
    {
      label: '接入周期类型',
      key: 'periodTypeName',
      slot: 'periodTypeName'
    },
    {
      label: '数据频率',
      key: 'accessFrequencyName'
      // slot: 'accessFrequency',
    },
    {
      label: '数据标识',
      key: 'accessItemCode'
    },
    {
      label: '更新时间',
      key: 'updatedAt'
    },
    {
      label: '监测设备',
      key: 'equipName'
    },
    {
      label: '数据来源',
      key: 'equipName'
    },
    {
      label: '来源类型',
      key: 'sourceName'
    },
    {
      label: '描述',
      key: 'accessItemDesc',
      span: 'col-span-2'
    }
  ],
  data: {} as Indexable<string>
} as unknown as PageDetailOption);

const scopesList = reactive({
  cols: [
    {
      label: '',
      key: 'timeScopes',
      slot: 'scopesData',
      span: 'col-span-12'
    }
  ],
  data: {} as Indexable<string>
} as unknown as PageDetailOption);

const telId = computed(() => props.id);

const cols = [
  {
    title: '',
    slotName: 'tableIndex',
    width: 'fit-content'
  },
  { title: '数据时间区间', slotName: 'timeScopes' }
];

onMounted(async () => {
  const { data } = await apiAccessItemObj.getDetail(telId.value as string);
  detailOpt.title = data.accessItemName;
  detailOpt.data = data as Indexable<any>;
  detailOpt.data.accessFrequencyName = detailOpt.data.accessFrequency > 0 ? getSecondsToUnitTime(detailOpt.data, 'accessFrequencyUnit', 'accessFrequency') + detailOpt.data.accessFrequencyUnitName : '--';
  scopesList.data = data as Indexable<any>;
  scopesList.title = '数据时间区间';
});
</script>
