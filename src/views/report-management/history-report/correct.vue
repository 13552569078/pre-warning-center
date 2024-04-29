  <template>
  <!-- 修正报告 -->
  <hl-dialog model-value="true" class="md-dialog" width="700px" :title="`${$props.action==='edit'?'修正报告':'报告详情'}`" @close="$emit('close')"
    :close-on-click-modal="false">
    <hl-form ref="formRef" :label-position="['items-left', 'items-middle']">
      <hl-row layout="grid" class="w-full" count="count-1" gap="var(--lg)">
        <hl-col span="col">
          <hl-group align="items-left items-top" class="w-full" dir="vertical" gap="var(--xxs)"><span
              class="text-secondary static">报告名称</span><span
              class="font-lg font-bold static">{{ detail?.reportName }}</span></hl-group>
        </hl-col>
        <hl-col span="col">
          <hl-group align="items-left items-top" class="w-full" dir="vertical" gap="var(--xxs)"><span
              class="text-secondary static">模板名称</span><span class="font-lg font-bold static">{{ detail?.templateName }}</span></hl-group>
        </hl-col>
        <hl-col span="col">
          <hl-group align="items-left items-top" class="w-full" dir="vertical" gap="var(--xxs)"><span
              class="text-secondary static">模板分组</span><span class="font-lg font-bold static">{{ detail?.templateGroupName }}</span></hl-group>
        </hl-col>
        <hl-col span="col">
          <hl-group align="items-left items-top" class="w-full" dir="vertical" gap="var(--xxs)"><span
              class="text-secondary static">任务类型</span><span class="font-lg font-bold static">{{ detail?.taskTypeName }}</span></hl-group>
        </hl-col>
        <hl-col span="col">
          <hl-group align="items-left items-top" class="w-full" dir="vertical" gap="var(--xxs)" full="full-x"><span
              class="text-secondary static">生成时间</span>
            <div class="font-lg font-bold">{{ detail?.createAt }}</div>
          </hl-group>
        </hl-col>
        <hl-col span="col">
          <hl-group align="items-left items-top" class="w-full" dir="vertical" gap="var(--xxs)"><span
              class="text-secondary static">原始报告</span>
            <hl-group class="p-y-xxs" align="items-left items-middle" gap="var(--xxs)" @click="downLoad">
              <hl-icon class="static" size="md">
                <FileDoc></FileDoc>
              </hl-icon><span class="text-link font-bold static">{{ detail?.templateFileVO?.originalName }}</span>
            </hl-group>
          </hl-group>
        </hl-col>
        <hl-col span="col" v-if="$props.action==='edit'">
          <hl-upload list-type="text" class="static" :action="fileServer" :accept="accept" :headers="headers"
            :on-success="handleSuccess" :before-upload="handleBeforeUpload" :on-exceed="handleExceed" :limit="1"
            :on-remove="handleRemove">
            <hl-button icon-position="left" type="primary" rational><template #icon>
                <hl-icon>
                  <FillUpload></FillUpload>
                </hl-icon>
              </template>上传文件</hl-button>
            <template #tip>
              <hl-group class="p-t-sm w-full" align="items-left items-top" dir="vertical" full="full-x">
                <div class="text-secondary">只能上传 docx，doc 文件格式，且不超过 20MB，最多上传1个</div>
              </hl-group>
            </template>
          </hl-upload>
        </hl-col>
      </hl-row>
    </hl-form>
    <template #footer>
            <span class="dialog-footer">
                <hl-button @click="$emit('close')">取 消</hl-button>
                <hl-button type="primary" class="m-l-md" @click="ok">确定</hl-button>
            </span>
        </template>
  </hl-dialog>
  </template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Indexable } from 'fx-front-utils';
import { HlMessage } from 'hongluan-ui';
import { GlobalAPI } from '@/common/global-api';
import userAuth from '@/common/user-auth';
import { downloadByUrl } from '@/common';
import { apiHistoryReportObj } from '@/apis/modules/report-manage/history/index';
import { IgetFindReportHisDetailSpace } from '@/apis/modules/report-manage/history/model';

const props = defineProps({
  reportId: {
    type: String,
    default: ''
  },
  action: {
    type: String,
    default: 'edit'
  },
});

// 上传header 仅允许上传doc
const fileServer = GlobalAPI.config.FILE_SERVER;
const accept = ref('.doc,.docx');
const headers = {
  authorization: userAuth.getToken()
};

const emit = defineEmits(['close', 'correctOk']);

const detail = ref<IgetFindReportHisDetailSpace.Data>();
const reportFileId = ref('');

// 上传模板
const handleSuccess = async(res: IsuccessUpload) => {
  reportFileId.value = res.data.id;
};
// 删除上传
const handleRemove = () => {
  reportFileId.value = '';
};
const handleBeforeUpload = (file: any) => {
  const formats = accept.value.replace(/\./g, '').split(',');
  const upperClassFormats = formats.map(item => item.toUpperCase());
  const acceptFormats = formats.concat(upperClassFormats).join('|');
  const reg = new RegExp(acceptFormats);
  if (!reg.test(file.name)) {
    HlMessage.warning(`仅可上传 ${accept.value} 格式的文件`);
    return false;
  }
  // 限制大小
  if (file.size > 20 * 1024 * 1024) {
    HlMessage.warning(
      '最大上传20M'
    );
    return false;
  }
};
const handleExceed = () => {
  HlMessage.warning(
    '限制上传1个文件'
  );
};

const getDetail = async() => {
  const { data } = await apiHistoryReportObj.getFindReportHisDetail(props.reportId as string);
  detail.value = data;
};
const ok = async() => {
  // 修改文件id存在 则编辑 反之关闭
  if (reportFileId.value) {
    await apiHistoryReportObj.getCorrectReportFile(props.reportId as string, reportFileId.value);
    emit('correctOk');
  } else {
    emit('close');
  }
};
const downLoad = () => {
  downloadByUrl(detail.value!.templateFileVO);
};

getDetail();

interface UploadUserFile {
  name: string;
  url: string;
  id: string;
  attachmentType: string;
  percentage: number;
  response?: IsuccessUpload;
}

interface IsuccessUpload {
  data: Indexable<any>;
}
</script>
