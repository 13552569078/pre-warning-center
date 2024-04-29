<template>
  <!-- <hl-group class="w-full m-b-md" align="items-right">
    <hl-button type="primary" icon-position="left" @click="addScene">
      新增场景
      <template #icon>
        <hl-icon><two-plus /></hl-icon> </template
    ></hl-button>
  </hl-group> -->
  <hl-group v-if="!sceneList.length" full-y dir="vertical" class="h-full" align="items-center" full>
    <hb-empty description="暂无数据" />
  </hl-group>
  <hl-row v-else layout="flow" count="count-3" gap="var(--xl)" class="show-col">
    <hl-col span="col" v-for="item in sceneList" :key="item.id">
      <card @edit="editScene" @deleteFunc="deleteFunc" @upChangeStatus="upChangeStatus" :detail="item" />
    </hl-col>
  </hl-row>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { HlMessageSuccess } from '@/common';
import { apiSceneObj } from '@/apis/modules/scene-config/scene';
import { IlistSpace } from '@/apis/modules/scene-config/scene/model';
import Card from './card.vue';
import { HlMessage } from 'hongluan-ui';

const router = useRouter();

const sceneList = ref<IlistSpace.Data[]>([]);

const getData = async() => {
  const { data } = await apiSceneObj.list();
  sceneList.value = [];
  sceneList.value = data;
};
const upChangeStatus = async(id: number, status: boolean) => {
  await apiSceneObj.getChange(id, status ? 1 : 0);
  HlMessageSuccess(`${status ? '启用' : '停用'}成功`);
  getData();
};
const deleteFunc = async(id: number) => {
  await apiSceneObj.deleteS(id);
  HlMessage.success('删除成功');
  getData();
};
const addScene = () => {
  router.push({
    name: 'SceneEdit',
    query: {
      action: 'add'
    }
  });
};
const editScene = (sceneId: string) => {
  router.push({
    name: 'SceneEdit',
    query: {
      action: 'edit',
      sceneId
    }
  });
};

getData();
</script>
