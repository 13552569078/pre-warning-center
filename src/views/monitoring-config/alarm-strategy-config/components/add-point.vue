<template>
  <hl-dialog :model-value="true" class="md-dialog" width="700px" title="选择监测点" @close="$emit('cancel')"
    :close-on-click-modal="false">
    <div class="panel-title m-b-md dialog-search-input">
      <hl-input v-model="searchText" placeholder="输入监测主体关键字" block fill maxlength="20">
        <template #suffix>
          <two-search />
        </template>
      </hl-input>
    </div>
    <hl-tree ref="tree" :data="pointTree" show-checkbox node-key="value" :props="defaultProps" class="tree-panel"
      :default-expanded-keys="$props.checkedIds" :default-checked-keys="$props.checkedIds"
      :filter-node-method="filterNode" default-expand-all></hl-tree>
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
import { apiYgfWarningConfigObj } from '@/apis/modules/alarm-config';
import { apiMonitorPointObj } from '@/apis/modules/monitor-unit';
import { IgetRegionMonitorUnitTreeSpace } from '@/apis/modules/monitor-unit/model';
// import { IgetRegionMonitorUnitTreeSpace } from '@/apis/modules/alarm-config/model';

const props = defineProps({
  checkedIds: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  monitorStrategyId: {
    type: String,
    default: ''
  }
});

const emits = defineEmits(['pointOk', 'cancel']);

const searchText = ref('');
const pointTree = ref<IgetRegionMonitorUnitTreeSpace.Data[]>([]);
const tree = ref();

const defaultProps = {
  children: 'children',
  label: 'label',
};

watch(searchText, val => {
  tree.value?.filter(val);
});

const filterNode = (value: string, data: IgetRegionMonitorUnitTreeSpace.Data) => {
  if (!value) return true;
  return data.label.indexOf(value) !== -1;
};
const ok = () => {
  // 在原始数据中 没有的 点位
  const list = tree.value
    .getCheckedNodes()
    .filter((item: IgetRegionMonitorUnitTreeSpace.Data) => {
      return item.treeType === 'MONITOR_UNIT';
    }).map((item3: IgetRegionMonitorUnitTreeSpace.Data) => {
      return { ...item3, targetIdList: '' };
    });
  emits('pointOk', list);
};
const loopPointTree = (data: IgetRegionMonitorUnitTreeSpace.Data[]) => {
  data.forEach((item: IgetRegionMonitorUnitTreeSpace.Data) => {
    // 非点位不允许选择
    item.disabled = item.treeType !== 'MONITOR_UNIT';
    item.children && loopPointTree(item.children);
  });
};
// 格式化处理
const format = (arr: IgetRegionMonitorUnitTreeSpace.Data[]) => {
  return arr.map((e: IgetRegionMonitorUnitTreeSpace.Data) => {
    e.label = e.regionTypeName || e.unitName || e.regionName;
    e.value = e.unitId || e.regionId || e.regionTypeCode;
    if (e.regionList?.length) {
      e.children = format(e.regionList);
    }
    if (e.unitList?.length) {
      e.children = format(e.unitList);
    }
    return e;
  });
};

onMounted(async() => {
  // const { data } = await apiYgfWarningConfigObj.getRegionMonitorUnitTree();
  const { data } = await apiMonitorPointObj.getRegionMonitorUnitTree(props.monitorStrategyId);
  pointTree.value = format(data);
  loopPointTree(pointTree.value);
});
</script>
