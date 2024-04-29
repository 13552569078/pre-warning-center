<template>
  <hl-selector style="width: 300px" ref="selector1" filterable block @input="handleTreeInput" @clear="reset" placeholder="请选择分析模型">
    <hl-scrollbar max-height="350px">
      <hl-group class="bg-popup radius-md box-shadow-lg" align dir="vertical" style="width: 300px" full>
        <hl-group class="p-y-xs w-full" align="items-left" dir="vertical" full>
          <hl-group v-for="item in modelList" :key="item.analysisModelId" class="w-full" align="items-left items-middle" gap="var(--xs)" full>
            <hl-group class="p-r-md p-l-lg w-full cursor-pointer" align="items-between items-middle" v-if="item.analysisModelName.indexOf(searchKey) !== -1" style="padding-top: 5px; padding-bottom: 5px">
              <div @click="clickAnalysisModel(item)" :class="item.analysisModelId === curModelId ? 'text-hover' : 'text-regular'" class="hover:text-hover w-full">{{ item.analysisModelName }}</div>
              <hl-icon size="xxs" class="static text-secondary hover:text-hover" @click="delAnalysisModel(item)">
                <TwoClose></TwoClose>
              </hl-icon>
            </hl-group>
          </hl-group>
        </hl-group>
        <hl-group class="p-y-md p-r-md p-l-lg border-top solid border-regular w-full" align="items-left items-middle" gap="var(--xs)" @click="addNewModel" full>
          <hl-icon size="xs" class="static text-link">
            <TwoPlus></TwoPlus>
          </hl-icon>
          <div class="text-link">自定义模型</div>
        </hl-group>
      </hl-group>
    </hl-scrollbar>
  </hl-selector>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { HlMessageBox } from 'hongluan-ui';
import { apiAlarmWholeAnalysObj } from '@/apis/modules/whole-analysis/alarm-whole-analysis';
import { IlistSpace } from '@/apis/modules/whole-analysis/alarm-whole-analysis/model';

const emit = defineEmits(['modelChanged', 'addNewModel']);

const modelList = ref<IlistSpace.Data[]>([]);
const searchKey = ref('');
const curModelId = ref();
const selector1 = ref();

const clickAnalysisModel = (data: IlistSpace.Data) => {
  curModelId.value = data.analysisModelId;
  selector1.value.setValue(data.analysisModelName);
  emit('modelChanged', data);
  selector1.value.togglePopperVisible(false);
};
const delAnalysisModel = async(data: IlistSpace.Data) => {
  await HlMessageBox.confirm(`您确认删除[${data.analysisModelName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消'
  });
  await apiAlarmWholeAnalysObj.deleteYgfAlarmAnalysisModel(data.analysisModelId);
  // 删除选中模型则去【0】 反之不处理
  getModelList(curModelId.value === data.analysisModelId);
};
const reset = () => {
  selector1.value.setValue('');
  selector1.value.togglePopperVisible(false);
};
const setValue = (name: string) => {
  selector1.value.setValue(name);
};
const addNewModel = () => {
  selector1.value.setValue('自定义模型');
  selector1.value.togglePopperVisible(false);
  emit('addNewModel');
};
const handleTreeInput = (val: string) => {
  searchKey.value = val;
};
const getModelList = async(checked: boolean) => {
  const { data } = await apiAlarmWholeAnalysObj.list('', '2');
  modelList.value = data;
  if (modelList.value.length && checked) {
    clickAnalysisModel(modelList.value[0]);
    curModelId.value = modelList.value[0].analysisModelId;
  }
  return data;
};

onMounted(async() => {
  await getModelList(false);
});

defineExpose({
  getModelList,
  setValue
});
</script>
