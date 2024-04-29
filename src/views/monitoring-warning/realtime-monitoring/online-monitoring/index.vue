<template>
  <div class="table-wrap">
    <hl-group align="items-left items-top" gap="var(--xl)" class="p-b-lg" full>
      <hl-group class="p-y-sm p-x-lg bg-content static" align="items-between items-middle"
        :style="`width: calc(var(--xxs) * 80;`"><span class="text-regular font-bold">共有指标数据项</span>
        <hl-group align="items-left items-middle" gap="var(--xxs)">
          <h3 class="text-primary">{{ statsData.targetDataNum }}</h3>
          <span class="text-secondary">项</span>
        </hl-group>
      </hl-group>
      <hl-group class="p-y-sm p-x-lg bg-content static" align="items-between items-middle"
        :style="`width: calc(var(--xxs) * 140;`">
        <hl-group align="items-middle" gap="var(--md)">
          <div class="text-regular font-bold">计算产生指标数据</div>
          <div style="color:rgba(128, 128, 160, 0.65);">( 注：统计时间截止{{ targetTime }} )</div>
        </hl-group>
        <hl-group align="items-left items-middle" gap="var(--xxs)">
          <h3 class="text-primary">{{ statsData.targetDataResultNum }}</h3>
          <span class="text-secondary">条</span>
        </hl-group>
      </hl-group>
    </hl-group>
    <div class="table-v2">
      <left-right-layout :is-with-header-tab="true">
        <template #left>
          <left-tree @update:EventNode="updateEventNode"></left-tree>
        </template>
        <template #right>
          <right-list :targetNode="targetNode"></right-list>
        </template>
      </left-right-layout>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useLatestTime } from '@/hooks';
import { LeftRightLayout } from '@/components';
import { RightList } from './components';
import LeftTree from '@/views/access-management/indicator-data-access/components/tree.vue';
import { IgetListTargetTreeSpace } from '@/apis/modules/target-type-controller/model';
import { apiRealTimeMonitorObj as api } from '@/apis/modules/realtime-monitor';

defineOptions({
  name: 'OnlineMonitoring'
});

const { targetTime } = useLatestTime();

const targetNode = ref();
const updateEventNode = (eventNode: IgetListTargetTreeSpace.Data) => {
  targetNode.value = eventNode;
};

const statsData = ref({
  targetDataNum: 0,
  targetDataResultNum: 0
});

const getStats = async () => {
  const { data } = await api.getGetTargetDataStats();
  statsData.value = data;
};

getStats();
</script>
<style scoped lang="scss">
.table-wrap {
  width: 100%;
  height: 100%;

  .table-v2 {
    height: calc(100% - 74px);
  }
}
</style>
