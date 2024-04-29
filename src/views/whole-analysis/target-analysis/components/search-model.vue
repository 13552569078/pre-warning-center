<template>
  <hl-selector
    style="width: 300px;"
    ref="selector1"
    popper-class="monitor-tree-select"
    filterable
    block
    @input="handleTreeInput"
    @clear="reset"
    @resize="resize"
    :placeholder="placeholder"
  >
    <hl-scrollbar max-height="350px">
      <hl-group
        class="bg-popup radius-md box-shadow-lg"
        align
        dir="vertical"
        style="width: 300px;"
        full
      >
        <hl-group
          class="p-y-xs w-full"
          align="items-left"
          dir="vertical"
          full
        >
          <hl-group
          v-for="item in modelList"
          :key="item.analysisModelId"
            class="p-r-md p-l-lg w-full cursor-pointer"
            style="padding-top: 5px; padding-bottom: 5px;"
            align="items-left items-middle"
            gap="var(--xs)"
            full
          >
            <div  @click="clickAnalysisModel(item)" :class="item.analysisModelId === curModelId ? 'text-hover' : 'text-regular'">{{item.analysisModelName}}</div>
            <hl-icon
              size="xxs"
              class="static text-secondary"
              @click="delAnalysisModel(item)"
            >
              <TwoClose></TwoClose>
            </hl-icon>
          </hl-group>
        </hl-group>
        <hl-group
          class="p-y-md p-r-md p-l-lg border-top solid border-regular w-full"
          align="items-left items-middle"
          gap="var(--xs)"
          @click="addNewModel"
          full
        >
          <hl-icon
            size="xs"
            class="static text-link"
          >
            <TwoPlus></TwoPlus>
          </hl-icon>
          <div class="text-link">自定义模型</div>
        </hl-group>
      </hl-group>
    </hl-scrollbar>
  </hl-selector>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { HlMessageBox } from 'hongluan-ui';
import { apiSwanObj } from '@/apis/modules/hongling';
import { apiAnalysisModelObj } from '@/apis/modules/analysis-model';
import { IlistSpace } from '@/apis/modules/analysis-model/model';

interface ItreeNode {
  parentUnitId: string;
  unitCode: string;
  unitDesc: string;
  unitId: number;
  unitLevel: number;
  unitName: string;
  unitSeq: number;
  unitShort: string;
  children: any[];
}

const props = defineProps({
  deep: {
    type: Boolean,
    default: true,
  },
  modelValue: String,
  // 表单内开启，开启后仅能选择最后一级
  isEmitCode: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
});
watch(
  () => props.modelValue,
  n => {
    if (n) {
      console.log(props.modelValue, modelList.value, 122);
      // const currentNode = findNode(props.modelValue, modelList.value);
      // if (currentNode) {
      //   selector1.value.setValue(currentNode.unitName);
      // }
    }
  },
  {
    deep: true,
  }
);
const defaultProps = {
  children: 'children',
  label: 'unitName',
};

const emit = defineEmits(['modelChanged', 'addNewModel', 'update:modelValue', 'clearOrg']);
const modelList = ref<IlistSpace.Data[]>([]);
const curModelId = ref();
const selector1 = ref();
const hlTreeSingle = ref();
const treeStyle = ref({
  width: '',
});
const clickAnalysisModel = (data: IlistSpace.Data) => {
  curModelId.value = data.analysisModelId;
  selector1.value.setValue(data.analysisModelName);
  selector1.value.togglePopperVisible(false);
  emit('modelChanged', data);
  // if (!props.isEmitCode) {
  //   emit('update:modelValue', data.orgName);
  // } else {
  //   emit('update:modelValue', data.id);
  // }
  emit('update:modelValue', data.analysisModelId);
};
const delAnalysisModel = async(data: IlistSpace.Data) => {
  // curModelId.value = data.analysisModelId;
  await HlMessageBox.confirm(`您确认删除[${data.analysisModelName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
  });
  await apiAnalysisModelObj.deleteAnalysisModel(data.analysisModelId);
  if (curModelId.value === data.analysisModelId) {
    addNewModel();
  }
  getModelList();
};
const reset = () => {
  emit('update:modelValue', '');
  selector1.value.setValue('');
  selector1.value.togglePopperVisible(false);
  hlTreeSingle.value.filter('');
  emit('clearOrg');
};
const addNewModel = () => {
  selector1.value.setValue('自定义模型');
  curModelId.value = '';
  selector1.value.togglePopperVisible(false);
  emit('addNewModel');
};

const filterNode = (value: string, data: ItreeNode) => {
  if (!value) return true;
  return data.unitName.indexOf(value) !== -1;
};
const handleTreeInput = (val: string) => {
  // hlTreeSingle.value.filter(val);
  console.log(val);
};

const setTargetModel = () => {
  clickAnalysisModel(modelList.value[0]);
};

const getModelList = async(setFirst?: boolean) => {
  const result = await apiAnalysisModelObj.list('');
  if (+result.code === 0) {
    modelList.value = result.data;
    if (setFirst) {
      setTargetModel();
    }
  }
};

onMounted(async() => {
  await getModelList();
  // if (props.modelValue) {
  //   const currentNode = findNode(props.modelValue, modelList.value);
  //   if (currentNode) {
  //     selector1.value.setValue(currentNode.unitName);
  //   }
  // }
});

defineExpose({
  getModelList
});
</script>
<style lang="scss" scoped>
.monitor-tree-select {
  .hl-tree {
    max-height: 40vh;
    overflow-y: scroll;
  }
}
</style>
