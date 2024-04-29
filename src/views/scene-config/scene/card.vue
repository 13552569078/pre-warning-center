<template>
  <hl-panel class="main-panel w-full" padding="var(--xxl)" footer-padding="var(--lg)" footer-class="items-left">
    <hl-group align="items-top" full gap="8px" style="min-height: 70px">
      <img type="primary" :src="screnIcon" class="static" style="width: 56px; height: 56px" />
      <hl-group dir="vertical" align="items-around" gap="0">
        <hl-group full>
          <hl-group dir="vertical" gap="var(--xxs)">
            <hl-group block align="items-between">
              <h3>{{ detailObj.sceneName }}</h3>
              <hl-group>
                <hl-link type="primary" @click="editFunc(detailObj.id)">编辑</hl-link>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-group>
        <hl-group>
          <hl-popover placement="top-start" title="描述信息:" :width="600" trigger="hover" :content="detailObj.description" v-if="detailObj.description.length > 28">
            <template #reference>
              <p class="text-regular text-2">{{ detailObj.description }}</p>
            </template>
          </hl-popover>
          <p class="text-regular text-2" v-else>{{ detailObj.description || '暂无数据' }}</p>
        </hl-group>
      </hl-group>
    </hl-group>
    <template #footer>
      <hl-group block dir="vertical" full>
        <hl-group dir="vertical" class="m-b-20">
          <hl-group class="font-md m-b-10 font-black">风险分类</hl-group>
          <hl-group gap-x="var(--sm)" gap-y="var(--xs)" wrap block style="padding: 15px 20px; background: #f9fafe">
            <hl-tag v-for="(item, index) in detailObj.eventTypeList" :key="index" color="#ffffff" size="lg" style="color: #8a8a8a; border-radius: 2px; padding: 3px 8px; border: 0">{{ item.name }}</hl-tag>
          </hl-group>
        </hl-group>
        <hl-group dir="vertical">
          <hl-group dir="horizontal" gap="var(--md)" class="bg-stripes items-between">
            <hl-group class="font-md m-t-20 m-b-10 font-black">监测主体和监测点</hl-group>
            <hl-group class="font-md m-t-20 m-b-10 font-normal cursor-pointer items-middle" @click="changeType" style="color: #4b4b4b">
              切换
              <hl-icon style="margin-left: 10px">
                <TwoTreemenu v-if="showType === 'table'" />
                <TwoTable v-else />
              </hl-icon>
            </hl-group>
          </hl-group>
          <hl-group gap-x="var(--sm)" gap-y="var(--xs)" wrap block full>
            <hl-simple-table v-if="showType === 'table'" :cols="cols" :data="regionListTable" border="bordered"> </hl-simple-table>
            <hl-tree v-else :data="regionListTree" :props="defaultProps" default-expand-all />
          </hl-group>
        </hl-group>
        <hl-group dir="vertical">
          <hl-group class="font-md m-t-20 m-b-10 font-black">监测指标</hl-group>
          <hl-group gap-x="var(--sm)" gap-y="var(--xs)" wrap block style="padding: 15px 20px; background: #f9fafe">
            <hl-tag v-for="(item, index) in detailObj.targetList" :key="index" color="#ffffff" size="lg" style="color: #8a8a8a; border-radius: 2px; padding: 3px 8px; border: 0">{{ item.targetName }}</hl-tag>
          </hl-group>
        </hl-group>
      </hl-group>
    </template>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { HlMessageBox } from 'hongluan-ui';
import { getFileDirUrl } from '@/common';
import screnIcon from '@/assets/images/report/scren-card-icon.png';

const emit = defineEmits(['edit', 'deleteFunc', 'upChangeStatus']);

const props = defineProps({
  detail: {
    type: Object,
    default: () => ({})
  }
});

const status = ref(!!props.detail.useState);
const detailObj = ref(props.detail);

const changeStatus = (id: string, openStatus: boolean) => {
  emit('upChangeStatus', id, openStatus);
};
const del = async (item: any) => {
  await HlMessageBox.confirm(`您确认删除【${item.sceneName}】?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消'
  });
  emit('deleteFunc', item.id);
};
const editFunc = (id: string) => {
  emit('edit', id);
};

const showType = ref('table');
const changeType = () => {
  if (showType.value === 'table') {
    showType.value = 'tree';
  } else {
    showType.value = 'table';
  }
};

// 处理监测 主体和监测点
const cols = ref([
  // { title: '', slotName: 'tableIndex' },
  { title: '监测主体类型', prop: 'regionTypeName', showTooltip: true, width: '200px' },
  { title: '监测主体', prop: 'regionListNumber' },
  { title: '监测点', prop: 'unitListNumber' }
]);
const regionListTable = computed(() => {
  const result: any = [];
  props.detail.regionList.forEach((item: any) => {
    const treeNode: any = {};
    treeNode.regionTypeName = item.regionTypeName;
    treeNode.regionListNumber = item.regionList.length;
    let unitListNumber = 0;
    if (item.regionList && item.regionList.length) {
      item.regionList.forEach((item2: { unitList: string | any[] }) => {
        unitListNumber += item2.unitList.length;
      });
    }
    treeNode.unitListNumber = unitListNumber;
    result.push(treeNode);
  });
  return result;
});

const defaultProps = ref({
  children: 'children',
  label: 'label'
});
const regionListTree = computed(() => {
  props.detail.regionList.forEach((item: any) => {
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
        }
      });
    }
  });
  return props.detail.regionList;
});
</script>
<style scoped lang="scss">
:deep(.panel-body) {
  padding: 20px 20px 0 !important;
}
:deep(.panel-footer) {
  padding: 20px !important;
}
.m-t-20 {
  margin-top: 20px;
}
.m-b-10 {
  margin-bottom: 10px;
}
.text-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  max-height: 1.8em;
}
</style>
