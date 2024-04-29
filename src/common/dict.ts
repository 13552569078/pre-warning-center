import { apiDictObj } from '@/apis/modules/dict';
import { IgetListDictCustomVOsDictSpace } from '@/apis/modules/dict/model';

// 字典项获取
export const getListDict = async(key:string) => {
  const result = await apiDictObj.getListDictCustomVOsDict(key);
  return result.data;
};

// 获取单位name
export const getUnitName = (data:IgetListDictCustomVOsDictSpace.Data[], type: string) => {
  const list = data.filter(
    (item: IgetListDictCustomVOsDictSpace.Data) => {
      return item.dictCode === type;
    }
  );
  return list.length ? list[0].dictName : '';
};
