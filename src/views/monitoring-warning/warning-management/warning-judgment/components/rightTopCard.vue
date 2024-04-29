<template>
  <hl-group align gap="var(--lg)" full class="m-b-lg">
    <hl-group :style="`padding: 28px; background: url(${card1}) no-repeat; background-size: cover; min-width: calc(--var(xs) * 6)`" align="items-left items-middle" class="w-full" gap="var(--xl)">
      <hl-icon size="xxl" fill class="radius-lg text-inverse" effect="light" style="background: linear-gradient(180deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.3) 100%);">
        <FillAlert></FillAlert>
      </hl-icon>
      <hl-group align="items-left items-top" dir="vertical" gap="var(--xs)" ><span class="text-inverse font-lg font-bold text-inverse">待研判预警</span>
        <hl-group align="items-left items-top" gap="var(--lg)">
          <hl-group align="items-left items-middle" gap="10px">
            <hl-group align="items-left items-middle" gap="10px">
              <h3 class="text-inverse">{{cards.unJudgeAlarmNumber}}</h3><span class="text-inverse ">条</span>
            </hl-group>
          </hl-group>
        </hl-group>
      </hl-group>
    </hl-group>
    <hl-group style="padding: 28px; background: #FFFFFF;" align="items-left items-middle" class="w-full" gap="var(--xl)">
      <hl-icon size="xxl" fill class="radius-lg bg-danger-light-5" effect="light" style="background: #FFF0ED;" color="#FF4D4F">
        <FillAlert></FillAlert>
      </hl-icon>
      <hl-group align="items-left items-top" dir="vertical" gap="var(--xs)"><span class="text-regular font-bold" style="font-size: 16px; line-height: 24px;">一级预警</span>
        <hl-group align="items-left items-top" gap="var(--lg)">
          <hl-group align="items-left items-middle" gap="10px">
            <h3 class="text-regular">{{cards.alarmLevelVOs[0].value}}</h3><span class="text-regular">条</span>
          </hl-group>
        </hl-group>
      </hl-group>
    </hl-group>
    <hl-group style="padding: 28px; background: #FFFFFF;" align="items-left items-middle" class="w-full" gap="var(--xl)">
      <hl-icon size="xxl" fill class="radius-lg bg-warning-light-5" effect="light" style="background: #FFF7E8;" color="#FA8B16">
        <FillAlert></FillAlert>
      </hl-icon>
      <hl-group align="items-left items-top" dir="vertical" gap="var(--xs)"><span class="text-regular font-bold" style="font-size: 16px; line-height: 24px;">二级预警</span>
        <hl-group align="items-left items-top" gap="var(--lg)">
          <hl-group align="items-left items-middle" gap="10px">
            <hl-group align="items-left items-middle" gap="10px">
              <h3 class="text-regular">{{cards.alarmLevelVOs[1].value}}</h3><span class="text-regular">条</span>
            </hl-group>
          </hl-group>
        </hl-group>
      </hl-group>
    </hl-group>
    <hl-group style="padding: 28px; background: #FFFFFF;" align="items-left items-middle" class="w-full" gap="var(--xl)">
      <hl-icon size="xxl" fill class="radius-lg" effect="light" style="background: #FAF9E0;" color="#FFDD00">
        <FillAlert></FillAlert>
      </hl-icon>
      <hl-group align="items-left items-top" dir="vertical" gap="var(--xs)"><span class="text-regular font-lg font-bold">三级预警</span>
        <hl-group align="items-left items-top" gap="var(--lg)">
          <hl-group align="items-left items-middle" gap="10px">
            <h3 class="text-regular">{{cards.alarmLevelVOs[2].value}}</h3><span class="text-regular">条</span>
          </hl-group>
        </hl-group>
      </hl-group>
    </hl-group>
    <hl-group style="padding: 28px; background: #FFFFFF;" align="items-left items-middle" class="w-full" gap="var(--xl)">
      <hl-icon size="xxl" fill class="radius-lg" effect="light" style="background: #EBF9FF;" color="#36A4FF">
        <FillAlert></FillAlert>
      </hl-icon>
      <hl-group align="items-left items-top" dir="vertical" gap="var(--xs)"><span class="text-regular font-lg font-bold">四级预警</span>
        <hl-group align="items-left items-top" gap="var(--lg)">
          <hl-group align="items-left items-middle" gap="10px">
            <h3 class="text-regular">{{cards.alarmLevelVOs[3].value}}</h3><span class="text-regular">条</span>
          </hl-group>
        </hl-group>
      </hl-group>
    </hl-group>
  </hl-group>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import card1 from '@/assets/images/homepage/c1.png';
import { apiWarningTotalObj } from '@/apis/modules/warning-total';
import { IgetFindUnJudgeAlarmStatisticSpace } from '@/apis/modules/warning-total/model';

const cards = ref<IgetFindUnJudgeAlarmStatisticSpace.Data>({
  'unJudgeAlarmNumber': 0,
  'alarmLevelVOs': [{
    'code': 'ALARM_LEVEL_CODE_1',
    'name': 'I级',
    'value': 0
  }, { 'code': 'ALARM_LEVEL_CODE_2', 'name': 'II级', 'value': 0 }, {
    'code': 'ALARM_LEVEL_CODE_3',
    'name': 'III级',
    'value': 0
  }, { 'code': 'ALARM_LEVEL_CODE_4', 'name': 'IV级', 'value': 0 }]
});
const getData = async() => {
  const { data } = await apiWarningTotalObj.getFindUnJudgeAlarmStatistic();
  cards.value = data;
};

getData();
</script>
