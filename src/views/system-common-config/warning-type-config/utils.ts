import { eventTypeApiObj as eventTypeApi } from '@/apis/modules/event-type-api';

import { get18nName } from '@/common';

export const getEventTypeSearchItem = async(key = 'eventTypeCodes', multiple = false) => {
  const result = await eventTypeApi.listAll();
  const item = {
    type: 'select',
    label: `${get18nName('warningType')}`,
    placeholder: `请选择${get18nName('warningType')}`,
    value: '',
    filterable: true,
    name: key,
    prop: {
      label: 'eventTypeName',
      value: 'eventTypeCode',
    },
    options: [
      ...result.data,
    ],
    multiple: multiple,
    'collapse-tags': multiple,
    'collapse-tags-tooltip': multiple
  };
  return item;
};

export const getEventTypeList = async() => {
  const result = await eventTypeApi.listAll();
  return result.data;
};

export const formatSystemCode = (code: string) => {
  return code.length < 6 ? code.padEnd(6, '0') : code;
};

export const formatLabel = (code: string, label: string, sepatator = '|') => {
  return (code && code !== '-1' ? formatSystemCode(code) + '|' : '') + label;
};

export const SEP = '$_$';
