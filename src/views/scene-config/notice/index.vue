<template>
  <hl-group class="w-full m-b-md" align="items-right">
    <hl-button type="primary" icon-position="left" @click="changeConfigType('alarm')">
      报警通知模板
      <template #icon>
        <hl-icon> <two-edit /></hl-icon> </template
    ></hl-button>
    <hl-button type="primary" icon-position="left" class="m-l-md" @click="changeConfigType('warning')">
      预警通知模板
      <template #icon>
        <hl-icon> <two-edit /></hl-icon> </template
    ></hl-button>
  </hl-group>
  <hl-panel class="main-panel w-full config-scene" padding="var(--xxl)" footer-padding="var(--lg)" footer-class="items-left">
    <!-- :show-search-bar="false" :show-col-config="false" :table-props="{ cellPadding: 'var(--md)', border: 'bordered' }" style="height: calc(var(--lg) * 29)" -->
    <hl-scrollbar style="height: calc(var(--lg) * 29)">
      <hl-simple-table :cols="cols" :data="tableData" stripe fixed-header :cell-style="cellStyle">
        <template #tableIndex="{ rowIndex }">
          <span>{{ rowIndex + 1 }}</span>
        </template>
        <template #allarmConfig="{ row, column, rowIndex }">
          <template v-if="rowIndex === 0">
            <hl-switch v-model="row.eventUseState" size="lg" class="m-r-xs" @change="changeAlarm(row.eventUseState, rowIndex)" />
            <span>{{ row.eventUseState ? '开启' : '关闭' }}</span>
          </template>
          <template v-else>
            <hl-checkbox v-model="row.eventUseState" @change="changeAlarm(row.eventUseState, rowIndex)">{{ row.eventUseState ? '开启' : '关闭' }}</hl-checkbox>
          </template>
        </template>
        <template #warningConfig="{ row, column, rowIndex }">
          <template v-if="rowIndex === 0">
            <hl-switch v-model="row.alarmUseState" size="lg" class="m-r-xs" @change="changeWarning(row.alarmUseState, rowIndex)" />
            <span>{{ row.alarmUseState ? '开启' : '关闭' }}</span>
          </template>
          <template v-else>
            <hl-checkbox v-model="row.alarmUseState" @change="changeWarning(row.alarmUseState, rowIndex)">{{ row.alarmUseState ? '开启' : '关闭' }}</hl-checkbox>
          </template>
        </template>
      </hl-simple-table>
    </hl-scrollbar>
  </hl-panel>
  <hl-group class="w-full m-t-lg p-r-md" align="items-right">
    <hl-button @click="cancel">取消</hl-button>
    <hl-button type="primary" class="m-l-md" @click="ok">确定</hl-button>
  </hl-group>
  <tplConfig :type="configType" @cancel="configTplVisiable = false" v-if="configTplVisiable"></tplConfig>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { HlMessageBox } from 'hongluan-ui';
import { HlMessageSuccess } from '@/common';
import { apiNoticeObj } from '@/apis/modules/scene-config/notice';
import { IgetEventTypeConfigListSpace } from '@/apis/modules/scene-config/notice/model';
import tplConfig from './tpl-config.vue';

const cols = ref([
  { title: '', slotName: 'tableIndex' },
  { title: '', prop: 'eventTypeName' },
  { title: '报警开关', prop: 'alarm', slotName: 'allarmConfig', minWidth: '20em' },
  { title: '预警开关', prop: 'warning', slotName: 'warningConfig', minWidth: '20em' }
]);
const tableData = ref<IgetEventTypeConfigListSpace.Data[]>([]);

const configType = ref('alarm');
const configTplVisiable = ref(false);

const changeConfigType = (type: string) => {
  configType.value = type;
  configTplVisiable.value = true;
};
const changeAlarm = (alarm: boolean, index: number) => {
  index !== 0 ? changeMainStatus() : changeMain(alarm, 'eventUseState');
};
const changeWarning = (warning: boolean, index: number) => {
  index !== 0 ? changeMainStatus() : changeMain(warning, 'alarmUseState');
};
//  主开关操作
const changeMain = (checked: boolean, keys: string) => {
  tableData.value = tableData.value.map(item => {
    return {
      ...item,
      [keys]: checked
    };
  });
};
// 子项 联动到 总开关
const changeMainStatus = () => {
  const itemLength = tableData.value.length - 1;
  const alarmList = tableData.value.filter((item, index) => {
    return item.eventUseState && index !== 0;
  }).length;
  const warningList = tableData.value.filter((item, index) => {
    return item.alarmUseState && index !== 0;
  }).length;
  alarmList === itemLength ? (tableData.value[0].eventUseState = true) : (tableData.value[0].eventUseState = false);
  warningList === itemLength ? (tableData.value[0].alarmUseState = true) : (tableData.value[0].alarmUseState = false);
};
const getEventStatusList = async () => {
  const { data } = await apiNoticeObj.getEventTypeConfigList();
  tableData.value = data.map(item => {
    return {
      ...item,
      alarmUseState: item.alarmUseState === 1, // 预警启用状态（0 1）
      eventUseState: item.eventUseState === 1 // 报警启用状态（0 1）
    };
  });
  tableData.value.unshift({ eventTypeName: '总开关', eventTypeCode: '0000', alarmUseState: 0, eventUseState: 0 });
  changeMainStatus();
};
const cancel = async () => {
  await HlMessageBox.confirm('是否放弃此次编辑?', '取消提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
    type: 'success'
  });
  // 初始化
  getEventStatusList();
  HlMessageSuccess('取消成功');
};
// submit
const ok = async () => {
  const resultDta = tableData.value.slice(1);
  const params = resultDta.map(item => {
    return {
      eventTypeCode: item.eventTypeCode,
      alarmUseState: item.alarmUseState ? 1 : 0,
      eventUseState: item.eventUseState ? 1 : 0
    };
  });
  await apiNoticeObj.postEventTypeConfigUpate(params as []);
  HlMessageSuccess('修改成功');
};
const cellStyle = ({ rowIndex }: { rowIndex: number }) => {
  return rowIndex === 0
    ? {
        backgroundColor: 'var(--bg-light)',
        zIndex: 10,
        position: 'sticky',
        top: '48px'
      }
    : {};
};

onMounted(() => {
  getEventStatusList();
});
</script>
<style lang="scss">
.config-scene {
  .hb-table-toolbar {
    display: none;
  }
  .hl-pagination {
    display: none;
  }
}
</style>
