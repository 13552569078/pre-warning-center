<template>
  <hl-panel radius="0px" :class="[source === 'strategy' ? 'data-bg' : null, 'dialog-inner-panel']" borderless padding="var(--lg)" body-padding="var(--lg)" body-class="display-flex items-left items-top flex-row content" footer-style>
    <template #header>
      <panel-header title="基本信息"></panel-header>
    </template>
    <template #default>
      <hl-row layout="grid" :class="[source === 'strategy' ? 'w-60' : 'w-100']" class="detail-row-font" count="count-2" gap="var(--lg)">
        <hl-col span="col">
          <hl-group dir="vertical" align="items-left items-top" class="static" gap="var(--lg2)">
            <span class="text-secondary static">策略名称</span>
            <span class="font-bold">{{ detail?.strategyName }}</span>
          </hl-group>
        </hl-col>
        <hl-col span="col">
          <hl-group dir="vertical" align="items-left items-top" class="static" gap="var(--lg2)">
            <span class="text-secondary static">策略版本</span>
            <hl-select placeholder="选择版本" filterable v-model="version" class="w-xl" @change="changeVersion" :disabled="source !== 'strategy'">
              <hl-option v-for="item in versionList" :key="item.versionId" :label="item.versionName" :value="item.versionId" />
            </hl-select>
          </hl-group>
        </hl-col>
        <hl-col span="col">
          <hl-group dir="vertical" align="items-left items-top" class="static" gap="var(--lg2)">
            <span class="text-secondary static">风险分类</span>
            <span class="font-bold">{{ detail?.eventTypeCodeName }}</span>
          </hl-group>
        </hl-col>
        <hl-col span="col">
          <hl-group dir="vertical" align="items-left items-top" class="static" gap="var(--lg2)">
            <span class="text-secondary static">创建时间</span>
            <span class="font-bold">{{ detail?.createdAt || '--' }}</span>
          </hl-group>
        </hl-col>
        <hl-col span="col">
          <hl-group dir="vertical" align="items-left items-top" class="static" gap="var(--lg2)">
            <span class="text-secondary static">修改时间</span>
            <span class="font-bold">{{ detail?.updatedAt }}</span>
          </hl-group>
        </hl-col>
        <hl-col span="col col-span-2">
          <hl-group dir="vertical" align="items-left items-top" gap="var(--lg2)">
            <span class="text-secondary static">策略描述</span>
            <hl-group class="font-bold w-full" wrap>{{ detail?.strategyDesc }}</hl-group>
          </hl-group>
        </hl-col>
      </hl-row>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref, PropType, watch } from 'vue';
import { IgetListMonitorStrategyVersionSpace } from '@/apis/modules/monitor-strategy/fixed-cycle/model';
import { PanelHeader } from '@/components';

const emit = defineEmits(['changeVersion']);

const props = defineProps({
  detail: Object as PropType<any>,
  latestVersion: {
    type: String,
    default: ''
  },
  versionList: {
    type: Array as PropType<IgetListMonitorStrategyVersionSpace.Data[]>,
    default: () => {
      return [];
    }
  },
  source: {
    type: String,
    default: 'strategy' // 策略新窗口 详情,  区别历史预警
  }
});
const version = ref();

watch(
  () => props.latestVersion,
  n => {
    version.value = n;
  },
  {
    immediate: true,
    deep: true
  }
);

const changeVersion = () => {
  emit('changeVersion', version.value);
};
</script>
<style lang="scss">
.data-bg {
  background: url('~@/assets/images/wholeAnalysis/top-bg.svg') no-repeat;
  background-color: var(--bg-content);
  background-position: right -10% bottom 10%;
  background-size: 36% 166%;
}
</style>
