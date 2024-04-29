<template>
  <hl-panel
    class="w-full"
    header-class="gap-sm"
  ><template #header>
      <div class="panel-header-left">
        <hl-icon
          class
          type="primary"
          size="md"
        >
          <FillBookOpen></FillBookOpen>
        </hl-icon>
      </div>
      <div class="panel-title">
        <h5 class="text-title w-full">{{curData.targetDataName}}</h5>
      </div>
    </template><template #default>
      <hl-form
        class="w-full"
        gap="var(--xs)"
        style="--form-label-color: var(--text-secondary);"
        :width="['110px', 'col']"
      >
        <hl-form-item
          class="w-full"
          label="监测指标："
        >
          <hl-group
            align="items-left items-top"
            class="w-full"
            gap="var(--xxs)"
          ><span class="text-regular font-bold">{{curData.targetName}}</span></hl-group>
        </hl-form-item>
        <hl-form-item
          class="w-full"
          label="数据类型："
        >
          <hl-group
            align="items-left items-top"
            class="w-full"
            gap="var(--xxs)"
          ><span class="text-regular font-bold">{{curData.dataTypeName}}</span></hl-group>
        </hl-form-item>
        <hl-form-item
          class="w-full"
          label="计量单位："
        >
          <hl-group
            align="items-left items-top"
            class="w-full"
            gap="var(--xxs)"
          ><span class="text-regular font-bold">{{curData.measureUnitName}}</span></hl-group>
        </hl-form-item>
        <hl-form-item
          class="w-full"
          label="计算周期类型："
        >
          <hl-group
            align="items-left items-top"
            class="w-full"
            gap="var(--xxs)"
          ><span class="text-regular font-bold">{{curData.computePeriodTypeName}}</span></hl-group>
        </hl-form-item>
        <hl-form-item
          class="w-full"
          label="数据频率："
        >
          <hl-group
            align="items-left items-top"
            class="w-full"
            gap="var(--xxs)"
          ><span class="text-regular font-bold">{{curData.targetFrequencyName}}</span></hl-group>
        </hl-form-item>
        <hl-form-item
          class="w-full"
          label="启用时间："
        >
          <hl-group
            align="items-left items-top"
            class="w-full"
            gap="var(--xxs)"
          ><span class="text-regular font-bold">{{curData.initCollectTime}}</span></hl-group>
        </hl-form-item>
        <hl-form-item
          class="w-full"
          label="数据时间区间："
        >
          <hl-group
            align="items-left items-top"
            class="w-full"
            gap="var(--xxs)"
            v-if="curData.timeScopes && curData.timeScopes.length && curData.timeScopes !== '--'"
          >
            <hl-group
              align="items-left items-top"
              gap="var(--lg)"
              :key="index"
              v-for="(item, index) in curData.timeScopes"
            ><span class="text-regular font-bold">{{item.dateStart}} 至 {{item.dateEnd}} </span>
            <span class="text-regular font-bold">{{item.timeStart}} 至 {{item.timeEnd}}</span>
            </hl-group>
          </hl-group>
          <hl-group v-else>暂无数据</hl-group>
        </hl-form-item>
        <hl-form-item
          class="w-full"
          label="指标分类："
        >
          <hl-group
            align="items-left items-top"
            class="w-full"
            gap="var(--xxs)"
          ><span class="text-regular font-bold">{{curData.targetTypeName}}</span></hl-group>
        </hl-form-item>
        <hl-form-item
          class="w-full"
          label="计算公式："
        >
          <hl-group
            align="items-left items-top"
            class="w-full"
            gap="var(--xxs)"
          ><span class="text-regular font-bold">{{curData.formulaName}}</span></hl-group>
        </hl-form-item>
        <hl-form-item
          class="w-full"
          label="数据对象："
        >
          <hl-group
            align="items-left items-top"
            class="w-full"
            gap="var(--xxs)"
          ><span class="text-regular font-bold">{{curData.accessSourceObjectName}}</span></hl-group>
        </hl-form-item>
        <hl-form-item
          class="w-full"
          label="数据项名称："
        >
          <hl-group
            align="items-left items-top"
            class="w-full"
            gap="var(--xxs)"
          ><span class="text-regular font-bold">{{curData.targetDataName}}</span></hl-group>
        </hl-form-item>
        <!-- <hl-form-item
          class="w-full"
          label="监测设备："
        >
          <hl-group
            align="items-left items-top"
            class="w-full"
            gap="var(--xxs)"
          ><span class="text-regular font-bold">{{curData.equipName}}</span></hl-group>
        </hl-form-item> -->
        <hl-form-item
          class="w-full"
          label="更新时间："
        >
          <hl-group
            align="items-left items-top"
            class="w-full"
            gap="var(--xxs)"
          ><span class="text-regular font-bold">{{curData.updatedAt}}</span></hl-group>
        </hl-form-item>
      </hl-form>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { getSecondsToUnitTime } from '@/common';

const props = defineProps({
  detail: {
    type: Object,
  },
});

const curData = ref({
  targetDataName: '',
  targetName: '',
  dataTypeName: '',
  measureUnitName: '',
  computePeriodTypeName: '',
  targetFrequency: '',
  targetFrequencyName: '',
  targetFrequencyUnitName: '',
  initCollectTime: '',
  timeScopes: '',
  targetTypeName: '',
  formulaName: '',
  accessSourceObjectName: '',
  updatedAt: '',
  equipName: '',
});
onMounted(() => {
  curData.value = Object.assign(curData.value, props.detail);
  curData.value.targetFrequencyName = +curData.value.targetFrequency > 0 ? getSecondsToUnitTime(curData.value, 'targetFrequencyUnit', 'targetFrequency') + curData.value.targetFrequencyUnitName : '--';
});
</script>
