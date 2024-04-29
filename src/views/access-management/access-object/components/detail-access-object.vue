<template>
  <!-- 接入对象 -->
  <hl-dialog v-model="isShowDialog" class="md-dialog" width="700px" title="接入对象详情" :close-on-click-modal="false" @close="$emit('close')" borderless>
    <CommonDetail :onlyInfo="true" :detail-opt="detailOpt" count="count-2">
      <template #sourceTypeSlot="{ detail }">
        <span class="font-bold">{{ `${ACCESS_SOURCE_TYPE[detail.dataSourceType]} - ${DATA_SOURCE_TYPE[detail.dataSourceType]} - ${detail.accessSourceName}` }}</span>
      </template>
      <template #mapperSlot="{ detail }">
        <hl-group class="w-full" full style="overflow: auto;">
          <hl-simple-table
            v-if="destinySchema.length"
            :cols="tableCols"
            :data="tableData">
          </hl-simple-table>
        </hl-group>
      </template>
      <template #custom="{ key }">
        <span class="font-bold">{{ jsonObj[key] }}</span>
      </template>
    </CommonDetail>
    <!-- <template #footer>
      <span class="dialog-footer">
        <hl-button @click="$emit('close')">关闭</hl-button>
      </span>
    </template> -->
  </hl-dialog>
</template>
<script lang='ts' setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { Indexable } from 'fx-front-utils';
import { PageDetailOption } from 'fx-front-framework';
import { apiAccessObjectObj as api } from '@/apis/modules/access-object/index';
import { IgetlistMockRelationObjects } from '@/apis/modules/access-object/model';

const ACCESS_SOURCE_TYPE:Indexable<any> = {
  KAFKA: '接口',
  HTTP: '接口',
  MYSQL: '数据库'
};

const DATA_SOURCE_TYPE:Indexable<any> = {
  KAFKA: 'kafka',
  HTTP: 'http',
  MYSQL: 'MySQL',
};

const emits = defineEmits(['close']);

const props = defineProps({
  data: {
    type: Object,
  }
});

const isShowDialog = ref(true);
const destinySchema = ref<IgetlistMockRelationObjects.Data[]>([]);

const tableCols = computed(() => {
  const cols = destinySchema.value.map(item => ({
    title: item.name,
    prop: item.code,
    showTooltip: true,
    minWidth: item.code === 'dataValue' ? '16em' : '8em'
  }));
  cols.unshift({
    title: '需匹配字段',
    prop: 'mapper',
    fixed: 'left'
  });
  return cols;
});

const tableData = computed(() => {
  const obj: Indexable<string> = {};
  destinySchema.value?.forEach(item => {
    if (item.code === 'dataValue') {
      if (jsonObj.value[item.code].value) {
        obj[item.code] = `${jsonObj.value[item.code].path.replace('$.', '')}（指定值：${jsonObj.value[item.code].value}）`;
      } else {
        obj[item.code] = jsonObj.value[item.code].path.replace('$.', '');
      }
    } else {
      obj[item.code] = jsonObj.value[item.code] ? jsonObj.value[item.code].replace('$.', '') : '--';
    }
  });
  obj.mapper = '已匹配属性';
  return [obj];
});

const isKafka = computed(() => {
  return props.data!.dataSourceType === 'KAFKA';
});

const cols = computed(() => {
  if (isKafka.value) {
    return [
      {
        label: '数据对象名称',
        key: 'objectName',
      },
      {
        label: '数据源',
        slot: 'sourceTypeSlot'
      },
      {
        label: '数据对象映射',
        slot: 'mapperSlot',
        span: 'col-span-2'
      },
      {
        label: '接入对象描述',
        key: 'accessSourceObjectDesc',
        span: 'col-span-2'
      }
    ];
  } else {
    return [
      {
        label: '数据对象名称',
        key: 'objectName',
      },
      {
        label: '数据源',
        slot: 'sourceTypeSlot'
      },
      {
        label: '连接地址',
        key: 'linkUrl'
      },
      {
        label: '连接参数',
        key: 'linkParam'
      },
      {
        label: '接入对象描述',
        key: 'accessSourceObjectDesc',
        span: 'col-span-2'
      }
    ];
  }
});

const detailOpt = reactive({
  cols: cols.value,
  data: {} as Indexable<string>
} as unknown as PageDetailOption);

const jsonObj = ref<Indexable<any>>({});

const getDestinySchema = async () => {
  const res = await api.getlistMockRelationObjects();
  destinySchema.value = res.data;
};

if (isKafka.value) {
  getDestinySchema();
}

onMounted(() => {
  detailOpt.data = props.data as Indexable<any>;
  if (props.data?.paramJsonPath) {
    jsonObj.value = JSON.parse(props.data.paramJsonPath);
  }
});

</script>

<style lang="scss">
  .item-label {
    width: calc(var(--md) * 5)
  }
</style>
