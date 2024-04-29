<template>
  <hl-dialog
    v-model="dialogVisible"
    :title="`${props.title}信息导入`"
    :width="uploadStatus === UPLOAD_WITH_ERROR ? '916px' : '456px'"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    @close="handleClose">
    <template v-if="uploadStatus === BEFORE_UPLOAD">
      <hl-group dir="vertical" full class="w-full" gap="var(--lg)">
        <hl-group dir="vertical" full class="w-full" gap="var(--md)">
          <h5>第一步：{{ props.firstStepText }}</h5>
          <hl-group>
            <slot></slot>
          </hl-group>
        </hl-group>

        <hl-group dir="vertical" class="w-full" gap="var(--sm)" full>
          <h5>第二步：下载{{ props.title }}信息导入模板</h5>
          <hl-group
            class="p-sm bg-light border solid border-regular w-full cursor-pointer" align="items-middle"
            gap="var(--sm)"
            full
            @click="handleDownloadTemplate">
            <hl-icon size="xxl" class="static">
              <FileXls></FileXls>
            </hl-icon>
            <hl-group align="items-between items-middle" class="w-full" gap="var(--xs)"><span class="text-regular font-bold">{{$props.title}}模板.xls</span>
              <hl-group align="items-left items-top" gap="var(--xxs)"></hl-group>
              <hl-button type="primary" no-fill>下载</hl-button>
            </hl-group>
          </hl-group>
        </hl-group>

        <hl-group dir="vertical" class="w-full" :class="canUpload ? 'm-b-xl' : ''" gap="var(--sm)" full>
          <h5>第三步：上传按照导入模板填写的excel文件</h5>
          <div class="text-secondary" style="width: 360px; height: 22px;">请选择 xls、xlsx格式的文档，大小不超过50M</div>
          <hl-upload
            ref="upload"
            list-type="text"
            drag
            class="w-full"
            style="height: 200px !important;"
            :headers="headers"
            :action="`${API_DOMAIN}${API_PREFIX}${$props.action}`"
            :on-success="handleSuccess"
            :on-error="handleError"
            :auto-upload="false"
            :accept="accept"
            :limit="limit"
            :on-exceed="handleExceed"
            :on-change="onChange"
            :before-upload="handleBeforeUpload"
            >
            <hl-group class="radius-md" align="items-center items-middle" dir="vertical" gap="var(--sm)">
              <hl-icon size="lg" class="static" type="primary">
                <FillUpload></FillUpload>
              </hl-icon><span style="color: #4B4B4B;" class="text-center">将文件拖放到此处，或点击上传</span>
            </hl-group>
          </hl-upload>
        </hl-group>
      </hl-group>
    </template>

    <template v-if="uploadStatus === UPLOADING">
      <hl-group align="items-middle items-center" full style="min-height: 230px;">
        <hl-group dir="vertical" align="items-middle items-center">
          <hl-spinner class="lg" color="var(--primary)"/>
          <span class="m-t-md">数据正在导入中，请耐心等待...</span>
        </hl-group>
      </hl-group>
    </template>

    <template v-if="uploadStatus === UPLOAD_SUCCESS">
      <hl-group align="items-middle items-center" full style="min-height: 230px;">
        <hl-group dir="vertical" align="items-middle items-center">
          <hl-icon type="success" width="56px" height="56px"><TwoCircleCheck /></hl-icon>
          <span class="m-t-md">导入成功</span>
        </hl-group>
      </hl-group>
    </template>

    <template v-if="uploadStatus === ANALASIS_ERROR">
      <hl-group align="items-middle items-center" full style="min-height: 230px;">
        <hl-group dir="vertical" align="items-middle items-center">
          <hl-icon type="danger" width="56px" height="56px"><TwoCircleError /></hl-icon>
          <span class="m-t-md">文件解析异常！请下载模板重新导入</span>
        </hl-group>
      </hl-group>
    </template>

    <template v-if="uploadStatus === UPLOAD_FAIL">
      <hl-group align="items-middle items-center" full style="min-height: 230px;">
        <hl-group dir="vertical" align="items-middle items-center">
          <hl-icon type="danger" width="56px" height="56px"><TwoCircleError /></hl-icon>
          <span class="m-t-md">导入文件出错！</span>
        </hl-group>
      </hl-group>
    </template>

    <template v-if="uploadStatus === UPLOAD_WITH_ERROR">
      <hl-group full style="min-height: 230px;">
        <hl-group dir="vertical">
          <hl-group align="items-middle">
            <hl-icon class="m-r-sm" type="danger" width="46px" height="46px"><TwoCircleError /></hl-icon>
            <h3>导入失败</h3>
          </hl-group>
          <span class="m-t-md m-b-md">以下信息存在错误，请修改后再次导入：</span>
          <hl-group class="w-full" style="height: 300px; overflow: auto; max-width: 860px;">
            <hl-simple-table :cols="cols" :data="importErrorRowsRegroup" border="bordered" padding="0" fixed-header>
              <template #firstCol>
                <span class="m-l-md">#</span>
              </template>
              <template #tableIndex="{ rowIndex }">
                <span class="p-l-md">{{ rowIndex + 1 }}</span>
              </template>
              <template #errorMessage="{ row }">
                <group dir="vertical" full>
                  <div v-for="(item, index) in row.msg.split(';').filter((m:string) => m !== '')" class="text-danger" :key="index">- {{ item }}；</div>
                </group>
              </template>
            </hl-simple-table>
          </hl-group>
        </hl-group>
      </hl-group>
    </template>

    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="handleClose" :disabled="isUploading">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" :disabled="isUploading || !canUpload || !$props.isFirstStepFinished" @click="handleUpload">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>

<script lang='ts' setup>
import { ref, computed, PropType } from 'vue';
import { HlMessage } from 'hongluan-ui';
import { GlobalAPI } from '@/common';
import userAuth from '@/common/user-auth';

const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

const props = defineProps({
  title: {
    type: String,
    default: '设备'
  },
  firstStepText: {
    type: String,
    default: ''
  },
  action: {
    type: String,
    default: ''
  },
  errorCols: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  errorKey: {
    type: String,
    default: 'alarmInfo'
  },
  limit: {
    type: Number,
    default: 1
  },
  maxSize: {
    type: Number,
    default: 50
  },
  isFirstStepFinished: {
    type: Boolean,
    default: false
  }
});

const BEFORE_UPLOAD = Symbol('before_upload');
const UPLOADING = Symbol('uploading');
const UPLOAD_FAIL = Symbol('fail');
const UPLOAD_SUCCESS = Symbol('success');
const UPLOAD_WITH_ERROR = Symbol('error');
const ANALASIS_ERROR = Symbol('analysisError');

const emit = defineEmits(['close', 'success', 'downLoad']);

const headers = {
  authorization: userAuth.getToken()
};

const formRef = ref();
const dialogVisible = ref(true);
const upload = ref();
const uploadStatus = ref<symbol>(BEFORE_UPLOAD);

const canUpload = ref(false);

const cols = ref(props.errorCols);

const accept = '.xls,.xlsx';

const onChange = (file: any) => {
  const acceptFormats = 'ms-excel|spreadsheetml.sheet';
  const reg = new RegExp(acceptFormats);
  if (!reg.test(file.raw.type)) {
    HlMessage.warning(
      `仅可上传 ${accept} 格式的文件`
    );
    upload.value.clearFiles();
    canUpload.value = false;
    return false;
  } else {
    canUpload.value = true;
  }
};

const isUploading = computed(() => {
  return uploadStatus.value === UPLOADING;
});
const importErrorRows = ref();
const importErrorRowsRegroup = computed(() => {
  if (importErrorRows.value && importErrorRows.value.length) {
    return importErrorRows.value.map((item:any) => {
      return {
        ...item[props.errorKey],
        msg: item.msg
      };
    });
  }
  return [];
});

const handleDownloadTemplate = () => {
  emit('downLoad');
};

const handleClose = () => {
  emit('close');
  if (uploadStatus.value === UPLOAD_SUCCESS || uploadStatus.value === UPLOAD_WITH_ERROR) {
    emit('success');
  }
};

const handleUpload = () => {
  if (uploadStatus.value === BEFORE_UPLOAD) {
    upload.value.submit();
  } else {
    handleClose();
  }
};
const handleSuccess = (res: any) => {
  setTimeout(() => {
    if (res.code === '500') {
      handleError();
      return false;
    }
    if (res.code === '408067') {
      uploadStatus.value = ANALASIS_ERROR;
      // HlMessage.error(res.desc);
      return false;
    }
    if (!res.data.length) {
      uploadStatus.value = UPLOAD_SUCCESS;
    } else {
      importErrorRows.value = res.data;
      uploadStatus.value = UPLOAD_WITH_ERROR;
    }
  }, 1500);
};
const handleError = () => {
  console.log('error');
  uploadStatus.value = UPLOAD_FAIL;
  HlMessage.error('上传失败，请重试');
};

const handleBeforeUpload = (file: any) => {
  if (!props.isFirstStepFinished) {
    formRef.value.validate();
    return false;
  }
  // 限制大小
  if (file.size > props.maxSize * 1024 * 1024) {
    HlMessage.warning(
      `文件大小不可超过 ${props.maxSize}M！`
    );
    canUpload.value = false;
    return false;
  } else {
    uploadStatus.value = UPLOADING;
    return true;
  }
};
// 限制文件
const handleExceed = () => {
  HlMessage.warning(
    `当前限制选择 ${props.limit} 个文件`
  );
};

</script>
