<template>
  <teleport to="#pageAction" v-if="showTeleport">
    <hl-button @click="$router.go(-1)">取消</hl-button>
    <hl-button class="m-l-sm" type="primary" @click="ok"> 保存 </hl-button>
  </teleport>
  <hl-group v-if="strategyList.length" gap="var(--lg)" class="w-full h-full">
    <!-- 左侧 -->
    <hl-group class="h-full" style="width: calc(var(--md) * 28)">
      <hl-panel borderless class="h-full w-full">
        <hl-group full dir="vertical">
          <h4>{{$t('warningType')}}</h4>
          <hl-group class="m-t-lg" dir="vertical">
            <hl-anchor :change-hash="false" v-if="strategyList.length" slider-less position="top" style="--anchor-item-height: var(--xxl); --anchor-item-bg-color-hover: var(--bg-light); --anchor-item-bg-color-active: var(--bg-light)">
              <hl-anchor-link :href="`#${item.eventTypeCode}`" v-for="(item, index) in strategyList" :key="index">{{ item.eventTypeName }}</hl-anchor-link>
            </hl-anchor>
            <hb-empty description="暂无数据" v-else />
          </hl-group>
        </hl-group>
      </hl-panel>
    </hl-group>
    <!-- 右侧 -->
    <hl-group dir="vertical" class="rule-list w-full" v-if="strategyList.length" style="height: calc(100vh - (var(--layout-out-padding) + var(--layout-out-padding) + var(--layout-header-height) + var(--layout-sub-header-height) + var(--layout-footer-height)))">
      <hl-scrollbar>
        <collapse-panel :title="eventitem.eventTypeName" :class="index !== 0 ? 'm-t-md' : null" v-for="(eventitem, index) in strategyList" :key="eventitem.eventTypeCode" :id="eventitem.eventTypeCode">
          <hl-group block align="items-middle" dir="vertical">
            <collapse-section v-for="(frequency, index2) in eventitem.frequencyList" :key="index2" :title="frequency.frequencyName" style="width: 78%" :show-delete="false">
              <template #title> {{ frequency.frequencyName }} <span class="text-danger m-l-xs">*</span> </template>
              <template #default="{ isOpen }">
                <hl-form v-show="isOpen" class="factor-form p-b-lg rule-item" :ref="el => addPinDuanFormRef(el)" :rules="getPinDuanRules(frequency)" :model="frequency" :label-position="['items-left', 'items-middle']" :validate-on-rule-change="false">
                  <hl-form-item prop="alarmWarn">
                    <hl-group dir="vertical" class="w-full">
                      <hl-form-item label="报警策略">
                        <hl-select v-model="frequency.alarmStrategyId" placeholder="请选择报警策略" block filterable clearable @change="valadateForm">
                          <hl-option :key="item.monitorStrategyId" :label="item.strategyName" :value="item.monitorStrategyId" v-for="item in filterOptions(alarmList, eventitem.eventTypeCode)"/>
                        </hl-select>
                      </hl-form-item>
                    </hl-group>
                  </hl-form-item>
                </hl-form>
              </template>
            </collapse-section>
          </hl-group>
        </collapse-panel>
      </hl-scrollbar>
    </hl-group>
    <hl-group full dir="vertical" class="rule-list" v-else>
      <hb-empty description="暂无数据" />
    </hl-group>
  </hl-group>
  <empty v-else />
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useTele } from 'fx-front-framework';
import { CommonUtils } from 'fx-front-utils';
import { FormInstance } from 'hongluan-ui';
import { useRoute, useRouter } from 'vue-router';
import { CollapsePanel, CollapseSection } from '@/components';
import { apiMonitorStrategyObj } from '@/apis/modules/alarm-strategy';
import { IgetFindMonitorStrategyPageSpace } from '@/apis/modules/alarm-strategy/model';
import { apiControlPointObj } from '@/apis/modules/control-point';
import { IgetFrequencyStrategySpace } from '@/apis/modules/control-point/model';
import Empty from '../empty.vue';

const checkAlarmWarn = (formData: { alarmStrategyId: string; warnStrategyId: string }) => (_: any, __: any, callback: (err?: Error) => void) => {
  if (!formData.alarmStrategyId) {
    callback(new Error('请选择报警策略'));
  } else {
    callback();
  }
};

const { showTeleport } = useTele();
const route = useRoute();
const router = useRouter();

const strategyList = ref([] as IgetFrequencyStrategySpace.Data[]);
const alarmList = ref([] as IgetFindMonitorStrategyPageSpace.List[]);
const warnList = ref([] as IgetFindMonitorStrategyPageSpace.List[]);

// 表单校验
const pinDuanFormRefs: FormInstance[] = [];
const addPinDuanFormRef = (form: FormInstance) => {
  form && !pinDuanFormRefs.includes(form) && pinDuanFormRefs.push(form);
};
const getPinDuanRules = (unitFactorFormData: any) => ({
  alarmWarn: [{ validator: checkAlarmWarn(unitFactorFormData) }]
});
const ok = async() => {
  try {
    await Promise.all([...pinDuanFormRefs.filter(f => f).map(uf => uf.validate())]);
    submitForm();
  } catch {
    console.log('11');
  }
};
const valadateForm = async() => {
  await Promise.all([...pinDuanFormRefs.filter(f => f).map(uf => uf.validate())]);
};
const submitForm = async() => {
  await apiControlPointObj.postFrequencyStrategy(strategyList.value);
  router.push({
    name: 'point',
    query: {
      regionId: route.query.regionId
    }
  });
};
const getAlarms = async(eventTypeCodes?: string) => {
  const { data } = await apiMonitorStrategyObj.getFindMonitorStrategyPage(CommonUtils.toQuery({ pageSize: 9999, currentPage: 1, useFor: 1, eventTypeCodes: [eventTypeCodes] }));
  alarmList.value = data.list;
};

const filterOptions = (arr: any[], eventTypeCode: string) => {
  return arr.filter(item => item.eventTypeCode === eventTypeCode);
};

onMounted(async() => {
  if (route.query.pointId) {
    const { data } = await apiControlPointObj.getFrequencyStrategy(route.query.pointId as unknown as number);
    strategyList.value = data;
  }
  getAlarms();
});
</script>
<style lang="scss" scoped>
.rule-list {
  --collapse-bg-color: var(--bg-content);
  --collapse-border-color: var(--factor-bg-color);
  .rule-item {
    margin-top: calc(var(--sm));
    padding: calc(var(--lg));
    padding-top: calc(var(--md));
    padding-bottom: calc(var(--md));
    background: var(--factor-bg-color);
    margin-left: calc(var(--lg) + var(--xl));
  }
}
</style>
