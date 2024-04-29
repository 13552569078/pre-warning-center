<template>
  <hl-group full class="h-full p-lg" gap="var(--lg)">
    <hl-scrollbar height="320px">
      <hl-simple-table ref="tableRef" class="is-in-container" :cols="cols" :data="tableData" rowKey="factorId"
        fixed-header>
        <template #tableIndex="{ rowIndex }">
          <span>{{ rowIndex + 1 }}</span>
        </template>
        <template #accessItemName="{ row }">
          <hl-input @change="changeContent" v-model="row.targetDataName" placeholder="请输入数据项名称" block maxlength="100"
            show-word-limit />
        </template>
        <template #compute="{ row }">
          <hl-select block placeholder="计算公式" v-model="row.formulaId" @change="changeContent">
            <hl-option v-for="item in formulList" :key="item.formulaId" :label="item.formulaName"
              :value="item.formulaId"></hl-option>
          </hl-select>
        </template>
        <template #isPublic="{ row }">
          <hl-select block placeholder="是否公用" v-model="row.isPublic" @change="changeContent">
            <hl-option v-for="item in publicOptionList" :key="item.dictCode" :label="item.dictName"
              :value="item.dictCode"></hl-option>
          </hl-select>
        </template>
        <template #initTime="{ row }">
          <hl-date-picker @change="changeContent" v-model="row.initCollectTime" format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss" type="datetime" placeholder="选择启用时间" block />
        </template>
        <template #thresholdLevelVOList="{ row }">
          <div v-if="row.thresholdLevelVOList && row.thresholdLevelVOList.length && row.thresholdLevelVOList !== '--'">
            <div v-for="(item, index) in row.thresholdLevelVOList" :key="index" class="m-b-xs display-flex items-middle">
              <hb-text-overflow method="length" :length="8" effect="light">
                {{ item.thresholdLevelName }}
              </hb-text-overflow>
              &emsp;
              <hl-input v-model="item.thresholdLevelValue" style="display:inline-block; width: calc(var(--lg) * 4)"
                placeholder="输入阈值" :maxlength="20" />
            </div>
          </div>
          <div v-else>--</div>
        </template>
        <template #thresholdValue="{ row }">
          <!-- <hl-group style="flex-wrap: wrap;" v-if="row.dataType === 'INTERZONE'">
          <hl-popover placement="right" popper-class="limit-padding" :width="500" trigger="hover" style="padding: 0;">
            <template #reference>
              <hl-button type="link">
                <hl-icon size="xs" class="static m-r-xxs" type="primary">
                  <TwoSearch></TwoSearch>
                </hl-icon>查看
              </hl-button>
            </template>
            <hl-panel class="static box-shadow-xl" header-class="gap-xl" style="--panel-header-height: 48px;"
              body-class="display-flex items-left items-top flex-col gap-sm p-lg bg-light"><template #header>
                <div class="panel-title">
                  <h5 class="text-title">阈值范围</h5>
                </div>
                <div class="panel-header-right">
                  <hl-group align="items-left items-middle" gap="var(--xxs)" @click="editZone(row)"
                    style="cursor:pointer;">
                    <hl-icon size="xs" class="static" type="primary">
                      <TwoEdit></TwoEdit>
                    </hl-icon><span class="text-link static">编辑</span>
                  </hl-group>
                </div>
              </template>
              <template #default>
                <hl-group v-for="item in row.thresholdValue" :key="item"
                  class="p-y-sm p-x-lg bg-content border solid border-regular w-full box-shadow-sm"
                  align="items-left items-middle" gap="var(--lg)">
                  <hl-group align="items-left items-middle"><span class="text-secondary static">下区间：</span>
                    <hl-group align="items-left items-top" gap="var(--xxs)"><span class="font-bold static">
                        {{ EXPRESSIONS_NAMES[item.lowExpression] }}</span><span class="text-primary font-bold static">{{
                          item.lowValue }}</span></hl-group>
                  </hl-group>
                  <hl-group align="items-left items-middle"><span class="text-secondary static">上区间：</span>
                    <hl-group align="items-left items-top" gap="var(--xxs)"><span class="font-bold static">
                        {{ EXPRESSIONS_NAMES[item.upExpression] }}</span><span class="text-primary font-bold static">{{
                          item.upValue }}</span></hl-group>
                  </hl-group>
                </hl-group>
              </template>
            </hl-panel>
          </hl-popover>
        </hl-group> -->
          <hl-form-item v-if="row.dataType === 'SWITCH'" class="w-full" label="" prop="thresholdValue">
            <hl-switch v-model="row.thresholdValue" :active-value="1" :inactive-value="0" />
            &nbsp;&nbsp;
            <span v-show="row.thresholdValue">开启</span>
            <span v-show="!row.thresholdValue">关闭</span>
          </hl-form-item>
          <div v-else>
            --
          </div>
        </template>
        <template #timeScopes="{ row }">
          <div v-if="row.timeScopes === '--'">{{ row.timeScopes }}</div>
          <div v-else>
            <p v-for="item in row.timeScopes" :key="item.accessItemId">{{
              `${item.dateStart} ${item.timeStart}-${item.dateEnd} ${item.timeEnd}`
            }}</p>
          </div>
        </template>
        <template #accessFrequencyType="{ row }">
          <span>{{
            +row.accessFrequency > 0 ? '周期计算' : '实时计算'
          }}</span>
        </template>
        <template #action="{ row }">
          <hl-button type="link" @click="remove(row)">移除</hl-button>
        </template>
      </hl-simple-table>
    </hl-scrollbar>
    <!-- <EditZoneDialog ref="zoneRef" @saveZone="saveZone" /> -->
  </hl-group>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { FxPageTable } from 'fx-front-framework';
// import EditZoneDialog from './edit-zone-dialog.vue';
import {
  getSecondsToUnitTime,
} from '@/common';
import { IpostPageSpace } from '@/apis/modules/target-access-item/model';
import { apiFormulaDefinedObj } from '@/apis/modules/formula-defined';
import dayjs from 'dayjs';

const props = defineProps({
  monitorPointId: {
    type: String,
  },
  accessFrequency: {
    type: Number,
  },
  editTable: {
    type: Array,
  },
});

const emit = defineEmits(['changeEditTable', 'remove']);

const tableRef = ref<InstanceType<typeof FxPageTable>>();
// const zoneRef = ref();

watch(
  () => props.editTable,
  newId => {
    getData();
    getFormulList();
  }
);
watch(
  () => props.accessFrequency,
  () => {
    getFormulList();
  }
);

const tableData = ref<IpostPageSpace.List[]>([]);

const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'center',
    slotName: 'tableIndex',
    fixed: 'left',
  },
  {
    title: '指标数据项名称',
    prop: 'accessItemName',
    minWidth: '220px',
    slotName: 'accessItemName',
    fixed: { position: 'left', },
  },
  {
    title: '计算公式',
    prop: 'compute',
    slotName: 'compute',
    minWidth: '120px',
  },
  {
    title: '启用时间',
    prop: 'initTime',
    slotName: 'initTime',
    minWidth: '240px',
  },
  {
    title: '是否公用',
    prop: 'isPublic',
    slotName: 'isPublic',
    minWidth: '110px',
  },
  {
    title: '阈值范围',
    prop: 'thresholdValue',
    slotName: 'thresholdValue',
    minWidth: '100px',
  },
  {
    title: '接入数据项名称',
    prop: 'accessSourceName',
    minWidth: '170px',
    showTooltip: true,
    tooltipProps: { maxWidth: '340px' },
  },
  // 编辑预警等级
  { title: '阈值等级/阈值', prop: 'thresholdLevelVOList', slotName: 'thresholdLevelVOList', minWidth: '260px' },
  {
    title: '数据时间区间',
    prop: 'timeScopes',
    slotName: 'timeScopes',
    minWidth: '360px',
  },
  {
    title: '计算周期类型',
    prop: 'accessFrequencyType',
    slotName: 'accessFrequencyType',
  },
  { title: '数据频率', prop: 'accessFrequencyName' },

  {
    title: '数据标识',
    prop: 'accessItemCode',
    minWidth: '80px',
    showTooltip: true,
    tooltipProps: { maxWidth: '160px' },
  },
  {
    title: '数据对象',
    prop: 'accessSourceObjectName',
    minWidth: '170px',
    showTooltip: true,
    tooltipProps: { maxWidth: '340px' },
  },
  { title: '操作', slotName: 'action', align: 'center', fixed: 'right' },
]);

const formulList = ref();
const publicOptionList = ref([
  { dictName: '是', dictCode: 1 },
  { dictName: '否', dictCode: 0 },
]);

const getData = () => {
  tableData.value = props.editTable;
  tableData.value?.forEach(e => {
    e.targetDataName = e.accessItemName;
    e.formulaId = '9';
    e.isPublic = e.isPublic === 1 ? 1 : 0;
    e.initCollectTime = `${dayjs(new Date()).format('YYYY-MM-DD')} 00:00:00`;
    e.accessFrequencyName =
      e.accessFrequency > 0
        ? getSecondsToUnitTime(e, 'accessFrequencyUnit', 'accessFrequency') +
        e.accessFrequencyUnitName
        : '--';
  });
  // 处理列显示
  if (tableData.value.length && tableData.value[0].dataType === 'SWITCH') {
    tableRef.value?.toggleColumn(7, false);
    tableRef.value?.toggleColumn(5, true);
  } else {
    tableRef.value?.toggleColumn(5, false);
    tableRef.value?.toggleColumn(7, true);
  }
  emit('changeEditTable', tableData.value);
};

const getFormulList = async () => {
  const params = {
    useForPeriod: '',
    useForRealtime: '',
    useForSimple: 1,
  };
  if (props?.accessFrequency > 0) {
    params.useForPeriod = 1;
  } else {
    params.useForRealtime = 1;
  }
  const formulaResult = await apiFormulaDefinedObj.getListNewFormulaDefinedVOs(
    params
  );
  formulList.value = formulaResult.data;
};

const remove = row => {
  const index = tableData.value.findIndex(
    e => e.accessItemId === row.accessItemId
  );
  tableData.value.splice(index, 1);
  emit('remove', tableData.value);
};
const changeContent = () => {
  emit('changeEditTable', tableData.value);
};

/* const editZone = row => {
  zoneRef.value.editZone(row);
};
const saveZone = (data: { accessItemId: number; thresholdValue: any; }) => {
  tableData.value.find(
    e => e.accessItemId === data.accessItemId
  ).thresholdValue = data.thresholdValue;
  zoneRef.value.cancel();
}; */

onMounted(() => {
  getFormulList();
});
</script>
