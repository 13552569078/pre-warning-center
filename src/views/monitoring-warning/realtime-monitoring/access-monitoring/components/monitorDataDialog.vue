<template>
  <hl-dialog
    show-close
    v-model="dialogVisible"
    title="监测设备详情"
    width="calc(var(--xs) * 110)"
    header-class="border-transparent"
    body-class="display-flex items-left items-top flex-col gap-lg bg-modal"
  >
    <CommonDetail
      :detail-opt='detailOpt'
      :count="'xl:count-2 md:count-3 count-md-2'"
      customBodyClass="dialog-inner-panel"
      customClass="dialog-inner-detail"
    >
      <template #periodTypeName="{ detail }">
        {{detail.accessFrequency === 0 ? '实时计算' : '周期计算'}}
      </template>
    </CommonDetail>
    <CommonDetail
      v-if="scopesList.data"
      :detail-opt='scopesList'
      customBodyClass="dialog-inner-panel"
      customClass="dialog-inner-detail"
    >
      <template #assessData="{ detail }">
        <h5 class="m-b-md">共有接入数据项{{detail.length}}项</h5>
        <div
          class="table-scroll"
          style="height: 200px"
        >
          <hl-simple-table
            v-if="detail.length>0"
            class="w-full"
            :cols="cols"
            :data="detail"
            :border="'bordered'"
          >
            <template #tableIndex="{ rowIndex }">
              <span>{{ rowIndex + 1 }}</span>
            </template>
          </hl-simple-table>
        </div>
      </template>
    </CommonDetail>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { ref, nextTick, watch, onMounted, reactive } from 'vue';

import { useTele, FxPageDetail, PageDetailOption } from 'fx-front-framework';
import { Indexable } from 'fx-front-utils';
import { apiRealTimeMonitorObj as api } from '@/apis/modules/realtime-monitor/index';
import {
  IpostGetEquipRealTimePageSpace,
  IgetGetEquipDetailSpace,
} from '@/apis/modules/realtime-monitor/model';

const dialogVisible = ref(false);
const currentEquip = ref();

const detailOpt = reactive({
  cols: [
    {
      label: '设备编号',
      key: 'equipCode',
    },
    {
      label: '设备类型',
      key: 'equipTypeName',
    },
    {
      label: '设备状态',
      key: 'equipStatusName',
    },
    {
      label: '安装时间',
      key: 'installTime',
    },
    {
      label: '设备位置',
      key: 'address',
    },
  ],
  data: {} as Indexable<string>,
} as unknown as PageDetailOption);

const scopesList = reactive({
  cols: [
    {
      label: '',
      key: 'timeScopes',
      slot: 'assessData',
      span: 'col-span-3',
    },
  ],
  data: {} as Indexable<string>,
} as unknown as PageDetailOption);

const cols = [
  {
    title: '',
    slotName: 'tableIndex',
    width: 'fit-content',
  },
  { title: '数据项名称', prop: 'accessItemName' },
];
const fetchData = async(row:IgetGetEquipDetailSpace.Model) => {
  const res = await api.getGetEquipDetail(row.equipId);
  detailOpt.data = res.data.equipDetail;
  detailOpt.title = `监测设备：${res.data.equipDetail.equipName}`;
  scopesList.data = res.data.accessItems;
  scopesList.title = '接入数据项说明';
};

const openDialog = (row: IpostGetEquipRealTimePageSpace.List) => {
  console.log(row);
  currentEquip.value = row;
  fetchData(row);
  dialogVisible.value = true;
};

defineExpose({ openDialog });
</script>

<style scoped lang="scss">
</style>
