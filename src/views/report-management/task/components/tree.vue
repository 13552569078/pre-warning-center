<template show-source>
  <hl-panel class="h-full w-full" borderless inner-scroll full-body>
    <template #header>
      <hl-input v-model="searchText" placeholder="输入分组关键字" block fill maxlength="20">
        <template #suffix>
          <two-search />
        </template>
      </hl-input>
    </template>
    <hl-scrollbar class="no-padding-top-bottom">
      <hl-tree ref="reportTreeRef" :data="reportTplData" :props="defaultProps" node-key="id" gap="0" :expand-on-click-node="false"
        :highlight-current="true" :filter-node-method="filterNode" @node-click="handleNodeClick"
        default-expand-all
        >
        <template #default="{ node, data }">
          <hl-group full gap="var(--xs)" align="items-between items-middle"
            :class="['event-type-label', isHovering(node.id) ? 'is-hovering' : '']" @mouseenter="enterTreeNode(node.id)"
            @mouseleave="leaveTreeNode(node.id)">
            <hl-group class="tree-node-label ellipsis static items-middle"
              :style="`width:${node.level <= 1 ? '160' : '150'}px`">
              <hb-text-overflow method="length" :length="14" effect="light" class="tree-start">
                <span>{{ data.name }}</span>
              </hb-text-overflow>
            </hl-group>
          </hl-group>
        </template>
      </hl-tree>
    </hl-scrollbar>
  </hl-panel>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, reactive } from 'vue';
import { HlTree } from 'hongluan-ui';
import { useHovering } from '@/hooks';
import { HlMessageBox } from 'hongluan-ui';
import { apiReportTsakObj } from '@/apis/modules/report-manage/task/index';
import { IgetTypeTemplateTreeSpace } from '@/apis/modules/report-manage/task/model';

const emit = defineEmits(['click']);

const searchText = ref('');
const reportTreeRef = ref<InstanceType<typeof HlTree>>();

const reportTplData = ref<IgetTypeTemplateTreeSpace.Data[]>([]);
const defaultProps = {
  children: 'children',
  label: 'name',
};

watch(searchText, val => {
  reportTreeRef.value?.filter(val);
});

const { enter: enterTreeNode, leave: leaveTreeNode, isHovering } = useHovering();

const filterNode = (value: string, data: IgetTypeTemplateTreeSpace.Data) => {
  if (!value) return true;
  return data.name.indexOf(value) !== -1;
};
const handleNodeClick = (data: IgetTypeTemplateTreeSpace.Data, node: any) => {
  emit('click', data);
};
const getData = async() => {
  const result = await apiReportTsakObj.getTypeTemplateTree();
  reportTplData.value.splice(0, reportTplData.value.length);
  reportTplData.value.push({
    id: -1,
    name: '全部',
    children: result.data,
    parentCode: '',
    templateTypeCode: '',
    type: 0
  });
};

onMounted(async() => {
  await getData();
  reportTreeRef.value?.setCurrentKey(-1);
});

</script>
<style lang="scss" scoped>
.event-type-label {
  .more-actions {
    visibility: hidden;
  }

  &.is-hovering {
    .more-actions {
      visibility: visible;
    }
  }
}
</style>
