<template>
  <teleport to="#pageAction" v-if="showTeleport && unitEventTypeList.length">
    <hl-button @click="$router.go(-1)">取消</hl-button>
    <hl-button class="m-l-sm" type="primary" @click="ok">保存 </hl-button>
  </teleport>
  <left-right-layout v-if="unitEventTypeList.length">
    <template #left>
      <hl-panel borderless class="h-full w-full">
        <hl-group full dir="vertical">
          <hl-group align="items-between items-middle">
            <h4>{{ pageType }}</h4>
            <hl-icon @click="eventDlalogVisiable = true"><two-plus /></hl-icon>
          </hl-group>
          <hl-group class="m-t-lg" dir="vertical">
            <hl-anchor :change-hash="false" slider-less position="top" style="--anchor-item-height: var(--xxl); --anchor-item-bg-color-hover: var(--bg-light); --anchor-item-bg-color-active: var(--bg-light)">
              <hl-anchor-link :href="`#${item.eventTypeCode}`" v-for="(item, index) in unitEventTypeList" :key="index" class="hover-wrap"
                >{{ item.eventTypeName }}
                <hl-group gap="var(--md)" class="w-full hover-show" align="items-right">
                  <hl-icon class="m-l-sm" color="#5E6278" @click.stop.prevent="removeEvent(item, index)" style="float: right"><FillDelete /></hl-icon>
                </hl-group>
              </hl-anchor-link>
            </hl-anchor>
          </hl-group>
        </hl-group>
      </hl-panel>
    </template>
    <template #right>
      <hl-group dir="vertical" class="rule-list w-full" style="height: calc(100vh - (var(--layout-out-padding) + var(--layout-out-padding) + var(--layout-header-height) + var(--layout-sub-header-height) + var(--layout-footer-height)))">
        <hl-scrollbar>
          <collapse-panel :title="eventItem.eventTypeName" :class="index !== 0 ? 'm-t-md' : null" v-for="(eventItem, index) in unitEventTypeList" :key="eventItem.eventTypeCode" :id="eventItem.eventTypeCode">
            <hl-group block align="items-middle" dir="vertical">
              <!-- 监测频段 -->
              <collapse-panel title="监测频段" class="m-b-md" style="width: 98%; --panel-header-padding: 0px">
                <hl-group block align="items-middle" dir="vertical">
                  <collapse-section v-for="(frequency, index) in eventItem.frequencyList" :key="index" :title="`监测频段${index + 1}`" style="width: 80%" @del="delFrequency(eventItem, index)" :show-delete="eventItem.frequencyList.length > 1" class="m-b-md">
                    <template #default="{ isOpen }">
                      <hl-form v-show="isOpen" class="factor-form rule-item" :ref="el => addUnitFactorFormRef(el)" :rules="getFrequencyRules()" :model="frequency" :label-position="['items-left', 'items-middle']" :validate-on-rule-change="false">
                        <hl-form-item label="频段名称" prop="frequencyName">
                          <hl-input v-model="frequency.frequencyName" placeholder="请输入频段名称" block />
                        </hl-form-item>
                        <hl-form-item label="监测频率" prop="frequencyType">
                          <hl-radio v-model="frequency.frequencyType" :label="1">实时监测</hl-radio>
                          <hl-radio v-model="frequency.frequencyType" :label="2">周期监测</hl-radio>
                        </hl-form-item>
                        <hl-form-item v-if="frequency.frequencyType === 2" label="频段周期" prop="frequencyCornStr">
                          <hl-input v-model="frequency.frequencyCornStr" placeholder="请输入频段周期" block />
                        </hl-form-item>
                      </hl-form>
                    </template>
                  </collapse-section>
                  <add-new-item title="新增监测频段" @click="addFrequency(eventItem)" style="width: 65%" class="m-l-md" />
                </hl-group>
              </collapse-panel>
              <!-- 接入数据配置 -->
              <collapse-panel title="接入数据配置" class="m-b-md" style="width: 98%; --panel-header-padding: 0px">
                <hl-group block align="items-middle" dir="vertical">
                  <collapse-section v-for="(unitFactor, index) in eventItem.monitorFactors" :key="index" :title="`接入数据${index + 1}`" style="width: 80%" @del="delMonitorFactors(eventItem, index)" :show-delete="eventItem.monitorFactors.length > 1">
                    <template #default="{ isOpen }">
                      <hl-form v-show="isOpen" class="factor-form m-b-sm rule-item" :ref="el => addUnitFactorFormRef(el)" :rules="getUnitFactorRules(unitFactor)" :model="unitFactor" :label-position="['items-left', 'items-middle']" :validate-on-rule-change="false">
                        <hl-form-item label="监测因子" prop="factorId">
                          <hl-select v-model="unitFactor.factorId" placeholder="请选择监测因子" block filterable clearable>
                            <hl-option v-for="f in filterOptions(eventItem.eventTypeCode)" :key="f.factorId" :label="f.factorName" :value="f.factorId">
                              <span class="m-r-md">{{ f.factorName }}</span>
                              <span class="text-secondary font-sm">{{ f.factorCode }}</span>
                            </hl-option>
                          </hl-select>
                        </hl-form-item>
                        <hl-form-item label="监测数据" prop="accessDataCodes" required>
                          <template #label>
                            <span class="form-label m-r-sm">监测数据</span>
                            <span class="text-secondary">(说明：请填写至少一个监测数据,数据标识码不能重复)</span>
                          </template>
                          <hl-group v-for="(code, idx) in unitFactor.accessDataCodes" :key="idx" class="w-full block" align="items-between items-middle">
                            <hl-group class="w-full m-t-sm" align="items-middle">
                              <span class="m-r-xxs">数据标识码：</span>
                              <hl-input v-model="code.dataCode" class="w-lg" />
                            </hl-group>
                            <hl-group class="w-full m-t-sm" align="items-middle items-right">
                              <span class="m-r-xxs">数据描述：</span>
                              <hl-input v-model="code.dataCodeDesc" class="w-lg" />
                              <hl-dropdown>
                                <hl-icon class="m-l-sm">
                                  <fill-more />
                                </hl-icon>
                                <template #dropdown>
                                  <hl-dropdown-menu>
                                    <hl-dropdown-item @click="addAccessDataCode(unitFactor.accessDataCodes)">添加</hl-dropdown-item>
                                    <hl-dropdown-item v-if="unitFactor.accessDataCodes.length > 1" @click="delAccessDataCode(unitFactor.accessDataCodes, idx)"> 删除 </hl-dropdown-item>
                                  </hl-dropdown-menu>
                                </template>
                              </hl-dropdown>
                            </hl-group>
                          </hl-group>
                        </hl-form-item>
                        <hl-form-item label="公式" prop="formulaCode">
                          <template #label>
                            <span class="form-label m-r-sm">公式</span>
                            <span class="text-secondary">(说明：用于对多个监测点的数据进行计算，包括常用的简单计算公式、第三方机构提供的公式，或者自定义复杂公式。)</span>
                          </template>
                          <hl-select v-model="unitFactor.formulaCode" placeholder="请选择公式" block filterable clearable>
                            <hl-option v-for="fm in formula" :key="fm.formulaCode" :label="fm.formulaName" :value="fm.formulaCode" />
                          </hl-select>
                        </hl-form-item>
                        <hl-form-item label="自定义公式" prop="formulaExpression" v-if="unitFactor.formulaCode === 'self_identity'">
                          <hl-input v-model="unitFactor.formulaExpression" native-type="textarea" placeholder="如消防通道占用比例公式：(X109+X119+X211)/3" block />
                        </hl-form-item>
                        <hl-form-item label="第三方公式url" prop="formulaUrl" v-if="unitFactor.formulaCode === 'third_part'">
                          <hl-input v-model="unitFactor.formulaUrl" placeholder="如空气质量AQI公式：http://www.baidu.com/aqi" block />
                        </hl-form-item>
                      </hl-form>
                    </template>
                  </collapse-section>
                  <add-new-item title="新增接入数据" @click="addMonitorFactors(eventItem)" style="width: 65%" class="m-l-md" />
                </hl-group>
              </collapse-panel>
            </hl-group>
          </collapse-panel>
        </hl-scrollbar>
      </hl-group>
    </template>
  </left-right-layout>
  <empty @openEventDialog="eventDlalogVisiable = true" v-else />
  <add-event v-if="eventDlalogVisiable" @cancel="eventDlalogVisiable = false" @event-add-ok="eventAddOk" :eventList="unitEventTypeCodeList" />
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTele } from 'fx-front-framework';
import { FormInstance, HlMessageBox } from 'hongluan-ui';
import { CommonUtils } from 'fx-front-utils';
import { useI18n } from 'vue-i18n';
import { MAX_PAGE_SIZE } from '@/common';
import { LeftRightLayout, CollapsePanel, CollapseSection } from '@/components';
import { getEventTypeList } from '@/views/monitoring-config/event-type/utils';
import { IgetListEventTypeListVOsEventTypeSpace } from '@/apis/modules/event-type/model';
import { apiControlPointObj } from '@/apis/modules/control-point';
import { IgetBaseInfoSpace, IgetEventTypesSpace } from '@/apis/modules/pointV2/model';
import { apiMonitorFactorObj } from '@/apis/modules/monitoring-factor';
import { apiMonitorPointV2Obj as api } from '@/apis/modules/point-v2';
import { IgetFindMonitorFactorPageMonitorFactorSpace } from '@/apis/modules/monitoring-factor/model';
import { apiDictObj } from '@/apis/modules/dict';
import { funcIsMonitorPage } from '@/common/utils';
import { checkExpression, checkThirdUrl, checkAccessDataCode } from '../utils';
import empty from './empty.vue';
import addEvent from './addEvent.vue';

const { t } = useI18n();
const { showTeleport } = useTele();
const route = useRoute();
const router = useRouter();

const factors = ref<IgetFindMonitorFactorPageMonitorFactorSpace.List[]>([]);
const formula = ref<Record<string, string>[]>([]);
const eventDlalogVisiable = ref(false); // 添加风险分类
const unitEventTypeList = ref<IgetEventTypesSpace.Data[]>([]); // 数据配置
const eventListAll = ref<IgetListEventTypeListVOsEventTypeSpace.Data[]>([]);
const eventListEmit = ref<string[]>([]); // 当前点位关联事件 (['AABBC1', 'AABBC2']);

const isMonitorPage = document.location.href.indexOf('/monitoring-config/') > -1;
const pageType = funcIsMonitorPage() ? `${t('warningType')}` : '预警类型';

const unitEventTypeCodeList = computed(() => {
  return unitEventTypeList.value.map((item: IgetEventTypesSpace.Data) => {
    return item.eventTypeCode;
  });
});
const pushEvent = (data: IgetListEventTypeListVOsEventTypeSpace.Data) => {
  return {
    unitId: route.query.pointId as unknown as string,
    unitEventId: '',
    eventTypeCode: data.eventTypeCode,
    eventTypeName: data.eventTypeName,
    frequencyList: [
      {
        id: '',
        frequencyName: '',
        frequencyType: 1,
        frequencyCornStr: '',
        alarmStrategyName: '',
        alarmStrategyId: '',
        warnStrategyName: '',
        warnStrategyId: ''
      }
    ],
    monitorFactors: [
      {
        unitFactorId: '',
        factorId: '',
        factorName: '',
        accessDataCodes: [
          {
            dataCode: '',
            dataCodeDesc: ''
          }
        ],
        formulaCode: '',
        formulaCodeName: '',
        formulaExpression: '',
        formulaUrl: ''
      }
    ]
  };
};
const eventAddOk = (data: string[]) => {
  eventListEmit.value = data;
  // 全部风险分类筛选出 选中的风险分类
  console.log('check', eventListAll.value, data);
  const eventListSelect = eventListAll.value.filter((item: IgetListEventTypeListVOsEventTypeSpace.Data) => {
    return eventListEmit.value.includes(item.eventTypeCode);
  });
  // 根据选中的风险分类 过滤目前存在风险分类--解决原始数据穿框狂删除仍然存在
  unitEventTypeList.value = unitEventTypeList.value.filter((item: IgetEventTypesSpace.Data) => {
    return eventListEmit.value.includes(item.eventTypeCode);
  });
  // 添加新风险分类
  eventListSelect.forEach((item: IgetListEventTypeListVOsEventTypeSpace.Data) => {
    if (!unitEventTypeCodeList.value.includes(item.eventTypeCode)) {
      unitEventTypeList.value.push(pushEvent(item));
    }
  });
  eventDlalogVisiable.value = false;
};
const removeEvent = async(data: IgetEventTypesSpace.Data, index: number) => {
  await HlMessageBox.confirm(`您确认删除[${data.eventTypeName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
    type: 'success'
  });
  // 仅对于有unitEventId 删除，新添加类型得不调接口
  data.unitEventId && (await apiControlPointObj.deleteE(data.unitEventId));
  unitEventTypeList.value.splice(index, 1);
};
// 添加form实例
const unitFactorFormRefs: FormInstance[] = [];
const addUnitFactorFormRef = (form: FormInstance) => {
  form && !unitFactorFormRefs.includes(form) && unitFactorFormRefs.push(form);
};
const ok = async() => {
  try {
    await Promise.all([...unitFactorFormRefs.filter(f => f).map(uf => uf.validate())]);
    submitForm();
  } catch {}
};
const submitForm = async() => {
  await api.postUpdateAccessData(unitEventTypeList.value);
  router.push({
    name: 'point',
    query: {
      regionId: route.query.regionId
    }
  });
};
// 表单rules
const getFrequencyRules = () => ({
  frequencyName: [{ required: true, message: '请输入频段名称', trigger: ['blur'] }],
  frequencyCornStr: [{ required: true, message: '请输入频段周期', trigger: ['blur'] }]
});
const getUnitFactorRules = (unitFactorFormData: IgetEventTypesSpace.MonitorFactor) => ({
  factorId: [{ required: true, message: '请选择监测因子', trigger: ['change'] }],
  accessDataCodes: [{ validator: checkAccessDataCode, trigger: ['change'] }],
  formulaExpression: [{ validator: checkExpression(unitFactorFormData), trigger: ['change'] }],
  formulaUrl: [{ validator: checkThirdUrl(unitFactorFormData), trigger: ['change'] }]
});
// 动态操作表单 ---------
const pushFrequency = () => {
  return {
    id: '',
    frequencyName: '',
    frequencyCornStr: '',
    alarmStrategyName: '',
    alarmStrategyId: '',
    warnStrategyName: '',
    warnStrategyId: ''
  };
};
const addFrequency = (data: IgetEventTypesSpace.Data) => {
  data.frequencyList.push(pushFrequency());
};
const delFrequency = (data: IgetEventTypesSpace.Data, index: number) => {
  data.frequencyList.splice(index, 1);
};
// 接入数据 >
const pushMonitorFactors = () => {
  return {
    unitFactorId: '',
    factorId: '',
    factorName: '',
    accessDataCodes: [
      {
        dataCode: '',
        dataCodeDesc: ''
      }
    ],
    formulaCode: '',
    formulaCodeName: '',
    formulaExpression: '',
    formulaUrl: ''
  };
};
const addMonitorFactors = (data: IgetEventTypesSpace.Data) => {
  data.monitorFactors.push(pushMonitorFactors());
};
const delMonitorFactors = (data: IgetEventTypesSpace.Data, index: number) => {
  data.monitorFactors.splice(index, 1);
};
// 接入数据 > 标识码
const pushAccessDataCode = () => {
  return {
    dataCode: '',
    dataCodeDesc: ''
  };
};
const addAccessDataCode = (data: IgetEventTypesSpace.AccessDataCode[]) => {
  data.push(pushAccessDataCode());
};
const delAccessDataCode = (data: IgetEventTypesSpace.AccessDataCode[], idx: number) => {
  data.splice(idx, 1);
};

const filterOptions = (eventTypeCode: string) => {
  if (!factors.value || !factors.value.length) return [];
  return factors.value.filter(factor => factor.riskTypeCode === eventTypeCode);
};

onMounted(async() => {
  // 全部风险分类
  eventListAll.value = await getEventTypeList();
  // 点位事件及频段因子详情
  const { data } = await api.getEventTypes(route.query.pointId as unknown as number);
  unitEventTypeList.value = data;
  // 因子下拉
  const factorsResult = await apiMonitorFactorObj.getFindMonitorFactorPageMonitorFactor(`pageSize=${MAX_PAGE_SIZE}`);
  factors.value = factorsResult.data.list;
  // 公式下拉
  const formulaResult = await apiDictObj.getListFormulaDefinedVOs();
  formula.value = formulaResult.data;
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
    // padding-bottom: calc(var(--md));
    background: var(--factor-bg-color);
    margin-left: calc(var(--lg) + var(--xl));
  }
}
</style>
