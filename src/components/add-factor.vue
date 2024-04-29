<template>
  <hl-dialog :model-value="true" class="md-dialog" width="700px" :title="`监测因子`" @close="$emit('cancel')">
    <hl-transfer v-model="selectFactor" :titles="['监测因子', '已选择']" filterable filter-placeholder="请输入监测因子" :data="factorList" :props="defaultProps" style="--transfer-height: 500px" />
    <hl-group block class=" text-danger m-t-xs" v-if="selectFactor.length === 0">至少选择一个因子</hl-group>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="$emit('cancel')">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="ok" :disabled="selectFactor.length === 0">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, onMounted, PropType } from 'vue';
import { IgetFindMonitorStrategyTemplateSpace } from '@/apis/modules/strategy-tpl/model';

const emits = defineEmits(['eventAddOk', 'cancel']);

const props = defineProps({
  id: String,
  factorList: {
    type: Array as PropType<IgetFindMonitorStrategyTemplateSpace.StrategyRuleFactorVO[]>,
    default: () => []
  },
  factorCheck: {
    type: Array as PropType<string[]>,
    default: () => []
  }
});

const defaultProps = ref({
  label: 'factorName',
  key: 'factorId'
});
const selectFactor = ref<string[]>([]);

const ok = () => {
  emits('factoryOk', selectFactor.value);
};

onMounted(async() => {
  selectFactor.value = props.factorCheck;
});
</script>
