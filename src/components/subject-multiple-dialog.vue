<template>
  <hl-dialog :model-value="true" class="md-dialog" body-class="dialog-no-600" width="550px" title="监测主体" @close="$emit('close')" :close-on-click-modal="false" stripe>
    <hl-panel class="h-full w-full" borderless inner-scroll full-body header-class="inner-pannel-header">
      <template #header>
        <hl-input v-model="searchText" placeholder="输入监测主体关键字" block fill maxlength="20">
          <template #suffix>
            <two-search />
          </template>
        </hl-input>
      </template>
      <hl-scrollbar max-height="500px">
        <hl-tree ref="subjectTreeRef" show-checkbox node-key="id" :data="subjectData" :filter-node-method="filterNode" :props="defaultProps" />
      </hl-scrollbar>
    </hl-panel>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="$emit('close')">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="ok">确定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch, PropType, nextTick } from 'vue';
import { apiSubjectObj } from '@/apis/modules/element-subject';
import { IgetRegionListSpace } from '@/apis/modules/element-subject/model';

interface ItreeNode {
  regionName: string;
  id: string;
  regionList: any[];
  leafNode: number;
  label: string;
  regionTypeCode: string;
}
const defaultProps = ref({
  children: 'regionList',
  label: 'label'
});

const emit = defineEmits(['subjectChanged', 'close']);

const props = defineProps({
  modelValue: [] as PropType<any[]>
});

const searchText = ref('');
const subjectData = ref<any>();
const checkedList = ref<any>();

const subjectTreeRef = ref();

watch(searchText, val => {
  subjectTreeRef.value?.filter(val);
});

const filterNode = (value: string, data: ItreeNode) => {
  if (!value) return true;
  return data.label.indexOf(value) !== -1;
};
const getData = async() => {
  const { data } = await apiSubjectObj.getRegionList();
  data.forEach((item: IgetRegionListSpace.Data) => {
    item.label = item.regionTypeName;
    if (item.regionList.length) {
      item.regionList.forEach((item2: IgetRegionListSpace.RegionList) => {
        item2.label = item2.regionName;
      });
    }
  });
  subjectData.value = data;
};
const ok = () => {
  const checkNodes = subjectTreeRef.value.getCheckedNodes();
  // 选中列表
  checkedList.value = checkNodes
    .filter((item: ItreeNode) => {
      return !item.regionList;
    })
    .map((cur: ItreeNode) => {
      return { regionName: cur.regionName, regionId: cur.id, regionTypeCode: cur.regionTypeCode };
    });
  emit('subjectChanged', checkedList.value);
  emit('close');
};

onMounted(() => {
  getData();
  const checkIds = props.modelValue?.map(item => {
    return item.regionId;
  });
  nextTick(() => {
    subjectTreeRef.value.setCheckedKeys(checkIds);
  });
});
</script>
