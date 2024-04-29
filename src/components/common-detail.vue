<template>
  <hl-panel radius="0px" :class="['content', customClass]" style="width: 100%; --panel-header-height: 60px" borderless padding="var(--lg);" header-class="bg-content" body-padding="var(--lg)" :body-class="['display-flex items-left items-top flex-col content', customBodyClass]" footer-style :body-style="onlyInfo ? 'padding: 0' : 'padding: var(--lg); padding-top: 0;'">
    <template #header v-if="!onlyInfo">
      <div class="panel-header-left">
      </div>
      <panel-header :title="detailOpt.title?? '基本信息'"/>
      <div class="panel-header-right"></div>
    </template>
    <template #default>
      <hl-row :count="count" gap-x="var(--lg)" gap-y="var(--lg)" :class="['show-col', 'w-full']" :style="!onlyInfo ? 'padding: 0 calc(var(--xxs) * 5)' : ''">
        <hl-col v-for="item in detailOpt.cols" :span="item.span==='col-span-3' ? 'md:col-24' : 'md:col-12'" :key="item.key">
          <hl-group align="items-left items-top" class="w-full" dir="vertical" gap="var(--xxs)">
            <div class="text-secondary">{{ item.label }}</div>
            <div class="text-regular font-md font-bold" v-if="!item.slot" style="word-break: break-all">
              {{ detailOpt.data[item.key] ? detailOpt.data[item.key] : '--' }}
            </div>
            <div class="text-regular font-md w-full" v-else>
              <slot :name="item.slot" :detail="detailOpt.data" :key="item.key"></slot>
            </div>
          </hl-group>
        </hl-col>
      </hl-row>
      <!-- 相关图片 -->
      <hl-row v-if="detailOpt?.imageOpt?.show" class="m-t-lg" count="count-xl-4 count-lg-3 count-md-2" gap-x="var(--xxl)" gap-y="var(--xl)" :style="!onlyInfo ? 'padding: 0 calc(var(--xxs) * 5)' : ''">
        <hl-group align="items-left items-top" class="w-full" dir="vertical" gap="var(--xxs)">
          <div class="text-secondary">{{ detailOpt?.imageOpt.title ?? '相关图片' }}</div>
          <hl-group gap="var(--md)" v-if="detailOpt?.imageOpt?.list.length > 0">
            <hl-thumb v-for="(item, index) in detailOpt?.imageOpt?.list" :key="item" style="width: calc(var(--lg) * 5); height: calc(var(--lg) * 5)" :src="item" fit="cover" :preview-src-list="detailOpt.imageOpt.list" :initial-index="index" />
          </hl-group>
          <div class="text-regular font-md font-bold" v-else style="word-break: break-all">
              --
          </div>
        </hl-group>
      </hl-row>
      <!-- 相关图片/视频 -->
      <hl-row v-if="detailOpt?.imageVideoOpt?.show" class="m-t-lg" count="count-xl-4 count-lg-3 count-md-2" gap-x="var(--lg)" gap-y="var(--xl)" :style="!onlyInfo ? 'padding: 0 calc(var(--xxs) * 5)' : ''">
        <hl-group align="items-left items-top" class="w-full" dir="vertical" gap="var(--xxs)">
          <div class="text-secondary">{{ detailOpt?.imageVideoOpt.title ?? '相关图片/视频' }}</div>
          <hl-group gap="var(--md)" v-if="detailOpt?.imageVideoOpt?.list.length > 0">
            <hl-group v-for="item in detailOpt?.imageVideoOpt?.list" :key="item">
              <hl-thumb v-if="item.attachmentType === 'IMAGE'" style="width: calc(var(--lg) * 5); height: calc(var(--lg) * 5)" :src="getFileDirUrl(item)" fit="cover" @click.stop="handlePreview(item)" />
              <hl-group v-if="item.attachmentType === 'VIDEO'" class="thumb border" align="items-center items-middle" @click.stop="handlePreview(item)" style="width: calc(var(--lg) * 5); height: calc(var(--lg) * 5)">
                <hl-icon style="display: inline-block" size="lg" type="info">
                  <FillFileVideo />
                </hl-icon>
              </hl-group>
              <hl-group v-if="item.attachmentType === 'PDF'" class="thumb border" align="items-center items-middle" @click.stop="handlePreview(item)" style="width: calc(var(--lg) * 5); height: calc(var(--lg) * 5)">
                <hl-icon style="display: inline-block" size="lg" type="danger">
                  <FillFilePdf />
                </hl-icon>
              </hl-group>
            </hl-group>
          </hl-group>
          <div class="text-regular font-md font-bold" v-else style="word-break: break-all">
              --
          </div>
        </hl-group>
      </hl-row>
      <!-- 相关附件 -->
      <hl-row v-if="detailOpt?.fileOpt?.show" class="m-t-lg" count="count-xl-4 count-lg-3 count-md-2" gap-x="var(--xxl)" gap-y="var(--xl)" :style="!onlyInfo ? 'padding: 0 calc(var(--xxs) * 5)' : ''">
        <hl-group align="items-left items-top" class="w-full" dir="vertical" gap="var(--xxs)">
          <div class="text-secondary m-b-xxs">{{ detailOpt?.fileOpt.title ?? '相关附件' }}</div>
          <hl-group gap="var(--xxs)" v-if="detailOpt?.fileOpt?.list.length > 0" dir="vertical">
            <div class="text-link" v-for="item in detailOpt?.fileOpt?.list" :key="item.id" block>{{ item.name }}</div>
          </hl-group>
          <div class="text-regular font-md font-bold" v-else style="word-break: break-all">
              --
          </div>
        </hl-group>
      </hl-row>
      <!-- slot -->
      <hl-row class="m-t-lg" :style="!onlyInfo ? 'padding: 0 calc(var(--xxs) * 5)' : ''">
        <slot />
      </hl-row>
    </template>
  </hl-panel>

  <hl-dialog v-model="dialogVisible" title="查看" width="600px">
    <video v-if="dialogFile.attachmentType === 'VIDEO'" :src="getFileDirUrl(dialogFile)" class="item-thumb w-full" controls></video>
    <!-- 仅图片可轮播 -->
    <!-- <hl-thumb v-else :src="getFileDirUrl(dialogFile)" class="full" /> -->
    <template v-else>
      <hl-carousel height="350px" :initial-index="initialIndex" v-if="dialogVisible">
        <hl-carousel-item v-for="(item, index) in imageList" :key="index">
          <hl-thumb :src="getFileDirUrl(item)" class="full" fit="fill" />
        </hl-carousel-item>
      </hl-carousel>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, PropType, nextTick, onUnmounted, computed } from 'vue';
import { Indexable } from 'fx-front-utils';
import { getFileDirUrl } from '@/common';

const props = defineProps({
  detailOpt: {
    type: Object as PropType<Indexable<any>>,
    default: () => {
      return {};
    }
  },
  onlyInfo: {
    type: Boolean,
    default: false
  },
  count: {
    type: String,
    default: 'xl:count-3 md:count-2 count-md-1'
  },
  customBodyClass: {
    type: String,
    default: ''
  },
  customClass: {
    type: String,
    default: ''
  },
});

const dialogFile = ref();
const dialogVisible = ref(false);
const initialIndex = ref(0);

const handlePreview = (file: any) => {
  dialogVisible.value = false;
  dialogFile.value = file;
  if (file.attachmentType === 'PDF') {
    window.open(getFileDirUrl(file));
    return;
  }
  // 获取图片index
  if (file.attachmentType === 'IMAGE') {
    imageList.value.forEach((item: any, index: number) => {
      console.log(item.fileId === file.fileId);
      if (item.fileId === file.fileId) {
        initialIndex.value = index;
      }
    });
  }
  nextTick(() => {
    dialogVisible.value = true;
  });
};

const imageList = computed(() => {
  return props.detailOpt?.imageVideoOpt?.list
    ? props.detailOpt?.imageVideoOpt?.list.filter((item: any) => {
      return item.attachmentType === 'IMAGE';
    })
    : [];
});

onUnmounted(() => {
  dialogFile.value = null;
  dialogVisible.value = false;
});
</script>
