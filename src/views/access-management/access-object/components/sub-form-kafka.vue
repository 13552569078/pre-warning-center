<template>
  <hl-form ref="formRef" :model="formData" :rules="rules" :label-position="['items-left', 'items-middle']" class="m-t-md" gap="var(--lg)" item-gap="var(--lg2)">
    <hl-form-item label="topic" prop="kafkaTopic">
      <hl-input v-model="formData.kafkaTopic" maxlength="50" show-word-limit block placeholder="请输入" />
    </hl-form-item>
    <hl-form-item v-if="!isParseOk" label="接口格式" prop="jsonScheme">
      <hl-group dir="vertical" class="w-full" gap="var(--md)">
        <hl-input native-type="textarea" v-model="formData.jsonScheme" autosize></hl-input>
        <hl-button class="static" type="primary" effect="light" @click="jsonParse">解析数据格式</hl-button>
      </hl-group>
    </hl-form-item>
  </hl-form>
  <hl-group v-if="isParseOk && destinySchema" dir="vertical" class="w-full m-t-md" gap="var(--md)">
    <span>字段映射关系</span>
    <hl-form ref ="formMapperRef" :model="formDataMapper" :rules="rules" :label-position="['right', 'middle']" gap="var(--lg)" item-gap="var(--lg2)">
      <hl-form-item v-for="(item) in destinySchema" :key="item.code" :label="item.name" :prop="item.code">

        <hl-group gap="var(--md)" class="w-full" full>
          <hl-selector :ref="(el:HTMLDivElement) => { selectorRefs[item.code] = el }" :style="treeStyle" filterable clearable block popper-class="limit-height"
            @input="(val: string) => handleTreeInput(val, item.code)" @clear="handleClear(item.code)" @resize="resize" placeholder="请选择映射属性">
            <hl-scrollbar max-height="240px">
              <hl-tree :ref="(el:HTMLDivElement) => { treeRefs[item.code] = el }" node-key="areaCode" :data="jsonTree" :filter-node-method="filterNode"
                class="p-md" @node-click="(data: NodeData, node: any) => clickTree(data, node, item.code)" />
            </hl-scrollbar>
          </hl-selector>

          <hl-input v-if="item.code === 'dataValue'" v-model="formDataMapper[`${item.code}BindValue`]" placeholder="指定值" :key="`input-${item.code}`"/>
        </hl-group>
      </hl-form-item>
    </hl-form>
  </hl-group>

</template>
<script lang='ts' setup>
import { ref, reactive, computed, toRaw, onMounted, nextTick } from 'vue';
import { HlMessage } from 'hongluan-ui';
import { Indexable } from 'fx-front-utils';
import { apiAccessObjectObj as api } from '@/apis/modules/access-object/index';
import { IgetlistMockRelationObjects } from '@/apis/modules/access-object/model';
import { rulesKafka } from '@/common';

interface NodeData {
  label: string,
  value: string,
  children: Node[]
}

const MESSAGE_EMPTY = '请输入后再解析';
const MESSAGE_FORMAT_ERROR = 'JSON 格式有误，请检查后再解析';
const JSON_PREFIX = '$.';

const props = defineProps({
  modelValue: Object
});

const emit = defineEmits(['update:modelValue']);

const treeStyle = ref({
  width: '',
});

const formRef = ref();
const formMapperRef = ref();
const selectorRefs = ref<Indexable<any>>({});
const treeRefs = ref<Indexable<any>>({});

const resize = (data: { offsetWidth: number }) => {
  treeStyle.value.width = data.offsetWidth + 'px';
};

const jsonObj = ref<Indexable<any>>({});
const jsonTree = computed(() => {
  const tree = getNodes(jsonObj.value);
  return tree;
});

const destinySchema = ref<IgetlistMockRelationObjects.Data[]>([]);

const formData = reactive({
  paramJsonPath: '',
  kafkaTopic: '',
  jsonScheme: ''
});
const formDataMapper = reactive<Indexable<string>>({});

const rules = computed(() => {
  const r: Indexable<object> = {};
  r.kafkaTopic = [
    { required: true, message: '请输入topic', trigger: ['blur', 'change'] },
    rulesKafka
  ];
  r.jsonScheme = [
    { required: true, message: '请输入接口格式', trigger: ['blur', 'change'] },
  ];
  destinySchema.value.forEach(item => {
    if (item.value) {
      r[item.code] = [{ required: true, message: `请选择「${item.name}」的映射字段`, trigger: ['blur', 'change'] }];
    }
  });
  return r;
});

const filterNode = (value: string, data: any) => {
  if (!value) return true;
  return data.label.indexOf(value) !== -1;
};

const handleTreeInput = (val: string, code: string) => {
  const selectorRef = getTreeRef(code);
  selectorRef.filter(val);
};

const jsonParse = () => {
  if (!formData.jsonScheme) {
    HlMessage.error(MESSAGE_EMPTY);
  } else {
    try {
      jsonObj.value = JSON.parse(formData.jsonScheme);
      if (typeof (jsonObj.value) !== 'object') {
        HlMessage.error(MESSAGE_FORMAT_ERROR);
      }
    } catch (e) {
      HlMessage.error(MESSAGE_FORMAT_ERROR);
    }
  }
};

const isParseOk = computed(() => {
  return typeof (jsonObj.value) === 'object' && Object.keys(jsonObj.value).length > 0;
});

const getNodes: any = (obj: any, parentKey?: string) => {
  return Object
    .entries(obj)
    .map(([key, value]) => {
      const pk = parentKey ? `${parentKey}.${key}` : key;
      if (value && typeof value === 'object') {
        return {
          label: key,
          value: pk,
          children: getNodes(value, pk)
        };
      } else {
        return {
          label: key,
          value: pk
        };
      }
    });
};

const getSelectorRef = (code: string) => {
  return selectorRefs.value[code];
};

const getTreeRef = (code: string) => {
  return treeRefs.value[code];
};

const clickTree = (data: any, node: any, code: string) => {
  formDataMapper[code] = `${JSON_PREFIX}${data.value}`;
  const selectorRef = getSelectorRef(code);
  selectorRef.setValue(data.value);
  selectorRef.togglePopperVisible(false);
};

const getDestinySchema = async () => {
  const res = await api.getlistMockRelationObjects();
  destinySchema.value = res.data;
  nextTick(() => {
    Object.keys(jsonObj.value).forEach((code: string) => {
      const selectorRef = getSelectorRef(code);
      if (code === 'dataValue') {
        selectorRef.setValue(jsonObj.value[code].path.replace(JSON_PREFIX, ''));
        formDataMapper[`${code}BindValue`] = jsonObj.value[code].value;
        formDataMapper[code] = jsonObj.value[code].path;
      } else {
        if (jsonObj.value[code]) {
          selectorRef.setValue(jsonObj.value[code].replace(JSON_PREFIX, ''));
          formDataMapper[code] = jsonObj.value[code];
        }
      }
    });
  });
};

getDestinySchema();

const getJsonPath = (obj: Indexable<any>) => {
  const data: Indexable<any> = {};
  Object.entries(obj)
    .forEach(([key, value]: string[]) => {
      if (!key.includes('BindValue')) {
        if (key === 'dataValue') {
          data[key] = {
            path: value,
            value: obj[`${key}BindValue`] || ''
          };
        } else {
          data[key] = value;
        }
      }
    });
  return data;
};

const getFormData = () => {
  const paramJsonPath = getJsonPath(formDataMapper);
  emit('update:modelValue', {
    ...toRaw(formData),
    paramJsonPath: JSON.stringify(paramJsonPath)
  });
};

const handleClear = (code:string) => {
  formDataMapper[code] = '';
  if (formDataMapper[`${code}BindValue`]) {
    formDataMapper[`${code}BindValue`] = '';
  }
};

const validate = async () => {
  if (!isParseOk.value) return Promise.reject(new Error('请先解析数据格式'));
  await Promise.all([
    formRef.value.validate(),
    formMapperRef.value.validate()
  ]);
};

const clearValidate = () => {
  setTimeout(() => {
    formRef.value.clearValidate();
    formMapperRef.value.clearValidate();
  }, 60);
};

defineExpose({
  getFormData,
  validate,
  clearValidate
});

onMounted(() => {
  formData.kafkaTopic = props.modelValue?.kafkaTopic;
  if (props.modelValue?.paramJsonPath) {
    formData.paramJsonPath = props.modelValue.paramJsonPath;
    jsonObj.value = JSON.parse(props.modelValue.paramJsonPath);
  }
});

</script>
