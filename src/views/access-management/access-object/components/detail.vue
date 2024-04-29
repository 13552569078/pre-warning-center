<template>
  <!-- 接入对象 -->
  <hl-dialog v-model="isShowDialog" class="md-dialog" width="700px" title="接入源详情" :close-on-click-modal="false" @close="$emit('close')" borderless>
    <CommonDetail :onlyInfo="true" :detail-opt="detailOpt" count="count-2">
      <template #sourceType="{ detail }">
        <span class="font-bold">{{ `${ACCESS_SOURCE_TYPE[detail.accessSourceType]} - ${DATA_SOURCE_TYPE[detail.dataSourceType]}` }}</span>
      </template>
      <template #custom="{ key }">
        <span class="font-bold">{{ jsonObj[key] }}</span>
      </template>
    </CommonDetail>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="$emit('close')">关闭</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang='ts' setup>
import { ref, reactive, onMounted } from 'vue';
import { Indexable } from 'fx-front-utils';
import { PageDetailOption } from 'fx-front-framework';

const ACCESS_SOURCE_TYPE:Indexable<any> = {
  MQ: '接口',
  HTTP: '接口',
  DB: '数据库'
};

const DATA_SOURCE_TYPE:Indexable<any> = {
  KAFKA: 'kafka',
  HTTP: 'http',
  MYSQL: 'MySQL',
};

const props = defineProps({
  data: {
    type: Object,
  }
});

const isShowDialog = ref(true);

const detailOpt = reactive({
  cols: [
    {
      label: '数据源名称',
      key: 'accessSourceName',
    },
    {
      label: '数据类型',
      key: 'sourceType',
      slot: 'sourceType' // 可以定义插槽
    }
  ],
  data: {} as Indexable<string>
} as unknown as PageDetailOption);

const jsonObj = ref<Indexable<any>>({});

onMounted(() => {
  detailOpt.data = props.data as Indexable<any>;
  jsonObj.value = props.data?.sourceParamJson ? JSON.parse(props.data.sourceParamJson) : {};
  Object.keys(jsonObj.value).forEach(key => {
    detailOpt.cols.push({
      label: key,
      key,
      slot: 'custom',
      span: 'col-span-2'
    });
  });
  detailOpt.cols.push({
    label: '描述',
    key: 'accessSourceDesc',
    span: 'col-span-2'
  },);
});

</script>

<style lang="scss">
  .item-label {
    width: calc(var(--md) * 5)
  }
</style>
