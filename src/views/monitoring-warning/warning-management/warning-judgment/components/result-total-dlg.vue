<template>
  <hl-dialog :model-value="true" class="md-dialog" body-class="result-total-body not-footer-dialog" width="604px" title="当前研判统计" @close="$emit('cancel')">
    <hl-panel borderless body-style="padding: var(--xxl);" class="m-b-lg">
      <hl-row gap="var(--xxl)">
        <hl-col span="col-12" style="height: calc(var(--lg) * 10)" class="display-flex items-middle items-center">
          <hl-progress show-as="circle" :percentage="Number(totalData.judgeRate.replace('%', ''))" color="#4CC09E" stroke-width="10px">
            <template #default="{ percentage }">
              <hl-group dir="vertical" gap="var(--sm)" align="items-middle items-center">
                <h1>{{ percentage }}%</h1>
              </hl-group>
            </template>
          </hl-progress>
        </hl-col>
        <hl-col span="col-12" style="height: calc(var(--lg) * 10)">
          <hl-group align="items-center items-top" class="static" dir="vertical" gap="var(--md)" style="width: 100%" full="full-x">
            <hl-group class="p-y-sm p-x-lg bg-light w-full" align="items-between items-middle"
              ><span class="font-bold static">已研判</span>
              <hl-group align="items-left items-middle" gap="var(--xxs)">
                <h3 class="text-primary static">{{ totalData.judgeAlarmNumber }}</h3>
                <span class="text-secondary static">条</span>
              </hl-group>
            </hl-group>
            <hl-group class="p-y-sm p-x-lg bg-light w-full" align="items-between items-middle"
              ><span class="font-bold static">待研判</span>
              <hl-group align="items-left items-middle" gap="var(--xxs)">
                <h3 class="text-primary static">{{ totalData.unJudgeAlarmNumber }}</h3>
                <span class="text-secondary static">条</span>
              </hl-group>
            </hl-group>
            <hl-group class="p-y-sm p-x-lg bg-success-light-5 w-full" align="items-between items-middle"
              ><span class="font-bold static">当前研判率</span>
              <hl-group align="items-left items-middle" gap="var(--xxs)">
                <h3 class="text-success static">{{ totalData.judgeRate }}</h3>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-col>
      </hl-row>
    </hl-panel>
    <hl-panel class="w-full" header-style="gap: 0px;" borderless padding="var(--lg)" header-class="p-lg" body-class="display-flex items-left items-middle flex-row gap-xl p-b-lg" body-style="padding-top: 0px; padding-right: 32px; padding-left: 32px;"
      ><template #header>
        <div class="panel-header-left">
          <hl-icon class="static" type="primary" size="md">
            <FillOrnamentTitle4></FillOrnamentTitle4>
          </hl-icon>
        </div>
        <div class="panel-title">
          <h5 class="text-title">近期研判结果统计</h5>
        </div>
        <div class="panel-header-right" type="button" nav-padding="var(--sm)">
          <hl-tabs v-model="activeName" type="button" @tab-change="tabChange">
            <hl-tab-pane label="今日" name="first"></hl-tab-pane>
            <hl-tab-pane label="近7日" name="second"></hl-tab-pane>
            <hl-tab-pane label="近30日" name="third"></hl-tab-pane>
          </hl-tabs>
        </div> </template
      ><template #default>
        <div :style="`padding: 30px; height: calc(var(--lg) * 6); width: 50%; background: url(${resultBg}) no-repeat; background-size: cover;`" class="display-flex">
          <div>
            <img :src="falselyIcon" style="height: calc(var(--lg) * 3); width: calc(var(--lg) * 3)" />
          </div>
          <hl-group align="items-left items-top m-l-lg" dir="vertical">
            <div>真实</div>
            <div class="text-title font-xxxxl font-bold">{{ totalData2.alarmVOs[0].value }}</div>
          </hl-group>
        </div>
        <div :style="`padding: 30px; height: calc(var(--lg) * 6); width: 50%; background: url(${resultBg}) no-repeat; background-size: cover;`" class="display-flex">
          <div>
            <img :src="trulyIcon" style="height: calc(var(--lg) * 3); width: calc(var(--lg) * 3)" />
          </div>
          <hl-group align="items-left items-top m-l-lg" dir="vertical">
            <div>误报</div>
            <div class="text-title font-xxxxl font-bold">{{ totalData2.alarmVOs[1].value }}</div>
          </hl-group>
        </div>
      </template></hl-panel
    >
  </hl-dialog>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import resultBg from '@/assets/images/warning/result-bg.png';
import falselyIcon from '@/assets/images/warning/falsely-icon.png';
import trulyIcon from '@/assets/images/warning/truly-icon.png';
import { apiWarningTotalObj } from '@/apis/modules/warning-total';
import { getDaysBetween } from '@/common/utils';

const emit = defineEmits(['cancel', 'ok']);

const totalData = ref({
  judgeAlarmNumber: 0,
  unJudgeAlarmNumber: 0,
  judgeRate: '0%'
});
const totalData2 = ref({
  alarmVOs: [
    {
      code: '1',
      name: '真实',
      value: 0
    },
    {
      code: '2',
      name: '误报',
      value: 0
    }
  ]
});

const getData2 = async (days: number) => {
  const result = await apiWarningTotalObj.getFindRecentJudgeResult(getDaysBetween(days).startTime, getDaysBetween(days).endTime);
  console.log(result);
  totalData2.value = result.data;
};
const getData = async () => {
  const { data } = await apiWarningTotalObj.getFindJudgeAlarmStatistic();
  totalData.value = data;
  getData2(1);
};
getData();

const activeName = ref('first');
const tabChange = (name: string) => {
  if (name === 'first') {
    getData2(1);
  } else if (name === 'second') {
    getData2(7);
  } else {
    getData2(30);
  }
};
</script>
<style lang="scss">
.result-total-body {
  background: #f6f9fb;

  .hl-progress.circle {
    width: calc(var(--lg) * 10);
    height: calc(var(--lg) * 10);
  }
}
</style>
