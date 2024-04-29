<template>
  <fx-page-table-v2 ref="tableRef" :cols="cols" :table-data="tableData" :table-props="{ rowKey: 'monitorStrategyId' }"
    :data-fetcher="getData" :search-items="searchItems" selector-col-count="count-3" :searcher="{ show: false }"
    @sort-change="sortChange">
    <template #toolbar-extra-after>
      <hl-group gap="var(--md)" class="m-l-md" v-city-life-line>
        <dropdown-button :options="selectionActions" />
        <fx-action-button type="main" @click="openStrategyPage" label="新增周期/触发策略" />
      </hl-group>
    </template>
    <!-- 风险分类搜索 -->
    <template #risk="{ searchForm }">
      <search-risk-type @risk-changed="riskChanged" v-model="searchForm['risk']" />
    </template>
    <!-- 策略类型 -->
    <template #triggerTypeSearch="{ searchForm }">
      <check-box-search ref="triggerTypeRef" v-model="searchForm['triggerTypes']" :options="alarmStateOptions" />
    </template>
    <!-- table 策略名称 -->
    <template #strategyName="{ row }">
      <span class="text-primary cursor-pointer" @click="openDetail(row)">{{ row.strategyName }}</span>
    </template>
    <!-- 策略 类型 -->
    <template #triggerType="{ row }">
      {{ row.triggerTypeName }}
    </template>
    <template #targetNames="{ row }">
      <div v-if="
        row.targetNames &&
        row.targetNames !== '--' &&
        row.targetNames.length
      ">
        <template v-if="row.targetNames.length <= 3">
          <div v-for="(item, index) in row.targetNames.slice(0, 3)" :key="index"
            class="display-flex items-middle">
            <hb-text-overflow method="length" :length="12" effect="light">
              {{ item }}
            </hb-text-overflow>
          </div>
        </template>
        <template v-else>
          <div v-for="(item, index) in row.targetNames.slice(0, 3)" :key="index"
            class="display-flex items-middle">
            <hb-text-overflow method="length" :length="12" effect="light">
              {{ item }}
            </hb-text-overflow>
          </div>
          <hl-popover placement="right" trigger="click" class="m-r-lg">
            <template #reference>
              <hl-icon type="primary" size="xxs" class="cursor-pointer">
                <two-more />
              </hl-icon>
            </template>
            <div v-for="(item, index) in row.targetNames" :key="index" class="display-flex items-middle">
              <hb-text-overflow method="length" :length="12" effect="light">
                {{ item }}
              </hb-text-overflow>
            </div>
          </hl-popover>
        </template>
      </div>
      <div v-else>--</div>
    </template>
    <!-- 监测点数量 -->
    <template #unitVOS="{ row }">
      <hl-group v-if="row.unitName && row.relationUnitNum">
        <span class="hl-button link" @mouseover="e => {
            buttonRef = e.currentTarget;
            editingId = row.monitorStrategyId;
          }
          " v-click-outside="() => onClickOutside(row)">
          {{ row.relationUnitNum }}
        </span>
      </hl-group>
      <span v-else>--</span>
    </template>
    <!-- 是否为模板 -->
    <template #isTemplate="{ row }">
      {{ row.isTemplate ? '是' : '否' }}
    </template>
    <template #actions="{ row }">
      <hb-overflow-list :show-count="3">
        <!-- 高级预警 二次预警无设为模板操作 -->
        <hl-button type="link" @click="saveOtherTpl(row)"
          :disabled="!!row.isTemplate || [TRIGGER_SECOND, TRIGGER_SENIOR].includes(row.triggerType)" effect="light"
          no-fill>设置为模板</hl-button>
        <hl-button type="link" @click="delStrategy(row)" :disabled="!!row.relationUnitNum" effect="light"
          no-fill>删除</hl-button>
        <hl-button type="link" @click="editStrategy(row)" effect="light" no-fill>编辑</hl-button>
        <hl-button type="link" @click="editName(row)" no-fill>修改名称</hl-button>
        <hl-button type="link" @click="configUnit(row)" no-fill>配置监测点</hl-button>
        <template #more>
          <hl-icon>
            <TwoChevronBottom />
          </hl-icon>
        </template>
      </hb-overflow-list>
    </template>
  </fx-page-table-v2>
  <hl-popover ref="popoverRef" placement="left" popper-class="unit-detail-popover" :virtual-ref="buttonRef"
    virtual-triggering trigger="click" width="800px">
    <unit-detail-popover :id="editingId" />
  </hl-popover>
  <!-- 修改名称及备注 -->
  <hl-dialog v-model="editNameVisiable" class="md-dialog" width="500px" title="编辑策略" :close-on-click-modal="false" borderless>
    <hl-form ref="formRef" :model="editFormData" :rules="rules" class="static" gap="var(--lg)" item-gap="var(--lg2)">
      <hl-form-item class="w-full" label="策略名称" prop="strategyName">
        <hl-input class="static" placeholder="请输入策略名称" block v-model="editFormData.strategyName" maxlength="20"
          show-word-limit></hl-input>
      </hl-form-item>
      <hl-form-item class="w-full" label="策略描述">
        <hl-input placeholder="请输入策略描述" block v-model="editFormData.strategyDesc" native-type="textarea" maxlength="500"
          show-word-limit />
      </hl-form-item>
    </hl-form>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="editNameVisiable = false">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="editNameOk">确定</hl-button>
      </span>
    </template>
  </hl-dialog>
  <add-point v-if="pointVisiable" @cancel="cancel" @point-ok="pointOk" :checked-ids="checkedIds" :monitorStrategyId="monitorStrategyId"></add-point>
</template>

<script lang="ts" setup>
import { ref, reactive, unref } from 'vue';
import { useRouter } from 'vue-router';
import { FxPageTable, DataFetcherParams } from 'fx-front-framework';
import { HlMessageBox, ClickOutside as vClickOutside } from 'hongluan-ui';
import { omit } from 'lodash-es';
import { useI18n } from 'vue-i18n';
import { HlMessageSuccess } from '@/common';
import { isValidName } from '@/common';
import { PlusButton } from '@/components';
import { useSort } from '@/hooks';
import { SearchRiskType } from '@/views/monitoring-config/components/index';
import { alarmStateOptions, STRATEGY_TYPE_ROUTERNAME_EDIT, STRATEGY_TYPE_ROUTERNAME_DETAIL, TRIGGER_SECOND, TRIGGER_SENIOR } from '@/views/monitoring-config/alarm-strategy-config/utils';
import { apiMonitorStrategyObj } from '@/apis/modules/monitor-strategy/fixed-cycle';
import { IpostFindMonitorStrategyPageSpace } from '@/apis/modules/monitor-strategy/fixed-cycle/model';
import UnitDetailPopover from './components/unit-detail-popover.vue';
import AddPoint from './components/add-point.vue';
import { apiMonitorPointObj } from '@/apis/modules/monitor-unit';

const router = useRouter();
const { t } = useI18n();

const pointVisiable = ref(false);
const checkedIds = ref<string[]>([]);
const monitorStrategyId = ref('');
// 配置监测点
const configUnit = async (row: IpostFindMonitorStrategyPageSpace.List) => {
  monitorStrategyId.value = row.monitorStrategyId;
  // 查询选择的监测点
  const { data } = await apiMonitorPointObj.getListMonitorStrategyUnit(row.monitorStrategyId);
  checkedIds.value = data.map(item => String(item.id));
  pointVisiable.value = true;
};
const pointOk = async(list: any[]) => {
  console.log('list', list);
  // formData.fators = [...formData.fators, ...list];
  await apiMonitorPointObj.postAddStrategyUnit(monitorStrategyId.value, list.map(item => item.unitId));
  HlMessageSuccess('监测点关联成功');
  cancel();
  tableRef.value?.refresh();
};
const cancel = () => {
  pointVisiable.value = false;
};

const tableData = ref<IpostFindMonitorStrategyPageSpace.List[]>([]);
const cols = ref([
  {
    title: '',
    width: 'fit-content',
    align: 'left',
    slotName: 'tableIndex'
  },
  { title: '策略名称', prop: 'strategyName', slotName: 'strategyName' },
  { title: `${t('warningType')}`, prop: 'eventTypeCodeName' },
  { title: '策略类型', slotName: 'triggerType' },
  { title: '监测指标', slotName: 'targetNames', minWidth: '160px' },
  { title: '监测点数量', slotName: 'unitVOS', width: '4em', align: 'left' },
  { title: '是否为模板', slotName: 'isTemplate' },
  { title: '更新时间', prop: 'updatedAt', sortable: true, minWidth: '200px' },
  {
    title: '操作',
    slotName: 'actions',
    align: 'left',
    fixed: 'right',
    width: '240px',
    minWidth: '240px'
  }
]);
if (localStorage.getItem('sceneCode') && localStorage.getItem('sceneCode') !== 'ALL') cols.value.splice(cols.value.length - 1, 1);

const selectionActions = reactive([
  /* {
    label: '新增数据触发策略',
    noFill: false,
    show: true,
    onClick: () => {
      goStrategy('dataTriggerConfig');
    }
  }, */
  {
    label: '新增二次预警策略',
    noFill: false,
    show: true,
    onClick: () => {
      goStrategy('secondTriggerConfig');
    }
  },
  {
    label: '新增高级预警策略',
    noFill: false,
    show: true,
    onClick: () => {
      goStrategy('advancedStrategy');
    }
  }
]);

const editNameVisiable = ref(false);
const editFormData = reactive({
  triggerType: '',
  monitorStrategyId: '',
  strategyName: '',
  strategyDesc: ''
});
const formRef = ref();

const versionId = ref();
const versionName = ref();
const associated = ref('');

const searchItems = reactive([
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '策略名称',
    placeholder: '策略名称',
    value: '',
    name: 'strategyName'
  },
  {
    label: `${t('warningType')}`,
    span: 'grid-col-span-xl-2',
    type: 'slot',
    slotName: 'risk',
    name: 'risk',
    value: '',
    display: (item: any) => {
      return item.value;
    }
  },
  {
    type: 'slot',
    slotName: 'triggerTypeSearch',
    label: '策略类型',
    placeholder: '请选择策略类型',
    value: [],
    name: 'triggerTypes',
    display: (item: any) => {
      return triggerTypeRef.value?.getOptionName(item.value);
    }
  }
]);

const eventTypeCodes = ref<string[]>([]);
const tableRef = ref<InstanceType<typeof FxPageTable>>();
const triggerTypeRef = ref();

const buttonRef = ref();
const popoverRef = ref();
const editingId = ref();

const { sortQuery, sortChange } = useSort(tableRef, cols);

const getData = async ({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
  let searchParams = {
    pageSize,
    currentPage,
    ...params,
    isTemplate: ''
  };
  if (sortQuery.value) {
    searchParams.orderColumnStr = sortQuery.value.prop;
    searchParams.orderStr = sortQuery.value.sort;
  }
  if (params.risk) {
    searchParams.eventTypeCodes = eventTypeCodes.value;
  }
  if (eventTypeCodes.value.length === 0) {
    searchParams = omit(searchParams, 'eventTypeCodes');
  }
  searchParams = omit(searchParams, 'risk');
  const result = await apiMonitorStrategyObj.postFindMonitorStrategyPage(searchParams);
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};
const onClickOutside = (row: IpostFindMonitorStrategyPageSpace.List) => {
  unref(popoverRef).popperRef?.hide?.();
};
const riskChanged = (data: string[]) => {
  eventTypeCodes.value = data;
};
const openStrategyPage = () => {
  router.push({
    name: 'alarmStrategy',
    query: {
      action: 'add'
    }
  });
};
const goStrategy = (name: string) => {
  router.push({
    name,
    query: {
      action: 'add'
    }
  });
};
const openDetail = (row: IpostFindMonitorStrategyPageSpace.List) => {
  const routerName = STRATEGY_TYPE_ROUTERNAME_DETAIL[row.triggerType];
  router.push({
    name: routerName,
    query: {
      title: '预警策略配置',
      id: row.monitorStrategyId,
      source: 'alarm-strategy-config',
      action: row.triggerType === 'TRIGGER_CYCLE' ? 'cycle' : 'trigger'
    }
  });
};

const editStrategy = async (row: IpostFindMonitorStrategyPageSpace.List) => {
  // 两种策略新增编辑 入口不同
  const routerName = STRATEGY_TYPE_ROUTERNAME_EDIT[row.triggerType];
  row.relationUnitNum &&
    (await HlMessageBox.confirm(`【${row.strategyName}】策略关联的所有监测点执行策略同步更新!`, '编辑提示', {
      confirmButtonText: '确定',
      confirmButtonType: 'warning',
      cancelButtonText: '取消'
    }));

  const { data: data1 } = await apiMonitorStrategyObj.getListMonitorStrategyVersion(row.monitorStrategyId);
  const { data: data2 } = await apiMonitorStrategyObj.getCheckIfRelatedUnit(row.monitorStrategyId);
  versionId.value = data1.length ? data1[0].versionId : '';
  versionName.value = data1.length ? data1[0].versionName : '';
  associated.value = data2 ? 'relation' : 'un_relation'; // 关联 未关联

  router.push({
    name: routerName,
    query: {
      action: 'edit',
      id: row.monitorStrategyId, // 策略id
      versionId: versionId.value, // 版本id
      versionName: versionName.value, // 版本名称
      associated: associated.value as unknown as string // 是否被关联
    }
  });
};
const delStrategy = async (row: IpostFindMonitorStrategyPageSpace.List) => {
  await HlMessageBox.confirm(`您确认删除[${row.strategyName}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消'
  });
  await apiMonitorStrategyObj.postRemoveMonitorStrategy(row.monitorStrategyId);
  HlMessageSuccess('删除成功');
  tableRef.value?.refresh();
};
const saveOtherTpl = async (row: IpostFindMonitorStrategyPageSpace.List) => {
  await apiMonitorStrategyObj.postModifyTemplate(row.monitorStrategyId, 1);
  tableRef.value?.refresh();
  HlMessageSuccess('设为模板成功');
  router.push({
    name: 'alarmStrategyTpl'
  });
};
const editName = (row: IpostFindMonitorStrategyPageSpace.List) => {
  editFormData.triggerType = row.triggerType as unknown as string;
  editFormData.monitorStrategyId = row.monitorStrategyId as unknown as string;
  editFormData.strategyName = row.strategyName;
  editFormData.strategyDesc = row.strategyDesc !== '--' ? row.strategyDesc : '';
  editNameVisiable.value = true;
};
const editNameOk = async () => {
  await formRef.value?.validate();
  await apiMonitorStrategyObj[editFormData.triggerType === 'TRIGGER_SECOND' ? 'postSecondModifyMonitorStrategyNameAndDesc' : 'postModifyMonitorStrategyNameAndDesc'](editFormData.monitorStrategyId, editFormData.strategyName, editFormData.strategyDesc);
  editNameVisiable.value = false;
  HlMessageSuccess('修改成功');
  tableRef.value?.refresh();
};

const isValidStrategyName = async (rule: any, value: string, callback: (error?: Error) => void) => {
  const res = await apiMonitorStrategyObj.postCheckIfNameExist(value, editFormData.monitorStrategyId);
  if (res.data) {
    callback(new Error('预警策略名称已存在，请更换名称'));
  }
  callback();
};
const rules = {
  strategyName: [
    { required: true, message: '策略名称不能为空' },
    { validator: isValidStrategyName, trigger: 'blur' },
    { validator: isValidName, trigger: 'blur' }
  ]
};
</script>
<style lang="scss">
.unit-detail-popover {
  --popover-padding-y: var(--lg);
  --popover-padding-x: var(--lg);

  .hb-table-searchbar {
    padding-right: 0;
    padding-bottom: var(--sm);
  }

  .hb-table-toolbar {
    padding-left: 0;
    padding-top: var(--md) !important;
    padding-bottom: var(--md);
    margin-bottom: var(--sm);
  }
}</style>
