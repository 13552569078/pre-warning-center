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
        <h6 class="text-title">报警时间高发分析</h6>
      </div>
    </template>
    <template #default>
      <warning-time ref="timeRef"/>
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
          <h6 class="text-title">报警类型高发分析</h6>
        </div>
      </template>
      <template #default>
        <warning-type ref="classRef"/>
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
          <h6 class="text-title">报警地点高发分析 (Top10)</h6>
          <h6><span class="text-secondary m-l-xxs" style="font-weight:normal"></span></h6>
        </div>
      </template>
      <template #default>
        <warning-address ref="addressRef"/>
      </template>
    </hl-panel>
  </hl-group>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { HighSearch, WarningTime, WarningAddress, WarningType } from './index';

const timeRef = ref();
const classRef = ref();
const addressRef = ref();

const search = (params:Record<string, string>) => {
  timeRef.value.init(params);
  classRef.value.init(params);
  addressRef.value.init(params);
};
</script>
