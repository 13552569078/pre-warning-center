<template>
  <hl-upload ref="uploaderRef" :class="{ 'hide-upload-btn': hideUploadBtn }" :action="fileServer" :accept="accept" :headers="headers" list-type="card" :file-list="modelValue" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" :before-upload="handleBeforeUpload" :on-exceed="handleExceed" :limit="limit">
    <hl-icon><two-upload /></hl-icon>
    <template #file="{ file }">
      <div>
        <hl-group v-if="isUploading(file)" style="background-color: var(--upload-item-bg-color-mask)" align="items-center items-middle">
          <hl-progress show-as="circle" :percentage="file.percentage" style="width: 50%" />
        </hl-group>
        <template v-else>
          <img v-if="isImage(file)" class="thumb item-thumb" :src="(file.dirUrl && getFileDirUrl(file)) || (file.response.data.dirUrl && getFileDirUrl(file.response.data))" alt="" />
          <hl-group v-else-if="isVideo(file)" class="thumb" align="items-center items-middle">
            <hl-icon style="display: inline-block" size="lg" type="info"><FillFileVideo /></hl-icon>
          </hl-group>
          <hl-group v-else-if="isPdf(file)" class="thumb" align="items-center items-middle">
            <hl-icon style="display: inline-block" size="lg" type="danger"><FillFilePdf /></hl-icon>
          </hl-group>
        </template>
        <span class="item-actions">
          <span class="item-preview" @click="handlePreview(file)">
            <hl-icon><two-zoom-in /></hl-icon>
          </span>
          <span class="item-delete" @click="removeFile(file)">
            <hl-icon><two-delete /></hl-icon>
          </span>
        </span>
      </div>
    </template>
  </hl-upload>

  <hl-dialog v-model="dialogVisible" title="查看" width="600px">
    <video v-if="isVideo(dialogFile)" :src="(dialogFile.dirUrl && getFileDirUrl(dialogFile)) || (dialogFile.response.data.dirUrl && getFileDirUrl(dialogFile.response.data))" class="item-thumb w-full" controls></video>
    <hl-thumb v-else :src="(dialogFile.dirUrl && getFileDirUrl(dialogFile)) || (dialogFile.response.data.dirUrl && getFileDirUrl(dialogFile.response.data))" class="full" />
  </hl-dialog>
</template>

<script lang="ts" setup>
import { ref, nextTick, computed } from 'vue';
import { Indexable } from 'fx-front-utils';
import { HlMessage } from 'hongluan-ui';
import { GlobalAPI } from '@/common/global-api';
import userAuth from '@/common/user-auth';
import { getFileDirUrl } from '@/common';

interface UploadUserFile {
  dirUrl: string;
  name: string;
  url: string;
  id: string;
  type: string;
  attachmentType: string;
  percentage: number;
  response?: IsuccessUpload;
}

interface IsuccessUpload {
  data: Indexable<any>;
}

const props = defineProps({
  modelValue: Array,
  accept: {
    type: String,
    default: '.jpg,.png,.jpeg'
  },
  limit: {
    type: Number,
    default: 3
  }
});

const hideUploadBtn = computed(() => {
  return (props.modelValue as UploadUserFile[]).length >= props.limit;
});

const emit = defineEmits(['update:modelValue', 'on-success', 'on-remove']);

const headers = {
  authorization: userAuth.getToken()
};

const uploaderRef = ref();

const fileServer = GlobalAPI.config.FILE_SERVER;
const dialogFile = ref();
const dialogVisible = ref(false);

const isImage = (file: UploadUserFile) => {
  return (file.dirUrl && (file.attachmentType === 'IMAGE' || file.type === 'IMAGE')) || (file.response && file.response.data.type === 'IMAGE');
};

const isVideo = (file: UploadUserFile) => {
  return (file.dirUrl && (file.attachmentType === 'VIDEO' || file.type === 'VIDEO')) || (file.response && file.response.data.type === 'VIDEO');
};
const isPdf = (file: UploadUserFile) => {
  return (file.dirUrl && (file.attachmentType === 'PDF' || file.type === 'PDF')) || (file.response && file.response.data.type === 'PDF');
};

const isUploading = (file: UploadUserFile) => {
  return file.percentage && file.percentage !== 100;
};

const handlePreview = (file: UploadUserFile) => {
  dialogFile.value = file;
  // 预览pdf
  if (isPdf(file)) {
    window.open(getFileDirUrl(file));
    return;
  }
  nextTick(() => {
    dialogVisible.value = true;
  });
};

const handleSuccess = (res: IsuccessUpload, file: any, list: UploadUserFile[]) => {
  file.id = res.data.id;
  emit('update:modelValue', list);
  emit('on-success', list);
};

const handleRemove = (file: UploadUserFile, files: UploadUserFile[]) => {
  emit('update:modelValue', files);
};

const removeFile = (file: UploadUserFile) => {
  uploaderRef.value?.handleRemove(file);
  emit('update:modelValue', props.modelValue);
};

// 限制文件
const handleExceed = () => {
  HlMessage.warning(`当前限制选择 ${props.limit} 个文件`);
};

const handleBeforeUpload = (file: any) => {
  const formats = props.accept.replace(/\./g, '').split(',');
  const upperClassFormats = formats.map(item => item.toUpperCase());
  const acceptFormats = formats.concat(upperClassFormats).join('|');
  const reg = new RegExp(acceptFormats);
  if (!reg.test(file.type)) {
    HlMessage.warning(`仅可上传 ${props.accept} 格式的文件`);
    return false;
  }

  // 限制大小
  const endType = file.type.split('/')[1];
  if (IMG_TYPE.includes(endType) && file.size > FILE_SIZE * M * M) {
    HlMessage.warning(IMAGE_LIMIT_MESSAGE);
    return false;
  }
  if (PDF.includes(endType) && file.size > FILE_SIZE * M * M) {
    HlMessage.warning(PDF_LIMIT_MESSAGE);
    return false;
  }
  if (VIDEO_TYPE.includes(endType) && file.size > VIDEO_SIZE * M * M) {
    HlMessage.warning(VIDEO_LIMIT_MESSAGE);
    return false;
  }
};

const FILE_SIZE = 20;
const VIDEO_SIZE = 100;
const M = 1024;
const IMG_TYPE = ['jpg', 'png', 'jpeg'];
const VIDEO_TYPE = ['wmv', 'avi', 'mp4', 'mpeg'];
const PDF = ['pdf'];
const IMAGE_LIMIT_MESSAGE = `图片大小不可超过 ${FILE_SIZE}M！`;
const PDF_LIMIT_MESSAGE = `pdf大小不可超过 ${FILE_SIZE}M！`;
const VIDEO_LIMIT_MESSAGE = `视频大小不可超过 ${VIDEO_SIZE}M！`;
</script>

<style>
.thumb {
  border: var(--border-width) dashed var(--upload-handle-border-color);
}
</style>
