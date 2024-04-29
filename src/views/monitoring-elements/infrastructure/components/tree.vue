<template>
  <hl-panel
    borderless
    class="h-full w-full"
    inner-scroll
    full-body
  >
    <template #header>
      <div class="panel-title">
        <h5>专项基础设施类型</h5>
      </div>
    </template>
    <hl-scrollbar style="padding: 0 var(--panel-body-padding)">
      <hl-list hover v-if="listData.length">
        <hl-list-item
          v-for="(item, index) in listData"
          :key="index"
          :class="[activeId === item.typeCode ? 'bg-light' : null, 'hover-wrap']"
          @click="changeActive(item.typeCode)"
        >
          {{ item.typeName }}
        </hl-list-item>
      </hl-list>
      <hb-empty
        description="暂无数据"
        v-else
      />
    </hl-scrollbar>
  </hl-panel>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { HlMessageBox } from 'hongluan-ui';
import { useRouter, useRoute } from 'vue-router';
import { apiSubjectTypeObj } from '@/apis/modules/element-subject-type';
import { apiFacilityTypeObj } from '@/apis/modules/facility-type';
import { IgetFacilityTreeSpace } from '@/apis/modules/facility-type/model';
import { IlistSpace } from '@/apis/modules/element-subject-type/model';

const emit = defineEmits(['upActiveId']);
const route = useRoute();

const listData = ref<IgetFacilityTreeSpace.Data[]>([]);
const activeId = ref('');
const changeActive = (id: string) => {
  activeId.value = id;
  emit('upActiveId', activeId.value);
};
const defaultTreeData = ref([
  { name: '燃气类', code: 'SZSSLX_RQ' },
  { name: '供水类', code: 'SZSSLX_GS' },
  { name: '排水类', code: 'SZSSLX_PS' },
  { name: '供热类', code: 'SZSSLX_GR' },
  { name: '管廊类', code: 'SZSSLX_GL' },
  { name: '环卫设施类', code: 'SZSSLX_HW' },
  { name: '道路类', code: 'SZSSLX_DL' },
  { name: '房屋设施类', code: 'FWSSLX_DT' },
  { name: '桥梁类', code: 'JTSSLX_QL' },
  { name: '隧道设施', code: 'JTSSLX_SD' },
  { name: '建筑工地', code: 'JZGD_DL' },
  { name: '照明设施', code: 'SZSSLX_ZM' },
  { name: '人员密集场所', code: 'RYMJCS_DL' },
]);

const getList = async() => {
  const { data } = await apiFacilityTypeObj.getFacilityTree(2);
  listData.value = data.filter(e => defaultTreeData.value.findIndex(i => i.code === e.typeCode) > -1);
  activeId.value =
    (route.query?.typeCode as string) || listData.value[0]?.typeCode;
  activeId.value && emit('upActiveId', activeId.value);
};

getList();
</script>
