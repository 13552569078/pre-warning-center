<template>
  <hl-panel radius="0px" :class="[source === 'strategy' ? 'data-bg' : null]" borderless padding="var(--xl)" body-padding="var(--xxl)" body-class="display-flex items-left items-top flex-row content" footer-style>
    <template #header>
      <panel-header title="基本信息"></panel-header>
    </template>
    <template #default>
      <hl-row layout="grid" :class="[source === 'strategy' ? 'w-60' : 'w-100']" class="w-full p-l-xxl m-t-lg" count="count-2" gap="var(--lg)">
        <hl-col span="col">
          <hl-group align="items-left items-top" class="static" gap="var(--xl)">
            <span class="text-secondary static">策略名称:</span>
            <span class="font-bold">{{ detail?.strategyName }}</span>
          </hl-group>
        </hl-col>
        <hl-col span="col">
          <hl-group align="items-left items-middle" class="static" gap="var(--xl)">
            <span class="text-secondary static">策略版本:</span>
            <hl-select placeholder="选择版本" filterable v-model="version" class="w-xl" @change="changeVersion" :disabled="source !== 'strategy'">
              <hl-option v-for="item in versionList" :key="item.versionId" :label="item.versionName" :value="item.versionId" />
            </hl-select>
          </hl-group>
        </hl-col>
        <hl-col span="col">
          <hl-group align="items-left items-top" class="static" gap="var(--xl)">
            <span class="text-secondary static">风险分类:</span>
            <span class="font-bold">{{ detail?.eventTypeCodeName }}</span>
          </hl-group>
        </hl-col>
        <hl-col span="col">
          <hl-group align="items-left items-top" class="static" gap="var(--xl)">
            <span class="text-secondary static">创建时间:</span>
            <span class="font-bold">{{ detail?.createdAt || '--' }}</span>
          </hl-group>
        </hl-col>
        <hl-col span="col">
          <hl-group align="items-left items-top" class="static" gap="var(--xl)">
            <span class="text-secondary static">修改时间:</span>
            <span class="font-bold">{{ detail?.updatedAt }}</span>
          </hl-group>
        </hl-col>
        <hl-col span="col col-span-2">
          <hl-group align="items-left items-top w-full" class="static" gap="var(--xl)">
            <span class="text-secondary static">静默设置:</span>
            <hl-group dir="vertical" class="bg-light p-md block w-full" gap="var(--sm)" v-if="detail?.silentConfigVOS?.length">
              <hl-group align="items-left items-top" full dir="vertical" gap="var(--sm)">
                <hl-group align="items-left items-top" gap="var(--xs)" class="bg-content p-sm static w-100" :key="index" v-for="(item, index) in detail?.silentConfigVOS">
                  <div class="text-regular font-bold">{{ item.dateStart }} 至 {{ item.dateEnd }}</div>
                  <div class="text-secondary font-bold">，</div>
                  <div class="text-regular font-bold">{{ item.timeStart }} 至 {{ item.timeEnd }}</div>
                </hl-group>
              </hl-group>
            </hl-group>
            <span v-else>暂无配置</span>
          </hl-group>
        </hl-col>
        <hl-col span="col col-span-2">
          <hl-group align="items-left items-top" gap="var(--xl)">
            <span class="text-secondary static">策略描述:</span>
            <hl-group class="font-bold w-full" wrap>{{ detail?.strategyDesc }}</hl-group>
          </hl-group>
        </hl-col>
      </hl-row>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref, PropType, watch } from 'vue';
import { PanelHeader } from '@/components';
import { IgetListMonitorStrategyVersionSpace } from '@/apis/modules/monitor-strategy/fixed-cycle/model';

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
