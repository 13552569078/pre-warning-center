<template>
  <hl-dialog v-model="dialogVisible" :close-on-click-modal="false" title="选择指标数据项" width="640px" @close="handleClose" body-class="bg-modal">
     <hl-transfer ref="targetTransRef" v-model="selectedTargets" :titles="['指标数据项', '已选择']" filterable filter-placeholder="请输入数据项名称" :data="targetDataList" :props="defaultProps" style="--transfer-height: 500px" />
    <hl-group block class=" text-danger m-t-xs" v-if="selectedTargets.length === 0">至少选择一项指标</hl-group>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="handleClose">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="ok" :disabled="selectedTargets.length === 0">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick, watch, computed } from 'vue';
import { EmptyUtils } from 'fx-front-utils';
import { DataFetcherParams } from 'fx-front-framework';
import { HlMessage } from 'hongluan-ui';
import { LeftRightLayout } from '@/components';
import { apiTargetDataObj as api } from '@/apis/modules/target-data-access';
import { IlistSpace } from '@/apis/modules/target-data-access/model';
import { IpostPageSpace } from '@/apis/modules/target-data-access/model';

const emit = defineEmits(['close', 'ok']);
const props = defineProps({
  id: String,
  selected: Array,
});

const dialogVisible = ref(false);
const targetDataList = ref<IlistSpace.Data>();

const defaultProps = ref({
  label: 'targetDataName',
  key: 'targetDataId'
});
const selectedTargets = ref<string[]>([]);
const targetTransRef = ref();

watch(() => props.selected, newVal => {
  if (newVal) {
    selectedTargets.value = newVal.map(e => e.targetDataId) || [];
  }
},
{
  immediate: true,
  deep: true,
}
);

const handleClose = () => {
  targetTransRef.value.clearQuery('left');
  targetTransRef.value.clearQuery('right');
  dialogVisible.value = false;
};

const getTargetDataList = async(list:IlistSpace.Data) => {
  dialogVisible.value = true;
  targetDataList.value = list;
};

const ok = () => {
  if (selectedTargets.value.length > 20) {
    HlMessage.warning('至多选择20条指标');
    return;
  }
  emit('ok', selectedTargets.value);
  handleClose();
};

defineExpose({
  getTargetDataList
});
</script>
