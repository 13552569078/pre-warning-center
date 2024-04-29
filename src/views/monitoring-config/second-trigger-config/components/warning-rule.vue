<template>
  <hl-panel radius="0px" borderless padding="var(--lg)" body-class="display-flex items-left items-top flex-row content p-l-lg p-r-lg p-b-lg" footer-style>
    <template #header>
      <panel-header title="预警规则"></panel-header>
    </template>
    <template #default>
      <div class="rule-list">
        <collapse-section v-for="(ruleData, idx) in rulesData" :key="ruleData.id"
          :title="ruleData.ruleName || `规则${idx + 1}`" @del="delRule(idx)" :show-delete="true"
          style="width: 1220px; background: var(--bg-content);" :border-title="false">
          <template #default="{ isOpen }">
            <div v-show="isOpen">
              <hl-form :ref="addFormRef" :model="ruleData" :rules="rules"
              :label-position="['items-left', 'items-middle']" gap="var(--lg)" item-gap="var(--lg2)" class="form-size">
                <hl-group gap="var(--lg2)">
                  <hl-form-item label="预警等级" prop="ruleLevel" class="col-span-2 is-required">
                  <hl-select style="width: 600px" v-model="ruleData.ruleLevel" placeholder="请选择预警等级" filterable clearable>
                    <hl-option v-for="item in alarmLevelsComp" :key="item.dictCode" :label="item.dictName"
                      :value="item.dictCode" :disabled="item.disabled" />
                  </hl-select>
                </hl-form-item>
                <hl-form-item label="规则名称" prop="ruleName" class="col-span-2 is-required">
                  <hl-input style="width: 600px" v-model="ruleData.ruleName" placeholder="请输入" maxlength="20"
                    show-word-limit />
                </hl-form-item>
                </hl-group>
                <hl-form-item label="描述" prop="ruleDesc" class="col-span-2">
                  <hl-input style="width: 600px" v-model="ruleData.ruleDesc" native-type="textarea" placeholder="请输入"
                    maxlength="500" show-word-limit />
                </hl-form-item>
                <hl-form-item label="预警标题生成规则" prop="alarmTitle" class="col-span-2 is-required">
                  <hl-group dir="vertical" gap="var(--sm)">
                    <hl-input style="width: 600px" v-model="ruleData.alarmTitle" placeholder="请输入" maxlength="100"
                      native-type="textarea" show-word-limit />
                    <div class="text-secondary" style="width: 600px">
                      {{ STATERAGY_TITLE_DES }}
                    </div>
                  </hl-group>
                </hl-form-item>
                <hl-form-item label="预警描述生成规则" prop="alarmDesc" class="col-span-2 is-required">
                  <hl-group dir="vertical" gap="var(--sm)">
                    <hl-input style="width: 600px" v-model="ruleData.alarmDesc" placeholder="请输入" maxlength="200"
                      native-type="textarea" show-word-limit />
                    <div class="text-secondary" style="width: 600px">
                      {{ STATERAGY_RULE_DES }}
                    </div>
                  </hl-group>
                </hl-form-item>
                <template v-if="filterType.includes(WARNING_NUMBER)">
                  <hl-form-item label="预警数阈值" prop="warningNumberThresholdValue" class="col-span-2 is-required">
                    <hl-group v-for="(item, itemIdx) in ruleData.warningNumberThresholdValue" :key="item.id"
                      align="w-full items-between m-b-lg items-middle">
                      <hl-group align="items-middle">
                        <hl-group align="items-middle">
                          <span class="m-r-sm">{{ item.lowKey }}</span>
                          <hl-select v-model="item.lowExpression" placeholder="请选择" class="w-sm m-r-sm" filterable
                            clearable>
                            <hl-option v-for="ep in EXPRESSIONS" :key="ep.key" :value="ep.key" :label="ep.label" />
                          </hl-select>
                          <hl-input v-model="item.lowValue" placeholder="请输入" class="w-sm" />
                        </hl-group>
                        <hl-group align="items-middle" class="m-l-xxl">
                          <span class="m-r-sm">{{ item.upKey }}</span>
                          <hl-select v-model="item.upExpression" placeholder="请选择" class="w-sm m-r-sm" filterable
                            clearable>
                            <hl-option v-for="ep in EXPRESSIONS" :key="ep.key" :value="ep.key" :label="ep.label" />
                          </hl-select>
                          <hl-input v-model="item.upValue" placeholder="请输入" class="w-sm m-r-xxs" />
                        </hl-group>
                        <hl-icon type="danger" class="cursor-pointer m-l-md"
                          @click="delWarningItem(ruleData.warningNumberThresholdValue, itemIdx)"
                          v-if="ruleData.warningNumberThresholdValue.length > 1">
                          <FillCircleMinus></FillCircleMinus>
                        </hl-icon>
                      </hl-group>
                    </hl-group>
                  </hl-form-item>
                  <!-- 预警数添加阈值 -->
                  <hl-group class="radius-lg cursor-pointer block"
                    style="padding-top: 6px; padding-bottom: 6px; width: 90%" align="items-center items-middle"
                    gap="var(--xxs)" v-if="ruleData.warningNumberThresholdValue.length < MAX_THRESHOLD">
                    <hl-icon size="xs" class="static" type="primary">
                      <TwoPlus></TwoPlus>
                    </hl-icon><span class="text-primary"
                      @click="addWarningItem(ruleData.warningNumberThresholdValue)">添加预警数阈值范围</span>
                  </hl-group>
                </template>
                <template v-if="filterType.includes(RATIO)">
                  <hl-form-item label="占比阈值" prop="rateThresholdValue" class="col-span-2 is-required">
                    <hl-group v-for="(item, itemIdx) in ruleData.rateThresholdValue" :key="item.id"
                      align="w-full items-between m-b-lg items-middle">
                      <hl-group align="items-middle">
                        <hl-group align="items-middle">
                          <span class="m-r-sm">{{ item.lowKey }}</span>
                          <hl-select v-model="item.lowExpression" placeholder="请选择" class="w-sm m-r-sm" filterable
                            clearable>
                            <hl-option v-for="ep in EXPRESSIONS" :key="ep.key" :value="ep.key" :label="ep.label" />
                          </hl-select>
                          <hl-input v-model="item.lowValue" placeholder="请输入" class="w-sm" />
                        </hl-group>
                        <hl-group align="items-middle" class="m-l-xxl">
                          <span class="m-r-sm">{{ item.upKey }}</span>
                          <hl-select v-model="item.upExpression" placeholder="请选择" class="w-sm m-r-sm" filterable
                            clearable>
                            <hl-option v-for="ep in EXPRESSIONS" :key="ep.key" :value="ep.key" :label="ep.label" />
                          </hl-select>
                          <hl-input v-model="item.upValue" placeholder="请输入" class="w-sm m-r-xxs" />
                        </hl-group>
                        <hl-icon type="danger" class="cursor-pointer m-l-md"
                          @click="delWarningItem(ruleData.rateThresholdValue, itemIdx)"
                          v-if="ruleData.rateThresholdValue.length > 1">
                          <FillCircleMinus></FillCircleMinus>
                        </hl-icon>
                      </hl-group>
                    </hl-group>
                  </hl-form-item>
                  <!-- 占比添加阈值 -->
                  <hl-group class="radius-lg cursor-pointerblock"
                    style="padding-top: 6px; padding-bottom: 6px; width: 90%" align="items-center items-middle"
                    gap="var(--xxs)" v-if="ruleData.rateThresholdValue.length < MAX_THRESHOLD">
                    <hl-icon size="xs" class="static" type="primary">
                      <TwoPlus></TwoPlus>
                    </hl-icon><span class="text-primary"
                      @click="addWarningItem(ruleData.rateThresholdValue)">添加占比阈值范围</span>
                  </hl-group>
                </template>
                <hl-form-item label="统计项间逻辑关系" prop="condition" class="col-span-2 is-required"
                  v-if="filterType.length > 1">
                  <hl-radio-group v-model="ruleData.ruleLogicRelationship" gap-x="var(--xl)" gap="var(--md)" custom>
                    <hl-radio :label="1">
                      <div
                        class="p-xs p-l-lg p-r-lg border radius-lg checked:bg-primary-light-5 checked:border-primary checked:text-primary">
                        与</div>
                    </hl-radio>
                    <hl-radio :label="2">
                      <div
                        class="p-xs p-l-lg p-r-lg border radius-lg checked:bg-primary-light-5 checked:border-primary checked:text-primary">
                        或</div>
                    </hl-radio>
                  </hl-radio-group>
                </hl-form-item>
              </hl-form>
            </div>
          </template>
        </collapse-section>
        <add-new-item title="新增规则" @click="addRule" style="width: 1228px；" v-if="eventTypeCode" class="m-t-lg" />
        <div v-else style="text-align: center">请先选择基本信息中的风险分类</div>
      </div>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref, PropType, computed, watch } from 'vue';
import { FormInstance } from 'hongluan-ui';
import { isEmpty, cloneDeep } from 'lodash-es';
import { PanelHeader } from '@/components';
import { isPositiveIntAndZero, EXPRESSIONS, isValidAlarmTitle, isValidAlarmDesc } from '@/common';
import { AddNewItem, CollapseSection } from '@/components';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { STATERAGY_TITLE_DES, STATERAGY_RULE_DES, createNewRule, addFactorItem, WARNING_NUMBER, RATIO, MAX_THRESHOLD } from '@/views/monitoring-config/second-trigger-config/utils';
import { Indexable } from 'fx-front-utils';

const props = defineProps({
  eventTypeCode: String,
  alarmLevels: {
    type: Array as PropType<IgetListDictCustomVOsDictSpace.Data[]>,
    default: () => []
  },
  target: {
    type: Object
  },
  detail: {
    type: Object,
    default: () => ({})
  },
  filterType: {
    type: Array as PropType<string[]>,
    default: () => []
  }
});

const alarmLevelsComp = computed(() => {
  // 风险等级唯一
  const ids = rulesData.value.map((item: any) => {
    return item.ruleLevel;
  });
  return props.alarmLevels.map((item: IgetListDictCustomVOsDictSpace.Data) => {
    return {
      ...item,
      disabled: ids.includes(item.dictCode)
    };
  });
});

const ruleFormRefs: FormInstance[] = [];
const rulesData = ref<Indexable<any>[]>([]);

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

const addFormRef = (el: any) => {
  el && !ruleFormRefs.includes(el) && ruleFormRefs.push(el);
};
// 规则opration
const delRule = (idx: number) => {
  rulesData.value.splice(idx, 1);
};
const addRule = () => {
  rulesData.value.push(createNewRule());
};
// 预警数占比
const delWarningItem = (item: any, index: number) => {
  item.splice(index, 1);
  validate();
};
const addWarningItem = (item: any) => {
  item.push(addFactorItem());
};

// 校验有没有填写
const isEmtyRuleList = () => { return !rulesData.value.length; };
// 统一校验 for of为单独校验
const validate = async () => {
  await Promise.all(
    ruleFormRefs.map(item => {
      return item.validate();
    })
  );
};
const getResult = () => {
  const data = rulesData.value.map(item => {
    return {
      ...item,
      warningNumberThresholdValue: JSON.stringify(item.warningNumberThresholdValue),
      rateThresholdValue: JSON.stringify(item.rateThresholdValue)
    };
  });
  return data;
};

const rules = {
  ruleLevel: [{ required: true, message: '请选择预警等级' }],
  ruleName: [{ required: true, message: '规则名称不能为空' }],
  alarmTitle: [
    { required: true, message: '预警标题生成规则不能为空' },
    { validator: isValidAlarmTitle, trigger: ['change', 'blur'] }
  ],
  alarmDesc: [
    { required: true, message: '预警描述生成规则不能为空' },
    { validator: isValidAlarmDesc, trigger: ['change', 'blur'] }
  ],
  warningNumberThresholdValue: [
    { required: true, message: '预警数阈值不能为空' },
    {
      validator: (_: any, value: any[], callback: (err?: Error) => void) => {
        if (!value.length) callback(new Error('预警数阈值不允许为空'));
        let isValid = true;
        value.forEach(fv => {
          if (fv.lowExpression === 'none' || fv.upExpression === 'none') {
            if (fv.lowExpression === 'none' && fv.upExpression === 'none') {
              isValid = true;
            }
            if (fv.lowExpression === 'none' && fv.upExpression !== 'none' && !fv.upValue) {
              callback(new Error('请填写预警数阈值信息'));
              isValid = false;
            }
            if (fv.upExpression === 'none' && fv.lowExpression !== 'none' && !fv.lowValue) {
              callback(new Error('请填写预警数阈值信息'));
              isValid = false;
            }
          } else {
            if (!fv.lowExpression || !fv.lowValue || !fv.upExpression || !fv.upValue) {
              callback(new Error('请填写预警数阈值信息'));
              isValid = false;
            }
          }
          if (!isPositiveIntAndZero(+fv.upValue)) callback(new Error('预警数阈值格式错误，应为整数'));
          if (!isPositiveIntAndZero(+fv.lowValue)) callback(new Error('预警数阈值格式错误，应为整数'));
        });
        if (isValid) callback();
      }
    }
  ],
  rateThresholdValue: [
    { required: true, message: '占比阈值不能为空' },
    {
      validator: (_: any, value: any[], callback: (err?: Error) => void) => {
        if (!value.length) callback(new Error('占比阈值不允许为空'));
        let isValid = true;
        value.forEach(fv => {
          if (fv.lowExpression === 'none' || fv.upExpression === 'none') {
            if (fv.lowExpression === 'none' && fv.upExpression === 'none') {
              isValid = true;
            }
            if (fv.lowExpression === 'none' && fv.upExpression !== 'none' && !fv.upValue) {
              callback(new Error('请填写占比阈值信息'));
              isValid = false;
            }
            if (fv.upExpression === 'none' && fv.lowExpression !== 'none' && !fv.lowValue) {
              callback(new Error('请填写占比阈值信息'));
              isValid = false;
            }
          } else {
            if (!fv.lowExpression || !fv.lowValue || !fv.upExpression || !fv.upValue) {
              callback(new Error('请填写占比阈值信息'));
              isValid = false;
            }
          }
          if (!isPositiveIntAndZero(+fv.upValue)) callback(new Error('占比阈值格式错误，应为整数'));
          if (!isPositiveIntAndZero(+fv.lowValue)) callback(new Error('占比阈值格式错误，应为整数'));
        });
        if (isValid) callback();
      }
    }
  ]
};

defineExpose({
  isEmtyRuleList,
  validate,
  getResult
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
</style>
