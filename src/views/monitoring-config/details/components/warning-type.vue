<template>
  <hl-panel radius="0px" class="content w-full" borderless padding="var(--xl)" header-class="bg-content" body-padding="var(--xxl)" body-class="display-flex items-left items-top flex-row content" footer-style>
    <template #header>
      <panel-header title="预警方式"></panel-header>
    </template>
    <template #default>
      <hl-row layout="grid" class="w-full w-60 p-l-xxl m-t-lg" count="count-2" gap="var(--lg)">
        <hl-col span="col col-span-2">
          <hl-group align="items-left items-top" class="static" gap="var(--xl)">
            <span class="text-secondary static">消警方式:</span>
            <hl-group align="items-left items-top" class="w-full" gap="var(--xxs)">
              <template v-if="detail?.clearType === 1">
                <div class="text-regular font-bold">立即消警</div>
              </template>
              <template v-if="detail?.clearType === 2">
                <div class="text-regular font-bold">规则(数据)消警</div>
              </template>
            </hl-group>
          </hl-group>
        </hl-col>
      </hl-row>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref, PropType, onMounted } from 'vue';
import { apiDictObj as dictApi } from '@/apis/modules/dict-api';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import type { IdetailsMode } from '../types';

defineProps({
  detail: Object as PropType<IdetailsMode>
});

const frequencyUnits = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);

onMounted(async () => {
  const units = await dictApi.list('MONITOR_FREQUENCY_UNIT');
  frequencyUnits.value = units.data;
});
</script>
