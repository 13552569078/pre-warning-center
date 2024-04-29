<template>
    <hl-dialog :model-value="true" class="md-dialog" width="650px" title="报告任务详情" @close="$emit('close')"
        :close-on-click-modal="false" stripe>
        <hl-row layout="grid" class="w-full" count="count-2" gap="var(--lg)">
            <hl-col span="col col-span-2">
                <hl-group align="items-left items-top" class="static" dir="vertical" gap="var(--xxs)"><span
                        class="text-secondary static">任务名称</span><span class="font-bold static">{{ detail?.taskName
                        }}</span></hl-group>
            </hl-col>
            <hl-col span="col">
                <hl-group align="items-left items-top" class="static" dir="vertical" gap="var(--xxs)"><span
                        class="text-secondary static">模板分组</span><span class="font-bold static">{{
                                detailTpl?.templateTypeName
                        }}</span></hl-group>
            </hl-col>
            <hl-col span="col">
                <hl-group align="items-left items-top" class="static" dir="vertical" gap="var(--xxs)"><span
                        class="text-secondary static">模板名称</span><span class="font-bold static">{{
                                detailTpl?.templateName
                        }}</span></hl-group>
            </hl-col>
            <hl-col span="col col-span-2">
                <hl-group align="items-top" class="static" dir="vertical" gap="var(--xxs)" full="full-x"><span
                        class="text-secondary static">上传模板名称</span>
                    <hl-group class="p-y-xxs w-full" align="items-left items-middle" gap="var(--xxs)" full="full-x">
                        <hl-icon class="static" size="md">
                            <FileDoc></FileDoc>
                        </hl-icon>
                        <div class="text-link font-bold" @click="downLoad">{{ detailTpl?.templateFileInfo.originalName
                        }}</div>
                    </hl-group>
                </hl-group>
            </hl-col>
            <hl-col span="col col-span-2">
                <hl-group align="items-left items-top" class="static" dir="vertical" gap="var(--xxs)"><span
                        class="text-secondary static">任务类型</span><span class="font-bold static">{{ detail?.taskTypeName
                        }}</span></hl-group>
            </hl-col>
            <!-- 周期性任务 -->
            <template v-if="detail?.taskType === 'CYCLE_TASK'">
                <hl-col span="col col-span-2">
                    <hl-group align="items-left items-top" class="static" dir="vertical" gap="var(--xxs)"><span
                            class="text-secondary static">生成报告周期</span><span class="font-bold static">{{
                                    detail?.taskPeriodName
                            }}</span></hl-group>
                </hl-col>
                <hl-col span="col col-span-2">
                    <hl-group align="items-left items-top" class="static" dir="vertical" gap="var(--xxs)"><span
                            class="text-secondary static">日期特征</span><span class="font-bold static">{{
                                    detail?.dateFeaturesName
                            }}</span></hl-group>
                </hl-col>
                <hl-col span="col col-span-2">
                    <hl-group align="items-left items-top" class="static" dir="vertical" gap="var(--xxs)"><span
                            class="text-secondary static">生成时间</span><span class="font-bold static">{{
                                    detail?.reportTime
                            }}</span></hl-group>
                </hl-col>
            </template>
            <template v-if="detail?.taskType === 'DISPOSABLE_TASK'">
                <!-- 一次性任务 -->
                <hl-col span="col col-span-2">
                    <hl-group align="items-left items-top" class="static" dir="vertical" gap="var(--xxs)"><span
                            class="text-secondary static">生成报告周期</span><span class="font-bold static">{{
                                    detail?.reportStartDate
                            }} 至 {{ detail?.reportEndDate
}} </span></hl-group>
                </hl-col>
                <hl-col span="col col-span-2">
                    <hl-group align="items-left items-top" class="static" dir="vertical" gap="var(--xxs)">
                        <span class="text-secondary static">生成时间</span>
                        <span class="font-bold static">{{ detail?.reportDate }}</span>
                    </hl-group>
                </hl-col>
            </template>
        </hl-row>
        <template #footer>
            <span class="dialog-footer">
                <hl-button @click="$emit('close')">取 消</hl-button>
                <hl-button type="primary" class="m-l-md" @click="$emit('close')">确定</hl-button>
            </span>
        </template>
    </hl-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { downloadByUrl } from '@/common';
import { apiReportTsakObj } from '@/apis/modules/report-manage/task/index';
import { IgetFindReportTaskSpace } from '@/apis/modules/report-manage/task/model';
import { apiReportListObj } from '@/apis/modules/report-manage/report-tpl-manage/list/index';
import { IgetDetailSpace } from '@/apis/modules/report-manage/report-tpl-manage/list/model';

const props = defineProps({
  taskId: {
    type: String,
    default: ''
  },
  templateId: {
    type: String,
    default: ''
  },
});

const detail = ref<IgetFindReportTaskSpace.Data>();
const detailTpl = ref<IgetDetailSpace.Data>();
const emit = defineEmits(['close']);

const getDetail = async() => {
  const { data } = await apiReportTsakObj.getFindReportTask(props.taskId);
  detail.value = data;
};
const getDetailTpl = async() => {
  const { data } = await apiReportListObj.getDetail(props.templateId as string);
  detailTpl.value = data;
};
const downLoad = () => {
  downloadByUrl(detailTpl.value!.templateFileInfo);
};

getDetail();
getDetailTpl();
</script>
