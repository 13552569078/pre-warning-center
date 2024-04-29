<template>
  <hl-dialog :model-value="true" class="md-dialog" width="380px" :title="title" @close="$emit('cancel')" top="20" borderless>
    <hl-form ref="formRef" :model="formData" class="w-full" gap="var(--lg)" item-gap="var(--lg2)"
      style="--form-label-color: var(--text-regular);">
      <hl-group align="items-left" class="w-full" gap="var(--xl)" full style="--form-label-color: var(--text-regular);"
        dir="vertical">
        <hl-form-item v-for="(item, index) in formData.thresholdValueList" :key="index + new Date().getTime()"
          class="w-full" :label="item.thresholdLevelName" :prop="'thresholdValueList.' + index + '.thresholdLevelValue'"
          :rules="rules">
          <hl-group align="items-top" class="w-full" full>
            <hl-input v-model="item.thresholdLevelValue" block maxlength="100" placeholder="请输入阈值" clearable></hl-input>
          </hl-group>
        </hl-form-item>
      </hl-group>
    </hl-form>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="$emit('cancel')">取消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="ok">确定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { apiTargetDataObj } from '@/apis/modules/target-data-access';
import { HlMessage } from 'hongluan-ui';
import { ruleNumber } from '@/common/validator';

const emit = defineEmits(['cancel', 'ok']);

const props = defineProps({
  thresholdValueList: {
    type: Array,
    default: () => []
  },
  targetDataId: {
    type: String,
    value: ''
  },
  targetId: {
    type: String,
    default: ''
  },
  targetDataIds: {
    type: Array as PropType<string[]>,
    default: () => []
  }
});

const rules = ref([
  {
    required: true, message: '阈值不能为空', trigger: 'blur'
  },
  ruleNumber,
  {
    validator: (
      _: any,
      value: any,
      callback: (err?: Error) => void
    ) => {
      let isValid = true;
      if (value) {
        // 判断阈值是否有重复
        const thresholdLevelValueArr = formData.value.thresholdValueList.map(item => { return item.thresholdLevelValue; });
        if (Array.from(new Set(thresholdLevelValueArr)).length < thresholdLevelValueArr.length) {
          callback(new Error('阈值不能重复'));
          isValid = false;
        }
        if (isValid) callback();
      } else {
        callback();
      }
    },
    trigger: 'blur'
  }
]
);

const formRef = ref();
const formData = ref({
  thresholdValueList: cloneDeep(props.thresholdValueList)
});

const isBatch = ref(false);

const ok = async () => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    if (isBatch.value) {
      apiTargetDataObj.postBatchAdjustThresholdLevel(formData.value.thresholdValueList, props.targetId, props.targetDataIds).then(() => {
        HlMessage.success('批量调整成功');
        emit('ok');
      });
    } else {
      apiTargetDataObj.postAdjustThresholdLevel(formData.value.thresholdValueList, props.targetDataId!).then(() => {
        HlMessage.success('调整成功');
        emit('ok');
      });
    }
  }
};

const title = ref('阈值调整');
const openDialog = async () => {
  // 批量修改
  title.value = '批量调整阈值';
  isBatch.value = true;
};

defineExpose({ openDialog });
</script>

<style lang="scss" scoped></style>
