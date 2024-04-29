<template>
  <top-card></top-card>
  <!-- <hl-row gap="var(--lg)" class="m-t-lg">
    <hl-col span="col-12">
      <latest-warning></latest-warning>
      <monitoring-control class="m-t-lg"></monitoring-control>
    </hl-col>
    <hl-col span="col-12">
      <info-days15></info-days15>
      <data-access class="m-t-lg"></data-access>
    </hl-col>
  </hl-row> -->
  <hl-row layout="grid" count="count-2" gap="var(--lg)" class="m-t-lg">
    <hl-col span="col"><latest-warning></latest-warning></hl-col>
    <hl-col span="col"> <info-days15></info-days15></hl-col>
    <hl-col span="col"><monitoring-control></monitoring-control></hl-col>
    <hl-col span="col"><data-access></data-access></hl-col>
  </hl-row>
</template>
<script lang="ts" setup>
import { TopCard, DataAccess, MonitoringControl, infoDays15, latestWarning } from './components';
</script>
