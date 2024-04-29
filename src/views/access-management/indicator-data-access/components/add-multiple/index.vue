<template>
  <hl-panel class="content add-multiple-target second-panel-body" style="--panel-header-height: 64px;" padding="var(--lg)"
    header-class="content border-transparent" body-class="display-flex items-left items-top flex-col p-x-lg content"
    body-style="gap: 20px; padding-top: 0px; padding-bottom: 20px;"
    footer-class="items-left gap-md p-md bg-content p-l-lg second-panel-footer"><template #header>
      <div class="panel-title">
        <h5 class="title w-full">{{ route.query.title }}</h5>
        <!-- <panel-header :title=" route.query.title "/> -->
      </div>
    </template><template #default>
      <hl-group align="items-left" class="w-full" dir="vertical" gap="var(--lg2)" full>
        <hl-group class="w-full" align="items-between items-middle" gap="var(--xs)">
          <hl-group align="items-left items-middle">
            <!-- <hl-icon class="static" type="primary" size="xs">
              <FillOrnamentTitle4></FillOrnamentTitle4>
            </hl-icon>
            <h5 class="text-hover">选择监测指标数据项</h5> -->
            <panel-header title="选择监测指标数据项"/>
          </hl-group>
          <hl-button @click="addLinkData" icon-position="left" no-fill type="primary"><template #icon>
              <hl-icon class="static" type="primary" size="xs">
                <TwoPlus></TwoPlus>
              </hl-icon>
            </template>关联指标数据项</hl-button>
        </hl-group>
        <hl-simple-table class="w-full" :cols="colsFactor" :data="targetList" :border="'bordered'">
          <template #targetDataName="{ row }">
            <hl-popover placement="right" :width="500" trigger="hover">
              <template #reference>
                <hl-button type="link">{{ row.targetDataName }}</hl-button>
              </template>
              <TargetPop v-if="row" :detail="row" />
            </hl-popover>
          </template>
          <template #targetTimeList="{ row }">
            <template v-if="!row.targetTimeList?.length">
              <span>--</span>
            </template>
            <template v-else>
              <span v-for="{ timeRange, index } in row.targetTimeList" :key="index" style="display: block;">{{ timeRange
              }}</span>
            </template>
          </template>
          <template #isPublic="{ row }">
            <span>{{ row.isPublic ? '是' : '否' }}</span>
          </template>
          <template #handle="{ row }">
            <hl-button type="link" @click="handleRemove('target', row.targetDataId)">移除</hl-button>
          </template>
          <template #thresholdLevelVOList="{ row }">
        <div v-if="
          row.thresholdLevelVOList &&
          row.thresholdLevelVOList !== '--' &&
          row.thresholdLevelVOList.length
        ">
          <template v-if="row.thresholdLevelVOList.length <= 3">
            <div v-for="(item, index) in row.thresholdLevelVOList.slice(0, 3)" :key="index"
              class="display-flex items-middle">
              <hb-text-overflow method="length" :length="8" effect="light">
                {{ item.thresholdLevelName }}
              </hb-text-overflow>
              &emsp;
              {{ item.thresholdLevelValue }}
            </div>
          </template>
          <template v-else>
            <div v-for="(item, index) in row.thresholdLevelVOList.slice(0, 3)" :key="index"
              class="display-flex items-middle">
              <hb-text-overflow method="length" :length="8" effect="light">
                {{ item.thresholdLevelName }}
              </hb-text-overflow>
              &emsp;
              {{ item.thresholdLevelValue }}
            </div>
            <hl-popover placement="right" trigger="click" class="m-r-lg">
              <template #reference>
                <hl-icon type="primary" size="xxs" class="cursor-pointer">
                  <two-more />
                </hl-icon>
              </template>
              <div v-for="(item, index) in row.thresholdLevelVOList" :key="index" class="display-flex items-middle">
                <hb-text-overflow method="length" :length="8" effect="light">
                  {{ item.thresholdLevelName }}
                </hb-text-overflow>
                &emsp;
                {{ item.thresholdLevelValue }}
              </div>
            </hl-popover>
          </template>
        </div>
        <div v-else>--</div>
      </template>
        </hl-simple-table>
      </hl-group>
      <hl-group align="items-top" class="w-full" dir="vertical" gap="var(--lg2)" full>
        <hl-group align="items-left items-middle">
          <panel-header title="配置复合指标数据项"/>
        </hl-group>
        <hl-form ref="formRef" :model="formData" :rules="rules" gap="var(--lg)" item-gap="var(--lg2)" class="form-size">
          <hl-group gap="var(--lg)">
            <hl-form-item class="w-full" label="指标数据项名称" prop="targetDataName">
                <hl-input v-model="formData.targetDataName" maxlength="100" placeholder="指标数据项名称"
                  show-word-limit class="form-item-size"></hl-input>
            </hl-form-item>
            <hl-form-item class="w-full" label="指标" prop="targetId">
                <search-target-tree v-model="formData.targetId" :isEmitCode="true" @changed="changeTargetSelect" class="form-item-size"/>
            </hl-form-item>
          </hl-group>
          <hl-group gap="var(--lg)">
            <hl-form-item class="w-full" label="数据类型">
              <hl-input disabled v-model="curTarget.dataTypeName" placeholder="数据类型" class="form-item-size"></hl-input>
            </hl-form-item>
            <hl-form-item class="w-full" label="计算周期类型">
                <hl-input disabled v-model="curTarget.periodTypeName" placeholder="计算周期类型" class="form-item-size"></hl-input>
            </hl-form-item>
          </hl-group>
          <!-- 预警等级 -->
          <hl-form-item class="w-full" label="阈值等级" prop="thresholdLevelList" v-if="formData.thresholdLevelList.length">
            <hl-group class="p-lg bg-light radius-md w-full" align="items-top" dir="vertical" gap="var(--sm)"
              full="full-x">
              <hl-group v-for="(item, index) in formData.thresholdLevelList" :key="index"
                class="p-y-sm p-x-md bg-content radius-lg w-full box-shadow-sm" align="items-between items-middle"
                gap="var(--lg)">
                <hl-group align="items-left items-middle" gap="var(--lg)" class="w-full">
                  <span class="static">等级名称:</span>
                  <hl-group align="items-left items-middle" gap="var(--xs)" style="width: calc(var(--lg) * 8)">
                   <!--  <hl-input v-model="item.thresholdLevelName" class="static" placeholder="请输入"
                      style="width: 100%;"></hl-input> -->
                      {{ item.thresholdLevelName }}

                  </hl-group><span class="static">阈值:</span>
                  <hl-group align="items-left items-middle" gap="var(--xs)">
                    <hl-input v-model="item.thresholdLevelValue" class="static" placeholder="请输入"
                      style="width: 100%;"></hl-input>
                  </hl-group>
                </hl-group>
                <!-- <hl-icon v-if="index !== 0" size="xs" type="danger"
                  class="static text-secondary cursor-pointer hover:text-danger"
                  @click="delThresholdLevel(formData.thresholdLevelList, index)">
                  <FillCircleMinus></FillCircleMinus>
                </hl-icon> -->
              </hl-group>

              <!-- <hl-group v-if="Array.isArray(formData.thresholdLevelList) && formData.thresholdLevelList.length <= 9"
                class="p-x-md radius-lg w-full" style="padding-top: 6px; padding-bottom: 6px;"
                align="items-center items-middle" gap="var(--xxs)">
                <hl-icon size="xs" class="static" type="primary" @click="addThresholdLevel">
                  <TwoPlus></TwoPlus>
                </hl-icon><span class="text-primary static cursor-pointer" @click="addThresholdLevel">增加阈值等级</span>
              </hl-group> -->
            </hl-group>
          </hl-form-item>
          <hl-group align="items-left items-middle" class="w-full" gap="var(--lg)" full
            style="--form-label-color: var(--text-regular);">
            <hl-form-item class="w-full" label="数据频率">
              <hl-group align="items-center" class="w-full" dir="vertical" full>
                <hl-input v-model="curTarget.targetFrequencyName" disabled placeholder="数据频率" class="form-item-size"></hl-input>
              </hl-group>
            </hl-form-item>

            <hl-form-item class="w-full" label="启用时间" prop="initCollectTime">
              <hl-group align="items-center" class="w-full" dir="vertical" full>
                <hl-date-picker v-model="formData.initCollectTime" format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss" type="datetime" placeholder="启用时间" class="form-item-size"></hl-date-picker>
              </hl-group>
            </hl-form-item>
          </hl-group>
          <hl-form-item class="w-full" label="数据时间区间" prop="timeScopeParams">
            <hl-group dir="vertical" class="w-full">
              <hl-group class="p-lg bg-light w-full" dir="vertical" gap="var(--sm)" full>
                <hl-group class="m-b-sm bg-content p-md  w-full" v-for="(item, index) in formData.timeScopeParams"
                  :key="index" align="items-between items-middle">
                  <hl-group gap="var(--xs)" style="align-items:center;">
                    <span>日期</span>
                    <hl-date-picker format="YYYY-MM-DD" value-format="YYYY-MM-DD" v-model="item.dateStart" type="date"
                      class="w-lg" placeholder="请选择开始日期" :disabled="action === 'edit'" />
                    <span>至</span>
                    <hl-date-picker format="YYYY-MM-DD" value-format="YYYY-MM-DD" v-model="item.dateEnd" type="date"
                      class="w-lg" placeholder="请选择结束日期" :disabled="action === 'edit'" />
                    <span class="m-l-md">时间</span>
                    <hl-time-picker v-model="item.timeStart" placeholder="选择开始时间" format="HH:mm:ss"
                      value-format="HH:mm:ss" :disabled="action === 'edit'" />
                    <span>至</span>
                    <hl-time-picker format="HH:mm:ss" value-format="HH:mm:ss" v-model="item.timeEnd" placeholder="选择结束时间"
                      :disabled="action === 'edit'" />
                  </hl-group>
                  <hl-button style="width: calc(var(--lg));height: calc(var(--lg));" v-if="action !== 'edit'"
                    @click="delTimeConfigParams(index)" type="danger" round>
                    <template #icon>
                      <hl-icon size="xs">
                        <FillMinus />
                      </hl-icon>
                    </template>
                  </hl-button>
                </hl-group>
                <hl-group class="p-x-md radius-lg w-full" style="padding-top: 6px; padding-bottom: 6px;"
                  align="items-center items-middle" gap="var(--xxs)">
                  <hl-icon @click="addTimeConfigParams" style="cursor:pointer;" size="xs" class="static" type="primary">
                    <TwoPlus></TwoPlus>
                  </hl-icon><span style="cursor:pointer;" @click="addTimeConfigParams" class="text-primary">增加时间区间</span>
                </hl-group>
              </hl-group>
            </hl-group>
          </hl-form-item>
          <!-- <hl-form-item v-if="curTarget.dataType === 'INTERZONE'" class="w-full" label="阈值范围" prop="thresholdValue">
            <hl-group align="items-top" class="w-full" dir="vertical" full>
              <hl-group class="p-lg bg-light w-full" dir="vertical" gap="var(--sm)" full>
                <hl-group class="m-b-sm bg-content p-md  w-full" v-for="(item, index) in formData.thresholdValue"
                  :key="index" align="items-between items-middle">
                  <hl-group align="items-middle">
                    <span class="m-r-sm">下区间:</span>
                    <hl-select v-model="item.lowExpression" placeholder="请选择" class="w-xl m-r-sm" filterable clearable>
                      <hl-option v-for="ep in EXPRESSIONS" :key="ep.key" :value="ep.key" :label="ep.label" />
                    </hl-select>
                    <hl-input v-model="item.lowValue" placeholder="请输入" class="w-xl" />
                  </hl-group>
                  <hl-group align="items-middle">
                    <span class="m-l-md m-r-sm">上区间:</span>
                    <hl-select v-model="item.upExpression" placeholder="请选择" class="w-xl m-r-sm" filterable clearable>
                      <hl-option v-for="ep in EXPRESSIONS" :key="ep.key" :value="ep.key" :label="ep.label" />
                    </hl-select>
                    <hl-input v-model="item.upValue" placeholder="请输入" class="w-xl m-r-xxs" />
                  </hl-group>
                  <hl-button style="width: calc(var(--lg));height: calc(var(--lg));" v-if="action !== 'edit'"
                    @click="delTimeZone(formData.thresholdValue, index)" type="danger" round>
                    <template #icon>
                      <hl-icon size="xs">
                        <FillMinus />
                      </hl-icon>
                    </template>
                  </hl-button>
                </hl-group>
                <hl-group class="p-x-md radius-lg w-full" style="padding-top: 6px; padding-bottom: 6px;"
                  align="items-center items-middle" gap="var(--xxs)">
                  <hl-icon @click="addTimeZone" style="cursor:pointer;" size="xs" class="static" type="primary">
                    <TwoPlus></TwoPlus>
                  </hl-icon><span style="cursor:pointer;" @click="addTimeZone" class="text-primary">增加阈值范围</span>
                </hl-group>
              </hl-group>
            </hl-group>
          </hl-form-item> -->
          <hl-form-item v-if="curTarget.dataType === 'SWITCH'" class="w-full" label="阈值范围" prop="thresholdValue">
            <hl-switch v-model="formData.thresholdValue" :active-value="1" :inactive-value="0" />
            &nbsp;&nbsp;
            <span v-show="formData.thresholdValue">开启</span>
            <span v-show="!formData.thresholdValue">关闭</span>
          </hl-form-item>

          <hl-group gap="var(--lg)">
            <hl-form-item class="w-full" label="计量单位">
                <hl-input v-model="curTarget.measureUnitName"  disabled placeholder="计量单位" class="form-item-size"></hl-input>
            </hl-form-item>
            <hl-form-item class="w-full" label="所属分组">
                <hl-input v-model="curTarget.targetTypeName"  disabled placeholder="所属分组" class="form-item-size"></hl-input>
            </hl-form-item>
          </hl-group>
          <hl-group gap="var(--lg)">
            <hl-form-item class="w-full" label="是否公用" prop="isPublic">
                <hl-select  placeholder="是否公用" v-model="formData.isPublic" :disabled="telId && formData.isRefer" class="form-item-size">
                  <hl-option v-for="item in publicOptionList" :key="item.dictCode" :label="item.dictName"
                    :value="item.dictCode"></hl-option>
                </hl-select>
            </hl-form-item>
            <hl-form-item class="w-full" label="计算公式" prop="formulaId">
                <hl-select  placeholder="计算公式" v-model="formData.formulaId" clearable class="form-item-size">
                  <hl-option v-for="item in formulList" :key="item.formulaId" :label="item.formulaName"
                    :value="item.formulaId"></hl-option>
                </hl-select>
            </hl-form-item>
          </hl-group>
          <hl-form-item class="w-full" label="描述">
            <hl-group align="items-left" class="w-full" dir="vertical" full>
              <hl-input v-model="formData.targetDataDesc" native-type="textarea"  maxlength="500"
                show-word-limit></hl-input>
            </hl-group>
          </hl-form-item>
        </hl-form>
      </hl-group>
    </template>
    <template #footer>
      <hl-button class="static" style="width: 80px;" type="main" @click="ok">确定</hl-button>
      <hl-button class="static" style="width: 80px;" @click="handleClose">取消</hl-button>
    </template>
  </hl-panel>
  <!-- <hl-affix position="bottom" :offset="0">
          <hl-group align="items-middle" class="affix-bottom w-full box-shadow-lg p-lg">
            <hl-button type="primary" style="min-width: 80px" @click="ok" class="m-r-md">确定</hl-button>
            <hl-button style="min-width: 80px" @click="handleClose">取消</hl-button>
          </hl-group>
        </hl-affix> -->
  <TargetSelector v-if="dlgVisible" :selected="targetList" @ok="handleUpdateTarget" @close="handleCloseTarget" />
</template>
<script lang="ts" setup>
import { ref, onMounted, computed, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { FormInstance, HlMenu, HlMessage } from 'hongluan-ui';
import { SearchTargetTree } from '@/components';
import TargetSelector from './target-selector.vue';
import TargetPop from './target-pop.vue';
import { isValidName } from '@/common';
import { apiDictObj } from '@/apis/modules/dict';
import { getSecondsToUnitTime, EXPRESSIONS } from '@/common';
import { apiTargetDataObj } from '@/apis/modules/target-data-access';
import { useMonitorUnit } from '@/views/monitoring-elements/point/hook';
import { apiTargetTypeControllerObj } from '@/apis/modules/target-type-controller';
import { apiTargetInfoControllerObj } from '@/apis/modules/target-info-controller';
import { IgetListTargetTreeSpace } from '@/apis/modules/target-type-controller/model';
import { apiFormulaDefinedObj } from '@/apis/modules/formula-defined';
import { cloneDeep } from 'lodash-es';

/* const addThresholdLevel = () => {
  if (Array.isArray(formData.thresholdLevelList)) {
    if (formData.thresholdLevelList.length > 9) return;
    formData.thresholdLevelList.push({
      thresholdLevelName: '',
      thresholdLevelValue: ''
    });
  }
};
const delThresholdLevel = (factors: any[], idx: number) => {
  factors.splice(idx, 1);
}; */

const {
  targetList,
} = useMonitorUnit();

const router = useRouter();
const route = useRoute();

const dlgVisible = ref(false);
const telId = computed(() => route.query.id);

const isEdit = ref(false);

const formRef = ref<FormInstance>();
const formData = reactive({
  targetDataName: '',
  targetId: '',
  targetShowName: '',
  isMultiple: 1,
  isPublic: 0,
  isRefer: 0,
  formulaId: '',
  targetDataDesc: '',
  initCollectTime: '',
  timeScopeParams: [] as {
    dateStart: string;
    dateEnd: string;
    timeStart: string;
    timeEnd: string;
  }[],
  referTargetDataIds: [] as number[],
  thresholdValue: [],
  thresholdLevelList: []
});
const curTarget = ref({
  targetId: '',
  dataTypeName: '',
  dataType: '',
  periodTypeName: '',
  targetFrequency: '',
  targetFrequencyName: '',
  targetFrequencyUnitName: '',
  measureUnitName: '',
  targetTypeName: '',
  thresholdValue: ''
  // formulaId: '',
});
const rules = {
  targetDataName: [
    { required: true, message: '数据项名称不能为空' },
    {
      min: 1,
      max: 100,
      message: '长度不超过100个字符',
    },
    // { validator: isValidNameChars, trigger: 'blur' },
    { validator: isValidName, trigger: 'blur' },
  ],
  targetId: [{ required: true, message: '指标不能为空' }],
  initCollectTime: [{ required: true, message: '启用时间不能为空' }],
  isPublic: [{ required: true, message: '是否公用不能为空' }],
  formulaId: [{ required: true, message: '计算公式不能为空' }],
  timeScopeParams: [
    {
      validator: (_: any, value: any, callback: any) => {
        if (value.length) {
          value.forEach((e, i) => {
            if (
              e.dateStart?.length &&
              e.dateEnd?.length &&
              e.timeStart?.length &&
              e.timeEnd?.length
            ) {
              if (i === value.length - 1) {
                callback();
              }
            } else {
              callback(new Error('请填写时间区间'));
            }
          });
        } else {
          callback();
        }
      },
    },
  ],
  thresholdLevelList:
  {
    required: true,
    validator: (
      _: any,
      value: any,
      callback: (err?: Error) => void
    ) => {
      if (!value.length) callback(new Error('阈值等级不允许为空'));
      if (value.length) {
        if (value.length > 10) { callback(new Error('阈值等级最多为10条')); }
        let isValid = true;
        // console.log('332', value);
        (value as any).forEach((fv: any) => {
          if (fv.thresholdLevelName === '' && fv.thresholdLevelValue === '') {
            if (
              !fv.thresholdLevelName ||
              !fv.thresholdLevelValue
            ) {
              callback(new Error('请填写阈值等级'));
              isValid = false;
            }
          } else {
            if (
              fv.thresholdLevelName !== '' &&
              fv.thresholdLevelValue === ''
            ) {
              callback(new Error('请填写阈值'));
              isValid = false;
            }
            if (
              fv.thresholdLevelName === '' &&
              fv.thresholdLevelValue !== ''
            ) {
              callback(new Error('请填写等级名称'));
              isValid = false;
            }
          }
        });
        // 判断阈值是否有重复
        const thresholdLevelValueArr = value.map((item: { thresholdLevelValue: any; }) => { return item.thresholdLevelValue; });
        if (Array.from(new Set(thresholdLevelValueArr)).length < thresholdLevelValueArr.length) {
          callback(new Error('阈值不能重复'));
          isValid = false;
        }
        if (isValid) callback();
      } else {
        callback();
      }
    },
  },
  /*   thresholdValue:
    {
      required: true,
      validator: (
        _: any,
        value: any,
        callback: (err?: Error) => void
      ) => {
        if (curTarget.value.dataType === 'INTERZONE') {
          // if (!value.length) callback(new Error('阈值范围不允许为空'));
          if (value.length) {
            // if (value.length > 10) { callback(new Error('阈值最多为10条')); }
            let isValid = true;
            (value as any).forEach((fv: any) => {
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
                  callback(new Error('请填写上区间值'));
                  isValid = false;
                }
                if (
                  fv.upExpression === 'none' &&
                  fv.lowExpression !== 'none' &&
                  !fv.lowValue
                ) {
                  callback(new Error('请填写下区间值'));
                  isValid = false;
                }
              } else {
                if (
                  !fv.lowExpression ||
                  !fv.lowValue ||
                  !fv.upExpression ||
                  !fv.upValue
                ) {
                  callback(new Error('请填写阈值范围信息'));
                  isValid = false;
                }
              }
            });
            if (isValid) callback();
          } else {
            callback();
          }
        } else {
          callback();
        }
      },
    } */
};
const indicatorList = ref();
const formulList = ref();
const publicOptionList = ref([
  { dictName: '是', dictCode: 1 },
  { dictName: '否', dictCode: 0 },
]);
const colsFactor = [
  // { title: '', slotName: 'tableIndex', width: '4em' },
  {
    title: '指标数据项名称',
    prop: 'targetDataName',
    slotName: 'targetDataName',
  },
  { title: '数据类型', prop: 'dataTypeName' },
  { title: '是否公用', slotName: 'isPublic' },
  { title: '数据频率', prop: 'targetFrequencyName' },
  { title: '阈值等级/阈值', prop: 'thresholdLevelVOList', slotName: 'thresholdLevelVOList', minWidth: '120px' },
  { title: '启用时间', prop: 'initCollectTime' },
  { title: '操作', slotName: 'handle', align: 'center' },
];

watch(
  () => formData.targetId,
  async val => {
    let flag = false;
    const res = await apiTargetInfoControllerObj.getFindTargetInfo(val);
    curTarget.value = Object.assign(curTarget.value, res.data);
    curTarget.value.targetFrequencyName =
      +curTarget.value.targetFrequency > 0
        ? getSecondsToUnitTime(
          curTarget.value,
          'targetFrequencyUnitCode',
          'targetFrequency'
        ) + curTarget.value.targetFrequencyUnitName
        : '--';
    if (telId.value && !flag) {
      flag = true;
    } else {
      formData.formulaId = '';
    }
    getFormulList();
  }
);

watch(
  () => curTarget.value.targetId,
  async (n, o) => {
    if (isEdit.value && telId.value) {
      isEdit.value = false;
      return;
    }
    if (curTarget.value.dataType === 'INTERZONE') {
      if (curTarget.value.thresholdValue.length && JSON.parse(curTarget.value.thresholdValue) && Array.isArray(JSON.parse(curTarget.value.thresholdValue))) {
        formData.thresholdValue = JSON.parse(curTarget.value.thresholdValue);
      } else {
        formData.thresholdValue = [];
      }
    } else if (curTarget.value.dataType === 'SWITCH') {
      formData.thresholdValue = +curTarget.value.thresholdValue;
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

// watch(
//   () => curTarget.value.dataType,
//   async(n, o) => {
//     debugger;
//     if (isEdit.value && telId.value) {
//       isEdit.value = false;
//       return;
//     }
//     if (n === 'INTERZONE') {
//       if (curTarget.value.thresholdValue.length && JSON.parse(curTarget.value.thresholdValue) && Array.isArray(JSON.parse(curTarget.value.thresholdValue))) {
//         formData.thresholdValue = JSON.parse(curTarget.value.thresholdValue);
//       } else {
//         formData.thresholdValue = [];
//       }
//     } else if (n === 'SWITCH') {
//       formData.thresholdValue = +curTarget.value.thresholdValue;
//     }
//   },
//   {
//     immediate: true,
//     deep: true,
//   }
// );

const validate = async () => {
  await formRef.value?.validate();
};
const addLinkData = () => {
  dlgVisible.value = true;
};
const handleUpdateTarget = targets => {
  handleCloseTarget();
  targetList.value.push(targets);
  targetList.value.forEach(e => {
    e.targetFrequencyName =
      e.targetFrequency > 0
        ? getSecondsToUnitTime(e, 'targetFrequencyUnit', 'targetFrequency') +
        e.targetFrequencyUnitName
        : '--';
  });
};

const handleCloseTarget = () => {
  dlgVisible.value = false;
};
const handleRemove = (type: string, id: string) => {
  targetList.value = targetList.value.filter(
    item => item.targetDataId !== id
  );
};

// 添加时间区间
const addTimeConfigParams = () => {
  formData.timeScopeParams.push({
    dateStart: '',
    dateEnd: '',
    timeStart: '',
    timeEnd: '',
  });
};
const delTimeConfigParams = (index: number) => {
  formData.timeScopeParams.splice(index, 1);
  formData.timeScopeParams.length && validate();
};
// 添加阈值范围
const addTimeZone = () => {
  formData.thresholdValue.push({
    lowExpression: '',
    lowValue: '',
    upExpression: '',
    upValue: '',
  });
};
const delTimeZone = (factors: unknown[], idx: number) => {
  factors.splice(idx, 1);
  // validate();
};

const getFormulList = async () => {
  const params = {
    useForPeriod: '',
    useForRealtime: '',
    useForMultiple: 1,
  };
  if (+curTarget.value.targetFrequency > 0) {
    params.useForPeriod = 1;
  } else {
    params.useForRealtime = 1;
  }
  const formulaResult = await apiFormulaDefinedObj.getListNewFormulaDefinedVOs(params);
  formulList.value = formulaResult.data;
};

const ok = async () => {
  // 1. 都为实时的，校验所选是否都是实时
  // 2. 选择了一条周期，复合指标必须为所选指标整数倍
  // 3. 选择了多条周期，所选多条周期和复合指标必须为相同频率
  // 4. 至少需要选择一条指标
  if (targetList.value?.length > 0) {
    let flag = true;
    const targetSeconds = +curTarget.value.targetFrequency;
    try {
      targetList.value.forEach(e => {
        const accessSeconds = +e.targetFrequency;
        if (targetSeconds === 0) {
          if (accessSeconds > 0) {
            HlMessage.warning('所选指标为实时，关联指标计算周期类型必须全为实时');
            flag = false;
            throw new Error('计算周期类型错误');
          }
        } else {
          if (accessSeconds > 0 && (targetSeconds % accessSeconds > 0)) {
            HlMessage.warning('复合指标频率必须为所选关联指标频率的整数倍');
            flag = false;
            throw new Error('频率错误');
          }
        }
      });
    } catch (e) {
      console.log('计算周期类型错误');
    }
    if (!flag) {
      return flag;
    }
    const isValid = await formRef.value?.validate();
    if (isValid) {
      const params = cloneDeep(formData);
      // 处理阈值等级
      params.thresholdLevelParamList = params.thresholdLevelList;
      params.referTargetDataIds = targetList.value.map(e => e.targetDataId);
      params.thresholdValue =
        Array.isArray(params.thresholdValue)
          ? JSON.stringify(params.thresholdValue)
          : params.thresholdValue;
      if (telId.value) {
        await apiTargetDataObj.postUpdateMultipleTargetData(
          Object.assign({ targetDataId: telId.value }, params)
        );
      } else {
        await apiTargetDataObj.postAddMultipleTargetData(params);
      }
      router.go(-1);
    }
  } else {
    HlMessage.warning('请至少关联一条指标数据');
  }
};
const handleClose = () => {
  router.go(-1);
};
const changeTargetSelect = (data: IgetListTargetTreeSpace.Data) => {
  console.log(715, data); // formData.thresholdLevelList
  if (data.thresholdLevelVOList?.length) {
    formData.thresholdLevelList = cloneDeep(data.thresholdLevelVOList);
  } else {
    formData.thresholdLevelList = [];
  }
  formData.targetShowName = data.targetTypeName;
};

onMounted(async () => {
  const dict1 = await apiTargetTypeControllerObj.getListTargetTree({});
  const formulaResult = await apiDictObj.getListFormulaDefinedVOs();
  formulList.value = formulaResult.data;
  indicatorList.value = dict1.data;
  if (telId.value) {
    const { data } = await apiTargetDataObj.getDetail(telId.value as number);
    Object.assign(formData, data);
    // if (typeof (formData.thresholdLevelValue) === 'string' && formData.thresholdLevelValue?.length) {
    //   formData.thresholdLevelList = JSON.parse(formData.thresholdLevelValue as unknown as string);
    // } else {
    //   formData.thresholdLevelList = [];
    // }
    formData.thresholdLevelList = data.thresholdLevelVOList?.length ? data.thresholdLevelVOList : [];
    Object.assign(curTarget.value, data);
    if (curTarget.value.dataType === 'INTERZONE') {
      formData.thresholdValue = JSON.parse(formData.thresholdValue);
    } else if (curTarget.value.dataType === 'SWITCH') {
      formData.thresholdValue = +formData.thresholdValue;
    }
    targetList.value = data.referTargetData;
    formData.timeScopeParams =
      data.timeScopes === '' ? [] : data.timeScopes;
    getFormulList();
  }
});
</script>
<style lang="scss">
.add-multiple-target {
  .panel-footer {
    position: sticky !important;
    bottom: 0;
  }
  .hl-row > * {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .hl-form {
    margin-left: 5px;
  }
}
</style>
