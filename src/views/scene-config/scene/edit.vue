<template>
  <hl-panel style="height: 100%;" header-style="gap: 0px;" borderless padding="var(--lg)" header-class="p-lg" body-style="padding-right: 20px; padding-left: 20px; padding-top: 0;overflow-y: auto;height: calc(100% - 128px);" footer-class="items-left gap-md p-md bg-content p-l-lg second-panel-footer" class="data-bg">
    <template #header>
      <div class="panel-header-left">
        <hl-icon class="static" type="primary" size="md">
          <FillOrnamentTitle4></FillOrnamentTitle4>
        </hl-icon>
      </div>
      <div class="panel-title">
        <h4 class="text-title">专项类型配置</h4>
      </div>
      <div class="panel-header-right"></div>
    </template>
    <template #default>
      <hl-form class="static" gap="var(--lg)" item-gap="var(--lg2)" :label-position="['items-left', 'items-middle']" ref="formRef" :model="formData" :rules="formRules" style="width: 1092px">
        <hl-group gap="var(--lg2)">
          <hl-form-item class="w-full" label="专项类型名称" prop="sceneName">
            <hl-input class="static w-full" v-model.trim="formData.sceneName" maxlength="20" show-word-limit disabled></hl-input>
          </hl-form-item>
          <hl-form-item class="w-full" label="专项类型编码" prop="sceneCode">
            <hl-input class="static w-full" v-model.trim="formData.sceneCode" maxlength="20" show-word-limit disabled></hl-input>
          </hl-form-item>
        </hl-group>
        <hl-form-item class="w-full" label="风险分类" prop="eventTypeList">
          <hl-group class="p-lg bg-light radius-md w-full" align="items-left items-top" dir="vertical" gap="var(--sm)">
            <hl-group align="items-left items-top" gap="var(--sm)" wrap>
              <hl-group class="p-y-xs p-x-sm bg-content radius-lg box-shadow-sm" align="items-left items-middle" gap="var(--xs)" v-for="(item, index) in formData.eventTypeList" :key="index">
                <span class="static">{{ item.eventTypeName }}</span>
                <hl-icon size="xs" class="static text-regular cursor-pointer" @click="delRisk(index)">
                  <TwoClose></TwoClose>
                </hl-icon>
              </hl-group>
              <hl-group class="p-y-xs p-x-md radius-lg" align="items-center items-middle" gap="var(--xxs)" @click="eventVisiable = true">
                <hl-icon size="xs" class="static" type="primary"> <TwoPlus></TwoPlus> </hl-icon><span class="text-primary static cursor-pointer">增加</span>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-form-item>
        <hl-form-item class="w-full" label="监测主体和监测点" prop="sceneRegionList">
          <hl-group class="p-lg bg-light radius-md w-full" align="items-left items-top" dir="vertical" gap="var(--sm)">
            <hl-group align="items-left items-top" gap="var(--sm)" wrap>
              <hl-group class="p-y-xs p-x-sm bg-content radius-lg box-shadow-sm" align="items-left items-middle" gap="var(--xs)" v-for="(item, index) in subjectRegionTree" :key="item.regionTypeCode">
                <span class="static">{{ `${item.regionTypeName}（监测主体 ${item.regionListNumber}个 监测点 ${item.unitListNumber}个）` }}</span>
                <hl-icon size="xs" class="static text-regular cursor-pointer" @click="delSubject(item, index)">
                  <TwoClose></TwoClose>
                </hl-icon>
              </hl-group>
              <hl-group class="p-y-xs p-x-md radius-lg" align="items-center items-middle" gap="var(--xxs)" @click="subjectVisiable = true">
                <hl-icon size="xs" class="static" type="primary"> <TwoPlus></TwoPlus> </hl-icon><span class="text-primary static cursor-pointer">增加</span>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-form-item>
        <hl-form-item class="w-full" label="监测指标" prop="sceneTargetList">
          <hl-group class="p-lg bg-light radius-md w-full" align="items-left items-top" dir="vertical" gap="var(--sm)">
            <hl-group align="items-left items-top" gap="var(--sm)" wrap>
              <hl-group class="p-y-xs p-x-sm bg-content radius-lg box-shadow-sm" align="items-left items-middle" gap="var(--xs)" v-for="(item, index) in formData.sceneTargetList" :key="index">
                <span class="static">{{ item.targetTypeName }}</span>
                <hl-icon size="xs" class="static text-regular cursor-pointer" @click="delTarget(index)">
                  <TwoClose></TwoClose>
                </hl-icon>
              </hl-group>
              <hl-group class="p-y-xs p-x-md radius-lg" align="items-center items-middle" gap="var(--xxs)" @click="addTargert">
                <hl-icon size="xs" class="static" type="primary"> <TwoPlus></TwoPlus> </hl-icon><span class="text-primary static cursor-pointer">增加</span>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-form-item>
        <hl-form-item class="w-full" label="描述" prop="description">
          <hl-input native-type="textarea" placeholder="请输入描述信息" show-word-limit maxlength="500" block v-model="formData.description"></hl-input>
        </hl-form-item>
        <!-- <hl-form-item class="w-full" label="场景照片" prop="photoFile">
          <file-uploader v-model="formData.photoFile" accept=".jpg,.png,.jpeg" :limit="1" @on-success="uploadSuccess" />
        </hl-form-item>
        <hl-form-item class="w-full" label=" ">
          <hl-group dir="vertical">
            <div class="text-secondary m-t-xxs" style="width: 360px; height: 22px">1.请上传1个图片文件</div>
            <div class="text-secondary m-t-xxs" style="width: 360px; height: 22px">2.图片文件大小不超过20M，支持png或jpg或jpeg格式</div>
          </hl-group>
        </hl-form-item> -->
      </hl-form>
    </template>
    <template #footer>
      <hl-button type="primary" @click="confirm" style="width: 80px; text-align: center;"> 确定</hl-button>
      <hl-button class="static" @click="$router.go(-1)" style="width: 80px;">取消</hl-button>
    </template>
  </hl-panel>
  <!-- 风险分类 -->
  <event-multiple-dialog v-if="eventVisiable" @close="eventVisiable = false" @risk-changed="riskChange" v-model="formData.eventTypeList"></event-multiple-dialog>
  <!-- 监测主体 -->
  <region-monitor-unit-tree v-if="subjectVisiable" @close="subjectVisiable = false" @subject-changed="subjectChange" v-model="formData.sceneRegionList"></region-monitor-unit-tree>
  <add-indicators v-if="indicatorsVisiable" @cancel="indicatorsVisiable = false" @indicatorsOk="indicatorsOk" :checked-ids="checkedIndicatorsIds" :useSelected="true"></add-indicators>
</template>
<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { pick } from 'lodash-es';
import { isValidName, ruleRequiredMsg } from '@/common';
import { apiSceneObj } from '@/apis/modules/scene-config/scene';
import { regionMonitorUnitTree, EventMultipleDialog, FileUploader } from '@/components';
import AddIndicators from '@/views/monitoring-config/alarm-strategy-tpl/components/add-indicators.vue';
import { UploadUserFile } from '@/types';

const router = useRouter();
const route = useRoute();

const eventVisiable = ref(false);
const subjectVisiable = ref(false);
const indicatorsVisiable = ref(false);

const formRef = ref();
const formData = reactive({
  id: '',
  sceneName: '',
  sceneCode: '',
  description: '',
  eventTypeList: [] as { eventTypeName: string; systemCode: string }[],
  sceneRegionList: [] as any[],
  subjectRegionTree: [] as any[],
  sceneTargetList: [] as any[],
  photoFile: [] as UploadUserFile[]
});
const checkedIndicatorsIds = ref<string[]>([]);
const subjectRegionTree = computed(() => {
  const treeList: any = [];
  formData.subjectRegionTree.forEach(item => {
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
    treeNode.regionTypeCode = item.regionTypeCode;
    treeList.push(treeNode);
  });
  return treeList;
});
const formRules = {
  sceneName: [
    ruleRequiredMsg('场景名称'),
    { validator: isValidName, trigger: 'blur' },
    {
      max: 20,
      message: '长度不超过20个字符',
      trigger: ['change', 'blur']
    }
  ],
  eventTypeList: [{ required: true, message: '请选择风险分类', trigger: ['change'] }],
  sceneRegionList: [{ required: true, message: '请选择监测主体和监测点', trigger: ['change'] }],
  sceneTargetList: [{ required: true, message: '请选择监测指标', trigger: ['change'] }],
  // photoFile: [{ required: true, message: '请上传场景照片', trigger: ['blur', 'change'] }],
  description: [
    {
      max: 500,
      message: '长度不超过500个字符',
      trigger: ['change', 'blur']
    }
  ]
};

const validate = async () => {
  await formRef.value?.validate();
};
const confirm = async () => {
  await validate();
  const params = {
    ...pick(formData, 'id', 'sceneName', 'description'),
    // photoFileIds: [formData.photoFile[0].id],
    eventTypeCodeList: formData.eventTypeList.map(item => {
      return item.systemCode;
    }),
    sceneRegionList: formData.sceneRegionList,
    sceneTargetList: formData.sceneTargetList.map(item => {
      return {
        targetTypeCode: item.targetTypeCode,
        targetId: item.id
      };
    })
  };
  route.query.sceneId ? await apiSceneObj.postUpdate(params) : await apiSceneObj.add(params);
  // router.push({
  //   name: 'Scene'
  // });
  router.go(-1);
};
// 回显处理监测主体和监测点
const handleCceneRegionList = (data: any) => {
  const result:any = [];
  data.forEach((item: any) => {
    if (item.regionList && item.regionList.length) {
      item.regionList.forEach((item2: any) => {
        if (item2.unitList && item2.unitList.length) {
          item2.unitList.forEach((item3: any) => {
            result.push({
              'regionTypeCode': item.regionTypeCode,
              regionName: item2.regionName,
              'regionId': item2.regionId,
              'unitId': item3.unitId,
              unitName: item3.unitName
            });
          });
        }
      });
    }
  });
  return result;
};
const getDetail = async () => {
  const { data } = await apiSceneObj.getScene(route.query.sceneId as string);
  const detail = {
    ...pick(data, 'id', 'sceneName', 'description', 'sceneCode'),
    eventTypeList: data.eventTypeList.map(item => {
      return {
        eventTypeName: item.name,
        systemCode: item.code
      };
    }),
    // photoFile: data.photoFile
    //   ? data.photoFile.map(item => {
    //     return {
    //       ...item,
    //       id: item.id,
    //       name: item.originalName,
    //       url: item.url,
    //       attachmentType: item.type
    //     };
    //   })
    //   : [],
    sceneRegionList: handleCceneRegionList(data.regionList),
    subjectRegionTree: data.regionList,
    sceneTargetList: data.targetList.map((item: { targetId: any; targetName: any; }) => {
      return {
        ...item,
        id: item.targetId,
        targetTypeName: item.targetName
      };
    })
  };
  Object.assign(formData, detail);
};
// 风险分类edit
const riskChange = (data: any[]) => {
  formData.eventTypeList = data;
  formRef.value?.validateField('eventTypeList');
};
const delRisk = (index: number) => {
  formData.eventTypeList.splice(index, 1);
  formRef.value?.validateField('eventTypeList');
};
// 监测主体edit
const subjectChange = (data: any[], tree: any) => {
  formData.sceneRegionList = data;
  formData.subjectRegionTree = tree;
  formRef.value?.validateField('sceneRegionList');
};
const delSubject = (item: any, index: number) => {
  // subjectRegionTree formData.subjectRegionTree
  // formData.sceneRegionList.splice(index, 1); // 循环删除

  formData.sceneRegionList = formData.sceneRegionList.filter(item2 => item2.regionTypeCode !== item.regionTypeCode);
  formData.subjectRegionTree.splice(index, 1);
  formRef.value?.validateField('sceneRegionList');
};
const uploadSuccess = () => {
  formRef.value?.validateField('photoFile');
};

const addTargert = () => {
  checkedIndicatorsIds.value = formData.sceneTargetList.map(item => item.id);
  indicatorsVisiable.value = true;
};

const delTarget = (index: number) => {
  formData.sceneTargetList.splice(index, 1);
  formRef.value?.validateField('sceneTargetList');
};
// 监测指标edit
const indicatorsOk = (data: any[]) => {
  formData.sceneTargetList = [...data];
  formRef.value?.validateField('sceneTargetList');
  indicatorsVisiable.value = false;
};
// init 编辑 详情
route.query.sceneId && getDetail();
</script>

<style lang="scss" scoped>
.data-bg {
  background: url('~@/assets/images/wholeAnalysis/top-bg.svg') no-repeat;
  background-color: var(--bg-content);
  background-position: right -10% bottom -2%;
  background-size: 36% 166%;
  height: calc(100vh - (var(--layout-header-height) + var(--layout-sub-header-height) + var(--layout-footer-height)) - var(--layout-out-padding) * 2);
}
:deep(.second-panel-footer) {
  width: 100%;
  box-shadow: 0px -2px 7px 0px rgba(0,0,0,0.06);
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
