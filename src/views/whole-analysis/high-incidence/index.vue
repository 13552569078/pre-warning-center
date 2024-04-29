<template>
  <high-search @searchSubmit="search"/>
  <hl-panel class="w-full  solid border-regular m-t-lg" header-style="gap: 0px;" borderless
    style="--panel-header-height: 64px;" padding="var(--lg)" header-class="bg-content"
    body-class="display-flex items-center items-middle flex-col gap-lg p-t-sm p-b-lg p-x-xl bg-content">
    <template #header>
      <div class="panel-header-left">
        <hl-icon class="static" type="primary" size="md">
          <FillOrnamentTitle4></FillOrnamentTitle4>
        </hl-icon>
      </div>
      <div class="panel-title">
        <h6 class="text-title">预警时间高发分析</h6>
      </div>
      <hl-group align="items-left items-middle" gap="var(--xs)">
        <hl-button equal  :type="timeType === 'echarts' ? 'primary' : null" @click="changeTimeType('echarts')">
          <template #icon>
            <hl-icon>
              <TwoChartPie></TwoChartPie>
            </hl-icon>
          </template>
        </hl-button>
        <hl-button equal  :type="timeType === 'table' ? 'primary' : null" @click="changeTimeType('table')">
          <template #icon>
            <hl-icon>
              <TwoAlignJustify></TwoAlignJustify>
            </hl-icon>
          </template>
        </hl-button>
      </hl-group>
    </template>
    <template #default>
      <warning-time :cardType='timeType' ref="timeRef"/>
    </template>
  </hl-panel>
  <hl-group class="p-b-md  solid border-regular w-full m-t-lg" align gap="var(--lg)" full>
    <hl-panel class="w-full" header-style="gap: 0px;" borderless padding="var(--lg)" header-class="p-lg bg-content"
      body-class="display-flex items-left items-middle flex-row gap-lg p-t-sm p-b-lg p-r-xl bg-content">
      <template #header>
        <div class="panel-header-left">
          <hl-icon class="static" type="primary" size="md">
            <FillOrnamentTitle4></FillOrnamentTitle4>
          </hl-icon>
        </div>
        <div class="panel-title">
          <h6 class="text-title">预警类型高发分析</h6>
        </div>
        <hl-group align="items-left items-middle" gap="var(--xs)">
          <hl-button equal  :type="classType === 'echarts' ? 'primary' : null" @click="changeClassType('echarts')">
            <template #icon>
              <hl-icon>
                <TwoChartPie></TwoChartPie>
              </hl-icon>
            </template>
          </hl-button>
          <hl-button equal  :type="classType === 'table' ? 'primary' : null" @click="changeClassType('table')">
            <template #icon>
              <hl-icon>
                <TwoAlignJustify></TwoAlignJustify>
              </hl-icon>
            </template>
          </hl-button>
        </hl-group>
      </template>
      <template #default>
        <warning-type :cardType='classType' ref="classRef"/>
      </template>
    </hl-panel>
    <hl-panel class="w-full" header-style="gap: 0px;" borderless padding="var(--lg)" header-class="p-lg bg-content"
      body-class="display-flex items-left items-top flex-col gap-lg p-y-sm p-x-xl bg-content">
      <template #header>
        <div class="panel-header-left">
          <hl-icon class="static" type="primary" size="md">
            <FillOrnamentTitle4></FillOrnamentTitle4>
          </hl-icon>
        </div>
        <div class="panel-title">
          <h6 class="text-title">预警地点高发分析 (Top10)</h6>
          <h6><span class="text-secondary m-l-xxs" style="font-weight:normal">*外部预警不参与统计</span></h6>
        </div>
        <hl-group align="items-left items-middle" gap="var(--xs)">
          <hl-button equal  :type="addressType === 'echarts' ? 'primary' : null" @click="changeAddressType('echarts')">
            <template #icon>
              <hl-icon>
                <TwoChartPie></TwoChartPie>
              </hl-icon>
            </template>
          </hl-button>
          <hl-button equal  :type="addressType === 'table' ? 'primary' : null" @click="changeAddressType('table')">
            <template #icon>
              <hl-icon>
                <TwoAlignJustify></TwoAlignJustify>
              </hl-icon>
            </template>
          </hl-button>
        </hl-group>
      </template>
      <template #default>
        <warning-address :cardType='addressType' ref="addressRef"/>
      </template>
    </hl-panel>
  </hl-group>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { HighSearch, WarningTime, WarningAddress, WarningType } from './index';

const timeType = ref('echarts');
const timeRef = ref();
const changeTimeType = (type: string) => {
  timeType.value = type;
};

const classType = ref('echarts');
const classRef = ref();
const changeClassType = (type: string) => {
  classType.value = type;
};

const addressType = ref('echarts');
const addressRef = ref();
const changeAddressType = (type: string) => {
  addressType.value = type;
};

const search = (params:Record<string, string>) => {
  timeRef.value.init(params);
  classRef.value.init(params);
  addressRef.value.init(params);
};
</script>
