<template>
  <div class="table-wrap">
    <hl-group align="items-left items-top" gap="var(--xl)" class="p-b-lg" full>
      <hl-group class="p-y-sm p-x-lg bg-content static" align="items-between items-middle" style="width: 282px"><span
          class="text-regular font-bold">共有接入数据项</span>
        <hl-group align="items-left items-middle" gap="var(--xxs)">
          <h3 class="text-primary">{{ statsData.accessItemNum }}</h3>
          <span class="text-secondary">项</span>
        </hl-group>
      </hl-group>
      <hl-group class="p-y-sm p-x-lg bg-content static" align="items-between items-middle" style="width: 500px">
        <hl-group align="items-middle" gap="var(--md)">
          <div class="text-regular font-bold">共接入数据</div>
          <div style="color:rgba(128, 128, 160, 0.65);">( 注：统计时间截止{{ dataAccessTime }} )</div>
        </hl-group>
        <hl-group align="items-left items-middle" gap="var(--xxs)">
          <h3 class="text-primary">{{ statsData.accessItemDataNum }}</h3>
          <span class="text-secondary">条</span>
        </hl-group>
      </hl-group>
    </hl-group>
    <right-list :current-node="currentNode"></right-list>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useLatestTime } from '@/hooks';
import { IgetListMonitorEventTreesSpace } from '@/apis/modules/access-data/model';
import { RightList } from './components';
import { apiRealTimeMonitorObj as api } from '@/apis/modules/realtime-monitor';

const { dataAccessTime } = useLatestTime();

defineOptions({
  name: 'MonitoringControl'
});

const currentNode = ref();
const statsData = ref({
  accessItemNum: 0,
  accessItemDataNum: 0
});

const getStats = async () => {
  const { data } = await api.getGetAccessItemStats();
  statsData.value = data;
};

onMounted(() => {
  getStats();
});
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
