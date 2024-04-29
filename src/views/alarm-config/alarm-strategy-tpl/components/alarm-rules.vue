<template>
  <div class="rule-list">
    <!-- :show-delete="rulesData.length && (ruleData.isNew || action === 'add')" -->
    <collapse-section v-for="(ruleData, idx) in rulesData" :key="ruleData.id"
      :title="ruleData.ruleName || `规则${idx + 1}`" @del="delRule(ruleData.id, idx)"
      :show-delete="true">
      <template #default="{ isOpen }">
        <div v-show="isOpen" class="rule-item m-t-lg p-xxl">
          <hl-form :ref="addFormRef" :model="ruleData" :width="['col-24', 'col-24']" :rules="rules"
            class="hl-row grid grid-direction-vertical count-2" style="--row-gap-y: var(--md); --row-gap-x: var(--md)">
            <hl-form-item label="报警等级" prop="ruleLevel">
              <hl-select v-model="ruleData.ruleLevel" placeholder="请选择报警等级" block filterable clearable>
                <hl-option v-for="item in alarmLevelsComp" :key="item.dictCode" :label="item.dictName"
                  :value="item.dictCode" :disabled="item.disabled"/>
              </hl-select>
            </hl-form-item>
            <hl-form-item label="规则名称" prop="ruleName">
              <hl-input v-model="ruleData.ruleName" placeholder="请输入" maxlength="20" show-word-limit block />
            </hl-form-item>
            <hl-form-item label="规则描述" prop="ruleDesc" class="col-span-2">
              <hl-input v-model="ruleData.ruleDesc" native-type="textarea" placeholder="请输入" maxlength="500"
                show-word-limit block />
            </hl-form-item>
            <hl-form-item label="阈值范围" prop="strategyRuleFactorParams" class="col-span-2">
              <hl-group v-for="(item, itemIdx) in ruleData.strategyRuleFactorParams" :key="item.id"
                align="w-full items-between items-middle" class="m-t-md">
                <hl-group align="items-middle">
                  <span class="m-r-sm">{{ item.lowKey }}</span>
                  <hl-select v-model="item.lowExpression" placeholder="请选择" class="w-sm m-r-sm" filterable clearable>
                    <hl-option v-for="ep in EXPRESSIONS" :key="ep.key" :value="ep.key" :label="ep.label" />
                  </hl-select>
                  <hl-input v-model="item.lowValue" placeholder="请输入" class="w-sm" />
                </hl-group>
                <hl-group align="items-middle">
                  <span class="m-r-sm">{{ item.upKey }}</span>
                  <hl-select v-model="item.upExpression" placeholder="请选择" class="w-sm m-r-sm" filterable clearable>
                    <hl-option v-for="ep in EXPRESSIONS" :key="ep.key" :value="ep.key" :label="ep.label" />
                  </hl-select>
                  <hl-input v-model="item.upValue" placeholder="请输入" class="w-sm m-r-xxs" />
                  <hl-icon type="danger" class="cursor-pointer m-l-md" @click="delRuleFactor(ruleData, itemIdx)" v-if="ruleData.strategyRuleFactorParams.length > 1">
                        <FillCircleMinus></FillCircleMinus>
                  </hl-icon>
                </hl-group>
              </hl-group>
              <hl-group class="radius-lg w-full cursor-pointer m-t-md" style="padding-top: 6px; padding-bottom: 6px;"
                align="items-center items-middle" gap="var(--xxs)" v-if="ruleData.strategyRuleFactorParams.length<10">
                <hl-icon size="xs" class="static" type="primary">
                  <TwoPlus></TwoPlus>
                </hl-icon><span class="text-primary" @click="addRuleFactor(ruleData)">添加阈值范围</span>
              </hl-group>
            </hl-form-item>
          </hl-form>
        </div>
      </template>
    </collapse-section>
    <add-new-item title="新增规则" @click="addRule" style="width: calc(100% - 2 * var(--lg)); margin-left: var(--lg)"
      v-if="$props.eventTypeCode" />
    <div v-else style="text-align: center">请先选择基本信息中的风险分类</div>
  </div>
</template>
<script lang="ts" setup>
import { ref, PropType, watch, computed, } from 'vue';
import { useRoute } from 'vue-router';
import { cloneDeep, omit } from 'lodash-es';
import { FormInstance } from 'hongluan-ui';
import { apiDictObj as dictApi } from '@/apis/modules/dict-api';
import { eventTypeApiObj as eventTypeApi } from '@/apis/modules/event-type-api';
import { AddNewItem, CollapseSection } from '@/components';
import { EXPRESSIONS } from '@/common';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { createNewRule, createInterzoneItem, } from './utils';

const props = defineProps({
  eventTypeCode: String,
  alarmRulesData: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});

const route = useRoute();

const action = computed(() => route.query.action);
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

const ruleFormRefs: FormInstance[] = [];
const rulesData = ref<any[]>([]); // 报警规则数据
const allAlarmLevels = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const alarmLevels = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);

watch(
  () => props.alarmRulesData,
  (n, o) => {
    if (n) {
      // 深拷贝防止formData变更，多次监听props
      Object.assign(rulesData.value, cloneDeep(props.alarmRulesData));
    }
  },
  {
    deep: true,
  }
);
// 风险分类 用于获取风险等级
watch(
  () => props.eventTypeCode,
  async n => {
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
        // 每次eventcode 变更风险等级 置空  解决填写报警规则后 再次变更风险分类/  inLevels解决 模板选择
        rulesData.value.forEach(rd => {
          if (!inLevels.includes(rd.ruleLevel)) {
            rd.ruleLevel = '';
          }
        });
      }
    } else {
      alarmLevels.value = [];
      rulesData.value = [];
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

// 表单规则rules校验
const addFormRef = (el: any) => {
  el && !ruleFormRefs.includes(el) && ruleFormRefs.push(el);
};
// 新增规则
const addRule = () => {
  rulesData.value.push(createNewRule());
};
// 删除规则
const delRule = (id: string, index:number) => {
  // rulesData.value.splice(
  //   rulesData.value.findIndex(d => (d as any).id === id),
  //   1
  // );
  rulesData.value.splice(index, 1);
};
// 新增阈值小项
const addRuleFactor = (factors: any) => {
  factors.strategyRuleFactorParams.push(createInterzoneItem());
  // validate();
};
// 删除阈值 小项
const delRuleFactor = (factors: any, idx: number) => {
  factors.strategyRuleFactorParams.splice(idx, 1);
  // validate();
};
// 校验表单
const validate = async() => {
  for (let i = 0; i < ruleFormRefs.length; i++) {
    await ruleFormRefs[i].validate();
  }
};
const getResult = () => {
  if (!rulesData.value.length) {
    // 验证报警规则不为空
    return false;
  }
  const result = cloneDeep(rulesData.value);
  return result.map(r => ({
    ...omit(r, 'strategyRuleFactorParams', 'id', 'isNew'),
    factorValue: JSON.stringify(r.strategyRuleFactorParams.map((s: any) => {
      return omit(s, 'id', 'isNew');
    }))
  }));
};
// 获取报警等级 根据风险分类
const loadAlarmLevels = async(eventTypeCode: string) => {
  const result = await eventTypeApi.detail(eventTypeCode);
  alarmLevels.value = allAlarmLevels.value.filter(a => result.data.alarmLevelTypeList.includes(a.dictCode));
  return result.data; // 解决模板选择 风险等级清空问题
};

const rules = {
  ruleName: [{ required: true, message: '规则名称不能为空' }],
  ruleLevel: [{ required: true, message: '请选择报警等级' }],
  strategyRuleFactorParams: [
    {
      required: true,
      validator: (
        _: any,
        value: any[],
        callback: (err?: Error) => void
      ) => {
        if (value.length === 0) { callback(new Error('阈值不能为空')); }
        if (value.length > 10) { callback(new Error('阈值最多为10条')); }
        let isValid = true;
        value.forEach((fv: any, index: number) => {
          if (fv.lowExpression === 'none' || fv.upExpression === 'none') {
            if (
              fv.lowExpression === 'none' &&
              fv.upExpression === 'none'
            ) {
              isValid = true;
            }
            if (
              fv.lowExpression === 'none' &&
              fv.upExpression !== 'none' &&
              !fv.upValue
            ) {
              callback(new Error(`请填写第【${index + 1}】行阈值信息`));
              isValid = false;
            }
            if (
              fv.upExpression === 'none' &&
              fv.lowExpression !== 'none' &&
              !fv.lowValue
            ) {
              callback(new Error(`请填写第【${index + 1}】行阈值信息`));
              isValid = false;
            }
          } else {
            if (
              !fv.lowExpression ||
              !fv.lowValue ||
              !fv.upExpression ||
              !fv.upValue
            ) {
              callback(new Error(`请填写第【${index + 1}】行阈值信息`));
              isValid = false;
            }
          }
        });
        if (isValid) callback();
      },
      trigger: ['change', 'blur']
    },
  ],
};

defineExpose({
  validate,
  getResult,
});
</script>
<style lang="scss" scoped>
.rule-list {
  --collapse-bg-color: var(--bg-content);
  --collapse-border-color: var(--factor-bg-color);
  width: calc(var(--xxl) * 29 + var(--xl) + 2 * var(--lg));
  margin-bottom: var(--xl);

  .rule-item {
    background: var(--factor-bg-color);
    margin-left: calc(var(--lg) + var(--xl));
  }

  .hl-form-item {
    :deep(.form-label) {
      display: inline-block;
    }
  }
}
</style>
