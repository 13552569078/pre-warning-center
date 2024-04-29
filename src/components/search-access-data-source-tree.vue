<template>
  <hl-selector :class="!isInForm ? '' : ''" ref="selector1" filterable clearable block popper-class="limit-height"
    @input="handleTreeInput" @clear="handleClear" @resize="resize" placeholder="请选择接入数据源" :disabled="disabled">
    <hl-scrollbar max-height="240px">
      <hl-tree
        ref="hlTreeSingle"
        :style="treeStyle"
        node-key="accessSourceId"
        :data="treeData"
        :filter-node-method="filterNode"
        class="p-md"
        @node-click="clickTree"
        :props="defaultProps" />
    </hl-scrollbar>
  </hl-selector>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { findNode } from '@/common/utils';
import { apiAccessObjectObj } from '@/apis/modules/access-object';
import { IpostGetAccessSourceGroupSpace } from '@/apis/modules/access-object/model';
import { ACCESS_TYPE_NAMES } from '@/views/access-management/access-object/utils';
import { IgetGetAccessSourceObjectGroupSpace } from '@/apis/modules/access-object/model';

interface ItreeNode extends IpostGetAccessSourceGroupSpace.Data {
  children: any[];
}

const props = defineProps({
  accessSourceId: String,
  accessSourceObjectId: String,
  dataSourceType: String,
  isInForm: {
    type: Boolean,
    default: false
  },
  isDatasource: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['changed', 'update:accessSourceId', 'update:accessSourceObjectId', 'update:dataSourceType', 'clear', 'updated']);
const selector1 = ref();
const hlTreeSingle = ref();
const treeStyle = ref({
  width: '',
});
const treeData = ref<any[]>([]);
const clickTree = (data: ItreeNode) => {
  if (data?.childrens && data?.childrens.length !== 0) return false;
  // console.log(50, data.accessSourceName);
  selector1.value.setValue(data.accessSourceName);
  selector1.value.togglePopperVisible(false);
  emit('update:accessSourceId', data.accessSourceId);
  emit('update:accessSourceObjectId', data.accessSourceObjectId);
  emit('update:dataSourceType', data.dataSourceType);
  emit('changed', data.accessSourceId);
};
const reset = () => {
  selector1.value.setValue('');
  selector1.value.togglePopperVisible(false);
  hlTreeSingle.value.filter('');
  emit('clear');
};

const filterNode = (value: string, data: ItreeNode) => {
  if (!value) return true;
  return data.accessSourceName.indexOf(value) !== -1;
};
const handleTreeInput = (val: string) => {
  console.log(69, val);
  hlTreeSingle.value.filter(val);
};
const handleClear = () => {
  emit('update:accessSourceId', '');
  emit('update:accessSourceObjectId', '');
  emit('update:dataSourceType', '');
  emit('clear');
  emit('changed', '');
};
const resize = (data: { offsetWidth: number }) => {
  treeStyle.value.width = data.offsetWidth + 'px';
};

const defaultProps = {
  children: 'childrens',
  label: 'accessSourceName',
};

const getData = async () => {
  if (props.isDatasource) {
    const { data } = await apiAccessObjectObj.getGetAccessSourceObjectGroup('');
    const sourceData = data.map((e: IgetGetAccessSourceObjectGroupSpace.Data) => {
      return {
        accessSourceName: e.accessSourceName,
        accessSourceId: e.accessSourceId,
        id: e.accessSourceId,
        isLeaf: false,
        name: e.accessSourceName,
        childrens: e.objectList.map(i => {
          return {
            ...i,
            accessSourceName: i.objectName,
            name: i.objectName,
            id: i.accessSourceObjectId
          };
        })
      };
    });
    const tempData = [{
      id: -999,
      accessSourceId: '',
      targetTypeCode: -999,
      accessSourceName: '接入数据项',
      name: '接入数据项',
      childrens: sourceData
    }];
    treeData.value = tempData;
  } else {
    const { data } = await apiAccessObjectObj.postGetAccessSourceGroup('');
    treeData.value.splice(0, treeData.value.length);
    // 处理后端得 map数据
    const accessArr: any[] = [];
    Object.keys(data).forEach((key: string, index: number) => {
      accessArr.push({
        accessSourceId: index,
        accessSourceType: key,
        accessSourceName: (ACCESS_TYPE_NAMES as Record<string, any>)[key],
        childrens: (data as any)[key],
      });
    });
    treeData.value = accessArr;
  }

  // if (accessSourceId.value) {
  //   nextTick(() => {
  //     accessTreeRef.value?.setCurrentKey(accessSourceId.value);
  //   });
  // }
};

watch(() => props.accessSourceId, val => {
  // if (val) {
  //   selector1.value.setValue(val);
  // }
});

onMounted(async () => {
  await getData();
  if (props.accessSourceId) {
    const node = findNode(props.accessSourceId, 'accessSourceId', treeData.value, 'childrens');
    selector1.value.setValue(node!.accessSourceName);
    emit('update:dataSourceType', node!.dataSourceType);
    emit('updated');
  }
});

</script>
