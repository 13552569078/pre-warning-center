import { ref, onMounted } from 'vue';
import { GlobalAPI } from '@/common/global-api';
import { apiHomePageObj } from '@/apis/modules/home-page';

function useLatestTime() {

  const dataAccessTime = ref('--');
  const targetTime = ref('--');


  const getDataAccessTime = async () => {
    const { data } = await apiHomePageObj.getFindRecentCountTime();
    dataAccessTime.value = data
  }
  const getTargetTime = async () => {
    const { data } = await apiHomePageObj.getTatgetCountTime();
    targetTime.value = data
  }

  onMounted(()=>{
    getDataAccessTime();
    getTargetTime();
  })

  return {
    dataAccessTime,
    targetTime
  };
}

export { useLatestTime };
