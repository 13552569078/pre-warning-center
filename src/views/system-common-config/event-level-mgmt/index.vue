<template>
  <teleport to="#pageAction" v-if="showTeleport">
    <hl-button class="m-r-sm" @click="reset">重置</hl-button>
    <hl-button type="primary" @click="save">保存</hl-button>
  </teleport>
  <hl-panel class="table-panel event-level-table keep-padding h-full" style="--panel-body-padding:var(--xl)">
    <fx-page-table
      ref="tableRef"
      :cols="cols"
      :table-data="tableData"
      :data-fetcher="getData"
      :table-props="{ rowKey: 'systemCode', border: 'bordered' }"
      selector-col-count="count-xl-2 count-lg-1 count-md-1"
      :show-search-bar="false"
    >
      <template v-for="level in alarmLevels" :key="level.dictCode" #[level.dictCode]="{ row }">
      <hl-checkbox v-model="row[level.dictCode]" />
      </template>
      <template v-for="level in warningLevels" :key="level.dictCode" #[level.dictCode]="{ row }">
        <hl-checkbox v-model="row[level.dictCode]" />
      </template>
    </fx-page-table>
  </hl-panel>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, nextTick, onMounted } from 'vue';
import { useTele, FxPageTable } from 'fx-front-framework';
import { CommonUtils } from 'fx-front-utils';
import { apiDictObj as dictApi } from '@/apis/modules/dict-api';
import { useI18n } from 'vue-i18n';
import { useDeferred } from '@/hooks';
import { apiEventTypeObj } from '@/apis/modules/event-type';
import type { DataFetcherParams } from 'fx-front-framework';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';
import { IgetFindEventTypePageEventTypeSpace } from '@/apis/modules/event-type/model';
import { HlMessage } from 'hongluan-ui';

const { showTeleport } = useTele();
const { t } = useI18n();
const { waitingFor, resolve } = useDeferred();

const tableRef = ref<InstanceType<typeof FxPageTable>>();
const tableData = ref<IgetFindEventTypePageEventTypeSpace.List[]>([]);
const cols = ref([
  {
    title: '',
    width: 'fit-content',
    slotName: 'tableIndex',
  },
  { title: `${t('warningType')}`, prop: 'eventTypeName', align: 'center', },
  { title: '报警等级',
    align: 'center',
    children: [] as any[]
  },
  { title: '预警等级',
    align: 'center',
    children: [] as any[]
  },
]);

const alarmLevels = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
const warningLevels = ref<IgetListDictCustomVOsDictSpace.Data[]>([]);
let originalData: any;

const transformData = (list: IgetFindEventTypePageEventTypeSpace.List[]) => {
  list.forEach(item => {
    alarmLevels.value.forEach(al => {
      item[al.dictCode] = item.alarmLevelTypeList.includes(al.dictCode);
    });
    warningLevels.value.forEach(wl => {
      item[wl.dictCode] = item.warningLevelTypeList.includes(wl.dictCode);
    });
  });
};

const getData = async({ pageSize, currentPage, setTotal }: DataFetcherParams) => {
  const result = await apiEventTypeObj.getFindEventTypePageEventType(CommonUtils.toQuery({ pageSize, currentPage }));
  originalData = JSON.parse(JSON.stringify(result.data.list));

  await waitingFor();

  transformData(result.data.list);
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};

const reset = () => {
  if (originalData && originalData.length) {
    const list = JSON.parse(JSON.stringify(originalData));
    transformData(list);
    tableData.value = list;
  }
};

const save = async() => {
  const alarmLevelTypeListKeys = alarmLevels.value.map(al => al.dictCode);
  const warningLevelTypeListKeys = warningLevels.value.map(wl => wl.dictCode);
  const data = tableData.value.map(td => ({
    eventTypeName: td.eventTypeName,
    eventTypeCode: td.eventTypeCode,
    systemCode: td.systemCode,
    alarmLevelTypeList: Object.keys(td).map(key => alarmLevelTypeListKeys.includes(key) && td[key] ? key : '').filter(Boolean),
    warningLevelTypeList: Object.keys(td).map(key => warningLevelTypeListKeys.includes(key) && td[key] ? key : '').filter(Boolean),
  }));
  let isValid = true;
  for (let i = 0; i < data.length; i++) {
    const td = data[i];
    if (td.alarmLevelTypeList.length < 1 || td.warningLevelTypeList.length < 1) {
      isValid = false;
      HlMessage.error(`[${td.eventTypeName}]报警等级和预警等级至少选择一项`);
      break;
    }
  }
  if (isValid) {
    await apiEventTypeObj.postModifyEventTypeLevelEventType(data);
    tableRef.value?.refresh();
  }
};

onMounted(async() => {
  const result = await dictApi.list('WARNING_LEVEL_CODE,ALARM_LEVEL_CODE');
  result.data.forEach(item => {
    if (item.typeCode === 'WARNING_LEVEL_CODE') {
      warningLevels.value.push(item);
      cols.value[3].children?.push({
        title: item.dictName,
        slotName: item.dictCode,
        align: 'center'
      });
    } else if (item.typeCode === 'ALARM_LEVEL_CODE') {
      alarmLevels.value.push(item);
      cols.value[2].children?.push({
        title: item.dictName,
        slotName: item.dictCode,
        align: 'center'
      });
    }
  });
  resolve();
});
</script>
<style lang="scss">
.event-level-table {
  .hb-table-toolbar {
    display: none;
  }
}
</style>
