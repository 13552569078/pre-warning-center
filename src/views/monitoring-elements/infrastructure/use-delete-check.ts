/* eslint-disable prefer-promise-reject-errors */
import { ref } from 'vue';
import { apiFacilityObj } from '@/apis/modules/facility';
import { IpostDeleteCheckSpace } from '@/apis/modules/facility/model';
import { HlMessageBox } from 'hongluan-ui';

function useDelCheck() {
  const delList = ref<IpostDeleteCheckSpace.Data['facilityNames']>([]);
  const delResult = ref(false);
  const checkDel = async(ids: any[]) => {
    const { data } = await apiFacilityObj.postDeleteCheck(ids);
    delList.value = data.facilityNames;
    delResult.value = data.checkResult;
    !delResult.value && notDeletMessage();
    return new Promise((resolve, reject) => {
      if (delResult.value) resolve(true);
      if (!delResult.value) reject(false);
    });
  };
  const notDeletMessage = async() => {
    const nameStr = delList.value.join(',');
    await HlMessageBox.confirm(`[${nameStr}]已被关联，无法删除！`, '删除提示', {
      confirmButtonText: '确定',
      confirmButtonType: 'danger',
      cancelButtonText: '取消',
      type: 'success',
    });
  };

  return {
    checkDel
  };
}

export { useDelCheck };
