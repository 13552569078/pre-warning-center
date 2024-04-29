<template>
  <hl-dialog :model-value="true" class="md-dialog" body-class="dialog-no-600" width="700px" title="选择监测指标" @close="$emit('cancel')" :close-on-click-modal="false" borderless>
    <div class="panel-title m-b-md">
      <hl-input v-model="searchText" placeholder="输入指标关键字" block maxlength="20">
        <template #suffix>
          <two-search />
        </template>
      </hl-input>
    </div>
    <hl-scrollbar class="no-padding-top-bottom" max-height="550px">
      <hl-tree ref="tree" :data="rulesTree" show-checkbox node-key="id" :props="defaultProps" :default-expanded-keys="$props.checkedIds" :default-checked-keys="$props.checkedIds" :filter-node-method="filterNode"></hl-tree>
    </hl-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="$emit('cancel')">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="ok">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, watch, PropType, onMounted } from 'vue';
import { apiTargetTypeControllerObj } from '@/apis/modules/target-type-controller';
import { IgetListTargetTreeSpace } from '@/apis/modules/target-type-controller/model';
import { HlMessage } from 'hongluan-ui';

const emits = defineEmits(['indicatorsOk', 'cancel']);

const props = defineProps({
  checkedIds: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  triggerType: {
    type: String,
    default: 'TRIGGER_CYCLE'
  },
  dataType: {
    type: Array,
    default: () => {
      return ['switch', 'interzone'];
    }
  },
  useSelected: {
    type: Boolean,
    default: false
  }
});

const searchText = ref('');
const rulesTree = ref<IgetListTargetTreeSpace.Data[]>([]);
const tree = ref();
const defaultProps = ref({
  label: 'targetTypeName',
  children: 'children'
});

watch(searchText, val => {
  tree.value?.filter(val);
});

const ok = () => {
  // 在原始item中 没有的 指标
  const list = tree.value
    .getCheckedNodes()
    .filter((item: any) => {
      return item.type;
    })
    .filter((item2: any) => {
      return !props.checkedIds.includes(item2.id);
    });
    // 增加触发策略 仅允许添加一个指标
  const allList = tree.value.getCheckedNodes();
  const allListTarget = allList.filter((item:any) => {
    return !!item.factorDataTypeCode;
  });
  if (props.triggerType !== 'TRIGGER_CYCLE' && allListTarget.length > 1) {
    HlMessage('触发策略仅允许添加一个监测指标');
    return;
  }
  emits('indicatorsOk', props.useSelected ? allListTarget : list);
};
const filterNode = (value: string, data: any) => {
  if (!value) return true;
  return data.targetTypeName.indexOf(value) !== -1;
};
const loopRulesTree = (data: IgetListTargetTreeSpace.Data[]) => {
  data.forEach((item: any) => {
    // 非指标禁选
    item.disabled = !item.factorDataTypeCode;
    item.children && loopRulesTree(item.children);
  });
};

onMounted(async () => {
  const { data } = await apiTargetTypeControllerObj.getListTargetTree({ dataType: props.dataType as string[] });
  rulesTree.value = data;
  loopRulesTree(rulesTree.value);
});
</script>
