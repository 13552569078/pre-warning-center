<template>
  <hl-group align class="w-full m-t-md p-r-lg" dir="vertical" full gap="var(--md)">
    <hl-group
      v-for="(item, index) in data"
      :key="item.targetDataName"
      align="items-left items-top" dir="vertical" gap="var(--sm)">
      <hl-group class="bg-content static" align="items-left items-middle" full="full-x">
        <hl-icon class="static" type="primary" size="md">
          <FillOrnamentTitle4></FillOrnamentTitle4>
        </hl-icon>
        <h6 class="text-title">{{ `指标${index + 1}: ${item.targetDataName}` }}</h6>
      </hl-group>
      <hl-simple-table
        :cols="cols"
        :data="item.dataList"
        border="bordered"
        class="m-b-lg"
        size="sm"
      >
        <template #tableIndex="{ rowIndex }">
          <span>{{ rowIndex + 1 }}</span>
        </template>
      </hl-simple-table>
    </hl-group>
  </hl-group>

</template>
<script lang='ts' setup>
import { IgetFindAlarmTargetDataListSpace } from '@/apis/modules/alarm-manage/model';

const props = defineProps<{
  data: IgetFindAlarmTargetDataListSpace.Data[]
}>();

const cols = [
  { title: '', slotName: 'tableIndex', width: 'fit-content', },
  { title: '指标时间', prop: 'collectTime' },
  { title: '指标值', prop: 'dataValue', width: '126px' },
];
</script>
