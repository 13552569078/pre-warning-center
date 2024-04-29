import { apiDictObj as dictApi } from '@/apis/modules/dict-api';

export const ACCESS_HTTP = 'HTTP';
export const ACCESS_DB = 'DB';
export const ACCESS_MQ = 'MQ';
export const ACCESS_KAFKA = 'MQ:kafka';
export const ACCESS_TYPE_NAMES = {
  [ACCESS_HTTP]: 'HTTP连接',
  [ACCESS_DB]: '数据库',
  [ACCESS_MQ]: '消息服务',
  [ACCESS_KAFKA]: '消息服务kafka',
};

// 介接对象单位 类型字典
export const getListDict = async() => {
  const result = await dictApi.list('ACCESS_SOURCE_TYPE');
  return result.data;
};

// ROOT_TREE_LEVEL 无编辑 仅有加入数据源
export const ROOT_TREE_LEVEL = 2;
