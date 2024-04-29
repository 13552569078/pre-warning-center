<template>
  <hl-panel header-style="gap: 0px;" borderless padding="var(--lg)" header-class="p-lg" body-class="p-y-lg" body-style="padding-right: 40px; padding-left: 40px;" footer-class="items-left gap-md p-lg" class="data-bg h-full" @close="$emit('close')" full-body>
    <template #header>
      <div class="panel-header-left">
        <hl-icon class="static" type="primary" size="md">
          <FillOrnamentTitle4></FillOrnamentTitle4>
        </hl-icon>
      </div>
      <div class="panel-title">
        <h5 class="text-title">模板信息</h5>
      </div>
      <div class="panel-header-right"></div>
    </template>
    <template #default>
      <hl-form ref="formRef" :model="formData" :rules="rules" class="static" gap="var(--xl)" style="width: 900px" :width="['120px', 'col']">
        <hl-form-item class="w-full" label="模板名称" prop="templateName">
          <hl-input class="static" v-model="formData.templateName" placeholder="请输入模板名称" style="min-width: 400px" maxlength="20" show-word-limit></hl-input>
        </hl-form-item>
        <hl-form-item class="w-full" label="模板分组"
          ><span class="font-bold static">{{ formData.templateTypeName }}</span>
        </hl-form-item>
        <hl-form-item class="w-full" label="上传模板">
          <hl-upload list-type="text" class="static" :action="fileServer" :accept="accept" :headers="headers" :on-success="handleSuccess" :before-upload="handleBeforeUpload" :on-exceed="handleExceed" :limit="1" :file-list="fileList">
            <hl-button icon-position="left" type="primary" rational
              ><template #icon>
                <hl-icon>
                  <FillUpload></FillUpload>
                </hl-icon> </template
              >上传文件</hl-button
            >
            <template #tip>
              <hl-group class="p-t-sm w-full" align="items-left items-top" dir="vertical" full="full-x">
                <div class="text-secondary">只能上传 docx 文件格式，且不超过 20MB，最多上传1个</div>
              </hl-group>
            </template>
          </hl-upload>
        </hl-form-item>
        <hl-form-item class="w-full" label="模板参数">
          <hl-group class="p-lg bg-light radius-md w-full" align="items-left items-top" dir="vertical" gap="var(--sm)">
            <hl-group align="items-left items-top" gap="var(--sm)" wrap>
              <hl-group class="p-y-xs p-x-sm bg-content radius-lg box-shadow-sm" align="items-left items-middle" gap="var(--xs)" v-for="(item, index) in formData.paramList" :key="index">
                <span class="static">{{ item.paramName }}</span>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-form-item>
        <hl-form-item class="w-full" label="行政区划">
          <hl-group class="p-lg bg-light radius-md w-full" align="items-left items-top" dir="vertical" gap="var(--sm)">
            <hl-group align="items-left items-top" gap="var(--sm)" wrap>
              <hl-group class="p-y-xs p-x-sm bg-content radius-lg box-shadow-sm" align="items-left items-middle" gap="var(--xs)" v-for="(item, index) in formData.areaList" :key="index">
                <span class="static">{{ item.areaName }}</span>
                <hl-icon size="xs" class="static text-regular" @click="delArea(index)">
                  <TwoClose></TwoClose>
                </hl-icon>
              </hl-group>
              <hl-group class="p-y-xs p-x-md radius-lg" align="items-center items-middle" gap="var(--xxs)" @click="areaVisiable = true">
                <hl-icon size="xs" class="static" type="primary"> <TwoPlus></TwoPlus> </hl-icon><span class="text-primary static">增加</span>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-form-item>
        <hl-form-item class="w-full" label="风险分类">
          <hl-group class="p-lg bg-light radius-md w-full" align="items-left items-top" dir="vertical" gap="var(--sm)">
            <hl-group align="items-left items-top" gap="var(--sm)" wrap>
              <hl-group class="p-y-xs p-x-sm bg-content radius-lg box-shadow-sm" align="items-left items-middle" gap="var(--xs)" v-for="(item, index) in formData.eventTypeList" :key="index">
                <span class="static">{{ item.eventTypeName }}</span>
                <hl-icon size="xs" class="static text-regular" @click="delRisk(index)">
                  <TwoClose></TwoClose>
                </hl-icon>
              </hl-group>
              <hl-group class="p-y-xs p-x-md radius-lg" align="items-center items-middle" gap="var(--xxs)" @click="eventVisiable = true">
                <hl-icon size="xs" class="static" type="primary"> <TwoPlus></TwoPlus> </hl-icon><span class="text-primary static">增加</span>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-form-item>
        <hl-form-item class="w-full" label="描述">
          <hl-input native-type="textarea" class="static" placeholder="请输入描述信息" show-word-limit maxlength="200" style="min-width: 400px" v-model="formData.templateDesc"></hl-input>
        </hl-form-item>
      </hl-form>
    </template>
    <template #footer>
      <hl-button class="static" type="primary" :disabled="disabled" @click="ok">{{ formData.templateId ? '保存' : '确定' }}</hl-button>
      <hl-button class="static" @click="$router.go(-1)">取消</hl-button>
    </template>
  </hl-panel>
  <!-- 错误信息 -->
  <hl-dialog :model-value="dialogVisible" class="md-dialog" width="600px" title="以下参数未定义，请修改重新导入" @close="dialogVisible = false" :close-on-click-modal="false" stripe border="bordered">
    <hl-simple-table table-fixed :cols="cols" :data="tableData">
      <template #tableIndex="{ rowIndex }">
        <span>{{ rowIndex + 1 }}</span>
      </template>
    </hl-simple-table>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="dialogVisible = false">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="dialogVisible = false">确定</hl-button>
      </span>
    </template>
  </hl-dialog>
  <area-transfer v-if="areaVisiable" @close="areaVisiable = false" @area-changed="areaChanged" v-model="formData.areaList"></area-transfer>
  <event-multiple-dialog v-if="eventVisiable" @close="eventVisiable = false" @risk-changed="riskChange" v-model="formData.eventTypeList"></event-multiple-dialog>
</template>
<script lang="ts" setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Indexable } from 'fx-front-utils';
import { HlMessage } from 'hongluan-ui';
import { useRouter } from 'vue-router';
import { GlobalAPI } from '@/common/global-api';
import { isValidName } from '@/common';
import { AreaTransfer, EventMultipleDialog } from '@/components';
import userAuth from '@/common/user-auth';
import { apiReportListObj } from '@/apis/modules/report-manage/report-tpl-manage/list/index';
import { IgetGetParamsFromTemplateFileSpace } from '@/apis/modules/report-manage/report-tpl-manage/list/model';

const router = useRouter();

const fileServer = GlobalAPI.config.FILE_SERVER;
const accept = ref('.doc,.docx');
const headers = {
  authorization: userAuth.getToken()
};

const route = useRoute();

const formRef = ref();
const fileList = ref<{ name: string; id: string; url: string }[]>([]); // 编辑回显默认文件

const action = computed(() => route.query.action);
const templateTypeCode = computed(() => route.query.templateTypeCode);
const templateTypeName = computed(() => route.query.templateTypeName);
const templateId = computed(() => route.query.templateId);

const dialogVisible = ref(false);
const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex'
  },
  { title: '参数名称', prop: 'paramName' }
]);
const tableData = ref<IgetGetParamsFromTemplateFileSpace.Data[]>([]);

const disabled = ref(true);

const areaVisiable = ref(false);
const eventVisiable = ref(false);

const formData = reactive({
  templateId: '', // 模板id
  templateName: '', // 模板name
  templateTypeCode: templateTypeCode.value as string, // 分组code
  templateTypeName: templateTypeName.value, // 分组name
  templateFileId: '', // 文件id
  paramList: [] as any[], // 参数id
  areaList: [] as any[], // 行政区划
  eventTypeList: [] as any[], // 风险分类
  templateDesc: '' // 描述
});

// 保存
const ok = async() => {
  await formRef.value?.validate();
  const params = {
    ...formData,
    templateAreaCodes: formData.areaList
      .map(item => {
        return item.areaCode;
      })
      .join(','),
    templateEventTypeCodes: formData.eventTypeList
      .map(item => {
        return item.systemCode;
      })
      .join(','),
    paramIds: formData.paramList.map(item => {
      return item.paramId;
    })
  };
  if (!formData.templateId) await apiReportListObj.add(params); // 新增模板
  if (formData.templateId) await apiReportListObj.postUpdate(params); // 编辑模板
  router.push({
    name: 'reportManagementTpl'
  });
};
// 风险分类
const riskChange = (data: any[]) => {
  formData.eventTypeList = data;
};
const delRisk = (index: number) => {
  formData.eventTypeList.splice(index, 1);
};
// 区域
const areaChanged = (data: any[]) => {
  formData.areaList = data;
};
const delArea = (index: number) => {
  formData.areaList.splice(index, 1);
};
// 上传模板
const handleSuccess = async(res: IsuccessUpload, file: any, list: UploadUserFile[]) => {
  const { data: paramsData } = await apiReportListObj.getGetParamsFromTemplateFile(res.data.url);
  tableData.value = [];
  tableData.value = paramsData.filter((item: IgetGetParamsFromTemplateFileSpace.Data) => {
    return item.isAvailable === 0;
  });
  formData.paramList = paramsData.filter((item: IgetGetParamsFromTemplateFileSpace.Data) => {
    return item.isAvailable === 1;
  });
  if (tableData.value.length) {
    // 错误信息回显
    dialogVisible.value = true;
    // 禁止上传
    disabled.value = true;
  } else {
    // 无未定义参数 才可保存
    disabled.value = false;
  }
  formData.templateFileId = res.data.id;
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
  if (file.size > 20 * 1024 * 1024) {
    HlMessage.warning('最大上传20M');
    return false;
  }
};
const handleExceed = () => {
  HlMessage.warning('限制上传1个文件');
};

// 模板详情
const getDetail = async() => {
  const { data } = await apiReportListObj.getDetail(templateId.value as string);
  Object.assign(formData, data);
  // 赋值文件id
  formData.templateFileId = data.templateFileInfo.templateFileId;
  formData.eventTypeList = data.eventTypeList.map(item => {
    return {
      eventTypeName: item.eventTypeName,
      systemCode: item.eventTypeSystemCode
    };
  });
  // 编辑默认开始保存
  disabled.value = false;
  // 回显文件
  fileList.value = [
    {
      name: data.templateFileInfo.originalName,
      id: data.templateFileInfo.templateFileId,
      url: data.templateFileInfo.url
    }
  ];
};

onMounted(() => {
  action.value === 'edit' && templateId.value && getDetail();
});

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

const rules = {
  templateName: [
    { required: true, message: '请输入模板名称', trigger: ['change', 'blur'] },
    { validator: isValidName, trigger: 'blur' }
  ]
};
</script>
<style lang="scss">
.data-bg {
  background: url('~@/assets/images/wholeAnalysis/top-bg.svg') no-repeat;
  background-color: var(--bg-content);
  background-position: right -10% bottom -2%;
  background-size: 36% 166%;
}
</style>
