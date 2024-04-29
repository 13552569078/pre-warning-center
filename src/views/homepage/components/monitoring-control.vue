<template>
  <hl-panel style="height: 385px" header-style="gap: 0px;" borderless padding="var(--xl)" header-class="p-y-lg p-x-xl bg-content" body-class="display-flex items-left items-top flex-col gap-lg p-t-sm p-b-lg p-x-xl bg-content">
    <template #header>
      <div class="panel-header-left">
        <hl-icon class="static" type="primary" size="md">
          <FillOrnamentTitle4></FillOrnamentTitle4>
        </hl-icon>
      </div>
      <div class="panel-title">
        <h6 class="text-title">监测布控（个）</h6>
      </div>
      <div class="panel-header-right"></div>
    </template>
    <template #default>
      <hl-group full gap="var(--lg)">
        <hl-group align="items-between items-top" class="static" style="width: 240px" gap="var(--lg)" dir="vertical" full>
          <hl-group class="p-md w-full" style="background-color: #f1fafd" align="items-left items-middle" gap="var(--sm)">
            <hl-icon size="xl" class="static" type="primary">
              <FillMonitor2 />
            </hl-icon>
            <hl-group align="items-left items-top" full gap="var(--lg)">
              <hl-group align="items-left items-middle" full gap="var(--sm)">
                <span class="text-regular font-lg font-bold w-full">监测主体类型</span>
                <h3 class="text-primary">{{ controls.monitorRegionTypeNum }}</h3>
                <span class="text-secondary">类</span>
              </hl-group>
            </hl-group>
          </hl-group>
          <hl-group class="p-md w-full" style="background-color: #f1fafd" align="items-left items-middle" gap="var(--sm)" @click="handleGo('subject', controls.monitorRegionNum, { useState: '1' })" :class="controls.monitorRegionNum !== 0 ? 'cursor-pointer' : null">
            <hl-icon size="xl" class="static" type="primary">
              <FillLayer />
            </hl-icon>
            <hl-group align="items-left items-middle" full gap="var(--sm)">
              <span class="text-regular font-lg font-bold w-full">监测主体</span>
              <h3 class="text-primary">{{ controls.monitorRegionNum }}</h3>
              <span class="text-secondary">个</span>
            </hl-group>
          </hl-group>
          <hl-group class="p-md w-full" style="background-color: #f1fafd" align="items-left items-middle" gap="var(--sm)" @click="handleGo('point', controls.monitorUnitNum)" :class="controls.monitorUnitNum !== 0 ? 'cursor-pointer' : null">
            <hl-icon size="xl" class="static" type="primary">
              <FillMap></FillMap>
            </hl-icon>
            <span class="text-regular font-lg font-bold w-full">监测点</span>
            <h3 class="text-primary">{{ controls.monitorUnitNum }}</h3>
            <span class="text-secondary">个</span>
          </hl-group>
        </hl-group>
        <div class="table-scroll" style="height: 280px">
          <hl-simple-table :cols="cols" :data="tableData" border="bordered" fixed-header> </hl-simple-table>
        </div>
      </hl-group>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { pick } from 'lodash-es';
import { apiHomePageObj } from '@/apis/modules/home-page';
import { IgetMonitorStatisticSpace, IgetFindMonitorRegionUnitStatisticSpace } from '@/apis/modules/home-page/model';

type Iindicators = Pick<IgetMonitorStatisticSpace.Data, 'monitorRegionNum' | 'monitorUnitNum' | 'monitorEquipNum' | 'monitorRegionTypeNum'>;

const router = useRouter();

const cols = ref([
  { title: '监测主体类型', prop: 'monitorRegionTypeName' },
  { title: '主体数量 (个)', prop: 'monitorRegionNumber', align: 'center', minWidth: '110px' },
  { title: '监测点 (个)', prop: 'monitorUnitNumber', align: 'center', minWidth: '110px' }
]);
const controls = ref<Iindicators>({
  monitorRegionNum: 0,
  monitorRegionTypeNum: 0,
  monitorUnitNum: 0,
  monitorEquipNum: 0
});
const tableData = ref<IgetFindMonitorRegionUnitStatisticSpace.Data[]>([]);

const handleGo = (pageName: string, detailNum: number, query?: { [key: string]: string }) => {
  if (!detailNum) return;
  router.push({
    name: pageName,
    query
  });
};
const getData = async () => {
  // 统计
  const { data } = await apiHomePageObj.getMonitorStatistic();
  controls.value = pick(data, 'monitorRegionNum', 'monitorUnitNum', 'monitorEquipNum', 'monitorRegionTypeNum');
  // 列表数据
  const { data: dataTable } = await apiHomePageObj.getFindMonitorRegionUnitStatistic();
  tableData.value = dataTable;
};

getData();
</script>
