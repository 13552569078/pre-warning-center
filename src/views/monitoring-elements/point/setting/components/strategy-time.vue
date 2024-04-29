<template>
  <hl-dialog v-model="dialogVisible" title="调整执行时间" width="600px" @close="handleClose" body-class="bg-modal" style="--bg-light: #ffffff">
    <hl-panel v-if="dialogVisible">
      <hl-form :width="['150px', 'col']" :label-position="['items-left', 'items-middle']" item-gap="var(--md)">
        <hl-form-item label="调整后的执行时间:">
          <hl-date-picker v-model="executionTime" type="datetime" class="static" style="width: 220px" placeholder="请选择时间" value-format="YYYY-MM-DD HH:mm:ss"></hl-date-picker>
        </hl-form-item>
      </hl-form>
      <hl-group align="items-middle" class="w-full m-t-lg">
        <div class="panel-header-left">
          <hl-icon class="static" type="primary" size="md">
            <FillOrnamentTitle4 />
          </hl-icon>
        </div>
        <div class="panel-title">
          <h4 class="text-title w-full">调整执行时间记录</h4>
        </div>
      </hl-group>
      <hl-scrollbar style="height: 300px">
        <hl-simple-table class="w-full m-t-md" :cols="cols" :data="historyList" border="bordered" stripe fixed-header>
          <template #tableIndex="{ rowIndex }">
            <span>{{ rowIndex + 1 }}</span>
          </template>
        </hl-simple-table>
      </hl-scrollbar>
    </hl-panel>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="handleClose">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="ok">调 整</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { dayjs } from 'hongluan-ui';
import { useRoute } from 'vue-router';
import { HlMessage } from 'hongluan-ui';
import { apiMonitorPointObj as api } from '@/apis/modules/monitor-unit/index';
import { IgetListStrategyTaskModifyLogSpace } from '@/apis/modules/monitor-unit/model';
import { ref, reactive, onMounted, nextTick, watch, computed } from 'vue';

const emits = defineEmits(['changeTimeSubmit']);

const route = useRoute();
const pointId = route.query.pointId as string;

const dialogVisible = ref(false);
const executionTime = ref('');
const strategyId = ref<string>('');
const historyList = ref<IgetListStrategyTaskModifyLogSpace.Data[]>([]);

const cols = [
  {
    title: '',
    width: 'fit-content',
    align: 'left',
    slotName: 'tableIndex',
    fixed: 'left'
  },
  { title: '调整后的执行时间', prop: 'taskTime' },
  { title: '操作时间', prop: 'operateTime' }
];

const handleClose = () => {
  dialogVisible.value = false;
};

const ok = async () => {
  if (!executionTime.value) {
    HlMessage.warning('调整时间不为空');
    return;
  }
  await api.getModifyStrategyTaskTime(strategyId.value, pointId, executionTime.value);
  HlMessage.success('调整时间成功');
  dialogVisible.value = false;
  emits('changeTimeSubmit');
};

const showChangeTimeDialog = async (id: string) => {
  strategyId.value = id;
  dialogVisible.value = true;
  executionTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const { data } = await api.getListStrategyTaskModifyLog(strategyId.value);
  historyList.value = data;
};

defineExpose({
  showChangeTimeDialog
});
</script>
