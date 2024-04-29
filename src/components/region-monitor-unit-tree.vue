<template>
  <hl-dialog borderless :model-value="true" class="md-dialog" body-class="dialog-no-600" width="550px" title="监测主体" @close="$emit('close')" :close-on-click-modal="false">
    <hl-panel class="h-full w-full" borderless inner-scroll full-body>
      <template #header>
        <hl-input v-model="searchText" placeholder="输入关键字" block fill maxlength="20">
          <template #suffix>
            <two-search />
          </template>
        </hl-input>
      </template>
      <hl-scrollbar class="no-padding-top-bottom" max-height="550px">
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

interface ItreeNode {
  regionName: string;
  id: string;
  children: any[];
  leafNode: number;
  label: string;
  regionTypeCode: string;
}
const defaultProps = ref({
  children: 'children',
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
const getData = async () => {
  const { data } = await apiSubjectObj.getRegionMonitorUnitTree();
  data.forEach((item: any) => {
    item.label = item.regionTypeName;
    item.id = item.regionTypeCode;
    if (item.regionList && item.regionList.length) {
      item.children = item.regionList;
      item.children.forEach((item2: any) => {
        item2.label = item2.regionName;
        item2.id = item2.regionId;
        if (item2.unitList && item2.unitList.length) {
          item2.children = item2.unitList;
          item2.unitList.forEach((item3: any) => {
            item3.label = item3.unitName;
            item3.id = item3.unitId;
            item3.regionTypeCode = item.regionTypeCode;
            item3.regionId = item2.regionId;
            item3.regionName = item2.regionName;
          });
        } else {
          item2.disabled = true;
        }
      });
    } else {
      item.disabled = true;
    }
  });
  subjectData.value = data;
};
const ok = async() => {
  const checkNodes = subjectTreeRef.value.getCheckedNodes();
  console.log(85, checkNodes);
  // 选中列表
  checkedList.value = checkNodes
    .filter((item: any) => {
      return !item.regionList && !item.unitList;
    })
    .map((cur: any) => {
      return { regionName: cur.regionName, regionId: cur.regionId, regionTypeCode: cur.regionTypeCode, unitId: cur.unitId, unitName: cur.unitName };
    });
  const { data } = await apiSubjectObj.postChangeRegionUnitListToTree(checkedList.value);
  console.log(96, data);
  emit('subjectChanged', checkedList.value, data);
  emit('close');
};

onMounted(() => {
  getData();
  const checkIds = props.modelValue?.map(item => {
    return item.unitId;
  });
  nextTick(() => {
    subjectTreeRef.value.setCheckedKeys(checkIds);
  });
});
</script>
