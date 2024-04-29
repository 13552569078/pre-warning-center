<template>
<hl-dialog
      v-model="dialogVisible"
      :placement="'center'"
       width="800px"
      :title="'阈值范围'"
    @close="cancel"
    :close-on-click-modal="false"
    >
      <hl-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :label-position="['items-left', 'items-middle']"
      @submit.prevent
    >
       <hl-form-item
          class="w-full"
          label="阈值范围"
          prop="thresholdValue"
        >
          <hl-group
            align="items-top"
            class="w-full"
            dir="vertical"
            full
          >
            <hl-group
              class="p-lg bg-light w-full"
              dir="vertical"
              gap="var(--sm)"
              full
            >
              <hl-group
                class="m-b-sm bg-content p-md  w-full"
                v-for="(item, index) in formData.thresholdValue"
                :key="index"
                align="items-between items-middle"
              >
                <hl-group align="items-middle">
                  <span class="w-xs m-r-sm">下区间:</span>
                  <hl-select
                    v-model="item.lowExpression"
                    placeholder="请选择"
                    class="w-s m-r-sm"
                    filterable
                    clearable
                  >
                    <hl-option
                      v-for="ep in EXPRESSIONS"
                      :key="ep.key"
                      :value="ep.key"
                      :label="ep.label"
                    />
                  </hl-select>
                  <hl-input
                    v-model="item.lowValue"
                    placeholder="请输入"
                    class="w-s"
                  />
                </hl-group>
                <hl-group align="items-middle">
                  <span class="w-xs m-l-md m-r-sm">上区间:</span>
                  <hl-select
                    v-model="item.upExpression"
                    placeholder="请选择"
                    class="w-s m-r-sm"
                    filterable
                    clearable
                  >
                    <hl-option
                      v-for="ep in EXPRESSIONS"
                      :key="ep.key"
                      :value="ep.key"
                      :label="ep.label"
                    />
                  </hl-select>
                  <hl-input
                    v-model="item.upValue"
                    placeholder="请输入"
                    class="w-s m-r-xxs"
                  />
                </hl-group>
                <hl-button
                  style="width: calc(var(--lg));height: calc(var(--lg));"
                  v-if="action!=='edit'"
                  @click="delTimeZone(formData.thresholdValue, index)"
                  type="danger"
                  round
                >
                  <template #icon>
                    <hl-icon size="xs">
                      <FillMinus />
                    </hl-icon>
                  </template>
                </hl-button>
              </hl-group>
              <hl-group
                class="p-x-md radius-lg w-full"
                style="padding-top: 6px; padding-bottom: 6px;"
                align="items-center items-middle"
                gap="var(--xxs)"
              >
                <hl-icon
                  @click="addTimeZone"
                  style="cursor:pointer;"
                  size="xs"
                  class="static"
                  type="primary"
                >
                  <TwoPlus></TwoPlus>
                </hl-icon><span
                  style="cursor:pointer;"
                  @click="addTimeZone"
                  class="text-primary"
                >增加阈值范围</span>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-form-item>
      </hl-form>
      <template #footer>
        <span class="dialog-footer">
          <hl-button @click="cancel">取 消</hl-button>
          <hl-button type="primary" class="m-l-md" @click="submitZone">确 定</hl-button>
        </span>
      </template>
    </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, watch, nextTick, reactive } from 'vue';
import { HlMessageBox } from 'hongluan-ui';
import { cloneDeep } from 'lodash-es';
import { getListDict, getSecondsToUnitTime, EXPRESSIONS_NAMES, EXPRESSIONS } from '@/common';
import { IlistSpace } from '@/apis/modules/analysis-model/model';

const emit = defineEmits(['saveZone']);

const dialogVisible = ref(false);
const curNode = ref<IlistSpace.Data>();
const formRef = ref();
const formData = reactive({
  accessItemId: '',
  dataType: '',
  thresholdValue: []
});

const rules = {
  thresholdValue:
  {
    required: true,
    validator: (
      _: any,
      value: any,
      callback: (err?: Error) => void
    ) => {
      if (formData.dataType === 'INTERZONE') {
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
  }
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

const editZone = async(data: IlistSpace.Data) => {
  const zoneData = cloneDeep(data);
  dialogVisible.value = true;
  formData.accessItemId = zoneData.accessItemId;
  formData.dataType = zoneData.dataType;
  formData.thresholdValue = zoneData.thresholdValue;
};
const submitZone = async() => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    emit('saveZone', formData);
  }
};

const cancel = () => {
  formRef.value?.resetFields();
  dialogVisible.value = false;
};

defineExpose({
  editZone,
  cancel
});
</script>
