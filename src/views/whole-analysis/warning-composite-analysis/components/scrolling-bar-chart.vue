<template>
  <hl-scrollbar class="scrolling-bar-chart-container" :style="{ height, '--bar-color': barStyle?.color }">
    <div class="scrolling-bar-chart">
      <hl-group full gap="var(--xl)" class="bg-stripes">
        <hl-group dir="vertical" full>
          <div v-for="(barItem, idx) in chartData" :key="idx" class="bar-item" :style="{ margin }">
            <div class="label-value m-b-xxs" style="width:100%;">
              <span class="label" :style="getLabelStyle(barItem)">
                <span style="color:#36A4FF" class="m-r-xs">{{ idx + 1 }}</span>
                {{ labelFormatter(barItem.label) }}</span>
              <span class="value font-din font-bold" :style="getValueStyle(barItem)">{{
                  valueFormatter(getBarItemTotal(barItem))
              }}</span>
            </div>
            <hl-popover placement="top" :width="240" trigger="hover">
              <template #reference>
                <div :class="['bar-bg', isStack ? 'stack' : '', 'cursor-pointer']" :style="{
                  background: barItem?.barStyle?.background || barStyle?.background,
                  height: barItem?.barStyle?.width || barStyle?.width
                }">
                  <template v-if="isStack">
                    <div v-for="(subBarItem, sidx) in barItem.value" :key="sidx" class="bar" :style="{
                      background: subBarItem?.barStyle?.color || barStyle?.color,
                      width: `${subBarItem.value / maxVal * 100}%`
                    }"></div>
                  </template>
                  <div v-else class="bar" :style="{
                    background: barItem?.barStyle?.color || barStyle?.color,
                    width: `${barItem.value / maxVal * 100}%`
                  }"></div>
                </div>
              </template>
              <hl-group w-full dir="vertical" gap="var(--xxs)">
                <hl-group>
                  <span class="font-bold">{{ barItem.label }}</span>
                </hl-group>
                <hl-group>总数：{{ barItem.value }}</hl-group>
                <hl-group v-for="(itm, index) in barItem.unitAlarmHighIncidenceAnalysisItemVOList" :key="index">
                  {{ itm.monitorUnitName }} : {{ itm.value }}</hl-group>
              </hl-group>
            </hl-popover>
          </div>
        </hl-group>
      </hl-group>
    </div>
  </hl-scrollbar>
</template>

<script lang="ts" setup>
import { CSSProperties, PropType, computed, ref, unMounted } from 'vue';

const props = defineProps({
  height: {
    type: String,
    required: true,
  },
  margin: {
    type: String,
    default: '0 0 20px 0',
  },
  barStyle: {
    type: Object as PropType<{ width: string; color: string; backgroundColor: string; }>,
    default: () => ({
      width: '1em',
      color: '#71F8FC',
      background: 'rgba(47,71,110,0.12)',
    }),
  },
  labelStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({
      fontSize: '1em',
      color: '#4B4B4B',
    }),
  },
  valueStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({
      fontSize: '1.2em',
      color: '#4B4B4B',
    }),
  },
  chartData: {
    type: Array as PropType<ScrollingBarChartData[]>,
    default: () => [],
  },
  labelFormatter: {
    type: Function as PropType<(label: string) => string>,
    default: (label: string) => label,
  },
  valueFormatter: {
    type: Function as PropType<(value: number) => string>,
    default: (value: number) => value,
  },
});

const isStack = computed(() => props.chartData.every(d => Array.isArray(d.value)));
const maxVal = computed(() => {
  if (isStack.value) {
    return Math.max(
      ...props.chartData.map(d =>
        (d.value as ScrollingBarChartData[]).reduce((prev, cur) => prev + (cur.value as number), 0),
      ),
    );
  } else {
    // return Math.max(...props.chartData.map(d => (d.value as number))); 总数
    return props.chartData.map(d => (d.value as number)).reduce((prev, cur) => prev + (cur as number), 0);
  }
});

const getLabelStyle = (charItem: ScrollingBarChartData) => ({ ...props.labelStyle, ...(charItem?.labelStyle ?? {}) });
const getValueStyle = (charItem: ScrollingBarChartData) => ({ ...props.valueStyle, ...(charItem?.valueStyle ?? {}) });
const getBarItemTotal = (charItem: ScrollingBarChartData) => isStack.value ? (charItem.value as ScrollingBarChartData[]).reduce((prev, cur) => prev + (cur.value as number), 0) : charItem.value;

export interface ScrollingBarChartData {
  value: number | ScrollingBarChartData[]
  label: string
  barStyle?: Record<string, unknown>
  valueStyle?: CSSProperties
  labelStyle?: CSSProperties
}
</script>
<style>
.scrolling-bar-chart-container .scrolling-bar-chart .bar-item .label-value {
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
}

.scrolling-bar-chart-container .scrolling-bar-chart .bar-item .bar-bg {
  width: 100%;
  position: relative;
  margin-right: 10px;
}

.scrolling-bar-chart-container .scrolling-bar-chart .bar-item .bar-bg .bar {
  position: absolute;
  top: 0;
  height: 100%;
  width: 0;
}

.scrolling-bar-chart-container .scrolling-bar-chart .bar-item .bar-bg.stack .bar {
  position: static;
  display: inline-block;
}
</style>
