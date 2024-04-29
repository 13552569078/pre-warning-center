<template>
  <hl-dialog :model-value="true" width="800px" title="配置预警事件策略规则" class="alarm-event-config-dlg" :close-on-click-modal="false" body-padding="var(--xl)" @close="$emit('cancel')" borderless>
    <fx-page-table :cols="cols" :table-data="tableData" :show-search-bar="false" :show-col-config="false" :table-props="{ cellPadding: 'var(--md)', border: 'bordered' }">
      <template #config="{ row, column, rowIndex }">
        <template v-if="rowIndex === 0">
          <hl-group dir="vertical" gap="var(--sm)">
            <hl-radio-group dir="vertical" v-model="row[column.prop]" gap="var(--sm)">
              <hl-radio :label="1">无需研判</hl-radio>
              <hl-radio :label="3">人工研判</hl-radio>
            </hl-radio-group>
            <span v-if="row[column.errorMsg]" class="font-sm text-danger">{{ row[column.errorMsg] }}</span>
          </hl-group>
        </template>
        <template v-if="rowIndex === 1">
          <hl-group dir="vertical" gap="var(--sm)">
            <hl-radio-group dir="vertical" v-model="row[column.prop]" gap="var(--sm)" @change="handlePropChange(row, column.prop)">
              <hl-radio :label="NO_NEED_TO_TRANSFER">无需转发</hl-radio>
              <hl-radio :label="NEED_TO_TRANSFER">需要转发</hl-radio>
            </hl-radio-group>
            <hl-checkbox-group dir="vertical" class="p-l-md" v-model="row[column.subProp]" gap="var(--sm)" @change="handleSubPropChange(row, column.prop)">
              <!-- <hl-checkbox label="1">事件中心</hl-checkbox>
              <hl-checkbox label="2">第三方系统</hl-checkbox>
              <hl-checkbox label="3">协同中心</hl-checkbox> -->
              <hl-checkbox :label="item.value" v-for="(item, index) in STRATEGY_AFTER_CONFIG" :key="index">{{ item.label }}</hl-checkbox>
            </hl-checkbox-group>
            <span v-if="row[column.errorMsg]" class="font-sm text-danger">{{ row[column.errorMsg] }}</span>
          </hl-group>
        </template>
        <template v-if="rowIndex === 2">
          <hl-group dir="vertical" gap="var(--sm)">
            <hl-radio-group dir="vertical" v-model="row[column.prop]" gap="var(--sm)" @change="handlePropChange(row, column.prop)">
              <hl-radio :label="NO_NEED_TO_TRANSFER">无需转发</hl-radio>
              <hl-radio :label="NEED_TO_TRANSFER">需要转发</hl-radio>
            </hl-radio-group>
            <hl-checkbox-group dir="vertical" class="p-l-md" v-model="row[column.subProp]" gap="var(--sm)" @change="handleSubPropChange(row, column.prop)">
              <!-- <hl-checkbox label="1">事件中心</hl-checkbox>
              <hl-checkbox label="2">第三方系统</hl-checkbox>
              <hl-checkbox label="3">协同中心</hl-checkbox> -->
              <hl-checkbox :label="item.value" v-for="(item, index) in STRATEGY_AFTER_CONFIG" :key="index">{{ item.label }}</hl-checkbox>
            </hl-checkbox-group>
            <span v-if="row[column.errorMsg]" class="font-sm text-danger">{{ row[column.errorMsg] }}</span>
          </hl-group>
        </template>
      </template>
    </fx-page-table>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="$emit('cancel')">取消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="ok">{{ id ? '保存' : '确定' }}</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { apiDictObj as dictApi } from '@/apis/modules/dict-api';
import { eventTypeApiObj as eventTypeApi } from '@/apis/modules/event-type-api';
import { HlMessageSuccess } from '@/common';
import { apiStrategyConfigObj } from '@/apis/modules/strategy-rule';
import { GlobalAPI } from '@/common';

const NEED_TO_TRANSFER = '-1';
const NO_NEED_TO_TRANSFER = '0';

const STRATEGY_AFTER_CONFIG = JSON.parse(GlobalAPI.config.STRATEGY_AFTER_CONFIG);

const props = defineProps({
  id: [String, Number]
});
const emit = defineEmits(['cancel', 'ok']);

const cols = ref([{ title: '', prop: 'ruleName', subProp: 'subRuleName', errorMsg: '', width: '100px' }]);

const tableData = ref<Record<string, any>[]>([
  { id: 1, ruleName: '研判方式' },
  { id: 2, ruleName: '预警转发' },
  { id: 3, ruleName: '消警转发' }
]);

const handleSubPropChange = (row: any, code: string) => {
  if (row[`${code}_SUB_PROP`].length) {
    row[code] = NEED_TO_TRANSFER;
  } else {
    row[code] = NO_NEED_TO_TRANSFER;
  }
};

const handlePropChange = (row: any, code: string) => {
  if (row[code] !== NEED_TO_TRANSFER) {
    row[`${code}_SUB_PROP`] = [];
  }
};

const validate = () => {
  let isError = false;
  const TEXT_EMPTY = '请选择转发规则';
  const TEXT_ERROR = '请选择转发对象';
  const TEXT_EMPTY_CHECK_OPTION = '请选择研判方式';
  cols.value.slice(1).map(col => {
    if (!tableData.value[0][col.prop]) {
      tableData.value[0][`${col.prop}_ERROR_MSG`] = TEXT_EMPTY_CHECK_OPTION;
      isError = true;
    } else {
      tableData.value[0][`${col.prop}_ERROR_MSG`] = '';
    }

    if (!tableData.value[1][col.prop]) {
      tableData.value[1][`${col.prop}_ERROR_MSG`] = TEXT_EMPTY;
      isError = true;
    } else {
      if (tableData.value[1][col.prop] === NEED_TO_TRANSFER && tableData.value[1][col.subProp].length === 0) {
        tableData.value[1][`${col.prop}_ERROR_MSG`] = TEXT_ERROR;
        isError = true;
      } else {
        tableData.value[1][`${col.prop}_ERROR_MSG`] = '';
      }
    }

    if (!tableData.value[2][col.prop]) {
      tableData.value[2][`${col.prop}_ERROR_MSG`] = TEXT_EMPTY;
      isError = true;
    } else {
      if (tableData.value[2][col.prop] === NEED_TO_TRANSFER && tableData.value[2][col.subProp].length === 0) {
        tableData.value[2][`${col.prop}_ERROR_MSG`] = TEXT_ERROR;
        isError = true;
      } else {
        tableData.value[2][`${col.prop}_ERROR_MSG`] = '';
      }
    }

    return col;
  });
  return isError;
};

const ok = async () => {
  const isError = validate();
  if (!isError) {
    const result = cols.value.slice(1).map(col => ({
      eventLevel: col.prop,
      checkOption: tableData.value[0][col.prop],
      disseminationOptions: tableData.value[1][col.prop] === NEED_TO_TRANSFER ? tableData.value[1][col.subProp] : [tableData.value[1][col.prop]],
      cancelOptions: tableData.value[2][col.prop] === NEED_TO_TRANSFER ? tableData.value[2][col.subProp] : [tableData.value[2][col.prop]]
    }));
    await apiStrategyConfigObj.postModifyStrategyConfig(`${props.id}`, result);
    HlMessageSuccess('配置成功');
    emit('ok');
  }
};

onMounted(async () => {
  const dict = await dictApi.list('ALARM_LEVEL_CODE');
  const eventType = await eventTypeApi.detail(`${props.id}`);
  eventType.data.alarmLevelTypeList.forEach((code: string) => {
    cols.value.push({
      title: dict.data.find(d => d.dictCode === code)?.dictName,
      prop: code,
      subProp: `${code}_SUB_PROP`,
      errorMsg: `${code}_ERROR_MSG`,
      slotName: 'config'
    } as any);
    tableData.value[0][code] = '';
    tableData.value[1][code] = '';
    tableData.value[1][`${code}_SUB_PROP`] = [];
    tableData.value[1][`${code}_ERROR_MSG`] = '';
    tableData.value[2][code] = '';
    tableData.value[2][`${code}_SUB_PROP`] = [];
    tableData.value[2][`${code}_ERROR_MSG`] = '';
  });

  const result = await apiStrategyConfigObj.getListHandleRuleConfigVOs(`eventTypeCode=${props.id}`);
  result.data.forEach(d => {
    tableData.value[0][d.eventLevel] = d.checkOption;
    // 回显预警转发
    if (d.disseminationOptions.length === 1 && d.disseminationOptions[0] === NO_NEED_TO_TRANSFER) {
      tableData.value[1][d.eventLevel] = d.disseminationOptions[0];
    } else {
      tableData.value[1][d.eventLevel] = NEED_TO_TRANSFER;
      tableData.value[1][`${d.eventLevel}_SUB_PROP`] = d.disseminationOptions;
    }

    // 回显消警转发
    if (d.cancelOptions.length === 1 && d.cancelOptions[0] === NO_NEED_TO_TRANSFER) {
      tableData.value[2][d.eventLevel] = d.cancelOptions[0];
    } else {
      tableData.value[2][d.eventLevel] = NEED_TO_TRANSFER;
      tableData.value[2][`${d.eventLevel}_SUB_PROP`] = d.cancelOptions;
    }
  });
});
</script>
<style lang="scss">
.alarm-event-config-dlg {
  .hb-table-toolbar {
    display: none;
  }
  .hl-pagination {
    display: none;
  }
}
</style>
