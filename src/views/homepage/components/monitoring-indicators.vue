<template>
    <hl-panel class style="height: 166px;" full header-style="gap: 0px;" borderless padding="var(--xl)"
        header-class="p-y-lg p-x-xl bg-content"
        body-class="display-flex items-left items-top flex-row gap-lg p-t-sm p-b-lg p-x-xl bg-content">
        <template #header>
            <div class="panel-header-left">
                <hl-icon class="static" type="primary" size="md">
                    <FillOrnamentTitle4></FillOrnamentTitle4>
                </hl-icon>
            </div>
            <div class="panel-title">
                <h6 class="text-title">指标策略（个）</h6>
            </div>
        </template>
        <template #default>
            <hl-group class="p-sm bg-content w-full" align="items-left items-middle" gap="var(--sm)">
                <hl-icon size="xl" class="static" type="primary">
                    <FillChartDoughnut></FillChartDoughnut>
                </hl-icon>
                <span class="text-regular font-lg font-bold">监测指标</span>
                <h3 class="text-primary">{{ indicators.targetNum }}</h3>
            </hl-group>
            <hl-group class="p-sm bg-content w-full" align="items-left items-middle" gap="var(--sm)">
                <hl-icon size="xl" class="static" type="primary">
                    <FillSetting></FillSetting>
                </hl-icon>
                <span class="text-regular font-lg font-bold">预警策略</span>
                <h3 class="text-primary">{{ indicators.monitorStrategyNum }}</h3>
            </hl-group>
            <hl-group class="p-sm bg-content w-full" align="items-left items-middle" gap="var(--sm)">
                <hl-icon size="xl" class="static" type="primary">
                    <FillLayer></FillLayer>
                </hl-icon>
                <span class="text-regular font-lg font-bold">风险分类</span>
                <h3 class="text-primary">{{ indicators.eventTypeNum }}</h3>
                <span class="text-secondary">类</span>
            </hl-group>
        </template>
    </hl-panel>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { pick } from 'lodash-es';
import { apiHomePageObj } from '@/apis/modules/home-page';
import { IgetMonitorStatisticSpace } from '@/apis/modules/home-page/model';

type Iindicators = Pick<
    IgetMonitorStatisticSpace.Data,
    'targetNum' | 'monitorStrategyNum' | 'eventTypeNum'
>;

const indicators = ref<Iindicators>({
  targetNum: 0,
  monitorStrategyNum: 0,
  eventTypeNum: 0
});

onMounted(async() => {
  const { data } = await apiHomePageObj.getMonitorStatistic();
  indicators.value = pick(data, 'targetNum', 'monitorStrategyNum', 'eventTypeNum');
});
</script>
