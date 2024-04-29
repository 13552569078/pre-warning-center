<template>
  <fx-page-table-v2 ref="tableRef" :cols="cols" :table-data="tableData" :table-props="{ rowKey: 'tagId' }" :data-fetcher="getData" selector-col-count="count-xl-2 count-lg-1 count-md-1" :show-search-bar="false" :search-items="searchItems" @sort-change="sortChange" class="h-full">
    <template #columnFactorNum="{ row }">
      {{ getFactorNumStr(row) }}
    </template>
    <template #columnComputePeriod="{ row }">
      {{ getComputePeriodStr(row) }}
    </template>
    <template #factorNum="{ searchForm }">
      <hl-select v-model="searchForm.factorNum" multiple placeholder="指数类型" clearable>
        <hl-option v-for="item in optionFactorNumType" :key="item.value" :label="item.label" :value="item.value" />
      </hl-select>
    </template>
    <template #computePeriod="{ searchForm }">
      <hl-select v-model="searchForm.computePeriod" multiple placeholder="计算周期" clearable>
        <hl-option v-for="item in optionComputePeriod" :key="item.value" :label="item.label" :value="item.value" />
      </hl-select>
    </template>
  </fx-page-table-v2>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { FxPageTable, DataFetcherParams } from 'fx-front-framework';
import { useSort } from '@/hooks';
import { apiFormulaDefinedObj } from '@/apis/modules/formula-defined';
import type { IgetFindFormulaDefinedPageSpace } from '@/apis/modules/formula-defined/model';

interface anyObject {
  [key: string]: string;
}

const tableRef = ref<InstanceType<typeof FxPageTable>>();
const tableData = ref<IgetFindFormulaDefinedPageSpace.List[]>([]);
const cols = ref([
  {
    title: '',
    align: 'left',
    width: 'fit-content',
    slotName: 'tableIndex'
  },
  { title: '计算公式名称', prop: 'formulaName' },
  { title: '公式编码', prop: 'formulaCode' },
  { title: '指标数量', slotName: 'columnFactorNum' },
  { title: '计算周期类型', slotName: 'columnComputePeriod' },
  { title: '描述', prop: 'formulaDesc', minWidth: '300px' },
  { title: '更新时间', prop: 'updatedAt', sortable: true, minWidth: '200px' }
]);
const searchItems = reactive([
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '公式名称',
    placeholder: '公式名称',
    value: '',
    name: 'formulaName'
  },
  {
    type: 'input',
    maxlength: '20',
    showWordLimit: false,
    label: '公式编码',
    placeholder: '公式编码',
    value: '',
    name: 'formulaCode'
  },
  {
    type: 'slot',
    slotName: 'computePeriod',
    label: '计算周期类型',
    value: '',
    name: 'computePeriod',
    display: (item: { value: string; }) => {
      if (item.value === 'useForRealtime') {
        return '实时计算';
      } else {
        return '周期计算';
      }
    }
  },
  {
    type: 'slot',
    slotName: 'factorNum',
    label: '指标数量',
    value: '',
    name: 'factorNum',
    display: (item: any) => {
      console.log(item);
      const displayArr = item.value.map((numType: string) => {
        if (numType === 'useForSimple') {
          return '单指标';
        } else {
          return '多指标';
        }
      });
      return displayArr.join();
    }
  }
]);

const optionFactorNumType = [
  {
    label: '单指标',
    value: 'useForSimple'
  },
  {
    label: '多指标',
    value: 'useForMultiple'
  }
];
const optionComputePeriod = [
  {
    label: '实时计算',
    value: 'useForRealtime'
  },
  {
    label: '周期计算',
    value: 'useForPeriod'
  }
];

const { sortQuery, sortChange } = useSort(tableRef, cols);

const getData = async({ pageSize, currentPage, params, setTotal }: DataFetcherParams) => {
  const searchParams: IgetFindFormulaDefinedPageSpace.RequestParams = {
    pageSize,
    currentPage,
    hasPreviousPage: false,
    isFirstPage: true,
    isLastPage: false,
    totalPage: 0,
    totalRow: 0,
    formulaName: params.formulaName,
    formulaCode: params.formulaCode
  };
  if (params.computePeriod?.length) {
    params.computePeriod.map((key: keyof IgetFindFormulaDefinedPageSpace.RequestParams) => {
      searchParams[key] = 1;
      return key;
    });
  }
  if (params.factorNum?.length) {
    params.factorNum.map((key: keyof IgetFindFormulaDefinedPageSpace.RequestParams) => {
      searchParams[key] = 1;
      return key;
    });
  }
  if (sortQuery.value) {
    searchParams.orderColumnStr = sortQuery.value.prop;
    searchParams.orderStr = sortQuery.value.sort;
  }
  const result = await apiFormulaDefinedObj.getFindFormulaDefinedPage(searchParams);
  tableData.value = result.data.list;
  setTotal(+result.data.totalRow);
};

const translator = (mapper: anyObject) => {
  return (data: IgetFindFormulaDefinedPageSpace.List) => {
    const arr: string[] = [];
    Object.keys(mapper).map(key => {
      if (data[key as keyof IgetFindFormulaDefinedPageSpace.List]) {
        arr.push(mapper[key]);
      }
      return key;
    });
    return arr.join() || '--';
  };
};
const getFactorNumStr = translator({
  useForSimple: '单指标',
  useForMultiple: '多指标'
});
const getComputePeriodStr = translator({
  useForPeriod: '周期计算',
  useForRealtime: '实时计算'
});
</script>
