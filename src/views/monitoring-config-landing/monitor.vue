<template>
  <hl-panel class="landing-page">
    <div class="mask-container">
      <div class="conic"></div>
    </div>
    <div class="back-welcome w-full h-full">
      <div class="welcome-item item1" @click="$router.push({name: 'indicatorManagement'})">
        <div class="inner w-full h-full">
          <img :src="icon1" class="top-icon" alt="指标管理">
          <img :src="blankCircle" class="circle-icon circle-top" alt="">
          <img :src="blankCircle" class="circle-icon circle-mid" alt="">
          <img :src="blankCircle" class="circle-icon circle-bottom" alt="">
          <img :src="site1" class="site" alt="指标管理">
        </div>
      </div>
      <div class="welcome-item item2" @click="$router.push({name: 'point'})">
        <div class="inner w-full h-full">
          <img :src="icon2" class=" top-icon" alt="监测点">
          <img :src="blankCircle" class="circle-icon circle-top" alt="">
          <img :src="blankCircle" class="circle-icon circle-mid" alt="">
          <img :src="blankCircle" class="circle-icon circle-bottom" alt="">
          <img :src="site2" class="site" alt="监测点">
        </div>
      </div>
      <div class="welcome-item item3" @click="$router.push({name: 'alarmStrategyConfig'})">
        <div class="inner w-full h-full">
          <img :src="icon3" class=" top-icon" alt="预警策略">
          <img :src="blankCircle" class="circle-icon circle-top" alt="">
          <img :src="blankCircle" class="circle-icon circle-mid" alt="">
          <img :src="blankCircle" class="circle-icon circle-bottom" alt="">
          <img :src="site3" class="site" alt="预警策略">
        </div>
      </div>
    </div>
  </hl-panel>
</template>
<script lang="ts" setup>
import icon1 from '@/assets/images/WelcomeIcon/icon_1.png';
import icon2 from '@/assets/images/WelcomeIcon/icon_2.png';
import icon3 from '@/assets/images/WelcomeIcon/icon_3.png';
import site1 from '@/assets/images/WelcomeIcon/site_1.png';
import site2 from '@/assets/images/WelcomeIcon/site_2.png';
import site3 from '@/assets/images/WelcomeIcon/site_3.png';
import blankCircle from '@/assets/images/WelcomeIcon/blank_circle.png';
</script>
