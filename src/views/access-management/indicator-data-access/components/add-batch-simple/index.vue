<template>
  <hl-panel full-body class="table-panel bg-transparent current-style h-full"
    header-class="flex-col p-y-lg bg-content border-transparent title-bottom" body-class="bg-content m-t-lg h-full"
    footer-class="bg-content custom-footer">
    <template #header>
      <hl-group align="items-left items-middle" class="w-full" full>
        <!-- <h5 class="title w-full">批量新增基础指标数据项</h5> -->
        <panel-header title="批量新增基础指标数据项" />
      </hl-group>
      <hl-group dir="vertical" gap="32px" class="p-t-sm p-x-xxl w-full">
        <hl-steps class="w-100" item-padding="0px" :active="active">
          <hl-step title="选择指标"
            :description="curChooseResult && curChooseResult.targetName ? `已选择：${curChooseResult.targetName}` : '已选择：--'"></hl-step>
          <hl-step title="选择接入数据项"
            :description="curTable && curTable.length ? `已选择：${curTable.length}条` : '已选择：0条'"></hl-step>
          <hl-step title="批量配置指标数据项" description="完成"></hl-step>
        </hl-steps>
        <hl-group v-if="curChooseResult && curChooseResult.targetId"
          class="p-y-sm bg-primary-light-5 border solid border-primary radius-lg w-full"
          style="padding-right: 32px; padding-left: 32px;" dir="vertical">
          <hl-group class="w-full" align="items-between items-middle" gap="40px">
            <hl-group align="items-middle" gap="var(--sm)">
              <span style="min-width: calc(var(--xxl) * 3)">已选择指标：</span>
              <span class="font-bold">{{ curChooseResult.targetName }}</span>
            </hl-group>
            <hl-group align="items-middle" gap="var(--sm)">
              <span style="min-width: calc(var(--xxl) * 3)">数据类型：</span>
              <span class="font-bold">{{ curChooseResult.dataTypeName }}</span>
            </hl-group>
            <hl-group align="items-middle" gap="var(--sm)">
              <span style="min-width: calc(var(--xxl) * 3)">计量单位：</span>
              <span class="font-bold">{{ curChooseResult.measureUnitName }}</span>
            </hl-group>
            <hl-group align="items-middle" gap="var(--sm)">
              <span style="min-width: calc(var(--xxl) * 3)">计算周期类型：</span>
              <span class="font-bold">{{ curChooseResult.periodTypeName }}</span>
            </hl-group>
            <hl-group align="items-middle" gap="var(--sm)">
              <span style="min-width: calc(var(--xxl) * 3)">计算周期：</span>
              <span class="font-bold">{{ curChooseResult.targetFrequencyName }}</span>
            </hl-group>

          </hl-group>
          <hl-group v-if="curChooseResult.dataType === 'INTERZONE'" class="w-full m-t-sm" align="items-between items-middle" gap="40px">
            <hl-group align="items-middle" gap="var(--sm)">
              <span style="min-width: calc(var(--xxl) * 3)">阈值等级：</span>
              <span class="font-bold"
                v-if="curChooseResult.thresholdLevelVOList && curChooseResult.thresholdLevelVOList !== '--' && curChooseResult.thresholdLevelVOList.length">
                <span v-for="(item, index) in curChooseResult.thresholdLevelVOList" :key="index + new Date().getTime()">
                  {{ item.thresholdLevelName }}&emsp;{{ item.thresholdLevelValue }}；
                </span>
              </span>
              <span class="font-bold" v-else>--</span>
            </hl-group>
          </hl-group>
          <hl-group v-if="curChooseResult.dataType === 'SWITCH'" class="w-full m-t-sm" gap="40px">
            <hl-group class="w-full" align="items-middle" gap="var(--sm)">
              <span style="min-width: calc(var(--xxl) * 3)">阈值：</span>
              <!-- <hl-group style="width: calc(100% - 90px);flex-wrap: wrap;"
                v-if="curChooseResult.dataType === 'INTERZONE' && curChooseResult.thresholdValue.length">
                <hl-group class="m-r-md" v-for="item in curChooseResult.thresholdValue" :key="item">
                  <hl-group>
                    <span>下区间：</span>
                    <span>
                      {{ EXPRESSIONS_NAMES[item.lowExpression] }}
                    </span>
                    <span>
                      {{ item.lowValue }}
                    </span>
                  </hl-group>
                  <hl-group class="m-l-xs">
                    <span>｜上区间：</span>
                    <span>
                      {{ EXPRESSIONS_NAMES[item.upExpression] }}
                    </span>
                    <span>
                      {{ item.upValue }}
                    </span>
                  </hl-group>
                </hl-group>
              </hl-group> -->
              <hl-group v-if="curChooseResult.dataType === 'SWITCH'">
                {{ curChooseResult.thresholdValue === 1 ? '开启' : '关闭' }}
              </hl-group>
              <span v-else class="font-bold">--</span>
            </hl-group>
          </hl-group>
        </hl-group>
      </hl-group>
    </template>
    <TargetSimpleSelector v-show="active === 0" @changeSelect="changeSelect" />
    <AccessDataList v-show="active === 1" :curSelectKeys="selectKeys" :accessFrequency="accessFrequency"
      @changeAccessSelect="changeAccessSelect" />
    <TargetEditList v-show="active === 2" :editTable="curTable" @changeEditTable="changeEditTable"
      @remove="removeEditTable" :accessFrequency="accessFrequency" />

    <template #footer>
      <hl-button v-if="active === 0" @click="handleClose" style="min-width: 80px">取 消</hl-button>
      <hl-button v-if="active === 1 || active === 2" @click="prev" style="min-width: 80px">上一步</hl-button>
      <hl-button v-if="active === 0 || active === 1" type="primary" class="m-l-md page-primary-button" style="min-width: 80px"
        @click="next">下一步</hl-button>
      <hl-button v-if="active === 2" type="primary" class="m-l-md page-primary-button" style="min-width: 80px" @click="ok">保 存</hl-button>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { HlMessage } from 'hongluan-ui';
import { cloneDeep } from 'lodash-es';
import TargetSimpleSelector from './target-simple-selector.vue';
import AccessDataList from './access-data-list.vue';
import TargetEditList from './target-edit-list.vue';
import { getSecondsToUnitTime } from '@/common';

import { apiTargetDataObj } from '@/apis/modules/target-data-access';
import { IgetListTargetInfoListVOsSpace } from '@/apis/modules/target-info-controller/model';

const router = useRouter();

const active = ref(0);
const curChooseResult = ref();
const curTable = ref();
const curEditTable = ref();
const selectKeys = ref([]);
const accessFrequency = ref(0);

const changeSelect = (data: IgetListTargetInfoListVOsSpace.Data) => {
  // 第一步，变化时，
  // 清空第二步、
  accessFrequency.value = 0;
  selectKeys.value = [];
  // 第三步数据
  curTable.value = [];
  curEditTable.value = [];
  curChooseResult.value = data;
  if (curChooseResult.value.dataType === 'INTERZONE') {
    curChooseResult.value.thresholdValue = typeof (curChooseResult.value.thresholdValue) === 'string' && curChooseResult.value.thresholdValue !== '--' ? JSON.parse(curChooseResult.value.thresholdValue) : curChooseResult.value.thresholdValue;
  } else if (curChooseResult.value.dataType === 'SWITCH') {
    curChooseResult.value.thresholdValue = +curChooseResult.value.thresholdValue;
  }
  curChooseResult.value.targetFrequencyName =
    curChooseResult.value.targetFrequency > 0
      ? getSecondsToUnitTime(
        curChooseResult.value,
        'targetFrequencyUnitCode',
        'targetFrequency'
      ) + curChooseResult.value.targetFrequencyUnitName
      : '--';
  accessFrequency.value = curChooseResult.value.targetFrequency;
};
const changeEditTable = (data: IgetListTargetInfoListVOsSpace.Data) => {
  curEditTable.value = data;
};
const removeEditTable = (data: IgetListTargetInfoListVOsSpace.Data) => {
  selectKeys.value = data.map(e => e.id);
};
const changeAccessSelect = (data: IgetListTargetInfoListVOsSpace.Data) => {
  const accessTable = cloneDeep(data);
  if (curChooseResult.value.dataType === 'INTERZONE' || curChooseResult.value.dataType === 'SWITCH') {
    accessTable.forEach(e => {
      e.dataType = curChooseResult.value.dataType;
      e.thresholdValue = curChooseResult.value.thresholdValue;
    });
  }
  console.log(172, curChooseResult.value.thresholdLevelVOList);
  if (curChooseResult.value.thresholdLevelVOList && curChooseResult.value.thresholdLevelVOList !== '--' && curChooseResult.value.thresholdLevelVOList.length) {
    accessTable.forEach(item => {
      item.thresholdLevelVOList = cloneDeep(curChooseResult.value.thresholdLevelVOList);
    });
  }
  curTable.value = accessTable;
};

const handleClose = () => {
  router.go(-1);
};
const prev = () => {
  active.value = active.value === 2 ? 1 : 0;
};
const next = () => {
  if (active.value === 0) {
    if (curChooseResult.value?.targetId) {
      active.value = 1;
    } else {
      HlMessage.warning('请先选择指标');
    }
  } else {
    if (curTable.value?.length) {
      if (curChooseResult.value.targetFrequency > 0) {
        let flag = true;
        const targetSeconds = +curChooseResult.value.targetFrequency;
        curTable.value.forEach(e => {
          const accessSeconds = +e.accessFrequency;
          if (targetSeconds % accessSeconds > 0) {
            HlMessage.warning(
              `数据项${e.accessItemName}的数据频率不合法，请重新选择`
            );
            flag = false;
          }
        });
        if (!flag) {
          return flag;
        }
      }
      active.value = 2;
    } else {
      HlMessage.warning('请至少选择一条接入数据项');
    }
  }
};

const ok = async () => {
  const editTableParams = cloneDeep(curEditTable.value);
  if (editTableParams?.length) {
    let count = 0;
    editTableParams.forEach((e: any) => {
      if (e.accessFrequency === 0) {
        e.timeScopes = null;
        e.timeScopeParams = null;
      } else {
        e.timeScopeParams =
          e.timeScopes === '--' || e.timeScopes === '' ? [] : e.timeScopes;
      }
      if (e.dataType === 'INTERZONE' || e.dataType === 'SWITCH') {
        e.thresholdValue =
          Array.isArray(e.thresholdValue)
            ? JSON.stringify(e.thresholdValue)
            : e.thresholdValue;
      }
      if (e.thresholdLevelVOList?.length) {
        // 判断阈值是否有重复
        const thresholdLevelValueArr = e.thresholdLevelVOList.map((item: { thresholdLevelValue: any; }) => { return item.thresholdLevelValue; });
        if (Array.from(new Set(thresholdLevelValueArr)).length < thresholdLevelValueArr.length) {
          HlMessage.warning('阈值不能重复，请检查');
          count += 1;
          return;
        }
        // 判断阈值是否全为数字
        let isValid = false;
        for (let index = 0; index < thresholdLevelValueArr.length; index++) {
          const element = thresholdLevelValueArr[index];
          // 判断阈值等级是否是数字
          const regExp = /^[-]{0,1}[0-9]+[.]{0,1}[0-9]*$/;
          if (element && !regExp.test(element)) {
            isValid = true;
            break;
          }
        }
        if (isValid) {
          count += 1;
          HlMessage.warning('阈值必须是数字值，请检查');
          return;
        }
        e.thresholdLevelParamList = e.thresholdLevelVOList;
      }
      for (const k in e) {
        if (e[k] === '--') {
          e[k] = null;
        }
      }
    });

    if (count === 0) {
      await apiTargetDataObj.postAddSimpleTargetData(
        editTableParams,
        curChooseResult.value?.targetId
      );
      router.go(-1);
    }
  } else {
    HlMessage.warning('请至少提交一条接入数据项');
  }
};

onMounted(async () => {
  console.log('mounted');
  console.log('mounted');
});
</script>

<style lang="scss">
.current-style {
  .list-page_header {
    margin-bottom: 0;
    border-top: none !important;
    border-bottom: 1px solid var(--border-regular) !important;
  }
}
.custom-footer {
  justify-content: flex-start !important;
}
</style>
