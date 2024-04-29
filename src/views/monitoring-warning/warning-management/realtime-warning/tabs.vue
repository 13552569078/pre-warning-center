<template>
  <hl-row layout="grid" count="count-6" gap="var(--lg)" class="m-b-md">

    <hl-col span="col">
      <hl-radio v-model="dataType" class="w-full" :label="0" custom @change="handleChange">
        <hl-group class="p-sm transition bg-content border checked:border-danger checked:bg-danger-light-5" align="items-middle" gap="var(--sm)" full>
          <hl-icon size="xxl" class="static radius-lg checked:bg-danger checked:text-inverse" type="danger">
            <FillAlert></FillAlert>
          </hl-icon>
          <hl-group align="items-between items-middle" class="w-full" gap="var(--xs)"><span class="text-regular font-lg font-bold">预警中</span>
            <hl-group align="items-left items-top" gap="var(--xxs)">
              <hl-group align="items-left items-middle" gap="var(--xxs)">
                <h3 class="text-danger">{{ alarmNum }}</h3><span class="text-secondary">条</span>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-group>
      </hl-radio>
    </hl-col>

    <hl-col span="col">
      <hl-radio v-model="dataType" class="w-full" :label="1" custom @change="handleChange">
        <hl-group class="p-sm transition bg-content border checked:border-primary checked:bg-primary-light-5" align="items-middle" gap="var(--sm)" full>
          <hl-icon size="xxl" class="static radius-lg checked:bg-primary checked:text-inverse" type="primary">
            <FillChartBar></FillChartBar>
          </hl-icon>
          <hl-group align="items-between items-middle" class="w-full" gap="var(--xs)"><span class="text-regular font-lg font-bold">当日预警</span>
            <hl-group align="items-left items-top" gap="var(--lg)">
              <hl-group align="items-left items-middle" gap="10px">
                <hl-group align="items-left items-middle" gap="var(--xxs)">
                  <h3 class="text-primary">{{ todayNum }}</h3><span class="text-secondary">条</span>
                </hl-group>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-group>
      </hl-radio>
    </hl-col>
  </hl-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dataType = ref(0);

const props = defineProps({
  alarmNum: Number,
  todayNum: Number,
  modelValue: Number
});

dataType.value = props.modelValue as number;

const emit = defineEmits(['update:modelValue']);

const handleChange = (value: string | number | boolean) => {
  console.log('change', value);
  emit('update:modelValue', value);
};

</script>
