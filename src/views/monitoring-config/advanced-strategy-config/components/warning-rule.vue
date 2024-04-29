<template>
  <hl-panel radius="0px" borderless padding="var(--lg)" body-class="display-flex items-left items-top flex-row content p-l-lg p-r-lg p-b-lg" footer-style>
    <template #header>
      <panel-header title="预警规则"></panel-header>
    </template>
    <template #default>
      <div class="rule-list">
        <collapse-section v-for="(ruleData, idx) in rulesData" :key="ruleData.id"
          :title="ruleData.ruleName || `规则${idx + 1}`" @del="delRule(idx)"
          :show-delete="(rulesData.length && (ruleData.isNew || action === 'add')) || associated === 'un_relation'"
          style="width: 1220px;background: var(--bg-content);" :border-title="false">
          <template #default="{ isOpen }">
            <div v-show="isOpen">
              <hl-form :ref="addFormRef" :model="ruleData" :rules="rules"
              :label-position="['items-left', 'items-middle']" gap="var(--lg)" item-gap="var(--lg2)" class="form-size">
              <hl-group gap="var(--lg)">
                <hl-form-item label="预警等级" prop="ruleLevel" class="col-span-2">
                  <hl-select style="width:600px;" v-model="ruleData.ruleLevel" placeholder="请选择预警等级" filterable clearable>
                    <hl-option v-for="item in alarmLevelsComp" :key="item.dictCode" :label="item.dictName"
                      :value="item.dictCode" :disabled="item.disabled" />
                  </hl-select>
                </hl-form-item>
                <hl-form-item label="规则名称" prop="ruleName" class="col-span-2">
                  <hl-input style="width:600px;" v-model="ruleData.ruleName" placeholder="请输入" maxlength="20"
                    show-word-limit />
                </hl-form-item>
              </hl-group>
                <hl-form-item label="描述" prop="ruleDesc" class="col-span-2">
                  <hl-input style="width:600px;" v-model="ruleData.ruleDesc" native-type="textarea" placeholder="请输入"
                    maxlength="500" show-word-limit />
                </hl-form-item>
                <hl-form-item label="预警标题生成规则" prop="alarmTitle" class="col-span-2">
                  <hl-input style="width:600px;" v-model="ruleData.alarmTitle" placeholder="请输入" maxlength="100"
                    native-type="textarea" show-word-limit />
                  <div class="text-secondary m-l-xxl" style="width:600px;">
                    {{ STATERAGY_TITLE_DES }}
                  </div>
                </hl-form-item>
                <hl-form-item label="预警描述生成规则" prop="alarmDesc" class="col-span-2" dir="vertical">
                  <hl-input style="width:600px;" v-model="ruleData.alarmDesc" placeholder="请输入" maxlength="200"
                    native-type="textarea" show-word-limit />
                  <div class="text-secondary m-l-xxl" style="width:600px;">
                    {{ STATERAGY_RULE_DES }}
                  </div>
                </hl-form-item>
                <hl-form-item label="策略计算频率" prop="strategyCalculateFrequencyCorn" class="col-span-2">
                  <hl-input style="width:600px;" v-model="ruleData.strategyCalculateFrequencyCorn" placeholder="请输入cron表达式"
                    maxlength="100" show-word-limit />
                  <hl-popover placement="bottom-end" title="" :width="200" trigger="click">
                    <template #reference>
                      <hl-button class="m-l-md" type="primary" effect="light"
                        @click="getPlanList(ruleData.strategyCalculateFrequencyCorn)">查看执行计划</hl-button>
                    </template>
                    <hl-list class="plan-list">
                      <hl-list-item v-for="(item, index) in datePlanList" :key="index">
                        {{ item }}
                      </hl-list-item>
                    </hl-list>
                  </hl-popover>
                </hl-form-item>
                <hl-form-item label="预警规则模型" prop="warningRuleModel" class="col-span-2">
                  <hl-select style="width:600px;" v-model="ruleData.warningRuleModel" placeholder="请选择" filterable
                    clearable>
                    <hl-option v-for="item in warningRuleModelList" :key="item.dictCode" :label="item.dictName"
                      :value="item.dictCode" />
                  </hl-select>
                  <div class="text-secondary m-l-xxl" style="width:600px;">注：系统为特定需求定制预警规则模型，用于进行复杂逻辑计算，生成预警信息。</div>
                </hl-form-item>
              </hl-form>
            </div>
          </template>
        </collapse-section>
        <add-new-item title="新增规则" @click="addRule" style="width: 1220px;" v-if="$props.eventTypeCode" class="m-t-lg"/>
        <div v-else style="text-align: center">请先选择基本信息中的风险分类</div>
      </div>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import {
  ref,
  PropType,
  watch,
  computed,
} from 'vue';
import { useRoute } from 'vue-router';
import { cloneDeep, omit, isEmpty } from 'lodash-es';
import { FormInstance, HlMessage } from 'hongluan-ui';
import { apiDictObj as dictApi } from '@/apis/modules/dict-api';
import { eventTypeApiObj as eventTypeApi } from '@/apis/modules/event-type-api';
import { AddNewItem, CollapseSection } from '@/components';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import {
  createNewRule,
} from '@/views/monitoring-config/advanced-strategy-config/components/utils';
import { STATERAGY_TITLE_DES, STATERAGY_RULE_DES } from '@/views/monitoring-config/second-trigger-config/utils';
import { isValidAlarmTitle, isValidAlarmDesc } from '@/common';
import { apiAdvancedStrategyObj } from '@/apis/modules/advanced-strategy';

const props = defineProps({
  eventTypeCode: String,
  alarmLevels: {
    type: Array as PropType<IgetListDictCustomVOsDictSpace.Data[]>,
    default: () => []
  },
  detail: {
    type: Object,
    default: () => ({})
  },
});
const route = useRoute();

const action = computed(() => route.query.action);
const associated = computed(() => route.query.associated);

const datePlanList = ref<string[]>([]);
const getPlanList = async (value: string) => {
  if (!value) {
    HlMessage.warning('请输入策略计算频率');
    return;
  }
  datePlanList.value = [];
  const res = await apiAdvancedStrategyObj.getFindNextExecTime(value as string);
  datePlanList.value = res.data;
};

const alarmLevelsComp = computed(() => {
  const ids = rulesData.value.map((item: any) => {
    return item.ruleLevel;
  });
  return alarmLevels.value.map((item: IgetListDictCustomVOsDictSpace.Data) => {
    // 已选择不可选
    return {
      ...item,
      disabled: ids.includes(item.dictCode)
    };
  });
});

const warningRuleModelList = ref();

const ruleFormRefs: FormInstance[] = [];
const rulesData = ref<any[]>([]);
const allAlarmLevels = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const alarmLevels = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);

const addFormRef = (el: any) => {
  el && !ruleFormRefs.includes(el) && ruleFormRefs.push(el);
};

// 新增规则
const addRule = () => {
  rulesData.value.push(createNewRule());
};
const delRule = (idx: number) => {
  rulesData.value.splice(idx, 1);
};

// 校验
const validate = async () => {
  await Promise.all(
    ruleFormRefs.map(item => {
      return item.validate();
    })
  );
};
// 校验有没有填写
const isEmtyRuleList = () => { return !rulesData.value.length; };
const getResult = () => {
  if (!rulesData.value.length) {
    // 验证报警规则不为空
    return false;
  }
  const result = cloneDeep(rulesData.value);
  return result.map((r: any) => ({
    ...omit(r, 'id', 'isNew'),
  }));
};

watch(
  () => props.detail,
  (n, o) => {
    if (!isEmpty(n)) {
      Object.assign(rulesData.value, cloneDeep(props.detail));
    }
  },
  {
    deep: true
  }
);
// 风险分类 用于获取风险等级
watch(
  () => props.eventTypeCode,
  async (n, o) => {
    if (n) {
      if (!allAlarmLevels.value.length) {
        const result = await dictApi.list('ALARM_LEVEL_CODE');
        allAlarmLevels.value = result.data;
      }
      // 获取风险等级
      await loadAlarmLevels(n);
      const inLevels = alarmLevels.value.map((item: any) => {
        return item.dictCode;
      });
      // 编辑 风险类型不可编辑
      if (action.value !== 'edit') {
        // 每次eventcode 变更风险等级 置空  解决填写预警规则后 再次变更风险分类/  inLevels解决 模板选择
        rulesData.value.forEach(rd => {
          if (!inLevels.includes(rd.ruleLevel)) {
            rd.ruleLevel = '';
          }
        });
      }
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

// 获取预警等级 根据风险分类
const loadAlarmLevels = async (eventTypeCode: string) => {
  const result = await eventTypeApi.detail(eventTypeCode);
  alarmLevels.value = allAlarmLevels.value.filter(a => result.data.alarmLevelTypeList.includes(a.dictCode));
  return result.data;
};

const isValidCorn = async (rule: any, value: string, callback: (error?: Error) => void) => {
  const res = await apiAdvancedStrategyObj.getCheckCorn(value as string);
  if (res.data) {
    callback();
  } else {
    callback(new Error('cron表达式不正确'));
  }
};

const rules = {
  ruleName: [{ required: true, message: '规则名称不能为空' }],
  ruleLevel: [{ required: true, message: '请选择预警等级' }],
  alarmTitle: [{ required: true, message: '预警标题生成规则不能为空' }, { validator: isValidAlarmTitle, trigger: ['change', 'blur'] }],
  alarmDesc: [{ required: true, message: '预警描述生成规则不能为空' }, { validator: isValidAlarmDesc, trigger: ['change', 'blur'] }],
  strategyCalculateFrequencyCorn: [{ required: true, message: '策略计算频率不能为空' }, { validator: isValidCorn, trigger: ['blur'] }],
  warningRuleModel: [{ required: true, message: '预警规则模型不能为空' }],
};

const loadWarningRuleMode = async () => {
  const result = await dictApi.list('WARNING_MODEL');
  warningRuleModelList.value = result.data;
};
loadWarningRuleMode();

defineExpose({
  validate,
  getResult,
  isEmtyRuleList
});
</script>
<style lang="scss" scoped>
.rule-list {
  --collapse-border-color: var(--factor-bg-color);
  margin-bottom: var(--xl);
  width: 100%;

  .rule-item {
    background: var(--factor-bg-color);
  }

  .hl-form-item {
    :deep(.form-label) {
      display: inline-block;
    }
  }
}

.plan-list {
  .hl-list-item {
    height: 32px !important;
  }
}
</style>
