<template>
  <hl-dialog v-model="dialogVisible" title="添加监测设备" width="900px" @close="handleCloseEquipmentSelector">
    <fx-page-table-v2
      ref="tableRef"
      v-if="shwoTable"
      :cols="cols"
      :table-data="tableData"
      :data-fetcher="getData"
      selector-col-count="count-2"
      search-placement="top"
      :search-items="searchItems"
      @selected-row-keys="selectedRowKeys"
      @row-click="clickRow"
    >
      <template #point="{ searchForm }">
        <search-monitor-event @point-changed="pointChanged"  v-model="searchForm['monitorUnitId']"  @clear-point="clearPoint"/>
      </template>
      <template #area="{ searchForm }">
        <search-area @area-changed="areaChanged" v-model="searchForm['streetAreaCode']" @clear-area="clearArea" />
      </template>
      <template #distance="{ searchForm }">
        <hl-radio-group v-model="searchForm['distance']" :disabled="!isHasLocation">
          <hl-radio v-for="item in radioOpitons" :key="item.value" :label="item.value" >{{ item.name }}</hl-radio>
        </hl-radio-group>
      </template>
    </fx-page-table-v2>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="handleCloseEquipmentSelector">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="handleAddEquipment">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick, watch, computed } from 'vue';
import { DataFetcherParams } from 'fx-front-framework';
import { SearchMonitorEvent } from '@/views/monitoring-elements/components/index';
import { apiEquipmentObj } from '@/apis/modules/equipment';
import { apiEquipmentTypeObj } from '@/apis/modules/equipment-type';
import { IpostPageSpace } from '@/apis/modules/equipment/model';

type SelectedEquipment = {
  id: string,
  name: string
}

const emit = defineEmits(['close', 'ok']);
const props = defineProps({
  selected: Array,
  longitude: String,
  latitude: String
});

const radioOpitons = [{
  name: '500米',
  value: 500
}, {
  name: '1000米',
  value: 1000,
}, {
  name: '2000米',
  value: 2000,
}, {
  name: '3000米',
  value: 3000,
}, {
  name: '5000米',
  value: 5000,
}];

const tableData = ref<IpostPageSpace.List[]>([]);
const tableRef = ref();
const shwoTable = ref(false);
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const areaCode = ref();
const pointData = ref();
const currentPageNum = ref(1);
const dialogVisible = ref(true);

const selectedEquipments = ref<SelectedEquipment[]>([]);

const isHasLocation = computed(() => {
  return props.longitude && props.latitude;
});

const cols = ref([
  { title: '', slotName: 'tableSelection', headerSlotName: 'selectionCol' },
  { title: '设备名称', prop: 'equipName', minWidth: '240px', showTooltip: true, tooltipProps: { maxWidth: '340px' } },
  { title: '设备分类', prop: 'equipTypeName', minWidth: '140px', showTooltip: true, tooltipProps: { maxWidth: '340px' } },
  { title: '安装位置', prop: 'address', minWidth: '240px', showTooltip: true, tooltipProps: { maxWidth: '340px' } }
]);
const searchItems = reactive([
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '设备名称',
    placeholder: '设备名称',
    value: '',
    name: 'equipName',
  },
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '安装位置',
    placeholder: '安装位置',
    value: '',
    name: 'address',
  },
  {
    type: 'slot',
    label: '距监测点',
    placeholder: '距监测点',
    value: '',
    name: 'distance',
    slotName: 'distance',
  }
]);

const oldKeys = ref([] as string[]);

const getSelectedEquipments = (keys: string[]) => {
  if (!keys.length) return [];
  const arr: Set<SelectedEquipment> = new Set();
  keys.map(id => {
    const equip = tableData.value.find(eq => eq.id === id);
    if (equip) {
      arr.add({
        id,
        name: equip!.equipName
      });
    }
    return id;
  });
  return arr;
};

const arrayDiff = (arr1: string[], arr2: string[]) => {
  const newArr = arr1.filter(function(val) {
    return !(arr2.indexOf(val) >= 0);
  }).concat(arr2.filter(function(val) {
    return !(arr1.indexOf(val) >= 0);
  }));
  return newArr;
};

const selectedRowKeys = (newKeys: string[]) => {
  console.log('newKey', newKeys);
  console.log('oldKey', oldKeys.value);
  // 1、添加选择：newKeys > oldKeys
  if (newKeys.length > oldKeys.value.length) {
    console.log('增加了', selectedEquipments);
    const diff = arrayDiff(newKeys, oldKeys.value);
    const tempSet = new Set(diff);
    const equipArr = Array.from(getSelectedEquipments(Array.from(tempSet)));
    selectedEquipments.value = selectedEquipments.value.concat(equipArr);
  } else if (newKeys.length < oldKeys.value.length) {
    // 2、取消选择：newKeys < oldKeys
    console.log('减少了');
    const diff = arrayDiff(newKeys, oldKeys.value);
    oldKeys.value = oldKeys.value.filter(id => !diff.includes(id));
    const equipArr = Array.from(getSelectedEquipments(oldKeys.value));
    selectedEquipments.value = equipArr;
  }
  console.log(selectedEquipments.value, 889);
  oldKeys.value = newKeys;
};

const clickRow = (row: IpostPageSpace.List) => {
  console.log('click row', row);
};
const getSearchItems = async() => {
  // 下拉-设备类型
  const result1 = await apiEquipmentTypeObj.getListEquipTypeByFacicityTypeCode(
    ''
  );
  const item1 = {
    type: 'select',
    label: '监测设备类型',
    placeholder: '监测设备类型',
    value: '',
    filterable: true,
    name: 'equipType',
    prop: {
      label: 'name',
      value: 'value',
    },
    options: [...result1.data],
  };
  searchItems.push(item1);
  shwoTable.value = true;
};

const getData = async({
  pageSize,
  currentPage,
  params,
  setTotal,
}: DataFetcherParams) => {
  currentPageNum.value = currentPage;
  const searchParams = {
    pageSize,
    currentPage,
    linked: 0,
    ...params,
    latitude: props.latitude,
    longitude: props.longitude
  };
  if (areaCode.value) {
    searchParams.streetAreaCode = areaCode.value;
  }
  if (pointData.value?.treeType) {
    searchParams.treeType = pointData.value.treeType;
    searchParams.treeValue = pointData.value.treeValue;
  }
  tableData.value = [];
  const { data } = await apiEquipmentObj.postPage(searchParams);
  tableData.value = data.list;
  setTotal(data.totalRow);
  nextTick(() => {
    console.log('载入啦', selectedEquipments.value);
    if (selectedEquipments.value.length) {
      tableRef.value.setSeletedRowKeys(selectedEquipments.value.map(item => item.id));
    }
  });
};

const pointChanged = (data: any) => {
  console.log(data, 285);
  pointData.value = {
    ...data
  };
  // tableRef.value?.refresh();
};
const areaChanged = (data: any) => {
  areaCode.value = data;
};
const clearPoint = () => {
  pointData.value = null;
};
const clearArea = () => {
  areaCode.value = null;
};

const handleCloseEquipmentSelector = () => {
  emit('close');
};

const handleAddEquipment = () => {
  const idArr = Array.from(new Set(selectedEquipments.value.map(equip => equip.id)));
  const emitArr = idArr.map(id => {
    return selectedEquipments.value.find(item => item.id === id);
  });
  emit('ok', emitArr);
};

// const w = watch(() => props.selected, () => {
//   if (props.selected?.length) {
//     selectedEquipments.value = props.selected as SelectedEquipment[];
//   }
//   w();
// });

onMounted(() => {
  selectedEquipments.value = props.selected as SelectedEquipment[];
  getSearchItems();
});
</script>
