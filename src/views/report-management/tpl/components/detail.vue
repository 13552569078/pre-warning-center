<template>
    <hl-dialog :model-value="true" class="md-dialog" width="650px" title="报告模板详情" @close="$emit('close')"
        :close-on-click-modal="false" stripe>
        <hl-row layout="grid" class="w-full" count="count-2" gap="var(--lg)">
            <hl-col span="col">
                <hl-group align="items-left items-top" class="static" dir="vertical" gap="var(--xxs)"><span
                        class="text-secondary static">模板名称</span><span class="font-bold static">{{ detail?.templateName
                        }}</span></hl-group>
            </hl-col>
            <hl-col span="col">
                <hl-group align="items-left items-top" class="static" dir="vertical" gap="var(--xxs)"><span
                        class="text-secondary static">模板分组</span><span class="font-bold static">{{
                                detail?.templateTypeName
                        }}</span></hl-group>
            </hl-col>
            <hl-col span="col col-span-2">
                <hl-group align="items-top" class="static" dir="vertical" gap="var(--xxs)" full="full-x"><span
                        class="text-secondary static">上传模板名称</span>
                    <hl-group class="p-y-xxs w-full" align="items-left items-middle" gap="var(--xxs)" full="full-x">
                        <hl-icon class="static" size="md">
                            <FileDoc></FileDoc>
                        </hl-icon>
                        <div class="text-link font-bold" @click="downLoad">{{ detail?.templateFileInfo.originalName }}</div>
                    </hl-group>
                </hl-group>
            </hl-col>
            <hl-col span="col col-span-2">
                <hl-group align="items-top" class="static" dir="vertical" gap="var(--xxs)" full="full-x"><span
                        class="text-secondary static">模板参数</span>
                    <hl-group class="p-lg bg-light radius-md w-full" align="items-left items-top" gap="var(--sm)">
                        <hl-group align="items-left items-top" gap="var(--sm)" wrap v-if="detail?.paramList.length">
                            <hl-group class="p-y-xxs p-x-sm bg-content radius-lg box-shadow-sm"
                                align="items-left items-middle" gap="var(--xs)"
                                v-for="(item, index) in detail?.paramList" :key="index"><span class="static">{{
                                        item.paramName
                                }}</span></hl-group>
                        </hl-group>
                        <span v-else class="text-secondary">暂无配置</span>
                    </hl-group>
                </hl-group>
            </hl-col>
            <hl-col span="col col-span-2">
                <hl-group align="items-top" class="static" dir="vertical" gap="var(--xxs)" full="full-x"><span
                        class="text-secondary static">行政区划</span>
                    <hl-group class="p-lg bg-light radius-md w-full" align="items-left items-top" gap="var(--sm)" v-if="detail?.areaList.length">
                        <hl-group align="items-left items-top" gap="var(--sm)" wrap>
                            <hl-group class="p-y-xxs p-x-sm bg-content radius-lg box-shadow-sm"
                                align="items-left items-middle" gap="var(--xs)" v-for="(item, index) in detail?.areaList"
                                :key="index"><span class="static">{{ item.areaName }}</span></hl-group>
                        </hl-group>
                    </hl-group>
                    <span v-else class="text-secondary">暂无配置</span>
                </hl-group>
            </hl-col>
            <hl-col span="col col-span-2">
                <hl-group align="items-top" class="static" dir="vertical" gap="var(--xxs)" full="full-x"><span
                        class="text-secondary static">风险分类</span>
                    <hl-group class="p-lg bg-light radius-md w-full" align="items-left items-top" gap="var(--sm)" v-if="detail?.eventTypeList.length">
                        <hl-group align="items-left items-top" gap="var(--sm)" wrap>
                            <hl-group class="p-y-xxs p-x-sm bg-content radius-lg box-shadow-sm"
                                align="items-left items-middle" gap="var(--xs)"
                                v-for="(item, index) in detail?.eventTypeList" :key="index"><span class="static">{{
                                        item.eventTypeName
                                }}</span></hl-group>
                        </hl-group>
                    </hl-group>
                    <span v-else class="text-secondary">暂无配置</span>
                </hl-group>
            </hl-col>
            <hl-col span="col col-span-2">
                <hl-group align="items-left items-top" class="static" dir="vertical" gap="var(--xxs)"
                    full="full-x"><span class="text-secondary static">描述</span>
                    <div class="font-bold">{{ detail?.templateDesc }}</div>
                </hl-group>
            </hl-col>
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
import { ref, onMounted, PropType } from 'vue';
import { downloadByUrl } from '@/common';
import { apiReportListObj } from '@/apis/modules/report-manage/report-tpl-manage/list/index';
import { IgetDetailSpace } from '@/apis/modules/report-manage/report-tpl-manage/list/model';

const props = defineProps({
  templateId: {
    type: String,
    default: ''
  },
});

const detail = ref<IgetDetailSpace.Data>();
const emit = defineEmits(['close']);

const getDetail = async() => {
  const { data } = await apiReportListObj.getDetail(props.templateId as string);
  detail.value = data;
};
const downLoad = () => {
  downloadByUrl(detail.value!.templateFileInfo);
};

getDetail();
</script>
