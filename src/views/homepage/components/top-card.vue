<template>
  <hl-group align gap="var(--lg)" full>
    <hl-group :style="`padding: 32px; background: url(${card1}) no-repeat; background-size: cover;`" align="items-left items-middle" class="w-full" gap="var(--xl)">
      <hl-icon size="xxl" fill class="radius-lg text-inverse" effect="light" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%)">
        <FillCalendar></FillCalendar>
      </hl-icon>
      <hl-group align="items-left items-top" dir="vertical" gap="var(--xs)"
        ><span class="text-inverse font-lg font-bold text-inverse">今日预警</span>
        <hl-group align="items-left items-top" gap="var(--lg)">
          <hl-group align="items-left items-middle" gap="10px">
            <hl-group align="items-left items-middle" gap="10px">
              <h3 class="text-inverse">{{ cards.todayAlarmNumberNumber }}</h3>
              <span class="text-inverse">条</span>
            </hl-group>
          </hl-group>
        </hl-group>
      </hl-group>
    </hl-group>
    <hl-group :style="`padding: 32px; background: url(${card2}) no-repeat; background-size: cover;`" align="items-left items-middle" class="w-full" gap="var(--xl)">
      <hl-icon size="xxl" fill class="radius-lg text-inverse" effect="light" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%)">
        <FillAlert></FillAlert>
      </hl-icon>
      <hl-group align="items-left items-top" dir="vertical" gap="var(--xs)"
        ><span class="text-inverse font-bold" style="font-size: 16px; line-height: 24px">预警总数</span>
        <hl-group align="items-left items-top" gap="var(--lg)">
          <hl-group align="items-left items-middle" gap="10px">
            <h3 class="text-inverse">{{ cards.alarmNumber }}</h3>
            <span class="text-inverse">条</span>
          </hl-group>
        </hl-group>
      </hl-group>
    </hl-group>
    <hl-group :style="`padding: 32px; background: url(${card3}) no-repeat; background-size: cover;`" align="items-left items-middle" class="w-full" gap="var(--xl)">
      <hl-icon size="xxl" fill class="radius-lg text-inverse" effect="light" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%)">
        <FillExamine></FillExamine>
      </hl-icon>
      <hl-group align="items-left items-top" dir="vertical" gap="var(--xs)"
        ><span class="text-inverse font-bold" style="font-size: 16px; line-height: 24px">待研判预警</span>
        <hl-group align="items-left items-top" gap="var(--lg)">
          <hl-group align="items-left items-middle" gap="10px">
            <hl-group align="items-left items-middle" gap="10px">
              <h3 class="text-inverse">{{ cards.unJudgeAlarmNumber }}</h3>
              <span class="text-inverse">条</span>
            </hl-group>
          </hl-group>
        </hl-group>
      </hl-group>
    </hl-group>
    <hl-group :style="`padding: 32px; background: url(${card4}) no-repeat; background-size: cover;position:relative;`" align="items-left items-middle" class="w-full" gap="var(--xl)">
      <hl-icon size="xxl" fill class="radius-lg text-inverse" effect="light" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%)">
        <FillLink></FillLink>
      </hl-icon>
      <hl-group align="items-left items-top" dir="vertical" gap="var(--xs)"
        ><span class="text-inverse font-lg font-bold">指标数据总数</span>
        <hl-group align="items-left items-top" gap="var(--lg)">
          <hl-group align="items-left items-middle" gap="10px">
            <h3 class="text-inverse">{{ cards.dataTargetDataNumber }}</h3>
            <span class="text-inverse">条</span>
          </hl-group>
        </hl-group>
      </hl-group>
      <!-- <p style="position: absolute; right: var(--xs); bottom: var(--xxs);" class="text-inverse">注：统计时间截止{{ dataAccessTime }}</p> -->
    </hl-group>
  </hl-group>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useLatestTime } from '@/hooks';
import { apiHomePageObj } from '@/apis/modules/home-page';
import card1 from '@/assets/images/homepage/c1.png';
import card2 from '@/assets/images/homepage/c2.png';
import card3 from '@/assets/images/homepage/c3.png';
import card4 from '@/assets/images/homepage/c4.png';

const { dataAccessTime } = useLatestTime();

const cards = ref({
  todayAlarmNumberNumber: 0,
  alarmNumber: 0,
  unJudgeAlarmNumber: 0,
  accessDataNumber: 0,
  dataTargetDataNumber: 0
});
const getData = async () => {
  const { data } = await apiHomePageObj.getFindHomePageDataStatistic();
  cards.value = data;
};

getData();
</script>
