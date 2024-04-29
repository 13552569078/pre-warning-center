<template>
  <!-- 搜索 -->
  <hl-group class="p-lg" style="background: #ffffff" align="items-top" dir="vertical" gap="var(--sm)" full="full-x">
    <hl-form class="w-full" :model="searchForm" inline gap="var(--xl)" item-gap="var(--sm)" :width="['', 'col']">
      <hl-form-item label="模板名称">
        <hl-input v-model="searchForm.templateName" class="static" placeholder="输入模板名称" :maxlength="20" clearable></hl-input>
      </hl-form-item>
      <hl-form-item label="创建/修改时间">
        <hl-date-picker v-model="searchForm.searchTime" :value-format="dateFormat" type="datetimerange" class="static" start-placeholder="选择开始时间" end-placeholder="选结束时间" style="width: 414px; height: 32px" range-separator="至"></hl-date-picker>
      </hl-form-item>
      <hl-form-item>
        <hl-group align="items-left items-middle" gap="var(--md)">
          <hl-button class="static" type="primary" @click="search">搜索</hl-button>
        </hl-group>
      </hl-form-item>
    </hl-form>
  </hl-group>
  <!-- opration -->
  <hl-panel align="items-left items-top" dir="vertical" style="--panel-header-height: 80px; --panel-bg-color: transparent" header-style="gap: 40px;" borderless padding="0px">
    <template #header>
      <div class="panel-title">
        <hl-group align="items-center" style="display: flex; align-items: center" gap="var(--xxs)">
          <hl-icon size="xs" class="static">
            <fill-Search />
          </hl-icon>
          <span class="title font-lg static m-l-xxs">查询结果</span>
          <span class="text-primary font-lg static">{{ total }}</span>
          <span class="title font-lg static">条数据</span></hl-group
        >
      </div>
      <div class="panel-header-right">
        <hl-group align="items-right items-middle" gap="var(--md)">
          <hl-button @click="downLoadTpl" icon-position="left" effect="light" type="primary" rational
            ><template #icon>
              <hl-icon>
                <TwoDownload></TwoDownload>
              </hl-icon> </template
            >下载word模板</hl-button
          >
          <hl-button @click="add" icon-position="left" type="primary" rational :disabled="!templateModel.templateTypeCode">
            <template #icon>
              <hl-icon>
                <TwoPlus></TwoPlus>
              </hl-icon> </template
            >新建模板</hl-button
          >
        </hl-group>
      </div>
    </template>
  </hl-panel>
  <!-- 列表-->
  <hl-row dir="vertical">
    <hl-scrollbar height="calc(100vh - 360px)">
      <hl-row layout="grid" count="count-2" gap="var(--lg)">
        <hl-col span="col" v-for="(item, index) in tableData" :key="index">
          <hl-group class="bg-content border solid bg-transparent static data-bg" align="items-top" dir="vertical" full="full-x">
            <hl-group class="p-y-lg p-x-xl w-full" align="items-middle" gap="var(--sm)" full="full-x">
              <hl-group align="items-left items-middle" class="w-full cursor-pointer" gap="var(--sm)" full="full-x" @click="showDetail(item)">
                <h5 class="text-title ellipsis">{{ item.templateName }}</h5>
              </hl-group>
              <hl-group align="items-left items-middle" class="static" gap="var(--lg)">
                <hl-group align="items-left items-middle" gap="var(--xxs)">
                  <hl-icon size="xxxs" class="static"> <TwoClock></TwoClock> </hl-icon><span class="text-secondary font-sm static">{{ item.updatedAt }}</span>
                </hl-group>
                <hl-group align="items-left items-middle" gap="var(--sm)">
                  <hl-button type="link" @click="edit(item)" no-fill style="--button-padding-x:0;--button-padding-y:0;">编辑</hl-button>
                  <hl-button type="link" @click="del(item)" :disabled="item.isRefer === 1" no-fill style="--button-padding-x:0;--button-padding-y:0;">删除</hl-button>
                  <hl-button type="link" @click="downLoad(item)" no-fill style="--button-padding-x:0;--button-padding-y:0;">下载</hl-button>
                </hl-group>
              </hl-group>
            </hl-group>
            <hl-group class="p-b-xl p-x-xl w-full" align="items-left items-top" gap="32px">
              <hl-group align="items-left items-middle" gap="var(--sm)">
                <hl-popover placement="bottom" :width="450" trigger="hover" class="popver-1">
                  <template #reference>
                    <hl-group class="p-x-xs bg-light radius-round cursor-pointer" style="padding-top: 3px; padding-bottom: 3px; width: 110px" align="items-left items-middle" gap="var(--xxs)">
                      <hl-icon size="sm" class="static text-secondary"> <TwoLayer></TwoLayer> </hl-icon>
                      <span class="text-secondary static">模板参数</span>
                      <hl-icon size="xxxs" class="static">
                        <FillArrowBottom2></FillArrowBottom2>
                      </hl-icon>
                    </hl-group>
                  </template>
                  <hl-scrollbar max-height="200px">
                    <hl-group gap="10px" wrap>
                      <template v-if="item.paramList.length">
                        <hl-button v-for="(itm, idx) in item.paramList" :key="idx">{{ itm.paramName }}</hl-button>
                      </template>
                      <span v-else>暂无配置</span>
                    </hl-group>
                  </hl-scrollbar>
                </hl-popover>
              </hl-group>
              <hl-group align="items-left items-middle" gap="var(--sm)">
                <hl-popover placement="bottom" :width="450" trigger="hover" class="popver-2">
                  <template #reference>
                    <hl-group class="p-x-xs bg-light radius-round cursor-pointer" style="padding-top: 3px; padding-bottom: 3px; width: 110px" align="items-left items-middle" gap="var(--xxs)">
                      <hl-icon size="sm" class="static">
                        <TwoPoint></TwoPoint>
                      </hl-icon>
                      <span class="text-secondary static">行政区划</span>
                      <hl-icon size="xxxs" class="static">
                        <FillArrowBottom2></FillArrowBottom2>
                      </hl-icon>
                    </hl-group>
                  </template>
                  <hl-scrollbar max-height="200px">
                    <hl-group gap="10px" wrap>
                      <template v-if="item.areaList.length">
                        <hl-button v-for="(itm, idx) in item.areaList" :key="idx">{{ itm.areaName }}</hl-button>
                      </template>
                      <span v-else>暂无配置</span>
                    </hl-group>
                  </hl-scrollbar>
                </hl-popover>
              </hl-group>
              <hl-group align="items-left items-middle" gap="var(--sm)">
                <hl-popover placement="bottom" :width="450" trigger="hover" class="popver-3">
                  <template #reference>
                    <hl-group class="p-x-xs bg-light radius-round cursor-pointer" style="padding-top: 3px; padding-bottom: 3px; width: 110px" align="items-left items-middle" gap="var(--xxs)">
                      <hl-icon size="sm" class="static text-secondary"> <TwoAlert></TwoAlert> </hl-icon>
                      <span class="text-secondary static">风险分类</span>
                      <hl-icon size="xxxs" class="static">
                        <FillArrowBottom2></FillArrowBottom2>
                      </hl-icon>
                    </hl-group>
                  </template>
                  <hl-scrollbar max-height="200px">
                    <hl-group gap="10px" wrap>
                      <template v-if="item.eventTypeList.length">
                        <hl-button v-for="(itm, idx) in item.eventTypeList" :key="idx">{{ itm.eventTypeName }}</hl-button>
                      </template>
                      <span v-else block class="text-center">暂无配置</span>
                    </hl-group>
                  </hl-scrollbar>
                </hl-popover>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-col>
      </hl-row>
    </hl-scrollbar>
    <!-- 分页 -->
    <hl-pagination :total="total" class="m-t-md" align="items-between" layout="sizes,total,slot,prev,pager,next,jumper" :current-page="pagination.currentPage" :page-size="pagination.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <div class="w-full"></div>
    </hl-pagination>
    <!-- 详情 -->
    <report-detail @close="detailVisiable = false" :template-id="templateId" v-if="detailVisiable"></report-detail>
  </hl-row>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted, watch, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { pick } from 'lodash-es';
import { HlMessageBox } from 'hongluan-ui';
import { dateFormat, HlMessageSuccess, downloadByUrl } from '@/common';
import { apiReportListObj } from '@/apis/modules/report-manage/report-tpl-manage/list/index';
import { IpostPageSpace } from '@/apis/modules/report-manage/report-tpl-manage/list/model';
import { ReportDetail } from './index';

const props = defineProps({
  templateModel: {
    type: Object as PropType<{ templateTypeCode: string; templateTypeId: string; templateTypeName: string }>,
    default: () => {
      return {};
    }
  }
});

const emit = defineEmits(['updated']);

const router = useRouter();

const searchForm = reactive({
  templateName: '',
  searchTime: ''
});
const total = ref(0);
const pagination = reactive({
  pageSize: 10,
  currentPage: 1
});
const tableData = ref<IpostPageSpace.List[]>([]);

const templateId = ref('');
const detailVisiable = ref(false);

watch(
  () => props.templateModel.templateTypeCode,
  (count, prevCount) => {
    search();
  }
);

const search = async() => {
  const params = {
    templateName: searchForm.templateName,
    startTime: Array.isArray(searchForm.searchTime) ? searchForm.searchTime[0] : '',
    endTime: Array.isArray(searchForm.searchTime) ? searchForm.searchTime[1] : '',
    pageSize: pagination.pageSize,
    currentPage: pagination.currentPage,
    templateTypeCode: props.templateModel.templateTypeCode
  };
  const { data } = await apiReportListObj.postPage(params);
  total.value = data.totalRow;
  tableData.value = data.list;
};
// 主操作
const downLoadTpl = async() => {
  await apiReportListObj.getGetImportTemplate();
};
const add = () => {
  router.push({
    name: 'reportManagementConfig',
    query: {
      action: 'add',
      ...pick(props.templateModel, 'templateTypeCode', 'templateTypeId', 'templateTypeName')
    }
  });
};
// 卡片操作
const showDetail = (row: IpostPageSpace.List) => {
  templateId.value = row.templateId;
  detailVisiable.value = true;
};
const edit = (row: IpostPageSpace.List) => {
  router.push({
    name: 'reportManagementConfig',
    query: {
      action: 'edit',
      ...pick(row, 'templateId')
    }
  });
};
const del = async(row: IpostPageSpace.List) => {
  await HlMessageBox.confirm(`您确认删除[${row.templateName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
    type: 'success'
  });
  await apiReportListObj.deleteT(row.templateId);
  HlMessageSuccess('删除成功');
  search();
  emit('updated');
};
const downLoad = async(row: IpostPageSpace.List) => {
  const { data } = await apiReportListObj.getGetTemplateFileInfo(row.templateFileId);
  downloadByUrl(data);
};
// 分页
const handleSizeChange = (val: number) => {
  pagination.pageSize = val;
  search();
};
const handleCurrentChange = (val: number) => {
  pagination.currentPage = val;
  search();
};

onMounted(() => {
  search();
});
</script>
<style lang="scss">
.data-bg {
  background: url('~@/assets/images/report/list-bg.svg') no-repeat;
  background-color: var(--bg-content);
  background-position: right -10% bottom 30%;
  background-size: 35% 150%;
}

.popver-1 {
  &:hover {
    * {
      color: #36a4ff !important;
    }
  }
}

.popver-2 {
  &:hover {
    * {
      color: #4cc09e !important;
    }
  }
}

.popver-3 {
  &:hover {
    * {
      color: #fa8b16 !important;
    }
  }
}
</style>
