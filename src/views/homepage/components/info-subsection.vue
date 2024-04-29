<template>
  <hl-panel class full style="height: 222px" header-style="gap: 0px;" borderless padding="var(--xl)"
    header-class="p-y-lg p-x-xl bg-content"
    body-class="display-flex items-left items-top flex-row gap-sm p-t-sm p-x-xl bg-content"
    body-style="padding-bottom: 32px;">
    <template #header>
      <div class="panel-header-left">
        <hl-icon class="static" type="primary" size="md">
          <FillOrnamentTitle4></FillOrnamentTitle4>
        </hl-icon>
      </div>
      <div class="panel-title">
        <h6 class="text-title">预警信息分阶段统计（条）</h6>
      </div>
    </template>
    <template #default>
      <hl-group align="items-left" class="w-full" dir="vertical" gap="var(--sm)" full>
        <hl-group class="p-y-sm p-x-lg w-full cursor-pointer" style="background-color: #f1fafd"
          align="items-between items-middle" @click="warning(1)">
          <span class="text-regular font-bold">预警策略产生</span>
          <hl-group align="items-left items-middle" gap="var(--xxs)">
            <h3 class="text-primary">{{ subsection.strategyProduceNumber }}</h3>
          </hl-group>
        </hl-group>
        <hl-group class="p-y-sm p-x-lg w-full" style="background-color: #f1fafd" align="items-between items-middle">
          <span class="text-regular font-bold">第三方接入</span>
          <hl-group align="items-right items-middle" gap="var(--xxs)">
            <h3 class="text-success">{{ subsection.thirdProduceNumber }}</h3>
          </hl-group>
        </hl-group>
      </hl-group>
      <hl-group align="items-left" class="w-full" dir="vertical" gap="var(--sm)" full>
        <hl-group class="p-y-sm p-x-lg w-full cursor-pointer" style="background-color: #f1fafd"
          align="items-between items-middle" @click="warning(2)">
          <span class="text-regular font-bold">待研判</span>
          <hl-group align="items-left items-middle" gap="var(--xxs)">
            <h3 class="text-danger">{{ subsection.unJudgeNumber }}</h3>
          </hl-group>
        </hl-group>
        <hl-group class="p-y-sm p-x-lg w-full cursor-pointer" style="background-color: #f1fafd"
          align="items-between items-middle" @click="warning(3)">
          <span class="text-regular font-bold">已研判</span>
          <hl-group align="items-right items-middle" gap="var(--xxs)">
            <h3 class="text-warning">{{ subsection.judgedNumber }}</h3>
          </hl-group>
        </hl-group>
      </hl-group>
      <hl-group class="p-y-sm p-x-lg w-full cursor-pointer" style="background-color: #f1fafd"
        align="items-between items-middle" @click="warning(4)">
        <div class="text-regular font-bold static">发送事件中心处置</div>
        <hl-group align="items-left items-middle" gap="var(--xxs)">
          <h3 class="text-info">{{ subsection.eventCenterDealNumber }}</h3>
        </hl-group>
      </hl-group>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { apiHomePageObj } from '@/apis/modules/home-page';
import { useRouter } from 'vue-router';

const router = useRouter();

const subsection = ref({
  strategyProduceNumber: 0,
  thirdProduceNumber: 0,
  unJudgeNumber: 0,
  judgedNumber: 0,
  eventCenterDealNumber: 0
});

const warning = (type: number) => {
  if (type === 1) {
    router.push({ path: '/monitoring-alarm/alarm-management/historical-alarm' });
  } else if (type === 2) {
    router.push({ name: 'AlarmJudgment', query: { judgeStatus: 0 } });
  } else if (type === 3) {
    router.push({ name: 'AlarmJudgment', query: { judgeStatus: 1 } });
  } else if (type === 4) {
    router.push({ path: '/monitoring-alarm/alarm-management/historical-alarm' });
  }
};

onMounted(async () => {
  const { data } = await apiHomePageObj.getFindAlarmStageStatistics();
  subsection.value = data;
});
</script>
